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
## Vue2篇
### 生命周期有哪些？发送请求在created还是mounted中？
- beforeCreate
- created
- beforeMounted
- mounted
- beforeUpdate
- updated
- beforeDestroy
- destroyed
> 这个问题得看项目和业务情况，因为父组件中引入子组件的加载顺序是：beforeCreate -> created -> beforeMounted -> 子组件 (beforeCreate -> created -> beforeMounted ->mounted) -> mounted，如果我们的业务是父组件引入子组件的时候，并且优先加载子组件的数据，那么父组件中当前的请求要放在mounted中，如果组件中没有依赖关系，无所谓放哪
### 为什么发送请求不在beforeCreate中，breforeCreate和created有什么区别？
1. 因为如果这个请求是在method中封装好的，在beforeCreate调用的时候，beforeCreate是拿不到method中的数据
2. 区别：beforeCreate中没有$el和$data,create中能获取到$data,不能获取到$el
### 在created中如何获取dom？
1. 只要异步函数中去获取dom
2. this.$nextTick(() =>{})
### 进入组件会执行哪些生命周期
- beforeCreate
- created
- beforeMounted
- mounted
> beforeCreate执行时，this.$el为undefined，this.$date 为undefined;
> created执行时，this.$el为undefined，this.$date 能读到数据;
> beforeMounted执行时，this.$el为undefined，this.$date 能读到数据;
> mounted执行时，this.$el能读到dom，this.$date 能读到数据;

### 如果父组件引入子组件，生命周期执行顺序？
- beforeCreate
- created
- beforeMounted
    - 子：beforeCreate
    - 子：created
    - 子：beforeMounted
    - 子：mounted
- mounted
### 第二次或者第n次进去组件会执行哪些生命周期？
如果当前组件加入keep-alive，只会执行一个生命周期，activated
## Vue3篇
### 加入keep-alive会执行哪些生命周期？
会额外增加两个生命周期：
- activated：
- deactivated：
如果当前组件加入了keep-alive，那么第一次进入会执行
- beforeCreate
- created
- beforeMounted
- mounted
- activated
## 关于组件
### 组件传值（通信）方式
- 父传后代
**父传子**
```vue
<template>
    <h1>父组件</h1>
    <div>
        <News :user="user"></News>
    </div>
</template>
<script>
   import News from './News.vue' 
   export default{
    name:"homeView"
    components:{
        News
    },
    props:{
        user:{
            type:Object,
            default:{}
        }
    }
    data(){
        return{
            user:{
                name:"alex",
                age:18
            }
        }
    }
   }
</script>

```
```vue
<template>
    <div>
        <h1>子组件</h1>
        <div>{{user}}</div>
    </div>
</template>
<script>
    export default{
        name:"NewsViews",
        data(){},
        created(){
            console.log(this.$parent.user);
        }
    }
</script>
```
这种方式不能跨组件传值
子组件能够直接使用父组件的数据
子组件可以使用**this.$parent.user.name = "xxxx"修改父组件的数据**
**provide 和 inject**
```vue
<template>
    <div>
        <List></List>
    </div>
</template>
<script>
import List from './List.vue'
   export default{
        name:"homeView",
        components:{
            List
        }
        data(){
            return{
                user:{
                    name:"alex"
                }
            }
        },
        provide(){
            return{
                user:this.user
            }
        }
   } 
</script>
```
```vue
<template>
    <div>
        <News></News>
    </div>
</template>

<script>
import News from './News.vue'
export default{
    name:"NewsView",
    components:{
        News
    },
    data(){
        return{

        }
    }    
}

</script>
```
```vue
<template>
    <div>
        {{user}}
    </div>
</template>
<script>
export default{
    inject:["user"]
}
</script>
```
- 后代传父
**子组件传父组件**

- 平辈传值


### keep-alive
> keep-alive 是一个内置组件，它允许我们缓存和保留组件状态，并在需要时重新渲染它们。






























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

