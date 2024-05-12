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
        <el-button
          type="primary"
          @click="handleSubmit"
          :loading="dialogConfig.loading"
        >
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
      formData: {
        e_setting_maximum_withdrawal_amount: "0",
        e_setting_minimum_withdrawal_amount: "0",
        e_setting_number_of_withdrawals_per_day: "0",
        e_setting_withdrawal_rate: "0",
      },
      dataList: [],
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
          label: this.$t("法币提现费率"),
          prop: "e_setting_withdrawal_rate",
          componentType: "el-input",
          props: { placeholder: this.$t("请输入姓名") },
        },
        {
          label: this.$t("每日提现次数"),
          prop: "e_setting_number_of_withdrawals_per_day",
          componentType: "el-input",
          props: { placeholder: this.$t("请输入姓名") },
        },
        {
          label: this.$t("法币最低提现"),
          prop: "e_setting_minimum_withdrawal_amount",
          componentType: "el-input",
          props: { placeholder: this.$t("请输入姓名") },
        },
        {
          label: this.$t("法币最高提现"),
          prop: "e_setting_maximum_withdrawal_amount",
          componentType: "el-input",
          props: { placeholder: this.$t("请输入姓名") },
        },
      ];
    },
  },
  mounted() {
    this.getList();
  },
  methods: {
    async getList() {
      const res = await querySetting({ cType: 3 });
      if (res.status === 0) {
        console.log(res);
        this.dataList = res.data;
        res.data.map((item) => {
          this.formData[item.skey] = item.svalue;
        });
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
