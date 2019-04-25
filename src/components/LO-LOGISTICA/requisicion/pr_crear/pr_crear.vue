<template>
  <div class="crear-pr">
    <ol  style="margin-left: -1.5rem;background: linear-gradient(rgb(229, 241, 247) 0%, rgb(255, 255, 255) 100%);    margin-bottom: 0rem !important;">
        <quickaccessmenu v-on:guardarTodo="guardarTodo($event)"  v-on:backPage="backPage($event)"  v-on:reloadpage="reloadpage($event)"/>
    </ol>
    <el-card class="box-card">
        <div slot="header" class="headercard">
            <span class="labelheadercard" >Crear Requisición</span>
        </div>
        <div class="row bodycard">
           <div class="container">
                <div class="row" style="margin-top: 3px;">
                    <!-- <div class="col-sm-12">
                        <div align="right"
                            style="padding-top:5px;padding-bottom:5px;font-size:12px;margin-right: 30px;">
                            <span>Fecha Proceso: {{fecha_actual}}</span>
                        </div>
                     </div> -->
                    <div class="col-sm-9" >
                        <div class="form-group row ">
                            <label class="el-form-item__label col-md-2" >Fec. Proceso</label>
                            <div class="col-md-2 grupolabel">
                                <div class="input-group mb-3" >
                                    <el-date-picker
                                        type="date"
                                        style="width:128px !important"
                                        :disabled="true"
                                        size="small" v-model="fecha_actual" >
                                    </el-date-picker>
                                </div>
                            </div>  
                            <label class="el-form-item__label col-md-1" >Compañia</label>
                            <div class="col-md-2 grupolabel">
                                <div class="input-group mb-3" >
                                <el-input size ="small" @blur="desactivar_compania" @focus="activar_compania" v-model="requisicionModel.strCompany_Cod"  placeholder="">
                                    <el-button v-if="btnactivarcompania && !dialogCompania" slot="append" class="boton" icon="fa fa-clone" @click="loadCompania()"></el-button> 
                                </el-input>
                                </div>
                            </div>
                            <span style="font-size: 11px;margin-top: 5px;">{{requisicionModel.strCompany_Desc}}</span>
                        </div>
                        <div class="form-group row Second">
                            <label class="el-form-item__label col-md-2" >Tipo Requisición</label>
                            <div class="col-md-2 grupolabel">
                                <div class="input-group mb-3" >
                                    
                                    <el-select v-model="tiporequisicion" style="font-size:13px" @visible-change="activar_tipo_requisicion(tiporequisicion)" allow-create clearable placeholder="" size="mini" filterable>
                                        <el-option style="font-size:13px"
                                        v-for="item in tabletipoRequisicion"
                                        :key="item.strTypeReq_Cod"
                                        :label="item.strTipReq_Desc"
                                        :value="item.strTypeReq_Cod">
                                        </el-option>
                                    </el-select>
                                </div>
                            </div>    
                            <label class="el-form-item__label col-md-1" >Almacén</label>
                            <div class="col-md-2 grupolabel">
                                <div class="input-group mb-3" >
                                <el-input size ="small" @blur="desactivar_almacen" v-model="requisicionModel.strWHS_Cod" @focus="activar_almacen"  placeholder="">
                                    <el-button v-if="btnactivaralmacen && !dialogAlmacen" slot="append" class="boton" icon="fa fa-clone" @click="loadAlmacen()"></el-button> 
                                </el-input>
                                </div>
                            </div>  
                            <span style="font-size: 11px;margin-top: 5px;">{{requisicionModel.strWHS_Desc}}</span>                  
                        </div>    
                    </div>
                    <div class="col-sm-10">
                        <div class="form-group row Third">
                            <label class="el-form-item__label col-md-2" >Descripción</label>
                            <div class="col-md-10 grupolabel" style="margin-left: -17px;">
                                <div class="input-group mb-9">
                                    <el-input size ="small" @focus="activar_descripcion" v-model="requisicionModel.strDesc_Header"  placeholder="">                
                                    </el-input>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br/>
                <div class="row">
                    <div class="col-sm-12" >
                        <el-card class="box-card" style="margin-left: -10px;">
                            <div slot="header" class="headercard" style="margin-top: -4px;">
                                <buttons-accions  v-on:AscItem="AscItem" v-on:DscItem="DscItem" v-on:EliminarItem="EliminarItem()"  v-on:siguiente="siguiente()" v-on:anterior="anterior()" v-on:handleClickInParent="handleClickInParent()"></buttons-accions>
                            </div>
                            <div class="col-md-12" >
                                <div class="row bodycard" style="background: white;margin-top: 0px;">
                                    <el-table
                                        ref="missionTable"
                                        :max-height="sizeScreen"
                                        :data="tableData1" 
                                         highlight-current-row
                                         @header-click="headerclick"
                                         @current-change="handleCurrentChange"
                                        stripe 
                                        class="ExcelTable2007">
                                        <!-- <el-table-column type="index" width="58">
                                        </el-table-column> -->
                                        
                                        <el-table-column :render-header="filterFirstname" 
                                            prop="intRequis_Item_NO"  width="40"
                                            >
                                            <template scope="scope">
                                                <label style="width:100%" >&nbsp;{{ scope.row.intRequis_Item_NO }}</label>
                                            </template>
                                        </el-table-column>

                                        <el-table-column  :render-header="filterstrCateg_Account"   prop="strCateg_Account" min-width="80" label="Cta. cuenta">
                                            <template scope="scope">
                                                <el-input  v-if="blntiporequisicion && bln_tbl_categoria_cuenta  && (scope.row === editing.row) 
                                                && (scope.column.property === editing.column)" @blur="handleBlur(scope.row)" v-focus size="small" v-model="scope.row.strCateg_Account" >
                                                <el-button slot="append" class="boton" icon="fa fa-clone" @click="LoadCategoriaCuenta(scope.row,scope.column.property)"></el-button>  
                                                </el-input> 
                                                <label v-bind:style="{background:cell_ocultar,width:'100%',margin: '0rem'}"  v-else @click="alerta(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ scope.row.strCateg_Account }}</label>
                                            </template>
                                        </el-table-column>  
                                        
                                        <el-table-column
                                            prop="strCateg_Line" :render-header="filterstrCateg_Line"    min-width="80"
                                            label="Cat. linea">
                                            <template scope="scope">
                                                <el-input  v-if="blncategorialinea && bln_tbl_categoria_linea  && (scope.row === editing.row) 
                                                && (scope.column.property === editing.column)" @blur="handleBlur(scope.row)" v-focus size="small" v-model="scope.row.strCateg_Line" >
                                                <el-button slot="append" class="boton" icon="fa fa-clone" @click="LoadCategoriaLinea(scope.row)"></el-button>  
                                                </el-input>
                                                <label v-bind:style="{background:cell_ocultar,width:'100%',margin: '0rem'}" v-else @click="clickcategorialinea(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ scope.row.strCateg_Line }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column :render-header="filterstrAccount_NO"
                                            prop="strAccount_NO"   width="100"
                                            label="Cuenta contable">
                                            <template scope="scope">
                                                <el-input  v-if="blncuentacontable && bln_tbl_cuenta_contable  && (scope.row === editing.row) 
                                                && (scope.column.property === editing.column)" @blur="handleBlur(scope.row)" v-focus size="small" v-model="scope.row.strAccount_NO" >
                                                <el-button slot="append" class="boton" icon="fa fa-clone" @click="LoadCuentaContable(scope.row)"></el-button>  
                                                </el-input>
                                                <label style="width:100%" v-bind:style="{background:'#e4e2e2',width:'100%',margin: '0rem'}" v-else @click="clickcuentacontable(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ scope.row.strAccount_NO }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column :render-header="filterstrCostCenter"
                                            prop="strCostCenter"    
                                            label="Centro costos">
                                            <template scope="scope">
                                                <el-input  v-if="blncentrocosto && bln_tbl_centro_costo  && (scope.row === editing.row) 
                                                && (scope.column.property === editing.column)" @blur="handleBlur(scope.row)" v-focus size="small" v-model="scope.row.strCostCenter" >
                                                <el-button slot="append" class="boton" icon="fa fa-clone" @click="LoadCentroCosto(scope.row)"></el-button>  
                                                </el-input>
                                                <label v-bind:style="{background:cell_ocultar,width:'100%',margin: '0rem'}" v-else @click="clickcentrocosto(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ scope.row.strCostCenter }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column :render-header="filterstrMaterial_Cod"
                                            prop="strMaterial_Cod"   
                                            label="Material">
                                            <template scope="scope">
                                                <el-input  v-if="bln_tbl_material  && (scope.row === editing.row) 
                                                && (scope.column.property === editing.column)" @blur="handleBlur(scope.row)" v-focus size="small" v-model="scope.row.strMaterial_Cod" >
                                                <el-button slot="append" class="boton" icon="fa fa-clone" @click="LoadMaterial(scope.row)"></el-button>  
                                                </el-input>
                                                <label style="width:100%" v-else @click="clickmaterial(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ scope.row.strMaterial_Cod }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column :render-header="filterstrDescription"
                                            prop="strDescription"   width="200"
                                            label="Descripción">
                                            <template scope="scope">
                                                <el-input  v-if="bln_tbl_material_descripcion  && (scope.row === editing.row) 
                                                && (scope.column.property === editing.column)" @blur="handleBlur(scope.row)" v-focus size="small" v-model="scope.row.strDescription" >
                                                </el-input>
                                                <label style="width:100%" v-else @click="clickmaterialdescripcion(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ scope.row.strDescription=="~"?"":scope.row.strDescription }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column :render-header="filterfltQuantity"
                                            prop="fltQuantity"   width="100"
                                            label="Cantidad">
                                            <template scope="scope">
                                                <el-input-number  v-if="bln_tbl_cantidad  && (scope.row === editing.row) 
                                                && (scope.column.property === editing.column)" @blur="handleBlur(scope.row)" v-focus size="small" @change="cambiarCantidad(scope.row)" v-model="scope.row.fltQuantity" >
                                                </el-input-number>
                                                <label v-else @click="clickcantidad(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ scope.row.fltQuantity }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column :render-header="filterfltUnitPrice"
                                            prop="fltUnitPrice"   width="100"
                                            label="Precio">
                                            <template scope="scope">
                                                <label>&nbsp;{{ scope.row.fltUnitPrice }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column :render-header="filterstrUM"
                                            prop="strUM"    width="60"
                                            label="UM">
                                            <template scope="scope">
                                                <el-input  v-if=" blnunidadmedida && bln_tbl_unidad_medida  && (scope.row === editing.row) 
                                                && (scope.column.property === editing.column)" @blur="handleBlur(scope.row)" v-focus size="small" v-model="scope.row.strUM" >
                                                <el-button slot="append" class="boton" icon="fa fa-clone" @click="LoadUnidadMedida(scope.row)"></el-button>  
                                                </el-input>
                                                <label v-bind:style="{background:cell_ocultar,width:'100%',margin: '0rem'}" v-else @click="clickunidadmedida(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ scope.row.strUM }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column :render-header="filterstrVendor_Suggested"
                                            prop="strVendor_Suggested"   width="110"
                                            label="Proveedor">
                                            <template scope="scope">
                                                <el-input  v-if="blnproveedor && bln_tbl_proveedor  && (scope.row === editing.row) 
                                                && (scope.column.property === editing.column)" @blur="handleBlur(scope.row)" v-focus size="small" v-model="scope.row.strVendor_Suggested" >
                                                <el-button slot="append" class="boton" icon="fa fa-clone" @click="LoadProveedor(scope.row)"></el-button>  
                                                </el-input>
                                                <label v-bind:style="{background:cell_ocultar,width:'100%',margin: '0rem'}" v-else @click="clickproveedor(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ scope.row.strVendor_Suggested }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column :render-header="filterstrCurr"
                                            prop="strCurr"   
                                            label="Moneda">
                                             <template scope="scope">
                                                <el-input  v-if="bln_tbl_moneda  && (scope.row === editing.row) 
                                                && (scope.column.property === editing.column)" @blur="handleBlur(scope.row)" v-focus size="small" v-model="scope.row.strCurr" >
                                                <el-button slot="append" class="boton" icon="fa fa-clone" @click="LoadMoneda(scope.row)"></el-button>  
                                                </el-input>
                                                <label style="width:100%" v-else @click="clickmoneda(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ scope.row.strCurr }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column :render-header="filterstrPriority_Cod"
                                            prop="strPriority_Cod"    
                                            label="Prioridad">
                                            <template scope="scope">
                                                <el-input  v-if="bln_tbl_prioridad  && (scope.row === editing.row) 
                                                && (scope.column.property === editing.column)" @blur="handleBlur(scope.row)" v-focus size="small" v-model="scope.row.strPriority_Cod" >
                                                <el-button slot="append" class="boton" icon="fa fa-clone" @click="LoadPrioridad(scope.row)"></el-button>  
                                                </el-input>
                                                <label style="width:100%" v-else @click="clickprioridad(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ scope.row.strPriority_Cod }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column :render-header="filterdtmRequested_Date"
                                            prop="dtmRequested_Date"    width="100"
                                            label="Fecha Estimada">
                                            <template scope="scope">
                                                <el-date-picker
                                                    type="date"
                                                    v-if="bln_tbl_fecha_estimada  && (scope.row === editing.row) 
                                                && (scope.column.property === editing.column)" @blur="handleBlur(scope.row)" v-focus size="small" v-model="scope.row.dtmRequested_Date" >
                                                </el-date-picker>
                                                <label style="width:100%" v-else @click="clickfechaestimada(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ getParseDate(scope.row.dtmRequested_Date) }}</label>
                                            </template>
                                        </el-table-column>
                                        
                                    </el-table>
                                </div>
                            </div>
                        </el-card>
                    </div>
                </div>
                <div class="row" style="margin-top: 10px;">
                    <div class="col-sm-6" >
                        <div class="form-group row ">
                            <label class="el-form-item__label col-md-2" >Nº Linea</label>
                            <div class="col-md-7 grupolabel" style="margin-right: -10px;">
                                <div class="input-group mb-3" >
                                    <el-input type="text"  size ="small" v-model="txtnroline"   aria-describedby="basic-addon2">
                                    </el-input>
                                </div>
                            </div>
                                  
                            <div class="col-md-2 grupolabel" style="text-align:left">
                                <el-button  @click="backTable()" class="buttonfilter btn btn-outline-secondary orange" >
                                    <img class="imagenfilter"  style="    width: 11px;height: 10px;margin-left: -1px;margin-top: -3px;" src="../../../../images/arriba.png" alt="">
                                </el-button>
                                 <el-button @click="nextTable()" class="buttonfilter btn btn-outline-secondary orange" >
                                    <img class="imagenfilter"  style="    width: 11px;height: 10px;margin-left: -1px;margin-top: -3px;" src="../../../../images/abajo.png" alt="">
                                </el-button>
                            </div>
                            <!-- <div class="input-group col-md-8">
                            </div>
                            <div class="col-md-2">
                                <div style="padding-top: 2px">
                                    
                                </div>
                            </div> -->
                        </div>   
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12" style="margin-top: 10px;">
                        <el-tabs type="border-card">
                            <el-tab-pane label="Servicio">
                                <div class="container">
                                    <div class="row">
                                        <div class="col-sm-11">
                                            <el-table
                                            :data="tableDataServicio" 
                                            class="ExcelTable2007">
                                                <el-table-column type="index" width="58">
                                                </el-table-column>
                                                <el-table-column  prop="date" label="Codigo" >
                                                </el-table-column>
                                                <el-table-column  prop="date" label="Descripcion" >
                                                </el-table-column>
                                                <el-table-column  prop="date" label="Unidad" >
                                                </el-table-column>
                                                <el-table-column  prop="date" label="Cuenta" >
                                                </el-table-column>
                                                <el-table-column  prop="date" label="Cantidad" >
                                                </el-table-column>
                                                <el-table-column  prop="date" label="Precio" >
                                                </el-table-column>
                                                <el-table-column  prop="date" label="Moneda" >
                                                </el-table-column>
                                                <el-table-column  prop="date" label="Neto" >
                                                </el-table-column>
                                            </el-table>
                                        </div>
                                    </div>
                                </div>
                            </el-tab-pane>
                           
                            <el-tab-pane label="Datos Material">
                                <div class="container">
                                    <div class="row">
                                        <div class="col-sm-3">
                                            <div class="form-group row ">
                                                <label class="el-form-item__label col-md-3" >Código</label>
                                                <div class="col-md-7 grupolabel">
                                                    <div class="input-group mb-3" >
                                                    <el-input size ="small"  placeholder="">
                                                    </el-input>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-sm-3">
                                            <div class="form-group row ">
                                                <label class="el-form-item__label col-md-4" >Descripción</label>
                                                <div class="col-md-8 grupolabel">
                                                    <div class="input-group mb-8" >
                                                    <el-input size ="small"  placeholder="">
                                                    </el-input>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-3">
                                            <div class="form-group row ">
                                                <label class="el-form-item__label col-md-3" >Nombre</label>
                                                <div class="col-md-7 grupolabel">
                                                    <div class="input-group mb-7" >
                                                    <el-input size ="small"  placeholder="">
                                                    </el-input>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="Cantidad/Fecha">
                                <div class="container">
                                    <div class="row">
                                        <div class="col-sm-3">
                                            <div class="form-group1 row ">
                                                <label class="el-form-item__label col-md-6" >Cantidad</label>
                                                <div class="col-md-4 grupolabel">
                                                    <div class="input-group " >
                                                    <el-input size ="small"  placeholder="">
                                                    </el-input>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-sm-3">
                                            <div class="form-group1 row ">
                                                <label class="el-form-item__label col-md-6" >Fecha Entrega</label>
                                                <div class="col-md-6 grupolabel">
                                                    <div class="input-group " >
                                                    <el-input size ="small" placeholder="">
                                                    </el-input>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-3">
                                            <div class="form-group1 row ">
                                                <label class="el-form-item__label col-md-6" >Cantidad Ordenada</label>
                                                <div class="col-md-4 grupolabel">
                                                    <div class="input-group " >
                                                    <el-input size ="small" v-model="selectrow.fltQuantity" placeholder="">
                                                    </el-input>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-sm-3">
                                            <div class="form-group1 row ">
                                                <label class="el-form-item__label col-md-6" >Fecha Requerida</label>
                                                <div class="col-md-6 grupolabel">
                                                    <div class="input-group " >
                                                    <el-input size ="small" v-model="selectrow.dtmRequested_Date" placeholder="">
                                                    </el-input>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-3">
                                            <div class="form-group1 row ">
                                                <label class="el-form-item__label col-md-6" >Cantidad Pendiente</label>
                                                <div class="col-md-4 grupolabel">
                                                    <div class="input-group " >
                                                    <el-input size ="small" v-model="selectrow.fltQuantity" placeholder="">
                                                    </el-input>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-sm-3">
                                            <div class="form-group1 row ">
                                                <label class="el-form-item__label col-md-6" >Fecha Modificación</label>
                                                <div class="col-md-6 grupolabel">
                                                    <div class="input-group " >
                                                    <el-input size ="small" placeholder="">
                                                    </el-input>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div> 
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="Valoración">
                                <div class="container">
                                    <div class="row">
                                        <div class="col-sm-3">
                                            <div class="form-group1 row ">
                                                <label class="el-form-item__label col-md-4" >Precio</label>
                                                <div class="col-md-7 grupolabel">
                                                    <div class="input-group " >
                                                    <el-input size ="small" v-model="selectrow.fltUnitPrice" placeholder="">
                                                    </el-input>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-sm-3">
                                            <div class="form-group1 row ">
                                                <label class="el-form-item__label col-md-4" >Cantidad</label>
                                                <div class="col-md-7 grupolabel">
                                                    <div class="input-group mb-2" >
                                                    <el-input size ="small" v-model="selectrow.fltQuantity" placeholder="">
                                                    </el-input>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-3">
                                            <div class="form-group1 row ">
                                                <label class="el-form-item__label col-md-4" >Total</label>
                                                <div class="col-md-7 grupolabel">
                                                    <div class="input-group " >
                                                        <el-input size ="small" v-model="selectrow.fltValue_Total" placeholder="">
                                                        </el-input>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="Cuenta Contable">
                                <div class="container">
                                    <div class="row">
                                        <div class="col-sm-3">
                                            <div class="form-group1 row ">
                                                <label class="el-form-item__label col-md-6" >G/L Cuenta</label>
                                                <div class="col-md-5 grupolabel">
                                                    <div class="input-group mb-2" >
                                                    <el-input size ="small" v-model="selectrow.strAccount_NO" placeholder="">
                                                    </el-input>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-sm-3">
                                            <div class="form-group1 row ">
                                                <label class="el-form-item__label col-md-6" >WBS Element</label>
                                                <div class="col-md-5 grupolabel">
                                                    <div class="input-group mb-2" >
                                                    <el-input size ="small" placeholder="">
                                                    </el-input>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-3">
                                            <div class="form-group1 row ">
                                                <label class="el-form-item__label col-md-6" >Centro Costo</label>
                                                <div class="col-md-5 grupolabel">
                                                    <div class="input-group mb-2" >
                                                    <el-input size ="small" v-model="selectrow.strCostCenter" placeholder="">
                                                    </el-input>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    
                                    </div>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="Proveedor/Estado">
                               <div class="container">
                                    <div class="row">
                                        <div class="col-sm-3">
                                            <div class="form-group1 row ">
                                                <label class="el-form-item__label col-md-6" >Código Proveedor</label>
                                                <div class="col-md-5 grupolabel">
                                                    <div class="input-group mb-2" >
                                                    <el-input size ="small" v-model="proveedorModel.strVendor_NO"  placeholder="">
                                                    </el-input>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-sm-3">
                                            <div class="form-group1 row ">
                                                <label class="el-form-item__label col-md-6" >Nombre Proveedor</label>
                                                <div class="col-md-6 grupolabel">
                                                    <div class="input-group " >
                                                    <el-input size ="small"  v-model="proveedorModel.strVendor_Desc" placeholder="">
                                                    </el-input>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </el-tab-pane>
                        </el-tabs>
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
                <img src="../../../../images/save.png" v-if="iserror" style="width:16px; height:17px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 1.3rem;" @click="fnOcultar()"/>
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
    <el-dialog
        title="Proveedores"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
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
                :data="tableData"
                v-bind:class="{selected: currentRow === tableData}"
                stripe  :default-sort = "{prop: 'date', order: 'descending'}"
                style="width: 100%" class="ExcelTable2007"
                height="250"
                :current-row-key=1
                row-key="1"
                @current-change="handleCurrentChange">
                <el-table-column   prop="date" label="Codigo" width="180">
                </el-table-column>  
                <el-table-column  prop="name" label="Descripción" style="width: 70% !important;">
                </el-table-column> 
                </el-table>
          </el-card>
        <span slot="footer" class="dialog-footer">
            <img src="../../../../images/check.png" style="width:13px; height:15px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.6rem;"/>
            <img src="../../../../images/close.png" style="width:17px; height:15px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.6rem;" @click="dialogVisible = false"/>
        </span>
    </el-dialog>

    <!--DIALOG BUSQUEDA COMPAÑIA-->
    <el-dialog title="Busqueda compañia" :visible.sync="dialogCompania" @close="closeCompania" size="small" >
      <bcompania v-on:companiaSeleccionado="companiaSeleccionado($event)">
      </bcompania>
    </el-dialog>

   <!--DIALOG BUSQUEDA CENTRO COSTOS-->
    <el-dialog title="Busqueda centro de costos"  :visible.sync="dialogCentroCostos" @close="closeCentroCostos" size="small" >
      <bcentrocosto v-on:centrocostoselecionado="SeleccionadoCentroCosto($event)">
      </bcentrocosto>
    </el-dialog>

    <!--DIALOG BUSQUEDA MONEDA-->
    <el-dialog title="Busqueda moneda"  :visible.sync="dialogMoneda" @close="closeMoneda" size="small" >
      <bmoneda v-on:monedaselecionado="SeleccionadoMoneda($event)">
      </bmoneda>
    </el-dialog>

     <!--DIALOG BUSQUEDA CATEGORIA CUENTA-->
    <el-dialog title="Busqueda categoria cuenta"  :visible.sync="dialogCategoriaCuenta" @close="closeCategoriaCuenta" size="small" >
      <bcategoriacuenta v-on:categoriacuentaselecionado="SeleccionadoCategoriaCuenta($event)">
      </bcategoriacuenta>
    </el-dialog>
    <!--DIALOG BUSQUEDA CATEGORIA LINEA-->
    <el-dialog title="Busqueda categoria linea"  :visible.sync="dialogCategoriaLinea" @close="closeCategoriaLinea" size="small" >
      <bcategorialinea v-on:categorialineaselecionado="SeleccionadoCategoriaLinea($event)">
      </bcategorialinea>
    </el-dialog>
     <!--DIALOG BUSQUEDA CUENTA CONTABLE-->
    <el-dialog title="Busqueda cuenta contable"  :visible.sync="dialogCuentaContable" @close="closeCuentaContable" size="small" >
      <bcuentacontable v-on:cuentacontableselecionado="SeleccionadoCuentaContable($event)">
      </bcuentacontable>
    </el-dialog>
      <!--DIALOG BUSQUEDA Material-->
    <el-dialog title="Busqueda material"  :visible.sync="dialogMaterial" @close="closeMaterial" size="small" >
      <bmaterial v-on:materialselecionado="SeleccionadoMaterial($event)">
      </bmaterial>
    </el-dialog>
     <!--DIALOG BUSQUEDA PROVEEDOR-->
    <el-dialog title="Busqueda proveedor"  :visible.sync="dialogProveedor" @close="closeProveedor" size="small" >
      <bproveedor v-on:proveedorselecionado="SeleccionadoProveedor($event)">
      </bproveedor>
    </el-dialog>
    <!--DIALOG BUSQUEDA ALMACEN-->
    <el-dialog title="Busqueda almacen"  :visible.sync="dialogAlmacen" @close="closeAlmacen" size="small" >
      <balmacen v-on:almacenseleccionado="SeleccionadoAlmacen($event)">
      </balmacen>
    </el-dialog>

    <!--DIALOG BUSQUEDA UNIDAD MEDIDA-->
    <el-dialog title="Busqueda unidad medida"  :visible.sync="dialogUnidadMedida" @close="closeUnidadMedida" size="small" >
      <bunidadmedida v-on:unidadmedidaselecionado="SeleccionadoUnidadMedida($event)">
      </bunidadmedida>
    </el-dialog>

    <!--DIALOG BUSQUEDA PRIORIDAD-->
    <el-dialog title="Busqueda prioridad"  :visible.sync="dialogPrioridad" @close="closePrioridad" size="small" >
      <bprioridad v-on:prioridadselecionado="SeleccionadoPrioridad($event)">
      </bprioridad>
    </el-dialog>
    

    
  </div>  
  
</template>
<script>
import CrearPRComponent from '@/components/LO-LOGISTICA/requisicion/pr_crear/pr_crear.component'
export default CrearPRComponent
</script>
<style scoped>
.selected{
    background: red;
}
table {
  overflow: hidden;
}

td, th {
  padding: 10px;
  position: relative;
  outline: 0;
}

body:not(.nohover) tbody tr:hover {
  background-color: #ffa;
}

td:hover::after,
thead th:not(:empty):hover::after,
td:focus::after,
thead th:not(:empty):focus::after { 
  content: '';  
  height: 10000px;
  left: 0;
  position: absolute;  
  top: -5000px;
  width: 100%;
  z-index: -1;
}

td:hover::after,
th:hover::after {
  background-color: #ffa;
}

td:focus::after,
th:focus::after {
  background-color: lightblue;
}

/* Focus stuff for mobile */
td:focus::before,
tbody th:focus::before {
  background-color: lightblue;
  content: '';  
  height: 100%;
  top: 0;
  left: -5000px;
  position: absolute;  
  width: 10000px;
  z-index: -1;
}
.el-table--enable-row-hover .el-table__header tr:hover>th {
    background-color: black !important;
    background-clip: padding-box;
}

</style>
