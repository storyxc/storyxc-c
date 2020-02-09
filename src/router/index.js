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
import ArticleManagement from '@/page/articleManagement.vue'
import Images from '@/page/images.vue'
import LiveStream from '@/page/liveStream.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Index
    },
    {
      path: '/images',
      component: Images,
      meta: {
        title: '必应壁纸 - 故事而已'
      }
    },
    {
      path: '/login',
      component: Login,
      meta: {
        title: '登录 - 故事而已'
      }
    },
    {
      path: '/liveStream',
      component: LiveStream,
      meta: {
        title: '直播源解析 - 故事而已'
      }
    },
    {
      path: '/editor',
      component: Editor,
      meta: {
        title: '编辑器 - 故事而已'
      }
    },
    {
      path: '/iu',
      component: IU,
      meta: {
        title: 'IU - 故事而已'
      }
    },
    {
      path: '/article/:id',
      component: Article,
      meta: {
        title: '文章'
      }
    },
    {
      path: '/comment',
      component: Comment,
      meta: {
        title: '留言板 - 故事而已'
      }
    },
    {
      path: '/editor/:id',
      component: Editor,
      meta: {
        title: '编辑器 - 故事而已'
      }
    },
    {
      path: '/management',
      component: Management,
      meta: {
        title: '后台管理 - 故事而已'
      }
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
    },
    {
      path: '/articleManagement',
      component: ArticleManagement
    }
  ]
})
