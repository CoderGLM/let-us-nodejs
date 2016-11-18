## 中间件：https://www.npmjs.com/package/connect

## 发送cookie

```
curl http://xxxx.com -H "Cookie: foo=bar,bar=baz"
```

## 检查对http请求的响应

```
curl http://localhost:3000/ --head
```

## 发送数据

### 发送json

```
curl -d '{"username": "tobi2"}' -H "Content-Type: application/json" http://localhost:3000
```

### 发送form数据

```
curl -d name=tobi http://localhost:3000
```

### 发送image

```
// 指定了文件和文件的name域
curl -F image=@photo.png -F name=tobi http://localhost:3000
```
