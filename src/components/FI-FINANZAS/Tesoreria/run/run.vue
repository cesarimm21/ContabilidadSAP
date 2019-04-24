<template>
  <div class="run-pagos">
      <ol  style="margin-left: -1.5rem;background: linear-gradient(rgb(229, 241, 247) 0%, rgb(255, 255, 255) 100%);    margin-bottom: 0rem !important;">
      <quickaccessmenu v-on:backPage="backPage($event)"  v-on:reloadpage="reloadpage($event)"></quickaccessmenu>
      </ol>
        <el-card class="box-card">
            <div slot="header" class="headercard"  >
                <span class="labelheadercard">Pagos automaticos</span>
                <el-button slot="append" style="padding: 3px 3px !important;background: #fff5c4;
                background: -webkit-gradient(left top, left bottom, color-stop(0%, #fff5c4), color-stop(100%, #ffee9f));
                background: -webkit-gradient(linear, left top, left bottom, from(#fff5c4), to(#ffee9f));
                background: linear-gradient(to bottom, #fff5c4 0%, #ffee9f 100%);" icon="fa fa-external-link"
                     class="buttonSave" 
                     @click="Propuesta()"      
                    >Propuesta</el-button>
                <span class="labelheadercard"> </span>
                <el-button slot="append" style="padding: 3px 3px !important;background: #fff5c4;
                background: -webkit-gradient(left top, left bottom, color-stop(0%, #fff5c4), color-stop(100%, #ffee9f));
                background: -webkit-gradient(linear, left top, left bottom, from(#fff5c4), to(#ffee9f));
                background: linear-gradient(to bottom, #fff5c4 0%, #ffee9f 100%);" icon="fa fa-check-square-o"
                     class="buttonSave" 
                     @click="Ejecucion()"      
                    >Ejecución</el-button>
            </div>
            <div class="row bodycard">
                <div class="col-md-5">
                    <div class="form-group row">
                    <label class="el-form-item__label col-sm-3" >Fecha ejecución:</label>
                    <div class="col-sm-4 grupolabel">
                        <div class="input-group mb-3" >
                        <el-input type="date"  size ="small" v-model="DateExecution" @change="DateSelected()" style="font-size:11px;" ></el-input>
                        </div>
                    </div>
                    </div>
                    <div class="form-group row">
                        <label class="el-form-item__label col-sm-3" >Codigo pago:</label>
                        <div class="col-sm-4 grupolabel">
                            <div class="input-group mb-4" >
                            <el-input size ="small" v-model="RunPagoCodigo" ></el-input>
                            </div>
                        </div>
                    </div>
                     <div class="form-group row">
                         <label class="el-form-item__label col-sm-3" >Moneda:</label>
                            <div class="col-sm-4 grupolabel">
                                <div class="input-group mb-3" >
                                <el-input size ="small"  >
                                    <el-button slot="append" style="padding: 3px 3px !important;background: #fff5c4;
                    background: -webkit-gradient(left top, left bottom, color-stop(0%, #fff5c4), color-stop(100%, #ffee9f));
                    background: -webkit-gradient(linear, left top, left bottom, from(#fff5c4), to(#ffee9f));
                    background: linear-gradient(to bottom, #fff5c4 0%, #ffee9f 100%);" 
                                icon="fa fa-clone"
                                @click="viewMoneda()"></el-button> 
                                </el-input>
                                <!-- <div class="input-group-append buttongrupolabel">
                                    <el-button size="small"  class="btn btn-outline-secondary orange" type="primary" icon="fa fa-clone" @click="mostrarBusquedaProveedor()"></el-button>
                                </div> -->
                                </div>
                            </div>
                    </div>
                </div>
            </div>
            <br>
        <el-tabs type="border-card">
          <el-tab-pane>
            <span slot="label"><i class="el-icon-date"></i> Status</span>
            <el-card class="box-card">
                <div slot="header" class="headercard"  >
                    <span class="labelheadercard">Status</span>
                </div>
                <div class="row bodycard">
                    <div class="col-md-12">
                        <div class="form-group row">
                        <label class="el-form-item__label statusClass col-sm-4" >Parametros registrados</label>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="form-group row">
                        <label class="el-form-item__label statusClass col-sm-4" >Se a creado propuesta de pago</label>
                        </div>
                    </div>
                </div>
            </el-card>
          </el-tab-pane>
            <el-tab-pane label="Parametros">
                <span slot="label"><i class="el-icon-date"></i> Parametros</span>
                <el-card class="box-card">
                    <div slot="header" class="headercard"  >
                        <span class="labelheadercard">Parametros</span>
                    </div>
                     <div class="row bodycard">
                        <div class="col-md-5">
                            <div class="form-group row">
                            <label class="el-form-item__label col-sm-5" >Fecha contabilización:</label>
                            <div class="col-sm-5 grupolabel">
                                <div class="input-group mb-4" >
                                <el-input type="date"  size ="small" style="font-size:11px;" v-model="DateContabilizacion" @change="DateContabilizacionClick()"></el-input>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div class="col-md-2">

                        </div>
                        <div class="col-md-5">
                            <div class="form-group row">
                            <label class="el-form-item__label col-sm-5" >Docs. ingresados hastas:</label>
                            <div class="col-sm-5 grupolabel">
                                <div class="input-group mb-3" >
                                <el-input type="date"  size ="small" v-model="DocIngresados"  style="font-size:11px;" ></el-input>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div class="col-md-5">
                            <div class="form-group row">
                                 <label class="el-form-item__label col-sm-5" >Banco pagador:</label>
                                    <div class="col-sm-3 grupolabel">
                                        <div class="input-group mb-3" >
                                        <el-input size ="small"  >
                                            <el-button slot="append" style="padding: 3px 3px !important;background: #fff5c4;
                            background: -webkit-gradient(left top, left bottom, color-stop(0%, #fff5c4), color-stop(100%, #ffee9f));
                            background: -webkit-gradient(linear, left top, left bottom, from(#fff5c4), to(#ffee9f));
                            background: linear-gradient(to bottom, #fff5c4 0%, #ffee9f 100%);" 
                                        icon="fa fa-clone"
                                        @click="viewBanco()"></el-button> 
                                        </el-input>
                                        <!-- <div class="input-group-append buttongrupolabel">
                                            <el-button size="small"  class="btn btn-outline-secondary orange" type="primary" icon="fa fa-clone" @click="mostrarBusquedaProveedor()"></el-button>
                                        </div> -->
                                        </div>
                                    </div>
                                <label class="el-form-item__label col-sm-2" ></label>
                            </div>
                        </div>
                        <div class="col-md-2">

                        </div>
                        <div class="col-md-5">
                            <div class="form-group row">
                            <label class="el-form-item__label col-sm-5" >Pos. deudores vence a:</label>
                            <div class="col-sm-5 grupolabel">
                                <div class="input-group mb-3" >
                                <el-input type="date"  size ="small" v-model="DocDeudores" style="font-size:11px;" ></el-input>
                                </div>
                            </div>
                            </div>
                        </div>
                     </div>
                     <buttons-accions v-on:handleClickInParent="handleClickInParent()"></buttons-accions>
                    <br>
                        <div class="table-responsive">
                            <table class="ExcelTable2007" style="
                                            max-height: 200px;
                                            display: block;
                                            overflow: auto;
                                            white-space: nowrap;">
                                <thead>
                                    <tr>
                                        <th class="heading" style="width: 1%;">&nbsp;</th>
                                        <th style="width: 10%;"><span  class="col-form-label" style="border-bottom: none;font-size: 12px !important;">Categoria Cuenta</span></th>
                                        <th style="width: 10%;"><span  class="col-form-label" style="border-bottom: none;font-size: 12px !important;">Categoria Linea</span></th>
                                        <th style="width: 10%;"><span  class="col-form-label" style="border-bottom: none;font-size: 12px !important;">Almacen</span></th>
                                        <th style="width: 10%;"><span  class="col-form-label" style="border-bottom: none;font-size: 12px !important;">Material</span></th>
                                        <th style="width: 10%;"><span  class="col-form-label" style="border-bottom: none;font-size: 12px !important;">Descripcion</span></th>
                                        <th style="width: 10%;"><span  class="col-form-label" style="border-bottom: none;font-size: 12px !important;">Lugar Entrega</span></th>
                                        <th style="width: 10%;"><span  class="col-form-label" style="border-bottom: none;font-size: 12px !important;">UM</span></th>
                                        <th style="width: 10%;"><span  class="col-form-label" style="border-bottom: none;font-size: 12px !important;">Moneda</span></th>  
                                        <th style="width: 10%;"><span  class="col-form-label" style="border-bottom: none;font-size: 12px !important;">Fecha</span></th>  
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="span6"  ><input disabled="false" type="text" class="form-control"  aria-describedby="basic-addon2"></td>
                                        <td class="span6"  ><input disabled="false" type="text" class="form-control"  aria-describedby="basic-addon2"></td>
                                        <td class="span6"  ><input disabled="false" type="text" class="form-control"  aria-describedby="basic-addon2"></td>
                                        <td class="span6"  ><input disabled="false" type="text" class="form-control"  aria-describedby="basic-addon2"></td>
                                        <td class="span6" ><input disabled="false" type="text" class="form-control"  aria-describedby="basic-addon2"></td>
                                        <td class="span6"  ><input disabled="false" type="text" class="form-control"  aria-describedby="basic-addon2"></td>
                                        <td class="span6"  ><input disabled="false" type="text" class="form-control"  aria-describedby="basic-addon2"></td>
                                        <td class="span6"  ><input disabled="false" type="text" class="form-control"  aria-describedby="basic-addon2"></td>
                                        <td class="span6"  ><input disabled="false" type="text" class="form-control"  aria-describedby="basic-addon2"></td>
                                        <td class="span6"  ><input disabled="false" type="text" class="form-control"  aria-describedby="basic-addon2"></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    <!-- </div> -->
                    <br>
                    <el-card class="box-card col-md-8 ">
                        <div slot="header" class="headercard"  >
                            <span class="labelheadercard">Parametros</span>
                        </div>
                        <div class="row bodycard">
                            <label class="el-form-item__label col-sm-2" >Proveedor:</label>
                                <div class="col-sm-2 grupolabel">
                                    <div class="input-group mb-2" >
                                    <el-input size ="small" ></el-input>
                                </div>
                            </div>
                            <div class="col-sm-1" style="aling-text:center;">
                                <label class="el-form-item__label col-sm-1" >A</label>
                            </div>
                            <div class="col-sm-2 grupolabel">
                                <div class="input-group mb-2" >
                                    <el-input size ="small" ></el-input>
                                </div>
                            </div>
                             <el-button class="buttonfilter btn btn-outline-secondary orange" style="margin-top:2px;" >
                                    <img class="imagenfilter" src="../../../../images/collapse_derecha.png" alt="" @click="viewProveedor()" >
                                </el-button>
                        </div>
                        <div class="row bodycard" style="margin-top:0px;">
                            <label class="el-form-item__label col-sm-2" >Cliente:</label>
                                <div class="col-sm-2 grupolabel">
                                    <div class="input-group mb-2" >
                                    <el-input size ="small" ></el-input>
                                    </div>
                                </div>
                                <div class="col-sm-1" style="aling-text:center;">
                                <label class="el-form-item__label col-sm-1" >A</label>
                            </div>
                            <div class="col-sm-2 grupolabel">
                                <div class="input-group mb-2" >
                                    <el-input size ="small" ></el-input>
                                </div>
                            </div>
                             <el-button class="buttonfilter btn btn-outline-secondary orange" style="margin-top:2px;" >
                                    <img class="imagenfilter" src="../../../../images/collapse_derecha.png" alt="" @click="viewProveedor()">
                                </el-button>
                        </div>
                        
                    </el-card>
                </el-card>
            </el-tab-pane>
          <el-tab-pane label="Contable">Contable</el-tab-pane>
        </el-tabs>
        </el-card>
    <el-dialog
        title="Moneda"
        :visible.sync="dialogVisible"
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
              <br>
              <el-table
                :data="gridMoney"
                stripe  :default-sort = "{prop: 'date', order: 'descending'}"
                style="width: 100%;cursor: pointer;" class="ExcelTable2007"
                height="250"
                highlight-current-row
                >
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
            <img src="../../../../images/check.png" style="width:13px; height:15px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.6rem;"/>
            <img src="../../../../images/close.png" style="width:17px; height:15px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.6rem;" @click="dialogVisible = false"/>
        </span>
    </el-dialog>
    <el-dialog
        title="Banco"
        :visible.sync="VisibleBanco"
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
              <br>
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
    <el-dialog
        title="Proveedor"
        :visible.sync="VisibleProveedor"
        width="30%"
        :before-close="handleCloseProveedor">
        <el-card class="box-card">
              <div slot="header" class="headercard">
                  <span class="labelheadercard" >Proveedor</span>
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
              <br>
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

import RunComponent from '@/components/FI-FINANZAS/Tesoreria/run/run.component'
export default RunComponent
</script>
<style scoped>
.el-input--small .el-input__inner {
    height: 22px;
    font-size: 11px !important;
}
.form-group {
    margin-bottom: 0rem !important;
    margin-left: -6px;
    height: 25px;
}
.statusClass{
    border-bottom: none;
    text-align: left;
}
.imageHover{
    border: 1px solid black; 
}
.ExcelTable2007 {
    border: 1px solid #B0CBEF;
    border-width: 1px 0px 0px 1px;
    font-size: 11pt;
    font-family: Calibri;
    font-weight: 100;
    border-spacing: 0px;
    border-collapse: collapse;
}
.ExcelTable2007 th {
    background-repeat: repeat-x;
    font-weight: normal;
    font-size: 12px;
    border: 1px solid #9EB6CE;
    border-width: 0px 1px 1px 0px;
    height: 17px;
}
.table-responsive {
    display: block;
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    -ms-overflow-style: -ms-autohiding-scrollbar;
}

</style>
