<template>
    <div class="crear-ingreso-comprobante">
        <ol  style="margin-left: -1.5rem;background: linear-gradient(rgb(229, 241, 247) 0%, rgb(255, 255, 255) 100%);    margin-bottom: 0rem !important;">
            <quickaccessmenu  v-on:backPage="backPage($event)"  v-on:reloadpage="reloadpage($event)"/>
        </ol>
        <el-card class="box-card">
            <div slot="header" class="headercard">
                <span class="labelheadercard" > Modificar Ejercicio Contable</span>
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
                            <div class="form-group row ">
                                <label class="el-form-item__label col-md-2" >Año</label>
                                <div class="col-md-2 grupolabel">
                                    <div class="input-group mb-3" >
                                        <el-date-picker
                                        v-model="value3"
                                         size ="small" 
                                        type="year"
                                        @change="changeyear()">
                                        </el-date-picker>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                         
                    </div>
                </div>
            </div>
            <br/>
             <el-tabs type="border-card">
                <el-tab-pane>
                    <span slot="label"><i class="el-icon-date"></i> Periodos</span>                    
                    <!-- <buttons-accions></buttons-accions> -->
                    <div class="col-md-12" >
                        <div class="row " style="background: white;margin-top: 0px;">
                        <el-table
                            :max-height="sizeScreen"
                            :data="gridPeriodo"
                            class="ExcelTable2007"
                            >
                            <el-table-column type="index" width="45">                                
                            </el-table-column>
                            <el-table-column prop="strPeriod_NO" label="Numero">                                
                            </el-table-column>
                            <el-table-column prop="strPeriod" label="Perio">                                
                            </el-table-column>
                            <el-table-column   prop="strPeriod_Desc" min-width="80" label="Descripcion">
                            </el-table-column>
                            <el-table-column
                                prop="dtmPeriod_Start"   min-width="80"
                                label="Inicio">
                                <template scope="scope">
                                    <span>{{ getDateStringView(scope.row.dtmPeriod_Start) }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="dtmPeriod_End" 
                                label="Fin">
                                <template scope="scope">
                                    <span>{{ getDateStringView(scope.row.dtmPeriod_End) }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="strCreation_User" 
                                label="Usuario">
                            </el-table-column>
                            <el-table-column
                                prop="dtmCreation_Date" 
                                label="Fecha Creado">
                                <template scope="scope">
                                    <span>{{ getDateStringView(scope.row.dtmCreation_Date) }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                align="center"
                                label="Estato Periodo">
                                <template scope="scope">
                                    <el-button
                                    :type="scope.row.chrStatus === 'C' ? 'danger' : 'success'"
                                    size="small"
                                    @click="changeStatus(scope.row)"
                                    class="checkbutton"
                                    >{{scope.row.chrStatus=== 'C'?'Cerrado':'Abierto'}}
                                    
                                    </el-button>
                                    </template>
                            </el-table-column>
                        </el-table>
                        </div>  
                    </div>              
                </el-tab-pane>
            </el-tabs>
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

import ModificarAlmacenComponent from '@/components/XX-CONFI/maestro_datos/almacen/modificar_al.component'
export default ModificarAlmacenComponent
</script>
<style scoped>
    
</style>
