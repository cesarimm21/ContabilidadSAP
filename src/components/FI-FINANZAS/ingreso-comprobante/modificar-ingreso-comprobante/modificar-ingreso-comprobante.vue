<template>
  <div class="modificar-ingreso-comprobante">
    <el-card class="box-card">
      <div slot="header" class="headercard">
        <span class="labelheadercard" > Modificar ingreso comprobante</span>
      </div>   
      <div class="row bodycard">
          <div class="container">
            <div class="row" style="margin-top: 3px;">
              <div class="col-sm-6">
                <div class="form-group row ">
                  <label class="el-form-item__label col-md-3" >Ingreso comprobante</label>
                    <div class="col-md-3 grupolabel">
                      <div class="input-group mb-3" >
                        <el-input  
                          size ="small" 
                          @blur="desactivar_ingreso" 
                          @focus="activar_ingreso" 
                          v-model="ingresoSelect.strVoucher_NO"
                          :maxlength="8">
                          <el-button v-if="btnactivaringreso && !dialogingreso" slot="append" class="boton" icon="fa fa-clone" @click="loadIngreso()"></el-button> 
                        </el-input>
                      </div>
                    </div>
                  <label class="sinLinea el-form-item__label col-md-6" >{{ingresoSelect.strDesc_Doc}}</label>
                </div>                
              </div>
            </div>
            <div class="row" v-if="true">
              <div class="col-sm-6">
                <div class="form-group row ">
                  <label class="el-form-item__label col-md-3" >Compañia</label>
                    <div class="col-md-3 grupolabel">
                      <div class="input-group mb-3" >
                        <el-input  
                          size ="small" 
                          v-model="factura.strCompany_Cod">                          
                        </el-input>
                      </div>
                    </div>
                  <label class="sinLinea el-form-item__label col-md-4" >{{companiaModel.strCompany_Name}}</label>
                </div>
                <div  class="form-group row ">
                  <label class="el-form-item__label col-md-3" >Orden Compra</label>
                    <div class="col-md-3 grupolabel">
                      <div class="input-group mb-3" >
                        <el-input size ="small"  type="text" v-model="factura.strPO_NO" >  
                          </el-input>
                      </div>
                    </div>
                    <label class="el-form-item__label col-md-3" >Proveedor</label>
                    <div class="col-md-3 grupolabel">
                      <div class="input-group mb-3" >
                        <el-input size ="small"  v-model="factura.strVendor_NO" >                            
                        </el-input>
                    </div>
                  </div>
                </div>
                <div  class="form-group row ">
                  <label class="el-form-item__label col-md-3" >Descripción</label>
                  <div class="col-md-9 grupolabel">
                    <div class="input-group mb-9" >
                      <el-input size ="small"  type="text" v-model="factura.strDesc_Doc">  
                      </el-input>
                    </div>
                  </div>
                </div>
                <div  class="form-group row " style="margin-top:10px;">
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
                      <el-input size ="small" type="text"  placeholder="" v-model="factura.strPeriod_NO" disabled>                            
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
                        <el-input size ="small" v-model="factura.intDocument_NO" type="number" :maxlength="9">                            
                        </el-input>
                      </div>
                    </div>
                  </div>            
              </div>
              <br>
              <el-tabs type="border-card">
              <el-tab-pane>
              <span slot="label"><i class="el-icon-date"></i> General</span>
                <el-card class="box-card">
                  <div class="row bodycard">
                    <div class="container">
                      <div class="row" style="margin-top: 3px;">
                        <div class="col-sm-6">
                          <div class="form-group row">
                          <label class="el-form-item__label col-sm-3" >Fecha Contable</label>
                          <div class="col-sm-3 grupolabel">
                            <div class="input-group mb-3" >
                              <el-input type="date"  size ="small" style="font-size:11px;" v-model="factura.dtmDoc_Acc_Date"  @change="DateContabilizacionClick()"></el-input>
                            </div>
                          </div>
                          <label class="el-form-item__label col-sm-3" >Fecha Vencimiento</label>
                          <div class="col-sm-3 grupolabel">
                            <div class="input-group mb-3" >
                              <el-input type="date"  size ="small" style="font-size:11px;" disabled></el-input>
                            </div>
                          </div>
                        </div>
                        <div class="form-group row">
                        <label class="el-form-item__label col-sm-3" >Fecha Ejecución</label>
                        <div class="col-sm-3 grupolabel">
                          <div class="input-group mb-3" >
                            <el-input type="date"  size ="small" style="font-size:11px;" ></el-input>
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
                        <div class="form-group row">
                          <label class="el-form-item__label col-sm-3" >Impuesto(IGV)</label>
                            <div class="col-sm-3 grupolabel">
                              <div class="input-group mb-3" >
                                <el-input size ="small" @blur="desactivar_Impuesto" @focus="activar_Impuesto"  v-model="factura.fltValue_Tax">
                                  <el-button v-if="btnactivarImpuesto && !dialogImpuesto" slot="append" class="boton" icon="fa fa-clone" @click="loadImpuesto()"></el-button> 
                                </el-input>
                              </div>
                            </div>
                            <label class="el-form-item__label col-sm-3" >T. Cambio</label>
                            <div class="col-sm-3 grupolabel">
                              <div class="input-group mb-3" >
                                <el-input type="number"  size ="small" style="font-size:11px;" v-model="factura.strExchange_Rate" disabled></el-input>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="col-sm-6">
                          <div class="form-group row">
                            <label class="el-form-item__label col-sm-3" >Total Uni.</label>
                            <div class="col-sm-3 grupolabel">
                              <div class="input-group mb-3" >
                                <el-input  size ="small" style="font-size:11px;" ></el-input>
                              </div>
                            </div>
                            <label class="el-form-item__label col-sm-3" >Total.</label>
                            <div class="col-sm-3 grupolabel">
                              <div class="input-group mb-3" >
                                <el-input  size ="small" style="font-size:11px;" ></el-input>
                              </div>
                            </div>
                          </div>
                          <div class="form-group row">
                            <label class="el-form-item__label col-sm-3" >Total S/.</label>
                              <div class="col-sm-3 grupolabel">
                                <div class="input-group mb-3" >
                                  <el-input type="text"  size ="small" style="font-size:11px;"  ></el-input>
                                </div>
                              </div>
                            <label class="el-form-item__label col-sm-3" >Total $.</label>
                            <div class="col-sm-3 grupolabel">
                              <div class="input-group mb-3" >
                                <el-input type="text"  size ="small" style="font-size:11px;"></el-input>
                              </div>
                            </div>
                          </div>
                            <div class="form-group row">
                              <label class="el-form-item__label col-sm-3" >Total Pagar S.</label>
                                <div class="col-sm-3 grupolabel">
                                  <div class="input-group mb-3" >
                                    <el-input type="text"  size ="small" style="font-size:11px;"></el-input>
                                  </div>
                                </div>
                              <label class="el-form-item__label col-sm-3" >Total Pagar $.</label>
                              <div class="col-sm-3 grupolabel">
                                <div class="input-group mb-3" >
                                <el-input type="text"  size ="small" style="font-size:11px;"></el-input>
                              </div>
                            </div>
                            </div>
                          </div>
                      </div>
                    </div>                                      
                  </div>  
                </el-card>          
              </el-tab-pane>
            </el-tabs>
            </div>
          </div>
      </div>
      
    </el-card>
    <el-dialog title="Tipo documento"  :visible.sync="dialogTipoDocumento" @close="closeTipoDocumento" size="small" >
            <bdocumento v-on:tipoSeleccionado="tipoSeleccionado($event)" v-on:closeTipo="closeTipo()">
            </bdocumento>
        </el-dialog> 
    <el-dialog title="Busqueda Impuesto"  :visible.sync="dialogImpuesto" @close="closeDialogImpuesto" size="small" >
            <bimpuesto v-on:ImpuestoSeleccionado="ImpuestoSeleccionado($event)" v-on:closeImpuesto="closeImpuesto()">
            </bimpuesto>
        </el-dialog>
        <el-dialog title="Moneda"  :visible.sync="dialogMoneda" @close="closeDialogMoneda" size="small" >
            <bmoneda v-on:MonedaSeleccionado="MonedaSeleccionado($event)" v-on:closeMoneda="closeMoneda()">
            </bmoneda>
        </el-dialog>  
    <el-dialog title="Busqueda Ingreso comprobante"  :visible.sync="dialogingreso" size="small" >
            <div>
                <el-card class="box-card">
                <div slot="header" class="headercard">
                    <span class="labelheadercard" >Buscar ingreso</span>
                </div>
                <div class="row bodycard">
                    <div class="col-md-12">
                        <div class="form-group row">
                            <label class="el-form-item__label col-md-2" >Codigo voucher</label>
                            <div class="col-md-2 grupolabel">
                                <div class="input-group mb-3" >
                                <el-input size ="small"   placeholder="" v-model="codigoInput" :maxlength="8">
                                <el-button slot="append" style="padding: 3px 3px !important;background: #fff5c4;
                            background: -webkit-gradient(left top, left bottom, color-stop(0%, #fff5c4), color-stop(100%, #ffee9f));
                            background: -webkit-gradient(linear, left top, left bottom, from(#fff5c4), to(#ffee9f));
                            background: linear-gradient(to bottom, #fff5c4 0%, #ffee9f 100%);" icon="fa fa-search"
                                            @click="loadIngresoByCod()"
                                            > </el-button>
                                </el-input>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <el-table
                    :data="ingresoData"
                    stripe  :default-sort = "{prop: 'date', order: 'descending'}"
                    style="width: 100%;cursor: pointer;" class="ExcelTable2007"
                    height="250"
                    highlight-current-row
                    @row-dblclick="selectOrdenCompra"
                    @current-change="selectOrdenCompra">
                    <el-table-column  prop="strVoucher_NO" label="Codigo" width="180">
                    </el-table-column>  
                    <el-table-column  prop="strDesc_Doc" label="Descripción" style="width: 70% !important;">
                    </el-table-column> 
                </el-table>
            </el-card>
            <br/>
            <footer class="modal-footer">
                <el-button class="buttonfilter btn btn-outline-secondary orange" @click="checkIngreso()">
                <img class="imagenfilter" src="../../../../images/check.png" alt="" >
                </el-button>
                <el-button class="buttonfilter btn btn-outline-secondary orange" style="margin-left: 0px;"  @click="closeIngreso()">
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

import ModificarIngresoComprobanteComponent from '@/components/FI-FINANZAS/ingreso-comprobante/modificar-ingreso-comprobante/modificar-ingreso-comprobante.component'
export default ModificarIngresoComprobanteComponent
</script>
<style scoped>
.sinLinea{
  border-bottom: 1px solid #f6f7f9;
}
</style>
