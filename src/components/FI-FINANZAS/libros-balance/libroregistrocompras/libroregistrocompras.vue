
<template>

  <div class="al-crear">
    <ol  style="margin-left: -1.5rem;background: linear-gradient(rgb(229, 241, 247) 0%, rgb(255, 255, 255) 100%);    margin-bottom: 0rem !important;">
        <quickaccessmenu v-on:guardarTodo="guardarTodo($event)" v-on:validarView="validarView()"/>
    </ol>

    <el-card class="box-card">
        <div slot="header" class="headercard">
            <span class="labelheadercard" >Libro Registro Compras</span>
            <el-button class="buttonfilter btn btn-outline-secondary orange" style="margin-top: -3px;" @click="Buscar()">
                <img class="imagenfilter" src="../../../../images/buscari.png" style="margin-left: 0px;width: 15px;height: 16px;" alt="" >
            </el-button>
        </div>
        <div class="row bodycard">
           <div class="container">
                <div class="row" style="margin-top: 3px;">
                    <div class="col-sm-9" >
                        <div class="form-group row ">
                            <label class="el-form-item__label col-md-2" >Código Compañia</label>
                            <div class="col-md-2 grupolabel">
                                <div class="input-group mb-3" >
                                <el-input size ="small"  v-model="formBusqueda.cod_company"  placeholder="">
                                </el-input>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row Second">
                            <label class="el-form-item__label col-md-2" >Periodo Inicio</label>
                            <div class="col-md-2 grupolabel">
                                <div class="input-group mb-3" >
                                    <el-date-picker
                                        v-model="fechaDesde"
                                        size="mini"
                                        type="month"
                                        style="width:128px !important">
                                    </el-date-picker>
                                </div>
                            </div>    
                            <label class="el-form-item__label col-md-2" >Periodo Fin</label>
                            <div class="col-md-2 grupolabel">
                                <div class="input-group mb-3" >
                                    <el-date-picker
                                        v-model="fechaHasta"
                                        size="mini"
                                        type="month"
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
                                <div style="margin-top: 4px;margin-left: 15px;"> 
                                    <el-button class="buttonfilter btn btn-outline-secondary orange" @click="ExportarPDF()">
                                        <img class="imagenfilter" src="../../../../images/pdf1.png" style="width: 100%;height: 100%;" alt="" >
                                    </el-button>
                                    <el-button class="buttonfilter btn btn-outline-secondary orange"  @click="ExportarExcel()">
                                        <img class="imagenfilter" src="../../../../images/excel.png" style="width: 100%;height: 100%;" alt="">
                                    </el-button>
                                    <div class="v-separator"></div>
                                    <el-button class="buttonfilter btn btn-outline-secondary orange" >
                                        <img class="imagenfilter" src="../../../../images/txt.png" style="width: 100%;height: 100%;" alt="" >
                                    </el-button>
                                </div>
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
                                        <el-table-column align="center"   label=" ">
                                            <el-table-column align="center" type="index" label="linea" width="38">
                                            </el-table-column>
                                            <el-table-column align="center"   prop="periodo" width="100" label="T.Compra">
                                                <template scope="scope">
                                                <label  >&nbsp;{{ scope.row.periodo }}</label>
                                                </template>
                                            </el-table-column>
                                            <el-table-column align="center"
                                                prop="item_strAccDocum_NO" sortable  min-width="120"
                                                label="Nro. Vocuher">
                                                <template scope="scope">
                                                    <label >&nbsp;{{ scope.row.correlativo }}</label>
                                                </template>
                                            </el-table-column>  
                                            <el-table-column align="center" 
                                                prop="strReferDocum_NO" sortable  width="180" style="padding-left: 5px !important;"
                                                label="Fecha Emision">
                                                <template scope="scope">
                                                    <label >&nbsp;{{ scope.row.strReferDocum_NO }}</label>
                                                </template>
                                            </el-table-column>  
                                                <el-table-column align="center"
                                                prop="strReferDocum_NO" sortable  width="180"
                                                label="Fecha Vencim">
                                                <template scope="scope">
                                                    <label >&nbsp;{{ scope.row.strReferDocum_NO }}</label>
                                                </template>
                                            </el-table-column>  
                                        </el-table-column>
                                        <el-table-column align="center"   label="Comprobante De Pago o Documento">
                                            <el-table-column align="center"
                                                prop="item_strAcc_Local_NO" sortable  width="120"
                                                label="Tipo Doc.">
                                                <template scope="scope">
                                                    <label >&nbsp;{{ scope.row.item_strAcc_Local_NO }}</label>
                                                </template>
                                            </el-table-column>
                                            <el-table-column align="center"
                                                prop="item_strCurrency_Cod" sortable width="100"
                                                label="Serie_Doc">
                                                <template scope="scope">
                                                    <label >&nbsp;{{ scope.row.item_strCurrency_Cod }}</label>
                                                </template>
                                            </el-table-column>                                       
                                            <el-table-column align="center"
                                                prop="item_dtmPosting_Date" sortable width="100"
                                                label="Año DAM">
                                                <template scope="scope">
                                                    <label >&nbsp;{{ getParseDate(scope.row.item_dtmPosting_Date) }}</label>
                                                </template>
                                            </el-table-column>
                                        </el-table-column>
                                        <el-table-column align="center"
                                            prop="item_dtmDoc_Date" sortable width="100"
                                            label="Nro. Documento">
                                            <template scope="scope">
                                                <label >&nbsp;{{ getParseDate(scope.row.item_dtmDoc_Date) }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column align="center"
                                            prop="item_strDaily_Desc" sortable width="100"
                                            label="Descripcion Documento">
                                            <template scope="scope">
                                                <label >&nbsp;{{ scope.row.item_strDaily_Desc }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column align="center"
                                            prop="debe" sortable width="100"
                                            label="Cod. Proveedor">
                                            <template scope="scope">
                                                <label >&nbsp;{{ scope.row.debe }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column align="center" label="Documento de Identidad">
                                            <el-table-column align="center"
                                                prop="haber" sortable width="100"
                                                label="Tipo Proveedor">
                                                <template scope="scope">
                                                    <label >&nbsp;{{ scope.row.haber }}</label>
                                                </template>
                                            </el-table-column>
                                            
                                            <el-table-column align="center"
                                                prop="haber" sortable width="100"
                                                label="Ruc Proveedor">
                                                <template scope="scope">
                                                    <label >&nbsp;{{ scope.row.haber }}</label>
                                                </template>
                                            </el-table-column>
                                        </el-table-column>
                                        
                                        <el-table-column align="center"
                                            prop="haber" sortable width="100"
                                            label="Descripcion Proveedor">
                                            <template scope="scope">
                                                <label >&nbsp;{{ scope.row.haber }}</label>
                                            </template>
                                        </el-table-column>
                                        
                                        <el-table-column align="center"
                                            prop="haber" sortable width="100"
                                            label="Moneda">
                                            <template scope="scope">
                                                <label >&nbsp;{{ scope.row.haber }}</label>
                                            </template>
                                        </el-table-column>
                                         <el-table-column align="center"
                                            prop="haber" sortable width="100"
                                            label="Base Imponible">
                                            <template scope="scope">
                                                <label >&nbsp;{{ scope.row.haber }}</label>
                                            </template>
                                        </el-table-column>
                                         <el-table-column align="center"
                                            prop="haber" sortable width="100"
                                            label="IGV">
                                            <template scope="scope">
                                                <label >&nbsp;{{ scope.row.haber }}</label>
                                            </template>
                                        </el-table-column>
                                         <el-table-column align="center"
                                            prop="haber" sortable width="100"
                                            label="No Gravadas">
                                            <template scope="scope">
                                                <label >&nbsp;{{ scope.row.haber }}</label>
                                            </template>
                                        </el-table-column>
                                         <el-table-column align="center"
                                            prop="haber" sortable width="100"
                                            label="ISC">
                                            <template scope="scope">
                                                <label >&nbsp;{{ scope.row.haber }}</label>
                                            </template>
                                        </el-table-column>
                                         <el-table-column align="center"
                                            prop="haber" sortable width="100"
                                            label="Otros">
                                            <template scope="scope">
                                                <label >&nbsp;{{ scope.row.haber }}</label>
                                            </template>
                                        </el-table-column>
                                         <el-table-column align="center"
                                            prop="haber" sortable width="100"
                                            label="Importe Total">
                                            <template scope="scope">
                                                <label >&nbsp;{{ scope.row.haber }}</label>
                                            </template>
                                        </el-table-column>
                                         <el-table-column align="center"
                                            prop="haber" sortable width="100"
                                            label="Nro. Documento ND">
                                            <template scope="scope">
                                                <label >&nbsp;{{ scope.row.haber }}</label>
                                            </template>
                                        </el-table-column>
                                         <el-table-column align="center"
                                            prop="haber" sortable width="100"
                                            label="Cod. Detraccion">
                                            <template scope="scope">
                                                <label >&nbsp;{{ scope.row.haber }}</label>
                                            </template>
                                        </el-table-column>
                                         <el-table-column align="center"
                                            prop="haber" sortable width="100"
                                            label="Nro. Detraccion">
                                            <template scope="scope">
                                                <label >&nbsp;{{ scope.row.haber }}</label>
                                            </template>
                                        </el-table-column>
                                         <el-table-column align="center"
                                            prop="haber" sortable width="100"
                                            label="Fecha Detraccion">
                                            <template scope="scope">
                                                <label >&nbsp;{{ scope.row.haber }}</label>
                                            </template>
                                        </el-table-column>
                                         <el-table-column align="center"
                                            prop="haber" sortable width="100"
                                            label="Nro. Lote">
                                            <template scope="scope">
                                                <label >&nbsp;{{ scope.row.haber }}</label>
                                            </template>
                                        </el-table-column>
                                         <el-table-column align="center"
                                            prop="haber" sortable width="100"
                                            label="Importe Detraccion">
                                            <template scope="scope">
                                                <label >&nbsp;{{ scope.row.haber }}</label>
                                            </template>
                                        </el-table-column>
                                         <el-table-column align="center"
                                            prop="haber" sortable width="100"
                                            label="Tipo Cambio">
                                            <template scope="scope">
                                                <label >&nbsp;{{ scope.row.haber }}</label>
                                            </template>
                                        </el-table-column>
                                         <el-table-column align="center"
                                            prop="haber" sortable width="100"
                                            label="Fecha Doc. Original">
                                            <template scope="scope">
                                                <label >&nbsp;{{ scope.row.haber }}</label>
                                            </template>
                                        </el-table-column>
                                         <el-table-column align="center"
                                            prop="haber" sortable width="100"
                                            label="Tipo Doc. Original">
                                            <template scope="scope">
                                                <label >&nbsp;{{ scope.row.haber }}</label>
                                            </template>
                                        </el-table-column>
                                         <el-table-column align="center"
                                            prop="haber" sortable width="100"
                                            label="Serie Doc. Original">
                                            <template scope="scope">
                                                <label >&nbsp;{{ scope.row.haber }}</label>
                                            </template>
                                        </el-table-column>
                                         <el-table-column align="center"
                                            prop="haber" sortable width="100"
                                            label="Nro. Doc. Original">
                                            <template scope="scope">
                                                <label >&nbsp;{{ scope.row.haber }}</label>
                                            </template>
                                        </el-table-column>
                                         <el-table-column align="center"
                                            prop="haber" sortable width="100"
                                            label="Base Imp. Doc. Original">
                                            <template scope="scope">
                                                <label >&nbsp;{{ scope.row.haber }}</label>
                                            </template>
                                        </el-table-column>
                                         <el-table-column align="center"
                                            prop="haber" sortable width="100"
                                            label="IGV. Doc. Original">
                                            <template scope="scope">
                                                <label >&nbsp;{{ scope.row.haber }}</label>
                                            </template>
                                        </el-table-column>
                                         <el-table-column align="center"
                                            prop="haber" sortable width="100"
                                            label="Afecto Retencion">
                                            <template scope="scope">
                                                <label >&nbsp;{{ scope.row.haber }}</label>
                                            </template>
                                        </el-table-column>
                                         <el-table-column align="center"
                                            prop="haber" sortable width="100"
                                            label="RUN Pago">
                                            <template scope="scope">
                                                <label >&nbsp;{{ scope.row.haber }}</label>
                                            </template>
                                        </el-table-column>
                                         <el-table-column align="center"
                                            prop="haber" sortable width="100"
                                            label="PO">
                                            <template scope="scope">
                                                <label >&nbsp;{{ scope.row.haber }}</label>
                                            </template>
                                        </el-table-column>
                                         <el-table-column align="center"
                                            prop="haber" sortable width="100"
                                            label="Moneda Pago">
                                            <template scope="scope">
                                                <label >&nbsp;{{ scope.row.haber }}</label>
                                            </template>
                                        </el-table-column>
                                         <el-table-column align="center"
                                            prop="haber" sortable width="100"
                                            label="Banco">
                                            <template scope="scope">
                                                <label >&nbsp;{{ scope.row.haber }}</label>
                                            </template>
                                        </el-table-column>
                                         <el-table-column align="center"
                                            prop="haber" sortable width="100"
                                            label="Banco Nombre">
                                            <template scope="scope">
                                                <label >&nbsp;{{ scope.row.haber }}</label>
                                            </template>
                                        </el-table-column>
                                         <el-table-column align="center"
                                            prop="haber" sortable width="100"
                                            label="Estado SUNAT">
                                            <template scope="scope">
                                                <label >&nbsp;{{ scope.row.haber }}</label>
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
import LibroRegistroCompraComponent from '@/components/FI-FINANZAS/libros-balance/libroregistrocompras/libroregistrocompras.component'
export default LibroRegistroCompraComponent
</script>
<style scoped>

</style>



