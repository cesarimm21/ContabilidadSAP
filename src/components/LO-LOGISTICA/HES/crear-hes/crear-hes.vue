<template>
  <div class="crear-hes">
      <ol  style="margin-left: -1.5rem;background: linear-gradient(rgb(229, 241, 247) 0%, rgb(255, 255, 255) 100%);    margin-bottom: 0rem !important;">
        <quickaccessmenu v-on:guardarTodo="guardarHes($event)" v-on:backPage="backPage($event)"  v-on:reloadpage="reloadpage($event)"></quickaccessmenu>
        </ol>
      <el-card class="box-card">
          
            <div slot="header" class="headercard">
                <span class="labelheadercard" > Crear aceptacion servicio</span>
            </div>
            <div class="row bodycard">
                <div class="container">
                    <div class="row" style="margin-top: 3px;">
                        <div class="col-sm-6">
                            <div class="form-group row">
                                <label class="el-form-item__label col-md-3" >Compañia</label>
                                    <div class="col-md-3 grupolabel">
                                        <div class="input-group mb-3" >
                                         <el-input size ="small" v-model="codigoCompania" disabled>  
                                        </el-input>
                                    </div>
                                </div>   
                                 <label class="sinLinea el-form-item__label col-md-5" >{{descripcionCompania}}</label>
                            </div>
                            <div class="form-group row ">
                                <label class="el-form-item__label col-md-3" >Orden Compra</label>
                                    <div class="col-md-3 grupolabel">
                                        <div class="input-group mb-3" >
                                         <el-input size ="small" @blur="desactivar_OrdenC" @focus="activar_OrdenC" v-model="hesModel.strPO_NO" class="inputOrdenCompra">                            
                                            <el-button v-if="btnactivarOrdenC && !dialogOrdenCompra" slot="append" class="boton" icon="fa fa-clone" @click="loadOrdenC()"></el-button> 
                                        </el-input>
                                    </div>
                                </div>                                             
                            </div>
                            
                            <div class="form-group row" >                                
                                <label class="el-form-item__label col-md-3" >Descripcion PO</label>
                                    <div class="col-md-9 grupolabel">
                                    <div class="input-group mb-9" >
                                    <el-input size ="small" @click="desactivar()" v-model="hesModel.strDesc_Header">
                                    </el-input>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="form-group row">
                                <label class="sinLinea el-form-item__label col-md-3" ></label>
                                <!-- <div class="col-md-3 grupolabel">{{ordencompraSelect.strCompany_Desc}}</div> -->
                                <div class="col-sm-3"></div>
                                <div class="col-md-4" style="margin-top:5px;">
                                    <span v-if="isactivered" v-bind:class="{red1:isactivered}">&nbsp;</span>
                                    <span v-if="!isactivered" v-bind:class="{opaco:!isactivered}">&nbsp;</span>
                                    <span v-if="isactiveyellow" v-bind:class="{yellow:isactiveyellow}">&nbsp;</span>
                                    <span v-if="!isactiveyellow" v-bind:class="{opaco:!isactiveyellow}">&nbsp;</span>
                                    <span v-if="isactivegreen" v-bind:class="{green:isactivegreen}">&nbsp;</span>
                                    <span v-if="!isactivegreen" v-bind:class="{opaco:!isactivegreen}">&nbsp;</span>
                                </div>  
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br>
            <el-tabs type="border-card">
                <el-tab-pane>
                    <span slot="label"><i class="el-icon-tickets"></i> Aceptacion Servicio</span>
                    <el-card class="box-card">
                        <div class="row bodycard">
                            <div class="container">
                                <div class="row" style="margin-top: 3px;">
                                    <div class="col-sm-6">
                                        <div class="form-group row">
                                            <label class="el-form-item__label col-sm-3" >Categoria Linea. </label>
                                            <div class="col-sm-3 grupolabel">
                                                <div class="input-group mb-3" >
                                                    <el-input size ="small" @blur="desactivar_categoria" @focus="activar_categoria" v-model="hesModel.strCategItem_Cod" class="inputOrdenCompra">                            
                                                    <el-button v-if="btnactivarcategoria && !dialogCategoriaLinea" slot="append" class="boton" icon="fa fa-clone" @click="loadCategoria()"></el-button> 
                                                </el-input>
                                                </div>
                                            </div>
                                            <label class="el-form-item__label col-sm-3"  >Fecha Docum.</label>
                                            <div class="col-sm-3 grupolabel">
                                                <div class="input-group mb-3" >
                                                    <el-date-picker
                                                        type="date"
                                                        style="width:128px !important"
                                                        :disabled="true"
                                                        format="dd.MM.yyyy"
                                                        size="small" v-model="fecha_ejecucion" >
                                                    </el-date-picker>
                                                </div>
                                            </div>
                                        </div>                                        
                                        <div class="form-group row">
                                            
                                            <label class="el-form-item__label col-sm-3" >Responsable Inter.</label><!--editable que entre-->
                                            <div class="col-sm-9 grupolabel">
                                                <div class="input-group mb-9" >
                                                <el-input type="text"  size ="small" style="font-size:11px;" v-model="hesModel.strAuthsd_BYInt"></el-input>
                                                </div>
                                            </div>                                            
                                        </div>
                                        <div class="form-group row" style="margin-top:10px;">
                                            <label class="el-form-item__label col-sm-3" >Responsable Ext.</label><!--editable que entre-->
                                            <div class="col-sm-9 grupolabel">
                                                <div class="input-group mb-9" >
                                                <el-input type="text"  size ="small" style="font-size:11px;" v-model="hesModel.strAuthsd_ByExt"></el-input>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group row" style="margin-top:10px;">
                                            <label class="el-form-item__label col-sm-3" >Fecha.</label>
                                            <div class="col-sm-3 grupolabel">
                                                <div class="input-group mb-3" >
                                                    <el-date-picker
                                                        type="date"
                                                        style="width:128px !important"
                                                        :disabled="false"
                                                        format="dd.MM.yyyy"
                                                        size="small" v-model="fecha_since" >
                                                    </el-date-picker>                                                
                                                </div>
                                            </div>
                                            <div class="col-sm-3" style="text-aling:center;">
                                                <div class="col-sm-3 grupolabel">
                                                    <div class="input-group mb-3" >
                                                        <span style="align:center;">-</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-sm-3 grupolabel">
                                                <div class="input-group mb-3" >
                                                    <el-date-picker
                                                        type="date"
                                                        style="width:128px !important"
                                                        :disabled="false"
                                                        format="dd.MM.yyyy"
                                                        size="small" v-model="fecha_until" >
                                                    </el-date-picker>                                                     
                                                </div>
                                            </div>                                            
                                        </div>
                                    </div>
                                    <div class="col-sm-6">
                                        <div class="form-group row">                                           
                                            
                                            <label class="el-form-item__label col-sm-3" >Importe Total</label>
                                            <div class="col-sm-3 grupolabel">
                                                <div class="input-group mb-3" >
                                                <!-- <el-input type="number"  size ="small" style="font-size:11px;" v-model="ordencompraDetalleSelect.fltCurr_Net_PR_P"></el-input> -->
                                                <el-input type="number"  size ="small" style="font-size:11px; text-align: right; " class="inputAling" v-model="hesModel.fltTot_QTY" disabled></el-input>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            
                                            <label class="el-form-item__label col-sm-3"  >Aceptado</label>
                                            <div class="col-sm-3 grupolabel">
                                                <div class="input-group mb-3" >
                                                <el-input type="number"  size ="small" style="font-size:11px;" class="inputAling" @change="changeAcepte" v-model="hesModel.fltTot_Value" :precision="2" :step="0.01" disabled></el-input>
                                                </div>
                                            </div>
                                            
                                        </div>
                                        <div class="form-group row">
                                            <label class="el-form-item__label col-sm-3" >Pendiente</label>
                                            <div class="col-sm-3 grupolabel">
                                                <div class="input-group mb-3" >
                                                <el-input type="number"  size ="small" style="font-size:11px;" class="inputAling" v-model="hesModel.fltTot_Peding_Value" :precision="2" :step="0.01" disabled></el-input>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div class="col-md-12">                                
                                <div class="form-group row">
                                    <div class="col-md-12">
                                        <buttons-accions ></buttons-accions> 
                                    </div>
                                    <br>
                                    <div class="col-md-12">
                                        <div class="row bodycard" style="background: white;    margin-top: 4px;">
                                            <el-table
                                                :max-height="sizeScreen"
                                                :data="TableIngreso"
                                                highlight-current-row
                                                stripe  :default-sort = "{prop: 'date', order: 'descending'}"
                                                class="ExcelTable2007"
                                                @selection-change="handleSelectionChangeDet"
                                                 @current-change="handleCurrentChange">
                                                <el-table-column
                                                    type="selection"
                                                    width="55">
                                                </el-table-column>
                                                <el-table-column type="index" label="Item" width="50">
                                                </el-table-column>
                                                <el-table-column
                                                    prop="strService_NO"  width="80"
                                                    label="Servicio N.">
                                                </el-table-column>
                                                <el-table-column
                                                    prop="strDesc_Detail"  min-width="200"
                                                    label="Descripcion">
                                                    <template scope="scope">
                                                        <el-input v-if="bln_tbl_Descripcion  && (scope.row === editing.row) 
                                                        && (scope.column.property === editing.column)" @blur="handleBlur(scope.row)" v-focus size="small" v-model="scope.row.strDesc_Detail" >
                                                        </el-input>
                                                        <label style="width:100%;  border-color: #ff9da4; border-style: solid;  border-radius: 0.3em; border-width: 1px;  margin: 0rem;" v-else @click="clickDescripcion(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ scope.row.strDesc_Detail }}</label>
                                                    </template>
                                                </el-table-column>
                                                <el-table-column
                                                    prop="strUM"  width="100"
                                                    label="Unidad">
                                                </el-table-column>
                                                <el-table-column
                                                    prop="intQuantity"  width="100" 
                                                    label="Cantidad" align="right">
                                                    <!-- <template scope="scope">
                                                        <el-input type="number"  v-if="bln_tbl_cantidad  && (scope.row === editing.row) 
                                                        && (scope.column.property === editing.column)" @blur="handleBlurImporte(scope.row)" v-focus @change="handleChangeCantidad" size="small" v-model="scope.row.intQuantity" :precision="2">
                                                        </el-input>
                                                        <label style="width:100%;" v-else @click="clickcantidad(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ scope.row.intQuantity }}</label>
                                                    </template> -->
                                                </el-table-column>
                                                
                                                <!-- <el-table-column
                                                    prop="fltGross_Price"  width="110"
                                                    label="Importe Unitario" align="right">
                                                </el-table-column>                                                  -->
                                                <el-table-column
                                                    prop="fltNet_Value"  width="100"
                                                    label="Valor Total" align="right">
                                                </el-table-column>
                                                <el-table-column
                                                    prop="fltFacture_Net_PR_I"  width="100"
                                                    label="Adelanto" align="right">
                                                    <template scope="scope">
                                                        <el-input-number type="number" v-if="bln_tbl_total  && (scope.row === editing.row) 
                                                        && (scope.column.property === editing.column)" @blur="handleBlurImporte(scope.row)" v-focus @change="handleChangeValUni"  size="small" v-model="scope.row.fltFacture_Net_PR_I" :min="0" :max="getNumber(scope.row.fltRecTemp_Value)" :precision="2" :step="0.01" >
                                                        </el-input-number>
                                                        <label style="width:100%;  border-color: #ff9da4; border-style: solid;  border-radius: 0.3em; border-width: 1px;  margin: 0rem;" v-else @click="clickTtotal(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ scope.row.fltFacture_Net_PR_I }}</label>
                                                    </template>
                                                </el-table-column> 
                                                <el-table-column
                                                    prop="fltRec_Value"  width="100"
                                                    label="Pendiente" align="right">
                                                </el-table-column>
                                                
                                                <el-table-column
                                                    prop="strCurrency"  width="80"
                                                    label="Moneda" align="center">
                                                </el-table-column>                                         
                                                <el-table-column
                                                    prop="strCostCenter_NO"  width="100"
                                                    label="Centro de costo">
                                                     <template scope="scope">
                                                        <el-input  v-if="blncentrocosto && bln_tbl_centro_costo  && (scope.row === editing.row) 
                                                        && (scope.column.property === editing.column)" @blur="handleBlur(scope.row)" v-focus size="small" v-model="scope.row.strCostCenter_NO" >
                                                        <el-button slot="append" class="boton" icon="fa fa-clone" @click="LoadCentroCosto(scope.row)"></el-button>  
                                                        </el-input>
                                                        <label style="width:100%;  border-color: #ff9da4; border-style: solid;  border-radius: 0.3em; border-width: 1px;  margin: 0rem;" v-else @click="clickcentrocosto(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ scope.row.strCostCenter_NO }}</label>
                                                    </template>
                                                </el-table-column>
                                            </el-table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-card>
                </el-tab-pane>
            </el-tabs>
      </el-card>
         <div class="footer1">
        <div class="row">
            <div class="col-sm-9" style="text-align:left" >
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
    <!--DIALOG BUSQUEDA CATEGORIA LINEA-->
    <el-dialog title="Busqueda categoria linea"  :visible.sync="dialogCategoriaLinea" @close="closeCategoriaLinea" size="small" >
      <bcategorialinea v-on:categorialineaselecionado="SeleccionadoCategoriaLinea($event)" v-on:categorialineaclose="closeCategoriaLinea()">
      </bcategorialinea>
    </el-dialog>
    <!--DIALOG BUSQUEDA CENTRO COSTOS-->
    <el-dialog title="Busqueda centro de costos"  :visible.sync="dialogCentroCostos" @close="closeCentroCostos" size="small" >
      <bcentrocosto v-on:centrocostoselecionado="SeleccionadoCentroCosto($event)" v-on:centrocostosclose="Centrocostoclose()">
      </bcentrocosto>
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
                            <label class="el-form-item__label col-md-2" >{{Column}}</label>
                            <div class="col-md-2 grupolabel">
                                <div class="input-group mb-3" >
                                <el-input size ="small" v-model="inputAtributo">
                                    <el-button slot="append" class="boton" icon="fa fa-search" 
                                            @click="buscarOrdenC()"
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
                    @header-click="headerclick"
                    @row-dblclick="checkOrdenCompra"
                    @current-change="selectOrdenCompra">
                    <el-table-column :render-header="filterstrPO_NO" prop="strPO_NO" label="Orden Compra" width="80">
                    </el-table-column>  
                    <el-table-column :render-header="filterstrPO_Desc" prop="strPO_Desc" label="Descripcion" style="width: 70% !important;">
                    </el-table-column>
                    <el-table-column :render-header="filterstrVendor_NO" prop="strVendor_NO"  label="Proveedor" width="80">
                    </el-table-column>  
                    <el-table-column  :render-header="filterstrVendor_Desc" prop="strVendor_Desc" label="Nombre Proveedor" style="width: 70% !important;">
                    </el-table-column>
                    <el-table-column prop="strTipReq_Desc" label="Tipo Requisicion" width="80">
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
        <el-dialog title="Servicios"  :visible.sync="dialogOrdenD" @close="closeServicios" size="small" >
            <div>
                <el-card class="box-card">
                <div slot="header" class="headercard">
                    <span class="labelheadercard" >Buscar Servicios</span>
                </div>
                <div class="row bodycard">
                    <div class="col-md-12">
                        <div class="form-group row">
                            <label class="el-form-item__label col-md-3" >Servicios Codigo</label>
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
                    :data="ordenCompraDetalle"
                    stripe  :default-sort = "{prop: 'date', order: 'descending'}"
                    style="width: 100%;cursor: pointer;" class="ExcelTable2007"
                    height="250"
                    @selection-change="handleSelectionChangeItem"
                   >
                    <el-table-column
                        type="selection"
                        width="55">
                        </el-table-column>
                    <el-table-column  prop="intPO_Item_NO" label="Item" width="180">
                    </el-table-column>  
                    <el-table-column  prop="strPO_Item_Desc" label="Descripcion" style="width: 70% !important;">
                    </el-table-column> 
                </el-table>
            </el-card>
            <br/>
            <footer class="modal-footer">
                <el-button class="buttonfilter btn btn-outline-secondary orange" @click="CheckServicios()">
                <img class="imagenfilter" src="../../../../images/check.png" alt="" >
                </el-button>
                <el-button class="buttonfilter btn btn-outline-secondary orange" style="margin-left: 0px;"  @click="closeServicios()">
                <img class="imagenfilter" src="../../../../images/close.png" alt="" >
                </el-button>
            </footer>
            </div>
        </el-dialog>  
    
  </div>  
</template>
<script>

import CrearHesComponent from '@/components/LO-LOGISTICA/HES/crear-hes/crear-hes.component'
export default CrearHesComponent
</script>
<style scoped>
.sinLinea{
  border-bottom: 1px solid #f6f7f9;
}
</style>
