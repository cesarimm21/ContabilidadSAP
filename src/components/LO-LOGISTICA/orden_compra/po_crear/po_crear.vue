<template>
    <div class="crear-po">
        <ol  style="margin-left: -1.5rem;background: linear-gradient(rgb(229, 241, 247) 0%, rgb(255, 255, 255) 100%);    margin-bottom: 0rem !important;">
        <quickaccessmenu v-on:guardarPO="guardarPO($event)"></quickaccessmenu>
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
                                <label class="el-form-item__label col-md-3" >Codigo Requisición</label>
                                <div class="col-md-3 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input
                                    size ="small"
                                    @blur="desactivar_requisicion"
                                    @focus="activar_requisicion"
                                    v-model="OrdenCompra.strRequis_NO">
                                        <el-button v-if="btnactivarrequisicion && !dialogRequisicion" slot="append" class="boton" icon="fa fa-clone" @click="loadRequisicion()"></el-button>
                                    </el-input>
                                    </div>
                                </div>
                                <label class="el-form-item__label col-md-4" ></label>
                            </div>
                            <div  class="form-group row ">
                                <label class="el-form-item__label col-md-3" >Compañia</label>
                                <div class="col-md-3 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input size ="small" type="text" v-model="OrdenCompra.strCompany_Cod">
                                    </el-input>
                                    </div>
                                </div>
                                <label class="el-form-item__label col-md-3" >Almacen</label>
                                <div class="col-md-3 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input size ="small" type="text" v-model="requiSelect.strWHS_Cod">
                                    </el-input>
                                    </div>
                                </div>

                            </div>
                             <div  class="form-group row ">
                                <label class="el-form-item__label col-md-3" >Proveedor</label>
                                <div class="col-md-3 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input size ="small"
                                    @blur="desactivar_pro"
                                    @focus="activar_pro"
                                    v-model="OrdenCompra.strVendor_NO">
                                     <el-button v-if="btnactivarpro && !dialogRequisicion" slot="append" class="boton" icon="fa fa-clone" @click="loadPro()"></el-button>
                                    </el-input>
                                    </div>
                                </div>
                                <label class="el-form-item__label col-md-3" >Moneda pago</label>
                                <div class="col-md-3 grupolabel">
                                    <div class="input-group mb-3" >
                                        <el-input size ="small" @blur="desactivar_Moneda" @focus="activar_Moneda" v-model="OrdenCompra.strPO_Curr">
                                            <el-button v-if="btnactivarMoneda && !dialogMoneda" slot="append" class="boton" icon="fa fa-clone" @click="loadMoneda()"></el-button>
                                        </el-input>
                                    </div>
                                </div>
                            </div>
                             <div  class="form-group row ">
                                <label class="el-form-item__label col-md-3" >Impuesto(IGV)</label>
                                <div class="col-md-3 grupolabel">
                                    <div class="input-group mb-3" >
                                        <el-input size ="small" @blur="desactivar_Impuesto" @focus="activar_Impuesto" v-model="Impuesto.fltPorcent" >
                                            <el-button v-if="btnactivarImpuesto && !dialogImpuesto" slot="append" class="boton" icon="fa fa-clone" @click="loadImpuesto()"></el-button> 
                                        </el-input>
                                    </div>
                                </div>
                                <label class="el-form-item__label col-md-3" >Doc. Date</label>
                                <div class="col-md-3 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input size ="small"  type="date" v-model="fecha_ejecucion" disabled>
                                    </el-input>
                                    </div>
                                </div>
                            </div>
                             <div  class="form-group row ">
                                <label class="el-form-item__label col-md-3" >Cantidad total</label>
                                <div class="col-md-3 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input size ="small" type="number" v-model="totalItems">

                                    </el-input>
                                    </div>
                                </div>
                                <label class="el-form-item__label col-md-3" >Importe total</label>
                                <div class="col-md-3 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input size ="small"  type="number" v-model="totalPrice">
                                    </el-input>
                                    </div>
                                </div>
                            </div>
                            <div  class="form-group row ">
                                <label class="el-form-item__label col-md-3" >Descripción</label>
                                <div class="col-md-9 grupolabel">
                                    <div class="input-group mb-9" >
                                    <el-input size ="small" type="text" v-model="OrdenCompra.strPO_Desc">

                                    </el-input>
                                    </div>
                                </div>
                                <!-- <label class="el-form-item__label col-md-3" >Proveedor</label>
                                <div class="col-md-3 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input size ="small"  >
                                    </el-input>
                                    </div>
                                </div> -->
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="form-group row ">
                                <label class="sinLinea el-form-item__label col-md-6" ></label>
                                <label class="sinLinea el-form-item__label col-md-3" >Fecha ejecución</label>
                                <label class="sinLinea el-form-item__label col-md-3" > {{fecha_ejecucion}}</label>
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
                                        :max-height="sizeScreen"
                                        :data="requiDetalle1"
                                        stripe  :default-sort = "{prop: 'date', order: 'descending'}"
                                        class="ExcelTable2007"
                                        @selection-change="handleSelectionChange">
                                        <el-table-column
                                            type="selection"
                                            width="55">
                                        </el-table-column>
                                        <el-table-column type="index" width="58">
                                        </el-table-column>
                                        <el-table-column  sortable prop="strCateg_Account" min-width="80" label="Cta. cuenta">
                                        </el-table-column>
                                        <el-table-column
                                            prop="strCateg_Line" sortable  min-width="80"
                                            label="Cat. linea">
                                        </el-table-column>
                                        <el-table-column
                                            prop="strCostCenter" sortable
                                            label="Centro costos">
                                        </el-table-column>
                                        <el-table-column
                                            prop="strMaterial_Cod" sortable
                                            label="Material">
                                        </el-table-column>
                                        <el-table-column
                                            prop="strDescription" sortable width="200"
                                            label="Descripción">
                                        </el-table-column>
                                        <el-table-column
                                            prop="fltQuantity" sortable width="80"
                                            label="Cantidad">
                                        </el-table-column>
                                        <el-table-column
                                            prop="strUM" sortable  width="60"
                                            label="UM">
                                        </el-table-column>
                                        <el-table-column
                                            prop="fltUnitPrice" sortable width="80"
                                            label="Valor Unitario">
                                        </el-table-column>
                                        <el-table-column
                                            prop="fltValue_Total" sortable width="80"
                                            label="Valor total">
                                        </el-table-column>
                                        
                                        <el-table-column
                                            prop="strVendor_Suggested" sortable width="110"
                                            label="Proveedor">
                                        </el-table-column>
                                        <el-table-column
                                            prop="strCurr" sortable
                                            label="Moneda">
                                        </el-table-column>
                                        <el-table-column
                                            prop="strPriority_Cod" sortable
                                            label="Prioridad">
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
                    @current-change="checkSelectdbProveedor">
                    <el-table-column  prop="strVendor_NO" label="Codigo" width="180">
                    </el-table-column>
                    <el-table-column  prop="strVendor_Desc" label="Descripción" style="width: 70% !important;">
                    </el-table-column>
                </el-table>
            </el-card>
            <br/>
            <footer class="modal-footer">
                <el-button class="buttonfilter btn btn-outline-secondary orange" @click="checkSelectdbProveedor()">
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
}
.el-table__body-wrapper{
    height: 50%;
}
</style>
