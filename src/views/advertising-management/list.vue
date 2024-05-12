<template>
  <div style="margin-top: 30px">
    <!-- 使用改进的表单组件 -->
    <custom-form
      :form-items="formItems"
      @submit="handleSubmit"
      @reset="handleReset"
    />

    <div class="ml-20">
      <el-button type="primary" @click="handleAdd">{{ $t("添加") }}</el-button>
    </div>
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
        { prop: 'id', label: 'ID' },
        { prop: '1', label: this.$t('标题') },
        { prop: '2', label: this.$t('缩略图') },
        { prop: '3', label: this.$t('状态') },
        { prop: '4', label: this.$t('创建时间') }
      ]
    },
    formItems() {
      return [
        {
          prop: 'name',
          componentType: 'el-input',
          props: { placeholder: this.$t('标题') }
        }
      ]
    },
    dialogConfigFormItems() {
      return [
        {
          label: this.$t('标题'),
          prop: '1',
          span: 24,
          componentType: 'el-input',
          rules: {
            required: true,
            message: this.$t('请输入标题'),
            trigger: 'blur'
          }
        },
        {
          label: this.$t('封面图片'),
          prop: '2',
          span: 24,
          componentType: 'el-upload',
          rules: {
            required: true,
            message: this.$t('请输入封面图片'),
            trigger: 'blur'
          }
        },

        {
          label: this.$t('状态'),
          prop: 'gessadnder',
          span: 24,
          componentType: 'el-radio-group',
          props: {
            placeholder: '',
            options: [
              { label: this.$t('启用'), value: 'male' },
              { label: this.$t('禁用'), value: 'female' }
            ]
          }
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
    // 添加
    handleAdd() {
      this.dialogConfig.visible = true
      this.dialogConfig.type = 1
      this.dialogConfig.title = this.$t('添加广告')
      this.dialogConfig.formData = {
        gessadnder: 'male'
      }
    },
    handleEdit(row) {
      this.dialogConfig.visible = true
      this.dialogConfig.title = this.$t('编辑广告')
      this.dialogConfig.formData = row
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
