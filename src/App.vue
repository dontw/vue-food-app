<template>
  <div id="app">

    <!-- head -->
    <my-header :poiInfo="poiInfo"></my-header>

    <!-- nav -->
    <my-nav :commentNum="Number(commentNum)"></my-nav>

    <!-- content -->
    <!-- 路由出口: router設定的組件會渲染於此 -->
    <keep-alive>
        <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import MyHeader from "components/Header/Header";
import MyNav from "components/Nav/Nav";

export default {
    name: "app",
    components: {
        MyHeader,
        MyNav
    },
    created() {
        this.$axios
            .get("static/data/foods.json")
            .then(response => {
                var dataSource = response.data;
                if (dataSource.code === 0) {
                    this.poiInfo = dataSource.data.poi_info;
                }
            })
            .catch(error => {
                console.log(error);
            });

        this.$axios
            .get("static/data/ratings.json")
            .then(response => {
                var dataSource = response.data;
                if (dataSource.code === 0) {
                    this.commentNum = dataSource.data.comment_num;
                }
            })
            .catch(error => {
                console.log(error);
            });
    },
    data() {
        return {
            //header component's data(seller)
            poiInfo: {},
            commentNum: "0"
        };
    }
};
</script>

<style>

</style>
