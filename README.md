# Dev Toolkit

All-in-one VSCode 开发工具箱：console.log 快捷操作、字符串命名格式转换、文件名复制。

## 环境要求

- **Node.js >= 20**（推荐使用 [nvm](https://github.com/nvm-sh/nvm) 管理版本）
- npm（随 Node.js 一起安装）

```bash
# 如果使用 nvm，切换到 Node 20+
nvm use 20
```

## 安装

### 方式一：从 GitHub Release 下载

1. 前往 [Releases](https://github.com/Liqiuyue9597/dev-toolkit/releases) 页面下载最新的 `.vsix` 文件
2. 安装下载好的 `.vsix` 文件，二选一：
   - **图形界面**：在 VS Code / CodeBuddy 中：`Extensions` → `···` → `Install from VSIX...` → 选择下载的文件
   - **命令行**：在 `.vsix` 文件所在目录执行：
     ```bash
     # VS Code
     code --install-extension dev-toolkit-0.0.1.vsix

     # CodeBuddy CN
     buddycn --install-extension dev-toolkit-0.0.1.vsix
     ```

### 方式二：从源码构建并安装

```bash
# 1. 克隆仓库并安装依赖
git clone https://github.com/Liqiuyue9597/dev-toolkit.git
cd dev-toolkit
npm install

# 2. 编译 TypeScript
npm run compile

# 3. 打包为 .vsix 文件（会在项目根目录生成 dev-toolkit-x.x.x.vsix）
npx @vscode/vsce package

# 4. 安装到编辑器
code --install-extension dev-toolkit-0.0.1.vsix
# 或 CodeBuddy CN：
# buddycn --install-extension dev-toolkit-0.0.1.vsix
```

> ⚠️ 注意：步骤 2-3 不能跳过，必须先编译再打包，直接安装不存在的 `.vsix` 文件会报 ENOENT 错误。
>
> 💡 安装是全局生效的，只需装一次，之后在任何目录打开编辑器都能使用，无需重新安装。

#### 调试模式（开发者）

如果你想修改源码并实时调试，无需打包，直接在 VS Code / CodeBuddy 中按 `F5` 启动 Extension Development Host 即可。

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
| `Cmd+Shift+F` | **Quick Pick 选择器** | 弹出列表选择复制内容 |
| — | Copy File Name | 文件名（含扩展名），如 `index.ts` |
| — | Copy File Name (No Ext) | 文件名（不含扩展名），如 `index` |
| — | Copy Folder Name | 所在文件夹名，如 `src` |
| — | Copy Relative File Path | 相对于工作区的路径，如 `src/modules/console.ts` |

## 快捷键总览

| 快捷键 | 功能 |
|--------|------|
| `Cmd+Shift+L` | 插入 console.log |
| `Cmd+Shift+D` | 删除所有 console.log |
| `Cmd+Shift+T` | 字符串格式转换选择器 |
| `Cmd+Shift+F` | 文件信息复制选择器 |

## License

[MIT](LICENSE)
