
<template>

  <div class="al-crear">
    <ol  style="margin-left: -1.5rem;background: linear-gradient(rgb(229, 241, 247) 0%, rgb(255, 255, 255) 100%);    margin-bottom: 0rem !important;">
        <quickaccessmenu v-on:guardarTodo="guardarTodo($event)" v-on:validarView="Buscar()" v-on:backPage="backPage($event)"  v-on:reloadpage="reloadpage($event)"/>
    </ol>

    <el-card class="box-card">
        <div slot="header" class="headercard">
            <span class="labelheadercard" >Visualizar Salida Material</span>
        </div>
        <!-- <div class="row bodycard">
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
                            <label class="el-form-item__label col-md-2" >Codigo</label>
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
                            <label class="el-form-item__label col-md-2" >Fecha Desde</label>
                            <div class="col-md-2 grupolabel">
                                <div class="input-group mb-3" >
                                    <el-date-picker
                                        v-model="fechaDesde"
                                        size="mini"
                                        style="width:128px !important">
                                    </el-date-picker>
                                </div>
                            </div>    
                            <label class="el-form-item__label col-md-2" >Hasta</label>
                            <div class="col-md-2 grupolabel">
                                <div class="input-group mb-3" >
                                    <el-date-picker
                                        v-model="fechaHasta"
                                        size="mini"
                                        style="width:128px !important"
                                       >
                                    </el-date-picker>
                                </div>
                            </div>                   
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
                                        @row-dblclick="validarView"
                                         highlight-current-row
                                         @current-change="handleCurrentChange"
                                        stripe  :default-sort = "{prop: 'date', order: 'descending'}"
                                        class="ExcelTable2007">
                                        <el-table-column type="index" label="Item" width="38">
                                        </el-table-column>
                                        <el-table-column  sortable prop="strIssueAjust_NO" width="100" label="Vale Salida">
                                            <template scope="scope">
                                            <label >&nbsp;{{ scope.row.strIssueAjust_NO }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            prop="dtmTransaction_Date" sortable  width="120"
                                            label="Fecha Requerida">
                                            <template scope="scope">
                                                <label >&nbsp;{{ getDateString(scope.row.dtmTransaction_Date) }}</label>
                                            </template>
                                        </el-table-column>  
                                        <el-table-column
                                            prop="strTypeMov_Desc" sortable  
                                            label="Tipo Mov.">
                                            <template scope="scope">
                                                <label >&nbsp;{{ scope.row.strTypeMov_Desc }}</label>
                                            </template>
                                        </el-table-column>  
                                        <el-table-column
                                            prop="strWHS_Desc" sortable  width="150"
                                            label="Almacen">
                                            <template scope="scope">
                                                <label >&nbsp;{{ scope.row.strWHS_Desc }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            prop="strCreation_User" sortable width="100"
                                            label="Usuario">
                                            <template scope="scope">
                                                <label >&nbsp;{{ scope.row.strCreation_User }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            prop="dtmCreation_Date" sortable width="100"
                                            label="Fecha">
                                            <template scope="scope">
                                                <label >&nbsp;{{ getDateString(scope.row.dtmCreation_Date) }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column 
                                            prop="chrStatus" align="center"  width="80"
                                            label="Estado">
                                            <template scope="scope">
                                                <el-tag
                                                :type="scope.row.chrStatus.trim() === '50' ? 'success' :scope.row.chrStatus.trim() === '70'?'danger': 'warning'"
                                                disable-transitions>{{getEstado(scope.row.chrStatus)}}</el-tag>
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
   
    <!--DIALOG BUSQUEDA COMPAÑIA-->
    <el-dialog title="Busqueda Compañia" :visible.sync="dialogCompania" @close="closeCompania" size="small" >
      <bcompania v-on:companiaSeleccionado="companiaSeleccionado($event);" v-on:companiaClose="companiaClose($event);" >
      </bcompania>
    </el-dialog>
</div>  
  
</template>
<script>
import VisualizarSalidaMaterialComponent from '@/components/LO-LOGISTICA/almacen/al_salida_visualizar/al_salida_visualizar.component'
export default VisualizarSalidaMaterialComponent
</script>
<style scoped>

</style>
