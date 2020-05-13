module.exports = {
  base: '/notes/',
  title: 'sowtf\'s notes',
  description: 'sowtf\'s vuepress notes, sowtf, so what the fuck, 学习前端, vue 学习',
  themeConfig: {
    repo: 'https://github.com/sowtf0202/notes', //git 仓库地址
    repoLabel: 'github', // 自定义仓库链接文字
    lastUpdated: 'last updated',
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