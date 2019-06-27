
<template>

  <div class="al-crear">
    <ol  style="margin-left: -1.5rem;background: linear-gradient(rgb(229, 241, 247) 0%, rgb(255, 255, 255) 100%);    margin-bottom: 0rem !important;">
        <quickaccessmenu v-on:guardarTodo="guardarTodo($event)" v-on:validarView="Buscar()" v-on:backPage="backPage($event)"  v-on:reloadpage="reloadpage($event)"/>
    </ol>

    <el-card class="box-card">
        <div slot="header" class="headercard">
            <span class="labelheadercard" >Modificar Salida Material</span>
        </div>
        <!--<div class="row bodycard">
            <div class="container">
                 <div class="row">
                    <div class="col-sm-6" >
                        <div class="form-group row ">
                            <label class="el-form-item__label col-md-3" >Fecha Base</label>
                            <div class="col-md-6 grupolabel">
                                <div class="input-group mb-3" >
                                    <el-date-picker
                                        v-model="fechaRecepcionEdit"
                                        type="date"
                                        format="dd/MM/yyyy"
                                        placeholder="*"
                                        size="small"
                                        :editable = "false">
                                    </el-date-picker>
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-6" >
                        <div class="form-group row ">
                            <label class="el-form-item__label col-md-3" >Codigo Salida</label>
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
                            <label class="el-form-item__label col-md-3" >Tipo Movimiento</label>
                            <div class="col-md-3 grupolabel">
                                <div class="input-group mb-3" >
                                <el-input size ="small"   placeholder="">
                                    <el-button  slot="append" class="boton" icon="fa fa-clone" ></el-button> 
                                </el-input>
                                </div>
                            </div>
                            <span style="font-size: 11px;margin-top: 5px;">{{destipomovimiento}}</span>
                        </div> 
                    </div>
                </div>
                
                <div class="row">
                    <div class="col-sm-6" >
                        <div class="form-group row ">
                            <label class="el-form-item__label col-md-3" >Centro Costos</label>
                            <div class="col-md-3 grupolabel">
                                <div class="input-group mb-3" >
                                <el-input size ="small"   placeholder="">
                                    <el-button  slot="append" class="boton" icon="fa fa-clone" ></el-button> 
                                </el-input>
                                </div>
                            </div>
                            <span style="font-size: 11px;margin-top: 5px;">{{destipomovimiento}}</span>
                        </div> 
                    </div>
                </div>
            </div>
        </div> -->
        <div class="row bodycard">
           <div class="container">
                <div class="row" style="margin-top: 3px;">
                    <div class="col-sm-9" >
                        <div class="form-group row ">
                            <label class="el-form-item__label col-md-2" >Compañia</label>
                            <div class="col-md-2 grupolabel">
                                <div class="input-group mb-3" >
                                <el-input size ="small" v-model="company_cod" :disabled="true">
                                </el-input>
                                </div>
                            </div>
                            <span style="font-size: 11px;margin-top: 5px;">{{company_desc}}</span>
                        </div> 
                        <div class="form-group row ">
                            <label class="el-form-item__label col-md-2" >Almacen</label>
                             <div class="col-md-2 grupolabel">
                                <div class="input-group mb-3" >
                                <el-input size ="small" @blur="desactivar_almacen" @focus="activar_almacen" v-model="strWHS_Cod"  placeholder=""  @keyup.enter.native="enterAlmacen(strWHS_Cod)"  @keyup.delete.native="borrarAlmacen()">
                                    <el-button v-if="btnactivaralmacen && !dialogAlmacen" slot="append" class="boton" icon="fa fa-clone" @click="loadAlmacen()"></el-button> 
                                </el-input>
                                </div>
                            </div>
                            <span style="font-size: 11px;margin-top: 5px;">{{strWHS_Desc}}</span>
                        </div> 
                        <div class="form-group row ">
                            <label class="el-form-item__label col-md-2" >Vale Salida</label>
                            <div class="col-md-2 grupolabel">
                                <div class="input-group mb-3" >
                                <el-input size ="small"  v-model="formBusqueda.strIssueAjust_NO"  placeholder="">
                                </el-input>
                                </div>
                            </div>
                            <label class="el-form-item__label col-md-2" >Tipo Movimiento</label>
                            <div class="col-md-2 grupolabel">
                                <div class="input-group mb-3" >
                                <el-input size ="small"   @blur="desactivar_tipo_movimiento" @focus="activar_tipo_movimiento" v-model="strTypeMov_Cod"  placeholder="">
                                    <el-button v-if="btnactivartipomovimiento && !dialogTipoMovimiento" slot="append" class="boton" icon="fa fa-clone" @click="loadTipoMovimiento()"></el-button> 
                                </el-input>
                                </div>
                            </div>
                        </div>
                        <!-- <div class="form-group row ">
                            <label class="el-form-item__label col-md-2" >Tipo Movimiento</label>
                            <div class="col-md-2 grupolabel">
                                <div class="input-group mb-3" >
                                <el-input size ="small"   placeholder="">
                                    <el-button  slot="append" class="boton" icon="fa fa-clone" ></el-button> 
                                </el-input>
                                </div>
                            </div>
                            <label class="el-form-item__label col-md-2" >Centro Costos</label>
                            <div class="col-md-2 grupolabel">
                                <div class="input-group mb-3" >
                                <el-input size ="small"   placeholder="">
                                    <el-button  slot="append" class="boton" icon="fa fa-clone" ></el-button> 
                                </el-input>
                                </div>
                            </div>
                        </div>  -->
                        <div class="form-group row Second">
                            <label class="el-form-item__label col-md-2" >Fecha</label>
                            <div class="col-md-2 grupolabel">
                                <div class="input-group mb-3" >
                                    <el-date-picker :disabled="checkFecha"
                                        v-model="fechaDesde"
                                        size="mini"
                                        style="width:128px !important">
                                    </el-date-picker>
                                </div>
                            </div>    
                            <label class="el-form-item__label col-md-2" >Hasta</label>
                            <div class="col-md-2 grupolabel">
                                <div class="input-group mb-3" >
                                    <el-date-picker :disabled="checkFecha"
                                        v-model="fechaHasta"
                                        size="mini"
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
                                <buttons-accions v-on:validarView="validarView" ></buttons-accions>
                        
                                <!-- <buttons-accions v-on:handleClickInParent="handleClickInParent()"></buttons-accions> -->
                            </div>
                            <div class="col-md-12" >
                                <div class="row bodycard" style="background: white;margin-top: 0px;">
                                    <el-table
                                        ref="missionTable"
                                        :max-height="sizeScreen"
                                        :data="tableData" 
                                         highlight-current-row
                                         @current-change="handleCurrentChange"
                                        stripe  :default-sort = "{prop: 'date', order: 'descending'}"
                                        class="ExcelTable2007">
                                        <el-table-column type="index" label="Item" width="38">
                                        </el-table-column>
                                        <el-table-column  sortable prop="strIssueAjust_NO" width="100" label="Codigo">
                                            <template scope="scope">
                                            <label >&nbsp;{{ scope.row.strIssueAjust_NO }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            prop="strCompany_Cod" sortable  width="120"
                                            label="Codigo Compañia">
                                            <template scope="scope">
                                                <label >&nbsp;{{ scope.row.strCompany_Cod }}</label>
                                            </template>
                                        </el-table-column>  
                                        <el-table-column
                                            prop="strCompany_Desc" sortable  width="180"
                                            label="Compañia">
                                            <template scope="scope">
                                                <label >&nbsp;{{ scope.row.strCompany_Desc }}</label>
                                            </template>
                                        </el-table-column>  
                                        <el-table-column
                                            prop="strTypeMov_Cod" sortable  width="120"
                                            label="Codigo Tipo Movimiento">
                                            <template scope="scope">
                                                <label >&nbsp;{{ scope.row.strTypeMov_Cod }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            prop="strTypeMov_Desc" sortable width="100"
                                            label="Tipo Movimiento">
                                            <template scope="scope">
                                                <label >&nbsp;{{ scope.row.strTypeMov_Desc }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            prop="strWHS_Cod" sortable width="150"
                                            label="Codigo Almacen">
                                            <template scope="scope">
                                                <label >&nbsp;{{ scope.row.strWHS_Cod }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            prop="strWHS_Desc" sortable 
                                            label="Almacen">
                                            <template scope="scope">
                                                <label >&nbsp;{{ scope.row.strWHS_Desc }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            prop="dtmTransaction_Date" sortable width="100"
                                            label="Fecha">
                                            <template scope="scope">
                                                <label >&nbsp;{{ getParseDate(scope.row.dtmTransaction_Date) }}</label>
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
                <img src="../../../../images/save.png" v-if="issave" style="width:16px; height:17px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 1.3rem;" @click="fnOcultar()"/>
                <img src="../../../../images/save.png" v-if="iserror" style="width:16px; height:17px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 1.3rem;" @click="fnOcultar()"/>
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
    <!--DIALOG BUSQUEDA ALMACEN-->
    <el-dialog title="Busqueda Almacen"  :visible.sync="dialogAlmacen"  size="small" >
      <balmacen v-on:almacenseleccionado="almacenseleccionado($event)" >
      </balmacen>
    </el-dialog>
    <!--DIALOG BUSQUEDA COMPAÑIA-->
    <el-dialog title="Busqueda Compañia" :visible.sync="dialogCompania" @close="closeCompania" size="small" >
      <bcompania v-on:companiaSeleccionado="companiaSeleccionado($event);" v-on:companiaClose="companiaClose($event);" >
      </bcompania>
    </el-dialog>
       <!--DIALOG BUSQUEDA TIPO MOVIMIENTO-->
    <el-dialog title="Busqueda Tipo Movimiento"  :visible.sync="dialogTipoMovimiento"  size="small" >
      <btipomovimiento v-on:tipomovimientoselecionado="tipomovimientoSelecionado($event)" v-on:tipomovimientoclose="tipomovimientoClose($event)">
      </btipomovimiento>
    </el-dialog>
</div>  
  

</template>
<script>
import VisualizarSalidaModificarMaterialComponent from '@/components/LO-LOGISTICA/almacen/al_salida_visualizar_modificar/al_salida_visualizar_modificar.component'
export default VisualizarSalidaModificarMaterialComponent
</script>
<style scoped>

</style>
