<template>
  <el-carousel :interval="5000" style="margin-top: 7%;" type="card" height="400px" width="370px" >
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
