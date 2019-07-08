<template>
  <div class="modificar-pr">
    <ol  style="margin-left: -1.5rem;background: linear-gradient(rgb(229, 241, 247) 0%, rgb(255, 255, 255) 100%);    margin-bottom: 0rem !important;">
        <quickaccessmenu v-on:guardarTodo="guardarTodo($event)"  v-on:backPage="backPage($event)"  v-on:reloadpage="reloadpage($event)"/>
    </ol>
    <el-card class="box-card">
        <div slot="header" class="headercard">
            <span class="labelheadercard" >{{txtmodulo}}</span>
            <el-button v-if="vifaprobarrechasar" class="buttonfilter btn btn-outline-secondary orange" style="margin-top: -2px;
                width: inherit;
                background: #4685b5;
                border-color: transparent;
                color: #f6f7f9;
                padding: 4px 4px 4px 4px !important;" @click="aprobar()">
                Aprobar
            </el-button>
            <!-- <el-button v-if="vifaprobarrechasar" class="buttonfilter btn btn-outline-secondary orange" style="margin-top: -2px;
                width: inherit;
                background: rgb(171, 67, 4);
                border-color: transparent;
                color: #f6f7f9;
                padding: 4px 4px 4px 4px !important;" @click="rechasar()">
                Rechazar
            </el-button> -->
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
                                        format="dd.MM.yyyy"
                                        style="width:128px !important"
                                        :disabled="true"
                                        size="small" v-model="fecha_actual" >
                                    </el-date-picker>
                                </div>
                            </div> 
                            <label class="el-form-item__label col-md-1" >Compañia</label>
                            <div class="col-md-2 grupolabel">
                                <div class="input-group mb-3" >
                                <el-input :disabled="true" size ="small"  @blur="desactivar_compania" @focus="activar_compania" v-model="requisicionModel.strCompany_Cod"  placeholder="">
                                    <el-button v-if="btnactivarcompania && !dialogCompania" slot="append" class="boton" icon="fa fa-clone" @click="loadCompania()"></el-button> 
                                </el-input>
                                </div>
                            </div>
                            <span style="font-size: 11px;margin-top: 5px;">{{requisicionModel.strCompany_Desc}}</span>
                        </div>
                        <div class="form-group row Second">
                            <label class="el-form-item__label col-md-2" >Tipo Requisicion</label>
                            <div class="col-md-2 grupolabel">
                                <div class="input-group mb-3" >
                                    
                                    <el-select :disabled="true"  v-model="tiporequisicion" style="font-size:13px" @visible-change="activar_tipo_requisicion(tiporequisicion)" allow-create clearable placeholder="" size="mini" filterable>
                                        <el-option style="font-size:13px"
                                        v-for="item in tabletipoRequisicion"
                                        :key="item.strTypeReq_Cod"
                                        :label="item.strTipReq_Desc"
                                        :value="item.strTypeReq_Cod">
                                        </el-option>
                                    </el-select>
                                </div>
                            </div>    
                            <label class="el-form-item__label col-md-1" >Almacen</label>
                            <div class="col-md-2 grupolabel">
                                <div class="input-group mb-3" >
                                <el-input :disabled="visualizar"  size ="small" @blur="desactivar_almacen" v-model="requisicionModel.strWHS_Cod" @focus="activar_almacen"  placeholder="">
                                    <el-button v-if="btnactivaralmacen && !dialogAlmacen" slot="append" class="boton" icon="fa fa-clone" @click="loadAlmacen()"></el-button> 
                                </el-input>
                                </div>
                            </div>  
                            <span style="font-size: 11px;margin-top: 5px;">{{requisicionModel.strWHS_Desc}}</span>                  
                        </div>    
                    </div>
                    <div class="col-sm-10">
                        <div class="form-group row Third">
                            <label class="el-form-item__label col-md-2" >Descripcion</label>
                            <div class="col-md-10 grupolabel" style="margin-left: -17px;">
                                <div class="input-group mb-9">
                                    <el-input size ="small" :disabled="visualizar"  @focus="activar_descripcion" v-model="requisicionModel.strDesc_Header"  placeholder="">                
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
                                <buttons-accions v-on:Limpiar="Limpiar" v-on:Print="Print" v-on:Buscar="Buscar"  v-on:AscItem="AscItem" v-on:DscItem="DscItem" v-on:EliminarItem="EliminarItem()"  v-on:siguiente="siguiente()" v-on:anterior="anterior()" v-on:handleClickInParent="handleClickInParent()"></buttons-accions>
                            </div>
                            <div class="col-md-12" >
                                <div class="row bodycard" style="background: white;margin-top: 0px;">
                                    <el-table
                                        ref="missionTable"  
                                        id="container"                                      
                                        :max-height="sizeScreen"
                                        :data="tableData1" 
                                         highlight-current-row
                                         @header-click="headerclick"
                                         @current-change="handleCurrentChange"
                                        stripe 
                                        class="ExcelTable2007">
                                        <!-- <el-table-column type="index" width="58">
                                        </el-table-column> -->
                                        
                                        <el-table-column 
                                            prop="intRequis_Item_NO"  width="40"
                                            >
                                            <template scope="scope">
                                                <label style="width:100%;    margin: 0rem;" v-bind:style="{width:'100%',margin: '0rem'}" >&nbsp;{{ scope.row.intRequis_Item_NO }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column  :render-header="filterstrCateg_Account"   prop="strCateg_Account" min-width="80" label="Cat. Cuenta">
                                            <template scope="scope">
                                                <el-input :disabled="visualizar"  v-if="blntiporequisicion && bln_tbl_categoria_cuenta  && (scope.row === editing.row) 
                                                && (scope.column.property === editing.column)" @blur="handleBlur(scope.row)" v-focus size="small" v-model="scope.row.strCateg_Account" >
                                                <el-button :disabled="visualizar" slot="append" class="boton" icon="fa fa-clone" @click="LoadCategoriaCuenta(scope.row,scope.column.property)"></el-button>  
                                                </el-input> 
                                                <label :disabled="visualizar" v-bind:style="{'border-color': cell_ocultar,'border-style': 'solid','border-radius': '0.3em','border-width': border_width,width:'100%',margin: '0rem'}"  v-else @click="alerta(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ scope.row.strCateg_Account }}</label>
                                            </template>
                                        </el-table-column> 
                                        <el-table-column :render-header="filterstrCateg_Line"  v-if="visiblecolumna"
                                            prop="strCateg_Line"   
                                            label="Cat. Linea">
                                            <template scope="scope">
                                                <el-input :disabled="visualizar"  v-if="blncategorialinea && bln_tbl_categoria_linea  && (scope.row === editing.row) 
                                                && (scope.column.property === editing.column)" @blur="handleBlur(scope.row)" v-focus size="small" v-model="scope.row.strCateg_Line" >
                                                <el-button :disabled="visualizar" slot="append" class="boton" icon="fa fa-clone" @click="LoadCategoriaLinea(scope.row)"></el-button>  
                                                </el-input>
                                                <label :disabled="visualizar" v-bind:style="{'border-color': cell_ocultar,'border-style': 'solid','border-radius': '0.3em','border-width': border_width,width:'100%',margin: '0rem'}" v-else @click="clickcategorialinea(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ scope.row.strCateg_Line }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column :render-header="filterstrCostCenter"  v-if="visiblecolumna"
                                            prop="strCostCenter"    
                                            label="Centro Costos">
                                            <template scope="scope">
                                                <el-input :disabled="visualizar"  v-if="blncentrocosto && bln_tbl_centro_costo  && (scope.row === editing.row) 
                                                && (scope.column.property === editing.column)" @blur="handleBlur(scope.row)" v-focus size="small" v-model="scope.row.strCostCenter" >
                                                <el-button :disabled="visualizar" slot="append" class="boton" icon="fa fa-clone" @click="LoadCentroCosto(scope.row)"></el-button>  
                                                </el-input>
                                                <label :disabled="visualizar" v-bind:style="{'border-color': cell_ocultar,'border-style': 'solid','border-radius': '0.3em','border-width': border_width,width:'100%',margin: '0rem'}" style="text-overflow: ellipsis;white-space: nowrap; overflow: hidden;" v-else @click="clickcentrocosto(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ scope.row.strCostCenter }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column :render-header="filterstrAccount_NO"
                                            prop="strAccount_NO"   width="100"
                                            label="Cta. Contable"
                                            >
                                            <template scope="scope">
                                                <el-input :disabled="visualizar"  v-if="blncuentacontable && bln_tbl_cuenta_contable  && (scope.row === editing.row) 
                                                && (scope.column.property === editing.column)" @blur="handleBlur(scope.row)" v-focus size="small" v-model="scope.row.strAccount_NO" >
                                                <el-button :disabled="visualizar" slot="append" class="boton" icon="fa fa-clone" @click="LoadCuentaContable(scope.row)"></el-button>  
                                                </el-input>
                                                <label :disabled="visualizar" style="width:100%;    margin: 0rem;" v-bind:style="{'border-color': cell_ocultar,width:'100%',margin: '0rem'}" v-else @click="clickcuentacontable(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ scope.row.strAccount_NO }}</label>
                                            </template>
                                        </el-table-column>

                                        <el-table-column :render-header="filterstrMaterial_Cod"
                                            prop="strMaterial_Cod"   
                                            label="Material">
                                            <template scope="scope">
                                                <el-input :disabled="visualizar"  v-if="bln_tbl_material  && (scope.row === editing.row) 
                                                && (scope.column.property === editing.column)" @blur="handleBlur(scope.row)" v-focus size="small" v-model="scope.row.strMaterial_Cod" >
                                                <el-button :disabled="visualizar" slot="append" class="boton" icon="fa fa-clone" @click="LoadMaterial(scope.row)"></el-button>  
                                                </el-input>
                                                <label :disabled="visualizar" v-bind:style="{'border-color': cell_ocultar,'border-style': 'solid','border-radius': '0.3em','border-width': border_width,width:'100%',margin: '0rem'}"  style="width:100%;  border-color: #ff9da4; border-style: solid;  border-radius: 0.3em; border-width: 1px;  margin: 0rem;" v-else @click="clickmaterial(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ scope.row.strMaterial_Cod }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column :render-header="filterstrDescription"
                                            prop="strDescription"   width="200"
                                            label="Descripcion">
                                            <template scope="scope">
                                                <el-input :disabled="visualizar"  v-if="bln_tbl_material_descripcion  && (scope.row === editing.row) 
                                                && (scope.column.property === editing.column)" @blur="handleBlur(scope.row)" v-focus size="small" v-model="scope.row.strDescription" >
                                                </el-input>
                                                <label :disabled="visualizar" style="width:100%;text-overflow: ellipsis;white-space: nowrap; overflow: hidden;  border-color: #ff9da4; border-style: solid;  border-radius: 0.3em; border-width: 1px;  margin: 0rem;margin-top: 5px;" v-else @click="clickmaterialdescripcion(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ scope.row.strDescription=="~"?"":scope.row.strDescription }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column :render-header="filterstrUM"
                                            prop="strUM"    width="60"
                                            label="UM">
                                            <template scope="scope">
                                                <el-input :disabled="visualizar"  v-if=" blnunidadmedida && bln_tbl_unidad_medida  && (scope.row === editing.row) 
                                                && (scope.column.property === editing.column)" @blur="handleBlur(scope.row)" v-focus size="small" v-model="scope.row.strUM" >
                                                <el-button :disabled="visualizar" slot="append" class="boton" icon="fa fa-clone" @click="LoadUnidadMedida(scope.row)"></el-button>  
                                                </el-input>
                                                <label :disabled="visualizar" v-bind:style="{'border-color': cell_ocultar,'border-style': 'solid','border-radius': '0.3em','border-width': border_width,width:'100%',margin: '0rem'}" v-else @click="clickunidadmedida(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ scope.row.strUM }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column :render-header="filterstrVendor_Suggested"
                                            prop="strVendor_Suggested"   width="150"
                                            label="Proveedor Sugerido">
                                            <template scope="scope">
                                                <el-input  :disabled="visualizar" v-if="blnproveedor && bln_tbl_proveedor  && (scope.row === editing.row) 
                                                && (scope.column.property === editing.column)" @blur="handleBlur(scope.row)" v-focus size="small" v-model="scope.row.strVendor_Desc" >
                                                <el-button :disabled="visualizar" slot="append" class="boton" icon="fa fa-clone" @click="LoadProveedor(scope.row)"></el-button>  
                                                </el-input>
                                                <label :disabled="visualizar" style="width:100%;text-overflow: ellipsis;white-space: nowrap; overflow: hidden;  border-color: #ff9da4; border-style: solid;  border-radius: 0.3em; border-width: 1px;  margin: 0rem;margin-top: 5px;" v-else @click="clickproveedor(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ scope.row.strVendor_Desc }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column :render-header="filterstrCurr"
                                            prop="strCurr"   
                                            label="Moneda">
                                             <template scope="scope">
                                                <el-input :disabled="visualizar"  v-if="bln_tbl_moneda  && (scope.row === editing.row) 
                                                && (scope.column.property === editing.column)" @blur="handleBlur(scope.row)" v-focus size="small" v-model="scope.row.strCurr" >
                                                <el-button :disabled="visualizar" slot="append" class="boton" icon="fa fa-clone" @click="LoadMoneda(scope.row)"></el-button>  
                                                </el-input>
                                                <label :disabled="visualizar" v-bind:style="{'border-color': cell_ocultar,'border-style': 'solid','border-radius': '0.3em','border-width': border_width,width:'100%',margin: '0rem'}" style="width:100%;  border-color: #ff9da4; border-style: solid;  border-radius: 0.3em; border-width: 1px;  margin: 0rem;" v-else @click="clickmoneda(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ scope.row.strCurr }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column :render-header="filterfltQuantity" align="right"
                                            prop="fltQuantity"   width="100"
                                            label="Cantidad">
                                            <template scope="scope">
                                                <el-input-number :disabled="visualizar"   v-if="bln_tbl_cantidad  && (scope.row === editing.row) 
                                                && (scope.column.property === editing.column)" @blur="handleBlur(scope.row)" v-focus size="small" v-model="scope.row.fltQuantity" >
                                                </el-input-number> 
                                                <label :disabled="visualizar" v-bind:style="{'border-color': cell_ocultar,'border-style': 'solid','border-radius': '0.3em','border-width': border_width,width:'100%',margin: '0rem'}" style="width:100%;  border-color: #ff9da4; border-style: solid;  border-radius: 0.3em; border-width: 1px;  margin: 0rem;"  v-else @click="clickcantidad(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ scope.row.fltQuantity }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column :render-header="filterfltUnitPrice" align="right"
                                            prop="fltUnitPrice"   width="100"
                                            label="Precio">
                                            <template scope="scope">
                                                <!-- <el-input-number  @change="comprobar(scope.row.fltUnitPrice)" style="width:100%;margin-top: 4px;"  v-if="bln_tbl_precio  && (scope.row === editing.row) 
                                                && (scope.column.property === editing.column)" @blur="handleBlur(scope.row)" v-focus size="small"  v-model="scope.row.fltUnitPrice" >
                                                </el-input-number>  -->
                                                <el-input  type="number" v-if="bln_tbl_precio  && (scope.row === editing.row) 
                                                && (scope.column.property === editing.column)" @change="comprobar(scope.row.fltUnitPrice,scope.row)" @blur="handleBlur(scope.row)" v-focus  size="small" v-model="scope.row.fltUnitPrice" :precision="2" :step="0.01">
                                                </el-input>
                                                <label style="width:100%;margin-top: 5px;"  v-else @click="clickprecio(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ scope.row.fltUnitPrice!=null?scope.row.fltUnitPrice:0 }}</label>
                                              <!-- <label style="width:100%;margin-top: 4px;">&nbsp;{{ scope.row.fltUnitPrice!=null?scope.row.fltUnitPrice:0   }}</label> -->
                                            </template>
                                        </el-table-column>
                                       
                                        <el-table-column :render-header="filterdtmRequested_Date"
                                            prop="dtmRequested_Date"    width="150"
                                            label="Fecha Estimada Entrega">
                                            <template scope="scope">
                                                <el-date-picker :disabled="visualizar"
                                                    type="date"
                                                    format="dd.MM.yyyy"
                                                    v-if="bln_tbl_fecha_estimada  && (scope.row === editing.row) 
                                                && (scope.column.property === editing.column)" @blur="handleBlur(scope.row)" v-focus size="small" v-model="scope.row.dtmRequested_Date" >
                                                </el-date-picker>
                                                <label :disabled="visualizar" v-bind:style="{'border-color': cell_ocultar,'border-style': 'solid','border-radius': '0.3em','border-width': border_width,width:'100%',margin: '0rem'}" style="width:100%;  border-color: #ff9da4; border-style: solid;  border-radius: 0.3em; border-width: 1px;  margin: 0rem;" v-else @click="clickfechaestimada(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ getDateString(scope.row.dtmRequested_Date) }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column :render-header="filterstrPriority_Cod"
                                            prop="strPriority_Cod"   width="100"    
                                            label="Prioridad">
                                            <template scope="scope">
                                                <el-input :disabled="visualizar"  v-if="bln_tbl_prioridad  && (scope.row === editing.row) 
                                                && (scope.column.property === editing.column)" @blur="handleBlur(scope.row)" v-focus size="small" v-model="scope.row.strPriority_Desc" >
                                                <el-button slot="append" class="boton" icon="fa fa-clone" @click="LoadPrioridad(scope.row)"></el-button>  
                                                </el-input>
                                                <label :disabled="visualizar" v-bind:style="{'border-color': cell_ocultar,'border-style': 'solid','border-radius': '0.3em','border-width': border_width,width:'100%',margin: '0rem'}" style="width:100%;  border-color: #ff9da4; border-style: solid;  border-radius: 0.3em; border-width: 1px;  margin: 0rem;" v-else @click="clickprioridad(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ scope.row.strPriority_Desc }}</label>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </div>
                        </el-card>
                    </div>
                </div>
                <!-- <div class="row" style="margin-top: 10px;">
                    <div class="col-sm-6" >
                        <div class="form-group row ">
                            <label class="el-form-item__label col-md-2" >Nº Linea</label>
                            <div class="col-md-7 grupolabel" style="margin-right: -10px;">
                                <div class="input-group mb-3" >
                                    <el-input type="text" @keyup.enter.native="nroLineaSelect()"  size ="small" v-model="txtnroline"   aria-describedby="basic-addon2">
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
                        </div>   
                    </div>
                </div> -->
                <div class="row">
                    <div class="col-sm-12" style="margin-top: 10px;">
                        <el-tabs type="border-card">
                            <!-- <el-tab-pane label="Servicio">
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
                            </el-tab-pane> -->
                            <el-tab-pane label="Datos Material">
                                <div class="container">
                                    <div class="row">
                                        <div class="col-sm-3">
                                            <div class="form-group row ">
                                                <label class="el-form-item__label col-md-3" >Codigo</label>
                                                <div class="col-md-7 grupolabel">
                                                    <div class="input-group mb-3" >
                                                    <el-input size ="small" :disabled="true" v-model="productoModel.strStock_Cod" placeholder="">
                                                    </el-input>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div class="form-group row ">
                                                <label class="el-form-item__label col-md-2" >Descripcion</label>
                                                <div class="col-md-10 grupolabel">
                                                    <div class="input-group mb-8" >
                                                    <el-input size ="small" :disabled="true" v-model="productoModel.strStock_Desc" placeholder="">
                                                    </el-input>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- <div class="row">
                                        <div class="col-sm-3">
                                            <div class="form-group row ">
                                                <label class="el-form-item__label col-md-3" >Nombre</label>
                                                <div class="col-md-7 grupolabel">
                                                    <div class="input-group mb-7" >
                                                    <el-input size ="small" :disabled="visualizar" v-model="productoModel.strStock_Name" placeholder="">
                                                    </el-input>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div> -->
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="Cantidad/Fecha">
                                <div class="container">
                                    <div class="row">
                                        <div class="col-sm-3">
                                            <div class="form-group1 row ">
                                                <label class="el-form-item__label col-md-6" >Cantidad Ordenada</label>
                                                <div class="col-md-4 grupolabel">
                                                    <div class="input-group " >
                                                    <el-input size ="small" :disabled="true" v-model="fltQuantity" placeholder="">
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
                                                    <el-input size ="small" :disabled="true"  v-model="dtmRequested_Date" placeholder="">
                                                    </el-input>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="Valoracion">
                                <div class="container">
                                    <div class="row">
                                        <div class="col-sm-3">
                                            <div class="form-group1 row ">
                                                <label class="el-form-item__label col-md-4" >Precio</label>
                                                <div class="col-md-7 grupolabel">
                                                    <div class="input-group " >
                                                    <el-input size ="small" :disabled="true" v-model="fltUnitPrice" placeholder="">
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
                                                    <el-input size ="small" :disabled="true" v-model="fltQuantity" placeholder="">
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
                                                        <el-input size ="small" :disabled="true" v-model="fltValue_Total" placeholder="">
                                                        </el-input>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-sm-3">
                                            <div class="form-group1 row ">
                                                <label class="el-form-item__label col-md-4" >UM</label>
                                                <div class="col-md-7 grupolabel">
                                                    <div class="input-group  mb-2" >
                                                        <el-input :disabled="true" size ="small" v-model="strUM" placeholder="">
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
                                                    <el-input size ="small" :disabled="true" v-model="strAccount_NO" placeholder="">
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
                                                    <el-input :disabled="true" size ="small" placeholder="">
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
                                                    <el-input size ="small" :disabled="true" v-model="strCostCenter" placeholder="">
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
                                                <label class="el-form-item__label col-md-6" >Codigo Proveedor</label>
                                                <div class="col-md-5 grupolabel">
                                                    <div class="input-group mb-2" >
                                                    <el-input :disabled="true" size ="small" v-model="strVendor_NO"  placeholder="">
                                                    </el-input>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div class="form-group1 row ">
                                                <label class="el-form-item__label col-md-3" >Nombre Proveedor</label>
                                                <div class="col-md-8 grupolabel">
                                                    <div class="input-group " >
                                                    <el-input :disabled="true" size ="small"  v-model="strVendor_Desc" placeholder="">
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
                    <vm-progress v-if="vifprogress" status="success" :percentage="percentage" :text-inside="true" :stroke-width="18" :striped="true"></vm-progress>
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
                <el-table-column  prop="name" label="Descripcion" style="width: 70% !important;">
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
      <bmaterial :key="tiporequisicion" :tipo="tiporequisicion" v-on:materialselecionado="SeleccionadoMaterial($event)" v-on:materialClose="closeMaterial()">
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
    

     <b-modal ref="myModalRef" hide-footer title="Buscar" size="sm"  v-model="dialogBusquedaFilter" @keydown.native.enter="confirmaraceptar">
      <div style="height:85px">
        <!-- <img src="../../../../images/informacion.png" style="width:14px; height:15px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.3rem;"/> -->
        <!-- <span style="font-size:13px">¿Desea grabar el documento?</span> -->
        <div class="row" style="margin-left: 0px;">
            <div class="col-md-12">
                <div class="form-group row">
                    <label class="el-form-item__label col-md-2" >Columna</label>
                    <div class="col-md-7 grupolabel">
                        <div class="input-group mb-3" >
                            <el-input size ="small" :disabled="true" v-model="Column"  placeholder="">
                            </el-input>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row" style="margin-left: 0px;">
            <div class="col-md-12">
                <div class="form-group row">
                    <label class="el-form-item__label col-md-2" >Buscar</label>
                    <div class="col-md-7 grupolabel">
                        <div class="input-group mb-3" >
                            <el-input size ="small" v-model="txtbuscar"  placeholder="">
                                <!-- <el-button slot="append" style="padding: 3px 3px !important;background: #fff5c4;
                                    background: -webkit-gradient(left top, left bottom, color-stop(0%, #fff5c4), color-stop(100%, #ffee9f));
                                    background: -webkit-gradient(linear, left top, left bottom, from(#fff5c4), to(#ffee9f));
                                    background: linear-gradient(to bottom, #fff5c4 0%, #ffee9f 100%);" icon="fa fa-search"> 
                                </el-button> -->
                            </el-input>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
      <footer class="modal-footer">
        <img src="../../../../images/check.png" style="width:13px; height:15px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.6rem;" @click="btnBuscar"/>
        <img src="../../../../images/close.png" style="width:17px; height:15px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.6rem;" @click="dialogBusquedaFilter = false"/>
      </footer>
    </b-modal>
    
  </div>  
  
</template>
<script>
import ModificarPRComponent from '@/components/LO-LOGISTICA/requisicion/pr_modificar/pr_modificar.component'
export default ModificarPRComponent
</script>
<style scoped>
.selected{
    background: red;
}
</style>
