import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/article'
  },
  {
    path: '/article',
    name: 'Article',
    component: () => import(/* webpackChunkName: "article" */ '@/views/article/Index.vue'),
    redirect: '/article/lhl-all',
    children: [
      {
        path: '/article',
        redirect: '/article/lhl-all',
      },
      {
        path: '/article/lhl-all',
        name: 'LHL-All',
        component: () => import(/* webpackChunkName: "lhl-all" */ '../views/article/lhl-index/LHL-All.vue')
      },
      {
        path: '/article/lhl-back-end',
        name: 'LHL-back-end',
        component: () => import(/* webpackChunkName: "lhl-back-end" */ '../views/article/lhl-index/LHL-back-end.vue')
      },
      {
        path: '/article/lhl-front-end',
        name: 'LHL-front-end',
        component: () => import(/* webpackChunkName: "lhl-front-end" */ '../views/article/lhl-index/LHL-front-end.vue')
      },
      {
        path: '/article/lhl-miao',
        name: 'LHL-miao',
        component: () => import(/* webpackChunkName: "lhl-miao" */ '../views/article/lhl-index/LHL-miao.vue')
      },
      {
        path: '/article/lhl-age',
        name: 'LHL-age',
        component: () => import(/* webpackChunkName: "lhl-age" */ '../views/article/lhl-index/LHL-age.vue')
      },
    ]

  },
  {
    path: '/booklet',
    name: 'booklet',
    component: () => import(/* webpackChunkName: "booklet" */ '@/views/booklet/Index.vue')
  },
  {
    path: '/board',
    name: 'board',
    component: () => import(/* webpackChunkName: "board" */ '@/views/board/Index.vue'),
  },
  {
    path: '/detail/:id',
    name: "Detail",
    component: () => import(/* webpackChunkName: "detail" */ '../views/article/Detail.vue')
  },
  {
    path: '/bookletdetail/:id',
    name: "Bookletdetail",
    component: () => import(/* webpackChunkName: "Bookletdetailchild" */ '../views/booklet/Bookletdetail.vue')
  },
  {
    path: '/bookletdetail/:id/:childid',
    name: "Bookdetailchild",
    component: () => import(/* webpackChunkName: "Bookletdetailchild" */ '../views/booklet/Bookdetailchild.vue')
  },
  {
    path: '/file',
    name: 'File',
    component: () => import(/* webpackChunkName: "file" */ '../views/file/File.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/about/About.vue')
  },
  {
    path: '/tag/:con',
    name: 'Tag',
    component: () => import(/* webpackChunkName: "about" */ '../views/tag/Tag.vue')
  }
]

const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err)
}
const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
  // 给当前路由添加类名
  linkActiveClass: 'red'
})

export default router
