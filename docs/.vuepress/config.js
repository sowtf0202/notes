module.exports = {
  base: '/notes/',
  title: 'sowtf',
  description: 'sowtf\'s vuepress notes, sowtf, so what the fuck, 学习前端, vue 学习',
  themeConfig: {
    repo: 'https://github.com/sowtf0202/notes', //git 仓库地址
    repoLabel: 'GitHub', // 自定义仓库链接文字
    // lastUpdated: 'last updated',
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
            title: '不看错过一个亿',
            path: '/vue/notice'
          },
          {
            title: '初始化data',
            path: '/vue/data'
          },
          {
            title: 'Vue 实例挂载的实现',
            path: '/vue/mounted'
          },
          {
            title: '合并策略',
            path: '/vue/mergeOptions'
          }
        ]
      },
      {
        title: 'http 下午茶',
        children: []
      },
      {
        title: 'git',
        children: [
          {
            title: '常用命令',
            path: '/git/command'
          },
          {
            title: '常见问题',
            path: '/git/questions'
          },
          {
            title: 'GitHook之husky',
            path: '/git/husky'
          }
        ]
      },
      {
        title: '浏览器兼容',
        children: [
          {
            title: 'ios',
            path: '/compatible/ios'
          },
          {
            title: 'Android',
            path: '/compatible/android'
          },
          {
            title: 'pc',
            path: '/compatible/pc'
          }
        ]
      },
      {
        title: '科学上网',
        path: '/shadowsocks/ss'
      },
      {
        title: '工具方法',
        path: '/utils/util'
      }
    ]
  }
}
