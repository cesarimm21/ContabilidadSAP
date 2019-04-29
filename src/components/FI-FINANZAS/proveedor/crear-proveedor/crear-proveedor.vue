<template>
  <div class="crear-proveedor">
      <ol  style="margin-left: -1.5rem;background: linear-gradient(rgb(229, 241, 247) 0%, rgb(255, 255, 255) 100%);    margin-bottom: 0rem !important;">
        <quickaccessmenu v-on:guardarProveedor="SaveProveedor($event)" v-on:backPage="backPage($event)"  v-on:reloadpage="reloadpage($event)"/>
    </ol>
      <div >
         
          <el-card class="box-card">
              <div slot="header" class="headercard">
                  <span class="labelheadercard" >Nuevo Proveedor</span>
              </div>
              <div class="row bodycard">
                  
              </div>
              <div class="row">
                    <div class="col-sm-12" style="margin-top: 10px;">
                        <el-tabs type="border-card">
                            <el-tab-pane label="Datos generales">
                                <div class="container">
                                    <div class="row">
                                         <div class="col-md-12">                       
                                            <div class="form-group row" style="height: 40px;">
                                                <label class="el-form-item__label col-md-1" >Compañia</label>
                                                <div class="col-md-2 grupolabel">
                                                    <div class="input-group mb-2" >
                                                        <el-input size ="small" v-model="codigoCompania"  disabled>
                                                        </el-input>
                                                    </div>
                                                </div>
                                                <label class="sinLinea el-form-item__label col-md-4" style="color:#1f2d3d;" >{{descripcionCompania}}</label>
                                            
                                            </div>
                                            <div class="form-group row ">
                                                <label class="el-form-item__label col-md-1" >Categoria</label>
                                                <div class="col-md-2 grupolabel">
                                                    <div class="input-group mb-2" >
                                                    <el-select v-model="value1" style="font-size:13px" allow-create clearable size="mini" filterable
                                                    @change="selectCategoria($event)">
                                                        <el-option
                                                        style="font-size:13px"
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
                                        <div class="col-md-12" style="margin-top: 6px;">
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
                                                    <el-input size ="small" v-model="Proveedor.strSurName"  placeholder="">
                                        
                                                    </el-input>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="form-group row">
                                                <label class="el-form-item__label col-md-1" >{{RucOrDni}}</label>
                                                <div class="col-md-2 grupolabel">
                                                    <div class="input-group mb-2" >
                                                    <el-input size ="small" v-model="Proveedor.strTax_ID"  placeholder="">
                                        
                                                    </el-input>
                                                    </div>
                                                </div>
                                                <div class="col-md-1 "></div>
                                                <label class="el-form-item__label col-md-2" >Tipo documento</label>
                                                <div class="col-md-1 grupolabel">
                                                    <div class="input-group mb-1" >
                                                        <el-input size ="small" @blur="desactivar_TipoDocumento" @focus="activar_TipoDocumento" v-model="Proveedor.strDocIdent_NO" :disabled="tipoDocDisabled">                            
                                                            <el-button v-if="btnactivarTipoDocumento && !tipodocVisible" slot="append" class="boton" icon="fa fa-clone" @click="loadTipoDoc()" :disabled="tipoDocDisabled"></el-button> 
                                                        </el-input>
                                                    </div>
                                                </div>
                                                <label class="sinLinea el-form-item__label col-md-4" style="color:#1f2d3d;">{{selectTipoDoc.strDocIdent_Name}}</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="Dirección">
                                <div class="container">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="form-group row margint">
                                            <label class="el-form-item__label col-md-1" >Pais</label>
                                            <div class="col-md-1 grupolabel">
                                                <div class="input-group mb-1" >
                                                    <el-input size ="small" @blur="desactivar_Pais" @focus="activar_Pais" v-model="Proveedor.strCountry">                            
                                                        <el-button v-if="btnactivarpais && !paisVisible" slot="append" class="boton" icon="fa fa-clone" @click="paisDialog()"></el-button> 
                                                    </el-input>
                                                </div>
                                            </div>
                                            <label class="sinLinea el-form-item__label col-md-1" style="color:#1f2d3d;">{{gridSelectPais.strCountry_Name}}</label>
                                            <div class="col-md-1 grupolabel"></div>
                                            <label class="el-form-item__label col-md-1" >Region</label>
                                            <div class="col-md-1 grupolabel">
                                                <div class="input-group mb-1" >
                                                    <el-input size ="small" @blur="desactivar_Departamento" @focus="activar_Departamento" v-model="Proveedor.strRegión_Cod" :disabled="departEnabled">                            
                                                        <el-button v-if="btnactivardepartamento && !departVisible" slot="append" class="boton" icon="fa fa-clone" @click="departDialog()"></el-button> 
                                                    </el-input>
                                                </div>
                                            </div> 
                                            <label class="sinLinea el-form-item__label col-md-1" style="color:#1f2d3d;">{{selectDepartamento.strRegión_Desc}}</label>
                                            <div class="col-md-1 grupolabel"></div>                           
                                        </div>
                                        <div class="form-group row margint">
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
                                                <el-input size ="small" v-model="Proveedor.strPostal_Cod"  placeholder="">
                                    
                                                </el-input>
                                                </div>
                                            </div>                         
                                        </div>
                                        <div class="form-group row margint">
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
                                        </div>
                                    </div>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="Cuentas Bancarias">
                                <div class="container">
                                    <div class="row">
                                        <div slot="header" class="headercardSecond" style="width:100%;">
                                            <span class="labelheadercard" >Cuenta local</span>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="form-group row ">
                                            <label class="el-form-item__label col-md-1" >Banco</label>
                                            <div class="col-md-1 grupolabel">
                                                <div class="input-group mb-1" >
                                                    <el-input size ="small" @blur="desactivar_bancoA" @focus="activar_bancoA" v-model="Proveedor.strBank_Cod">                            
                                                        <el-button v-if="btnactivarbancoA && !bancoVisible" slot="append" class="boton" icon="fa fa-clone" @click="bancoDialog('A')"></el-button> 
                                                    </el-input>
                                                </div>
                                            </div>
                                            <label class="sinLinea el-form-item__label col-md-2" style="color:#1f2d3d;" >{{selectBancoA.strBank_Name}}</label>
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
                                                    <el-input size ="small" @blur="desactivar_monedaA" @focus="activar_monedaA" v-model="Proveedor.strCurrency_Cod">                            
                                                        <el-button v-if="btnactivarmonedaA && !monedaVisible" slot="append" class="boton" icon="fa fa-clone" @click="monedaDialog('A')"></el-button> 
                                                    </el-input>
                                                </div>
                                            </div>  
                                            <label class="el-form-item__label col-md-2" >{{selectMonedaA.strCurrency_Desc}}</label>                     
                                        </div>
                                    </div>
                                    <div slot="header" class="headercardSecond" style="width:100%; margin-top: 15px;">
                                        <span class="labelheadercard" >Cuenta Coorporativo</span>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="form-group row ">
                                            <label class="el-form-item__label col-md-1" >Banco </label>
                                            <div class="col-md-1 grupolabel">
                                                <div class="input-group mb-1" >
                                                    <el-input size ="small" @blur="desactivar_bancoB" @focus="activar_bancoB" v-model="Proveedor.strBank_Corp_Cod">                            
                                                        <el-button v-if="btnactivarbancoB && !bancoVisible" slot="append" class="boton" icon="fa fa-clone" @click="bancoDialog('B')"></el-button> 
                                                    </el-input>
                                                </div>
                                            </div>
                                            <label class=" sinLinea el-form-item__label col-md-2" style="color:#1f2d3d;" >{{selectBancoB.strBank_Name}}</label>
                                            
                                            <label class="el-form-item__label col-md-2" >Cuenta </label>
                                            <div class="col-md-2 grupolabel">
                                                <div class="input-group mb-2" >
                                                <el-input size ="small" v-model="Proveedor.strBankAcct_Corp_NO"  placeholder="">
                                    
                                                </el-input>
                                                </div>
                                            </div> 
                                            <label class="el-form-item__label col-md-1" >Moneda </label>
                                            <div class="col-md-1 grupolabel">
                                                <div class="input-group mb-1" >
                                                <el-input size ="small" @blur="desactivar_monedaB" @focus="activar_monedaB" v-model="Proveedor.strCurrency_Corp">                            
                                                    <el-button v-if="btnactivarmonedaB && !monedaVisible" slot="append" class="boton" icon="fa fa-clone" @click="monedaDialog('B')"></el-button> 
                                                </el-input>
                                                </div>
                                            </div>  
                                            <label class=" el-form-item__label col-md-2" >{{selectMonedaB.strCurrency_Desc}}</label>  
                                            
                                        </div>
                                    </div>
                                    <div slot="header" class="headercardSecond" style="width:100%; margin-top: 15px;">
                                        <span class="labelheadercard" >Otra Cuenta </span>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="form-group row ">
                                            <label class="el-form-item__label col-md-1" >banco</label>
                                            <div class="col-md-1 grupolabel">
                                                <div class="input-group mb-1" >
                                                <el-input size ="small" @blur="desactivar_bancoC" @focus="activar_bancoC" v-model="Proveedor.strBank_Other_Cod">                            
                                                    <el-button v-if="btnactivarbancoC && !bancoVisible" slot="append" class="boton" icon="fa fa-clone" @click="bancoDialog('C')"></el-button> 
                                                </el-input>
                                                </div>
                                            </div>
                                            <label class=" sinLinea el-form-item__label col-md-2" style="color:#1f2d3d;" >{{selectBancoC.strBank_Name}}</label>
                                            
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
                                                    <el-input size ="small" @blur="desactivar_monedaC" @focus="activar_monedaC" v-model="Proveedor.strFore_Swift_Cod">                            
                                                    <el-button v-if="btnactivarmonedaC && !monedaVisible" slot="append" class="boton" icon="fa fa-clone" @click="monedaDialog('C')"></el-button> 
                                                    </el-input>
                                                </div>
                                            </div>  
                                        <label class="el-form-item__label col-md-2" >{{selectMonedaC.strCurrency_Desc}}</label>  
                                        </div>
                                    </div>
                                    <div slot="header" class="headercardSecond" style="width:100%; margin-top: 15px;">
                                        <span class="labelheadercard" >Cuenta Foraneo</span>
                                    </div>
                                    <div class="col-md-12">                                        
                                        <div class="form-group row ">
                                            <label class="el-form-item__label col-md-1" >Banco </label>
                                            <div class="col-md-1 grupolabel">
                                                <div class="input-group mb-1" >
                                                <el-input size ="small" @blur="desactivar_bancoD" @focus="activar_bancoD" v-model="Proveedor.strFore_Branch_Cod">                            
                                                    <el-button v-if="btnactivarbancoD && !bancoVisible" slot="append" class="boton" icon="fa fa-clone" @click="bancoDialog('D')"></el-button> 
                                                </el-input>
                                                </div>
                                            </div>
                                            <label class=" sinLinea el-form-item__label col-md-2" style="color:#1f2d3d;">{{selectBancoD.strBank_Name}}</label>
                                            
                                            <label class="el-form-item__label col-md-2" >Cuenta bancaria</label>
                                            <div class="col-md-2 grupolabel">
                                                <div class="input-group mb-2" >
                                                <el-input size ="small" v-model="Proveedor.strFore_AccBank_NO"  placeholder="">
                                    
                                                </el-input>
                                                </div>
                                            </div> 
                                            <label class="el-form-item__label col-md-1" >Moneda</label>
                                            <div class="col-md-1 grupolabel">
                                                <div class="input-group mb-1" >
                                                    <el-input size ="small" @blur="desactivar_monedaD" @focus="activar_monedaD" v-model="Proveedor.strFore_Curr_Cod">                            
                                                        <el-button v-if="btnactivarmonedaD && !monedaVisible" slot="append" class="boton" icon="fa fa-clone" @click="monedaDialog('D')"></el-button> 
                                                    </el-input>
                                                </div>
                                            </div>  
                                            <label class="el-form-item__label col-md-2" >{{selectMonedaD.strCurrency_Desc}}</label>  
                                            
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </el-tab-pane>                            

                        </el-tabs>
                    </div>
                  </div>
                <div class="row">
                    <div class="col-sm-12" style="margin-top: 10px; ">
                        <el-tabs type="border-card" style="margin-right:100px;">
                            <el-tab-pane label="Retención">
                                <div class="container">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="form-group row margint">
                                            <label class="el-form-item__label col-md-1" >Retención</label>
                                            <div class="col-md-1 grupolabel">
                                                <div class="input-group mb-1" >
                                                    <el-input size ="small" @blur="desactivar_impuesto" @focus="activar_impuesto" v-model="Proveedor.strRetention_Cod">                            
                                                        <el-button v-if="btnactivarimpuesto && !impuestoVisible" slot="append" class="boton" icon="fa fa-clone" @click="impuestoDialog()"></el-button> 
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
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="Detracción">
                                <div class="container">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="form-group row margint">
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
                                </div>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </div>
          </el-card>
            <el-card class="box-card">
              <div slot="header" class="headercard">
                 <span class="labelheadercard" > Referencia Proveedor</span>
                 
              </div>
              <div class="row bodycard">
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
                        <label class="el-form-item__label col-md-2" >Proveedor</label>
                        <div class="col-md-2 grupolabel">
                            <div class="input-group mb-2" >
                                <el-input size ="small" @blur="desactivar_proveedor1" @focus="activar_proveedor1" v-model="gridSelectedProveedor.strVendor_NO"  placeholder="" :disabled="proDisabled">
                                    <el-button v-if="btnactivarproveedor && !dialogVisible" slot="append" class="boton" icon="fa fa-clone" @click="loadProveedores()"></el-button> 
                                </el-input>
                            </div>
                        </div>                        
                        </div>
                  </div>
              </div>
          </el-card>
      </div>
      <div class="footer1">
        <div class="row">
            <div class="col-sm-9" style="text-align:left" >
                <!-- <div class="col-sm-2">
                    <b-progress v-if="vifprogress" :max="100" variant="success"   show-progress animated >
                         <b-progress-bar :value="valuem" :label="valuem + '%'" />
                    </b-progress>
                </div> -->
                <!-- <div class="col-sm-12">
                    <el-progress :text-inside="true" :stroke-width="18" :percentage="80" color="rgba(142, 113, 199, 0.7)"></el-progress>
                </div> -->
                <img  src="../../../../images/save.png" v-if="issave" style="width:16px; height:17px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 1.3rem;" @click="fnOcultar()"/>
                <img src="../../../../images/error.png" v-if="iserror" style="width:16px; height:17px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 1.3rem;" @click="fnOcultar()"/>
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
     <!--DIALOG BUSQUEDA PROVEEDORES-->
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
                @row-dblclick="checkDoblePro"
                @current-change="proveedorSelect">
                <el-table-column   prop="strVendor_NO" label="Codigo" width="180">
                </el-table-column>  
                <el-table-column  prop="strVendor_Desc" label="Descripción" style="width: 70% !important;">
                </el-table-column> 
                <el-table-column  prop="strCountry" label="Pais" style="width: 70% !important;">
                </el-table-column> 
                </el-table>
          </el-card>
        <span slot="footer" class="dialog-footer">
            <img src="../../../../images/check.png" style="width:13px; height:15px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.6rem;" @click="proveedorCheck()"/>
            <img src="../../../../images/close.png" style="width:17px; height:15px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.6rem;" @click="proveedorClose()"/>
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
                @row-dblclick="paisChosseCheck"
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

      <!--DIALOG BUSQUEDA BANCO-->
    <el-dialog title="Busqueda Banco"  :visible.sync="bancoVisible" @close="handleCloseBanco" size="small" >
      <bbanco v-on:bancoselecionado="bancoselecionado($event)" v-on:closeBanco="bancoChosseClose()">
      </bbanco>
    </el-dialog>

    <el-dialog title="Tipo documento"  :visible.sync="tipodocVisible" @close="closeTipoDocumento" size="small" >
        <bdocumento v-on:tipoSeleccionado="tipoSeleccionado($event)" v-on:closeTipo="closeTipo()">
        </bdocumento>
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

    <!--DIALOG BUSQUEDA MONEDA-->
    <el-dialog title="Busqueda moneda"  :visible.sync="monedaVisible" @close="handleCloseMoneda" size="small" >
        <bmoneda v-on:MonedaSeleccionado="monedaSelect($event)" v-on:closeMoneda="handleCloseMoneda()">
        </bmoneda>
    </el-dialog>
    <!--DIALOG BUSQUEDA IMPUESTO-->
    <el-dialog title="Busqueda Impuesto"  :visible.sync="impuestoVisible" @close="handleCloseImpuesto" size="small" >
        <bimpuesto v-on:impuestoseleccionado="impuestoSelect($event)" v-on:impuestoClose="handleCloseImpuesto()">
        </bimpuesto>
    </el-dialog>
  </div>  
  
</template>
<script>

import CrearProveedorComponent from '@/components/FI-FINANZAS/proveedor/crear-proveedor/crear-proveedor.component'
export default CrearProveedorComponent
</script>
<style scoped>
.Third{
    margin-top: -15px;
}
.margint{
    margin-top: 15px;
}
.el-table .selected-row {
  background: rgb(206, 85, 85);
}
.el-table--striped .el-table__body tr.el-table__row--striped.current-row td {
    background: transparent;
    background: -webkit-gradient(left top, left bottom, color-stop(0%, #fff5c4), color-stop(100%, #ffee9f));
    background: -webkit-gradient(linear, left top, left bottom, from(#fff5c4), to(#ffee9f));
    background: linear-gradient(to bottom, #fff5c4 0%, #ffee9f 100%);
}
.el-table .rechazado-row {
  background: rgb(206, 85, 85);
}
.sinLinea{
  border-bottom: 1px solid #f6f7f9;
}
</style>
