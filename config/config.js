export default {
    plugins: [
        ['umi-plugin-react', {
            // 打开antd插件，antd插件会帮你引入antd并实现按需编译
            antd: true
        }]
    ],
    // umi配置 启用单数模式的目录，让 page 变为约定的文件夹
    singular: true,
    // 配置式路由，这样就不会再执行约定式对应的路由逻辑
    /**
     * 访问 / 下面的路由的时，使用 page 文件夹下的 ../layout 布局文件渲染页面，默认展示Helloworld组件
     * 访问 /dashboard/analysis 时，使用 page 文件夹下的 Dashboard/Analysis 组件渲染到 layout 文件中 children 部分
     * 访问 /dashboard/monitor 时，使用 page 文件夹下的 Dashboard/Monitor 组件渲染到 layout 文件中 children 部分
     * 访问 /dashboard/workplace 时，使用 page 文件夹下的 Dashboard/Workplace 组件渲染到 layout 文件中 children 部分
     */
    routes: [{
        path: '/',
        component: '../layout',// component是一个字符串，它是相对于 page 目录的相对路径
        routes: [
            {
            path: '/',
            component: './HelloWorld',// component是一个字符串，它是相对于 page 目录的相对路径
            },
            {
                path: '/helloworld',
                component: 'Helloworld'
            },
            {
                path: '/dashboard',
                routes: [
                    { path: '/dashboard/analysis', component: 'Dashboard/Analysis' },
                    { path: '/dashboard/monitor', component: 'Dashboard/Monitor' },
                    { path: '/dashboard/workplace', component: 'Dashboard/Workplace' }
                ]
            },
        ],
    }],
};
