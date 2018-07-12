<template>
  <div class="v-role">
    <el-tabs v-model="activeTab" @tab-click="handleTabSwitch">
      <el-tab-pane label="我的角色" name="personal">
        <el-row style="margin: 0 0 10px 2px;">
          <el-button type="primary" size="small" icon="el-icon-plus" @click="switchRoleForm">添加角色</el-button>
        </el-row>
        <el-row :gutter="15" v-if="roleList.length > 0">
          <el-col :span="8" v-for="item in roleList" :key="item.id">
            <c-role
              :data="item"
              :show-actions="true"
              @edit-btn-click="switchDetail">
            </c-role>
          </el-col>
        </el-row>
        <div class="no-data" v-else>
          角色列表空空如也，去添加一个吧
        </div>
      </el-tab-pane>
      <el-tab-pane label="所有角色" name="all">
        <el-row :gutter="15" v-if="roleList.length > 0">
          <el-col :span="8" v-for="item in roleList" :key="item.id">
            <c-role
              :data="item"
              :show-actions="false"
              @edit-btn-click="switchDetail">
            </c-role>
          </el-col>
        </el-row>
        <div class="no-data" v-else>
           角色列表空空如也
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-dialog
      :visible.sync="isRoleDialogVisible"
      :title="roleFormTitle"
      custom-class="role-dialog"
      :close-on-click-modal="false">
      <el-form :model="roleForm" ref="roleForm" :rules="roleFormRules">
        <el-form-item prop="name" label="角色名" :label-width="formLabelWidth">
          <el-input v-model="roleForm.name" placeholder="请填写游戏角色名"></el-input>
        </el-form-item>
        <el-form-item prop="career" label="职业" :label-width="formLabelWidth">
          <el-select v-model="roleForm.career" placeholder="请选择角色职业" @change="roleForm.duty = ''">
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
            <el-option label="坦克" :value="0" :disabled="[4, 5, 7, 8, 9, 10].includes(roleForm.career)"></el-option>
            <el-option label="治疗" :value="1" :disabled="[0, 2, 4, 5, 8, 10, 11].includes(roleForm.career)"></el-option>
            <el-option label="DPS (近战)" :value="2" :disabled="[5, 7, 9, 10].includes(roleForm.career)"></el-option>
            <el-option label="DPS (远程)" :value="3" :disabled="[0, 1, 2, 6, 8, 11].includes(roleForm.career)"></el-option>
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
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitRoleForm" v-show="!isRoleFormEditing">保存</el-button>
        <el-button type="primary" @click="updateRoleForm" v-show="isRoleFormEditing">修改</el-button>
        <el-button @click="switchRoleForm">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as components from '@/components'
import * as enums from '@/enums'
import * as api from '@/api/app'

export default {
  components,
  data () {
    return {
      enums,
      uid: '',
      activeTab: 'personal',
      roleList: [],
      isRoleDialogVisible: false,
      formLabelWidth: '110px',
      roleFormTitle: '',
      isRoleFormEditing: false,
      roleForm: {
        name: '',
        career: '',
        duty: '',
        firstSkill: '',
        secondSkill: '',
        firstPublish: false
      },
      roleFormRules: {
        name: {required: true, message: '请填写角色名'},
        career: {required: true, message: '请选择职业'},
        duty: {required: true, message: '请选择团队职责'},
        firstSkill: {required: true, message: '请选择第一专业技能'},
        secondSkill: {required: true, message: '请选择第二专业技能'},
        firstPublish: {required: true, message: '请选择是否首发'}
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
        firstPublish: false
      }
      this.roleFormTitle = '添加角色'
      this.isRoleFormEditing = false
      this.$refs.roleForm && this.$refs.roleForm.resetFields()
    },
    submitRoleForm () {
      this.$refs.roleForm.validate(async valid => {
        if (valid) {
          const res = await api.addRole({
            ...this.roleForm,
            belongTo: this.uid
          })
          const err = this.$catchErr(res)
          if (err) return
          this.$message({
            type: 'success',
            message: res.data.message
          })
          this.switchRoleForm()
          this.queryRoleList(this.uid)
        }
      })
    },
    switchDetail (data) {
      this.roleForm = {
        ...data
      }
      this.roleFormTitle = '修改角色'
      this.isRoleFormEditing = true
      this.isRoleDialogVisible = true
    },
    updateRoleForm () {
      this.$refs.roleForm.validate(async valid => {
        if (valid) {
          const { id, name, career, duty, firstSkill, secondSkill, firstPublish } = this.roleForm
          const res = await api.updateRole({
            id,
            name,
            career,
            duty,
            firstSkill,
            secondSkill,
            firstPublish
          })
          const err = this.$catchErr(res)
          if (err) return
          this.$message({
            type: 'success',
            message: res.data.message
          })
          this.switchRoleForm()
          this.queryRoleList(this.uid)
        }
      })
    },
    async queryRoleList (belongTo = '') {
      const res = await api.queryRole({
        belongTo
      })
      const err = this.$catchErr(res)
      if (err) return
      const { data } = res.data
      this.roleList = data
    },
    handleTabSwitch () {
      const belongTo = this.activeTab === 'personal' ? this.uid : ''
      this.queryRoleList(belongTo)
    }
  },
  created () {
    this.uid = window.localStorage.getItem('uid')
    this.queryRoleList(this.uid)
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
