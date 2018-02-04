---
title: Intellij IDEA 常见问题及解决办法（持续更新）
tags:
  - Intellij
  - IDEA
  - TOOL
  - SETTINGS
---
1. IDEA中的*.properties文件中的中文会显示成unicode码，如下：  
```
\u663E\u793ASQL\u8BED\u53E5\u90E8\u5206
Log4j\u914D\u7F6E
```
## 解决方法：
在`File > Setting > Editor > File Encodings`，在右下角`Transparent native-to-ascii conversion`处打上勾，应用或确认

2. 调试代码的时候时常会出现如下提示框
```
Page ‘http://localhost:63342/*’ requested without authorization, you can copy URL and open it in browser to trust it. Copy authorization URL to clipboard
```
## 解决方法：
在`File > Setting > Build, Execution, Deployment > Debugger`勾选最后一项`Allow unsigned requests`