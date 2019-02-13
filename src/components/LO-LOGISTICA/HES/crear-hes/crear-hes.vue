<template>
  <div class="crear-hes">
      <el-card class="box-card">
            <div slot="header" class="headercard">
                <span class="labelheadercard" > Crear hes</span>
            </div>
            <div class="row bodycard">
                <div class="container">
                    <div class="row" style="margin-top: 3px;">
                        <div class="col-sm-6">
                            <div class="form-group row ">
                                <label class="el-form-item__label col-md-3" >Para orden compra</label>
                                    <div class="col-md-3 grupolabel">
                                        <div class="input-group mb-3" >
                                         <el-input size ="time" @blur="desactivar_OrdenC" @focus="activar_OrdenC" v-model="ordenCompraModel.strPO_Number" >                            
                                            <el-button v-if="btnactivarOrdenC && !dialogOrdenC" slot="append" class="boton" icon="fa fa-clone" @click="loadOrdenC()"></el-button> 
                                        </el-input>
                                        </div>
                                    </div>                                                          
                            </div>
                            <div class="form-group row">
                                
                                <label class="el-form-item__label col-md-3" >Descripción</label>
                                    <div class="col-md-6 grupolabel">
                                    <div class="input-group mb-6" >
                                    <el-input size ="small" >
                                    </el-input>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="form-group row">
                                <div class="col-sm-6"></div>
                                <div class="col-md-2" style="margin-top:5px;">
                                        <el-switch
                                        v-model="valueSwtch"
                                        active-color="#13ce66"
                                        inactive-color="#ff4949"
                                        active-text="ES OK"
                                        inactive-text="NO OK">
                                        </el-switch>
                                    </div>  
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br>
            <el-tabs type="border-card">
                <el-tab-pane>
                    <span slot="label"><i class="el-icon-tickets"></i> Datos Basicos</span>
                    <el-card class="box-card">
                        <div class="row bodycard">
                            <div class="container">
                                <div class="row" style="margin-top: 3px;">
                                    <div class="col-sm-6">
                                        <div class="form-group row">
                                            <label class="el-form-item__label col-sm-3" >Categoria. </label>
                                            <div class="col-sm-3 grupolabel">
                                                <div class="input-group mb-3" >
                                                <el-select v-model="value" placeholder="Seleccionar">
                                                    <el-option
                                                    v-for="item in options"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                                    </el-option>
                                                </el-select>
                                                </div>
                                            </div>
                                            <label class="el-form-item__label col-sm-3" >N. Documento ext.</label>
                                            <div class="col-sm-3 grupolabel">
                                                <div class="input-group mb-3" >
                                                <el-input type="text"  size ="small" style="font-size:11px;" ></el-input>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            
                                            <label class="el-form-item__label col-sm-3"  >Fecha referencia</label>
                                            <div class="col-sm-3 grupolabel">
                                                <div class="input-group mb-3" >
                                                <el-input type="date"  size ="small" style="font-size:11px;" ></el-input>
                                                </div>
                                            </div>
                                            <label class="el-form-item__label col-sm-3" >Servicios</label>
                                            <div class="col-sm-3 grupolabel">
                                                <div class="input-group mb-3" >
                                                <el-input type="text"  size ="small" style="font-size:11px;" ></el-input>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            
                                            <label class="el-form-item__label col-sm-3" >Responsable Inter.</label>
                                            <div class="col-sm-3 grupolabel">
                                                <div class="input-group mb-3" >
                                                <el-input type="text"  size ="small" style="font-size:11px;" ></el-input>
                                                </div>
                                            </div>
                                            <label class="el-form-item__label col-sm-3" >Responsable Ext.</label>
                                            <div class="col-sm-3 grupolabel">
                                                <div class="input-group mb-3" >
                                                <el-input type="text"  size ="small" style="font-size:11px;" ></el-input>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label class="el-form-item__label col-sm-3" >Periodo.</label>
                                            <div class="col-sm-3 grupolabel">
                                                <div class="input-group mb-3" >
                                                <el-input type="date"  size ="small" style="font-size:11px;" ></el-input>
                                                </div>
                                            </div>
                                            <div class="col-sm-1" style="text-aling:center;">
                                                <label class="el-form-item__label col-sm-1">A</label>
                                            </div>
                                            <div class="col-sm-3 grupolabel">
                                                <div class="input-group mb-3" >
                                                <el-input type="date"  size ="small" style="font-size:11px;" ></el-input>
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
                                                <el-table-column type="index" width="50">
                                                </el-table-column>
                                                <el-table-column
                                                    prop="cuenta" sortable min-width="80"
                                                    label="Servicio N.">
                                                </el-table-column>
                                                <el-table-column
                                                    prop="descripcion" sortable min-width="150"
                                                    label="Descripción">
                                                </el-table-column>
                                                <el-table-column
                                                    prop="cantidad" sortable 
                                                    label="Cantidad">
                                                </el-table-column>
                                                <el-table-column
                                                    prop="material" sortable
                                                    label="Servicio Ejecutado">
                                                </el-table-column> 
                                                <el-table-column
                                                    prop="moneda" sortable
                                                    label="Moneda">
                                                </el-table-column>
                                                <el-table-column
                                                    prop="recurso" sortable 
                                                    label="Persona Ejecución">
                                                </el-table-column>                                               
                                                <el-table-column
                                                    prop="centro" sortable 
                                                    label="Centro de costo">
                                                </el-table-column>
                                            </el-table>
                                        </div>

                                    </div>
                                    <label class="el-form-item__label col-sm-2"  >Seleccionar servicios</label>
                                    <el-button slot="append" class="boton" icon="fa fa-clone" @click="loadServicios()"></el-button> 
                                </div>
                            </div>
                        </div>
                    </el-card>
                </el-tab-pane>
                <el-tab-pane>
                    <span slot="label"><i class="el-icon-date"></i> Accept. Data</span>
                </el-tab-pane>
                <!-- <el-tab-pane>
                    <span slot="label"><i class="el-icon-view"></i> Valores</span>
                </el-tab-pane>
                <el-tab-pane>
                    <span slot="label"><i class="el-icon-sort"></i> Texto largo</span>
                </el-tab-pane>
                <el-tab-pane>
                    <span slot="label"><i class="el-icon-date"></i> Historia</span>
                </el-tab-pane> -->
            </el-tabs>
      </el-card>

        <el-dialog title="Orden de compra"  :visible.sync="dialogOrdenC" @close="closeOrdenC" size="small" >
            <div>
                <el-card class="box-card">
                <div slot="header" class="headercard">
                    <span class="labelheadercard" >Buscar Orden de compra</span>
                </div>
                <div class="row bodycard">
                    <div class="col-md-12">
                        <div class="form-group row">
                            <label class="el-form-item__label col-md-3" >Orden de compra Codigo</label>
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
                    :data="dataOrdenCompra"
                    stripe  :default-sort = "{prop: 'date', order: 'descending'}"
                    style="width: 100%;cursor: pointer;" class="ExcelTable2007"
                    height="250"
                    highlight-current-row
                    @row-dblclick="dbclickSelect"
                    @current-change="handleCurrentChange">
                    <el-table-column  prop="codigo" label="Codigo" width="180">
                    </el-table-column>  
                    <el-table-column  prop="descripcion" label="Descripción" style="width: 70% !important;">
                    </el-table-column> 
                </el-table>
            </el-card>
            <br/>
            <footer class="modal-footer">
                <el-button class="buttonfilter btn btn-outline-secondary orange" @click="checkOrdenC()">
                <img class="imagenfilter" src="../../../../images/check.png" alt="" >
                </el-button>
                <el-button class="buttonfilter btn btn-outline-secondary orange" style="margin-left: 0px;"  @click="closeOrdenC()">
                <img class="imagenfilter" src="../../../../images/close.png" alt="" >
                </el-button>
            </footer>
            </div>
        </el-dialog>    
        <el-dialog title="Servicios"  :visible.sync="dialogServicios" @close="closeServicios" size="small" >
            <div>
                <el-card class="box-card">
                <div slot="header" class="headercard">
                    <span class="labelheadercard" >Buscar Servicios</span>
                </div>
                <div class="row bodycard">
                    <div class="col-md-12">
                        <div class="form-group row">
                            <label class="el-form-item__label col-md-3" >Servicios Codigo</label>
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
                    :data="dataServicio"
                    stripe  :default-sort = "{prop: 'date', order: 'descending'}"
                    style="width: 100%;cursor: pointer;" class="ExcelTable2007"
                    height="250"
                    highlight-current-row
                    @current-change="handleCurrentChange">
                    <el-table-column  prop="codigo" label="Codigo" width="180">
                    </el-table-column>  
                    <el-table-column  prop="descripcion" label="Descripción" style="width: 70% !important;">
                    </el-table-column> 
                </el-table>
            </el-card>
            <br/>
            <footer class="modal-footer">
                <el-button class="buttonfilter btn btn-outline-secondary orange" @click="closeServicios()">
                <img class="imagenfilter" src="../../../../images/check.png" alt="" >
                </el-button>
                <el-button class="buttonfilter btn btn-outline-secondary orange" style="margin-left: 0px;"  @click="closeServicios()">
                <img class="imagenfilter" src="../../../../images/close.png" alt="" >
                </el-button>
            </footer>
            </div>
        </el-dialog>  
    
  </div>  
</template>
<script>

import CrearHesComponent from '@/components/LO-LOGISTICA/HES/crear-hes/crear-hes.component'
export default CrearHesComponent
</script>
<style scoped>
.boton{
    height: 25px;
}
</style>
