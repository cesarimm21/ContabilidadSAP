
<template>
  <!-- <div class="inicio" >
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
                  <el-input size ="small"  v-model="FormSearch.Supplier" placeholder="*"></el-input>
                  <div class="input-group-append buttongrupolabel">
                    <el-button size="small"  class="btn btn-outline-secondary orange" type="primary" icon="fa fa-clone" @click="mostrarBusquedaProveedor()"></el-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
  </div> -->
  <el-carousel :interval="4000" style="margin-top: 7%;" type="card" height="400px" width="400px" >
    <el-carousel-item v-for="item in 6" :key="item">
      <img src="../../images/fondo3.jpg" style="height: 400px; width:100% !important;" />
    </el-carousel-item>
  </el-carousel>
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
