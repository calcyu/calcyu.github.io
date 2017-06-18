---
layout: redirect
title: Git分支管理策略
categories: tools git
tags: git
dest_url: http://www.ruanyifeng.com/blog/2012/07/git.html
---
如果你严肃对待编程，就必定会使用"版本管理系统"（Version Control System）。
眼下最流行的"版本管理系统"，非Git莫属。

相比同类软件，Git有很多优点。其中很显著的一点，就是版本的分支（branch）和合并（merge）十分方便。有些传统的版本管理软件，分支操作实际上会生成一份现有代码的物理拷贝，而Git只生成一个指向当前版本（又称"快照"）的指针，因此非常快捷易用。
但是，太方便了也会产生副作用。如果你不加注意，很可能会留下一个枝节蔓生、四处开放的版本库，到处都是分支，完全看不出主干发展的脉络。