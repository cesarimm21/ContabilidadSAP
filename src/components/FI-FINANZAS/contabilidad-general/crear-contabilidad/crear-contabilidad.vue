<template>
    <div class="crear-ingreso-comprobante">
        <ol  style="margin-left: -1.5rem;background: linear-gradient(rgb(229, 241, 247) 0%, rgb(255, 255, 255) 100%);    margin-bottom: 0rem !important;">
            <quickaccessmenu v-on:guardarTodo="guardarTodo($event)"/>
        </ol>
        <el-card class="box-card">
            <div slot="header" class="headercard">
                <span class="labelheadercard" > Crear Documento Contable</span>
                <!-- <el-button slot="append" class="boton" icon="fa fa-clone" @click="saveFactura()" :disabled="habilitar">Guardar</el-button>  -->
            </div>
            <div class="row bodycard">
                <div class="container">
                    <div class="row" style="margin-top: 3px;">
                        <div class="col-sm-9">
                            <div class="form-group row ">
                                <label class="el-form-item__label col-md-2" >Compañia</label>
                                <div class="col-md-2 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input  :disabled="true"
                                    size ="small" 
                                    @blur="desactivar_compania" 
                                    @focus="activar_compania" 
                                    v-model="strCompany_Cod">
                                        <el-button :disabled="true" v-if="btnactivarcompania && !dialogCompania" slot="append" class="boton" icon="fa fa-clone" @click="loadCompania()"></el-button> 
                                    </el-input>
                                    </div>
                                </div>
                                <span style="font-size: 11px;margin-top: 5px;">{{strCompany_Desc}}</span>
                            </div>
                            <div class="form-group row ">
                                <label class="el-form-item__label col-md-2" >Diario</label>
                                <div class="col-md-2 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input  
                                    size ="small" 
                                    @blur="desactivar_Diario" 
                                    @focus="activar_Diario" 
                                    v-model="strDaily_Cod">
                                        <el-button v-if="btnactivarDiario && !dialogDiario" slot="append" class="boton" icon="fa fa-clone" @click="loadDiario()"></el-button> 
                                    </el-input>
                                    </div>
                                </div>
                                <span style="font-size: 11px;margin-top: 5px;">{{strDaily_Cod_Desc}}</span>
                            </div>
                            <div class="form-group row ">
                                <label class="el-form-item__label col-md-2" >Periodo</label>
                                <div class="col-md-2 grupolabel">
                                    <div class="input-group mb-3" >
                                        <el-date-picker
                                            v-model="Period"
                                            size="mini"
                                            format="dd.MM.yyyy"
                                            style="width:128px !important">
                                        </el-date-picker>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row ">
                                <label class="el-form-item__label col-md-2" >Tipo Transaccion</label>
                                <div class="col-md-2 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input  
                                    size ="small" 
                                    @blur="desactivar_documentoTransacional" 
                                    @focus="activar_documentoTransacional" 
                                    v-model="Doc_Trans_Cod">
                                        <el-button v-if="btndocumentotransaccion && !dialogDocumentoTransaccion" slot="append" class="boton" icon="fa fa-clone" @click="loadDocumentoTransaccion()"></el-button> 
                                    </el-input>
                                    </div>
                                </div>
                                <span style="font-size: 11px;margin-top: 5px;">{{Doc_Trans_Cod_Desc}}</span>
                            </div>                          
                            <div  class="form-group row ">
                                <label class="el-form-item__label col-md-2" >Fecha Contabilizacion</label>
                                <div class="col-md-2 grupolabel">
                                    <div class="input-group mb-3" >
                                     <el-date-picker
                                        v-model="Posting_Date"
                                        size="mini"
                                        format="dd.MM.yyyy"
                                        style="width:128px !important">
                                    </el-date-picker>
                                    </div>
                                </div>
                                <label class="el-form-item__label col-md-2" >Fecha Documento</label>
                                <div class="col-md-2 grupolabel">
                                    <div class="input-group mb-3" >
                                     <el-date-picker
                                        v-model="Doc_Date"
                                        size="mini"
                                        format="dd.MM.yyyy"
                                        style="width:128px !important">
                                    </el-date-picker>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row ">
                                <label class="el-form-item__label col-md-2" >Moneda</label>
                                <div class="col-md-2 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input  
                                    size ="small" 
                                    @blur="desactivar_Moneda" 
                                    @focus="activar_Moneda" 
                                    v-model="Currency_Cod">
                                        <el-button v-if="btnactivarMoneda && !dialogMoneda" slot="append" class="boton" icon="fa fa-clone" @click="loadMoneda()"></el-button> 
                                    </el-input>
                                    </div>
                                </div>
                                <span style="font-size: 11px;margin-top: 5px;">{{Currency_Cod_Desc}}</span>
                            </div>   
                            
                            <div class="form-group row ">
                                <label class="el-form-item__label col-md-2" >Referencia</label>
                                <div class="col-md-2 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input  
                                    size ="small" 
                                    v-model="OrigenDocum_NO">
                                    </el-input>
                                    </div>
                                </div>
                                <span style="font-size: 11px;margin-top: 5px;">{{centrocosto.strCompany_Desc}}</span>
                                <label class="el-form-item__label col-md-1" >Autoreverse</label>
                                <el-checkbox class="newCheckBox" @change="changeFecha()"  v-model="Autoreverse">
                                </el-checkbox> 
                            </div>   
                            <div class="form-group row">
                                <label class="el-form-item__label col-sm-2" >Descripcion</label>
                                <div class="col-sm-3 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input   size ="small" style="font-size:11px;" v-model="Desc_Header" ></el-input>
                                    </div>
                                </div>
                            </div>    
                            <br/>
                            <div class="row">
                                <div class="col-sm-12" >
                                    <el-card class="box-card" style="margin-left: -10px;">
                                        <div slot="header" class="headercard" style="margin-top: -4px;">
                                            <!-- <buttons-accions v-on:Limpiar="Limpiar" v-on:Print="Print" v-on:Buscar="Buscar"  v-on:AscItem="AscItem" v-on:DscItem="DscItem" v-on:EliminarItem="EliminarItem()"  v-on:siguiente="siguiente()" v-on:anterior="anterior()" v-on:handleClickInParent="handleClickInParent()"></buttons-accions> -->
                                        </div>
                                        <div class="col-md-12" >
                                            <div class="row bodycard" id="out-table" style="background: white;margin-top: 0px;">
                                                <el-table
                                                    ref="missionTable"  
                                                    id="container"                                      
                                                    :max-height="sizeScreen"
                                                    :data="CompleteData" 
                                                    highlight-current-row
                                                    @current-change="handleCurrentChange"
                                                    stripe 
                                                    class="ExcelTable2007">
                                                    <el-table-column type="index" label="Item" width="40" >
                                                    </el-table-column>
                                                    <el-table-column   prop="strCateg_Account" min-width="80" label="Cat. Cuenta">
                                                        <template scope="scope">
                                                            <el-input    v-if="bln_tbl_categoria_cuenta  && (scope.row === editing.row) 
                                                            && (scope.column.property === editing.column)"  v-focus size="small" v-model="scope.row.strAcctCateg_Cod" >
                                                                <el-button slot="append" class="boton" icon="fa fa-clone" @click="LoadCategoriaCuenta(scope.row,scope.column.property)"></el-button>  
                                                            </el-input> 
                                                            <label v-bind:style="{background:cell_ocultar,width:'100%',margin: '0rem'}"  v-else @click="clickcategoriacuenta(scope.row,scope.row.edit,scope.column.property)" >&nbsp;{{ scope.row.strAcctCateg_Cod }}</label>
                                                        </template>
                                                    </el-table-column>  
                                                    
                                                    <el-table-column
                                                        prop="strCuentaContable" min-width="80"
                                                        label="Cta. Contable">
                                                        <template scope="scope">
                                                            <!-- <el-input  v-if="bln_tbl_cuenta_contable  && (scope.row === editing.row) 
                                                            && (scope.column.property === editing.column)"  v-focus size="small" v-model="scope.row.strAcc_Local_NO" >
                                                            <el-button slot="append" class="boton" icon="fa fa-clone" @click="loadCuentaContable(scope.row)"></el-button>   
                                                            </el-input> -->
                                                            <label v-bind:style="{background:cell_ocultar,width:'100%',margin: '0rem'}"  @click="clickcuentacontable(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ scope.row.strAcc_Local_NO }}</label>
                                                        </template>
                                                    </el-table-column>  
                                                    <el-table-column :render-header="filterstrCostCenter"
                                                        prop="strCostCenter"    
                                                        label="Centro Costos">
                                                        <template scope="scope">
                                                            <!-- <el-input  v-if="bln_tbl_centro_costo  && (scope.row === editing.row) 
                                                            && (scope.column.property === editing.column)"  v-focus size="small" v-model="scope.row.strCenCosWBS_Cod" >
                                                            <el-button slot="append" class="boton" icon="fa fa-clone" @click="loadCentroCosto(scope.row)"></el-button>  
                                                            </el-input> -->
                                                            <label v-bind:style="{background:cell_ocultar,width:'100%',margin: '0rem'}"  @click="clickcentrocosto(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ scope.row.strCenCosWBS_Cod }}</label>
                                                        </template>
                                                    </el-table-column>
                                                    <el-table-column 
                                                        prop="strDescription"   width="200"
                                                        label="Descripcion">
                                                        <template scope="scope">
                                                            <el-input  v-if="bln_tbl_descripcion  && (scope.row === editing.row) 
                                                            && (scope.column.property === editing.column)"  v-focus size="small" v-model="scope.row.strDetail_Desc" >
                                                            </el-input>
                                                            <label style="width:100%;    margin: 0rem;" v-else @click="clickmaterialdescripcion(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ scope.row.strDetail_Desc=="~"?"":scope.row.strDetail_Desc }}</label>
                                                        </template>
                                                    </el-table-column>
                                                    <el-table-column  align="right"
                                                        prop="fltQuantityDebe"   width="100"
                                                        label="Debe">
                                                        <template scope="scope">
                                                            <el-input-number @change="cambiarCantidadDebe(scope.row)"   v-if="bln_tbl_cantidad_debe  && (scope.row === editing.row) 
                                                            && (scope.column.property === editing.column)"  v-focus size="small"  v-model="scope.row.fltQuantityDebe" >
                                                            </el-input-number> 
                                                            <label style="width:100%;margin-top: 4px;"  v-else @click="clickcantidadDebe(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ scope.row.fltQuantityDebe }}</label>
                                                        </template>
                                                    </el-table-column>
                                                    <el-table-column  align="right"
                                                        prop="fltQuantityHaber"   width="100"
                                                        label="Haber">
                                                        <template scope="scope">
                                                            <el-input-number  @change="cambiarCantidadHaber(scope.row)"  v-if="bln_tbl_cantidad_haber  && (scope.row === editing.row) 
                                                            && (scope.column.property === editing.column)"  v-focus size="small"  v-model="scope.row.fltQuantityHaber" >
                                                            </el-input-number> 
                                                            <label style="width:100%;margin-top: 4px;"  v-else @click="clickcantidadHaber(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ scope.row.fltQuantityHaber }}</label>
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
                </div>
            </div>
        </el-card>
            
        <div class="footer1">
            <div class="row">
                <div class="col-sm-9" style="text-align:left" >
                    <img src="../../../../images/save.png" v-if="issave" style="width:16px; height:17px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 1.3rem;" @click="fnOcultar()"/>
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
        <el-dialog title="Busqueda compañia"  :visible.sync="dialogCompania" @close="dialogCompaniaClose" size="small" >
            <bcompania v-on:companiaSeleccionado="companiaSeleccionado($event)" v-on:companiaClose="companiaClose()">
            </bcompania>
        </el-dialog>
        <el-dialog title="Centro Costo"  :visible.sync="dialogCentroCosto" @close="closeDialogCentroCosto" size="small" >
            <bcentrocosto v-on:centrocostoselecionado="centrocostoseleccionado($event)" v-on:centrocostosclose="closeDialogCentroCosto()">
            </bcentrocosto>
        </el-dialog>
        <el-dialog title="Busqueda Impuesto"  :visible.sync="dialogImpuesto" @close="closeDialogImpuesto" size="small" >
            <bimpuesto v-on:ImpuestoSeleccionado="ImpuestoSeleccionado($event)" v-on:companiaClose="closeImpuesto()">
            </bimpuesto>
        </el-dialog>
    
         <el-dialog title="Busqueda Orden de compra"  :visible.sync="dialogOrdenCompra" size="small" >
            <div>
                <el-card class="box-card">
                <div slot="header" class="headercard">
                    <span class="labelheadercard" >Buscar orden de compra</span>
                </div>
                <div class="row bodycard">
                    <div class="col-md-12">
                        <div class="form-group row">
                            <label class="el-form-item__label col-md-2" >Codigo</label>
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
                    :data="ordencompra"
                    stripe  :default-sort = "{prop: 'date', order: 'descending'}"
                    style="width: 100%;cursor: pointer;" class="ExcelTable2007"
                    height="250"
                    highlight-current-row
                    @row-dblclick="selectOrdenCompra"
                    @current-change="selectOrdenCompra">
                    <el-table-column  prop="strPO_NO" label="Codigo" width="180">
                    </el-table-column>  
                    <el-table-column  prop="strPO_Desc" label="Descripcion" style="width: 70% !important;">
                    </el-table-column> 
                </el-table>
            </el-card>
            <br/>
            <footer class="modal-footer">
                <el-button class="buttonfilter btn btn-outline-secondary orange" @click="checkOrdenCompra()">
                <img class="imagenfilter" src="../../../../images/check.png" alt="" >
                </el-button>
                <el-button class="buttonfilter btn btn-outline-secondary orange" style="margin-left: 0px;"  @click="closeOrdenCompra()">
                <img class="imagenfilter" src="../../../../images/close.png" alt="" >
                </el-button>
            </footer>
            </div>
        </el-dialog>
        <el-dialog title="Moneda"  :visible.sync="dialogMoneda" @close="closeDialogMoneda" size="small" >
            <bmoneda v-on:MonedaSeleccionado="MonedaSeleccionado($event)" v-on:closeMoneda="closeMoneda()">
            </bmoneda>
        </el-dialog> 
        <el-dialog title="Grupo Proceso"  :visible.sync="dialogGrupoProceso" @close="closeDialogGrupoProceso" size="small" >
            <bgrupoproceso v-on:grupoprocesoseleccionado="grupoprocesoseleccionado($event)" v-on:closegrupoproceso="closeDialogGrupoProceso()">
            </bgrupoproceso>
        </el-dialog> 
        <el-dialog title="Grupo Proceso"  :visible.sync="dialogGrupoProceso" @close="closeDialogGrupoProceso" size="small" >
            <bgrupoproceso v-on:grupoprocesoseleccionado="grupoprocesoseleccionado($event)" v-on:closegrupoproceso="closeDialogGrupoProceso()">
            </bgrupoproceso>
        </el-dialog>   
        <el-dialog title="Grupo Area"  :visible.sync="dialogGrupoArea" @close="closeDialogGrupoArea" size="small" >
            <bgrupoarea v-on:grupoareaseleccionado="grupoareaseleccionado($event)" v-on:closegrupoproceso="closeDialogGrupoArea()">
            </bgrupoarea>
        </el-dialog> 
        
        <el-dialog title="Categoria Centro Costos"  :visible.sync="dialogCategoriaCentroCosto" @close="closeDialogCategoriaCentroCosto" size="small" >
            <bcategoriacentrocosto v-on:categoriacentrocostoseleccionado="categoriacentrocostoseleccionado($event)" v-on:closecategoriacentrocosto="closeDialogCategoriaCentroCosto()">
            </bcategoriacentrocosto>
        </el-dialog> 
        

        <!--DIALOG BUSQUEDA CATEGORIA CUENTA-->
        <el-dialog title="Busqueda categoria cuenta"  :visible.sync="dialogCategoriaCuenta" @close="closeCategoriaCuenta" size="small" >
        <bcategoriacuenta v-on:categoriacuentaselecionado="SeleccionadoCategoriaCuenta($event)">
        </bcategoriacuenta>
        </el-dialog>

        <el-dialog title="Cuenta Contable"  :visible.sync="dialogCuentaContable" @close="closeDialogCuentaContableHaber" size="small" >
            <bcuentacontable v-on:cuentacontableselecionado="cuentacontableselecionadohaber($event)" v-on:cuentacontableClose="closeDialogCuentaContableHaber()">
            </bcuentacontable>
        </el-dialog> 

        <el-dialog title="Cuenta Contable Debe"  :visible.sync="dialogCuentaContableDebe" @close="closeDialogCuentaContableDebe" size="small" >
            <bcuentacontable v-on:cuentacontableselecionado="cuentacontableselecionadodebe($event)" v-on:cuentacontableClose="closeDialogCuentaContableDebe()">
            </bcuentacontable>
        </el-dialog> 
        
        <el-dialog title="Documento Transaccion"  :visible.sync="dialogDocumentoTransaccion" @close="documentotransaccionClose" size="small" >
            <bdocumentotransaccion v-on:documentotransaccionselecionado="documentotransaccionselecionado($event)" v-on:documentotransaccionClose="documentotransaccionClose()">
            </bdocumentotransaccion>
        </el-dialog> 
        

        
        <el-dialog title="Diarios" :visible.sync="dialogDiario" @close="closeDialogDiario" size="small" >
            <div>
                <el-card class="box-card">
                <div slot="header" class="headercard">
                    <span class="labelheadercard" >Buscar Diario</span>
                </div>
                <div class="row bodycard">
                    <div class="col-md-12">
                        <div class="form-group row">
                            <label class="el-form-item__label col-md-3" >Diario Codigo</label>
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
                    :data="diarioModel"
                    stripe  :default-sort = "{prop: 'date', order: 'descending'}"
                    style="width: 100%;cursor: pointer;" class="ExcelTable2007"
                    height="250"
                    highlight-current-row
                    @row-dblclick="checkSelectdbDiario"
                    @current-change="checkSelectDiario">
                    <el-table-column  prop="strDaily_Cod" label="Codigo" width="180">
                    </el-table-column>  
                    <el-table-column  prop="strDaily_Desc" label="Descripcion" style="width: 70% !important;">
                    </el-table-column> 
                </el-table>
            </el-card>
            <br/>
            <footer class="modal-footer">
                <el-button class="buttonfilter btn btn-outline-secondary orange" @click="checkSelectdbDiario()">
                
                <img class="imagenfilter" src="../../../../images/check.png" alt="" >
                </el-button>
                <el-button class="buttonfilter btn btn-outline-secondary orange" style="margin-left: 0px;"  @click="closeDiario()">
                <img class="imagenfilter" src="../../../../images/close.png" alt="" >
                </el-button>
            </footer>
            </div>
        </el-dialog>
    </div>  
</template>
<script>

import CrearContabilidadComponent from '@/components/FI-FINANZAS/contabilidad-general/crear-contabilidad/crear-contabilidad.component'
export default CrearContabilidadComponent
</script>
<style scoped>
    
</style>
