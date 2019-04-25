<template>
  <div id="app">
 <!--<barmenu></barmenu> -->
   <router-view></router-view>
    
  </div>

</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
html {
  height: 100%;
}
.el-select {
    width: 100% !important;
    padding-left: 0px !important;
    height: 22px !important;
}
.el-input__icon+.el-input__inner {
    padding-right: 35px;
    height: 22px !important;
}
.el-button+.el-button {
    margin-left: -1px;
}
.el-select>.el-input {
    display: block;
    height: 22px !important;
}
.boton{
  padding: 3px 3px !important;background: #fff5c4;
  background: -webkit-gradient(left top, left bottom, color-stop(0%, #fff5c4), color-stop(100%, #ffee9f));
  background: -webkit-gradient(linear, left top, left bottom, from(#fff5c4), to(#ffee9f));
  background: linear-gradient(to bottom, #fff5c4 0%, #ffee9f 100%);
}
.btn-primary {
    color: #fff;
    font-size: 13px;
    background-color: #498bbb !important;
    border-color: #498bbb !important;
}

.col-md-4 {
    -ms-flex: 0 0 30.333333% !important;
    flex: 0 0 30.333333% !important;
    max-width: 30.333333% !important;
}
body {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
  margin: 0;
}

.el-table th>.cell{
  background: rgba(255,255,255,1) !important;
  background: -moz-linear-gradient(top, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 16%, rgba(240,244,248,1) 37%, rgba(217,225,236,1) 96%, rgba(217,225,236,1) 100%) !important;
  background: -webkit-gradient(left top, left bottom, color-stop(0%, rgba(255,255,255,1)), color-stop(16%, rgba(255,255,255,1)), color-stop(37%, rgba(240,244,248,1)), color-stop(96%, rgba(217,225,236,1)), color-stop(100%, rgba(217,225,236,1))) !important;
  background: -webkit-linear-gradient(top, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 16%, rgba(240,244,248,1) 37%, rgba(217,225,236,1) 96%, rgba(217,225,236,1) 100%) !important;
  background: -o-linear-gradient(top, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 16%, rgba(240,244,248,1) 37%, rgba(217,225,236,1) 96%, rgba(217,225,236,1) 100%) !important;
  background: -ms-linear-gradient(top, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 16%, rgba(240,244,248,1) 37%, rgba(217,225,236,1) 96%, rgba(217,225,236,1) 100%) !important;
  background: linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 16%, rgba(240,244,248,1) 37%, rgba(217,225,236,1) 96%, rgba(217,225,236,1) 100%) !important;
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#d9e1ec', GradientType=0 ) !important;
}
#app {
  color: #2c3e50;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

.bg-purple {
  background: #EFF2F7;
}

.bg-purple2 {
  height: 30px;
}

.grid-content {
  height: 100%;
  display: block;
  z-index: 1;
  box-shadow: 0px 0px 2px #143b58;
  /*width: 220px;*/
}

.main-container {
  display: flex;
  height: calc(100% - 34px);
}

.side-container {
  height: 100%;
  display: flex;
}

.side-toolbar {
  height: 100%;
  width: 48px;
  display: block;
  /*box-shadow: 0px 0px 2px #143b58;*/
  z-index: 2;
  margin: 0;
  padding: 0;
}
.el-carousel__mask {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: #000;
    opacity: .24;
    transition: .2s;
}
.el-menu--horizontal.el-menu--dark .el-submenu .el-menu-item.is-active, .el-menu-item.is-active, .router-link {
    color: #000000 !important;
    background-color: #396b88 !important;
}
.hamb-container {
   width: 48px;
  height: 36px;
  position: relative;
}
.el-carousel__container {
  margin-left: -88px !important;
}
.el-carousel__item--card.is-in-stage {
  width: 745px !important;
}

.v-separator {
    content: "";
    display: inline-block;
    width: 0px;
    height: 14px;
    border-right: 1px solid #fafafa;
    border-left: 1px solid #b4b4b4;
    padding: 0;
    margin-bottom: -5px;
}
.el-card__body {
    text-align: center;
    margin-bottom: 0.4% !important;
    padding: 13px !important;
}
.el-tabs--border-card {
    background: #fff;
    border: 1px solid #d1dbe5;
    margin-left: -10px !important;
    margin-right: -10px !important;
}
.el-card {
    cursor: initial !important;
    position: relative;
     width: 99% !important;
}
.el-table th>.cell {
    word-wrap: normal;
    text-overflow: ellipsis;
    line-height: 30px;
    width: 100%;
    box-sizing: border-box;
    line-height: 2 !important;
}
.el-table_1_column_1{
    background-color: #E4ECF7 !important;
    text-align: center !important;
    border: 1px solid #9EB6CE !important;
    border-width: 0px 1px 1px 0px !important;
    border-bottom: 1px solid #9eb6ce !important;
}
.el-table td, .el-table th.is-leaf {
    border-bottom: 1px solid rgba(158, 182, 206, 0.6784313725490196) !important; 
}
.el-tabs__nav-scroll {
    overflow: hidden;
    height: 25px !important;
    background: #c7d9e9;
}
.el-tabs__item {
    padding: 0 16px;
    height: 25px !important;
    box-sizing: border-box;
    line-height: 25px !important;
    display: inline-block;
    list-style: none;
    font-size: 13px !important;
    color: #8391a5;
    position: relative;
}

.buttonfilter{
    width: 22px;
    height: 22px;
    cursor: pointer;
    font: 0px/100% Arial, Helvetica, sans-serif;
    margin-left: 0.3rem;
    padding: 0px 0px !important;
}
.imagenfilter{
  width: 13px;
  height: 13px;
  margin-left: -1px;
  margin-top: 0px;
}
.el-form-item__label {
    text-align: left;
    height: 25px;
    vertical-align: middle;
    float: left;
    font-size: 12px !important;
    color: #48576a;
    line-height: 1;
    padding: 9px 17px 11px 0;
    box-sizing: border-box;
    border-bottom: 1px solid #a2b2bf;
}
.el-input--small .el-input__inner {
    height: 22px;
}
.el-button--small {
    padding: 3px 6px;
    font-size: 14px;
    border-radius: 3px;
}
.btn-outline-secondary:focus, .btn-outline-secondary.focus {
    box-shadow: 0 0 1px 1px rgb(251, 229, 40);
}
.el-button:focus, .el-button:hover {
    color: none;
    border-color: none; 
    background: #f78d1d;
    background: #fff5c4;
    background: -webkit-gradient(left top, left bottom, color-stop(0%, #fff5c4), color-stop(100%, #ffee9f));
    background: linear-gradient(to bottom, #fff5c4 0%, #ffee9f 100%);
}
.el-button--primary:focus, .el-button--primary:hover {
    border-color: transparent;
}

.el-button--primary:focus, .el-button--primary:hover {
  color: none;
  border-color: none; 
     background: #f78d1d;
    background: #fff5c4;
    background: -webkit-gradient(left top, left bottom, color-stop(0%, #fff5c4), color-stop(100%, #ffee9f));
    background: linear-gradient(to bottom, #fff5c4 0%, #ffee9f 100%);
}
.el-menu-item, .el-submenu__title {
    height: 29px !important;
    line-height: 30px !important;
}
.el-submenu .el-menu-item {
    height: 25px !important;
    line-height: 25px !important;
    padding: 0 70px !important;
    min-width: 200px !important;
}
.el-submenu .el-submenu .el-menu-item {
    height: 25px !important;
    line-height: 25px !important;
    padding: 0 80px !important;
    min-width: 200px !important;
}
.el-dialog__header {
    background: -webkit-linear-gradient(top, rgba(126,151,219,1) 0%, rgba(68,104,187,1) 6%, rgba(30,63,131,1) 62%, rgba(19,45,99,1) 100%);
    background: linear-gradient(to bottom, rgba(126,151,219,1) 0%, rgba(68,104,187,1) 6%, rgba(30,63,131,1) 62%, rgba(19,45,99,1) 100%);
        padding: 4px 15px;
    border-top-left-radius: 0rem;
    border-top-right-radius: 0rem;
}
.modal-header{
  background: -webkit-linear-gradient(top, rgba(126,151,219,1) 0%, rgba(68,104,187,1) 6%, rgba(30,63,131,1) 62%, rgba(19,45,99,1) 100%);
  background: linear-gradient(to bottom, rgba(126,151,219,1) 0%, rgba(68,104,187,1) 6%, rgba(30,63,131,1) 62%, rgba(19,45,99,1) 100%);
      padding: 4px 15px;
  border-top-left-radius: 0rem;
  border-top-right-radius: 0rem;
}
.el-dialog__headerbtn {
    float: right;
    background: 0 0;
    border: none;
    outline: 0;
    padding: 0;
    cursor: pointer;
    font-size: 8px;
    line-height: 25px;
}
.headercard {
    text-align: left;
}
.modal-title{
  color: white;
  font-style: normal;
  color: white;
  font-size: 12px !important;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.el-dialog__title {
    color: white;
    font-style: normal;
    color: white;
    font-size: 12px !important;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.el-dialog--tiny {
    width: 28%;
}
.hola{
  background: black;
  width: 2000px
}
.modal-footer{
  padding: 12px 17px 1px;
  text-align: right;
  box-sizing: border-box;
  border-top: 1px solid #e4dfdf;
  margin-left: -15px;
  margin-right: -15px;
}
.modal-sm {
  top:35% !important;
  max-width: 360px  !important;
}
.el-dialog__footer {
    padding: 2px 17px 3px;
    text-align: right;
    box-sizing: border-box;
    border-top: 1px solid #e4dfdf;
}
.el-menu-item, .el-submenu__title {
    font-size: 12px !important;
}
.orange {
    color: #4f3e2c;
    color: #4f3e2c;
    font-size: 12px;
    border: solid 1px #e6e6e8e3;
    background: #f78d1d;
    background: #fff5c4;
    background: -webkit-gradient(left top, left bottom, color-stop(0%, #fff5c4), color-stop(100%, #ffee9f));
    background: linear-gradient(to bottom, #fff5c4 0%, #ffee9f 100%);
}
.form-group {
  margin-bottom: -0.95rem !important;
  margin-left: -6px;
}
.form-group1{ 
  margin-bottom: -0.1rem !important;
  margin-left: -6px;
}
.box-card{
  margin-left: 10px;background-color: rgb(246, 247, 249);
}
.principal{
  margin-left: 10px;
  margin-right: 17px;
}
.headercard{
  height: 25px;margin-bottom: 0;background-color: #f9f9f9;background: -webkit-gradient(left top, left bottom, color-stop(0%, #d7dff2), color-stop(37%, #cadbed), color-stop(100%, #b5c9e2));background: linear-gradient(to bottom, #d7dff2 0%, #cadbed 37%, #b5c9e2 100%);
}
.headercardSecond{
  text-align: left;
  color: #61a0ff;
  height: 25px;margin-bottom: 0;background-color: #f9f9f9;background: -webkit-gradient(left top, left bottom, color-stop(0%, #e6edff), color-stop(37%, #e1efff), color-stop(100%, #eef6ff));background: linear-gradient(to bottom, #e7eeff 0%, #dfefff 37%, #e7f2ff 100%);
}
.labelheadercard{
  font-size: 12px;margin-left: 10px;    font-weight: bold;
}
.bodycard{
  margin-top: -16px;
}
.grupolabel{
  padding-left: 0px;margin-top: 3px;
}
.mb-3{
  margin-top: 1px;
}
.buttongrupolabel{
  height: 25px;margin-top: -2px;
}
.inicio{
  margin-top: -0.2rem;
}
.el-tabs__nav {
    position: relative;
    transition: transform .3s;
    float: left;
    height: 25px !important;
}
.hamb-icon {
  position: absolute;
  background: #48576a;
  width: 20px;
  height: 2px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 2px 3px rgba(0, 0, 0, .2);
}

.hamb-icon:before,
.hamb-icon:after {
  content: '';
  position: absolute;
  background: #48576a;
  width: 20px;
  height: 2px;
  transition: .5s;
  box-shadow: 0 2px 3px rgba(0, 0, 0, .2);
}

.hamb-icon:before {
  top: -6px;
}

.hamb-icon:after {
  top: 6px;
}

.hamb-container.active .hamb-icon {
  background: rgba(0, 0, 0, 0);
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0);
}

.hamb-container.active .hamb-icon:before {
  top: 0;
  transform: rotate(45deg);
}

.hamb-container.active .hamb-icon:after {
  top: 0;
  transform: rotate(-45deg);
}


.el-menu-item,
.el-submenu__title {
  height: 48px;
  line-height: 48px;
}
.el-loading-mask{
  background-color: rgba(0, 0, 0, 0.8);
}
.el-input__inner{
  height: 22px;
  font-size: 12px;
}
.buttonSave span {
    padding-left: 1px !important;
}
.elform{
        margin-top: -4px;
}
.el-table__body tr.current-row>td {
    background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%);
}
.el-table--striped .el-table__body tr.el-table__row--striped.current-row td {
    background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%);
}
.el-card__header {
        padding: 0px 0px !important;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 220px !important;
  min-height: 400px;
}
.el-menu {
    overflow-y: auto;
    weight: 100%;
    height: 100%;
    background: rgba(236, 245, 250, 0.89);
}
.el-folder{
   /* background-image: url("../../images/folder-cerrado.png"); */
   width:17px;
   height:15px; 
   cursor: pointer;
   margin-top: -5px;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  /*background: url("../../images/guardar.png") no-repeat;*/
  content: url("images/folder-cerrado.png") ;
 }

 .el-submenu.is-opened>.el-submenu__title .el-folder{
    content:url("images/folder-abrir.png");
    z-index: 10000;
  }
  /* .el-submenu.is-opened{
    color: #000000 !important;
    background-color: #396b88 !important;
  } */
  .el-folder_last{
    /* background-image: url("../../images/folder-cerrado.png"); */
    width:17px;
    height:15px; 
    cursor: pointer;
    margin-top: -5px;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    /*background: url("../../images/guardar.png") no-repeat;*/
    content: url("images/sheet.png") ;
  }
.el-submenu.is-opened>.el-submenu__title .fa-caret-right{
    transform: rotate(90deg);
 }
 .el-submenu__icon-arrow {
    position: absolute;
    top: 50%;
    right: 20px;
    margin-top: -7px;
    transition: transform .3s;
    font-size: 12px;
    display: none;
    z-index: 10000;
  }
 .letraTabla{
  font-size: 9px;
}
.el-button--primary {
    color: #4a4949;
    background-color: #c7d9e9;
    border-color: #c7d9e9;
}
.el-table_1_column_1 {
    background-color: #fbfcfd !important;
    text-align: center !important;
    border: 1px solid #9EB6CE !important;
    border-width: 0px 1px 1px 0px !important;
    border-bottom: 1px solid #9eb6ce !important;
}
.el-table td, .el-table th {
    height: 20px;
    min-width: 0;
    text-overflow: ellipsis;
    vertical-align: middle;
}
.el-table__footer-wrapper tbody td, .el-table__header-wrapper tbody td {
    background-color: #e4f8ef !important;
    color: #fc4a07;
    font-weight: 700;
}
.el-pager li.active {
    border-color: #a9c4d4;
    background-color: #a9c4d4;
    color: #ffffff;
    cursor: default;
}
.el-pagination .btn-next, .el-pagination .btn-prev {
    background: center center no-repeat #fff;
    background-size: 16px;
    border: 1px solid #d1dbe5;
    cursor: pointer;
    margin: 0;
    color: #97a8be;
}
.el-pagination button, .el-pagination span {
    display: inline-block;
    font-size: 13px;
    min-width: 28px;
    height: 18px !important;
    line-height: 28px;
    vertical-align: top;
    box-sizing: border-box;
}
.el-pager li {
    padding: 0 4px;
    border-right: 0;
    background: #f6faff;
    font-size: 11px;
    min-width: 28px;
    height: 18px;
    line-height: 17px;
    text-align: center;
}
.el-tabs__nav-next, .el-tabs__nav-prev {
    position: absolute;
    cursor: pointer;
    line-height: 25px;
    font-size: 12px;
    color: #8391a5;
}
.el-input-group--prepend .el-input__inner, .el-input-group__append{
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    height: 22px;
}
.el-form-item__content{
    line-height: 25px;
    position: relative;
    font-size: 13px;
}
.el-button--large{
    padding: 11px 19px;
    font-size: 13px;
    border-radius: 4px;
}
.el-table .cell {
    white-space: normal;
    word-break: break-all;
    line-height: 17px;
    font-size: 13px;
}


.hamb-icon:before, .hamb-icon:after {
    content: '';
    position: absolute;
    background: #48576a;
    background: white;
    width: 20px;
    height: 2px;
    -webkit-transition: .5s;
    transition: .5s;
    -webkit-box-shadow: 0 2px 3px rgba(0, 0, 0, .2);
    box-shadow: 0 2px 3px rgba(0, 0, 0, .2);
}



.brand {
  text-align: left;
  font-size: 0.9em;
  line-height: 38px;
  padding: 0 13px 0 0px;
}
.hamb-icon {
    position: absolute;
    background: #ffffff;
    width: 20px;
    height: 2px;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    -webkit-box-shadow: 0 2px 3px rgba(0, 0, 0, .2);
    box-shadow: 0 2px 3px rgba(0, 0, 0, .2);
}
.row {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    margin-right: -20px;
    margin-left: -11px;
}
.el-table__row .cell, .el-table th>div {
    padding-left: 5px;
    padding-right: 5px;
    box-sizing: border-box;
    text-overflow: ellipsis;
}
.el-table__header .cell, .el-table th>div{
    padding-left: 0px !important;
    padding-right: 0px !important;
    box-sizing: border-box;
    text-overflow: ellipsis;
}
.el-input-number--small .el-input__inner {
    padding-right: 0px;
}
.el-input-number--small .el-input-number__decrease, .el-input-number--small .el-input-number__increase {
    line-height: 20px;
    width: 17px;
    font-size: 9px;
}
.el-input-number--small .el-input-number__decrease {
    right: 17px;
}
.el-input-number--small {
    width: 87px;
}
.el-date-editor.el-input {
    width: 96px;
}
.el-input__icon+.el-input__inner {
    padding-right: 17px;
    height: 22px !important;
}
.inputAling .el-input__inner{
    text-align: right;
}
.el-input__inner {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #bfcbd9;
    box-sizing: border-box;
    color: #1f2d3d;
    font-size: inherit;
    height: 36px;
    line-height: 1;
    outline: 0;
    padding: 3px 4px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
}
.buscadorbar{
  -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #bfcbd9;
    box-sizing: border-box;
    color: #1f2d3d;
    font-size: inherit;
    height: 36px;
    line-height: 1;
    outline: 0;c
    padding: 3px 4px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    height: 22px;
    font-size: 12px;
}
.boton{
    height: 20px;
}
.green {
  background: #349025;
    border-radius: 0.8em;
    -moz-border-radius: 0.8em;
    -webkit-border-radius: 0.8em;
    border-color: black;
    color: #fff;
    display: inline-block;
    /* font-weight: bold; */
    line-height: 1.6em;
    text-align: center;
    /* height: 10px; */
    height: 14px;
    width: 14px;
    border-style: solid;
    border-width: 1px;
    margin-right: -3px;
}
.opaco {
    background: #f6f7f9;
    border-radius: 0.8em;
    -moz-border-radius: 0.8em;
    -webkit-border-radius: 0.8em;
    border-color: black;
    color: #fff;
    display: inline-block;
    /* font-weight: bold; */
    line-height: 1.6em;
    text-align: center;
    /* height: 10px; */
    height: 14px;
    width: 14px;
    border-style: solid;
    border-width: 1px;
    margin-right: -3px;
}
.red1 {
  background: #d43438;
    border-radius: 0.8em;
    -moz-border-radius: 0.8em;
    -webkit-border-radius: 0.8em;
    border-color: black;
    color: #fff;
    display: inline-block;
    /* font-weight: bold; */
    line-height: 1.6em;
    text-align: center;
    /* height: 10px; */
    height: 14px;
    width: 14px;
    border-style: solid;
    border-width: 1px;
    margin-right: -3px;
}
.yellow {
  background: #fbba22;
    border-radius: 0.8em;
    -moz-border-radius: 0.8em;
    -webkit-border-radius: 0.8em;
    border-color: black;
    color: #fff;
    display: inline-block;
    /* font-weight: bold; */
    line-height: 1.6em;
    text-align: center;
    /* height: 10px; */
    height: 16px;
    width: 16px;
    border-style: solid;
    border-width: 1px;
    margin-right: -3px;
}
.el-checkbox__input.is-checked .el-checkbox__inner {
    background-color: #308d33;
    border-color: #308d33;
}
.el-checkbox__inner {
    /* margin-top: 8px; */
    border-radius: 14px;
}
.el-input.is-disabled .el-input__inner {
    background-color: #eef1f6;
    border-color: #d1dbe5;
    color: #1f2d3d;
    cursor: not-allowed;
}
.newCheckBox .el-checkbox__input.is-checked .el-checkbox__inner{
    background-color:#6ca5da;
    border-color: #6ca5da;
}
.newCheckBox .el-checkbox__inner {
    margin-top: 8px;
    border-radius: 4px;
}
.el-table .cell {
    white-space: normal;
    word-break: break-all;
    line-height: 20px;
    font-size: 13px;
}
.el-table .warning-row td{
    background: #b2bbc4;
  }
.el-table .warning-row tr:hover>td{
    background: #b2bbc4;
  }
.zk-table__cell-inner {
    padding: 0px 18px !important;
}
.zk-table__footer-row, .zk-table__header-row {
    height: inherit !important;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
.zk-table__body-row {
    height: inherit !important;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
.el-table .sort-caret.ascending {
    top: 9px;
    border-top: none;
    border-bottom: 5px solid transparent !important;
}
.el-table .sort-caret.descending {
    bottom: 9px;
    border-top: 5px solid transparent !important;
    border-bottom: none;
}
/* .el-table .success-row td{
    background: #2e6610;
  } */
</style>
