---
title: 神奇的 Javascript
date: 2018-07-10 14:15:43
tags:
- javascript
---
最近网上流传一张图，就分析了一些解析过程
![](https://image-static.segmentfault.com/166/673/1666736837-5b4bf83e88db0)

## `9 + "1"` => "91"

`ToString(9) + ToString("1")`, The Addition Operator, [step 7](#add_op_7) 
    
## `91 - "1"` => 90
`91 - ToNumber("1")`, The Subtraction Operator, [step 6](#sub_op_6) 

## `[] + []` => ""
* `ToPrimitive([]) + ToPrimitive([])`, The Addition Operator, [step 5](#add_op_5) 
* `OrdinaryToPrimitive([], number) + OrdinaryToPrimitive([], number)`, ToPrimitive, [step 2.6](#primitive_2_6)
* `let methodNames = ["valueOf", "toString"]`, OrdinaryToPrimitive, [step 4](#otprimitive_4)
* `[].valueOf()` is `[]` not `not Object`, continue for loop to `[].toString()`
* `[].toString() + [].toString()`
    

## `[] + {}` => "[object Object]"
Same as previous
## `{} + []` => 0
* The `{}` here is not parsed as an object, but instead as an empty block, see [ast](http://astexplorer.net/#/gist/23affcfe43efa0ea28b0e72ba84fd4e5/bdb4e98dcabb9b01dacf93af669ab8b1396816ec)
* `+[]`
* `ToNumber([])`, Unary + Operator, [step 2](#plus_op_2)
* `ToNumber(ToPrimitive([]))`

## `(!+[]+[]+![]).length` => 9
* `!0 + "" + ![]`
* `!0 + "" + !ToBoolean([])`, Logical NOT Operator ( ! ), [step 2](#not_op_2)
* `true + "" + false`

## `++[[]][+[]]+[+[]]` => "10"
* `++[[]][ToNumber(+[])] + [ToNumber(+[])]`, Unary + Operator, [step 2](#plus_op_2)
* `++[[]][0] + [0]`
* `++[] + [0]`
* `++ToNumber([]) + "0"`, Prefix Increment Operator, [step 2](https://www.ecma-international.org/ecma-262/9.0/index.html#sec-prefix-increment-operator)
* `++0 + "0"`

## `[] == 0` => true
* `ToPrimitive([]) == 0`, Abstract Equality Comparison, [step 9](#eq_9)
* `ToNumber("") == 0`, Abstract Equality Comparison, [step 5](#eq_5)

## `var x = [0]; x == ![x]` => true
* `ToPrimitive([x]) == false`, Abstract Equality Comparison, [step 9](#eq_9)
* `ToNumber("0") == false`

## `0.1 + 0.2 == 0.3` => false
## `6.35.toFixed(1)` => 6.3
![IEEE-754 double floating point](https://upload.wikimedia.org/wikipedia/commons/a/a9/IEEE_754_Double_Floating_Point_Format.svg)
https://github.com/camsong/blog/issues/9
https://en.wikipedia.org/wiki/Double-precision_floating-point_format


## `9999999999999999` => 10000000000000000
## `2**53 == 2**53+ 1` => true
这两个我也解释不清

## `Math.max()`, `Math.min()`
https://www.ecma-international.org/ecma-262/9.0/index.html#sec-math.max


## [The Addition Operator ( + )](https://www.ecma-international.org/ecma-262/9.0/index.html#sec-addition-operator-plus)
1. Let lref be the result of evaluating [AdditiveExpression](https://www.ecma-international.org/ecma-262/9.0/index.html#prod-AdditiveExpression).
2. Let lval be ? [GetValue](https://www.ecma-international.org/ecma-262/9.0/index.html#sec-getvalue)(lref).
3. Let rref be the result of evaluating [MultiplicativeExpression](https://www.ecma-international.org/ecma-262/9.0/index.html#prod-MultiplicativeExpression).
4. Let rval be ? [GetValue](https://www.ecma-international.org/ecma-262/9.0/index.html#sec-getvalue)(rref).
5. <span id="add_op_5">Let lprim be ? [ToPrimitive](https://www.ecma-international.org/ecma-262/9.0/index.html#sec-toprimitive)(lval).</span>
6. Let rprim be ? [ToPrimitive](https://www.ecma-international.org/ecma-262/9.0/index.html#sec-toprimitive)(rval).
7. <span id="add_op_7">If [Type](https://www.ecma-international.org/ecma-262/9.0/index.html#sec-ecmascript-data-types-and-values)(lprim) is String or [Type](https://www.ecma-international.org/ecma-262/9.0/index.html#sec-ecmascript-data-types-and-values)(rprim) is String, then</span>
    1. Let lstr be ? [ToString](https://www.ecma-international.org/ecma-262/9.0/index.html#sec-tostring)(lprim).
    2. Let rstr be ? [ToString](https://www.ecma-international.org/ecma-262/9.0/index.html#sec-tostring)(rprim).
    3. Return the [string-concatenation](https://www.ecma-international.org/ecma-262/9.0/index.html#sec-ecmascript-language-types-string-type) of lstr and rstr.
8. Let lnum be ? [ToNumber](https://www.ecma-international.org/ecma-262/9.0/index.html#sec-tonumber)(lprim).
9. Let rnum be ? [ToNumber](https://www.ecma-international.org/ecma-262/9.0/index.html#sec-tonumber)(rprim).
10. Return the result of applying the addition operation to lnum and rnum. See the Note below [12.8.5](https://www.ecma-international.org/ecma-262/9.0/index.html#sec-applying-the-additive-operators-to-numbers).

## [ToPrimitive ( input [ , PreferredType ] )](https://www.ecma-international.org/ecma-262/9.0/index.html#sec-toprimitive)

The abstract operation ToPrimitive takes an input argument and an optional argument PreferredType. The abstract operation ToPrimitive converts its input argument to a non-Object type. If an object is capable of converting to more than one primitive type, it may use the optional hint PreferredType to favour that type. Conversion occurs according to the following algorithm:

1. [Assert](https://www.ecma-international.org/ecma-262/9.0/index.html#assert): input is an [ECMAScript language value](https://www.ecma-international.org/ecma-262/9.0/index.html#sec-ecmascript-language-types).
2. If [Type](https://www.ecma-international.org/ecma-262/9.0/index.html#sec-ecmascript-data-types-and-values)(input) is Object, then
    1. If PreferredType is not present, let hint be `"default"`.
    2. Else if PreferredType is hint String, let hint be `"string"`.
    3. Else PreferredType is hint Number, let hint be `"number"`.
    4. Let exoticToPrim be ? [GetMethod](https://www.ecma-international.org/ecma-262/9.0/index.html#sec-getmethod)(input, @@toPrimitive).
    5. If exoticToPrim is not undefined, then
        1. Let result be ? [Call](https://www.ecma-international.org/ecma-262/9.0/index.html#sec-call)(exoticToPrim, input, « hint »).
        2. If [Type](https://www.ecma-international.org/ecma-262/9.0/index.html#sec-ecmascript-data-types-and-values)(result) is not Object, return result.
        3. Throw a TypeError exception.
    6. <span id="primitive_2_6">If hint is `"default"`, set hint to `"number"`.</span>
    7. Return ? [OrdinaryToPrimitive](https://www.ecma-international.org/ecma-262/9.0/index.html#sec-ordinarytoprimitive)(input, hint).
3. Return input.

## [OrdinaryToPrimitive ( O, hint )](https://www.ecma-international.org/ecma-262/9.0/index.html#sec-ordinarytoprimitive)

When the abstract operation OrdinaryToPrimitive is called with arguments O and hint, the following steps are taken:

1. [Assert](https://www.ecma-international.org/ecma-262/9.0/index.html#assert): [Type](https://www.ecma-international.org/ecma-262/9.0/index.html#sec-ecmascript-data-types-and-values)(O) is Object.
2. [Assert](https://www.ecma-international.org/ecma-262/9.0/index.html#assert): [Type](https://www.ecma-international.org/ecma-262/9.0/index.html#sec-ecmascript-data-types-and-values)(hint) is String and its value is either `"string"` or `"number"`.
3. If hint is `"string"`, then
    1. Let methodNames be « `"toString"`, `"valueOf"` ».
4. <span id="otprimitive_4">Else,
    1. Let methodNames be « `"valueOf"`, `"toString"` ».
    </span>
5. For each name in methodNames in [List](https://www.ecma-international.org/ecma-262/9.0/index.html#sec-list-and-record-specification-type) order, do
    1. Let method be ? [Get](https://www.ecma-international.org/ecma-262/9.0/index.html#sec-get-o-p)(O, name).
    2. If [IsCallable](https://www.ecma-international.org/ecma-262/9.0/index.html#sec-iscallable)(method) is true, then
        1. Let result be ? [Call](https://www.ecma-international.org/ecma-262/9.0/index.html#sec-call)(method, O).
        2. If [Type](https://www.ecma-international.org/ecma-262/9.0/index.html#sec-ecmascript-data-types-and-values)(result) is not Object, return result.
6. Throw a TypeError exception.

## [The Subtraction Operator ( - )](https://www.ecma-international.org/ecma-262/9.0/index.html#sec-subtraction-operator-minus)
1. Let lref be the result of evaluating [AdditiveExpression](https://www.ecma-international.org/ecma-262/9.0/index.html#prod-AdditiveExpression).
2. Let lval be ? [GetValue](https://www.ecma-international.org/ecma-262/9.0/index.html#sec-getvalue)(lref).
3. Let rref be the result of evaluating [MultiplicativeExpression](https://www.ecma-international.org/ecma-262/9.0/index.html#prod-MultiplicativeExpression).
4. Let rval be ? [GetValue](https://www.ecma-international.org/ecma-262/9.0/index.html#sec-getvalue)(rref).
5. Let lnum be ? [ToNumber](https://www.ecma-international.org/ecma-262/9.0/index.html#sec-tonumber)(lval).
6. <span id="sub_op_6">Let rnum be ? [ToNumber](https://www.ecma-international.org/ecma-262/9.0/index.html#sec-tonumber)(rval).</span>
7. Return the result of applying the subtraction operation to lnum and rnum. See the note below [12.8.5](https://www.ecma-international.org/ecma-262/9.0/index.html#sec-applying-the-additive-operators-to-numbers).

## [Abstract Equality Comparison](https://www.ecma-international.org/ecma-262/9.0/index.html#sec-abstract-equality-comparison)
The comparison x == y, where x and y are values, produces true or false. Such a comparison is performed as follows:

1. If [Type](https://www.ecma-international.org/ecma-262/9.0/index.html#sec-ecmascript-data-types-and-values)(x) is the same as [Type](https://www.ecma-international.org/ecma-262/9.0/index.html#sec-ecmascript-data-types-and-values)(y), then
    1. Return the result of performing [Strict Equality Comparison](https://www.ecma-international.org/ecma-262/9.0/index.html#sec-strict-equality-comparison) x === y.
2. If x is null and y is undefined, return true.
3. If x is undefined and y is null, return true.
4. If [Type](https://www.ecma-international.org/ecma-262/9.0/index.html#sec-ecmascript-data-types-and-values)(x) is Number and [Type](https://www.ecma-international.org/ecma-262/9.0/index.html#sec-ecmascript-data-types-and-values)(y) is String, return the result of the comparison x == ! [ToNumber](https://www.ecma-international.org/ecma-262/9.0/index.html#sec-tonumber)(y).
5. <span id="eq_5">If [Type](https://www.ecma-international.org/ecma-262/9.0/index.html#sec-ecmascript-data-types-and-values)(x) is String and [Type](https://www.ecma-international.org/ecma-262/9.0/index.html#sec-ecmascript-data-types-and-values)(y) is Number, return the result of the comparison ! [ToNumber](https://www.ecma-international.org/ecma-262/9.0/index.html#sec-tonumber)(x) == y.</span>
6. If [Type](https://www.ecma-international.org/ecma-262/9.0/index.html#sec-ecmascript-data-types-and-values)(x) is Boolean, return the result of the comparison ! [ToNumber](https://www.ecma-international.org/ecma-262/9.0/index.html#sec-tonumber)(x) == y.
7. If [Type](https://www.ecma-international.org/ecma-262/9.0/index.html#sec-ecmascript-data-types-and-values)(y) is Boolean, return the result of the comparison x == ! [ToNumber](https://www.ecma-international.org/ecma-262/9.0/index.html#sec-tonumber)(y).
8. If [Type](https://www.ecma-international.org/ecma-262/9.0/index.html#sec-ecmascript-data-types-and-values)(x) is either String, Number, or Symbol and [Type](https://www.ecma-international.org/ecma-262/9.0/index.html#sec-ecmascript-data-types-and-values)(y) is Object, return the result of the comparison x == [ToPrimitive](https://www.ecma-international.org/ecma-262/9.0/index.html#sec-toprimitive)(y).
9. <span id="eq_9">If [Type](https://www.ecma-international.org/ecma-262/9.0/index.html#sec-ecmascript-data-types-and-values)(x) is Object and [Type](https://www.ecma-international.org/ecma-262/9.0/index.html#sec-ecmascript-data-types-and-values)(y) is either String, Number, or Symbol, return the result of the comparison [ToPrimitive](https://www.ecma-international.org/ecma-262/9.0/index.html#sec-toprimitive)(x) == y.</span>
10. Return false.

## [Logical NOT Operator ( ! )](https://www.ecma-international.org/ecma-262/9.0/index.html#sec-logical-not-operator)


1. Let expr be the result of evaluating [UnaryExpression](https://www.ecma-international.org/ecma-262/9.0/index.html#prod-UnaryExpression).
2. <span id="not_op_2">Let oldValue be [ToBoolean](https://www.ecma-international.org/ecma-262/9.0/index.html#sec-toboolean)(? [GetValue](https://www.ecma-international.org/ecma-262/9.0/index.html#sec-getvalue)(expr)).</span>
3. If oldValue is true, return false.
4. Return true.

## [Unary + Operator](https://www.ecma-international.org/ecma-262/9.0/index.html#sec-unary-plus-operator)
1. Let expr be the result of evaluating [UnaryExpression](https://www.ecma-international.org/ecma-262/9.0/index.html#prod-UnaryExpression).
2. <span id=plus_op_2 >Return ? [ToNumber](https://www.ecma-international.org/ecma-262/9.0/index.html#sec-tonumber)(? [GetValue](https://www.ecma-international.org/ecma-262/9.0/index.html#sec-getvalue)(expr)).</span>




https://www.ecma-international.org/ecma-262/9.0/index.html#sec-returnifabrupt-shorthands
