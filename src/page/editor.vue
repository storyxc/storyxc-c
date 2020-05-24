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
      <mavon-editor ref="md" style="height: 100%;margin-top: 15px" v-model="article.articleMain"
      @imgAdd="imgAdd" @imgDel="imgDel"
      >

      </mavon-editor>

      <div id="category" style="margin-top: 15px">
        <el-tag>请选择分类</el-tag>
        <el-radio-group v-model="article.articleCategory" size="medium">
          <el-radio-button
            v-for="(item,i) in categories"
            :key="i"
            :label="item.categoryId"
          >{{item.categoryName}}</el-radio-button>
        </el-radio-group>
        <el-button type="primary" round icon="el-icon-plus" @click="handleCreateCategory()"></el-button>
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
    <div class="add-form">
          <el-dialog
            title="新增文章分类"
            :visible.sync="dialogFormVisible"
            :close-on-click-modal="dialogAutoExit"
          >
            <template>
              <el-tabs v-model="activeName" type="card">
                <el-tab-pane label="分类信息" name="first">
                  <el-form
                    ref="dataAddForm"
                    :model="formData"
                    :rules="rules"
                    label-position="right"
                    label-width="100px"
                  >
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="分类名称" prop="categroyName">
                          <el-input v-model="formData.categoryName" />
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-form>
                </el-tab-pane>
              </el-tabs>
            </template>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取消</el-button>
              <el-button type="primary" @click="handleAddCategory()">确定</el-button>
            </div>
          </el-dialog>
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
      id: '',
      formData: {},
      dialogFormVisible: false,
      rules: {
        
      }
    };
  },
  methods: {
    imgAdd(filename,file){
      var formData = new FormData();
      formData.append('file',file);
      this.$axios({
        url: '/story/file?type=article',
        method: 'post',
        data: formData,
        headers: {'Content-Type': 'multipart/form-data'}
      }).then(res=>{
        this.$refs.md.$img2Url(filename,res.data.data);
      })
    },
    imgDel(){

    },
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
    },
    handleCreateCategory() {
      //弹出添加窗口将表单数据清空
      this.resetForm();
      this.dialogFormVisible = true;
      try {
        //将表单验证结果清空
        this.$refs["dataAddForm"].clearValidate();
      } catch (e) {}
    },
    handleAddCategory() {
      this.$refs["dataAddForm"].validate(valid => {
        // 所有验证通过后才会为true,只要有一个失败就是false
        if (valid) {
          this.$axios
            .post("/story/category", this.formData)
            .then(res => {
              this.$message({
                message: res.data.message,
                type: res.data.flag ? "success" : "error"
              });
              this.queryAllCategories();
            });
          this.dialogFormVisible = false;
        } else {
          // console.log('error submit!!');
          // 中止form表单的提交
          return false;
        }
      });
    },
    resetForm() {
      this.formData = {}; // 清空表单数据
      this.roleIds = [];
      this.tableData = []; //添加表单窗口中检查组列表数据
      this.activeName = "first";
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