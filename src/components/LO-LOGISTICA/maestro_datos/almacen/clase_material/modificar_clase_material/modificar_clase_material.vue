<template>
    <div class="crear-ingreso-comprobante">
        <ol  style="margin-left: -1.5rem;background: linear-gradient(rgb(229, 241, 247) 0%, rgb(255, 255, 255) 100%);    margin-bottom: 0rem !important;">
            <quickaccessmenu v-on:guardarTodo="guardarTodo($event)"/>
        </ol>
        <el-card class="box-card">
            <div slot="header" class="headercard">
                <span class="labelheadercard" > {{txtmodulo}}</span>
                <!-- <el-button slot="append" class="boton" icon="fa fa-clone" @click="saveFactura()" :disabled="habilitar">Guardar</el-button>  -->
            </div>
            <div class="row bodycard">
                <div class="container">
                    <div class="row" style="margin-top: 3px;">
                        <div class="col-sm-9">
                            <div class="form-group row ">
                                <label class="el-form-item__label col-md-2" >Compañia</label>
                                <div class="col-md-2 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input  :disabled="true"
                                    size ="small" 
                                    @blur="desactivar_compania" 
                                    @focus="activar_compania" 
                                    v-model="clasematerial.strCompany_Cod">
                                        <el-button :disabled="true" v-if="btnactivarcompania && !dialogCompania" slot="append" class="boton" icon="fa fa-clone" @click="loadCompania()"></el-button> 
                                    </el-input>
                                    </div>
                                </div>
                                <span style="font-size: 11px;margin-top: 5px;">{{clasematerial.strCompany_Desc}}</span>
                            </div>
                            <div  class="form-group row ">
                                <label class="el-form-item__label col-md-2" >Clase</label>
                                <div class="col-md-2 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input :disabled="true" size ="small"  v-model="clasematerial.strMatClass_Cod" type="text">  
                                    </el-input>
                                    </div>
                                </div>
                            </div> 
                            <div  class="form-group row ">
                                <label class="el-form-item__label col-md-2" >Descripcion </label>
                                <div class="col-md-2 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input :disabled="visualizar" size ="small"  v-model="clasematerial.strMatClass_Desc" type="text">  
                                    </el-input>
                                    </div>
                                </div>
                            </div>   
                            <div  class="form-group row ">
                                <label class="el-form-item__label col-md-2" >Tipo</label>
                                <!-- <div class="col-md-2 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input :disabled="visualizar" size ="small"  v-model="clasematerial.strStock_Type_Desc" type="text">  
                                    </el-input>
                                    </div>
                                </div> -->
                                <div class="col-md-2 grupolabel">
                                    <div class="input-group mb-3" >
                                        <el-select :disabled="visualizar"  v-model="tiporequisicion" style="font-size:13px"  allow-create clearable placeholder="" size="mini" filterable>
                                            <el-option style="font-size:13px"
                                            v-for="item in tabletipoRequisicion"
                                                :key="item.strTypeReq_Cod"
                                                :label="item.strTipReq_Desc"
                                            :value="item.strTypeReq_Cod">
                                            </el-option>
                                        </el-select>
                                    </div>
                                </div>
                            </div>  
          
                            <div class="row">
                                <div class="col-sm-12" style="margin-top: 10px;">
                                    <el-tabs type="border-card">
                                        <el-tab-pane label="Detalle">
                                            <div class="container">
                                                 <div class="row">
                                                    <div class="col-sm-12">
                                                        <div class="form-group row">
                                                            <label class="el-form-item__label col-sm-3" >Cta. Contable</label>
                                                            <div class="col-sm-2 grupolabel">
                                                                <div class="input-group mb-3" >
                                                                <el-input size ="small" @blur="desactivar_CuentaContableHaber" @focus="activar_CuentaContableHaber('strAcct_Loc')" v-model="clasematerial.strAcct_Loc"  placeholder="">
                                                                    <el-button v-if="blnstrAcct_Loc && !dialogCuentaContableHaber" slot="append" class="boton" icon="fa fa-clone" @click="loadCuentaContableHaber('strAcct_Loc')"></el-button> 
                                                                </el-input>
                                                                </div>
                                                            </div>
                                                            <span style="font-size: 11px;margin-top: 5px;">{{clasematerial.strAcct_Loc_Desc}}</span>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label class="el-form-item__label col-sm-3" >Cta. Contable Corporativo</label>
                                                            <div class="col-sm-2 grupolabel">
                                                                <div class="input-group mb-3" >
                                                                <el-input size ="small" @blur="desactivar_CuentaContableHaber" @focus="activar_CuentaContableHaber('strAcct_Corp')" v-model="clasematerial.strAcct_Corp"  placeholder="">
                                                                    <el-button v-if="btnstrAcct_Corp && !dialogCuentaContableHaber" slot="append" class="boton" icon="fa fa-clone" @click="loadCuentaContableHaber('strAcct_Corp')"></el-button> 
                                                                </el-input>
                                                                </div>
                                                            </div>
                                                            <span style="font-size: 11px;margin-top: 5px;">{{clasematerial.strAcct_Corp_Desc}}</span>
                                                        </div>    
                                                        <div class="form-group row">
                                                            <label class="el-form-item__label col-sm-3" >Cta. Gasto</label>
                                                            <div class="col-sm-2 grupolabel">
                                                                <div class="input-group mb-3" >
                                                                <el-input size ="small" @blur="desactivar_CuentaContableHaber" @focus="activar_CuentaContableHaber('strExp_Cod_Loc')" v-model="clasematerial.strExp_Cod_Loc"  placeholder="">
                                                                    <el-button v-if="btnstrExp_Cod_Loc && !dialogCuentaContableHaber" slot="append" class="boton" icon="fa fa-clone" @click="loadCuentaContableHaber('strExp_Cod_Loc')"></el-button> 
                                                                </el-input>
                                                                </div>
                                                            </div>
                                                            <span style="font-size: 11px;margin-top: 5px;">{{clasematerial.strExp_Cod_Loc_Desc}}</span>
                                                        </div>    
                                                        <div class="form-group row">
                                                            <label class="el-form-item__label col-sm-3" >Cta. Gasto Corporativo</label>
                                                            <div class="col-sm-2 grupolabel">
                                                                <div class="input-group mb-3" >
                                                                <el-input size ="small" @blur="desactivar_CuentaContableHaber" @focus="activar_CuentaContableHaber('strExp_Cod_Corp')" v-model="clasematerial.strExp_Cod_Corp"  placeholder="">
                                                                    <el-button v-if="btnstrExp_Cod_Corp && !dialogCuentaContableHaber" slot="append" class="boton" icon="fa fa-clone" @click="loadCuentaContableHaber('strExp_Cod_Corp')"></el-button> 
                                                                </el-input>
                                                                </div>
                                                            </div>
                                                            <span style="font-size: 11px;margin-top: 5px;">{{clasematerial.strExp_Cod_Corp_Desc }}</span>
                                                        </div>    
                                                        <div class="form-group row">
                                                            <label class="el-form-item__label col-sm-3" >Cta. Compra Debe</label>
                                                            <div class="col-sm-2 grupolabel">
                                                                <div class="input-group mb-3" >
                                                                <el-input size ="small" @blur="desactivar_CuentaContableHaber" @focus="activar_CuentaContableHaber('strRecep_Deb')" v-model="clasematerial.strRecep_Deb"  placeholder="">
                                                                    <el-button v-if="btnstrRecep_Deb && !dialogCuentaContableHaber" slot="append" class="boton" icon="fa fa-clone" @click="loadCuentaContableHaber('strRecep_Deb')"></el-button> 
                                                                </el-input>
                                                                </div>
                                                            </div>
                                                            <span style="font-size: 11px;margin-top: 5px;">{{clasematerial.strRecep_Deb_Desc }}</span>
                                                        </div>                       
                                                        <div class="form-group row">
                                                            <label class="el-form-item__label col-sm-3" >Cta. Compra Haber</label>
                                                            <div class="col-sm-2 grupolabel">
                                                                <div class="input-group mb-3" >
                                                                <el-input size ="small" @blur="desactivar_CuentaContableHaber" @focus="activar_CuentaContableHaber('strRecep_Cred')" v-model="clasematerial.strRecep_Cred"  placeholder="">
                                                                    <el-button v-if="btnstrRecep_Cred && !dialogCuentaContableHaber" slot="append" class="boton" icon="fa fa-clone" @click="loadCuentaContableHaber('strRecep_Cred')"></el-button> 
                                                                </el-input>
                                                                </div>
                                                            </div>
                                                            <span style="font-size: 11px;margin-top: 5px;">{{clasematerial.strRecep_Cred_Desc }}</span>
                                                        </div>                       
                                                        <div class="form-group row">
                                                            <label class="el-form-item__label col-sm-3" >Cta. Ingreso Almacen Debe</label>
                                                            <div class="col-sm-2 grupolabel">
                                                                <div class="input-group mb-3" >
                                                                <el-input size ="small" @blur="desactivar_CuentaContableHaber" @focus="activar_CuentaContableHaber('strInvoice_Deb')" v-model="clasematerial.strInvoice_Deb"  placeholder="">
                                                                    <el-button v-if="btnstrInvoice_Deb && !dialogCuentaContableHaber" slot="append" class="boton" icon="fa fa-clone" @click="loadCuentaContableHaber('strInvoice_Deb')"></el-button> 
                                                                </el-input>
                                                                </div>
                                                            </div>
                                                            <span style="font-size: 11px;margin-top: 5px;">{{clasematerial.strInvoice_Deb_Desc }}</span>
                                                        </div>                       
                                                        <div class="form-group row">
                                                            <label class="el-form-item__label col-sm-3" >Cta. Ingreso Almacen Haber</label>
                                                            <div class="col-sm-2 grupolabel">
                                                                <div class="input-group mb-3" >
                                                                <el-input size ="small" @blur="desactivar_CuentaContableHaber" @focus="activar_CuentaContableHaber('strInvoice_Cred')" v-model="clasematerial.strInvoice_Cred"  placeholder="">
                                                                    <el-button v-if="btnstrInvoice_Cred && !dialogCuentaContableHaber" slot="append" class="boton" icon="fa fa-clone" @click="loadCuentaContableHaber('strInvoice_Cred')"></el-button> 
                                                                </el-input>
                                                                </div>
                                                            </div>
                                                            <span style="font-size: 11px;margin-top: 5px;">{{clasematerial.strInvoice_Cred_Desc }}</span>
                                                        </div>                       
                                                        <div class="form-group row">
                                                            <label class="el-form-item__label col-sm-3" >Cta. Salida Almacen Debe</label>
                                                            <div class="col-sm-2 grupolabel">
                                                                <div class="input-group mb-3" >
                                                                <el-input size ="small" @blur="desactivar_CuentaContableHaber" @focus="activar_CuentaContableHaber('strIssue_Deb')" v-model="clasematerial.strIssue_Deb"  placeholder="">
                                                                    <el-button v-if="btnstrIssue_Deb && !dialogCuentaContableHaber" slot="append" class="boton" icon="fa fa-clone" @click="loadCuentaContableHaber('strIssue_Deb')"></el-button> 
                                                                </el-input>
                                                                </div>
                                                            </div>
                                                            <span style="font-size: 11px;margin-top: 5px;">{{clasematerial.strIssue_Deb_Desc }}</span>
                                                        </div>                       
                                                        <div class="form-group row">
                                                            <label class="el-form-item__label col-sm-3" >Cta. Salida Almacen Haber</label>
                                                            <div class="col-sm-2 grupolabel">
                                                                <div class="input-group mb-3" >
                                                                <el-input size ="small" @blur="desactivar_CuentaContableHaber" @focus="activar_CuentaContableHaber('strIssue_Cred')" v-model="clasematerial.strIssue_Cred"  placeholder="">
                                                                    <el-button v-if="btnstrIssue_Cred && !dialogCuentaContableHaber" slot="append" class="boton" icon="fa fa-clone" @click="loadCuentaContableHaber('strIssue_Cred')"></el-button> 
                                                                </el-input>
                                                                </div>
                                                            </div>
                                                            <span style="font-size: 11px;margin-top: 5px;">{{clasematerial.strIssue_Cred_Desc }}</span>
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
                </div>
            </div>
            <br/>
        </el-card>
            
        <div class="footer1">
            <div class="row">
                <div class="col-sm-9" style="text-align:left" >
                    <img src="../../../../../../images/save.png" v-if="issave" style="width:16px; height:17px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 1.3rem;" @click="fnOcultar()"/>
                    <img src="../../../../../../images/cancelar.png" v-if="iserror" style="width:16px; height:17px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 1.3rem;" @click="fnOcultar()"/>
                    <span class="footertext2" style="" >{{textosave}}</span>
                </div>
                <div class="col-sm-3">
                    <div style="text-align:right">
                        <img src="../../../../../../images/collapse_derecha.png"  style="width:8px; height:10px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.3rem;" @click="fnOcultar()"/>
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
        <el-dialog title="Busqueda compañia"  :visible.sync="dialogCompania" @close="dialogCompaniaClose" size="small" >
            <bcompania v-on:companiaSeleccionado="companiaSeleccionado($event)" v-on:companiaClose="companiaClose()">
            </bcompania>
        </el-dialog>
        <el-dialog title="Centro Costo"  :visible.sync="dialogCentroCosto" @close="closeDialogCentroCosto" size="small" >
            <bcentrocosto v-on:centrocostoselecionado="centrocostoseleccionado($event)" v-on:centrocostosclose="closeDialogCentroCosto()">
            </bcentrocosto>
        </el-dialog>
        <el-dialog title="Busqueda Impuesto"  :visible.sync="dialogImpuesto" @close="closeDialogImpuesto" size="small" >
            <bimpuesto v-on:ImpuestoSeleccionado="ImpuestoSeleccionado($event)" v-on:companiaClose="closeImpuesto()">
            </bimpuesto>
        </el-dialog>
    
         <el-dialog title="Busqueda Orden de compra"  :visible.sync="dialogOrdenCompra" size="small" >
            <div>
                <el-card class="box-card">
                <div slot="header" class="headercard">
                    <span class="labelheadercard" >Buscar orden de compra</span>
                </div>
                <div class="row bodycard">
                    <div class="col-md-12">
                        <div class="form-group row">
                            <label class="el-form-item__label col-md-2" >Codigo</label>
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
                    :data="ordencompra"
                    stripe  :default-sort = "{prop: 'date', order: 'descending'}"
                    style="width: 100%;cursor: pointer;" class="ExcelTable2007"
                    height="250"
                    highlight-current-row
                    @row-dblclick="selectOrdenCompra"
                    @current-change="selectOrdenCompra">
                    <el-table-column  prop="strPO_NO" label="Codigo" width="180">
                    </el-table-column>  
                    <el-table-column  prop="strPO_Desc" label="Descripcion" style="width: 70% !important;">
                    </el-table-column> 
                </el-table>
            </el-card>
            <br/>
            <footer class="modal-footer">
                <el-button class="buttonfilter btn btn-outline-secondary orange" @click="checkOrdenCompra()">
                <img class="imagenfilter" src="../../../../../../images/check.png" alt="" >
                </el-button>
                <el-button class="buttonfilter btn btn-outline-secondary orange" style="margin-left: 0px;"  @click="closeOrdenCompra()">
                <img class="imagenfilter" src="../../../../../../images/close.png" alt="" >
                </el-button>
            </footer>
            </div>
        </el-dialog>
        <el-dialog title="Moneda"  :visible.sync="dialogMoneda" @close="closeDialogMoneda" size="small" >
            <bmoneda v-on:MonedaSeleccionado="MonedaSeleccionado($event)" v-on:closeMoneda="closeMoneda()">
            </bmoneda>
        </el-dialog> 
        <el-dialog title="Grupo Proceso"  :visible.sync="dialogGrupoProceso" @close="closeDialogGrupoProceso" size="small" >
            <bgrupoproceso v-on:grupoprocesoseleccionado="grupoprocesoseleccionado($event)" v-on:closegrupoproceso="closeDialogGrupoProceso()">
            </bgrupoproceso>
        </el-dialog> 
        <el-dialog title="Grupo Proceso"  :visible.sync="dialogGrupoProceso" @close="closeDialogGrupoProceso" size="small" >
            <bgrupoproceso v-on:grupoprocesoseleccionado="grupoprocesoseleccionado($event)" v-on:closegrupoproceso="closeDialogGrupoProceso()">
            </bgrupoproceso>
        </el-dialog>   
        <el-dialog title="Grupo Area"  :visible.sync="dialogGrupoArea" @close="closeDialogGrupoArea" size="small" >
            <bgrupoarea v-on:grupoareaseleccionado="grupoareaseleccionado($event)" v-on:closegrupoproceso="closeDialogGrupoArea()">
            </bgrupoarea>
        </el-dialog> 
        
        <el-dialog title="Categoria Centro Costos"  :visible.sync="dialogCategoriaCentroCosto" @close="closeDialogCategoriaCentroCosto" size="small" >
            <bcategoriacentrocosto v-on:categoriacentrocostoseleccionado="categoriacentrocostoseleccionado($event)" v-on:closecategoriacentrocosto="closeDialogCategoriaCentroCosto()">
            </bcategoriacentrocosto>
        </el-dialog> 
        


        <el-dialog title="Cuenta Contable Haber"  :visible.sync="dialogCuentaContableHaber" @close="closeDialogCuentaContableHaber" size="small" >
            <bcuentacontable v-on:cuentacontableselecionado="cuentacontableselecionadohaber($event)" v-on:cuentacontableClose="closeDialogCuentaContableHaber()">
            </bcuentacontable>
        </el-dialog> 

        <el-dialog title="Cuenta Contable Debe"  :visible.sync="dialogCuentaContableDebe" @close="closeDialogCuentaContableDebe" size="small" >
            <bcuentacontable v-on:cuentacontableselecionado="cuentacontableselecionadodebe($event)" v-on:cuentacontableClose="closeDialogCuentaContableDebe()">
            </bcuentacontable>
        </el-dialog> 

        
        <el-dialog title="Diarios" :visible.sync="dialogDiario" @close="closeDialogDiario" size="small" >
            <div>
                <el-card class="box-card">
                <div slot="header" class="headercard">
                    <span class="labelheadercard" >Buscar Diario</span>
                </div>
                <div class="row bodycard">
                    <div class="col-md-12">
                        <div class="form-group row">
                            <label class="el-form-item__label col-md-3" >Diario Codigo</label>
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
                    :data="diarioModel"
                    stripe  :default-sort = "{prop: 'date', order: 'descending'}"
                    style="width: 100%;cursor: pointer;" class="ExcelTable2007"
                    height="250"
                    highlight-current-row
                    @row-dblclick="checkSelectdbDiario"
                    @current-change="checkSelectDiario">
                    <el-table-column  prop="strDaily_Cod" label="Codigo" width="180">
                    </el-table-column>  
                    <el-table-column  prop="strDaily_Desc" label="Descripcion" style="width: 70% !important;">
                    </el-table-column> 
                    <el-table-column  prop="strDaily_Type" label="Tipo" width="180">
                    </el-table-column> 
                </el-table>
            </el-card>
            <br/>
            <footer class="modal-footer">
                <el-button class="buttonfilter btn btn-outline-secondary orange" @click="checkSelectdbDiario()">
                <img class="imagenfilter" src="../../../../../../images/check.png" alt="" >
                </el-button>
                <el-button class="buttonfilter btn btn-outline-secondary orange" style="margin-left: 0px;"  @click="closeDiario()">
                <img class="imagenfilter" src="../../../../../../images/close.png" alt="" >
                </el-button>
            </footer>
            </div>
        </el-dialog>
    </div>  
</template>
<script>

import ModificarClaseMaterialComponent from '@/components/LO-LOGISTICA/maestro_datos/almacen/clase_material/modificar_clase_material/modificar_clase_material.component'
export default ModificarClaseMaterialComponent
</script>
<style scoped>
    
</style>
