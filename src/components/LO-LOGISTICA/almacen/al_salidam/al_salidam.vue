<template>
  <div class="salidam-pr">
    <ol  style="margin-left: -1.5rem;background: linear-gradient(rgb(229, 241, 247) 0%, rgb(255, 255, 255) 100%);    margin-bottom: 0rem !important;">
        <quickaccessmenu  v-on:guardarTodo="guardarTodo($event)" v-on:backPage="backPage($event)"  v-on:reloadpage="reloadpage($event)"/>
    </ol>
    <el-card class="box-card">
        <div slot="header" class="headercard">
           <span class="labelheadercard" >{{txtmodulo}}</span>
            <el-button v-if="vifaprobarrechasar" :disabled="vifcomprobarapro" class="buttonfilter btn btn-outline-secondary orange" style="margin-top: -2px;
                width: inherit;
                background: #4685b5;
                border-color: transparent;
                color: #f6f7f9;
                padding: 4px 4px 4px 4px !important;" @click="aprobar()">
                Aprobar
            </el-button>
            <el-button v-if="vifaprobarrechasar" :disabled="vifcomprobarapro" class="buttonfilter btn btn-outline-secondary orange" style="margin-top: -2px;
                width: inherit;
                background: #d03605;
                border-color: transparent;
                color: #f6f7f9;
                padding: 4px 4px 4px 4px !important;" @click="Eliminar()">
                Eliminar
            </el-button>
            <!-- <el-button v-if="vifimprimir" :disabled="vifcomprobarapro" class="buttonfilter btn btn-outline-secondary orange" style="margin-top: -2px; -->
            <el-button v-if="true" :disabled="vifcomprobarapro" class="buttonfilter btn btn-outline-secondary orange" style="margin-top: -2px;
                width: inherit;
                background: #4685b5;
                border-color: transparent;
                color: #f6f7f9;
                padding: 4px 4px 4px 4px !important;" @click="ExportarPDF1()">
                Imprimir
            </el-button>
            <!-- <el-button v-if="vifaprobarrechasar" class="buttonfilter btn btn-outline-secondary orange" style="margin-top: -2px;
                width: inherit;
                background: rgb(171, 67, 4);
                border-color: transparent;
                color: #f6f7f9;
                padding: 4px 4px 4px 4px !important;" @click="rechasar()">
                Rechazar
            </el-button> -->
        </div>
        <div class="row bodycard">
            <div class="container">
                <div class="row" style="margin-top: 3px;">
                    <div class="col-sm-8" >
                        <div class="form-group row ">
                            <label class="el-form-item__label col-md-2" >Compañia</label>
                            <div class="col-md-2 grupolabel">
                                <div class="input-group mb-3" >
                                <el-input :disabled="visualizar"  size ="small" @blur="desactivar_compania" @focus="activar_compania" v-model="salidaModel.strCompany_Cod"  placeholder="">
                                    <el-button v-if="btnactivarcompania && !dialogCompania" slot="append" class="boton" icon="fa fa-clone" @click="loadCompania()"></el-button> 
                                </el-input>
                                </div>
                            </div>
                            <span style="font-size: 11px;margin-top: 5px;">{{salidaModel.strCompany_Desc}}</span>
                        </div> 
                    </div>
                </div>
                <div class="row" style="margin-top: 3px;">
                    <div class="col-sm-8" >
                        <div class="form-group row ">
                            <label class="el-form-item__label col-md-2" >Código Salida</label>
                            <div class="col-md-2 grupolabel">
                                <div class="input-group mb-3" >
                                    <el-input :disabled="visualizar"  size ="small"  v-model="salidaModel.strIssueAjust_NO"  placeholder="">
                                    </el-input>
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-8" >
                        <div class="form-group row ">
                            <label class="el-form-item__label col-md-2" >Tipo Movimiento</label>
                            <div class="col-md-2 grupolabel">
                                <div class="input-group mb-3" >
                                <el-input :disabled="visualizar"  size ="small" @blur="desactivar_tipo_movimiento" @focus="activar_tipo_movimiento" v-model="salidaModel.strTypeMov_Cod"  placeholder="">
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
                                <el-input size ="small" :disabled="visualizar"   @change="change()" @blur="desactivar_almacen" @focus="activar_almacen" v-model="salidaModel.strWHS_Cod"  placeholder="">
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
                                <buttons-accions v-on:handleClickInParent="handleClickInParent()"></buttons-accions>
                            </div>
                            <div class="col-md-12" >
                                <div class="row bodycard" style="background: white;margin-top: 0px;">
                                   <el-table
                                        :max-height="sizeScreen"
                                        :data="tableData1" 
                                        stripe  :default-sort = "{prop: 'date', order: 'descending'}"
                                        class="ExcelTable2007">
                                        <el-table-column type="index" width="48">
                                        </el-table-column>
                                        <el-table-column width="100"
                                            prop="material" sortable 
                                            label="Material">
                                            <template scope="scope" class-name="error">
                                                <el-input  v-if="bln_tbl_material  && (scope.row === editing.row) 
                                                && (scope.column.property === editing.column)" @blur="handleBlur(scope.row)" v-focus size="small" v-model="scope.row.strStock_Cod" >
                                                <el-button slot="append" class="boton" icon="fa fa-clone" @click="LoadMaterial(scope.row)"></el-button>  
                                                </el-input>
                                                <label style="width:100%"  v-else @click="clickmaterial(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ scope.row.strStock_Cod }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            prop="material_descripcion" sortable width="200"
                                            label="Descripción">
                                            <template scope="scope">
                                                <el-input  v-if="bln_tbl_material_descripcion  && (scope.row === editing.row) 
                                                && (scope.column.property === editing.column)" @blur="handleBlur(scope.row)" v-focus size="small" v-model="scope.row.strStock_Desc" >
                                                </el-input>
                                                <label style="width:100%" v-else @click="clickmaterialdescripcion(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ scope.row.strStock_Desc }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            prop="fltQuantity" sortable width="100"
                                            label="Stock">
                                            <template scope="scope">
                                                <!-- <el-input-number  v-if="(scope.row === editing.row) 
                                                && (scope.column.property === editing.column)" @blur="handleBlur(scope.row)" v-focus size="small" v-model="scope.row.fltQuantity" >
                                                </el-input-number> -->
                                                <label  >&nbsp;{{ getCantidadVirtual(scope.row)}}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column v-if="vifCantidadDesp"
                                            prop="fltQuantityR" sortable width="100"
                                            label="Stock Real">
                                            <template scope="scope">
                                                <!-- <el-input-number  v-if="(scope.row === editing.row) 
                                                && (scope.column.property === editing.column)" @blur="handleBlur(scope.row)" v-focus size="small" v-model="scope.row.fltQuantity" >
                                                </el-input-number> -->
                                                <label  >&nbsp;{{ getCantidadReal(scope.row)}}</label>
                                            </template>
                                        </el-table-column>
                                        
                                        <el-table-column
                                            prop="cantidad" sortable width="100"
                                            label="Cantidad">
                                            <template scope="scope">
                                                <el-input-number  v-if="(scope.row === editing.row) 
                                                && (scope.column.property === editing.column)" @blur="handleBlur(scope.row)" v-focus size="small" v-model="scope.row.fltIssueRequest_QTY" >
                                                </el-input-number>
                                                <label v-else @click="clickcantidad(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ scope.row.fltIssueRequest_QTY}}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column v-if="vifdespacho"
                                            prop="cantidad" sortable width="100"
                                            label="Cta. Despachada">
                                            <template scope="scope">
                                                <el-input-number  size="small" v-model="scope.row.fltIssueDelivery_QTY"  >
                                                </el-input-number>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            prop="unidad_medida" sortable  width="100"
                                            label="UM">
                                            <template scope="scope">
                                                <el-input  v-if="bln_tbl_unidad_medida  && (scope.row === editing.row) 
                                                && (scope.column.property === editing.column)" @blur="handleBlur(scope.row)" v-focus size="small" v-model="scope.row.strUM_Cod" >
                                                <el-button slot="append" class="boton" icon="fa fa-clone" @click="LoadUnidadMedida(scope.row)"></el-button>  
                                                </el-input>
                                                <label style="width:100%" v-else @click="clickunidadmedida(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ scope.row.strUM_Cod }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column  width="100"
                                            prop="centrocosto" sortable  
                                            label="Centro costos" >
                                            <template scope="scope" >
                                                <el-input   v-if="bln_tbl_centro_costo  && (scope.row === editing.row) 
                                                && (scope.column.property === editing.column)" @blur="handleBlur(scope.row)" v-focus size="small" v-model="scope.row.strCostCenter_NO" >
                                                <el-button slot="append" class="boton" icon="fa fa-clone" @click="LoadCentroCosto(scope.row)"></el-button>  
                                                </el-input>
                                                <label style="width:100%" v-bind:class="{ error: scope.row.errorCentroCosto  }" v-else @click="clickcentrocosto(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ scope.row.strCostCenter_NO }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            prop="cuentacontable" sortable width="100"
                                            label="Cuenta contable">
                                            <template scope="scope">
                                                <el-input  v-if="bln_tbl_cuenta_contable  && (scope.row === editing.row) 
                                                && (scope.column.property === editing.column)" @blur="handleBlur(scope.row)" v-focus size="small" v-model="scope.row.strAcc_NO_Local" >
                                                <el-button slot="append" class="boton" icon="fa fa-clone" @click="LoadCuentaContable(scope.row)"></el-button>  
                                                </el-input>
                                                <label style="width:100%" v-else @click="clickcuentacontable(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ scope.row.strAcc_NO_Local }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            prop="strDelivery_Place" sortable width="200"
                                            label="Lugar Entrega">
                                            <template scope="scope">
                                                <el-input  v-if="bln_tbl_material_descripcion  && (scope.row === editing.row) 
                                                && (scope.column.property === editing.column)" @blur="handleBlur(scope.row)" v-focus size="small" v-model="scope.row.strDelivery_Place" >
                                                </el-input>
                                                <label style="width:100%"  v-bind:class="{error: scope.row.errorLugarEntrega}" v-else @click="clickmaterialdescripcion(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ scope.row.strDelivery_Place }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            prop="fecha_estimada" sortable  width="100"
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
                                        <el-table-column
                                            prop="prioridad" sortable  
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
                <img src="../../../../images/cancelar.png" v-if="iserror" style="width:16px; height:17px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 1.3rem;" @click="fnOcultar()"/>
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
    <el-dialog title="Busqueda Compañia" :visible.sync="dialogCompania" @close="closeCompania" size="small" >
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
    <el-dialog title="Busqueda Prioridad"  :visible.sync="dialogPrioridad" @close="closePrioridad" size="small" >
      <bprioridad v-on:prioridadselecionado="SeleccionadoPrioridad($event)" v-on:prioridadClose="prioridadClose($event)">
      </bprioridad>
    </el-dialog>
    <!--DIALOG BUSQUEDA ALMACEN-->
    <el-dialog title="Busqueda Almacen"  :visible.sync="dialogAlmacen"  size="small" >
      <balmacen v-on:almacenseleccionado="almacenseleccionado($event)" >
      </balmacen>
    </el-dialog>
</div>  
  
</template>

<script>
import ModificarSalidaMaterialComponent from '@/components/LO-LOGISTICA/almacen/al_salidam/al_salidam.component'
export default ModificarSalidaMaterialComponent
</script>
<style scoped>

</style>
