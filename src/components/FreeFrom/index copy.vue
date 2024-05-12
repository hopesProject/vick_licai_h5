<template>
  <div style="margin-top: 20px; margin-left: 20px">
    <el-form ref="form" :model="formData" :inline="inline">
      <el-form-item
        v-for="(item, index) in formItems"
        :key="index"
        :label="item.label"
      >
        <template v-if="item.componentType === 'el-select'">
          <el-select
            v-model="formData[item.prop]"
            :placeholder="item.props.placeholder"
          >
            <el-option
              v-for="option in item.props.options"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            />
          </el-select>
        </template>
        <template v-else>
          <component
            :is="item.componentType"
            v-model="formData[item.prop]"
            v-bind="item.props"
          />
        </template>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="handleSubmit">
          {{ $t("搜索") }}
        </el-button>
        <el-button
          type="danger"
          icon="el-icon-refresh-right"
          @click="handleReset"
        >
          {{ $t("重置") }}
        </el-button>
      </el-form-item>
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
  data() {
    return {
      formData: {}
    }
  },
  methods: {
    handleSubmit() {
      this.$emit('submit', this.formData)
    },
    handleReset() {
      this.$refs.form.resetFields()
      this.$emit('reset')
      console.log(this.formData, '=======')
    }
  }
}
</script>

<style scoped>
/* Add your styles here */
</style>
