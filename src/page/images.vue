<template>
  <div id="app1" oncontextmenu="self.event.returnValue=false">
    <div class="container" >
      <div>
        <a href="/" class="logo" style="text-align:center">
            <span class="logo-lg">
              <img src="/static/logo.png" />
            </span>
          </a>
      </div>
      <div class="item"  v-for="(item,i) in imageList" :key="i">
        <div class="card progressive">
          <img
            class="progressive__img progressive--not-loaded"
            :src="item.fullUrl"
          />
          <a class="mark" :href="noDir"></a>
          <div class="description">
            <i :class="location"></i>
            <h3>{{item.copyright}}</h3>
            <p class="calendar">
              <i class="icon icon-calendar" :class="calendar"></i>
              <em class="t">{{item.date}}</em>
            </p>
          </div>
          <div class="options">
            <span class="ctrl heart">
              <i class="icon icon-heart" :class="heart"></i>
              <em class="t">{{item.likeCount}}</em>
            </span>
            <a
              class="ctrl download"
              href="#"
              target="_blank"
              rel="nofollow"
            >
              <i class="icon icon-download" :class="download"></i>
              <em class="t">{{item.downloadCount}}</em>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="page">
      <el-pagination
        class="pagiantion"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagination.currentPage"
        :page-sizes="[12,24,36,48]"
        :page-size="pagination.pageSize"
        layout="total,sizes,prev, pager, next, jumper"
        :total="pagination.total"
      ></el-pagination>
    </div>
    <div class="copyright">
      <p>
        所有图片均来自
        <a rel="nofollow" href="http://cn.bing.com" target="_blank">必应搜索</a>
      </p>
      Copyright © 2019-2020
        <a href="http://www.storyxc.com">故事而已</a>
        <a href="http://www.beian.miit.gov.cn/" target="_blank">豫ICP备19046036号</a>
        <br />
        <span id="poweredby">Powered by Java</span>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'

export default {
  name: "images",
  data() {
    return {
      imageList: [],
      pagination: {
        //分页相关属性
        currentPage: 1,
        pageSize: 12,
        total: 1,
        queryString: null
      },
      location: "el-icon-map-location",
      calendar: "el-icon-date",
      download: "el-icon-download",
      heart: "el-icon-s-flag",
      noDir: '#'
    };
  },
  created() {
      this.findPage();
      $(document).on('keydown', function (e) {
        e = e.event || window.event;
        if (e.keyCode == 123 || (e.ctrlKey && e.shiftKey && e.keyCode == 73) || (e.ctrlKey && e.keyCode == 85)) return false
    })
  },
  methods: {
      findPage(){
        this.$axios.post("/story/image/findPage",this.pagination).then(res=>{
            this.imageList = res.data.data.list;
            this.pagination.total = res.data.data.total;
            this.loading = false;
        })
      }
  }
};
</script>
<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-transition: all 0.3s linear;
  transition: all 0.3s linear;
}

#app1 {
  font-size: 16px;
  margin: 0;
  line-height: 1.5;
  font-size: 16px;
  position: relative;
  background-color: #fff;
  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
  text-size-adjust: 100%;
  -webkit-overflow-scrolling: touch;
  -webkit-font-smoothing: antialiased;
  font-family: "Source Han Sans SC", "Noto Sans CJK SC", "Source Han Sans CN",
    "Noto Sans SC", "Source Han Sans TC", "Noto Sans CJK TC", "PingFang SC",
    "Hiragino Sans GB", "Neue Haas Grotesk Text Pro", "Microsoft YaHei",
    "Microsoft JhengHei", sans-serif;
}

.clearfix::before {
  display: table;
  content: "";
}
.copyright{
    color: #999;
}

.clearfix::after {
  display: table;
  clear: both;
  content: "";
}

.float-right {
  float: right !important;
}

.float-left {
  float: left !important;
}

.float-none {
  float: none !important;
}

a {
  text-decoration: none;
  -webkit-transition: color 0.15s linear;
  transition: color 0.15s linear;
  color: #0c8484;
}

a:hover {
  color: #888;
}

ul,
li {
  list-style: none;
  padding: 0;
  margin: 0;
  display: inline-block;
  vertical-align: middle;
}

html {
  font-size: 100px;
}

@media only screen and (max-width: 768px) {
  html {
    font-size: 115px;
  }
  html .holder {
    height: 65px;
  }
  html header {
    text-align: center;
  }
  html header .container {
    padding: 0 !important;
  }
  html nav {
    float: none;
  }
  html nav .menu {
    position: absolute;
    top: 65px;
    left: 0;
    width: 100%;
    display: none !important;
    transition: all 0.5s ease;
  }
  html nav .menu {
    display: block !important;
    z-index: 2;
  }
  html nav .menu li {
    background: rgba(255, 255, 255, 0.9);
    width: 33.33%;
  }
  html nav .menu li .text {
    display: none;
  }
  html nav .menu li .icon {
    display: inline-block !important;
  }
  html nav .menu li.search-wrap {
    width: 100%;
    padding: 0 10px;
  }
  html nav .menu li.search-wrap input {
    width: 100%;
  }
}

@media only screen and (max-width: 640px) {
  html {
    font-size: 110px;
  }
  html .item {
    width: 100% !important;
  }
  html .item .card .mark,
  html .item .card .description,
  html .item .card .options {
    opacity: 1 !important;
  }
  html .sub {
    display: none;
  }
}

@media only screen and (max-width: 480px) {
  html {
    font-size: 100px;
  }
}

@media only screen and (max-width: 320px) {
  html {
    font-size: 85px;
  }
}
.container {
  font-size: 0;
  margin: 0 auto;
  position: relative;
}

.container .item {
  display: inline-block;
  width: 33.33%;
  height: auto;
  position: relative;
  border: none;
}

.container .item .card {
  display: block;
  height: 100%;
  background: #dedede;
  position: relative;
  cursor: -webkit-zoom-in;
  cursor: zoom-in;
}

.container .item .card img {
  width: 100%;
  border: 0;
}

.container .item .card .mark {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(0, rgba(0, 0, 0, 0.4)),
    color-stop(40%, transparent),
    color-stop(60%, transparent),
    color-stop(60%, rgba(0, 0, 0, 0.6))
  );
  background: -webkit-linear-gradient(
    top,
    rgba(0, 0, 0, 0.4) 0,
    transparent 40%,
    transparent 60%,
    rgba(0, 0, 0, 0.6)
  );
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.4) 0,
    transparent 40%,
    transparent 60%,
    rgba(0, 0, 0, 0.6)
  );
  -webkit-filter: blur(15px);
  filter: blur(15px);
  z-index: 1;
  -webkit-transition: all 0.5s ease;
  transition: all 0.5s ease;
}

.container .item .card .options {
  font-size: 12px;
  position: absolute;
  right: 5px;
  bottom: 5px;
  padding: 5px;
  display: block;
  text-align: right;
  -webkit-transition: all 0.5s ease;
  transition: all 0.5s ease;
  opacity: 0;
  z-index: 3;
}

.container .item .card .ctrl {
  display: inline-block;
  height: 34px;
  line-height: 32px;
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid transparent;
  cursor: pointer;
  -webkit-border-radius: 7px;
  border-radius: 7px;
  -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.04);
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.04);
  text-align: center;
  padding: 0 10px;
}

.container .item .card .ctrl + .ctrl {
  margin-left: 5px;
}

.container .item .card .ctrl.heart .icon {
  color: #f15151 !important;
}

.container .item .card .ctrl:hover {
  background: #fff;
}

.container .item .card .t {
  margin-left: 5px;
  font-style: normal;
}

.container .item .card .description {
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
  padding: 5px;
  display: block;
  color: #fff;
  opacity: 0;
  -webkit-transition: all 0.5s ease;
  transition: all 0.5s ease;
  z-index: 1;
  pointer-events: none;
}

.container .item .card .description h3 {
  font-size: 14px;
  letter-spacing: 1px;
  font-weight: 400;
  color: #fff;
  padding: 2px;
}

.container .item .card .description p {
  font-size: 12px;
}

.container .item .card .description p .icon {
  color: #dedede;
}

.container .item .card .description p .t {
  color: #dedede;
}

.container .item:hover .mark {
  opacity: 1;
}

.container .item:hover .options {
  opacity: 1;
}

.container .item:hover .description {
  opacity: 1;
}

.mobile .mark,
.mobile .options,
.mobile .description {
  opacity: 1 !important;
}

.ctrl.hide {
  display: none;
}

@media only screen and (max-width: 980px) {
  .item {
    width: 50% !important;
  }
}
.logo img {
  height: 100px;
  margin-top: 0;
  margin-bottom: 3px;
}

.page {
  text-align: center;
  padding: 3px;
  margin-top: 30px;
}

.page a {
  display: inline-block;
  height: 32px;
  line-height: 31px;
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid #dedede;
  cursor: pointer;
  -webkit-border-radius: 6px;
  border-radius: 6px;
  -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.04);
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.04);
  text-align: center;
  padding: 0 10px;
}

.page span {
  display: inline-block;
  padding: 0 10px;
}

.copyright {
  padding-bottom: 30px;
  text-align: center;
}

/**********************Detail.css***********************/

.detail {
  height: 100vh;
  position: relative;
  background: rgba(1, 1, 1, 0.5);
}

.detail .mark {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  background-size: cover;
  background-position: center;
  -webkit-transition: all 0.5s ease;
  transition: all 0.5s ease;
  -webkit-filter: blur(30px);
  filter: blur(20px);
}

.detail .preview img {
  width: 0;
  height: 0;
  border: 0;
}

.detail .preview .progressive {
  background: transparent;
}

.detail .preview .options {
  font-size: 12px;
  padding: 10px;
  width: 100%;
  display: block;
  text-align: right;
  -webkit-transition: all 0.5s ease;
  transition: all 0.5s ease;
  position: absolute;
  right: 0;
  top: 0;
}

.detail .preview .ctrl {
  display: inline-block;
  height: 32px;
  line-height: 31px;
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid transparent;
  cursor: pointer;
  -webkit-border-radius: 6px;
  border-radius: 6px;
  -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.04);
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.04);
  text-align: center;
  padding: 0 10px;
}

.detail .preview .ctrl + .ctrl {
  margin-left: 5px;
}

.detail .preview .ctrl.heart .icon {
  color: #f15151 !important;
}

.detail .preview .ctrl.left {
  left: 15px;
  top: 10px;
  position: absolute;
}

.detail .preview .ctrl:hover {
  background: #fff;
}

.detail .preview .ctrl .t {
  font-style: normal;
  margin-left: 5px;
  display: inline-block;
  vertical-align: top;
}

.detail .preview .description {
  position: absolute;
  left: 0;
  bottom: 0;
  padding: 10px;
  display: block;
  width: 100%;
  color: #fff;
  background: rgba(1, 1, 1, 0.5);
}

.detail .preview .description .title {
  font-size: 20px;
}

.detail .preview .description .sub {
  color: #c6cccc;
}

.detail .preview .description .t {
  font-style: normal;
  margin-left: 5px;
  display: inline-block;
  vertical-align: top;
}

.detail .preview .description .show + .show {
  margin-left: 30px;
}
</style>