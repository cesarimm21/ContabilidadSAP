<template>
    <div class="modificar-po">
        <ol  style="margin-left: -1.5rem;background: linear-gradient(rgb(229, 241, 247) 0%, rgb(255, 255, 255) 100%);    margin-bottom: 0rem !important;">
        <quickaccessmenu v-on:validarView="validad()" v-on:backPage="backPage($event)"  v-on:reloadpage="reloadpage($event)"></quickaccessmenu>
        </ol>
        <el-card class="box-card">
            <div slot="header" class="headercard">
                <span class="labelheadercard" >Visualizar Pagos</span>
            </div>
            <div class="row bodycard">
                <div class="container">
                    <div class="row" style="margin-top: 3px;">
                        <div class="col-sm-8">
                            <div class="form-group row ">
                                <label class="el-form-item__label col-md-2" >Compañia</label>
                                <div class="col-md-2 grupolabel">
                                    <div class="input-group mb-2">
                                    <el-input size ="small" type="text" v-model="codigoCompania" disabled>
                                    </el-input>
                                    </div>
                                </div>
                                <label class="sinLinea el-form-item__label col-md-8" >{{descripcionCompania}}</label>
                            </div>
                            <div class="form-group row " style="margin-top:6px;">
                                <label class="el-form-item__label col-md-2" >Codigo Pago</label>
                                <div class="col-md-2 grupolabel">
                                    <div class="input-group mb-2">
                                        <el-input size ="small" type="text" v-model="pagosSelect.strPayRun_NO">
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
                                <buttons-accions  v-on:validarView="validarView()" v-on:Limpiar="Limpiar" v-on:Buscar="Buscar" v-on:AscItem="AscItem" v-on:DscItem="DscItem" v-on:siguiente="siguiente()" v-on:anterior="anterior()" v-on:EliminarItem="EliminarItem()" ></buttons-accions>
                            </div>
                            <div class="col-md-12" >
                                <div class="row bodycard" style="background: white;margin-top: 0px;">
                                    <el-table
                                        ref="missionTable"
                                        :max-height="sizeScreen"
                                        :data="Pago"
                                        highlight-current-row
                                        stripe  :default-sort = "{prop: 'date', order: 'descending'}"
                                        class="ExcelTable2007"
                                        @header-click="headerclick"
                                        @current-change="handleCurrentChange" >    
                                         <el-table-column type="index" label="Linea" width="38">   </el-table-column>   
                                        <el-table-column  
                                        :render-header="filterstrstrPayRun_NO"
                                         prop="strPayRun_NO" min-width="60" label="Pago">
                                        </el-table-column>
                                        <el-table-column
                                            :render-header="filterdtmPayRun_Date"
                                            prop="dtmPayRun_Date"   min-width="60"
                                            label="Fecha Ejecucion">
                                             <template scope="scope">
                                                <span>{{ getDateString(scope.row.dtmPayRun_Date) }}</span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            :render-header="filterstrPayRun_Curr"
                                            prop="strPayRun_Curr"   min-width="60"
                                            label="Moneda">
                                        </el-table-column>
                                        <el-table-column
                                            :render-header="filterdtmPayRunPay_Date"
                                            prop="dtmPayRunPay_Date"  min-width="60"
                                            label="Fecha Pago">
                                            <template scope="scope">
                                                <span>{{ getDateString(scope.row.dtmPayRunPay_Date) }}</span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            :render-header="filterdtmPayRunExpired_Date"
                                            prop="dtmPayRunExpired_Date" 
                                            label="Documento vencidos hasta">
                                            <template scope="scope">
                                                <span>{{ getDateString(scope.row.dtmPayRunExpired_Date) }}</span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            :render-header="filterstrBank_Name"
                                            prop="strBank_Name"  width="180"
                                            label="Banco Pagador">                                            
                                        </el-table-column>   
                                        <el-table-column
                                            :render-header="filterstrPayRun_Account"
                                            prop="strPayRun_Account"  width="100"
                                            label="Cuenta Bancaria" >
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
                <img  src="../../../../images/save.png" v-if="issave" style="width:16px; height:17px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 1.3rem;" @click="fnOcultar()"/>
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
import VisualizarPagosComponent from '@/components/FI-FINANZAS/Tesoreria/view_pagos/view_pagos.component'
export default VisualizarPagosComponent
</script>
<style scoped>
.sinLinea{
  border-bottom: 1px solid #f6f7f9;
  color: #1f2d3d; 
}
.el-table__body-wrapper{
    height: 50%;
}
</style>
