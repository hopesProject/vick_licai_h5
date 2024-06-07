<template>
  <div id="app">
    <router-view />
    <my-tabbar v-if="$route.meta.show === true"></my-tabbar>
  </div>
</template>

<script>
import MyTabbar from "@/components/MyTabbar/index.vue";
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  methods: {
    ...mapActions(["getUserInfo"]),
    ...mapMutations(["SET_TOKEN"]),
  },
  computed: {
    ...mapGetters(["token"]),
  },
  created() {
    if (this.$route.query.token) {
      this.SET_TOKEN(JSON.parse(this.$route.query.token));
    }
    if (this.token) {
      // this.getUserInfo();
    }
  },
  name: "App",
  components: { MyTabbar },
};
</script>
