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
      name: 'Index',
      component: Index
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/editor',
      name: Editor,
      component: Editor
    },
    {
      path: '/iu',
      name: IU,
      component: IU
    },
    {
      path: '/article/:id',
      name: Article,
      component: Article
    },
    {
      path: '/comment',
      name: Comment,
      component: Comment
    },
    {
      path: '/editor/:id',
      name: Editor,
      component: Editor
    },
    {
      path: '/management',
      name: Management,
      component: Management
    },
    {
      path: '/userManagement',
      name: UserManagement,
      component: UserManagement
    },
    {
      path: '/permissionManagement',
      name: PermissionManagement,
      component: PermissionManagement
    },
    {
      path: '/indexManagement',
      name: IndexManagement,
      component: IndexManagement
    },
    {
      path: '/roleManagement',
      name: RoleManagement,
      component: RoleManagement
    },
    {
      path: '/menuManagement',
      name: MenuManagement,
      component: MenuManagement
    }
  ]
})
