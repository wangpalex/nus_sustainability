<template>
  <div>
      <bkgrd></bkgrd>
  </div>
</template>

<script>
import Background from "@/components/Background";

export default {

    data(){
        return{

        }
    },

    components: {
      // eslint-disable-next-line vue/no-unused-components
      bkgrd:Background
    },

    mounted() {
        /*
        let ionicons_script = document.createElement('script')
        ionicons_script.setAttribute('src', "https://unpkg.com/ionicons@5.4.0/dist/ionicons.js")
        document.head.appendChild(ionicons_script)
        */
    },
}

</script>

<style>

</style>
