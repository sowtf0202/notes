# git 常用命令
::: tip 提示
[git 中文文档](https://git-scm.com/book/zh/v2)
:::
## 下载代码
```js
git clone [版本库网址] //克隆远程仓库代码到本地
```
## 查看工作区状态
```js
git status //查看工作区文件修改状态

git diff [file name] //查看某个文件的改动状态
```
## 拉取与提交
```js
git fetch //拉取远程仓库代码

git pull //拉取远程仓库代码并合并(pull=fetch+merge)

git pull origin [分支名] //拉取指定分支代码

git push //将代码推到远程仓库

git push origin [分支名] //将代码提交到指定分支

git reset //将 add 过的代码还原到工作区

git add [文件名] //将修改的文件添加到暂存区

git commit -m 'commit message' // 备注提交信息
```
## 合并与回滚
```js
git merge [分支名] //合并指定分支到当前所在的分支

git cherry-pick [commit-hashid] //将某一个分支的单次提交合并到当前分支

git reset --hard [commit-hashid] //回退到指定版本
```
## 分支操作
```js
git checkout [分支名] //本地切换到指定分支

git checkout --track origin/[分支名] //创建一条新的分支并追踪它

git checkout -b [分支名] //创建分支并切换到该分支

git branch //查看本地全部分支

git branch -a //查看远程全部分支

git branch -d [分支名] //删除指定分支

git branch -D [分支名] //强制删除指定分支

git branch --set-upstream-to=origin/[分支名] //追踪分支
```
## 查看提交记录
```js
git log //查看所有提交日志

git log --pretty=oneline --author="xxx" //查看 xxx 的提交日志

git log -p [commit-hashid] 或 git show [commit-hashid] filename //查看某次提交修改的内容
```
## 临时保存
```js
git stash //将所有未提交的修改（工作区和暂存区）保存至堆栈中

git stash save "save message" //添加备注,便于查找

git stash list //查看stash列表

git stash show //显示做了哪些改动，默认show第一个存储,如果要显示其他存贮，后面加stash@{$num}，比如第二个 git stash show stash@{1}

git stash show -p //显示第一个存储的改动，如果想显示其他存存储，命令：git stash show  stash@{$num}  -p ，比如第二个：git stash show  stash@{1}  -p

git stash apply //应用某个存储,但不会把存储从存储列表中删除，默认使用第一个存储,即stash@{0}，如果要使用其他个，git stash apply stash@{$num} ， 比如第二个：git stash apply stash@{1}

git stash pop //恢复之前缓存的工作目录，将缓存堆栈中的对应stash删除，并将对应修改应用到当前的工作目录下,默认为第一个stash,即stash@{0}，如果要应用并删除其他stash，命令：git stash pop stash@{$num} ，比如应用并删除第二个：git stash pop stash@{1}

git stash drop stash@{$num} //丢弃stash@{$num}存储，从列表中删除这个存储

git stash clear //删除所有缓存的stash
```
## 打 tag
```js
git tag //列出已有的标签

git tag -l "v1.8.5*" //按照特定的模式查找标签

git tag -a [tagname] -m "my version 1.0" //打附注标签

git tag [tagname] //打轻量标签

git show [tagname] //查看标签信息和与之对应的提交信息

git push origin [tagname] //传送标签到远程仓库服务器上

git push origin --tags //把所有不在远程仓库服务器上的标签全部传送到远程仓库

git tag -d [tagname] //删除标签

git push origin :[tagname] //删除远程仓库中的标签

git push origin --delete [tagname] //删除远程仓库中的标签
```
## 其他
```js
git remote -v //查看远程仓库地址

git remote set-url origin [remote url] //修改git的仓库地址

git update-index --assume-unchanged [file name] //本地添加忽略文件(该命令只能用于单个文件的忽略)

git config --global user.email "XXX@xxx.com" //设置邮箱地址
```


