<template>
    <div class="crear-ingreso-comprobante">
        <ol  style="margin-left: -1.5rem;background: linear-gradient(rgb(229, 241, 247) 0%, rgb(255, 255, 255) 100%);    margin-bottom: 0rem !important;">
            <quickaccessmenu v-on:guardarTodo="guardarTodo($event)"/>
        </ol>
        <el-card class="box-card">
            <div slot="header" class="headercard">
                <span class="labelheadercard" > Crear CostItem</span>
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
                                    v-model="cositemModel.strCompany_Cod">
                                        <el-button v-if="btnactivarcompania && !dialogCompania" slot="append" class="boton" icon="fa fa-clone" @click="loadCompania()"></el-button> 
                                    </el-input>
                                    </div>
                                </div>
                                <span style="font-size: 11px;margin-top: 5px;">{{cositemModel.strCompany_Desc}}</span>
                            </div>
                            <div  class="form-group row ">
                                <label class="el-form-item__label col-md-2" >Costo</label>
                                <div class="col-md-2 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input size ="small" v-model="cositemModel.strCost_Item_Cod" type="text">  
                                    </el-input>
                                    </div>
                                </div>
                            </div>
                            
                            <div  class="form-group row ">
                                <label class="el-form-item__label col-md-2" >Grupo 1</label>
                                <div class="col-md-2 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input size ="small" v-model="cositemModel.strCost_Item_Pos1" type="text">  
                                    </el-input>
                                    </div>
                                </div>
                                <label class="el-form-item__label col-md-2" >Descripcion 1</label>
                                <div class="col-md-4 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input size ="small" v-model="cositemModel.strCost_Item_Desc1" type="text">  
                                    </el-input>
                                    </div>
                                </div>
                            </div>    
                            
                            <div  class="form-group row ">
                                <label class="el-form-item__label col-md-2" >Grupo 2</label>
                                <div class="col-md-2 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input size ="small" v-model="cositemModel.strCost_Item_Pos2" type="text">  
                                    </el-input>
                                    </div>
                                </div>
                                <label class="el-form-item__label col-md-2" >Descripcion 2</label>
                                <div class="col-md-4 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input size ="small" v-model="cositemModel.strCost_Item_Desc2" type="text">  
                                    </el-input>
                                    </div>
                                </div>
                            </div>  
                            
                            <div  class="form-group row ">
                                <label class="el-form-item__label col-md-2" >Grupo 3</label>
                                <div class="col-md-2 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input size ="small" v-model="cositemModel.strCost_Item_Pos3" type="text">  
                                    </el-input>
                                    </div>
                                </div>
                                <label class="el-form-item__label col-md-2" >Descripcion 3</label>
                                <div class="col-md-4 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input size ="small" v-model="cositemModel.strCost_Item_Desc3" type="text">  
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
    </div>  
</template>
<script>

import CrearCostItemComponent from '@/components/FI-FINANZAS/maestro-datos/contabilidad-general/costitem/crear-costitem/crear-costitem.component'
export default CrearCostItemComponent
</script>
<style scoped>
    
</style>
