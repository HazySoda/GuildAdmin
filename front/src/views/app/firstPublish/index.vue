<template>
  <div class="v-first-publish">
    <el-card class="form-card">
      <el-form :inline="true" :model="queryForm" ref="queryForm" size="mini">
        <el-form-item label="职业" prop="career">
          <el-select v-model="queryForm.career">
            <el-option
              v-for="item in enums.careerList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="团队职责" prop="duty">
          <el-select v-model="queryForm.duty">
            <el-option
              v-for="item in enums.dutyList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="第一专业" prop="firstSkill">
          <el-select v-model="queryForm.firstSkill">
            <el-option
              v-for="item in enums.skillList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="第二专业" prop="secondSkill">
          <el-select v-model="queryForm.secondSkill">
            <el-option
              v-for="item in enums.skillList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职业色改写" prop="careerBackground">
          <el-checkbox v-model="queryForm.careerBackground"></el-checkbox>
        </el-form-item>
        <el-form-item label="只看首发" prop="firstPublish">
          <el-checkbox v-model="queryForm.firstPublish"></el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="ghost" @click="clearQueryForm">清空</el-button>
          <el-button type="primary" @click="queryFirstPublishList">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-table :data="tableData" border stripe>
      <el-table-column label="昵称" prop="nickname"></el-table-column>
      <el-table-column label="角色名" prop="name"></el-table-column>
      <el-table-column label="职业" prop="career">
        <template slot-scope="scope">
          {{enums.careerList[scope.row.career].name}}
        </template>
      </el-table-column>
      <el-table-column label="团队职责" prop="duty">
        <template slot-scope="scope">
          {{enums.dutyList[scope.row.duty].name}}
        </template>
      </el-table-column>
      <el-table-column label="第一专业技能" prop="firstSkill">
        <template slot-scope="scope">
          {{enums.skillList[scope.row.firstSkill].name}}
        </template>
      </el-table-column>
      <el-table-column label="第二专业技能" prop="secondSkill">
        <template slot-scope="scope">
          {{enums.skillList[scope.row.secondSkill].name}}
        </template>
      </el-table-column>
      <el-table-column label="8.0是否首发">
        <template slot-scope="scope">
          {{scope.row.firstPublish ? '是' : '否'}}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import * as enums from '@/enums'
import * as api from '@/api/app'

export default {
  data () {
    return {
      enums,
      queryForm: {
        career: '',
        duty: '',
        firstSkill: '',
        secondSkill: '',
        careerBackground: true,
        firstPublish: false
      },
      tableData: []
    }
  },
  methods: {
    clearQueryForm () {
      this.$refs.queryForm.resetFields()
    },
    async queryFirstPublishList () {
      const res = await api.queryFirstPublish(this.queryForm)
      const err = this.$catchErr(res)
      if (err) return
      const { data } = res.data
      this.tableData = data
    }
  },
  created () {
    this.queryFirstPublishList()
  }
}
</script>

<style lang="scss">
.v-first-publish {
  .form-card {
    margin-bottom: 20px;
  }
}
</style>
