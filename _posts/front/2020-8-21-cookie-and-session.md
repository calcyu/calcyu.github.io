---
title: Express中使用cookie and session
tags:
  - cookie
  - session
  - Express
---

## 网页状态管理
HTTP是一种无状态协议，即服务器不保留与客户交易时的任何状态。这就大大减轻了服务器记忆负担，从而保持较快的响应速度。


## 一、关于cookie
*应用场景*
我们访问购物网站，浏览了一下商品，关闭浏览器，再次访问网站会发现有个栏目显示了我们最近浏览过的商品，但我们换一台电脑，
这些信息又都没有了

### 什么是cookie
是保存在用户本地的一组以 key=value形式的字符串

### cookie的特点
1. cookie保存在浏览器本地，只要不过期关闭浏览器也会存在。
2. 正常情况下cookie不加密，用户可轻松看到
3. 用户可以删除或者禁用cookie
4. cookie可以被篡改
5. cookie可用于攻击
6. cookie存储量很小，大小一般是4k
7. 发送请求自动带上登录信息

### cookie的参数
属性|说明
---:|---
domain| 域名 
name=value| 键值对，可以设置要保存的 Key/Value，注意这里的 name 不能和其他属性项的名字一样
Expires|  过期时间（秒），在设置的某个时间点后该 Cookie 就会失效，如 expires=Wednesday, 09-Nov-99 23:12:40 GMT。
maxAge|最大失效时间（毫秒），设置在多少后失效 。
secure| 当 secure 值为 true 时，cookie 在 HTTP 中是无效，在 HTTPS 中才有效 。
Path|表示 在那个路由下可以访问到cookie。
httpOnly|是微软对 COOKIE 做的扩展。如果在 COOKIE |中设置了“httpOnly”属性，则通过程序（JS 脚本、applet 等）将无法读取到COOKIE 信息，防止 XSS 攻击的产生 。
singed| 表示是否签名cookie, 设为true 会对这个 cookie 签名，这样就需要用 res.signedCookies 而不是 res.cookies 访问它。被篡改的签名 cookie 会被服务器拒绝，并且 cookie 值会重置为它的原始值。

## 二、cookie的使用

### 浏览器中使用cookie
```
var Days = 30;
var exp = new Date();
exp.setTime(exp.getTime() + Days*24*60*60*1000);
document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
```

### Express中使用cookie

**配置**
```js
const cookieParser=require("cookie-parser");
 
var app=express();
 
//设置中间件
app.use(cookieParser());
```

**使用**
```js
res.cookie("userName",'张三',{maxAge: 20000, httpOnly: true});
res.send("获取cookie成功，cookie为："+ req.cookies.userName);
```

## 三、关于session

### 什么是session
session是另一种记录客户状态的机制，与cookie保存在客户端浏览器不同，session保存在服务器当中；

### session的工作原理 
当用户请求服务器，服务器程序会为每一个客户端创建一个session对象，
并生成一个sessionId，服务器程序把sessionId通过cookie保存在客户端，客户端每次请求都会带上cookie，服务器根据sessionid找到对应的session对象，实现客户状态信息的保存
###　session的参数
属性|说明
---:|---
name | cookie的名字（原属性名为 key）。（默认：’connect.sid’）
store | session存储实例
secret | 用它来对session cookie签名，防止篡改
cookie | session cookie设置 （默认：{ path: ‘/‘, httpOnly| true,secure: false, maxAge: null }）
genid | 生成新session ID的函数 （默认使用uid2库）
rolling | 在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
resave | 强制保存session即使它并没有变化 （默认： true, 建议设为：false）
proxy | 当设置了secure cookies（通过”x-forwarded-proto” header ）时信任反向代理。当设定为true时，”x-forwarded-proto” header 将被使用。当设定为false时，所有headers将被忽略。当该属性没有被设定时，将使用Express的trust proxy。
saveUninitialized | 强制将未初始化的session存储。当新建了一个session且未设定属性或值时，它就处于未初始化状态。在设定一个cookie前，这对于登陆验证，减轻服务端存储压力，权限控制是有帮助的。（默认：true）
unset | 控制req.session是否取消（例如通过 delete，或者将它的值设置为null）。这可以使session保持存储状态但忽略修改或删除的请求（默认：keep）

## 四、session的使用
**安装**
```bash
npm install express-session --save
```

**配置**
```js
const session=require("express-session");
//配置中间件
app.use(session({
    genid: function(req) {
    return uuidv4() // use UUIDs for session IDs
  },
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))
```

**使用**
*通过session实现登录状态保存*
```js
app.use('/login',function(req,res){
    //设置session
    req.session.userinfo='张三';
    res.send("登陆成功！");
});
 
app.use('/loginOut',function(req,res){
    //注销session
    req.session.destroy(function(err){
        res.send("退出登录！"+err);
    });
});
 
app.use('/',function(req,res){
    //获取session
    if(req.session.userinfo){
        res.send("hello "+req.session.userinfo+"，welcome to index");
    }else{
        res.send("未登陆");
    }
});
```
