<template>
  <div id="imgUpload" :class="{'img-exist': imgSrc}">
    <input type="file" @change="getFile($event)" class="file-input" accept="image/jpeg,image/jpg,image/png,image/svg">
    <img :src="imgSrc" alt="" class="image">
    <i class="el-icon-plus icon-add" style="font-size: 30px; color: #888"></i>
  </div>
</template>

<script>
  export default {
    name: 'ImgUpload',
    props: {
      // 不传name返回file， 传name 返回{name: <name>, file: <file>},父元素通过监听onGetFile获得数据
      name: String,
      maxSize: Number // 单位M
    },
    data () {
      return {
        file: '',
        imgSrc: '',
        maxSizeDefault: 5 // 单位M
      }
    },
    methods: {
      getFile (event) {
        let files = event.target.files;
        if (files.length) {
          let file = files[0];
          let fileSize = file.size;
          let maxSize = this.maxSize || this.maxSizeDefault;
          if(fileSize > maxSize * 1024 * 1024){
            this.$message({
              message: `请上传小于${maxSize}M的图片`,
              type:'warning'
            })
            return
          }
          let reader=new FileReader();
          let that = this;
          reader.readAsDataURL(file);    //将文件读取为 DataURL(base64)
          reader.onload=function(evt){   //读取操作完成时触发。
            that.imgSrc = evt.target.result
          };
          let res = this.name ? {name: this.name, file: file} : file;
          this.$emit('onGetFile', res)
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  #imgUpload{
    position: relative;
    width: 100%;
    height: 100%;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    background: #fbfdff;
    overflow: hidden;

    &:hover {
      border-color: #409EFF;
    }
    &.img-exist{
      border: none;
      box-shadow: 0 0 3px #aaa;
    }
   .file-input{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      z-index: 10;
      cursor: pointer;
    }
    .image{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 2;
    }
    .icon-add{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 1;
    }
  }
</style>
