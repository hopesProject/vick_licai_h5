<template>
  <div>
    <el-form
      ref="form"
      :model="formData"
      :inline="inline"
      :label-position="labelPosition"
      :label-width="labelWidth"
    >
      <el-row :gutter="20">
        <el-col
          v-for="(item, index) in formItems"
          :key="index"
          :span="item.span || 12"
        >
          <el-form-item
            :label="$t(item.label)"
            :prop="item.prop"
            :rules="item.rules"
          >
            <template v-if="item.componentType === 'el-select'">
              <el-select
                v-model="formData[item.prop]"
                :placeholder="item.props.placeholder"
                :clearable="item.props.clearable"
              >
                <el-option
                  v-for="option in item.props.options"
                  :key="option.value"
                  :label="option.label"
                  :value="option.value"
                />
              </el-select>
            </template>
            <template v-else-if="item.componentType === 'el-radio-group'">
              <el-radio-group
                v-model="formData[item.prop]"
                :clearable="item.props.clearable"
              >
                <el-radio
                  v-for="option in item.props.options"
                  :key="option.value"
                  :label="option.value"
                  :value="option.value"
                >
                  {{ option.label }}
                </el-radio>
              </el-radio-group>
            </template>
            <template v-else-if="item.componentType === 'el-upload'">
              <el-upload
                class="avatar-uploader"
                :action="actionUrl"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img
                  v-if="formData[item.prop]"
                  :src="formData[item.prop]"
                  class="avatar"
                />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </template>
            <template v-else>
              <component
                :is="item.componentType"
                @input="item.onchange"
                v-model="formData[item.prop]"
                :disabled="item.disabled"
                v-bind="item.props"
              />
            </template>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <slot name="fwbk" />
        </el-col>

        <el-col :span="24" class="button-container">
          <div v-if="!$slots.default" class="flex">
            <el-button type="danger" @click="handleReset">
              {{ $t("取消") }}
            </el-button>
            <el-button
              type="primary"
              :loading="dialogConfig.loading"
              @click="handleSubmit"
            >
              {{ $t("确认") }}
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
      default: () => [],
    },
    formData: {
      type: Object,
      default: () => ({}),
    },
    dialogConfig: {
      type: Object,
      default: () => ({}),
    },
    labelPosition: {
      type: String,
      default: "right",
    },
    inline: {
      type: Boolean,
      default: true,
    },

    labelWidth: {
      type: String,
      default: "120px",
    },
  },
  data() {
    return {
      fileList: [],
      loading: false,
      actionUrl: "",
    };
  },
  created() {
    this.actionUrl = process.env.VUE_APP_BASE_APIS + "/file/upload";
  },
  methods: {
    handleAvatarSuccess(file) {
      this.formItems.map((item) => {
        if (item.componentType === "el-upload") {
          if (file.status === 0) {
            this.formData[item.prop] = file.data;
          }
        }
      });
    },
    beforeAvatarUpload() {
      console.log("结束");
    },
    handleSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$emit("submit", this.formData);
        } else {
          console.log("表单验证失败");
          return false;
        }
      });
    },
    handleReset() {
      this.$refs.form.resetFields();
      this.$emit("reset");
      console.log(this.formData, "------");
    },
  },
};
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

::v-deep .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
::v-deep .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 50px;
  height: 50px;
  line-height: 50px;
  text-align: center;
}
.avatar {
  width: 50px;
  height: 50px;
  display: block;
}
</style>
