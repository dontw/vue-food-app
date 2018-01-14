<template>
  <div class="star">
      <span v-for="(itemClass,key) in itemClasses" :key="key" :class="itemClass" class="star-item"></span>
  </div>
</template>
<script>
//Star length
const LENGTH = 5;
//star class
const CLS_ON = "on";
const CLS_HALF = "half";
const CLS_OFF = "off";

export default {
    props: {
        score: {
            type: Number
        }
    },

    computed: {
        itemClasses() {
            let result = [];
            //向下取整 0.5的倍數
            let score = Math.floor(this.score * 2) / 2;
            //小數、控制半星
            let hasDecimal = score % 1 !== 0;
            //整數、控制全星
            let integer = Math.floor(score);

            //全星數量
            for (let i = 0; i < integer; i++) {
                result.push(CLS_ON);
            }

            //半星數量
            if (hasDecimal) {
                result.push(CLS_HALF);
            }

            //灰星數量
            while (result.length < LENGTH) {
                result.push(CLS_OFF);
            }

            return result;
        }
    }
};
</script>
<style>
.star {
    font-size: 0;
}

.star .star-item {
    display: inline-block;
    width: 10px;
    height: 10px;
    margin-right: 3px;
    background-repeat: no-repeat;
    background-size: 10px 10px;
}

.star .star-item:last-child {
    margin-right: 0;
}

/* three star types */
.star .on {
    background-image: url("star24_on@2x.png");
}

.star .half {
    background-image: url("star24_half@2x.png");
}

.star .off {
    background-image: url("star24_off@2x.png");
}
</style>
