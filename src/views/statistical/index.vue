<template>
  <div class="page">
    <div class="statisical">
      <div class="item-box">
        <div class="header-box">当日统计</div>
        <el-descriptions direction="horizontal" :column="1" border>
          <el-descriptions-item :label="$t('注册会员')">
            kooriookami
          </el-descriptions-item>
          <el-descriptions-item
            :label="$t('充值次数')"
          >18100000000</el-descriptions-item>
          <el-descriptions-item
            :label="$t('首充次数')"
          >kooriookami</el-descriptions-item>
          <el-descriptions-item
            :label="$t('法币充值金额')"
          >18100000000</el-descriptions-item>
          <el-descriptions-item
            :label="$t('提现次数')"
          >kooriookami</el-descriptions-item>
          <el-descriptions-item
            :label="$t('法币提现金额')"
          >18100000000</el-descriptions-item>
          <el-descriptions-item
            :label="$t('订单数量')"
          >18100000000</el-descriptions-item>
          <el-descriptions-item
            :label="$t('订单合计')"
          >18100000000</el-descriptions-item>
        </el-descriptions>
      </div>
      <div class="item-box">
        <div class="header-box">所有统计</div>
        <el-descriptions direction="horizontal" :column="1" border>
          <el-descriptions-item :label="$t('注册会员')">
            kooriookami
          </el-descriptions-item>
          <el-descriptions-item
            :label="$t('充值次数')"
          >18100000000</el-descriptions-item>
          <el-descriptions-item
            :label="$t('首充次数')"
          >kooriookami</el-descriptions-item>
          <el-descriptions-item
            :label="$t('法币充值金额')"
          >18100000000</el-descriptions-item>
          <el-descriptions-item
            :label="$t('提现次数')"
          >kooriookami</el-descriptions-item>
          <el-descriptions-item
            :label="$t('法币提现金额')"
          >18100000000</el-descriptions-item>
          <el-descriptions-item
            :label="$t('订单数量')"
          >18100000000</el-descriptions-item>
          <el-descriptions-item
            :label="$t('订单合计')"
          >18100000000</el-descriptions-item>
        </el-descriptions>
      </div>
      <div class="item-box">
        <div class="header-box">自定义统计</div>
        <el-descriptions direction="horizontal" :column="1" border>
          <el-descriptions-item :label="$t('注册会员')">
            kooriookami
          </el-descriptions-item>
          <el-descriptions-item
            :label="$t('充值次数')"
          >18100000000</el-descriptions-item>
          <el-descriptions-item
            :label="$t('首充次数')"
          >kooriookami</el-descriptions-item>
          <el-descriptions-item
            :label="$t('法币充值金额')"
          >18100000000</el-descriptions-item>
          <el-descriptions-item
            :label="$t('提现次数')"
          >kooriookami</el-descriptions-item>
          <el-descriptions-item
            :label="$t('法币提现金额')"
          >18100000000</el-descriptions-item>
          <el-descriptions-item
            :label="$t('订单数量')"
          >18100000000</el-descriptions-item>
          <el-descriptions-item
            :label="$t('订单合计')"
          >18100000000</el-descriptions-item>
        </el-descriptions>
      </div>
    </div>

    <div>
      <el-date-picker
        v-model="value1"
        type="daterange"
        :range-separator="$t('至')"
        :start-placeholder="$t('开始日期')"
        :end-placeholder="$t('结束日期')"
      />
      <div style="margin-top: 20px">
        <el-button type="primary">{{ $t("提交") }}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
.statisical {
  padding: 40px 20px;
  display: flex;
  justify-content: space-between;
  .header-box {
    font-size: 12px;
    height: auto;
    line-height: 41px;
    background-color: #009688;
    color: #fff;
    padding: 0 15px;
    border-bottom: 1px solid #f6f6f6;
    border-radius: 2px 2px 0 0;
  }
  .item-box {
    width: 30%;
  }
}
@media screen and (max-width: 800px) {
  .statisical {
    padding: 40px 20px;
    display: flex;
    flex-direction: column;
    .header-box {
      font-size: 12px;
      height: auto;
      line-height: 41px;
      background-color: #009688;
      color: #fff;
      padding: 0 15px;
      border-bottom: 1px solid #f6f6f6;
      border-radius: 2px 2px 0 0;
    }
    .item-box {
      width: 100%;
      margin-top: 20px;
    }
  }
}
</style>
