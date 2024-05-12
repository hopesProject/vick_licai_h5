<template>
  <div style="margin-top: 30px">
    <!-- 使用改进的表单组件 -->
    <custom-form
      :form-items="formItems"
      @submit="formHandleSubmit"
      @reset="handleReset"
    />

    <div class="ml-20">
      <el-button
        icon="el-icon-circle-plus-outline"
        type="primary"
        @click="handleAdd"
      >
        {{ $t("添加") }}
      </el-button>
    </div>
    <custom-table
      :data="tableData"
      :total="total"
      :columns="tableColumns"
      :columns-props="tableColumnsProps"
      :pagination="true"
      @sort-change="handleSortChange"
      @paginationChange="paginationChange"
    />
    <el-dialog
      :title="dialogConfig.title"
      :visible.sync="dialogConfig.visible"
      width="50%"
      :before-close="dialogConfig.handleClose"
    >
      <FreeFromSubmit
        label-width="120px"
        :dialog-config="dialogConfig"
        :form-data="dialogConfig.formData"
        :form-items="dialogConfigFormItems"
        @submit="dialogConfig.handleSubmit"
        @reset="dialogConfig.handleReset"
      />
    </el-dialog>
  </div>
</template>

<script>
import {
  addPaySetting,
  delPaySetting,
  queryPaySetting,
  updatePaySetting,
} from "@/api/article";
import CustomForm from "@/components/FreeFrom";
import FreeFromSubmit from "@/components/FreeFromSubmit";
import CustomTable from "@/components/FreeTable/table.vue";
import activeBut from "@/mixins/activeBut";

export default {
  components: {
    CustomForm,
    CustomTable,
    FreeFromSubmit,
  },
  mixins: [activeBut],
  data() {
    return {
      total: 0,
      // 表格数据
      tableData: [],

      // 表格样式配置
      tableColumnsProps: {
        align: "center",
      },
    };
  },
  computed: {
    tableColumns() {
      return [
        {
          prop: "cityss",
          label: this.$t("操作"),
          render: (h, b) => {
            return this.renderActions(h, b, [
              {
                name: this.$t("编辑"),
                onClick: "handleEdit",
              },

              {
                name: this.$t("删除"),
                type: 1,
                onClick: "handleDelete",
              },
            ]);
          },
        }, // 将操作列放在最后
        { prop: "id", label: "ID", sortable: true },
        { prop: "payLevelTitle", label: this.$t("薪资标题") },
        { prop: "directThrustCount", label: this.$t("直推人数") },
        { prop: "payAmount", label: this.$t("薪资奖金") },
        { prop: "payStatus", label: this.$t("薪资状态") },
      ];
    },
    formItems() {
      return [
        {
          prop: "name",
          componentType: "el-input",
          props: { placeholder: "标题" },
        },
      ];
    },
    dialogConfigFormItems() {
      return [
        {
          label: this.$t("薪资标题"),
          prop: "payLevelTitle",
          span: 24,
          componentType: "el-input",
          rules: {
            required: true,
            message: this.$t("请输入薪资标题"),
            trigger: "blur",
          },
        },
        {
          label: this.$t("直推人数"),
          prop: "directThrustCount",
          span: 24,
          componentType: "el-input",
          rules: {
            required: true,
            message: this.$t("请输入直推人数"),
            trigger: "blur",
          },
        },
        {
          label: this.$t("薪资奖金"),
          prop: "payAmount",
          span: 24,
          componentType: "el-input",
          rules: {
            required: true,
            message: this.$t("请输入薪资奖金"),
            trigger: "blur",
          },
        },

        {
          label: this.$t("薪资状态"),
          prop: "payStatus",
          span: 24,
          componentType: "el-radio-group",
          props: {
            placeholder: "",
            options: [
              { label: this.$t("启用"), value: "1" },
              { label: this.$t("禁用"), value: "0" },
            ],
          },
        },
      ];
    },
  },
  mounted() {
    this.getList();
  },
  methods: {
    async getList() {
      const res = await queryPaySetting();
      if (res.status === 0) {
        this.tableData = res.data;
        this.total = res.data.length;
      }
    },
    async handleSubmit(e) {
      if (this.dialogConfig.type === 1) {
        const res = await addPaySetting(e);
        if (res.status === 0) {
          this.getList();
          this.dialogConfig.visible = false;
          this.$message({
            message: this.$t("新增成功"),
            type: "success",
          });
        }
      } else {
        const res = await updatePaySetting(e);
        if (res.status === 0) {
          this.getList();
          this.dialogConfig.visible = false;
          this.$message({
            message: this.$t("修改成功"),
            type: "success",
          });
        }
      }
    },
    handleClose() {
      this.dialogConfig.visible = false;
    },
    paginationChange(a, b) {
      console.log(a, b);
    },
    formHandleSubmit(formData) {
      console.log("提交表单", formData);
    },
    handleReset() {
      console.log("重置表单");
    },
    handleSortChange({ column, prop, order }) {
      // 在这里处理排序逻辑
      console.log("列名:", column.label);
      console.log("属性名:", prop);
      console.log("排序方式:", order);
      // 根据需要对表格数据进行排序操作
    },
    // 添加
    handleAdd() {
      this.dialogConfig.visible = true;
      this.dialogConfig.type = 1;
      this.dialogConfig.title = this.$t("薪资添加");
      this.dialogConfig.formData = {
        payStatus: "1",
      };
    },
    handleEdit(row) {
      this.dialogConfig.visible = true;
      this.dialogConfig.type = 2;
      this.dialogConfig.title = this.$t("薪资编辑");
      this.dialogConfig.formData = row;
    },
    // 删除
    async handleDelete(data) {
      const res = await delPaySetting({
        id: data.id,
      });
      if (res.status === 0) {
        this.getList();
        this.$message({
          message: this.$t("删除成功"),
          type: "success",
        });
      }
    },
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
