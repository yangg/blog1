---
title: 自定义 Mac Cocoa 快捷键
date: 2019-08-06 21:33:06
tags:
- mac
- system
---
刚接触 Mac 时，最喜欢的就是 Mac 所有输入框都有类似 Emacs 的快捷键（因为有过 vim 和 Emacs 经验），日常也经常使用这些快捷键。
一直不知道原来这些快捷键还可以自定义，今天因为 iTerm2 里无法使用 `Option + .` 快捷键的问题，搜索到一个回答提到了怎么自定义这些快捷键。

## Customize the behavior of Cocoa’s text system
[苹果关于 Cocoa 的文档](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/EventOverview/TextDefaultsBindings/TextDefaultsBindings.html)

下面是我的配置（在 MWeb 和 TextMate 里测试通过）：
* 更多 emacs 里移动和删除单词的
* 选中单词的
* Vscode 里很喜欢的上下移动行及往上下复制行的快捷键（使用了 vim 里的上下 j, k）

```
// 在 ~/Library/KeyBindings/ 目录下添加 DefaultKeyBinding.dict 文件，这个目录默认不存在，先创建
// targetDir=~/Library/KeyBindings; [ -d $targetDir ] || mkdir $targetDir; ln -sf ~/Dropbox/conf/DefaultKeyBinding.dict $targetDir
// 此文件更改后，完全退出某个 app，重新打开即可使用
{
    /* Additional Emacs bindings */
    "~f" = "moveWordForward:";
    "~b" = "moveWordBackward:";
    "~d" = "deleteWordForward:";
    "~h" = "deleteWordBackward:";
    "~<" = "moveToBeginningOfDocument:";
    "~>" = "moveToEndOfDocument:";
    "~v" = "pageUp:"; /* ^v pageDown */
    // selections
    "~F" = "moveWordForwardAndModifySelection:";
    "~B" = "moveWordBackwardAndModifySelection:";
    "^," = "moveToBeginningOfDocumentAndModifySelection:"; /* select to beginning */
    "^." = "moveToEndOfDocumentAndModifySelection:"; /* select to ending */
    "~l" = "selectLine:";
    // compounds
    // "~t" = "moveToBeginningOfLine:"; // this two line is for debugging
    // "~y" = "deleteToEndOfLine:";
    "^K" = ("moveToBeginningOfLine:", "deleteToEndOfLine:", "deleteForward:");
    "~j" = ("moveToBeginningOfLine:", "deleteToEndOfLine:", "deleteForward:", "moveDown:", "yank:", "insertNewlineIgnoringFieldEditor:", "moveBackward:");
    "~k" = ("moveToBeginningOfLine:", "deleteToEndOfLine:", "deleteBackward:", "moveUp:", "moveToEndOfLine:", "insertNewlineIgnoringFieldEditor:", "yank:");
    "~J" = ("moveToBeginningOfLine:", "deleteToEndOfLine:", "yank:", "insertNewlineIgnoringFieldEditor:", "yank:");
    "~K" = ("moveToBeginningOfLine:", "deleteToEndOfLine:", "yank:", "insertNewlineIgnoringFieldEditor:", "yank:", "moveUp:");
    // "~K" = ("moveToBeginningOfLine:", "deleteToEndOfLine:", "yank:", "moveToBeginningOfLine:", "yank:", "insertNewlineIgnoringFieldEditor:", "moveBackward:");
}
```
Cocoa 默认快捷键定义在（可以看看哪些不知道的）：
`/System/Library/Frameworks/AppKit.framework/Resources/StandardKeyBinding.dict`

##  iTerm2 里无法使用 `Option + .` 问题
`Preferences - Profiles - Keys`
将下面的 `Left ⌥ Key` 改为 `Esc+` 就可以了

## 参考
[Cocoa 常用命令](https://www.hcs.harvard.edu/~jrus/site/selectors.html)