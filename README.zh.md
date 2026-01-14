# react-native-easy-toast

一款简单易用的 Toast 组件，支持 Android&iOS。

[ ![release](https://img.shields.io/github/release/crazycodeboy/react-native-easy-toast.svg?maxAge=2592000?style=flat-square)](https://github.com/crazycodeboy/react-native-easy-toast/releases)
[ ![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen.svg)](https://github.com/crazycodeboy/react-native-easy-toast/pulls)
[ ![NPM version](http://img.shields.io/npm/v/react-native-easy-toast.svg?style=flat)](https://www.npmjs.com/package/react-native-easy-toast)
[![License MIT](http://img.shields.io/badge/license-MIT-orange.svg?style=flat)](https://raw.githubusercontent.com/crazycodeboy/react-native-easy-toast/master/LICENSE)
[ ![language English](https://img.shields.io/badge/language-English-yellow.svg)](https://github.com/crazycodeboy/react-native-easy-toast/)

## 目录

- [安装](#安装)
- [Demo](#demo)
- [如何使用？](#如何使用？)
- [API](#api)
- [贡献](#contribution)

## 安装

- 1.在终端运行 `npm i react-native-easy-toast --save`
  - 或者 `yarn add react-native-easy-toast`
- 2.在要使用`Toast`的 js 文件中添加`import Toast, {DURATION} from 'react-native-easy-toast'`

兼容 React Native `>=0.71` 与 React `>=17`。

## Demo

- [Examples](https://github.com/crazycodeboy/react-native-easy-toast/tree/master/examples)

![Screenshots](https://raw.githubusercontent.com/crazycodeboy/react-native-easy-toast/master/examples/Screenshots/react-native-easy-toast-screenshots.gif)

## 如何使用？

> 第一步：

在你的 js 文件中导入 `react-native-easy-toast`：

`import Toast, {DURATION} from 'react-native-easy-toast'`

> 第二步：

将下面代码插入到`render()`方法中：

```javascript
 render() {
     return (
         <View>
             ...
            <Toast ref={(toast) => this.toast = toast}/>
         </View>
     );
 }
```

> <span style="color:red">注意: 请将`<Toast ref={(toast) => this.toast = toast}/>` 放在最外层 View 的底部。</span>

> 第三步：

使用：

```javascript
this.toast.show('hello world!');
```

在需要弹出提示框时使用上面代码即可。

或者像这样

```javascript
this.toast.show(
  <View>
    <Text>hello world!</Text>
  </View>,
);
```

### 用例

```javascript
render() {
return (
    <View>
        <Button title={'Press me'} onPress={()=>{
            this.toast.show('hello world!',2000);
        }}/>
        <Toast ref={(toast) => this.toast = toast}/>
    </View>
);
    }
```

### 自定义 Toast

```javascript
render() {
    return (
        <View>
            <Button title={'Press me'} onPress={()=>{
                    this.toast.show('hello world!',2000);
                }}/>
            <Toast
                ref={(toast) => this.toast = toast}
                style={{backgroundColor:'red'}}
                position='top'
                positionValue={200}
                fadeInDuration={750}
                fadeOutDuration={1000}
                opacity={0.8}
                textStyle={{color:'red'}}
            />
        </View>
    );
}
```

**更多用例:**

[GitHubPopular](https://github.com/crazycodeboy/GitHubPopular/blob/develop/js/page/SearchPage.js)

## API

| 属性               | 类型                                         | 可选 | 默认值                                                     | 描述                           |
| ------------------ | -------------------------------------------- | ---- | ---------------------------------------------------------- | ------------------------------ |
| style              | `StyleProp<ViewStyle>`                       | true | `{backgroundColor: 'black', borderRadius: 5, padding: 10}` | 自定义 Toast 容器样式          |
| position           | `PropTypes.oneOf(['top','center','bottom'])` | true | `'bottom'`                                                 | 自定义 Toast 位置              |
| positionValue      | `number`                                     | true | `120`                                                      | Toast 位置偏移                 |
| fadeInDuration     | `number`                                     | true | `500`                                                      | Toast 淡入时间 (ms)            |
| fadeOutDuration    | `number`                                     | true | `500`                                                      | Toast 淡出时间 (ms)            |
| opacity            | `number`                                     | true | `1`                                                        | Toast 目标透明度               |
| textStyle          | `StyleProp<TextStyle>`                       | true | `{color:'white'}`                                          | 文本样式                       |
| useNativeAnimation | `boolean`                                    | true | `true`                                                     | 是否使用原生动画驱动           |
| hideOnPress        | `boolean`                                    | true | `true`                                                     | 点击时是否自动关闭             |
| defaultCloseDelay  | `number`                                     | true | `250`                                                      | FOREVER 模式或点击关闭时的延迟 |
| onPress            | `function`                                   | true | -                                                          | 点击回调，先于自动关闭触发     |

| 方法                                    | 类型     | 可选  | 描述                                     |
| --------------------------------------- | -------- | ----- | ---------------------------------------- |
| show(text, duration, callback, onPress) | function | false | 弹出提示框(毫秒)，可带关闭回调与点击回调 |
| close()                                 | function | true  | 手动关闭提示框                           |

## 贡献

欢迎大家提 Issues。如果能为 Issues 配一个异常或报错的截图，能帮助我快速的定位问题和解决问题。  
另外欢迎大家 Pull requests，为项目贡献的智慧。

---

**MIT Licensed**  
大家可以自由复制和转载。
