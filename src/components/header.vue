<template>
    <header id="header">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <div id="toolbar">
        <!-- 未登录状态  -->
        <span class="login_out">
            <a href="/page/login.html">登录</a>
            <a href="/page/register.html">注册</a>
        </span>
        <!-- 登录状态  -->
        <span class="login" style="display: none">
            <span>欢迎回来
            {{admin}}
            </span>
            <a href="/logout">注销</a>
        </span>
    </div>
</header>
</template>
<script>
export default {
    name: 'Header'
}
</script>