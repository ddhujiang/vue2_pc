import util from '@/utils/router';
// Layout 侧边栏+Header布局
import HeaderAsideLayout from '@/layout/HeaderAsideLayout';
// 登录页面
import Login from '@/pages/Login/Login';
//首页
import Home from '@/pages/Home/index';

//test
import Test from '@/pages/Test/index';



const routerConfig = [
  {
    path: '/',
    layout: HeaderAsideLayout,
    name: 'Home',
    title: '首页',
    component: Home,
  },
  {
    path: '/test',
    layout: HeaderAsideLayout,
    name: 'Test',
    title: 'test',
    component: Test,
    children: [
      {
        path: '/test/one',
        layout: HeaderAsideLayout,
        title: 'test-one',
        component: Test
      },
      {
        path: '/test/two',
        layout: HeaderAsideLayout,
        title: 'test-two',
        component: Test
      },
      {
        path: '/test/three',
        layout: HeaderAsideLayout,
        title: 'test-three',
        component: Test,
        children: [
          {
            props:true,
            path: '/test/three/:id',
            layout: HeaderAsideLayout,
            title: 'test-three详情',
            component: Test
          },
        ]
      }
    ]
  },
  {
    path: '/login',
    layout: Login,
    name: 'login',
    component: Login,
    meta: {
      requiresAuth: false
    }
  }
];
// 导出全部路由设置
// 这个数据会在 router.js 中被扁平处理

export default util.recursiveRouterConfig([
  ...routerConfig
])
