
<template>

  <div class="al-crear">
    <ol  style="margin-left: -1.5rem;background: linear-gradient(rgb(229, 241, 247) 0%, rgb(255, 255, 255) 100%);    margin-bottom: 0rem !important;">
        <quickaccessmenu  v-on:validarView="cargarList()"/>
    </ol>

    <el-card class="box-card">
        <div slot="header" class="headercard">
            <span class="labelheadercard" >Visualizar Contabilidad</span>
        </div>
        <div class="row bodycard">
           <div class="container">
                <div class="row" style="margin-top: 3px;">
                    <div class="col-sm-9" >
                        <div class="form-group row ">
                            <label class="el-form-item__label col-md-2" >Compañia</label>
                            <div class="col-md-2 grupolabel">
                                <div class="input-group mb-3" >
                                <el-input  :disabled="true"
                                size ="small" 
                                @blur="desactivar_compania" 
                                
                                @focus="activar_compania" 
                                v-model="productoModel.strCompany_Cod">
                                    <el-button :disabled="true" v-if="btnactivarcompania && !dialogCompania" slot="append" class="boton" icon="fa fa-clone" @click="loadCompania()"></el-button> 
                                </el-input>
                                </div>
                            </div>
                            <span style="font-size: 11px;margin-top: 5px;">{{productoModel.strCompany_Desc}}</span>
                        </div>
                        <div class="form-group row ">
                            <label class="el-form-item__label col-md-2" >Nro. Documento</label>
                            <div class="col-md-2 grupolabel">
                                <div class="input-group mb-3" >
                                <el-input size ="small"  v-model="strPO_NO"  placeholder="">
                                </el-input>
                                </div>
                            </div>
                        </div>
                        <!-- <div class="form-group row Second">
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
                            <label class="el-form-item__label col-md-1" >Hasta</label>
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
                        </div>     -->
                    </div>
                </div>
                <br/>
                <div class="row">
                    <div class="col-sm-12" >
                        <el-card class="box-card" style="margin-left: -10px;">
                            <div slot="header" class="headercard" style="margin-top: -4px;">
                                <buttons-accions v-on:validarView="validarView"></buttons-accions>
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
                                        <el-table-column type="index" label="Linea" width="38">
                                        </el-table-column>
                                        <el-table-column  sortable prop="strAccDocum_NO" width="100" label="Nro. Documento">
                                            <template scope="scope">
                                            <label v-bind:style="{width:'100%',margin: '0rem'}" >&nbsp;{{ scope.row.strAccDocum_NO }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            prop="dtmDoc_Date" sortable  width="120"
                                            label="Fecha">
                                            <template scope="scope">
                                                <label v-bind:style="{width:'100%',margin: '0rem'}" >&nbsp;{{ scope.row.dtmDoc_Date }}</label>
                                            </template>
                                        </el-table-column>   
                                        <el-table-column
                                            prop="strDoc_Trans_Cod" sortable  width="120"
                                            label="Tipo Doc.">
                                            <template scope="scope">
                                                <label v-bind:style="{width:'100%',margin: '0rem'}" >&nbsp;{{ scope.row.strDoc_Trans_Cod }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            prop="strHeader_Desc" sortable 
                                            label="Descripcion">
                                            <template scope="scope">
                                                <label style="width:100%" v-bind:style="{width:'100%',margin: '0rem'}" >&nbsp;{{ scope.row.strHeader_Desc }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            prop="strCurrency_Cod" sortable width="100"
                                            label="Moneda">
                                            <template scope="scope">
                                                <label style="width:100%" v-bind:style="{width:'100%',margin: '0rem'}" >&nbsp;{{ scope.row.strCurrency_Cod }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            prop="fltAmount_Local" sortable width="150"
                                            label="Debe">
                                            <template scope="scope">
                                                <label style="width:100%" >&nbsp;{{ evaluarMas(scope.row.fltAmount_Local)}}</label>
                                            </template>
                                        </el-table-column>
                                        
                                        <el-table-column
                                            prop="fltAmount_Local" sortable width="100"
                                            label="Haber">
                                            <template scope="scope">
                                                <label style="width:100%"  >&nbsp;{{ evaluarMenos(scope.row.fltAmount_Local) }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            prop="strCreation_User" sortable width="100"
                                            label="Usuario Creacion">
                                            <template scope="scope">
                                                <label style="width:100%"  >&nbsp;{{ scope.row.strCreation_User }}</label>
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
import VisualizarContabilidadComponent from '@/components/FI-FINANZAS/contabilidad-general/visualizar-contabilidad/visualizar-contabilidad.component'
export default VisualizarContabilidadComponent
</script>
<style scoped>

</style>
