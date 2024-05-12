<template>
  <div style="margin-top: 30px">
    <!-- 使用改进的表单组件 -->
    <!-- <custom-form
      :formItems="formItems"
      @submit="handleSubmit"
      @reset="handleReset"
    /> -->

    <div class="ml-20">
      <el-button
        type="primary"
        @click="handleAdd"
        icon="el-icon-circle-plus-outline"
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
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :title="dialogConfig.title"
      :visible.sync="dialogConfig.visible"
      width="50%"
      :before-close="dialogConfig.handleClose"
    >
      <FreeFromSubmit
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
import CustomForm from "@/components/FreeFrom";
import FreeFromSubmit from "@/components/FreeFromSubmit";
import CustomTable from "@/components/FreeTable/table.vue";
import activeBut from "@/mixins/activeBut";
import {
  addProductClassify,
  delProductClassify,
  queryProductClassify,
  updateProductClassify,
} from "@/api/article";

export default {
  components: {
    CustomForm,
    CustomTable,
    FreeFromSubmit,
  },
  mixins: [activeBut],
  data() {
    return {
      // 表格数据
      tableData: [],
      total: 0,

      // 表格样式配置
      tableColumnsProps: {
        align: "center",
      },
      // 表单配置
    };
  },
  computed: {
    tableColumns() {
      return [
        {
          prop: "cityss",
          label: this.$t("操作"),
          fixed: "right",
          width: "200",
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
        { prop: "id", label: "ID" },
        { prop: "productClassify", label: this.$t("分类名称") },
        { prop: "sort", label: this.$t("分类排序") },

        {
          prop: "enable",
          label: this.$t("分类状态"),
          render: (h, b) => {
            switch (Number(b.row.enable)) {
              case 1:
                return <el-tag type="success">{this.$t("开启")}</el-tag>;
              case 0:
                return <el-tag type="danger">{this.$t("关闭")}</el-tag>;
              default:
                break;
            }
          },
        },
      ];
    },
    formItems() {
      return;
    },
    dialogConfigFormItems() {
      return [
        {
          label: "分类名称",
          prop: "productClassify",
          componentType: "el-input",
          props: { placeholder: this.$t("请输入分类名称") },
          rules: {
            required: true,
            message: this.$t("请输入分类名称"),
            trigger: "blur",
          },
        },
        {
          label: "产品排序",
          prop: "sort",
          componentType: "el-input",
          props: { placeholder: this.$t("请输入产品排序") },
          rules: {
            required: true,
            message: this.$t("请输入产品排序"),
            trigger: "blur",
          },
        },

        {
          label: this.$t("状态"),
          prop: "enable",
          span: 24,
          componentType: "el-radio-group",
          props: {
            placeholder: "",
            options: [
              { label: this.$t("启用"), value: 1 },
              { label: this.$t("禁用"), value: 0 },
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
      const res = await queryProductClassify();
      if (res.status === 0) {
        this.tableData = res.data;
        this.total = res.data.length;
      }
    },
    async handleSubmit() {
      if (this.dialogConfig.type === 1) {
        const res = await addProductClassify(this.dialogConfig.formData);
        if (res.status === 0) {
          this.getList();
          this.dialogConfig.visible = false;
          this.$message({
            message: this.$t("新增成功"),
            type: "success",
          });
        }
      } else {
        const res = await updateProductClassify(this.dialogConfig.formData);
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
    // 删除
    async handleDelete(data) {
      console.log(333);
      const res = await delProductClassify({
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
    handleClose() {
      this.dialogConfig.visible = false;
    },
    paginationChange(a, b) {
      console.log(a, b);
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
    handleAdd() {
      this.dialogConfig.visible = true;
      this.dialogConfig.type = 1;
      this.dialogConfig.title = this.$t("添加产品分类");
      this.dialogConfig.formData = {
        enable: 1,
      };
    },
    handleEdit(row) {
      this.dialogConfig.visible = true;
      this.dialogConfig.type = 2;
      this.dialogConfig.title = this.$t("编辑产品分类");
      this.dialogConfig.formData = row;
    },
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
