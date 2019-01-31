<template>
  <div id="plantilla"
   v-loading="loadingGet"
      element-loading-text="Enviando..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)" >
    <el-card class="loadfiles">
       <p class="titleComponent" align="center">
            Insertar plantillas documentos words
        </p>
      <el-row>
        <el-col :span="12">
        <el-upload
          class="uploadfiles"
          drag
          action=""
          :auto-upload="false"
          :on-change="handleChange"
          :on-remove="handleRemove"        
          :file-list="fileList"
          accept=".xlsm,.docx"
          multiple
          align="center">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">Suelta tu archivo aquí o <em>haz clic para cargar</em></div>
          <div slot="tip" class="el-upload__tip" align="center">Solo archivos .xlsm/.docx </div>
        </el-upload>
        </el-col>
        <el-col :span="12">
          <el-row>
          <span>Tipo de documentos</span>
            <el-select v-model="tipoDocumento" placeholder="Select">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-row>
          <el-row class="botonenviar">
            <el-col :offset="8">
                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">Cargar al servidor</el-button>
            </el-col>
          </el-row>     
        </el-col>
      </el-row> 
    </el-card>
    <el-card class="loadimage">
      <p class="titleComponent" align="center">
            Insertar logo a para la cabecera de la plantilla
        </p>
    <el-row >
      <el-col :span="12"
      class="logoChoose">
      <el-row>
      </el-row>
      <div
      v-if="valor">
        <el-upload
        action=""
        list-type="picture-card"
        :auto-upload="false"
        :on-preview="handlePictureCardPreview"
        :on-change="handleAvatarSuccess"
        :on-remove="handleRemoveImage"        
        :limit="1"
        :on-exceed="handleExceed"
        >
        <i class="el-icon-plus"></i>        
      </el-upload>
      </div>
      <div v-if="valor1" class="imagenUnica">
        <img width="50%" :src="dialogImageUrl1" class="imagen" alt="">
        <div class="overlay">
          <div>
            <el-button-group>
            <el-button class="visual" @click="handlePictureCardPreview()"><i class="el-icon-view"></i></el-button>
            <el-button class="eliminar" @click="handleRemoveImage()"><i class="el-icon-delete2"></i></el-button>
            </el-button-group>
          </div>   
        </div>
      </div>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
      <el-row class="send">
          <span>Nuevo logo</span>
            <el-button class="fa fa-picture-o" type="success" @click="upload()" :disabled="VerBoton"> Enviar</el-button>
      </el-row>
      </el-col>
      <el-col :span="12" class="logoactual">          
        <img class="Imageload1" :src="imageLogo" />
        <span>Logo actual de la plantilla</span>
      </el-col>
    </el-row >     
    </el-card>  
  </div>
</template>
<script>
import Plantilla from '@/components/plantilla/plantilla.component'
export default Plantilla
</script>
<style>
.image{
  width: 100px;
  height: 100px;
}
img {
  width: 100%;
  margin: auto;
  display: block;
  margin-bottom: 10px;
}
.Imageload{
 width: 50%;
  max-width: none;
  height: auto;
  border-style: double;
    border-color: #0c3551;
}
.loadimage{
  align-content: center;
}
.logoactual{
  text-align: center;
    background-color: #fbfdff;
    border: 1px dashed #c0ccda;
    border-radius: 6px;
    box-sizing: border-box;
    width: 240px;
    height: 148px;
    cursor: pointer;
    margin-left: 10%;
}
.logoChoose{
  text-align: center;
}
.el-upload-list{
  text-align: left;
}
.botonenviar{
  margin-top: 10%;
}
.el-upload--picture-card  {
  background-color: #c0ccda;
    width: 240px;
}
.el-upload-list--picture-card .el-upload-list__item{
  width: 240px;
}
.send{
  margin-top: 1%;
}
.imagenUnica {
  position: relative;
    background-color: #fbfdff;
    border: 1px dashed #c0ccda;
    border-radius: 6px;
    box-sizing: border-box;
    width: 240px;
    height: 148px;
    cursor: pointer;
    line-height: 146px;
    vertical-align: top;
    margin-left: 35%;
    margin-bottom: 2%;
}
.overlay {
 position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  overflow: hidden;
  width: 100%;
  height: 100%;
  -webkit-transform: scale(0);
  -ms-transform: scale(0);
  transform: scale(0);
  -webkit-transition: .3s ease;
  transition: .3s ease;
}
.imagen {
  display: block;
   position: relative;
    background-color: #fbfdff;
    border: 1px dashed #c0ccda;
    border-radius: 6px;
    box-sizing: border-box;
    width: 240px;
    height: 148px;
    cursor: pointer;
    line-height: 146px;
}
.text {
  color: white;
  font-size: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  text-align: center;
}
.imagenUnica:hover .overlay {
  -webkit-transform: scale(1);
  -ms-transform: scale(1);
  transform: scale(1);
}
.eliminar{
  background-color: rgba(0, 0, 0, 0.6);
}
.visual {
  background-color: rgba(0, 0, 0, 0.6);
}
</style>
