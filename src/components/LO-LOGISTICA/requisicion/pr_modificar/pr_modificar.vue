<template>
  <div class="modificar-pr">
      <div >
          <el-card class="box-card">
              <div slot="header" class="headercard">
                  <span class="labelheadercard" >Crear Requisición</span>
              </div>
              <div class="row bodycard">
                <div class="col-md-6">
                    <div class="form-group row ">
                        <label class="el-form-item__label col-md-3" >Compañia</label>
                        <div class="col-md-3 grupolabel">
                            <div class="input-group mb-3" >
                            <el-input size ="small" @blur="desactivar_compania" @focus="activar_compania"   placeholder="">
                                <el-button v-if="btnactivarcompania && !dialogCompania" slot="append" class="boton" icon="fa fa-clone" @click="loadCompania()"></el-button> 
                            </el-input>
                            </div>
                        </div>
                    </div>
                    <div class="form-group row Second">
                        <label class="el-form-item__label col-md-3" >Tipo requisición</label>
                        <div class="col-md-3 grupolabel">
                            <div class="input-group mb-3" >
                                <el-select v-model="value" placeholder="Select" @visible-change="activar_tipo_requisicion">
                                    <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>    
                        <label class="el-form-item__label col-md-2" >Almacén</label>
                        <div class="col-md-3 grupolabel">
                            <div class="input-group mb-3" >
                            <el-input size ="small" @blur="desactivar_almacen" @focus="activar_almacen"  placeholder="">
                                <el-button v-if="btnactivaralmacen && !dialogAlmacen" slot="append" class="boton" icon="fa fa-clone" @click="loadAlmacen()"></el-button> 
                            </el-input>
                            </div>
                        </div>                    
                    </div>    
                </div>
                <div class="col-md-10">
                    <div class="form-group row Third">
                        <label class="el-form-item__label col-md-2" >Descripción</label>
                        <div class="col-md-10 grupolabel" style="margin-left: -17px;">
                            <div class="input-group mb-9">
                                <el-input size ="small" @focus="activar_descripcion"   placeholder="">                
                                </el-input>
                            </div>
                        </div>
                    </div>
                </div>
                <br/>
                <div class="col-md-12" >
                    <el-card class="box-card" style="margin-left: -10px;">
                        <div slot="header" class="headercard" style="margin-top: -4px;">
                            <buttons-accions v-on:handleClickInParent="handleClickInParent()"></buttons-accions>
                        </div>
                        <div class="col-md-12" >
                            <div class="row bodycard" style="background: white;    margin-top: -11px;">
                                <el-table
                                    :data="tableData" 
                                    stripe  :default-sort = "{prop: 'date', order: 'descending'}"
                                    class="ExcelTable2007">
                                    <!-- <el-table-column sortable  prop="date" label="Fecha">
                                        <template scope="scope">
                                            <el-input  v-if="editingb  && (scope.row === editing.row) 
                                            && (scope.column.property === editing.column)" @blur="handleBlur(scope.row)" v-focus size="small" v-model="scope.row.date" ></el-input>
                                            <span v-else @click="alerta(scope.row,scope.row.edit,scope.column.property)">{{ scope.row.date }}</span>
                                        </template>
                                    </el-table-column>  
                                    <el-table-column sortable prop="name" label="Fecha">
                                        <template scope="scope">
                                            <el-input  v-if="editingb  && (scope.row === editing.row) 
                                            && (scope.column.property === editing.column)" @blur="handleBlur(scope.row)" v-focus size="small" v-model="scope.row.name" >
                                            <el-button slot="append" style="boton" icon="fa fa-clone" @click="abrirpopup()"></el-button>  
                                            </el-input>
                                            <span v-else @click="alerta(scope.row,scope.row.edit,scope.column.property)">{{ scope.row.name }}</span>
                                        </template>
                                    </el-table-column>   -->
                                    <el-table-column type="index" width="58">
                                    </el-table-column>
                                    <el-table-column
                                        prop="name" sortable min-width="200"
                                        label="Categoria cuenta">
                                    </el-table-column>
                                    <el-table-column
                                        prop="name" sortable  min-width="200"
                                        label="Categoria linea">
                                    </el-table-column>
                                    <el-table-column
                                        prop="name" sortable
                                        label="Cuenta contable">
                                    </el-table-column>
                                    <el-table-column
                                        prop="name" sortable 
                                        label="Material">
                                    </el-table-column>
                                    <el-table-column
                                        prop="name" sortable 
                                        label="Descripción">
                                    </el-table-column>
                                    <el-table-column
                                        prop="name" sortable
                                        label="Cantidad">
                                    </el-table-column>
                                    <el-table-column
                                        prop="name" sortable 
                                        label="UM">
                                    </el-table-column>
                                    <el-table-column
                                        prop="name" sortable
                                        label="Proveedor">
                                    </el-table-column>
                                    <el-table-column
                                        prop="name" sortable 
                                        label="Moneda">
                                    </el-table-column>
                                    <el-table-column
                                        prop="name" sortable  
                                        label="Prioridad">
                                    </el-table-column>
                                    <el-table-column
                                        prop="name" sortable  
                                        label="Fecha estimada">
                                    </el-table-column>
                                    <el-table-column
                                        prop="name" sortable  
                                        label="Centro costos">
                                    </el-table-column>
                                </el-table>
                            </div>
                        </div>
                    </el-card>
                </div>
                <br/>
                <div class="col-md-12" style="margin-top: 10px;">
                    <el-tabs type="border-card">
                        <el-tab-pane>
                            <span slot="label"><i class="el-icon-date"></i> Servicio</span>
                            Route 
                        </el-tab-pane>
                        <el-tab-pane label="Datos Material">
                            <div class="col-md-6">
                                <div class="form-group row ">
                                    <div class="col-md-5">
                                        <div class="form-group row ">
                                            <label class="el-form-item__label col-md-3" >Código</label>
                                            <div class="col-md-7 grupolabel">
                                                <div class="input-group mb-3" >
                                                <el-input size ="small" placeholder="">
                                                </el-input>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group row ">
                                            <label class="el-form-item__label col-md-4" >Descripción</label>
                                            <div class="col-md-8 grupolabel">
                                                <div class="input-group mb-8" >
                                                <el-input size ="small" placeholder="">
                                                </el-input>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group row ">
                                    <div class="col-md-5">
                                        <div class="form-group row ">
                                            <label class="el-form-item__label col-md-3" >Nombre</label>
                                            <div class="col-md-7 grupolabel">
                                                <div class="input-group mb-7" >
                                                <el-input size ="small" placeholder="">
                                                </el-input>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="Cantidad/Fecha">
                             <div class="col-md-9">
                                <div class="form-group row ">
                                    <div class="col-md-5">
                                        <div class="form-group row ">
                                            <label class="el-form-item__label col-md-5" >Cantidad</label>
                                            <div class="col-md-5 grupolabel">
                                                <div class="input-group mb-2" >
                                                <el-input size ="small" placeholder="">
                                                </el-input>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group row ">
                                            <label class="el-form-item__label col-md-5" >Fecha Entrega</label>
                                            <div class="col-md-5 grupolabel">
                                                <div class="input-group mb-2" >
                                                <el-input size ="small" placeholder="">
                                                </el-input>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group row ">
                                    <div class="col-md-5">
                                        <div class="form-group row ">
                                            <label class="el-form-item__label col-md-5" >Cantidad Ordenada</label>
                                            <div class="col-md-5 grupolabel">
                                                <div class="input-group mb-2" >
                                                <el-input size ="small" placeholder="">
                                                </el-input>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                     <div class="col-md-6">
                                        <div class="form-group row ">
                                            <label class="el-form-item__label col-md-5" >Fecha Requerida</label>
                                            <div class="col-md-5 grupolabel">
                                                <div class="input-group mb-2" >
                                                <el-input size ="small" placeholder="">
                                                </el-input>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group row ">
                                    <div class="col-md-5">
                                        <div class="form-group row ">
                                            <label class="el-form-item__label col-md-5" >Cantidad Pendiente</label>
                                            <div class="col-md-5 grupolabel">
                                                <div class="input-group mb-2" >
                                                <el-input size ="small" placeholder="">
                                                </el-input>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group row ">
                                            <label class="el-form-item__label col-md-5" >Fecha Modificación</label>
                                            <div class="col-md-5 grupolabel">
                                                <div class="input-group mb-2" >
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
                            <div class="col-md-6">
                                <div class="form-group row ">
                                    <div class="col-md-5">
                                        <div class="form-group row ">
                                            <label class="el-form-item__label col-md-4" >Precio</label>
                                            <div class="col-md-7 grupolabel">
                                                <div class="input-group mb-2" >
                                                <el-input size ="small" placeholder="">
                                                </el-input>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group row ">
                                    <div class="col-md-5">
                                        <div class="form-group row ">
                                            <label class="el-form-item__label col-md-4" >Cantidad</label>
                                            <div class="col-md-7 grupolabel">
                                                <div class="input-group mb-2" >
                                                <el-input size ="small" placeholder="">
                                                </el-input>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                 <div class="form-group row ">
                                    <div class="col-md-5">
                                        <div class="form-group row ">
                                            <label class="el-form-item__label col-md-4" >Total</label>
                                            <div class="col-md-7 grupolabel">
                                                <div class="input-group mb-2" >
                                                <el-input size ="small" placeholder="">
                                                </el-input>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="Cuenta Contable">
                             <div class="col-md-10">
                                <div class="form-group row ">
                                    <div class="col-md-5">
                                        <div class="form-group row ">
                                            <label class="el-form-item__label col-md-4" >G/L Cuenta</label>
                                            <div class="col-md-5 grupolabel">
                                                <div class="input-group mb-2" >
                                                <el-input size ="small" placeholder="">
                                                </el-input>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group row ">
                                    <div class="col-md-5">
                                        <div class="form-group row ">
                                            <label class="el-form-item__label col-md-4" >WBS Element</label>
                                            <div class="col-md-5 grupolabel">
                                                <div class="input-group mb-2" >
                                                <el-input size ="small" placeholder="">
                                                </el-input>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                 <div class="form-group row ">
                                    <div class="col-md-5">
                                        <div class="form-group row ">
                                            <label class="el-form-item__label col-md-4" >Centro Costo</label>
                                            <div class="col-md-5 grupolabel">
                                                <div class="input-group mb-2" >
                                                <el-input size ="small" placeholder="">
                                                </el-input>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="Proveedor/Estado">
                            <div class="col-md-10">
                                <div class="form-group row ">
                                    <div class="col-md-5">
                                        <div class="form-group row ">
                                            <label class="el-form-item__label col-md-5" >Código Proveedor</label>
                                            <div class="col-md-5 grupolabel">
                                                <div class="input-group mb-2" >
                                                <el-input size ="small" placeholder="">
                                                </el-input>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-5">
                                        <div class="form-group row ">
                                            <label class="el-form-item__label col-md-5" >Nombre Proveedor</label>
                                            <div class="col-md-7 grupolabel">
                                                <div class="input-group mb-7" >
                                                <el-input size ="small" placeholder="">
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
          </el-card>
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
                stripe  :default-sort = "{prop: 'date', order: 'descending'}"
                style="width: 100%" class="ExcelTable2007"
                height="250"
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
    <el-dialog title="Busqueda compañia"  :visible.sync="dialogCompania" @close="closeCompania" size="small" >
      <bcompania>
      </bcompania>
    </el-dialog>
     <!--DIALOG BUSQUEDA PROVEEDOR-->
    <el-dialog title="Busqueda proveedor"  :visible.sync="dialogProveedor" @close="closeProveedor" size="small" >
      <bproveedor>
      </bproveedor>
    </el-dialog>
    <!--DIALOG BUSQUEDA ALMACEN-->
    <el-dialog title="Busqueda almacen"  :visible.sync="dialogAlmacen" @close="closeAlmacen" size="small" >
      <balmacen>
      </balmacen>
    </el-dialog>

    
  </div>  
  
</template>
<script>
import ModificarPRComponent from '@/components/LO-LOGISTICA/requisicion/pr_modificar/pr_modificar.component'
export default ModificarPRComponent
</script>
<style scoped>
.el-table_1_column_1{
    background-color: #E4ECF7;
    text-align: center;
    border: 1px solid #9EB6CE;
    border-width: 0px 1px 1px 0px;
}

.Second{
    margin-top: -15px;
}
.Third{
    margin-top: -15px;
}
.el-table .selected-row {
  background: rgb(206, 85, 85);
}
.el-table--striped .el-table__body tr.el-table__row--striped.current-row td {
    background: #fff5c4;
    background: -webkit-gradient(left top, left bottom, color-stop(0%, #fff5c4), color-stop(100%, #ffee9f));
    background: -webkit-gradient(linear, left top, left bottom, from(#fff5c4), to(#ffee9f));
    background: linear-gradient(to bottom, #fff5c4 0%, #ffee9f 100%);
}
</style>
