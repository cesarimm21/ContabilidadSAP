<template>
    <div class="Pagos">
        <ol  style="margin-left: -1.5rem;background: linear-gradient(rgb(229, 241, 247) 0%, rgb(255, 255, 255) 100%);    margin-bottom: 0rem !important;">
        <quickaccessmenu v-on:guardarTodo="guardarRun()" v-on:backPage="backPage($event)"  v-on:reloadpage="reloadpage($event)"></quickaccessmenu>
        </ol>
        <el-card class="box-card">
            <div slot="header" class="headercard">
                <span class="labelheadercard">{{nameFuncion}}</span>
                <el-button v-if="vifaprobarrechasar" class="buttonfilter btn btn-outline-secondary orange" style="margin-top: -2px;
                    width: inherit;
                    background: #4685b5;
                    border-color: transparent;
                    color: #f6f7f9;
                    padding: 4px 4px 4px 4px !important;" @click="aprobar()">
                    Aprobar
                </el-button>
            </div>
            <div class="row bodycard">
                <div class="col-md-6">

                    <div class="form-group row">
                    <label class="el-form-item__label col-sm-3" >Compañia</label>
                    <div class="col-sm-4 grupolabel">
                        <div class="input-group mb-3" >
                        <el-input type="text"  size ="small" v-model="codigoCompania" style="font-size:11px;" disabled></el-input>
                        </div>
                    </div>
                    <label class="sinLinea el-form-item__label col-sm-5" >{{descripcionCompania}}</label>
                    </div>
                    <div class="form-group row">
                    <label class="el-form-item__label col-sm-3" >Fecha Ejecucion:</label>
                    <div class="col-sm-4 grupolabel" style="height: 38px;">
                        <div class="input-group mb-4" >
                         <el-date-picker
                            type="date"
                            style="width:228px !important;font-size:11px;"
                            format="dd.MM.yyyy"
                            size="small" v-model="fecha_ejecucion" 
                            disabled>
                        </el-date-picker>   
                        <!-- <el-input type="date"  size ="small" v-model="fecha_ejecucion" @change="DateSelected()" style="font-size:11px;" ></el-input> -->
                        </div>
                    </div>
                    </div>
                     <div class="form-group row">
                         <label class="el-form-item__label col-sm-3" >Moneda:</label>
                            <div class="col-sm-4 grupolabel">
                                <div class="input-group mb-3" >
                                <el-input size ="small" v-model="pago.strPayRun_Curr" disabled >                            
                                </el-input>
                                </div>
                            </div>
                        <label class="sinLinea el-form-item__label col-sm-5" >{{pago.strPayRun_Curr_Desc}}</label>
                    </div>
                    <div class="form-group row" >
                        <label class="el-form-item__label col-sm-3" >Codigo Pago:</label>
                        <div class="col-sm-4 grupolabel" style="height: 38px;">
                            <div class="input-group mb-4" >
                            <el-input disabled size ="small" v-model="pago.strPayRun_NO" ></el-input>
                            </div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="el-form-item__label col-sm-3" >Medio Pago</label>
                        <div class="col-sm-4 grupolabel">
                            <div class="input-group mb-4">
                            <el-input size ="small" @blur="desactivar_mediopago" @focus="activar_mediopago" v-model="pago.strPayWay_Cod" :disabled="impDisabled">                            
                                    <el-button v-if="btnactivarmediopago && !dialogMediopago" slot="append" class="boton" icon="fa fa-clone" @click="viewMedioPago()" :disabled="impDisabled"></el-button> 
                            </el-input>
                            </div>
                        </div>
                        <label class="sinLinea el-form-item__label col-sm-5" >{{mediopago.strPayWay_Desc}}</label>
                    </div>
                    
                </div>
                <div class="col-md-6">
                    <div class="form-group row" style="margin-top: 6px;">
                    <label class="sinLinea el-form-item__label col-sm-3" ></label>
                        <div class="col-sm-4 grupolabel">
                            <div class="input-group mb-3" >
                            <!-- <el-input type="text"  size ="small" style="font-size:11px;" disabled></el-input> -->
                        </div>
                        </div>
                    </div>
                    <div class="form-group row" style="margin-top: 6px;">
                    <label class="sinLinea el-form-item__label col-sm-3" ></label>
                        <div class="col-sm-4 grupolabel">
                            <div class="input-group mb-3" >
                            <!-- <el-input type="text"  size ="small" v-model="pago.fltAmount_Total" style="font-size:11px;" disabled></el-input> -->
                        </div>
                        </div>
                    </div>
                    <div class="form-group row" style="margin-top: 6px;">
                    <label class=" sinLinea el-form-item__label col-sm-3" ></label>
                        <div class="col-sm-4 grupolabel">
                            <div class="input-group mb-3" >
                            <!-- <el-input type="text"  size ="small" v-model="pago.fltAmount_Total" style="font-size:11px;" disabled></el-input> -->
                        </div>
                        </div>
                    </div>
                    <div class="form-group row" style="margin-top: 6px;">
                    <label class="sinLinea el-form-item__label col-sm-3" ></label>
                        <div class="col-sm-4 grupolabel">
                            <div class="input-group mb-3" >
                            <!-- <el-input type="text"  size ="small" v-model="pago.fltAmount_Total" style="font-size:11px;" disabled></el-input> -->
                        </div>
                        </div>
                    </div>
                    <div class="form-group row" style="margin-top: 6px;">
                        <label class="sinLinea el-form-item__label col-sm-4" ></label>
                    <label class="el-form-item__label col-sm-3" >Monto Total {{tipoMoney}}</label>
                        <div class="col-sm-4 grupolabel">
                            <div class="input-group mb-3" >
                            <el-input type="text" class="inputAling" size ="small" v-model="pago.fltAmount_Total" style="font-size:11px;" disabled></el-input>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            <el-tabs type="border-card">
                <el-tab-pane>
                    <span slot="label"><i class="el-icon-date"></i> Parametros</span>
                    <div class="container">
                        <div class="row">
                            <div class="col-md-6">
                                    <div class="form-group row">
                                        <label class="el-form-item__label col-sm-5" >Fecha Pago:</label>
                                        <div class="col-sm-5 grupolabel" style="height: 38px;">
                                            <div class="input-group mb-4" >
                                                <el-date-picker
                                                    type="date"
                                                    style="width:228px !important;font-size:11px;"
                                                    format="dd.MM.yyyy"
                                                    size="small" v-model="DateContabilizacion" 
                                                    disabled>
                                                </el-date-picker>   
                                            <!-- <el-input type="date"  size ="small" style="font-size:11px;" v-model="DateContabilizacion" @change="DateContabilizacionClick()"></el-input> -->
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group row" >
                                        <label class="el-form-item__label col-sm-5" >Banco Pagador:</label>
                                            <div class="col-sm-2 grupolabel">
                                                <div class="input-group mb-2" >
                                                <el-input size ="small" @blur="desactivar_banco" @focus="activar_banco" v-model="pago.strBank_Cod" :disabled="impDisabled">                            
                                                    <el-button v-if="btnactivarbanco && !VisibleBanco" slot="append" class="boton" icon="fa fa-clone" @click="viewBanco()" :disabled="impDisabled"></el-button> 
                                                </el-input>
                                                </div>
                                            </div>
                                        <label class=" sinLinea el-form-item__label col-sm-4" >{{pago.strBank_Name}}</label>
                                    </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group row">
                                    <label class="el-form-item__label col-sm-5" >Docs. Ingresados Hasta:</label>
                                    <div class="col-sm-5 grupolabel">
                                        <div class="input-group mb-3" >
                                            <el-date-picker
                                                    type="date"
                                                    style="width:228px !important;font-size:11px;"
                                                    format="dd.MM.yyyy"
                                                    disabled
                                                    size="small" v-model="DocIngresados">
                                                </el-date-picker> 
                                        <!-- <el-input type="date"  size ="small" v-model="DocIngresados"  style="font-size:11px;" ></el-input> -->
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <!-- <label class="el-form-item__label col-sm-5" >Post. Deudores Vence a:</label>
                                    <div class="col-sm-5 grupolabel">
                                        <div class="input-group mb-3" >
                                            <el-date-picker
                                                    type="date"
                                                    style="width:228px !important;font-size:11px;"
                                                    format="dd.MM.yyyy"
                                                    size="small" v-model="DocDeudores">
                                                </el-date-picker> 
                                        </div>
                                    </div> -->
                                    <label class="el-form-item__label col-sm-5" >Cuenta Bancaria</label>
                                    <div class="col-sm-5 grupolabel">
                                        <div class="input-group mb-3">
                                            <el-input 
                                            disabled
                                            size ="small" v-model="pago.strPayWay_Cod" >
                                            </el-input>
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
                                <buttons-accions ></buttons-accions>
                            </div>
                            <div class="col-md-12" >
                                <div class="row bodycard" style="background: white;margin-top: 0px;">
                                <el-table
                                    ref="missionTable"
                                    :max-height="sizeScreen"
                                    :data="gridPagosDetalle"
                                    highlight-current-row
                                    stripe  :default-sort = "{prop: 'date', order: 'descending'}"
                                    class="ExcelTable2007"
                                    >
                                    <el-table-column 
                                            prop="blnCheck"
                                            width="45"
                                            label="">
                                            <template scope="scope">
                                             <el-checkbox v-if="(scope.row != editing.row)||(scope.row === editing.row)" v-focus size="small" v-model="scope.row.blnCheck" @change="clickCheck(scope.row,$event,scope.column.property)">
                                            </el-checkbox>
                                           </template>
                                    </el-table-column>
                                    <!-- <el-table-column type="selection" width="45">
                                        
                                    </el-table-column> -->
                                    <el-table-column prop="strSerie_Doc" label="Serie">                                
                                    </el-table-column>
                                    <el-table-column prop="strDocument_NO" label="Numero ">                                
                                    </el-table-column>
                                    <el-table-column   prop="strVoucher_NO" min-width="80" label="Voucher">
                                    </el-table-column>
                                    <el-table-column
                                        prop="strPeriod_NO"   min-width="80"
                                        label="Periodo">
                                    </el-table-column>
                                    <el-table-column
                                        prop="strVendor_NO" 
                                        label="Proveedor">
                                    </el-table-column>
                                    <el-table-column
                                        prop="strDesc_Doc"  width="200"
                                        label="Descripcion">
                                    </el-table-column>
                                    <el-table-column 
                                        prop="dtmDoc_Date"
                                        width="100"
                                        label="Fecha emision">
                                        <template scope="scope">
                                            <span>{{ getDateStringView(scope.row.dtmDoc_Date) }}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column 
                                        prop="fltValue_Doc"
                                        width="100"
                                        label="Valor Documento">
                                    </el-table-column>
                                </el-table>
                                </div>  
                            </div>
                        </el-card>
                    </div>
                    </div>
                    <el-tabs v-if="vifveraprobar" type="border-card" style="width: 99%;margin-left:5px !important;" >
                    <el-tab-pane>
                        <span slot="label"><i class="fa fa-slideshare" aria-hidden="true"></i> Proveedores</span>
                            <div class="row bodycard">
                                <!-- <label class="el-form-item__label col-sm-2" >Proveedores:</label> -->
                                 <div class="col-md-6" >
                                    <div class="row " style="background: white;margin-top: 0px;">
                                    <el-table
                                        ref="missionTable"
                                        :max-height="sizeScreen"
                                        :data="gridProveedor"
                                        highlight-current-row
                                        stripe  :default-sort = "{prop: 'date', order: 'descending'}"
                                        class="ExcelTable2007"
                                        @current-change="proveDelete"
                                        >
                                        <el-table-column type="index" label="Nro.">                                
                                        </el-table-column>
                                        <el-table-column prop="strVendor_NO" label="Proveedor" width="150">                                
                                        </el-table-column>
                                        <el-table-column prop="strVendor_Desc" label="Nombre ">                                
                                        </el-table-column>
                                        <el-table-column
                                            align="center"
                                            label="Eliminar"
                                            width="50">
                                            <template scope="scope">
                                                <el-button
                                                @click.native.prevent="deleteRow(scope.$index, gridProveedor)"
                                                type="danger"
                                                size="small"><i class="fa fa-trash" aria-hidden="true"></i>
                                                </el-button>
                                            </template>
                                            </el-table-column>
                                        
                                    </el-table>
                                    </div>
                                 </div>
                                <!-- <div class="col-sm-2 grupolabel">
                                        <div class="input-group mb-2" >
                                        <el-input size ="small" ></el-input>
                                    </div>
                                </div>
                                <div class="col-sm-1" style="aling-text:center;">
                                    <label class="el-form-item__label col-sm-1" >A</label>
                                </div>
                                <div class="col-sm-2 grupolabel">
                                    <div class="input-group mb-2" >
                                        <el-input size ="small" ></el-input>
                                    </div>
                                </div> -->
                                <el-button class="buttonfilter btn btn-outline-secondary orange" style="margin-top:2px;" >
                                        <img class="imagenfilter" src="../../../../images/collapse_derecha.png" alt="" @click="viewProveedor()" >
                                    </el-button>
                            </div>
                            <!-- <div class="row bodycard" style="margin-top:0px;">
                                <label class="el-form-item__label col-sm-2" >Cliente:</label>
                                    <div class="col-sm-2 grupolabel">
                                        <div class="input-group mb-2" >
                                        <el-input size ="small" ></el-input>
                                        </div>
                                    </div>
                                    <div class="col-sm-1" style="aling-text:center;">
                                    <label class="el-form-item__label col-sm-1" >A</label>
                                </div>
                                <div class="col-sm-2 grupolabel">
                                    <div class="input-group mb-2" >
                                        <el-input size ="small" ></el-input>
                                    </div>
                                </div>
                                <el-button class="buttonfilter btn btn-outline-secondary orange" style="margin-top:2px;" >
                                        <img class="imagenfilter" src="../../../images/collapse_derecha.png" alt="" @click="viewProveedor()">
                                    </el-button>
                            </div> -->
                    </el-tab-pane>
                    </el-tabs>                    
                </el-tab-pane>
            </el-tabs>
        </el-card>
         <div class="footer1">
        <div class="row">
            <div class="col-sm-9" style="text-align:left" >
                <!-- <div class="col-sm-2">
                    <b-progress v-if="vifprogress" :max="100" variant="success"   show-progress animated >
                         <b-progress-bar :value="valuem" :label="valuem + '%'" />
                    </b-progress>
                </div> -->
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
        <!--DIALOG BUSQUEDA BANCO-->
        <!-- <el-dialog title="Busqueda Banco"  :visible.sync="VisibleBanco" @close="closeBanco" size="small" >
            <bbanco v-on:bancoselecionado="SeleccionadoBanco($event)" v-on:closeBanco="closeBanco()">
            </bbanco>
        </el-dialog> -->
        <el-dialog title="Busqueda Banco" :visible.sync="VisibleBanco" @close="closeBanco">
            <el-card class="box-card" style="    margin-left: 4px;">
                <div slot="header" class="headercard">
                    <span class="labelheadercard" ></span>
                </div>
                <div class="row bodycard">
                    <div class="col-md-12">
                        <div class="form-group row">
                            <label class="el-form-item__label col-md-3" >{{Column}}</label>
                            <div class="col-md-4 grupolabel">
                                <div class="input-group mb-4" >
                                <el-input size ="small" v-model="inputAtributo">
                                <el-button slot="append" class="boton" icon="fa fa-search" 
                                    @click="searchBanco()"
                                > </el-button>
                                </el-input>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <el-table
                :data="gridBanco"
                stripe  :default-sort = "{prop: 'date', order: 'descending'}"
                style="width: 100%;cursor: pointer;" class="ExcelTable2007"
                height="250"
                highlight-current-row
                @header-click="headerclick"
                @row-dblclick="SeleccionadoBanco"
                @current-change="handleCurrentChange"> 
                <el-table-column :render-header="filterstrBank_Cod" prop="strBank_Cod" label="Codigo" width="180" >
                </el-table-column>  
                <el-table-column :render-header="filterstrBank_Name" prop="strBank_Name" label="Descripcion">
                </el-table-column> 
                </el-table>
            </el-card>
            <br/>
            <footer class="modal-footer">
                <el-button class="buttonfilter btn btn-outline-secondary orange" style="cursor: pointer;" @click="SeleccionadoBanco()">
                <img class="imagenfilter" src="../../../../images/check.png" alt="" >
                </el-button>
                <el-button class="buttonfilter btn btn-outline-secondary orange" style="margin-left: 0px;cursor: pointer;"  @click="closeBanco()">
                <img class="imagenfilter" src="../../../../images/close.png" alt="" >
                </el-button>
            </footer>
        </el-dialog>

        <el-dialog title="Cuenta Bancaria" :visible.sync="VisibleCuenta" @close="closeCuenta">
            <el-card class="box-card" style="    margin-left: 4px;">
                <div slot="header" class="headercard">
                    <span class="labelheadercard" ></span>
                </div>
                <br>
                <!-- <div class="row bodycard">
                    <div class="col-md-12">
                        <div class="form-group row">
                            <label class="el-form-item__label col-md-3" ></label>
                            <div class="col-md-4 grupolabel">
                                <div class="input-group mb-4" >
                                <el-input size ="small" v-model="inputAtributo">
                                <el-button slot="append" class="boton" icon="fa fa-search" 
                                    @click="searchBanco()"
                                > </el-button>
                                </el-input>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> -->
                <el-table
                :data="gridCuenta"
                stripe  :default-sort = "{prop: 'date', order: 'descending'}"
                style="width: 100%;cursor: pointer;" class="ExcelTable2007"
                height="250"
                highlight-current-row
                @row-dblclick="SeleccionadoCuenta"
                @current-change="handleCuenta"> 
                <el-table-column  prop="strBank_Cod" label="Codigo" width="180" >
                </el-table-column>  
                <el-table-column  prop="strBank_Name" label="Descripcion">
                </el-table-column> 
                </el-table>
            </el-card>
            <br/>
            <footer class="modal-footer">
                <el-button class="buttonfilter btn btn-outline-secondary orange" style="cursor: pointer;" @click="SeleccionadoCuenta()">
                <img class="imagenfilter" src="../../../../images/check.png" alt="" >
                </el-button>
                <el-button class="buttonfilter btn btn-outline-secondary orange" style="margin-left: 0px;cursor: pointer;"  @click="closeCuenta()">
                <img class="imagenfilter" src="../../../../images/close.png" alt="" >
                </el-button>
            </footer>
        </el-dialog>

        <el-dialog title="Medio pago" :visible.sync="dialogMediopago" @close="closeMedioPago">
            <el-card class="box-card" style="    margin-left: 4px;">
                <div slot="header" class="headercard">
                    <span class="labelheadercard" ></span>
                </div>
                <div class="row bodycard">
                    <div class="col-md-12">
                        <div class="form-group row">
                            <label class="el-form-item__label col-md-3" >Medio Pago</label>
                            <div class="col-md-4 grupolabel">
                                <div class="input-group mb-4" >
                                <el-input size ="small" >
                                <el-button slot="append" class="boton" icon="fa fa-search" 
                                > </el-button>
                                </el-input>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <el-table
                :data="gridMedioPago"
                stripe  :default-sort = "{prop: 'date', order: 'descending'}"
                style="width: 100%;cursor: pointer;" class="ExcelTable2007"
                height="250"
                highlight-current-row
                @row-dblclick="SelectMedioPago"
                @current-change="handleMedioPago"> 
                <el-table-column prop="strPayWay_Cod" label="Codigo" width="180" >
                </el-table-column>  
                <el-table-column  prop="strPayWay_Name" label="Descripcion">
                </el-table-column> 
                </el-table>
            </el-card>
            <br/>
            <footer class="modal-footer">
                <el-button class="buttonfilter btn btn-outline-secondary orange" style="cursor: pointer;" @click="SelectMedioPago()">
                <img class="imagenfilter" src="../../../../images/check.png" alt="" >
                </el-button>
                <el-button class="buttonfilter btn btn-outline-secondary orange" style="margin-left: 0px;cursor: pointer;"  @click="closeMedioPago()">
                <img class="imagenfilter" src="../../../../images/close.png" alt="" >
                </el-button>
            </footer>
        </el-dialog>

        <!--DIALOG BUSQUEDA PROVEEDOR-->
        <el-dialog title="Busqueda Proveedor"  :visible.sync="VisibleProveedor" @close="closeProveedor" size="small" >
            <bproveedor v-on:proveedorselecionado="SeleccionadoProveedor($event)" v-on:proveedorClose="closeProveedor()">
            </bproveedor>
        </el-dialog>
        
    </div>
</template>
<script>

import ViewAndEditPagosComponent from '@/components/FI-FINANZAS/Tesoreria/viewandedit_pagos/viewandedit_pagos.component'
export default ViewAndEditPagosComponent
</script>
<style scoped>
.sinLinea{
  border-bottom: 1px solid #f6f7f9;
  color: #1f2d3d; 
}
</style>