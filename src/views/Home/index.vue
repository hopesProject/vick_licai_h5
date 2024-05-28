<template>
    <div class="wrapper">
        <div class="header">
            <div class="header-alltech">
                <img src="@/assets/img/alltech.png" alt="">
            </div>
            <van-badge :content="msgCount" max="99">
                <div class="header-news">
                    <img src="@/assets/img/news.png" alt="">
                </div>
            </van-badge>
        </div>
        <div class="information">
            <van-swipe class="my-swipe" :autoplay="5000" indicator-color="white">
                <van-swipe-item v-for="(item, i) in noteic" :key="i">
                    <div class="swipe-container"><img src="@/assets/banner-right.png" alt=""></div>
                </van-swipe-item>
            </van-swipe>
            <div class="nav">
                <div v-for="(item, i) in navList" :key="i">
                    <img :src="item.img" alt="">
                    <span>{{ item.title }}</span>
                </div>
            </div>
        </div>
        <div class="bulletin">
            <div class="bulletin-left">
                <img src="@/assets/img/bulletin-bg.png" alt="">
                <div>
                    <span>快讯播报</span>
                    <span>邀请好友获得丰富奖励</span>
                </div>
            </div>
            <van-icon name="arrow" />
        </div>
        <div class="wallet">
            <div class="wallet-money">
                <div class="wallet-money-left">
                    <span>总资金</span>
                    <span>8.9</span>
                </div>
                <div class="wallet-money-right">
                    <div @click="$router.push('/recharge')">充值</div>
                    <div @click="$router.push('/withdrawal')">提现</div>
                </div>
            </div>
            <div class="wallet-history">
                <div>
                    <span>充值金额</span>
                    <span>8.9</span>
                </div>
                <div>
                    <span>可提现金额</span>
                    <span>1.9</span>
                </div>
            </div>
        </div>

        <div class="popular">
            <div class="header-h1">{{ $t("热门产品") }}</div>
            <van-swipe :loop="false" :autoplay="3000" indicator-color="white">
                <van-swipe-item v-for="(item, index) in isHotData" :key="index">
                    <div class="popular-content">
                        <div class="img-box">
                            <img :src="item.img" alt="" />
                        </div>
                        <div class="popular-right">
                            <div class="popular-product">
                                <div>
                                    <span>产品价格</span>
                                    <span>{{ item.price }}</span>
                                </div>
                                <div v-if="token" class="goumai-but" @click="purchaseShowClick(item)">
                                    {{ $t("购买") }}
                                </div>
                                <div v-else class="goumai-but" @click="$router.push('/login')">
                                    {{ $t("登录") }}
                                </div>
                            </div>
                            <div class="popular-income">
                                <div>
                                    <span>{{ $t("日收入") }}</span>
                                    <span> {{ item.dailyProductRevenue | _toLocaleString(false) }}</span>
                                </div>
                                <div>
                                    <span>{{ $t("累计收入") }}</span>
                                    <span>{{ (item.dailyProductRevenue * item.cycle) | _toLocaleString(false) }}</span>
                                </div>
                            </div>

                        </div>

                    </div>
                </van-swipe-item>
            </van-swipe>
        </div>
        <div class="journalism">
            <div class="header-h1">{{ $t("新闻快讯") }}</div>
            <div class="journalism-box" v-for="(item, i) in journalismList" :key="i">
                <div class="journalism-box-img"><img src="" alt=""></div>
                <div class="journalism-box-txt">
                    <span>{{ item.title }}</span>
                    <span>{{ item.text }}</span>
                    <span>{{ item.tiem }}</span>
                </div>
            </div>
        </div>
        <!-- 活动通知 -->
        <van-popup v-model="noticeShow" class="notice" :closeable="true" :close-on-click-overlay="false">
            <div class="notice-box">
                <div class="notice-title">{{ $t("活动通知") }}</div>
                <pre class="notice-txt">
          1.最新优惠活动没法及时告诉你哦开通后消息及时推送，不错过任何消息.
          2.最新优惠活动没法及时告诉你哦开通后消息及时推送，不错过任何消息.
          3.最新优惠活动没法及时告诉你哦开通后消息及时推送，不错过任何消息.
        </pre>
            </div>
        </van-popup>
        <van-overlay :show="purchaseShow" class="purchase">
            <div class="purchase-box">
                <van-icon name="close" class="purchase-close" color="#fff" @click="purchaseShow = false" />

                <div class="purchase-top">
                    <van-row type="flex" justify="space-between" class="purchase-income">
                        <van-col span="11">
                            <div>
                                {{ $t("每日收入：")
                                }}{{
                                    (purchaseShowData.dailyProductRevenue * stepperValue)
                                    | _toLocaleString(false)
                                }}
                            </div>
                        </van-col>
                        <van-col span="11">
                            <div>
                                {{ $t("总收益：") }}

                                {{
                                    (purchaseShowData.dailyProductRevenue *
                                        purchaseShowData.cycle *
                                        stepperValue)
                                    | _toLocaleString(false)
                                }}
                            </div>
                        </van-col>
                    </van-row>
                    <van-row type="flex" justify="space-between" class="purchase-num">
                        <van-col span="6">{{ $t("购买数量") }}</van-col>
                        <van-col span="12">
                            <van-stepper v-model="stepperValue" button-size="28px" /></van-col>
                    </van-row>
                </div>
                <div class="purchase-bottom">
                    <img :src="purchaseShowData.img" alt="" />
                    <div class="purchase-commodity">
                        <div>{{ purchaseShowData.productTitle }}</div>
                        <div>
                            <span>{{ $t("购买价格：") }}</span><span>{{ purchaseShowData.price }}</span>
                        </div>
                        <div>
                            <span>{{ $t("总价格：") }}</span><span>{{ purchaseShowData.price * stepperValue }}</span>
                        </div>
                    </div>
                </div>
                <div class="purchase-but">
                    <van-button type="primary" block
                        color="linear-gradient(0deg,#ff947c 0%, #ffb98c 100%), linear-gradient(0deg,#e11b31 1%, #f3354e 100%)"
                        :round="true" @click="ljizhifu">{{ $t("立即支付") }}</van-button>
                </div>
            </div>
        </van-overlay>
    </div>
</template>
<script>
import {
    buyProduct,
    getCustomerService,
    productqueryProductClassify,
    queryMsgCount,
    queryNoteice,
    queryPaySetting,
    queryProductClassify,
    queryProductisHot,
} from "@/api";
import { Toast } from "vant";
import { mapActions, mapGetters } from "vuex";
export default {
    data() {
        return {
            noteic: [
                {
                    title: '1'
                },
                {
                    title: '2'
                },
                {
                    title: '3'
                },
                {
                    title: '4'
                },
            ],
            navList: [
                {
                    title: '我们',
                    img: require('@/assets/img/my.png')
                },
                {
                    title: '客服',
                    img: require('@/assets/img/service.png')
                },
                {
                    title: 'VIP',
                    img: require('@/assets/img/vip-icon.png')
                },
            ],
            msgCount: 0,
            servicedata: localStorage.getItem("servicedata") || "",

            queryPaySettingData: [],
            data: [],
            fenleiData: localStorage.getItem("fenleiData")
                ? JSON.parse(localStorage.getItem("fenleiData"))
                : [],
            tabsAcitve: localStorage.getItem("tabsAcitve")
                ? JSON.parse(localStorage.getItem("tabsAcitve"))
                : 2,
            isHotData: [],
            noticeShow: false,
            purchaseShow: false,
            purchaseShowData: {},
            stepperValue: 1,
            journalismList: [
                {
                    img: require('@/assets/img/bulletin-bg.png'),
                    title: '今天去了趟云南大理也去了',
                    text: '今天去了一趟云南大理也去了今天去了一趟云南大理也去了今天去了一趟云南大理也去了',
                    time: '18:80 26/5/2024'
                },
                {
                    img: require('@/assets/img/bulletin-bg.png'),
                    title: '今天去了趟云南大理也去了',
                    text: '今天去了一趟云南大理也去了今天去了一趟云南大理也去了今天去了一趟云南大理也去了',
                    time: '18:80 26/5/2024'
                },
            ]
        }
    },
    computed: {
        ...mapGetters(["token", "userInfo"]),
        tabs() {
            return this.fenleiData;
        },
    },
    mounted() {
        this.getfenlei();
        this.getCustomerService();
        this.getQueryNoteice();
        // this.getlist();
        this.getqueryProductisHot();
        // this.queryPaySetting();
        if (this.token) {
            this.queryMsgCount();
            this.getUserInfo();
        }
    },
    methods: {
        ...mapActions(["getUserInfo"]),
        kefutz() {
            window.location.href = this.servicedata;
        },
        async queryMsgCount() {
            const res = await queryMsgCount();
            if (res.status === 0) {
                this.msgCount = res.data;
            }
        },
        async getCustomerService() {
            const res = await getCustomerService();
            if (res.status === 0) {
                localStorage.setItem("servicedata", res.data);
                this.servicedata = res.data;
            }
        },
        async getqueryProductisHot() {
            const res = await queryProductisHot();
            if (res.status === 0) {
                this.isHotData = res.data;
            }
        },
        async queryPaySetting() {
            const res = await queryPaySetting();
            if (res.status === 0) {
                this.queryPaySettingData = res.data;
            }
        },
        async purchaseShowClick(item) {
            this.purchaseShow = true;
            this.purchaseShowData = item;
        },
        async getQueryNoteice() {
            const res = await queryNoteice({
                pageSize: 10,
                pageNum: 1,
            });
            if (res.status === 0) {
                this.noteic = res.data.list;
            }
        },
        tabsClick(item) {
            this.tabsAcitve = item;
            this.getlist();
        },
        async getfenlei() {
            const res = await queryProductClassify();
            if (res.status === 0) {
                localStorage.setItem("fenleiData", JSON.stringify(res.data));
                localStorage.setItem("tabsAcitve", JSON.stringify(res.data[0].id));
                this.fenleiData = res.data;
                this.tabsAcitve = res.data[0].id;
                this.getlist();
            }
        },
        async getlist() {
            this.data = [];
            let id = this.tabsAcitve;
            const res = await productqueryProductClassify({ id: 3 });
            if (res.status === 0 && this.tabsAcitve === id) {
                this.data = res.data;
            }
        },
        async ljizhifu() {
            const res = await buyProduct({
                pid: this.purchaseShowData.id,
                num: this.stepperValue,
            });

            if (res.status === 0) {
                this.purchaseShow = false;
                Toast.success(this.$t(`购买成功`));
                setTimeout(() => {
                    this.$router.push("/purchase-history");
                }, 1000);
            } else {
                this.purchaseShow = false;
            }
        },
    },
}
</script>
<style lang="scss" scoped>
.wrapper {
    padding: 18px 36px;
    position: relative;
    background-color: #f6f6f6;
}

.header {
    display: flex;
    justify-content: space-between;

    .header-alltech {
        height: 60px;
        width: 168px;
    }

    .header-news {
        width: 54px;
        height: 54px;
    }

    :deep(.van-badge--dot) {
        width: 16px;
        height: 16px;
    }

    img {
        width: 100%;
        height: 100%;
    }
}

.information {
    margin: 38px 0 170px 0;
    position: relative;

    .swipe-container {
        height: 320px;
        border-radius: 16px;

        img {
            width: 100%;
            height: 100%;
        }
    }

    .nav {
        width: 100%;
        border-radius: 16px;
        background: #fff;
        box-shadow: 0px -16px 20px 0px rgba(0, 0, 0, 0.0386);
        padding: 33px 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: absolute;
        left: 0;
        bottom: -40%;

        >div {
            font-size: 28px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            >img {
                width: 64px;
                height: 64px;
                margin-bottom: 16px;
            }
        }
    }
}

.bulletin {
    border-radius: 16px;
    background: #fff;
    border: 1px dashed #EDEDED;
    box-shadow: 0px -16px 20px 0px rgba(0, 0, 0, 0.0386);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 29px;

    .bulletin-left {
        display: flex;
        align-items: center;

        >img {
            width: 90px;
            height: 85px;
        }

        >div {
            margin-left: 16px;
            display: flex;
            flex-direction: column;
            font-size: 28px;
        }
    }
}

.wallet {
    width: 100%;
    padding: 40px;
    border-radius: 16px;
    background: linear-gradient(92deg, #D25815 0%, #DD824F 98%);
    margin-top: 36px;

    .wallet-money {
        width: 100%;
        display: flex;

        >div {
            width: 50%;
        }

        .wallet-money-left {
            display: flex;
            flex-direction: column;
            color: #F6F6F6;

            >span:nth-child(1) {
                font-size: 28px;
                margin-bottom: 18px;
            }

            >span:nth-child(2) {
                font-weight: 600;
                font-size: 34px;
            }
        }

        .wallet-money-right {
            display: flex;
            justify-content: space-between;
            align-items: end;

            >div {
                background: #F6F6F6;
                width: 140px;
                height: 60px;
                line-height: 60px;
                text-align: center;
                border-radius: 30px;
                font-size: 32px;
                color: #333333;
            }

            >div:nth-child(1) {
                color: #B80000;
            }
        }
    }

    .wallet-history {
        display: flex;
        margin-top: 32px;

        >div {
            width: 50%;
            font-size: 28px;
            color: #F6F6F6;
            display: flex;
            flex-direction: column;

            >span:nth-child(2) {
                font-weight: 600;
            }
        }
    }
}

.header-h1 {
    font-weight: bold;
    font-size: 36px;
    line-height: 44px;
    letter-spacing: 0px;
    color: #333333;
    margin: 38px 0;
}

.popular {

    .popular-content {
        display: flex;
        border-radius: 18px;
        background: #fff;
        padding: 32px 24px;

        .img-box {
            width: 226px;
            height: 226px;

            >img {
                width: 226px;
                height: 226px;
                border-radius: 18px;
            }
        }

        .popular-right {
            flex: 1;
            padding: 0 16px;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;

            .popular-product {
                display: flex;
                justify-content: space-between;

                >div:nth-child(1) {
                    font-size: 24px;
                    color: #666666;
                    font-weight: 600;
                    display: flex;
                    flex-direction: column;

                    >span:nth-child(2) {
                        font-size: 24px;
                        color: #333333;
                        font-weight: normal;
                    }
                }

                .goumai-but {
                    width: 168px;
                    height: 68px;
                    line-height: 68px;
                    text-align: center;
                    border-radius: 16px;
                    color: #F6F6F6;
                    font-size: 24px;
                    font-weight: 600;
                    background: #D25815;
                }
            }

            .popular-income {
                display: flex;
                justify-content: space-between;

                >div {
                    display: flex;
                    flex-direction: column;
                    font-size: 24px;
                    font-weight: 600;
                    color: #666666;

                    >span:nth-child(2) {
                        font-size: 24px;
                        font-weight: normal;
                        color: #FF6E00;
                    }
                }
            }
        }
    }
}

.purchase {
    z-index: 9;
    display: flex;
    align-items: center;
    justify-content: center;

    .purchase-box {
        width: 586px;
        // height: 503px;
        background-image: url("@/assets/purchase.png");
        background-size: 100% 100%;
        padding: 40px 55px 55px 55px;
        font-size: 24px;
        position: relative;

        .purchase-close {
            position: absolute;
            bottom: -20%;
            left: 50%;
            transform: translateX(-50%);
            font-size: 60px;
        }

        .purchase-top {
            font-size: 18px;

            .purchase-income {
                .van-col {
                    padding: 20px 10px;
                    border-radius: 8px;
                    border: 1px solid #ffebcd;
                    display: flex;
                    align-items: center;

                    >div {
                        // line-height: 72px;
                        text-align: center;
                        color: #ffefd1;
                    }
                }
            }

            .purchase-num {
                margin-top: 20px;
                text-align: center;

                .van-col {
                    color: #ffefd1;
                }
            }
        }

        .purchase-bottom {
            margin: 40px 10px 10px 10px;
            display: flex;

            >img {
                width: 130px;
                height: 130px;
                border-radius: 8px;
            }

            .purchase-commodity {
                flex: 1;
                font-weight: normal;
                padding-left: 16px;

                >div {
                    font-size: 24px;
                    display: flex;

                    >span:nth-child(1) {
                        color: #676767;
                    }

                    >span:nth-child(2) {
                        color: #000000;
                    }
                }

                >div:nth-child(1) {
                    font-size: 30px;
                    text-align: left;
                    color: #cc1127;
                }
            }
        }

        .purchase-but {
            margin-top: 50px;
            padding: 0 50px;

            .van-button {
                height: 70px;
                font-size: 32px;

                .van-button__text {
                    color: #f4e1c5;
                }
            }
        }
    }
}

.journalism-box {
    display: flex;
    margin-bottom: 24px;
    background-color: #fff;
    padding: 32px 24px;
    border-radius: 18px;

    .journalism-box-img {
        width: 220px;
        height: 220px;

        >img {
            width: 220px;
            height: 220px;
            border-radius: 16px;
        }
    }

    .journalism-box-txt {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        color: #333333;
        font-size: 24px;
        padding-left: 16px;

        >span:nth-child(1) {
            font-size: 32px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-weight: 600;
        }

        >span:nth-child(2) {
            font-size: 24px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
        }
    }
}
</style>