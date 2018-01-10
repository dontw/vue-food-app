<template>
<transition name="detail">
    <div class="food" v-show="showFlag" ref="foodView">
        <div class="food-wrapper">
            <div class="food-content">
                <div class="img-wrapper">
                    <img class="food-img" :src="food.picture" alt="food picture">
                    <span class="close-bt icon-close" @click="closeView"></span>
                    <img class="share-bt" src="./share.png" alt="share icon">
                    <img class="more-bt" src="./more.png" alt="more icon">
                </div>
                <div class="content-wrapper">
                    <h3 class="name">{{food.name}}</h3>
                    <p class="saled">{{food.month_saled_content}}</p>
                    <img :src="food.product_label_picture" alt="label" class="product" v-show="food.product_label_picture">
                    <p class="price">
                        <span class="text">${{food.min_price}}</span>
                        <span class="unit">/{{food.unit}}</span>
                    </p>
                    <div class="cartcontrol-wrapper">
                        <Cartcontrol :food="food"></Cartcontrol>
                    </div>
                    <div class="buy" v-show="!food.count || food.count == 0" @click="addFirstItem">選規格</div>
                </div>
            </div>
            <Split></Split>
            <!-- 評論 -->
            <div class="rating-wrapper">
                <div class="rating-title">
                    <div class="like-ratio" v-if="food.rating">
                        <span class="title">{{food.rating.title}}</span>
                        <span class="ratio">(
                            {{food.rating.like_ratio_desc}}    
                            <i>{{food.rating.like_ratio}}</i>
                        )</span>
                    </div>
                    <div class="snd-title" v-if="food.rating">
                        <span class="text">{{food.rating.snd_title}}</span>
                        <span class="icon icon-keyboard_arrow_right"></span>
                    </div>
                </div>
                <ul class="rating-content" v-if="food.rating">
                    <li class="rating-comment" v-for="(comment,key) in food.rating.comment_list" :key="key">
                        <div class="comment-header">
                            <img :src="comment.user_icon" alt="user icon" v-if="comment.user_icon">
                            <img src="./anonymity.png" alt="suer icon" v-else>
                        </div>
                        <div class="comment-main">
                            <div class="user">{{comment.user_name}}</div> 
                            <div class="time">{{comment.comment_time}}</div>  
                            <div class="content">{{comment.comment_content}}</div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</transition>
</template>
<script>
import Vue from "vue";
import BScroll from "better-scroll";
import Cartcontrol from "components/Cartcontrol/Cartcontrol";
import Split from "components/Split/Split";

export default {
    props: {
        food: {
            type: Object
        }
    },
    components: {
        Cartcontrol,
        BScroll,
        Split
    },
    data() {
        return {
            showFlag: false
        };
    },

    methods: {
        //父組件可直接用子組件的方法
        showView() {
            this.showFlag = true;

            //初始化BScroll
            this.$nextTick(() => {
                if (!this.scroll) {
                    this.scroll = new BScroll(this.$refs.foodView, {
                        click: true
                    });
                } else {
                    this.scroll.refresh();
                }
            });
        },

        closeView() {
            this.showFlag = false;
        },

        addFirstItem() {
            Vue.set(this.food, "count", 1);
        }
    }
};
</script>
<style>
@import url("Food.css");
</style>
