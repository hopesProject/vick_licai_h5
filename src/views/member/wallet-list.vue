<template>
  <div style="margin-top: 30px">
    <!-- 使用改进的表单组件 -->
    <custom-form
      :form-items="formItems"
      @submit="handleSubmit"
      @reset="handleReset"
    />

    <!-- <div class="ml-20">
      <el-button type="primary" icon="el-icon-circle-plus-outline">
        {{ $t("添加") }}
      </el-button>
      <el-button type="primary" icon="el-icon-circle-plus-outline">
        {{ $t("导出") }}
      </el-button>
    </div> -->
    <custom-table
      :data="tableData"
      :total="100"
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
import CustomForm from '@/components/FreeFrom'
import FreeFromSubmit from '@/components/FreeFromSubmit'
import CustomTable from '@/components/FreeTable/table.vue'
import activeBut from '@/mixins/activeBut'

export default {
  components: {
    CustomForm,
    CustomTable,
    FreeFromSubmit
  },
  mixins: [activeBut],
  data() {
    return {
      // 表格数据
      tableData: [
        { id: 1, name: 'John', age: 30, city: 'New York' },
        { id: 2, name: 'Alice', age: 25, city: 'Los Angeles' }
      ],

      // 表格样式配置
      tableColumnsProps: {
        align: 'center'
      }
    }
  },
  computed: {
    tableColumns() {
      return [
        { prop: 'name', label: this.$t('收款账号') },
        { prop: 'id', label: 'ID' },
        { prop: 'name', label: this.$t('用户ID') },
        { prop: 'name', label: this.$t('手机号') },
        { prop: 'name', label: this.$t('经理人') },
        { prop: 'name', label: this.$t('收款人') },
        { prop: 'name', label: this.$t('IFSC') }
      ]
    },
    formItems() {
      return [
        {
          prop: 'name',
          componentType: 'el-input',
          props: { placeholder: this.$t('用户ID') }
        },
        {
          prop: 'name',
          componentType: 'el-input',
          props: { placeholder: this.$t('手机号码') }
        },
        {
          prop: 'name',
          componentType: 'el-input',
          props: { placeholder: this.$t('经理人') }
        }
      ]
    },
    dialogConfigFormItems() {
      return [
        {
          label: '姓名',
          prop: 'name',
          componentType: 'el-input',
          props: { placeholder: '请输入姓名' },
          rules: { required: true, message: '请输入姓名', trigger: 'blur' }
        },
        {
          label: '姓名',
          prop: 'name',
          componentType: 'el-input',
          props: { placeholder: '请输入姓名' },
          rules: { required: true, message: '请输入姓名', trigger: 'blur' }
        },
        {
          label: '性别',
          prop: 'gender',
          componentType: 'el-select',
          props: {
            placeholder: '请选择性别',
            options: [
              { label: '男', value: 'male' },
              { label: '女', value: 'female' }
            ]
          },
          rules: { required: true, message: '请选择性别', trigger: 'change' }
        }
      ]
    }
  },

  methods: {
    handleClose() {
      this.dialogConfig.visible = false
    },
    paginationChange(a, b) {
      console.log(a, b)
    },
    handleSubmit(formData) {
      console.log('提交表单', formData)
    },
    handleReset() {
      console.log('重置表单')
    },
    handleSortChange({ column, prop, order }) {
      // 在这里处理排序逻辑
      console.log('列名:', column.label)
      console.log('属性名:', prop)
      console.log('排序方式:', order)
      // 根据需要对表格数据进行排序操作
    },

    handleEdit(row) {
      this.dialogConfig.visible = true
      this.dialogConfig.title = this.$t('编辑')
      this.dialogConfig.data = row
    },
    handleDelete(row) {
      console.log('删除操作', row)
    }
  }
}
</script>

<style scoped>
/* Add your styles here */
</style>
