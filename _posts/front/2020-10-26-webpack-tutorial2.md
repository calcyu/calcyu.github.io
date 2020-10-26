---
title: webpack进阶教程
tags:
  - webpack
  - base64-image
  - css-pre-processors
  - sass
  - typescript
---


## 一、前言

>  基于[webpack基础教程]()扩展一些特殊应用场景，如小图片转`base64`，css预处理技术 sass转换，以及构建typescript项目等。



## 二、实验demo

### 实验1：图片base64

需求：把一些小图片转换成`base64`字符串，减少页面请示次数，降低服务器负担。

实现：需要用到`url-loader`加载器，通过`limit：字节大小`属性过滤指定大小的文件，如果小于指定字节大小，则转换成`base64`字符串。

**环境修改**

```bash
# 克隆基础项目
git clone http://github.com/calcyu/webpack-study-demo.git
# 切换目录
cd webpack-study-demo 
# 安装url-loader
yarn add -D url-loader

```

**配置文件 **

修改配置文件：`webpack.comman.js`

```javascript
# 原内容
{
    test: /\.(jpg|png|gif|jpeg)$/,
        use:[
            'file-loader'
        ]
}
# 修改后内容
{
    test: /\.(jpg|png|gif|jpeg)$/,
        use:[
            {
                loader:'url-loader',
                options:{
                    limit: 9000 //单位字节
                }
            }
        ]
}
```

**查看效果**

```bash
# 启动项目
yarn start
```

通过浏览器开发者工具，可以看到图片，页面中引用的图片`src`属性，已经变成`data:image/gif...`的字符串了。

![1603683873118](draft2020-10-26-webpack-tutorial.assets/1603683873118.png)

> 注意：`url-loader`可以用来处理文件，但还是依赖`file-loader`，当limit不满足条件时，`webpack`会使用`file-loader`来处理文件。
>
> 可以`yarn remove file-loader`，再修改配置文件`limit:7000`，启动项目会报错，提示找不到`file-loader`模块。



## 实验2：sass预处理

需求：在项目中使用sass样式预处理技术

实现：css预处理技术有很多，sass是其中之一，使用webpack打包这些样式文件，官方或社区都有提供对应的xxx-loader加载器，用法也大同小异。这里拿sass来做实现。

**环境修改**

```bash
# 在上面实验环境的基础上
yarn add -D sass-loader node-sass
```

**配置文件**

```javascript
# 新增rule
{
    test: /\.sass$/,
        use:[
            'style-loader',
            'css-loader',
            'sass-loader'
        ]
},
```

**源码文件**

新增`src/sass/variable.sass`

```yaml
$font-normal-size: '16px';
$bg-color: #eee;
```

新增`src/sass/main.sass`

```yaml
@import 'variable';
    
*
    padding: 0;
    margin: 0;

body
    background-color: $bg-color;
    font-size: $font-normal-size;
```

修改`src/index.js`

在块空地增加一行代码

```javascript
import './sass/main.sass'
```

**查看效果**

```bash
yarn start
```

通过浏览器开发者工具，可以看到如下效果

![1603683811146](draft2020-10-26-webpack-tutorial.assets/1603683811146.png)

## 实验3：sass静态化

需求：把sass样式文件，生成静态css文件来，利用异步加载、浏览器缓存，CDN等技术来优化页面的显示，以及加载速度。

实现：这里需要用到提出文件插件`mini-css-extract-plugin`

**环境修改**

```bash
yarn add -D mini-css-extract-plugin 
```

**配置文件**

```javascript
# webpack.prod.js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

rules:[
    {
        test: /\.sass$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
    },
]
plugins:[
    new UglifyjsWebpackPlugin(),
    new MiniCssExtractPlugin({
        filename:'css/[name][hash:8].css',
        chunkFilename: 'css/[id].css'
    })
]
```
把webpack.common.js中的配置移动到webpack.dev.js，不然会报错。
```javascript
# webpack.dev.js
rules:[
    {
        test: /\.sass$/,
        use:[
            'style-loader',
            'css-loader',
            'sass-loader'
        ]
    }
]
```

**源码文件**

修改文件`src/index.js`

```javascript
import './sass/main.sass'
```

新增文件`src/sass/other.sass`

```yaml
ul,li
    margin: 0
    padding: 0
```

修改文件`src/print.js`

```javascript
import('./sass/other.sass');
```

**查看效果**

```bash
yarn build
```

dist目录会创建如下文件

![1603700233145](draft2020-10-26-webpack-tutorial.assets/1603700233145.png)

> 有许多同学问`chunkFilename`属性什么时候会用到，文件中的 `dist/2.css`即按照`[id].css`生成的。

## 三、Demo源码

[https://github.com/calcyu/webpack-study-demo/tree/webpack-study-demo2](https://github.com/calcyu/webpack-study-demo/tree/webpack-study-demo2)

> 记得找个时间练习一下。