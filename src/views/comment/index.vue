<template>
  <div>
    <van-nav-bar :title="$t('')" @click-right="onClickRight">
      <template #right>
        <svg-icon class="svg-fb" icon-class="fb"></svg-icon>
      </template>
    </van-nav-bar>
    <van-image
      width="100%"
      class="bancolo-img"
      :src="require('@/assets/bancolo.png')"
    />

    <main>
      <div class="item-box">
        <van-row>
          <van-col span="12">
            <div class="avaimg">
              <van-image
                round
                width="1rem"
                height="1rem"
                src="https://img01.yzcdn.cn/vant/cat.jpeg"
              />
              <div>
                <div class="name">老王</div>
                <div class="phone">387···38</div>
              </div>
            </div>
          </van-col>
          <van-col span="12">
            <svg-icon
              style="float: right"
              class="svg-fb"
              icon-class="qqq"
            ></svg-icon>
          </van-col>
        </van-row>
        <van-row>
          <van-col span="24" class="content-item">
            你怎么就敢肯定今年是喷子经济年呢？只有我一个人觉得粉丝经济赛高？
          </van-col>
        </van-row>
        <van-row gutter="10">
          <van-col span="8">
            <van-image
              radius="8"
              class="item-img"
              src="https://img01.yzcdn.cn/vant/cat.jpeg"
            />
          </van-col>
          <van-col span="8">
            <van-image
              radius="8"
              class="item-img"
              src="https://img01.yzcdn.cn/vant/cat.jpeg"
            />
          </van-col>
          <van-col span="8">
            <van-image
              radius="8"
              class="item-img"
              src="https://img01.yzcdn.cn/vant/cat.jpeg"
            />
          </van-col>
          <van-col span="8">
            <van-image
              radius="8"
              class="item-img"
              src="https://img01.yzcdn.cn/vant/cat.jpeg"
            />
          </van-col>
          <van-col span="8">
            <van-image
              radius="8"
              class="item-img"
              src="https://img01.yzcdn.cn/vant/cat.jpeg"
            />
          </van-col>
          <van-col span="8">
            <van-image
              radius="8"
              class="item-img"
              src="https://img01.yzcdn.cn/vant/cat.jpeg"
            />
          </van-col>
        </van-row>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  methods: {
    onClickRight() {
      this.$router.push("/release");
    },
  },
};
</script>

<style lang="scss" scoped>
:deep(.van-hairline--bottom::after) {
  border: none;
}

.svg-fb {
  font-size: 44px;
}
.bancolo-img {
  height: 316px;
}

main {
  .item-box {
    padding: 0 30px;
    border-bottom: 10px solid #f0f3f6;
    .avaimg {
      display: flex;
      .name {
        font-size: 28px;
        margin-left: 20px;
        font-weight: normal;
        line-height: normal;
        letter-spacing: 0px;

        color: #333333;
      }
      .phone {
        margin-left: 20px;
        font-size: 24px;
        font-weight: normal;
        line-height: 36px;
        letter-spacing: 0px;

        color: #9aafbc;
        margin-top: 5px;
      }
    }
    .content-item {
      font-size: 32px;
      font-weight: normal;
      line-height: normal;
      letter-spacing: 0px;
      font-variation-settings: "opsz" auto;
      color: #333333;
      margin: 20px 0;
    }
    .item-img {
      width: 220px;
      height: 220px;
    }
  }
}
</style>