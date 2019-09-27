<template>
    <div>
        <el-select v-model="value8" filterable placeholder="请选择" clearable>
            <el-option v-for="item in this.dataSets" :key="item.id" :label="item.value" :value="item.id">
            </el-option>
        </el-select>
        <!-- <el-autocomplete class="inline-input" v-model="label" :fetch-suggestions="querySearch" placeholder="请输入内容" @select="handleSelect"></el-autocomplete> -->
    </div>
</template>

<script>
export default {
    name: "BlAutocomplete",
    props: {
        value: [String, Number],
        dataSets: [Array]
    },
    data() {
        return {
            label: ""
        };
    },
    methods: {
        // querySearch(queryString, cb) {
        //     var results = queryString
        //         ? this.dataSets.filter(this.createFilter(queryString))
        //         : this.dataSets;
        //     // 调用 callback 返回建议列表的数据
        //     cb(results);
        // },
        // createFilter(queryString) {
        //     return dataSet => {
        //         return (
        //             dataSet.value
        //                 .toLowerCase()
        //                 .indexOf(queryString.toLowerCase()) === 0
        //         );
        //     };
        // },
        // handleSelect(item) {
        //     this.label = item.value;
        //     this.$emit("input", item.id);
        // }
    }
};
</script>

<style lang="scss" scoped>

</style>


