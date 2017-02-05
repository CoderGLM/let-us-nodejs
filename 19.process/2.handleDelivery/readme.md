## 句柄传递

该demo展示了句柄传递的特性，parent的server句柄可以传递到子进程，很不可思议。

## parent.js

```
// 先启动服务器
$ babel-node parent.js
// 然后用curl来访问
$ curl 'http://127.0.0.1:1337/'
handled by parent
$ curl 'http://127.0.0.1:1337/'
handled by child
$ curl 'http://127.0.0.1:1337/'
handled by child
$ curl 'http://127.0.0.1:1337/'
handled by parent
```

多次访问你会发现有时被parent处理，有时被child处理。

## parent2.js

创建了多个子进程，这样就可以实现多个进程监听同一端口的逻辑， 详情请参考《深入浅出Node.Js》- 朴灵编著

```
// 执行结果
lzowvre-mbp:~ xxx$ curl 'http://127.0.0.1:1337/'
handled by parent
lzowvre-mbp:~ xxx$ curl 'http://127.0.0.1:1337/'
handled by child 1867 
lzowvre-mbp:~ xxx$ curl 'http://127.0.0.1:1337/'
handled by child 1867 
lzowvre-mbp:~ xxx$ curl 'http://127.0.0.1:1337/'
handled by child 1868 
lzowvre-mbp:~ xxx$ curl 'http://127.0.0.1:1337/'
handled by child 1867 
lzowvre-mbp:~ xxx$ curl 'http://127.0.0.1:1337/'
handled by child 1868 
```

为了防止parent处理请求，在parent中listen底部，关闭服务，这样就只能子进程处理了，很不可思议的玩应，
请求如下：

```
lzowvre-mbp:~ xxx$ curl 'http://127.0.0.1:1337/'
handled by child 2161 
lzowvre-mbp:~ xxx$ curl 'http://127.0.0.1:1337/'
handled by child 2161 
lzowvre-mbp:~ xxx$ curl 'http://127.0.0.1:1337/'
handled by child 2160 
lzowvre-mbp:~ xxx$ curl 'http://127.0.0.1:1337/'
handled by child 2160 
lzowvre-mbp:~ xxx$ curl 'http://127.0.0.1:1337/'
handled by child 2160 
lzowvre-mbp:~ xxx$ curl 'http://127.0.0.1:1337/'
handled by child 2161 
lzowvre-mbp:~ xxx$ curl 'http://127.0.0.1:1337/'
handled by child 2161 
```

现在是在tcp层面处理的，我们尝试将其转化到http层面，参考parent3.js