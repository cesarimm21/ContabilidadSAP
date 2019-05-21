<template>
    <div class="crear-ingreso-comprobante">
        <ol  style="margin-left: -1.5rem;background: linear-gradient(rgb(229, 241, 247) 0%, rgb(255, 255, 255) 100%);    margin-bottom: 0rem !important;">
            <quickaccessmenu v-on:guardarTodo="guardarTodo($event)"/>
        </ol>
        <el-card class="box-card">
            <div slot="header" class="headercard">
                <span class="labelheadercard" > Crear Elemento Gasto</span>
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
                                    <el-input :disabled="true" 
                                    size ="small" 
                                    @blur="desactivar_compania" 
                                    @focus="activar_compania" 
                                    v-model="cuentacontable.strCompany_Cod">
                                        <el-button v-if="btnactivarcompania && !dialogCompania" slot="append" class="boton" icon="fa fa-clone" @click="loadCompania()"></el-button> 
                                    </el-input>
                                    </div>
                                </div>
                                <span style="font-size: 11px;margin-top: 5px;">{{cuentacontable.strCompany_Name}}</span>
                            </div>
                            <div  class="form-group row ">
                                <label class="el-form-item__label col-md-2" >Cuenta Contable</label>
                                <div class="col-md-2 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input size ="small" v-model="cuentacontable.strAcc_Local_NO" type="text">  
                                    </el-input>
                                    </div>
                                </div>
                                <label class="el-form-item__label col-md-2" >Nombre Contable</label>
                                <div class="col-md-3 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input size ="small" v-model="cuentacontable.strAcc_Local_Name" type="text">  
                                    </el-input>
                                    </div>
                                </div>
                            </div>                          
                            <div  class="form-group row ">
                                <label class="el-form-item__label col-md-2" >Cuenta Corporativa</label>
                                <div class="col-md-2 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input size ="small" v-model="cuentacontable.strAcc_Corp_NO" type="text">  
                                    </el-input>
                                    </div>
                                </div>
                                <label class="el-form-item__label col-md-2" >Nombre Corporativo</label>
                                <div class="col-md-3 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input size ="small" v-model="cuentacontable.strAcc_Corp_Name" >                            
                                    </el-input>
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
                            <span slot="label"><i class="el-icon-date"></i> Datos General</span>
                            <el-card class="box-card">
                                <div class="row bodycard">
                                    <div class="container">
                                        <div class="row" style="margin-top: 3px;">
                                            <div class="col-sm-6" style="margin-top: 10px;">
                                                <div class="form-group row">
                                                    <label class="el-form-item__label col-sm-2" >Moneda</label>
                                                    <div class="col-sm-3 grupolabel">
                                                        <div class="input-group mb-3" >
                                                            <el-input size ="small" @blur="desactivar_Moneda" @focus="activar_Moneda" v-model="cuentacontable.strCurrency_Cod">                            
                                                                <el-button v-if="btnactivarMoneda && !dialogMoneda" slot="append" class="boton" icon="fa fa-clone" @click="loadMoneda()"></el-button> 
                                                            </el-input>
                                                        </div>
                                                    </div>
                                                    <label class="el-form-item__label col-sm-3" >Grupo</label>
                                                    <div class="col-sm-3 grupolabel">
                                                        <div class="input-group mb-3" >
                                                            <el-input size ="small" @blur="desactivar_Grupo" @focus="activar_Grupo" v-model="cuentacontable.strGrpAcctCont_Cod">                            
                                                                <el-button v-if="btnactivarGrupo && !dialogGrupoCuentaContable" slot="append" class="boton" icon="fa fa-clone" @click="loadGrupo()"></el-button> 
                                                            </el-input>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="form-group row">
                                                    <label class="el-form-item__label col-sm-2" >Impuesto</label>
                                                    <div class="col-sm-3 grupolabel">
                                                        <div class="input-group mb-3" >
                                                            <el-input size ="small" @blur="desactivar_Impuesto" @focus="activar_Impuesto" v-model="cuentacontable.strWH_Cod"  placeholder="">
                                                                <el-button v-if="btnactivarImpuesto && !dialogImpuesto" slot="append" class="boton" icon="fa fa-clone" @click="loadImpuesto()"></el-button> 
                                                            </el-input>
                                                        </div>
                                                    </div>
                                                    <label class="el-form-item__label col-sm-3" >Grupo Gastos</label>
                                                    <div class="col-sm-3 grupolabel">
                                                        <div class="input-group mb-3" >
                                                        <el-input size ="small" @blur="desactivar_GrupoGastos" @focus="activar_GrupoGastos" v-model="cuentacontable.strExpGroup_Cod">                            
                                                            <el-button v-if="btnactivarGrupoGastos && !dialogGrupoGastos" slot="append" class="boton" icon="fa fa-clone" @click="loadGrupoGastos()"></el-button> 
                                                        </el-input>
                                                        </div>
                                                    </div>
                                                    <!-- <label class="el-form-item__label col-sm-3">Contador</label>
                                                    <div class="col-sm-3 grupolabel">
                                                        <div class="input-group mb-3">
                                                        <el-input type="number"  size ="small" style="font-size:11px;"></el-input>
                                                        </div>
                                                    </div> -->
                                                </div>
                                                <div class="form-group row">
                                                    <label class="el-form-item__label col-sm-2" >Tipo</label>
                                                    <div class="col-sm-3 grupolabel">
                                                        <div class="input-group mb-3" >
                                                            <el-input size ="small" v-model="cuentacontable.strAcc_Type"  placeholder="">
                                                        </el-input>
                                                        </div>
                                                    </div>
                                                    <label class="el-form-item__label col-sm-3" >Rubro</label>
                                                    <div class="col-sm-3 grupolabel">
                                                        <div class="input-group mb-3" >
                                                            <el-input size ="small" @blur="desactivar_Rubro" @focus="activar_Rubro" v-model="cuentacontable.strAcctItem_Cod">                            
                                                                <el-button v-if="btnactivarRubro && !dialogRubro" slot="append" class="boton" icon="fa fa-clone" @click="loadRubro()"></el-button> 
                                                            </el-input>
                                                        </div>
                                                    </div>
                                                    <!-- <label class="el-form-item__label col-sm-3" >Total Doc.</label>
                                                    <div class="col-sm-3 grupolabel">
                                                        <div class="input-group mb-3" >
                                                        <el-input type="number"  size ="small" style="font-size:11px;" ></el-input>
                                                        </div>
                                                    </div> -->
                                                </div>
                                                
                                                <div class="form-group row">
                                                    <label class="el-form-item__label col-sm-2" >Categoria</label>
                                                    <div class="col-sm-3 grupolabel">
                                                        <div class="input-group mb-3" >
                                                            <el-select :disabled="true" v-model="strlevel" style="font-size:13px"  allow-create clearable placeholder="" size="mini" filterable>
                                                                <el-option style="font-size:13px"
                                                                v-for="item in tabletipo"
                                                                :key="item.strType_Cod"
                                                                :label="item.strType_Desc"
                                                                :value="item.strType_Cod">
                                                                </el-option>
                                                            </el-select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>  
                                            
                                </div>  
                            </el-card>          
                        </el-tab-pane>
                        <el-tab-pane >
                            <span slot="label"><i class="el-icon-document"></i> Controles</span>
                            <div class="col-md-3">
                                <div class="form-group row">
                                    <div class="col-sm-5 grupolabel">
                                        <div class="input-group mb-3" >
                                            <el-checkbox class="col-sm-6"  v-model="cuentacontable.blnAcc_LO" >
                                                <span  style="font-size: 12px !important;color: #48576a;" >
                                                    Logistica
                                                </span>  
                                            </el-checkbox>
                                        </div>
                                    </div>
                                    <div class="col-sm-4 grupolabel">
                                        <div class="input-group mb-3" >
                                            <el-checkbox class="col-sm-6" v-model="cuentacontable.blnAcc_DI"  >
                                                <span  style="font-size: 12px !important;color: #48576a;" >
                                                    Combustible
                                                </span>  
                                            </el-checkbox>
                                        </div>
                                    </div>
                                    
                                   
                                </div>
                                <div class="form-group row" style="margin-top: -30px;">
                                    <div class="col-sm-5 grupolabel">
                                        <div class="input-group mb-3" >
                                            <el-checkbox class="col-sm-6" v-model="cuentacontable.blnAcc_cc"  >
                                                <span  style="font-size: 12px !important;color: #48576a;" >
                                                    Costos
                                                </span>  
                                            </el-checkbox>
                                        </div>
                                    </div>
                                    <div class="col-sm-4 grupolabel">
                                        <div class="input-group mb-3" >
                                            <el-checkbox class="col-sm-6"  v-model="cuentacontable.blnAcc_ST" >
                                                <span  style="font-size: 12px !important;color: #48576a;" >
                                                    Estadistica Producción
                                                </span>  
                                            </el-checkbox>
                                        </div>
                                    </div>
                                    
                                   
                                </div>
                                <div class="form-group row" style="margin-top: -30px;">
                                    <div class="col-sm-5 grupolabel">
                                        <div class="input-group mb-3" >
                                            <el-checkbox class="col-sm-6"  v-model="cuentacontable.blnAcc_AP" >
                                                <span  style="font-size: 12px !important;color: #48576a;" >
                                                    Ctas. Pagar
                                                </span>  
                                            </el-checkbox>
                                        </div>
                                    </div>
                                    <div class="col-sm-4 grupolabel">
                                        <div class="input-group mb-3" >
                                            <el-checkbox class="col-sm-6"  v-model="cuentacontable.blnAcc_FA"  >
                                                <span  style="font-size: 12px !important;color: #48576a;" >
                                                    Activos-Fijos
                                                </span>  
                                            </el-checkbox>
                                        </div>
                                    </div>
                                    
                                   
                                </div>
                                <div class="form-group row" style="margin-top: -30px;">
                                    <div class="col-sm-5 grupolabel">
                                        <div class="input-group mb-3" >
                                            <el-checkbox class="col-sm-6" v-model="cuentacontable.blnAcc_AR"  >
                                                <span  style="font-size: 12px !important;color: #48576a;" >
                                                    Ctas. Cobrar
                                                </span>  
                                            </el-checkbox>
                                        </div>
                                    </div>
                                    <div class="col-sm-4 grupolabel">
                                        <div class="input-group mb-3" >
                                            <el-checkbox class="col-sm-6" v-model="cuentacontable.blnAcc_PY"   >
                                                <span  style="font-size: 12px !important;color: #48576a;" >
                                                    Plantillas
                                                </span>  
                                            </el-checkbox>
                                        </div>
                                    </div>
                                    
                                   
                                </div>
                                <div class="form-group row" style="margin-top: -30px;">
                                    <div class="col-sm-5 grupolabel">
                                        <div class="input-group mb-3" >
                                            <el-checkbox class="col-sm-6" v-model="cuentacontable.blnAcc_GL"  >
                                                <span  style="font-size: 12px !important;color: #48576a;" >
                                                    Contabilidad
                                                </span>  
                                            </el-checkbox>
                                        </div>
                                    </div>
                                    <div class="col-sm-4 grupolabel">
                                        <div class="input-group mb-3" >
                                            <el-checkbox class="col-sm-6"  v-model="cuentacontable.blnAcc_Destino" >
                                                <span  style="font-size: 12px !important;color: #48576a;" >
                                                    Destino
                                                </span>  
                                            </el-checkbox>
                                        </div>
                                    </div>
                                    
                                   
                                </div>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane >
                            <span slot="label"><i class="el-icon-warning"></i> Información</span>
                            <div class="col-md-6">
                             
                                <div class="form-group row" style="margin-top:10px;">
                                    <label class="el-form-item__label col-sm-3" >Usuario Creación</label>
                                    <div class="col-sm-3 grupolabel">
                                            <div class="input-group mb-3" >
                                                <el-input type="text" :disabled="true" size ="small" style="font-size:11px;" v-model="cuentacontable.strCreation_User"></el-input>
                                            </div>
                                        </div>
                                    <label class="el-form-item__label col-sm-3" >Usuario Modificación</label>
                                    <div class="col-sm-3 grupolabel">
                                        <div class="input-group mb-3" >
                                        <el-input type="text"  :disabled="true" size ="small" style="font-size:11px;" v-model="cuentacontable.strModified_User"></el-input>
                                        </div>
                                    </div>
                                </div>
                                  <div class="form-group row" >
                                    <label class="el-form-item__label col-sm-3" >Fecha Creación</label>
                                    <div class="col-sm-3 grupolabel">
                                            <div class="input-group mb-3" >
                                                <el-input type="text" :disabled="true" size ="small" style="font-size:11px;" v-model="cuentacontable.dtmCreation_Date"></el-input>
                                            </div>
                                        </div>
                                    <label class="el-form-item__label col-sm-3" >Fecha Modificación</label>
                                    <div class="col-sm-3 grupolabel">
                                        <div class="input-group mb-3" >
                                        <el-input type="text" :disabled="true"  size ="small" style="font-size:11px;" v-model="cuentacontable.dtmModified_Date"></el-input>
                                        </div>
                                    </div>
                                </div>
                                 
                            </div>
                            <div class="col-md-9">
                                <div class="form-group row" >
                                    <label class="el-form-item__label col-sm-2" >Plan Contable Local</label>
                                    <div class="col-sm-1 grupolabel">
                                            <div class="input-group mb-3" >
                                                <el-input size ="small" @blur="desactivar_PlanCuentaLocal" @focus="activar_PlanCuentaLocal" v-model="cuentacontable.strChartAcct_L_Cod">                            
                                                    <el-button v-if="btnactivarPlanCuentaLocal && !dialogplancontablelocal" slot="append" class="boton" icon="fa fa-clone" @click="loadPlanCuentaLocal()"></el-button> 
                                                </el-input>
                                                <!-- <el-input type="text"  size ="small" style="font-size:11px;" v-model="cuentacontable.strChartAcct_L_Cod"></el-input> -->
                                            </div>
                                        </div>
                                    <label class="el-form-item__label col-sm-3" >Plan Contable Corporativo</label>
                                    <div class="col-sm-1 grupolabel">
                                        <div class="input-group mb-3" >
                                            <el-input size ="small" @blur="desactivar_PlanCuentaCorporativo" @focus="activar_PlanCuentaCorporativo" v-model="cuentacontable.strChartAcct_C_Cod">                            
                                                <el-button v-if="btnactivarPlanCuentaCorporativo && !dialogplancontablecorporativo" slot="append" class="boton" icon="fa fa-clone" @click="loadPlanCuentaCorporativo()"></el-button> 
                                            </el-input>
                                        <!-- <el-input type="text"  size ="small" style="font-size:11px;" v-model="cuentacontable.strChertAcct_C_Cod"></el-input> -->
                                        </div>
                                    </div>
                                </div>               
                            </div>
                        </el-tab-pane>
                    </el-tabs>
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
        <el-dialog title="Plan contable local"  :visible.sync="dialogplancontablelocal" @close="dialogplancontablelocalClose" size="small" >
            <bplancontablelocal v-on:plancuentacontableselecionado="plancuentacontableselecionado($event)" v-on:companiaClose="dialogplancontablelocalClose()">
            </bplancontablelocal>
        </el-dialog>
        <el-dialog title="Plan contable corporativo"  :visible.sync="dialogplancontablecorporativo" @close="dialogplancontablecorporativoClose" size="small" >
            <bplancontablelocal v-on:plancuentacontableselecionado="plancuentacontablecorpselecionado($event)" v-on:companiaClose="dialogplancontablelocalClose()">
            </bplancontablelocal>
        </el-dialog>
        <el-dialog title="Rubro"  :visible.sync="dialogRubro" @close="dialogRubroClose" size="small" >
            <brubro v-on:rubroselecionado="rubroselecionado($event)" v-on:companiaClose="dialogRubroClose()">
            </brubro>
        </el-dialog>
        <el-dialog title="Grupo cuenta contable"  :visible.sync="dialogGrupoCuentaContable" @close="dialogGrupoCuentaContableClose" size="small" >
            <bgrupocuentacontable v-on:grupocuentacontableselecionado="grupocuentacontableselecionado($event)" v-on:companiaClose="dialogGrupoCuentaContableClose()">
            </bgrupocuentacontable>
        </el-dialog>
        <el-dialog title="Grupo gastos"  :visible.sync="dialogGrupoGastos" @close="dialogGrupoGastosClose" size="small" >
            <bgrupogastos v-on:grupogastosselecionado="grupogastosselecionado($event)" v-on:companiaClose="dialogGrupoGastosClose()">
            </bgrupogastos>
        </el-dialog>
        
        <el-dialog title="Busqueda compañia"  :visible.sync="dialogCompania" @close="dialogCompaniaClose" size="small" >
            <bcompania v-on:companiaSeleccionado="companiaSeleccionado($event)" v-on:companiaClose="companiaClose()">
            </bcompania>
        </el-dialog>
        <el-dialog title="Busqueda Impuesto"  :visible.sync="dialogImpuesto" @close="closeDialogImpuesto" size="small" >
            <bimpuesto v-on:impuestoseleccionado="ImpuestoSeleccionado($event)" v-on:companiaClose="closeImpuesto()">
            </bimpuesto>
        </el-dialog>
    
        <el-dialog title="Moneda"  :visible.sync="dialogMoneda" @close="closeDialogMoneda" size="small" >
            <bmoneda v-on:MonedaSeleccionado="MonedaSeleccionado($event)" v-on:closeMoneda="closeMoneda()">
            </bmoneda>
        </el-dialog>  
        

    </div>  
</template>
<script>

import CrearElementoGastoComponent from '@/components/FI-FINANZAS/maestro-datos/contabilidad-general/elemento-gasto/crear-elemento-gasto/crear-elemento-gasto.component'
export default CrearElementoGastoComponent
</script>
<style scoped>
    
</style>
