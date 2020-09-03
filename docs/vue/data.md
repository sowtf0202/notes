# initState
```javascript
new Vue({
  el: '#app',
  data(){
    return {
      message: 'hello'
    }
  }
  mounted(){
    console.log(this.message)
  }
})
```
::: tip questions
  * 1.为什么 `data` 可以是一个函数
  * 2.为什么在 `data` 上定义的 `message` 可以通过 `this.message` 访问到,而不是 `this.data.message`
:::

`initMixin` 在 `vue` 构造函数的原型上添加了 `_init` 方法,在实例化 `vue` 的时候会调用 `this._init` 方法,这个方法中包含了一系列的初始化操作,其中包含了调用 `initState` 方法

```javascript
export function initState (vm: Component) {
  vm._watchers = []
  // initInternalComponent会将传入 vue 构造函数的参数挂在 vm.$options 上
  const opts = vm.$options 
  if (opts.props) initProps(vm, opts.props)
  if (opts.methods) initMethods(vm, opts.methods)
  if (opts.data) {
    initData(vm)
  } else {
    observe(vm._data = {}, true /* asRootData */)
  }
  if (opts.computed) initComputed(vm, opts.computed)
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch)
  }
}
```
`initState` 函数中通过判断如果定义了 `data`,就会执行 `initData`

```javascript
function initData (vm: Component) {
  let data = vm.$options.data
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {}
  if (!isPlainObject(data)) {
    data = {}
    process.env.NODE_ENV !== 'production' && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    )
  }
  // proxy data on instance
  const keys = Object.keys(data)
  const props = vm.$options.props
  const methods = vm.$options.methods
  let i = keys.length
  while (i--) {
    const key = keys[i]
    if (process.env.NODE_ENV !== 'production') {
      if (methods && hasOwn(methods, key)) {
        warn(
          `Method "${key}" has already been defined as a data property.`,
          vm
        )
      }
    }
    if (props && hasOwn(props, key)) {
      process.env.NODE_ENV !== 'production' && warn(
        `The data property "${key}" is already declared as a prop. ` +
        `Use prop default value instead.`,
        vm
      )
    } else if (!isReserved(key)) {
      proxy(vm, `_data`, key)
    }
  }
  // observe data
  observe(data, true /* asRootData */)
}
```

## 为什么组件中 data 是一个函数

首先会判断 `data` 类型如果是 `function` , 则会调用 `getData` 方法获取到 `data` 的返回值, `getData` 实际上就是返回 `data.call(vm, vm)`, 同时将 `vm._data` 指向我们自己定义的 `data`, 这样做可以避免组件在复用的时候数据修改导致其他组件数据污染,通过函数返回一个对象其实每个复用的组件都是返回了一份数据的拷贝,防止组件复用时候数据污染

## 为什么 this.xxx 可以访问到 data的属性

另外第二个问题的答案也很简单,遍历 `data` 拿到所有 `key` 的数组,循环 `keys` 数组,判断 `data` 中定义的 `key` 是否与 `props`和 `methods` 中定义的名称重复,然后调用 `proxy` 方法 `proxy(vm, '_data', key)`

```javascript
export function proxy (target: Object, sourceKey: string, key: string) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  }
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val
  }
  Object.defineProperty(target, key, sharedPropertyDefinition)
}
```
`proxy` 只是通过 `Object.defineProperty` 为每一个 key 定义了 `get` 和 `set` 方法
<br/>

`get` 方法返回 `this[sourceKey][key]` 相当于返回 `this._data[key]`
`set` 方法将 `this[sourceKey][key]` 设置为 `val`
前面说到 `vm._data` 指向我们自己定义的 `data`,所以这也就是为什么在 `data` 上定义的 `message` 可以通过 `this.message` 访问到,而不是 `this.data.message`, 其实相当于访问到了 `vm._data.message`
