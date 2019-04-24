<template>
    <div class="crear-hes">
      <ol  style="margin-left: -1.5rem;background: linear-gradient(rgb(229, 241, 247) 0%, rgb(255, 255, 255) 100%);    margin-bottom: 0rem !important;">
        <quickaccessmenu v-on:checkViewHES="checkViewHES($event)" v-on:backPage="backPage($event)"  v-on:reloadpage="reloadpage($event)"></quickaccessmenu>
        </ol>
      <el-card class="box-card">
          
            <div slot="header" class="headercard">
                <span class="labelheadercard" >{{txtmodulo}}</span>
                <el-button v-if="vifaprobarrechasar" class="buttonfilter btn btn-outline-secondary orange" style="margin-top: -2px;
                    width: inherit;
                    background: #4685b5;
                    border-color: transparent;
                    color: #f6f7f9;
                    padding: 4px 4px 4px 4px !important;" @click="aprobar()">
                    Aprobar
                </el-button>
            </div>
            <div class="row bodycard">
                <div class="container">
                    <div class="row" style="margin-top: 3px;">
                        <div class="col-sm-6">
                            <div class="form-group row ">
                                <label class="el-form-item__label col-md-3" >Aceptación servicio</label>
                                    <div class="col-md-3 grupolabel">
                                        <div class="input-group mb-3" >
                                         <el-input size ="small" @blur="desactivar_HES" @focus="activar_HES" v-model="hesModel.strHES_NO" class="inputOrdenCompra">                            
                                            <el-button v-if="btnactivarHES && !dialogHES" slot="append" class="boton" icon="fa fa-clone" @click="loadHES()"></el-button> 
                                        </el-input>
                                    </div>
                                </div>     
                                <label class="el-form-item__label col-md-3" >Compañia</label>
                                    <div class="col-md-3 grupolabel">
                                        <div class="input-group mb-3" >
                                         <el-input size ="small" v-model="hesModel.strCompany_Cod" disabled>  
                                        </el-input>
                                    </div>
                                </div>                                                      
                            </div>
                            <div class="form-group row">                                
                                <label class="el-form-item__label col-md-3" >Orden Compra </label>
                                    <div class="col-md-3 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input size ="small"  v-model="hesModel.strPO_NO" class="inputOrdenCompra" :disabled="valueSwtch"> 
                                        </el-input>
                                    </div>
                                </div>                                
                            </div>
                            <div class="form-group row" >                                
                                <label class="el-form-item__label col-md-3" >Descripción PO</label>
                                    <div class="col-md-9 grupolabel">
                                    <div class="input-group mb-9" >
                                    <el-input size ="small"  v-model="hesModel.strDesc_Header" disabled>
                                    </el-input>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row" style="margin-top:10px;">
                                <label class="el-form-item__label col-md-3" >Orden Compra Detalle</label>
                                    <div class="col-md-3 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input size ="small" v-model="hesModel.intIdPOD_ID" class="inputOrdenCompra" :disabled="valueSwtch"> 
                                    </el-input>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row" >
                                <label class="el-form-item__label col-md-3" >Descripción Servicio</label>
                                    <div class="col-md-3 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input size ="small" v-model="hesModel.strPO_Item_Desc" class="inputOrdenCompra" :disabled="valueSwtch"> 
                                    </el-input>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="form-group row">
                                <div class="col-md-3 grupolabel"></div>
                                <div class="col-sm-3"></div>
                                <div class="col-md-4" style="margin-top:5px;">
                                    <span v-if="isactivered" v-bind:class="{red1:isactivered}">&nbsp;</span>
                                    <span v-if="!isactivered" v-bind:class="{opaco:!isactivered}">&nbsp;</span>
                                    <span v-if="isactiveyellow" v-bind:class="{yellow:isactiveyellow}">&nbsp;</span>
                                    <span v-if="!isactiveyellow" v-bind:class="{opaco:!isactiveyellow}">&nbsp;</span>
                                    <span v-if="isactivegreen" v-bind:class="{green:isactivegreen}">&nbsp;</span>
                                    <span v-if="!isactivegreen" v-bind:class="{opaco:!isactivegreen}">&nbsp;</span>
                                </div>  
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br>
            <el-tabs type="border-card">
                <el-tab-pane>
                    <span slot="label"><i class="el-icon-tickets"></i> Aceptación Servicio</span>
                    <el-card class="box-card">
                        <div class="row bodycard">
                            <div class="container">
                                <div class="row" style="margin-top: 3px;">
                                    <div class="col-sm-6">
                                        <div class="form-group row">
                                            <label class="el-form-item__label col-sm-3" >Categoria linea. </label>
                                            <div class="col-sm-3 grupolabel">
                                                <div class="input-group mb-3" >
                                                    <el-input size ="small" v-model="hesModel.strCategItem_Cod" class="inputOrdenCompra" disabled>                            
                                                    </el-input>
                                                </div>
                                            </div>
                                            <label class="el-form-item__label col-sm-3"  >Fecha Docum.</label>
                                            <div class="col-sm-3 grupolabel">
                                                <div class="input-group mb-3" >
                                                <el-input type="date"  size ="small" style="font-size:11px;" v-model="fecha_ejecucion" disabled></el-input>
                                                </div>
                                            </div>
                                        </div>                                        
                                        <div class="form-group row">
                                            
                                            <label class="el-form-item__label col-sm-3" >Responsable Inter.</label><!--editable que entre-->
                                            <div class="col-sm-9 grupolabel">
                                                <div class="input-group mb-9" >
                                                <el-input type="text"  size ="small" style="font-size:11px;" v-model="hesModel.strAuthsd_BYInt" disabled></el-input>
                                                </div>
                                            </div>                                            
                                        </div>
                                        <div class="form-group row" style="margin-top:10px;">
                                            <label class="el-form-item__label col-sm-3" >Responsable Ext.</label><!--editable que entre-->
                                            <div class="col-sm-9 grupolabel">
                                                <div class="input-group mb-9" >
                                                <el-input type="text"  size ="small" style="font-size:11px;" v-model="hesModel.strAuthsd_ByExt" disabled></el-input>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group row" style="margin-top:10px;">
                                            <label class="el-form-item__label col-sm-3" >Fecha.</label>
                                            <div class="col-sm-3 grupolabel">
                                                <div class="input-group mb-3" >
                                                <el-input type="date"  size ="small" style="font-size:11px;" @change="datesince" v-model="fecha_since"></el-input>
                                                </div>
                                            </div>
                                            <div class="col-sm-3" style="text-aling:center;">
                                                <div class="col-sm-3 grupolabel">
                                                    <div class="input-group mb-3" >
                                                        <span style="align:center;">-</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-sm-3 grupolabel">
                                                <div class="input-group mb-3" >
                                                <el-input type="date"  size ="small" style="font-size:11px;" @change="dateuntil" v-model="fecha_until" disabled></el-input>
                                                </div>
                                            </div>                                            
                                        </div>
                                    </div>
                                    <div class="col-sm-6">
                                        <div class="form-group row">                                           
                                            
                                            <label class="el-form-item__label col-sm-3" >Importe</label>
                                            <div class="col-sm-3 grupolabel">
                                                <div class="input-group mb-3" >
                                                <el-input type="number"  size ="small" style="font-size:11px;" v-model="hesModel.fltTot_QTY" disabled></el-input>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            
                                            <label class="el-form-item__label col-sm-3"  >Aceptado</label>
                                            <div class="col-sm-3 grupolabel">
                                                <div class="input-group mb-3" >
                                                <el-input type="number"  size ="small" style="font-size:11px;" v-model="montoaceptado" disabled></el-input>
                                                </div>
                                            </div>
                                            
                                        </div>
                                        <div class="form-group row">
                                            <label class="el-form-item__label col-sm-3" >Pendiente</label>
                                            <div class="col-sm-3 grupolabel">
                                                <div class="input-group mb-3" >
                                                <el-input type="number"  size ="small" style="font-size:11px;" v-model="montopendiente" disabled></el-input>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12">                                
                                <div class="form-group row">
                                    <div class="col-md-12">
                                        <buttons-accions ></buttons-accions> 
                                    </div>
                                    <br>
                                    <div class="col-md-12">
                                        <div class="row bodycard" style="background: white;    margin-top: 4px;">
                                            <el-table
                                                :max-height="sizeScreen"
                                                :data="TableIngreso"
                                                stripe  :default-sort = "{prop: 'date', order: 'descending'}"
                                                class="ExcelTable2007">
                                                <el-table-column type="index" label="Item" width="50">
                                                </el-table-column>
                                                <el-table-column
                                                    prop="strService_NO" sortable width="100"
                                                    label="Servicio N.">
                                                </el-table-column>
                                                <el-table-column
                                                    prop="strDesc_Detail" sortable min-width="150"
                                                    label="Descripción">
                                                </el-table-column>
                                                <el-table-column
                                                    prop="intQuantity" sortable width="120" 
                                                    label="Cantidad">
                                                </el-table-column>
                                                <el-table-column
                                                    prop="strUM" sortable width="80"
                                                    label="Unidad">
                                                </el-table-column>
                                                <el-table-column
                                                    prop="fltGross_Price" sortable
                                                    label="Importe">
                                                </el-table-column> 
                                                <el-table-column
                                                    prop="fltNet_Value" sortable width="120"
                                                    label="Valor total">
                                                </el-table-column>
                                                <el-table-column
                                                    prop="strCurrency" sortable width="80"
                                                    label="Moneda">
                                                </el-table-column> 
                                                <el-table-column
                                                    prop="strCostCenter_NO" sortable 
                                                    label="Centro de costo">
                                                </el-table-column>
                                            </el-table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-card>
                </el-tab-pane>
            </el-tabs>
      </el-card>
         <div class="footer1">
        <div class="row">
            <div class="col-sm-9" style="text-align:left" >
                <div class="col-sm-2">
                    <b-progress v-if="vifprogress" :max="100" variant="success"   show-progress animated >
                         <b-progress-bar :value="valuem" :label="valuem + '%'" />
                    </b-progress>
                </div>
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
    <el-dialog title="Busqueda Aceptación servicio"  :visible.sync="dialogHES" size="small" >
            <div>
                <el-card class="box-card">
                <div slot="header" class="headercard">
                    <span class="labelheadercard" >Buscar Aceptación Servicio</span>
                </div>
                <div class="row bodycard">
                    <div class="col-md-12">
                        <div class="form-group row">
                            <label class="el-form-item__label col-md-2" >Codigo</label>
                            <div class="col-md-2 grupolabel">
                                <div class="input-group mb-3" >
                                <el-input size ="small"   placeholder="" v-model="CodigoInput">
                                <el-button slot="append" style="padding: 3px 3px !important;background: #fff5c4;
                            background: -webkit-gradient(left top, left bottom, color-stop(0%, #fff5c4), color-stop(100%, #ffee9f));
                            background: -webkit-gradient(linear, left top, left bottom, from(#fff5c4), to(#ffee9f));
                            background: linear-gradient(to bottom, #fff5c4 0%, #ffee9f 100%);" icon="fa fa-search"
                                 @click="searchHes()"           
                                > </el-button>
                                </el-input>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <el-table
                    :data="gridhesModel"
                    stripe  :default-sort = "{prop: 'date', order: 'descending'}"
                    style="width: 100%;cursor: pointer;" class="ExcelTable2007"
                    height="250"
                    highlight-current-row
                    @row-dblclick="checkHES"
                    @current-change="selectHES">
                    <el-table-column  prop="strHES_NO" label="Codigo" width="100">
                    </el-table-column>  
                    <el-table-column  prop="strDesc_Header" label="Descripción" width="200">
                    </el-table-column> 
                    <el-table-column  prop="strPO_Item_Desc" label="Fecha documento" width="120">
                    </el-table-column>
                    <el-table-column  prop="strAuthsd_BYInt" label="Responsable" width="200">
                    </el-table-column>
                    <el-table-column  prop="strModified_User" label="Estado" width="200">
                    </el-table-column>
                </el-table>
            </el-card>
            <br/>
            <footer class="modal-footer">
                <el-button class="buttonfilter btn btn-outline-secondary orange" @click="checkHES()">
                <img class="imagenfilter" src="../../../../images/check.png" alt="" >
                </el-button>
                <el-button class="buttonfilter btn btn-outline-secondary orange" style="margin-left: 0px;"  @click="closehes()">
                <img class="imagenfilter" src="../../../../images/close.png" alt="" >
                </el-button>
            </footer>
            </div>
        </el-dialog>        
  </div> 
</template>
<script>
import ViewHesComponent from '@/components/LO-LOGISTICA/HES/view-hes/view-hes.component'
export default ViewHesComponent
</script>
<style scoped> 

</style>


