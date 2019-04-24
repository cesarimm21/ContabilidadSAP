<template>
  <div id="app">
    <el-row style="box-shadow: rgb(53, 83, 105) 0px 1px 2px; z-index: 3;">
      <el-col :span="24">
       <top-menu v-on:proveedorSeleccionado="proveedorSeleccionado()"/>
        <!-- <el-dialog title="Búsqueda Proveedor"  :visible.sync="busquedaProveedorVista" @close="busquedaProveedorVista=false" size="small" >
          <busquedaProveedor v-on:proveedorSeleccionado="proveedorSeleccionado($event)"></busquedaProveedor>
        </el-dialog> -->
      
      </el-col>
    </el-row>
    <el-row class="main-container">
      <div class="side-container">
       
        <div class="grid-content bg-purple">         
          <el-menu default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
            <el-submenu index="1">
              <template slot="title">
                <i class="fa fa-caret-right" style="width:10px"></i>
                <img class="el-folder"/> 
                <span slot="title">FI-Finanzas</span>
              </template>
              <el-submenu index="1-1">
                <template slot="title">                  
                  <i class="fa fa-caret-right" style="width:10px"></i>
                  <img class="el-folder"/> 
                  <span slot="title">Cuentas por pagar</span>
                </template>
                <el-menu-item index="1-1-1"  @click="linkRouteCrear()">
                  <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;"/> 
                  <span slot="title">FP01-Ingreso Documento</span>
                </el-menu-item>
                <el-menu-item index="1-1-2"  @click="linkRouteModificar()">
                  <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                  <span slot="title">FP02-Modificar Documento</span>
                  </el-menu-item>
                <el-menu-item index="1-1-3"  @click="linkRouteVisualizar()">
                  <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                  <span slot="title">FP03-Visualizar Documento</span>
                  </el-menu-item>
                <el-menu-item index="1-1-4">
                  <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                  <span slot="title">FP10-Reconciliación</span>
                  </el-menu-item>
                <el-menu-item index="1-1-5"
                @click="linkRouterunpagos()">
                  <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                  <span slot="title">FP04-Pagos</span>
                  </el-menu-item>
                <el-submenu index="1-1-6">
                  <template slot="title">
                    <i class="fa fa-caret-right" style="width:10px"></i>
                    <img class="el-folder"/> 
                    <span slot="title">Reportes</span>
                    </template>
                  <el-menu-item index="1-1-6-1">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                    <span slot="title">FP21-Documentos</span>
                    </el-menu-item>
                  <el-menu-item index="1-1-6-2">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                    <span slot="title">FP22-Cuenta Corriente</span>
                  </el-menu-item>
                </el-submenu>
              </el-submenu>
              <el-submenu index="1-2">
                <template slot="title">
                  <i class="fa fa-caret-right" style="width:10px"></i>
                  <img class="el-folder"/>
                  <span slot="title">Cuentas por cobrar</span>
                  </template>
                <el-menu-item index="1-2-1">
                  <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                  <span slot="title">FR01-Ingreso Documento</span>
                </el-menu-item>
                <el-menu-item index="1-2-2">
                  <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                  <span slot="title">FR02-Modificar Documento</span>
                </el-menu-item>
                <el-menu-item index="1-2-3">
                  <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                  <span slot="title">FR03-Visualizar Documento</span>
                </el-menu-item>
                <el-menu-item index="1-2-4">
                  <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                  <span slot="title">FR10-Reconciliación</span>
                  </el-menu-item>
              </el-submenu>
              <el-submenu index="1-3">
                <template slot="title">
                  <i class="fa fa-caret-right" style="width:10px"></i>
                  <img class="el-folder"/>
                  <span slot="title">Contabilidad</span>
                </template>
                <el-menu-item index="1-3-1">
                  <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                  <span slot="title">FG01-Ingreso Documento</span>
                </el-menu-item>
                <el-menu-item index="1-3-2">
                  <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                  <span slot="title">FG02-Modificar Documento</span>
                </el-menu-item>
                <el-menu-item index="1-3-3">
                  <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                  <span slot="title">FG03-Visualizar Documento</span>
                </el-menu-item>
                <el-menu-item index="1-3-4">
                  <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                  <span slot="title">Reportes</span>
                </el-menu-item>
              </el-submenu>
              <el-submenu index="1-4">
                <template slot="title">
                  <i class="fa fa-caret-right" style="width:10px"></i>
                  <img class="el-folder"/>
                  <span slot="title">Tesoreria</span>
                </template>
                <el-menu-item index="1-4-1">
                  <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                  <span slot="title">Reportes</span>
                </el-menu-item>
                <el-menu-item index="1-4-2">
                  <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                  <span slot="title">FT05-Pagos Individuales</span>
                </el-menu-item>
                <el-menu-item index="1-4-3">
                  <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                  <span slot="title">FT06-Pagos Masivos</span>
                </el-menu-item>
                <el-menu-item index="1-4-4">
                  <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                  <span slot="title">FT07-Pagos Detracciones</span>
                  </el-menu-item>
                <el-submenu index="1-4-5">
                  <template slot="title">
                    <i class="fa fa-caret-right" style="width:10px"></i>
                  <img class="el-folder"/>
                  <span slot="title">Reportes</span>
                </template>
                  <el-menu-item index="1-4-5-1">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                    <span slot="title">FT21-Flujo de Caja Diario</span>
                  </el-menu-item>
                  <el-menu-item index="1-4-5-2">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                    <span slot="title">FT22-Reporte de Pagos</span>
                  </el-menu-item>
                </el-submenu>
              </el-submenu>
              <el-submenu index="1-5">
                <template slot="title">
                  <i class="fa fa-caret-right" style="width:10px"></i>
                  <img class="el-folder"/>
                  <span slot="title">Maestro datos</span>
                </template>
                <el-submenu index="1-5-1">
                  <template slot="title">
                    <i class="fa fa-caret-right" style="width:10px"></i>
                    <img class="el-folder"/>
                    <span slot="title">Cuentas por pagar</span>
                  </template>
                  <el-menu-item index="1-5-1-1">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                    <span slot="title">MP01-Crear Proveedor</span>
                  </el-menu-item>
                  <el-menu-item index="1-5-1-2">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                    <span slot="title">MP02-Modificar Proveedor</span>
                  </el-menu-item>
                  <el-menu-item index="1-5-1-3">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                    <span slot="title">MP03-Visualizar Proveedor</span>
                  </el-menu-item>
                </el-submenu>
                <el-submenu index="1-5-2">
                  <template slot="title">
                    <i class="fa fa-caret-right" style="width:10px"></i>
                    <img class="el-folder"/>
                    <span slot="title">Cuentas por cobrar</span>
                  </template>
                  <el-menu-item index="1-5-2-1">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                    <span slot="title">MR01-Crear Proveedor</span>
                  </el-menu-item>
                  <el-menu-item index="1-5-2-2">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                    <span slot="title">MP02-Modificar Proveedor</span>
                  </el-menu-item>
                  <el-menu-item index="1-5-2-3">
                      <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                      <span slot="title">MP03-Visualizar Proveedor</span>
                 </el-menu-item>
                </el-submenu>
                <el-submenu index="1-5-3">
                  <template slot="title">
                    <i class="fa fa-caret-right" style="width:10px"></i>
                    <img class="el-folder"/>
                    <span slot="title">Contabilidad general</span>
                  </template>
                  <el-menu-item index="1-5-3-1" @click="linkCuentaContable()">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                    <span slot="title">MG01-Crear Cuenta Contable</span>
                  </el-menu-item>
                  <el-menu-item index="1-5-3-2" @click="linkVisualizarModificarCuentaContable()">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                    <span slot="title">MG02-Modificar Cuenta Contable</span>
                  </el-menu-item>
                  <el-menu-item index="1-5-3-3" @click="linkVisualizarCuentaContable()">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                    <span slot="title">MG03-Visualizar Cuenta Contable</span>
                  </el-menu-item>
                  <el-menu-item index="1-5-7-1" @click="linkCentroCostos()">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                    <span slot="title">MG01-Crear Centro Costos</span>
                  </el-menu-item>
                  <el-menu-item index="1-5-7-2" @click="linkVisualizarModificarCentroCostos()">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                    <span slot="title">MG02-Modificar Centro Costos</span>
                  </el-menu-item>
                  <el-menu-item index="1-5-7-3" @click="linkVisualizarCentroCostos()">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                    <span slot="title">MG03-Visualizar Centro Costos</span>
                  </el-menu-item>
                  <el-menu-item index="1-5-3-4">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                    <span slot="title">MG11-Crear Elemento de Gasto</span>
                  </el-menu-item>
                  <el-menu-item index="1-5-3-5">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                    <span slot="title">MG12-Modificar Elemento de Gasto</span>
                  </el-menu-item>
                  <el-menu-item index="1-5-3-6">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                    <span slot="title">MG13-Visualizar Elemento Gasto</span>
                  </el-menu-item>
                  <el-menu-item index="1-5-3-7">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                    <span slot="title">MG21-Crear Grupo Cuenta</span>
                  </el-menu-item>
                  <el-menu-item index="1-5-3-8">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                    <span slot="title">MG22-Modificar Grupo Cuenta</span>
                  </el-menu-item>
                  <el-menu-item index="1-5-3-9">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                    <span slot="title">MG23-Visualizar Grupo Cuenta</span>
                  </el-menu-item>
                </el-submenu>
                 <el-submenu index="1-5-4">
                  <template slot="title">
                    <i class="fa fa-caret-right" style="width:10px"></i>
                    <img class="el-folder"/>
                    <span slot="title">Maestro proveedor</span>
                  </template>
                  <el-menu-item index="1-5-4-1" @click="linkCrearProveedor()">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                    <span> MP01-Crear Proveedor</span>
                  </el-menu-item>
                  <el-menu-item index="1-5-4-2" @click="linkModificarProveedor()">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                    <span> MP02-Modificar Proveedor</span>                    
                    </el-menu-item>
                  <el-menu-item index="1-5-4-3" @click="linkVisualizarProveedor()">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                    <span> MP03-Visualizar Proveedor</span>
                   </el-menu-item>
                </el-submenu>
              </el-submenu>
             
              <el-submenu index="1-6">
                <template slot="title">
                  <i class="fa fa-caret-right" style="width:10px"></i>
                  <img class="el-folder"/>
                  <span slot="title">Libros-Balances</span>
                </template>
                <el-submenu index="1-6-1">
                  <template slot="title">
                    <i class="fa fa-caret-right" style="width:10px"></i>
                    <img class="el-folder"/>
                    <span slot="title">Libro caja-bancos</span>
                  </template>
                  <el-menu-item index="1-6-1-1">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                    <span> RB01-Detalle de los  movimientos del Efectivo</span>
                  </el-menu-item>
                  <el-menu-item index="1-6-1-2">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                    <span> RB01-Detalle de los  movimientos del Efectivo</span>
                  </el-menu-item>
                </el-submenu>
                <el-submenu index="1-6-2">
                  <template slot="title">
                    <i class="fa fa-caret-right" style="width:10px"></i>
                    <img class="el-folder"/>
                    <span slot="title">Libro inventarios</span>
                  </template>
                  <el-menu-item index="1-6-2-1">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                    <span>RI01-Estado de situación financiera</span>
                  </el-menu-item>
                  <el-menu-item index="1-6-2-2">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                    <span>RI02-Detalle del saldo de la cuenta 10 efectivo y equivalentes de efectivo (2)</span>
                  </el-menu-item>
                </el-submenu>
                <el-submenu index="1-6-3">
                  <template slot="title">
                    <i class="fa fa-caret-right" style="width:10px"></i>
                    <img class="el-folder"/>
                    <span slot="title">Libro diario</span>
                  </template>
                  <el-menu-item index="1-6-3-1"  @click="linkLibroDiarioD()">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;"/> 
                    <span>RD01-Libro diario</span>
                  </el-menu-item>
                  <el-menu-item index="1-6-3-2">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                    <span>RD02-Detalle del plan contable utilizado</span>
                  </el-menu-item>
                </el-submenu>
                <el-submenu index="1-6-4">
                  <template slot="title">
                    <i class="fa fa-caret-right" style="width:10px"></i>
                    <img class="el-folder"/>
                    <span slot="title">Libro mayor</span>
                  </template>
                  <el-menu-item index="1-6-4-1">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                    <span>RM01-Libro mayor</span>
                  </el-menu-item>
                </el-submenu>
                <el-submenu index="1-6-5">
                  <template slot="title"><i class="fa fa-caret-right" style="width:10px"></i>
                    <img class="el-folder"/>
                    <span slot="title">Registro activos fijos</span>
                  </template>
                  <el-menu-item index="1-6-5-1">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                    <span>F01-Detalle de los activos</span>
                  </el-menu-item>
                  <el-menu-item index="1-6-5-2">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                    <span>RF02-Detalle de la diferencia</span>
                  </el-menu-item>
                  <el-menu-item index="1-6-5-3">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                    <span>RF03-Detalle de los activos fijos bajo</span>
                  </el-menu-item>
                </el-submenu>
                <el-submenu index="1-6-6">
                  <template slot="title">
                    <i class="fa fa-caret-right" style="width:10px"></i>
                    <img class="el-folder"/>
                    <span slot="title">Registro compras</span>
                  </template>
                  <el-menu-item index="1-6-6-1">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                    <span>RC01-Registro de compras</span>
                  </el-menu-item>
                  <el-menu-item index="1-6-6-2">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                    <span>RC02-Información de operaciones</span>
                  </el-menu-item>
                  <el-menu-item index="1-6-6-3">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                    <span>RC03-Registro de compras simplificado</span>
                  </el-menu-item>
                </el-submenu>
                <el-submenu index="1-6-6">
                  <template slot="title">
                    <i class="fa fa-caret-right" style="width:10px"></i>
                    <img class="el-folder"/>
                    <span slot="title">Registro consignaciones</span>
                  </template>
                  <el-menu-item index="1-6-6-1">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                    <span>RS01-Para el consignador - control de bienes entregados en consignación</span>
                  </el-menu-item>
                  <el-menu-item index="1-6-6-2">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                    <span>RS02-Para el consignatario - control de bienes recibidos en consignación</span>
                  </el-menu-item>
                  
                </el-submenu>
                <el-submenu index="1-6-7-7">
                  <template slot="title">
                    <i class="fa fa-caret-right" style="width:10px"></i>
                    <img class="el-folder"/>
                    <span slot="title">Registro Costos</span>
                  </template>
                  <el-menu-item index="1-6-7-7-1">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                    <span>RG01 - 10.1 Registro de costos - estado de costo de ventas anual</span>
                  </el-menu-item>
                  <el-menu-item index="1-6-7-7-2">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                    <span>RG02 - 10.2 Registro de costos - elementos del costo mensual</span>
                  </el-menu-item>
                  <el-menu-item index="1-6-7-7-3">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                    <span>RG03 - 10.3 Registro de costos - estado de costo de produccion valorizado anual</span>
                  </el-menu-item>
                  <el-menu-item index="1-6-7-7-4">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                    <span>RG04 - 10.4 Registro de costos - centro de costos</span>
                  </el-menu-item>
                  
                </el-submenu>
                <el-submenu index="1-6-7-2">
                  <template slot="title">
                    <i class="fa fa-caret-right" style="width:10px"></i>
                    <img class="el-folder"/>
                    <span slot="title">Registro Del Inventario Permanente En Unidades Físicas</span>
                  </template>
                  <el-menu-item index="1-6-7-2-1">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                    <span>RP01 - 12.1 Registro del inventario permanente en unidades físicas - detalle del inventario permanente en unidades físicas</span>
                  </el-menu-item>
                </el-submenu>
                <el-submenu index="1-6-7-3">
                  <template slot="title">
                    <i class="fa fa-caret-right" style="width:10px"></i>
                    <img class="el-folder"/>
                    <span slot="title">Registro De Ventas e Ingresos</span>
                  </template>
                  <el-menu-item index="1-6-7-2-1">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                    <span>RP03 - 14.1 Registro de ventas e ingresos</span>
                  </el-menu-item>
                  <el-menu-item index="1-6-7-2-1">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                    <span>RP04 - 14.2 Registro de ventas e ingresos simplificado</span>
                  </el-menu-item>
                </el-submenu>
                <el-submenu index="1-6-7-3">
                  <template slot="title">
                    <i class="fa fa-caret-right" style="width:10px"></i>
                    <img class="el-folder"/>
                    <span slot="title">PDB Exportador-Sunat</span>
                  </template>
                  <el-menu-item index="1-6-7-2-1">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                    <span>RE01-Comprobantes de Compra</span>
                  </el-menu-item>
                  <el-menu-item index="1-6-7-2-1">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                    <span>RE02-Comprobantes de Venta</span>
                  </el-menu-item>
                  <el-menu-item index="1-6-7-2-1">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                    <span>RE03-Forma de Pago</span>
                  </el-menu-item>
                  <el-menu-item index="1-6-7-2-1">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                    <span>RE04-Tipo de Cambio</span>
                  </el-menu-item>
                </el-submenu>
              </el-submenu>              
              <el-submenu index="1-7">
                <template slot="title">
                  <i class="fa fa-caret-right" style="width:10px"></i>
                    <img class="el-folder"/>
                    <span slot="title">Cierre Periodo</span>
                </template>
                <el-submenu index="1-7-2">
                <template slot="title">
                  <i class="fa fa-caret-right" style="width:10px"></i>
                    <img class="el-folder"/>
                    <span slot="title">Cierre Mensual</span>
                </template>
                <el-menu-item index="1-1-1">
                  <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                  <span>CM01 - Cierre Diarios</span>
                </el-menu-item>
                <el-menu-item index="1-1-1">
                  <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                  <span>CM02 - Cierre Mensual</span>
                </el-menu-item>
                </el-submenu>
                <el-submenu index="1-7-2">
                <template slot="title">
                  <i class="fa fa-caret-right" style="width:10px"></i>
                    <img class="el-folder"/>
                    <span slot="title">Cierre Anual</span>
                </template>
                <el-menu-item index="1-1-1">
                  <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                  <span>CA01 - Cierre Año</span>
                </el-menu-item>
                <el-menu-item index="1-1-1">
                  <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                  <span>CA02 - Transferencia de Saldos Balance</span>
                </el-menu-item>
                </el-submenu>
              </el-submenu>
              
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="fa fa-caret-right" style="width:10px"></i>
                <img class="el-folder"/>
                <span>LO-Logistica</span>
              </template>
              <el-submenu index="2-1">
                <template slot="title">
                  <i class="fa fa-caret-right" style="width:10px"></i>
                  <img class="el-folder"/>
                  <span slot="title">Requisición de compras</span>
                </template>
                <el-menu-item index="2-1-1" @click="linkCrearRequisicion()">
                  <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                  <span>LR01-Crear Requerimiento de Compra</span>
                </el-menu-item>
                <el-menu-item index="2-1-2" @click="linkVisualizarModificaRequisicion()">
                  <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                  <span>LR02-Modificar Requerimiento de Compras</span>
                </el-menu-item>
                <el-menu-item index="2-1-3" @click="linkVisualizarRequisicion()">
                  <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                  <span>LR04-Visualizar Requerimiento de Compras</span>
                </el-menu-item>
                <el-menu-item index="2-1-4" @click="linkAprobarRequisicionAlmacen()">
                  <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                  <span>LR05-Aprobar Requerimiento</span>
                </el-menu-item>
              </el-submenu>
              <el-submenu index="2-2">
                <template slot="title">
                  <i class="fa fa-caret-right" style="width:10px"></i>
                  <img class="el-folder"/>
                  <span slot="title">Orden de compra</span>
                </template>
                <el-menu-item index="2-2-1" @click="CrearPO()">
                  <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                  <span>LO01-Crear Orden de Compra</span>
                </el-menu-item>
                <el-menu-item index="2-2-2" @click="EditPO()">
                  <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                  <span>LO02-Modificar Orden de Compra</span>
                </el-menu-item>
                <el-menu-item index="2-2-3" @click="ViewPO()">
                  <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                  <span>LO04-Visualizar Orden de Compra</span>
                </el-menu-item>
                <el-menu-item index="2-2-4" @click="AprobarPO()">
                  <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                  <span>LO05-Aprobar Orden de Compra</span>
                </el-menu-item>
              </el-submenu>
              <el-submenu index="2-3">
                <template slot="title">
                  <i class="fa fa-caret-right" style="width:10px"></i>
                  <img class="el-folder"/>
                  <span slot="title">Aceptación servicio</span>
                </template>
                <el-menu-item index="2-3-1" @click="linkRouteHes('crear')">
                  <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" /> 
                  <span>P01-Crear</span>
                </el-menu-item>
                <el-menu-item index="2-3-2" @click="linkRouteHes('edit')">
                  <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                  <span>P02-Modificar</span>
                </el-menu-item>
                <el-menu-item index="2-3-3" @click="linkRouteHes('view')">
                  <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                  <span>P03-Visualizar</span>
                </el-menu-item>
                <el-menu-item index="2-3-4" @click="linkRouteHes('aprobar')">
                  <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                  <span>P04-Aprobar</span>
                </el-menu-item>
              </el-submenu>
               <el-submenu index="2-4">
                <template slot="title">
                  <i class="fa fa-caret-right" style="width:10px"></i>
                  <img class="el-folder"/>
                  <span slot="title">Inventario</span>
                </template>
                <el-submenu index="2-4-1">
                  <template slot="title">
                    <i class="fa fa-caret-right" style="width:10px"></i>
                    <img class="el-folder"/>
                    <span slot="title">Almacen Suministros</span>
                  </template>
                  <el-menu-item index="2-4-1-1"  @click="linkCrearMaterial()">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                    <span>LA01-Crear Material de Suministros</span>
                  </el-menu-item>
                  <el-menu-item index="2-4-1-2" @click="linkModificarMaterial()">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                    <span>LA02-Modificar Material de Suministros</span>
                  </el-menu-item>
                  <el-menu-item index="2-4-1-20" @click="linkVisualizarMaterialAlmacen()">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                    <span>LA04-Visualizar Material de Suministros</span>
                  </el-menu-item>
                  <el-menu-item index="2-4-1-4" @click="linkRecepcionarSalidaAlmacen()">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                    <span>LA05-Recepcion Material de Suministros</span>
                  </el-menu-item>
                  
                </el-submenu>
                <el-submenu index="2-4-2">
                  <template slot="title">
                    <i class="fa fa-caret-right" style="width:10px"></i>
                    <img class="el-folder"/>
                    <span slot="title">Almacen Mineral</span>
                  </template>
                  <el-menu-item index="2-4-2-1"  @click="linkCrearMaterial()">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                    <span>LA10-Crear Lotes Mineral</span>
                  </el-menu-item>
                  <el-menu-item index="2-4-2-2">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                    <span>LA12-Modificar Lotes Mineral</span>
                  </el-menu-item>
                  <el-menu-item index="2-4-2-20" @click="linkCrearSalidaAlmacen()">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                    <span>LA14-Visualizar Lotes Mineral</span>
                  </el-menu-item>
                </el-submenu>                
                <el-submenu index="2-4-3">
                  <template slot="title">
                    <i class="fa fa-caret-right" style="width:10px"></i>
                    <img class="el-folder"/>
                    <span slot="title">Salida Material</span>
                  </template>
                  <el-menu-item index="2-4-3-1" @click="linkCrearSalidaAlmacen()">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                    <span>LA03-Crear Salida Material</span>
                  </el-menu-item>
                  <el-menu-item index="2-4-3-2" @click="linkModificarSalidaAlmacen()">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                    <span>LA03-Modificar Salida Material</span>
                  </el-menu-item>
                  <el-menu-item index="2-4-3-3" @click="linkVisualizarSalidaAlmacen()">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                   <span>LA03-Visualizar Salida Material</span>
                  </el-menu-item>
                  <el-menu-item index="2-4-3-4" @click="linkAprobarSalidaAlmacen()">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                   <span>LA04-Aprobar Salida Material</span>
                  </el-menu-item>
                  <el-menu-item index="2-4-3-5" @click="linkDespachoSalidaAlmacen()">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                   <span>LA04-Despacho Material</span>
                  </el-menu-item>
                </el-submenu>
              </el-submenu>
              <el-submenu index="2-5">
                <template slot="title">
                  <i class="fa fa-caret-right" style="width:10px"></i>
                  <img class="el-folder"/>
                  <span slot="title">Maestro datos</span>
                </template>
                <el-submenu index="2-5-1">
                  <template slot="title">
                    <i class="fa fa-caret-right" style="width:10px"></i>
                    <img class="el-folder"/>
                    <span slot="title">Compras</span>
                  </template>
                  <el-menu-item index="2-5-1-1">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                    <span>MC01-Crear Proveedor</span>
                  </el-menu-item>
                  <el-menu-item index="2-5-1-2">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                    <span>MC02-Modificar Proveedor</span>
                  </el-menu-item>
                  <el-menu-item index="2-5-1-3">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                    <span>MC04-Visualizar Proveedor</span>
                  </el-menu-item>
                </el-submenu>
                <el-submenu index="2-5-1">
                  <template slot="title">
                    <i class="fa fa-caret-right" style="width:10px"></i>
                    <img class="el-folder"/>
                    <span slot="title">Almacen</span>
                  </template>
                  <el-menu-item index="2-5-1-1">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                    <span>MA01-Crear Material</span>
                  </el-menu-item>
                  <el-menu-item index="2-5-1-2">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                    <span>MA02-Modificar Material</span>
                  </el-menu-item>
                  <el-menu-item index="2-5-1-3">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                    <span>MA04-Visualizar Material</span>
                  </el-menu-item>
                </el-submenu>
              </el-submenu>
            </el-submenu>
            <el-submenu index="7">
              <template slot="title">
                <i class="fa fa-caret-right" style="width:10px"></i>
                <img class="el-folder"/>
                <span >HR-Planilla</span>
              </template>
              <el-submenu index="7-1">
                <template slot="title">
                  <i class="fa fa-caret-right" style="width:10px"></i>
                  <img class="el-folder"/>
                  <span >Empleado</span>
                </template>
                <el-menu-item index="7-1-1" @click="linkCrearEmpleado">
                  <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                  <span>HR01-Crear Empleado</span>
                </el-menu-item>
                <el-menu-item index="7-1-2">
                  <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                  <span>HR02-Modificar Empleado</span>
                </el-menu-item>
                <el-menu-item index="7-1-3">
                  <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                  <span>HR03-Visualizar Empleado</span>
                </el-menu-item>
              </el-submenu>
              <el-submenu index="7-2">
                <template slot="title">
                  <i class="fa fa-caret-right" style="width:10px"></i>
                  <img class="el-folder"/>
                  <span >Maestro Datos</span>
                </template>
                <el-menu-item index="7-2-1">
                  <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                  <span>HR04-Crear Conceptos</span>
                </el-menu-item>
                <el-menu-item index="7-2-2">
                  <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                  <span>HR05-Modificar Conceptos</span>
                </el-menu-item>
                <el-menu-item index="7-2-3">
                  <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                  <span>HR06-Visualizar Conceptos</span>
                </el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="fa fa-caret-right" style="width:10px"></i>
                <img class="el-folder"/>
                <span >CC-Costos-Presupuestos</span>
              </template>
              <el-submenu index="3-1">
                <template slot="title">
                  <i class="fa fa-caret-right" style="width:10px"></i>
                  <img class="el-folder"/>
                  <span >Costos-Gastos</span>
                </template>
                <el-menu-item index="3-1-1">
                  <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                  <span>CC01-Ingreso de Datos</span>
                </el-menu-item>
                <el-menu-item index="3-1-2">
                  <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                  <span>CC02-Costeo de Lotes</span>
                </el-menu-item>
                <el-menu-item index="3-1-3">
                  <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                  <span>CC03-Armado de Rumas</span>
                </el-menu-item>
                <el-menu-item index="3-1-4">
                  <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                  <span>CC04-Costeo de Rumas</span>
                </el-menu-item>
                <el-menu-item index="3-1-5">
                  <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                  <span>CC05-Proceso del Costeo Mensual</span>
                </el-menu-item>
                <el-menu-item index="3-1-6">
                  <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                  <span>CC06-Distribución de Costos y Gastos</span>
                </el-menu-item>
                <el-menu-item index="3-1-7">
                  <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                  <span>CC07-Tranferencias de Costos y Gastos</span>
                </el-menu-item>
             </el-submenu>
             <el-submenu index="3-2">
                <template slot="title">
                  <i class="fa fa-caret-right" style="width:10px"></i>
                  <img class="el-folder"/>
                  <span >Presupuestos</span>
                </template>
                <el-menu-item index="3-2-1">
                  <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                  <span>CP01-Crear Presupuesto anual</span>
                </el-menu-item>
                <el-menu-item index="3-2-2">
                  <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                  <span>CP02-Ingreso Presupuesto</span>
                </el-menu-item>
                <el-menu-item index="3-2-3">
                  <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                  <span>CP03-Modificar Presupuesto</span>
                </el-menu-item>
                <el-menu-item index="3-2-4">
                  <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                  <span>CP04-Datos Estadisticos</span>
                </el-menu-item>
             </el-submenu>
             
             <el-submenu index="3-2">
                <template slot="title">
                  <i class="fa fa-caret-right" style="width:10px"></i>
                  <img class="el-folder"/>
                  <span >Activos Fijos</span>
                </template>
                <el-menu-item index="3-2-1">
                  <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                  <span>CP01-Crear Activos Fijos</span>
                </el-menu-item>
                <el-menu-item index="3-2-2">
                  <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                  <span>CP02-Modificar Activos Fijos</span>
                </el-menu-item>
                <el-menu-item index="3-2-3">
                  <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                  <span>CP03-Ingreso Datos de Deprecación</span>
                </el-menu-item>
             </el-submenu>
             <el-submenu index="3-3">
                <template slot="title">
                  <i class="fa fa-caret-right" style="width:10px"></i>
                  <img class="el-folder"/>
                  <span >Maestro datos</span>
                </template>
                <el-menu-item index="3-3-1">
                  <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                  <span>CM01-Centro Costos Visualización</span>
                </el-menu-item>
                <el-menu-item index="3-3-2">
                  <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                  <span>CM02-Centro Costos Grupo</span>
                </el-menu-item>
                <el-menu-item index="3-3-3">
                  <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                  <span>CP04-Datos Estadisticos</span>
                </el-menu-item>
                <el-menu-item index="3-3-4">
                  <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                  <span>CM05-Distribución de Costos</span>
                </el-menu-item>
                <el-menu-item index="3-3-5">
                  <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                  <span>CM06-Transferncia de Costos</span>
                </el-menu-item>
                <el-menu-item index="3-3-6">
                  <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                  <span>CM07-Elemento de Costos Primario</span>
                </el-menu-item>
                <el-menu-item index="3-3-7">
                  <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                  <span>CM08-Modificar Elemento de Costos Primario</span>
                </el-menu-item>
                <el-menu-item index="3-3-8">
                  <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                  <span>CM09-Visualizar Elemento de Costos Primario</span>
                </el-menu-item>
             </el-submenu>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title">
                <i class="fa fa-caret-right" style="width:10px"></i>
                <img class="el-folder"/>
                <span>CO-Comercial</span>
              </template>
              <el-submenu index="4-1">
                <template slot="title">
                  <i class="fa fa-caret-right" style="width:10px"></i>
                  <img class="el-folder"/>
                  <span>Balanza</span>
                </template>
                <el-menu-item index="4-1-1">
                  <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                  <span>OB01-Crear lotes de  mineral</span>
                </el-menu-item>
                <el-menu-item index="4-1-2">
                  <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                  <span>OB02-Modificar lotes de mineral</span>
                </el-menu-item>
                <el-menu-item index="4-1-3">
                  <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                  <span>OB04-Visualizar lotes de mineral</span>
                </el-menu-item>
            </el-submenu>
              <el-submenu index="4-2">
                  <template slot="title">
                    <i class="fa fa-caret-right" style="width:10px"></i>
                    <img class="el-folder"/>
                    <span>Laboratorio</span>
                  </template>
                  <el-menu-item index="4-2-1">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                    <span>OL01-Ingreso de leyes AU - AG</span>
                  </el-menu-item>
                  <el-menu-item index="4-2-2">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                    <span>OL02-Modificación de leyes AU - AG</span>
                  </el-menu-item>
                  <el-menu-item index="4-2-3">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                    <span>OL03-Visualización de leyes AU - AG</span>
                  </el-menu-item>
                  <el-menu-item index="4-2-4">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                    <span>OL05-Ingreso de leyes referenciales</span>
                  </el-menu-item>
                  <el-menu-item index="4-2-5">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                    <span>OL06-Visualización de leyes referenciales</span>
                  </el-menu-item>
              </el-submenu>
              <el-submenu index="4-3">
                  <template slot="title">
                    <i class="fa fa-caret-right" style="width:10px"></i>
                    <img class="el-folder"/>
                    <span>Comercial</span>
                  </template>
                  <el-menu-item index="4-3-1">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                    <span>OC01-Ingreso datos comerciales</span>
                  </el-menu-item>
                  <el-menu-item index="4-3-2">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                    <span>OC02-Modificación de datos comerciales</span>
                  </el-menu-item>
                  <el-menu-item index="4-3-3">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                    <span>OC04-Visualiación de datos comerciales</span>
                  </el-menu-item>
              </el-submenu>
               <el-submenu index="4-4">
                  <template slot="title">
                    <i class="fa fa-caret-right" style="width:10px"></i>
                    <img class="el-folder"/>
                    <span>Acopio</span>
                  </template>
                  <el-menu-item index="4-4-1">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                    <span>OC01-Ingreso datos comerciales</span>
                    OA01-Crear acopiadores</el-menu-item>
                  <el-menu-item index="4-4-2">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                    <span>OC01-Ingreso datos comerciales</span>
                    OA02-Crear zonas</el-menu-item>
                  <el-menu-item index="4-4-3">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                    <span>OC01-Ingreso datos comerciales</span>
                    OA04-Ingreso de gastos de acopio</el-menu-item>
              </el-submenu>
              <el-submenu index="4-5">
                  <template slot="title">
                    <i class="fa fa-caret-right" style="width:10px"></i>
                    <img class="el-folder"/>
                    <span>Reportes</span>
                  </template>
                  <el-menu-item index="4-5-1">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                    <span>OR01-Reporte de Ingreso Mineral</span>
                  </el-menu-item>
                  <el-menu-item index="4-5-2">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                    <span>OR02-Reporte de Mineral en Finos</span>
                  </el-menu-item>
                  <el-menu-item index="4-5-3">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                    <span>OR03-Reporte Mineral Comercial</span>
                  </el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-submenu index="5">
              <template slot="title">
                <i class="fa fa-caret-right" style="width:10px"></i>
                <img class="el-folder"/>
                <span>OP-Operaciones</span>
              </template>
              <el-menu-item index="5-1">
                <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                <span>OP01-Lotes de Mineral</span>
              </el-menu-item>
              <el-menu-item index="5-2">
                <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                <span>OP02-Armado de Rumas</span>
              </el-menu-item>
              <el-menu-item index="5-3">
                <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                <span>OP03-Costeo de Rumas</span>
              </el-menu-item>
              <el-menu-item index="5-4">
                <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                <span>OP04-Costeo de Mineral</span>
              </el-menu-item>
              <el-menu-item index="5-5">
                <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                <span>OP05-Resumen de costeo</span>
              </el-menu-item>
            </el-submenu>
            <el-submenu index="6">
              <template slot="title">
                <i class="fa fa-caret-right" style="width:10px"></i>
                <img class="el-folder"/>
                <span>XX-Configuración</span>
              </template>
              <el-submenu index="6-1">
                <template slot="title">
                  <i class="fa fa-caret-right" style="width:10px"></i>
                  <img class="el-folder"/>
                  <span>Entidad</span>
                </template>
                <el-menu-item index="6-1-1">
                  <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                  <span>XA01-Compañía</span>
                </el-menu-item>
                <el-menu-item index="6-1-2">
                  <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                  <span>XA02-Plan de Cuentas Local</span>
                </el-menu-item>
                <el-menu-item index="6-1-3">
                  <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                  <span>XA03-Plan de Cuentas Corporativo</span>
                </el-menu-item> 
                <el-submenu index="6-1-4">
                  <template slot="title">
                    <i class="fa fa-caret-right" style="width:10px"></i>
                    <img class="el-folder"/>
                    <span>XA03-Pais</span>
                  </template>
                  <el-menu-item index="6-1-4-1">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                    <span>P01-Crear</span>
                  </el-menu-item>
                  <el-menu-item index="6-1-4-2">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                    <span>P02-Modificar</span>
                  </el-menu-item>
                  <el-menu-item index="6-1-4-3">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                    <span>P03-Visualizar</span>
                  </el-menu-item>                
                </el-submenu>  
                <el-menu-item index="6-1-5">
                  <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                  <span>XA05-Metodo de Valuacion</span>
                </el-menu-item>             
                <el-menu-item index="6-1-6">
                  <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                  <span>XA06-Categoria de Cuentas</span>
                </el-menu-item>             
                <el-menu-item index="6-1-7">
                  <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                  <span>XA07-Codigo Agrupamiento Costo</span>
                </el-menu-item>             
                <el-menu-item index="6-1-8">
                  <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                  <span>XA08-Codigo EEFF</span>
                </el-menu-item>                         
              </el-submenu>
              <el-submenu index="6-2">
                  <template slot="title">
                    <i class="fa fa-caret-right" style="width:10px"></i>
                    <img class="el-folder"/>
                    <span>Maestro data</span>
                  </template>
                  <el-menu-item index="6-2-1">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                    <span>XB01-Bancos</span>
                  </el-menu-item>
                  <el-menu-item index="6-2-2">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                    <span>XB02-Monedas</span>
                  </el-menu-item>
                  <el-menu-item index="6-2-3">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                    <span>XB03-Tipo Doc. Identidad</span>
                  </el-menu-item>                
                  <el-menu-item index="6-2-4">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                    <span>XB04-Tipo de Comprobante de Pago</span>
                  </el-menu-item>                
                  <el-menu-item index="6-2-5">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                    <span>XB05-Codigo Aduana</span>
                  </el-menu-item>                
                  <el-menu-item index="6-2-6">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                    <span>XB06-Unidad de Medida</span>
                  </el-menu-item>                
                  <el-menu-item index="6-2-7">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                    <span>XB07-Cuentas Secundarias</span>
                  </el-menu-item>                
                  <el-menu-item index="6-2-8">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                    <span>XB08-Metodo de Depreciacion</span>
                  </el-menu-item>                
                  <el-menu-item index="6-2-9">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                    <span>XB09-Tipo de Activo Fijo</span>
                  </el-menu-item>                
                  <el-menu-item index="6-2-10">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                    <span>XB10-Estado Activo Fijo</span>
                  </el-menu-item>                
                  <el-menu-item index="6-2-11">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                    <span>XB11-Estado Activo Fijo</span>
                  </el-menu-item>                
                </el-submenu>  
                <el-submenu index="6-3">
                  <template slot="title">
                    <i class="fa fa-caret-right" style="width:10px"></i>
                    <img class="el-folder"/>
                    <span>Parametros comerciales</span>
                  </template>
                  <el-menu-item index="6-2-1">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                    <span>XC01-Por zona</span>
                  </el-menu-item>
                  <el-menu-item index="6-2-2">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                    <span>XC02-Por proveedores</span>
                  </el-menu-item>
                  <el-menu-item index="6-2-3">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                    <span>XC03-Por precio internacional</span>
                  </el-menu-item>                
                  <el-menu-item index="6-2-4">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                    <span>XC04-Por factor de conversion</span>
                  </el-menu-item>               
                </el-submenu>
                <el-submenu index="6-4">
                  <template slot="title">
                    <i class="fa fa-caret-right" style="width:10px"></i>
                    <img class="el-folder"/>
                    <span>Banco pagador</span>
                  </template>
                  <el-menu-item index="6-4-1">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                    <span>P01-Crear</span>
                  </el-menu-item>
                  <el-menu-item index="6-4-2">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                    <span>P02-Modificar</span>
                  </el-menu-item>
                  <el-menu-item index="6-4-3">
                    <img src="../../images/sheet.png" style="width:17px; height:15px; cursor: pointer;" @click="linkRoute('/menu/inicio')"/> 
                    <span>P03-Visualizar</span>
                  </el-menu-item>                              
                </el-submenu> 
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
      <el-col :span="dimensionContent" style="padding: 0px 1%; overflow-y:auto; weight:100%; height:100%; background:#ffffff;">
        <router-view></router-view>
      </el-col>
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
  border-bottom:none !important;
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
    min-width: 200px;
}


/* .el-menu-item *  */
</style>
