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
                      <div class="form-group row ">
                            <label class="el-form-item__label col-md-3" >Compañia</label>
                            <div class="col-md-3 grupolabel">
                                <div class="input-group mb-3" >
                                <el-input size ="small"   placeholder="" v-model="codigoCompania" >
                            <el-button slot="append" style="padding: 3px 3px !important;background: #fff5c4;
                background: -webkit-gradient(left top, left bottom, color-stop(0%, #fff5c4), color-stop(100%, #ffee9f));
                background: -webkit-gradient(linear, left top, left bottom, from(#fff5c4), to(#ffee9f));
                background: linear-gradient(to bottom, #fff5c4 0%, #ffee9f 100%);" icon="fa fa-clone"
                                disabled></el-button> 
                                </el-input>
                                </div>
                            </div>
                            <label class="el-form-item__label col-md-2" >{{descripcionCompania}}</label>
                        </div>
                       <div class="form-group row Second" >
                        <label class="el-form-item__label col-md-3" >Proveedor</label>
                        <div class="col-md-3 grupolabel">
                            <div class="input-group mb-3" >
                            <el-input size ="small"   placeholder="" >
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
                                <el-input size ="small"   placeholder="" v-model="codigoCompania" >
                            <el-button slot="append" style="padding: 3px 3px !important;background: #fff5c4;
                background: -webkit-gradient(left top, left bottom, color-stop(0%, #fff5c4), color-stop(100%, #ffee9f));
                background: -webkit-gradient(linear, left top, left bottom, from(#fff5c4), to(#ffee9f));
                background: linear-gradient(to bottom, #fff5c4 0%, #ffee9f 100%);" icon="fa fa-clone"
                                disabled></el-button> 
                                </el-input>
                                </div>
                            </div>
                            <label class="el-form-item__label col-md-2" style="color:#1f2d3d;" >{{descripcionCompania}}</label>
                           
                        </div>
                        <div class="form-group row ">
                            <label class="el-form-item__label col-md-3" >Categoria</label>
                            <div class="col-md-3 grupolabel">
                                <div class="input-group mb-3" >
                                <el-select v-model="value1" class="selected"
                                @change="selectCategoria($event)">
                                    <el-option
                                    class="opciones"
                                    v-for="item in Categoria"
                                    :key="item.intIdVenCateg_ID"
                                    :label="item.strVenCateg_Desc"
                                    :value="item.intIdVenCateg_ID"
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
                                <el-input size ="small" v-model="tipoDocSelectedIdentidad.strDocIdent_NO" type="text" >
                                        <el-button slot="append" style="padding: 3px 3px !important;background: #fff5c4;
                        background: -webkit-gradient(left top, left bottom, color-stop(0%, #fff5c4), color-stop(100%, #ffee9f));
                        background: -webkit-gradient(linear, left top, left bottom, from(#fff5c4), to(#ffee9f));
                        background: linear-gradient(to bottom, #fff5c4 0%, #ffee9f 100%);" icon="fa fa-clone"
                                    @click="loadTipoDoc()"
                                    ></el-button> 
                                    </el-input>
                                </div>
                            </div>
                            <label class="el-form-item__label col-md-4" style="color:#1f2d3d;">{{tipoDocSelectedIdentidad.strDocIdent_Name}}</label>
                        </div>
                        <div class="form-group row ">
                            <label class="el-form-item__label col-md-1" >Pais</label>
                            <div class="col-md-1 grupolabel">
                                <div class="input-group mb-1" >
                                    <el-input size ="small" v-model="gridSelectPais.strCountry_Cod" type="text" >
                                        <el-button  slot="append" style="padding: 3px 3px !important;background: #fff5c4;
                        background: -webkit-gradient(left top, left bottom, color-stop(0%, #fff5c4), color-stop(100%, #ffee9f));
                        background: -webkit-gradient(linear, left top, left bottom, from(#fff5c4), to(#ffee9f));
                        background: linear-gradient(to bottom, #fff5c4 0%, #ffee9f 100%);" icon="fa fa-clone"
                                        @click="paisDialog()"
                                        ></el-button> 
                                    </el-input>
                                </div>
                            </div>
                            <label class="el-form-item__label col-md-1" style="color:#1f2d3d;">{{gridSelectPais.strCountry_Name}}</label>
                            <div class="col-md-1 grupolabel"></div>
                            <label class="el-form-item__label col-md-1" >Region</label>
                            <div class="col-md-1 grupolabel">
                                <div class="input-group mb-1" >
                                <el-input size ="small" v-model="selectDepartamento.strRegión_Cod" type="text" >
                                        <el-button  slot="append" style="padding: 3px 3px !important;background: #fff5c4;
                        background: -webkit-gradient(left top, left bottom, color-stop(0%, #fff5c4), color-stop(100%, #ffee9f));
                        background: -webkit-gradient(linear, left top, left bottom, from(#fff5c4), to(#ffee9f));
                        background: linear-gradient(to bottom, #fff5c4 0%, #ffee9f 100%);" icon="fa fa-clone"
                                        @click="departDialog()"
                                        ></el-button> 
                                    </el-input>
                                </div>
                            </div> 
                            <label class="el-form-item__label col-md-1" style="color:#1f2d3d;">{{selectDepartamento.strRegión_Desc}}</label>
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
                            <label class="el-form-item__label col-md-1" >Dirección</label>
                            <div class="col-md-6 grupolabel">
                                <div class="input-group mb-6" >
                                <el-input size ="small"  v-model="Proveedor.strAddress" placeholder="">
                    
                                </el-input>
                                </div>
                            </div>
                            <div class="col-md-1 grupolabel"></div>  
                            <label class="el-form-item__label col-md-2" >Dias en pagar:</label>
                            <div class="col-md-1 grupolabel">
                                <div class="input-group mb-1" >
                                <el-input size ="small" type="number" v-model="Proveedor.intDayToPay"  placeholder="">
                    
                                </el-input>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row ">
                            <label class="el-form-item__label col-md-1" >Banco</label>
                            <div class="col-md-1 grupolabel">
                                <div class="input-group mb-1" >
                                    <el-input size ="small" v-model="selectBancoA.strBank_Cod" type="text"   >
                                        <el-button  slot="append" style="padding: 3px 3px !important;background: #fff5c4;
                        background: -webkit-gradient(left top, left bottom, color-stop(0%, #fff5c4), color-stop(100%, #ffee9f));
                        background: -webkit-gradient(linear, left top, left bottom, from(#fff5c4), to(#ffee9f));
                        background: linear-gradient(to bottom, #fff5c4 0%, #ffee9f 100%);" icon="fa fa-clone"
                                    @click="bancoDialog('A')"
                                    ></el-button> 
                                    </el-input>
                                </div>
                            </div>
                            <label class="el-form-item__label col-md-1" style="color:#1f2d3d;" >{{selectBancoA.strBank_Name}}</label>
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
                                <el-input size ="small" v-model="selectMonedaA.strCurrency_Cod" type="text" >
                                        <el-button slot="append" style="padding: 3px 3px !important;background: #fff5c4;
                        background: -webkit-gradient(left top, left bottom, color-stop(0%, #fff5c4), color-stop(100%, #ffee9f));
                        background: -webkit-gradient(linear, left top, left bottom, from(#fff5c4), to(#ffee9f));
                        background: linear-gradient(to bottom, #fff5c4 0%, #ffee9f 100%);" icon="fa fa-clone"
                                    @click="monedaDialog('A')"
                                    ></el-button> 
                                    </el-input>
                                </div>
                            </div>  
                            <label class="el-form-item__label col-md-2" >{{selectMonedaA.strCurrency_Desc}}</label>                     
                        </div>
                        <div class="form-group row">
                            <label class="el-form-item__label col-md-1" >Banco Coorporativo</label>
                            <div class="col-md-1 grupolabel">
                                <div class="input-group mb-1" >
                                <el-input size ="small" v-model="selectBancoB.strBank_Cod" type="text">
                                        <el-button  slot="append" style="padding: 3px 3px !important;background: #fff5c4;
                        background: -webkit-gradient(left top, left bottom, color-stop(0%, #fff5c4), color-stop(100%, #ffee9f));
                        background: -webkit-gradient(linear, left top, left bottom, from(#fff5c4), to(#ffee9f));
                        background: linear-gradient(to bottom, #fff5c4 0%, #ffee9f 100%);" icon="fa fa-clone"
                                    @click="bancoDialog('B')"></el-button> 
                                    </el-input>
                                </div>
                            </div>
                            <label class="el-form-item__label col-md-2" style="color:#1f2d3d;" >{{selectBancoB.strBank_Name}}</label>
                            
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
                                <el-input size ="small" v-model="selectMonedaB.strCurrency_Cod" type="text" >
                                        <el-button  slot="append" style="padding: 3px 3px !important;background: #fff5c4;
                        background: -webkit-gradient(left top, left bottom, color-stop(0%, #fff5c4), color-stop(100%, #ffee9f));
                        background: -webkit-gradient(linear, left top, left bottom, from(#fff5c4), to(#ffee9f));
                        background: linear-gradient(to bottom, #fff5c4 0%, #ffee9f 100%);" 
                        icon="fa fa-clone"
                         @click="monedaDialog('B')"></el-button> 
                                    </el-input>
                                </div>
                            </div>  
                            <label class="el-form-item__label col-md-2" >{{selectMonedaB.strCurrency_Desc}}</label>  
                            
                        </div>
                        <div class="form-group row">
                            <label class="el-form-item__label col-md-1" >Otro banco</label>
                            <div class="col-md-1 grupolabel">
                                <div class="input-group mb-1" >
                                <el-input size ="small" v-model="selectBancoC.strBank_Cod" type="text">
                                        <el-button  slot="append" style="padding: 3px 3px !important;background: #fff5c4;
                        background: -webkit-gradient(left top, left bottom, color-stop(0%, #fff5c4), color-stop(100%, #ffee9f));
                        background: -webkit-gradient(linear, left top, left bottom, from(#fff5c4), to(#ffee9f));
                        background: linear-gradient(to bottom, #fff5c4 0%, #ffee9f 100%);" 
                        icon="fa fa-clone"
                        @click="bancoDialog('C')"></el-button> 
                                    </el-input>
                                </div>
                            </div>
                            <label class="el-form-item__label col-md-2" style="color:#1f2d3d;" >{{selectBancoC.strBank_Name}}</label>
                            
                            <label class="el-form-item__label col-md-2" >Cuenta Detraccion</label>
                            <div class="col-md-2 grupolabel">
                                <div class="input-group mb-2" >
                                <el-input size ="small" v-model="Proveedor.strBankAcct_Other_NO"  placeholder="">
                    
                                </el-input>
                                </div>
                            </div> 
                            <label class="el-form-item__label col-md-1" >Moneda</label>
                            <div class="col-md-1 grupolabel">
                                <div class="input-group mb-1" >
                                <el-input size ="small" v-model="selectMonedaC.strCurrency_Cod" type="text" >
                                        <el-button  slot="append" style="padding: 3px 3px !important;background: #fff5c4;
                        background: -webkit-gradient(left top, left bottom, color-stop(0%, #fff5c4), color-stop(100%, #ffee9f));
                        background: -webkit-gradient(linear, left top, left bottom, from(#fff5c4), to(#ffee9f));
                        background: linear-gradient(to bottom, #fff5c4 0%, #ffee9f 100%);" 
                        icon="fa fa-clone"
                         @click="monedaDialog('C')"></el-button> 
                                    </el-input>
                                </div>
                            </div>  
                         <label class="el-form-item__label col-md-2" >{{selectMonedaC.strCurrency_Desc}}</label>  
                        </div>
                        <div class="form-group row">
                            <label class="el-form-item__label col-md-1" >Banco Foraneo</label>
                            <div class="col-md-1 grupolabel">
                                <div class="input-group mb-1" >
                                <el-input size ="small" v-model="selectBancoD.strBank_Cod" type="text">
                                        <el-button slot="append" style="padding: 3px 3px !important;background: #fff5c4;
                        background: -webkit-gradient(left top, left bottom, color-stop(0%, #fff5c4), color-stop(100%, #ffee9f));
                        background: -webkit-gradient(linear, left top, left bottom, from(#fff5c4), to(#ffee9f));
                        background: linear-gradient(to bottom, #fff5c4 0%, #ffee9f 100%);" 
                        icon="fa fa-clone"
                        @click="bancoDialog('D')"></el-button> 
                                    </el-input>
                                </div>
                            </div>
                            <label class="el-form-item__label col-md-2" style="color:#1f2d3d;">{{selectBancoD.strBank_Name}}</label>
                            
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
                                <el-input size ="small" v-model="selectMonedaD.strCurrency_Cod" type="text">
                                        <el-button  slot="append" style="padding: 3px 3px !important;background: #fff5c4;
                        background: -webkit-gradient(left top, left bottom, color-stop(0%, #fff5c4), color-stop(100%, #ffee9f));
                        background: -webkit-gradient(linear, left top, left bottom, from(#fff5c4), to(#ffee9f));
                        background: linear-gradient(to bottom, #fff5c4 0%, #ffee9f 100%);" 
                        icon="fa fa-clone"
                        @click="monedaDialog('D')"></el-button> 
                                    </el-input>
                                </div>
                            </div>  
                            <label class="el-form-item__label col-md-2" >{{selectMonedaD.strCurrency_Desc}}</label>  
                            
                        </div>
                        <div class="form-group row">
                            <label class="el-form-item__label col-md-1" >Retención</label>
                            <div class="col-md-1 grupolabel">
                                <div class="input-group mb-1" >
                                <el-input size ="small" v-model="selectImpuesto.strWH_Cod" type="text" >
                                        <el-button  slot="append" style="padding: 3px 3px !important;background: #fff5c4;
                        background: -webkit-gradient(left top, left bottom, color-stop(0%, #fff5c4), color-stop(100%, #ffee9f));
                        background: -webkit-gradient(linear, left top, left bottom, from(#fff5c4), to(#ffee9f));
                        background: linear-gradient(to bottom, #fff5c4 0%, #ffee9f 100%);" icon="fa fa-clone"
                                    @click="impuestoDialog()"
                                    ></el-button> 
                                    </el-input>
                                </div>
                            </div>  
                            <label class="el-form-item__label col-md-1" >% Retención</label>
                            <div class="col-md-1 grupolabel">
                                <div class="input-group mb-1" >
                                <el-input type="number" size ="small" v-model="selectImpuesto.fltPorcent"  placeholder="">
                    
                                </el-input>
                                </div>
                            </div>  
                            <label class="el-form-item__label col-md-1" >Detracción</label>
                            <div class="col-md-1 grupolabel">
                                <div class="input-group mb-1" >
                                <el-input size ="small" v-model="selectImpuesto.strWH_Cod"  placeholder="">
                    
                                </el-input>
                                </div>
                            </div>  
                            <label class="el-form-item__label col-md-1" >%Detracción</label>
                            <div class="col-md-1 grupolabel">
                                <div class="input-group mb-1" >
                                <el-input type="number" size ="small" v-model="selectImpuesto.fltPorcent"  placeholder="">
                    
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
                :data="gridProveedor"
                stripe  :default-sort = "{prop: 'date', order: 'descending'}"
                style="width: 100%; cursor: pointer;" class="ExcelTable2007"
                highlight-current-row
                height="250"
                @current-change="proveedorSelect">
                <el-table-column   prop="strVendor_NO" label="RUC/DNI" width="180">
                </el-table-column>  
                <el-table-column  prop="strVendor_Desc" label="Nombre proveedor" style="width: 70% !important;">
                </el-table-column> 
                </el-table>
          </el-card>
        <span slot="footer" class="dialog-footer">
            <img src="../../../../images/check.png" style="width:13px; height:15px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.6rem;"/>
            <img src="../../../../images/close.png" style="width:17px; height:15px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.6rem;" @click="dialogVisible = false"/>
        </span>
        </el-dialog>

    <el-dialog
        title="Paises"
        :visible.sync="paisVisible"
        width="30%"
        :before-close="handleClosePais">
        <el-card class="box-card">
              <div slot="header" class="headercard">
                  <span class="labelheadercard" >Buscar Paises</span>
              </div>
              <div class="row bodycard">
                  <div class="col-md-12">
                        <div class="form-group row">
                            <label class="el-form-item__label col-md-3" >Paises Codigo</label>
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
                :data="Pais"
                stripe  :default-sort = "{prop: 'date', order: 'descending'}"
                style="width: 100%;cursor: pointer;" class="ExcelTable2007"
                highlight-current-row
                @current-change="paisSelect"
                height="250">
                <el-table-column  prop="strCountry_Cod" label="Codigo" width="180">
                </el-table-column>  
                <el-table-column  prop="strCountry_Name" label="Nombre del Pais" width="180">
                </el-table-column> 
                <el-table-column  prop="strLanguage" label="Idioma" style="width: 70% !important;">
                </el-table-column> 
                </el-table>
          </el-card>
        <span slot="footer" class="dialog-footer">
            <img src="../../../../images/check.png" style="width:13px; height:15px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.6rem;" @click="paisChosseCheck()"/>
            <img src="../../../../images/close.png" style="width:17px; height:15px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.6rem;" @click="paisChosseClose()"/>
        </span>
        </el-dialog>


    <el-dialog
        title="Banco"
        :visible.sync="bancoVisible"
        width="30%"
        :before-close="handleCloseBanco">
        <el-card class="box-card">
              <div slot="header" class="headercard">
                  <span class="labelheadercard" >Buscar Banco</span>
              </div>
              <div class="row bodycard">
                  <div class="col-md-12">
                        <div class="form-group row">
                            <label class="el-form-item__label col-md-3" >Banco Codigo</label>
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
                :data="Banco"
                stripe  :default-sort = "{prop: 'date', order: 'descending'}"
                style="width: 100%; cursor: pointer;" class="ExcelTable2007"
                height="250"
                highlight-current-row
                @current-change="bancoSelect">
                <el-table-column  prop="strBank_Cod" label="Codigo" width="180" >
                </el-table-column>  
                <el-table-column  prop="strBank_Name" label="Nombre del Banco" width="180">
                </el-table-column> 
                <el-table-column  prop="strBank_City" label="Ciudad" style="width: 70% !important;">
                </el-table-column> 
                </el-table>
          </el-card>
        <span slot="footer" class="dialog-footer">
            <img src="../../../../images/check.png" style="width:13px; height:15px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.6rem;" @click="bancoChosseCheck()"/>
            <img src="../../../../images/close.png" style="width:17px; height:15px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.6rem;" @click="handleCloseBanco()"/>
        </span>
        </el-dialog>

    <el-dialog
        title="Tipo documento identidad"
        :visible.sync="tipodocVisible"
        width="30%"
        :before-close="handleCloseTipoDoc">
        <el-card class="box-card">
              <div slot="header" class="headercard">
                  <span class="labelheadercard" >Buscar Documento</span>
              </div>
              <div class="row bodycard">
                  <div class="col-md-12">
                        <div class="form-group row">
                            <label class="el-form-item__label col-md-3" >Documento Codigo</label>
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
                :data="tipoDocIdentidad"
                stripe  :default-sort = "{prop: 'date', order: 'descending'}"
                style="width: 100%; cursor: pointer;" class="ExcelTable2007"
                height="200"
                highlight-current-row
                @current-change="tipodocSelect">
                <el-table-column  prop="strDocIdent_NO" label="Codigo" width="180" >
                </el-table-column>  
                <el-table-column  prop="strDocIdent_Name" label="Nombre Documento" style="width: 70% !important;">
                </el-table-column> 
                </el-table>
          </el-card>
        <span slot="footer" class="dialog-footer">
            <img src="../../../../images/check.png" style="width:13px; height:15px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.6rem;" @click="tipoDocChosseCheck()"/>
            <img src="../../../../images/close.png" style="width:17px; height:15px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.6rem;" @click="tipoDocChosseClose()"/>
        </span>
        </el-dialog>
    <el-dialog
        title="Departamentos"
        :visible.sync="departVisible"
        width="30%"
        :before-close="handleCloseDepart">
        <el-card class="box-card">
              <div slot="header" class="headercard">
                  <span class="labelheadercard" >Buscar Departamento</span>
              </div>
              <div class="row bodycard">
                  <div class="col-md-12">
                        <div class="form-group row">
                            <label class="el-form-item__label col-md-3" >Departamento Codigo</label>
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
                :data="Departamento"
                stripe  :default-sort = "{prop: 'date', order: 'descending'}"
                style="width: 100%; cursor: pointer;" class="ExcelTable2007"
                height="200"
                highlight-current-row
                @current-change="departSelect">
                <el-table-column  prop="strRegión_Cod" label="Codigo" width="180" >
                </el-table-column>  
                <el-table-column  prop="strRegión_Desc" label="Nombre Departamento" style="width: 70% !important;">
                </el-table-column> 
                </el-table>
          </el-card>
        <span slot="footer" class="dialog-footer">
            <img src="../../../../images/check.png" style="width:13px; height:15px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.6rem;" @click="departChosseCheck()"/>
            <img src="../../../../images/close.png" style="width:17px; height:15px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.6rem;" @click="departChosseClose()"/>
        </span>
    </el-dialog>

<el-dialog
        title="Moneda"
        :visible.sync="monedaVisible"
        width="30%"
        :before-close="handleCloseMoneda">
        <el-card class="box-card">
              <div slot="header" class="headercard">
                  <span class="labelheadercard" >Buscar Moneda</span>
              </div>
              <div class="row bodycard">
                  <div class="col-md-12">
                        <div class="form-group row">
                            <label class="el-form-item__label col-md-3" >Moneda Codigo</label>
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
                :data="Moneda"
                stripe  :default-sort = "{prop: 'date', order: 'descending'}"
                style="width: 100%; cursor: pointer;" class="ExcelTable2007"
                height="200"
                highlight-current-row
                @current-change="monedaSelect">
                <el-table-column  prop="intIdCurrency_ID" label="Correlativo" width="100">
                </el-table-column>  
                <el-table-column  prop="strCurrency_Cod" label="Codigo" width="100">
                </el-table-column>  
                <el-table-column  prop="strCurrency_Desc" label="Descripción" width="180">
                </el-table-column>  
                <el-table-column  prop="strCountry" label="Paises" style="width: 70% !important;">
                </el-table-column> 
                </el-table>
          </el-card>
        <span slot="footer" class="dialog-footer">
            <img src="../../../../images/check.png" style="width:13px; height:15px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.6rem;" @click="monedaChosseCheck()"/>
            <img src="../../../../images/close.png" style="width:17px; height:15px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.6rem;" @click="handleCloseMoneda()"/>
        </span>
    </el-dialog>
<el-dialog
        title="Impuesto"
        :visible.sync="impuestoVisible"
        width="30%"
        :before-close="handleCloseImpuesto">
        <el-card class="box-card">
              <div slot="header" class="headercard">
                  <span class="labelheadercard" >Buscar Impuesto</span>
              </div>
              <div class="row bodycard">
                  <div class="col-md-12">
                        <div class="form-group row">
                            <label class="el-form-item__label col-md-3" >Impuesto Codigo</label>
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
                :data="Impuesto"
                stripe  :default-sort = "{prop: 'date', order: 'descending'}"
                style="width: 100%; cursor: pointer;" class="ExcelTable2007"
                height="200"
                highlight-current-row
                @current-change="impuestoSelect">  
                <el-table-column  prop="strWH_Cod" label="Codigo" width="100">
                </el-table-column>  
                <el-table-column  prop="fltPorcent" label="Porcentaje" style="width: 70% !important;">
                </el-table-column> 
                </el-table>
          </el-card>
        <span slot="footer" class="dialog-footer">
            <img src="../../../../images/check.png" style="width:13px; height:15px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.6rem;" @click="impuestoChosseCheck()"/>
            <img src="../../../../images/close.png" style="width:17px; height:15px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.6rem;" @click="handleCloseImpuesto()"/>
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
.el-table .rechazado-row {
  background: rgb(206, 85, 85);
}
</style>
