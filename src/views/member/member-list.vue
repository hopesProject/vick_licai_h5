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
        type="primary"
        icon="el-icon-circle-plus-outline"
        @click="handleAdd"
      >
        {{ $t("添加") }}
      </el-button>
      <el-button type="primary" icon="el-icon-circle-plus-outline">
        {{ $t("导出") }}
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
      :close-on-click-modal="false"
      :close-on-press-escape="false"
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
    <el-dialog
      :title="$t('充值上分,请输入充值金额')"
      :visible.sync="visible"
      width="300px"
      :before-close="shangfenhandleClose"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-input v-model="rechargeAmount"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="visible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { addUser, delUser, queryUser, updateUser } from "@/api/article";
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
      // 充值金额
      rechargeAmount: 0,
      rechargeformData: {},
      visible: true,
      productClassifyList: [],
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
          fixed: "right",
          width: "200",
          render: (h, b) => {
            return this.renderActions(h, b, [
              {
                name: this.$t("编辑"),
                onClick: "handleEdit",
              },
              {
                name: this.$t("一键上分"),
                onClick: "handleEdits",
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
        { prop: "phone", label: this.$t("手机号") },
        { prop: "amount", label: this.$t("账户余额") },
        { prop: "businessManagerCode", label: this.$t("业务经理编码") },
        { prop: "invitationCode", label: this.$t("邀请码") },
        { prop: "loginTime", label: this.$t("登录时间") },
        { prop: "realName", label: this.$t("上级名字") },
        { prop: "regTime", label: this.$t("注册时间") },
        { prop: "upperLevelUserId", label: this.$t("上级用户id") },
        { prop: "upperPhone", label: this.$t("上级手机号码") },
      ];
    },
    formItems() {
      return [
        {
          prop: "id",
          componentType: "el-input",
          props: { placeholder: "ID" },
        },
        {
          prop: "phone",
          componentType: "el-input",
          props: { placeholder: this.$t("手机号码") },
        },
        {
          prop: "invitationCode",
          componentType: "el-input",
          props: { placeholder: this.$t("邀请码") },
        },
        {
          prop: "upperPhone",
          componentType: "el-input",
          props: { placeholder: this.$t("上级手机号") },
        },
      ];
    },
    dialogConfigFormItems() {
      return [
        {
          label: this.$t("经理人"),
          prop: "productClassifyId",
          span: 24,
          componentType: "el-select",
          props: {
            placeholder: this.$t("经理人"),
            options: this.productClassifyList,
          },
        },
        {
          label: this.$t("手机号"),
          prop: "phone",
          span: 24,
          componentType: "el-input",
          rules: {
            required: true,
            message: this.$t("请输入手机号"),
            trigger: "blur",
          },
        },

        {
          label: this.$t("登录密码"),
          prop: "pwd",
          span: 24,
          componentType: "el-input",
          rules: {
            required: true,
            message: this.$t("请输入登录密码"),
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
    shangfenhandleClose() {
      console.log(999999);
    },
    async getList(e) {
      const res = await queryUser(e);
      if (res.status === 0) {
        this.tableData = res.data;
        this.total = res.data.length;
      }
    },
    async handleSubmit() {
      if (this.dialogConfig.type === 1) {
        const res = await addUser({
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
        const res = await updateUser(this.dialogConfig.formData);
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
      const res = await delUser({
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
    formHandleSubmit(formData) {
      this.getList(formData);
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
      this.dialogConfig.title = this.$t("添加会员");
      this.dialogConfig.formData = {
        status: "1",
      };
    },
    handleEdit(row) {
      this.dialogConfig.visible = true;
      this.dialogConfig.type = 2;
      this.dialogConfig.title = this.$t("编辑会员");
      this.dialogConfig.formData = row;
    },
    handleEdits(row) {
      this.visible = true;
      this.rechargeformData = row;
    },
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
