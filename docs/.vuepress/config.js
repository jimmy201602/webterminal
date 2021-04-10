module.exports = {
    title: 'Webterminal Documents',
    description: 'Webterminal Documents',
    head: [ [ 'link', { rel: 'icon', href: '/favicon.ico' } ] ],
    locales: {
        '/': {
            lang: 'en-US',
            title: 'Webterminal',
            description: 'Webterminal Documents'
        },
        '/zh/': {
            lang: 'zh-CN',
            title: 'Webterminal',
            description: 'Webterminal文档'
        }
    },
    themeConfig: {
        logo: '/logo.png',
        lastUpdated: 'Last Updated',
        locales: {
            '/': {
                algolia: {},
                nav: [
                    { text: 'Home', link: '/', ariaLabel: 'Home' },
                    { text: 'Live Demo', link: 'http://193.112.194.114:8000/', target: '_blank' },
                    { text: 'Github', link: 'https://github.com/jimmy201602/webterminal', target: '_blank' },
                    { text: 'Contact', link: '/contact/'},
                ],
                sidebar: {
                    '/': [
                        {
                            title: 'Home',
                            collapsable: false,
                            children: ['README.md']
                        },
                        {
                            title: 'Webterminal Introduction',
                            collapsable: false,
                            children: ['introduction.md']
                        },
                        {
                            title: 'Live Demo',
                            collapsable: false,
                            children: ['livedemo.md']
                        },
                        {
                            title: 'Installiation guide',
                            collapsable: false,
                            children: ['install.md']
                        },
                        {
                            title: 'Useage',
                            collapsable: false,
                            children: ['manual.md']
                        },
                        // {
                        //     title: 'Updating',
                        //     collapsable: false,
                        //     children: ['']
                        // },
                        // {
                        //     title: 'Backup',
                        //     collapsable: false,
                        //     children: ['']
                        // },
                        // {
                        //     title: 'Restore',
                        //     collapsable: false,
                        //     children: ['']
                        // },
                        {
                            title: 'FAQ',
                            collapsable: false,
                            children: ['faq.md']
                        },
                        {
                            title: 'License',
                            collapsable: false,
                            children: ['license.md']
                        },
                        {
                            title: 'Reporting Issues',
                            collapsable: false,
                            children: ['reportingissue.md']
                        },
                        {
                            title: 'Contact Information',
                            collapsable: false,
                            children: ['contact.md']
                        }
                    ],
                    // '/nested/': [/* ... */]
                },
                selectText: 'Languages',
                label: 'English',
                ariaLabel: 'Languages',
                editLinkText: 'Edit this page on GitHub',
                serviceWorker: {
                    updatePopup: {
                        message: "New content is available.",
                        buttonText: "Refresh"
                    }
                }
            },
            '/zh/': {
                algolia: {},
                nav: [
                    { text: 'Home', link: '/zh/', ariaLabel: 'Home'  },
                    { text: '在线试用', link: 'http://193.112.194.114:8000/', target: '_blank' },
                    { text: 'Github', link: 'https://github.com/jimmy201602/webterminal', target: '_blank' },
                    { text: '联系我们', link: '/zh/contact/' },
                ],
                sidebar: {
                    '/zh/': [
                        {
                            title: 'Home',
                            collapsable: false,
                            children: ['README.md']
                        },
                        {
                            title: 'Webterminal介绍',
                            collapsable: false,
                            children: ['introduction.md']
                        },
                        {
                            title: '在线试用',
                            collapsable: false,
                            children: ['livedemo.md']
                        },
                        {
                            title: '安装指南',
                            collapsable: false,
                            children: ['install.md']
                        },
                        {
                            title: '使用文档',
                            collapsable: false,
                            children: ['manual.md']
                        },
                        // {
                        //     title: 'Updating',
                        //     collapsable: false,
                        //     children: ['']
                        // },
                        // {
                        //     title: 'Backup',
                        //     collapsable: false,
                        //     children: ['']
                        // },
                        // {
                        //     title: 'Restore',
                        //     collapsable: false,
                        //     children: ['']
                        // },
                        {
                            title: 'FAQ',
                            collapsable: false,
                            children: ['faq.md']
                        },
                        {
                            title: '开源协议',
                            collapsable: false,
                            children: ['license.md']
                        },
                        {
                            title: '提交bug',
                            collapsable: false,
                            children: ['reportingissue.md']
                        },
                        {
                            title: '联系信息',
                            collapsable: false,
                            children: ['contact.md']
                        }
                    ],
                    '/zh/nested/': [/* ... */]
                },
                selectText: '选择语言',
                label: '简体中文',
                editLinkText: '在 GitHub 上编辑此页',
                serviceWorker: {
                    updatePopup: {
                        message: "发现新内容可用.",
                        buttonText: "刷新"
                    }
                },
            }
        }
    }
}
