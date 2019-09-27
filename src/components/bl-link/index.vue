<template>
    <router-link :to="{ name: name, params: params }" v-if="name">
        <el-button type="text">
            <slot></slot>
        </el-button>
    </router-link>
    <a :href="href" v-else>
        <el-button type="text">
            <slot></slot>
        </el-button>
    </a>
</template>

<script>
export default {
    name: "BlLink",
    props: {
        href: String,
        name: {
            type: String,
            default: ""
        },
        params: {
            type: Object
        }
    },
    data() {
        return {};
    }
}
</script>

<style lang="scss" scoped>

</style>


