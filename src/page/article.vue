<template>
  <div id="app">
    <vue-canvas-nest :config="{color:'0,0,0', count: 120}" :el="'#app'"></vue-canvas-nest>
    <!--github-->
    <a href="https://github.com/storyxc" class="github-corner" aria-label="View source on Github">
      <svg
        width="80"
        height="80"
        viewBox="0 0 250 250"
        style="fill: #333;color:#fff;position: absolute;top: 0;border: 0;right: 0;"
        aria-hidden="true"
      >
        <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z" />
        <path
          d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
          fill="currentColor"
          style="transform-origin: 130px 106px;"
          class="octo-arm"
        />
        <path
          d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
          fill="currentColor"
          class="octo-body"
        />
      </svg>
    </a>

    <div id="home">
      <div id="indexHeader">
        <div id="blogTitle">
          <a id="lnkBlogLogo" href="http://www.storyxc.com">
            <img id="blogLogo" alt="故事" :src="iconUrl" />
          </a>

          <h1>
            <a
              id="Header1_HeaderTitle"
              class="headermaintitle HeaderMainTitle"
              href="http://www.storyxc.com"
              style="text-decoration: none"
            >故事而已</a>
          </h1>
          <h2>虽千万人吾往矣</h2>
        </div>
        <div id="navigator">
          <el-menu class="el-menu-demo" mode="horizontal">
            <el-menu-item>
              <el-link href="/" target="_self">首页</el-link>
            </el-menu-item>
            <el-menu-item>
              <el-link href="/contact" target="_self">联系</el-link>
            </el-menu-item>
            <el-menu-item>
              <el-link target="_self">留言</el-link>
            </el-menu-item>
            <el-menu-item>
              <el-link href="/editor" target="_self">发布文章</el-link>
            </el-menu-item>
            <el-menu-item>
              <el-link href="/management" target="_self">后台管理</el-link>
            </el-menu-item>

            <div class="blogStats">
              <span id="stats_article_count">文章-{{blogStat.articleCount}}&nbsp;</span>
              <span id="stats-visitor_count" display="none"></span>
            </div>
          </el-menu>
        </div>
        <!--navigator-->
      </div>
      <!--header-->
      <div id="main">
        <div id="mainContent">
          
          <div
            v-loading="loading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
          >
          <h1 class="articleTitle">
            <a :href="article.articleUrl">{{article.articleTitle}}</a>
          </h1>
          <div class="clear"></div>
            <nossr>
              <mavon-editor
                style="height: 100%;margin-top: 15px"
                v-model="article.articleMain"
                :subfield="false"
                :boxShadow="false"
                defaultOpen="preview"
                :toolbarsFlag="false"
              />
            </nossr>

            <div id="copyright">
              <p>本文作者:{{article.authorCode}}</p>
              <p>
                文章链接:
                <a :href="article.articleUrl">{{article.articleUrl}}</a>
              </p>
              <p>版权声明:转载请联系作者并声明出处</p>
            </div>
          </div>

          <div id="vcomments"></div>
        </div>
        <!--end: mainContent-->

        <div id="sideBar">
          <div id="sideBarMain">
            <div id="sidebar_news" class="newsItem">
              <h3 class="catListTitle">公告</h3>
              <div id="blog-news">
                <div id="about">
                  <div id="aboutMe">
                    <img :src="icon" width="100px" height="100px" alt="story" />
                    <h2>故事</h2>
                  </div>
                  <div id="aboutMeDesc">虽千万人吾往矣</div>
                </div>
                <hr />
                <p>当前时间</p>
                <div id="dom">
                  <canvas id="clock" width="120" height="120">时钟canvas</canvas>
                </div>
              </div>
            </div>
            <div id="leftcontentcontainer">
              <div id="blog-sidecolumn">
                <div id="sidebar_topviewedposts" class="sidebar-block">
                  <div class="catListView">
                    <h3 class="catListTitle">阅读排行榜</h3>
                    <div id="TopViewPostsBlock" class="hotArticle">
                      <ul style="word-break:break-all">
                        <li v-for="(item,i) in hotArticle" :key="i">
                          <a
                            :href="''+item.articleUrl"
                          >{{i+1}}.{{item.articleTitle.length > 14? item.articleTitle.substring(0,14)+"..." : item.articleTitle}}({{item.viewCount}})</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--end sideBarMain-->
          <div class="clear"></div>
        </div>
        <!--end slidBar-->
        <div class="clear"></div>
      </div>

      <!--end: main-->
      <div id="footer">
        Copyright © 2019-2020
        <a href="http://www.storyxc.com">故事而已</a>
        <a href="http://www.beian.miit.gov.cn/" target="_blank">豫ICP备19046036号</a>
        <br />
        <span id="poweredby">Powered by Java</span>

        <br />
      </div>
    </div>
    <!--end: home-->
  </div>
</template>
<script>
import vueCanvasNest from "vue-canvas-nest";
import { clock } from "../static/js/clock";
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import Valine from "valine";
import $ from "jquery";

export default {
  components: {
    vueCanvasNest,
    mavonEditor
    // or 'mavon-editor': mavonEditor
  },
  name: "article",
  data() {
    return {
      iconUrl: "/static/story.ico",
      icon: "/static/story.jpg",
      activeIndex: "1",
      activeIndex2: "1",
      blogStat: {},
      id: "",
      article: {
        articleMain: "",
        articleTitle: "",
        articleCategory: "",
        tagIds: [],
        authorCode: "",
        articleUrl: ""
      },
      hotArticle: [],
      cateArtList: [],
      loading: true
    };
  },
  methods: {
    createValine() {
      const Valine = require("valine");
      window.AV = require("leancloud-storage");
      const valine = new Valine({
        el: "#vcomments",
        appId: "KMcB6K6smLzUtvAYso4rMNp6-gzGzoHsz",
        appKey: "Lj6y2pgfAhX4bNz3RwVvREIK",
        notify: true,
        verify: false,
        avatar: "mp",
        path: window.location.pathname,
        placeholder:
          "欢迎留言与我分享您的想法,留言时填写邮箱可以及时收到回复提醒..."
      });
      this.valineRefresh = false;
    },
    queryCategoryArticle() {
      this.$axios.get("/story/category/article").then(res => {
        this.cateArtList = res.data.data;
      });
    },
    queryBlogStat() {
      this.$axios.get("/story/article/blogStat").then(res => {
        this.blogStat = res.data.data;
      });
    },
    queryHotArticle() {
      this.$axios.get("/story/article/hot").then(res => {
        this.hotArticle = res.data.data;
      });
    },
    loadArticle() {
      this.id = this.$route.params.id;
      this.$axios.get("/story/article/" + this.id).then(res => {
        this.article = res.data.data;
        this.loading = false;
      });
    }
  },
  created() {
    this.loadArticle();
    this.queryCategoryArticle();
    this.queryBlogStat();
    this.queryHotArticle();
  },
  mounted() {
    clock();
    this.createValine();
    $(".info").hide();
  }
};
</script>
<style lang="less" scoped>
@import "../static/css/index.css";

#copyright {
  width: 90%;
  margin-top: 15px;
  border-left: 5px solid #ff1700;
  padding: 10px;
  background: #ececec;
}

.articleTitle {
  font-family: "Lato", Helvetica Neue, Helvetica, Arial, sans-serif;
  clear: both;
  background-color: #fbf9f9;
  margin-bottom: 8px;
  padding-top: 5px;
  padding-bottom: 5px;
  margin-top: 20px;
  border-left: 3px solid #21759b;
  padding-left: 20px;
  font-size: 20px;
  border-radius: 0px;
}

.articleTitle a:link,
.articleTitle a:visited,
.articleTitle a:active {
  transition: all 0.4s linear 0s;
}

.clear {
  clear: both;
}

#vcomments {
  width: 80%;
  min-width: 80%;
  padding: 10px;
  margin-top: 20px;
  display: block;
}
</style>