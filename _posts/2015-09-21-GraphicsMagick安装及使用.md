---
layout: post
title: GraphicsMagick安装及使用
categories:
  - LINUX
  - tools
date: 2015-09-21 15:02:00
tags: abc cde
---

<div id="cnblogs_post_body">

相信做过互联网图片的人都知道ImageMagick，超牛逼的图片处理库，而GraphicsMagick是从ImageMagick5.5.2的分支版本，支持多达88种图片格式的处理，而且相当稳定及高效，对于java应用来说GraphicsMagick+im4java简直就是天作之合。

**1) 安装GraphicsMagick**
<div>
<pre># tar -zxvf GraphicsMagick-1.3.17.tar.gz
# cd GraphicsMagick-1.3.17
# ./configure --prefix=/usr/local/graphicsmagick-1.3.17</pre>
</div>
输出以下内容，注意红色部分：
<div>
<div><a title="复制代码">![复制代码](http://common.cnblogs.com/images/copycode.gif)</a></div>
<pre>Delegate Configuration:

BZLIB --with-bzlib=yes yes
DPS --with-dps=yes no
FlashPIX --with-fpx=no no
FreeType 2.0 --with-ttf=yes no (需要freetype支持)
Ghostscript None gs (unknown)
Ghostscript fonts --with-gs-font-dir=default /usr/share/fonts/default/Type1/
Ghostscript lib --with-gslib=no no
JBIG --with-jbig=yes no
JPEG v1 --with-jpeg=yes no (需要libjpeg支持)
JPEG-2000 --with-jp2=yes no
LCMS v1 --with-lcms=yes no
LCMS v2 --with-lcms2=yes no
LZMA --with-lzma=yes no
Magick++ --with-magick-plus-plus=yes yes
PERL --with-perl=no no
PNG --with-png=yes no (需要libpng支持)
TIFF --with-tiff=yes no
TRIO --with-trio=yes no
Windows fonts --with-windows-font-dir= none
WMF --with-wmf=yes no
X11 --with-x= no
XML --with-xml=yes yes
ZLIB --with-zlib=yes yes</pre>
<div><a title="复制代码">![复制代码](http://common.cnblogs.com/images/copycode.gif)</a></div>
</div>
如果./configure后出现以上信息，则需要安装第三方库以支持JPEG,PNG,FreeType处理，步骤如下：

**a) 安装libjpeg**
<div>
<div><a title="复制代码">![复制代码](http://common.cnblogs.com/images/copycode.gif)</a></div>
<pre># cd ..
# rpm -qa | grep libjpeg
# rpm -qa | grep libjpeg | xargs rpm -e --nodeps --allmatches
# wget ftp://ftp.graphicsmagick.org/pub/GraphicsMagick/delegates/libjpeg-6b.tar.gz
# tar -zxvf libjpeg-6b.tar.gz
# cd libjpeg-6b
# ./configure
# make
# make install
# ln -s /usr/local/lib/libjpeg* /lib/
# ln -s /usr/local/lib/libjpeg* /lib64/</pre>
<div><a title="复制代码">![复制代码](http://common.cnblogs.com/images/copycode.gif)</a></div>
</div>
**b) 安装libpng**
<div>
<div><a title="复制代码">![复制代码](http://common.cnblogs.com/images/copycode.gif)</a></div>
<pre># cd ..

# rpm -qa | grep libpng
# rpm -qa | grep libpng | xargs rpm -e --nodeps --allmatches
# wget ftp://ftp.graphicsmagick.org/pub/GraphicsMagick/delegates/libpng-1.2.49.tar.gz
# tar -zxvf libpng-1.2.49.tar.gz
# cd libpng-1.2.49
# ./configure
# make
# make install
# ln -s /usr/local/lib/libpng* /lib/
# ln -s /usr/local/lib/libpng* /lib64/</pre>
<div><a title="复制代码">![复制代码](http://common.cnblogs.com/images/copycode.gif)</a></div>
</div>
**c) 安装freetype**
<div>
<div><a title="复制代码">![复制代码](http://common.cnblogs.com/images/copycode.gif)</a></div>
<pre># cd ..
# rpm -qa | grep freetype
# rpm -qa | grep freetype | xargs rpm -e --nodeps --allmatches
# wget ftp://ftp.graphicsmagick.org/pub/GraphicsMagick/delegates/freetype-2.4.10.tar.gz
# tar -zxvf freetype-2.4.10.tar.gz
# cd freetype-2.4.10
# ./configure
# make
# make install
# ln -s /usr/local/lib/freetype* /lib/
# ln -s /usr/local/lib/freetype* /lib64/</pre>
<div><a title="复制代码">![复制代码](http://common.cnblogs.com/images/copycode.gif)</a></div>
</div>
**d) 安装GraphicsMagick**
<div>
<pre># cd ../GraphicsMagick-1.3.17
# ./configure --prefix=/usr/local/graphicsmagick-1.3.17
# make
# make install</pre>
</div>
**备注：**有可能会在安装libpng时，出现ZLIB无法找到的情况，则按照类似方法安装ZLIB。

**2) 使用GraphicsMagic**

将GraphicsMagic_HOME/bin目录加入到执行PATH中，然后执行以下命令。

**&gt;&gt; 查看GraphicsMagic帮助**
<div>
<pre># gm -help</pre>
</div>
**&gt;&gt; 将input.jpg制作成640x480的缩略图**
<div>
<pre># gm convert input.jpg -geometry 640x480^ -gravity center -extent 640x480 output.jpg</pre>
</div>
**&gt;&gt; 将input.jpg制作成640x480的图片，多余的部分留白**
<div>
<pre># gm convert input.jpg -geometry 640x480^ -background white -gravity center -extent 640x480 output.jpg</pre>
</div>
**&gt;&gt; 给inputjpg图片追加文字水印**
<div>
<pre># gm convert input.jpg -font Bookman-DemiItalic -fill red -pointsize 33 -draw "text 1600,50 'www.abc.com'" output.jpg</pre>
</div>
**&gt;&gt; 添加边框**
<div>
<pre># gm convert input.jpg -frame 15x15+3+3 output.jpg</pre>
</div>
原文：http://www.cnblogs.com/javapro/archive/2013/04/28/3048393.html

&nbsp;

</div>