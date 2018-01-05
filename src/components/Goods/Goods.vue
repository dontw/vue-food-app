<template>
  <div class="goods">
      <!-- 左側選單 -->
      <div class="menu-wrapper" ref="menuScroll">
        <ul>
          <li class="menu-item" :class="{'current': currentIndex === 0}" @click="selectMenu(0)">
            <p class="text">
              <img :src="container.tag_icon" v-if="container.tag_icon" class="icon">
              {{container.tag_name}}
            </p>
          </li>
          <li class="menu-item" v-for="(item,index) in goods" :class="{'current': currentIndex === index + 1}" @click="selectMenu(index + 1)">
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
          <li class="container-list food-list-hook">
            <div v-for="item in container.operation_source_list">
              <img :src="item.pic_url">
            </div>
          </li>

          <!-- 具體分類 -->
          <li class="food-list food-list-hook" v-for="item in goods">
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

      <Shopcart :shippingTip="poiInfo.shipping_fee_tip" :minPrice="poiInfo.min_price_tip"></Shopcart>
  </div>
</template>
<script>
import BScroll from "better-scroll";
import Shopcart from "components/Shopcart/Shopcart";
export default {
    data() {
        return {
            container: {},
            goods: [],
            poiInfo: {},
            listHeight: [],
            scrollY: 0,
            menuScroll: {},
            foodScroll: {}
        };
    },
    components: {
        Shopcart
    },
    created() {
        this.$axios
            .get("api/goods")
            .then(response => {
                var dataSource = response.data;
                if (dataSource.code === 0) {
                    this.container = dataSource.data.container_operation_source;
                    this.goods = dataSource.data.food_spu_tags;
                    this.poiInfo = dataSource.data.poi_info;
                    //調用BScroll滾動初始化
                    //this.initScroll();
                    //於created階段 DOM尚未渲染 高度不是最後狀態
                    //在獲取數據後，並DOM已渲染完畢，高度沒問題 => this.$nextTick
                    this.$nextTick(() => {
                        //DOM已更新
                        this.initScroll();

                        //計算各分類區間高度
                        this.calculateHeight();
                    });
                }
            })
            .catch(error => {
                console.log(error);
            });
    },

    methods: {
        head_bg(imgName) {
            return "background-image:url(" + imgName + ");";
        },

        initScroll() {
            //ref屬性用來綁定某個dom元素or組件,在this.$ref中
            this.menuScroll = new BScroll(this.$refs.menuScroll, {
                click: true
            });
            this.foodScroll = new BScroll(this.$refs.foodScroll, {
                //当 probeType 为 3 的时候，不仅在屏幕滑动的过程中，而且在 momentum 滚动动画运行过程中实时派发 scroll 事件
                probeType: 3
            });

            //添加監聽事件
            this.foodScroll.on("scroll", pos => {
                //console.log(pos.y);
                this.scrollY = Math.abs(Math.round(pos.y));
            });
        },

        calculateHeight() {
            //透過$refs獲取相對應的元素
            let foodList = this.$refs.foodScroll.getElementsByClassName(
                "food-list-hook"
            );

            //將獲取元素區間加到array中
            let height = 0; //起始
            this.listHeight.push(height);
            //用loop將所有高度加到array中
            for (let i = 0; i < foodList.length; i++) {
                let item = foodList[i];
                //累加
                height += item.clientHeight;

                this.listHeight.push(height);
            }
        },
        selectMenu(index) {
            //console.log(index);
            //獲取對應元素
            let foodList = this.$refs.foodScroll.getElementsByClassName(
                "food-list-hook"
            );

            //根據左側標題至相對應的右側位置
            let el = foodList[index];

            //滾動到對應位置
            this.foodScroll.scrollToElement(el, 250);
        }
    },

    computed: {
        currentIndex() {
            //根據右側滾動位置確認左邊選單標題
            for (let i = 0; i < this.listHeight.length; i++) {
                //獲取商品區間範圍
                let height1 = this.listHeight[i];
                let height2 = this.listHeight[i + 1];

                //是否在上述區間中
                if (
                    !height2 ||
                    (this.scrollY >= height1 && this.scrollY <= height2)
                ) {
                    return i;
                }
            }

            return 0;
        }
    }
};
</script>
<style>
@import url("Goods.css");
</style>
