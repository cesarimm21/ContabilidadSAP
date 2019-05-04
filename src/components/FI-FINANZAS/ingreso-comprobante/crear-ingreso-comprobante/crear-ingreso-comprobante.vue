<template>
    <div class="crear-ingreso-comprobante">
        <ol  style="margin-left: -1.5rem;background: linear-gradient(rgb(229, 241, 247) 0%, rgb(255, 255, 255) 100%);    margin-bottom: 0rem !important;">
        <quickaccessmenu v-on:SaveFactura="SaveFactura($event)" v-on:backPage="backPage($event)" v-on:reloadpage="reloadpage($event)"></quickaccessmenu>
        </ol>
        <el-card class="box-card">
            <div slot="header" class="headercard">
                <span class="labelheadercard" > Crear ingreso comprobante</span>
            </div>
            <div class="row bodycard">
                <div class="container">
                    <div class="row" style="margin-top: 3px;">
                        <div class="col-sm-6">
                            <div class="form-group row ">
                                <label class="el-form-item__label col-md-3" >Compañia</label>
                                <div class="col-md-3 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input  
                                    size ="small" 
                                    @blur="desactivar_compania" 
                                    @focus="activar_compania" 
                                    v-model="factura.strCompany_Cod">
                                        <el-button v-if="btnactivarcompania && !dialogCompania" slot="append" class="boton" icon="fa fa-clone" @click="loadCompania()"></el-button> 
                                    </el-input>
                                    </div>
                                </div>
                                <label class="sinLinea el-form-item__label col-md-4" >{{factura.strCompany_Desc}}</label>
                            </div>
                            <div class="form-group row">
                                <label class="el-form-item__label col-md-3" >Tipo Documento</label>
                                <div class="col-md-3 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input size ="small"   @blur="desactivar_TipoDocumento" @focus="activar_TipoDocumento" v-model="factura.strType_Doc" >                            
                                         <el-button v-if="btnactivarTipoDocumento && !dialogTipoDocumento" slot="append" class="boton" icon="fa fa-clone" @click="loadTipoDocumento()"></el-button> 
                                    </el-input>
                                    </div>
                                </div>
                                <label class="sinLinea el-form-item__label col-md-6" >{{comprobantePago.strDocType_Desc}}</label>                                   
                            </div>
                            
                            <div class="form-group row">
                                <label class="el-form-item__label col-md-3" >Orden Compra</label>
                                <div class="col-md-3 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input size ="small" @blur="desactivar_OrdenCompra" @focus="activar_OrdenCompra" v-model="factura.strPO_NO" type="text">  
                                        <el-button v-if="btnactivarOrdenCompra && !dialogOrdenCompra" slot="append" class="boton" icon="fa fa-clone" @click="loadOrdenCompra()"></el-button>                           
                                    </el-input>
                                    </div>
                                </div>
                                <label class="el-form-item__label col-md-3" >Proveedor</label>
                                <div class="col-md-3 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input size ="small" v-model="factura.strVendor_NO"  disabled>                            
                                    </el-input>
                                    </div>
                                </div>
                            </div>
                            <div  class="form-group row " >
                                <label class="el-form-item__label col-md-3" >Periodo</label>
                                <div class="col-md-3 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input size ="small" type="text"  placeholder="" v-model="fecha_actual" disabled>                            
                                    </el-input>
                                    </div>
                                </div>                               
                                
                            </div>
                            
                            <div  class="form-group row ">
                                <label class="el-form-item__label col-md-3" >Serie</label>
                                <div class="col-md-3 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input size ="small"   v-model="factura.strSerie_Doc" :maxlength="4"><!-- maxlength="4" type="text">-->                            
                                    </el-input>
                                    </div>
                                </div> 
                                <label class="el-form-item__label col-md-3" >N. Documento</label>
                                <div class="col-md-3 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input size ="small" v-model="factura.strDocument_NO" :maxlength="15">                            
                                    </el-input>
                                    </div>
                                </div>                               
                            </div>
                            <div  class="form-group row ">                                
                                <label class="el-form-item__label col-sm-3" >Fecha Emisión</label>
                                <div class="col-sm-3 grupolabel">
                                    <div class="input-group mb-3" >
                                        <el-input type="date"  size ="small" style="font-size:11px;" v-model="factura.dtmDoc_Date"  @change="DateforGetChanceDolar()"></el-input>
                                    </div>
                                </div>
                                 <label class="el-form-item__label col-sm-3" >Moneda</label>
                                <div class="col-sm-3 grupolabel">
                                    <div class="input-group mb-3" >
                                        <el-input size ="small" @blur="desactivar_Moneda" @focus="activar_Moneda" v-model="factura.strCurrency_Doc">                            
                                            <el-button v-if="btnactivarMoneda && !dialogMoneda" slot="append" class="boton" icon="fa fa-clone" @click="loadMoneda()"></el-button> 
                                        </el-input>
                                    </div>
                                </div>
                            </div>  
                            <div class="form-group row" >
                                <label class="el-form-item__label col-md-3">Descripción</label>
                                <div class="col-md-9 grupolabel">
                                    <div class="input-group mb-9">
                                        <el-input size ="small" v-model="factura.strDesc_Doc"  type="text">                            
                                        </el-input>
                                    </div>
                                </div>
                            </div>                          
                        </div>
                        <div class="col-sm-6">
                            <div class="form-group row " style="margin-top:10px;">
                                <label class="sinLinea el-form-item__label col-md-6" ></label>
                            </div>
                            <div class="form-group row">
                                <label class="el-form-item__label col-sm-3" >Cantidad</label>
                                    <div class="col-sm-3 grupolabel">
                                        <div class="input-group mb-3" >
                                            <el-input  size ="small" style="font-size:11px;" type="text" class="inputAling" v-model="factura.intQuantity_Doc" disabled></el-input>
                                        </div>
                                    </div>
                                        <label class="el-form-item__label col-sm-3" >Valor PO</label>
                                    <div class="col-sm-3 grupolabel">
                                        <div class="input-group mb-3" >
                                            <el-input  size ="small" style="font-size:11px;" type="text" class="inputAling"  v-model="factura.fltValue_Doc" disabled></el-input>
                                        </div>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label class="el-form-item__label col-sm-3" >Valor Afecto S/.</label>
                                            <div class="col-sm-3 grupolabel">
                                                <div class="input-group mb-3" >
                                                <el-input type="text"  size ="small" style="font-size:11px;" class="inputAling" v-model="factura.fltValue_Local" disabled></el-input>
                                                </div>
                                            </div>
                                            <label class="el-form-item__label col-sm-3" >Valor Afecto $.</label>
                                            <div class="col-sm-3 grupolabel">
                                                <div class="input-group mb-3" >
                                                <el-input 
                                                type="text"   
                                                size ="small" 
                                                style="font-size:11px;" 
                                                class="inputAling"
                                                v-model="factura.fltValue_Corp"
                                                :precision="2"
                                                disabled
                                                ></el-input>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label class="el-form-item__label col-sm-3" >Valor IGV S/.</label>
                                            <div class="col-sm-3 grupolabel">   
                                                <div class="input-group mb-3" >
                                                <el-input type="text"  size ="small" style="font-size:11px;" class="inputAling" v-model="factura.fltValue_Tax_Local" disabled></el-input>
                                                </div>
                                            </div>
                                            <label class="el-form-item__label col-sm-3" >Valor IGV $.</label>
                                            <div class="col-sm-3 grupolabel">
                                                <div class="input-group mb-3" >
                                                <el-input 
                                                type="text"   
                                                size ="small" 
                                                style="font-size:11px;" 
                                                class="inputAling"
                                                v-model="factura.fltValue_Tax_Corp"
                                                :precision="2"
                                                disabled
                                                ></el-input>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label class="el-form-item__label col-sm-3" >Valor Inafecto S/.</label>
                                            <div class="col-sm-3 grupolabel">
                                                <div class="input-group mb-3" >
                                                <el-input type="text"  size ="small" style="font-size:11px;" class="inputAling" v-model="factura.fltOperation_NoTax_Local" disabled></el-input>
                                                </div>
                                            </div>
                                            <label class="el-form-item__label col-sm-3" >Valor Inafecto $.</label>
                                            <div class="col-sm-3 grupolabel">
                                                <div class="input-group mb-3" >
                                                <el-input 
                                                type="text"  
                                                size ="small" 
                                                style="font-size:11px;" 
                                                class="inputAling"
                                                v-model="factura.fltOperation_NoTax_Corp"
                                                :precision="2"
                                                disabled
                                                ></el-input>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label class="el-form-item__label col-sm-3" >Total S.</label>
                                            <div class="col-sm-3 grupolabel">
                                                <div class="input-group mb-3" >
                                                <el-input type="text"  size ="small" style="font-size:11px;" class="inputAling" v-model="factura.fltNetValue_Doc_Local" disabled></el-input>
                                                </div>
                                            </div>
                                            <label class="el-form-item__label col-sm-3" >Total $.</label>
                                            <div class="col-sm-3 grupolabel">
                                                <div class="input-group mb-3" >
                                                <el-input type="text"  size ="small" style="font-size:11px;" class="inputAling" v-model="factura.fltNetValue_Doc_Corp" disabled></el-input>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                        <!-- <div class="col-md-6"> -->

                            <!-- <div class="form-group row " style="margin-top:10px;">
                                <label class="sinLinea el-form-item__label col-md-6" ></label>
                            </div>
                            <div class="form-group row " style="margin-top:10px;">
                                <label class="sinLinea el-form-item__label col-md-6" ></label>
                            </div>
                            <div class="form-group row " >
                                <label class="sinLinea el-form-item__label col-md-6" >{{factura.strVendor_Desc}}</label>
                            </div>
                            <div class="form-group row " style="margin-top:10px;">
                                <label class="sinLinea el-form-item__label col-md-6" ></label>
                            </div>
                            <div class="form-group row " style="margin-top:10px;">
                                <label class="sinLinea el-form-item__label col-md-6" ></label>
                            </div>
                            <div class="form-group row " style="margin-top:10px;">
                                <label class="sinLinea el-form-item__label col-md-6" >{{moneda.strCurrency_Desc}}</label>
                            </div>                                           -->
                        <!-- </div> -->
                    </div>
                </div>
            </div>
            <br>
            <el-tabs type="border-card">
                <el-tab-pane>
                    <span slot="label"><i class="el-icon-date"></i> General</span>
                    <!-- <el-card class="box-card"> -->
                        <div class="row bodycard">
                            <div class="container">
                                <div class="row" style="margin-top: 3px;">
                                    <div class="col-sm-6">
                                        <div class="form-group row">
                                            <label class="el-form-item__label col-sm-3" >Fecha Contable</label>
                                            <div class="col-sm-3 grupolabel">
                                                <div class="input-group mb-3" >
                                                <!-- <el-input type="date"  size ="small" style="font-size:11px;" v-model="factura.dtmDoc_Acc_Date"></el-input> -->
                                                <el-input type="date"  size ="small" style="font-size:11px;" v-model="fecha_ejecucion"></el-input>
                                                </div>
                                            </div>
                                            <label class="el-form-item__label col-sm-3" >Fecha Vencimiento</label>
                                            <div class="col-sm-3 grupolabel">
                                                <div class="input-group mb-3" >
                                                <el-input type="date"  size ="small" style="font-size:11px;" v-model="fecha_vencida" @change="DateVencida()"></el-input>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label class="el-form-item__label col-sm-3" >Impuesto(IGV)</label>
                                            <div class="col-sm-3 grupolabel">
                                                <div class="input-group mb-3" >
                                                 <el-input size ="small" @blur="desactivar_Impuesto" @focus="activar_Impuesto" v-model="factura.strTax_Cod"  :disabled="columnView">
                                                    <el-button v-if="btnactivarImpuesto && !dialogImpuesto" slot="append" class="boton" icon="fa fa-clone" @click="loadImpuesto('A')"></el-button> 
                                                </el-input>
                                                </div>
                                            </div>
                                            <label class="el-form-item__label col-sm-3" >T. Cambio</label>
                                            <div class="col-sm-3 grupolabel">
                                                <div class="input-group mb-3">
                                                    <el-input type="text"  size ="small" style="font-size:11px;" class="inputAling" v-model="factura.fltExchange_Rate" disabled></el-input>
                                                </div>
                                            </div>
                                            <!-- <label class="el-form-item__label col-sm-3" >Total Doc.</label>
                                            <div class="col-sm-3 grupolabel">
                                                <div class="input-group mb-3" >
                                                <el-input type="number"  size ="small" style="font-size:11px;" ></el-input>
                                                </div>
                                            </div> -->
                                        </div>
                                        <div class="form-group row" >
                                            <label class="sinLinea el-form-item__label col-sm-3" ></label>
                                            <div class="col-sm-3 grupolabel">
                                                <div class="input-group mb-3" >                                                
                                                </div>
                                            </div>
                                            <label class="sinLinea el-form-item__label col-sm-3" ></label>
                                            <div class="col-sm-3 grupolabel">
                                                <div class="input-group mb-3" >
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group row"  style="margin-top: 6px;">
                                            <label class="sinLinea el-form-item__label col-sm-3" ></label>
                                            <div class="col-sm-3 grupolabel">
                                                <div class="input-group mb-3" >                                                
                                                </div>
                                            </div>
                                            <label class="sinLinea el-form-item__label col-sm-3" ></label>
                                            <div class="col-sm-3 grupolabel">
                                                <div class="input-group mb-3" >
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>  
                            <br>
                            <div class="row" style="width:100%;">
                                <div class="col-md-12">
                                    <el-card class="box-card" >
                                        <div slot="header" class="headercard" style="margin-top: -4px;">
                                            <buttons-accions v-on:changeIcon="changeIcon($event)"></buttons-accions>
                                        </div>
                                        <br>
                                        <div class="col-md-12" style="margin-top: 6px;">
                                            <div class="row bodycard" style="background: white;    margin-top: -11px;">
                                                <el-table
                                                    :max-height="sizeScreen"
                                                    :data="facturadetalle"
                                                    stripe  :default-sort = "{prop: 'date', order: 'descending'}"
                                                    class="ExcelTable2007"
                                                    highlight-current-row
                                                    @selection-change="handleSelectionChange"
                                                    @current-change="handleCurrentChange"
                                                    >
                                                    <el-table-column
                                                    type="selection"
                                                    width="50" >
                                                    </el-table-column>
                                                    <el-table-column
                                                        prop="intPO_Item_NO" sortable min-width="50"
                                                        label="Codigo">
                                                    </el-table-column>
                                                    <el-table-column
                                                        prop="strPO_NO" sortable min-width="100"
                                                        label="Orden Compra">
                                                    </el-table-column>
                                                    <el-table-column
                                                        prop="strDesc_Item" sortable  min-width="200"
                                                        label="Descripción">
                                                    </el-table-column>
                                                     <!-- <el-table-column 
                                                        prop="blnCheck"
                                                        width="100"
                                                        label="Incluir/Excluir Costo">
                                                        <template scope="scope">
                                                        <el-checkbox class="newCheckBox" v-if="(scope.row != editing.row)||(scope.row === editing.row)" v-focus size="small" v-model="scope.row.blnCheck" @change="clickCheck(scope.row,$event,scope.column.property)">
                                                        </el-checkbox>
                                                        </template>
                                                    </el-table-column> -->
                                                    <el-table-column
                                                        v-if="columnView"
                                                        prop="strTax_Cod" sortable 
                                                        label="Impuesto">
                                                        <template scope="scope">
                                                        <el-input  v-if="bln_tbl_centro_costo  && (scope.row === editing.row) 
                                                            && (scope.column.property === editing.column)" @blur="handleBlur(scope.row)" v-focus size="small" v-model="scope.row.strTax_Cod" :disabled="ImpuestoDisabled">
                                                            <el-button slot="append" class="boton" icon="fa fa-clone" @click="loadImpuesto(scope.row)" :disabled="ImpuestoDisabled"></el-button>  
                                                            </el-input>
                                                            <label v-bind:style="{background:cell_ocultar,width:'100%',margin: '0rem'}" v-else @click="clickcentrocosto(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ scope.row.strTax_Cod }}</label>
                                                        </template>
                                                    </el-table-column>
                                                    <el-table-column
                                                        prop="strUM" sortable  min-width="100"
                                                        label="Unidad Medida">
                                                    </el-table-column>
                                                    <el-table-column
                                                        prop="intQuantity" sortable width="100"
                                                        label="Cantidad">
                                                        <template scope="scope">
                                                            <el-input  type="number" v-if="bln_tbl_cantidad  && (scope.row === editing.row) 
                                                            && (scope.column.property === editing.column)" @blur="handleBlurImporte(scope.row)" v-focus @change="handleChangeCantidad" size="small" v-model="scope.row.intQuantity" :precision="2">
                                                            </el-input>
                                                            <label style="width:100%" v-else @click="clickcantidad(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ scope.row.intQuantity }}</label>
                                                        </template>
                                                    </el-table-column>
                                                    <el-table-column
                                                        prop="intUnit_Price" sortable 
                                                        label="Precio U.">
                                                    </el-table-column>
                                                    <el-table-column
                                                        prop="fltValue_Local" sortable 
                                                        label="Total">
                                                    </el-table-column>
                                                </el-table>
                                            </div>
                                        </div>
                                    </el-card>
                                    
                                </div>
                            </div>
                                      
                        </div>  
                    <!-- </el-card>           -->
                </el-tab-pane>
                <!-- <el-tab-pane > -->
                    <!-- <span slot="label"><i class="el-icon-date"></i>Importante</span> -->
                    <!-- <div class="col-md-6">
                        <div class="form-group row">
                            <label class="el-form-item__label col-sm-3" >Factura creada:</label>
                            <label class="el-form-item__label col-sm-2" >{{fecha_ejecucion}}</label>
                        </div>
                        <div class="form-group row" style="margin-top:10px;">
                            <label class="el-form-item__label col-sm-3" >Numero de Voucher:</label>
                            <div class="col-sm-3 grupolabel">
                                    <div class="input-group mb-3" >
                                        <el-input type="text"  size ="small" style="font-size:11px;" v-model="voucher"></el-input>
                                    </div>
                                </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group row">
                            <div class="col-sm-3 grupolabel">
                                    <div class="input-group mb-3" >
                                       
                                    </div>
                                </div>
                        </div>
                        <div class="form-group row">
                            <label class="el-form-item__label col-sm-3" >Total Pagar S.</label>
                                <div class="col-sm-3 grupolabel">
                                    <div class="input-group mb-3" >
                                        <el-input type="text"  size ="small" style="font-size:11px;" v-model="TotalPagarS"></el-input>
                                    </div>
                                </div>
                            <label class="el-form-item__label col-sm-3" >Total Pagar $.</label>
                                <div class="col-sm-3 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input type="text"  size ="small" style="font-size:11px;" v-model="TotalPagarD"></el-input>
                                    </div>
                                </div>
                        </div>                  
                    </div>
                    <div class="col-md-6">                                
                    </div> -->
                <!-- </el-tab-pane> -->
            </el-tabs>
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
        <el-dialog title="Busqueda compañia"  :visible.sync="dialogCompania" @close="dialogCompaniaClose" size="small" >
            <bcompania v-on:companiaSeleccionado="companiaSeleccionado($event)" v-on:companiaClose="companiaClose()">
            </bcompania>
        </el-dialog>
        <el-dialog title="Busqueda Impuesto"  :visible.sync="dialogImpuesto" @close="closeDialogImpuesto" size="small" >
            <bimpuesto v-on:impuestoseleccionado="ImpuestoSeleccionado($event)" v-on:impuestoClose="closeImpuesto()">
            </bimpuesto>
        </el-dialog>
    
         <el-dialog title="Busqueda Orden de compra"  :visible.sync="dialogOrdenCompra" size="small" >
            <div>
                <el-card class="box-card">
                <div slot="header" class="headercard">
                    <span class="labelheadercard" >Buscar orden de compra</span>
                </div>
                <div class="row bodycard">
                    <div class="col-md-12">
                        <div class="form-group row">
                            <label class="el-form-item__label col-md-2" >Codigo</label>
                            <div class="col-md-2 grupolabel">
                                <div class="input-group mb-3" >
                                <el-input size ="small"   placeholder="">
                                <el-button slot="append" style="padding: 3px 3px !important;background: #fff5c4;
                            background: -webkit-gradient(left top, left bottom, color-stop(0%, #fff5c4), color-stop(100%, #ffee9f));
                            background: -webkit-gradient(linear, left top, left bottom, from(#fff5c4), to(#ffee9f));
                            background: linear-gradient(to bottom, #fff5c4 0%, #ffee9f 100%);" icon="fa fa-search"
                                            > </el-button>
                                </el-input>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <el-table
                    :data="ordencompra"
                    stripe  :default-sort = "{prop: 'date', order: 'descending'}"
                    style="width: 100%;cursor: pointer;" class="ExcelTable2007"
                    height="250"
                    highlight-current-row
                    @row-dblclick="selectOrdenCompra"
                    @current-change="selectOrdenCompra">
                    <el-table-column  prop="strPO_NO" label="Codigo" width="180">
                    </el-table-column>  
                    <el-table-column  prop="strPO_Desc" label="Descripción" style="width: 70% !important;">
                    </el-table-column> 
                </el-table>
            </el-card>
            <br/>
            <footer class="modal-footer">
                <el-button class="buttonfilter btn btn-outline-secondary orange" @click="checkOrdenCompra()">
                <img class="imagenfilter" src="../../../../images/check.png" alt="" >
                </el-button>
                <el-button class="buttonfilter btn btn-outline-secondary orange" style="margin-left: 0px;"  @click="closeOrdenCompra()">
                <img class="imagenfilter" src="../../../../images/close.png" alt="" >
                </el-button>
            </footer>
            </div>
        </el-dialog>
         <el-dialog title="Tipo Comprobante Pago"  :visible.sync="dialogTipoDocumento" @close="closeTipoDocumento" size="small" >
            <bcomprobantepago v-on:ComprobantePagoSeleccionado="ComprobantePagoSeleccionado($event)" v-on:closeComprobantePago="closeTipo()">
            </bcomprobantepago>
        </el-dialog>  
        <el-dialog title="Moneda"  :visible.sync="dialogMoneda" @close="closeDialogMoneda" size="small" >
            <bmoneda v-on:MonedaSeleccionado="MonedaSeleccionado($event)" v-on:closeMoneda="closeMoneda()">
            </bmoneda>
        </el-dialog>  
        <el-dialog title="Diarios" :visible.sync="dialogDiario" @close="closeDialogDiario" size="small" >
            <div>
                <el-card class="box-card">
                <div slot="header" class="headercard">
                    <span class="labelheadercard" >Buscar Diario</span>
                </div>
                <div class="row bodycard">
                    <div class="col-md-12">
                        <div class="form-group row">
                            <label class="el-form-item__label col-md-3" >Diario Codigo</label>
                            <div class="col-md-2 grupolabel">
                                <div class="input-group mb-3" >
                                <el-input size ="small"   placeholder="">
                                <el-button slot="append" style="padding: 3px 3px !important;background: #fff5c4;
                            background: -webkit-gradient(left top, left bottom, color-stop(0%, #fff5c4), color-stop(100%, #ffee9f));
                            background: -webkit-gradient(linear, left top, left bottom, from(#fff5c4), to(#ffee9f));
                            background: linear-gradient(to bottom, #fff5c4 0%, #ffee9f 100%);" icon="fa fa-search"
                                            > </el-button>
                                </el-input>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <el-table
                    :data="diarioModel"
                    stripe  :default-sort = "{prop: 'date', order: 'descending'}"
                    style="width: 100%;cursor: pointer;" class="ExcelTable2007"
                    height="250"
                    highlight-current-row
                    @row-dblclick="checkSelectdbDiario"
                    @current-change="checkSelectDiario">
                    <el-table-column  prop="strDaily_Cod" label="Codigo" width="180">
                    </el-table-column>  
                    <el-table-column  prop="strDaily_Desc" label="Descripción" style="width: 70% !important;">
                    </el-table-column> 
                    <el-table-column  prop="strDaily_Type" label="Tipo" width="180">
                    </el-table-column> 
                </el-table>
            </el-card>
            <br/>
            <footer class="modal-footer">
                <el-button class="buttonfilter btn btn-outline-secondary orange" @click="checkSelectdbDiario()">
                <img class="imagenfilter" src="../../../../images/check.png" alt="" >
                </el-button>
                <el-button class="buttonfilter btn btn-outline-secondary orange" style="margin-left: 0px;"  @click="closeDiario()">
                <img class="imagenfilter" src="../../../../images/close.png" alt="" >
                </el-button>
            </footer>
            </div>
        </el-dialog>
    </div>  
</template>
<script>

import CrearIngresoComprobanteComponent from '@/components/FI-FINANZAS/ingreso-comprobante/crear-ingreso-comprobante/crear-ingreso-comprobante.component'
export default CrearIngresoComprobanteComponent
</script>
<style scoped>
.sinLinea{
  border-bottom: 1px solid #f6f7f9;
  color: #1f2d3d; 
}

</style>
