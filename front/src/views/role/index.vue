<template>
  <div class="v-role">
    <el-tabs v-model="activeTab">
      <el-tab-pane label="我的角色" name="personal">
        <el-button type="primary" size="small" icon="el-icon-plus" style="margin: 0 0 10px 2px;" @click="switchRoleForm">添加角色</el-button>
        <el-row :gutter="15" v-if="roleList.length > 0">
          <el-col :span="8" v-for="item in roleList" :key="item.id">
            <c-role :data="item"></c-role>
          </el-col>
        </el-row>
        <div class="no-data" v-else>
          还没有角色，去添加一个吧
        </div>
      </el-tab-pane>
      <el-tab-pane label="所有角色" name="all">
        <div>所有角色</div>
      </el-tab-pane>
    </el-tabs>
    <el-dialog
      :visible.sync="isRoleDialogVisible"
      title="添加角色"
      custom-class="role-dialog"
      :close-on-click-modal="false">
      <el-form :model="roleForm" ref="roleForm" :rules="roleFormRules">
        <el-form-item prop="name" label="角色名" :label-width="formLabelWidth">
          <el-input v-model="roleForm.name" placeholder="请填写游戏角色名"></el-input>
        </el-form-item>
        <el-form-item prop="career" label="职业" :label-width="formLabelWidth">
          <el-select v-model="roleForm.career" placeholder="请选择角色职业">
            <el-option
              v-for="item in enums.careerList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="duty" label="团队职责" :label-width="formLabelWidth">
          <el-select v-model="roleForm.duty" placeholder="请选择团队职责">
            <el-option
              v-for="item in enums.dutyList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="firstSkill" label="第一专业技能" :label-width="formLabelWidth">
          <el-select v-model="roleForm.firstSkill" placeholder="请选择第一专业技能">
            <el-option
              v-for="item in enums.skillList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="secondSkill" label="第二专业技能" :label-width="formLabelWidth">
          <el-select v-model="roleForm.secondSkill" placeholder="请选择第二专业技能">
            <el-option
              v-for="item in enums.skillList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="firstPublish" label="是否首发" :label-width="formLabelWidth">
          <el-radio-group v-model="roleForm.firstPublish">
            <el-radio :label="1">当然啦</el-radio>
            <el-radio :label="0">才不要</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitRoleForm">保存</el-button>
        <el-button @click="switchRoleForm">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as components from '@/components'
import * as enums from '@/enums'

export default {
  components,
  data () {
    return {
      enums,
      activeTab: 'personal',
      roleList: [
        {
          id: 0,
          name: '中街老冰棍',
          duty: 'tank',
          career: '死亡骑士',
          firstSkill: '采矿',
          secondSkill: '剥皮',
          firstPublish: true,
          color: '#C41E3B'
        },
        {
          id: 1,
          name: '中街五环',
          duty: 'dps',
          career: '武僧',
          firstSkill: '炼金',
          secondSkill: '工程',
          firstPublish: false,
          color: '#00ffba'
        },
        {
          id: 2,
          name: '鼻涕大侠',
          duty: 'healer',
          career: '圣骑士',
          firstSkill: '采矿',
          secondSkill: '草药',
          firstPublish: false,
          color: '#F48CBA'
        }
      ],
      isRoleDialogVisible: false,
      formLabelWidth: '110px',
      roleForm: {
        name: '',
        career: '',
        duty: '',
        firstSkill: '',
        secondSkill: '',
        firstPublish: 0
      },
      roleFormRules: {
        name: {required: true, message: '请填写此字段'},
        career: {required: true, message: '请填写此字段'},
        duty: {required: true, message: '请填写此字段'},
        firstSkill: {required: true, message: '请填写此字段'},
        secondSkill: {required: true, message: '请填写此字段'},
        firstPublish: {required: true, message: '请填写此字段'}
      }
    }
  },
  methods: {
    switchRoleForm () {
      this.isRoleDialogVisible = !this.isRoleDialogVisible
      this.roleForm = {
        name: '',
        career: '',
        duty: '',
        firstSkill: '',
        secondSkill: '',
        firstPublish: 0
      }
      this.$refs.roleForm && this.$refs.roleForm.resetFields()
    },
    submitRoleForm () {
      console.log(this.roleForm)
    }
  }
}
</script>

<style lang="scss">
.v-role {
  .el-tab-pane {
    min-height: 500px;
  }
  .no-data {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #333;
  }
  .role-dialog {
    width: 500px;
    .el-form {
      .el-select {
        width: 100%;
      }
    }
  }
}
</style>
