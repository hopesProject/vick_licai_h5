<template>
  <div>
    <vue-html5-editor v-model="content" />
  </div>
</template>

<script>
import VueHtml5Editor from 'vue-html5-editor'

export default {
  name: 'Editor',
  components: { VueHtml5Editor },
  props: ['content'],
  data() {
    return {
      // content: "<p>Initial content</p>",
    }
  }
}
</script>

<style>
</style>
