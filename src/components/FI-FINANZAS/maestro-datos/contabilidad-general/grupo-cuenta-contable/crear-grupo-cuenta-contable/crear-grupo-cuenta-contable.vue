<template>
    <div class="crear-ingreso-comprobante">
        <ol  style="margin-left: -1.5rem;background: linear-gradient(rgb(229, 241, 247) 0%, rgb(255, 255, 255) 100%);    margin-bottom: 0rem !important;">
            <quickaccessmenu v-on:guardarTodo="guardarTodo($event)"/>
        </ol>
        <el-card class="box-card">
            <div slot="header" class="headercard">
                <span class="labelheadercard" > Crear Grupo Cuenta Contable</span>
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
                                    v-model="grupoCuentaContableModel.strCompany_Cod">
                                        <el-button v-if="btnactivarcompania && !dialogCompania" slot="append" class="boton" icon="fa fa-clone" @click="loadCompania()"></el-button> 
                                    </el-input>
                                    </div>
                                </div>
                                <span style="font-size: 11px;margin-top: 5px;">{{grupoCuentaContableModel.strCompany_Desc}}</span>
                            </div>
                            <div  class="form-group row ">
                                <label class="el-form-item__label col-md-2" >Grupo</label>
                                <div class="col-md-2 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input size ="small" v-model="grupoCuentaContableModel.strGrpAcctCont_Cod" type="text">  
                                    </el-input>
                                    </div>
                                </div>
                            </div>        
                            <div  class="form-group row ">
                                <label class="el-form-item__label col-md-2" >Descripcion</label>
                                <div class="col-md-6 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input size ="small" v-model="grupoCuentaContableModel.strGrpAcctCont_Desc" type="text">  
                                    </el-input>
                                    </div>
                                </div>
                            </div>   
                            <div class="form-group row">
                                <label class="el-form-item__label col-sm-2" >Componente</label>
                                <div class="col-sm-2 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input size ="small" @blur="desactivar_Componente" @focus="activar_Componente" v-model="grupoCuentaContableModel.strComp_Cod">                            
                                        <el-button v-if="btnactivarComponente && !dialogComponente" slot="append" class="boton" icon="fa fa-clone" @click="loadComponente()"></el-button> 
                                    </el-input>
                                    </div>
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
        <el-dialog title="Componente Cuenta Contable"  :visible.sync="dialogComponente" @close="closeComponente" size="small" >
            <bcomponentecuentacontable v-on:componenteselecionado="componenteselecionado($event)" v-on:close="closeComponente">
            </bcomponentecuentacontable>
        </el-dialog>
         
    </div>  
</template>
<script>

import CrearGrupoCuentaContableComponent from '@/components/FI-FINANZAS/maestro-datos/contabilidad-general/grupo-cuenta-contable/crear-grupo-cuenta-contable/crear-grupo-cuenta-contable.component'
export default CrearGrupoCuentaContableComponent
</script>
<style scoped>
    
</style>
