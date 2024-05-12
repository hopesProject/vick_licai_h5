<template>
  <div style="margin: 20px">
    <el-form
      ref="form"
      :model="formData"
      :inline="inline"
      :label-position="labelPosition"
      :label-width="labelWidth"
    >
      <el-row :gutter="10">
        <el-col
          v-for="(item, index) in formItems"
          :key="index"
          :span="item.span || 4"
        >
          <el-form-item
            :label="item.label"
            :prop="item.prop"
            :rules="item.rules"
          >
            <template v-if="item.componentType === 'el-select'">
              <el-select
                v-model="formData[item.prop]"
                :placeholder="$t(item.props.placeholder)"
              >
                <el-option
                  v-for="option in item.props.options"
                  :key="option.value"
                  :label="$t(option.label)"
                  :value="option.value"
                />
              </el-select>
            </template>
            <template v-else>
              <component
                :is="item.componentType"
                v-model="formData[item.prop]"
                v-bind="item.props"
                :placeholder="$t(item.props.placeholder)"
              />
            </template>
          </el-form-item>
        </el-col>
        <el-col :span="5" class="button-container">
          <div v-if="!$slots.default" class="flex">
            <el-button
              type="primary"
              :loading="dialogConfig.loading"
              icon="el-icon-search"
              @click="handleSubmit"
            >
              {{ $t("搜索") }}
            </el-button>
            <el-button
              type="danger"
              icon="el-icon-refresh-right"
              @click="handleReset"
            >
              {{ $t("重置") }}
            </el-button>
          </div>
          <div v-else>
            <slot />
          </div>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
export default {
  props: {
    formItems: {
      type: Array,
      default: () => []
    },
    formData: {
      type: Object,
      default: () => ({})
    },
    dialogConfig: {
      type: Object,
      default: () => ({})
    },
    labelPosition: {
      type: String,
      default: 'right'
    },
    inline: {
      type: Boolean,
      default: true
    },

    labelWidth: {
      type: String,
      default: '80px'
    }
  },

  methods: {
    handleSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$emit('submit', this.formData)
        } else {
          console.log('表单验证失败')
          return false
        }
      })
    },
    handleReset() {
      this.$refs.form.resetFields()
      this.$emit('reset')
      console.log(this.formData, '------')
    }
  }
}
</script>

<style scoped lang="scss">
.flex {
  display: flex;
  justify-content: flex-end;
}

::v-deep .el-form-item {
  width: 100%;
  display: flex;
  .el-form-item__content {
    width: 100%;
  }
  .el-select {
    width: 100%;
  }
}
/* Add your styles here */
</style>
