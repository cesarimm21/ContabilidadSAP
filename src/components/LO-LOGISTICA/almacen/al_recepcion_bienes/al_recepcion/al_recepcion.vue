<template>
    <div class="al-recepcion">
        <ol  style="margin-left: -1.5rem;background: linear-gradient(rgb(229, 241, 247) 0%, rgb(255, 255, 255) 100%);    margin-bottom: 0rem !important;">
        <quickaccessmenu v-on:guardarPO="guardarPO($event)" v-on:backPage="backPage($event)"  v-on:reloadpage="reloadpage($event)"></quickaccessmenu>
        </ol>
        <el-card class="box-card">
            <div slot="header" class="headercard">
                <span class="labelheadercard" >{{txtmodulo}}</span>
                <el-button v-if="vifaprobarrechasar" class="buttonfilter btn btn-outline-secondary orange" style="margin-top: -2px;
                    width: inherit;
                    background: #4685b5;
                    border-color: transparent;
                    color: #f6f7f9;
                    padding: 4px 4px 4px 4px !important;" @click="aprobar()">
                    Aprobar
                </el-button>
                <!-- <el-button v-if="vifaprobarrechasar" class="buttonfilter btn btn-outline-secondary orange" style="margin-top: -2px;
                    width: inherit;
                    background: rgb(171, 67, 4);
                    border-color: transparent;
                    color: #f6f7f9;
                    padding: 4px 4px 4px 4px !important;" @click="rechasar()">
                    Rechazar
                </el-button> -->
            </div>
            <div class="row bodycard">
                <div class="container">
                    <div class="row" style="margin-top: 3px;">
                        <div class="col-sm-6">
                            <div class="form-group row">
                                <label class="el-form-item__label col-md-3" >Compañia</label>
                                <div class="col-md-3 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input  size ="small" :disabled="true" type="text" v-model="strCompany">
                                    </el-input>
                                    </div>
                                </div>
                                <span style="font-size: 11px;margin-top: 5px;">{{OrdenCompra.strCompany_Desc}}</span>
                            </div>
                            <div class="form-group row ">
                                <label class="el-form-item__label col-md-3" >Orden Compra</label>
                                <div class="col-md-3 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input  size ="small" :disabled="true" type="text" v-model="strCode">
                                    </el-input>
                                    </div>
                                </div>                                
                            </div>
                            <!-- <div class="form-group row ">
                                <label class="el-form-item__label col-md-3" >Guia Remitente</label>
                                <div class="col-md-3 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input  size ="small" type="text" v-model="strGuiaRemitente">
                                    </el-input>
                                    </div>
                                </div>
                                <label class="el-form-item__label col-md-3" >Guia Transportista</label>
                                <div class="col-md-3 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input  size ="small" type="text" v-model="strGuiaTransportista">
                                    </el-input>
                                    </div>
                                </div>
                            </div>
                            
                            <div  class="form-group row ">
                                <label class="el-form-item__label col-md-3" >Fecha G.Transportisita</label>
                                <div class="col-md-3 grupolabel">
                                    <div class="input-group mb-3" >
                                        <el-date-picker
                                            size="mini"
                                            style="width:128px !important"
                                            format="dd.MM.yyyy"
                                            v-model="dtmFechaGuiaTransportista" >
                                        </el-date-picker>
                                    </div>
                                </div>
                                <label class="el-form-item__label col-md-3" >Fecha Recepcion</label>
                                <div class="col-md-3 grupolabel">
                                    <div class="input-group mb-3" >
                                        <el-date-picker
                                            size="mini"
                                            style="width:128px !important"
                                            format="dd.MM.yyyy"
                                            v-model="dtmFechaRecepcion" >
                                        </el-date-picker>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row ">
                                <label class="el-form-item__label col-md-3" >Conductor</label>
                                <div class="col-md-3 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input  size ="small" type="text" v-model="strConductor">
                                    </el-input>
                                    </div>
                                </div>
                                <label class="el-form-item__label col-md-3" >Placa</label>
                                <div class="col-md-3 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input  size ="small" type="text" v-model="strPlaca">
                                    </el-input>
                                    </div>
                                </div>                                
                            </div> -->
                            <div class="form-group row">
                                 <label class="el-form-item__label col-md-3" >Proveedor</label>
                                <div class="col-md-3 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input  size ="small" type="text" v-model="OrdenCompra.strVendor_NO" disabled>
                                    </el-input>
                                    </div>
                                </div>    
                                <span style="font-size: 11px;margin-top: 5px;">{{OrdenCompra.strVendor_Desc}}</span>
                            </div>
                             <div  class="form-group row ">
                                <label class="el-form-item__label col-md-3" >Total Comprado</label>
                                <div class="col-md-3 grupolabel">
                                    <div class="input-group mb-3" >
                                        <el-input-number :disabled="true" size="small" v-model="fltCURR_QTY_I" >
                                        </el-input-number>
                                    </div>
                                </div>
                                   <label class="el-form-item__label col-md-3" >Total Recibido</label>
                                <div class="col-md-3 grupolabel">
                                    <div class="input-group mb-3" >
                                        <el-input-number :disabled="true" size="small" v-model="fltTot_Rec_QYT" >
                                        </el-input-number>
                                    </div>
                                </div>
                            </div> 
                             <div class="form-group row ">
                                <label class="el-form-item__label col-md-3" >Total Pendiente</label>
                                <div class="col-md-3 grupolabel">
                                    <div class="input-group mb-3" >
                                        <div class="input-group mb-3" >
                                            <el-input-number :disabled="true"  size="small" v-model="fltTot_Rec_Pend_QTY" >
                                            </el-input-number>
                                        </div>
                                    </div>
                                </div>
                                <label class="el-form-item__label col-md-3" >Valor Total</label>
                                <div class="col-md-3 grupolabel">
                                    <div class="input-group mb-3" >
                                        <div class="input-group mb-3" >
                                            <el-input-number :disabled="true"  size="small" v-model="fltTot_Rec_Value" >
                                            </el-input-number>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                    <div class="col-sm-12" >
                        <el-card class="box-card" style="margin-left: -10px;">
                            <div slot="header" class="headercard" style="margin-top: -4px;">
                                <buttons-accions v-on:handleClickInParent="handleClickInParent()"></buttons-accions>
                            </div>
                            <div class="col-md-12" >
                                <div class="row bodycard" style="background: white;margin-top: 0px;">
                                    <el-table
                                        :max-height="sizeScreen"
                                        :data="requiDetalle1"
                                        stripe  :default-sort = "{prop: 'date', order: 'descending'}"
                                        class="ExcelTable2007"
                                        @selection-change="handleSelectionChange">
                                        <el-table-column                                             
                                            width="40" style="margin-top: 5px;">
                                            <template scope="scope">
                                                <el-checkbox @change="selectRow(scope.row)" v-if="scope.row.blnSelection" v-model="scope.row.blnCheck" ></el-checkbox>
                                            </template>
                                        </el-table-column>  
                                        <el-table-column type="index" label="Item" width="40">
                                        </el-table-column>
                                        <!-- <el-table-column   prop="strAcctCateg_Cod" min-width="80" label="Cta. cuenta">
                                        </el-table-column>
                                        <el-table-column
                                            prop="strCategItem_Cod"   min-width="80"
                                            label="Cat. linea">
                                        </el-table-column>
                                         -->
                                        <el-table-column
                                            prop="strStock_Cod"   width="100"
                                            label="Material">
                                        </el-table-column>
                                        <el-table-column
                                            prop="strPO_Item_Desc"  
                                            label="Descripción">
                                        </el-table-column>
                                        <el-table-column
                                            prop="fltPO_QTY_I"  width="100"
                                            label="Ctd.Comprada">
                                        </el-table-column>
                                        <el-table-column
                                            prop="fltRec_QYT"  width="100"
                                            label="Ctd.Recibida">
                                            <template scope="scope">
                                                <el-input-number :disabled="getDisabled(scope.row.fltPO_QTY_I,scope.row.fltRec_QYT,scope.row)" @change="changeRecibida" :min="0" :max="getNumber(scope.row.fltPO_QTY_I)" size="small" v-model="scope.row.fltRec_QYT" >
                                                </el-input-number>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            prop="strGuiaRem_NO"   width="100"
                                            label="Guia Remitente">
                                            <template scope="scope">
                                                <el-input  size="small" v-model="scope.row.strGuiaRem_NO" >
                                                </el-input> 
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            prop="strGuiaTrans_NO"   width="100"
                                            label="Guia Transportista">
                                            <template scope="scope">
                                                <el-input  size="small" v-model="scope.row.strGuiaTrans_NO" >
                                                </el-input> 
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                             width="100"
                                            label="Fecha G.Transportista">
                                            <!-- <template scope="scope">
                                                 {{getParseDate(scope.row.dtmGuiaTrans_Date)}}
                                            </template> -->
                                            <template scope="scope">
                                                <el-date-picker
                                                    type="date"
                                                    format="dd.MM.yyyy"
                                                    size="small" 
                                                    v-model="scope.row.dtmGuiaRem_Date" >
                                                </el-date-picker>
                                                
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                              width="100"
                                            label="Fecha Recepción">
                                            <!-- <template scope="scope">
                                                 {{getParseDate(scope.row.dtmReceived_Date)}}
                                            </template> -->
                                            <template scope="scope">
                                                <el-date-picker
                                                    type="date"
                                                    format="dd.MM.yyyy"
                                                    size="small" 
                                                    v-model="scope.row.dtmGuiaTrans_Date" >
                                                </el-date-picker>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            prop="strRec_Driver"  
                                            label="Conductor">
                                            <template scope="scope">
                                                <el-input  size="small" v-model="scope.row.strRec_Driver" >
                                                </el-input> 
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            prop="strPlaca"  
                                            label="Placa">
                                            <template scope="scope">
                                                <el-input  size="small" v-model="scope.row.strPlaca" >
                                                </el-input> 
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            prop="strUM_Cod"   width="60"
                                            label="UM">
                                        </el-table-column>
                                        <el-table-column
                                            prop="strCostCenter_NO"  width="80"
                                            label="Centro costos">
                                        </el-table-column>
                                        <el-table-column
                                            prop="strAccount_Cod"  width="80"
                                            label="Cta. Contable">
                                        </el-table-column>
                                        <el-table-column
                                            prop="strVendor_NO"  width="110"
                                            label="Proveedor">
                                        </el-table-column>
                                        <el-table-column
                                            prop="strCreation_User"  width="110"
                                            label="Usuario Creación">
                                        </el-table-column>
                                        <el-table-column
                                              width="100"
                                            label="Fecha Creación">
                                            <template scope="scope">
                                                 {{getParseDate(scope.row.dtmCreation_Date)}}
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            prop="strModified_User"  width="120"
                                            label="Usuario Modificación">
                                        </el-table-column>
                                        <el-table-column
                                              width="120"
                                            label="Fecha Modificación">
                                            <template scope="scope">
                                                 {{getParseDate(scope.row.dtmModified_Date)}}
                                            </template>
                                        </el-table-column>
                                        <!--<el-table-column
                                            prop="strCurrency_Cod" 
                                            label="Moneda">
                                        </el-table-column> -->
                                        <!-- <el-table-column
                                            prop="strPriority_Cod" 
                                            label="Prioridad">
                                        </el-table-column> -->

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
         <el-dialog title="Moneda"  :visible.sync="dialogMoneda" @close="closeDialogMoneda" size="small" >
            <bmoneda v-on:MonedaSeleccionado="MonedaSeleccionado($event)" v-on:closeMoneda="closeMoneda()">
            </bmoneda>
        </el-dialog>
        <el-dialog title="Busqueda Impuesto"  :visible.sync="dialogImpuesto" @close="closeDialogImpuesto" size="small" >
            <bimpuesto v-on:impuestoselecionado="impuestoselecionado($event)" v-on:companiaClose="impuestoClose()">
            </bimpuesto>
        </el-dialog>
        <el-dialog title="Requisicion" :visible.sync="dialogRequisicion" @close="closeDialog" size="small" >
            <div>
                <el-card class="box-card">
                <div slot="header" class="headercard">
                    <span class="labelheadercard" >Buscar Requisición</span>
                </div>
                <div class="row bodycard">
                    <div class="col-md-12">
                        <div class="form-group row">
                            <label class="el-form-item__label col-md-3" >Codigo</label>
                            <div class="col-md-2 grupolabel">
                                <div class="input-group mb-3" >
                                <el-input size ="small" v-model="codigoInput">
                                <el-button slot="append" style="padding: 3px 3px !important;background: #fff5c4;
                            background: -webkit-gradient(left top, left bottom, color-stop(0%, #fff5c4), color-stop(100%, #ffee9f));
                            background: -webkit-gradient(linear, left top, left bottom, from(#fff5c4), to(#ffee9f));
                            background: linear-gradient(to bottom, #fff5c4 0%, #ffee9f 100%);" icon="fa fa-search"
                                        @click="searchRequisicion()"
                                            > </el-button>
                                </el-input>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <el-table
                    :data="requisicionData"
                    stripe  :default-sort = "{prop: 'date', order: 'descending'}"
                    style="width: 100%;cursor: pointer;" class="ExcelTable2007"
                    height="250"
                    highlight-current-row
                    @row-dblclick="checkSelectdb"
                    @current-change="checkSelectdbRequisicion">
                    <el-table-column  prop="strRequis_NO" label="Codigo" width="180">
                    </el-table-column>
                    <el-table-column  prop="strRequested_By" label="Descripción" style="width: 70% !important;">
                    </el-table-column>
                    <el-table-column  prop="dtmRequested_Date" label="Fecha" width="180">
                    </el-table-column>
                </el-table>
            </el-card>
            <br/>
            <footer class="modal-footer">
                <el-button class="buttonfilter btn btn-outline-secondary orange" @click="checkSelectdbRequi()">
                <img class="imagenfilter" src="../../../../../images/check.png" alt="" >
                </el-button>
                <el-button class="buttonfilter btn btn-outline-secondary orange" style="margin-left: 0px;"  @click="closeDialogReq()">
                <img class="imagenfilter" src="../../../../../images/close.png" alt="" >
                </el-button>
            </footer>
            </div>
        </el-dialog>

        <el-dialog title="Proveedores" :visible.sync="dialogProveedor" @close="closeDialogPro" size="small" >
            <div>
                <el-card class="box-card">
                <div slot="header" class="headercard">
                    <span class="labelheadercard" >Buscar Proveedor</span>
                </div>
                <div class="row bodycard">
                    <div class="col-md-12">
                        <div class="form-group row">
                            <label class="el-form-item__label col-md-3" >Codigo</label>
                            <div class="col-md-2 grupolabel">
                                <div class="input-group mb-3" >
                                <el-input size ="small" v-model="valueProvee">
                                <el-button slot="append" style="padding: 3px 3px !important;background: #fff5c4;
                            background: -webkit-gradient(left top, left bottom, color-stop(0%, #fff5c4), color-stop(100%, #ffee9f));
                            background: -webkit-gradient(linear, left top, left bottom, from(#fff5c4), to(#ffee9f));
                            background: linear-gradient(to bottom, #fff5c4 0%, #ffee9f 100%);" icon="fa fa-search"

                                            > </el-button>
                                            <!-- @click="searchProo()" -->
                                </el-input>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <el-table
                    :data="provData"
                    stripe  :default-sort = "{prop: 'date', order: 'descending'}"
                    style="width: 100%;cursor: pointer;" class="ExcelTable2007"
                    height="250"
                    highlight-current-row
                    @row-dblclick="checkDoblePro"
                    >
                    <el-table-column  prop="strVendor_NO" label="Codigo" width="180">
                    </el-table-column>
                    <el-table-column  prop="strVendor_Desc" label="Descripción" style="width: 70% !important;">
                    </el-table-column>
                </el-table>
            </el-card>
            <br/>
            <footer class="modal-footer">
                <el-button class="buttonfilter btn btn-outline-secondary orange" @click="checkSelectdbProveedor()">
                <img class="imagenfilter" src="../../../../../images/check.png" alt="" >
                </el-button>
                <el-button class="buttonfilter btn btn-outline-secondary orange" style="margin-left: 0px;"  @click="closeDialogProX()">
                <img class="imagenfilter" src="../../../../../images/close.png" alt="" >
                </el-button>
            </footer>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import RecepcionMaterialComponent from '@/components/LO-LOGISTICA/almacen/al_recepcion_bienes/al_recepcion/al_recepcion.component'
export default RecepcionMaterialComponent
</script>
<style scoped>
.sinLinea{
  border-bottom: 1px solid #f6f7f9;
}
.el-table__body-wrapper{
    height: 50%;
}
</style>
