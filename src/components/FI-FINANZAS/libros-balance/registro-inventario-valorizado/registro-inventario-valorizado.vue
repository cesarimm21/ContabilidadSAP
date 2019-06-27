
<template>

  <div class="al-crear">
    <ol  style="margin-left: -1.5rem;background: linear-gradient(rgb(229, 241, 247) 0%, rgb(255, 255, 255) 100%);    margin-bottom: 0rem !important;">
        <quickaccessmenu v-on:validarView="cargar()"/>
    </ol>

    <el-card class="box-card">
        <div slot="header" class="headercard">
            <span class="labelheadercard" >Registro Inventario Valorizado</span>
            <!-- <el-button class="buttonfilter btn btn-outline-secondary orange" style="margin-top: -3px;" @click="Buscar()">
                <img class="imagenfilter" src="../../../../images/buscari.png" style="margin-left: 0px;width: 15px;height: 16px;" alt="" >
            </el-button> -->
        </div>
        <div class="row bodycard">
           <div class="container">
                <div class="row" style="margin-top: 3px;">
                    <div class="col-sm-9" >
                        <div class="form-group row ">
                            <label class="el-form-item__label col-md-2" >Codigo Compañia</label>
                            <div class="col-md-2 grupolabel">
                                <div class="input-group mb-3" >
                                <el-input :disabled="true" size ="small"  v-model="balCuentas.strCompany_Cod"  placeholder="">
                                </el-input>
                                </div>
                            </div>
                        </div>
                        <!-- <div class="form-group row ">
                            <label class="el-form-item__label col-sm-2" >Cuenta</label>
                            <div class="col-sm-2 grupolabel">
                                <div class="input-group mb-3" >
                                <el-input size ="small" @blur="desactivar_CuentaContable" @focus="activar_CuentaContable()" v-model="balCuentas.strAcc_Local_NO"  placeholder="">
                                    <el-button v-if="blnstrAcct_Loc && !dialogCuentaContable" slot="append" class="boton" icon="fa fa-clone" @click="loadCuentaContable()"></el-button> 
                                </el-input>
                                </div>
                            </div>
                        </div> -->
                        <div class="form-group row Second">
                            <label class="el-form-item__label col-md-2" >Periodo</label>
                            <div class="col-md-2 grupolabel">
                                <div class="input-group mb-3" >
                                    <el-date-picker
                                        v-model="fechaDesde"
                                        type="month"
                                        size="mini"
                                        format="MMMM / yyyy"
                                        placeholder="Seleccione Mes"
                                        :editable = "false"
                                        style="width:128px !important">
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
                                <div style="margin-top: 4px;margin-left: 15px;"> 
                                    <el-button class="buttonfilter btn btn-outline-secondary orange" @click="ExportarPDF()">
                                        <img class="imagenfilter" src="../../../../images/pdf1.png" style="width: 100%;height: 100%;" alt="" >
                                    </el-button>
                                    <el-button id="idbutton" class="buttonfilter btn btn-outline-secondary orange"  >
                                        <img class="imagenfilter" src="../../../../images/excel.png" style="width: 100%;height: 100%;" alt="">
                                    </el-button>
                                    <div class="v-separator"></div>
                                    <el-button  class="buttonfilter btn btn-outline-secondary orange" @click="ExportarTxt()">
                                        <img class="imagenfilter" src="../../../../images/txt.png" style="width: 100%;height: 100%;" alt="" >
                                    </el-button>
                                </div>
                                <!-- <buttons-accions v-on:handleClickInParent="handleClickInParent()"></buttons-accions> -->
                            </div>
                            <div class="col-md-12" >
                                <div class="row bodycard" id="out-table" style="background: white;margin-top: 0px;">
                                    <el-table
                                        id="idtablaBalance"
                                        ref="missionTable"
                                        :max-height="sizeScreen"
                                        :data="tableData" 
                                        highlight-current-row
                                        @current-change="handleCurrentChange"
                                        stripe  :default-sort = "{prop: 'date', order: 'descending'}"
                                        class="ExcelTable2007">
                                            <el-table-column  sortable prop="strFecProcesoMaterial" width="200" label="Fecha">
                                                <template scope="scope">
                                                <label  >&nbsp;{{ scope.row.strFecProcesoMaterial }}</label>
                                                </template>
                                            </el-table-column>
                                            <el-table-column
                                                prop="strTipoDocumento" sortable  width="150"
                                                label="Tipo Documento">
                                                <template scope="scope">
                                                    <label >&nbsp;{{ scope.row.strTipoDocumento  }}</label>
                                                </template>
                                            </el-table-column>  
                                            <el-table-column
                                                prop="strSerie" sortable  width="150"
                                                label="Serie">
                                                <template scope="scope">
                                                    <label >&nbsp;{{ scope.row.strSerie  }}</label>
                                                </template>
                                            </el-table-column>  
                                            <el-table-column
                                                prop="strNumeroDoc" sortable  width="150"
                                                label="Numero">
                                                <template scope="scope">
                                                    <label >&nbsp;{{ scope.row.strNumeroDoc }}</label>
                                                </template>
                                            </el-table-column>  
                                            <el-table-column
                                                prop="strTipoOperacion" sortable width="150"
                                                label="Tipo Operacion">
                                                <template scope="scope">
                                                    <label >&nbsp;{{scope.row.strTipoOperacion }}</label>
                                                </template>
                                            </el-table-column>
                                            <el-table-column
                                                prop="fltCantidadEntrada" sortable width="150"
                                                label="Entradas Cantidad">
                                                <template scope="scope">
                                                    <label >&nbsp;{{scope.row.fltCantidadEntrada }}</label>
                                                </template>
                                            </el-table-column>
                                            <el-table-column
                                                prop="fltPUEntrada" sortable width="150"
                                                label="Entradas Precio Unitario">
                                                <template scope="scope">
                                                    <label >&nbsp;{{scope.row.fltPUEntrada}}</label>
                                                </template>
                                            </el-table-column>
                                            <el-table-column
                                                prop="fltCostoTotalEntrada" sortable width="150"
                                                label="Entradas Total">
                                                <template scope="scope">
                                                    <label >&nbsp;{{scope.row.fltCostoTotalEntrada }}</label>
                                                </template>
                                            </el-table-column>
                                            <el-table-column
                                                prop="fltCantidadSalida" sortable width="150"
                                                label="Salidas Cantidad">
                                                <template scope="scope">
                                                    <label >&nbsp;{{scope.row.fltCantidadSalida }}</label>
                                                </template>
                                            </el-table-column>
                                            <el-table-column
                                                prop="fltPUSalida" sortable width="150"
                                                label="Salidas Precio Unitario">
                                                <template scope="scope">
                                                    <label >&nbsp;{{scope.row.fltPUSalida}}</label>
                                                </template>
                                            </el-table-column>
                                            <el-table-column
                                                prop="fltCostoTotalSalida" sortable width="150"
                                                label="Salidas Total">
                                                <template scope="scope">
                                                    <label >&nbsp;{{scope.row.fltCostoTotalSalida}}</label>
                                                </template>
                                            </el-table-column>
                                            <el-table-column
                                                prop="fltCantidadSalidaFinal" sortable width="150"
                                                label="Saldo Final Cantidad">
                                                <template scope="scope">
                                                    <label >&nbsp;{{scope.row.fltCantidadSalidaFinal}}</label>
                                                </template>
                                            </el-table-column>
                                            <el-table-column
                                                prop="fltPUSalidaFinal" sortable width="150"
                                                label="Saldo Final Precio Unitario">
                                                <template scope="scope">
                                                    <label >&nbsp;{{scope.row.fltPUSalidaFinal}}</label>
                                                </template>
                                            </el-table-column>
                                            <el-table-column
                                                prop="fltCostoTotalSalidaFinal" sortable width="150"
                                                label="Saldo Final Total">
                                                <template scope="scope">
                                                    <label >&nbsp;{{scope.row.fltCostoTotalSalidaFinal}}</label>
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
    <el-dialog title="Cuenta Contable"  :visible.sync="dialogCuentaContable" @close="closeDialogCuentaContable" size="small" >
        <bcuentacontable v-on:cuentacontableselecionado="cuentacontableselecionado($event)" v-on:cuentacontableClose="closeDialogCuentaContable()">
        </bcuentacontable>
    </el-dialog> 
</div>  
  
</template>

<script>
import RegistroInventarioValorizadoComponent from '@/components/FI-FINANZAS/libros-balance/registro-inventario-valorizado/registro-inventario-valorizado.component'
export default RegistroInventarioValorizadoComponent

</script>
<style scoped>

</style>



