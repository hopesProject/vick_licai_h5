<template>
  <div class="upload-container">
    <el-button
      :style="{ background: color, borderColor: color }"
      icon="el-icon-upload"
      size="mini"
      type="primary"
      @click="dialogVisible = true"
    >
      {{ $t("上传图片") }}
    </el-button>
    <el-dialog :visible.sync="dialogVisible">
      <el-upload
        :multiple="true"
        :file-list="fileList"
        :show-file-list="true"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        :before-upload="beforeUpload"
        class="editor-slide-upload"
        :action="actionUrl"
        list-type="picture-card"
      >
        <el-button size="small" type="primary">
          {{ $t("点击上传") }}
        </el-button>
      </el-upload>
      <el-button @click="dialogVisible = false">
        {{ $t("取消") }}
      </el-button>
      <el-button type="primary" @click="handleSubmit">
        {{ $t("确认") }}
      </el-button>
    </el-dialog>
  </div>
</template>

<script>
// import { getToken } from 'api/qiniu'

export default {
  name: "EditorSlideUpload",
  props: {
    color: {
      type: String,
      default: "#1890ff",
      actionUrl: "",
    },
  },
  created() {
    this.actionUrl = process.env.VUE_APP_BASE_APIS + "/file/upload";
  },
  data() {
    return {
      dialogVisible: false,
      listObj: "",
      fileList: [],
    };
  },
  methods: {
    checkAllSuccess() {
      return Object.keys(this.listObj).every(
        (item) => this.listObj[item].hasSuccess
      );
    },
    handleSubmit() {
      console.log(this.listObj, "======");
      if (this.listObj) {
        this.$emit("successCBK", this.listObj);
        this.listObj = {};
        this.fileList = [];
        this.dialogVisible = false;
      }
    },
    handleSuccess(response, file) {
      this.listObj = response.data;
    },
    handleRemove(file) {},
    beforeUpload(file) {},
  },
};
</script>

<style lang="scss" scoped>
.editor-slide-upload {
  margin-bottom: 20px;
  ::v-deep .el-upload--picture-card {
    width: 100%;
  }
}
</style>
