<template>
    <div class="modificar-po">
        <ol  style="margin-left: -1.5rem;background: linear-gradient(rgb(229, 241, 247) 0%, rgb(255, 255, 255) 100%);    margin-bottom: 0rem !important;">
        <quickaccessmenu v-on:backPage="backPage($event)"  v-on:reloadpage="reloadpage($event)"></quickaccessmenu>
        </ol>
        <el-card class="box-card">
            <div slot="header" class="headercard">
                <span class="labelheadercard" >{{textTitle}}</span>
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
                                <label class="el-form-item__label col-md-2" >Codigo PO</label>
                                <div class="col-md-2 grupolabel">
                                    <div class="input-group mb-2">
                                        <el-input size ="small" type="text">
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
                                <buttons-accions ></buttons-accions>
                            </div>
                            <div class="col-md-12" >
                                <div class="row bodycard" style="background: white;margin-top: 0px;">
                                    <el-table
                                        ref="missionTable"
                                        :max-height="sizeScreen"
                                        :data="OrdenCompra"
                                        highlight-current-row
                                        stripe  :default-sort = "{prop: 'date', order: 'descending'}"
                                        class="ExcelTable2007"
                                        @header-click="headerclick"
                                        @current-change="handleCurrentChange" >          
                                        <el-table-column  
                                        :render-header="filterstrPO_NO"
                                        sortable prop="strPO_NO" min-width="60" label="Codigo PO">
                                        </el-table-column>
                                        <el-table-column
                                            :render-header="filterstrRequis_NO"
                                            prop="strRequis_NO" sortable  min-width="60"
                                            label="Codigo Requisicion">
                                        </el-table-column>
                                        <el-table-column
                                            :render-header="filterstrPO_Desc"
                                            prop="strPO_Desc" sortable min-width="160"
                                            label="Descripcion">
                                        </el-table-column>
                                        <el-table-column
                                            :render-header="filterstrVendor_Desc"
                                            prop="strVendor_Desc" sortable
                                            label="Proveedor">
                                        </el-table-column>
                                        <el-table-column
                                            :render-header="filterdtmProcess_Date"
                                            prop="dtmProcess_Date" sortable width="200"
                                            label="Fecha ejecucion">
                                             <template scope="scope">
                                                <span>{{ getDateString(scope.row.dtmProcess_Date) }}</span>
                                            </template>
                                        </el-table-column>   
                                        <el-table-column
                                            :render-header="filterfltTotal_Val"
                                            prop="fltTotal_Val" sortable width="100"
                                            label="Valor total" >
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
    </div>
</template>
<script>
import VisualizarPOComponent from '@/components/LO-LOGISTICA/orden_compra/po_visualizar/po_visualizar.component'
export default VisualizarPOComponent
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
