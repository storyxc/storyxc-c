import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/index.vue'
import Login from '@/page/login.vue'
import Editor from '@/page/editor.vue'
import IU from '@/page/iu.vue'
import Article from '@/page/article.vue'
import Comment from '@/page/comment.vue'
import Management from '@/page/management.vue'
import UserManagement from '@/page/userManagement.vue'
import PermissionManagement from '@/page/permissionManagement.vue'
import IndexManagement from '@/page/IndexManagement.vue'
import RoleManagement from '@/page/roleManagement.vue'
import MenuManagement from '@/page/menuManagement.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Index
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/editor',
      component: Editor
    },
    {
      path: '/iu',
      component: IU
    },
    {
      path: '/article/:id',
      component: Article
    },
    {
      path: '/comment',
      component: Comment
    },
    {
      path: '/editor/:id',
      component: Editor
    },
    {
      path: '/management',
      component: Management
    },
    {
      path: '/userManagement',
      component: UserManagement
    },
    {
      path: '/permissionManagement',
      component: PermissionManagement
    },
    {
      path: '/indexManagement',
      component: IndexManagement
    },
    {
      path: '/roleManagement',
      component: RoleManagement
    },
    {
      path: '/menuManagement',
      component: MenuManagement
    }
  ]
})
