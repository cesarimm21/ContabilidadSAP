<template>
    <div class="crear-ingreso-comprobante">
        <ol  style="margin-left: -1.5rem;background: linear-gradient(rgb(229, 241, 247) 0%, rgb(255, 255, 255) 100%);    margin-bottom: 0rem !important;">
            <quickaccessmenu v-on:guardarTodo="guardarTodo($event)"/>
        </ol>
        <el-card class="box-card">
            <div slot="header" class="headercard">
                <span class="labelheadercard" > {{txtmodulo}}</span>
            </div>
            <div class="row bodycard">
                <div class="container">
                    <div class="row" style="margin-top: 3px;">
                        <div class="col-sm-9">
                            <div class="form-group row ">
                                <label class="el-form-item__label col-md-2" >Compañia</label>
                                <div class="col-md-2 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input   :disabled="true"
                                    size ="small" 
                                    @blur="desactivar_compania" 
                                    @focus="activar_compania" 
                                    v-model="cuentacontable.strCompany_Cod">
                                        <el-button v-if="btnactivarcompania && !dialogCompania" slot="append" class="boton" icon="fa fa-clone" @click="loadCompania()"></el-button> 
                                    </el-input>
                                    </div>
                                </div>
                                <span style="font-size: 11px;margin-top: 5px;">{{cuentacontable.strCompany_Desc}}</span>
                            </div>
                            <div  class="form-group row ">
                                <label class="el-form-item__label col-md-2" >Cta. Contable</label>
                                <div class="col-md-2 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input :disabled="visualizar" size ="small" @change="activarpadre(cuentacontable.strAcc_Local_NO)" v-model="cuentacontable.strAcc_Local_NO" type="text">  
                                    </el-input>
                                    </div>
                                </div>
                                <label class="el-form-item__label col-md-2" >Descripcion</label>
                                <div class="col-md-3 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input size ="small" :disabled="visualizar" v-model="cuentacontable.strAcc_Local_Name" type="text">  
                                    </el-input>
                                    </div>
                                </div>
                            </div>       
                            <div  class="form-group row ">
                                <label class="el-form-item__label col-md-2" >Cta. Padre</label>
                                <div class="col-md-2 grupolabel">
                                    <div class="input-group mb-3" >
                                        <el-input size ="small" :disabled="visualizar" @blur="desactivar_CuentaContablePadre" @focus="activar_CuentaContablePadre" v-model="cuentacontable.strAccFth_Local"  placeholder="">
                                            <el-button :disabled="visualizar" v-if="btnactivarCuentaContablePadre && !dialogCuentaContablePadre" slot="append" class="boton" icon="fa fa-clone" @click="loadCuentaContablePadre()"></el-button> 
                                        </el-input>
                                    </div>
                                </div>
                                <label class="el-form-item__label col-md-2" >Descripcion</label>
                                <div class="col-md-3 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input :disabled="visualizar" size ="small"  v-model="strAccFth_Local_Desc" type="text">  
                                    </el-input>
                                    </div>
                                </div>
                            </div>                     
                            <div  class="form-group row ">
                                <label class="el-form-item__label col-md-2" >Cta. Corporativa</label>
                                <div class="col-md-2 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input :disabled="visualizar" size ="small" v-model="cuentacontable.strAcc_Corp_NO" type="text">  
                                    </el-input>
                                    </div>
                                </div>
                                <label class="el-form-item__label col-md-2" >Descripcion</label>
                                <div class="col-md-3 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input :disabled="visualizar" size ="small"  v-model="cuentacontable.strAcc_Corp_Name" >                            
                                    </el-input>
                                    </div>
                                </div>
                            </div>  
                            <div class="form-group row">
                                <label class="el-form-item__label col-sm-2" >Tipo</label>
                                <div class="col-sm-2 grupolabel">
                                    <div class="input-group mb-3" >
                                        <el-select  :disabled="visualizar" v-model="strlevelTipo" style="font-size:13px"  allow-create clearable placeholder="" size="mini" filterable>
                                            <el-option style="font-size:13px"
                                            v-for="item in tabletipo1"
                                            :key="item.strType_Cod"
                                            :label="item.strType_Desc"
                                            :value="item.strType_Cod">
                                            </el-option>
                                        </el-select>
                                    </div>
                                </div>  
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
                                                    <label class="el-form-item__label col-sm-3" >Plan Contable Local</label>
                                                    <div class="col-sm-3 grupolabel">
                                                        <div class="input-group mb-3" >
                                                            <el-input :disabled="visualizar" size ="small" @blur="desactivar_PlanCuentaLocal" @focus="activar_PlanCuentaLocal" v-model="cuentacontable.strChartAcct_L_Cod">                            
                                                                <el-button :disabled="visualizar" v-if="btnactivarPlanCuentaLocal && !dialogplancontablelocal" slot="append" class="boton" icon="fa fa-clone" @click="loadPlanCuentaLocal()"></el-button> 
                                                            </el-input>
                                                            <!-- <el-input type="text"  size ="small" style="font-size:11px;" v-model="cuentacontable.strChartAcct_L_Cod"></el-input> -->
                                                        </div>
                                                    </div>
                                                    <label class="el-form-item__label col-sm-3" >Reporte</label>
                                                    <div class="col-sm-3 grupolabel">
                                                        <div class="input-group mb-3" >
                                                            <el-input size ="small" :disabled="visualizar" @blur="desactivar_TipoCuentaContable" @focus="activar_TipoCuentaContable" v-model="cuentacontable.strAcc_Type">                            
                                                                <el-button :disabled="visualizar" v-if="btnactivarTipoCuentaContable && !dialogTipoCuentaContable" slot="append" class="boton" icon="fa fa-clone" @click="loadTipoCuentaContable()"></el-button> 
                                                            </el-input>
                                                            <!-- <el-input type="text"  size ="small" style="font-size:11px;" v-model="cuentacontable.strChartAcct_L_Cod"></el-input> -->
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="form-group row">
                                                    <label class="el-form-item__label col-sm-3" >Rubro Cta.</label>
                                                    <div class="col-sm-3 grupolabel">
                                                        <div class="input-group mb-3" >
                                                            <el-input size ="small" :disabled="visualizar" @blur="desactivar_Grupo" @focus="activar_Grupo" v-model="cuentacontable.strGrpAcctCont_Cod">                            
                                                                <el-button :disabled="visualizar" v-if="btnactivarGrupo && !dialogGrupoCuentaContable" slot="append" class="boton" icon="fa fa-clone" @click="loadGrupo()"></el-button> 
                                                            </el-input>
                                                        </div>
                                                    </div>
                                                    <label class="el-form-item__label col-sm-3" >Rubro Costos</label>
                                                    <div class="col-sm-3 grupolabel">
                                                        <div class="input-group mb-3" >
                                                            <el-input size ="small" :disabled="visualizar" @blur="desactivar_CostItem" @focus="activar_CostItem" v-model="cuentacontable.strCost_Item_Cod">                            
                                                                <el-button :disabled="visualizar" v-if="btnactivarCostItem && !dialogCostItem" slot="append" class="boton" icon="fa fa-clone" @click="loadCostItem()"></el-button> 
                                                            </el-input>
                                                            <!-- <el-input type="text"  size ="small" style="font-size:11px;" v-model="cuentacontable.strChartAcct_L_Cod"></el-input> -->
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div class="form-group row">
                                                    <label class="el-form-item__label col-sm-3" >Grupo Gastos</label>
                                                    <div class="col-sm-3 grupolabel">
                                                        <div class="input-group mb-3" >
                                                        <el-input :disabled="visualizar" size ="small" @blur="desactivar_GrupoGastos" @focus="activar_GrupoGastos" v-model="cuentacontable.strExpGroup_Cod">                            
                                                            <el-button :disabled="visualizar" v-if="btnactivarGrupoGastos && !dialogGrupoGastos" slot="append" class="boton" icon="fa fa-clone" @click="loadGrupoGastos()"></el-button> 
                                                        </el-input>
                                                        </div>
                                                    </div>
                                                    <label class="el-form-item__label col-sm-3" >Tipo PDB</label>
                                                    <div class="col-sm-3 grupolabel">
                                                        <div class="input-group mb-3" >
                                                            <el-input :disabled="visualizar" size ="small" @blur="desactivar_Impuesto" @focus="activar_Impuesto" v-model="cuentacontable.strWH_Cod"  placeholder="">
                                                                <el-button :disabled="visualizar" v-if="btnactivarImpuesto && !dialogImpuesto" slot="append" class="boton" icon="fa fa-clone" @click="loadImpuesto()"></el-button> 
                                                            </el-input>
                                                        </div>
                                                    </div>
                                                   
                                                </div>
                                                <div class="form-group row">
                                                    <label class="el-form-item__label col-sm-3" >Moneda</label>
                                                    <div class="col-sm-3 grupolabel">
                                                        <div class="input-group mb-3" >
                                                            <el-input :disabled="visualizar" size ="small" @blur="desactivar_Moneda" @focus="activar_Moneda" v-model="cuentacontable.strCurrency_Cod">                            
                                                                <el-button :disabled="visualizar" v-if="btnactivarMoneda && !dialogMoneda" slot="append" class="boton" icon="fa fa-clone" @click="loadMoneda()"></el-button> 
                                                            </el-input>
                                                        </div>
                                                    </div>
                                                    <label class="el-form-item__label col-sm-3" >Abierta</label>
                                                    <div class="col-sm-3 grupolabel">
                                                        <div class="input-group mb-3" >
                                                            <el-select :disabled="visualizar" v-model="strAcc_Status_Open" style="font-size:13px"  allow-create clearable placeholder="" size="mini" filterable>
                                                                <el-option style="font-size:13px"
                                                                v-for="item in tableAbierto"
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
                                            <el-checkbox :disabled="visualizar" class="col-sm-6"  v-model="cuentacontable.blnAcc_LO" >
                                                <span  style="font-size: 12px !important;color: #48576a;" >
                                                    Logistica
                                                </span>  
                                            </el-checkbox>
                                        </div>
                                    </div>
                                    <div class="col-sm-4 grupolabel">
                                        <div class="input-group mb-3" >
                                            <el-checkbox class="col-sm-6" :disabled="visualizar" v-model="cuentacontable.blnAcc_DI"  >
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
                                            <el-checkbox class="col-sm-6" :disabled="visualizar" v-model="cuentacontable.blnAcc_cc"  >
                                                <span  style="font-size: 12px !important;color: #48576a;" >
                                                    Costos
                                                </span>  
                                            </el-checkbox>
                                        </div>
                                    </div>
                                    <div class="col-sm-4 grupolabel">
                                        <div class="input-group mb-3" >
                                            <el-checkbox :disabled="visualizar" class="col-sm-6"  v-model="cuentacontable.blnAcc_ST" >
                                                <span  style="font-size: 12px !important;color: #48576a;" >
                                                    Estadistica Produccion
                                                </span>  
                                            </el-checkbox>
                                        </div>
                                    </div>
                                    
                                   
                                </div>
                                <div class="form-group row" style="margin-top: -30px;">
                                    <div class="col-sm-5 grupolabel">
                                        <div class="input-group mb-3" >
                                            <el-checkbox :disabled="visualizar" class="col-sm-6"  v-model="cuentacontable.blnAcc_AP" >
                                                <span  style="font-size: 12px !important;color: #48576a;" >
                                                    Ctas. Pagar
                                                </span>  
                                            </el-checkbox>
                                        </div>
                                    </div>
                                    <div class="col-sm-4 grupolabel">
                                        <div class="input-group mb-3" >
                                            <el-checkbox :disabled="visualizar" class="col-sm-6"  v-model="cuentacontable.blnAcc_FA"  >
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
                                            <el-checkbox :disabled="visualizar" class="col-sm-6" v-model="cuentacontable.blnAcc_AR"  >
                                                <span  style="font-size: 12px !important;color: #48576a;" >
                                                    Ctas. Cobrar
                                                </span>  
                                            </el-checkbox>
                                        </div>
                                    </div>
                                    <div class="col-sm-4 grupolabel">
                                        <div class="input-group mb-3" >
                                            <el-checkbox :disabled="visualizar" class="col-sm-6" v-model="cuentacontable.blnAcc_PY"   >
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
                                            <el-checkbox class="col-sm-6" :disabled="visualizar" v-model="cuentacontable.blnAcc_GL"  >
                                                <span  style="font-size: 12px !important;color: #48576a;" >
                                                    Contabilidad
                                                </span>  
                                            </el-checkbox>
                                        </div>
                                    </div>
                                    
                                   
                                </div>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane >
                            <span slot="label"><i class="el-icon-warning"></i> Informacion</span>
                            <div class="col-md-6">
                             
                                <div class="form-group row" style="margin-top:10px;">
                                    <label class="el-form-item__label col-sm-3" >Usuario Creacion</label>
                                    <div class="col-sm-3 grupolabel">
                                            <div class="input-group mb-3" >
                                                <el-input type="text" :disabled="true" size ="small" style="font-size:11px;" v-model="cuentacontable.strCreation_User"></el-input>
                                            </div>
                                        </div>
                                    <label class="el-form-item__label col-sm-3" >Usuario Modificacion</label>
                                    <div class="col-sm-3 grupolabel">
                                        <div class="input-group mb-3" >
                                        <el-input type="text"  :disabled="true" size ="small" style="font-size:11px;" v-model="cuentacontable.strModified_User"></el-input>
                                        </div>
                                    </div>
                                </div>
                                  <div class="form-group row" >
                                    <label class="el-form-item__label col-sm-3" >Fecha Creacion</label>
                                    <div class="col-sm-3 grupolabel">
                                            <div class="input-group mb-3" >
                                                <el-input type="text" :disabled="true" size ="small" style="font-size:11px;" v-model="cuentacontable.dtmCreation_Date"></el-input>
                                            </div>
                                        </div>
                                    <label class="el-form-item__label col-sm-3" >Fecha Modificacion</label>
                                    <div class="col-sm-3 grupolabel">
                                        <div class="input-group mb-3" >
                                        <el-input type="text" :disabled="true"  size ="small" style="font-size:11px;" v-model="cuentacontable.dtmModified_Date"></el-input>
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
        <el-dialog title="Cuenta Contable"  :visible.sync="dialogCuentaContablePadre" @close="closeDialogCuentaContablePadre" size="small" >
           <div>
                <el-card class="box-card">
                    <div slot="header" class="headercard">
                        <span class="labelheadercard" ></span>
                    </div>
                    <div class="row bodycard">
                        <div class="col-md-12">
                            <div class="form-group row">
                                <label class="el-form-item__label col-md-3" >Codigo</label>
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
                    :data="cuentacontableModel"
                    stripe  :default-sort = "{prop: 'date', order: 'descending'}"
                    style="width: 100%" class="ExcelTable2007"
                    height="250"
                    highlight-current-row
                    @row-dblclick="cuentacontableselecionadoPadre"
                    @current-change="handleCurrentChangeCCPadre">
                        <el-table-column   prop="strAcc_Local_NO" label="Cuenta Local" width="180">
                        </el-table-column>  
                        <el-table-column  prop="strAcc_Corp_NO" label="Cuenta Corporativa" style="width: 70% !important;">
                        </el-table-column>  
                        <el-table-column  prop="strAcc_Local_Name" label="Nombre" style="width: 70% !important;">
                        </el-table-column> 
                    </el-table>
                </el-card>
                <br/>
                <footer class="modal-footer">
                    <el-button class="buttonfilter btn btn-outline-secondary orange" @click="checkPopup()">
                    <img class="imagenfilter" src="../../../../../../images/check.png" alt="" >
                    </el-button>
                    <el-button class="buttonfilter btn btn-outline-secondary orange" style="margin-left: 0px;"  @click="closePopup()">
                    <img class="imagenfilter" src="../../../../../../images/close.png" alt="" >
                    </el-button>
                </footer>
            </div>
        </el-dialog> 

        <el-dialog title="Cuenta Contable"  :visible.sync="dialogCuentaContablePadreCorp" @close="closeDialogCuentaContablePadreCorp" size="small" >
            <bcuentacontable v-on:cuentacontableselecionado="cuentacontableselecionadoPadreCorp($event)" v-on:cuentacontableClose="closeDialogCuentaContablePadreCorp()">
            </bcuentacontable>
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
        
        <el-dialog title="CostItem"  :visible.sync="dialogCostItem" @close="closeDialogCostItem" size="small" >
            <bcostitem v-on:costitemselecionado="costitemselecionado($event)" v-on:closeMoneda="closeDialogCostItem()">
            </bcostitem>
        </el-dialog> 
         
        
        <el-dialog title="Tipo Cuenta Contable"  :visible.sync="dialogTipoCuentaContable" @close="closeDialogTipoCuentaContable" size="small" >
            <btipocuentacontable v-on:tipocuentacontableSeleccionado="tipocuentacontableSeleccionado($event)" v-on:closeMoneda="closeDialogTipoCuentaContable()">
            </btipocuentacontable>
        </el-dialog>  
        

    </div>  
</template>
<script>
import ModificarElementoGastoComponent from '@/components/FI-FINANZAS/maestro-datos/contabilidad-general/elemento-gasto/modificar-elemento-gasto/modificar-elemento-gasto.component'
export default ModificarElementoGastoComponent
</script>
<style scoped>
    
</style>
