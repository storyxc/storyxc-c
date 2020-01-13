<template>
  <div>
    <el-container>
      <el-header class="main-header" style="height:70px;">
        <nav class="navbar navbar-static-top">
          <!-- Logo -->
          <a href="/" class="logo" style="text-align:center">
            <span class="logo-lg">
              <img src="/static/logo.png" />
            </span>
          </a>
          <div class="right-menu">
            <el-dropdown
              class="avatar-container right-menu-item"
              trigger="click"
              @command="handleCommand"
            >
              <div class="avatar-wrapper">
                <img src="/static/story.jpg" class="user-avatar" />
                {{username}}
              </div>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item divided command="changePwd">
                  <span style="display:block;" @click="handleUpdate()">修改密码</span>
                </el-dropdown-item>
                <el-dropdown-item divided command="logout">
                  <span style="display:block;">退出</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </nav>
      </el-header>
      <el-container>
        <el-aside width="200px" style="background-color: rgb(255, 255, 255)">
          <el-menu :default-active="default_active_menu" v-loading="loading">
            <el-submenu v-for="(menu,i) in menuListActive" :index="menu.path" :key="i">
              <template slot="title">
                <i class="fa" :class="menu.icon"></i>
                {{menu.name}}
              </template>
              <template v-for="(child,i) in menu.children">
                <el-menu-item :index="child.path" :key="i">
                  <a :href="child.linkUrl" target="right">{{child.name}}</a>
                </el-menu-item>
              </template>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-container>
          <iframe
            name="right"
            class="el-main"
            :src="menuActiveURL"
            width="100%"
            height="100%"
            frameborder="0"
            scrolling="no"
          ></iframe>
        </el-container>
      </el-container>
    </el-container>

    <!--编辑标签弹层-->
    <div class="add-form" id="changePwd">
      <el-dialog
        title="修改密码"
        :visible.sync="dialogFormVisible4Edit"
        :close-on-click-modal="dialogAutoExit"
      >
        <template>
          <el-form
            ref="dataEditForm"
            :model="formData"
            :rules="rules"
            label-position="right"
            label-width="100px"
          >
            <el-col :span="12">
              <el-form-item label="旧密码" prop="pastPassword">
                <el-input type="password" v-model="formData.pastPassword" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="新密码" prop="newPassword">
                <el-input type="password" v-model="formData.newPassword" />
              </el-form-item>
            </el-col>
          </el-form>
        </template>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible4Edit = false">取消</el-button>
          <el-button type="primary" @click="handleEdit()">确定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  name: "management",
  data() {
    return {
      username: "",
      menuListActive: [],
      menuActiveURL: "/roleManagement",
      loading: false,
      dialogFormVisible4Edit: false,
      formData: {}
    };
  },
  created() {
    this.getUsernameAndMenus();
  },
  methods: {
    getUsernameAndMenus() {
      this.$axios.get("/story/menu/getCurrentUser").then(res => {
        if (res.data.flag) {
          this.username = res.data.data.username;
          this.$axios
            .get("/story/menu/getMenusByUsername", {
              params: {
                username: this.username
              }
            })
            .then(res => {
              if (res.data.flag) {
                this.menuListActive = res.data.data;
                this.loading = false;
              }
            });
        }
      });
    },
    handleCommand(command) {
      //注销操作
      if ("logout" === command) {
        this.$axios
          .get("/logout")
          .then(res => {
            window.location.replace(res.headers.Location);
          })
          .catch(window.location.reload());
      }
    },
    handleEdit() {
      this.$axios.put("/story/user/changePwd", this.formData).then(res => {
        if (res.data.flag) {
          this.dialogFormVisible4Edit = false;
        }
        this.$message({
          type: res.data.flag,
          message: res.data.message
        });
      });
    },
    handleUpdate() {
      this.dialogFormVisible4Edit = true;
    }
  }
};
</script>
<style lang="less" scoped>
@import "../static/css/style.css";
</style>