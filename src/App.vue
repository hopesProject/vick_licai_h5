<template>
  <div id="app">
    <router-view />
    <my-tabbar v-if="$route.meta.show === true"></my-tabbar>
  </div>
</template>

<script>
import MyTabbar from "@/components/MyTabbar/index.vue";
// import SvgIcon from "@/components/SvgIcon"; // svg component

export default {
  created() {
    console.log(this.$route.meta);
  },
  name: "App",
  components: { MyTabbar },
};
</script>
