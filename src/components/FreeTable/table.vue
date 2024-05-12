<template>
  <!-- 表格容器 -->
  <div class="custom-table">
    <!-- Element UI 表格组件 -->
    <el-table
      ref="elTable"
      border
      :data="data"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <!-- 遍历列配置 -->
      <div v-for="columnConfig in mergedColumns" :key="columnConfig.prop">
        <!-- 判断是否有插槽作用域 -->
        <el-table-column v-if="columnConfig.slotScope" v-bind="columnConfig">
          <!-- 插槽内容 -->
          <template slot-scope="scope">
            <!-- 使用动态插槽，将作用域数据传递给插槽 -->
            <slot :name="columnConfig.prop" v-bind="scope" />
          </template>
        </el-table-column>
        <!-- 自定义列组件 -->
        <free-column v-else :column="columnConfig" />
      </div>
    </el-table>

    <!-- 可选的分页组件 -->
    <template v-if="pagination">
      <pagination
        ref="pagination"
        :total="total"
        v-bind="$attrs"
        @pagination="handlePageChange"
        v-on="$listeners"
      />
    </template>
  </div>
</template>

<script>
// 导入自定义列组件和分页组件
import FreeColumn from "./columu";
import Pagination from "../Pagination";

export default {
  name: "CustomTable",
  components: {
    Pagination,
    FreeColumn,
  },
  props: {
    // 表格数据
    data: {
      type: Array,
      required: true,
    },
    // 表格列配置数组
    columns: {
      type: Array,
      required: true,
    },
    // 表格列的通用配置
    columnsProps: {
      type: Object,
      default: () => ({}),
    },
    // 是否显示分页器
    pagination: {
      type: Boolean,
      default: false,
    },
    // 总条目数
    total: {
      type: Number,
      required: true,
    },
  },
  computed: {
    // 计算属性，合并通用列配置和每列配置
    mergedColumns() {
      const { columns, columnsProps } = this;

      return columns.map((column) => ({ ...columnsProps, ...column }));
    },
  },
  methods: {
    // 分页器页码改变时触发
    handlePageChange(page) {
      console.log(page);
      this.$emit("paginationChange", {
        page: page.page,
        pageSize: page.pageSize,
      });
    },
  },
};
</script>

<!-- 添加样式 -->
<style scoped>
.custom-table {
  padding: 20px;
  /* 可添加自定义样式 */
}
</style>
