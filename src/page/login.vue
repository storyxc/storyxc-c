<template>
    <div id="app">
    <div id="banner">
        <img :src="icon" alt="story" width="120" height="120">
    </div>
    <div id="auth-header">
        <h1>Sign in to StoryXc</h1>
    </div>
    <div class="form">
        <form id="loginForm" action="/login" method="post">
            <label>Username</label>
            <input type="text" name="username" id="username"
                      tabindex="1" autofocus="autofocus" class="form-control input-block"/>
            <label>Password</label>
            <input type="password" name="password" id="password" class="form-control input-block"/>
            <div style="text-align: center;">
                <el-button style="color: #06b6ef;border-radius: 10px" native-type="submit" >登录</el-button>
            </div>
        </form>
        <p>没有账号?
            <a href="/register">
                立即注册
            </a>
        </p>
    </div>
</div>
</template>
<script>
export default {
    name: 'login',
    data(){
        return{
            icon: 'static/story.jpg'
        }
    }
}
</script>


<style lang="less" scoped>
@import '../static/css/login.css';
</style>