#### 创建本地服务，及服务代理，支持热更新
### Create http proxy and Hot update

### TODO

#### 特别针对老型项目设计，没有使用构建工具（ webpack、gulp、grunt etc.）

> 确保你的 nodejs 版本 >= 8.0.0，
> 解决跨域问题，支持本地开发热更新

---------------
### 安装（install）

```bash
yarn add @gauseen/web-proxy -D

# or

npm i @gauseen/web-proxy -D
```

### 使用（usage）

```js
// 首先，在项目根目录创建 server.js 文件
```

```js
// 例子：
// server.js

const path = require('path')
const server = require('@gauseen/web-proxy')

const options = {
	watch: false,
	watchStatic: path.join(__dirname, './demo/'),
	serverStatic: path.join(__dirname, './'),
	port: 8008,
	proxyTable: {
		'/api': { target: 'http://doman.com/', }
		'/apiFlag': {
			target: 'http://doman.com/',
			pathRewrite: {
				// ^/old-path' : '/new-path
				// 下面配置是将，/apiFlag 开头的请求，重写为 /newFlag，也可为 '' (空)
                '^/apiFlag': '/newFlag',
            }
		}
	},
	
}

server(options)
```

### options 参数说明：
| 参数 | 说明 | 类型 | 默认 | 是否必选 |
|------|-------|---------|-------|--------|
| `watch` | 是否开启热更新 | `Boolean` | `false` | 是 |
| `watchStatic` | 热更新目录 | `String` | | 是 |
| `serverStatic` | 静态服务目录 | `String` | | 是 |
| `proxyTable` | 要代理的 `doman` | `Object` | | 是 |
| `port` | 端口 | `Number` | `8008` | 否 |

### 启动服务

```bash
node server.js
# 或
# 自己配置 npm scripts 运行
```

### 注：
```bash
proxyTable 是个对象，

键 为: 请求 URL 的统一标识字段，如请求接口：http://doman/api/back/login，那么 api 就是它的标识字段

值 为: {
	target: 要代理的（域名或IP） doman, # (必填)
	pathRewrite: { '^/oldFlag': '/newFlag', } # (非必填)
}

pathRewrite 字段作用是防止后端接口比较混乱，没有统一的标识符，
这时前端在本地开发时，可以自己添加一个统一标识符，并使用 pathRewrite 的功能，再让这个字段设置为空字符，这样就可以请求到本来的 URL
```

#### 如果好用还望给个 Star， 您的 Star 是我最大的动力，谢谢！

[GitHub 地址](https://github.com/gauseen/web-proxy)