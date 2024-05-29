<template>
    <div class="wrapper">
        <van-nav-bar title="佣金比率" :border="false" left-arrow @click-left="$router.go(-1);"></van-nav-bar>
        <div class="content">
            <div class="header-img"><img src="@/assets/img/commission-bg.png" alt=""></div>
            <div class="content-title"><span>邀请</span>好友&emsp;<span>分享</span>现金</div>
            <div class="commission">
                <div class="commission-title">提成收益</div>
                <table class="commission-table" cellspacing="0">
                    <tr>
                        <td>团队成员级别</td>
                        <td>佣金比例</td>
                    </tr>
                    <tr>
                        <td>
                            <div class="level">
                                <img src="@/assets/img/commission-icon1.png" alt="">
                                <span>直属会员 V1</span>
                            </div>
                        </td>
                        <td>30%</td>
                    </tr>
                    <tr>
                        <td>
                            <div class="level">
                                <img src="@/assets/img/commission-icon2.png" alt="">
                                <span>直属会员 V2</span>
                            </div>
                        </td>
                        <td>6%</td>
                    </tr>
                    <tr>
                        <td>
                            <div class="level">
                                <img src="@/assets/img/commission-icon3.png" alt="">
                                <span>直属会员 V3</span>
                            </div>
                        </td>
                        <td>3%</td>
                    </tr>
                </table>
            </div>
            <div class="invite">
                <div class="invite-title">邀请任务</div>
                <div class="invite-list" v-for="(item,i) in inviteList" :key="i">
                    <img src="@/assets/img/commission-icon1.png" alt="">
                    <div class="invite-list-txt">
                        <span>活跃会员</span>
                        <div class="invite-progress">
                            <span>{{item.percentageTxt}}</span>
                            <van-progress :percentage="item.percentage" stroke-width="8" :show-pivot=false />
                        </div>
                    </div>
                    <div class="invite-list-right">
                        <span>{{item.reward}}</span>
                        <span>奖励</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            inviteList:[
                {
                    img:require('@/assets/img/commission-icon1.png'),
                    percentageTxt:'10/20',
                    percentage:50,
                    reward:500
                },
                {
                    img:require('@/assets/img/commission-icon1.png'),
                    percentageTxt:'5/20',
                    percentage:30,
                    reward:500
                },
            ]
        }
    }
}
</script>
<style lang="scss" scoped>
.wrapper {
    background-color: #f8f3f2;
}

.content {
    margin: 16px;

    .header-img {
        >img {
            height: 605px;
            width: 100%;
            border-radius: 16px;
        }
    }
}

.content-title {
    font-size: 68px;
    text-align: center;
    font-weight: 600;
    margin-top: 80px;

    >span {
        color: #D35A18
    }
}

.commission {
    border-radius: 32px;
    background: #FFFFFF;
    padding: 48px 36px 36px 36px;

    .commission-title {
        font-size: 32px;
        color: #3D3D3D;
        text-align: center;
        margin-bottom: 32px;
    }

    table,
    td {
        border: 2px solid #D8D8D8;
    }

    .commission-table {
        width: 100%;
        border-collapse: separate;
        font-size: 24px;

        td {
            height: 90px;
            text-align: center;
        }
        .level{
            display: flex;
            justify-content: center;
            align-items: center;
            img{
                width: 48px;
                height: 48px;
                margin-right: 12px;
            }
        }
    }
}
.invite{
    border-radius: 32px;
    background: #FFFFFF;
    padding: 48px 36px 36px 36px;
    margin-top: 32px;
    .invite-title{
        font-size: 32px;
        text-align: center;
    }
    .invite-list{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 44px 38px;
        box-shadow: 0px 9.62px 38.47px 0px rgba(0, 0, 0, 0.08);
        border-radius: 39px;
        margin-top: 24px;
        >img{
            width: 48px;
            height: 48px;
        }
        .invite-list-txt{
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            >span{
                font-size: 38px;
                color: #606574;
                font-weight: 800;
            }
            .invite-progress{
                display: flex;
                align-items: center;
                justify-content: space-between;
                font-size: 20px;
                color: #B3B3C6;
                >span{
                    padding: 2px 12px 0 0;
                }
                .van-progress{
                    width: 155px;
                }
            }
        }
        .invite-list-right{
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            >span:nth-child(1){
                font-size: 46px;
                color: #D35A18;
                font-weight: 800;
            }
            >span:nth-child(2){
                font-size: 30px;
                color: #666666;
            }
        }
    }
}
</style>