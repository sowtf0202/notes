#!/usr/bin/env sh
set -e

# 生成静态文件
npm run docs:build

echo "Enter commit message:"
read MESSAGE
read -p "Releasing $MESSAGE - are you sure? (y/n)" -n 1 -r
echo #(optional) move to a new line
if [[ $REPLY =~ ^[y/Y]$ ]]

then
    echo "commit ..."

    # 进入生成的文件夹
    cd docs/.vuepress/dist
    #commit
    git add -A
    git commit -m "[build] $MESSAGE"
    # 如果发布到 https://<USERNAME>.github.io/<REPO>
    git push -f git@github.com:sowtf0202/notes.git master:git-pages
    cd -
fi

# #!/usr/bin/env sh

# # 确保脚本抛出遇到的错误
# set -e

# # 生成静态文件
# npm run docs:build

# # 进入生成的文件夹
# cd docs/.vuepress/dist

# git init
# git add -A
# git commit -m 'deploy'

# # 如果发布到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:sowtf0202/notes.git master:git-pages

# cd -