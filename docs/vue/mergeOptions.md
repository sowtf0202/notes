# mergeOptions
`vue` 通过 `mergeOptions`进行不同数据的合并
::: tip questions
* 1.`extends` 和 `mixins`有何区别
* 2.生命周期钩子函数的合并与普通自定义函数的合并有何不同
:::
```js
export function mergeOptions (
  parent: Object,
  child: Object,
  vm?: Component
): Object {
  if (process.env.NODE_ENV !== 'production') {
    checkComponents(child)
  }

  if (typeof child === 'function') {
    child = child.options
  }

  normalizeProps(child, vm)
  normalizeInject(child, vm)
  normalizeDirectives(child)

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm)
    }
    if (child.mixins) {
      for (let i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm)
      }
    }
  }

  const options = {}
  let key
  for (key in parent) {
    mergeField(key)
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key)
    }
  }
  function mergeField (key) {
    const strat = strats[key] || defaultStrat
    options[key] = strat(parent[key], child[key], vm, key)
  }
  return options
}
```
`vue`会首先进行 `extends` 的合并,然后进行 mixins 的合并(从上往下执行), `extends` 只能是一个对象,而 `minxins`可以是一个数组,会循环合并每一个`mixin`,最终递归将`extends`和 `mixins`合并到`parent`上
<br />
接下来会遍历 `parent`,对 `parent`的每一个 `key` 调用 `mergeField`,然后遍历 `child`,如果 `parent` 自身没有对应的`key`,则会对 `child`的`key`调用`mergeField`
`mergeField`的实现其实也很简单,通过 `key`去获取对应的合并策略,通过调用对应的合并策略进行合并.
# 合并策略
```js
/**
 * Default strategy.
 */
const defaultStrat = function (parentVal: any, childVal: any): any {
  return childVal === undefined
    ? parentVal
    : childVal
}
```
默认合并策略是如果没有子,则用父,否则使用子
```js
// el 的合并策略
strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        `option "${key}" can only be used during instance ` +
        'creation with the `new` keyword.'
      )
    }
    return defaultStrat(parent, child)
  }
```
el和合并使用默认合并策略,以子数据为主
```js
strats.data = function (
  parentVal: any,
  childVal: any,
  vm?: Component
): ?Function {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
      process.env.NODE_ENV !== 'production' && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      )

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
}
```
```js
function mergeData (to: Object, from: ?Object): Object {
  if (!from) return to
  let key, toVal, fromVal

  const keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from)

  for (let i = 0; i < keys.length; i++) {
    key = keys[i]
    // in case the object is already observed...
    if (key === '__ob__') continue
    toVal = to[key]
    fromVal = from[key]
    if (!hasOwn(to, key)) {
      set(to, key, fromVal)
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal)
    }
  }
  return to
}
```
`mergeDataOrFn`最终调用的是 `mergeData`
`data`的合并策略是:如果子数据不是`function`则返回父数据,否则以`child`为基准,将 `parent` 合并到 `child`上并返回 `child`

# 生命周期的合并
```js
const LIFECYCLE_HOOKS = [
        'beforeCreate',
        'created',
        'beforeMount',
        'mounted',
        'beforeUpdate',
        'updated',
        'beforeDestroy',
        'destroyed',
        'activated',
        'deactivated',
        'errorCaptured',
        'serverPrefetch'
      ]
      
LIFECYCLE_HOOKS.forEach(hook => {
  strats[hook] = mergeHook
})
function mergeHook (
  parentVal: ?Array<Function>,
  childVal: ?Function | ?Array<Function>
): ?Array<Function> {
  const res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  const res = []
  for (let i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i])
    }
  }
  return res
}
```
生命周期钩子函数的合并,如果有`childVal`,且有`parentVal`,`res` 等于`parentVal`和`childVal`合并后的数组,如果没有`parentVal`会判断`childVal`是否是`array`类型,是则 `res`等于`childVal`,不是就先转化成数组再赋值,否则`res` 等于 `parentVal`,最后如果有 `res`,则调用`dedupeHooks`,否则返回`res`.
<br />
`dedupeHooks`做的事情其实很简单,就是遍历`hooks`,删除重复数据
```js
const ASSET_TYPES = [
  'component',
  'directive',
  'filter'
]
function mergeAssets (
  parentVal: ?Object,
  childVal: ?Object,
  vm?: Component,
  key: string
): Object {
  const res = Object.create(parentVal || null)
  if (childVal) {
    process.env.NODE_ENV !== 'production' && assertObjectType(key, childVal, vm)
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets
})

function extend (to: Object, _from: ?Object): Object {
  for (const key in _from) {
    to[key] = _from[key]
  }
  return to
}
```
`component`,`directive`和`filter`的合并策略是`child`覆盖 `parent`
```js
strats.watch = function (
  parentVal: ?Object,
  childVal: ?Object,
  vm?: Component,
  key: string
): ?Object {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) parentVal = undefined
  if (childVal === nativeWatch) childVal = undefined
  /* istanbul ignore if */
  if (!childVal) return Object.create(parentVal || null)
  if (process.env.NODE_ENV !== 'production') {
    assertObjectType(key, childVal, vm)
  }
  if (!parentVal) return childVal
  const ret = {}
  extend(ret, parentVal)
  for (const key in childVal) {
    let parent = ret[key]
    const child = childVal[key]
    if (parent && !Array.isArray(parent)) {
      parent = [parent]
    }
    ret[key] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child]
  }
  return ret
}
```
`watch`的合并策略是:将`parent`和`child`放入数组中,不去重
```js
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal: ?Object,
  childVal: ?Object,
  vm?: Component,
  key: string
): ?Object {
  if (childVal && process.env.NODE_ENV !== 'production') {
    assertObjectType(key, childVal, vm)
  }
  if (!parentVal) return childVal
  const ret = Object.create(null)
  extend(ret, parentVal)
  if (childVal) extend(ret, childVal)
  return ret
}
```
`props`,`methods`,`inject`,`computed`的合并策略:没有 `parent`,返回`child`,有 `parent`则将`child`覆盖合并`parent`,并返回
<br />
从`mergeHook`中可以看出,如果赋值都定义了生命周期钩子,那么会全部放在数组中,然后在对应执行的时候循环调用,而 `methods`中定义的普通方法则是子覆盖父的方式合并,所以这也就回答了开头的第二个问题,生命周期钩子函数和普通函数的合并有何区别

