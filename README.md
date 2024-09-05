### 系统实施手册

**1. 系统开发环境**

- **操作系统**: Windows 10 或 macOS
- **编程语言**: JavaScript (ES6+), HTML5, CSS3
- **前端框架**: Vue 3
- **状态管理**: Pinia
- **UI框架**: Element Plus
- **样式预处理器**: SCSS
- **CSS工具**: UnoCSS
- **图表库**: ECharts
- **Markdown渲染**: MarkdownIt
- **前端辅助库**: @vueuse/core, redash

**2. 开发工具**

- **代码编辑器**: Visual Studio Code
- **包管理工具**: pnpm
- **版本控制工具**: git
- **浏览器**: Google Chrome
- **开发调试工具**: Vue DevTools, Chrome DevTools
- **接口测试工具**: Postman

**3. 平台**

- **前端**: Vue 3 + Element Plus + UnoCSS
- **后端**: 基于RESTful API架构的服务, Nodejs + Express
- **数据库**: MySQL

**4. 系统部署过程**

1. **准备开发环境**
   - 安装Node.js和npm, pnpm，确保开发环境已经安装了最新版本的Node.js。
   - 克隆项目代码到本地开发环境中。
   - 通过终端进入项目目录 `management-system/frontend/` ，执行 `pnpm i` 安装项目依赖。

2. **配置环境变量**
   - 根据项目需求， 在 `management-system/frontend/src/utils/instance.js` 中配置 ，比如API接口的base URL、端口等。环境变量文件应根据开发、测试、生产环境的不同配置来设置。

3. **开发环境启动**
   - 在终端执行 `pnpm dev`，启动本地开发服务器。默认情况下，项目会在`localhost:5173`（或配置的端口）运行。
   - 打开浏览器访问 `http://localhost:5173`，确保前端项目正确运行。

4. **构建生产版本**
   - 执行 `pnpm build`，将项目构建为生产环境版本。构建完成后，项目会生成一个`dist`目录，其中包含可部署到生产环境的静态文件。

5. **数据库配置**
   - 根据项目需求，配置相应的数据库连接。确保前后端的数据库连接信息（如数据库名称、用户名、密码等）一致。
   - 需要初始化数据库或导入数据，可以使用数据库管理工具（如phpMyAdmin、pgAdmin等）执行SQL脚本, SQL 脚本文件存放路径 `/management-system/backend/sql/`。

6. **后端服务启动**
   - 在终端进入 `management-system/backend/` 目录，执行 `pnpm i` 安装依赖。
   - 执行 `node app.js`，启动后端服务。默认情况下，后端服务会在`localhost:8088`（或配置的端口）运行。 详细端口配置文件路径 `/management-system/backend/app.js`