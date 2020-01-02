<template>
  <div>
    <div>
      <el-tag type="info">
        <el-link :underline="false" href="/" target="_self">返回首页</el-link>
      </el-tag>
    </div>
    <div id="editor">
      <div style="margin-top: 15px">
        <el-input placeholder="请输入内容" v-model="article.articleTitle">
          <template slot="prepend">文章标题</template>
        </el-input>
      </div>
      <mavon-editor style="height: 100%;margin-top: 15px" v-model="article.articleMain"></mavon-editor>

      <div id="category" style="margin-top: 15px">
        <el-tag>请选择分类</el-tag>
        <el-radio-group v-model="article.articleCategory" size="medium">
          <el-radio-button
            v-for="(item,i) in categories"
            :key="i"
            :label="item.categoryId"
          >{{item.categoryName}}</el-radio-button>
        </el-radio-group>
      </div>
      <div id="tags" style="margin-top: 15px">
        <el-tag>请选择标签</el-tag>
        <template>
          <el-select
            v-model="article.tagIds"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="请选择文章标签"
          >
            <el-option
              v-for="item in tags"
              :key="item.tagId"
              :label="item.tagName"
              :value="item.tagId"
            ></el-option>
          </el-select>
        </template>
      </div>
      <div id="submitBtn" style="text-align: center;margin-top: 15px">
        <el-button type="primary" id="publish" @click="publish()">发布文章</el-button>
        <el-button id="save" @click="save()" type="primary" plain>保存草稿</el-button>
      </div>
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
        articleMain: "",
        articleTitle: "",
        articleCategory: "",
        tagIds: []
      },
      categories: [],
      tags: [],
      id: ''
    };
  },
  methods: {
    publish() {
      this.$axios
        .post("/story/article", this.article)
        .then(res => {
          this.$message({
            message: res.data.message,
            type: res.data.flag ? "success" : "error"
          });
          window.location.href = "/";
        })
        .catch(err => {
          this.$message({
            type: "info",
            message: "发布失败,请稍后重试"
          });
        });
    },
    save() {
      this.$axios
        .post("/story/article/save", this.article)
        .then(res => {
          this.$message({
            message: res.data.message,
            type: res.data.flag ? "success" : "error"
          });
        })
        .catch(err => {
          this.$message({
            type: "info",
            message: "发布失败,请稍后重试"
          });
        });
    },
    queryAllTags() {
      this.$axios.get("/story/tag").then(res => {
        if (res.data.flag) {
          this.tags = res.data.data;
        }
      });
    },
    queryAllCategories() {
      this.$axios.get("/story/category").then(res => {
        this.categories = res.data.data;
      });
    },
    loadArticle() {
      this.id = this.$route.params.id;
      this.$axios.get("/story/article/edit/" + this.id).then(res => {
        this.article = res.data.data;
        this.loading = false;
      })
      .catch(err=>{
        this.$message({
          type: 'info',
          message: res.data.message
        })
      });
    }
  },
  created() {
    if(this.$route.params.id != null && this.$route.params.id != ''){
      this.loadArticle();
    }
    this.queryAllTags();
    this.queryAllCategories();
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