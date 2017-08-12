---
layout: post
title: Sublime配置Reactjs开发环境
categories: IDE
tags:
  - Sublime
  - Reactjs
  - babel
  - Syntax
  - Snippets
---

## Sublime配置Reactjs开发环境
Sublime这个秒开的软件我相信很多做前端开发的朋友都非常喜欢。  
他就像一个废弃工丆改造成了一个现代化的办公室。  
下面教大家如何配置关于Reactjs的开发环境，非常简单就是安装一些相关插件就可以了。

## 语法高亮插件
1. 安装插件
按`ctrl+shift+p`输入`Install Package`回车  
输入`Babel`回车安装  
2. 配置插件
打开一个`.js`文件，按如下设置
`View -> Syntax -> Open all with current extension as... -> Babel -> JavaScript (Babel).`
这样Babel这个插件就应用到所有js文件中去了。

## 语法提示插件（同上）
1. 安装插件
按`ctrl+shift+p`输入`Install Package`回车  
输入`Reactjs`回车安装  
2. 快捷键
```
   cdm→  componentDidMount: fn() { ... }

   cdup→  componentDidUpdate: fn(pp, ps) { ... }

     cs→  var cx = React.addons.classSet;

    cwm→  componentWillMount: fn() { ... }

    cwr→  componentWillReceiveProps: fn(np) { ... }

    cwu→  componentWillUpdate: fn(np, ns) { ... }

   cwun→  componentWillUnmount: fn() { ... }

     cx→  cx({ ... })

    fdn→  React.findDOMNode(...)

    fup→  forceUpdate(...)

    gdp→  getDefaultProps: fn() { return {...} } 

    gis→  getInitialState: fn() { return {...} } 

    ism→  isMounted()

  props→  this.props.

     pt→  propTypes { ... }

    rcc→  component skeleton

   refs→  this.refs.

    ren→  render: fn() { return ... }

    scu→  shouldComponentUpdate: fn(np, ns) { ... }

    sst→  this.setState({ ... })

  state→  this.state.
  ```

  ## 在jsx中使用Emmet
  1. 安装插件`RegReplace`和`Chain Of Command`同上
  2. 分别配置这两个插件
  设置用户按键
  `Preferences -> KeyBinding – Users`输入如下内容，注意JSON格式  
  ```
  {
		"keys": ["tab"],
		"command": "expand_abbreviation_by_tab", 
		"context": [{
			"operand": "source.js", 
			"operator": "equal", 
			"match_all": true, 
			"key": "selector"
		},{
			"key": "preceding_text", 
			"operator": "regex_contains", 
			"operand": "(\\b(a\\b|div|span|p\\b|button)(\\.\\w*|>\\w*)?)", 
			"match_all": true
		},{
			"key": "selection_empty", 
			"operator": "equal", 
			"operand": true, 
			"match_all": true
		}]
	}
  ```
  设置RegReplace
  这个插件会把class替换成className
    `Packagea Setting -> Reg Replace -> Settings-User`输入如下内容，注意JSON格式 
  ```
  {
    "replacements": {
        "js_class": {
            "find": " class=\"",
            "replace": " className=\"",
            "greedy": true,
            "case": false
        }
    }
}
```