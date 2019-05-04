<template>
  <div class="salida-pr">
    <ol  style="margin-left: -1.5rem;background: linear-gradient(rgb(229, 241, 247) 0%, rgb(255, 255, 255) 100%);    margin-bottom: 0rem !important;">
        <quickaccessmenu v-on:guardarTodo="guardarTodo($event)" v-on:backPage="backPage($event)"  v-on:reloadpage="reloadpage($event)"/>
    </ol>
    <el-card class="box-card">
        <div slot="header" class="headercard">
            <span class="labelheadercard" >Crear Salida</span>
        </div>
        <div class="row bodycard">
            <div class="container">
                <div class="row" style="margin-top: 3px;">
                    <div class="col-sm-8" >
                        <div class="form-group row ">
                            <label class="el-form-item__label col-md-2" >Compañia</label>
                            <div class="col-md-2 grupolabel">
                                <div class="input-group mb-3" >
                                <el-input size ="small"  v-bind:class="{ error: vcompania }" @change="change()"  @blur="desactivar_compania" @focus="activar_compania" v-model="salidaModel.strCompany_Cod"  placeholder="">
                                    <el-button v-if="btnactivarcompania && !dialogCompania" slot="append" class="boton" icon="fa fa-clone" @click="loadCompania()"></el-button> 
                                </el-input>
                                </div>
                            </div>
                            <span style="font-size: 11px;margin-top: 5px;">{{descompania}}</span>
                        </div> 
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-8" >
                        <div class="form-group row ">
                            <label class="el-form-item__label col-md-2" >Tipo Movimiento</label>
                            <div class="col-md-2 grupolabel">
                                <div class="input-group mb-3" >
                                <el-input size ="small" v-bind:class="{ error: vtipomovimiento }"  @change="change()" @blur="desactivar_tipo_movimiento" @focus="activar_tipo_movimiento" v-model="salidaModel.strTypeMov_Cod"  placeholder="">
                                    <el-button v-if="btnactivartipomovimiento && !dialogTipoMovimiento" slot="append" class="boton" icon="fa fa-clone" @click="loadTipoMovimiento()"></el-button> 
                                </el-input>
                                </div>
                            </div>
                            <span style="font-size: 11px;margin-top: 5px;">{{salidaModel.strTypeMov_Desc}}</span>
                        </div> 
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-8" >
                        <div class="form-group row ">
                            <label class="el-form-item__label col-md-2" >Almacen</label>
                            <div class="col-md-2 grupolabel">
                                <div class="input-group mb-3" >
                                <el-input size ="small" v-bind:class="{ error: valmacen }"  @change="change()" @blur="desactivar_almacen" @focus="activar_almacen" v-model="salidaModel.strWHS_Cod"  placeholder="">
                                    <el-button v-if="btnactivaralmacen && !dialogAlmacen" slot="append" class="boton" icon="fa fa-clone" @click="LoadAlmacen()"></el-button> 
                                </el-input>
                                </div>
                            </div>
                            <span style="font-size: 11px;margin-top: 5px;">{{salidaModel.strWHS_Desc}}</span>
                        </div> 
                    </div>
                </div>
                <br/>
                <div class="row">
                    <div class="col-sm-12" >
                        <el-card class="box-card" style="margin-left: -10px;">
                            <div slot="header" class="headercard" style="margin-top: -4px;">
                                <buttons-accions v-on:Limpiar="Limpiar" v-on:Print="Print" v-on:Buscar="Buscar"  v-on:AscItem="AscItem" v-on:DscItem="DscItem" v-on:EliminarItem="EliminarItem()"  v-on:siguiente="siguiente()" v-on:anterior="anterior()" v-on:handleClickInParent="handleClickInParent()"></buttons-accions>
                       
                                <!-- <buttons-accions v-on:handleClickInParent="handleClickInParent()"></buttons-accions> -->
                            </div>
                            <div class="col-md-12" >
                                <div class="row bodycard" style="background: white;margin-top: 0px;">
                                    <el-table
                                        ref="missionTable"  
                                        :max-height="sizeScreen"
                                        :data="tableData1" 
                                        highlight-current-row
                                        @header-click="headerclick"
                                        @current-change="handleCurrentChange"
                                        stripe  :default-sort = "{prop: 'date', order: 'descending'}"
                                        class="ExcelTable2007">
                                        <el-table-column prop="intIssueAjust_Item"  width="40">
                                            <template scope="scope">
                                                <label style="width:100%;    margin: 0rem;" >&nbsp;{{ scope.row.intIssueAjust_Item }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column :render-header="filterstrStock_Cod"
                                            prop="strStock_Cod"  
                                            label="Material">
                                            <template scope="scope" class-name="error">
                                                <el-input  v-if="bln_tbl_material  && (scope.row === editing.row) 
                                                && (scope.column.property === editing.column)" @blur="handleBlur(scope.row)" v-focus size="small" v-model="scope.row.strStock_Cod" >
                                                <el-button slot="append" class="boton" icon="fa fa-clone" @click="LoadMaterial(scope.row)"></el-button>  
                                                </el-input>
                                                <label style="width:100%" v-else @click="clickmaterial(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ scope.row.strStock_Cod }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column :render-header="filterstrStock_Desc"
                                            prop="strStock_Desc"  width="200"
                                            label="Descripción">
                                            <template scope="scope">
                                                <el-input  v-if="bln_tbl_material_descripcion  && (scope.row === editing.row) 
                                                && (scope.column.property === editing.column)" @blur="handleBlur(scope.row)" v-focus size="small" v-model="scope.row.strStock_Desc" >
                                                </el-input>
                                                <label style="width:100%" v-else @click="clickmaterialdescripcion(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ scope.row.strStock_Desc }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            prop="fltQuantity"  width="110" :render-header="filterfltQuantity"
                                            label="Stock">
                                            <template scope="scope">
                                                <!-- <el-input-number  v-if="bln_tbl_cantidad  && (scope.row === editing.row) 
                                                && (scope.column.property === editing.column)" @blur="handleBlur(scope.row)" v-focus size="small" v-model="scope.row.fltQuantity" >
                                                </el-input-number> -->
                                                <label >&nbsp;{{ scope.row.fltQuantity }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            prop="fltIssueRequest_QTY"  width="110" :render-header="filterfltIssueRequest_QTY"
                                            label="Cantidad">
                                            <template scope="scope">
                                                <el-input-number :max="scope.row.fltQuantity" v-if="bln_tbl_cantidad  && (scope.row === editing.row) 
                                                && (scope.column.property === editing.column)" @blur="handleBlur(scope.row)" v-focus size="small" v-model="scope.row.fltIssueRequest_QTY" >
                                                </el-input-number>
                                                <label style="width:100%;" v-else @click="clickcantidad(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ scope.row.fltIssueRequest_QTY }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column :render-header="filterstrUM_Cod"
                                            prop="strUM_Cod"   width="60"
                                            label="UM">
                                            <template scope="scope">
                                                <el-input  v-if="bln_tbl_unidad_medida  && (scope.row === editing.row) 
                                                && (scope.column.property === editing.column)" @blur="handleBlur(scope.row)" v-focus size="small" v-model="scope.row.strUM_Cod" >
                                                <el-button slot="append" class="boton" icon="fa fa-clone" @click="LoadUnidadMedida(scope.row)"></el-button>  
                                                </el-input>
                                                <label style="width:100%" v-else @click="clickunidadmedida(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ scope.row.strUM_Cod }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column  :render-header="filterstrCostCenter_NO"
                                            prop="strCostCenter_NO"   
                                            label="Centro costos" >
                                            <template scope="scope" >
                                                <el-input   v-if="bln_tbl_centro_costo  && (scope.row === editing.row) 
                                                && (scope.column.property === editing.column)" @blur="handleBlur(scope.row)" v-focus size="small" v-model="scope.row.strCostCenter_NO" >
                                                <el-button slot="append" class="boton" icon="fa fa-clone" @click="LoadCentroCosto(scope.row)"></el-button>  
                                                </el-input>
                                                <label style="width:100%" v-bind:class="{ error: scope.row.errorCentroCosto  }" v-else @click="clickcentrocosto(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ scope.row.strCostCenter_NO }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column :render-header="filterstrAcc_NO_Local"
                                            prop="strAcc_NO_Local"  width="100"
                                            label="Cuenta contable">
                                            <template scope="scope">
                                                <el-input  v-if="bln_tbl_cuenta_contable  && (scope.row === editing.row) 
                                                && (scope.column.property === editing.column)" @blur="handleBlur(scope.row)" v-focus size="small" v-model="scope.row.strAcc_NO_Local" >
                                                <el-button slot="append" class="boton" icon="fa fa-clone" @click="LoadCuentaContable(scope.row)"></el-button>  
                                                </el-input>
                                                <label style="width:100%" v-else @click="clickcuentacontable(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ scope.row.strAcc_NO_Local }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column :render-header="filterstrDelivery_Place"
                                            prop="strDelivery_Place"  width="200"
                                            label="Lugar Entrega">
                                            <template scope="scope">
                                                <el-input  v-if="bln_tbl_material_descripcion  && (scope.row === editing.row) 
                                                && (scope.column.property === editing.column)" @blur="handleBlur(scope.row)" v-focus size="small" v-model="scope.row.strDelivery_Place" >
                                                </el-input>
                                                <label style="width:100%"  v-bind:class="{error: scope.row.errorLugarEntrega}" v-else @click="clickmaterialdescripcion(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ scope.row.strDelivery_Place }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column :render-header="filterdtmDelivery_Date"
                                            prop="dtmDelivery_Date"   width="100"
                                            label="Fecha Entrega">
                                            <template scope="scope">
                                                <el-date-picker
                                                    type="date"
                                                    v-if="bln_tbl_fecha_estimada  && (scope.row === editing.row) 
                                                && (scope.column.property === editing.column)" @blur="handleBlur(scope.row)" v-focus size="small" v-model="scope.row.dtmDelivery_Date" >
                                                </el-date-picker>
                                                <label style="width:100%" v-else @click="clickfechaestimada(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ getParseDate(scope.row.dtmDelivery_Date) }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column :render-header="filterstrPriority_Cod"
                                            prop="strPriority_Cod"   
                                            label="Prioridad">
                                            <template scope="scope">
                                                <el-input  v-if="bln_tbl_prioridad  && (scope.row === editing.row) 
                                                && (scope.column.property === editing.column)" @blur="handleBlur(scope.row)" v-focus size="small" v-model="scope.row.strPriority_Cod" >
                                                <el-button slot="append" class="boton" icon="fa fa-clone" @click="LoadPrioridad(scope.row)"></el-button>  
                                                </el-input>
                                                <label style="width:100%" v-bind:class="{error: scope.row.errorPrioridad}" v-else @click="clickprioridad(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ scope.row.strPriority_Cod }}</label>
                                            </template>
                                        </el-table-column>
                                        
                                    </el-table>
                                </div>
                                <label v-if="blntxtSave" style="width:100%;font-size:11px;color:red;text-align: left;" >*{{ txtSave }}</label>
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
                    <!-- <b-progress v-if="vifprogress" :max="100" variant="success"   show-progress animated >
                         <b-progress-bar :value="valuem" :label="valuem + '%'" />
                    </b-progress> -->
                    <vm-progress v-if="vifprogress" status="success" :percentage="percentage" :text-inside="true" :stroke-width="18" :striped="true"></vm-progress>
                </div>
                <img  src="../../../../images/icon_validar.png" v-if="issave" style="width:16px; height:17px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 1.3rem;" @click="fnOcultar()"/>
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
     <!--DIALOG BUSQUEDA COMPAÑIA-->
    <el-dialog title="Busqueda Compañia" :visible.sync="dialogCompania"  size="small" >
      <bcompania v-on:companiaSeleccionado="companiaSeleccionado($event)">
      </bcompania>
    </el-dialog>
    <!--DIALOG MATERIAL-->
    <el-dialog title="Busqueda Material" :visible.sync="dialogMaterial"  size="small" >
      <bmaterial v-on:materialselecionado="SeleccionadoMaterial($event)">
      </bmaterial>
    </el-dialog>
    <!--DIALOG BUSQUEDA UNIDAD MEDIDA-->
    <el-dialog title="Busqueda Unidad Medida"  :visible.sync="dialogUnidadMedida"  size="small" >
      <bunidadmedida v-on:unidadmedidaselecionado="SeleccionadoUnidadMedida($event)" v-on:unidadmedidaClose="unidadmedidaClose($event)">
      </bunidadmedida>
    </el-dialog>
    <!--DIALOG BUSQUEDA TIPO MOVIMIENTO-->
    <el-dialog title="Busqueda Tipo Movimiento"  :visible.sync="dialogTipoMovimiento"  size="small" >
      <btipomovimiento v-on:tipomovimientoselecionado="tipomovimientoSelecionado($event)" v-on:tipomovimientoclose="tipomovimientoClose($event)">
      </btipomovimiento>
    </el-dialog>
    <!--DIALOG BUSQUEDA CENTRO COSTO-->
    <el-dialog title="Busqueda Centro Costo"  :visible.sync="dialogCentroCostos"  size="small" >
      <bcentrocosto v-on:centrocostoselecionado="SeleccionadoCentroCosto($event)" v-on:centrocostosclose="centrocostoClose($event)">
      </bcentrocosto>
    </el-dialog>
    <!--DIALOG BUSQUEDA CUENTA CONTABLE-->
    <el-dialog title="Busqueda Cuenta Contable"  :visible.sync="dialogCuentaContable"  size="small" >
      <bcuentacontable v-on:cuentacontableselecionado="SeleccionadoCuentaContable($event)" v-on:cuentacontableClose="cuentacontableClose($event)">
      </bcuentacontable>
    </el-dialog>
    <!--DIALOG BUSQUEDA PRIORIDAD-->
    <el-dialog title="Busqueda Prioridad"  :visible.sync="dialogPrioridad"  size="small" >
      <bprioridad v-on:prioridadselecionado="SeleccionadoPrioridad($event)" v-on:prioridadClose="prioridadClose($event)">
      </bprioridad>
    </el-dialog>
    <!--DIALOG BUSQUEDA PRIORIDAD-->
    <el-dialog title="Busqueda Planta"  :visible.sync="dialogPlanta" size="small" >
      <bplanta v-on:plantaselecionado="SeleccionadoPlanta($event)" v-on:plantaClose="plantaClose($event)">
      </bplanta>
    </el-dialog>
    <!--DIALOG BUSQUEDA ALMACEN-->
    <el-dialog title="Busqueda Almacen"  :visible.sync="dialogAlmacen"  size="small" >
      <balmacen v-on:almacenseleccionado="almacenseleccionado($event)" >
      </balmacen>
    </el-dialog>
    <b-modal ref="myModalRef" hide-footer title="Buscar" size="sm"  v-model="dialogBusquedaFilter" @keydown.native.enter="confirmaraceptar">
      <div style="height:85px">
        <div class="row" style="margin-left: 0px;">
            <div class="col-md-12">
                <div class="form-group row">
                    <label class="el-form-item__label col-md-2" >Columna</label>
                    <div class="col-md-7 grupolabel">
                        <div class="input-group mb-3" >
                            <el-input size ="small" :disabled="true" v-model="Column"  placeholder="">
                            </el-input>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row" style="margin-left: 0px;">
            <div class="col-md-12">
                <div class="form-group row">
                    <label class="el-form-item__label col-md-2" >Buscar</label>
                    <div class="col-md-7 grupolabel">
                        <div class="input-group mb-3" >
                            <el-input size ="small" v-model="txtbuscar"  placeholder="">
                            </el-input>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
      <footer class="modal-footer">
        <img src="../../../../images/check.png" style="width:13px; height:15px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.6rem;" @click="btnBuscar"/>
        <img src="../../../../images/close.png" style="width:17px; height:15px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.6rem;" @click="dialogBusquedaFilter = false"/>
      </footer>
    </b-modal>
</div>  
  
</template>
<script>
import CrearSalidaAlmacenComponent from '@/components/LO-LOGISTICA/almacen/al_salida/al_salida.component'
export default CrearSalidaAlmacenComponent
</script>
<style scoped>
.error{
   padding: 0.06rem;
    margin-bottom: 0.1rem;
    margin-top: 0.1rem;
    border-color: red;
    border-style: solid;
    border-width: 1px;
}
.el-table .info-row {
    background: black !important;
}

.el-table .positive-row {
background: yellow !important;
}
</style>
