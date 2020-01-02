<template>
  <div id="container">
    <el-tag type="info"><el-link  :underline="false" href="/" target="_self">返回首页</el-link></el-tag>
    <h1>欢迎留言</h1>
    <div id="vcomments"></div>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  name: "comment",
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
    }
  },
  mounted() {
    this.createValine();
    $('.info').hide();
  }
};
</script>
<style lang="less" scoped>
#vcomments {
  width: 80%;
  min-width: 80%;
  padding: 10px;
  margin: 20px  auto;
  display: block;
}

#container h1 {
    text-align: center;
}
</style>