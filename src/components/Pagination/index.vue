<template>
  <div :class="{ hidden: hidden }" class="pagination-container">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "CustomPagination",
  data() {
    return {
      currentPage: 1,
    };
  },
  props: {
    total: {
      type: Number,
      required: true,
    },
    hidden: {
      type: Boolean,
      default: false,
    },
    autoScroll: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    handleSizeChange(pageSize) {
      console.log(pageSize);
      this.$emit("pagination", {
        page: this.currentPage,
        pageSize,
        type: "size",
      });
      this.autoScroll && this.scrollToTop();
    },
    handleCurrentChange(currentPage) {
      console.log(currentPage);
      this.$emit("pagination", {
        page: currentPage,
        pageSize: this.pageSize,
        type: "page",
      });
      this.autoScroll && this.scrollToTop();
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },
};
</script>

<style scoped>
.pagination-container {
  background: #fff;
  padding: 32px 16px;
}
.pagination-container.hidden {
  display: none;
}
</style>
