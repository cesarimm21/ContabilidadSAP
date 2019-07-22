
<template>

  <div class="al-crear">
    <ol  style="margin-left: -1.5rem;background: linear-gradient(rgb(229, 241, 247) 0%, rgb(255, 255, 255) 100%);    margin-bottom: 0rem !important;">
        <quickaccessmenu v-on:validarView="cargarList()"/>
    </ol>

    <el-card class="box-card">
        <div slot="header" class="headercard">
            <span class="labelheadercard" >Modificar Cuenta Contable</span>
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
                                v-model="strCompany_Cod">
                                    <!-- <el-button v-if="btnactivarcompania && !dialogCompania" slot="append" class="boton" icon="fa fa-clone" @click="loadCompania()"></el-button>  -->
                                </el-input>
                                </div>
                            </div>
                            <span style="font-size: 11px;margin-top: 5px;">{{strCompany_Desc}}</span>
                        </div>
                        <div class="form-group row ">
                            <label class="el-form-item__label col-md-2" >Cuenta</label>
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
                                <buttons-accions v-on:Activar="ActivarDesactivar()" v-on:EliminarItem="EliminarItem()"  v-on:validarView="validarView()" ></buttons-accions>
                            </div>
                            <div class="col-md-12" >
                                <div class="row bodycard" style="background: white;margin-top: 0px;">
                                    <el-table
                                        ref="missionTable"
                                        :max-height="sizeScreen"
                                        :data="tableData" 
                                        highlight-current-row
                                        @row-dblclick="validarView"
                                        @current-change="handleCurrentChange"
                                        stripe  :default-sort = "{prop: 'date', order: 'descending'}"
                                        class="ExcelTable2007">
                                        <el-table-column type="index" label="Item" width="38">
                                        </el-table-column>
                                        <el-table-column  sortable prop="strAcc_Local_NO" width="100" label="Cuenta Contable">
                                            <template scope="scope">
                                            <label v-bind:style="{width:'100%',margin: '0rem'}" >&nbsp;{{ scope.row.strAcc_Local_NO }}</label>
                                            </template>
                                        </el-table-column> 
                                        <el-table-column
                                            prop="strAcc_Local_Name" sortable  width="250"
                                            label="Descripcion">
                                            <template scope="scope">
                                                <label v-bind:style="{width:'100%',margin: '0rem'}" @click="clickcategorialinea(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ scope.row.strAcc_Local_Name }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            prop="strAcc_Type" sortable width="150"
                                            label="Tipo">
                                            <template scope="scope">
                                                <label style="width:100%" v-bind:style="{width:'100%',margin: '0rem'}"  @click="clickcuentacontable(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ scope.row.strAcc_Type }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            prop="strGrpAcctCont_Cod" sortable width="100"
                                            label="Rubro">
                                            <template scope="scope">
                                                <label style="width:100%" v-bind:style="{width:'100%',margin: '0rem'}" @click="clickcuentacontable(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ scope.row.strGrpAcctCont_Cod }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            prop="strExpGroup_Cod" sortable width="150"
                                            label="Grupo">
                                            <template scope="scope">
                                                <label style="width:100%" @click="clickmaterialdescripcion(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ scope.row.strExpGroup_Cod }}</label>
                                            </template>
                                        </el-table-column>
                                         <el-table-column :render-header="filterdtmCreation_Date"
                                            prop="dtmModified_Date"   min-width="80"
                                            label="Fecha">
                                            <template scope="scope">
                                                <span>{{ getDateStringView(scope.row.dtmModified_Date) }}</span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column :render-header="filterstrCreation_User"
                                            prop="strModified_User" 
                                            label="Usuario">
                                        </el-table-column>
                                        <el-table-column 
                                            prop="chrStatus" align="center"  width="100"
                                            label="Estado">
                                            <template scope="scope">
                                                <el-tag
                                                :type="scope.row.chrStatus.trim() === 'A' ? 'success': 'danger'"
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
                <img src="../../../../../images/save.png" v-if="issave" style="width:16px; height:17px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 1.3rem;" @click="fnOcultar()"/>
                <img src="../../../../../images/save.png" v-if="iserror" style="width:16px; height:17px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 1.3rem;" @click="fnOcultar()"/>
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
   
    <!--DIALOG BUSQUEDA COMPAÑIA-->
    <el-dialog title="Busqueda Compañia" :visible.sync="dialogCompania" @close="closeCompania" size="small" >
      <bcompania v-on:companiaSeleccionado="companiaSeleccionado($event);" v-on:companiaClose="companiaClose($event);" >
      </bcompania>
    </el-dialog>
    <b-modal ref="myModalRef" hide-footer title="Eliminar" size="sm"  v-model="dialogEliminar" @keydown.native.enter="btnEliminar">
      <div style="height:85px"> 
        <img src="../../../../../images/tacho.png" style="width:14px; height:15px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.3rem;"/>
        <span style="font-size:13px">¿Desea Eliminar el documento?</span>
      </div>
      <footer class="modal-footer">
        <img src="../../../../../images/check.png" style="width:13px; height:15px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.6rem;" @click="btnEliminar"/>
        <img src="../../../../../images/close.png" style="width:17px; height:15px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.6rem;" @click="dialogEliminar = false"/>
      </footer>
    </b-modal>
    <b-modal ref="myModalRef" hide-footer title="Activar" size="sm"  v-model="dialogInactivar" @keydown.native.enter="btnInactivar">
      <div style="height:85px"> 
        <img src="../../../../../images/tacho.png" style="width:14px; height:15px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.3rem;"/>
        <span style="font-size:13px">¿Desea Activar la Cuenta {{item}}?</span>
      </div>
      <footer class="modal-footer">
        <img src="../../../../../images/check.png" style="width:13px; height:15px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.6rem;" @click="btnInactivar"/>
        <img src="../../../../../images/close.png" style="width:17px; height:15px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.6rem;" @click="dialogInactivar = false"/>
      </footer>
    </b-modal>
</div>  
  
</template>
<script>
import VisualizarModificarCuentaContableComponent from '@/components/FI-FINANZAS/maestro-datos/contabilidad-general/visualizar_modificar_cuenta_contable/visualizar_modificar_cuenta_contable.component'
export default VisualizarModificarCuentaContableComponent
</script>
<style scoped>

</style>
