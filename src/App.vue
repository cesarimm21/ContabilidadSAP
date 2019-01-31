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
  background: #D3DCE6;
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

.hamb-container {
  background-color: #C0CCDA;
  width: 48px;
  height: 48px;
  position: relative;
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
