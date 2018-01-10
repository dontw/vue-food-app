<template>
  <div class="cartcontrol">
      <transition name="roll">
        <div class="cart-remove" v-show="food.count" @click.stop.prevent="cartRemove">
            <span class="inner icon-remove_circle_outline"></span>
        </div>
      </transition>
      <div class="cart-count" v-show="food.count">{{food.count}}</div>
      <div class="cart-add icon-add_circle" @click.stop.prevent="cartAdd">
          <i class="bg"></i>
      </div>
  </div>
</template>
<script>
import Vue from "vue";
export default {
    props: {
        food: {
            type: Object
        }
    },
    methods: {
        cartRemove() {
            this.food.count--;
        },
        cartAdd() {
            if (!this.food.count) {
                Vue.set(this.food, "count", 1);
            } else {
                this.food.count++;
            }
        }
    }
};
</script>
<style>
@import url("Cartcontrol.css");
</style>
