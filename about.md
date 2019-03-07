---
layout: post
title: About Me
permalink: /about/
---

我在web开发领域摸爬滚打`( year > 10 )`，`( 研究 && 实践 )`过的技术很多，最早使用的语言是ActionScript，经历了他的2.0到3.0转换的历程。当时用AS来开发一些非常酷炫的Flash全站（现在的全栈工程狮难道都有这个背景），以及Flex富客户端程序。
> [Adobe](http://baike.baidu.com/link?url=gIwOzE96QcsH2OABKfYpjCfzjZUXOYUz4t1My3spBWtDuGZfjIwIxQ7XNH_5pDA8K-mZgM0f6OPk0c6uiWwlP_)是我最敬佩的公司之一，这家公司的年龄`（age == myAge + 1）`，现在的互联网世界这么丰富多彩，Adobe的软件产品在背后发挥着关键性的作用，比如著名的Phoneshop Dreamweaver Flash

接着又学习了JAVA语言，用于开发ERP、CRM、OA、E-LEARNING等B/S软件系统

最近接触的是一些由JavaScript语言衍生的技术，如Nodejs Reactjs Vue 等。
关于这些技术，我开源了几个项目：
- [美女拼图](https://github.com/calcyu/LXPuzzle)使用EGRET游戏引擎开发的一个HTML5拼图游戏，内有H未成年谨入。{TypeScript,Egret}
- [微信客户端](https://github.com/calcyu/react-starter-kit)使用WEUI和Reactjs做的一个仿微信客户端程序{Reactjs}

我和WEB技术的不解之缘已经到了一种非常痴迷的一种状态，比如为了`( 研究&&解决 )`某个技术问题，经常会弄的很晚，不过这个已经是干IT这行的一个通病。比如凌晨4、5点钟的时候我还在写代码，[github更新时间](https://github.com/calcyu/calcyu.github.io/commit/005db2fdf3e56f9663d6d4436e6b7203ac2cd8f3)

最后介绍一下我自己，虽然年龄已不小(上面有答案)，但是长像就是这么任性，所以大家都叫我凯哥。
CalcYu（网络名）calc Windows系统中计算器的程序名，你可以通过Win+R 输入 calc 回车打开计算器 ^-^

我是一个喜欢挑战自我的人，我现在的工作属于跨界挑战，我现在是一位WEB技术讲师。
- [Weibo](http://weibo.com/e73g)
- [Twitter](https://twitter.com/calcyu)

*现在的我*   
![calcyu](/assets/image/calcyu.jpg)

*未来的我*   
![calcyu](/assets/image/calcyu_future.jpg)

<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
<script src="https://cdn.bootcss.com/jquery/2.1.4/jquery.min.js"></script>
<div id="content" ></div>
<script>
    $.ajax({
        url:"/README.MD",
        type:"get",
        success: function(r){
            document.getElementById('content').innerHTML =
                marked(r);
        }
    })
    
</script>