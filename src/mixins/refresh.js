export default {
  data() {
    return {
      refreshing: false,
      // 下拉刷新
      loading: false,
      finished: false,
      data: [],
      pageNum: 1,
      pageSize: 20,
    };
  },
  mounted() {},
  methods: {
    onRefresh() {
      // 清空列表数据
      this.finished = false;
      this.pageNum = 1;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.getList(1);
    },
    onLoad() {
      if (this.refreshing) {
        this.data = [];
        this.refreshing = false;
      }

      this.finished = false;
      this.loading = true;
      this.getList();
      this.pageNum++;
    },
  },
};
