<template>
    <section class="app-title-view">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="item in relations" :key="item.name" :to="{ name: item.name }">{{item.title}}</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="app-title">{{currentTitle}}</div>
    </section>
</template>

<script>
export default {
    name: "AppTitleView",
    data() {
        return {
            relations: []
        };
    },
    computed: {
        // 计算属性的 getter
        currentTitle: function() {
            // `this` 指向 vm 实例
            return this.relations[this.relations.length - 1].title
        }
    },
    watch: {
        $route: function(to, from) {
            this.handleRouteChange();
        }
    },
    methods: {
        handleRouteChange() {
            this.relations = this.$route.meta.relations;
        }
    },
    created() {
        this.handleRouteChange();
    }
};
</script>

<style lang="scss" scoped>
.app-title-view {
    background: rgba(255, 255, 255, 1);
    box-shadow: 4px 10px 20px 0px rgba(43, 131, 255, 0.08);
    border-radius: 10px;
    padding: 16px 30px;
}

.app-title {
    font-size: 20px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
    line-height: 28px;
    margin-top: 16px;
}
</style>