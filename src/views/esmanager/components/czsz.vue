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
          :loading="dialogConfig.loading"
          @click="handleSubmit"
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
      dataList: [],
      formData: {
        e_setting_maximum_deposit_in_rupee: "0",
        e_setting_minimum_deposit_in_rupees: "0",
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
          label: this.$t("法币最低充值"),
          prop: "e_setting_minimum_deposit_in_rupees",
          componentType: "el-input",
        },
        {
          label: this.$t("法币最高充值"),
          prop: "e_setting_maximum_deposit_in_rupee",
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
      const res = await querySetting({ cType: 2 });
      if (res.status === 0) {
        console.log(res);
        this.dataList = res.data;
        res.data.map((item) => {
          this.formData[item.skey] = item.svalue;
        });
        // dialogConfig.formData
      }
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
