<template>
    <div class="crear-ingreso-comprobante">
        <ol  style="margin-left: -1.5rem;background: linear-gradient(rgb(229, 241, 247) 0%, rgb(255, 255, 255) 100%);    margin-bottom: 0rem !important;">
            <quickaccessmenu v-on:guardarTodo="guardarTodo($event)"/>
        </ol>
        <el-card class="box-card">
            <div slot="header" class="headercard">
                <span class="labelheadercard" > {{namepage}}</span>                
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
                                <label class="el-form-item__label col-md-2" >Año</label>
                                <div class="col-md-2 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-date-picker
                                        v-model="fecha_año"
                                        size ="small" 
                                        type="year"
                                        @change="changeyear"
                                        :disabled="impDisabled">
                                    </el-date-picker>
                                    </div>
                                </div>
                            </div>    
                            <div class="form-group row">
                                <label class="el-form-item__label col-sm-2" >Fecha</label>
                                <div class="col-sm-2 grupolabel">
                                    <div class="input-group mb-3">
                                    <el-date-picker
                                        v-model="fecha_actual"
                                        type="date"
                                        format="dd.MM.yyyy"
                                        :disabled="impDisabled">
                                    </el-date-picker>
                                    </div>
                                </div>
                            </div>  
                            <div class="form-group row">
                                <label class="el-form-item__label col-sm-2" >Monedad de</label>
                                <div class="col-sm-2 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input size ="small"  @blur="desactivar_moneda1" @focus="activar_moneda1" v-model="TipoCambio.strExchRate_OF"  :disabled="impDisabled">
                                        <el-button v-if="btnactivarmoneda1 && !dialogMoneda" slot="append" class="boton" icon="fa fa-clone" @click="loadmoneda('A')" :disabled="impDisabled"></el-button> 
                                    </el-input>
                                    </div>
                                </div>
                                <label class="el-form-item__label col-sm-2" >Moneda a</label>
                                <div class="col-sm-2 grupolabel">
                                    <div class="input-group mb-3" >
                                        <el-input size ="small"  @blur="desactivar_moneda2" @focus="activar_moneda2" v-model="TipoCambio.strExchRate_TO"  :disabled="impDisabled">
                                            <el-button v-if="btnactivarmoneda2 && !dialogMoneda" slot="append" class="boton" icon="fa fa-clone" @click="loadmoneda('B')" :disabled="impDisabled"></el-button> 
                                        </el-input>
                                    </div>
                                </div>
                            </div> 
                            <div class="form-group row">
                                <label class="el-form-item__label col-sm-2" >Compra</label>
                                <div class="col-sm-2 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input class="validador" type="number" size="small" v-model="TipoCambio.fltExchRate_Buy"  :precision="3" :min="0.000" :step="0.001" :disabled="impDisabled">

                                    </el-input>
                                    </div>
                                </div>
                                <label class="el-form-item__label col-sm-2" >Venta</label>
                                <div class="col-sm-2 grupolabel">
                                    <div class="input-group mb-3" >
                                        <el-input class="validador" type="number" size="small" v-model="TipoCambio.fltExchRate_Sale"  :precision="3" :min="0.000" :step="0.001" :disabled="impDisabled">

                                        </el-input>
                                    </div>
                                </div>
                            </div> 
                            
                            <div  class="form-group row ">
                                <label class="el-form-item__label col-md-2" >Pactado</label>
                                <div class="col-md-2 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input  type="number" size="small" v-model="TipoCambio.fltExchRate_Agrem"  :precision="3" :min="0.000" :step="0.001" :disabled="impDisabled">

                                        </el-input>
                                    </div>
                                </div>
                            </div>  
                                             
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
        <!--DIALOG BUSQUEDA MONEDA-->
    <el-dialog title="Busqueda moneda"  :visible.sync="dialogMoneda" @close="closeMoneda" size="small" >
      <bmoneda v-on:MonedaSeleccionado="SeleccionadoMoneda($event)" v-on:closeMoneda="closeMoneda()">
      </bmoneda>
    </el-dialog>  
    </div>  
</template>
<script>

import ViewAndEditTipoCambioComponent from '@/components/XX-CONFI/maestro_datos/tipo_cambio/viewandedit_tcambio/viewandedit_t.component'
export default ViewAndEditTipoCambioComponent
</script>
<style scoped>
    
</style>
