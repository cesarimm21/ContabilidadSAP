<template>
    <div class="crear-ingreso-comprobante">
        <ol  style="margin-left: -1.5rem;background: linear-gradient(rgb(229, 241, 247) 0%, rgb(255, 255, 255) 100%);    margin-bottom: 0rem !important;">
            <quickaccessmenu v-on:guardarTodo="guardarAlmacen($event)" v-on:backPage="backPage($event)"  v-on:reloadpage="reloadpage($event)"/>
        </ol>
        <el-card class="box-card">
            <div slot="header" class="headercard">
                <span class="labelheadercard" > Crear Almacen</span>
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
                                    <el-input disabled size ="small" v-model="almacen.strCompany_Cod"  placeholder="">
                                    </el-input>
                                    </div>
                                </div>
                                <span style="font-size: 11px;margin-top: 5px;">{{almacen.strCompany_Desc}}</span>
                            </div>
                            <div  class="form-group row ">
                                <label class="el-form-item__label col-md-2" >Almacen</label>
                                <div class="col-md-2 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input class="validador" size ="small" v-model="almacen.strWHS_Cod" style="text-transform: capitalize" type="text" >  
                                    </el-input>
                                    </div>
                                </div>
                            </div>    
                            <div class="form-group row">
                                <label class="el-form-item__label col-sm-2" >Descripcion</label>
                                <div class="col-sm-4 grupolabel">
                                    <div class="input-group mb-3" >
                                        <el-input class="validador" size="small" v-model="almacen.strWHS_Desc"  >
                                        </el-input>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="el-form-item__label col-sm-2" >Ubicacion</label>
                                <div class="col-sm-4 grupolabel">
                                    <div class="input-group mb-3" >
                                        <el-input class="validador" size="small" v-model="almacen.strLocation"  >
                                        </el-input>
                                    </div>
                                </div>
                            </div>   
                            <div  class="form-group row ">
                                <label class="el-form-item__label col-md-2" >Sucursal</label>
                                <div class="col-md-2 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input class="validador" size ="small" @blur="desactivar_sucursal" @focus="activar_sucursal" v-model="almacen.strSubsidiary_Cod" @keydown.native.enter="buscarSucursal">                            
                                        <el-button v-if="btnactivarsucursal && !sucursalVisible" slot="append" class="boton" icon="fa fa-clone" @click="sucursalDialog()"></el-button> 
                                    </el-input>
                                    </div>
                                </div>
                                <label class="sinLinea el-form-item__label col-md-4">{{almacen.strSubsidiary_Desc}}</label>
                            </div> 
                            <!-- <div  class="form-group row ">
                                <label class="el-form-item__label col-md-2" >Planta</label>
                                <div class="col-md-2 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input class="validador" size ="small" @blur="desactivar_planta" @focus="activar_planta" v-model="almacen.strPlant_Cod">                            
                                        <el-button v-if="btnactivarplanta && !plantaVisible" slot="append" class="boton" icon="fa fa-clone" @click="plantaDialog()"></el-button> 
                                    </el-input>
                                    </div>
                                </div>
                                <label class="sinLinea el-form-item__label col-md-2">{{planta.strPlan_Desc}}</label>
                            </div>    -->
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
        <!--DIALOG BUSQUEDA SUCURSAL-->
    <el-dialog title="Busqueda Sucursal"  :visible.sync="sucursalVisible" @close="handleCloseSucursal" size="small" >
        <bsucursal v-on:sucursalselecionado="sucursalSelect($event)" v-on:sucursalClose="handleCloseSucursal()">
        </bsucursal>
    </el-dialog> 
    <!--DIALOG BUSQUEDA COMPAÑIA-->
    <el-dialog title="Busqueda compañia" :visible.sync="dialogCompania" @close="closeCompania" size="small" >
        <bcompania v-on:companiaSeleccionado="companiaSeleccionado($event)">
        </bcompania>
    </el-dialog>
    </div>  
</template>
<script>

import CrearAlmacenComponent from '@/components/XX-CONFI/entidad/almacen/crear_almacen.component'
export default CrearAlmacenComponent
</script>
<style scoped>
   .sinLinea{
  border-bottom: 1px solid #f6f7f9;
  color: #1f2d3d; 
} 
</style>
