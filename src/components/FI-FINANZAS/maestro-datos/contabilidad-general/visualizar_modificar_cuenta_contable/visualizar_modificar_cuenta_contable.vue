<template>
    <div class="modificar-cuenta-contable">
        <ol  style="margin-left: -1.5rem;background: linear-gradient(rgb(229, 241, 247) 0%, rgb(255, 255, 255) 100%);    margin-bottom: 0rem !important;">
            <quickaccessmenu  v-on:validarView="validad()" v-on:backPage="backPage($event)"  v-on:reloadpage="reloadpage($event)"/>
        </ol>
        <el-card class="box-card">
            <div slot="header" class="headercard">
                <span class="labelheadercard" > Modificar Cuenta Contable</span>
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
                                    <el-input disabled size ="small" v-model="companyCod"  placeholder="">
                                    </el-input>
                                    </div>
                                </div>
                                <span style="font-size: 11px;margin-top: 5px;">{{companyName}}</span>
                            </div>
                            <div  class="form-group row ">
                                <label class="el-form-item__label col-md-2" >Cuenta Contable</label>
                                <div class="col-md-2 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input class="validador" size ="small" v-model="strAcc_Local_NO" style="text-transform: capitalize" type="text" @keydown.native.enter="validad()">  
                                    </el-input>
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
                    <span slot="label"><i class="el-icon-date"></i> Cuenta Contables</span>                    
                    <buttons-accions v-on:validarView="validarView()" v-on:Activar="ActivarDesactivar()" v-on:Limpiar="Limpiar" v-on:Print="Print" v-on:Buscar="Buscar" v-on:AscItem="AscItem" v-on:DscItem="DscItem" v-on:EliminarItem="EliminarItem()" v-on:siguiente="siguiente()" v-on:anterior="anterior()"></buttons-accions>
                    <div class="col-md-12" >
                        <div class="row " style="background: white;margin-top: 0px;">
                        <el-table
                            v-loading="loading1"
                            element-loading-text="Cargando..."
                            element-loading-spinner="el-icon-loading"
                            element-loading-background="rgba(0, 0, 0, 0.8)"
                            :max-height="sizeScreen"
                            :data="gridGrupoCuenta"
                            highlight-current-row
                            class="ExcelTable2007"
                            @header-click="headerclick"
                            @row-dblclick="validarView"
                            @current-change="handleCurrentChange"
                            >
                            <el-table-column type="index" label="Item" width="45">                                
                            </el-table-column>
                            <el-table-column :render-header="filterstrAcc_Local_NO"
                            prop="strAcc_Local_NO" label="Cuenta Contable" width="100" align="center">                                
                            </el-table-column>
                            <el-table-column  :render-header="filterstrAcc_Local_Name"
                             prop="strAcc_Local_Name" min-width="200" label="Descripcion">
                            </el-table-column>
                            <el-table-column :render-header="filterstrAcc_Type"
                            prop="strAcc_Type" label="Tipo" width="100" align="center">                                
                            </el-table-column>
                            <el-table-column :render-header="filterstrGrpAcctCont_Cod"
                            prop="strGrpAcctCont_Cod" label="Rubro" width="100" >                                
                            </el-table-column>
                            <el-table-column :render-header="filterstrExpGroup_Cod"
                            prop="strExpGroup_Cod" label="Grupo" width="80" align="center">                                
                            </el-table-column>
                            <el-table-column :render-header="filterdtmModified_Date"
                                prop="dtmModified_Date"   min-width="80"
                                label="Fecha ">
                                <template scope="scope">
                                    <span>{{ getDateStringView(scope.row.dtmModified_Date) }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column :render-header="filterstrModified_User"
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
        <b-modal ref="myModalRef" hide-footer title="Buscar" size="sm"  v-model="dialogBusquedaFilter" @keydown.native.enter="confirmaraceptar">
      <div style="height:85px">
        <!-- <img src="../../../../../../images/informacion.png" style="width:14px; height:15px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.3rem;"/> -->
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
                            <el-input size ="small" v-model="txtbuscar"  @keydown.native.enter="btnBuscar()">  
                            </el-input>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
      <footer class="modal-footer">
        <img src="../../../../../images/check.png" style="width:13px; height:15px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.6rem;" @click="btnBuscar()"/>
        <img src="../../../../../images/close.png" style="width:17px; height:15px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.6rem;" @click="dialogBusquedaFilter = false"/>
      </footer>
    </b-modal>  
    <b-modal ref="myModalRef" hide-footer title="Inactivar" size="sm"  v-model="dialogEliminar" @keydown.native.enter="btnEliminar">
      <div style="height:85px"> 
        <img src="../../../../../images/tacho.png" style="width:14px; height:15px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.3rem;"/>
        <span style="font-size:13px">¿Desea Inactivar el Cuenta Contable {{cuentacontable.strAcc_Local_NO}}?</span>
      </div>
      <footer class="modal-footer">
        <img src="../../../../../images/check.png" style="width:13px; height:15px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.6rem;" @click="btnEliminar"/>
        <img src="../../../../../images/close.png" style="width:17px; height:15px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.6rem;" @click="dialogEliminar = false"/>
      </footer>
    </b-modal>  
    <b-modal ref="myModalRef" hide-footer title="Activar" size="sm"  v-model="dialogInactivar" @keydown.native.enter="btnActivar">
      <div style="height:85px"> 
        <img src="../../../../../images/tacho.png" style="width:14px; height:15px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.3rem;"/>
        <span style="font-size:13px">¿Desea Activar el Cuenta Contable {{cuentacontable.strAcc_Local_NO}}?</span>
      </div>
      <footer class="modal-footer">
        <img src="../../../../../images/check.png" style="width:13px; height:15px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.6rem;" @click="btnActivar"/>
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
