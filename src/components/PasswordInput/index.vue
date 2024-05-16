<template>
  <van-field
    class="border-box"
    v-model="value"
    :type="passwordType"
    :placeholder="placeholder"
    input-align="left"
    @input="input"
  >
    <template slot="right-icon">
      <span class="solts" @click="switchPasswordType">
        <van-icon name="eye" v-if="passwordType === 'password'" />
        <van-icon name="closed-eye" v-else />
      </span>
    </template>
  </van-field>
</template>

<script>
export default {
  props: ["name", "placeholder"],
  data() {
    return {
      passwordType: "password",
      value: "",
    };
  },
  methods: {
    input(e) {
      this.$emit("change", e, this.name);
    },
    switchPasswordType() {
      this.passwordType =
        this.passwordType === "password" ? "text" : "password";
    },
  },
};
</script>

<style>
</style>