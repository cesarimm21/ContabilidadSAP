<template>
  <div class="top-menu">
    <div class="logo" style="align-items: center;justify-content: center;" >
        <img src="../../../images/logo.png" style="width: 100px !important; height: 51px !important;"> 
    </div>
    <div class="side-toolbar bg-purple2">
      <el-tooltip class="item" effect="dark" content="Activar barmenu" placement="bottom">
      <div class="hamb-container" v-bind:class="{ active: isActive }" @click="clickHamburger()" >
        <div class="hamb-icon"></div>
      </div>
      </el-tooltip>
    </div>
    <el-tooltip class="item" effect="dark" :content="namecomplete" placement="bottom">
      <div class="user-container " style="line-height: 35px;"><i class="el-icon-fa-user"></i> <span style="font-size: 14px;">{{nameuser}}</span>
      </div>
    </el-tooltip>
    <el-tooltip v-if="ocultarConfig" class="item" effect="dark" content="Configuración" placement="bottom">
      <div class="icon-container blue" style="line-height: 35px;" @click.prevent="$refs.ctxMenu.open"><i class="el-icon-fa-cog"></i>
      </div>
    </el-tooltip>
    
    <el-tooltip class="item" effect="dark" content="Salir" placement="bottom">
    <div class="icon-container red" style="line-height: 35px;" @click="linkLogout"><i class="el-icon-fa-sign-out"></i>
    </div>
    </el-tooltip>
      <div>
      <context-menu id="context-menu" mode="horizontal" ref="ctxMenu">
        <div class=" principal blue">
          <el-menu class="el-menu-demo">
            <el-menu-item 
              v-for="item in accesosUser"
              @click="linkRoute(item.strEnlace)"
              :index="item.strEnlace"
              :key="item.strEnlace">
              <i :class="item.strIconName"></i> {{item.strNombre}}
            </el-menu-item>

          </el-menu>
        </div>
      </context-menu>
    </div>
  </div>
</template>
<script>
import TopMenu from '@/components/customs/top-menu/top-menu.component'
export default TopMenu
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
.el-menu{
  background-color: white;
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
