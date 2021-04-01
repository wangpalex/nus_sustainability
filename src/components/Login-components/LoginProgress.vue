<template>
<div>
    <i-circle :percent="percent" :stroke-color="color">
        <Icon v-if="percent == 100" type="checkmark" size="60" style="color:#5cb85c"></Icon>
        <span v-else style="font-size:24px">{{ percent }}%</span>
        <Icon type="ios-checkmark-empty" style="position: relative"></Icon>
    </i-circle>
</div>
</template>

<script>
export default {
    name:"LoginProgress",
    data () {
        return {
            //percent: 0,
            step: 50 // 2 steps to finish
        }
    },

    props: {
        percent: {
            type: Number,
            value: 0,
        }
    },

    computed: {
        color () {
            let color = '#2db7f5';
            if (this.percent == 100) {
                color = '#5cb85c';
            }
            return color;
        }
    },
    methods: {
        add () {
            if (this.percent >= 100) {
                return false;
            }
            this.percent += this.step;
        },
        minus () {
            if (this.percent <= 0) {
                return false;
            }
            this.percent -= this.step;
        }
    }
}
</script>
<style scoped>

</style>