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
        e_setting_repurchase_commission: "0",
        e_setting_first_purchase_commission: "0",
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
          label: this.$t("首购佣金"),
          prop: "e_setting_first_purchase_commission",
          componentType: "el-input",
          props: { placeholder: this.$t("请输入姓名") },
        },
        {
          label: this.$t("复购佣金"),
          prop: "e_setting_repurchase_commission",
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
      const res = await querySetting({ cType: 4 });
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
