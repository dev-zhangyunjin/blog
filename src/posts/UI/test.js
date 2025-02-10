// const fetchUser = (id) => {
//     new Promise((resolve, reject) => {

//         setTimeout(() => {
//             console.log("fetch id===> ", id);

//             resolve(id)
//         }, 3000)
//     })
// }
// const cache = {};
// const getUser = id => {
//     if (cache[id]) {
//         return cache[id]
//     }
//     cache[id] = fetchUser(id);
//     return cache[id];
// }
// getUser(1)

// getUser(1)

// getUser(1)


// console.log(typeof 123);
// console.log(0xff);
// console.log("二进制：", 0b10101);//21
// console.log("八进制", 0o123);
// console.log(3.14);
// console.log(.333333333);
// console.log(3e2);//300
// console.log(3e-2);//0.03
// console.log(3.141111111E-32);//3.141111111e-32

// console.log(1_000_000);
// console.log(0x89_ab_cd_ef);
// console.log(0o1234_567);
// console.log(0.3_12121_111);



// 2 的 53 次方
// console.log(Math.pow(2, 53));
// // 舍入到最接近的整数
// console.log(Math.round(.6)); // 1
// console.log(Math.round(.4)); // 0
// // 向上取整
// console.log(Math.ceil(.6)); //1
// // 向下取整
// console.log(Math.floor(.6)); //0
// // 绝对值
// console.log(Math.abs(-1)); // 1
// // 取最大值
// console.log(Math.max(1, 2, 3, 4, 5)); // 5
// // 取最小值
// console.log(Math.min(1, 2, 3, 4, 5)); // 1
// // 随机数 0 <= x < 1
// console.log(Math.random());
// // π 圆周率
// console.log(Math.PI);
// // 自然数对的底数
// console.log(Math.E);
// // 平方根
// console.log(Math.sqrt(4));
// // 立方根
// console.log(Math.pow(8, 1 / 3));
// // 三角函数
// console.log(Math.sin(0));
// console.log(Math.cos(0));
// console.log(Math.tan(0));
// console.log(Math.asin(0));
// // 10 的自然数对
// console.log(Math.log(10));
// console.log(0 / 0); // NaN
// console.log(1 / 0); // Infinity
// console.log(Number.MAX_VALUE * 2); // Infinity
// console.log(-Number.MAX_VALUE * 2); // -Infinity
// console.log(-Number.MIN_VALUE / 2); // -0
// console.log(NaN === NaN);

// console.log(Number.isNaN(NaN)); // true
// console.log(Number.isNaN(1)); // false

// console.log(isNaN(NaN));

// console.log(.3 - .2); // 0.09999999999999998
// console.log(.2 - .1); // 0.1
// console.log(.1 + .2);
// console.log(12345n);

console.log(1234n); // 1234n
console.log(0b111111111111n); // 4095n
console.log(0o77777777777n); // 8589934591n
console.log(0xffffffffffffn); // 281474976710655n




