<template>
  <div>
    <!-- 使用改进的表单组件 -->
    <custom-form
      :form-items="formItems"
      @submit="formhandleSubmit"
      @reset="handleReset"
    />

    <div class="ml-20">
      <el-button
        icon="el-icon-circle-plus-outline"
        type="primary"
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
  sysaddUser,
  sysdelUser,
  sysqueryUser,
  sysupdateUser,
} from "@/api/article";
import CustomForm from "@/components/FreeFrom";
import FreeFromSubmit from "@/components/FreeFromSubmit";
import CustomTable from "@/components/FreeTable/table.vue";
import activeBut from "@/mixins/activeBut";
import { timeFormat } from "@/utils";

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
    dialogConfigFormItems() {
      return [
        {
          label: this.$t("登录名"),
          prop: "username",
          componentType: "el-input",
          rules: {
            required: true,
            message: this.$t("请输入登录名"),
            trigger: "blur",
          },
        },
        {
          label: this.$t("密码"),
          prop: "password",
          componentType: "el-input",
          rules: {
            required: true,
            message: this.$t("请输入密码"),
            trigger: "blur",
          },
        },
        {
          label: this.$t("昵称"),
          prop: "nickname",
          componentType: "el-input",
          rules: {
            required: true,
            message: this.$t("请输入昵称"),
            trigger: "blur",
          },
        },
        {
          label: this.$t("Email"),
          prop: "email",
          componentType: "el-input",
          rules: {
            required: true,
            message: this.$t("请输入Email"),
            trigger: "blur",
          },
        },
        {
          label: this.$t("上级归属"),
          prop: "leaderName",
          componentType: "el-select",
          props: {
            placeholder: "",
            clearable: true,
            options: this.tableData,
          },
          rules: {
            required: true,
            message: this.$t("请选择上级归属"),
            trigger: "change",
          },
        },
        {
          label: this.$t("角色"),
          prop: "role",
          componentType: "el-select",
          props: {
            placeholder: "",
            clearable: true,
            options: [
              { label: "业务经理", value: 1 },
              { label: "业务组长", value: 2 },
              { label: "业务专员", value: 3 },
            ],
          },
          rules: {
            required: true,
            message: this.$t("请选择角色"),
            trigger: "change",
          },
        },
        {
          label: this.$t("状态"),
          prop: "status",
          componentType: "el-radio-group",
          props: {
            placeholder: "",
            options: [
              { label: "开启", value: 1 },
              { label: "关闭", value: 0 },
            ],
          },
          rules: { required: true, message: "请输入姓名", trigger: "blur" },
        },
      ];
    },
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
        { prop: "leaderName", label: this.$t("上级归属") },
        { prop: "username", label: this.$t("登录名") },
        { prop: "nickname", label: this.$t("昵称") },
        { prop: "email", label: "Email" },
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
        {
          prop: "role",
          label: this.$t("角色"),
          render: (h, b) => {
            switch (b.row.role) {
              case 1:
                return <el-tag type="success">{this.$t("业务经理")}</el-tag>;
              case 0:
                return <el-tag type="danger">{this.$t("超级管理员")}</el-tag>;
              case 2:
                return <el-tag type="danger">{this.$t("业务组长")}</el-tag>;
              case 3:
                return <el-tag type="danger">{this.$t("业务专员")}</el-tag>;
              default:
                break;
            }
          },
        },
        {
          prop: "createTime",
          label: this.$t("加入时间"),
          render: (h, b) => {
            return <div>{timeFormat(b.row.createTime)}</div>;
          },
        },
        {
          prop: "lastLogin",
          label: this.$t("登入时间"),
          render: (h, b) => {
            return timeFormat(b.row.lastLogin);
          },
        },
      ];
    },
    formItems() {
      return [
        {
          prop: "name",
          componentType: "el-input",

          props: { placeholder: this.$t("登录名") },
        },
        {
          prop: "name",
          componentType: "el-input",
          props: { placeholder: this.$t("昵称") },
        },
        {
          prop: "name",
          componentType: "el-input",
          props: { placeholder: "Email" },
        },
        {
          prop: "Email",
          componentType: "el-date-picker",
          span: 7,
          props: {
            type: "daterange",
            "range-separator": this.$t("至"),
            "start-placeholder": this.$t("开始日期"),
            "end-placeholder": this.$t("结束日期"),
          },
        },
      ];
    },
  },
  mounted() {
    this.getList();
  },
  methods: {
    async getList(e) {
      const res = await sysqueryUser(e);
      if (res.status === 0) {
        // { label: "开启", value: 1 },
        res.data.map((item) => {
          item.label = item.username;
          item.value = item.username;
        });
        this.tableData = res.data;
        this.total = res.data.length;
      }
    },
    async handleSubmit() {
      if (this.dialogConfig.type === 1) {
        const res = await sysaddUser({
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
        const res = await sysupdateUser(this.dialogConfig.formData);
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
      console.log(data, "===");
      const res = await sysdelUser({
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
    formhandleSubmit(formData) {
      this.getList(formData);
      console.log("提交表单", formData);
    },
    handleReset() {
      console.log("重置表单");
    },
    handleAdd() {
      this.dialogConfig.visible = true;
      this.dialogConfig.type = 1;
      this.dialogConfig.title = this.$t("添加管理员");
      this.dialogConfig.formData = {
        gessadnder: "male",
      };
    },
    handleEdit(row) {
      this.dialogConfig.visible = true;
      this.dialogConfig.type = 2;
      this.dialogConfig.title = this.$t("编辑管理员");
      this.dialogConfig.formData = row;
    },
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
