
<template>

  <div class="al-crear">
    <ol style="margin-left: -1.5rem;background: linear-gradient(rgb(229, 241, 247) 0%, rgb(255, 255, 255) 100%);    margin-bottom: 0rem !important;">
        <quickaccessmenu v-on:guardarTodo="guardarTodo($event)" v-on:validarView="BuscarProducto" v-on:backPage="backPage($event)"  v-on:reloadpage="reloadpage($event)"/>
    </ol>

    <el-card class="box-card">
        <div slot="header" class="headercard">
            <span class="labelheadercard" >Visualizar Clase Material</span>
        </div>
        <!--<div class="row bodycard">
            <div class="container">
                <div class="row" style="margin-top: 3px;">
                    <div class="col-sm-6" >
                        <div class="form-group row ">
                            <label class="el-form-item__label col-md-3" >Compañia</label>
                            <div class="col-md-3 grupolabel">
                                <div class="input-group mb-3" >
                                <el-input size ="small" @blur="desactivar_compania" @focus="activar_compania" v-model="productoModel.strCompany_Cod"  @keyup.enter.native="enterCompania(productoModel.strCompany_Cod)"  @keyup.delete.native="borrarCompania()" placeholder="">
                                    <el-button v-if="btnactivarcompania && !dialogCompania" slot="append" class="boton" icon="fa fa-clone" @click="loadCompania()"></el-button> 
                                </el-input>
                                </div>
                            </div>
                            <span style="font-size: 11px;margin-top: 5px;">{{descompania}}</span>
                        </div> 
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-6" >
                        <div class="form-group row ">
                            <label class="el-form-item__label col-md-3" >Codigo Material</label>
                            <div class="col-md-3 grupolabel">
                                <div class="input-group mb-3" >
                                <el-input size ="small" @focus="limpiarBotones" v-model="productoModel.strStock_Cod"  placeholder="">
                                </el-input>
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-6" >
                        <div class="form-group row ">
                            <label class="el-form-item__label col-md-3" >Descripcion</label>
                            <div class="col-md-6 grupolabel">
                                <div class="input-group mb-3" >
                                <el-input size ="small" @focus="limpiarBotones" v-model="productoModel.strStock_Desc"  placeholder="">
                                </el-input>
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
        </div> -->
        <div class="row bodycard">
           <div class="container">
                <div class="row" style="margin-top: 3px;">
                    <div class="col-sm-6" >
                        <div class="form-group row ">
                            <label class="el-form-item__label col-md-3" >Compañia</label>
                            <div class="col-md-3 grupolabel">
                                <div class="input-group mb-3" >
                                <el-input size ="small" v-model="company_cod" :disabled="true">
                                </el-input>
                                </div>
                            </div>
                            <span style="font-size: 11px;margin-top: 5px;">{{company_desc}}</span>
                        </div> 
                    </div>
                </div>
                <div class="row" style="margin-top: 3px;">
                    <div class="col-sm-9" >
                        <div class="form-group row ">
                            <label class="el-form-item__label col-md-2" >Codigo Clase Material</label>
                            <div class="col-md-2 grupolabel">
                                <div class="input-group mb-3" >
                                <el-input size ="small"  v-model="strStock_Cod"  placeholder="">
                                </el-input>
                                </div>
                            </div>
                        </div>


                        <div class="form-group row Second">
                            <label class="el-form-item__label col-md-2" >Fecha </label>
                            <div class="col-md-2 grupolabel">
                                <div class="input-group mb-3" >
                                    <el-date-picker
                                        :disabled="checkFecha"
                                        v-model="fechaDesde"
                                        format="dd.MM.yyyy"
                                        size="mini"
                                        style="width:128px !important">
                                    </el-date-picker>
                                </div>
                            </div>    
                            <label class="el-form-item__label col-md-1" >Hasta</label>
                            <div class="col-md-2 grupolabel">
                                <div class="input-group mb-3" >
                                    <el-date-picker :disabled="checkFecha"
                                        v-model="fechaHasta"
                                        size="mini"
                                        format="dd.MM.yyyy"
                                        style="width:128px !important"
                                       >
                                    </el-date-picker>
                                </div>
                            </div>
                            <el-checkbox class="newCheckBox" @change="changeFecha()" v-model="checkFecha">
                            </el-checkbox>               
                        </div>    
                    </div>
                </div>
                <br/>
                <div class="row">
                    <div class="col-sm-12" >
                        <el-card class="box-card" style="margin-left: -10px;">
                            <div slot="header" class="headercard" style="margin-top: -4px;">
                              
                                <buttons-accions v-on:EliminarItem="EliminarItem" v-on:validarView="validarView"  v-on:handleClickInParent="handleClickInParent()"></buttons-accions>
                            </div>
                            <div class="col-md-12" >
                                <div class="row bodycard" style="background: white;margin-top: 0px;">
                                    <el-table
                                        ref="missionTable"
                                        @current-change="handleCurrentChange"
                                        :max-height="sizeScreen"
                                        :data="tableData" 
                                         highlight-current-row
                                        stripe  :default-sort = "{prop: 'date', order: 'descending'}"
                                        class="ExcelTable2007">
                                        <el-table-column type="index" label="Item" width="38">
                                        </el-table-column>
                                        
                                        <el-table-column 
                                            prop="strMatClass_Cod"  
                                            label="Cod. Clase Material">
                                            <template scope="scope">
                                                <label style="width:100%" v-bind:style="{width:'100%',margin: '0rem'}"  >&nbsp;{{ scope.row.strMatClass_Cod }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column 
                                            prop="strMatClass_Desc"  
                                            label="Descripcion Clase Material">
                                            <template scope="scope">
                                                <label style="width:100%" v-bind:style="{width:'100%',margin: '0rem'}"  >&nbsp;{{ scope.row.strMatClass_Desc }}</label>
                                            </template>
                                        </el-table-column>
                                         <el-table-column 
                                          prop="strStock_Type_Desc" label="Descripcion Tipo">
                                            <template scope="scope">
                                            <label >&nbsp;{{ scope.row.strStock_Type_Desc }}</label>
                                            </template>
                                        </el-table-column>  
                                          
                                        <el-table-column 
                                            prop="strAcct_Loc"  
                                            label="Cuenta Contable">
                                            <template scope="scope">
                                                <label style="width:100%" v-bind:style="{width:'100%',margin: '0rem'}"  >&nbsp;{{ scope.row.strAcct_Loc }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column  
                                            prop="strExp_Cod_Loc"  align="right"  
                                            label="Cuenta Gastos">
                                            <template scope="scope">
                                                <label style="width:100%"  >&nbsp;{{ scope.row.strExp_Cod_Loc }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            prop="fltPrecUnit_Local" align="center"  width="70"
                                            label="Estado">
                                            <template scope="scope">
                                                <el-tag
                                                :type="scope.row.chrStatus === 'A' ? 'success' : 'danger'"
                                                disable-transitions>{{scope.row.chrStatus=== 'A'?'Activo':'Inactivo'}}</el-tag>
                                            </template>
                                        </el-table-column>
                                         
                                    </el-table>
                                </div>
                            </div>
                        </el-card>
                    </div>
                </div>
            </div>
        </div>
    </el-card>
    <div class="footer1">
        <div class="row">
            <div class="col-sm-9" style="text-align:left" >
                <div class="col-sm-2">
                     <!-- <b-progress  :max="100" variant="success"   show-progress animated >
                         <b-progress-bar :value="50" :label="50 + '%'" />
                    </b-progress> -->
                    <vm-progress v-if="vifprogress" status="success" :percentage="percentage" :text-inside="true" :stroke-width="18" :striped="true"></vm-progress>
     
                </div>
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
    <b-modal ref="myModalRef" hide-footer title="Buscar" size="sm"  v-model="dialogBusquedaFilter" @keydown.native.enter="confirmaraceptar">
        <div style="height:85px">
        <!-- <img src="../../../../images/informacion.png" style="width:14px; height:15px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.3rem;"/> -->
        <!-- <span style="font-size:13px">¿Desea grabar el documento?</span> -->
        <div class="row" style="margin-left: 0px;">
            <div class="col-md-12">
                <div class="form-group row">
                    <label class="el-form-item__label col-md-2" >Columna</label>
                    <div class="col-md-7 grupolabel">
                        <div class="input-group mb-3" >
                            <el-input size ="small" :disabled="true" v-model="Column"  placeholder="">
                            </el-input>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row" style="margin-left: 0px;">
            <div class="col-md-12">
                <div class="form-group row">
                    <label class="el-form-item__label col-md-2" >Buscar</label>
                    <div class="col-md-7 grupolabel">
                        <div class="input-group mb-3" >
                            <el-input size ="small" v-model="txtbuscar"  placeholder="">
                                <!-- <el-button slot="append" style="padding: 3px 3px !important;background: #fff5c4;
                                    background: -webkit-gradient(left top, left bottom, color-stop(0%, #fff5c4), color-stop(100%, #ffee9f));
                                    background: -webkit-gradient(linear, left top, left bottom, from(#fff5c4), to(#ffee9f));
                                    background: linear-gradient(to bottom, #fff5c4 0%, #ffee9f 100%);" icon="fa fa-search"> 
                                </el-button> -->
                            </el-input>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
      <footer class="modal-footer">
        <img src="../../../../../../images/check.png" style="width:13px; height:15px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.6rem;" @click="btnBuscar"/>
        <img src="../../../../../../images/close.png" style="width:17px; height:15px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.6rem;" @click="dialogBusquedaFilter = false"/>
      </footer>
    </b-modal>
   
    <!--DIALOG BUSQUEDA COMPAÑIA-->
    <el-dialog title="Busqueda Compañia" :visible.sync="dialogCompania" @close="closeCompania" size="small" >
      <bcompania v-on:companiaSeleccionado="companiaSeleccionado($event);" v-on:companiaClose="companiaClose($event);" >
      </bcompania>
    </el-dialog>
    
    <!--DIALOG BUSQUEDA ALMACEN-->
    <el-dialog title="Busqueda Almacen"  :visible.sync="dialogAlmacen" @close="closeAlmacen" size="small" >
      <balmacen v-on:almacenseleccionado="SeleccionadoAlmacen($event)" >
      </balmacen>
    </el-dialog>


</div>  
  
</template>
<script>
import VisualizarClaseMaterialComponent from '@/components/LO-LOGISTICA/maestro_datos/almacen/clase_material/visualizar_clase_material/visualizar_clase_material.component'
export default VisualizarClaseMaterialComponent
</script>
<style scoped>

</style>
