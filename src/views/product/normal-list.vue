<template>
  <div style="margin-top: 30px">
    <!-- 使用改进的表单组件 -->
    <custom-form :form-items="formItems" @submit="formhandleSubmit" />

    <div class="ml-20">
      <el-button
        type="primary"
        icon="el-icon-circle-plus-outline"
        @click="handleAdd"
      >
        {{ $t("添加") }}
      </el-button>
      <!-- <el-button type="primary" icon="el-icon-circle-plus-outline">
        {{ $t("导出") }}
      </el-button> -->
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
      width="80%"
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
        <Tinymce slot="fwbk" v-model="dialogConfig.formData.content" />
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
  productaddProductClassify,
  productdelProductClassify,
  productqueryProductClassify,
  productupdateProductClassify,
  queryProductClassify,
  querySetting,
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
      total: 0,
      content: "",
      formData: {},
      // 产品分类列表
      productClassifyList: [],
      // 首购
      querySettingData: {},
      // 表格数据
      tableData: [],

      // 表格样式配置
      tableColumnsProps: {
        align: "center",
      },
    };
  },

  watch: {
    "this.dialogConfig.formData.sd"(e) {
      console.log(e, "=======000000");
    },
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
        { prop: "productTitle", label: this.$t("产品标题") },
        { prop: "cycle", label: this.$t("产品周期") },
        { prop: "directPushRequirement", label: this.$t("直推人数要求") },
        { prop: "discount", label: this.$t("产品折扣") },
        { prop: "distributionIncome", label: this.$t("状态") },
        { prop: "endTime", label: this.$t("结束时间") },
        { prop: "createTime", label: this.$t("创建时间") },
        { prop: "firstPurchaseCommission", label: this.$t("首购佣金") },
        {
          prop: "img",
          label: this.$t("产品图片"),
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
        { prop: "price", label: this.$t("产品价格") },
        { prop: "productClassifyId", label: this.$t("产品分类") },
        { prop: "purchaseLimit", label: this.$t("限购数量") },
        { prop: "repurchaseCommission", label: this.$t("复购佣金") },
        { prop: "sort", label: this.$t("排序") },
        {
          prop: "status",
          label: this.$t("状态"),
          render: (h, b) => {
            switch (Number(b.row.status)) {
              case 1:
                return <el-tag type="success">{this.$t("上架")}</el-tag>;
              case 2:
                return <el-tag type="danger">{this.$t("下架")}</el-tag>;
              case 3:
                return <el-tag type="success">{this.$t("预售")}</el-tag>;
              case 4:
                return <el-tag type="danger">{this.$t("售罄")}</el-tag>;
              default:
                break;
            }
          },
        },
        { prop: "vipRequest", label: this.$t("vip等级要求") },
      ];
    },
    formItems() {
      return [
        {
          prop: "title",
          componentType: "el-input",
          props: { placeholder: this.$t("产品标题") },
        },
        {
          prop: "status",
          componentType: "el-select",
          props: {
            placeholder: this.$t("产品状态"),
            options: [
              { label: this.$t("下架状态"), value: 2 },
              { label: this.$t("上架状态"), value: 1 },
              { label: this.$t("预售状态"), value: 3 },
              { label: this.$t("售罄状态"), value: 4 },
            ],
          },
        },
        {
          prop: "id",
          componentType: "el-select",
          props: {
            placeholder: this.$t("产品分类"),
            options: this.productClassifyList,
          },
        },
      ];
    },
    dialogConfigFormItems() {
      return [
        {
          label: this.$t("产品标题"),
          prop: "productTitle",
          componentType: "el-input",
          rules: {
            required: true,
            message: this.$t("请输入产品标题"),
            trigger: "blur",
          },
        },
        {
          label: this.$t("产品图片"),
          prop: "img",
          componentType: "el-upload",
          rules: {
            required: true,
            message: this.$t("请输入产品图片"),
            trigger: "blur",
          },
        },
        {
          label: this.$t("产品价格"),
          prop: "price",
          componentType: "el-input",
          onchange: (e) => {
            const arr =
              this.querySettingData.e_setting_first_purchase_commission.split(
                "/"
              );
            let str = "";
            arr.map((item) => {
              str += "/" + this.$big(this.$big(item).div(100)).times(e);
            });
            if (str.startsWith("/")) {
              str = str.slice(1);
            }
            this.dialogConfig.formData.firstPurchaseCommission = str;
            const arr1 =
              this.querySettingData.e_setting_repurchase_commission.split("/");
            let str1 = "";
            arr1.map((item) => {
              str1 += "/" + this.$big(this.$big(item).div(100)).times(e);
            });
            if (str1.startsWith("/")) {
              str1 = str1.slice(1);
            }
            this.dialogConfig.formData.repurchaseCommission = str1;
          },
          rules: {
            required: true,
            message: this.$t("请输入产品价格"),
            trigger: "blur",
          },
        },
        {
          label: this.$t("产品折扣"),
          prop: "discount",

          componentType: "el-input",
          rules: {
            required: true,
            message: this.$t("请输入产品折扣"),
            trigger: "blur",
          },
        },
        {
          label: this.$t("产品周期"),
          prop: "cycle",
          componentType: "el-input",
          rules: {
            required: true,
            message: this.$t("请输入产品周期"),
            trigger: "blur",
          },
        },
        {
          label: this.$t("产品日收益"),
          prop: "dailyProductRevenue",
          componentType: "el-input",
          rules: {
            required: true,
            message: this.$t("请输入产品日收益"),
            trigger: "blur",
          },
        },
        {
          label: this.$t("产品总收益"),
          prop: "totalProductRevenue",
          componentType: "el-input",
          rules: {
            required: true,
            message: this.$t("请输入产品总收益"),
            trigger: "blur",
          },
        },

        {
          label: this.$t("首购佣金"),
          prop: "firstPurchaseCommission",
          componentType: "el-input",
          disabled: true,
        },
        {
          label: this.$t("复购佣金"),
          prop: "repurchaseCommission",
          disabled: true,
          componentType: "el-input",
        },
        {
          label: this.$t("vip等级要求"),
          prop: "vipRequest",
          componentType: "el-input",
          rules: {
            required: true,
            message: this.$t("请输入vip等级要求"),
            trigger: "blur",
          },
        },
        {
          label: this.$t("直推人数要求"),
          prop: "directPushRequirement",
          componentType: "el-input",
          rules: {
            required: true,
            message: this.$t("请输入直推人数要求"),
            trigger: "blur",
          },
        },

        {
          label: this.$t("限购数量"),
          prop: "purchaseLimit",
          componentType: "el-input",
          rules: {
            required: true,
            message: this.$t("请输入限购数量"),
            trigger: "blur",
          },
        },
        {
          label: this.$t("产品排序"),
          prop: "sort",
          componentType: "el-input",
          rules: {
            required: true,
            message: this.$t("请输入产品排序"),
            trigger: "blur",
          },
        },
        {
          label: this.$t("截止时间"),
          prop: "endTime",
          componentType: "el-date-picker",
          props: {
            type: "datetime",
          },
          rules: {
            required: true,
            message: this.$t("请输入截止时间"),
            trigger: "blur",
          },
        },

        {
          label: this.$t("产品类型"),
          prop: "productClassifyId",
          componentType: "el-select",
          props: {
            placeholder: this.$t("产品分类"),
            options: this.productClassifyList,
          },
        },

        {
          label: this.$t("分销收益"),
          prop: "distributionIncome",
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
          label: this.$t("产品状态"),
          prop: "status",
          span: 24,
          componentType: "el-radio-group",
          props: {
            placeholder: "",
            options: [
              { label: this.$t("下架"), value: 2 },
              { label: this.$t("上架"), value: 1 },
              { label: this.$t("预售"), value: 3 },
              { label: this.$t("售罄"), value: 4 },
            ],
          },
        },
        {
          label: this.$t("产品描述"),
          prop: "gessaadaaadnder",
          span: 24,
          componentType: "",
        },
      ];
    },
  },
  mounted() {
    this.getProductClassifyList();
    this.getQuerySettingList();
    this.getList();
  },
  methods: {
    // 获取分销比例
    async getQuerySettingList() {
      const res = await querySetting({ cType: 4 });
      if (res.status === 0) {
        res.data.map((item) => {
          this.querySettingData[item.skey] = item.svalue;
        });
      }
    },
    // 获取产品列表
    async getProductClassifyList() {
      const res = await queryProductClassify();
      if (res.status === 0) {
        res.data.map((item) => {
          item.label = item.productClassify;
          item.value = item.id;
        });
        this.productClassifyList = res.data;
      }
    },
    formhandleSubmit(e) {
      this.getList(e);
    },
    async getList(e) {
      const res = await productqueryProductClassify(e);
      if (res.status === 0) {
        this.tableData = res.data;
        this.total = res.data.length;
      }
    },

    async handleSubmit() {
      if (this.dialogConfig.type === 1) {
        const res = await productaddProductClassify({
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
        const res = await productupdateProductClassify(
          this.dialogConfig.formData
        );
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
      const res = await productdelProductClassify({
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
      this.dialogConfig.title = this.$t("添加普通产品");
      this.dialogConfig.formData = {
        gessadnder: "male",
      };
    },
    handleEdit(row) {
      this.dialogConfig.visible = true;
      this.dialogConfig.type = 2;
      this.dialogConfig.title = this.$t("编辑普通产品");
      this.dialogConfig.formData = row;
    },
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
