---
name: Daily Log Session 1
description: 2026-05-09 实现 Daily Log 功能，记录每日事项、心情、睡眠、精力
type: project
---

## Daily Log 第一期 (2026-05-09)

### 实现功能
- `EntryEditor` — 大号日期排版 + 文本编辑区 + mood(1-5) / sleep(h) / energy(1-3) 选择
- `Timeline` — 最近记录列表，点击弹出详情对话框
- `DailyLog` — 主视图，组装 Editor + Timeline
- 存储层 — `entries` 表 (SQLite)，`query_db`/`execute_db` 命令

### 关键设计决策
- 每次保存都 INSERT 新增，不覆盖已有记录，支持一天多条
- 数据库存在项目根目录 `data/lifehacker.db`（dev mode 自动从 CWD 找 `.git` 定位项目根）
- 去掉自动保存（blur save），只有手动点「保存」才写入

### Bug 修复记录
- 日期显示双"年" → 改用数组解构 `[y,m,d] = date.split("-").map(Number)`
- 日期字号不一致 → 统一 `text-4xl`
- 缺少"星期"前缀 → 加 `星期{dayOfWeek}`
- Sidebar 硬编码只显示 Home → 连接到 ScreenManager 视图注册表
- Emoji 索引错位 → 用数组 `["☹","🙁","😐","🙂","😊"]` 代替字符串下标
- 精力显示多一个 ⚡ → 去掉多余 `<span>` 标签，按钮改为 `===` 精确匹配 + 不同数量 ⚡
- 自动保存存草稿 → 彻底移除 handleBlur

### 当前问题
- Timeline 点击详情用的对话框，不是完整的编辑/查看界面（留待后续）
