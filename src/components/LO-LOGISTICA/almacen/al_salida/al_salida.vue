<template>
  <div class="salida-pr">
    <el-card class="box-card">
        <div slot="header" class="headercard">
            <span class="labelheadercard" >Crear Salida</span>
        </div>
        <div class="row bodycard">
            <div class="container">
                <div class="row" style="margin-top: 3px;">
                    <div class="col-sm-6" >
                        <div class="form-group row ">
                            <label class="el-form-item__label col-md-3" >Compañia</label>
                            <div class="col-md-4 grupolabel">
                                <div class="input-group mb-3" >
                                <el-input size ="small" @blur="desactivar_compania" @focus="activar_compania" v-model="code_compania"  placeholder="">
                                    <el-button v-if="btnactivarcompania && !dialogCompania" slot="append" class="boton" icon="fa fa-clone" @click="loadCompania()"></el-button> 
                                </el-input>
                                </div>
                            </div>
                            <span style="font-size: 11px;margin-top: 5px;">{{descompania}}</span>
                        </div> 
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-6" >
                        <div class="form-group row ">
                            <label class="el-form-item__label col-md-3" >Tipo Movimiento</label>
                            <div class="col-md-4 grupolabel">
                                <div class="input-group mb-3" >
                                <el-input size ="small" @blur="desactivar_tipo_movimiento" @focus="activar_tipo_movimiento" v-model="code_tipo_movimiento"  placeholder="">
                                    <el-button v-if="btnactivartipomovimiento && !dialogTipoMovimiento" slot="append" class="boton" icon="fa fa-clone" @click="loadTipoMovimiento()"></el-button> 
                                </el-input>
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-6" >
                        <div class="form-group row ">
                            <label class="el-form-item__label col-md-3" >Planta</label>
                            <div class="col-md-4 grupolabel">
                                <div class="input-group mb-3" >
                                <el-input size ="small" @blur="desactivar_compania" @focus="activar_compania" v-model="code_compania"  placeholder="">
                                    <el-button v-if="btnactivarcompania && !dialogCompania" slot="append" class="boton" icon="fa fa-clone" @click="loadCompania()"></el-button> 
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
                                <buttons-accions v-on:handleClickInParent="handleClickInParent()"></buttons-accions>
                            </div>
                            <div class="col-md-12" >
                                <div class="row bodycard" style="background: white;margin-top: 0px;">
                                    <el-table
                                        :max-height="sizeScreen"
                                        :data="tableData1" 
                                        stripe  :default-sort = "{prop: 'date', order: 'descending'}"
                                        class="ExcelTable2007">
                                        <el-table-column type="index" width="58">
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
                                            label="Stock">
                                            <template scope="scope">
                                                <el-input-number  v-if="bln_tbl_cantidad  && (scope.row === editing.row) 
                                                && (scope.column.property === editing.column)" @blur="handleBlur(scope.row)" v-focus size="small" v-model="scope.row.cantidad" >
                                                </el-input-number>
                                                <label v-else @click="clickcantidad(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ scope.row.cantidad }}</label>
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
                                            prop="cantidad" sortable width="80"
                                            label="Cantidad Despachada">
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
                                            prop="material_descripcion" sortable width="200"
                                            label="Lugar Entrega">
                                            <template scope="scope">
                                                <el-input  v-if="bln_tbl_material_descripcion  && (scope.row === editing.row) 
                                                && (scope.column.property === editing.column)" @blur="handleBlur(scope.row)" v-focus size="small" v-model="scope.row.material_descripcion" >
                                                </el-input>
                                                <label style="width:100%" v-else @click="clickmaterialdescripcion(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ scope.row.material_descripcion }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            prop="fecha_estimada" sortable  width="100"
                                            label="Fecha Entrega">
                                            <template scope="scope">
                                                <el-date-picker
                                                    type="date"
                                                    v-if="bln_tbl_fecha_estimada  && (scope.row === editing.row) 
                                                && (scope.column.property === editing.column)" @blur="handleBlur(scope.row)" v-focus size="small" v-model="scope.row.fecha_estimada" >
                                                </el-date-picker>
                                                <label style="width:100%" v-else @click="clickfechaestimada(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ getParseDate(scope.row.fecha_estimada) }}</label>
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
                                        
                                    </el-table>
                                </div>
                            </div>
                        </el-card>
                    </div>
                </div>
            </div>
        </div>
    </el-card>
    
</div>  
  
</template>
<script>
import CrearSalidaAlmacenComponent from '@/components/LO-LOGISTICA/almacen/al_salida/al_salida.component'
export default CrearSalidaAlmacenComponent
</script>
<style scoped>

</style>
