---
title: webpack基础教程
tags:
	- webpack
	- html
	- css
---


## 一、前言

>  制作网页或是开发web应用时，需要一个web服务器实时浏览制作的页面和测试JS代码，并且可以热更新。部署网站时，需要对应用程序进行压缩优化文件大小，如果功能较复杂还需要按模块拆分，实现按需动态加载。
>
> Webpack：就是用来解决以上需求的打包工具之一。



### webpack基本概念

- 入口(entry)
- 输出(output)
- 加载器loader
- 插件(plugins)



####  入口(entry)

入口即应用程序执行的入口文件，每个应用程序都有一个唯一的入口文件和方法，webpack根据入口文件生成应用程序依赖关系图，并把依赖项生成至bundles文件中。



#### 输出(output)

指定打包文件的输出目录



#### 加载器(loader)

loader类似中间件，使webpack可以解析并打包除js文件以外的文件。



####  插件(plugins)

loader用来处理某些特殊的文件或模块，插件可以用于处理更广的任务。webpack提供的插件接口非常强大，使插件可以完成各种任务。



## 二、起步

### hello world

安装webpack

```bash
npm install webpack webpack-cli --save-dev
```

目录结构

```
/dist/    //打包目录
	index.html
/src/	  //源码目录
	index.js
```

index.html

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>xxxx</title>
  <meta name="viewport" content="width=device-width, initial-scale=1"></head>
  <body>
  <script src="bundle.js"></script></body>
</html>
```

index.js

```javascript

function component(){
    var div = document.createElement('div');
    div.innerHTML = `<span>hello webpack </span>`;
    return div;
}

document.body.appendChild(component());
```

打包命令

```bash
webpack 	//运行全局webpack
npx webpack //运行项目中的webpack
```



### 打包第三方依赖包

> 按照指定格式显示日期

- moment `npm install moment --save` 官方停更
- dayjs `npm install dayjs --save`

```javascript
import dayjs from 'dayjs'

const time = dayjs().startOf('month').add(1,'day').set('year',2000).format('YYYY-MM-DD HH:mm:ss')
div.innerHTML = `<span>hello webpack ${time}</span>`;
```



## 三、配置文件(config)

### 创建配置文件

默认配置文件名`webpack.config.js`

```javascript
// webpack.config.js
const path = require('path');

module.exports = {
  mode: "development", //development开发环境|production生产环境
  entry: './src/index.js', 
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```



### 支持代码调试	

打包之后代码格式以及文件名都可以通过配置改变，为了更方便的进行代码源文件的调试，可以把`devtool`属性设置为`source-map`来生成源码的映射文件，从而达到调试源码的目录。

> 开启这个选项之后，`dist`目录中js文件会同时生成一个xxx.map的文件，该文件就是源码映射文件用来调试代码的。

```javascript
// webpack.config.js
module.exports = {
	devtool: 'source-map',
}    
```



### 开发者工具

 官方针对开发还提供了一个webserver工具, 监听热更新等功能都有

安装

```bash
npm install -D webpack-dev-server
```

配置

```javascript
// webpack.config.js
module.exports = {
    ... //其他配置项省略
    devServer: {
       contentBase: path.join(__dirname, '/dist/'),
       inline: true,
       host: 'localhost',
       port: 8080,
    }
}
```

运行

```bash
webpack-dev-server --config webpack.config.js
```



## 四、加载器(loader)

### 加载css文件

安装

```bash
npm install --save-dev style-loader css-loader
```

配置

```javascript
// webpack.config.js
module.exports = {
    ... //其他配置项省略
    module:{
        rules:[
          {
            test: /\.css$/,
            use:[
              'style-loader',
              'css-loader'
            ]
          }
        ]
    }
}
```



### 加载图片文件

安装

```bash
npm install --save-dev file-loader
```

配置

```javascript
// webpack.config.js
module.exports = {
    ... //其他配置项省略
    {
        test: /\.(jpg|png|gif|jpeg)$/,
        use:[
        'file-loader'
        ]
    }
}
```

js中的图片

```javascript
import imgPic from './timg.gif'

const img = new Image();
img.src = imgPic;
div.appendChild(img);
```



css中的图片

```css
background: url(./timg.gif);
```


## 五、插件(plugins)

### 自动生成html文件

安装

```bash
npm install --save-dev html-webpack-plugin
```

配置

```javascript
// webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    ... //其他配置项省略
    plugins:[
		new HtmlWebpackPlugin({title:'xxxx'}),
    ]
}
```



### 清除dist目录

安装

```bash
npm install clean-webpack-plugin --save-dev
```

配置

```javascript
// webpack.config.js
const cleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    ... //其他配置项省略
    plugins:[
		new cleanWebpackPlugin()
    ]
}
```



### 压缩代码

```bash
npm i uglifyjs-webpack-plugin@1 -D
```

```javascript
// webpack.config.js
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    ... //其他配置项省略
    plugins:[
		new UglifyjsWebpackPlugin()
    ]
}

```


## 六、优化

### 懒加载

如果web应用程序打包文件较大，可以根据模块进行拆分，实现异步加载。

以下代码实现的功能是：当用户点击div时动态加载print模块，把print模块从主模块中拆分出来，加快主模块的加载显示速度。

> webpack通过注释的方式定义模块名称，真是鬼才。vue里的懒加载也是使用相同的方式

```javascript
div.onclick = e => import(/* webpackChunkName: "print" */'./print').then(module=>{
    print = module.default;
    print();
})
```



### 开发生产双配置

开发环境和生产环境使用的加载器和插件肯定会有所不同，下面对配置文件进行优化，实现相同配置优化，把开发环境和生产环境独有的配置项独立出来。

安装

```bash
npm install -D webpack-merge
```

**配置**

把原来的`webpack.config.js`拆分成三个文件

1. webpack.common.js 公共配置项
2. webpack.dev.js   开发配置项
3. webpack.prod.js  生产配置项

```javascript
// webpack.common.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
  mode: "production", //development|production
  entry: {
    app: './src/index.js',
  }, //可以修改入口文件名
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins:[
    new HtmlWebpackPlugin({title:'xxxx'}),
    new CleanWebpackPlugin()
  ],
  module:{
    rules:[
      {
        test: /\.css$/,
        use:[
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(jpg|png|gif|jpeg)$/,
        use:[
          'file-loader'
        ]
      }
    ]
  }
};
```

```javascript
// webpack.dev.js
const common = require('./webpack.common');
const {merge} = require('webpack-merge');

module.exports = merge(common,{
  mode: "development", //development|production
  devtool: "source-map",
})
```

```javascript
// webpack.prod.js
const common = require('./webpack.common');
const {merge} = require('webpack-merge');
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(common,{
  mode: "production", //development|production
  output: {
    filename: '[name].[hash:7].js'
  },
  plugins:[
    new UglifyjsWebpackPlugin()
  ]
})

```

node配置文件中新增三条快捷命令

```json
// package.json
"scripts": {
    "build": "webpack --config webpack.prod.js",
    "dev": "webpack --config webpack.dev.js",
    "start": "webpack-dev-server --config webpack.dev.js"
},
```

## 七、Demo源码

[http://github.com/calcyu/webpack-study-demo](http://github.com/calcyu/webpack-study-demo)

> 不管学习什么技术，切记敲一敲，练一练，不然全是空想，觉得有点用帮点个小星星，O(∩_∩)O哈！