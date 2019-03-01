
<template>
  <div class="al-crear">
    <ol  style="margin-left: -1.5rem;background: linear-gradient(rgb(229, 241, 247) 0%, rgb(255, 255, 255) 100%);    margin-bottom: 0rem !important;">
        <quickaccessmenu v-on:guardarTodo="guardarTodo($event)" v-on:validarView="validarView()"/>
    </ol> 
    <el-card class="box-card">
        <div slot="header" class="headercard">
            <span class="labelheadercard" >Modificar Material</span>
        </div>
        <div class="row bodycard">
            <div class="container">
                <div class="row" style="margin-top: 3px;">
                    <div class="col-sm-6" >
                        <div class="form-group row ">
                            <label class="el-form-item__label col-md-3" >Compañia</label>
                            <div class="col-md-3 grupolabel">
                                <div class="input-group mb-3" >
                                <el-input size ="small" :disabled="visualizar" @blur="desactivar_compania" @focus="activar_compania" v-model="productoModel.strCompany_Cod"  @keyup.enter.native="enterCompania(productoModel.strCompany_Cod)"  @keyup.delete.native="borrarCompania()" placeholder="">
                                    <el-button v-if="btnactivarcompania && !dialogCompania" slot="append" class="boton" icon="fa fa-clone" @click="loadCompania()"></el-button> 
                                </el-input>
                                </div>
                            </div>
                            <span style="font-size: 11px;margin-top: 5px;">{{productoModel.strCompany_Desc}}</span>
                        </div> 
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-6" >
                        <div class="form-group row ">
                            <label class="el-form-item__label col-md-3" >Código Material</label>
                            <div class="col-md-3 grupolabel">
                                <div class="input-group mb-3" >
                                <el-input size ="small" :disabled="visualizar" @focus="limpiarBotones" v-model="productoModel.strStock_Cod"  placeholder="">
                                </el-input>
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-6" >
                        <div class="form-group row ">
                            <label class="el-form-item__label col-md-3" >Descripcion</label>
                            <div class="col-md-6 grupolabel">
                                <div class="input-group mb-3" >
                                <el-input size ="small" :disabled="visualizar" @focus="limpiarBotones" v-model="productoModel.strStock_Desc"  placeholder="">
                                </el-input>
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>
                <br/>
                <el-card class="box-card" style="margin-left: -10px;">
                    <div slot="header" class="headercard">
                        <span class="labelheadercard" >Datos Generales</span>
                    </div>
                    <div class="row bodycard">
                        <div class="container">
                            <div class="row">
                                <div class="col-sm-3" >
                                    <div class="form-group row ">
                                        <label class="el-form-item__label col-md-6" >Código Antiguo</label>
                                        <div class="col-md-6 grupolabel">
                                            <div class="input-group mb-3" >
                                            <el-input :disabled="visualizar" size ="small" @focus="limpiarBotones" v-model="productoModel.strStock_Cod_Old"  placeholder="">
                                            </el-input>
                                            </div>
                                        </div>
                                    </div> 
                                </div>
                                <div class="col-sm-9" >
                                    <div class="form-group row ">
                                        <label class="el-form-item__label col-md-2" >Código Almacen</label>
                                        <div class="col-md-2 grupolabel">
                                            <div class="input-group mb-3" >
                                            <el-input :disabled="visualizar" size ="small" @blur="desactivar_almacen" @focus="activar_almacen" v-model="productoModel.strWHS_Cod"  placeholder=""  @keyup.enter.native="enterAlmacen(productoModel.strWHS_Cod)"  @keyup.delete.native="borrarAlmacen()">
                                                <el-button v-if="btnactivaralmacen && !dialogAlmacen" slot="append" class="boton" icon="fa fa-clone" @click="loadAlmacen()"></el-button> 
                                            </el-input>
                                            </div>
                                        </div>
                                        <span style="font-size: 11px;margin-top: 5px;">{{productoModel.strWHS_Desc}}</span>
                                    </div> 
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-3" >
                                    <div class="form-group row ">
                                        <label class="el-form-item__label col-md-6" >Numero Parte</label>
                                        <div class="col-md-6 grupolabel">
                                            <div class="input-group mb-3" >
                                            <el-input size ="small" :disabled="visualizar" @focus="limpiarBotones" v-model="productoModel.strPart_NO"  placeholder="">
                                            </el-input>
                                            </div>
                                        </div>
                                    </div> 
                                </div>
                                <div class="col-sm-9" >
                                    <div class="form-group row ">
                                        <label class="el-form-item__label col-md-2" >Tipo</label>
                                        <div class="col-md-2 grupolabel">
                                            <div class="input-group mb-3" >
                                            <el-input size ="small" :disabled="visualizar" @blur="desactivar_compania" @focus="activar_compania" v-model="productoModel.strStock_Type"  placeholder="">
                                                <el-button v-if="btnactivarcompania && !dialogCompania" slot="append" class="boton" icon="fa fa-clone" @click="loadCompania()"></el-button> 
                                            </el-input>
                                            </div>
                                        </div>
                                    </div> 
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-3" >
                                    <div class="form-group row ">
                                        <label class="el-form-item__label col-md-6" >Marca</label>
                                        <div class="col-md-6 grupolabel">
                                            <div class="input-group mb-3" >
                                            <el-input size ="small" :disabled="visualizar" @focus="limpiarBotones" v-model="productoModel.strMark"  placeholder="">
                                            </el-input>
                                            </div>
                                        </div>
                                    </div> 
                                </div>
                                <div class="col-sm-9" >
                                    <div class="form-group row ">
                                        <label class="el-form-item__label col-md-2" >Flota</label>
                                        <div class="col-md-2 grupolabel">
                                            <div class="input-group mb-3" >
                                            <el-input :disabled="visualizar" size ="small" @focus="limpiarBotones" v-model="productoModel.strFleet"  placeholder="">
                                            </el-input>
                                            </div>
                                        </div>
                                    </div> 
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-3" >
                                    <div class="form-group row ">
                                        <label class="el-form-item__label col-md-6" >Cantidad Maxima</label>
                                        <div class="col-md-6 grupolabel">
                                            <div class="input-group mb-3" >
                                                <el-input :disabled="visualizar" size ="small" v-model="productoModel.fltQtyLimit_Max"  @focus="limpiarBotones"  type="number">                            
                                                </el-input>
                                            </div>
                                        </div>
                                    </div> 
                                </div>
                                <div class="col-sm-9" >
                                    <div class="form-group row ">
                                        <label class="el-form-item__label col-md-2" >Clase Material</label>
                                        <div class="col-md-2 grupolabel">
                                            <div class="input-group mb-3" >
                                            <el-input :disabled="visualizar" size ="small" @blur="desactivar_clase_material" @focus="activar_clase_material" v-model="productoModel.strMaterial_Class"  placeholder="" @keyup.enter.native="enterClaseMaterial(productoModel.strMaterial_Class)"  @keyup.delete.native="borrarClaseMaterial()">
                                                <el-button v-if="btnactivarclasematerial && !dialogClaseMaterial" slot="append" class="boton" icon="fa fa-clone" @click="loadClaseMaterial()"></el-button> 
                                            </el-input>
                                            </div>
                                        </div>
                                        <span style="font-size: 11px;margin-top: 5px;">{{productoModel.strMatClass_Desc}}</span>
                                    </div> 
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-3" >
                                    <div class="form-group row ">
                                        <label class="el-form-item__label col-md-6" >Factor</label>
                                        <div class="col-md-6 grupolabel">
                                            <div class="input-group mb-3" >
                                                <el-input size ="small" :disabled="visualizar" v-model="productoModel.fltFactor" @focus="limpiarBotones"  type="number">                            
                                                </el-input>
                                            </div>
                                        </div>
                                    </div> 
                                </div>
                                <div class="col-sm-9" >
                                    <div class="form-group row ">
                                        <label class="el-form-item__label col-md-2" >Criticidad</label>
                                        <div class="col-md-2 grupolabel">
                                            <div class="input-group mb-3" >
                                            <el-input size ="small" :disabled="visualizar" @blur="desactivar_criticidad" @focus="activar_criticidad" v-model="productoModel.strCritical_Item"  placeholder="" @keyup.enter.native="enterCriticidad(productoModel.strCritical_Item)"  @keyup.delete.native="borrarCriticidad()">
                                                <el-button v-if="btnactivarcriticidad && !dialogCriticidad" slot="append" class="boton" icon="fa fa-clone" @click="loadCriticidad()"></el-button> 
                                            </el-input>
                                            </div>
                                        </div>
                                         <span style="font-size: 11px;margin-top: 5px;">{{productoModel.strCritical_Desc}}</span>
                                    </div> 
                                </div>
                            </div>
                            
                            <div class="row">
                                
                                <div class="col-sm-3" >
                                    <div class="form-group row ">
                                        <label class="el-form-item__label col-md-6" >Cantidad</label>
                                        <div class="col-md-6 grupolabel">
                                            <div class="input-group mb-3" >
                                                <el-input :disabled="visualizar" size ="small" v-model="productoModel.fltQuantity"  @focus="limpiarBotones" type="number">                            
                                                </el-input>
                                            </div>
                                        </div>
                                    </div> 
                                </div>
                                <div class="col-sm-9" >
                                    <div class="form-group row ">
                                        <label class="el-form-item__label col-md-2" >Proveedor</label>
                                        <div class="col-md-2 grupolabel">
                                            <div class="input-group mb-3" >
                                            <el-input :disabled="visualizar" size ="small" @blur="desactivar_proveedor" @focus="activar_proveedor" v-model="productoModel.strVendor_NO"  placeholder="" @keyup.enter.native="enterProveedor(productoModel.strVendor_NO)"  @keyup.delete.native="borrarProveedor()">
                                                <el-button v-if="btnactivarproveedor && !dialogProveedor" slot="append" class="boton" icon="fa fa-clone" @click="LoadProveedor()"></el-button> 
                                            </el-input>
                                            </div>
                                        </div>
                                        <span style="font-size: 11px;margin-top: 5px;">{{productoModel.strVendor_Desc}}</span>
                                    </div> 
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-3" >
                                    <div class="form-group row ">
                                        <label class="el-form-item__label col-md-6" >Cantidad Minima</label>
                                        <div class="col-md-6 grupolabel">
                                            <div class="input-group mb-3" >
                                                <el-input :disabled="visualizar" size ="small" v-model="productoModel.fltQtyLimit_Min" @focus="limpiarBotones"  type="number">                            
                                                </el-input>
                                            </div>
                                        </div>
                                    </div> 
                                </div>
                                <div class="col-sm-9" >
                                    <div class="form-group row ">
                                        <label class="el-form-item__label col-md-2" >Cta. Gasto</label>
                                        <div class="col-md-2 grupolabel">
                                            <div class="input-group mb-3" >
                                            <el-input :disabled="visualizar"  @blur="desactivar_cuenta_contable" @focus="activar_cuenta_contable" size="small" v-model="productoModel.strExp_Acct" @keyup.enter.native="enterCuentaGastos(productoModel.strExp_Acct)"  @keyup.delete.native="borrarCuentaGastos()">
                                                <el-button slot="append" v-if="btnactivarcuentacontable && !dialogCuentaContable" class="boton" icon="fa fa-clone" @click="LoadCuentaContable()"></el-button>  
                                            </el-input>
                                            </div>
                                        </div>
                                        <span style="font-size: 11px;margin-top: 5px;">{{productoModel.strAcc_Desc}}</span>
                                    </div> 
                                </div>
                                
                            </div>
                            <div class="row">
                                <div class="col-sm-3" >
                                    <div class="form-group row ">
                                        <label class="el-form-item__label col-md-6" >P. Unitario PEN</label>
                                        <div class="col-md-6 grupolabel">
                                            <div class="input-group mb-3" >
                                                <el-input size ="small" :disabled="visualizar" v-model="productoModel.fltActual_Local" @focus="limpiarBotones"  type="number">                            
                                                </el-input>
                                            </div>
                                        </div>
                                    </div> 
                                </div>
                                <div class="col-sm-9" >
                                    <div class="form-group row ">
                                        <label class="el-form-item__label col-md-2" >Categ. Material</label>
                                        <div class="col-md-2 grupolabel">
                                            <div class="input-group mb-3" >
                                            <el-input size ="small" :disabled="visualizar" @blur="desactivar_categoria_material" @focus="activar_categoria_material" v-model="productoModel.strMaterial_Categ"  placeholder="" @keyup.enter.native="enterCategoriaMaterial(productoModel.strMaterial_Categ)"  @keyup.delete.native="borrarCategoriaMaterial()">
                                                <el-button v-if="btnactivarcategoriamaterial && !dialogCategoriaMaterial" slot="append" class="boton" icon="fa fa-clone" @click="loadCategoriaMaterial()"></el-button> 
                                            </el-input>
                                            </div>
                                        </div>
                                         <span style="font-size: 11px;margin-top: 5px;">{{productoModel.strCategMat_Desc}}</span>
                                    </div> 
                                </div>
                            </div>
                            
                            <div class="row">
                                
                                <div class="col-sm-3" >
                                    <div class="form-group row ">
                                        <label class="el-form-item__label col-md-6" >P. Unitario USD</label>
                                        <div class="col-md-6 grupolabel">
                                            <div class="input-group mb-3" >
                                                <el-input size ="small" :disabled="visualizar" v-model="productoModel.fltActual_USD" @focus="limpiarBotones"   type="number">                            
                                                </el-input>
                                            </div>
                                        </div>
                                    </div> 
                                </div>
                                <div class="col-sm-9" >
                                    <div class="form-group row ">
                                        <label class="el-form-item__label col-md-2" >Grupo Comprador</label>
                                        <div class="col-md-2 grupolabel">
                                            <div class="input-group mb-3" >
                                            <el-input size ="small" :disabled="visualizar" @blur="desactivar_grupo_comprador" @focus="activar_grupo_comprador" v-model="productoModel.strGrpPurch_Cod"  placeholder="" @keyup.enter.native="enterGrupoComprador(productoModel.strGrpPurch_Cod)"  @keyup.delete.native="borrarGrupoComprador()">
                                                <el-button v-if="btnactivargrupocomprador && !dialogGrupoComprador" slot="append" class="boton" icon="fa fa-clone" @click="loadGrupoComprador()"></el-button> 
                                            </el-input>
                                            </div>
                                        </div>
                                        <span style="font-size: 11px;margin-top: 5px;">{{productoModel.strGrpPurch_Desc}}</span>
                                    </div> 
                                </div>
                            </div>
                            
                            <div class="row">
                                <div class="col-sm-3" >
                                    <div class="form-group row ">
                                        <label class="el-form-item__label col-md-6" >Saldo Cantidad </label>
                                        <div class="col-md-6 grupolabel">
                                            <div class="input-group mb-3" >
                                                <el-input :disabled="visualizar" size ="small" v-model="productoModel.fltQuantity_Balance" @focus="limpiarBotones"  type="number">                            
                                                </el-input>
                                            </div>
                                        </div>
                                    </div> 
                                </div>
                                <div class="col-sm-9" >
                                    <div class="form-group row ">
                                        <label class="el-form-item__label col-md-2" >Control Precio</label>
                                        <div class="col-md-2 grupolabel">
                                            <div class="input-group mb-3" >
                                            <el-input size ="small" :disabled="visualizar" @blur="desactivar_control_precio" @focus="activar_control_precio" v-model="productoModel.fltPriceControl"  placeholder="" @keyup.enter.native="enterControlPrecio(productoModel.fltPriceControl)"  @keyup.delete.native="borrarControlPrecio()">
                                                <el-button v-if="btnactivarcontrolprecio && !dialogControlPrecio" slot="append" class="boton" icon="fa fa-clone" @click="loadControlPrecio()"></el-button> 
                                            </el-input>
                                            </div>
                                        </div>
                                        <span style="font-size: 11px;margin-top: 5px;">{{productoModel.strCtlPrec_Desc}}</span>
                                    </div> 
                                </div>
                            </div>
                            <div class="row">
                                
                                <div class="col-sm-3" >
                                    <div class="form-group row ">
                                        <label class="el-form-item__label col-md-6" >Importe_Actual USD</label>
                                        <div class="col-md-6 grupolabel">
                                            <div class="input-group mb-3" >
                                                <el-input :disabled="visualizar" size ="small" v-model="productoModel.fltActual_USD" @focus="limpiarBotones"   type="number">                            
                                                </el-input>
                                            </div>
                                        </div>
                                    </div> 
                                </div>
                                <div class="col-sm-9" >
                                    <div class="form-group row ">
                                        <label class="el-form-item__label col-md-2" >Impuesto </label>
                                        <div class="col-md-2 grupolabel">
                                            <div class="input-group mb-3" >
                                            <el-input :disabled="visualizar" size ="small" @blur="desactivar_impuesto" @focus="activar_impuesto"  v-model="productoModel.strTAX_Ind"  placeholder="" @keyup.enter.native="enterImpuesto(productoModel.strTAX_Ind)"  @keyup.delete.native="borrarImpuesto()">
                                                <el-button v-if="btnactivarimpuesto && !dialogImpuesto" slot="append" class="boton" icon="fa fa-clone" @click="loadImpuesto()"></el-button> 
                                            </el-input>
                                            </div>
                                        </div>
                                        <span style="font-size: 11px;margin-top: 5px;">{{desimpuesto}}</span>
                                    </div> 
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-3" >
                                    <div class="form-group row ">
                                        <label class="el-form-item__label col-md-6" >Importe Actual PEN </label>
                                        <div class="col-md-6 grupolabel">
                                            <div class="input-group mb-3" >
                                                <el-input size ="small" :disabled="visualizar" v-model="productoModel.fltActual_Local" @focus="limpiarBotones" type="number">                            
                                                </el-input>
                                            </div>
                                        </div>
                                    </div> 
                                </div>
                                <div class="col-sm-9" >
                                    <div class="form-group row ">
                                        <label class="el-form-item__label col-md-2" >UM </label>
                                        <div class="col-md-2 grupolabel">
                                            <div class="input-group mb-3" >
                                            <el-input size ="small" :disabled="visualizar" @blur="desactivar_unidad_medida" @focus="activar_unidad_medida" v-model="productoModel.strUM_Cod"   placeholder="" @keyup.enter.native="enterUnidadMedida(productoModel.strUM_Cod)"  @keyup.delete.native="borrarUnidadMedida()">
                                                <el-button v-if="btnactivarunidadmedida && !dialogUnidadMedida" slot="append" class="boton" icon="fa fa-clone" @click="loadUnidadMedida()"></el-button> 
                                            </el-input>
                                            </div>
                                        </div>
                                        <span style="font-size: 11px;margin-top: 5px;">{{productoModel.strUM_Desc}}</span>
                                    </div> 
                                </div>
                            </div>
                        </div>
                    </div>
                </el-card>
                
            </div>
        </div>
    </el-card>
    <div class="footer1">
        <div class="row">
            <div class="col-sm-9" style="text-align:left" >
                <img src="../../../../images/save.png" v-if="issave" style="width:16px; height:17px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 1.3rem;" @click="fnOcultar()"/>
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
    <!--DIALOG BUSQUEDA UNIDAD MEDIDA-->
    <el-dialog title="Busqueda unidad medida"  :visible.sync="dialogUnidadMedida" @close="closeUnidadMedida" size="small" >
      <bunidadmedida v-on:unidadmedidaselecionado="SeleccionadoUnidadMedida($event)" v-on:unidadmedidaClose="unidadmedidaClose($event)">
      </bunidadmedida>
    </el-dialog>

    <!--DIALOG BUSQUEDA IMPUESTO-->
    <el-dialog title="Busqueda Impuesto"  :visible.sync="dialogImpuesto" @close="closeImpuesto" size="small" >
      <bimpuesto v-on:impuestoselecionado="SeleccionadoImpuesto($event)" v-on:impuestoClose="impuestoClose($event)">
      </bimpuesto>
    </el-dialog>
    <!--DIALOG BUSQUEDA CONTROL PRECIO-->
    <el-dialog title="Busqueda Control Precio"  :visible.sync="dialogControlPrecio" @close="closeControlPrecio" size="small" >
      <bcontrolprecio v-on:controlprecioselecionado="SeleccionadoControlPrecio($event)" v-on:controlprecioClose="controlprecioClose($event)">
      </bcontrolprecio>
    </el-dialog>
    <!--DIALOG BUSQUEDA PROVEEDOR-->
    <el-dialog title="Busqueda proveedor"  :visible.sync="dialogProveedor" @close="closeProveedor" size="small" >
      <bproveedor v-on:proveedorselecionado="SeleccionadoProveedor($event)" v-on:proveedorClose="proveedorClose($event)">
      </bproveedor>
    </el-dialog>
    <!--DIALOG GRUPO COMPRADOR-->
    <el-dialog title="Busqueda Grupo Comprador" :visible.sync="dialogGrupoComprador" @close="closeGrupoComprador" size="small" >
      <bgrupocomprador v-on:grupocompradorSeleccionado="grupocompradorSeleccionado($event)" v-on:grupocompradorClose="grupocompradorClose()">
      </bgrupocomprador>
    </el-dialog>
    <!--DIALOG CRITICIDAD-->
    <el-dialog title="Busqueda Criticidad" :visible.sync="dialogCriticidad" @close="closeCriticidad" size="small" >
      <bcriticidad v-on:criticidadseleccionado="criticidadSeleccionado($event)" v-on:criticidadClose="criticidadClose($event);">
      </bcriticidad>
    </el-dialog>
    <!--DIALOG BUSQUEDA COMPAÑIA-->
    <el-dialog title="Busqueda Compañia" :visible.sync="dialogCompania" @close="closeCompania" size="small" >
      <bcompania v-on:companiaSeleccionado="companiaSeleccionado($event);" v-on:companiaClose="companiaClose($event);" >
      </bcompania>
    </el-dialog>
    <!--DIALOG BUSQUEDA CUENTA CONTABLE-->
    <el-dialog title="Busqueda Cuenta Contable"  :visible.sync="dialogCuentaContable" @close="closeCuentaContable" size="small" >
      <bcuentacontable v-on:cuentacontableselecionado="SeleccionadoCuentaContable($event)" v-on:cuentacontableClose="cuentacontableClose($event)">
      </bcuentacontable>
    </el-dialog>
     <!--DIALOG BUSQUEDA ALMACEN-->
    <el-dialog title="Busqueda Almacen"  :visible.sync="dialogAlmacen" @close="closeAlmacen" size="small" >
      <balmacen v-on:almacenseleccionado="SeleccionadoAlmacen($event)" v-on:companiaAlmacen="companiaAlmacen($event)">
      </balmacen>
    </el-dialog>
     <!--DIALOG CLASE MATERIAL-->
    <el-dialog title="Busqueda Clase Material"  :visible.sync="dialogClaseMaterial" @close="closeClaseMaterial" size="small" >
      <bclasematerial v-on:clasematerialseleccionado="SeleccionadoClaseMaterial($event)" v-on:clasematerialClose="clasematerialClose($event);" >
      </bclasematerial>
    </el-dialog>
     <!--DIALOG CATEGORIA MATERIAL-->
    <el-dialog title="Busqueda Categoria Material"  :visible.sync="dialogCategoriaMaterial" @close="closeCategoriaMaterial" size="small" >
      <bcategoriamaterial v-on:categoriamaterialseleccionado="SeleccionadoCategoriaMaterial($event)" v-on:categoriamaterialClose="categoriamaterialClose($event)">
      </bcategoriamaterial>
    </el-dialog>
</div>  
  
</template>
<script>
import ModificarMaterialComponent from '@/components/LO-LOGISTICA/almacen/al_modificar/al_modificar.component'
export default ModificarMaterialComponent
</script>
<style scoped>

</style>
