#### 创建本地服务，及服务代理
### create http proxy and static service

### TODO
> 确保你的 nodejs 版本 >= 8.0.0，
> 解决跨域问题，支持本地开发热更新

---------------
### 安装（install）

```bash
yarn add @gauseen/web-proxy -D

or

npm i @gauseen/web-proxy -D
```

### 使用（usage）

```js
// 首先，在项目根目录创建 server.js 文件
```

```js
// server.js
// 例子：

const path = require('path')
const server = require('@gauseen/web-proxy')

const options = {
	watch: false,
	watchStatic: path.join(__dirname, './demo/'),
	serverStatic: path.join(__dirname, './'),
	port: 8008,
	proxyTable: {
		'/api': { target: 'http://doman.com/', }
	},
	
}

server(options)
```
### options 参数说明：

| 参数 | 说明 | 类型 | 默认 | 必选 |
|-----|-----|-----|-----|-----|-----|
| `watch` | 是否开启热更新 | `Boolean` | `false` | 是 |
| `watchStatic` | 热更新目录 | `String` | | 是 |
| `serverStatic` | 静态服务目录 | `String` | | 是 |
| `proxyTable` | 要代理的 `doman` | `Object` | | 是 |
| `port` | 端口 | `Number` | `8008` | 否 |

### 注：
`proxyTable` 是个对象，
键 为: 请求 URL 的统一标识字段，
值 为: `{ target: 要代理的（域名或IP） doman }`

#### 如果好用还望给个 Star， 您的 Star 是我最大的动力，谢谢！
[GitHub 地址](git@github.com:gauseen/web-proxy.git)