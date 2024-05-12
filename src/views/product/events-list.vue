<template>
  <div style="margin-top: 30px">
    <!-- 使用改进的表单组件 -->
    <custom-form
      :form-items="formItems"
      @submit="handleSubmit"
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
      :before-close="dialogConfig.handleClose"
    >
      <FreeFromSubmit
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
import CustomForm from '@/components/FreeFrom'
import FreeFromSubmit from '@/components/FreeFromSubmit'
import CustomTable from '@/components/FreeTable/table.vue'
import activeBut from '@/mixins/activeBut'
import Tinymce from '@/components/Tinymce'

export default {
  components: {
    CustomForm,
    CustomTable,
    FreeFromSubmit,
    Tinymce
  },
  mixins: [activeBut],
  data() {
    return {
      formData: {},
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
          fixed: 'right',
          width: '200',
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
        { prop: 'name', label: this.$t('产品名称') },
        { prop: 'name', label: this.$t('产品图片') },
        { prop: 'name', label: this.$t('产品价格') },
        { prop: 'name', label: this.$t('产品折扣') },
        { prop: 'name', label: this.$t('产品周期') },
        { prop: 'name', label: this.$t('产品收益') },
        { prop: 'name', label: this.$t('产品返利') },
        { prop: 'name', label: this.$t('首购佣金') },
        { prop: 'name', label: this.$t('复购佣金') },
        { prop: 'name', label: this.$t('产品要求') },
        { prop: 'name', label: this.$t('直推要求') },
        { prop: 'name', label: this.$t('团队要求') },
        { prop: 'name', label: this.$t('等级要求') },
        { prop: 'name', label: this.$t('限购数量') },
        { prop: 'name', label: this.$t('截止时间') },
        { prop: 'name', label: this.$t('产品排序') },
        { prop: 'name', label: this.$t('分销奖金') },
        { prop: 'name', label: this.$t('返还本金') },
        { prop: 'name', label: this.$t('充值钱包') },
        { prop: 'name', label: this.$t('产品状态') }
      ]
    },
    formItems() {
      return [
        {
          prop: 'name',
          componentType: 'el-input',
          props: { placeholder: this.$t('标题') }
        },
        {
          prop: 'gender',
          componentType: 'el-select',
          props: {
            placeholder: this.$t('产品状态'),
            options: [
              { label: this.$t('下架状态'), value: 'male' },
              { label: this.$t('上架状态'), value: '2' },
              { label: this.$t('预售状态'), value: '3' },
              { label: this.$t('售罄状态'), value: '4' }
            ]
          }
        }
      ]
    },
    dialogConfigFormItems() {
      return [
        {
          label: this.$t('产品标题'),
          prop: 'name',

          componentType: 'el-input',
          rules: {
            required: true,
            message: this.$t('请输入产品标题'),
            trigger: 'blur'
          }
        },
        {
          label: this.$t('产品图片'),
          prop: 'name',

          componentType: 'el-upload',
          rules: {
            required: true,
            message: this.$t('请输入产品图片'),
            trigger: 'blur'
          }
        },

        {
          label: this.$t('产品价格'),
          prop: 'name',

          componentType: 'el-input',
          rules: {
            required: true,
            message: this.$t('请输入产品价格'),
            trigger: 'blur'
          }
        },
        {
          label: this.$t('产品折扣'),
          prop: 'name',

          componentType: 'el-input',
          rules: {
            required: true,
            message: this.$t('请输入产品折扣'),
            trigger: 'blur'
          }
        },
        {
          label: this.$t('产品周期'),
          prop: 'name',

          componentType: 'el-input',
          rules: {
            required: true,
            message: this.$t('请输入产品周期'),
            trigger: 'blur'
          }
        },
        {
          label: this.$t('产品收益'),
          prop: 'name',

          componentType: 'el-input',
          rules: {
            required: true,
            message: this.$t('请输入产品收益'),
            trigger: 'blur'
          }
        },
        {
          label: this.$t('产品返利'),
          prop: 'name',

          componentType: 'el-input',
          rules: {
            required: true,
            message: this.$t('请输入产品返利'),
            trigger: 'blur'
          }
        },
        {
          label: this.$t('首购佣金'),
          prop: 'name',

          componentType: 'el-input',
          rules: {
            required: true,
            message: this.$t('请输入首购佣金'),
            trigger: 'blur'
          }
        },
        {
          label: this.$t('复购佣金'),
          prop: 'name',

          componentType: 'el-input',
          rules: {
            required: true,
            message: this.$t('请输入复购佣金'),
            trigger: 'blur'
          }
        },
        {
          label: this.$t('产品要求'),
          prop: 'name',

          componentType: 'el-input',
          rules: {
            required: true,
            message: this.$t('请输入产品要求'),
            trigger: 'blur'
          }
        },
        {
          label: this.$t('直推要求'),
          prop: 'name',

          componentType: 'el-input',
          rules: {
            required: true,
            message: this.$t('请输入直推要求'),
            trigger: 'blur'
          }
        },
        {
          label: this.$t('团队要求'),
          prop: 'name',

          componentType: 'el-input',
          rules: {
            required: true,
            message: this.$t('请输入团队要求'),
            trigger: 'blur'
          }
        },
        {
          label: this.$t('等级要求'),
          prop: 'name',

          componentType: 'el-input',
          rules: {
            required: true,
            message: this.$t('请输入等级要求'),
            trigger: 'blur'
          }
        },
        {
          label: this.$t('限购数量'),
          prop: 'name',

          componentType: 'el-input',
          rules: {
            required: true,
            message: this.$t('请输入限购数量'),
            trigger: 'blur'
          }
        },
        {
          label: this.$t('截止时间'),
          prop: 'name',

          componentType: 'el-input',
          rules: {
            required: true,
            message: this.$t('请输入截止时间'),
            trigger: 'blur'
          }
        },
        {
          label: this.$t('产品排序'),
          prop: 'name',

          componentType: 'el-input',
          rules: {
            required: true,
            message: this.$t('请输入产品排序'),
            trigger: 'blur'
          }
        },

        {
          label: this.$t('产品类型'),
          prop: 'gessadnder',

          componentType: 'el-radio-group',
          props: {
            placeholder: '',
            options: [
              { label: this.$t('活期产品'), value: 'male' },
              { label: this.$t('定期产品'), value: 'female' }
            ]
          }
        },
        {
          label: this.$t('分销收益'),
          prop: 'gessadnder',

          componentType: 'el-radio-group',
          props: {
            placeholder: '',
            options: [
              { label: this.$t('启用'), value: 'male' },
              { label: this.$t('禁用'), value: 'female' }
            ]
          }
        },
        {
          label: this.$t('返还本金'),
          prop: 'gessadnder',

          componentType: 'el-radio-group',
          props: {
            placeholder: '',
            options: [
              { label: this.$t('启用'), value: 'male' },
              { label: this.$t('禁用'), value: 'female' }
            ]
          }
        },
        {
          label: this.$t('充值钱包'),
          prop: 'gessadnder',

          componentType: 'el-radio-group',
          props: {
            placeholder: '',
            options: [
              { label: this.$t('启用'), value: 'male' },
              { label: this.$t('禁用'), value: 'female' }
            ]
          }
        },
        {
          label: this.$t('产品状态'),
          prop: 'gessadnder',
          span: 24,
          componentType: 'el-radio-group',
          props: {
            placeholder: '',

            options: [
              { label: this.$t('下架'), value: 'male' },
              { label: this.$t('上架'), value: 'female' },
              { label: this.$t('预售'), value: 'male' },
              { label: this.$t('售罄'), value: 'female' }
            ]
          }
        },
        {
          label: this.$t('产品描述'),
          prop: 'gessaadaaadnder',
          span: 24,
          componentType: ''
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

    handleAdd() {
      this.dialogConfig.visible = true
      this.dialogConfig.type = 1
      this.dialogConfig.title = this.$t('添加活动产品')
      this.dialogConfig.formData = {
        gessadnder: 'male'
      }
    },
    handleEdit(row) {
      this.dialogConfig.visible = true
      this.dialogConfig.title = this.$t('编辑活动产品')
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
