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

body {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
  margin: 0;
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
  height: calc(100% - 48px);
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
    background-color: #a9c4d4 !important;
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
  height: 12px;
  border-right: 1px solid #fafafa;
  border-left: 1px solid #b4b4b4;
  padding: 0;
}
.el-card__body {
    text-align: center;
    margin-bottom: 0.4% !important;
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
.row {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
}
.buttonfilter{
    width: 22px;
    height: 22px;
    cursor: pointer;
    font: 0px/100% Arial, Helvetica, sans-serif;
    margin-left: 0.3rem;
    padding: 0px 0px;
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
    padding: 0 45px !important;
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
  margin-bottom: 0rem !important;
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
.labelheadercard{
  font-size: 13px;margin-left: 10px;
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

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 220px;
  min-height: 400px;
}

.el-menu-item,
.el-submenu__title {
  height: 48px;
  line-height: 48px;
}
.el-loading-mask{
  background-color: rgba(0, 0, 0, 0.8);
}

</style>
