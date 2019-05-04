<template>
    <div class="crear-proveedor">
      <ol  style="margin-left: -1.5rem;background: linear-gradient(rgb(229, 241, 247) 0%, rgb(255, 255, 255) 100%);    margin-bottom: 0rem !important;">
        <quickaccessmenu v-on:backPage="backPage($event)"  v-on:reloadpage="reloadpage($event)"/>
    </ol>
     <div >
          <el-card class="box-card">
              <div slot="header" class="headercard">
                 <span class="labelheadercard" > {{titleDescripcion}}</span>                 
              </div>
               <div class="row bodycard" style="margin-top:-6px;">
                  <div class="col-md-8">
                      <div class="form-group row ">
                            <label class="el-form-item__label col-md-2" >Compañia</label>
                            <div class="col-md-2 grupolabel">
                                <div class="input-group mb-2" >
                                    <el-input size ="small" v-model="codigoCompania" disabled>
                                    </el-input>
                                </div>
                            </div>
                            <label class="sinLinea el-form-item__label col-md-4" >{{descripcionCompania}}</label>
                        </div>
                       <div class="form-group row " style="margin-top:8px;">
                        <label class="el-form-item__label col-md-2" >Codigo Proveedor</label>
                        <div class="col-md-2 grupolabel">
                            <div class="input-group mb-2" >
                                <el-input size ="small" v-model="gridSelectedProveedor.strVendor_NO" >                                   
                                </el-input>
                            </div>
                        </div>  
                        <label class="el-form-item__label col-md-2" >Pais</label>
                            <div class="col-md-2 grupolabel">
                                <div class="input-group mb-2" >
                                    <el-input size ="small" @blur="desactivar_Pais" @focus="activar_Pais">                            
                                        <el-button v-if="btnactivarpais && !paisVisible" slot="append" class="boton" icon="fa fa-clone" @click="paisDialog()"></el-button> 
                                    </el-input>
                                </div>
                            </div>                      
                        </div>
                  </div>
              </div>
              <br>
            <div class="row">
                    <div class="col-sm-12" >
                        <el-card class="box-card" style="margin-left: -10px;">
                            <div slot="header" class="headercard" style="margin-top: -4px;">
                                <buttons-accions  v-on:validarView="EditarProveedor()" v-on:Limpiar="Limpiar" v-on:Buscar="Buscar" v-on:siguiente="siguiente()" v-on:anterior="anterior()" v-on:EliminarItem="EliminarItem()"></buttons-accions>
                            </div>
                            
                            <div class="col-md-12" >
                                <div class="row bodycard" style="background: white;margin-top: 0px;">
                                   <el-table
                                    :data="tableData"
                                    :max-height="sizeScreen"
                                    stripe  :default-sort = "{prop: 'date', order: 'descending'}"
                                    style="width: 100%; cursor: pointer;" class="ExcelTable2007"
                                    @header-click="headerclick"
                                    highlight-current-row
                                    height="250"
                                    @current-change="proveedorSelect">
                                    <el-table-column type="index" label="Linea" width="38">                                        
                                    </el-table-column>
                                    <el-table-column  :render-header="filterstrVendor_NO" prop="strVendor_NO" label="Codigo" width="100">
                                    </el-table-column> 
                                    <el-table-column  :render-header="filterstrTax_ID" prop="strTax_ID" label="RUC/DNI" width="180">
                                    </el-table-column> 
                                    <el-table-column :render-header="filterstrVendor_Desc" prop="strVendor_Desc" label="Nombre proveedor" width="260">
                                    </el-table-column>                                      
                                    <el-table-column :render-header="filterintIdCountry_ID" prop="intIdCountry_ID.strCountry_Name" label="Pais" width="100">
                                    </el-table-column> 
                                    <el-table-column :render-header="filterstrProvince" prop="strProvince" label="Provincia" style="width: 70% !important;">
                                    </el-table-column> 
                                    <el-table-column  :render-header="filterstrDistrict" prop="strDistrict" label="Distrito" width="180">
                                    </el-table-column>  
                                    <el-table-column :render-header="filterstrAddress" prop="strAddress" label="Dirección"  width="260">
                                    </el-table-column> 
                                    </el-table>
                                </div>
                            </div>
                        </el-card>
                    </div>
                </div>
          </el-card>
      </div>
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
    <!--DIALOG BUSQUEDA PAIS-->
    <el-dialog title="Busqueda Pais" :visible.sync="paisVisible" @close="handleClosePais" size="small" >
      <bpais v-on:PaisSeleccionado="paisSelect($event)" v-on:closePais="handleClosePais()">
      </bpais>
    </el-dialog>

     <b-modal ref="myModalRef" hide-footer title="Buscar" size="sm"  v-model="dialogBusquedaFilter" @keydown.native.enter="btnBuscar">
        <div style="height:85px">
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
    <b-modal ref="myModalRef" hide-footer title="Eliminar" size="sm"  v-model="dialogEliminar" @keydown.native.enter="confirmaraceptar">
      <div style="height:85px"> 
        <img src="../../../../images/tacho.png" style="width:14px; height:15px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.3rem;"/>
        <span style="font-size:13px">¿Desea Eliminar el documento?</span>
      </div>
      <footer class="modal-footer">
        <img src="../../../../images/check.png" style="width:13px; height:15px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.6rem;" @click="btnEliminar"/>
        <img src="../../../../images/close.png" style="width:17px; height:15px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.6rem;" @click="dialogEliminar = false"/>
      </footer>
    </b-modal>
    </div>
</template>
<script>
import ModificarProveedorComponent from '@/components/FI-FINANZAS/proveedor/modificar-proveedor/modificar-proveedor.component'
export default ModificarProveedorComponent
</script>
<style scoped>
</style>