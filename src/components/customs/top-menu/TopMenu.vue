<template>
  <div class="top-menu">
    <div class="logo" >
        <!-- <img src="../../images/favicon.png"> -->
    </div>
    <div class="brand" >
      <span style="font-size: 12px;    color: #ffc50c;">Tiempo Restante</span>
      <i class="el-icon-fa-clock-o" style="font-size: 12px;    color: #ffc50c;"></i>
      <span  :class="calcular(contador)" id="tiempoagotado"> {{  hours }}:{{  minutos }}:{{seconds}}</span>
    </div>
    <!-- <div class="brand">HSEC - Documentos</div> -->
    <!-- <p>tiempo de token: {{hours}}:{{minutes}}:{{seconds}}</p> -->
    <el-tooltip class="item" effect="dark" :content="namecomplete" placement="bottom">
      <div class="user-container "><i class="el-icon-fa-user"></i> <span style="font-size: 14px;">{{nameuser}}</span>
      </div>
    </el-tooltip>
    <el-tooltip v-if="ocultarConfig" class="item" effect="dark" content="Configuración" placement="bottom">
      <div class="icon-container blue" @click.prevent="$refs.ctxMenu.open"><i class="el-icon-fa-cog"></i>
      </div>
    </el-tooltip>
    
    <el-tooltip class="item" effect="dark" content="Salir" placement="bottom">
    <div class="icon-container red" @click="linkLogout"><i class="el-icon-fa-sign-out"></i>
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
  background-image: url('../../../images/menu_imag.png');
  color: #fff;
  display: flex;
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
  border-left: solid 1px #2483ca;
}

.user-container:hover {
  background-color: #1D90E6;
}

.icon-container {
  width: 48px;
  height: 48px;
  line-height: 48px;
  text-align: center;
  cursor: pointer;
  border-left: solid 1px #2483ca;
}

.icon-container:hover {
  background-color: #1D90E6;
}

.red:hover {
  background-color: #FF4949;
}
.el-menu{
  background-color: white;
}

</style>
