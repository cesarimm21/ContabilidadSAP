<template>
    <div class="crear-ingreso-comprobante">
        <ol  style="margin-left: -1.5rem;background: linear-gradient(rgb(229, 241, 247) 0%, rgb(255, 255, 255) 100%);    margin-bottom: 0rem !important;">
            <quickaccessmenu v-on:guardarTodo="guardarTodo($event)" v-on:backPage="backPage($event)"  v-on:reloadpage="reloadpage($event)"/>
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
                                    <el-input  disabled
                                    size ="small" 
                                    v-model="centrocosto.strCompany_Cod">
                                    </el-input>
                                    </div>
                                </div>
                                <span style="font-size: 11px;margin-top: 5px;">{{centrocosto.strCompany_Desc}}</span>
                            </div>
                            <div  class="form-group row ">
                                <label class="el-form-item__label col-md-2" >Centro Costo</label>
                                <div class="col-md-2 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input size ="small" disabled  v-model="centrocosto.strCostCenter_NO" type="text">  
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
                                        format="dd.MM.yyyy"
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
                                        format="dd.MM.yyyy"
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
                                            <div class="col-sm-8" style="margin-top: 10px;">
                                                <div class="form-group row">
                                                    <label class="el-form-item__label col-sm-2" >Nombre</label>
                                                    <div class="col-sm-2 grupolabel">
                                                        <div class="input-group mb-3" >
                                                        <el-input :disabled="visualizar"  size ="small" style="font-size:11px;" v-model="centrocosto.strCostCenter_Name"  @change="DateContabilizacionClick()"></el-input>
                                                        </div>
                                                    </div>
                                                    <label class="el-form-item__label col-sm-2" >Descripcion</label>
                                                    <div class="col-sm-5 grupolabel">
                                                        <div class="input-group mb-3" >
                                                        <el-input :disabled="visualizar"  size ="small" style="font-size:11px;" v-model="centrocosto.strCostCenter_Desc" ></el-input>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="form-group row">
                                                    <label class="el-form-item__label col-sm-2" >Tipo</label>
                                                    <div class="col-sm-2 grupolabel">
                                                        <div class="input-group mb-3" >
                                                            <el-select  :disabled="visualizar" v-model="centrocosto.strlevel" style="font-size:13px"  allow-create clearable placeholder="" size="mini" filterable>
                                                                <el-option style="font-size:13px"
                                                                v-for="item in tabletipo"
                                                                :key="item.strType_Cod"
                                                                :label="item.strType_Desc"
                                                                :value="item.strType_Cod">
                                                                </el-option>
                                                            </el-select>
                                                        </div>
                                                    </div>
                                                    <label class="el-form-item__label col-sm-2" >Grupo Proceso</label>
                                                    <div class="col-sm-2 grupolabel">
                                                        <div class="input-group mb-3" >
                                                        <el-input :disabled="visualizar" size ="small" @blur="desactivar_GrupoProceso" @focus="activar_GrupoProceso" v-model="centrocosto.strCCGrpProc_Cod">                            
                                                            <el-button v-if="btnactivarGrupoProceso && !dialogGrupoProceso" slot="append" class="boton" icon="fa fa-clone" @click="loadGrupoProceso()"></el-button> 
                                                        </el-input>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="form-group row">
                                                    <label class="el-form-item__label col-sm-2" >Ctas. Debe</label>
                                                    <div class="col-sm-2 grupolabel">
                                                        <div class="input-group mb-3" >
                                                            <el-input :disabled="visualizar" size ="small" @blur="desactivar_CuentaContableDebe" @focus="activar_CuentaContableDebe" v-model="centrocosto.strCodAcctDest_Debit"  placeholder="">
                                                                <el-button v-if="btnactivarCuentaContableDebe && !dialogCuentaContableDebe" slot="append" class="boton" icon="fa fa-clone" @click="loadCuentaContableDebe()"></el-button> 
                                                            </el-input> 
                                                        </div>
                                                    </div>
                                                    <label class="el-form-item__label col-sm-2" >Ctas. Haber</label>
                                                    <div class="col-sm-2 grupolabel">
                                                        <div class="input-group mb-3" >
                                                        <el-input :disabled="visualizar" size ="small" @blur="desactivar_CuentaContableHaber" @focus="activar_CuentaContableHaber" v-model="centrocosto.strAcctDest_Credit"  placeholder="">
                                                            <el-button v-if="btnactivarCuentaContableHaber && !dialogCuentaContableHaber" slot="append" class="boton" icon="fa fa-clone" @click="loadCuentaContableHaber()"></el-button> 
                                                        </el-input>
                                                        </div>  
                                                    </div>
                                                </div>
                                                
                                                <div class="form-group row">
                                                    <label class="el-form-item__label col-sm-2" >Categoría</label>
                                                    <div class="col-sm-2 grupolabel">
                                                        <div class="input-group mb-3" >
                                                        <el-input :disabled="visualizar" size ="small" @blur="desactivar_CategoriaCentroCosto" @focus="activar_CategoriaCentroCosto" v-model="centrocosto.strCCCategory_Cod"  placeholder="">
                                                            <el-button v-if="btnactivarCategoriaCentroCosto && !dialogCategoriaCentroCosto" slot="append" class="boton" icon="fa fa-clone" @click="loadCategoriaCentroCosto()"></el-button> 
                                                        </el-input>
                                                        </div>
                                                    </div>
                                                    <label class="el-form-item__label col-sm-2" >Centro Beneficio</label>
                                                    <div class="col-sm-2 grupolabel">
                                                        <div class="input-group mb-3" >
                                                        <el-input :disabled="visualizar" size ="small" @blur="desactivar_CentroCosto" @focus="activar_CentroCosto" v-model="centrocosto.strCostCen_Father_NO"  placeholder="">
                                                            <el-button v-if="btnactivarCentroCosto && !dialogCentroCosto" slot="append" class="boton" icon="fa fa-clone" @click="loadCentroCosto()"></el-button> 
                                                        </el-input>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="form-group row">
                                                    <label class="el-form-item__label col-sm-2" >Grupo Area</label>
                                                    <div class="col-sm-2 grupolabel">
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
        <el-dialog title="Centro Costo"  :visible.sync="dialogCentroCosto" @close="closeDialogCentroCosto" size="small" >
            <bcentrocosto v-on:centrocostoselecionado="centrocostoseleccionado($event)" v-on:centrocostosclose="closeDialogCentroCosto()">
            </bcentrocosto>
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
    </div>  
</template>
<script>

import ModificarCentroCostosComponent from '@/components/FI-FINANZAS/maestro-datos/centro-costos/modificar_centro_costos/modificar_centro_costos.component'
export default ModificarCentroCostosComponent
</script>
<style scoped>
    
</style>
