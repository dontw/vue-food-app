<template>
  <div id="app">

    <!-- head -->
    <my-header :poiInfo="poiInfo"></my-header>

    <!-- nav -->
    <my-nav></my-nav>

    <!-- content -->
    <!-- 路由出口: router設定的組件會渲染於此 -->
    <router-view></router-view>
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
            .get("api/goods")
            .then(response => {
                var dataSource = response.data;
                if (dataSource.code === 0) {
                    this.poiInfo = dataSource.data.poi_info;
                }
            })
            .catch(error => {
                console.log(error);
            });
    },
    data() {
        return {
            //header component's data(seller)
            poiInfo: {}
        };
    }
};
</script>

<style>

</style>
