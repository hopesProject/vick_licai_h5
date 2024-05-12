export default {
  data() {
    return {
      dialogConfig: {
        type: 1, // 1添加，2修改
        loading: false,
        formData: {},
        data: {},
        visible: false,
        handleClose: () => {
          this.dialogConfig.visible = false;
        },

        handleSubmit: (e) => {
          console.log(e);
          this.handleSubmit(e);
        },
        handleReset: () => {
          this.dialogConfig.visible = false;
        },
      },
    };
  },

  methods: {
    copyText(e) {
      this.$copyText(e.name).then(
        (e) => {
          this.$message.success(this.$t("复制成功"));
        },
        (e) => {
          this.$message.error(this.$t("复制失败"));
        }
      );
    },
    // 渲染操作列
    renderActions(h, scope, butArr) {
      return (
        <div>
          {butArr.map((item, index) => (
            <span>
              {item.type === 1 ? (
                <el-popconfirm
                  icon="el-icon-info"
                  icon-color="red"
                  title="这是一段内容确定删除吗？"
                  onConfirm={() => this[item.onClick](scope.row)}
                >
                  <el-button
                    key={index}
                    size="small"
                    type="text"
                    slot="reference"
                  >
                    {/* {i18n.$t("确定删除吗？")} */}
                    {item.name}
                  </el-button>
                </el-popconfirm>
              ) : (
                <el-button
                  key={index}
                  type="text"
                  size="small"
                  onClick={() => this[item.onClick](scope.row)}
                >
                  {item.name}
                </el-button>
              )}

              {index !== butArr.length - 1 && (
                <el-divider direction="vertical"></el-divider>
              )}
            </span>
          ))}
        </div>
      );
    },
  },
};
