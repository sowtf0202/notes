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
    nav: [
      { text: 'Guide', link: '/guide/', target:'_blank' }
    ],
    sidebar: [
      {
        title: 'Group 2',
        children: [ /* ... */ ]
      },
      {
        title: 'blog',
        children: [ 
          {
            title: 'b',   // 必要的
            path: '/blog/b',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
          },
          {
            title: 'c',   // 必要的
            path: '/blog/c',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
          }
        ]
      }
    ]
  }
}