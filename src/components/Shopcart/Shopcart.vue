<template>
  <div class="shopcart-wrapper" :class="{'highlight':totalCount>0}">
      <div class="shopcart">
        <div class="content-left">
            <div class="logo-wrapper" :class="{'highlight':totalCount>0}">
            <span class="icon-shopping_cart logo" :class="{'highlight':totalCount>0}" @click="toggleList"></span>
            <i class="num" v-show="totalCount">{{totalCount}}</i>
            </div>
            <div class="desc-wrapper">
            <p class="total-price" v-show="totalCount">${{totalPrice}}</p>
            <p class="tip" :class="{'highlight':totalCount>0}">{{poiInfo.shipping_fee_tip}}</p>
            </div>
        </div>
        <div class="content-right" :class="{'highlight':totalCount>0}">
            {{payStr}}
        </div>
        <div class="shopcart-list" v-show="listShow" :class="{'show':listShow}">
            <div class="list-top" v-if="poiInfo.discounts2">
                {{poiInfo.discounts2[0].info}}
            </div>
            <div class="list-header">
                <h3 class="title">1號口袋</h3>
                <div class="empty" @click="emptyList">
                    <img src="./ash_bin.png" alt="trash-icon">
                    <span>清空購物車</span>    
                </div>
            </div>
            <div class="list-content" ref="listContent">
                <ul>
                    <li class="food" v-for="(food,key) in selectFoods" :key="key">
                        <div class="desc-wrapper">
                            <div class="desc-left">
                                <p class="name">{{food.name}}</p>
                                <p class="unit" v-show="!food.description">{{food.unit}}</p>
                                <p class="description" v-show="food.description">{{food.description}}</p>
                            </div>
                            <div class="desc-right">
                                <span class="price">${{food.min_price}}</span>
                            </div>
                        </div>
                        <div class="cartcontrol-wrapper">
                            <Cartcontrol :food="food"></Cartcontrol>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="list-bottom"></div>
        </div>
      </div>
      <div class="shopcart-mask" v-show="listShow" @click="hideMask"></div>
  </div>
</template>
<script>
import BScroll from "better-scroll";
import Cartcontrol from "components/Cartcontrol/Cartcontrol";
export default {
    props: {
        poiInfo: {
            type: Object,
            default() {
                return {};
            }
        },
        selectFoods: {
            type: Array,
            default() {
                return [
                    // {
                    //     min_price: 1,
                    //     count: 1
                    // },
                    // {
                    //     min_price: 6,
                    //     count: 0
                    // }
                ];
            }
        }
    },
    data() {
        return {
            fold: true
        };
    },
    components: {
        Cartcontrol,
        BScroll
    },
    methods: {
        toggleList() {
            if (!this.totalCount) {
                return;
            }
            this.fold = !this.fold;
        },
        emptyList() {
            this.selectFoods.forEach(food => {
                food.count = 0;
            });
        },
        hideMask() {
            this.fold = true;
        }
    },
    computed: {
        //總數量
        totalCount() {
            let num = 0;
            this.selectFoods.forEach(food => {
                num += food.count;
            });
            return num;
        },
        totalPrice() {
            let total = 0;
            this.selectFoods.forEach(food => {
                total += food.min_price * food.count;
            });

            return total;
        },

        //結算
        payStr() {
            if (this.totalCount > 0) {
                return "去結算";
            } else {
                return this.poiInfo.min_price_tipe;
            }
        },

        listShow() {
            if (!this.totalCount) {
                this.fold = true;
                return false;
            }
            let show = !this.fold;

            //BScroll
            if (show) {
                this.$nextTick(() => {
                    if (!this.shopScroll) {
                        this.shopScroll = new BScroll(this.$refs.listContent, {
                            click: true
                        });
                    } else {
                        this.shopScroll.refresh();
                    }
                });
            }
            return show;
        }
    }
};
</script>
<style>
@import url("Shopcart.css");
</style>
