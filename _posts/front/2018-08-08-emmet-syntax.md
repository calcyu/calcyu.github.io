---
title: Emmet使用说明
tag: 
- emmet
- html
- css
---

## Emmet使用说明
> Emmet是一个使用类似css选择器的方式快速生成html代码的插件


### 子节点: >
你可以使用`>`生成子节点的内容
```css
div>ul>li
```
将生成...
```html
<div>
    <ul>
        <li></li>
    </ul>
</div>
```
### 兄弟节点: +
你可以使用`+`生成子节点的内容
```css
div+p+bq
```
将生成...
```html
<div></div>
<p></p>
<blockquote></blockquote>
```
### 父级节点: ^
使用`>`可以生成子节点，但如果这个时候你又想在父节点中生成节点可以使用`^`，返回上一级节点继续生成
```css
div+div>p>span+em 
```
将生成...
```html
<div></div>
<div>
    <p><span></span><em></em></p>
</div>
```
```css
div+div>p>span+em^bq
```
将生成...
```html
<div></div>
<div>
    <p><span></span><em></em></p>
    <blockquote></blockquote>
</div>
```
多次使用`^`符号，作用是返回上级的上级
```css
div+div>p>span+em^^^bq
```
将生成...
```html
<div></div>
<div>
    <p><span></span><em></em></p>
</div>
<blockquote></blockquote>
```
### 多行: *
可以使用`*`来生成多行相同的节点
```css
ul>li*5
```
将生成...
```html
<ul>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
</ul>
```
### 分组: ()
可以使用`()`分组部分选择器内容，改变生成的优先级
```css
div>(header>ul>li*2>a)+footer>p
```
将生成...
```html
<div>
    <header>
        <ul>
            <li><a href=""></a></li>
            <li><a href=""></a></li>
        </ul>
    </header>
    <footer>
        <p></p>
    </footer>
</div>
```
分组和多行结合使用的案例：
```css
(div>dl>(dt+dd)*3)+footer>p
```
将生成...
```html
<div>
    <dl>
        <dt></dt>
        <dd></dd>
        <dt></dt>
        <dd></dd>
        <dt></dt>
        <dd></dd>
    </dl>
</div>
<footer>
    <p></p>
</footer>
```
### ID、类
```css
div#header+div.page+div#footer.class1.class2.class3
```
将生成...
```html
<div id="header"></div>
<div class="page"></div>
<div id="footer" class="class1 class2 class3"></div>
```
### 属性
```css
td[title="Hello world!" colspan=3]
```
将生成...
```html
<td title="Hello world!" colspan="3"></td>
```
### 数值编号
可以使用`$`和`*`来生成数值编号
```css
ul>li.item$*5
```
将生成...
```html
<ul>
    <li class="item1"></li>
    <li class="item2"></li>
    <li class="item3"></li>
    <li class="item4"></li>
    <li class="item5"></li>
</ul>
```
可以使用多个`$$$`来生成多位数值编号
```css
ul>li.item$$$*5
```
将生成...
```html
<ul>
    <li class="item001"></li>
    <li class="item002"></li>
    <li class="item003"></li>
    <li class="item004"></li>
    <li class="item005"></li>
</ul>
```
Changing numbering base and direction
With @ modifier, you can change numbering direction (ascending or descending) and base (e.g. start value).

For example, to change direction, add @- after $:
```css
ul>li.item$@-*5
```
将生成...
```html
<ul>
    <li class="item5"></li>
    <li class="item4"></li>
    <li class="item3"></li>
    <li class="item2"></li>
    <li class="item1"></li>
</ul>
```
To change counter base value, add @N modifier to $:
```css
ul>li.item$@3*5
```
…transforms to
```html
<ul>
    <li class="item3"></li>
    <li class="item4"></li>
    <li class="item5"></li>
    <li class="item6"></li>
    <li class="item7"></li>
</ul>
```
You can use these modifiers together:
```css
ul>li.item$@-3*5
```
…is transformed to
```html
<ul>
    <li class="item7"></li>
    <li class="item6"></li>
    <li class="item5"></li>
    <li class="item4"></li>
    <li class="item3"></li>
</ul>
```
Text: {}
You can use curly braces to add text to element:
```css
a{Click me}
```
...will produce
```html
<a href="">Click me</a>
```
Note that {text} is used and parsed as a separate element (like, div, p etc.) but has a special meaning when written right after element. For example, a{click} and a>{click} will produce the same output, but a{click}+b{here} and a>{click}+b{here} won’t:
```html
<!-- a{click}+b{here} -->
<a href="">click</a><b>here</b>

<!-- a>{click}+b{here} -->
<a href="">click<b>here</b></a>
```
In second example the <b> element is placed inside <a> element. And that’s the difference: when {text} is written right after element, it doesn’t change parent context. Here’s more complex example showing why it is important:
```css
p>{Click }+a{here}+{ to continue}
```
...produces
```html
<p>Click <a href="">here</a> to continue</p>
```
In this example, to write Click here to continue inside <p> element we have explicitly move down the tree with > operator after p, but in case of a element we don’t have to, since we need <a> element with here word only, without changing parent context.

For comparison, here’s the same abbreviation written without child > operator:
```css
p{Click }+a{here}+{ to continue}
```
...produces
```html
<p>Click </p>
<a href="">here</a> to continue
```
Notes on abbreviation formatting
When you get familiar with Emmet’s abbreviations syntax, you may want to use some formatting to make your abbreviations more readable. For example, use spaces between elements and operators, like this:
```css
(header > ul.nav > li*5) + footer
```
But it won’t work, because space is a stop symbol where Emmet stops abbreviation parsing.

Many users mistakenly think that each abbreviation should be written in a new line, but they are wrong: you can type and expand abbreviation anywhere in the text:

> 参考文章
[原文](https://docs.emmet.io/abbreviations/syntax/)