<template>
  <div class="v-events">
    <el-row style="margin: 0 0 20px 2px;">
      <el-button type="primary" size="small" icon="el-icon-plus" @click="switchEventForm">创建活动</el-button>
    </el-row>
    <el-table :data="tableData" stripe header-cell-class-name="el-th-cell">
      <el-table-column label="活动时间" prop="date"></el-table-column>
      <el-table-column label="活动类型" prop="type">
        <template slot-scope="scope">
          <span v-if="scope.row.type === 0">开荒</span>
          <span v-if="scope.row.type === 1">碾压</span>
          <span v-if="scope.row.type === 2">其他</span>
        </template>
      </el-table-column>
      <el-table-column label="活动描述" prop="desc"></el-table-column>
      <el-table-column label="参与人数" prop="memCount"></el-table-column>
      <el-table-column label="活动状态" prop="status">
        <template slot-scope="scope">
          <span v-if="scope.row.status === 0">未开始</span>
          <span v-if="scope.row.status === 1">进行中</span>
          <span v-if="scope.row.status === 2">已结束</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="switchEventFormDetail(scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :visible.sync="isEventFormVisible"
      custom-class="event-dialog"
      :title="eventFormTitle">
      <el-form :model="eventForm" ref="eventForm" :rules="eventFormRules">
        <el-form-item label="活动时间" prop="date" label-width="80px">
          <el-date-picker
            type="date"
            :editable="false"
            v-model="eventForm.date"
            value-format="yyyy-MM-dd"
            placeholder="请选择活动日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="活动类型" prop="type" label-width="80px">
          <el-select v-model="eventForm.type" placeholder="请选择活动类型">
            <el-option label="开荒" :value="0"></el-option>
            <el-option label="碾压" :value="1"></el-option>
            <el-option label="其他" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动描述" prop="desc" label-width="80px">
          <el-input type="text" v-model="eventForm.desc" placeholder="请输入活动描述 (如: M本开荒)"></el-input>
        </el-form-item>
        <el-form-item label="活动状态" prop="status" label-width="80px">
          <el-select v-model="eventForm.status" placeholder="请选择活动状态">
            <el-option label="未开始" :value="0"></el-option>
            <el-option label="进行中" :value="1"></el-option>
            <el-option label="已结束" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="参与角色" prop="members" label-width="80px">
          <el-select multiple filterable v-model="eventForm.members" placeholder="请选择参与角色">
            <el-option v-for="item in roleList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="updateEventForm" v-if="isEventFormEditing">保存</el-button>
        <el-button type="primary" @click="submitEventForm" v-else>保存</el-button>
        <el-button @click="switchEventForm">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as api from '@/api/app'

export default {
  data () {
    return {
      tableData: [],
      eventFormTitle: '',
      isEventFormVisible: false,
      eventForm: {
        date: '',
        type: '',
        desc: '',
        status: '',
        members: []
      },
      eventFormRules: {
        date: {required: true, message: '请选择活动日期'},
        type: {required: true, message: '请选择活动类型'},
        desc: {required: true, message: '请填写活动描述'},
        status: {required: true, message: '请选择活动状态'},
        members: {required: true, message: '请选择参与成员'}
      },
      currentEventId: 0,
      isEventFormEditing: false,
      roleList: []
    }
  },
  methods: {
    switchEventForm () {
      this.eventForm = {
        date: '',
        type: '',
        desc: '',
        status: '',
        members: []
      }
      this.isEventFormEditing = false
      this.eventFormTitle = '创建活动'
      this.isEventFormVisible = !this.isEventFormVisible
      this.$refs.eventForm && this.$refs.eventForm.resetFields()
    },
    submitEventForm () {
      this.$refs.eventForm.validate(async valid => {
        if (valid) {
          const res = await api.addEvent({
            ...this.eventForm,
            members: this.eventForm.members.join(',')
          })
          const err = this.$catchErr(res)
          if (err) return
          this.switchEventForm()
          this.queryEvent()
        }
      })
    },
    switchEventFormDetail (row) {
      this.currentEventId = row.id
      this.eventForm = {
        ...row,
        members: row.members.split(',').map(i => ~~i)
      }
      this.isEventFormEditing = true
      this.eventFormTitle = '修改活动'
      this.isEventFormVisible = true
    },
    updateEventForm () {
      this.$refs.eventForm.validate(async valid => {
        if (valid) {
          const res = await api.updateEvent({
            id: this.currentEventId,
            ...this.eventForm,
            members: this.eventForm.members.join(',')
          })
          const err = this.$catchErr(res)
          if (err) return
          this.switchEventForm()
          this.queryEvent()
        }
      })
    },
    async queryEvent () {
      const res = await api.queryEvent()
      const err = this.$catchErr(res)
      if (err) return
      const { data } = res.data
      data.forEach(i => {
        i.memCount = i.members.split(',').length
      })
      this.tableData = data
    },
    async queryRoleList () {
      const res = await api.queryFirstPublish({
        career: '',
        duty: '',
        firstSkill: '',
        secondSkill: '',
        firstPublish: true
      })
      const err = this.$catchErr(res)
      if (err) return
      this.roleList = res.data.data
    }
  },
  mounted () {
    this.queryRoleList()
    this.queryEvent()
  }
}
</script>

<style lang="scss">
.v-events {
  .el-table__row {
    text-align: center;
    &.career-row {
      color: #fff;
      pointer-events: none;
    }
  }
  .event-dialog {
    width: 500px;
    .el-form {
      .el-select, .el-input {
        width: 100%;
      }
    }
  }
}
</style>
