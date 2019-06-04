<template>
  <div class="recepcion-b">
    <ol  style="margin-left: -1.5rem;background: linear-gradient(rgb(229, 241, 247) 0%, rgb(255, 255, 255) 100%);    margin-bottom: 0rem !important;">
        <quickaccessmenu v-on:guardarTodo="guardarTodo($event)"  v-on:validarView="validarView()" v-on:backPage="backPage($event)"  v-on:reloadpage="reloadpage($event)"/>
    </ol>
    <el-card class="box-card">
        <div slot="header" class="headercard">
            <span class="labelheadercard" >Recepción Bienes</span>
            <el-button class="buttonfilter btn btn-outline-secondary orange" style="margin-top: -3px;" @click="Buscar()">
                <img class="imagenfilter" src="../../../../../images/buscari.png" style="margin-left: 0px;width: 15px;height: 16px;" alt="" >
            </el-button>
        </div>
        <div class="row bodycard">
           <div class="container">
                <div class="row" style="margin-top: 3px;">
                    <div class="col-sm-9" >
                        <div class="form-group row ">
                            <label class="el-form-item__label col-md-2" >Código</label>
                            <div class="col-md-2 grupolabel">
                                <div class="input-group mb-3" >
                                <el-input size ="small"  v-model="strPO_NO"  placeholder="">
                                </el-input>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row ">
                            <label class="el-form-item__label col-md-2" >Proveedor</label>
                            <div class="col-md-2 grupolabel">
                                <div class="input-group mb-3" >
                                    <el-input size ="small" @blur="desactivar_proveedor" @focus="activar_proveedor" v-model="strVendor_NO"  placeholder="" @keyup.enter.native="enterProveedor(strVendor_NO)"  @keyup.delete.native="borrarProveedor()">
                                        <el-button v-if="btnactivarproveedor && !dialogProveedor" slot="append" class="boton" icon="fa fa-clone" @click="LoadProveedor()"></el-button> 
                                    </el-input>
                                </div>
                            </div>
                            <span style="font-size: 11px;margin-top: 5px;">{{strVendor_Desc}}</span>
                        </div>
                        
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
                        </div>    
                    </div>
                </div>
                <br/>
                <div class="row">
                    <div class="col-sm-12" >
                        <el-card class="box-card" style="margin-left: -10px;">
                            <div slot="header" class="headercard" style="margin-top: -4px;">
                                <buttons-accions v-on:handleClickInParent="handleClickInParent()"></buttons-accions>
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
                                        <el-table-column   prop="strPO_NO" width="100" label="Código PO">
                                            <template scope="scope">
                                            <label v-bind:style="{background:cell_ocultar,width:'100%',margin: '0rem'}" >&nbsp;{{ scope.row.strPO_NO }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            prop="strCompany_Cod"   width="120"
                                            label="Cod. Compañia">
                                            <template scope="scope">
                                                <label v-bind:style="{background:cell_ocultar,width:'100%',margin: '0rem'}" @click="clickcategorialinea(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ scope.row.strCompany_Cod }}</label>
                                            </template>
                                        </el-table-column>   
                                        <el-table-column
                                            prop="strWHS_Cod"   width="120"
                                            label="Cod. Almacen">
                                            <!-- <template scope="scope">
                                                <label v-bind:style="{background:cell_ocultar,width:'100%',margin: '0rem'}" @click="clickcategorialinea(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ scope.row.strWHS_Cod }}</label>
                                            </template> -->
                                        </el-table-column>
                                        <el-table-column
                                            prop="strWHS_Desc"  width="200"
                                            label="Almacen">
                                            <!-- <template scope="scope">
                                                <label style="width:100%" v-bind:style="{width:'100%',margin: '0rem'}"  @click="clickcuentacontable(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ scope.row.strWHS_Desc }}</label>
                                            </template> -->
                                        </el-table-column>
                                        <el-table-column
                                            prop="strVendor_NO"  width="100"
                                            label="Cod Proveedor">
                                            <template scope="scope">
                                                <label style="width:100%" v-bind:style="{width:'100%',margin: '0rem'}" @click="clickcuentacontable(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ scope.row.strVendor_NO }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            prop=""  width="150"
                                            label="Proveedor">
                                            <template scope="scope">
                                                <label style="width:100%" @click="clickmaterialdescripcion(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ scope.row.strWHS_Desc }}</label>
                                            </template>
                                        </el-table-column>
                                        
                                        <el-table-column
                                            prop="fltTotal_Val"  width="100"
                                            label="Cantidad Total">
                                            <template scope="scope">
                                                <label style="width:100%"  @click="clickfechaestimada(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ scope.row.fltTotal_Val }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            prop="dtmProcess_Date"  width="100"
                                            label="Fecha">
                                            <template scope="scope">
                                                <label style="width:100%"  @click="clickfechaestimada(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ getParseDate(scope.row.dtmProcess_Date) }}</label>
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
                    <b-progress v-if="vifprogress" :max="100" variant="success"   show-progress animated >
                         <b-progress-bar :value="valuem" :label="valuem + '%'" />
                    </b-progress>
                </div>
                <img  src="../../../../../images/save.png" v-if="issave" style="width:16px; height:17px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 1.3rem;" @click="fnOcultar()"/>
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
      <!--DIALOG BUSQUEDA PROVEEDOR-->
    <el-dialog title="Busqueda proveedor"  :visible.sync="dialogProveedor" @close="closeProveedor" size="small" >
      <bproveedor v-on:proveedorselecionado="SeleccionadoProveedor($event)" v-on:proveedorClose="proveedorClose($event)">
      </bproveedor>
    </el-dialog>
  </div>  
</template>
<script>
import RecepcionBusquedaComponent from '@/components/LO-LOGISTICA/almacen/al_recepcion_bienes/al_recepcion_busqueda/al_recepcion_busqueda.component'
export default RecepcionBusquedaComponent
</script>
<style scoped>
.selected{
    background: red;
}
</style>
