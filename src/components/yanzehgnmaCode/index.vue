<template>
  <div class="verification-code">
    <van-field
      v-for="(item, index) in code"
      :key="index"
      v-model="code[index]"
      maxlength="1"
      type="number"
      class="code-input"
      @input="onInput(index)"
      ref="inputs"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      code: ["", "", "", "", "", ""],
    };
  },
  methods: {
    onInput(index) {
      if (this.code[index].length === 1) {
        if (index < this.code.length - 1) {
          this.$refs.inputs[index + 1].focus();
        }
      }
    },
    getCode() {
      return this.code.join("");
    },
    resetCode() {
      this.code = ["", "", "", "", "", ""];
      this.$refs.inputs[0].focus();
    },
  },
};
</script>

<style scoped>
.verification-code {
  display: flex;
  justify-content: space-between;
}
.code-input {
  width: 40px;
  text-align: center;
}
</style>
