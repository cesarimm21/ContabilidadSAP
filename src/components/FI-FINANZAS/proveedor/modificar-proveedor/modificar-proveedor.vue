<template>
    <div class="crear-proveedor">
      <ol  style="margin-left: -1.5rem;background: linear-gradient(rgb(229, 241, 247) 0%, rgb(255, 255, 255) 100%);    margin-bottom: 0rem !important;">
        <quickaccessmenu v-on:backPage="backPage($event)"  v-on:reloadpage="reloadpage($event)"/>
    </ol>
     <div >
          <el-card class="box-card">
              <div slot="header" class="headercard">
                 <span class="labelheadercard" > Modificar Proveedor</span>                 
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
                        </div>
                  </div>
              </div>
              <br>
            <div class="row">
                    <div class="col-sm-12" >
                        <el-card class="box-card" style="margin-left: -10px;">
                            <div slot="header" class="headercard" style="margin-top: -4px;">
                                <buttons-accions  v-on:validarView="EditarProveedor()"></buttons-accions>
                            </div>
                            
                            <div class="col-md-12" >
                                <div class="row bodycard" style="background: white;margin-top: 0px;">
                                   <el-table
                                    :data="gridProveedor"
                                    :max-height="sizeScreen"
                                    stripe  :default-sort = "{prop: 'date', order: 'descending'}"
                                    style="width: 100%; cursor: pointer;" class="ExcelTable2007"
                                    highlight-current-row
                                    height="250"
                                    @current-change="proveedorSelect">
                                    <el-table-column   prop="strVendor_NO" label="Codigo" width="100">
                                    </el-table-column> 
                                    <el-table-column   prop="strTax_ID" label="RUC/DNI" width="180">
                                    </el-table-column> 
                                    <el-table-column  prop="strVendor_Desc" label="Nombre proveedor" width="260">
                                    </el-table-column>                                      
                                    <el-table-column  prop="strProvince" label="Provincia" style="width: 70% !important;">
                                    </el-table-column> 
                                    <el-table-column   prop="strDistrict" label="Distrito" width="180">
                                    </el-table-column>  
                                    <el-table-column  prop="strVendor_Desc" label="Dirección"  width="260">
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
    </div>
</template>
<script>
import ModificarProveedorComponent from '@/components/FI-FINANZAS/proveedor/modificar-proveedor/modificar-proveedor.component'
export default ModificarProveedorComponent
</script>
<style scoped>
</style>