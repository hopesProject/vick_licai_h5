import { Toast } from "vant";

export default {
  data() {
    return {};
  },
  methods: {
    onCopy() {
      Toast.success(this.$t("复制成功"));
    },
  },
};
