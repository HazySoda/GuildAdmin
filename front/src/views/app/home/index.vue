<template>
  <div class="v-home">
    <div class="notice">
    <h1>公会公告</h1>
      <ul>
        <li>1. 8.0装备分配采用活动考勤制度。</li>
        <li>2. 活动考勤制度只针对首发角色，一人多号情况下，非首发角色仅拥有最低拾取权。</li>
        <li>3. 副本中犯错罚交公修，1000-3000G，每周统计一次。</li>
        <li>4. 公会开荒时间为周五到周日 (周日为晚上)，Farm时间为周日下午三点。</li>
        <li>5. 成员之间发生矛盾禁止激化、扩大、拉帮结派。</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style lang="scss">
.v-home {
  .notice {
    width: 600px;
    margin: 100px auto 0;
    h1 {
      font-size: 30px;
      letter-spacing: 5px;
      text-align: center;
    }
    ul {
      margin-top: 10px;
      li {
        padding: 5px 0;
      }
    }
  }
}
</style>
