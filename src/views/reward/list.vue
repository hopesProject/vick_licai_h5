<template>
  <div>
    <!-- 使用改进的表单组件 -->
    <custom-form
      :form-items="formItems"
      @submit="handleSubmit"
      @reset="handleReset"
    />
    <div class="ml-20">
      <el-button type="primary" icon="el-icon-check">
        {{ $t("批量通过") }}
      </el-button>
      <el-button type="primary" icon="el-icon-close">
        {{ $t("批量拒绝") }}
      </el-button>
    </div>
    <custom-table
      :data="tableData"
      :total="100"
      :columns="tableColumns"
      :columns-props="tableColumnsProps"
      :pagination="true"
      @selection-change="handleSelectionChange"
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
        { id: 2, name: 'Alice', age: 25, city: 'Los Angeles' },
        { id: 3, name: 'Bob', age: 35, city: 'Chicago' }
      ],

      // 表格样式配置
      tableColumnsProps: {
        align: 'center',
        selectable: this.selectable
      }
    }
  },
  computed: {
    tableColumns() {
      return [
        {
          prop: 'cityss',
          label: this.$t('操作'),
          render: (h, b) => {
            return this.renderActions(h, b, [
              {
                name: this.$t('编辑'),
                onClick: 'handleEdit'
              },

              {
                name: this.$t('删除'),
                type: 1,
                onClick: 'handleDelete'
              }
            ])
          }
        }, // 将操作列放在最后
        // type="selection"
        // :selectable="selectable"
        { type: 'selection' },
        { prop: 'id', label: 'ID' },
        { prop: 'name', label: this.$t('用户ID') },
        { prop: 'name', label: this.$t('手机号') },
        { prop: 'name', label: this.$t('奖励类型') },
        { prop: 'name', label: this.$t('奖励数量') },
        { prop: 'name', label: this.$t('状态') },
        { prop: 'name', label: this.$t('经理人') },
        { prop: 'name', label: this.$t('审核时间') },
        { prop: 'name', label: this.$t('下单时间') }
      ]
    },
    formItems() {
      return [
        {
          prop: 'name',
          componentType: 'el-input',
          props: { placeholder: this.$t('请输入姓名') },
          rules: {
            required: true,
            message: this.$t('请输入姓名'),
            trigger: 'blur'
          }
        },
        {
          prop: 'name',
          componentType: 'el-input',
          props: { placeholder: this.$t('请输入姓名') },
          rules: {
            required: true,
            message: this.$t('请输入姓名'),
            trigger: 'blur'
          }
        },
        {
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
    },
    dialogConfigFormItems() {
      return [
        {
          label: '姓名',
          prop: 'name',
          componentType: 'el-input',
          props: { placeholder: this.$t('请输入姓名') },
          rules: {
            required: true,
            message: this.$t('请输入姓名'),
            trigger: 'blur'
          }
        },
        {
          label: '姓名',
          prop: 'name',
          componentType: 'el-input',
          props: { placeholder: this.$t('请输入姓名') },
          rules: {
            required: true,
            message: this.$t('请输入姓名'),
            trigger: 'blur'
          }
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
    handleSortChange({ column, prop, order }) {
      // 在这里处理排序逻辑
      console.log('列名:', column.label)
      console.log('属性名:', prop)
      console.log('排序方式:', order)
      // 根据需要对表格数据进行排序操作
    },
    handleSubmit(formData) {
      console.log('提交表单', formData)
    },
    handleReset() {
      console.log('重置表单')
    },
    handleSelectionChange(e) {
      console.log(e)
    },
    selectable(e) {
      console.log(e)
      if (e.id === 1) {
        return true
      }
      return false
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
