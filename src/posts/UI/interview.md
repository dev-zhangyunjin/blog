---
icon: pen-to-square
date: 2025-02-10
category:
  - javascript
tag:
  - html
  - css
  - vue
---

# 前端面试题库
## 同一个页面三个组件请求同一个API，怎么解决？
``` javascript

const fetchUser = (id) => {
    new Promise((resolve, reject) => {

        setTimeout(() => {
            console.log("fetch id===> ", id);

            resolve(id)
        }, 3000)
    })
}
const cache = {};
const getUser = id => {
    if (cache[id]) {
        return cache[id]
    }
    cache[id] = fetchUser(id);
    return cache[id];
}
getUser(1)

getUser(1)

getUser(1)
```
## 前端构建打包的过程中，cjs、esm、umd 的区别?
- cjs 是 CommonJS 的缩写，它主要用于 Node.js 的开发，它使用 require() 和 module.exports 来导入导出模块。
```javascript
exports.add = (a,b) => a + b;
const { add } require('./add')  
```
- esm 是 ES Module 的缩写，它主要用于浏览器端的开发，它使用 import 和 export 来导入导出模块。
```javascript
export const add = (a,b) => a + b;
import { add } from './add'
```
- umd 是 Universal Module Definition 的缩写，它既可以作为 CommonJS 模块使用，也可以作为 AMD 模块使用，也可以作为全局变量使用。
```javascript
(function (root, factory) {
    if(typeof define === 'function' && define.amd){
        // amd
        define(['jquery'], factory)
    }else if(typeof exports === 'object'){
        // commonjs
        module.exports = factory(require('jquery'))
    }else{
        // 全局变量
        root.returnExports = factory(root.jQuery)
        factory(root)
    }
})(this,fuction(){
})
```
## 前端权限管理的模型
- ACL 基于用户的权限管理模型。
    - 只需要给当前的用户授权或者取消授权即可。
    - user 关联 permission 和 role，permission 关联 action 和 resource。
    - 优点：清晰、简单
    - 缺点：需要维护大量的权限规则，成本高
- RBAC 基于角色的权限管理模型，它通过配置角色和权限规则来控制用户的访问权限。
    - 权限和用户无关，通过角色来控制用户的访问权限。
    - role - permission - user
- ABAC 基于属性的权限管理模型，它通过属性来控制用户的访问权限。
    - 可扩展性强
## Vue2 和 Vue3 的区别
- Vue2 和 Vue3 双向绑定方法不同；
    - Vue2 通过 Object.defineProperty() 方法实现数据绑定
    - Vue3 通过 new Proxy 实现数据绑定。
    - Object.defineProperty() ,新增属性后劫持不到
    - new Proxy() ,新增属性劫持到,直接返回代理对象
- vue3 支持碎片化
    - Vue2 : ``<template></template>`` 中必须只有一个根节点
    - Vue3 : ``<template></template>`` 中可以有多个根节点，会默认把这些标签包裹在一个虚拟标签中，减少内存的占用

- 生命周期
    - 对于生命周期来说，整体变化不大，只是大部分生命周期名称上 + ``on`` 
    - Vue3 在组合API 上需要引入生命周期
- v-if 和 v-for 不同
    - Vue2：v-for的优先级比v-if高。v-for会先于v-if执行，因此，如果v-if和v-for同时出现在同一个元素上，v-for会先执行，然后是v-if。
    - Vue3：v-if的优先级高于v-for。如果v-if和v-for同时出现在一个元素上，v-if会先执行，这可能导致问题，因为v-if执行时可能还没访问到v-for中的变量。

## Vue3 中获取类似Vue2 中的this
```javascript
import { getCurrentInstance } from "vue";
const { proxy } = getCurrentInstance();
```
## Vue3 中常用的数据类型

