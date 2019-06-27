<template>
    <div class="crear-ingreso-comprobante">
        <ol  style="margin-left: -1.5rem;background: linear-gradient(rgb(229, 241, 247) 0%, rgb(255, 255, 255) 100%);    margin-bottom: 0rem !important;">
            <quickaccessmenu v-on:guardarTodo="guardarTodo($event)"/>
        </ol>
        <el-card class="box-card">
            <div slot="header" class="headercard">
                <span class="labelheadercard" > Modificar centro costos</span>
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
                                    <el-input  :disabled="visualizar"
                                    size ="small" 
                                    @blur="desactivar_compania" 
                                    @focus="activar_compania" 
                                    v-model="centrocosto.strCompany_Cod">
                                        <el-button v-if="btnactivarcompania && !dialogCompania" slot="append" class="boton" icon="fa fa-clone" @click="loadCompania()"></el-button> 
                                    </el-input>
                                    </div>
                                </div>
                                <span style="font-size: 11px;margin-top: 5px;">{{centrocosto.strCompany_Desc}}</span>
                            </div>
                            <div  class="form-group row ">
                                <label class="el-form-item__label col-md-2" >Centro Costo</label>
                                <div class="col-md-2 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input size ="small" :disabled="visualizar"  v-model="centrocosto.strCostCenter_NO" type="text">  
                                    </el-input>
                                    </div>
                                </div>
                                <!-- <label class="el-form-item__label col-md-2" >Cuenta Corporativa</label>
                                <div class="col-md-2 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input size ="small" v-model="factura.strVendor_NO" >                            
                                    </el-input>
                                    </div>
                                </div> -->
                            </div>                          
                            <div  class="form-group row ">
                                <label class="el-form-item__label col-md-2" >Vigencia Desde</label>
                                <div class="col-md-2 grupolabel">
                                    <div class="input-group mb-3" >
                                     <el-date-picker
                                        v-model="dtmStart_Date" :disabled="visualizar"
                                        size="mini"
                                        style="width:128px !important">
                                    </el-date-picker>
                                    </div>
                                </div>
                                <label class="el-form-item__label col-md-1" >Hasta</label>
                                <div class="col-md-3 grupolabel">
                                    <div class="input-group mb-3" >
                                     <el-date-picker :disabled="visualizar"
                                        v-model="dtmEnd_Date"
                                        size="mini"
                                        style="width:128px !important">
                                    </el-date-picker>
                                    </div>
                                </div>
                            </div>                          
                        </div>
                    </div>
                </div>
            </div>
            <br/>
            <div class="row">
                <div class="col-sm-12" >
                    <el-tabs type="border-card"  style="margin-left: -10px;">
                        <el-tab-pane>
                            <span slot="label"><i class="el-icon-date"></i> Datos</span>
                            <el-card class="box-card">
                                <div class="row bodycard">
                                    <div class="container">
                                        <div class="row" style="margin-top: 3px;">
                                            <div class="col-sm-6" style="margin-top: 10px;">
                                                <div class="form-group row">
                                                    <label class="el-form-item__label col-sm-2" >Nombre</label>
                                                    <div class="col-sm-3 grupolabel">
                                                        <div class="input-group mb-3" >
                                                        <el-input :disabled="visualizar"  size ="small" style="font-size:11px;" v-model="centrocosto.strCostCenter_Name"  @change="DateContabilizacionClick()"></el-input>
                                                        </div>
                                                    </div>
                                                    <label class="el-form-item__label col-sm-3" >Descripcion</label>
                                                    <div class="col-sm-3 grupolabel">
                                                        <div class="input-group mb-3" >
                                                        <el-input :disabled="visualizar"  size ="small" style="font-size:11px;" v-model="centrocosto.strCostCenter_Desc" ></el-input>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="form-group row">
                                                    <label class="el-form-item__label col-sm-2" >Tipo</label>
                                                    <div class="col-sm-3 grupolabel">
                                                        <div class="input-group mb-3" >
                                                            <el-select  :disabled="visualizar" v-model="strlevel" style="font-size:13px"  allow-create clearable placeholder="" size="mini" filterable>
                                                                <el-option style="font-size:13px"
                                                                v-for="item in tabletipo"
                                                                :key="item.strType_Cod"
                                                                :label="item.strType_Desc"
                                                                :value="item.strType_Cod">
                                                                </el-option>
                                                            </el-select>
                                                        </div>
                                                    </div>
                                                    <label class="el-form-item__label col-sm-3" >Grupo Proceso</label>
                                                    <div class="col-sm-3 grupolabel">
                                                        <div class="input-group mb-3" >
                                                        <el-input :disabled="visualizar" size ="small" @blur="desactivar_GrupoProceso" @focus="activar_GrupoProceso" v-model="centrocosto.strCCGrpProc_Cod">                            
                                                            <el-button v-if="btnactivarGrupoProceso && !dialogGrupoProceso" slot="append" class="boton" icon="fa fa-clone" @click="loadGrupoProceso()"></el-button> 
                                                        </el-input>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="form-group row">
                                                    <label class="el-form-item__label col-sm-2" >Ctas. Haber</label>
                                                    <div class="col-sm-3 grupolabel">
                                                        <div class="input-group mb-3" >
                                                        <el-input :disabled="visualizar" size ="small" @blur="desactivar_CuentaContableHaber" @focus="activar_CuentaContableHaber" v-model="centrocosto.strAcctDest_Credit"  placeholder="">
                                                            <el-button v-if="btnactivarCuentaContableHaber && !dialogCuentaContableHaber" slot="append" class="boton" icon="fa fa-clone" @click="loadCuentaContableHaber()"></el-button> 
                                                        </el-input>
                                                        </div>  
                                                    </div>
                                                    <label class="el-form-item__label col-sm-3" >Ctas. Debe</label>
                                                    <div class="col-sm-3 grupolabel">
                                                        <div class="input-group mb-3" >
                                                            <el-input :disabled="visualizar" size ="small" @blur="desactivar_CuentaContableDebe" @focus="activar_CuentaContableDebe" v-model="centrocosto.strAcctDest_Debit"  placeholder="">
                                                                <el-button v-if="btnactivarCuentaContableDebe && !dialogCuentaContableDebe" slot="append" class="boton" icon="fa fa-clone" @click="loadCuentaContableDebe()"></el-button> 
                                                            </el-input> 
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div class="form-group row">
                                                    <label class="el-form-item__label col-sm-2" >Categoría</label>
                                                    <div class="col-sm-3 grupolabel">
                                                        <div class="input-group mb-3" >
                                                        <el-input :disabled="visualizar" size ="small" @blur="desactivar_CategoriaCentroCosto" @focus="activar_CategoriaCentroCosto" v-model="centrocosto.strCCCategory_Cod"  placeholder="">
                                                            <el-button v-if="btnactivarCategoriaCentroCosto && !dialogCategoriaCentroCosto" slot="append" class="boton" icon="fa fa-clone" @click="loadCategoriaCentroCosto()"></el-button> 
                                                        </el-input>
                                                        </div>
                                                    </div>
                                                    <label class="el-form-item__label col-sm-3" >Centro Beneficio</label>
                                                    <div class="col-sm-3 grupolabel">
                                                        <div class="input-group mb-3" >
                                                        <el-input :disabled="visualizar" size ="small" @blur="desactivar_CentroCosto" @focus="activar_CentroCosto" v-model="centrocosto.strCostCen_Father_NO"  placeholder="">
                                                            <el-button v-if="btnactivarCentroCosto && !dialogCentroCosto" slot="append" class="boton" icon="fa fa-clone" @click="loadCentroCosto()"></el-button> 
                                                        </el-input>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="form-group row">
                                                    <label class="el-form-item__label col-sm-2" >Grupo Area</label>
                                                    <div class="col-sm-3 grupolabel">
                                                        <div class="input-group mb-3" >
                                                        <el-input :disabled="visualizar" size ="small" @blur="desactivar_GrupoArea" @focus="activar_GrupoArea" v-model="centrocosto.strCCGrpArea_Cod"  placeholder="">
                                                            <el-button v-if="btnactivarGrupoArea && !dialogGrupoArea" slot="append" class="boton" icon="fa fa-clone" @click="loadGrupoArea()"></el-button> 
                                                        </el-input>
                                                        </div>
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </div>  
                                            
                                </div>  
                            </el-card>          
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>
        </el-card>
            
        <div class="footer1">
            <div class="row">
                <div class="col-sm-9" style="text-align:left" >
                    <img src="../../../../../images/save.png" v-if="issave" style="width:16px; height:17px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 1.3rem;" @click="fnOcultar()"/>
                    <img src="../../../../../images/cancelar.png" v-if="iserror" style="width:16px; height:17px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 1.3rem;" @click="fnOcultar()"/>
                    <span class="footertext2" style="" >{{textosave}}</span>
                </div>
                <div class="col-sm-3">
                    <div style="text-align:right">
                        <img src="../../../../../images/collapse_derecha.png"  style="width:8px; height:10px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.3rem;" @click="fnOcultar()"/>
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
                <img class="imagenfilter" src="../../../../../images/check.png" alt="" >
                </el-button>
                <el-button class="buttonfilter btn btn-outline-secondary orange" style="margin-left: 0px;"  @click="closeOrdenCompra()">
                <img class="imagenfilter" src="../../../../../images/close.png" alt="" >
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
        


        <el-dialog title="Cuenta Contable Haber"  :visible.sync="dialogCuentaContableHaber" @close="closeDialogCuentaContableHaber" size="small" >
            <bcuentacontable v-on:cuentacontableselecionado="cuentacontableselecionadohaber($event)" v-on:cuentacontableClose="closeDialogCuentaContableHaber()">
            </bcuentacontable>
        </el-dialog> 

        <el-dialog title="Cuenta Contable Debe"  :visible.sync="dialogCuentaContableDebe" @close="closeDialogCuentaContableDebe" size="small" >
            <bcuentacontable v-on:cuentacontableselecionado="cuentacontableselecionadodebe($event)" v-on:cuentacontableClose="closeDialogCuentaContableDebe()">
            </bcuentacontable>
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
                    <el-table-column  prop="strDaily_Type" label="Tipo" width="180">
                    </el-table-column> 
                </el-table>
            </el-card>
            <br/>
            <footer class="modal-footer">
                <el-button class="buttonfilter btn btn-outline-secondary orange" @click="checkSelectdbDiario()">
                <img class="imagenfilter" src="../../../../../images/check.png" alt="" >
                </el-button>
                <el-button class="buttonfilter btn btn-outline-secondary orange" style="margin-left: 0px;"  @click="closeDiario()">
                <img class="imagenfilter" src="../../../../../images/close.png" alt="" >
                </el-button>
            </footer>
            </div>
        </el-dialog>
    </div>  
</template>
<script>

import ModificarCentroCostosComponent from '@/components/FI-FINANZAS/maestro-datos/centro-costos/modificar_centro_costos/modificar_centro_costos.component'
export default ModificarCentroCostosComponent
</script>
<style scoped>
    
</style>
