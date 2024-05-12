<template>
  <el-dropdown trigger="click" @command="handleSetSize">
    <div>
      <svg-icon class-name="language" icon-class="language" />
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
        v-for="item of sizeOptions"
        :key="item.value"
        :disabled="lang === item.value"
        :command="item.value"
      >
        {{ item.label }}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  data() {
    return {
      sizeOptions: [
        { label: '简体中文', value: 'zh-CN' },
        { label: 'English', value: 'en' }
      ]
    }
  },
  computed: {
    lang() {
      return this.$store.getters.lang
    }
  },
  methods: {
    handleSetSize(lang) {
      this.$store.dispatch('app/setLang', lang)
      this.$i18n.locale = lang
    }
  }
}
</script>
