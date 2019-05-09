<template>
    <div class="crear-ingreso-comprobante">
        <ol  style="margin-left: -1.5rem;background: linear-gradient(rgb(229, 241, 247) 0%, rgb(255, 255, 255) 100%);    margin-bottom: 0rem !important;">
            <quickaccessmenu v-on:guardarTodo="guardarTodo($event)" v-on:backPage="backPage($event)"  v-on:reloadpage="reloadpage($event)"/>
        </ol>
        <el-card class="box-card">
            <div slot="header" class="headercard">
                <span class="labelheadercard" > Crear Impuesto</span>
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
                                    v-model="companyCod">
                                      </el-input>
                                    </div>
                                </div>
                                <span style="font-size: 11px;margin-top: 5px;">{{companyName}}</span>
                            </div>
                            <div  class="form-group row ">
                                <label class="el-form-item__label col-md-2" >Codigo</label>
                                <div class="col-md-2 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input class="validador" size ="small" v-model="Impuesto.strWH_Cod"  type="text">  
                                    </el-input>
                                    </div>
                                </div>
                            </div>    
                            <div class="form-group row">
                                <label class="el-form-item__label col-sm-2" >Tasa %</label>
                                <div class="col-sm-2 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input class="validador" type="number" size="small" v-model="Impuesto.fltPorcent" @change="handleChange" :precision="2" :min="0.00" :step="0.01">

                                    </el-input>
                                    </div>
                                </div>
                                <label class="el-form-item__label col-sm-2" >Grupo</label>
                                <div class="col-sm-2 grupolabel">
                                    <div class="input-group mb-3" >
                                        <template>
                                        <!-- `checked` debe ser true o false -->
                                            <el-checkbox v-model="Impuesto.blnWH_Grp">{{Impuesto.blnWH_Grp}}</el-checkbox>
                                        </template>
                                    </div>
                                </div>
                            </div>  
                            <div class="form-group row">
                                <label class="el-form-item__label col-sm-2" >Cuenta Debito</label>
                                <div class="col-sm-2 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input type="text" size ="small" v-model="Impuesto.strAcct_Debit">

                                    </el-input>
                                    </div>
                                </div>
                                <label class="el-form-item__label col-sm-2" >Cuenta Credito</label>
                                <div class="col-sm-2 grupolabel">
                                    <div class="input-group mb-3" >
                                        <el-input size ="small" v-model="Impuesto.strAcct_Credit">
                                            </el-input> 
                                    </div>
                                </div>
                            </div> 
                            <div  class="form-group row ">
                                <label class="el-form-item__label col-md-2" >Descripcion</label>
                                <div class="col-md-6 grupolabel">
                                    <div class="input-group mb-6" >
                                    <el-input class="validador" size ="small" v-model="Impuesto.strWH_Desc"  type="text">  
                                    </el-input>
                                    </div>
                                </div>
                            </div>  
                                             
                        </div>
                        
                        <div class="col-md-12">
                        <br>
                        <el-tabs type="border-card">
                            <el-tab-pane label="Combinados" >
                                <div class="container">  
                                    <div class="col-sm-9">
                                        <div class="form-group row">
                                            <label class="el-form-item__label col-sm-2" >Codigo 2</label>
                                            <div class="col-sm-2 grupolabel">
                                                <div class="input-group mb-3" >
                                                <el-input type="text" size="mini" v-model="Impuesto.strWH_Cod2" >

                                                </el-input>
                                                </div>
                                            </div>
                                            <label class="el-form-item__label col-sm-2" >Calculo base 1</label>
                                            <div class="col-sm-2 grupolabel">
                                                <div class="input-group mb-3" >
                                                    <el-input size ="small" v-model="Impuesto.strCalc_Bas1">
                                                        </el-input> 
                                                </div>
                                            </div>
                                        </div>  
                                        <div class="form-group row">
                                            <label class="el-form-item__label col-sm-2" >Codigo 3</label>
                                            <div class="col-sm-2 grupolabel">
                                                <div class="input-group mb-3" >
                                                <el-input type="text" size="mini" v-model="Impuesto.strWH_Cod3">

                                                </el-input>
                                                </div>
                                            </div>
                                            <label class="el-form-item__label col-sm-2" >Calculo base 2</label>
                                            <div class="col-sm-2 grupolabel">
                                                <div class="input-group mb-3" >
                                                    <el-input size ="small" v-model="Impuesto.strCalc_Bas2">
                                                        </el-input> 
                                                </div>
                                            </div>
                                        </div>  
                                        <div class="form-group row">
                                            <label class="el-form-item__label col-sm-2" >Cuenta Perú</label>
                                            <div class="col-sm-2 grupolabel">
                                                <div class="input-group mb-3" >
                                                <el-input type="text" size="mini" v-model="Impuesto.strCta_Country" >

                                                </el-input>
                                                </div>
                                            </div>
                                            <label class="el-form-item__label col-sm-2" >Calculo base 3</label>
                                            <div class="col-sm-2 grupolabel">
                                                <div class="input-group mb-3" >
                                                    <el-input size ="small" v-model="Impuesto.strCalc_Bas3">
                                                        </el-input> 
                                                </div>
                                            </div>
                                        </div>  
                                    </div>
                                </div>
                            </el-tab-pane>
                        </el-tabs> 
                        </div>
                         
                    </div>
                </div>
            </div>
            <br/>
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
    </div>  
</template>
<script>

import CrearImpuestoComponent from '@/components/XX-CONFI/maestro_datos/impuesto/crear_impuesto/crear_impuesto.component'
export default CrearImpuestoComponent
</script>
<style scoped>
    
</style>
