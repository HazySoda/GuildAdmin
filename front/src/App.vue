<template>
  <div id="app">
    <el-container>
      <el-header height="80px">
        <img class="logo" src="/static/logo.png" />
        <span class="title">部落中街冷饮店</span>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            class="el-nav"
            default-active="/"
            :router="true"
            text-color="#fff"
            background-color="#1B2737"
            active-text-color="#43b9ff">
            <el-menu-item index="/">
              <i class="el-icon-menu"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <el-menu-item index="/first-publish">
              <i class="el-icon-time"></i>
              <span slot="title">首发统计</span>
            </el-menu-item>
            <el-menu-item index="/role">
              <i class="el-icon-tickets"></i>
              <span slot="title">角色管理</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-container>
          <el-main>
            <router-view/>
          </el-main>
          <el-footer>Copyright &copy; 2018 腰花. All Rights Reserved.</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
@import './assets/scss/_base.scss';
@import './assets/scss/_layout.scss';
</style>
