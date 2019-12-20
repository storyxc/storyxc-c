<template>
  <div id="home">
    <vue-canvas-nest :config="{color:'0,0,0', count: 120}" :el="'#app'"></vue-canvas-nest>
    <img id="iu" :src="picUrl" alt="iu" width="400px" />
  </div>
</template>
<script>
import vueCanvasNest from "vue-canvas-nest";
export default {
  components: { vueCanvasNest },
  name: "IU",
  data() {
    return {
      picUrl: 'static/1.jpg',
      count: 0,
      imgs: [
        "static/1.jpg",
        "static/2.jpg",
        "static/3.jpg",
        "static/4.jpg",
        "static/5.jpg",
        "static/6.jpg",
        "static/7.jpg",
        "static/8.jpg"
      ]
    };
  },
  mounted() {
      var _this = this;
      var i = _this.count;
    setInterval(function() {
      _this.picUrl = _this.imgs[i];
      i++;
      if (i === 8) {
        i = 0;
      }
    }, 1500);
  }
};
</script>
<style>
#home {
  margin: 100px auto;
  text-align: center;
}
</style>