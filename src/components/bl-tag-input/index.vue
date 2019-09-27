<template>
    <div>
        <el-input v-model="inputValue" class="input" placeholder="请输入关键字并按回车键确定" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm"></el-input>
        <el-tag :key="tag" v-for="(tag, index) in value" closable :disable-transitions="false" @close="handleClose(tag, index)" style="margin-right: 20px;">
            {{tag}}
        </el-tag>
    </div>
</template>

<script>
export default {
    name: "BlTagInput",
    props: {
        value: [Array]
    },
    data() {
        return {
            inputValue: ""
        };
    },
    methods: {
        handleInputConfirm() {
            let modelArray = Object.assign([], this.value);
            let inputValue = this.inputValue;
            if (inputValue) {
                modelArray.push(encodeURIComponent(inputValue));
            }
            this.inputValue = "";
            this.$emit("input", modelArray);
        },
        handleClose(tag, index) {
            console.log(tag, index);
            let modelArray = Object.assign([], this.value);
            modelArray.splice(index, 1);
            console.log(modelArray)
            this.$emit("input", modelArray);
        }
    }
};
</script>

<style lang="scss" scoped>

</style>


