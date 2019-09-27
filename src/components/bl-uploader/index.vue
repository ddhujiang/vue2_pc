<template>
    <div>
        <el-upload class="avatar-uploader" action="http://up-z0.qiniu.com" :show-file-list="false" :on-success="handleSuccess" :before-upload="handleBefore" :data="configData.upload_data">
            <img v-if="value" :src="value" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div class="el-upload__tip" slot="tip" v-if="limit" >{{ limit.width ? `规格：${limit.width}* ${limit.height}，` : '' }} {{ limit.type ? `${limit.type}格式，` : '' }} {{limit.size ? `${limit.size}KB以内` : ''}}</div>
            <!-- <div v-if="limits"> -->
          
            <!-- </div> -->
        </el-upload>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
    name: "BlUploader",
    props: {
        value: [String],
        limit: [Object],
    },
    data() {
        return {
            inputValue: ""
        };
    },
    computed: {
        //赋值
        ...mapGetters("admin", { configData: "config/getData" })
    },
    methods: {
        handleBefore: function(file) {
            // this.upload_data["x:timestamp"] = this.getRandomInt(100, 999);
            // if (this.limit) {
            //     let isTypeOk = true;
            //     let isSizeOk = true;
            //     if (this.limit.type) {
            //         if (this.limit.type === "PNG") {
            //             isTypeOk = file.type === "image/png";
            //         } else if (this.limit.type === "JPG") {
            //             isTypeOk = file.type === "image/jpeg";
            //         }
            //     }

            //     if (this.limit.size) {
            //         isSizeOk =
            //             file.size / 1024 < this.limit.size ||
            //             file.size / 1024 === this.limit.size;
            //     }

            //     if (!isTypeOk) {
            //         this.$message.error(`上传头像图片只能是 ${this.limit.type} 格式!`);
            //     }
            //     if (!isSizeOk) {
            //         this.$message.error(`上传头像图片大小不能超过 ${this.limit.size} KB!`);
            //     }
            //     return isTypeOk && isSizeOk;
            // } else {
            //     return true;
            // }

            return true;
        },
        getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min;
        },
        handleSuccess(response, file, fileList) {
            this.$emit("input", "https://city.boolan.com/" + response.key);
        }
    },
};
</script>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: all 0.5s;
}
.avatar-uploader .el-upload:hover {
    border-color: #409eff;
}
</style>


<style lang="scss" scoped>
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    text-align: center;
}
.avatar {
    width: 220px;
    display: block;
}
</style>


