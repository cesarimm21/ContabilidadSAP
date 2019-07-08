
<template>

  <div class="al-crear">
    <ol style="margin-left: -1.5rem;background: linear-gradient(rgb(229, 241, 247) 0%, rgb(255, 255, 255) 100%);    margin-bottom: 0rem !important;">
        <quickaccessmenu v-on:validarView="BuscarProducto" v-on:backPage="backPage($event)"  v-on:reloadpage="reloadpage($event)"/>
    </ol>

    <el-card class="box-card">
        <div slot="header" class="headercard">
            <span class="labelheadercard" >Modificar Clase Servicio</span>
        </div>       
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
                            <label class="el-form-item__label col-md-2" >Clase Servicio</label>
                            <div class="col-md-2 grupolabel">
                                <div class="input-group mb-3" >
                                <el-input size ="small"  v-model="clasematerialmodel.strMatClass_Cod"  placeholder="">
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
                                <buttons-accions v-on:validarView="validarView()" v-on:Limpiar="Limpiar" v-on:Print="Print" v-on:Buscar="Buscar" v-on:AscItem="AscItem" v-on:DscItem="DscItem" v-on:EliminarItem="EliminarItem()" v-on:siguiente="siguiente()" v-on:anterior="anterior()"></buttons-accions>
                            </div>
                            <div class="col-md-12" >
                                <div class="row bodycard" style="background: white;margin-top: 0px;">
                                    <el-table
                                        ref="missionTable"
                                        :max-height="sizeScreen"
                                        :data="tableData" 
                                        @header-click="headerclick"
                                        @current-change="handleCurrentChange"
                                         highlight-current-row
                                        stripe  :default-sort = "{prop: 'date', order: 'descending'}"
                                        class="ExcelTable2007">
                                        <el-table-column type="index" label="Item" width="38">
                                        </el-table-column>                                        
                                        <el-table-column :render-header="filterstrMatClass_Cod"
                                            prop="strMatClass_Cod"  
                                            label="Clase Material"
                                            width="120">
                                            <template scope="scope">
                                                <label style="width:100%" v-bind:style="{width:'100%',margin: '0rem'}"  >&nbsp;{{ scope.row.strMatClass_Cod }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column :render-header="filterstrMatClass_Desc"
                                            prop="strMatClass_Desc"  
                                            label="Descripcion Clase Material" width="320">
                                            <template scope="scope">
                                                <label style="width:100%" v-bind:style="{width:'100%',margin: '0rem'}"  >&nbsp;{{ scope.row.strMatClass_Desc }}</label>
                                            </template>
                                        </el-table-column>
                                         <el-table-column :render-header="filterstrStock_Type_Desc"
                                          prop="strStock_Type_Desc" label="Descripcion Tipo" width="200">
                                            <template scope="scope">
                                            <label >&nbsp;{{ scope.row.strStock_Type_Desc }}</label>
                                            </template>
                                        </el-table-column>  
                                          
                                        <el-table-column :render-header="filterstrAcct_Loc"
                                            prop="strAcct_Loc"  
                                            label="Cuenta Contable" width="120">
                                            <template scope="scope">
                                                <label style="width:100%" v-bind:style="{width:'100%',margin: '0rem'}"  >&nbsp;{{ scope.row.strAcct_Loc }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column  :render-header="filterstrExp_Cod_Loc"
                                            prop="strExp_Cod_Loc"  
                                            label="Cuenta Gastos" width="120">
                                            <template scope="scope">
                                                <label style="width:100%"  >&nbsp;{{ scope.row.strExp_Cod_Loc }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column :render-header="filterdtmModified_Date"
                                            prop="dtmModified_Date"   min-width="80"
                                            label="Fecha">
                                            <template scope="scope">
                                                <span>{{ getDateStringView(scope.row.dtmModified_Date) }}</span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column :render-header="filterstrModified_User"
                                            prop="strModified_User" 
                                            label="Usuario">
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
        <img src="../../../../../../images/check.png" style="width:13px; height:15px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.6rem;" @click="btnBuscar"/>
        <img src="../../../../../../images/close.png" style="width:17px; height:15px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.6rem;" @click="dialogBusquedaFilter = false"/>
      </footer>
    </b-modal>
    <!--DIALOG BUSQUEDA ALMACEN-->
    <el-dialog title="Busqueda Almacen"  :visible.sync="dialogAlmacen" @close="closeAlmacen" size="small" >
      <balmacen v-on:almacenseleccionado="SeleccionadoAlmacen($event)" >
      </balmacen>
    </el-dialog>
 <b-modal ref="myModalRef" hide-footer title="Eliminar Clase Servicio" size="sm"  v-model="claseDialog" @keydown.native.enter="deletClaseServico">
      <div style="height:85px">
        <img src="../../../../../../images/informacion.png" style="width:14px; height:15px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.3rem;"/>
        <span style="font-size:13px">¿Desea eliminar Clase Servicio {{clasematerialmodel.strMatClass_Cod}} ?</span>
      </div>
      <footer class="modal-footer">
        <img src="../../../../../../images/check.png" style="width:13px; height:15px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.6rem;" @click="deletClaseServico()"/>
        <img src="../../../../../../images/close.png" style="width:17px; height:15px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.6rem;" @click="claseDialog = false"/>
      </footer>
    </b-modal>    

</div>  
  
</template>
<script>
import VisualizarModificarClaseServicioComponent from '@/components/LO-LOGISTICA/maestro_datos/servicio/clase_servicio/modificar_visualizar_clase_servicio/modificar_visualizar_clase_servicio.component'
export default VisualizarModificarClaseServicioComponent
</script>
<style scoped>

</style>
