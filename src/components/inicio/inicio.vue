
<template>
  <div class="inicio">
    <h1>{{msg}}</h1>
  </div>
</template>

<script>
import Inicio from '@/components/inicio/inicio.component'
export default Inicio
</script>
<style>
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
  width: 100%;
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
