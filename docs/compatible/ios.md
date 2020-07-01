## new Date() 在 ios 下的兼容问题

```js
var timestamp = new Date('2020-06-06 10:30').valueOf()
```
上面的代码会返回 NAN , 原因是在 ios 上不支持 `-`这种形式的日期格式,解决办法:

```js
var timestamp = new Date('2020-06-06 10:30'.replace(/-/g, '/')).valueOf()
```
