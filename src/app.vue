<template>
    <router-view />
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";
export default {
    methods: {
        ...mapActions("admin/config", ["getUploadData"]),
        submitForm() {
            this.currentStep++;
        }
    },
    mounted() {
        console.log("route", this.$route);
        console.log("routequery", this.$route.query);
    },
    created () {
        this.getUploadData()
    }
};
</script>

<style>
:root {
    --text-color: black;
    position: relative;
}
body {
    color: var(--text-color);
    margin: 0px;
    background: #f7fbfc;
    /* width: width("bgblue.jpg", 2); */
}
</style>
<style lang="scss" scoped>
.section {
    margin-top: 70px;
    margin-left: 20px;
    height: 100%;
    background: pink;
}
</style>