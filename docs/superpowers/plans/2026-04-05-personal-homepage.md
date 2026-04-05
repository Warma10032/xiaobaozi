# 个人主页设计方案

## 1. Concept & Vision

打造一个 **Anthropic 风格**的极简个人主页，作为在互联网上的门面。黑白灰为主色调，大量留白，线条动画营造高级感。首页即能介绍本人，让人想继续往下看。实时获取各平台数据展示影响力。

## 2. Design Language

### 美学方向
- **Anthropic 官方风格**：简洁、精致、有层次感
- 黑白灰为主，蓝色(#0066CC)为链接强调色
- 等宽字体，代码感

### 配色
- Background: `#FFFFFF` / `#FAFAFA`
- Text: `#1A1A1A` / `#666666`
- Border: `#E5E5E5`
- Accent: `#0066CC`
- Muted: `#999999`

### 字体
- 主字体: `JetBrains Mono`, `SF Mono`, `Consolas`, monospace
- 正文: `Inter`, system-ui, sans-serif

### 动画
- 线条动画背景（Canvas/SVG），Anthropic 标志性风格
- 页面加载淡入
- Hover 微交互

## 3. Layout & Structure

```
┌─────────────────────────────────────────────────────────────┐
│                    [线条动画 Canvas]                         │
│                                                             │
│                      ○ 一只小包子                            │
│                   Warma10032 ✦                               │
│              东南大学 · 全栈开发 · AI 爱好者                   │
│                                                             │
│              ┌──────────────────────────┐                   │
│              │ GitHub  B站  爱发电  小红书 │                   │
│              │  ⭐582   👥2.1w   💫128  👥328  │           │
│              └──────────────────────────┘                   │
│                                                             │
│                        ↓ 滚动引导线                           │
└─────────────────────────────────────────────────────────────┘

[About Me] - 个人简介

[GitHub Projects] - 4个精选项目卡片

[我在互联网上的作品] - 8个子站网格导航

[最近在做些什么] - 从memo RSS获取的最近动态

[Footer] - 联系方式
```

## 4. Features & Interactions

### 实时数据展示
- GitHub star 数（个人总star）
- B站粉丝数（space.bilibili.com/397711814）
- 爱发电支持者数（afdian.com/a/Warma10032）
- 小红书粉丝数（账号id: 450821311）

### RSS 动态
- 从 memo.xiaobaozi.cn RSS 获取最近 5-10 条
- 展示时间 + 内容

### 子站导航
展示以下站点（按类别分组）：
- 📔 博客 (www.xiaobaozi.cn)
- 🖼️ 相册 (album.xiaobaozi.cn)
- 📷 图床 (imgbed.xiaobaozi.cn)
- 📦 网盘 (pan.xiaobaozi.cn)
- 💬 评论服务 (comment.xiaobaozi.cn)
- 🤖 AI代理 (ai-proxy.xiaobaozi.cn)
- 🍺 云酒馆 (st.xiaobaozi.cn)
- ✍️ 灵感收集 (memo.xiaobaozi.cn)
- 📱 哈基米加密 (app.xiaobaozi.cn)
- 🔧 New API (api.xiaobaozi.cn)
- 📝 协作文档 (docs.xiaobaozi.cn)
- 🎮 redink (redink.xiaobaozi.cn)

### GitHub 项目展示
精选 4 个：
- VideoAdGuard (726 ⭐) - B站广告检测
- cyber-doctor (395 ⭐) - 赛博华佗
- easytts (147 ⭐) - 有声小说
- hajimi-encoder (47 ⭐) - 哈基米加密

## 5. Component Inventory

### Hero Section
- 线条动画 Canvas 背景
- 头像 + 昵称 + 简介
- 实时数据统计条
- 滚动引导线

### About Section
- 简短个人介绍

### Project Cards
- 项目名 + star数 + 描述
- hover 阴影效果

### Site Navigation Grid
- 2x6 或 3x4 网格
- 图标 + 名称 + 描述
- hover 效果

### Feed Section
- 时间线列表
- 每条包含日期 + 内容

### Footer
- 联系方式（邮箱、GitHub、B站、爱发电、小红书）

## 6. Technical Approach

### 框架
- Next.js 15 (App Router)
- TypeScript
- CSS Modules

### API (Edge Functions)
- `/api/stats/github` - GitHub 数据
- `/api/stats/bilibili` - B站粉丝
- `/api/stats/afdian` - 爱发电
- `/api/stats/xiaohongshu` - 小红书
- `/api/feed` - RSS 解析

### 部署
- Vercel

## 7. 数据源

### GitHub
- API: `https://api.github.com/users/Warma10032`
- 获取: public_repos, followers, total stars (需计算)

### B站
- API: `https://api.bilibili.com/x/relation/stat?vmid=397711814`
- 获取: follower

### 爱发电
- 网页抓取或 API

### 小红书
- 账号ID: 450821311
- 需找可用 API

### RSS
- `https://memo.xiaobaozi.cn/rss.xml` 或 `https://memo.xiaobaozi.cn/api/rss`
