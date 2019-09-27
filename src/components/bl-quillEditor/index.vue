
<template>

	<div>

		<quilleditor v-model="content"

				:ref="name"
                :options="editorOption"
                @change="onChange">
            <div :id="name" slot="toolbar">
        <span class="ql-formats"><button type="button" class="ql-bold"></button></span>

        <span class="ql-formats"><button type="button" class="ql-italic"></button></span>

        <span class="ql-formats"><button type="button" class="ql-blockquote"></button></span>

        <span class="ql-formats"><button type="button" class="ql-list" value="ordered"></button></span>

        <span class="ql-formats"><button type="button" class="ql-list" value="bullet"></button></span>

        <span class="ql-formats"><button type="button" class="ql-link"></button></span>
				<span class="ql-formats"><button type="button" class="ql-underline"></button></span>
					<span class="ql-formats"><button type="button" class="ql-strike"></button></span>
					<span class="ql-formats"><button type="button" class="ql-strike"></button></span>
					<span class="ql-formats">
						<button type="button" class="ql-header" value='1'></button>
						<button type="button" class="ql-header" value='2'></button>
					</span>
					<span class="ql-formats">
						<button type="button" class="ql-script" value="sub"></button>
						<button type="button" class="ql-script" value="super"></button>
					</span>
					<span class="ql-formats">
						<button type="button" class="ql-indent" value="-1"></button>
						<button type="button" class="ql-indent" value="+1"></button>
					</span>
					<span class="ql-formats">
						<button type="button" class="ql-direction" value="rtl"></button>
					</span>
          <select class="ql-size">
                <option value="small"></option>
                <!-- Note a missing, thus falsy value, is used to reset to default -->
                <option selected></option>
                <option value="large"></option>
                <option value="huge"></option>
          </select>
           <select class="ql-align ql-picker ql-icon-picker">
                <option class="ql-picker-label" value="center"></option>
                <!-- Note a missing, thus falsy value, is used to reset to default -->
                  <option class="ql-picker-options"></option>

                 <!-- <option class="ql-picker-item" value="center"></option> -->
                 <option class="ql-picker-item" value="right"></option>
                 <option class="ql-picker-item" value="justify"></option>
          </select>
         
        <span class="ql-formats">

        <button type="button" @click="imgClick" style="outline:none">
					<svg viewBox="0 0 18 18"> 
						<rect class="ql-stroke" height="10" width="12" x="3" y="4"></rect> 
						<circle class="ql-fill" cx="6" cy="7" r="1"></circle>
						<polyline class="ql-even ql-fill" points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"></polyline> 
					</svg>
      	</button>
      </span>

      <span class="ql-formats"><button type="button" class="ql-video"></button></span>

         	</div>

  </quilleditor>

	</div>

</template>

<script>
import { quillEditor } from "vue-quill-editor";
import request from "@/plugin/axios";
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  props: {
    value: {
      type: String
    },
    name: {
        type: String
    },
    /*上传图片的地址*/
    uploadUrl: {
      type: String,
      default: "http://up-z0.qiniu.com"
    },
    /*上传图片的file控件name*/
    fileName: {
      type: String,
      default: "file"
    }
  },

  data() {
    return {
      editorOption: {
        modules: {
          toolbar: {
            container: `#${this.name}`,
            
          }
        }
      },
      content: '*'
    };
  },

  methods: {
    onChange() {
      this.$emit("input", this.content);
    },

    /*选择上传图片切换*/

    onFileChange(e) {
      var self = this;

      var fileInput = e.target;

      if (fileInput.files.length == 0) {
        return;
      }

      // this.editor.focus();

      if (fileInput.files[0].size > 1024 * 1024 * 100) {
        this.$alert("图片不能大于600KB", "图片尺寸过大", {
          confirmButtonText: "确定",

          type: "warning"
        });
      }

      var data = new FormData();
      data.append("token", this.configData.upload_data.token);
      data.append(this.fileName, fileInput.files[0]);
      request({
        url: this.uploadUrl,
        method: "post",
        data: data,
        headers: {
          "content-type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        console.log("res", res);
        self.editor.insertEmbed(
          self.editor.getSelection().index,
          "image",
          "https://city.boolan.com/" + res.key
        );
      });
    },

    /*点击上传图片按钮*/

    imgClick() {
      if (!this.uploadUrl) {
        console.log("no editor uploadUrl");

        return;
      }

      /*内存创建input file*/

      var input = document.createElement("input");

      input.type = "file";

      input.name = this.fileName;

      input.accept = "image/jpeg,image/png,image/jpg,image/gif";

      input.onchange = this.onFileChange;

      input.click();
      this.editor.focus();
    }
  },

  computed: {
    ...mapGetters("admin", { configData: "config/getData" }),
    editor() {
      return this.$refs[this.name].quill;
    }
  },

  components: {
    quilleditor: quillEditor
  },

  mounted() {
    this.content = this.value;
    console.log('dhasjdla', this.$refs[this.name].quill)
  },

  watch: {
    value(newVal, oldVal) {
      if (this.editor) {
        if (newVal !== this.content) {
          this.content = newVal;
        }
      }
    }
  }
};
</script>
