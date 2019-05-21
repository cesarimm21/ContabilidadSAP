<template>
    <div class="crear-ingreso-comprobante">
        <ol  style="margin-left: -1.5rem;background: linear-gradient(rgb(229, 241, 247) 0%, rgb(255, 255, 255) 100%);    margin-bottom: 0rem !important;">
            <quickaccessmenu v-on:guardarTodo="guardarTodo($event)" v-on:validarView="cargarList()"/>
        </ol>
        <el-card class="box-card">
            <div slot="header" class="headercard">
                <span class="labelheadercard" > Visualizar Banco</span>
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
                                <label class="el-form-item__label col-md-2" >Pais</label>
                                <div class="col-md-2 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input  
                                        size ="small" 
                                        @blur="desactivar_pais" 
                                        @focus="activar_pais" 
                                        v-model="strpais_Cod">
                                        <el-button  v-if="btnactivarpais && !dialogPais" slot="append" class="boton" icon="fa fa-clone" @click="loadPais()"></el-button> 
                                    </el-input>
                                    </div>
                                </div>
                                <span style="font-size: 11px;margin-top: 5px;">{{strpais_Desc}}</span>
                            </div>
                            <div class="form-group row ">
                                <label class="el-form-item__label col-md-2" >Banco</label>
                                <div class="col-md-2 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input   size ="small" 
                                        v-model="bancoModel.strBank_Cod">
                                    </el-input>
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
                        </div>
                    </div>
                    
                            <br/>
                            <div class="row">
                                <div class="col-sm-12" >
                                    <el-card class="box-card" style="margin-left: -10px;">
                                        <div slot="header" class="headercard" style="margin-top: -4px;">
                                            <buttons-accions v-on:validarView="validarView"></buttons-accions>
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
                                                    <el-table-column type="index" label="Item" width="38">
                                                    </el-table-column>
                                                    <el-table-column  sortable prop="strCountry" width="100" label="Pais">
                                                        <template scope="scope">
                                                        <label v-bind:style="{width:'100%',margin: '0rem'}" >&nbsp;{{ scope.row.strCountry }}</label>
                                                        </template>
                                                    </el-table-column>
                                                    <el-table-column
                                                        prop="strBank_Cod" sortable  width="120"
                                                        label="Banco">
                                                        <template scope="scope">
                                                            <label v-bind:style="{width:'100%',margin: '0rem'}">&nbsp;{{ scope.row.strBank_Cod }}</label>
                                                        </template>
                                                    </el-table-column>   
                                                    <el-table-column
                                                        prop="strBank_Name" sortable  
                                                        label="Descripcion">
                                                        <template scope="scope">
                                                            <label v-bind:style="{width:'100%',margin: '0rem'}" >&nbsp;{{ scope.row.strBank_Name }}</label>
                                                        </template>
                                                    </el-table-column>
                                                    <el-table-column
                                                        prop="strBank_Curr" sortable width="150"
                                                        label="Moneda">
                                                        <template scope="scope">
                                                            <label style="width:100%" v-bind:style="{width:'100%',margin: '0rem'}"  >&nbsp;{{ scope.row.strBank_Curr }}</label>
                                                        </template>
                                                    </el-table-column>
                                                    <el-table-column
                                                        prop="strBank_Type" sortable width="100"
                                                        label="Tipo">
                                                        <template scope="scope">
                                                            <label style="width:100%" v-bind:style="{width:'100%',margin: '0rem'}" >&nbsp;{{ scope.row.strBank_Type }}</label>
                                                        </template>
                                                    </el-table-column>
                                                    <el-table-column
                                                        prop="strBank_Account" sortable width="150"
                                                        label="cta. Bancaria">
                                                        <template scope="scope">
                                                            <label style="width:100%" >&nbsp;{{ scope.row.strBank_Account }}</label>
                                                        </template>
                                                    </el-table-column>
                                                    
                                                    <el-table-column
                                                        prop="dtmCreation_Date" sortable width="100"
                                                        label="Fecha">
                                                        <template scope="scope">
                                                            <label style="width:100%"  >&nbsp;{{ getParseDate(scope.row.dtmCreation_Date) }}</label>
                                                        </template>
                                                    </el-table-column>
                                                    <el-table-column
                                                        prop="strCreation_User" sortable width="100"
                                                        label="Usuario">
                                                        <template scope="scope">
                                                            <label style="width:100%"  >&nbsp;{{ scope.row.strCreation_User }}</label>
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
                    <img src="../../../../../../images/save.png" v-if="issave" style="width:16px; height:17px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 1.3rem;" @click="fnOcultar()"/>
                    <img src="../../../../../../images/cancelar.png" v-if="iserror" style="width:16px; height:17px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 1.3rem;" @click="fnOcultar()"/>
                    <span class="footertext2" style="" >{{textosave}}</span>
                </div>
                <div class="col-sm-3">
                    <div style="text-align:right">
                        <img src="../../../../../../images/collapse_derecha.png"  style="width:8px; height:10px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.3rem;" @click="fnOcultar()"/>
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
        <el-dialog
            title="Departamentos"
            :visible.sync="departVisible"
            width="30%"
            :before-close="handleCloseDepart">
            <el-card class="box-card">
                <div slot="header" class="headercard">
                    <span class="labelheadercard" >Buscar Departamento</span>
                </div>
                <div class="row bodycard">
                    <div class="col-md-12">
                            <div class="form-group row">
                                <label class="el-form-item__label col-md-3" >{{Column}}</label>
                                <div class="col-md-2 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input size ="small"   v-model="inputAtributo">
                                    <el-button slot="append" class="boton" icon="fa fa-search" 
                                        @click="searchDepa()"
                                    > </el-button>
                                    </el-input>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
                <el-table
                    :data="DepartamentoGrid"
                    stripe  :default-sort = "{prop: 'date', order: 'descending'}"
                    style="width: 100%; cursor: pointer;" class="ExcelTable2007"
                    height="200"
                    highlight-current-row
                    @header-click="headerclick"
                    @row-dblclick="departChosseCheck"
                    @current-change="departSelect">
                    <el-table-column :render-header="filterstrRegión_Cod"  prop="strRegión_Cod" label="Codigo" width="180" >
                    </el-table-column>  
                    <el-table-column :render-header="filterstrRegión_Desc" prop="strRegión_Desc" label="Nombre Departamento" style="width: 70% !important;">
                    </el-table-column> 
                    </el-table>
            </el-card>
            <span slot="footer" class="dialog-footer">
                <img src="../../../../../../images/check.png" style="width:13px; height:15px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.6rem;" @click="departChosseCheck()"/>
                <img src="../../../../../../images/close.png" style="width:17px; height:15px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.6rem;" @click="departChosseClose()"/>
            </span>
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
                    <el-table-column  prop="strPO_Desc" label="Descripción" style="width: 70% !important;">
                    </el-table-column> 
                </el-table>
            </el-card>
            <br/>
            <footer class="modal-footer">
                <el-button class="buttonfilter btn btn-outline-secondary orange" @click="checkOrdenCompra()">
                <img class="imagenfilter" src="../../../../../../images/check.png" alt="" >
                </el-button>
                <el-button class="buttonfilter btn btn-outline-secondary orange" style="margin-left: 0px;"  @click="closeOrdenCompra()">
                <img class="imagenfilter" src="../../../../../../images/close.png" alt="" >
                </el-button>
            </footer>
            </div>
        </el-dialog>
        <el-dialog title="Moneda"  :visible.sync="dialogMoneda" @close="closeDialogMoneda" size="small" >
            <bmoneda v-on:MonedaSeleccionado="MonedaSeleccionado($event)" v-on:closeMoneda="closeMoneda()">
            </bmoneda>
        </el-dialog> 
        <el-dialog title="Pais"  :visible.sync="dialogPais" @close="closePais" size="small" >
            <bpais v-on:PaisSeleccionado="PaisSeleccionado($event)" v-on:closePais="closePais()">
            </bpais>
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
                    <el-table-column  prop="strDaily_Desc" label="Descripción" style="width: 70% !important;">
                    </el-table-column> 
                </el-table>
            </el-card>
            <br/>
            <footer class="modal-footer">
                <el-button class="buttonfilter btn btn-outline-secondary orange" @click="checkSelectdbDiario()">
                
                <img class="imagenfilter" src="../../../../../../images/check.png" alt="" >
                </el-button>
                <el-button class="buttonfilter btn btn-outline-secondary orange" style="margin-left: 0px;"  @click="closeDiario()">
                <img class="imagenfilter" src="../../../../../../images/close.png" alt="" >
                </el-button>
            </footer>
            </div>
        </el-dialog>
    </div>  
</template>
<script>

import VisualizarBancoComponent from '@/components/FI-FINANZAS/maestro-datos/tesoreria/bancos/visualizar-banco/visualizar-banco.component'
export default VisualizarBancoComponent
</script>
<style scoped>
    
</style>
