<template>
  <div class="ratings" ref="ratingScroll">
      <div class="ratings_wrapper">
        <div class="overview">
          <div class="overview_left">
            <div class="comment_score">
              <div class="score">{{ratingsData.comment_score}}</div>
              <div class="text">商家評分</div>
            </div>
            <div class="other_score">
              <div class="quality_score item">
                <span class="text">口味</span>
                <app-star class="star" :score="ratingsData.food_score"></app-star>
                <span class="score">{{ratingsData.food_score}}</span>
              </div>
              <div class="pack_score item">
                <span class="text">包裝</span>
                <app-star class="star" :score="ratingsData.pack_score"></app-star>
                <span class="score">{{ratingsData.pack_score}}</span>
              </div>
            </div>
          </div>
          <div class="overview_right">
            <div class="delivery_score">
              <div class="score">{{ratingsData.delivery_score}}</div>
              <p class="text">配送評分</p>
            </div>
          </div>
        </div>
        <app-split></app-split>
        <div class="content">
          <div class="rating_select" v-if="ratingsData.tab">
            <span class="item" :class="{'active':selectType === 0}" @click="selectTab(0)">{{ratingsData.tab[0].comment_score_title}}</span>
            <span class="item" :class="{'active':selectType === 1}" @click="selectTab(1)">{{ratingsData.tab[1].comment_score_title}}</span>
            <span class="item" :class="{'active':selectType === 2}" @click="selectTab(2)">
              <img src="./icon_sub_tab_dp_normal@2x.png" v-show="selectType!==2">
              <img src="./icon_sub_tab_dp_highlighted@2x.png" v-show="selectType===2">
              {{ratingsData.tab[2].comment_score_title}}
            </span>
          </div>
          <div class="labels_view">
            <span class="label" :class="{'highlight':label.label_star>0}" v-for="(label,key) in ratingsData.labels" :key="key">
              {{label.content}} {{label.label_count}}
            </span>
          </div>
          <ul class="rating_list">
              <li class="rating_comment" v-for="(comment,key) in selectComments" :key="key">
                <div class="comment-header">
                    <img :src="comment.user_pic_url" alt="user icon" v-if="comment.user_pic_url">
                    <img src="./anonymity.png" alt="suer icon" v-else>
                </div>
                <div class="comment_main">
                    <div class="user">{{comment.user_name}}</div> 
                    <div class="time">{{calculateTime(comment.comment_time)}}</div>  
                    <div class="star_wrapper">
                      <span class="text">
                        評分
                      </span>
                      <app-star class="star" :score="comment.order_comment_score"></app-star>
                    </div>
                    <div class="comment_content" v-html="commentStr(comment.comment)"></div>
                    <div class="img_wrapper" v-if="comment.comment_pics">
                      <img v-for="(pic, key) in comment.comment_pics" :key="key" :src="pic.thumbnail_url">
                    </div>
                </div>
              </li>
          </ul>  
        </div>
      </div>
  </div>
</template>
<script>
import BScroll from "better-scroll";
import AppStar from "components/Star/Star";
import AppSplit from "components/Split/Split";

//SELECT TYPE
const ALL = 0; //全部
const PICTURE = 1; //有圖片
const COMMENT = 2; //點評

export default {
    components: {
        AppStar,
        AppSplit,
        BScroll
    },
    created() {
        this.$axios
            .get("api/ratings")
            .then(response => {
                if (response.data.code === 0) {
                    this.ratingsData = response.data.data;
                }
            })
            .catch(error => {
                console.log(error);
            });

        this.$nextTick(() => {
            //DOM已更新
            if (!this.scroll) {
                this.initScroll();
            } else {
                this.scroll.refresh();
            }
        });
    },
    data() {
        return {
            ratingsData: {},
            selectType: ALL
        };
    },

    methods: {
        selectTab(val) {
            this.selectType = val;
        },
        initScroll() {
            this.ratingScroll = new BScroll(this.$refs.ratingScroll, {
                click: true
            });
        },
        calculateTime(val) {
            let date = new Date(val * 1000);
            let fmt = "yyyy.MM.dd";
            if (/(y+)/.test(fmt)) {
                let year = date.getFullYear().toString();
                fmt = fmt.replace(RegExp.$1, year);
            }

            if (/(M+)/.test(fmt)) {
                let month = date.getMonth() + 1;
                if (month < 10) {
                    month = "0" + month;
                }
                fmt = fmt.replace(RegExp.$1, month);
            }

            if (/(d+)/.test(fmt)) {
                let day = date.getDate() + 1;
                if (day < 10) {
                    day = "0" + day;
                }
                fmt = fmt.replace(RegExp.$1, day);
            }

            return fmt;
        },
        commentStr(content) {
            let rel = /#[^#]+#/g;
            return content.replace(rel, `<i style="color:#576b95">$&</i>`);
        }
    },

    computed: {
        selectComments() {
            if (this.selectType === ALL) {
                return this.ratingsData.comments;
            }

            if (this.selectType === PICTURE) {
                let arr = [];
                this.ratingsData.comments.forEach(comment => {
                    if (comment.comment_pics.length) {
                        arr.push(comment);
                    }
                });
                return arr;
            }

            if (this.selectType === COMMENT) {
                return this.ratingsData.comments_dp.comments;
            }
        }
    }
};
</script>
<style scoped>
@import url("Ratings.css");
</style>
