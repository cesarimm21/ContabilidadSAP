<template>
    <div class="aprobar-hes">
    <ol  style="margin-left: -1.5rem;background: linear-gradient(rgb(229, 241, 247) 0%, rgb(255, 255, 255) 100%);    margin-bottom: 0rem !important;">
        <quickaccessmenu v-on:validarHes="validarView()" v-on:backPage="backPage($event)"  v-on:reloadpage="reloadpage($event)"/>
    </ol>
    <el-card class="box-card">
        <div slot="header" class="headercard">
            <span class="labelheadercard" >Aprobador Aceptacion Servicio</span>            
        </div>
        <div class="row bodycard">
           <div class="container">
                <div class="row" style="margin-top: 3px;">
                    <div class="col-sm-9" >
                        <div class="form-group row ">
                            <label class="el-form-item__label col-md-2" >Codigo</label>
                            <div class="col-md-2 grupolabel">
                                <div class="input-group mb-3" >
                                <el-input size ="small"  v-model="strHES_NO"  placeholder="">
                                </el-input>
                                </div>
                            </div>
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
                                <buttons-accions v-on:validarView="validarView()" v-on:handleSearchHes="Buscar()"></buttons-accions>
                            </div>
                            <div class="col-md-12" >
                                <div class="row bodycard" style="background: white;margin-top: 0px;">
                                    <el-table
                                        ref="missionTable"
                                        :max-height="sizeScreen"
                                        style="width: 100%; cursor: pointer;"
                                        :data="tableData" 
                                        @header-click="headerclick"
                                         highlight-current-row
                                         @current-change="handleCurrentChange"
                                        stripe  :default-sort = "{prop: 'date', order: 'descending'}"
                                        class="ExcelTable2007">
                                        <el-table-column type="index" label="Item" width="38">
                                        </el-table-column>
                                        <el-table-column  
                                        :render-header="filterstrHES_NO"
                                         prop="strHES_NO" width="80" label="HES">                                            
                                        </el-table-column> 
                                        <el-table-column
                                        :render-header="filterstrDesc_Header"
                                            prop="strDesc_Header"  width="260"
                                            label="Descripcion">
                                        </el-table-column>

                                        <el-table-column
                                        :render-header="filterstrPO_NO"
                                            prop="strPO_NO"   width="120"
                                            label="Orden Compra">
                                        </el-table-column>
                                        <el-table-column
                                            :render-header="filterstrPO_Item_Desc"
                                            prop="strAuthsd_BYInt"  min-width="220"
                                            label="Responsable">
                                        </el-table-column>
                                        <el-table-column
                                        :render-header="filterstrCategItem_Cod"
                                            prop="strCategItem_Cod"  width="150"
                                            label="Categoria Linea">
                                        </el-table-column>
                                        
                                        <el-table-column
                                            prop="strCurrency"  width="100"
                                            label="Moneda">
                                        </el-table-column>
                                        
                                        <el-table-column
                                            prop="fltTot_QTY"  width="100"
                                            label="Cantidad Total" align="right">
                                        </el-table-column>
                                        <el-table-column
                                            prop="fltTot_Value"  width="100"
                                            label="Cantidad Estimada" align="right">
                                        </el-table-column>
                                        <el-table-column
                                            prop="fltTot_Peding_Value"  width="100"
                                            label="Cantidad saldo" align="right">
                                        </el-table-column>
                                        <el-table-column
                                            :render-header="filterdtmAuthsd_Date"
                                            prop="dtmAuthsd_Date"  width="100"
                                            label="Fecha Creacion" align="center">
                                             <template scope="scope">
                                                <span>{{ getDateString(scope.row.dtmAuthsd_Date) }}</span>
                                            </template>
                                        </el-table-column>  
                                         <el-table-column
                                            prop="strCreation_User" align="center"  min-width="60"
                                            label="Usuario ">
                                        </el-table-column>
                                        <el-table-column 
                                            prop="strHES_Status" align="center"  width="80"
                                            label="Estado">
                                            <template scope="scope">
                                                <el-tag
                                                :type="scope.row.strHES_Status === '50' ? 'success' : 'warning'"
                                                disable-transitions>{{scope.row.strHES_Status=== '50'?'Aprobado':'Pendiente'}}</el-tag>
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
                <img  src="../../../../images/save.png" v-if="issave" style="width:16px; height:17px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 1.3rem;" @click="fnOcultar()"/>
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
import AprobarHesComponent from '@/components/LO-LOGISTICA/HES/aprobar-hes/aprobar-hes.component'
export default AprobarHesComponent
</script>
<style scoped> 

</style>
