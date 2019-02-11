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
                <i class="el-icon-caret-right"></i>
                <span>FI-FINANZAS</span>
              </template>
              <el-submenu index="1-1">
                <template slot="title">CUENTAS POR PAGAR</template>
                <el-menu-item index="1-1-1"
                @click="linkRoute()" >FP01-Ingreso Documento</el-menu-item>
                <el-menu-item index="1-1-2">FP02-Modificar Documento</el-menu-item>
                <el-menu-item index="1-1-3">FP03-Visualizar Documento</el-menu-item>
                <el-menu-item index="1-1-4">FP10-Reconciliación</el-menu-item>
                <el-menu-item index="1-1-5"
                @click="linkRouterunpagos()">FP04-Pagos</el-menu-item>
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
                 <el-submenu index="1-5-4">
                  <template slot="title">MASTER PROVEEDOR</template>
                  <el-menu-item index="1-5-4-1" @click="linkCrearProveedor()">
                    <i class="el el-icon-document"></i>
                    <span> MP01-Crear Proveedor</span>
                    
                    </el-menu-item>
                  <el-menu-item index="1-5-4-2" @click="linkModificarProveedor()">
                    <i class="el el-icon-edit"></i>
                    <span> MP02-Modificar Proveedor</span>                    
                    </el-menu-item>
                  <el-menu-item index="1-5-4-3" @click="linkVisualizarProveedor()">
                    <i class="el el-icon-view"></i>
                    <span> MP03-Visualizar Proveedor</span>
                   </el-menu-item>
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
                  <template slot="title">LIBRO DE INVENTARIOS</template>
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
                <el-menu-item index="2-1-1" @click="linkCrearRequisicion()">LR01-Crear Requerimiento de Compra</el-menu-item>
                <el-menu-item index="2-1-2" @click="linkModificarRequisicion()">LR02-Modificar Requerimiento de Compras</el-menu-item>
                <el-menu-item index="2-1-3" @click="linkVisualizarRequisicion()">LR04-Visualizar Requerimiento de Compras</el-menu-item>
                <el-menu-item index="2-1-4" @click="linkVisualizarModificaRequisicion()">LR07-Aceptacion del Servicio</el-menu-item>
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
                <span >CP-COSTOS Y PRESUPUESTOS</span>
              </template>
              <el-submenu index="3-1">
                <template slot="title">
                  <span >COSTOS Y GASTOS</span>
                </template>
                <el-menu-item index="3-1-1">CC01-Ingreso de Datos</el-menu-item>
                <el-menu-item index="3-1-2">CC02-Costeo de Lotes</el-menu-item>
                <el-menu-item index="3-1-3">CC03-Armado de Rumas</el-menu-item>
                <el-menu-item index="3-1-4">CC04-Costeo de Rumas</el-menu-item>
                <el-menu-item index="3-1-5">CC05-Proceso del Costeo Mensual</el-menu-item>
                <el-menu-item index="3-1-6">CC06-Distribución de Costos y Gastos</el-menu-item>
                <el-menu-item index="3-1-7">CC07-Tranferencias de Costos y Gastos</el-menu-item>
             </el-submenu>
             <el-submenu index="3-2">
                <template slot="title">
                  <span >PRESUPUESTO</span>
                </template>
                <el-menu-item index="3-2-1">CP01-Crear Presupuesto anual</el-menu-item>
                <el-menu-item index="3-2-2">CP02-Ingreso Presupuesto</el-menu-item>
                <el-menu-item index="3-2-3">CP03-Modificar Presupuesto</el-menu-item>
                <el-menu-item index="3-2-4">CP04-Datos Estadisticos</el-menu-item>
             </el-submenu>
             <el-submenu index="3-3">
                <template slot="title">
                  <span >MAESTROS DATOS</span>
                </template>
                <el-menu-item index="3-3-1">CM01-Centro Costos Visualización</el-menu-item>
                <el-menu-item index="3-3-2">CM02-Centro Costos Grupo</el-menu-item>
                <el-menu-item index="3-3-3">CM04-Centro Costos Grupo Visualización</el-menu-item>
                <el-menu-item index="3-3-4">CM05-Distribución de Costos</el-menu-item>
                <el-menu-item index="3-3-5">CM06-Transferncia de Costos</el-menu-item>
                <el-menu-item index="3-3-6">CM07-Elemento de Costos Primario</el-menu-item>
                <el-menu-item index="3-3-7">CM08-Modificar Elemento de Costos Primario</el-menu-item>
                <el-menu-item index="3-3-8">CM09-Visualizar Elemento de Costos Primario</el-menu-item>
             </el-submenu>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>CO-COMERCIAL</span>
              </template>
              <el-submenu index="4-1">
                <template slot="title">
                  <span>BALANZA</span>
                </template>
                <el-menu-item index="4-1-1">OB01-Crear lotes de  mineral</el-menu-item>
                <el-menu-item index="4-1-2">OB02-Modificar lotes de mineral</el-menu-item>
                <el-menu-item index="4-1-3">OB04-Visualizar lotes de mineral</el-menu-item>
            </el-submenu>
              <el-submenu index="4-2">
                  <template slot="title">
                    <span>LABORATORIO</span>
                  </template>
                  <el-menu-item index="4-2-1">OL01-Ingreso de leyes AU - AG</el-menu-item>
                  <el-menu-item index="4-2-2">OL02-Modificación de leyes AU - AG</el-menu-item>
                  <el-menu-item index="4-2-3">OL03-Visualización de leyes AU - AG</el-menu-item>
                  <el-menu-item index="4-2-4">OL05-Ingreso de leyes referenciales</el-menu-item>
                  <el-menu-item index="4-2-5">OL06-Visualización de leyes referenciales</el-menu-item>
              </el-submenu>
              <el-submenu index="4-3">
                  <template slot="title">
                    <span>COMERCIAL</span>
                  </template>
                  <el-menu-item index="4-3-1">OC01-Ingreso datos comerciales</el-menu-item>
                  <el-menu-item index="4-3-2">OC02-Modificación de datos comerciales</el-menu-item>
                  <el-menu-item index="4-3-3">OC04-Visualiación de datos comerciales</el-menu-item>
              </el-submenu>
               <el-submenu index="4-4">
                  <template slot="title">
                    <span>ACOPIO</span>
                  </template>
                  <el-menu-item index="4-4-1">OA01-Crear acopiadores</el-menu-item>
                  <el-menu-item index="4-4-2">OA02-Crear zonas</el-menu-item>
                  <el-menu-item index="4-4-3">OA04-Ingreso de gastos de acopio</el-menu-item>
              </el-submenu>
              <el-submenu index="4-5">
                  <template slot="title">
                    <span>REPORTES</span>
                  </template>
                  <el-menu-item index="4-5-1">OR01-Reporte de Ingreso Mineral</el-menu-item>
                  <el-menu-item index="4-5-2">OR02-Reporte de Mineral en Finos</el-menu-item>
                  <el-menu-item index="4-5-3">OR03-Reporte Mineral Comercial</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-submenu index="5">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>CO-OPERACIONES</span>
              </template>
              <el-menu-item index="5-1">OP01-Lotes de Mineral</el-menu-item>
              <el-menu-item index="5-2">OP02-Armado de Rumas</el-menu-item>
              <el-menu-item index="5-3">OP03-Costeo de Rumas</el-menu-item>
              <el-menu-item index="5-4">OP04-Costeo de Mineral</el-menu-item>
              <el-menu-item index="5-5">OP05-Resumen de costeo</el-menu-item>
            </el-submenu>
            <el-submenu index="6">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>CO-CONFIGURACIÓN</span>
              </template>
              <el-submenu index="6-1">
                <template slot="title">ENTIDAD</template>
                <el-menu-item index="6-1-1">XA01-Compañía</el-menu-item>
                <el-menu-item index="6-1-2">XA02-Plan de Cuentas Local</el-menu-item>
                <el-menu-item index="6-1-3">XA03-Plan de Cuentas Corporativo</el-menu-item> 
                <el-submenu index="6-1-4">
                  <template slot="title">XA03-Pais</template>
                  <el-menu-item index="6-1-4-1">P01-Crear</el-menu-item>
                  <el-menu-item index="6-1-4-2">P02-Modificar</el-menu-item>
                  <el-menu-item index="6-1-4-3">P03-Visualizar</el-menu-item>                
                </el-submenu>  
                <el-menu-item index="6-1-5">XA05-Metodo de Valuacion</el-menu-item>             
                <el-menu-item index="6-1-6">XA06-Categoria de Cuentas</el-menu-item>             
                <el-menu-item index="6-1-7">XA07-Codigo Agrupamiento Costo</el-menu-item>             
                <el-menu-item index="6-1-8">XA08-Codigo EEFF</el-menu-item>                         
              </el-submenu>
              <el-submenu index="6-2">
                  <template slot="title">MASTER DATA</template>
                  <el-menu-item index="6-2-1">XB01-Bancos</el-menu-item>
                  <el-menu-item index="6-2-2">XB02-Monedas</el-menu-item>
                  <el-menu-item index="6-2-3">XB03-Tipo Doc. Identidad</el-menu-item>                
                  <el-menu-item index="6-2-4">XB04-Tipo de Comprobante de Pago</el-menu-item>                
                  <el-menu-item index="6-2-5">XB05-Codigo Aduana</el-menu-item>                
                  <el-menu-item index="6-2-6">XB06-Unidad de Medida</el-menu-item>                
                  <el-menu-item index="6-2-7">XB07-Cuentas Secundarias</el-menu-item>                
                  <el-menu-item index="6-2-8">XB08-Metodo de Depreciacion</el-menu-item>                
                  <el-menu-item index="6-2-9">XB09-Tipo de Activo Fijo</el-menu-item>                
                  <el-menu-item index="6-2-10">XB10-Estado Activo Fijo</el-menu-item>                
                  <el-menu-item index="6-2-11">XB11-Estado Activo Fijo</el-menu-item>                
                </el-submenu>  
                <el-submenu index="6-3">
                  <template slot="title">PARAMETROS COMERCIALES</template>
                  <el-menu-item index="6-2-1">XC01-Por zona</el-menu-item>
                  <el-menu-item index="6-2-2">XC02-Por proveedores</el-menu-item>
                  <el-menu-item index="6-2-3">XC03-Por precio internacional</el-menu-item>                
                  <el-menu-item index="6-2-4">XC04-Por factor de conversion</el-menu-item>               
                </el-submenu>
                <el-submenu index="6-4">
                  <template slot="title">BANCO PAGADOR</template>
                  <el-menu-item index="6-4-1">P01-Crear</el-menu-item>
                  <el-menu-item index="6-4-2">P02-Modificar</el-menu-item>
                  <el-menu-item index="6-4-3">P03-Visualizar</el-menu-item>                              
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
      <div style="background:#f9fafc; width: 100%;">
        
        <ol  style="margin-left: -1.5rem;background: linear-gradient(rgb(229, 241, 247) 0%, rgb(255, 255, 255) 100%);    margin-bottom: 0rem !important;">
           <quickaccessmenu/>
        </ol>

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
.el-menu{
  background: #f5f7f8;
  overflow-y:auto; 
  weight:100%;
   height:100%;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 270px !important;
    min-height: 400px;
}
/* .el-menu-item *  */
</style>
