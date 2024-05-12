<template>
  <div v-loading="dialogConfig.loading">
    <FreeFromSubmit
      :span="24"
      label-width="120px"
      :dialog-config="dialogConfig"
      :form-data="formData"
      :form-items="dialogConfigFormItems"
    
      @reset="dialogConfig.handleReset"
    >
      <div class="flex">
        <el-button type="primary" @click="handleSubmit">
          {{ $t("保存") }}
        </el-button>
      </div>
    </FreeFromSubmit>
  </div>
</template>

<script>
import activeBut from "@/mixins/activeBut";
import FreeFromSubmit from "@/components/FreeFromSubmit";
import { querySetting, updateSetting } from "@/api/article";

export default {
  components: {
    FreeFromSubmit,
  },
  mixins: [activeBut],
  data() {
    return {
      dataList: [],
      formData: {
        e_setting_android_down_url: "0",
        e_setting_group_customer_service: "0",
        e_setting_inv_bound_amount: "0",
        e_setting_new_bound_amount: "0",
        e_setting_recharge_reward_ratio: "0",
        e_setting_reg_bound_amount: "0",
        e_setting_tg_customer_service: "0",
        e_setting_title: "0",
        e_setting_ws_customer_service: "0",
      },
    };
  },
  computed: {
    tableColumns() {
      return;
    },
    formItems() {
      return;
    },
    dialogConfigFormItems() {
      return [
        {
          label: this.$t("平台标题"),
          prop: "e_setting_title",
          componentType: "el-input",
        },
        {
          label: this.$t("注册奖金金额"),
          prop: "e_setting_reg_bound_amount",
          componentType: "el-input",
        },

        {
          label: this.$t("新人奖金金额"),
          prop: "e_setting_new_bound_amount",
          componentType: "el-input",
        },
        {
          label: this.$t("邀请奖金金额"),
          prop: "e_setting_inv_bound_amount",
          componentType: "el-input",
        },
        {
          label: this.$t("充值奖励比例"),
          prop: "e_setting_recharge_reward_ratio",
          componentType: "el-input",
        },
        {
          label: this.$t("WS客服链接"),
          prop: "e_setting_ws_customer_service",
          componentType: "el-input",
        },
        {
          label: this.$t("TG客服链接"),
          prop: "e_setting_tg_customer_service",
          componentType: "el-input",
        },
        {
          label: this.$t("客服群组链接"),
          prop: "e_setting_group_customer_service",
          componentType: "el-input",
        },
        {
          label: this.$t("客服频道链接"),
          prop: "gender",
          componentType: "el-input",
        },
        {
          label: this.$t("Android APP"),
          prop: "e_setting_android_down_url",
          componentType: "el-input",
        },
      ];
    },
  },
  mounted() {
    this.getList();
  },
  methods: {
    async getList() {
      const res = await querySetting({ cType: 1 });
      if (res.status === 0) {
        console.log(res);
        this.dataList = res.data;
        res.data.map((item) => {
          this.formData[item.skey] = item.svalue;
        });
        // dialogConfig.formData
      }

      console.log(this.dialogConfig.formData);
    },
    async handleSubmit() {
      
      this.dialogConfig.loading = true;
      this.dataList.map((item) => {
        item.svalue = this.formData[item.skey];
      });
      const res = await updateSetting(this.dataList);
      if (res.status === 0) {
        this.$message({
          message: this.$t("修改成功"),
          type: "success",
        });
      }
      setTimeout(() => {
        this.dialogConfig.loading = false;
      }, 1000);
    },
  },
};
</script>

<style>
</style>
