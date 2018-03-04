<template>
  <div class="seller">
      <app-split></app-split>
      <div class="seller_wrapper">
        <div class="seller_info">
          <div class="address_wrapper">
            <div class="address_left">
              {{seller.address}}
            </div>
            <div class="address_right">
              <div class="content"></div>
            </div>
          </div>
          <div class="pics_wrapper" ref="picsWrapper">
            <ul class="pics_list" v-if="seller.poi_env.thumbnails_url_list" ref="picsList">
              <li class="pics_item" v-for="(imgUrl,key) in seller.poi_env.thumbnails_url_list" :key="key" ref="picsItem">
                <img :src="imgUrl">
              </li>
            </ul>
          </div>
          <div class="safety_wrapper">
            查看食品檢驗安全檔案
            <span class="icon-keyboard_arrow_right"></span>
          </div>
        </div>

        <app-split></app-split>
        <div class="tip_wrapper">
          <div class="delivery_wrapper">
            配送服務:{{seller.app_delivery_tip}}
          </div>
          <div class="shipping_wrapper">
            配送時間:{{seller.shipping_time}}
          </div>
        </div>

        <app-split></app-split>
        <div class="other_wrapper">
          <div class="server_wrapper">
            商家服務:
            <div class="poi_server" v-for="(item,key) in seller.poi_service" :key="key">
              <img :src="item.icon" alt="" srcset="">
              {{item.content}}
            </div>
          </div>
          <div class="discounts_wrapper">
            <div class="discounts_item" v-for="(item,key) in seller.discounts2" :key="key">
              <div class="icon">
                <img :src="item.icon_url" alt="" srcset="">
              </div>
              <div class="text">
                {{item.info}}
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
import BScroll from "better-scroll";
import AppSplit from "components/Split/Split";
export default {
    components: {
        AppSplit,
        BScroll
    },
    created() {
        this.$axios
            .get("static/data/sellers.json")
            .then(response => {
                if (response.data.code === 0) {
                    this.seller = response.data.data;
                }

                this.$nextTick(() => {
                    if (this.seller.poi_env.thumbnails_url_list) {
                        let imgWidth = this.$refs.picsItem[0].clientWidth;
                        let mrgRight = 11;
                        let width =
                            (imgWidth + mrgRight) *
                            this.seller.poi_env.thumbnails_url_list.length;
                        this.$refs.picsList.style.width = width + "px";
                        this.scroll = new BScroll(this.$refs.picsWrapper, {
                            scrollX: true
                        });
                    }
                });
            })
            .catch(error => {
                console.log(error);
            });
    },
    data() {
        return {
            seller: {}
        };
    }
};
</script>
<style scoped>
@import url("Seller.css");
</style>
