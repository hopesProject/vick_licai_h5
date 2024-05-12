<template>
  <div style="margin-top: 50px">
    <!-- 使用改进的表单组件 -->
    <!-- <custom-form
      :formItems="formItems"
      @submit="handleSubmit"
      @reset="handleReset"
    /> -->

    <!-- <div class="ml-20">
      <el-button type="primary">{{ $t("添加") }}</el-button>
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
      destroy-on-close
      :title="dialogConfig.title"
      :visible.sync="dialogConfig.visible"
      width="50%"
      :before-close="dialogConfig.handleClose"
    >
      <FreeFromSubmit
        :dialog-config="dialogConfig"
        :form-data="dialogConfig.formData"
        :form-items="formItems"
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
              }
            ])
          }
        }, // 将操作列放在最后
        { prop: 'id', label: 'ID', sortable: true },
        { prop: 'name', label: this.$t('分销级别') },
        { prop: 'name', label: this.$t('分红佣金') },
        { prop: 'name', label: this.$t('首购佣金') },
        { prop: 'name', label: this.$t('复购佣金') }
      ]
    },
    formItems() {
      return [
        {
          label: this.$t('姓名'),
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
          label: this.$t('姓名'),
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
          label: this.$t('性别'),
          prop: 'gender',
          componentType: 'el-select',
          props: {
            placeholder: this.$t('请选择性别'),
            options: [
              { label: '男', value: 'male' },
              { label: '女', value: 'female' }
            ]
          },
          rules: {
            required: true,
            message: this.$t('请选择性别'),
            trigger: 'change'
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
