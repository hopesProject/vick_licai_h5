<template>
  <div id="app">
    <router-view />
    <my-tabbar v-if="$route.meta.show === true"></my-tabbar>
  </div>
</template>

<script>
import MyTabbar from "@/components/MyTabbar/index.vue";
import { mapActions, mapGetters } from "vuex";
// import SvgIcon from "@/components/SvgIcon"; // svg component

export default {
  methods: {
    ...mapActions(["getUserInfo"]),
  },
  computed: {
    ...mapGetters(["token"]),
  },
  created() {
    if (this.token) {
      // this.getUserInfo();
    }
  },
  name: "App",
  components: { MyTabbar },
};
</script>
