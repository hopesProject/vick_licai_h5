<template>
  <div class="page">
    <el-tabs type="border-card">
      <el-tab-pane :label="$t('平台设置')">
        <ptsz />
      </el-tab-pane>
      <el-tab-pane :label="$t('充值设置')">
        <czsz />
      </el-tab-pane>
      <el-tab-pane :label="$t('提现')">
        <tx />
      </el-tab-pane>
      <el-tab-pane :label="$t('分销')">
        <fx />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ptsz from "@/views/esmanager/components/ptsz";
import tx from "@/views/esmanager/components/tx";
import czsz from "@/views/esmanager/components/czsz";
import fx from "@/views/esmanager/components/fx";
export default {
  components: {
    ptsz,
    tx,
    czsz,
    fx,
  },

  data() {
    return {};
  },

  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style>
</style>
