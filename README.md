# 光印 Smaptime

> Crafted By 犇犇牛科技

该项目为[七牛云 2023 年 1024 创作节校园编程马拉松](https://www.qiniu.com/activity/detail/651297ed0d50912d3d53307b)参赛作品。

## 演示地址 | Demo

[https://snaptime-web.vercel.app/](https://snaptime-web.vercel.app/)

## Snaptime 简介

光印 Snaptime 是一个专注于随时随地记录生活的 Web App。它使用了大量的 Web 领域的新技术来提升用户体验，包括但不限于 Progressive Web App、Media Source Extension、DASH 等。

该项目支持亮色和暗色两种模式，并针对移动端做了单独适配。该项目的特色是用户可以无限滚动视频，并且有非常流畅和优雅的动画，视频的预加载保证了用户无需等待视频缓冲，视频的动态码率切换也优化了用户在弱网下的体验。

## 快速开始开发 | Development Quick Start

### 包管理器 pnpm

本项目使用 `pnpm` 作为包管理器。`pnpm` 有非常多的优点，例如性能和存储空间上的优势、解决了欢迎依赖、自动解决 merge 时 lockfile 的冲突等等。详细信息请参考 [pnpm 官方文档](https://pnpm.io/)，这里不再详细列举。

你可以使用 `npm` 或 `yarn` 来安装 `pnpm`：

```bash
npm install -g pnpm
# or
yarn global add pnpm
```

你也可以使用 `corepack`：

```bash
corepack enable
```

### Git LFS

为了控制仓库的大小，并且提高 Git 性能，本仓库对一些二进制文件（例如图片、音视频等资源）使用了 LFS。如果你未安装 Git LFS，你可能无法正常 `checkout` 本仓库的部分文件，你可能会获得一个文本文件指针。

安装 Git LFS:

```bash
# macOS (using homebrew)
brew install git-lfs
# Windows (using chocolatey)
choco install git-lfs
```

在 Clone 该仓库后，在仓库目录下运行

```bash
git lfs install
```

来安装 Git LFS 相关的 Hooks。

### 安装依赖

使用 `pnpm` 安装依赖以进行开发：

```bash
pnpm install
```

### 运行开发服务器

```bash
pnpm run dev
```

### 构建

```bash
pnpm run build
```

### 部署

本项目使用 Vercel 部署。Vercel 提供了非常易用并且高性能的 CLI，可以让你在几秒钟内完成项目的部署，为你的分支快速创建一个可分享的链接。要使用 Vercel CLI 进行部署，首先需要安装 Vercel CLI：

```bash
pnpm install -g vercel
```

#### 部署开发环境

```bash
vercel
```

没错，就是这么简单。你不需要任何参数，第一次使用 Vercel CLI 时会要求你登录 Vercel 账户，你无需关心背后的复杂流程。

#### 部署正式环境

为了避免各种潜在的问题，我们不建议在本地手动部署。如果你想部署线上的正式环境，你可以向 `main` 分支提交一个 Pull Request，在被 Approved 之后将会自动在 Github Action 中进行部署。

## 项目技术栈 | Tech Stack

### UI 框架

本项目使用 React 进行 UI 的构建，所有代码均使用 TypeScript 进行编写。TypeScript 强大的类型系统可以让开发者非常方便地进行多人协作以及代码重构，可以在开发期间捕获到许多错误，类型系统提供的代码补全也极大地提升了开发者的开发体验和自信心。

### UI 组件

由于该项目的特殊性，大部分组件为自行使用 Tailwind CSS 和 styled-components 编写，其中一部分组件来自于 MUI 组件库。

### 开发与打包

我们使用 Vite 进行打包，充分利用了 ESM 的优势，可以非常快速地进行 HMR，同时也可以在生产环境中获得更好的性能。

### CSS 相关

我们使用 Tailwind CSS 和 styled-components 进行组件的样式化封装以及 CSS 的快速编写测试，Tailwind CSS 提供了非常多的实用的工具类，可以让开发者非常方便地进行样式的编写，同时也可以避免样式的冲突。Tailwind CSS 和 styled-components 的结合可以让开发者在编写 CSS 时获得更好的开发体验。

本项目还使用了 SCSS，来获得更灵活以及更强大的功能。同时，SCSS Module 也可以避免全局样式的污染。

### 状态管理与数据请求

本项目使用了 React Router 来进行路由管理，使用 React Query 来进行数据管理，使用 Redux 来进行状态管理。

### 自定义 Hooks

本项目使用了大量自定义 Hooks，这些 Hooks 来源于第三方库或者我们自己的开发。包括但不限于：

- beautiful-react-hooks
- usehooks-ts
- react-use
- react-intersection-observer

## 项目代码质量与提交标准 | Code Quality & Commit Standards

本项目使用了 [husky](https://github.com/typicode/husky), [eslint](https://eslint.org/), [lint-staged](https://github.com/lint-staged/lint-staged), [commitlint](https://github.com/conventional-changelog/commitlint) 来保证代码的高质量和一致性。

### Husky

Husky 是一个可以阻止不良 git 提交和推送的工具。它可以在 git 提交或推送时触发预定义的任务，如使用 ESLint 对代码进行 lint 检查。在本项目中，Husky 负责在提交前触发 lint-staged 和 commitlint 的检查。

Husky 的工作原理是在 .git 目录中添加一些钩子（hooks），这些钩子可以在各种 git 事件发生时触发。例如，pre-commit 钩子会在提交发生之前触发。

### ESLint

ESLint 是一个开源的 JavaScript/TypeScript 代码检查工具，用于强制执行编码标准并保持代码的一致性和可读性。在本项目中，我们启用了非常严格的 ESLint 规则，并且在每次提交前运行这些规则。

ESLint 的工作原理是通过一组可配置的规则来检查 JavaScript/TypeScript 代码中的问题。这些规则涵盖了从可能的错误（如未使用的变量）到代码风格（如缩进）的各种方面。

### lint-staged

lint-staged 是一个在 git 中运行 linter 的工具，它只检查 staged 的文件，从而提高了代码检查的效率。在与 Husky 的集成中，lint-staged 在提交前运行，只检查修改过的文件。

lint-staged 的工作原理是在 git 中找出已 staged 的文件，然后运行指定的 linter（在本项目中是 ESLint）进行检查。这样，只有修改过的文件才会被检查，从而大大提高了效率。

在本项目中，我们启用了一组严格的 ESLint 规则，以确保代码的质量和一致性。这些规则在每次提交前都会被检查，如果有任何规则被违反，提交就会被阻止。

### commitlint

commitlint 是一个帮助强制执行标准化提交信息的工具，以便更好地进行项目版本管理和跟踪。在本项目中，Husky 在提交时触发 commitlint 来检查提交信息。

commitlint 的工作原理是通过一组可配置的规则来检查 commit 信息。这些规则涵盖了从提交信息的格式（如标题和正文的长度）到提交类型（如 feat、fix、docs 等）的各种方面。

### Prettier

Prettier 是一个强大的代码格式化工具，它可以自动格式化你的代码以确保代码的一致性。在本项目中，我们在提交前运行 Prettier，以确保所有提交的代码都遵循同一的格式。

Prettier 的工作原理是通过一组内置的规则来格式化代码。这些规则涵盖了从代码的缩进和换行到引号和逗号的使用等各种方面。

## Snaptime 功能总览

- 无限视频滚动
- 视频分类，用户可以查看自己喜欢类别的视频
- 视频上传，用户可以发布视频，上传到**七牛云的 Kodo** 对象存储中
- **七牛云视频转码**，在上传视频后自动触发
- **七牛云视频截帧**，用于获取封面图
- 上传视频后自动分离音视频轨道
- 视频转码，自动转码为不同分辨率和不同码率的视频流
- 音视频独立播放，可以在自动切换视频流的时候复用音频流
- 动态码率切换
- CDN 加速，用户可以在全球范围内快速加载视频
- PWA 支持，用户可以将其安装为一个独立的 App
- 移动端适配，用户可以在移动端上无阻碍地使用 Snaptime
- 无限滚动视频
- 视频预加载
- 视频分类
- 用户注册
- 用户登录
- 评论视频
- 回复评论
- 点赞视频
- 收藏视频
- 暂停 / 播放
- 视频进度条
- 查看用户发布的其他视频
- 统一的主题色，亮色 / 暗色模式支持以及优雅的动画

## Powered By 七牛云 ｜ Delivered By 犇犇牛科技

该项目的核心功能用到了大量七牛云的服务，它们确实非常的好用（是真的），包括但不限于：

- Kodo 对象存储
- CDN 内容分发与上传加速
- 智能多媒体服务
  - 普通转码
  - 锐智转码
  - 视频截帧
