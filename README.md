# Dev Toolkit

All-in-one VSCode 开发工具箱：console.log 快捷操作、字符串命名格式转换、文件名复制。

## 安装

```bash
# 克隆项目后安装依赖
cd dev-toolkit
npm install
npm run compile
```

在 VSCode 中按 `F5` 启动 Extension Development Host 进行测试。

如需打包为 `.vsix` 安装包：

```bash
npm install -g @vscode/vsce
vsce package
```

然后在 VSCode 中：`Extensions` → `...` → `Install from VSIX...`

## 功能与快捷键

### 🔧 Console Log

| 快捷键 | 命令 | 行为 |
|--------|------|------|
| `Cmd+Shift+L` | Insert console.log | 选中变量 → 插入 `console.log('var: ', var);`；无选中 → 插入空 `console.log()` |
| `Cmd+Shift+D` | Delete All console.log | 删除当前文件中所有 `console.log(...)` 语句（支持跨行） |

### 🔤 字符串命名格式转换

选中文本后使用：

| 快捷键 | 命令 | 示例输出 |
|--------|------|----------|
| `Cmd+Shift+T` | **Quick Pick 选择器** | 弹出列表选择目标格式 |
| — | Convert to camelCase | `myVarName` |
| — | Convert to PascalCase | `MyVarName` |
| — | Convert to snake_case | `my_var_name` |
| — | Convert to kebab-case | `my-var-name` |
| — | Convert to UPPER CASE | `MY VAR NAME` |
| — | Convert to lower case | `my var name` |
| — | Convert to CONSTANT_CASE | `MY_VAR_NAME` |

> 💡 推荐使用 `Cmd+Shift+T` 快捷键弹出选择器，无需记忆每种格式的单独命令。也可通过 `Cmd+Shift+P` 搜索 "Dev Toolkit" 找到所有命令。

### 📄 文件名复制

| 快捷键 | 命令 | 复制内容 |
|--------|------|----------|
| `Cmd+Shift+C` | Copy File Name | 文件名（含扩展名），如 `index.ts` |
| `Cmd+Alt+C` | Copy File Name (No Ext) | 文件名（不含扩展名），如 `index` |
| `Cmd+Shift+F` | Copy Folder Name | 所在文件夹名，如 `src` |
| — | Copy Relative File Path | 相对于工作区的路径，如 `src/modules/console.ts` |

## 快捷键总览

| 快捷键 | 功能 |
|--------|------|
| `Cmd+Shift+L` | 插入 console.log |
| `Cmd+Shift+D` | 删除所有 console.log |
| `Cmd+Shift+T` | 字符串格式转换选择器 |
| `Cmd+Shift+C` | 复制文件名 |
| `Cmd+Alt+C` | 复制文件名（无扩展名） |
| `Cmd+Shift+F` | 复制文件夹名 |

## 项目结构

```
src/
├── extension.ts          # 入口，注册所有命令
├── modules/
│   ├── console.ts        # console.log 插入/删除
│   ├── transform.ts      # 字符串命名格式转换
│   └── filename.ts       # 文件名/路径复制
└── utils/
    └── string-utils.ts   # splitWords() 核心拆词算法
```
