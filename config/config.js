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
    routes: [{
        path: '/',
        component: './HelloWorld',// component是一个字符串，它是相对于 page 目录的相对路径
    }],
};
