<template>
    <div class="crear-ingreso-comprobante">
        <ol  style="margin-left: -1.5rem;background: linear-gradient(rgb(229, 241, 247) 0%, rgb(255, 255, 255) 100%);    margin-bottom: 0rem !important;">
            <quickaccessmenu v-on:guardarTodo="guardarPais($event)" v-on:backPage="backPage($event)"  v-on:reloadpage="reloadpage($event)"/>
        </ol>
        <el-card class="box-card">
            <div slot="header" class="headercard">
                <span class="labelheadercard" > {{textTitle}}</span>
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
                                <label class="el-form-item__label col-md-2" >Pais</label>
                                <div class="col-md-2 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input class="validador" size ="small" v-model="pais.strCountry_Cod" style="text-transform: capitalize" type="text" :maxlength="2" :disabled="enabledtf">  
                                    </el-input>
                                    </div>
                                </div>
                            </div>    
                            <div class="form-group row">
                                <label class="el-form-item__label col-sm-2" >Descripcion</label>
                                <div class="col-sm-4 grupolabel">
                                    <div class="input-group mb-3" >
                                        <el-input class="validador" size="small" v-model="pais.strCountry_Name" :disabled="enabledtf" >
                                        </el-input>
                                    </div>
                                </div>
                            </div>
                            <div  class="form-group row ">
                                <label class="el-form-item__label col-md-2" >Idioma</label>
                                <div class="col-md-2 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input size ="small" @blur="desactivar_idioma" @focus="activar_idioma" v-model="pais.strLanguage">                            
                                        <el-button v-if="btnactivaridioma && !idiomaVisible" slot="append" class="boton" icon="fa fa-clone" @click="idiomaDialog()"></el-button> 
                                    </el-input>
                                    </div>
                                </div>
                            </div>       
                            <div  class="form-group row ">
                                <label class="el-form-item__label col-md-2" >Moneda</label>
                                <div class="col-md-2 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input size ="small" @blur="desactivar_monedaA" @focus="activar_monedaA" v-model="pais.strCountry_Curr" :disabled="enabledtf">                            
                                        <el-button v-if="btnactivarmonedaA && !monedaVisible" slot="append" class="boton" icon="fa fa-clone" @click="monedaDialog()" :disabled="enabledtf"></el-button> 
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
                    <img src="../../../../images/save.png" v-if="issave" style="width:16px; height:17px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 1.3rem;" @click="fnOcultar()"/>
                    <img src="../../../../images/cancelar.png" v-if="iserror" style="width:16px; height:17px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 1.3rem;" @click="fnOcultar()"/>
                    <span class="footertext2" style="" >{{textosave}}</span>
                </div>
                <div class="col-sm-3">
                    <div style="text-align:right">
                        <img src="../../../../images/collapse_derecha.png"  style="width:8px; height:10px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.3rem;" @click="fnOcultar()"/>
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
    <el-dialog title="Busqueda moneda"  :visible.sync="monedaVisible" @close="handleCloseMoneda" size="small" >
        <bmoneda v-on:MonedaSeleccionado="monedaSelect($event)" v-on:closeMoneda="handleCloseMoneda()">
        </bmoneda>
    </el-dialog>   
     <!--DIALOG BUSQUEDA Idioma-->
    <el-dialog title="Busqueda idioma"  :visible.sync="idiomaVisible" @close="handleCloseIdioma" size="small" >
        <bidioma v-on:idiomaseleccionado="idiomaSelect($event)" v-on:closeIdioma="handleCloseIdioma()">
        </bidioma>
    </el-dialog>   
    </div>  
</template>
<script>

import ViewAndEditPaisComponent from '@/components/XX-CONFI/entidad/XA03-Pais/viewandedit_pais.component'
export default ViewAndEditPaisComponent
</script>
<style scoped>
    
</style>
