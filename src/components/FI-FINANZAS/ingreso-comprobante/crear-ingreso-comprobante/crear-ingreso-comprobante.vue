<template>
    <div class="crear-ingreso-comprobante">
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
                                    <el-input size ="small" @blur="desactivar_compania" @focus="activar_compania" v-model="codigoCompania"  placeholder="">
                                        <el-button v-if="btnactivarcompania && !dialogCompania" slot="append" class="boton" icon="fa fa-clone" @click="loadCompania()"></el-button> 
                                    </el-input>
                                    </div>
                                </div>
                                <label class="el-form-item__label col-md-2" >{{descripcionCompania}}</label>
                            </div>
                            <div  class="form-group row ">
                                <label class="el-form-item__label col-md-3" >Orden Compra</label>
                                <div class="col-md-3 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input size ="small" @blur="desactivar_OrdenCompra" @focus="activar_OrdenCompra" >  
                                        <el-button v-if="btnactivarOrdenCompra && !dialogOrdenCompra" slot="append" class="boton" icon="fa fa-clone" @click="loadOrdenCompra()"></el-button>                           
                                    </el-input>
                                    </div>
                                </div>
                                <label class="el-form-item__label col-md-3" >Proveedor</label>
                                <div class="col-md-3 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input size ="time" @blur="desactivar_proveedor" @focus="activar_proveedor" placeholder=""  >                            
                                        <el-button v-if="btnactivarproveedor && !dialogProveedor" slot="append" class="boton" icon="fa fa-clone" @click="loadProveedor()"></el-button> 
                                    </el-input>
                                    </div>
                                </div>
                            </div>
                            <div  class="form-group row ">
                                <label class="el-form-item__label col-md-3" >Tipo Documento</label>
                                <div class="col-md-3 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input size ="small"   @blur="desactivar_TipoDocumento" @focus="activar_TipoDocumento"  >                            
                                         <el-button v-if="btnactivarTipoDocumento && !dialogTipoDocumento" slot="append" class="boton" icon="fa fa-clone" @click="loadTipoDocumento()"></el-button> 
                                    </el-input>
                                    </div>
                                </div>
                                <label class="el-form-item__label col-md-3" >Periodo</label>
                                <div class="col-md-3 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input size ="time" type="date"  placeholder=""  >                            
                                    </el-input>
                                    </div>
                                </div>
                            </div>
                            <div  class="form-group row ">
                                <label class="el-form-item__label col-md-3" >Serie</label>
                                <div class="col-md-3 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input size ="small"   placeholder=""  >                            
                                    </el-input>
                                    </div>
                                </div>
                                <label class="el-form-item__label col-md-3" >Diario</label>
                                <div class="col-md-3 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input size ="time" type="text"  placeholder=""  >                            
                                    </el-input>
                                    </div>
                                </div>
                            </div>
                            <div  class="form-group row ">
                                <label class="el-form-item__label col-md-3" >Documento</label>
                                <div class="col-md-3 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input size ="small"   placeholder=""  >                            
                                    </el-input>
                                    </div>
                                </div>
                                <label class="el-form-item__label col-md-3" >Voucher</label>
                                <div class="col-md-3 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input size ="time" type="text"  placeholder=""  >                            
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
                                            <label class="el-form-item__label col-sm-3" >Contador</label>
                                            <div class="col-sm-3 grupolabel">
                                                <div class="input-group mb-3" >
                                                <el-input type="number"  size ="small" style="font-size:11px;" ></el-input>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label class="el-form-item__label col-sm-3" >Impuesto(IGV)</label>
                                            <div class="col-sm-3 grupolabel">
                                                <div class="input-group mb-3" >
                                                <el-input type="number"  size ="small" style="font-size:11px;" ></el-input>
                                                </div>
                                            </div>
                                            <label class="el-form-item__label col-sm-3" >Total Doc.</label>
                                            <div class="col-sm-3 grupolabel">
                                                <div class="input-group mb-3" >
                                                <el-input type="number"  size ="small" style="font-size:11px;" ></el-input>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            
                                            <label class="el-form-item__label col-sm-3" >Moneda</label>
                                            <div class="col-sm-3 grupolabel">
                                                <div class="input-group mb-3" >
                                                <el-input size ="time" @blur="desactivar_Moneda" @focus="activar_Moneda" placeholder=""  >                            
                                                    <el-button v-if="btnactivarMoneda && !dialogMoneda" slot="append" class="boton" icon="fa fa-clone" @click="loadMoneda()"></el-button> 
                                                </el-input>
                                                </div>
                                            </div>
                                            <label class="el-form-item__label col-sm-3" >T. Cambio</label>
                                            <div class="col-sm-3 grupolabel">
                                                <div class="input-group mb-3" >
                                                <el-input type="number"  size ="small" style="font-size:11px;" ></el-input>
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
                                                    :data="TableIngreso"
                                                    max-height="sizeScreen"
                                                    stripe  :default-sort = "{prop: 'date', order: 'descending'}"
                                                    class="ExcelTable2007">
                                                    <el-table-column type="index" width="58">
                                                    </el-table-column>
                                                    <el-table-column
                                                        prop="cuenta" sortable min-width="200"
                                                        label="Categoria cuenta">
                                                    </el-table-column>
                                                    <el-table-column
                                                        prop="almacen" sortable  min-width="200"
                                                        label="Almacen">
                                                    </el-table-column>
                                                    <el-table-column
                                                        prop="material" sortable
                                                        label="Material">
                                                    </el-table-column>
                                                    <el-table-column
                                                        prop="descripcion" sortable 
                                                        label="Descripción">
                                                    </el-table-column>
                                                    <el-table-column
                                                        prop="lugar" sortable 
                                                        label="Lugar entrega">
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
                    <div class="col-md-12">
                        <buttons-accions ></buttons-accions>  
                    </div>
                    <div class="col-md-12">                                
                    </div>
                </el-tab-pane>
            </el-tabs>
        </el-card>
        <el-dialog title="Busqueda compañia"  :visible.sync="dialogCompania" @close="closeCompania" size="small" >
            <bcompania>
            </bcompania>
        </el-dialog>
         <el-dialog title="Busqueda proveedor"  :visible.sync="dialogProveedor" @close="closeProveedor" size="small" >
            <bproveedor>
            </bproveedor>
        </el-dialog>
         <el-dialog title="Busqueda Orden de compra"  :visible.sync="dialogOrdenCompra" @close="closeOrdenCompra" size="small" >
            <div>
                <el-card class="box-card">
                <div slot="header" class="headercard">
                    <span class="labelheadercard" >Buscar orden de compra</span>
                </div>
                <div class="row bodycard">
                    <div class="col-md-12">
                        <div class="form-group row">
                            <label class="el-form-item__label col-md-3" >Orde de compra Codigo</label>
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
                    :data="dataOrdenCompra"
                    stripe  :default-sort = "{prop: 'date', order: 'descending'}"
                    style="width: 100%;cursor: pointer;" class="ExcelTable2007"
                    height="250"
                    highlight-current-row
                    @current-change="handleCurrentChange">
                    <el-table-column  prop="codigo" label="Codigo" width="180">
                    </el-table-column>  
                    <el-table-column  prop="descripcion" label="Descripción" style="width: 70% !important;">
                    </el-table-column> 
                </el-table>
            </el-card>
            <br/>
            <footer class="modal-footer">
                <el-button class="buttonfilter btn btn-outline-secondary orange" @click="closeOrdenCompra()">
                <img class="imagenfilter" src="../../../../images/check.png" alt="" >
                </el-button>
                <el-button class="buttonfilter btn btn-outline-secondary orange" style="margin-left: 0px;"  @click="closeOrdenCompra()">
                <img class="imagenfilter" src="../../../../images/close.png" alt="" >
                </el-button>
            </footer>
            </div>
        </el-dialog>
         <el-dialog title="Tipo documento"  :visible.sync="dialogTipoDocumento" @close="closeTipoDocumento" size="small" >
            <div>
                <el-card class="box-card">
                <div slot="header" class="headercard">
                    <span class="labelheadercard" >Buscar Tipo documento</span>
                </div>
                <div class="row bodycard">
                    <div class="col-md-12">
                        <div class="form-group row">
                            <label class="el-form-item__label col-md-3" >Tipo documento Codigo</label>
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
                    :data="dataTipoD"
                    stripe  :default-sort = "{prop: 'date', order: 'descending'}"
                    style="width: 100%;cursor: pointer;" class="ExcelTable2007"
                    height="250"
                    highlight-current-row
                    @current-change="handleCurrentChange">
                    <el-table-column   prop="codigo" label="Codigo" width="180">
                    </el-table-column>  
                    <el-table-column  prop="descripcion" label="Descripción" style="width: 70% !important;">
                    </el-table-column> 
                </el-table>
            </el-card>
            <br/>
            <footer class="modal-footer">
                <el-button class="buttonfilter btn btn-outline-secondary orange" @click="closeTipoDocumento()">
                <img class="imagenfilter" src="../../../../images/check.png" alt="" >
                </el-button>
                <el-button class="buttonfilter btn btn-outline-secondary orange" style="margin-left: 0px;"  @click="closeTipoDocumento()">
                <img class="imagenfilter" src="../../../../images/close.png" alt="" >
                </el-button>
            </footer>
            </div>
        </el-dialog>
         <el-dialog title="Moneda"  :visible.sync="dialogMoneda" @close="closeMoneda" size="small" >
            <div>
                <el-card class="box-card">
                <div slot="header" class="headercard">
                    <span class="labelheadercard" >Buscar Moneda</span>
                </div>
                <div class="row bodycard">
                    <div class="col-md-12">
                        <div class="form-group row">
                            <label class="el-form-item__label col-md-3" >Moneda Codigo</label>
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
                    :data="dataMoneda"
                    stripe  :default-sort = "{prop: 'date', order: 'descending'}"
                    style="width: 100%;cursor: pointer;" class="ExcelTable2007"
                    height="250"
                    highlight-current-row
                    @current-change="handleCurrentChange">
                    <el-table-column  prop="codigo" label="Codigo" width="180">
                    </el-table-column>  
                    <el-table-column  prop="descripcion" label="Descripción" style="width: 70% !important;">
                    </el-table-column> 
                </el-table>
            </el-card>
            <br/>
            <footer class="modal-footer">
                <el-button class="buttonfilter btn btn-outline-secondary orange" @click="closeMoneda()">
                <img class="imagenfilter" src="../../../../images/check.png" alt="" >
                </el-button>
                <el-button class="buttonfilter btn btn-outline-secondary orange" style="margin-left: 0px;"  @click="closeMoneda()">
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
