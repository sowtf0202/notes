# husky实现eslint校验和commit 规范校验
* 1.安装 husky，lint-staged，@commitlint/cli，@commitlint/config-conventional 依赖
```js
npm i -D husky lint-staged @commitlint/cli @commitlint/config-conventional
```
::: tip 注意
一定要使用 npm 安装 eslint 和 husky，因为在 windows 操作系统下, 用 yarn 安装依赖，不会触发 husky pre-commit 钩子命令。
:::
* 2.创建 .huskyrc
```js
{
  "hooks": {
    "pre-commit": "lint-staged",
    "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
  }
}
```
* 3.创建 .lintstagedrc
```js
// 通用
{
  "src/**/*.js": "eslint"
}
// 自动修复错误
{
   "src/**/*.js": ["eslint --fix", "git add"]
}
// 自动格式化美化代码
{
   "src/**/*.js": ["prettier --write", "git add"]
}
```
* 4.创建 commitlint.config.js
```js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
        2,
        'always',
        [
        'feat', // 新功能（feature）
        'fix', // 修补bug
        'docs', // 文档（documentation）
        'style', // 格式（不影响代码运行的变动）
        'refactor', // 重构（即不是新增功能，也不是修改bug的代码变动）
        'test', // 增加测试
        'revert', // 回滚
        'config', // 构建过程或辅助工具的变动
        'chore', // 其他改动
        ],
    ],
    'type-empty': [2, 'never'], // 提交不符合规范时,也可以提交,但是会有警告
    'subject-empty': [2, 'never'], // 提交不符合规范时,也可以提交,但是会有警告
    'subject-full-stop': [0, 'never'],
    'subject-case': [0, 'never'],
  }
}
```

