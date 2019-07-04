<template>
    <div class="crear-ingreso-comprobante">
        <ol  style="margin-left: -1.5rem;background: linear-gradient(rgb(229, 241, 247) 0%, rgb(255, 255, 255) 100%);    margin-bottom: 0rem !important;">
            <quickaccessmenu  v-on:validarView="validad()" v-on:backPage="backPage($event)"  v-on:reloadpage="reloadpage($event)"/>
        </ol>
        <el-card class="box-card">
            <div slot="header" class="headercard">
                <span class="labelheadercard" > Visualizar Tipo de Adquisicion</span>
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
                                <label class="el-form-item__label col-md-2" >Codigo</label>
                                <div class="col-md-2 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input class="validador" size ="small" v-model="documento.strTypeAdq_PDB_Cod" style="text-transform: capitalize" type="text" >  
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
                    <span slot="label"><i class="el-icon-date"></i> Tipos de Adquisicion</span>                    
                    <buttons-accions v-on:validarView="validarView()" v-on:Limpiar="Limpiar" v-on:Print="Print" v-on:Buscar="Buscar" v-on:AscItem="AscItem" v-on:DscItem="DscItem" v-on:EliminarItem="EliminarItem()" v-on:siguiente="siguiente()" v-on:anterior="anterior()"></buttons-accions>
                    <div class="col-md-12" >
                        <div class="row " style="background: white;margin-top: 0px;">
                        <el-table
                            :max-height="sizeScreen"
                            :data="gridDocumento"
                            highlight-current-row
                            class="ExcelTable2007"
                            @header-click="headerclick"
                            @current-change="handleCurrentChange"
                            >
                            <el-table-column type="index" width="45">                                
                            </el-table-column>
                            <el-table-column :render-header="filterstrTypeAdq_PDB_Cod"
                            prop="strTypeAdq_PDB_Cod" label="Codigo" width="100" align="center">                                
                            </el-table-column>
                            <el-table-column  :render-header="filterstrTypeAdq_PDB_Desc"
                             prop="strTypeAdq_PDB_Desc" min-width="200" label="Descripcion">
                            </el-table-column>
                            <el-table-column :render-header="filterdtmModified_Date"
                                prop="dtmModified_Date"   min-width="80"
                                label="Fecha Creada">
                                <template scope="scope">
                                    <span>{{ getDateStringView(scope.row.dtmModified_Date) }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column :render-header="filterstrModify_User"
                            width="100" align="center"
                                prop="strModify_User" 
                                label="Usuario">
                            </el-table-column>
                            <el-table-column
                                align="center"
                                label="Estato"
                                width="100">
                                <template scope="scope">
                                    <el-button
                                    :type="scope.row.chrStatus === 'C' ? 'danger' : 'success'"
                                    size="small"
                                    >{{scope.row.chrStatus=== 'C'?'Inactivo':'Activo'}}                                    
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
                            <el-input size ="small" v-model="txtbuscar"  @keydown.native.enter="btnBuscar()">  
                            </el-input>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
      <footer class="modal-footer">
        <img src="../../../../images/check.png" style="width:13px; height:15px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.6rem;" @click="btnBuscar()"/>
        <img src="../../../../images/close.png" style="width:17px; height:15px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.6rem;" @click="dialogBusquedaFilter = false"/>
      </footer>
    </b-modal>    
    </div>  
</template>
<script>

import VisualizarAdquisicionComponent from '@/components/XX-CONFI/maestro_datos/tipo_adquisicion/visualizar_adquisicion.component'
export default VisualizarAdquisicionComponent
</script>
<style scoped>
    
</style>
