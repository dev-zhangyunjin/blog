---
icon: pen-to-square
date: 2025-03-02
category:
  - TypeScript
tag:
  - typeScript
---
# TypeScript

## 简介
- TypeScript 由微软开发，是基于JavaScript的一个扩展语言。
- TypeScript 包含了JavaScript的所有内容，即：TypeScript是JavaScript的超集。
- TypeScript 增加了：静态类型检查、接口、泛型等很多现代开发特性，因此更适合大型项目的开发。
- TypeScript 需要编译为JavaScript，然后交给浏览器或其他JavaScript运行环境执行。
## 为何需要TypeScript
- JavaScript 当年诞生时的定位是浏览器脚本语言，用于网页中嵌入一些简单的逻辑，而且代码量很少。
- 随着时间的推移，JavaScript 变得越来越流行，如今的JavaScript已经可以全栈编程了。
- 现如今的JavaScript 应用场景比当年丰富得多，代码量也比当年大很多，随便一个JavaScript项目代码量，可以轻松达到几万行，甚至几十万行。
- 然而JavaScript当你出生简陋，没有考虑如今的应用场景和代码量，逐渐的就出现了很多困扰。

### 缺点
- 不清不楚的数据类型
- 有漏洞的逻辑
- 访问不存在的属性
- 低级的拼写错误

### 静态类型检查
- 在代码运行前进行检查，发现代码的错误或不合理之处，减小运行时异常的出现几率，此种检查是静态类型检查，TypeScript的核心就是静态类型检查，简言之就是把运行时的错误前置。
- 同样的功能，TypeScripy 的代码量要大于 JavaScript，但由于TypeScript的代码结构更加清晰，在后期代码的维护中TypeScript却远胜于JavaScript。

### 编译TypeScript
- TypeScript编译为JavaScript，然后交给浏览器或其他JavaScript运行环境执行。
#### 命令行编译
要把 .ts 文件编译为 .js 文件，需要配置TypeScript的编译环境，步骤如下：
1. 安装TypeScript
```bash
npm install -g typescript
```
2. 编译TypeScript文件
```bash
tsc hello.ts
```
3. 运行JavaScript文件
```bash
node hello.js
```
#### 自动编译

1. 创建TypeScript编译控制文件
```bash
tsc --init
```
> 工程中会生成一个tsconfig.json文件,其中包含着很多编译时的配置。
> 观察发现，默认编译是JS版本ES7，可以手动调整为其他版本。
2. 监视目录中的.ts文件的变化
```bash
tsc --watch
```
3. 优化，编译时出错不生成.js文件
```bash
tsc --noEmitOnError --watch
```
备注：也可以在tsconfig.json中配置。

## 类型声明
使用 ``:``来对**变量**或**函数形参**，进行类型声明：
```ts
let a: string // 变量a只能存储字符串
let b: number // 变量b只能存储数字
let c: boolean // 变量c只能存储布尔值
a = 'hello'
b = 123
c = true

function add(a: number, b: number): number {
    return a + b
}
add(1, 2)
```
在``:``后也可以写**字面量类型**，不过实际开发中用得不多
```ts
let a: 'hello'
a = 'hello'
```
## 类型推断
TS 会根据我们的代码，进行类型推导，例如下面代码中的d，只能存储数字
```ts
let d = 123
d = 456
d = 'hello' // 报错
```
> 但是注意，类型推断不是万能的，面对复杂类型时推断容易出问题，所以尽量明确编写类型。

## 数据总览
### JavaScript中的数据类型
- string
- number
- boolean
- null
- undefined
- bigint
- symbol
- Object
- 备注：其中Object 包含了 Array、Date、RegExp 等等。
### TypeScript中的数据类型
- 上述所有JavaScript中的数据类型
- 六个新类型
    - any
    - unknown
    - never
    - void
    - tuple
    - enum
- 两个用于自定义类型的方式
    - type
    - interface
- 注意点
> 在JavaScript中的这些内置的构造函数：Number、String、Boolean，它们用于创建对应的包装对象，在日常开发时很少用到，在TypeScript中也是同理，所以在TypeScript中进行类型声明时，通常都是小写的number、string、boolean。

```ts
let str1: string
str1 = 'hello'
str2 = new String("hello")// 报错

let str2: string
str2 = "hello"
str2 = new String("hello")
console.log(typeof str1)
console.log(typeof str2)
```
> 原始类型VS包装类
> - 原始类型：如number、string、boolean，在JavaScript中是简单数据类型，它们在内存中占用空间少，处理速度快。
> - 包装对象：如Number对象、String对象、Boolean对象，是复杂类型，在内存中占用更多空间，在日常开发时很少由开发人员自己创建包装对象。

> 自动装箱：在JavaScript中，在必要时会自动将原始类型包装成对象，以便调用方法或属性访问。
```js
// 原始类型字符串
let str = "hello"

// 当访问str.length时，JavaScript引擎做了以下工作：
let size = (function(){
    // 1. 自动装箱：创建一个临时的String对象包装原始字符串
    let tempStringObject = new String(str)
    // 2. 访问String对象的length属性
    let lengthValue = tempStringObject.length
    // 3. 销毁临时对象，返回长度值
    // (JavaScript 引擎自动处理对象销毁，开发者无感知)
    return lengthValue
})()
console.log(size) // 5
```
## 常用类型
### any
``any``的含义：任意类型，一旦将变量类型限制为``any``，那就意味着放弃了对该变量的类型检查。
```ts
// 明确表示a的类型为any【显示的any】
let a :any
// 以下赋值，均无告警
a = 123
a = 'hello'
a = true
// 没有明确的表示b的类型是any，但TS主动推断出来b是any【隐式any】
let b = 123
b = 'hello'
b = true
```
注意点：``any``类型的变量，可以赋值给任意类型的变量
```ts
let c:any
c = 123
let x:string
x = c // 无告警
```
### unknown
``unknown``的含义是：未知类型。
- ``unknown``可以理解为一个类型安全的``any``,适用于不确定数据的具体类型。
```ts
// 设置a的类型为unknown
let a: unknown
// 以下对a赋值，均正常
a = 123
a = 'hello'
a = true
// 设置x的数据类型为string
let x: string
x = a // 警告：不能将类型为unknown的值赋值给类型为string的变量
```
- ``unknown``会强制开发者在使用之前进行类型检查，从而提供更强的类型安全性。
```ts
// 设置a的类型为unknown
let a: unknown
a = "hello"

// 第一种方式：加类型判断
if (typeof a === 'string') {
    x = a
    console.log(x)
}
// 第二种方式：加断言
x = a as string

// 第三种方式：使用类型断言
x = <string>a
```
- 读取``any``类型数据的任何属性都不会报错，而``unknown``类型的数据，读取任何属性都会报错。
```ts
let str1: string
str1 = 'hello'
str1.toUpperCase() // 无报错

let str2: any
str2 = 'hello'
str2.toUpperCase() // 无报错

let str3: unknown
str3 = 'hello'
str3.toUpperCase() // 报错：str3的类型未知
(str3 as string).toUpperCase() // 正确
```
### never
``never``的含义是：任何值都不是，简言之就是不能有值，undefined、null、''、0 都不行。
- 几乎不用``never``去直接限制变量，因为没有意义，例如：
```ts
// 指定a的类型为never，那就意味着a以后不能存任何的数据了
let a:never

// 以下对 a 的所有赋值都会有警告
a = 1
a = true
a = undefined
a = null
```
- ``never``一般是TypeScript 主动推导出来的，例如
```ts
// 指定 a 类型为string
let a:string 
// 给a设置值
a = 'hello'
if(typeof a === 'string'){
    console.log(a.toUpperCase())
}else{
    console.log(a) // TypeScript会推断出此处a是never，因为没有任何值符合此处额逻辑
}

```
- ``never``也可用于限制函数的返回值
```ts 
// 限制throwsError函数不需要有任何返回值， 任何只都不行，像undefined、null都不行
function throwsError():never{
    throw new Error('error')
 }
```

### void
- ``void``通常用于函数返回值的声明，含义：【函数返回值为空，调用者也不应该依赖其返回值进行任何操作】
```ts
function logMessage(message:string):void{
    console.log(message)
}
```
> 注意：编码者没有编写``return``去指定函数的返回值，所以``logMessage``函数是没有显示返回值的，但会有一个隐式返回值，就是``undefined``,即：虽然函数返回值类型为``void``,但也是可以接受``undefined``的。简单记：``undefined``是``void``可以接受的一种空。

```ts 
// 无警告
function logMessage(message:string):void{
    console.log(message)
}
// 无警告
function logMessage(message:string):void{
    console.log(message)
    return;
}
// 无警告
function logMessage(message:string):void{
    console.log(message)
    return undefined;
}
```
- 那限制函数返回值时，是不是``undefined``和``void``就没有区别呢，答案是：不是，**【返回值类型为``void``的函数，调用者不应该依赖其返回值进行任何操作】**  

```ts
function logMessage(message:string):void{
    console.log(message)
}
let res = logMessage("hello")
if(res){} // 报错：无法测试“void”类型的表达式的真实性
```
```ts
function logMessage(message:string):undefined{
    console.log(message)
}
let res = logMessage('hello')
if(res){} // 无报错
```
>**理解void和undefined**
> - ``void`` 是一个广泛的概念，用来表达“空”，而``undefined``则是这种“空”的具体实现之一。
> - 因此可以说，``undefined``是``void``能接受的“空”状态的一直具体形式。
> - 换句话说：``void``包含``undefined``,但``void``表达的语言超越了单纯的``undefined``，它是一种意图上的约定，而不仅仅是特定值的限制。

>**总结**若函数返回类型为``void``，那么：
> 从语法上讲：函数是可以返回``undefined``的，至于显示返回，这个无所谓。
> 从语义上讲：函数调用者不应关心函数返回值，也不应该依赖返回值进行任何操作，即使返回了``undefined``值

### object
> 关于``object``与``Object``，实际开发中用的相对比较少，因为范围太大了。

- ``object（小写）``
> ``object``（小写）的含义是：所有非原始类型，可存储：对象、函数、数组等，由于限制比较宽泛，在实际开发中使用得相对比较少。
```ts
let a:object // a 的值可以是任何【非原始类型】，包括：对象、函数、数组等
// 以下代码，是将【非原始类型】赋给a，所以均符合要求
a = {}
a = {
    name:"tom",
    age:12
}
a = [1,3,4,5,7]
a = function(){}
a = new String("tom")
class Person{}
a = new Person()

// 以下代码，是将【原始类型】赋给a，有警告
a = 1 // 警告：不能将类型为number分配给类型object
a = true // 警告：不能将类型为boolean分配给类型 object
a = '你好' // 警告：不能将类型为string分配给类型object
a = null // 警告：不能将类型为null分配给类型object
a = undefined // 警告：不能将类型undefined分配给类型object
```

- ``Object（大写）``
    - **官方描述**：所有可以调用``object``方法的类型。
    - **简单记忆**：除了``undefined``和``null``的任何值。
    - 由于限制的范围太大，所以实际开发中使用频率极低。
```ts
let b:Object // b 的值必须是Object的实例对象（除去undefined和null的任何值）

// 以下代码，均无告警，因为给a赋的值，都是Object的实例对象
b = {}
b = {name:"tom"}
b = [1,2,3,4]
b = function(){}
b = new String("tom")
class Person{}
b = new Person()
b = 1
b = true
b = "tom"

// b = null
// b = undefined
```

- **声明对象类型**
    - 实际开发中，限制一般对象，通常使用以下形式
    ```ts
    // 限制person1对象必须有name属性，age为可选属性
    let person1:{name:string,age?:number}

    // 含义同上，也能用分号作分隔
    let person2:{name:string; age?:number}

    // 含义同上，也能用换行做分隔
    let person3:{
        name:string
        age?:number
    }

    // 如下赋值均可以
    person1 = {name:"tom",age:12}
    person2 = {name:"tom"}
    person3 = {name:"alex"}

    // 如下赋值不合法，因为person3中的类型限制中，没有对gender属性的说明
    person3 = {name:"tom",gender:"男"}
    ```
    - **索引签名**：允许定义对象可以具有任意数量的属性，这些属性的键和类型是可变的，常用于：描述类型不确定的属性，（具有动态属性的对象）
    ```ts
    // 限制person对象必须有name属性，可选age属性但值必须是数字，同时可以有任意数量、任意类型
    let person:{
        name:string
        age?:number
        [key:string]:any
    }

    person = {
        name:"tom",
        age:12,
        gender:"男"
    }
    ```

- **声明函数对象类型**
    ```ts
    let add: (a:number,b:number) => number

    add = function(x,y){

        return x + y
    }
    ```
    >备注：
    > - TypeScript 中的 ``=>`` 在函数类型声明表示``函数类型``，描述其``参数类型``和``返回类型``。
    > - JavaScript 中的 ``=>`` 是一种定义函数的语法，是具体的函数实现。
    > - 函数类型声明还可以使用：接口、自定义类型等方式，下文中会详细讲解。

- **声明数组类型**
```ts
let arr1:string[]
let arr2:Array<string>

arr1 = ["A","B","C"]
arr2 = ["hello","world"]
```
> 备注：上述代码中的``Array<string>``属于泛型。

### tuple
> 元组（Tuple）是一种特殊的**数组类型**，可以存储**固定数量**的元素，并且每个元素的类型是**已知的**且**可以不同**。元组用于精确描述一组值的类型，``?``表示可选元素。

```ts
// 第一个元素必须是 string 类型，第二个元素必须是 number 类型。
let arr1:[string,number]
// 第一个元素必须是 number 类型，第二个元素是可选的，如果存在，必须是boolean 类型。
let arr2:[number,boolean?]
// 第一个元素必须是 number 类型，后面的元素可以是任意数量的 string 类型
let arr3:[number,...string[]]

// 可以赋值
arr1 = ['hello',123]
arr2 = [100,false]
arr2 = [200]
arr3 = [100,'hello','world']
arr3 = [100]

// 不可赋值，arr1 声明时是两个元素，赋值的是三个
arr1 = ["hello",123,false]
```

### enum
> 枚举（enum）可以定义**一组命名常量**，它能增强代码的可读性，也让代码**更好维护**

如下代码的功能是：根据调用的run时传入不同的参数，执行不同的逻辑，存在的问题是调用run时传参没有任何提示，编码者很容易写错字符串内容；并且用于判断逻辑的``up``、``down``、``left``、``right``是``连续且相关的一组值``，那此时就特别适合使用``枚举（enum）``。
```ts
function run(str:string){
    if(str === 'up'){
        console.log("向上")
    }else if(str === 'down'){
        console.log("向下")
    }else if(str === "left"){
        console.log("向左")
    }else if(str === "right"){
        console.log("向右")
    }
}
run("left")
run("down")
```

- 数字枚举
    数字枚举一种最常见的枚举类型，其成员的值会``自动递增``，且数字枚举还具备``反向映射``的特点，在下面代码中打印中，不难发现：可以通过``值``来获取对应的枚举``成员名称``。
    ```ts
    enum Direction {
        Up,
        Down,
        Left,
        Right
    }
    console.log(Direction) // 打印Direction会看到如下内容
    /**
     {
        0:"Up",
        1:"Down",
        2:"Left",
        3:"Right",
        Up:0,
        Down:1,
        Left:2,
        Right:3
     }
     */
    

    // 反向映射
    console.log(Direction.Up)
    console.log(Direction[0])

    // 此行代码报错，枚举属性是只读的
    Direction.Up = "shang"
    ```
    也可以指定成员的初始值，其后的成员值会递增。

    ```ts
    enum Direction {
        Up = 6,
        Down,
        Left,
        Right
    }
    console.log(Direction.Up) // 6
    console.log(Direciton.Down) // 7
    ```
    使用数字枚举完成刚才 ``run`` 函数中的逻辑，此时我们发现：代码更加直观易读，而且类型安全，同时也易于维护。
    ```ts
    enum Direction {
        Up,
        Down,
        Left,
        Right
    }
    function run(n:Direction){
        if(n === Direction.Up){
            console.log("向上")
        }else if(n === Direction.Down){
            console.log("向下")
        }else if(n === Direction.Left){
            console.log("向左")
        }else if(n === Direction.Right){
            console.log("向右")
        }
    }

    run(Direction.Up)
    run(Direciton.Down)
    run(Direction.Left)
    ```
- 字符串枚举
枚举的成员的值是字符串
```ts
enum Direction{
    Up = "up",
    Down = "down",
    Left = "left",
    Right = "right"
}
let dir:Direction = Direction.Up
console.log(dir)
```
- 常量枚举
    > 官方描述：常量枚举是一种特殊枚举类型，它使用``const``关键字定义，在编译时会被``内联``，``避免``生成一些``额外``的代码。

    >**何为``编译时内联``?**
    >所谓“内联”其实就是TypeScript在编译时，会将枚举**成员引用**替换为它们的**实际值**，而不是生成额外的枚举对象。这可以减少JavaScript代码量，并提高运行时性能。

    ```ts
    enum Direction {
        Up,
        Down,
        Left,
        Right
    }
    let x = Direction.Up;
    ```
    编译后生成的JavaScript代码量大：
    ```js
    "use strict";
    var Direcitons;
    (function (Directions){
        Directions[Directions["Up"] = 0] = "Up";
        Directions[Directions["Down"] = 0] = "Down";
        Directions[Directions["Left"] = 0] = "Left";
        Directions[Directions["Right"] = 0] = "Right";
    })(Directions || (Directions = {}))
    let x = Directions.Up;
    ```
    使用常量枚举的TypeScript代码如下
    ```ts
    const enum Directions {
        Up,
        Down,
        Left,
        Right
    }
    let x = Directions.Up;
    ```
    编译后生成的JavaScript代码量较小：
    ```js
    "use strict"
    let x = 0;
    ```
### type
``type``可以为任意类型创建别名，让代码更简洁、可读性更强，同时能更方便地进行类型复用和扩展。
- 基本用法
> 类型别名``type``关键字定义，``type``后跟类型名称，例如下面代码``num``是类型别名。
```ts
type num = number;

let price: num;
price = 100;
```
- 联合类型
> 联合类型是一种高级类型，它表示一个值可以是几种不同类型之一。
```ts
type Status = number | string
type Gender = "男" | "女"

function printStatus(status:Status):void{
    console.log(status)
}
function logGender(str:Gender){
    console.log(str)
}

printStatus(404)
printStatus("403")

logGender("男")
logGender("女")

```
- 交叉类型
> 交叉类型（Intersection Types）允许将多个类型合并为一个类型。合并后的类型将拥有所有被合并类型的成员。交叉类型通常用于对象类型。

```ts
type Area = {
    height:number;
    width:number;
};

type Address = {
    num:number;
    ceil:number;
    room:string;
}

type House = Area & Address;

const house:House = {
    height:100,
    width:200,
    num:5,
    ceil:3,
    room:"903"
}
```
### 特殊情况

- 代码段1（正常）
在函数定义时，限制函数返回值为``void``，那么函数
```ts
function fn :void{
    // 返回值 undefined 合法
    return undefined

    // 其余均不合法
    return 100
    return false
    return null
    return []
}
fn()
```
- 代码段2（特殊）
使用类型声明限制函数返回值为 ``void`` 时，``TypeScript 并不会严格要求函数返回值空。
```ts
type LogFunc = () => void

const f1:LogFunc = () =>{

    return 100; // 允许返回非空值
}

const f2:LogFunc = () => 200; // 允许返回非空值

const f3:LogFunc = function(){
    return 300; // 允许返回非空值
}
```
- 为什么会这样？
是为了确保如下代码成立，我们知道 ``Array.prototype.push``的返回一个数字，而``Array.prototype.forEach``方法期望其回调的返回类型是``void``
```ts
const src = [1,2,3]
const dst = [0]

src.forEach((el) => dst.push(el));
```
> 官方文档的说明：<a href="https://www.typescriptlang.org/docs/handbook/2/functions.html#assignability-of-functions">Assignability of Functions</a>

### 类相关知识
```ts
class Person {
    name:string
    age:number
    constructor(name:string,age:number){
        this.name = name;
        this.age = age;
    }
    speak(){
        console.log(`我叫：${name}，今年${this.age}岁`)
    }
}
const p1 = new Person("Tom",22)

```
```ts
class Student extends Person{
    grade:string
    constructor(name:string,age:number,grade:string){
        super(name,age)
        this.grade = grade
    }
    // 备注：本例中若Student类不需要额外的属性，Student 的构造器可以省略
    // 重写从父类继承的方法
    override speak(){
        console.log(`我是学生，我叫${this.name}，今年${this.age}岁，在读${this.grade}年级`)
    
    }
    // 子类自己的方法
    study(){
        console.log(`${this.name}正在努力学习中......`)
    }
}
```
### 属性修饰符

| 修饰符 | 含义 | 具体规则|
| ----| ----| ----|
|``public``|公开的|可以被：``类内部``、``子类``、``类外部``访问。|
|``protected``|受保护的|可以被：``类内部``、``子类``访问。|
|``private``|私有的|可以被：``类内部``访问。|
|``readonly``|只读属性|属性无法修改。|

- public修饰符
 ```ts
class Person {
    public name:string
    public age:number
    constructor(name:string,age:number){
        this.name = name
        this.age = age
    }
    speak(){
        console.log(`我叫：${this.name}，今年${this.age}岁`)
    }
}
class Student extends Person{
    study(){
        console.log(`${this.name}正在努力学习中....`)
    }
}
const p1 = new Person("tom",12)
p1.name
p1.age
p1.speak()
 ```
- 属性的简写形式
```ts
class Person{
    constructor(public name:string,public age:number){}
}
```
- protected 修饰符
```ts
class Person {
    constructor(
        protected name:string
        protected age:number
        ){}
        protected getDetails(){
            return `我叫：${this.name}，年龄是：${this.age}`
        }
        introduce(){
            consonle.log(this.getDetails())
        }
}
class Student extends Person {
    study(){
        this.introduce()
        console.log(`${this.name}正在努力学习中......`)
    }
}
const p1 = new Student("Tom",12)
p1.study()
```

- private 修饰符
```ts
class Person {
    constructor(
        protected name:string,
        protected age:number,
        private IDCard:string
    ){}
  private getPrivateInfo(){
        return `身份证号码：${this.IDCard}`
    }
    getInfo(){
        return `我叫：${this.name}，今年刚满${this.age}岁`
    }
    getFullInfo(){
        return this.getInfo()+ "，" + this.getPrivateInfo()
    }
}
const p1 = new Person("tom",12,"121212121")
// p1.name
// p2.name
// p1.IDCard
console.log(p1.getInfo())
console.log(p2.getFullInfo())
// p1.getPrivateInfo()
```
- readonly 修饰符
```ts
class Person {
    constructor(
        public name:string,
        public readonly age:number
    ){}
}
const p1 = new Person("Tom",19)
console.log(p1)
// p1.age = 20 

```
### 抽象类
> **概述** ：抽象类是一种``无法被实例化``的类，专门用来定义类的结构和行为，类可以写``抽象方法``，也可以写``具体实现``。抽象类主要用来为其派生类提供一个``基础结构``，要求其派生类``必须实现``其中的抽象方法。
>**简记**：抽象类不能被实例化，其意义是``可以被继承``，抽象类里可以有普通方法、也可以有``抽象方法``。

通过以下场景，理解抽象类：
>我们定义一个抽象类``package``，表示所有包裹的基本结构，任何包裹都有重量属性``weight``，包裹都需要计算运费。但不同类型的包裹（如：标准速度、特快专递）都有不同的运费计算方式，因此用于计算运费的``calculate``方法是一个抽象类，必须由具体的子类来实现。
```ts
abstract class Package{
    constructor (public weight:number){}
    // 抽象方法
    abstract calculate():number
    // 具体方法
    printPackage(){
        console.log(`包裹重量为：${this.weight}，运费为${this.calculate()}元`)
    }
}

class StandardPackage extends Package{
    constructor(
        weight:number
        public unitPrice:number
    ){
        super(weight)
    }
    calculate():number{
        return this.weight * this.unitPrice;
    }
}
const s1 = new StandardPackage(10,5)
s1.printPackage()

class ExpressPackage extends Package{
    constructor(
        weight:number,
        public unitPrice:number,
        public additional:number
    ){super(weight)}
    calculate():number{
        if(this.weight > 10){
            return 10 * this.unitPrice + (this.weight - 10) * this.additional
        }else{
            return this.weight * this.unitPrice;
        }
    }
}

const e1 = new ExpressPackage(13,8,2)
e1.printPackage()
```

### interface（接口）
> ``interface``是一种``定义结构``的方式，主要作用是为：类、对象、函数等规定一种``契约``，这样可以确保代码的一致性和类型安全，但要注意``interface``只能定义格式，不能包含任何实现。

- 定义类结构
```ts
// PersonInterface接口，用于限制Person类格式
interface PersonInterface{
    name:string
    age:number
    speak(n:number):void
}
// 定义一个类Person，实现PersonInterface接口
class Person implements PersonInterface{
    constructor(
        public name:string,
        public age:number
    ){}
    // 实现接口中的 speak 方法，注意：实现speak时参数个数可以少于接口中的规定，但是不能多。
    speak(n:number):void{

    }
}
// 创建 Person 类的实例 p1
const p1 = new Person("tom",19)
p1.speak(3)
```
- 定义对象结构
```ts
interface UserInterface{
    name:string
    readonly gender: string
    age?:number
    run:(n:number) => void
}
const user:UserInterface = {
    name:"alex",
    gender:"男",
    age:18,
    run(n){
        console.log(`奔跑了${n}米`)
    }
}
```
- 定义函数结构
```ts
interface CountInterface {
    (a:number,b:number):number
}

const count:CountInterface = (x,y) => x + y
```
- 接口之间的继承
```ts
interface PersonInterface {
    name:string
    age:number
}
interface StudentInterface extends PersonInterface{
    grade:string
}

const stu: StudentInterface = {
    name:"alex",
    age:23,
    grade:"初一"
}
``` 
- 接口自动合并（可重复性）
```ts
interface PersonInterface{
    name:string,
    age:number
}
interface PersonInterface{
    gender:string
}
const p:PersonInterface = {
    name:"tom",
    age:12,
    gender:"男"
}
```
- 总结
> - **定义对象的格式**：描述数据模型，API响应格式、配置对象....等等，是开发中用得最多的场景。
> - **类的契约**：规定一个类需要实现哪些属性和方法。
> - **自动合并**：一般用于扩展第三方库的类型，这种特性在大型项目中可能用到。

### 一些相似的概念

#### interface 与 type 的区别
> - 相同点：``interface``和``type``都可以用于定义``对象结构``，两者在许多场景中是可以互换的。
> - 不同点：
>   - ``interface``：更专注于定义``对象``和``类``的结构，支持``继承``、``合并``。
>   - ``type``：可以定义``类型别名``、``联合类型``、``交叉类型``，但不支持继承和自动合并。

```ts
interface PersonInterface {
    name:string
    age:number
}
interface PersonInterface {
    speak:() => void
}
interface StudentInterface extends PersonInterface {
    grade:string
}
const student:StudentInterface = {
    name:"Alex",
    age:12,
    grade:"高二",
    speak(){
        console.log(this.name,this.age,this.grade)
    }
}

type PersonType = {
    name:string;
    age:number;
} & {
    speak:() => void;
}

type StudentType = PersonType & {
    grade:string
}
```

#### interface 和 抽象类 的区别
> - ``相同点``：都用于定义一个``类的格式``
> - ``不同点``:
>   - 接口：只能描述结构，不能有任何实现代码，一个类可以实现多个接口。
>   - 抽象类：即可以包含抽象方法，也可以包含具体方法，一个类只能继承一个抽象类。

```ts
interface FlyInterface{

}
interface SwimInterface{}

class Animal implements FlyInterface,SwimInterface{}

```

## 泛型
> 泛型允许我们在定义函数、类或接口时，使用类型参数来表示``未指定的类型``，这些参数在具体使用时，才被指定具体的类型，泛型能让同一段代码适用于多种类型，同时仍然保持类型的安全性。

举例：如下代码``<T>``就是泛型，（不一定非叫T），设置泛型后即可在函数中使用``T``来表示该类型。

- 泛型函数
```ts
function fn1<T>(data: T) {
  console.log(data)
}
fn1<number>(100)

fn1<string>("100")

fn1<boolean>(false)
```
- 泛型可以有多个
```ts
function fn2<T, U>(a: T, b: U): U | T {

  return b || a
}
const res = fn2<string, number>("11", 2)
```
 - 泛型接口
 ```ts
interface PersonInterface<T> {
  name: string
  age: number,
  action: T
}
let p1: PersonInterface<string> = {
  name: "alex",
  age: 12,
  action: "行为-----"
}
let p2: PersonInterface<number> = {
  name: "alex",
  age: 11,
  action: 1
}
console.log(p1.action)
console.log(p2.action)


type Ext = {
  id: number,
  des: string
}
let p3: PersonInterface<Ext> = {
  name: "Tom",
  age: 12,
  action: {
    id: 1,
    des: "desc"
  }
}
console.log(p3.action)
 ```
 - 泛型约束
 ```ts
interface RunInterface {
  action: {
    a: number
    b: string
  }
}
function logRun<T extends RunInterface>(R: T) {
  console.log("run---")
}
logRun({ action: { a: 1, b: "srt" } })
 ```
 - 泛型类
 ```ts
class Person<T> {
  constructor(
    public name: string,
    public age: number,
    public ext: T
  ) { }
  speak() {
    console.log(`我叫${this.name}，今年${this.age}岁了`)
    console.log(this.ext)
  }
}
const p = new Person<string>("alex", 12, "run")
p.speak()
 ```

 ## 类型声明文件
 > 类型声明文件是TypeScript 中的一种特殊文件，通常以``.d.ts``作为扩展名。它的主要作用是为现有的JavaScript代码提供类型信息，使得TypeScript能够在使用这些JavaScript库或者模块时进行类型检查和提示。

```js
export function add(a,b){
    return a + b;
}
export function mul(a,b){
    return a * b;
}
```
```ts
declare function add(a:number,b:number):number;
declare function mul(a:number,b:number):number;
```