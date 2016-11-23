---
layout: post
title: Cocos run -p web报错
tags:
  - cocos
categories:
  - Cocos
  - Game
  - Javascript
---

```
编译模式：debug
部署模式：debug
启动应用。
Traceback (most recent call last):
File "E:\Labs\cocos2d-x-3.12\tools\cocos2d-console\bin\/cocos.py", line 992, in <module>
run_plugin(command, argv, plugins)
File "E:\Labs\cocos2d-x-3.12\tools\cocos2d-console\bin\/cocos.py", line 916, in run_plugin
<!--more-->
plugin.run(argv, dependencies_objects)
File "E:\Labs\cocos2d-x-3.12\tools\cocos2d-console\plugins\plugin_run\project_run.py", line 228, in run
self.run_web(dependencies)
File "E:\Labs\cocos2d-x-3.12\tools\cocos2d-console\plugins\plugin_run\project_run.py", line 142, in run_web
from SimpleHTTPServer import SimpleHTTPRequestHandler
File "D:\Python27\lib\SimpleHTTPServer.py", line 27, in <module>
class SimpleHTTPRequestHandler(BaseHTTPServer.BaseHTTPRequestHandler):
File "D:\Python27\lib\SimpleHTTPServer.py", line 208, in SimpleHTTPRequestHandler
mimetypes.init() # try to read system mime.types
File "D:\Python27\lib\mimetypes.py", line 358, in init
db.read_windows_registry()
File "D:\Python27\lib\mimetypes.py", line 258, in read_windows_registry
for subkeyname in enum_types(hkcr):
File "D:\Python27\lib\mimetypes.py", line 249, in enum_types
ctype = ctype.encode(default_encoding) # omit in 3.x!
UnicodeDecodeError: 'ascii' codec can't decode byte 0xb0 in position 1: ordinal not in range(128)
```

## **解决办法：**

打开cocos.py这个文件，增加下面这段代码

``` py
default_encoding = 'GBK'
if sys.getdefaultencoding() != default_encoding:
reload(sys)
sys.setdefaultencoding(default_encoding)
```