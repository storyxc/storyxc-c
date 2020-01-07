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
                  <span style="display:block;">修改密码</span>
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
      loading: false
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
      //修改密码操作
      if ("changePwd" === command) {
        this.$message("你选择了修改密码");
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import "../static/css/style.css";
</style>