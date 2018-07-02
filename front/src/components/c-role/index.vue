<template>
  <el-card class="c-role">
    <div slot="header" class="header clearfix">
      <img v-if="data.duty === 0" class="duty" src="/static/duty/tank_64x64.png" alt="坦克" />
      <img v-if="data.duty === 1" class="duty" src="/static/duty/healer_64x64.png" alt="治疗者" />
      <img v-if="data.duty === 2 || data.duty === 3" class="duty" src="/static/duty/dps_64x64.png" alt="伤害输出" />
      <span class="name" :style="{color: enums.careerList[data.career].color}">
        {{data.name}} ({{data.user.nickname}})
      </span>
      <el-checkbox
        disabled
        v-model="data.firstPublish"
        style="float: right; vertical-align: middle;">
        首发
      </el-checkbox>
    </div>
    <p class="item">职业：{{enums.careerList[data.career].name}}</p>
    <p class="item">第一专业：{{enums.skillList[data.firstSkill].name}}</p>
    <p class="item">第二专业：{{enums.skillList[data.secondSkill].name}}</p>
  </el-card>
</template>

<script>
import * as enums from '@/enums'

export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      enums
    }
  }
}
</script>

<style lang="scss">
.c-role {
  color: #fff;
  margin-bottom: 10px;
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
        &.is-disabled.is-checked {
          .el-checkbox__inner {
            background-color: #666;
            &::after {
              border-color: #fff;
            }
          }
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
