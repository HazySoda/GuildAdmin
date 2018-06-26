<template>
  <div>
    <el-table :data="tableData" border stripe>
      <el-table-column label="昵称" prop="nickname"></el-table-column>
      <el-table-column label="角色名" prop="name"></el-table-column>
      <el-table-column label="职责" prop="zhize"></el-table-column>
      <el-table-column label="职业" prop="career"></el-table-column>
      <el-table-column label="第一专业技能" prop="firstSkill"></el-table-column>
      <el-table-column label="第二专业技能" prop="secondSkill"></el-table-column>
      <el-table-column label="8.0是否首发">
        <template slot-scope="scope">
          {{scope.row.firstPublish ? '是' : '否'}}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [
        {
          id: 0,
          nickname: '冰棍',
          name: '中街老冰棍',
          zhize: '坦克',
          career: '死亡骑士',
          firstSkill: '采矿',
          secondSkill: '剥皮',
          firstPublish: true
        },
        {
          id: 0,
          nickname: '冰棍',
          name: '中街老冰棍',
          zhize: '坦克',
          career: '死亡骑士',
          firstSkill: '采矿',
          secondSkill: '剥皮',
          firstPublish: true
        },
        {
          id: 0,
          nickname: '冰棍',
          name: '中街老冰棍',
          zhize: '坦克',
          career: '死亡骑士',
          firstSkill: '采矿',
          secondSkill: '剥皮',
          firstPublish: true
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
