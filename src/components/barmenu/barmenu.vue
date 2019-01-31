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
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>FI-FINANZAS</span>
              </template>
              <el-submenu index="1-1">
                <template slot="title">CUENTAS POR PAGAR</template>
                <el-menu-item index="1-1-1">FP01-Ingreso Documento</el-menu-item>
                <el-menu-item index="1-1-2">FP02-Modificar Documento</el-menu-item>
                <el-menu-item index="1-1-3">FP03-Visualizar Documento</el-menu-item>
                <el-menu-item index="1-1-4">FP10-Reconciliación</el-menu-item>
                <el-menu-item index="1-1-5">FP04-Pagos</el-menu-item>
                <el-submenu index="1-1-6">
                  <template slot="title">REPORTES</template>
                  <el-menu-item index="1-1-6-1">FP21-Documentos</el-menu-item>
                  <el-menu-item index="1-1-6-2">FP22-Cuenta Corriente</el-menu-item>
                </el-submenu>
              </el-submenu>
              <el-submenu index="1-2">
                <template slot="title">CUENTAS POR COBRAR</template>
                <el-menu-item index="1-2-1">FR01-Ingreso Documento</el-menu-item>
                <el-menu-item index="1-2-2">FR02-Modificar Documento</el-menu-item>
                <el-menu-item index="1-2-3">FR03-Visualizar Documento</el-menu-item>
                <el-menu-item index="1-2-4">FR10-Reconciliaciòn</el-menu-item>
              </el-submenu>
              <el-submenu index="1-3">
                <template slot="title">CONTABILIDAD</template>
                <el-menu-item index="1-3-1">FG01-Ingreso Documento</el-menu-item>
                <el-menu-item index="1-3-2">FG02-Modificar Documento</el-menu-item>
                <el-menu-item index="1-3-3">FG03-Visualizar Documento</el-menu-item>
                <el-menu-item index="1-3-4">REPORTES</el-menu-item>
              </el-submenu>
              <el-submenu index="1-4">
                <template slot="title">TESORERIA</template>
                <el-menu-item index="1-4-1">FT01-Caja y Bancos</el-menu-item>
                <el-menu-item index="1-4-2">FT05-Pagos Individuales</el-menu-item>
                <el-menu-item index="1-4-3">FT06-Pagos Masivos</el-menu-item>
                <el-menu-item index="1-4-4">FT07-Pagos Detracciones</el-menu-item>
                <el-submenu index="1-4-5">
                  <template slot="title">REPORTES</template>
                  <el-menu-item index="1-4-5-1">FT21 - Flujo de Caja Diario</el-menu-item>
                  <el-menu-item index="1-4-5-2">FT22 - Reporte de Pagos</el-menu-item>
                </el-submenu>
              </el-submenu>
              <el-submenu index="1-5">
                <template slot="title">MAESTRO DATOS</template>
                <el-submenu index="1-5-1">
                  <template slot="title">CUENTAS POR PAGAR</template>
                  <el-menu-item index="1-5-1-1">MP01-Crear Proveedor</el-menu-item>
                  <el-menu-item index="1-5-1-2">MP02-Modificar Proveedor</el-menu-item>
                  <el-menu-item index="1-5-1-3">MP03-Visualizar Proveedor</el-menu-item>
                </el-submenu>
                <el-submenu index="1-5-2">
                  <template slot="title">CUENTAS POR COBRAR</template>
                  <el-menu-item index="1-5-2-1">MR01-Crear Proveedor</el-menu-item>
                  <el-menu-item index="1-5-2-2">MP02-Modificar Proveedor</el-menu-item>
                  <el-menu-item index="1-5-2-3">MP03-Visualizar Proveedor</el-menu-item>
                </el-submenu>
                <el-submenu index="1-5-3">
                  <template slot="title">CONTABILIDAD GENERA</template>
                  <el-menu-item index="1-5-3-1">MG01-Crear Cuenta Contable</el-menu-item>
                  <el-menu-item index="1-5-3-2">MG02-Modificar Cuenta Contable</el-menu-item>
                  <el-menu-item index="1-5-3-3">MG03-Visualizar Cuenta Contable</el-menu-item>
                  <el-menu-item index="1-5-3-4">MG11-Crear Elemento de Gasto</el-menu-item>
                  <el-menu-item index="1-5-3-5">MG12-Modificar Elemento de Gasto</el-menu-item>
                  <el-menu-item index="1-5-3-6">MG13-Visualizar Elemento Gasto</el-menu-item>
                  <el-menu-item index="1-5-3-7">MG21-Crear Grupo Cuenta</el-menu-item>
                  <el-menu-item index="1-5-3-8">MG22-Modificar Grupo Cuenta</el-menu-item>
                  <el-menu-item index="1-5-3-9">MG23-Visualizar Grupo Cuenta</el-menu-item>
                </el-submenu>
              </el-submenu>
              <el-submenu index="1-6">
                <template slot="title">LIBROS Y BALANCES</template>
                <el-submenu index="1-6-1">
                  <template slot="title">LIBRO DE CAJA Y BANCOS</template>
                  <el-menu-item index="1-6-1-1">RB01-Detalle de los  movimientos del Efectivo</el-menu-item>
                  <el-menu-item index="1-6-1-2">RB02-Detalle de los  movimientos de la Cta. Cte.</el-menu-item>
 
                </el-submenu>
                <el-submenu index="1-6-2">
                  <template slot="title">LIBRO DE INVENTARIOS Y BALANCES</template>
                  <el-menu-item index="1-6-2-1">RI01-Estado de situación financiera</el-menu-item>
                  <el-menu-item index="1-6-2-2">RI02-Detalle del saldo de la cuenta 10 efectivo y equivalentes de efectivo (2)</el-menu-item>
                </el-submenu>
                <el-submenu index="1-6-3">
                  <template slot="title">LIBRO DIARIO</template>
                  <el-menu-item index="1-6-3-1">RD01-Libro diario</el-menu-item>
                  <el-menu-item index="1-6-3-2">RD02-Detalle del plan contable utilizado</el-menu-item>
                </el-submenu>
                <el-submenu index="1-6-4">
                  <template slot="title">LIBRO MAYOR</template>
                  <el-menu-item index="1-6-4-1">RM01-Libro mayor</el-menu-item>
                </el-submenu>
                <el-submenu index="1-6-5">
                  <template slot="title">REGISTRO ACTIVOS FIJOS</template>
                  <el-menu-item index="1-6-5-1">F01-Detalle de los activos</el-menu-item>
                  <el-menu-item index="1-6-5-2">RF02-Detalle de la diferencia</el-menu-item>
                  <el-menu-item index="1-6-5-3">RF03-Detalle de los activos fijos bajo </el-menu-item>
                </el-submenu>
                <el-submenu index="1-6-6">
                  <template slot="title">REGISTRO COMPRAS</template>
                  <el-menu-item index="1-6-6-1">RC01-Registro de compras</el-menu-item>
                  <el-menu-item index="1-6-6-2">RC02-Información de operaciones</el-menu-item>
                  <el-menu-item index="1-6-6-3">RC03-Registro de compras simplificado </el-menu-item>
                </el-submenu>
                <el-submenu index="1-6-6">
                  <template slot="title">REGISTRO CONSIGNACIONES</template>
                  <el-menu-item index="1-6-6-1">RS01-Para el consignador - control de bienes entregados en consignación</el-menu-item>
                  <el-menu-item index="1-6-6-2">RS02-Para el consignatario - control de bienes recibidos en consignación</el-menu-item>
                  
                </el-submenu>
              </el-submenu>              
              <el-submenu index="1-7">
                <template slot="title">CIERRE PERIODO</template>
                <el-menu-item index="1-1-1">item one</el-menu-item>
              </el-submenu>
              
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>LO-LOGISTICA</span>
              </template>
              <el-submenu index="2-1">
                <template slot="title">REQUISICIÓN DE COMPRA</template>
                <el-menu-item index="2-1-1">LR01-Crear Requerimiento de Compra</el-menu-item>
                <el-menu-item index="2-1-2">LR02-Modificar Requerimiento de Compras</el-menu-item>
                <el-menu-item index="2-1-3">LR04-Visualizar Requerimiento de Compras</el-menu-item>
                <el-menu-item index="2-1-4">LR07-Aceptacion del Servicio</el-menu-item>
              </el-submenu>
              <el-submenu index="2-2">
                <template slot="title">ORDEN DE COMPRA</template>
                <el-menu-item index="2-2-1">LO01-Crear Orden de Compra</el-menu-item>
                <el-menu-item index="2-2-2">LO02-Modificar Orden de Compra</el-menu-item>
                <el-menu-item index="2-2-3">LO04-Visualizar Orden de Compra</el-menu-item>
              </el-submenu>
              <el-submenu index="2-3">
                <template slot="title">HES</template>
                <el-menu-item index="2-3-1">P01-Crear</el-menu-item>
                <el-menu-item index="2-3-2">P02-Modificar</el-menu-item>
                <el-menu-item index="2-3-3">P03-Visualizar</el-menu-item>
              </el-submenu>
               <el-submenu index="2-4">
                <template slot="title">ALMACENES</template>
                <el-menu-item index="2-4-1">LA01-Crear Material de Almacen</el-menu-item>
                <el-menu-item index="2-4-2">LA02-Visualizar Material de Almacen</el-menu-item>
                <el-menu-item index="2-4-3">LA05-Crear Clases de Material</el-menu-item>
                <el-menu-item index="2-4-3">LA06-Visualizar Clases de Material</el-menu-item>
              </el-submenu>
              <el-submenu index="2-5">
                <template slot="title">MAESTRO DATOS</template>
                <el-submenu index="2-5-1">
                  <template slot="title">COMPRAS</template>
                  <el-menu-item index="2-5-1-1">MC01-Crear Proveedor</el-menu-item>
                  <el-menu-item index="2-5-1-2">MC02-Modificar Proveedor</el-menu-item>
                  <el-menu-item index="2-5-1-3">MC04-Visualizar Proveedor</el-menu-item>
                </el-submenu>
                <el-submenu index="2-5-1">
                  <template slot="title">ALMACEN</template>
                  <el-menu-item index="2-5-1-1">MA01-Crear Material</el-menu-item>
                  <el-menu-item index="2-5-1-2">MA02-Modificar Material</el-menu-item>
                  <el-menu-item index="2-5-1-3">MA04-Visualizar Material</el-menu-item>
                </el-submenu>
              </el-submenu>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span :xs="4" >CP-COSTOS Y PRESUPUESTOS</span>
              </template>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>CO-COMERCIAL</span>
              </template>
            </el-submenu>
            <el-submenu index="5">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>XX-CONFIGURACIÓN</span>
              </template>
            </el-submenu>
            <!-- <el-menu-item
              v-for="item in tableData"
              @click="linkRoute(item.strLink)"
              :index="item.strLink"
              :key="item.strLink">
              <span slot="title" >{{item.strName}}</span>
              <i :class="item.strIcon_Name"></i>              
            </el-menu-item>          -->
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
  /* font-size: 11px; */
}
.el-menu-item:hover{
  color: #0c3551;
}
div>ul>li>span{
  margin-left: 10px;  
}
.el-menu-item, .el-submenu__title{
  font-size: 11px;
}
.el-menu-item {
  padding-left: 10px;
    min-width: 200px;
}
.el-menu{
  background: #f5f7f8;
  overflow-y:auto; 
  weight:100%;
   height:100%;
}
/* .el-menu-item *  */
</style>
