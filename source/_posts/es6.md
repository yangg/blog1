---
title: es6 语法简介
tags:
  - es6
date: 2016-06-08 09:15:36
---

*更简单高效的编写 JavaScript*

## let 块级作用域
```js
{
  let a = 10;
  var b = 1;
}

a // ReferenceError: a is not defined.
b // 1

var a = [];
for (let i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 6
```
<!--more-->
## 析构赋值
```js
var [a, b, c] = [1, 2, 3];

let [foo, [[bar], baz]] = [1, [[2], 3]]; // 嵌套
foo // 1
bar // 2
baz // 3

let [ , , third] = ["foo", "bar", "baz"]; // ignore
third // "baz"

let [head, ...tail] = [1, 2, 3, 4]; // rest
head // 1
tail // [2, 3, 4]

let [x, y, ...z] = ['a']; //  rest 未定义
x // "a"
y // undefined
z // []
```
### 默认值
```js
var [foo = true] = [];
foo // true

[x, y = 'b'] = ['a']; // x='a', y='b', 必须已经声明
[x, y = 'b', z = 3] = ['a', undefined, null]; // x='a', y='b', z = null
[greet = getLabel() ] = ["Hello"]
```

### 对象
```js
var { bar, foo, xxx } = { foo: "aaa", bar: "bbb", other: "not referenced" };
foo // "aaa"
bar // "bbb"
xxx // undefined

let obj = { first: 'hello', last: 'world' };
let { first: f, last: l } = obj;
f // 'hello'
l // 'world'

// 嵌套, default value
var obj = {
  p: [
    "Hello",
    { y: "World" }
  ]
};
var { p: [x, { y }], m: n = "default value" } = obj;
p // error: p is undefined
x // "Hello"
y // "World"

var x;
{x} = {x: 1};
// SyntaxError: syntax error
({x} = {x: 1});
```

### 用途
```js
function linkBtn({width =  100, cls = "btn"} = {}) { // 函数默认值
  console.log(width, cls);
}
linkBtn()
linkBtn({ width: 50});
linkBtn({ width: 50, cls: "btn btn-primary"});

function example() {
  return {
    foo: 1,
    bar: 2
  };
}
var { foo, bar } = example(); // 函数返回多个值，数组也可以，或者解析 json 对象
import React, {Component, PropTypes}  from 'react';
```

## 字符串
### 模板字符串
```js
var name = "Brook", time = "today", info = { company: "juanpi" };
var text = `Good ${time},
this is ${name}! I'm work at ${info.company + '.com'}
${foo()}` // 支持表达式(变量，数组，对象，运算符，方法)解析，及换行
```
### startsWith, endsWith, includes (indexOf), repeat
```js
var s = 'Hello world!';
console.log (s.startsWith('Hello')) // true
console.log (s.endsWith('!')) // true
console.log (s.includes('o')) // true
console.log (s.repeat(2));
```
<!--## padStart()，padEnd() es7-->

## 数组
```js
// find, findIndex
[1, 4, -5, 10].find(n => n < 0) // -5
[1, 5, 10, 15].findIndex(n => n > 9) // 2
// includes
[1, 2, NaN].includes(NaN); // true
```
## 函数
```js
function foo(config = {}) {} // 默认参数
function push(arr, ...items) {} // rest参数
push(a, ...[1, 2, 3]) // 拓展运算符

[11, 2, 3].sort((a, b) => a - b);
```
### 函数绑定
```js
foo::bar; // 等同于 bar.bind(foo);
foo::bar(...arguments); // 等同于bar.apply(foo, arguments);
let log = ::console.log; // 等同于var log = console.log.bind(console);
```
## 对象
```js
var Person = {
  name: '张三',
  birth, //等同于birth: birth
  hello() { // 等同于hello: function ()
  }
};

// Object.assign
var target = { a: 1 };
var source1 = { b: 2 };
var source2 = { c: 3 };
Object.assign(target, source1, source2);
target // {a:1, b:2, c:3}
```

## Class
```js
// 只要是一个有prototype属性的函数，就能被B继承
class VersionedArray extends Array {
  constructor(...args) {
    super(...args);
    // super.push(), super.length
    this.history = [[]];
  }
  commit() {
    this.history.push(this.slice());
  }
  revert() {
    this.splice(0, this.length, ...this.history[this.history.length - 1]);
  }
  get length() {
    return this.history;
  }
  set length(value) {
    console.log('length: ');
    this.history.length = value;
  }
  // 没有静态属性
  static classMethod() {
    return 'hello';
  }
}
var x = new VersionedArray();
```


## 创建模块
   Class vs React.createClass vs stateless

  - 如果你的模块有内部状态或者是`refs`, 推荐使用 `class extends React.Component` 而不是 `React.createClass` ,除非你有充足的理由来使用这些方法.
  eslint: [`react/prefer-es6-class`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prefer-es6-class.md) [`react/prefer-stateless-function`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prefer-stateless-function.md)

    ```jsx
    // bad
    const Listing = React.createClass({
      // ...
      render() {
        return <div>{this.state.hello}</div>;
      }
    });

    // good
    class Listing extends React.Component {
      // ...
      render() {
        return <div>{this.state.hello}</div>;
      }
    }
    export default Listing;
    ```


## Naming 命名

  - **扩展名**: React模块使用 `.jsx` 扩展名.
  - **文件名**: 文件名使用驼峰式. 如, `ReservationCard.jsx`.
  - **引用命名**: React模块名使用驼峰式命名，实例使用骆驼式命名. eslint: [`react/jsx-pascal-case`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-pascal-case.md)

    ```jsx
    // bad
    import reservationCard from './ReservationCard';

    // good
    import ReservationCard from './ReservationCard';

    // bad
    const ReservationItem = <ReservationCard />;

    // good
    const reservationItem = <ReservationCard />;
    ```

  - **模块命名**: 模块使用当前文件名一样的名称. 比如 `ReservationCard.jsx` 应该包含名为 `ReservationCard`的模块. 但是，如果整个文件夹是一个模块，使用 `index.js`作为入口文件，然后直接使用 `index.js` 或者文件夹名作为模块的名称:

    ```jsx
    // bad
    import Footer from './Footer/Footer';

    // bad
    import Footer from './Footer/index';

    // good
    import Footer from './Footer';
    ```

## Props 属性

  - JSX属性名使用骆驼式风格`camelCase`.

    ```jsx
    // bad
    <Foo
      UserName="hello"
      phone_number={12345678}
    />

    // good
    <Foo
      userName="hello"
      phoneNumber={12345678}
    />
    ```

## Parentheses 括号

  - 将多行的JSX标签写在 `()`里. eslint: [`react/wrap-multilines`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/wrap-multilines.md)

    ```jsx
    // bad
    render() {
      return <MyComponent className="long body" foo="bar">
               <MyChild />
             </MyComponent>;
    }

    // good
    render() {
      return (
        <MyComponent className="long body" foo="bar">
          <MyChild />
        </MyComponent>
      );
    }

    // good, 单行可以不需要
    render() {
      const body = <div>hello</div>;
      return <MyComponent>{body}</MyComponent>;
    }
    ```

  - 当在 `render()` 里使用事件处理方法时，提前在构造函数里把 `this` 绑定上去. eslint: [`react/jsx-no-bind`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md)

  > 为什么? 在每次 `render` 过程中， 再调用 `bind` 都会新建一个新的函数，浪费资源.

```jsx
// bad
class extends React.Component {
  onClickDiv() {
    // do stuff
  }

  render() {
    return <div onClick={this.onClickDiv.bind(this)} />
  }
}

// good
class extends React.Component {
  constructor(props) {
    super(props);

    this.onClickDiv = this.onClickDiv.bind(this);
  }

  onClickDiv() {
    // do stuff
  }

  render() {
    return <div onClick={this.onClickDiv} />
  }
}
```

