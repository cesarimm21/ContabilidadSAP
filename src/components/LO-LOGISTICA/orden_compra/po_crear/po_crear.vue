<template>
    <div class="crear-po">
        <ol  style="margin-left: -1.5rem;background: linear-gradient(rgb(229, 241, 247) 0%, rgb(255, 255, 255) 100%);    margin-bottom: 0rem !important;">
        <quickaccessmenu v-on:guardarPO="guardarPO($event)" v-on:backPage="backPage($event)"  v-on:reloadpage="reloadpage($event)"></quickaccessmenu>
        </ol>
        <el-card class="box-card">
            <div slot="header" class="headercard">
                <span class="labelheadercard" > Crear Orden de Compra</span>
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
                                <label class="el-form-item__label col-md-3" >Requisicion</label>
                                <div class="col-md-3 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input
                                    :autofocus="true"
                                    class="validador"
                                    size ="small"
                                    @blur="desactivar_requisicion"
                                    @focus="activar_requisicion"
                                    v-model="OrdenCompra.strRequis_NO">
                                        <el-button v-if="btnactivarrequisicion && !dialogRequisicion" slot="append" class="boton" icon="fa fa-clone" @click="loadRequisicion()"></el-button>
                                    </el-input>
                                    </div>
                                </div>
                                <label class="el-form-item__label col-md-3" >Almacen</label>
                                <div class="col-md-3 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input size ="small" type="text" v-model="requiSelect.strWHS_Cod" disabled>
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
                                    <el-input 
                                    class="validador"
                                    size ="small"
                                    @blur="desactivar_pro"
                                    @focus="activar_pro"
                                    v-model="OrdenCompra.strVendor_NO">
                                     <el-button v-if="btnactivarpro && !dialogRequisicion" slot="append" class="boton" icon="fa fa-clone" @click="loadPro()"></el-button>
                                    </el-input>
                                    </div>
                                </div>
                                
                            </div>
                             <div  class="form-group row ">
                                 <label class="el-form-item__label col-md-3" >Cantidad Total</label>
                                <div class="col-md-3 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input size ="small" type="number" v-model="totalItems" disabled>
                                    </el-input>
                                    </div>
                                </div>                              
                                <label class="el-form-item__label col-md-3" >Moneda</label>
                                <div class="col-md-3 grupolabel">
                                    <div class="input-group mb-3" >
                                        <el-input
                                        class="validador"
                                         size ="small" @blur="desactivar_Moneda" @focus="activar_Moneda" v-model="OrdenCompra.strPO_Curr" @keydown.native.enter="buscarMoneda()">
                                            <el-button v-if="btnactivarMoneda && !dialogMoneda" slot="append" class="boton" icon="fa fa-clone" @click="loadMoneda()"></el-button>
                                        </el-input>
                                    </div>
                                </div>                                
                            </div>
                             <div  class="form-group row ">
                                 <label class="el-form-item__label col-md-3" >Valor Documento</label>
                                <div class="col-md-3 grupolabel">
                                    <div class="input-group mb-3">
                                    <el-input size ="small"  type="number" v-model="totalPrice" disabled>
                                    </el-input>
                                    </div>
                                </div>
                                <label class="el-form-item__label col-md-3" >Impuesto(IGV)</label>
                                <div class="col-md-3 grupolabel">
                                    <div class="input-group mb-3" >
                                        <el-input size ="small" @blur="desactivar_Impuesto" @focus="activar_Impuesto" v-model="OrdenCompra.strWH_Cod" @keydown.native.enter="btnBuscarImpuesto()">
                                            <el-button v-if="btnactivarImpuesto && !dialogImpuesto" slot="append" class="boton" icon="fa fa-clone" @click="loadImpuesto()"></el-button> 
                                        </el-input>
                                    </div>
                                </div>
                            </div>
                            <div  class="form-group row ">
                                <label class="el-form-item__label col-md-3" >Descripcion</label>
                                <div class="col-md-9 grupolabel">
                                    <div class="input-group mb-9" >
                                    <el-input size ="small" type="text" v-model="OrdenCompra.strPO_Desc">
                                    </el-input>
                                    </div>
                                </div>
                                <!-- <label class="el-form-item__label col-md-3" >Tipo Requisicion</label>
                                <div class="col-md-3 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input size ="small" v-model="OrdenCompra.strTipReq_Desc" disabled>
                                    </el-input>
                                    </div>
                                </div> -->
                            </div>
                        </div>
                        <div class="col-sm-6">                            
                            <div class="form-group row " style="margin-top:15px;">
                                <label class="sinLinea el-form-item__label col-md-12" style="margin-top:10px;">{{almacen.strWHS_Desc}}</label>
                            </div>
                            <div class="form-group row "  style="margin-top:12px;">
                                <label class="sinLinea el-form-item__label col-md-12" style="margin-left:10px;">{{OrdenCompra.strVendor_Desc}}</label>
                            </div>
                            <div class="form-group row ">
                                <label class="sinLinea el-form-item__label col-md-12"  style="margin-top:10px;">{{moneda.strCurrency_Desc}}</label>
                            </div>
                            <div class="form-group row ">
                                <label class="sinLinea el-form-item__label col-md-12"  style="margin-top:10px;">{{OrdenCompra.strWH_Desc}}</label>
                            </div>
                            <div class="form-group row" style="margin-top:5px;">
                                <label class="el-form-item__label col-md-3" >Tipo Requisicion</label>
                                <div class="col-md-4 grupolabel">
                                    <div class="input-group mb-4" >
                                    <el-input size ="small" v-model="OrdenCompra.strTipReq_Desc" disabled>
                                    </el-input>
                                    </div>
                                </div>
                            </div>
                        </div>                        
                    </div>
                    <br/>
                    <div class="row" >
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
                                        :data="requiDetalle1"
                                        :row-class-name="tableRowClassName"
                                        highlight-current-row
                                        stripe  :default-sort = "{prop: 'date', order: 'descending'}"
                                        class="ExcelTable2007"
                                        @selection-change="handleSelectionChange"
                                        @current-change="handleCurrentChange"
                                        >
                                        <el-table-column
                                            type="selection"
                                            width="45">
                                        </el-table-column>
                                        <el-table-column type="index" label="Item" width="38">
                                        </el-table-column>
                                        <el-table-column  prop="strCateg_Account" min-width="80" label="Cat. Cta.">
                                            <template scope="scope">
                                                <el-input  v-if="blncategoriacuenta && bln_tbl_categoria_cuenta  && (scope.row === editing.row) 
                                                && (scope.column.property === editing.column)" @blur="handleBlur(scope.row)" v-focus size="small" v-model="scope.row.strCateg_Account" :disabled="disabledRow">
                                                <el-button slot="append" class="boton" icon="fa fa-clone" @click="LoadCategoriaCuenta(scope.row,scope.column.property)" :disabled="disabledRow"></el-button>  
                                                </el-input> 
                                                <label v-bind:style="{background:cell_ocultar,width:'100%',margin: '0rem'}"  v-else @click="alerta(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ scope.row.strCateg_Account }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            prop="strCateg_Line"   min-width="80"
                                            label="Cat. Linea">
                                            <template scope="scope">
                                                <el-input  v-if="blncategorialinea && bln_tbl_categoria_linea  && (scope.row === editing.row) 
                                                && (scope.column.property === editing.column)" @blur="handleBlur(scope.row)" v-focus size="small" v-model="scope.row.strCateg_Line" :disabled="disabledRow">
                                                <el-button slot="append" class="boton" icon="fa fa-clone" @click="LoadCategoriaLinea(scope.row)" :disabled="disabledRow"></el-button>  
                                                </el-input>
                                                <label v-bind:style="{background:cell_ocultar,width:'100%',margin: '0rem'}" v-else @click="clickcategorialinea(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ scope.row.strCateg_Line }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            prop="strCostCenter" 
                                            label="Centro Costos">
                                            <template scope="scope">
                                                <el-input  v-if="blncentrocosto && bln_tbl_centro_costo  && (scope.row === editing.row) 
                                                && (scope.column.property === editing.column)" @blur="handleBlur(scope.row)" v-focus size="small" v-model="scope.row.strCostCenter" :disabled="disabledRow">
                                                <el-button slot="append" class="boton" icon="fa fa-clone" @click="LoadCentroCosto(scope.row)" :disabled="disabledRow"></el-button>  
                                                </el-input>
                                                <label v-bind:style="{background:cell_ocultar,width:'100%',margin: '0rem'}" v-else @click="clickcentrocosto(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ scope.row.strCostCenter }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            prop="strMaterial_Cod" 
                                            label="Material">
                                        </el-table-column>
                                        
                                        <el-table-column
                                            prop="strDescription"  width="200"
                                            label="Descripcion">
                                        </el-table-column>
                                        <el-table-column
                                            prop="strVendor_Desc"  width="200"
                                            label="Proveedor Sugerido">
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
                                            prop="strUM"   width="50"
                                            label="UM"
                                            align="center">
                                            <template scope="scope">
                                                <el-input v-if="bln_tbl_UnidadMedida  && (scope.row === editing.row) 
                                                && (scope.column.property === editing.column)" @blur="handleBlur(scope.row)" v-focus size="small" v-model="scope.row.strUM" :disabled="disabledRow">
                                                <el-button slot="append" class="boton" icon="fa fa-clone" @click="LoadUnidadMedida(scope.row)" :disabled="disabledRow"></el-button> 
                                                </el-input>
                                                <label v-bind:style="{background:cell_ocultar,width:'100%',margin: '0rem'}" v-else @click="clickUnidadMedida(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ scope.row.strUM }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            prop="fltQuantity"  width="100"
                                            label="Cantidad" 
                                            align="right">
                                            <!-- <template scope="scope">
                                                <el-input  type="number" v-if="bln_tbl_cantidad  && (scope.row === editing.row) 
                                                && (scope.column.property === editing.column)" @blur="handleBlurImporte(scope.row)" v-focus @change="handleChangeCantidad" size="small" v-model="scope.row.fltQuantity" :precision="2">
                                                </el-input>
                                                <label style="width:100%" v-else @click="clickcantidad(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ scope.row.fltQuantity }}</label>
                                            </template> -->
                                        </el-table-column>
                                        
                                        <el-table-column
                                            prop="fltUnitPrice"  width="100"
                                            label="Valor Unitario"
                                            align="right">
                                            <template scope="scope">
                                                <el-input  type="number" v-if="bln_tbl_Precio  && (scope.row === editing.row) 
                                                && (scope.column.property === editing.column)" @blur="handleBlurImporte(scope.row)" v-focus @change="handleChangeValUni" size="small" v-model="scope.row.fltUnitPrice" :precision="2" :step="0.01">
                                                </el-input>
                                                <label style="width:100%;  border-color: rgb(255, 157, 164); border-style: solid;  border-radius: 0.3em; border-width: 1px;  margin: 0rem;"  v-else @click="clickPrice(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ scope.row.fltUnitPrice }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            prop="fltValue_Total"  width="100"
                                            label="Valor Total" 
                                            align="right">
                                        </el-table-column>
                                        <el-table-column
                                            prop="strPriority_Desc"  width="100"
                                            label="Prioridad"
                                            align="center">
                                            <template scope="scope">
                                                <el-input  v-if="bln_tbl_prioridad  && (scope.row === editing.row) 
                                                && (scope.column.property === editing.column)" @blur="handleBlur(scope.row)" v-focus size="small" v-model="scope.row.strPriority_Desc" >
                                                <el-button slot="append" class="boton" icon="fa fa-clone" @click="LoadPrioridad(scope.row)"></el-button>  
                                                </el-input>
                                                <label style="width:100%;  border-color: rgb(255, 157, 164); border-style: solid;  border-radius: 0.3em; border-width: 1px; margin: 0rem;" v-else @click="clickprioridad(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ scope.row.strPriority_Desc }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="intConv_Factor"  width="100"
                                            label="Factor"
                                            align="right">
                                            <template scope="scope">
                                                <el-input  type="number" v-if="bln_tbl_factor  && (scope.row === editing.row) 
                                                && (scope.column.property === editing.column)" @blur="handleBlurImporte(scope.row)" v-focus @change="handleChangeFactor" size="small" v-model="scope.row.intConv_Factor" >
                                                </el-input>
                                                <label style="width:100%;  border-color: rgb(255, 157, 164); border-style: solid;  border-radius: 0.3em; border-width: 1px; margin: 0rem;"  v-else @click="clickFactor(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ scope.row.intConv_Factor }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column 
                                            prop="chrStatus"  width="40"
                                            label="Estado"
                                            align="right">                                   
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

        <el-dialog title="Requisicion" :visible.sync="dialogRequisicion" @close="closeDialog" size="small" >
            <div>
                <el-card class="box-card">
                <div slot="header" class="headercard">
                    <span class="labelheadercard" >Buscar Requisicion</span>
                </div>
                <div class="row bodycard">
                    <div class="col-md-12">
                        <div class="form-group row">
                            <label class="el-form-item__label col-md-3" >{{Column}}</label>
                            <div class="col-md-2 grupolabel">
                                <div class="input-group mb-3" >
                                <el-input size ="small" v-model="inputAtributo">
                                    <el-button slot="append" class="boton" icon="fa fa-search" 
                                            @click="buscarRequisicion()"
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
                    @header-click="headerclick"
                    @row-dblclick="checkSelectdb"
                    @current-change="checkSelectdbRequisicion">
                    <el-table-column :render-header="filterstrRequis_NO" prop="strRequis_NO" label="Codigo" width="100">
                    </el-table-column>
                    <el-table-column :render-header="filterstrDesc_Header" prop="strDesc_Header" label="Descripcion" style="width: 70% !important;">
                    </el-table-column>
                    <el-table-column :render-header="filterstrTipReq_Desc" prop="strTipReq_Desc" label="Tipo requisicion" width="120">
                    </el-table-column>
                    <el-table-column :render-header="filterstrWHS_Desc" prop="strWHS_Desc" label="Almacen" width="120">
                    </el-table-column>
                </el-table>
            </el-card>
            <br/>
            <footer class="modal-footer">
                <el-button class="buttonfilter btn btn-outline-secondary orange" @click="checkSelectdb()">
                <img class="imagenfilter" src="../../../../images/check.png" alt="" >
                </el-button>
                <el-button class="buttonfilter btn btn-outline-secondary orange" style="margin-left: 0px;"  @click="closeDialogReq()">
                <img class="imagenfilter" src="../../../../images/close.png" alt="" >
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
                            <label class="el-form-item__label col-md-3" >{{Column1}}</label>
                            <div class="col-md-2 grupolabel">
                                <div class="input-group mb-3" >
                                <el-input size ="small" v-model="inputAtributo1">
                                    <el-button slot="append" class="boton" icon="fa fa-search" 
                                            @click="buscarProveedor()"
                                        > </el-button>
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
                    @header-click="headerclick1"
                    @row-dblclick="checkDoblePro"
                    @current-change="checkSelectdbProveedor">
                    <el-table-column :render-header="filterstrVendor_NO" prop="strVendor_NO" label="Codigo" width="150">
                    </el-table-column>  
                    <el-table-column :render-header="filterstrVendor_Desc" prop="strVendor_Desc" label="Descripcion" width="310">
                    </el-table-column> 
                    <el-table-column :render-header="filterstrCountry" prop="strCountry" label="Pais" width="150">
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
import CrearPOComponent from '@/components/LO-LOGISTICA/orden_compra/po_crear/po_crear.component'
export default CrearPOComponent
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
