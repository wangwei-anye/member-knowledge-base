# 文档

## 技术栈

- vue

## 环境要求

- node版本: >v8.10.0

## Node环境安装

首先下载安装[Node.js](https://nodejs.org/en/)，然后运行以下命令安装依赖包

```shell
npm install
```
### 下载更新文档

internal
```bash
npm run start internal
```

development
```bash
npm run start staging
```

master
```bash
npm run start production
```

### 拷贝更新文档

拷贝目录源 默认：/opt/app
```bash
npm run copy
```

修改拷贝目录源  /opt/aaa
```bash
npm run copy ../opt/aaa/
```


### 说明

document文件夹为  文档网站


### 强制更新

url 加上参数：action=forceUpdate