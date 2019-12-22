import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/index.vue'
import Login from '@/page/login.vue'
import Editor from '@/page/editor.vue'
import IU from '@/page/iu.vue'

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

    }
  ]
})
