<template>
  <div class="crear-cliente">
      <ol  style="margin-left: -1.5rem;background: linear-gradient(rgb(229, 241, 247) 0%, rgb(255, 255, 255) 100%);    margin-bottom: 0rem !important;">
        <quickaccessmenu v-on:guardarTodo="SaveCliente($event)" v-on:backPage="backPage($event)"  v-on:reloadpage="reloadpage($event)"/>
    </ol>
      <div >
         
          <el-card class="box-card">
              <div slot="header" class="headercard">
                  <span class="labelheadercard" >Nuevo Cliente</span>
              </div>
              <div class="row bodycard">
                  
              </div>
              <div class="row">
                    <div class="col-sm-12" style="margin-top: 10px;">
                        <el-tabs type="border-card" @tab-click="handleClick">
                            <el-tab-pane label="Datos generales" >
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
                                                    <el-input class="validador" size ="small" v-model="Cliente.strCliente_Desc"  placeholder="">
                                        
                                                    </el-input>
                                                    </div>
                                                </div>
                                                <label class="el-form-item__label col-md-2" v-if="ApellidosShow">Apellido Paterno</label>
                                                <div class="col-md-2 grupolabel" v-if="ApellidosShow">
                                                    <div class="input-group mb-2" >
                                                    <el-input size ="small" v-model="Cliente.strLastName"  placeholder="">
                                        
                                                    </el-input>
                                                    </div>
                                                </div>
                                                <label class="el-form-item__label col-md-2" v-if="ApellidosShow">Apellido Materno</label>
                                                <div class="col-md-2 grupolabel" v-if="ApellidosShow">
                                                    <div class="input-group mb-2" >
                                                    <el-input size ="small" v-model="Cliente.strSurName"  placeholder="">
                                        
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
                                                    <el-input class="validador" size ="small" v-model="Cliente.strTax_ID"  placeholder="">
                                        
                                                    </el-input>
                                                    </div>
                                                </div>
                                                <div class="col-md-1 "></div>
                                                <label class="el-form-item__label col-md-2" >Tipo documento</label>
                                                <div class="col-md-1 grupolabel">
                                                    <div class="input-group mb-1" >
                                                        <el-input size ="small" @blur="desactivar_TipoDocumento" @focus="activar_TipoDocumento" v-model="Cliente.strDocIdent_NO" :disabled="tipoDocDisabled">                            
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
                            <el-tab-pane label="Direccion">
                                <div class="container">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="form-group row margint">
                                            <label class="el-form-item__label col-md-1" >Pais</label>
                                            <div class="col-md-1 grupolabel">
                                                <div class="input-group mb-1" >
                                                    <el-input class="validador" size ="small" @blur="desactivar_Pais" @focus="activar_Pais" v-model="Cliente.strCountry">                            
                                                        <el-button v-if="btnactivarpais && !paisVisible" slot="append" class="boton" icon="fa fa-clone" @click="paisDialog()"></el-button> 
                                                    </el-input>
                                                </div>
                                            </div>
                                            <label class="sinLinea el-form-item__label col-md-1" style="color:#1f2d3d;">{{gridSelectPais.strCountry_Name}}</label>
                                            <div class="col-md-1 grupolabel"></div>
                                            <label class="el-form-item__label col-md-1" >Region</label>
                                            <div class="col-md-1 grupolabel">
                                                <div class="input-group mb-1" >
                                                    <el-input size ="small" @blur="desactivar_Departamento" @focus="activar_Departamento" v-model="Cliente.strRegion_Cod" :disabled="departEnabled">                            
                                                        <el-button v-if="btnactivardepartamento && !departVisible" slot="append" class="boton" icon="fa fa-clone" @click="departDialog()"></el-button> 
                                                    </el-input>
                                                </div>
                                            </div> 
                                            <label class="sinLinea el-form-item__label col-md-1" style="color:#1f2d3d;">{{selectDepartamento.strRegion_Desc}}</label>
                                            <div class="col-md-1 grupolabel"></div>                           
                                        </div>
                                        <div class="form-group row margint">
                                            <label class="el-form-item__label col-md-1" >Provincia</label>
                                            <div class="col-md-2 grupolabel">
                                                <div class="input-group mb-2" >
                                                <el-input size ="small" v-model="Cliente.strProvince"  placeholder="">
                                    
                                                </el-input>
                                                </div>
                                            </div>
                                            <div class="col-md-1 grupolabel"></div>
                                            <label class="el-form-item__label col-md-1" >Distrito</label>
                                            <div class="col-md-2 grupolabel">
                                                <div class="input-group mb-2" >
                                                <el-input size ="small" v-model="Cliente.strDistrict"  placeholder="">
                                    
                                                </el-input>
                                                </div>
                                            </div> 
                                            <div class="col-md-1 grupolabel"></div>   
                                            <label class="el-form-item__label col-md-2" >Codigo postal</label>
                                            <div class="col-md-1 grupolabel">
                                                <div class="input-group mb-1" >
                                                <el-input size ="small" v-model="Cliente.strPostal_Cod"  placeholder="">
                                    
                                                </el-input>
                                                </div>
                                            </div>                         
                                        </div>
                                        <div class="form-group row margint">
                                            <label class="el-form-item__label col-md-1" >Direccion</label>
                                            <div class="col-md-6 grupolabel">
                                                <div class="input-group mb-6" >
                                                <el-input size ="small"  v-model="Cliente.strAddress" placeholder="">
                                    
                                                </el-input>
                                                </div>
                                            </div>
                                            <div class="col-md-1 grupolabel"></div>  
                                            <label class="el-form-item__label col-md-2" >Dias en pagar:</label>
                                            <div class="col-md-1 grupolabel">
                                                <div class="input-group mb-1" >
                                                <el-input size ="small" type="number" v-model="Cliente.intDayToPay"  placeholder="">                    
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
                                                    <el-input size ="small" @blur="desactivar_bancoA" @focus="activar_bancoA" v-model="Cliente.strBank_Cod">                            
                                                        <el-button v-if="btnactivarbancoA && !bancoVisible" slot="append" class="boton" icon="fa fa-clone" @click="bancoDialog('A')"></el-button> 
                                                    </el-input>
                                                </div>
                                            </div>
                                            <label class="sinLinea el-form-item__label col-md-2" style="color:#1f2d3d;" >{{selectBancoA.strBank_Name}}</label>
                                            <label class="el-form-item__label col-md-2" >Cuenta bancaria</label>
                                            <div class="col-md-2 grupolabel">
                                                <div class="input-group mb-2" >
                                                <el-input size ="small" v-model="Cliente.strBankAcct_Local_NO"  placeholder="">
                                    
                                                </el-input>
                                                </div>
                                            </div> 
                                            <label class="el-form-item__label col-md-1" >Moneda</label>
                                            <div class="col-md-1 grupolabel">
                                                <div class="input-group mb-1" >
                                                    <el-input size ="small" @blur="desactivar_monedaA" @focus="activar_monedaA" v-model="Cliente.strCurrency_Cod">                            
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
                                                    <el-input size ="small" @blur="desactivar_bancoB" @focus="activar_bancoB" v-model="Cliente.strBank_Corp_Cod">                            
                                                        <el-button v-if="btnactivarbancoB && !bancoVisible" slot="append" class="boton" icon="fa fa-clone" @click="bancoDialog('B')"></el-button> 
                                                    </el-input>
                                                </div>
                                            </div>
                                            <label class=" sinLinea el-form-item__label col-md-2" style="color:#1f2d3d;" >{{selectBancoB.strBank_Name}}</label>
                                            
                                            <label class="el-form-item__label col-md-2" >Cuenta </label>
                                            <div class="col-md-2 grupolabel">
                                                <div class="input-group mb-2" >
                                                <el-input size ="small" v-model="Cliente.strBankAcct_Corp_NO"  placeholder="">
                                    
                                                </el-input>
                                                </div>
                                            </div> 
                                            <label class="el-form-item__label col-md-1" >Moneda </label>
                                            <div class="col-md-1 grupolabel">
                                                <div class="input-group mb-1" >
                                                <el-input size ="small" @blur="desactivar_monedaB" @focus="activar_monedaB" v-model="Cliente.strCurrency_Corp">                            
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
                                                <el-input size ="small" @blur="desactivar_bancoC" @focus="activar_bancoC" v-model="Cliente.strBank_Other_Cod">                            
                                                    <el-button v-if="btnactivarbancoC && !bancoVisible" slot="append" class="boton" icon="fa fa-clone" @click="bancoDialog('C')"></el-button> 
                                                </el-input>
                                                </div>
                                            </div>
                                            <label class=" sinLinea el-form-item__label col-md-2" style="color:#1f2d3d;" >{{selectBancoC.strBank_Name}}</label>
                                            
                                            <label class="el-form-item__label col-md-2" >Cuenta Detraccion</label>
                                            <div class="col-md-2 grupolabel">
                                                <div class="input-group mb-2" >
                                                <el-input size ="small" v-model="Cliente.strBankAcct_Other_NO"  placeholder="">
                                    
                                                </el-input>
                                                </div>
                                            </div> 
                                            <label class="el-form-item__label col-md-1" >Moneda</label>
                                            <div class="col-md-1 grupolabel">
                                                <div class="input-group mb-1" >
                                                    <el-input size ="small" @blur="desactivar_monedaC" @focus="activar_monedaC" v-model="Cliente.strFore_Swift_Cod">                            
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
                                                <el-input size ="small" @blur="desactivar_bancoD" @focus="activar_bancoD" v-model="Cliente.strFore_Branch_Cod">                            
                                                    <el-button v-if="btnactivarbancoD && !bancoVisible" slot="append" class="boton" icon="fa fa-clone" @click="bancoDialog('D')"></el-button> 
                                                </el-input>
                                                </div>
                                            </div>
                                            <label class=" sinLinea el-form-item__label col-md-2" style="color:#1f2d3d;">{{selectBancoD.strBank_Name}}</label>
                                            
                                            <label class="el-form-item__label col-md-2" >Cuenta bancaria</label>
                                            <div class="col-md-2 grupolabel">
                                                <div class="input-group mb-2" >
                                                <el-input size ="small" v-model="Cliente.strFore_AccBank_NO"  placeholder="">
                                    
                                                </el-input>
                                                </div>
                                            </div> 
                                            <label class="el-form-item__label col-md-1" >Moneda</label>
                                            <div class="col-md-1 grupolabel">
                                                <div class="input-group mb-1" >
                                                    <el-input size ="small" @blur="desactivar_monedaD" @focus="activar_monedaD" v-model="Cliente.strFore_Curr_Cod">                            
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
                <div class="row" v-if="cardView">
                    <div class="col-sm-12" style="margin-top: 10px; ">
                        <el-tabs type="border-card" style="margin-right:100px;">
                            <el-tab-pane label="Retencion">
                                <div class="container">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="form-group row margint">
                                            <label class="el-form-item__label col-md-1" >Retencion</label>
                                            <div class="col-md-1 grupolabel">
                                                <div class="input-group mb-1" >
                                                    <el-input size ="small" @blur="desactivar_impuesto" @focus="activar_impuesto" v-model="Cliente.strRetention_Cod">                            
                                                        <el-button v-if="btnactivarimpuesto && !impuestoVisible" slot="append" class="boton" icon="fa fa-clone" @click="impuestoDialog()"></el-button> 
                                                    </el-input>
                                                </div>
                                            </div>  
                                            <label class="el-form-item__label col-md-1" >% Retencion</label>
                                            <div class="col-md-1 grupolabel">
                                                <div class="input-group mb-1" >
                                                <el-input type="number" size ="small" v-model="Cliente.fltRetention_Porcen"  placeholder="">
                                    
                                                </el-input>
                                                </div>
                                            </div>  
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="Detraccion">
                                <div class="container">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="form-group row margint">
                                                <label class="el-form-item__label col-md-1" >Detraccion</label>
                                                <div class="col-md-1 grupolabel">
                                                    <div class="input-group mb-1" >
                                                    <el-input size ="small" @blur="desactivar_detraccion" @focus="activar_detraccion" v-model="Cliente.strDetraccion_Cod">                            
                                                        <el-button v-if="btnactivardetraccion && !detraccionVisible" slot="append" class="boton" icon="fa fa-clone" @click="detraccionDialog()"></el-button> 
                                                    </el-input>
                                                    </div>
                                                </div>  
                                                <label class="el-form-item__label col-md-1" >%Detraccion</label>
                                                <div class="col-md-1 grupolabel">
                                                    <div class="input-group mb-1" >
                                                    <el-input type="number" size ="small" v-model="Cliente.fltDetraccion_Porcen"  placeholder="">
                                        
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
            <el-card class="box-card" v-if="cardView">
              <div slot="header" class="headercard">
                 <span class="labelheadercard" > Referencia Cliente</span>
                 
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
                        <label class="el-form-item__label col-md-2" >Cliente</label>
                        <div class="col-md-2 grupolabel">
                            <div class="input-group mb-2" >
                                <el-input size ="small" @blur="desactivar_cliente1" @focus="activar_cliente1" v-model="gridSelectedCliente.strCliente_NO"  placeholder="" :disabled="proDisabled">
                                    <el-button v-if="btnactivarcliente && !dialogVisible" slot="append" class="boton" icon="fa fa-clone" @click="loadClientes()"></el-button> 
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
                <img  src="../../../../../images/save.png" v-if="issave" style="width:16px; height:17px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 1.3rem;" @click="fnOcultar()"/>
                <img src="../../../../../images/error.png" v-if="iserror" style="width:16px; height:17px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 1.3rem;" @click="fnOcultar()"/>
                <span class="footertext2" style="" >{{textosave}}</span>
            </div>
            <div class="col-sm-3">
                <div style="text-align:right">
                    <img src="../../../../../images/collapse_derecha.png"  style="width:8px; height:10px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.3rem;" @click="fnOcultar()"/>
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
     <!--DIALOG BUSQUEDA CLIENTE-->
      <el-dialog
        title="Cliente"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <el-card class="box-card">
              <div slot="header" class="headercard">
                  <span class="labelheadercard" >Buscar Cliente</span>
              </div>
              <div class="row bodycard">
                  <div class="col-md-12">
                        <div class="form-group row">
                            <label class="el-form-item__label col-md-3" >Cliente Codigo</label>
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
                :data="gridCliente"
                stripe  :default-sort = "{prop: 'date', order: 'descending'}"
                style="width: 100%; cursor: pointer;" class="ExcelTable2007"
                highlight-current-row
                height="250"
                @row-dblclick="checkDoblePro"
                @current-change="clienteSelect">
                <el-table-column   prop="strCliente_NO" label="Codigo" width="180">
                </el-table-column>  
                <el-table-column  prop="strCliente_Desc" label="Descripcion" style="width: 70% !important;">
                </el-table-column> 
                <el-table-column  prop="strCountry" label="Pais" style="width: 70% !important;">
                </el-table-column> 
                </el-table>
          </el-card>
        <span slot="footer" class="dialog-footer">
            <img src="../../../../../images/check.png" style="width:13px; height:15px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.6rem;" @click="clienteCheck()"/>
            <img src="../../../../../images/close.png" style="width:17px; height:15px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.6rem;" @click="clienteClose()"/>
        </span>
        </el-dialog>
    <!--DIALOG BUSQUEDA PAIS-->
    <el-dialog title="Busqueda Pais" :visible.sync="paisVisible" @close="handleClosePais" size="small" >
      <bpais v-on:PaisSeleccionado="paisSelect($event)" v-on:closePais="handleClosePais()">
      </bpais>
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
                            <label class="el-form-item__label col-md-3" >{{Column}}</label>
                            <div class="col-md-2 grupolabel">
                                <div class="input-group mb-3" >
                                <el-input size ="small"   v-model="inputAtributo">
                                <el-button slot="append" class="boton" icon="fa fa-search" 
                                    @click="searchDepa()"
                                > </el-button>
                                </el-input>
                                </div>
                            </div>
                        </div>
                  </div>
              </div>
              <el-table
                :data="DepartamentoGrid"
                stripe  :default-sort = "{prop: 'date', order: 'descending'}"
                style="width: 100%; cursor: pointer;" class="ExcelTable2007"
                height="200"
                highlight-current-row
                @header-click="headerclick"
                @row-dblclick="departChosseCheck"
                @current-change="departSelect">
                <el-table-column :render-header="filterstrRegion_Cod"  prop="strRegion_Cod" label="Codigo" width="180" >
                </el-table-column>  
                <el-table-column :render-header="filterstrRegion_Desc" prop="strRegion_Desc" label="Nombre Departamento" style="width: 70% !important;">
                </el-table-column> 
                </el-table>
          </el-card>
        <span slot="footer" class="dialog-footer">
            <img src="../../../../../images/check.png" style="width:13px; height:15px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.6rem;" @click="departChosseCheck()"/>
            <img src="../../../../../images/close.png" style="width:17px; height:15px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.6rem;" @click="departChosseClose()"/>
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
    <!--DIALOG BUSQUEDA DETRACCION-->
    <el-dialog title="Busqueda Impuesto"  :visible.sync="detraccionVisible" @close="handleCloseImp" size="small" >
        <bimpuesto v-on:impuestoseleccionado="detraccionSelect($event)" v-on:impuestoClose="handleCloseImp()">
        </bimpuesto>
    </el-dialog>
  </div>  
  
</template>
<script>

import CrearClienteComponent from '@/components/FI-FINANZAS/maestro-datos/cuentas-cobrar/crear-cliente/crear-cliente.component'
export default CrearClienteComponent
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
