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
        icon="el-icon-circle-plus-outline"
        @click="handleAdd"
        >{{ $t("添加") }}</el-button
      >
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
  addlevelSetting,
  dellevelSetting,
  querylevelSetting,
  updatelevelSetting,
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
      // 表单配置
    };
  },
  computed: {
    tableColumns() {
      return [
        {
          prop: "cityss",
          label: "操作",
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
        {
          prop: "img",
          label: this.$t("vip图片"),
          render: (h, b) => {
            return (
              <el-image
                style="width: 50px; height: 50px"
                src={b.row.img}
                preview-src-list={[b.row.img]}
              ></el-image>
            );
          },
        },
        { prop: "level", label: this.$t("等级") },
        {
          prop: "status",
          label: this.$t("状态"),
          render: (h, b) => {
            switch (b.row.status) {
              case "1":
                return <el-tag type="success">{this.$t("开启")}</el-tag>;
              case "0":
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
          label: this.$t("等级"),
          prop: "level",
          span: 24,
          componentType: "el-input",
          rules: {
            required: true,
            message: this.$t("请输入等级"),
            trigger: "blur",
          },
        },
        {
          label: this.$t("vip图片"),
          prop: "img",
          span: 24,
          componentType: "el-upload",
          rules: {
            required: true,
            message: this.$t("请输入vip图片"),
            trigger: "blur",
          },
        },

        {
          label: this.$t("等级状态"),
          prop: "status",
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
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      const res = await querylevelSetting();
      if (res.status === 0) {
        this.tableData = res.data;
        this.total = res.data.length;
        console.log(res);
      }
    },
    async handleSubmit() {
      if (this.dialogConfig.type === 1) {
        const res = await addlevelSetting(this.dialogConfig.formData);
        if (res.status === 0) {
          this.getList();
          this.dialogConfig.visible = false;
          this.$message({
            message: this.$t("新增成功"),
            type: "success",
          });
        }
      } else {
        const res = await updatelevelSetting(this.dialogConfig.formData);
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
      const res = await dellevelSetting({
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
      this.dialogConfig.title = this.$t("添加等级配置");
      this.dialogConfig.formData = {
        status: "1",
      };
    },
    handleEdit(row) {
      this.dialogConfig.visible = true;
      this.dialogConfig.type = 2;
      this.dialogConfig.title = this.$t("编辑等级配置");
      this.dialogConfig.formData = row;
    },
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
