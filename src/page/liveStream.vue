<template>
  <div id="container" v-loading="loading">
    <div id="bgDiv">
      <div id="sbox" class="sw_sform" data-bm="9">
        <div class="search_controls">
          <a
            id="hpinsthk"
            aria-hidden="true"
            tabindex="-1"
            href="javascript:void(0)"
            h="ID=SERP,5092.1"
          >
            <span></span>
          </a>
          <form action="/story/douyuStream" role="none" id="sb_form" class="sw_box" @submit="getRealLiveStream">
            <div class="b_searchboxForm" role="search" data-bm="15">
              <input
                class="b_searchbox"
                id="sb_form_q"
                ref="search"
                name="roomId"
                type="search"
                value
                maxlength="100"
                autocapitalize="off"
                autocorrect="off"
                autocomplete="off"
                spellcheck="false"
                aria-controls="sw_as"
                aria-autocomplete="both"
                aria-owns="sw_as"
                data-bm="20"
                placeholder="请输入斗鱼房间号"
              />
              <div id="sb_go_par" data-sbtip="Search the web">
                <input type="submit" class="b_searchboxSubmit" id="searchBtn" tabindex="0" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery';
export default {
  name: "liveStream",
  data() {
    return {
        backgroundPic:'',
        loading: true
    };
  },
  methods:{
      getRealLiveStream:function(e){
          e.preventDefault();
          let roomId = this.$refs.search.value;
          console.log(roomId);
          this.$axios.get('/story/liveStream?roomId='+roomId).then(res=>{
               this.$alert(res.data.data, '解析完毕', {
          confirmButtonText: '确定',
          callback: action => {}});
          });
      }
   },
   created(){
       this.$axios.get('/story/liveStream/pic').then(res=>{
           this.backgroundPic = res.data.data;
            $("#bgDiv").css("background-image","url("+this.backgroundPic+")");
            this.loading = false;
       })
   }
}
</script>
<style lang="less" scoped>
body {
  margin: 0;
}

input {
  outline: none;
}

#bgDiv {
  opacity: 1;
}

#bgDiv {
  position: absolute;
  top: 0;
  overflow: hidden;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-color: #666;
  background-size: cover;
}

body #container {
  max-width: 100%;
  max-height: 100%;
  margin: 0 auto;
}

div#sbox.sw_sform {
  margin: 0 auto;
}

.sw_sform {
  position: absolute;
  top: 30%;
  margin: 0 auto;
  left: 35%;
  z-index: 9;
}

body .b_searchboxForm {
  border-radius: 6px;
  background-color: #fff;
  border: 1px #ccc solid;
  padding: 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

body .b_searchboxForm .b_searchboxSubmit {
  height: 45px;
  width: 45px;
  border: 8px solid transparent;
  background: transparent url(https://cn.bing.com/sa/simg/hpc27.png) no-repeat;
  background-position: -169px -63px;
  overflow: hidden;
  vertical-align: top;
}

.search_controls {
  display: inline-block;
}

form {
  display: block;
  margin-top: 0em;
}

body .b_searchbox {
  background-color: #fff;
  margin: 6px 1px 0 10px;
  width: 486px;
  border-right: 0;
  padding-right: 4px;
}

.b_searchbox {
  width: 490px;
  margin: 2px 0 3px 12px;
  border: 0;
  padding: 0 10px 0 0;
  max-height: 30px;
  outline: none;
  -webkit-appearance: none;
  border-right: 1px solid;
  border-color: #ccc;
  box-sizing: content-box;
  position: relative;
  height: 40px;
  font-size: 16px;
}

input {
  font: inherit;
  font-size: 100%;
}

input {
  -webkit-writing-mode: horizontal-tb !important;
  text-rendering: auto;
  color: -internal-light-dark-color(black, white);
  letter-spacing: normal;
  word-spacing: normal;
  text-transform: none;
  text-indent: 0px;
  text-shadow: none;
  display: inline-block;
  text-align: start;
  -webkit-appearance: textfield;
  background-color: -internal-light-dark-color(white, black);
  -webkit-rtl-ordering: logical;
  cursor: text;
  margin: 0em;
  font: 400 13.3333px Arial;
  padding: 1px 0px;
  border-width: 2px;
  border-style: inset;
  border-color: initial;
  border-image: initial;
}

#sb_go_par {
  display: inline;
}

.b_searchboxSubmit {
  text-indent: -99em;
  position: static;
  right: 0;
  top: 0;
  cursor: pointer;
}
</style>