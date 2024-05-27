<template>
    <div class="wrapper">
        <div class="header">
            <div @click="onClickLeft"><img src="@/assets/img/go.png" alt=""></div>
            <div>找回密码</div>
        </div>
        <div class="content">
            <div class="content-title"><img src="@/assets/img/alltech.png" alt=""></div>
            <van-form ref="form" class="form" :show-error-message="false" label-width="60">
                <van-field v-model="form.phone" placeholder="手机号" input-align="left">
                    <template slot="label">
                        <div class="quhao">
                            <span>+91 </span> <van-icon name="arrow" />
                        </div>
                    </template>
                </van-field>
                <van-field v-model="form.code" :placeholder="$t('验证码')" input-align="left" center clearable
                    class="verification ">
                    <template #button>
                        <van-button :disabled="codeButTexst !== '发送验证码'" @click="sendCode" type="primary" size="small">
                            {{ $t(codeButTexst) }}</van-button>
                    </template>
                </van-field>
                <PasswordInput :placeholder="$t('密码')" name="pwd" @change="iniput" />
                <PasswordInput :placeholder="$t('确认密码')" name="passwordNew" @change="iniput" />
            </van-form>
            <div class="foot">
                <van-button @click="retrieve" :loading="loading" type="primary" block color="#C1531B" :round="true">
                    <div class="nextStep"><span>下一步</span> <img src="@/assets/img/white-arrow-right.png" alt="">
                    </div>
                </van-button>
                <div class="download" @click="$router.push('/download')">下载·Alltech</div>
            </div>
        </div>
    </div>
</template>
<script>
import { register, sendCode } from "@/api";
import { Toast } from "vant";
import PasswordInput from "@/components/PasswordInput/index.vue";

export default {
    components: { PasswordInput },
    data() {
        return {
            codeButTexst: "发送验证码",
            tiem: null,
            isinviteCode: false,
            loading: false,
            form: {
                phone: "", //手机号码
                code: "", //验证码
                pwd: "", //密码
                passwordNew: "", //确认密码
            }
        }
    },

    beforeDestroy() {
        if (this.tiem) {
            clearInterval(this.tiem);
            this.tiem = null;
        }
    },
    methods: {
        onClickLeft() {
            this.$router.go(-1);
        },
        iniput(e, name) {
            this.form[name] = e;
        },
        async sendCode() {
            if (this.codeButTexst !== "发送验证码") {
                return;
            }
            if (this.form.phone) {
                let res = await sendCode({
                    phoneNumber: this.form.phone,
                });
                if (res.status === 0) {
                    Toast(this.$t("验证码发送成功"));
                    this.codeButTexst = 60;
                    this.tiem = setInterval(() => {
                        this.codeButTexst = this.codeButTexst - 1;
                        if (this.codeButTexst === 0) {
                            this.codeButTexst = "发送验证码";
                            clearInterval(this.tiem);
                        }
                    }, 1000);
                }
            } else {
                Toast(this.$t("请先输入手机号"));
            }
        },
        retrieve() {

        }

    },
}
</script>
<style lang="scss" scoped>
.header {
   line-height: 88px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 14px 48px;
    position: relative;
    >div:nth-child(1) {
        width: 60px;
        height: 60px;
        border-radius: 18px;
        background: #C1531B;
        box-shadow: 0px 36.23px 72.46px 0px rgba(0, 0, 0, 0.15);
        padding: 12px 15px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        left: 48px;
        top: 14px;
    }

    >div:nth-child(2) {
        font-size: 36px;
        font-weight: 600;
        color: #333333;
    }
}

.content {
    padding: 32px 96px 32px 96px;
}

.content-title {
    display: flex;
    justify-content: center;

    >img {
        width: 300px;
        height: 88px;
    }
}

.form {
    width: 100%;

    .van-cell {
        font-size: 36px;
        height: 110px;
        border-radius: 50px;
        background: #FFFFFF;
        box-shadow: 0px 36.23px 72.46px 0px rgba(0, 0, 0, 0.15);
        margin-top: 48px;

        :deep(.van-field__body) {
            height: 100%;
            padding: 0 12px;

            .van-icon {
                font-size: 32px;
            }
        }
    }
}

.quhao {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 32px;
    color: #C1531B;
}

.verification {
    :deep(.van-field__button) {
        .van-button {
            font-size: 36px;
            color: #C1531B;
            background-color: transparent;
            border: 0;
        }
    }
}

.foot {

    margin-top: 48px;

    .van-button {
        font-size: 36px;
        height: 110px;
        color: #FFFFFF;

        .nextStep {
            display: flex;
            justify-content: center;
            align-items: center;

            >img {
                width: 36px;
                height: 36px;
                margin-left: 24px;
            }
        }

    }

    .download {
        font-size: 28px;
        color: #C1531B;
        text-align: center;
        margin-top: 48px;
    }
}
</style>