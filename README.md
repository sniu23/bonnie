# vscode config

```json
"files.autoSave":"off",
"eslint.validate": [
    "javascript",
    "javascriptreact",
    "html",
    { "language": "vue", "autoFix": true }
],
"eslint.options": {
    "plugins": ["html"]
}
```

# build

``` bash
# Clone project
git clone https://github.com/sniu23/bonnie.git

# Install dependencies
npm install
# npm install --registry=https://registry.npm.taobao.org

# serve with hot reload at localhost:9528
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

# easy-mock

|easy-mock|axios|eggjs|
|-|-|-|
|_req.params| |params|
|_req.query|params|query|
|_req.body|data|body|

em.demo.all

# icon

[阿里巴巴矢量图标库](http://www.iconfont.cn/)

1. `我的项目`定义：
    - `FontClass/Symbol前缀` ：`el-icon-x`
    - `Font Family` : `FontFamily`
2. 下载图标到`我的项目`
3. 下载项目后解压复制到`src/asset/icon`

```css
<!-- 修改 iconfont.css，添加信息 -->
[class^="el-icon-ump"], [class*=" el-icon-ump"] {
  font-family:"fontFamily" !important;
  /* 以下内容参照第三方图标库本身的规则 */
  font-size: 18px;
  font-style:normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

```scss
@import '../assets/icon/iconfont.css';
```

```html
<!--icon 或 class 两种方式：-->
<el-button size="small" icon="x-addition" >按钮1
</el-button>
<i class="el-icon-x-addition" @click="handleAdd"/>
```

