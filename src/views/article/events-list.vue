<template>
  <div style="margin-top: 30px">
    <!-- 使用改进的表单组件 -->
    <custom-form
      :form-items="formItems"
      @submit="formhandleSubmit"
      @reset="handleReset"
    />

    <div class="ml-20">
      <el-button
        type="primary"
        icon="el-icon-circle-plus-outline"
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
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :before-close="dialogConfig.handleClose"
    >
      <FreeFromSubmit
        label-width="120px"
        :dialog-config="dialogConfig"
        :form-data="dialogConfig.formData"
        :form-items="dialogConfigFormItems"
        @submit="dialogConfig.handleSubmit"
        @reset="dialogConfig.handleReset"
      >
        <Tinymce slot="fwbk" v-model="dialogConfig.formData.descText" />
      </FreeFromSubmit>
    </el-dialog>
  </div>
</template>

<script>
import CustomForm from "@/components/FreeFrom";
import FreeFromSubmit from "@/components/FreeFromSubmit";
import CustomTable from "@/components/FreeTable/table.vue";
import activeBut from "@/mixins/activeBut";
import Tinymce from "@/components/Tinymce";
import {
  addNotice,
  deleteNotice,
  queryAllNotice,
  updateNotice,
} from "@/api/article";

export default {
  components: {
    CustomForm,
    CustomTable,
    FreeFromSubmit,
    Tinymce,
  },
  mixins: [activeBut],
  data() {
    return {
      paginationPage: {
        pageNum: 1,
        pageSize: 10,
      },
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
        { prop: "title", label: this.$t("标题") },
        {
          prop: "status",
          label: this.$t("状态"),
          render: (h, b) => {
            switch (b.row.status) {
              case 1:
                return <el-tag type="success">{this.$t("开启")}</el-tag>;
              case 0:
                return <el-tag type="danger">{this.$t("关闭")}</el-tag>;
              default:
                break;
            }
          },
        },
        { prop: "sort", label: this.$t("排序") },
        { prop: "descText", label: this.$t("描述") },
        { prop: "createTime", label: this.$t("创建时间") },
      ];
    },
    formItems() {
      return [
        {
          prop: "title",
          componentType: "el-input",
          props: { placeholder: "标题" },
        },
      ];
    },
    dialogConfigFormItems() {
      return [
        {
          label: this.$t("标题"),
          prop: "title",
          span: 24,
          componentType: "el-input",
          rules: {
            required: true,
            message: this.$t("请输入标题"),
            trigger: "blur",
          },
        },
        {
          label: this.$t("排序"),
          prop: "sort",
          span: 24,
          componentType: "el-input",
          rules: {
            required: true,
            message: this.$t("请输入排序"),
            trigger: "blur",
          },
        },

        {
          label: this.$t("状态"),
          prop: "status",
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
        {
          label: this.$t("产品描述"),
          prop: "descText",
          span: 24,
          componentType: "",
        },
      ];
    },
  },
  mounted() {
    this.getList();
  },
  methods: {
    async getList(e) {
      let opt = this.paginationPage;
      if (e) {
        opt = {
          ...opt,
          ...e,
        };
      }
      const res = await queryAllNotice(opt);
      if (res.status === 0) {
        console.log(res.data.total, "=====");
        this.tableData = res.data.records;
        this.total = res.data.total;
      }
    },
    async handleSubmit() {
      console.log(333);
      if (this.dialogConfig.type === 1) {
        const res = await addNotice({
          ...this.dialogConfig.formData,
        });
        if (res.status === 0) {
          this.getList();
          this.dialogConfig.visible = false;
          this.$message({
            message: this.$t("新增成功"),
            type: "success",
          });
        }
      } else {
        const res = await updateNotice(this.dialogConfig.formData);
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
      const res = await deleteNotice({
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
      console.log(a, "---");

      this.paginationPage = {
        pageNum: a.page,
        pageSize: a.pageSize,
      };
      this.getList();
    },
    formhandleSubmit(formData) {
      this.getList(formData);
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
      this.dialogConfig.title = this.$t("添加公告");
      this.dialogConfig.formData = {
        status: 1,
      };
    },
    handleEdit(row) {
      this.dialogConfig.visible = true;
      this.dialogConfig.type = 2;
      this.dialogConfig.title = this.$t("编辑公告");
      this.dialogConfig.formData = row;
    },
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
