<template>
  <el-card class="c-role">
    <div slot="header" class="header clearfix">
      <img v-if="data.duty === 'tank'" class="duty" src="/static/duty/tank_64x64.png" alt="" />
      <img v-if="data.duty === 'dps'" class="duty" src="/static/duty/dps_64x64.png" alt="" />
      <img v-if="data.duty === 'healer'" class="duty" src="/static/duty/healer_64x64.png" alt="" />
      <span class="name" :style="{color: data.color}">{{data.name}}</span>
      <el-checkbox
        v-model="data.firstPublish"
        style="float: right; vertical-align: middle;">
        首发
      </el-checkbox>
    </div>
    <p class="item">职业：{{data.career}}</p>
    <p class="item">第一专业：{{data.firstSkill}}</p>
    <p class="item">第二专业：{{data.secondSkill}}</p>
  </el-card>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="scss">
.c-role {
  color: #fff;
  .el-card__header {
    background: #333;
    border-bottom: 1px solid #666;
    .header {
      line-height: 30px;
      .duty {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        vertical-align: middle;
      }
      .name {
        font-size: 18px;
        vertical-align: middle;
        margin-left: 5px;
      }
      .el-checkbox {
        .el-checkbox__label {
          color: #fff !important;
          padding-left: 5px;
        }
      }
    }
  }
  .el-card__body {
    background: #333;
    padding: 10px 20px;
    .item {
      padding: 5px 0;
    }
  }
}
</style>
