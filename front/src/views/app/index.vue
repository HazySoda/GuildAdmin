<template>
  <el-container>
    <el-header height="80px">
      <img class="logo" src="/static/logo.png" />
      <span class="title">部落中街冷饮店</span>
      <div class="actions">
        <span>[ {{nickname}} ]</span>
        <el-button type="text" class="btn-logout" @click="logout">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          class="el-nav"
          :default-active="defaultActive"
          :router="true"
          text-color="#fff"
          background-color="#1B2737"
          active-text-color="#43b9ff">
          <el-menu-item index="/app/first-publish">
            <i class="el-icon-time"></i>
            <span slot="title">首发统计</span>
          </el-menu-item>
          <el-menu-item index="/app/role">
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
</template>

<script>
export default {
  data () {
    return {
      defaultActive: this.$route.path,
      nickname: ''
    }
  },
  methods: {
    logout () {
      window.localStorage.clear()
      this.$router.replace('/login')
    }
  },
  created () {
    this.nickname = window.localStorage.getItem('nickname') || ''
  }
}
</script>

<style lang="scss">
@import '../../assets/scss/_layout.scss';
</style>
