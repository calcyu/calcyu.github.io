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
使用`@-`符号，可以采用倒序的方式来生成数值编号

例如：在`$`后面添加`@-`:
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
在`$`后面添加`@N`可以修改数值编号起始值:
```css
ul>li.item$@3*5
```
将生成...
```html
<ul>
    <li class="item3"></li>
    <li class="item4"></li>
    <li class="item5"></li>
    <li class="item6"></li>
    <li class="item7"></li>
</ul>
```
你还可以同时使用符号`@-N`，达到倒序和设定起始值的目的:
```css
ul>li.item$@-3*5
```
将生成...
```html
<ul>
    <li class="item7"></li>
    <li class="item6"></li>
    <li class="item5"></li>
    <li class="item4"></li>
    <li class="item3"></li>
</ul>
```
标签内文本: {}
你可以使用花括号来添加标签之间的文本:
```css
a{Click me}
```
将生成...
```html
<a href="">Click me</a>
```
注意`{文本}`一般用来转换双标签（如：div p 等），但右边表达式不同会有不同的作用，例如，`a{click}`和`a>{click}`输出结果一样，但`a{click}+b{here}`和`a>{click}+b{here}`却不一样：
```html
<!-- a{click}+b{here} -->
<a href="">click</a><b>here</b>

<!-- a>{click}+b{here} -->
<a href="">click<b>here</b></a>
```
在第二个例子中，`<b>`标签在`<a>`标签的内部。不同之处在于：当`{text}`写在标签后面，而不是`>`运算符后面，那样被认为是父节点。这是一个更复杂的例如，说明了他为什么很重要：
```css
p>{Click }+a{here}+{ to continue}
```
将生成...
```html
<p>Click <a href="">here</a> to continue</p>
```
在这个例子中，也是有关包含`>`符号和没有`>`的区别:
```css
p{Click }+a{here}+{ to continue}
```
将生成...
```html
<p>Click </p>
<a href="">here</a> to continue
```
注：当你熟练掌握`Emmet`的缩写语法时，你想使用一些格式符号使你的缩写可读性更高。例如，在运算符和元素标签之间使用空间，例如：
```css
(header > ul.nav > li*5) + footer
```
许多使用者错误的认为每个缩写应该被写在新的一行，但他们是错误的：你可以输入和扩展缩写在文本的任意位置：

> 参考文章
[原文](https://docs.emmet.io/abbreviations/syntax/)