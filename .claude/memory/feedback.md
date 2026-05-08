---
name: Session Feedback
description: Lessons from the initial scaffolding session
type: feedback
---

## 首次项目搭建工作方式

### 工作节奏
- 需要频繁的状态更新和进度确认
- 不要长时间静默运行命令而不汇报
- 关键时刻需要询问用户是否方便等待

### 网络环境
- 用户在中国大陆，需要配置国内镜像源
  - Rust: USTC 镜像 (`sparse+https://mirrors.ustc.edu.cn/crates.io-index/`)
  - 不要用 rsproxy.cn（已失效）或 tuna（也有问题）
- pnpm/npm 默认可用，不需要额外配置

### Rust 工具链
- 用户使用 MSVC 工具链 (`stable-x86_64-pc-windows-msvc`)
- 安装 Rust 后需要执行 `rustup default stable` 设置默认工具链
- 首次编译约 12 分钟（依赖下载 + SQLite 源码编译）

### Project Structure
- 用户坚持分层：.claude/（AI 空间）、docs/（文档）、apps/（应用）、packages/（模块）
- Tauri 后端在 `apps/desktop/src-tauri/`
- monorepo 使用 pnpm workspaces
