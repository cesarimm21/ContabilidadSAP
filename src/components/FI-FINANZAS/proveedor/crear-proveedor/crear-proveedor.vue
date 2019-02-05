<template>
  <div class="crear-proveedor">
      <div >
          <el-card class="box-card">
              <div slot="header" class="headercard">
                  <span class="labelheadercard" > </span>
                  <el-button slot="append" style="padding: 3px 3px !important;background: #fff5c4;
                background: -webkit-gradient(left top, left bottom, color-stop(0%, #fff5c4), color-stop(100%, #ffee9f));
                background: -webkit-gradient(linear, left top, left bottom, from(#fff5c4), to(#ffee9f));
                background: linear-gradient(to bottom, #fff5c4 0%, #ffee9f 100%);" icon="fa fa-floppy-o"
                     class="buttonSave" 
                     @click="SaveProveedor()"      
                    >Guardar</el-button>
              </div>
              <div class="row bodycard">
                  <div class="col-md-6">
                       <div class="form-group row">
                        <label class="el-form-item__label col-md-3" >Proveedor</label>
                        <div class="col-md-3 grupolabel">
                            <div class="input-group mb-3" >
                            <el-input size ="small"   placeholder="">
                                <el-button slot="append" style="padding: 3px 3px !important;background: #fff5c4;
                background: -webkit-gradient(left top, left bottom, color-stop(0%, #fff5c4), color-stop(100%, #ffee9f));
                background: -webkit-gradient(linear, left top, left bottom, from(#fff5c4), to(#ffee9f));
                background: linear-gradient(to bottom, #fff5c4 0%, #ffee9f 100%);" icon="fa fa-clone"
                                @click="loadProveedores()"
                                ></el-button> 
                            </el-input>
                            </div>
                        </div>                        
                        </div>
                        <div class="form-group row Second">
                            <label class="el-form-item__label col-md-3" >Compañia</label>
                            <div class="col-md-3 grupolabel">
                                <div class="input-group mb-3" >
                                <el-input size ="small"   placeholder="">
                    
                                </el-input>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row Third">
                            <label class="el-form-item__label col-md-3" >Organización compra</label>
                            <div class="col-md-3 grupolabel">
                                <div class="input-group mb-3" >
                                <el-input size ="small"   placeholder="">
                    
                                </el-input>
                                </div>
                            </div>
                        </div>

                  </div>
              </div>
          </el-card>
          <el-card class="box-card">
              <div slot="header" class="headercard">
                  <span class="labelheadercard" >Nuevo Proveedor</span>
              </div>
              <div class="row bodycard">
                  <div class="col-md-6">                       
                        <div class="form-group row" style="height: 40px;">
                            <label class="el-form-item__label col-md-3" >Compañia</label>
                            <div class="col-md-3 grupolabel">
                                <div class="input-group mb-3" >
                                <el-select v-model="value" class="selected">
                                    <el-option
                                    class="opciones"
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                                </div>
                            </div>
                            <label class="el-form-item__label col-md-2" >Codigo</label>
                            <div class="col-md-4 grupolabel">
                                <div class="input-group mb-5" >
                                <el-input size ="small"  v-model="value" placeholder="">                    
                                </el-input>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row ">
                            <label class="el-form-item__label col-md-3" >Categoria</label>
                            <div class="col-md-3 grupolabel">
                                <div class="input-group mb-3" >
                                <el-select v-model="value1" class="selected"
                                @change="selectCategoria($event)">
                                    <el-option
                                    class="opciones"
                                    v-for="item in categoria"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                    >
                                    </el-option>
                                </el-select>
                                </div>
                            </div>
                        </div>                      
                  </div>
                  <div class="col-md-12" v-if="VisibleForName">
                       <div class="form-group row " >
                            <label class="el-form-item__label col-md-1" >{{nameTipoJoN}}</label>
                            <div class="col-md-3 grupolabel">
                                <div class="input-group mb-3" >
                                <el-input size ="small" v-model="Proveedor.strVendor_Desc"  placeholder="">
                    
                                </el-input>
                                </div>
                            </div>
                            <label class="el-form-item__label col-md-2" v-if="ApellidosShow">Apellido Paterno</label>
                            <div class="col-md-2 grupolabel" v-if="ApellidosShow">
                                <div class="input-group mb-2" >
                                <el-input size ="small" v-model="Proveedor.strLastName"  placeholder="">
                    
                                </el-input>
                                </div>
                            </div>
                             <label class="el-form-item__label col-md-2" v-if="ApellidosShow">Apellido Materno</label>
                            <div class="col-md-2 grupolabel" v-if="ApellidosShow">
                                <div class="input-group mb-2" >
                                <el-input size ="small" v-model="Proveedor.SurName"  placeholder="">
                    
                                </el-input>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="el-form-item__label col-md-1" >{{RucOrDni}}</label>
                            <div class="col-md-2 grupolabel">
                                <div class="input-group mb-2" >
                                <el-input size ="small" v-model="Proveedor.TAX_ID"  placeholder="">
                    
                                </el-input>
                                </div>
                            </div>
                            <div class="col-md-1 "></div>
                            <label class="el-form-item__label col-md-2" >Tipo documento</label>
                            <div class="col-md-1 grupolabel">
                                <div class="input-group mb-1" >
                                <el-input size ="small" v-model="Proveedor.intIdDoc" type="text"  @blur="desactivar_proveedor" @focus="activar_proveedor">
                                        <el-button v-if="btnactivarproveedor" slot="append" style="padding: 3px 3px !important;background: #fff5c4;
                        background: -webkit-gradient(left top, left bottom, color-stop(0%, #fff5c4), color-stop(100%, #ffee9f));
                        background: -webkit-gradient(linear, left top, left bottom, from(#fff5c4), to(#ffee9f));
                        background: linear-gradient(to bottom, #fff5c4 0%, #ffee9f 100%);" icon="fa fa-clone"></el-button> 
                                    </el-input>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row ">
                            <label class="el-form-item__label col-md-1" >Pais</label>
                            <div class="col-md-1 grupolabel">
                                <div class="input-group mb-1" >
                                <el-input size ="small" v-model="Proveedor.strCountry" type="text"  @blur="desactivar_proveedor" @focus="activar_proveedor">
                                        <el-button v-if="btnactivarproveedor" slot="append" style="padding: 3px 3px !important;background: #fff5c4;
                        background: -webkit-gradient(left top, left bottom, color-stop(0%, #fff5c4), color-stop(100%, #ffee9f));
                        background: -webkit-gradient(linear, left top, left bottom, from(#fff5c4), to(#ffee9f));
                        background: linear-gradient(to bottom, #fff5c4 0%, #ffee9f 100%);" icon="fa fa-clone"></el-button> 
                                    </el-input>
                                </div>
                            </div>
                            <label class="el-form-item__label col-md-1" ></label>
                            <div class="col-md-1 grupolabel"></div>
                            <label class="el-form-item__label col-md-1" >Departamento</label>
                            <div class="col-md-1 grupolabel">
                                <div class="input-group mb-1" >
                                <el-input size ="small" v-model="Proveedor.intIdDepartamento"  placeholder="">
                    
                                </el-input>
                                </div>
                            </div> 
                            <label class="el-form-item__label col-md-1" ></label>
                            <div class="col-md-1 grupolabel"></div>                           
                        </div>
                        <div class="form-group row ">
                            <label class="el-form-item__label col-md-1" >Provincia</label>
                            <div class="col-md-2 grupolabel">
                                <div class="input-group mb-2" >
                                <el-input size ="small" v-model="Proveedor.strProvince"  placeholder="">
                    
                                </el-input>
                                </div>
                            </div>
                            <div class="col-md-1 grupolabel"></div>
                            <label class="el-form-item__label col-md-1" >Distrito</label>
                            <div class="col-md-2 grupolabel">
                                <div class="input-group mb-2" >
                                <el-input size ="small" v-model="Proveedor.strDistrict"  placeholder="">
                    
                                </el-input>
                                </div>
                            </div> 
                            <div class="col-md-1 grupolabel"></div>   
                            <label class="el-form-item__label col-md-2" >Codigo postal</label>
                            <div class="col-md-1 grupolabel">
                                <div class="input-group mb-1" >
                                <el-input size ="small" v-model="Proveedor.strCode_Postal"  placeholder="">
                    
                                </el-input>
                                </div>
                            </div>                         
                        </div>
                        <div class="form-group row ">
                            <label class="el-form-item__label col-md-1" >Avenida</label>
                            <div class="col-md-3 grupolabel">
                                <div class="input-group mb-3" >
                                <el-input size ="small"  v-model="AddressCalle" placeholder="">
                    
                                </el-input>
                                </div>
                            </div>
                            <label class="el-form-item__label col-md-1" >Numero</label>
                            <div class="col-md-1 grupolabel">
                                <div class="input-group mb-1" >
                                <el-input size ="small" v-model="AddressNumero"  placeholder="">
                    
                                </el-input>
                                </div>
                            </div> 
                            <label class="el-form-item__label col-md-1" >Depto</label>
                            <div class="col-md-1 grupolabel">
                                <div class="input-group mb-1" >
                                <el-input size ="small" v-model="AddressDprto"  placeholder="">                    
                                </el-input>
                                </div>
                            </div>   
                            <label class="el-form-item__label col-md-1" >Of.</label>
                            <div class="col-md-1 grupolabel">
                                <div class="input-group mb-1" >
                                <el-input size ="small" v-model="AddressOf"  placeholder="">                    
                                </el-input>
                                </div>
                            </div>  
                            <label class="el-form-item__label col-md-1" >Manzana</label>
                            <div class="col-md-1 grupolabel">
                                <div class="input-group mb-1" >
                                <el-input size ="small"  v-model="AddressLote" placeholder="">                    
                                </el-input>
                                </div>
                            </div>                       
                        </div>
                        <div class="form-group row ">
                            <label class="el-form-item__label col-md-1" >Banco</label>
                            <div class="col-md-1 grupolabel">
                                <div class="input-group mb-1" >
                                <el-input size ="small" v-model="Proveedor.strBank_Code" type="text"    @blur="desactivar_proveedor" @focus="activar_proveedor">
                                        <el-button v-if="btnactivarproveedor" slot="append" style="padding: 3px 3px !important;background: #fff5c4;
                        background: -webkit-gradient(left top, left bottom, color-stop(0%, #fff5c4), color-stop(100%, #ffee9f));
                        background: -webkit-gradient(linear, left top, left bottom, from(#fff5c4), to(#ffee9f));
                        background: linear-gradient(to bottom, #fff5c4 0%, #ffee9f 100%);" icon="fa fa-clone"></el-button> 
                                    </el-input>
                                </div>
                            </div>
                            <label class="el-form-item__label col-md-1" ></label>
                            <div class="col-md-1 grupolabel"></div>
                            <label class="el-form-item__label col-md-2" >Cuenta bancaria</label>
                            <div class="col-md-2 grupolabel">
                                <div class="input-group mb-2" >
                                <el-input size ="small" v-model="Proveedor.strBankAcct_Local_NO"  placeholder="">
                    
                                </el-input>
                                </div>
                            </div> 
                            <label class="el-form-item__label col-md-1" >Moneda</label>
                            <div class="col-md-1 grupolabel">
                                <div class="input-group mb-1" >
                                <el-input size ="small" v-model="Proveedor.strCurrency" type="text"    @blur="desactivar_proveedor" @focus="activar_proveedor">
                                        <el-button v-if="btnactivarproveedor" slot="append" style="padding: 3px 3px !important;background: #fff5c4;
                        background: -webkit-gradient(left top, left bottom, color-stop(0%, #fff5c4), color-stop(100%, #ffee9f));
                        background: -webkit-gradient(linear, left top, left bottom, from(#fff5c4), to(#ffee9f));
                        background: linear-gradient(to bottom, #fff5c4 0%, #ffee9f 100%);" icon="fa fa-clone"></el-button> 
                                    </el-input>
                                </div>
                            </div>  
                            <label class="el-form-item__label col-md-1" ></label>                     
                        </div>
                        <div class="form-group row">
                            <label class="el-form-item__label col-md-1" >Banco Coorporativo</label>
                            <div class="col-md-1 grupolabel">
                                <div class="input-group mb-1" >
                                <el-input size ="small" v-model="Proveedor.strBank_Corp_Cod" type="text"    @blur="desactivar_proveedor" @focus="activar_proveedor">
                                        <el-button v-if="btnactivarproveedor" slot="append" style="padding: 3px 3px !important;background: #fff5c4;
                        background: -webkit-gradient(left top, left bottom, color-stop(0%, #fff5c4), color-stop(100%, #ffee9f));
                        background: -webkit-gradient(linear, left top, left bottom, from(#fff5c4), to(#ffee9f));
                        background: linear-gradient(to bottom, #fff5c4 0%, #ffee9f 100%);" icon="fa fa-clone"></el-button> 
                                    </el-input>
                                </div>
                            </div>
                            <label class="el-form-item__label col-md-1" ></label>
                            <div class="col-md-1 grupolabel"></div>
                            <label class="el-form-item__label col-md-2" >Cuenta Coorporativo</label>
                            <div class="col-md-2 grupolabel">
                                <div class="input-group mb-2" >
                                <el-input size ="small" v-model="Proveedor.strBankAcct_Corp_NO"  placeholder="">
                    
                                </el-input>
                                </div>
                            </div> 
                            <label class="el-form-item__label col-md-1" >Moneda</label>
                            <div class="col-md-1 grupolabel">
                                <div class="input-group mb-1" >
                                <el-input size ="small" v-model="Proveedor.strCurrency_Corp" type="text"    @blur="desactivar_proveedor" @focus="activar_proveedor">
                                        <el-button v-if="btnactivarproveedor" slot="append" style="padding: 3px 3px !important;background: #fff5c4;
                        background: -webkit-gradient(left top, left bottom, color-stop(0%, #fff5c4), color-stop(100%, #ffee9f));
                        background: -webkit-gradient(linear, left top, left bottom, from(#fff5c4), to(#ffee9f));
                        background: linear-gradient(to bottom, #fff5c4 0%, #ffee9f 100%);" icon="fa fa-clone"></el-button> 
                                    </el-input>
                                </div>
                            </div>  
                            <label class="el-form-item__label col-md-1" ></label>  
                            
                        </div>
                        <div class="form-group row">
                            <label class="el-form-item__label col-md-1" >Otro banco</label>
                            <div class="col-md-1 grupolabel">
                                <div class="input-group mb-1" >
                                <el-input size ="small" v-model="Proveedor.strBank_Other_Cod" type="text"    @blur="desactivar_proveedor" @focus="activar_proveedor">
                                        <el-button v-if="btnactivarproveedor" slot="append" style="padding: 3px 3px !important;background: #fff5c4;
                        background: -webkit-gradient(left top, left bottom, color-stop(0%, #fff5c4), color-stop(100%, #ffee9f));
                        background: -webkit-gradient(linear, left top, left bottom, from(#fff5c4), to(#ffee9f));
                        background: linear-gradient(to bottom, #fff5c4 0%, #ffee9f 100%);" icon="fa fa-clone"></el-button> 
                                    </el-input>
                                </div>
                            </div>
                            <label class="el-form-item__label col-md-1" ></label>
                            <div class="col-md-1 grupolabel"></div>
                            <label class="el-form-item__label col-md-2" >Cuenta Detraccion</label>
                            <div class="col-md-2 grupolabel">
                                <div class="input-group mb-2" >
                                <el-input size ="small" v-model="Proveedor.strBankAcct_Other_NO"  placeholder="">
                    
                                </el-input>
                                </div>
                            </div>  
                            
                        </div>
                        <div class="form-group row">
                            <label class="el-form-item__label col-md-1" >Banco Foraneo</label>
                            <div class="col-md-1 grupolabel">
                                <div class="input-group mb-1" >
                                <el-input size ="small" v-model="Proveedor.strFore_Bank_Code" type="text"    @blur="desactivar_proveedor" @focus="activar_proveedor">
                                        <el-button v-if="btnactivarproveedor" slot="append" style="padding: 3px 3px !important;background: #fff5c4;
                        background: -webkit-gradient(left top, left bottom, color-stop(0%, #fff5c4), color-stop(100%, #ffee9f));
                        background: -webkit-gradient(linear, left top, left bottom, from(#fff5c4), to(#ffee9f));
                        background: linear-gradient(to bottom, #fff5c4 0%, #ffee9f 100%);" icon="fa fa-clone"></el-button> 
                                    </el-input>
                                </div>
                            </div>
                            <label class="el-form-item__label col-md-1" ></label>
                            <div class="col-md-1 grupolabel"></div>
                            <label class="el-form-item__label col-md-2" >Cuenta bancaria</label>
                            <div class="col-md-2 grupolabel">
                                <div class="input-group mb-2" >
                                <el-input size ="small" v-model="Proveedor.strFore_AccBank_NO"  placeholder="">
                    
                                </el-input>
                                </div>
                            </div> 
                            <label class="el-form-item__label col-md-1" >Moneda extranjera</label>
                            <div class="col-md-1 grupolabel">
                                <div class="input-group mb-1" >
                                <el-input size ="small" v-model="Proveedor.strFore_Currency_Cod" type="text"    @blur="desactivar_proveedor" @focus="activar_proveedor">
                                        <el-button v-if="btnactivarproveedor" slot="append" style="padding: 3px 3px !important;background: #fff5c4;
                        background: -webkit-gradient(left top, left bottom, color-stop(0%, #fff5c4), color-stop(100%, #ffee9f));
                        background: -webkit-gradient(linear, left top, left bottom, from(#fff5c4), to(#ffee9f));
                        background: linear-gradient(to bottom, #fff5c4 0%, #ffee9f 100%);" icon="fa fa-clone"></el-button> 
                                    </el-input>
                                </div>
                            </div>  
                            <label class="el-form-item__label col-md-1" ></label>  
                            
                        </div>
                        <div class="form-group row">
                            <label class="el-form-item__label col-md-1" >Retención</label>
                            <div class="col-md-1 grupolabel">
                                <div class="input-group mb-1" >
                                <el-input size ="small" v-model="Proveedor.strRetention_Cod"  placeholder="">
                    
                                </el-input>
                                </div>
                            </div>  
                            <label class="el-form-item__label col-md-1" >% Retención</label>
                            <div class="col-md-1 grupolabel">
                                <div class="input-group mb-1" >
                                <el-input type="number" size ="small" v-model="Proveedor.fltRetention_Porcen"  placeholder="">
                    
                                </el-input>
                                </div>
                            </div>  
                            <label class="el-form-item__label col-md-1" >Detracción</label>
                            <div class="col-md-1 grupolabel">
                                <div class="input-group mb-1" >
                                <el-input size ="small" v-model="Proveedor.strDetraccion_Cod"  placeholder="">
                    
                                </el-input>
                                </div>
                            </div>  
                            <label class="el-form-item__label col-md-1" >%Detracción</label>
                            <div class="col-md-1 grupolabel">
                                <div class="input-group mb-1" >
                                <el-input type="number" size ="small" v-model="Proveedor.fltDetraccion_Porcen"  placeholder="">
                    
                                </el-input>
                                </div>
                            </div>   
                            
                        </div>
                        
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
                height="250">
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
  </div>  
  
</template>
<script>

import CrearProveedorComponent from '@/components/FI-FINANZAS/proveedor/crear-proveedor/crear-proveedor.component'
export default CrearProveedorComponent
</script>
<style scoped>
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
.selected {
    width: 100%;
    padding-left: 0px;
    height: 22px !important;
}
.selected .el-input__inner {
    cursor: pointer;
    padding-right: 35px;
    height: 22px !important;
}


</style>
