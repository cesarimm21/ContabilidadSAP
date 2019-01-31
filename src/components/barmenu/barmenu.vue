<template>
  <div id="app">
    <el-row style="box-shadow: rgb(53, 83, 105) 0px 1px 2px; z-index: 3;">
      <el-col :span="24">
       <top-menu/>
      </el-col>
    </el-row>
    <el-row class="main-container">
      <div class="side-container">
        <div class="side-toolbar bg-purple2">
          <el-tooltip class="item" effect="dark" content="Activar barmenu" placement="bottom">
          <div class="hamb-container" v-bind:class="{ active: isActive }" @click="clickHamburger">
            <div class="hamb-icon"></div>
          </div>
          </el-tooltip>
        </div>
        <div class="grid-content bg-purple">         
          <el-menu default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
            <el-menu-item
              v-for="item in accesosBarMenu"
              @click="linkRoute(item.strEnlace)"
              :index="item.strEnlace"
              :key="item.strEnlace">
              <span slot="title" >{{item.strNombre}}</span>
              <i :class="item.strIconName"></i>              
            </el-menu-item>         
          </el-menu>
        </div>
      </div>
      <div style="background:#f9fafc; width: 100%; padding: 1em;">
        <router-view></router-view>
      </div>
    </el-row>
  </div>
</template>
<script>
import BarmenuComponent from '@/components/barmenu/barmenu.component'
export default BarmenuComponent
</script>
<style>
.el-menu--horizontal.el-menu--dark .el-submenu .el-menu-item.is-active, .el-menu-item.is-active,.router-link {
    color: #0c3551;
    background-color: #21859d;
}
.el-menu-item{
  color: #0c3551;
}
.el-menu-item:hover{
  color: #0c3551;
}
div>ul>li>span{
  margin-left: 10px;  
}
</style>
