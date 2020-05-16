# git 常见问题

## 文件较大如何拉取
`git clone` 命令会拉取仓库中所有的代码,也包含了所有的提交记录等信息,当仓库较大的时候会很难下载
* 下载部分代码
```js
git clone --depth 1 [版本库网址] //只下载最近一次提交代码的分支的最近一条记录。用log查看只能看到一条提交记录,忽略更早的提交记录
```
* 仅拉取指定分支的代码
```js
git remote set-branches origin [远程分支名]
git fetch origin [远程分支名]
git chekcout [远程分支名]
```
* 或者可以指定深度,拉取更少的代码
```js
git remote set-branches origin [远程分支名]
git fetch --depth 1 origin [远程分支名]
git chekcout [远程分支名]
```
## 后期打标签
假设提交历史是这样的：
```shell
$ git log --pretty=oneline
15027957951b64cf874c3557a0f3547bd83b3ff6 Merge branch 'experiment'
a6b4c97498bd301d84096da251c98a07c7723e65 beginning write support
0d52aaab4479697da7686c15f77a3d64d9165190 one more thing
6d52a271eda8725415634dd79daabbc4d9b6008e Merge branch 'experiment'
0b7434d86859cc7b8c3d5e1dddfed66ff742fcbc added a commit function
4682c3261057305bdd616e23b64b0857d832627b added a todo file
166ae0c4d3f420721acbb115cc33848dfcc2121a started write support
9fceb02d0ae598e95dc970b74767f19372d61af8 updated rakefile
964f16d36dfccde844893cac5b347e7b3d44abbc commit the todo
8a5cbc430f1a9c3d00faaeffd07798508422908a updated readme
```
现在，假设在 v1.2 时你忘记给项目打标签，也就是在 “updated rakefile” 提交。 你可以在之后补上标签。 要在那个提交上打标签，你需要在命令的末尾指定提交的校验和（或部分校验和）：
```shell
$ git tag -a v1.2 9fceb02
```
