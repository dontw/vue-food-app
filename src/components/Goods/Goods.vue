<template>
  <div class="goods">
      <!-- 左側選單 -->
      <div class="menu-wrapper" ref="menuScroll">
        <ul>
          <li class="menu-item">
            <p class="text">
              <img :src="container.tag_icon" v-if="container.tag_icon" class="icon">
              {{container.tag_name}}
            </p>
          </li>
          <li class="menu-item" v-for="item in goods">
            <p class="text">
              <img :src="item.icon" v-if="item.icon" class="icon">
              {{item.name}}
            </p>
          </li>
        </ul>
      </div>
      <!-- 商品頁 -->
      <div class="foods-wrapper" ref="foodScroll">
        <ul>
          <!-- 專場 -->
          <li class="container-list">
            <div v-for="item in container.operation_source_list">
              <img :src="item.pic_url">
            </div>
          </li>
          <!-- 具體分類 -->
          <li class="food-list" v-for="item in goods">
            <!-- 商品列表 -->
            <h3 class="title">{{item.name}}</h3>
            <ul>
              <li class="food-item" v-for="food in item.spus">
                <div class="icon" :style="head_bg(food.picture)"></div>
                <div class="content">
                  <h3 class="name">{{food.name}}</h3>
                  <p class="desc" v-if="food.description">{{food.description}}</p>
                  <div class="extra">
                    <span class="saled">{{food.month_saled_content}}</span>
                    <span class="praise">{{food.praise_content}}</span>
                  </div>
                  <img class="product" v-if="food.product_label_picture" :src="food.product_label_picture">
                  <p class="price">
                    <span class="text">${{food.min_price}}</span>
                    <span class="unit">/{{food.unit}}</span>
                  </p>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
  </div>
</template>
<script>
import BScroll from "better-scroll";
export default {
    data() {
        return {
            container: {},
            goods: []
        };
    },
    created() {
        this.$axios
            .get("api/goods")
            .then(response => {
                var dataSource = response.data;
                if (dataSource.code === 0) {
                    this.container = dataSource.data.container_operation_source;
                    this.goods = dataSource.data.food_spu_tags;
                    //調用BScroll滾動初始化
                    //this.initScroll();
                    //於created階段 DOM尚未渲染 高度不是最後狀態
                    //在獲取數據後，並DOM已渲染完畢，高度沒問題 => this.$nextTick
                    this.$nextTick(() => {
                        this.initScroll();
                    });
                }
            })
            .catch(error => {
                console.log(error);
            });
    },
    // computed:{
    //   head_bg(){
    //     return
    //   }
    // },

    methods: {
        head_bg(imgName) {
            return "background-image:url(" + imgName + ");";
        },

        initScroll() {
            //ref屬性用來綁定某個dom元素or組件,在this.$ref中
            new BScroll(this.$refs.menuScroll);
            new BScroll(this.$refs.foodScroll);
        }
    }
};
</script>
<style>
@import url("Goods.css");
</style>
