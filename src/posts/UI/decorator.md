---
icon: pen-to-square
date: 2025-03-02

tag:
  - typescript
---
# TypeScript装饰器

## 简介
1. 装饰器本质是一种特殊的函数，它可以对：类、属性、方法、参数进行扩展，同时能让代码更简洁。
2. 装饰器自2025年在ECMAScript-6中被提出，已将近10年。
3. 截止目前，装饰器依然是实验性特性，需要开发者手动调整配置，来开启装饰器支持。
4. 装饰器有5种：
    - 类装饰器
    - 属性装饰器
    - 方法装饰器
    - 访问器装饰器
    - 参数装饰器
> 备注：虽然``TypeScript5.0``中可以直接使用``类装饰器``，但为了确保其他装饰器可用，现阶段使用时，仍建议使用``experimentalDecorators``配置开启装饰器支持，而且不排除下一版本中，官方会进一步调整装饰器的相关语法。

## 类装饰器
### 基本语法
>类装饰器是一个应用在``类声明``上的``函数``，可以为类添加额外的功能，或添加额外的逻辑。

首先在``tsconfig.json``中**启用实验性装饰器特性**
```ts
function Demo(target: Function) {
    console.log(target)
}
@Demo
class Person { }

```
#### 应用举例
>定义一个装饰器，实现``Animal``实例调用``toString``时返回``JSON.stringify``的执行结果。

```ts
function ToString(targe: Function) {
    targe.prototype.toString = function () {
        return JSON.stringify(this)
    }
    // 禁止添加新属性，现有属性可修改，但是不能删除
    Object.seal(targe)
}

@ToString
class Animal {
    constructor(
        public age: number,
        public name: string,
    ) { }
}
const cat = new Animal(1, "cat")
console.log(cat.toString()) // {"age":1,"name":"cat"}
```
### 关于返回值

> **类装饰器``有``返回值**：若类装饰器返回一个新的类，那么这个新类将``替换``被装饰的类。
> **类装饰器``无``返回值**：若类装饰器无返回值或者``undefined``，那被装饰的类``不会``被替换。
```ts
function ReturnClass(target: Function) {
    return class {
        test() {
            console.log(100)
            console.log(200)
            console.log(300)
        }
    }
}
@ReturnClass
class Person {
    test() {
        console.log(400)
    }
}
console.log(Person)
// class {
//     test() {
//       console.log(100);
//       console.log(200);
//       console.log(300);
//     }
//   }
```
### 关于构造类型
 > 在TypeScript中，``Function``类型所表示的范围十分广泛，包括：普通函数、箭头函数、方法等等。
 > 但并非``Function``类型的函数都可以被``new``关键字实例化，例如箭头函数是不能被实例化的，那么TypeScript中该如何声明一个构造函数呢？有以下两种方式：
- 仅声明构造类型
```ts
type Constructor = new (...arg:any[]) =>{}
```

``new``：该类型是可以用``new``操作符调用。
``...args``：构造器可以接受【任意数量】的参数。
``any[]``：构造器可以接受【任意类型】的参数。
``{}``：返回值是对象（非null、非undefined的对象）。

- 声明构造类型 + 指定静态属性
```ts
// 定义一个构造类型，且包含一个静态属性 wife
type Constructor = {
    // 构造签名
    new(...args: any[]): {}
    // wife 属性
    wife: string,
};
function test(fn: Constructor) {

}
class Person {
    static wife = "alex"
}
test(Person)
```
### 替换被装饰的类
对于高级一些的装饰类，不仅仅是覆盖一个原型上的方法，还要有更多功能，例如添加新的方法和状态。
> 需求：设计一个LogTime装饰器，可以给实例添加一个属性，用于记录实例对象的创建时间，再添加一个方法用于读取创建时间。

```ts
type Constructor = new (...args: any[]) => {}
interface Person {
    getTime(): void
}
function LogTime<T extends Constructor>(target: T) {
    return class extends target {
        createdTime: Date
        constructor(...args: any) {
            super(...args)
            this.createdTime = new Date()
        }
        getTime() {
            console.log(this.createdTime)
        }
    }
}

@LogTime
class Person {
    constructor(
        public name: string,
        public age: number,
    ) { }
}

const p1 = new Person("Alex", 12)
p1.getTime()
```
## 装饰器工厂
装饰器工厂是一个返回装饰器函数，可以为装饰器添加参数，可以更灵活地控制装饰器的行为。
> 需求：定义一个LogInfo 类装饰器工厂，实现``Person``实例可以调用到``introduce``方法，且``introduce``中输出内容的次数，由``LogInfo``接收的参数决定。

```ts
interface Person {
    introduce: () => void
}

// 定义一个装饰器工厂LogInfo，它接受一个参数n,返回一个类装饰器
function LogInfo(n: number) {
    // 装饰器函数，target 是被装饰的类
    return function (target: Function) {
        target.prototype.introduce = function () {
            for (let i = 0; i < n; i++) {
                console.log(this.name)
            }
        }
    }
}
@LogInfo(2)
class Person {
    constructor(
        public name: string,
        public age: number
    ) { }
    speak() {
        console.log("hello")
    }
}

const p = new Person("alex", 11);
p.introduce()
```
## 装饰器组合
装饰器可以组合使用，执行顺序为：先【由上到下】的执行所有的``装饰器工厂``，依次获取到装饰器，然后获取到装饰器，然后再【由下到上】执行所有的装饰器。
```ts
// 装饰器
function test1(target: Function) {
    console.log("test1")
}

// 装饰器工厂
function test2() {
    console.log("test2工厂")
    return function (target: Function) {
        console.log("test2")
    }
}

// 装饰器工厂
function test3() {
    console.log("test3工厂")
    return function (target: Function) {
        console.log("test3")
    }
}

// 装饰器
function test4(target: Function) {
    console.log("test4")
}
@test1
@test2()
@test3()
@test4
class Person {
    constructor(
        public name: string,
        public age: number
    ) { }
}

const p = new Person("Alex", 12)
// test2工厂
// test3工厂
// test4
// test3
// test2
// test1
```
## 属性装饰器
### 基本语法
