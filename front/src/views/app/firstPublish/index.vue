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
    <el-table :data="tableData" :row-class-name="tableRowClassName" header-cell-class-name="el-th-cell">
      <el-table-column label="角色名">
        <template slot-scope="scope">
          {{scope.row.name}} ({{scope.row.user.nickname}})
        </template>
      </el-table-column>
      <el-table-column label="职业">
        <template slot-scope="scope">
          {{enums.careerList[scope.row.career].name}}
        </template>
      </el-table-column>
      <el-table-column label="团队职责">
        <template slot-scope="scope">
          {{enums.dutyList[scope.row.duty].name}}
        </template>
      </el-table-column>
      <el-table-column label="第一专业">
        <template slot-scope="scope">
          {{enums.skillList.find(i => i.id === scope.row.firstSkill).name}}
        </template>
      </el-table-column>
      <el-table-column label="第二专业">
        <template slot-scope="scope">
          {{enums.skillList.find(i => i.id === scope.row.secondSkill).name}}
        </template>
      </el-table-column>
      <el-table-column label="是否首发">
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
        careerBackground: false,
        firstPublish: true
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
      if (data.length > 0) {
        data.sort((a, b) => a.duty - b.duty)
      }
      this.tableData = data
    },
    tableRowClassName ({row, rowIndex}) {
      if (this.queryForm.careerBackground) {
        return `career-row career-id-${row.career}`
      }
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
  .el-th-cell {
    background: #dfe6ec;
    border-bottom: 1px solid #ebeef5;
    color: #333;
    text-align: center;
  }
  .el-table__row {
    text-align: center;
    &.career-row {
      color: #fff;
      pointer-events: none;
    }
  }
  .career-id-0 {
    background-color: #8e41c7;
  }
  .career-id-1 {
    background-color: #00ffba;
    color: #555 !important;
  }
  .career-id-2 {
    background-color: #c41e3b;
  }
  .career-id-3 {
    background-color: #ff7c0a;
  }
  .career-id-4 {
    background-color: #aad372;
  }
  .career-id-5 {
    background-color: #68ccef;
  }
  .career-id-6 {
    background-color: #f48cba;
  }
  .career-id-7 {
    background-color: #f0ebe0;
    color: #555 !important;
  }
  .career-id-8 {
    background-color: #fff468;
    color: #555 !important;
  }
  .career-id-9 {
    background-color: #2359ff;
  }
  .career-id-10 {
    background-color: #9382c9;
  }
  .career-id-11 {
    background-color: #c69b6d;
  }
}
</style>
