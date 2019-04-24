<template>
  <div >
    <img src="../../images/icon_validar.png" style="width:17px; height:15px; cursor: pointer;" @click="ValidarItem()"/>
    <el-tooltip class="itemTool" content="Guardar" placement="right" effect="dark">
    <img src="../../images/guardar1.png" style="width:16px; height:15px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.3rem;" @click="guardar()"/>
    </el-tooltip>
    <div class="v-separator" style="    margin-bottom: -1px;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.5rem;"></div>
    <img src="../../images/icon_back.png" style="width:17px; height:15px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.3rem;" @click="backPage()"/>
    <img src="../../images/cancelar.png" style="width:17px; height:15px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.3rem;" @click="reloadpage()"/>
    <img src="../../images/nuevo.png" style="width:13px; height:15px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.3rem;" @click="linkRoute('/menu/inicio')"/>
    <img src="../../images/visualizar.png" style="width:17px; height:15px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.3rem;" @click="linkRoute('/menu/inicio')"/>
   
    <b-modal ref="myModalRef" hide-footer title="Guardar" size="sm"  v-model="SendDocument" @keydown.native.enter="confirmaraceptar">
      <div style="height:85px">
        <img src="../../images/informacion.png" style="width:14px; height:15px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.3rem;"/>
        <span style="font-size:13px">¿Desea grabar el documento?</span>
      </div>
      <footer class="modal-footer">
        <img src="../../images/check.png" style="width:13px; height:15px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.6rem;" @click="confirmaraceptar"/>
        <img src="../../images/close.png" style="width:17px; height:15px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.6rem;" @click="SendDocument = false"/>
      </footer>
    </b-modal>

    <!-- <el-dialog
      title="Guardar"
      :visible.sync="dialogVisible"
      size="tiny"
      style="top:35%"
      @keydown.native.enter="submit"
      >
      <div style="height:85px">
      <img src="../../images/informacion.png" style="width:14px; height:15px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.3rem;" @click="linkRoute('/menu/inicio')"/>
      <span>¿Desea grabar el documento?</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <img src="../../images/check.png"  @keyup.enter="submit" style="width:13px; height:15px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.6rem;"/>
        <img src="../../images/close.png" style="width:17px; height:15px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.6rem;" @click="dialogVisible = false"/>
      </span>
    </el-dialog> -->
  </div>
  
</template>
<script>

import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.component'
export default QuickAccessMenuComponent
</script>
<style scoped>
.top-menu {
  width: 100%;
  height: 48px;
  /* background-image: url('../../../images/menu_imag.png'); */
  color: #fff;
  display: flex;
  position: relative;
  flex-direction: row;
  height: 34px;
  padding: 0;
  margin: 0;
  background-color: #34383c;
  border-bottom: 1px solid #34383c;
}

.verde{
  font-size: 12px;color: #5ab138;
}
.rojo{
  font-size: 12px;color: red;
}

.especial {
  margin-left: 10px;
  margin-top: 7px;
  text-align: left;
  height: 25px;
}
.brand {
  text-align: left;
  font-size: 1.0em;
  line-height: 48px;
  padding: 0 15px 0 40px;
}

.user-container {
  text-align: center;
  line-height: 48px;
  padding: 0 15px 0 15px;
  margin-left: auto;
  cursor: pointer;
  /* border-left: solid 1px #2483ca; */
}

/* .user-container:hover {
  background-color: #1D90E6;
} */

.icon-container {
  width: 48px;
  text-align: center;
  cursor: pointer;
}

/* .icon-container:hover {
  background-color: #1D90E6;
} */

.red:hover {
  background-color: #FF4949;
}

.user-container{
  text-align: center;
  line-height: 35px;
  padding: 0 15px 0px 15px;
  margin-left: auto;
  cursor: pointer;
  /* border-left: solid 1px #2483ca; */
}

i{
  line-height: 35px;
  display: inline-block;
  font-family: FontAwesome !important;
  font-size: 13px;
  font-style: normal;
  /* font: normal normal normal 14px/1 FontAwesome!important; */
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
