<template>
  <div id="editor">
    <div style="margin-top: 15px">
      <el-input placeholder="请输入内容" v-model="article.articleTitle">
        <template slot="prepend">文章标题</template>
      </el-input>
    </div>
    <mavon-editor style="height: 100%;margin-top: 15px" v-model="article.markDown"></mavon-editor>
    <!--<div id="category" style="margin-top: 15px">-->
    <!--<el-tag>请选择分类</el-tag>-->
    <!--<el-checkbox v-model="checked">备选项1</el-checkbox>-->

    <!--</div>-->
    <!--<div id="tags" style="margin-top: 15px">-->
    <!--<el-tag>请选择标签</el-tag>-->
    <!--<template>-->
    <!--<el-select-->
    <!--v-model="value"-->
    <!--multiple-->
    <!--filterable-->
    <!--allow-create-->
    <!--default-first-option-->
    <!--placeholder="请选择文章标签">-->
    <!--<el-option-->
    <!--v-for="item in options"-->
    <!--:key="item.value"-->
    <!--:label="item.label"-->
    <!--:value="item.value">-->
    <!--</el-option>-->
    <!--</el-select>-->
    <!--</template>-->
    <!--</div>-->
    <div id="submitBtn" style="text-align: center;margin-top: 15px">
      <el-button type="primary" id="publish" @click="publish()">发布文章</el-button>
      <el-button id="save" @click="save()" type="primary" plain>保存草稿</el-button>
    </div>
  </div>
</template>
    <script>
// Local Registration
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
export default {
  name: "editor",
  components: {
    mavonEditor
    // or 'mavon-editor': mavonEditor
  },
  data() {
    return {
      article: {
        markDown: '',
        articleTitle: '',
        articleCategory: '',
        articleTags: []
      }
    };
  },
  methods: {
    publish() {
      this.$axios.get('/story/user/login')
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
    <style>
#editor {
  margin: auto;
  width: 80%;
  height: 580px;
}
</style>