
<template>
  <div class="inicio" >
    <h1>{{msg}}</h1>
    <div class="principal" >
      <el-card class="box-card" >
        <div slot="header" class="headercard"  >
          <span class="labelheadercard">Facturas disponibles</span>
        </div>
       <div class="row bodycard">
          <div class="col-md-5">
       
            <div class="form-group row">
              <label class="el-form-item__label col-sm-2" >Proveedor:</label>
              <div class="col-sm-4 grupolabel">
                <div class="input-group mb-3" >
                  <el-input size ="small" type="text"    @blur="desactivar_proveedor" @focus="activar_proveedor">
                    <el-button v-if="btnactivarproveedor" slot="append" style="padding: 3px 3px !important;background: #fff5c4;
    background: -webkit-gradient(left top, left bottom, color-stop(0%, #fff5c4), color-stop(100%, #ffee9f));
    background: -webkit-gradient(linear, left top, left bottom, from(#fff5c4), to(#ffee9f));
    background: linear-gradient(to bottom, #fff5c4 0%, #ffee9f 100%);" icon="fa fa-clone"></el-button> 
                  </el-input>
                
                </div>
              </div>
            </div>
          </div>
        </div>
        <el-table
          :data="tableData"
          stripe  :default-sort = "{prop: 'date', order: 'descending'}"
          style="width: 50%" class="ExcelTable2007">
          <el-table-column sortable  prop="date" label="Fecha">
            <template scope="scope">
            
                <el-input  v-if="editingb  && (scope.row === editing.row) 
                  && (scope.column.property === editing.column)" @blur="handleBlur(scope.row)" v-focus size="small" v-model="scope.row.date" ></el-input>
                <span v-else @click="alerta(scope.row,scope.row.edit,scope.column.property)">{{ scope.row.date }}</span>
            </template>
          </el-table-column>  
          <el-table-column sortable prop="name" label="Fecha">
            <template scope="scope">
                <el-input  v-if="editingb  && (scope.row === editing.row) 
                  && (scope.column.property === editing.column)" @blur="handleBlur(scope.row)" v-focus size="small" v-model="scope.row.name" >
                 <el-button slot="append" style="padding: 3px 3px !important;background: #fff5c4;
    background: -webkit-gradient(left top, left bottom, color-stop(0%, #fff5c4), color-stop(100%, #ffee9f));
    background: -webkit-gradient(linear, left top, left bottom, from(#fff5c4), to(#ffee9f));
    background: linear-gradient(to bottom, #fff5c4 0%, #ffee9f 100%);" icon="fa fa-clone" @click="abrirpopup()"></el-button>  
                </el-input>
                <span v-else @click="alerta(scope.row,scope.row.edit,scope.column.property)">{{ scope.row.name }}</span>
            </template>
          </el-table-column>  
        
          <el-table-column
            prop="address" sortable
            label="Dirección">
          </el-table-column>
        </el-table>
                 

        <el-tabs type="border-card">
          <el-tab-pane>
            <span slot="label"><i class="el-icon-date"></i> Route</span>
            Route 
          </el-tab-pane>
          <el-tab-pane label="Config">Config</el-tab-pane>
          <el-tab-pane label="Role">Role</el-tab-pane>
          <el-tab-pane label="Task">Task</el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
    <b-modal ref="myModalRef" hide-footer title="Guardar" size="lg"  v-model="modalPopup" @keydown.native.enter="confirmaraceptar">
      <div>
        <img src="../../images/informacion.png" style="width:14px; height:15px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.3rem;" @click="linkRoute('/menu/inicio')"/>
        <span style="font-size:13px">¿Desea grabar el documento?</span>
      </div>
      <footer class="modal-footer">
        <el-button class="buttonfilter btn btn-outline-secondary orange" @click="BuscarSome()">
          <img class="imagenfilter" src="../../images/check.png" alt="" >
        </el-button>
        <el-button class="buttonfilter btn btn-outline-secondary orange" style="margin-left: 0px;"  @click="modalPopup = false">
          <img class="imagenfilter" src="../../images/close.png" alt="" >
        </el-button>
      </footer>
    </b-modal>
  </div>

<!-- <video width="320" height="240" controls>
  <source :src="video" :type="type">
  Your browser does not support the video tag.
</video> -->



  <!-- <el-carousel :interval="5000" style="margin-top: 7%;" type="card" height="400px" width="370px" >
    <el-carousel-item  >
      <img src="../../images/slide3.jpg" style="height: 400px; width:100% !important;" />
    </el-carousel-item>
    <el-carousel-item >
      <img src="../../images/slide2.jpg" style="height: 400px; width:100% !important;" />
    </el-carousel-item>
     <el-carousel-item >
       <iframe width="100%" height="410px"
        src="https://www.youtube.com/embed/DwbJrco6xFA?rel=0&mute=1&amp;controls=0&amp;showinfo=0&amp;autoplay=1&amp;html5=1&amp;allowfullscreen=true&amp;wmode=transparent"
        frameborder="0"
        allow="autoplay;
        encrypted-media" allowfullscreen>
      </iframe>
    </el-carousel-item>
 
    <el-carousel-item  >
      <img src="../../images/slide4.jpg" style="height: 400px; width:100% !important;" />
    </el-carousel-item>
  </el-carousel>  -->
</template>

<script>
import Inicio from '@/components/inicio/inicio.component'
export default Inicio
</script>
<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
/* li {
  display: inline-block;
  margin: 0 10px;
} */
a {
  color: #42b983;
}
.doc{
  font-size: 12px;
  font-style: normal;
}
img{
  width: 100px;
    height: 51px;
}
.imagens{
  width: 60%;
}
.menus span{
color: rgba(0,0,0,.54);
}
.textwork{
  width: 100%;
}
.trumbowyg-box, .trumbowyg-editor{
  height: 250px;
  min-height: 200px;
}
.selectData{
  width: 100%;
}
.Detalle{
  font-size: 12px;
}
.Detalle>.el-table__header{
  background-color: #42b983;
}
.el-table th>.cell{
  background-color: #21859d;
}
.viewpdf>.el-dialog--small{
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);

}
.viewpdf>.el-dialog--small{
  top: 0% !important;
   /* margin-top: 0%; */
}
.el-dialog__wrapper{
  overflow: hidden;
}
.pdfviewer{
  width: 100%;
  height: 100%;
}
.viewpdf>.el-dialog--small>.el-dialog__body{
  padding: 0%;
  height: 100%;
}
.el-card__body{
     text-align: center;
     margin-bottom: 3%;
}
@media (min-width: 990px){
.modal-lg {
    max-width: 1000px;
}
}
.el-table__row{
    background-color: cornflowerblue;
}
.titulodoc{
  text-align: left;
}
.el-menu-item {
    color: #0c3551;
    border-bottom: 1px solid #0c3500;
}
.el-dialog__title {
    color: white;
    font-size: 1.25rem;
    font-style: normal;
}
</style>
