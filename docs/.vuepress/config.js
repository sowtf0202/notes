module.exports = {
  base: '/notes/',
  title: 'sowtf',
  description: 'vuepress notes',
  themeConfig: {
    repo: 'https://github.com/sowtf0202/notes', //git 仓库地址
    repoLabel: 'github', // 自定义仓库链接文字
    lastUpdated: '上次更新',
    smoothScroll: true,
    displayAllHeaders: true,
    // navbar: false,
    search: true,
    searchMaxSuggestions: 10,
    sidebarDepth: 2,
    // nav: [
    //   { text: 'Guide', link: '/guide/', target:'_blank' }
    // ],
    sidebar: [
      {
        title: 'Vue',
        children: [
          {
            title: '初始化data',
            path: '/vue/data'
          }
        ]
      }
      // {
      //   title: 'http',
      //   children: [ 
          
      //   ]
      // }
    ]
  }
}