<template>
    <div class="crear-po">   
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
                                    @focus="activar_requisicion" >
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
                                    <el-input size ="small" type="text">  
                                                             
                                    </el-input>
                                    </div>
                                </div>
                                <label class="el-form-item__label col-md-3" >Proveedor</label>
                                <div class="col-md-3 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input size ="small"
                                    @blur="desactivar_pro" 
                                    @focus="activar_pro"  >   
                                     <el-button v-if="btnactivarpro && !dialogRequisicion" slot="append" class="boton" icon="fa fa-clone" @click="loadPro()"></el-button>                          
                                    </el-input>
                                    </div>
                                </div>
                            </div>
                             <div  class="form-group row ">
                                <label class="el-form-item__label col-md-3" >Almacen</label>
                                <div class="col-md-3 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input size ="small" type="text">  
                                                             
                                    </el-input>
                                    </div>
                                </div>
                                <label class="el-form-item__label col-md-3" >Doc. Date</label>
                                <div class="col-md-3 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input size ="small"  type="date">                            
                                    </el-input>
                                    </div>
                                </div>
                            </div>
                             <div  class="form-group row ">
                                <label class="el-form-item__label col-md-3" >Cantidad total</label>
                                <div class="col-md-3 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input size ="small" type="number">  
                                                             
                                    </el-input>
                                    </div>
                                </div>
                                <label class="el-form-item__label col-md-3" >Importe total</label>
                                <div class="col-md-3 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input size ="small"  type="number">                            
                                    </el-input>
                                    </div>
                                </div>
                            </div>
                            <div  class="form-group row ">
                                <label class="el-form-item__label col-md-3" >Descripción</label>
                                <div class="col-md-9 grupolabel">
                                    <div class="input-group mb-9" >
                                    <el-input size ="small" type="text">  
                                                             
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
                                        :data="tableData" 
                                        stripe  :default-sort = "{prop: 'date', order: 'descending'}"
                                        class="ExcelTable2007">
                                        <el-table-column type="index" width="58">
                                        </el-table-column>
                                        <el-table-column  sortable prop="categoriacuenta" min-width="80" label="Cta. cuenta">
                                            <template scope="scope">
                                                <el-input  v-if="blntiporequisicion && bln_tbl_categoria_cuenta  && (scope.row === editing.row) 
                                                && (scope.column.property === editing.column)" @blur="handleBlur(scope.row)" v-focus size="small" v-model="scope.row.categoriacuenta" >
                                                <el-button slot="append" class="boton" icon="fa fa-clone" @click="LoadCategoriaCuenta(scope.row,scope.column.property)"></el-button>  
                                                </el-input> 
                                                <label v-bind:style="{background:cell_ocultar,width:'100%',margin: '0rem'}"  v-else @click="alerta(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ scope.row.categoriacuenta }}</label>
                                            </template>
                                        </el-table-column>  
                                        <el-table-column
                                            prop="categorialinea" sortable  min-width="80"
                                            label="Cat. linea">
                                            <template scope="scope">
                                                <el-input  v-if="bln_tbl_categoria_linea  && (scope.row === editing.row) 
                                                && (scope.column.property === editing.column)" @blur="handleBlur(scope.row)" v-focus size="small" v-model="scope.row.categorialinea" >
                                                <el-button slot="append" class="boton" icon="fa fa-clone" @click="LoadCategoriaLinea(scope.row)"></el-button>  
                                                </el-input>
                                                <label style="width:100%" v-else @click="clickcategorialinea(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ scope.row.categorialinea }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            prop="centrocosto" sortable  
                                            label="Centro costos">
                                            <template scope="scope">
                                                <el-input  v-if="bln_tbl_centro_costo  && (scope.row === editing.row) 
                                                && (scope.column.property === editing.column)" @blur="handleBlur(scope.row)" v-focus size="small" v-model="scope.row.centrocosto" >
                                                <el-button slot="append" class="boton" icon="fa fa-clone" @click="LoadCentroCosto(scope.row)"></el-button>  
                                                </el-input>
                                                <label style="width:100%" v-else @click="clickcentrocosto(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ scope.row.centrocosto }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            prop="cuentacontable" sortable width="100"
                                            label="Cuenta contable">
                                            <template scope="scope">
                                                <el-input  v-if="bln_tbl_cuenta_contable  && (scope.row === editing.row) 
                                                && (scope.column.property === editing.column)" @blur="handleBlur(scope.row)" v-focus size="small" v-model="scope.row.cuentacontable" >
                                                <el-button slot="append" class="boton" icon="fa fa-clone" @click="LoadCuentaContable(scope.row)"></el-button>  
                                                </el-input>
                                                <label style="width:100%" v-else @click="clickcuentacontable(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ scope.row.cuentacontable }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            prop="material" sortable 
                                            label="Material">
                                            <template scope="scope">
                                                <el-input  v-if="bln_tbl_material  && (scope.row === editing.row) 
                                                && (scope.column.property === editing.column)" @blur="handleBlur(scope.row)" v-focus size="small" v-model="scope.row.material" >
                                                <el-button slot="append" class="boton" icon="fa fa-clone" @click="LoadMaterial(scope.row)"></el-button>  
                                                </el-input>
                                                <label style="width:100%" v-else @click="clickmaterial(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ scope.row.material }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            prop="material_descripcion" sortable width="200"
                                            label="Descripción">
                                            <template scope="scope">
                                                <el-input  v-if="bln_tbl_material_descripcion  && (scope.row === editing.row) 
                                                && (scope.column.property === editing.column)" @blur="handleBlur(scope.row)" v-focus size="small" v-model="scope.row.material_descripcion" >
                                                </el-input>
                                                <label style="width:100%" v-else @click="clickmaterialdescripcion(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ scope.row.material_descripcion }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            prop="cantidad" sortable width="80"
                                            label="Cantidad">
                                            <template scope="scope">
                                                <el-input-number  v-if="bln_tbl_cantidad  && (scope.row === editing.row) 
                                                && (scope.column.property === editing.column)" @blur="handleBlur(scope.row)" v-focus size="small" v-model="scope.row.cantidad" >
                                                </el-input-number>
                                                <label v-else @click="clickcantidad(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ scope.row.cantidad }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            prop="unidad_medida" sortable  width="60"
                                            label="UM">
                                            <template scope="scope">
                                                <el-input  v-if="bln_tbl_unidad_medida  && (scope.row === editing.row) 
                                                && (scope.column.property === editing.column)" @blur="handleBlur(scope.row)" v-focus size="small" v-model="scope.row.unidad_medida" >
                                                <el-button slot="append" class="boton" icon="fa fa-clone" @click="LoadUnidadMedida(scope.row)"></el-button>  
                                                </el-input>
                                                <label style="width:100%" v-else @click="clickunidadmedida(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ scope.row.unidad_medida }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            prop="proveedor" sortable width="110"
                                            label="Proveedor">
                                            <template scope="scope">
                                                <el-input  v-if="bln_tbl_proveedor  && (scope.row === editing.row) 
                                                && (scope.column.property === editing.column)" @blur="handleBlur(scope.row)" v-focus size="small" v-model="scope.row.proveedor" >
                                                <el-button slot="append" class="boton" icon="fa fa-clone" @click="LoadProveedor(scope.row)"></el-button>  
                                                </el-input>
                                                <label style="width:100%" v-else @click="clickproveedor(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ scope.row.proveedor }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            prop="moneda" sortable 
                                            label="Moneda">
                                             <template scope="scope">
                                                <el-input  v-if="bln_tbl_moneda  && (scope.row === editing.row) 
                                                && (scope.column.property === editing.column)" @blur="handleBlur(scope.row)" v-focus size="small" v-model="scope.row.moneda" >
                                                <el-button slot="append" class="boton" icon="fa fa-clone" @click="LoadMoneda(scope.row)"></el-button>  
                                                </el-input>
                                                <label style="width:100%" v-else @click="clickmoneda(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ scope.row.moneda }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            prop="prioridad" sortable  
                                            label="Prioridad">
                                            <template scope="scope">
                                                <el-input  v-if="bln_tbl_prioridad  && (scope.row === editing.row) 
                                                && (scope.column.property === editing.column)" @blur="handleBlur(scope.row)" v-focus size="small" v-model="scope.row.prioridad" >
                                                <el-button slot="append" class="boton" icon="fa fa-clone" @click="LoadPrioridad(scope.row)"></el-button>  
                                                </el-input>
                                                <label style="width:100%" v-else @click="clickprioridad(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ scope.row.prioridad }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            prop="fecha_estimada" sortable  width="100"
                                            label="Fecha Estimada">
                                            <template scope="scope">
                                                <el-date-picker
                                                    type="date"
                                                    v-if="bln_tbl_fecha_estimada  && (scope.row === editing.row) 
                                                && (scope.column.property === editing.column)" @blur="handleBlur(scope.row)" v-focus size="small" v-model="scope.row.fecha_estimada" >
                                                </el-date-picker>
                                                <label style="width:100%" v-else @click="clickfechaestimada(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ getParseDate(scope.row.fecha_estimada) }}</label>
                                            </template>
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
        <el-dialog title="Requisicion" :visible.sync="dialogRequisicion" @close="closeDialogReq" size="small" >
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
                                <el-input size ="small" v-model="valueInsert">
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
                    @row-dblclick="checkSelectdbRequisicion"
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
                <el-button class="buttonfilter btn btn-outline-secondary orange" @click="checkSelectdbRequisicion()">
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
                                        @click="searchProo()"
                                            > </el-button>
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
                    @row-dblclick="checkSelectdbProveedor"
                    @current-change="checkSelectdbProveedor">
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
                <el-button class="buttonfilter btn btn-outline-secondary orange" @click="checkSelectdbProveedor()">
                <img class="imagenfilter" src="../../../../images/check.png" alt="" >
                </el-button>
                <el-button class="buttonfilter btn btn-outline-secondary orange" style="margin-left: 0px;"  @click="closeDialogPro()">
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
</style>
