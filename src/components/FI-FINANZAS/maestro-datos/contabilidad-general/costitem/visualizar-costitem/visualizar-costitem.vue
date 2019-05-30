
<template>

  <div class="al-crear">
    <ol  style="margin-left: -1.5rem;background: linear-gradient(rgb(229, 241, 247) 0%, rgb(255, 255, 255) 100%);    margin-bottom: 0rem !important;">
        <quickaccessmenu v-on:validarView="cargarList()"/>
    </ol>

    <el-card class="box-card">
        <div slot="header" class="headercard">
            <span class="labelheadercard" >Visualizar CostItem</span>
        </div>
        <div class="row bodycard">
           <div class="container">
                <div class="row" style="margin-top: 3px;">
                    <div class="col-sm-9" >
                        <div class="form-group row ">
                            <label class="el-form-item__label col-md-2" >Compañia</label>
                            <div class="col-md-2 grupolabel">
                                <div class="input-group mb-3" >
                                <el-input   :disabled="true"
                                size ="small" 
                                @blur="desactivar_compania" 
                                @focus="activar_compania" 
                                v-model="formBusqueda.strCompany_Cod">
                                    <el-button v-if="btnactivarcompania && !dialogCompania" slot="append" class="boton" icon="fa fa-clone" @click="loadCompania()"></el-button> 
                                </el-input>
                                </div>
                            </div>
                            <span style="font-size: 11px;margin-top: 5px;">{{formBusqueda.strCompany_Desc}}</span>
                        </div>    
                        <div class="form-group row ">
                            <label class="el-form-item__label col-md-2" >CostItem</label>
                            <div class="col-md-2 grupolabel">
                                <div class="input-group mb-3" >
                                <el-input size ="small"  v-model="formBusqueda.strCost_Item_Cod"  placeholder="">
                                </el-input>
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
                                        <el-table-column type="index" width="38">
                                        </el-table-column>
                                        <el-table-column  sortable prop="strCost_Item_Cod" width="100" label="">
                                            <template scope="scope">
                                            <label v-bind:style="{background:cell_ocultar,width:'100%',margin: '0rem'}" >&nbsp;{{ scope.row.strCost_Item_Cod }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            prop="strCost_Item_Pos1" sortable 
                                            label="strCost_Item_Pos1">
                                            <template scope="scope">
                                                <label v-bind:style="{background:cell_ocultar,width:'100%',margin: '0rem'}" >&nbsp;{{ scope.row.strCost_Item_Pos1 }}</label>
                                            </template>
                                        </el-table-column>   
                                        <el-table-column
                                            prop="strCost_Item_Desc1" sortable 
                                            label="strCost_Item_Desc1">
                                            <template scope="scope">
                                                <label v-bind:style="{background:cell_ocultar,width:'100%',margin: '0rem'}" >&nbsp;{{ scope.row.strCost_Item_Desc1 }}</label>
                                            </template>
                                        </el-table-column>  
                                        <el-table-column
                                            prop="strCost_Item_Pos2" sortable 
                                            label="strCost_Item_Pos2">
                                            <template scope="scope">
                                                <label v-bind:style="{background:cell_ocultar,width:'100%',margin: '0rem'}" >&nbsp;{{ scope.row.strCost_Item_Pos2 }}</label>
                                            </template>
                                        </el-table-column>  
                                        <el-table-column
                                            prop="strCost_Item_Desc2" sortable 
                                            label="strCost_Item_Desc2">
                                            <template scope="scope">
                                                <label v-bind:style="{background:cell_ocultar,width:'100%',margin: '0rem'}" >&nbsp;{{ scope.row.strCost_Item_Desc2 }}</label>
                                            </template>
                                        </el-table-column>  
                                        <el-table-column
                                            prop="strCost_Item_Pos3" sortable 
                                            label="strCost_Item_Pos3">
                                            <template scope="scope">
                                                <label v-bind:style="{background:cell_ocultar,width:'100%',margin: '0rem'}" >&nbsp;{{ scope.row.strCost_Item_Pos3 }}</label>
                                            </template>
                                        </el-table-column>   
                                        <el-table-column
                                            prop="strCost_Item_Desc3" sortable 
                                            label="strCost_Item_Desc3">
                                            <template scope="scope">
                                                <label v-bind:style="{background:cell_ocultar,width:'100%',margin: '0rem'}" >&nbsp;{{ scope.row.strCost_Item_Desc3 }}</label>
                                            </template>
                                        </el-table-column>   
                                        <el-table-column
                                            prop="strCreation_User" sortable  width="120"
                                            label="Usuario">
                                            <template scope="scope">
                                                <label v-bind:style="{background:cell_ocultar,width:'100%',margin: '0rem'}" >&nbsp;{{ scope.row.strCreation_User }}</label>
                                            </template>
                                        </el-table-column>   
                                        
                                        <el-table-column
                                            prop="dtmCreation_Date" sortable width="100"
                                            label="Fecha">
                                            <template scope="scope">
                                                <label style="width:100%"  >&nbsp;{{ getParseDate(scope.row.dtmCreation_Date) }}</label>
                                            </template>
                                        </el-table-column>   
                                        <el-table-column
                                            prop="strModified_User" sortable  width="120"
                                            label="Usuario Modificacion">
                                            <template scope="scope">
                                                <label v-bind:style="{background:cell_ocultar,width:'100%',margin: '0rem'}" >&nbsp;{{ scope.row.strModified_User }}</label>
                                            </template>
                                        </el-table-column>   
                                        
                                        <el-table-column
                                            prop="dtmModified_Date" sortable width="100"
                                            label="Fecha">
                                            <template scope="scope">
                                                <label style="width:100%"  >&nbsp;{{ getParseDate(scope.row.dtmModified_Date) }}</label>
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
                <img src="../../../../../../images/save.png" v-if="issave" style="width:16px; height:17px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 1.3rem;" @click="fnOcultar()"/>
                <img src="../../../../../../images/save.png" v-if="iserror" style="width:16px; height:17px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 1.3rem;" @click="fnOcultar()"/>
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
   
    <!--DIALOG BUSQUEDA COMPAÑIA-->
    <el-dialog title="Busqueda Compañia" :visible.sync="dialogCompania" @close="closeCompania" size="small" >
      <bcompania v-on:companiaSeleccionado="companiaSeleccionado($event);" v-on:companiaClose="companiaClose($event);" >
      </bcompania>
    </el-dialog>
</div>  
  
</template>
<script>
import VisualizarCostItemComponent from '@/components/FI-FINANZAS/maestro-datos/contabilidad-general/costitem/visualizar-costitem/visualizar-costitem.component'
export default VisualizarCostItemComponent
</script>
<style scoped>

</style>
