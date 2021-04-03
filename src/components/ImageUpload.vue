<template>
    <div>
        <label>
            <input type="file" value="upload"
                   @change="filesChange($event)"
                   accept="image/*">
            <div class="upload-button">
                <Icon type="ios-cloud-upload" size="52"
                      style="color: #3399ff;position: relative;left: 220px"></Icon>
                <p v-if="value">Selected File: {{value.name}}</p>
                <p v-else>Click here to upload</p>
            </div>
        </label>
    </div>
</template>

<script>
export default {
    name: "ImageUpload",
    data () {
        return {
            value: null
        }
    },
    methods: {
        filesChange(event) {
            // Whenever the file changes, emit the 'input' event with the file data.
            this.value = event.target.files[0]
            this.$emit('input', event.target.files[0])
        }
    }
}
</script>

<style scoped>
input {
    display: none;
}

.upload-button {
    position: relative;
    top: 0px;
    left: 0px;
    width: 500px;
    height: 100px;
    margin-bottom: 20px;

    border-style: dashed;
    border-color: #dddee1;
    border-width: 1px;
    background-color: #FFFFFF;
}

p {
    text-align: center;
    margin: auto;
    font-size: 16px;
}
</style>