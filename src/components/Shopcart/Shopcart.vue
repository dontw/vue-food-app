<template>
  <div class="shopcart" :class="{'highlight':totalCount>0}">
      <div class="content-left">
        <div class="logo-wrapper" :class="{'highlight':totalCount>0}">
          <span class="icon-shopping_cart logo" :class="{'highlight':totalCount>0}"></span>
          <i class="num" v-show="totalCount">{{totalCount}}</i>
        </div>
        <div class="desc-wrapper">
          <p class="total-price" v-show="totalCount">${{totalPrice}}</p>
          <p class="tip" :class="{'highlight':totalCount>0}">{{shippingTip}}</p>
        </div>
      </div>
      <div class="content-right" :class="{'highlight':totalCount>0}">
        {{payStr}}
      </div>
  </div>
</template>
<script>
export default {
    props: {
        minPrice: {
            type: String,
            default: ""
        },
        shippingTip: {
            type: String,
            default: ""
        },
        selectFoods: {
            type: Array,
            default() {
                return [
                    {
                        min_price: 1,
                        count: 1
                    },
                    {
                        min_price: 6,
                        count: 0
                    }
                ];
            }
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
                return this.minPrice;
            }
        }
    }
};
</script>
<style>
@import url("Shopcart.css");
</style>
