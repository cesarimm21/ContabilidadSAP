<template>
    <div class="crear-ingreso-comprobante">
        <el-card class="box-card">
            <div slot="header" class="headercard">
                <span class="labelheadercard" > Crear ingreso comprobante</span>
                <!-- <el-button slot="append" class="boton" icon="fa fa-clone" @click="saveFactura()" :disabled="habilitar">Guardar</el-button>  -->
            </div>
            <div class="row bodycard">
                <div class="container">
                    <div class="row" style="margin-top: 3px;">
                        <div class="col-sm-6">
                            <div class="form-group row ">
                                <label class="el-form-item__label col-md-3" >Compañia</label>
                                <div class="col-md-3 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input size ="small" @blur="desactivar_compania" @focus="activar_compania" v-model="factura.strCompany_Cod"  placeholder="">
                                        <el-button v-if="btnactivarcompania && !dialogCompania" slot="append" class="boton" icon="fa fa-clone" @click="loadCompania()"></el-button> 
                                    </el-input>
                                    </div>
                                </div>
                                <label class="el-form-item__label col-md-4" >{{companiaModel.strCompany_Name}}</label>
                            </div>
                            <div  class="form-group row ">
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
                                    <el-input size ="small" @blur="desactivar_proveedor" @focus="activar_proveedor" placeholder="" v-model="factura.strVendor_NO" >                            
                                        <el-button v-if="btnactivarproveedor && !dialogProveedor" slot="append" class="boton" icon="fa fa-clone" @click="loadProveedor()"></el-button> 
                                    </el-input>
                                    </div>
                                </div>
                            </div>
                            <div  class="form-group row ">
                                <label class="el-form-item__label col-md-3" >Tipo Documento</label>
                                <div class="col-md-3 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input size ="small"   @blur="desactivar_TipoDocumento" @focus="activar_TipoDocumento" v-model="factura.strType_Doc" >                            
                                         <el-button v-if="btnactivarTipoDocumento && !dialogTipoDocumento" slot="append" class="boton" icon="fa fa-clone" @click="loadTipoDocumento()"></el-button> 
                                    </el-input>
                                    </div>
                                </div>
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
                                    <el-input size ="small"   v-model="factura.strSerie_Doc" maxlength="4">                            
                                    </el-input>
                                    </div>
                                </div>
                                <label class="el-form-item__label col-md-3" >Diario</label>
                                <div class="col-md-3 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input size ="small"   @blur="desactivar_Diario" @focus="activar_Diario" v-model="factura.strDaily_Cod" >                            
                                         <el-button v-if="btnactivarDiario && !dialogDiario" slot="append" class="boton" icon="fa fa-clone" @click="loadDiario()"></el-button> 
                                    </el-input>
                                    </div>
                                </div>
                            </div>
                            <div  class="form-group row ">
                                <label class="el-form-item__label col-md-3" >N. Documento</label>
                                <div class="col-md-3 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input size ="small" v-model="factura.intDocument_NO" maxlength="9" type="number">                            
                                    </el-input>
                                    </div>
                                </div>
                                <!-- <label class="el-form-item__label col-md-3" >Voucher</label>
                                <div class="col-md-3 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input size ="small" type="text"  placeholder=""  >                            
                                    </el-input>
                                    </div>
                                </div> -->
                            </div>                            
                        </div>
                        <div class="col-md-6">
                            <div  class="form-group row ">
                                <div class="col-md-6"></div>
                                <div class="col-md-6">
                                    <div align="right"
                                        style="padding-top:5px;padding-bottom:5px;font-size:12px;margin-right: 30px;">
                                        <span>Fecha Ejecución: {{fecha_ejecucion}}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row" style="margin-top: 15px;">
                                <label class="el-form-item__label col-md-3">Descripción</label>
                                <div class="col-md-8 grupolabel">
                                    <div class="input-group mb-8">
                                        <el-input size ="small" v-model="factura.strDesc_Doc"  type="text">                            
                                        </el-input>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <el-tabs type="border-card">
                <el-tab-pane>
                    <span slot="label"><i class="el-icon-date"></i> General</span>
                    <el-card class="box-card">
                        <div class="row bodycard">
                            <div class="container">
                                <div class="row" style="margin-top: 3px;">
                                    <div class="col-sm-6">
                                        <div class="form-group row">
                                            <label class="el-form-item__label col-sm-3" >Fecha doc.</label>
                                            <div class="col-sm-3 grupolabel">
                                                <div class="input-group mb-3" >
                                                <el-input type="date"  size ="small" style="font-size:11px;" ></el-input>
                                                </div>
                                            </div>
                                            <label class="el-form-item__label col-sm-3" >Fecha Estimada</label>
                                            <div class="col-sm-3 grupolabel">
                                                <div class="input-group mb-3" >
                                                <el-input type="date"  size ="small" style="font-size:11px;" ></el-input>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label class="el-form-item__label col-sm-3" >Fecha Recibida</label>
                                            <div class="col-sm-3 grupolabel">
                                                <div class="input-group mb-3" >
                                                <el-input type="date"  size ="small" style="font-size:11px;" ></el-input>
                                                </div>
                                            </div>
                                            <label class="el-form-item__label col-sm-3" >Moneda</label>
                                            <div class="col-sm-3 grupolabel">
                                                <div class="input-group mb-3" >
                                                <el-input size ="small" @blur="desactivar_Moneda" @focus="activar_Moneda" v-model="factura.strPaid_Bank">                            
                                                    <el-button v-if="btnactivarMoneda && !dialogMoneda" slot="append" class="boton" icon="fa fa-clone" @click="loadMoneda()"></el-button> 
                                                </el-input>
                                                </div>
                                            </div>
                                            <!-- <label class="el-form-item__label col-sm-3">Contador</label>
                                            <div class="col-sm-3 grupolabel">
                                                <div class="input-group mb-3">
                                                <el-input type="number"  size ="small" style="font-size:11px;"></el-input>
                                                </div>
                                            </div> -->
                                        </div>
                                        <div class="form-group row">
                                            <label class="el-form-item__label col-sm-3" >Impuesto(IGV)</label>
                                            <div class="col-sm-3 grupolabel">
                                                <div class="input-group mb-3" >
                                                 <el-input size ="small" @blur="desactivar_Impuesto" @focus="activar_Impuesto" v-model="Impuesto.fltPorcent"  placeholder="">
                                                    <el-button v-if="btnactivarImpuesto && !dialogImpuesto" slot="append" class="boton" icon="fa fa-clone" @click="loadImpuesto()"></el-button> 
                                                </el-input>
                                                </div>
                                            </div>
                                            <label class="el-form-item__label col-sm-3" >T. Cambio</label>
                                            <div class="col-sm-3 grupolabel">
                                                <div class="input-group mb-3" >
                                                <el-input type="number"  size ="small" style="font-size:11px;"  v-model="tipocambio.fltExchRate_Buy" disabled></el-input>
                                                </div>
                                            </div>
                                            <!-- <label class="el-form-item__label col-sm-3" >Total Doc.</label>
                                            <div class="col-sm-3 grupolabel">
                                                <div class="input-group mb-3" >
                                                <el-input type="number"  size ="small" style="font-size:11px;" ></el-input>
                                                </div>
                                            </div> -->
                                        </div>
                                    </div>
                                    <div class="col-sm-6">
                                        <div class="form-group row">
                                            <label class="el-form-item__label col-sm-3" >Total Uni.</label>
                                            <div class="col-sm-3 grupolabel">
                                                <div class="input-group mb-3" >
                                                <el-input  size ="small" style="font-size:11px;" v-model="salidaUnidad"></el-input>
                                                </div>
                                            </div>
                                            <label class="el-form-item__label col-sm-3" >Total.</label>
                                            <div class="col-sm-3 grupolabel">
                                                <div class="input-group mb-3" >
                                                <el-input  size ="small" style="font-size:11px;" v-model="salidaDinero" ></el-input>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label class="el-form-item__label col-sm-3" >Total S/.</label>
                                            <div class="col-sm-3 grupolabel">
                                                <div class="input-group mb-3" >
                                                <el-input type="text"  size ="small" style="font-size:11px;" v-model="salidaDinero" ></el-input>
                                                </div>
                                            </div>
                                            <label class="el-form-item__label col-sm-3" >Total $.</label>
                                            <div class="col-sm-3 grupolabel">
                                                <div class="input-group mb-3" >
                                                <el-input type="text"  size ="small" style="font-size:11px;" v-model="totalDolars"></el-input>
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
                                </div>
                            </div>  
                            <br>
                            <div class="row" style="width:100%;">
                                <div class="col-md-12">
                                    <el-card class="box-card" >
                                        <div slot="header" class="headercard" style="margin-top: -4px;">
                                            <buttons-accions v-on:handleClickInParent="handleClickInParent()"></buttons-accions>
                                        </div>
                                        <div class="col-md-12" style="margin-top: 6px;">
                                            <div class="row bodycard" style="background: white;    margin-top: -11px;">
                                                <el-table
                                                    :data="ordencompraDetalle"
                                                    max-height="sizeScreen"
                                                    stripe  :default-sort = "{prop: 'date', order: 'descending'}"
                                                    class="ExcelTable2007">
                                                    <el-table-column type="index" width="58">
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
                                                        prop="strPO_Item_Desc" sortable  min-width="200"
                                                        label="Descripción">
                                                    </el-table-column>
                                                    <el-table-column
                                                        prop="strRequis_NO" sortable
                                                        label="Requisición">
                                                    </el-table-column>
                                                    <el-table-column
                                                        prop="fltPO_QTY_I" sortable 
                                                        label="Cantidad">
                                                    </el-table-column>
                                                    <el-table-column
                                                        prop="fltPO_Net_PR_I" sortable 
                                                        label="Precio U.">
                                                    </el-table-column>
                                                    <el-table-column
                                                        prop="fltCurr_Net_PR_P" sortable 
                                                        label="Total">
                                                    </el-table-column>
                                                </el-table>
                                            </div>
                                        </div>
                                    </el-card>
                                    
                                </div>
                            </div>
                                      
                        </div>  
                    </el-card>          
                </el-tab-pane>
                <el-tab-pane >
                    <span slot="label"><i class="el-icon-date"></i>Impuesto</span>
                    <div class="col-md-6">
                        <div class="form-group row">
                            <label class="el-form-item__label col-sm-3" >Factura creada:</label>
                        </div>
                        <div class="form-group row">
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
                    </div>
                </el-tab-pane>
            </el-tabs>
        </el-card>
        <el-dialog title="Busqueda compañia"  :visible.sync="dialogCompania" @close="dialogCompaniaClose" size="small" >
            <bcompania v-on:companiaSeleccionado="companiaSeleccionado($event)" v-on:companiaClose="companiaClose()">
            </bcompania>
        </el-dialog>
        <el-dialog title="Busqueda Impuesto"  :visible.sync="dialogImpuesto" @close="closeDialogImpuesto" size="small" >
            <bimpuesto v-on:ImpuestoSeleccionado="ImpuestoSeleccionado($event)" v-on:companiaClose="closeImpuesto()">
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
         <el-dialog title="Tipo documento"  :visible.sync="dialogTipoDocumento" @close="closeTipoDocumento" size="small" >
            <bdocumento v-on:tipoSeleccionado="tipoSeleccionado($event)" v-on:closeTipo="closeTipo()">
            </bdocumento>
        </el-dialog>  
        <el-dialog title="Moneda"  :visible.sync="dialogMoneda" @close="closeDialogMoneda" size="small" >
            <bmoneda v-on:MonedaSeleccionado="MonedaSeleccionado($event)" v-on:closeMoneda="closeMoneda()">
            </bmoneda>
        </el-dialog>  
         <el-dialog title="Proveedor" :visible.sync="dialogProveedor" @close="closeProveedor" size="small" >
            <div>
                <el-card class="box-card">
                <div slot="header" class="headercard">
                    <span class="labelheadercard" >Buscar Proveedor</span>
                </div>
                <div class="row bodycard">
                    <div class="col-md-12">
                        <div class="form-group row">
                            <label class="el-form-item__label col-md-3" >Proveedor Codigo</label>
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
                    :data="dataProveedor"
                    stripe  :default-sort = "{prop: 'date', order: 'descending'}"
                    style="width: 100%;cursor: pointer;" class="ExcelTable2007"
                    height="250"
                    highlight-current-row
                    @row-dblclick="checkSelectProveedor"
                    @current-change="checkSelectProveedor">
                    <el-table-column  prop="codigo" label="Codigo" width="180">
                    </el-table-column>  
                    <el-table-column  prop="descripcion" label="Descripción" style="width: 70% !important;">
                    </el-table-column> 
                </el-table>
            </el-card>
            <br/>
            <footer class="modal-footer">
                <el-button class="buttonfilter btn btn-outline-secondary orange" @click="closeProveedor()">
                <img class="imagenfilter" src="../../../../images/check.png" alt="" >
                </el-button>
                <el-button class="buttonfilter btn btn-outline-secondary orange" style="margin-left: 0px;"  @click="closeProveedor()">
                <img class="imagenfilter" src="../../../../images/close.png" alt="" >
                </el-button>
            </footer>
            </div>
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
</style>
