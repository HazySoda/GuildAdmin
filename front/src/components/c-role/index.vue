<template>
  <el-card class="c-role">
    <div slot="header" class="header clearfix">
      <img v-if="data.duty === 0" class="duty" src="/static/duty/tank_64x64.png" alt="坦克" />
      <img v-if="data.duty === 1" class="duty" src="/static/duty/healer_64x64.png" alt="治疗者" />
      <img v-if="data.duty === 2 || data.duty === 3" class="duty" src="/static/duty/dps_64x64.png" alt="伤害输出" />
      <span class="name" :style="{color: enums.careerList[data.career].color}">
        {{data.name}} ({{data.user.nickname}})
      </span>
      <span class="tag" v-if="data.firstPublish">首发</span>
      <el-button v-if="showActions" class="edit-btn" size="mini" circle icon="el-icon-edit-outline" @click="handleEditBtnClick"></el-button>
    </div>
    <p class="item">职业：{{enums.careerList[data.career].name}}</p>
    <p class="item">第一专业：{{enums.skillList.find(i => i.id === data.firstSkill).name}}</p>
    <p class="item">第二专业：{{enums.skillList.find(i => i.id === data.secondSkill).name}}</p>
  </el-card>
</template>

<script>
import * as enums from '@/enums'

export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    },
    showActions: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      enums
    }
  },
  methods: {
    handleEditBtnClick () {
      this.$emit('edit-btn-click', this.data)
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
    padding: 10px 15px;
    .header {
      display: flex;
      align-items: center;
      position: relative;
      .duty {
        width: 28px;
        height: 28px;
        border-radius: 50%;
      }
      .name {
        font-size: 16px;
        margin-left: 5px;
      }
      .tag {
        border: 1px solid #fff;
        border-radius: 3px;
        font-size: 12px;
        margin-left: 5px;
        padding: 0 4px;
      }
      .edit-btn {
        position: absolute;
        right: -5px;
      }
    }
  }
  .el-card__body {
    font-size: 14px;
    background: #333;
    padding: 10px 20px;
    .item {
      padding: 5px 0;
    }
  }
}
</style>
