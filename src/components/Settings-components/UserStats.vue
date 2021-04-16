<template>
    <div>
        <p style="font-size: 24px">{{stats_name}}</p>
        <p style="font-size: 24px">{{stats_number}}</p>
    </div>
</template>

<script>
export default {
    name: "UserStats",
    props: {
        stats_name: {
            type: String
        },
        stats_number: {
            type: Number
        }
    }
}
</script>

<style scoped>
p {
    text-align: center;
    color: #6D3700;
}
</style>