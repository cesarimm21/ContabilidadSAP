<template>
  <div class="aprobador-pr">
    <ol  style="margin-left: -1.5rem;background: linear-gradient(rgb(229, 241, 247) 0%, rgb(255, 255, 255) 100%);    margin-bottom: 0rem !important;">
        <quickaccessmenu v-on:guardarTodo="guardarTodo($event)"  v-on:validarView="validarView()" v-on:backPage="backPage($event)"  v-on:reloadpage="reloadpage($event)"/>
    </ol>
    <el-card class="box-card">
        <div slot="header" class="headercard">
            <span class="labelheadercard" >Aprobador Requisición</span>
            <el-button class="buttonfilter btn btn-outline-secondary orange" style="margin-top: -3px;" @click="Buscar()">
                <img class="imagenfilter" src="../../../../images/buscari.png" style="margin-left: 0px;width: 15px;height: 16px;" alt="" >
            </el-button>
        </div>
        <div class="row bodycard">
           <div class="container">
                <div class="row" style="margin-top: 3px;">
                    <div class="col-sm-9" >
                        <div class="form-group row ">
                            <label class="el-form-item__label col-md-2" >Código</label>
                            <div class="col-md-2 grupolabel">
                                <div class="input-group mb-3" >
                                <el-input size ="small"  v-model="formBusqueda.strRequis_NO"  placeholder="">
                                </el-input>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row Second">
                            <label class="el-form-item__label col-md-2" >Fecha Desde</label>
                            <div class="col-md-2 grupolabel">
                                <div class="input-group mb-3" >
                                    <el-date-picker
                                        v-model="fechaDesde"
                                        size="mini"
                                        style="width:128px !important">
                                    </el-date-picker>
                                </div>
                            </div>    
                            <label class="el-form-item__label col-md-1" >Hasta</label>
                            <div class="col-md-2 grupolabel">
                                <div class="input-group mb-3" >
                                    <el-date-picker
                                        v-model="fechaHasta"
                                        size="mini"
                                        style="width:128px !important"
                                       >
                                    </el-date-picker>
                                </div>
                            </div>                   
                        </div>    
                    </div>
                    <div class="col-sm-10">
                        <div class="form-group row Third">
                            <label class="el-form-item__label col-md-2" >Descripción</label>
                            <div class="col-md-6 grupolabel" style="margin-left: -17px;">
                                <div class="input-group mb-9">
                                    <el-input size ="small" @focus="activar_descripcion" v-model="formBusqueda.strDesc_Header"  placeholder="">                
                                    </el-input>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br/>
                <div class="row">
                    <div class="col-sm-12" >
                        <el-card class="box-card" style="margin-left: -10px;">
                            <div slot="header" class="headercard" style="margin-top: -4px;">
                                <buttons-accions v-on:handleClickInParent="handleClickInParent()"></buttons-accions>
                            </div>
                            <div class="col-md-12" >
                                <div class="row bodycard" style="background: white;margin-top: 0px;">
                                    <el-table
                                        ref="missionTable"
                                        :max-height="sizeScreen"
                                        :data="tableData" 
                                         highlight-current-row
                                         @current-change="handleCurrentChange"
                                        stripe  :default-sort = "{prop: 'date', order: 'descending'}"
                                        class="ExcelTable2007">
                                        <el-table-column type="index" width="38">
                                        </el-table-column>
                                        <el-table-column  sortable prop="strRequis_NO" width="100" label="Código">
                                            <template scope="scope">
                                            <label v-bind:style="{background:cell_ocultar,width:'100%',margin: '0rem'}"  @click="alerta(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ scope.row.strRequis_NO }}</label>
                                            </template>
                                        </el-table-column>  
                                        <el-table-column
                                            prop="strTipReq_Desc" sortable  width="120"
                                            label="Tipo Requisición">
                                            <template scope="scope">
                                                <label v-bind:style="{background:cell_ocultar,width:'100%',margin: '0rem'}" @click="clickcategorialinea(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ scope.row.strTipReq_Desc }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            prop="strWHS_Cod" sortable width="100"
                                            label="Codigo Almacen">
                                            <template scope="scope">
                                                <label style="width:100%" v-bind:style="{width:'100%',margin: '0rem'}"  @click="clickcuentacontable(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ scope.row.strWHS_Cod }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            prop="strWHS_Desc" sortable width="150"
                                            label="Almacen">
                                            <template scope="scope">
                                                <label style="width:100%" v-bind:style="{width:'100%',margin: '0rem'}" @click="clickcuentacontable(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ scope.row.strWHS_Desc }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            prop="strDesc_Header" sortable 
                                            label="Descripción">
                                            <template scope="scope">
                                                <label style="width:100%" @click="clickmaterialdescripcion(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ scope.row.strDesc_Header }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            prop="dtmRequested_Date" sortable width="100"
                                            label="Fecha">
                                            <template scope="scope">
                                                <el-date-picker
                                                    type="date"
                                                    v-if="bln_tbl_fecha_estimada  && (scope.row === editing.row) 
                                                && (scope.column.property === editing.column)" @blur="handleBlur(scope.row)" v-focus size="small" v-model="scope.row.dtmRequested_Date" >
                                                </el-date-picker>
                                                <label style="width:100%" v-else @click="clickfechaestimada(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ getParseDate(scope.row.dtmRequested_Date) }}</label>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </div>
                        </el-card>
                    </div>
                </div>
            </div>
        </div>
    </el-card>
    <div class="footer1">
        <div class="row">
            <div class="col-sm-9" style="text-align:left" >
                <div class="col-sm-2">
                    <b-progress v-if="vifprogress" :max="100" variant="success"   show-progress animated >
                         <b-progress-bar :value="valuem" :label="valuem + '%'" />
                    </b-progress>
                </div>
                <img  src="../../../../images/save.png" v-if="issave" style="width:16px; height:17px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 1.3rem;" @click="fnOcultar()"/>
                <img src="../../../../images/save.png" v-if="iserror" style="width:16px; height:17px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 1.3rem;" @click="fnOcultar()"/>
                <span class="footertext2" style="" >{{textosave}}</span> 
            </div>
            <div class="col-sm-3">
                <div style="text-align:right">
                    <img src="../../../../images/collapse_derecha.png"  style="width:8px; height:10px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.3rem;" @click="fnOcultar()"/>
                    <div class="v-separator" style="    margin-bottom: -1px;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.5rem;"></div>
                    <span class="footertext2">SQV1</span>
                    <div class="v-separator" style="    margin-bottom: -1px;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.5rem;"></div>
                    <span class="footertext2">PQM1</span>
                    <div class="v-separator" style="    margin-bottom: -1px;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.5rem;"></div>
                    <span class="footertext2">OVR1</span>
                    <div class="v-separator" style="    margin-bottom: -1px;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.5rem;"></div>
                    <i class="fa fa-unlock" aria-hidden="true" style="margin-left: 0.3rem;margin-right: 1rem;color:#7b7b7b"></i>
                </div>
            </div>
        </div>
        
    </div>
    <el-dialog
        title="Proveedores"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <el-card class="box-card">
              <div slot="header" class="headercard">
                  <span class="labelheadercard" >Buscar Proveedor</span>
              </div>
              <div class="row bodycard">
                  <div class="col-md-12">
                        <div class="form-group row">
                            <label class="el-form-item__label col-md-3" >Proveedor Codigo</label>
                            <div class="col-md-2 grupolabel">
                                <div class="input-group mb-3" >
                                <el-input size ="small"   placeholder="">
                                <el-button slot="append" style="padding: 3px 3px !important;background: #fff5c4;
                            background: -webkit-gradient(left top, left bottom, color-stop(0%, #fff5c4), color-stop(100%, #ffee9f));
                            background: -webkit-gradient(linear, left top, left bottom, from(#fff5c4), to(#ffee9f));
                            background: linear-gradient(to bottom, #fff5c4 0%, #ffee9f 100%);" icon="fa fa-search"
                                            > </el-button>
                                </el-input>
                                </div>
                            </div>
                        </div>
                  </div>
              </div>
              <el-table
                :data="tableData"
                v-bind:class="{selected: currentRow === tableData}"
                stripe  :default-sort = "{prop: 'date', order: 'descending'}"
                style="width: 100%" class="ExcelTable2007"
                height="250"
                :current-row-key=1
                row-key="1"
                @current-change="handleCurrentChange">
                <el-table-column   prop="date" label="Codigo" width="180">
                </el-table-column>  
                <el-table-column  prop="name" label="Descripción" style="width: 70% !important;">
                </el-table-column> 
                </el-table>
          </el-card>
        <span slot="footer" class="dialog-footer">
            <img src="../../../../images/check.png" style="width:13px; height:15px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.6rem;"/>
            <img src="../../../../images/close.png" style="width:17px; height:15px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.6rem;" @click="dialogVisible = false"/>
        </span>
    </el-dialog>

    <!--DIALOG BUSQUEDA COMPAÑIA-->
    <el-dialog title="Busqueda compañia" :visible.sync="dialogCompania" @close="closeCompania" size="small" >
      <bcompania v-on:companiaSeleccionado="companiaSeleccionado($event)">
      </bcompania>
    </el-dialog>

   <!--DIALOG BUSQUEDA CENTRO COSTOS-->
    <el-dialog title="Busqueda centro de costos"  :visible.sync="dialogCentroCostos" @close="closeCentroCostos" size="small" >
      <bcentrocosto v-on:centrocostoselecionado="SeleccionadoCentroCosto($event)">
      </bcentrocosto>
    </el-dialog>

    <!--DIALOG BUSQUEDA MONEDA-->
    <el-dialog title="Busqueda moneda"  :visible.sync="dialogMoneda" @close="closeMoneda" size="small" >
      <bmoneda v-on:monedaselecionado="SeleccionadoMoneda($event)">
      </bmoneda>
    </el-dialog>

     <!--DIALOG BUSQUEDA CATEGORIA CUENTA-->
    <el-dialog title="Busqueda categoria cuenta"  :visible.sync="dialogCategoriaCuenta" @close="closeCategoriaCuenta" size="small" >
      <bcategoriacuenta v-on:categoriacuentaselecionado="SeleccionadoCategoriaCuenta($event)">
      </bcategoriacuenta>
    </el-dialog>
    <!--DIALOG BUSQUEDA CATEGORIA LINEA-->
    <el-dialog title="Busqueda categoria linea"  :visible.sync="dialogCategoriaLinea" @close="closeCategoriaLinea" size="small" >
      <bcategorialinea v-on:categorialineaselecionado="SeleccionadoCategoriaLinea($event)">
      </bcategorialinea>
    </el-dialog>
     <!--DIALOG BUSQUEDA CUENTA CONTABLE-->
    <el-dialog title="Busqueda cuenta contable"  :visible.sync="dialogCuentaContable" @close="closeCuentaContable" size="small" >
      <bcuentacontable v-on:cuentacontableselecionado="SeleccionadoCuentaContable($event)">
      </bcuentacontable>
    </el-dialog>
      <!--DIALOG BUSQUEDA Material-->
    <el-dialog title="Busqueda material"  :visible.sync="dialogMaterial" @close="closeMaterial" size="small" >
      <bmaterial v-on:materialselecionado="SeleccionadoMaterial($event)">
      </bmaterial>
    </el-dialog>
     <!--DIALOG BUSQUEDA PROVEEDOR-->
    <el-dialog title="Busqueda proveedor"  :visible.sync="dialogProveedor" @close="closeProveedor" size="small" >
      <bproveedor v-on:proveedorselecionado="SeleccionadoProveedor($event)">
      </bproveedor>
    </el-dialog>
    <!--DIALOG BUSQUEDA ALMACEN-->
    <el-dialog title="Busqueda almacen"  :visible.sync="dialogAlmacen" @close="closeAlmacen" size="small" >
      <balmacen v-on:almacenseleccionado="SeleccionadoAlmacen($event)">
      </balmacen>
    </el-dialog>

    <!--DIALOG BUSQUEDA UNIDAD MEDIDA-->
    <el-dialog title="Busqueda unidad medida"  :visible.sync="dialogUnidadMedida" @close="closeUnidadMedida" size="small" >
      <bunidadmedida v-on:unidadmedidaselecionado="SeleccionadoUnidadMedida($event)">
      </bunidadmedida>
    </el-dialog>

    <!--DIALOG BUSQUEDA PRIORIDAD-->
    <el-dialog title="Busqueda prioridad"  :visible.sync="dialogPrioridad" @close="closePrioridad" size="small" >
      <bprioridad v-on:prioridadselecionado="SeleccionadoPrioridad($event)">
      </bprioridad>
    </el-dialog>
    

    
  </div>  
  
</template>
<script>
import AprobadorPRComponent from '@/components/LO-LOGISTICA/requisicion/pr_aprobador/pr_aprobador.component'
export default AprobadorPRComponent
</script>
<style scoped>
.selected{
    background: red;
}
</style>
