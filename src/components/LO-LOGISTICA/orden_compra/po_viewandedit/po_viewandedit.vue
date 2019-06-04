<template>
    <div class="crear-po">
        <ol  style="margin-left: -1.5rem;background: linear-gradient(rgb(229, 241, 247) 0%, rgb(255, 255, 255) 100%);    margin-bottom: 0rem !important;">
        <quickaccessmenu v-on:guardarTodo="guardarPO($event)" v-on:backPage="backPage($event)"  v-on:reloadpage="reloadpage($event)"></quickaccessmenu>
        </ol>
        <el-card class="box-card">
            <div slot="header" class="headercard">
                <span class="labelheadercard" > {{nameFuncion}}</span>
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
                <div class="container">
                    <div class="row" style="margin-top: 3px;">
                        <div class="col-sm-6">
                            <div class="form-group row ">                                
                                <label class="el-form-item__label col-md-3" >Compañia</label>
                                <div class="col-md-3 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input size ="small" type="text" v-model="codigoCompania" disabled>
                                    </el-input>
                                    </div>
                                </div>
                                <label class="sinLinea el-form-item__label col-md-6" >{{descripcionCompania}}</label>
                            </div>
                            <div  class="form-group row ">
                                <label class="el-form-item__label col-md-3" >Codigo PO</label>
                                <div class="col-md-3 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input
                                    size ="small"
                                    v-model="OrdenCompra.strPO_NO" disabled>
                                     </el-input>
                                    </div>
                                </div>
                            </div>
                            <div  class="form-group row ">
                                <label class="el-form-item__label col-md-3" >Codigo Requisición</label>
                                <div class="col-md-3 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input
                                    size ="small"
                                    v-model="OrdenCompra.strRequis_NO" disabled>
                                    </el-input>
                                    </div>
                                </div>
                                <label class="el-form-item__label col-md-3" >Almacén</label>
                                <div class="col-md-3 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input size ="small" type="text" v-model="OrdenCompra.strWHS_Cod" :disabled="impDisabled">
                                    </el-input>
                                    </div>
                                </div>

                            </div>
                             <div  class="form-group row ">
                                
                                <label class="el-form-item__label col-md-3" >Fecha Docum.</label>
                                <div class="col-md-3 grupolabel">
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
                                <label class="el-form-item__label col-md-3" >Proveedor</label>
                                <div class="col-md-3 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input size ="small"
                                    @blur="desactivar_pro"
                                    @focus="activar_pro"
                                    v-model="OrdenCompra.strVendor_NO"
                                    :disabled="impDisabled">
                                     <el-button v-if="btnactivarpro && !dialogProveedor" slot="append" class="boton" icon="fa fa-clone" @click="loadPro()" :disabled="impDisabled"></el-button>
                                    </el-input>
                                    </div>
                                </div>
                                
                            </div>
                             <div  class="form-group row ">
                                 <label class="el-form-item__label col-md-3" >Cantidad Total</label>
                                <div class="col-md-3 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input size ="small" type="number" v-model="OrdenCompra.fltCURR_QTY_I" disabled>
                                    </el-input>
                                    </div>
                                </div>                              
                                <label class="el-form-item__label col-md-3" >Moneda</label>
                                <div class="col-md-3 grupolabel">
                                    <div class="input-group mb-3" >
                                        <el-input size ="small" @blur="desactivar_Moneda" @focus="activar_Moneda" v-model="OrdenCompra.strCurrency_Cod" :disabled="impDisabled">
                                            <el-button v-if="btnactivarMoneda && !dialogMoneda" slot="append" class="boton" icon="fa fa-clone" @click="loadMoneda()" :disabled="impDisabled"></el-button>
                                        </el-input>
                                    </div>
                                </div>                                
                            </div>
                             <div  class="form-group row ">
                                 <label class="el-form-item__label col-md-3" >Valor documento</label>
                                <div class="col-md-3 grupolabel">
                                    <div class="input-group mb-3">
                                    <el-input size ="small"  type="number" v-model="OrdenCompra.fltTotal_Val" disabled>
                                    </el-input>
                                    </div>
                                </div>
                                <label class="el-form-item__label col-md-3" >Impuesto(IGV)</label>
                                <div class="col-md-3 grupolabel">
                                    <div class="input-group mb-3" >
                                        <el-input size ="small" @blur="desactivar_Impuesto" @focus="activar_Impuesto" v-model="OrdenCompra.strWH_Cod" :disabled="impDisabled">
                                            <el-button v-if="btnactivarImpuesto && !dialogImpuesto" slot="append" class="boton" icon="fa fa-clone" @click="loadImpuesto()" :disabled="impDisabled"></el-button> 
                                        </el-input>
                                    </div>
                                </div>
                            </div>
                            <div  class="form-group row ">
                                <label class="el-form-item__label col-md-3" >Descripción</label>
                                <div class="col-md-9 grupolabel">
                                    <div class="input-group mb-9" >
                                    <el-input size ="small" type="text" v-model="OrdenCompra.strPO_Desc" :disabled="impDisabled">
                                    </el-input>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="form-group row " >
                                <label class="sinLinea el-form-item__label col-md-6"></label>
                            </div>
                            <div class="form-group row " style="margin-top:6px;">
                                <label class="sinLinea el-form-item__label col-md-6"></label>
                            </div>
                            <div class="form-group row ">
                                <label class="sinLinea el-form-item__label col-md-6" style="margin-top:10px;">{{OrdenCompra.strWHS_Desc}}</label>
                            </div>
                            <div class="form-group row "  style="margin-top:12px;">
                                <!-- <template>
                                    <el-checkbox class="CheckBoxPro" v-model="checked" @change="handleCheckAllChange" :disabled="nochancePro">
                                        <span style=" font-size:10px;">Modificar </span>
                                        </el-checkbox>
                                </template> -->
                                <label class="sinLinea el-form-item__label col-md-6" >{{OrdenCompra.strVendor_Desc}}</label>
                            </div>
                            <div class="form-group row ">
                                <label class="sinLinea el-form-item__label col-md-6"  style="margin-top:10px;">{{OrdenCompra.strCurrency_Desc}}</label>
                            </div>
                            <div class="form-group row ">
                                <label class="sinLinea el-form-item__label col-md-6"  style="margin-top:10px;">{{Impuesto.fltPorcent}}</label>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <div class="row">
                    <div class="col-sm-12" >
                        <el-card class="box-card" style="margin-left: -10px;">
                            <div slot="header" class="headercard" style="margin-top: -4px;">
                                <buttons-accions v-on:handleClickInParent="handleClickInParent()"></buttons-accions>
                            </div>
                            <div class="col-md-12" >
                                <div class="row bodycard" style="background: white;margin-top: 0px;">
                                    <el-table
                                        ref="missionTable"
                                        :max-height="sizeScreen"
                                        :data="detalleOrdenCompra"
                                        :row-class-name="tableRowClassName"
                                        highlight-current-row
                                        stripe  :default-sort = "{prop: 'date', order: 'descending'}"
                                        class="ExcelTable2007"
                                        @current-change="handleCurrentChange"
                                        >
                                        <!-- <el-table-column
                                            type="selection"
                                            select-on-indeterminate="true"
                                            width="45">
                                        </el-table-column> -->
                                        <el-table-column type="index" label="Item" width="38">
                                        </el-table-column>
                                        <el-table-column  prop="strAcctCateg_Cod" min-width="80" label="Cta. cuenta">
                                            <template scope="scope">
                                                <el-input  v-if="blncategoriacuenta && bln_tbl_categoria_cuenta  && (scope.row === editing.row) 
                                                && (scope.column.property === editing.column)" @blur="handleBlur(scope.row)" v-focus size="small" v-model="scope.row.strAcctCateg_Cod" :disabled="disabledRow">
                                                <el-button slot="append" class="boton" icon="fa fa-clone" @click="LoadCategoriaCuenta(scope.row,scope.column.property)" :disabled="disabledRow"></el-button>  
                                                </el-input> 
                                                <label v-bind:style="{background:cell_ocultar,width:'100%',margin: '0rem'}"  v-else @click="alerta(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ scope.row.strAcctCateg_Cod }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            prop="strCategItem_Cod"  min-width="80"
                                            label="Cat. linea">
                                            <template scope="scope">
                                                <el-input  v-if="blncategorialinea && bln_tbl_categoria_linea  && (scope.row === editing.row) 
                                                && (scope.column.property === editing.column)" @blur="handleBlur(scope.row)" v-focus size="small" v-model="scope.row.strCategItem_Cod" :disabled="disabledRow">
                                                <el-button slot="append" class="boton" icon="fa fa-clone" @click="LoadCategoriaLinea(scope.row)" :disabled="disabledRow"></el-button>  
                                                </el-input>
                                                <label v-bind:style="{background:cell_ocultar,width:'100%',margin: '0rem'}" v-else @click="clickcategorialinea(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ scope.row.strCategItem_Cod }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            prop="strCostCenter_NO" 
                                            label="Centro costos">
                                            <template scope="scope">
                                                <el-input  v-if="blncentrocosto && bln_tbl_centro_costo  && (scope.row === editing.row) 
                                                && (scope.column.property === editing.column)" @blur="handleBlur(scope.row)" v-focus size="small" v-model="scope.row.strCostCenter_NO" :disabled="disabledRow">
                                                <el-button slot="append" class="boton" icon="fa fa-clone" @click="LoadCentroCosto(scope.row)" :disabled="disabledRow"></el-button>  
                                                </el-input>
                                                <label v-bind:style="{background:cell_ocultar,width:'100%',margin: '0rem'}" v-else @click="clickcentrocosto(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ scope.row.strCostCenter_NO }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            prop="strPreq_Stock_Cod" 
                                            label="Material/Producto">
                                        </el-table-column>
                                        <el-table-column
                                            prop="strPO_Item_Desc"  width="200"
                                            label="Descripción">
                                        </el-table-column>
                                        <!-- <el-table-column 
                                            prop="blnCheck"
                                            width="100"
                                            label="Incluir Costo">
                                            <template scope="scope">
                                             <el-checkbox class="newCheckBox" v-if="(scope.row != editing.row)||(scope.row === editing.row)" v-focus size="small" v-model="scope.row.blnCheck" @change="clickCheck(scope.row,$event,scope.column.property)">
                                            </el-checkbox>
                                           </template>
                                        </el-table-column> -->
                                        <el-table-column
                                            prop="strUnit_Of_Purch"   width="100"
                                            label="UM">
                                            <template scope="scope">
                                                <el-input v-if="bln_tbl_UnidadMedida  && (scope.row === editing.row) 
                                                && (scope.column.property === editing.column)" @blur="handleBlur(scope.row)" v-focus size="small" v-model="scope.row.strUnit_Of_Purch" :disabled="disabledRow">
                                                <el-button slot="append" class="boton" icon="fa fa-clone" @click="LoadUnidadMedida(scope.row)" :disabled="disabledRow"></el-button> 
                                                </el-input>
                                                <label v-bind:style="{background:cell_ocultar,width:'100%',margin: '0rem'}" v-else @click="clickUnidadMedida(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ scope.row.strUnit_Of_Purch }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            prop="fltPO_QTY_I"  width="100"
                                            label="Cantidad">
                                            <template scope="scope">
                                                <el-input  type="number" v-if="bln_tbl_cantidad  && (scope.row === editing.row) 
                                                && (scope.column.property === editing.column)" @blur="handleBlurImporte(scope.row)" v-focus @change="handleChangeCantidad" size="small" v-model="scope.row.fltPO_QTY_I" :precision="2">
                                                </el-input>
                                                <label style="width:100%" v-else @click="clickcantidad(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ scope.row.fltPO_QTY_I }}</label>
                                            </template>
                                        </el-table-column>
                                        
                                        <el-table-column
                                            prop="fltPO_Net_PR_I"  width="100"
                                            label="Valor Unitario">
                                            <template scope="scope">
                                                <el-input  type="number" v-if="bln_tbl_Precio  && (scope.row === editing.row) 
                                                && (scope.column.property === editing.column)" @blur="handleBlurImporte(scope.row)" v-focus @change="handleChangeValUni" size="small" v-model="scope.row.fltPO_Net_PR_I" :precision="2" :step="0.01">
                                                </el-input>
                                                <label style="width:100%"  v-else @click="clickPrice(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ scope.row.fltPO_Net_PR_I }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            prop="fltCurr_Net_PR_P"  width="100"
                                            label="Valor total" >
                                        </el-table-column>
                                        <el-table-column
                                            prop="strPriority_Cod"  width="130"
                                            label="Prioridad">
                                            <template scope="scope">
                                                <el-input  v-if="bln_tbl_prioridad  && (scope.row === editing.row) 
                                                && (scope.column.property === editing.column)" @blur="handleBlur(scope.row)" v-focus size="small" v-model="scope.row.strPriority_Cod" >
                                                <el-button slot="append" class="boton" icon="fa fa-clone" @click="LoadPrioridad(scope.row)"></el-button>  
                                                </el-input>
                                                <label style="width:100%" v-else @click="clickprioridad(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ scope.row.strPriority_Cod }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="intConv_Factor"  width="100"
                                            label="Factor">
                                            <template scope="scope">
                                                <el-input  type="number" v-if="bln_tbl_factor  && (scope.row === editing.row) 
                                                && (scope.column.property === editing.column)" @blur="handleBlurImporte(scope.row)" v-focus @change="handleChangeFactor" size="small" v-model="scope.row.intConv_Factor" >
                                                </el-input>
                                                <label style="width:100%"  v-else @click="clickFactor(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ scope.row.intConv_Factor }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column v-if="false"
                                            prop="chrStatus"  width="40"
                                            label="Estado">                                   
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
         <el-dialog title="Moneda"  :visible.sync="dialogMoneda" @close="closeDialogMoneda" size="small" >
            <bmoneda v-on:MonedaSeleccionado="MonedaSeleccionado($event)" v-on:closeMoneda="closeMoneda()">
            </bmoneda>
        </el-dialog>
        <el-dialog title="Busqueda Impuesto"  :visible.sync="dialogImpuesto" @close="closeDialogImpuesto" size="small" >
            <bimpuesto v-on:impuestoseleccionado="ImpuestoSeleccionado($event)" v-on:impuestoClose="closeImpuesto()">
            </bimpuesto>
        </el-dialog>
        <!--DIALOG BUSQUEDA PRIORIDAD-->
    <el-dialog title="Busqueda prioridad"  :visible.sync="dialogPrioridad" @close="closePrioridad" size="small" >
      <bprioridad v-on:prioridadselecionado="SeleccionadoPrioridad($event)">
      </bprioridad>
    </el-dialog>

    <!--DIALOG BUSQUEDA CATEGORIA CUENTA-->
        <el-dialog title="Busqueda categoria cuenta"  :visible.sync="dialogCategoriaCuenta" @close="closeCategoriaCuenta" size="small" >
        <bcategoriacuenta v-on:categoriacuentaselecionado="SeleccionadoCategoriaCuenta($event)" v-on:categoriacuentaclose="closeCategoriaCuenta()">
        </bcategoriacuenta>
        </el-dialog>
        <!--DIALOG BUSQUEDA CATEGORIA LINEA-->
        <el-dialog title="Busqueda categoria linea"  :visible.sync="dialogCategoriaLinea" @close="closeCategoriaLinea" size="small" >
        <bcategorialinea v-on:categorialineaselecionado="SeleccionadoCategoriaLinea($event)" v-on:categorialineaclose="closeCategoriaLinea()">
        </bcategorialinea>
        </el-dialog>
        <!--DIALOG BUSQUEDA CENTRO COSTOS-->
    <el-dialog title="Busqueda centro de costos"  :visible.sync="dialogCentroCostos" @close="closeCentroCostos" size="small" >
      <bcentrocosto v-on:centrocostoselecionado="SeleccionadoCentroCosto($event)" v-on:centrocostosclose="closeCentroCostos()">
      </bcentrocosto>
    </el-dialog>
    <!--DIALOG BUSQUEDA UNIDAD MEDIDA-->
    <el-dialog title="Busqueda unidad medida"  :visible.sync="dialogUnidadMedida" @close="closeUnidadMedida" size="small" >
      <bunidadmedida v-on:unidadmedidaselecionado="SeleccionadoUnidadMedida($event)">
      </bunidadmedida>
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
                    :data="tempGrid"
                    stripe  :default-sort = "{prop: 'date', order: 'descending'}"
                    style="width: 100%;cursor: pointer;" class="ExcelTable2007"
                    height="250"
                    highlight-current-row
                    @row-dblclick="checkDoblePro"
                    @current-change="checkSelectdbProveedor">
                    <el-table-column  prop="strVendor_NO" label="Codigo" width="150">
                    </el-table-column>  
                    <el-table-column  prop="strVendor_Desc" label="Descripción" width="310">
                    </el-table-column> 
                    <el-table-column  prop="strCountry" label="Pais" width="150">
                    </el-table-column> 
                </el-table>
            </el-card>
            <br/>
            <footer class="modal-footer">
                <el-button class="buttonfilter btn btn-outline-secondary orange" @click="checkDoblePro()">
                <img class="imagenfilter" src="../../../../images/check.png" alt="" >
                </el-button>
                <el-button class="buttonfilter btn btn-outline-secondary orange" style="margin-left: 0px;"  @click="closeDialogProX()">
                <img class="imagenfilter" src="../../../../images/close.png" alt="" >
                </el-button>
            </footer>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import ViewAndEditPOComponent from '@/components/LO-LOGISTICA/orden_compra/po_viewandedit/po_viewandedit.component'
export default ViewAndEditPOComponent
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
