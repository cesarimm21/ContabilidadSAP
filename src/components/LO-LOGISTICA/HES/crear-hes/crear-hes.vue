<template>
  <div class="crear-hes">
      <el-card class="box-card">
            <div slot="header" class="headercard">
                <span class="labelheadercard" > Crear hes</span>
            </div>
            <div class="row bodycard">
                <div class="col-md-12">
                    <div class="form-group row ">
                        <label class="el-form-item__label col-md-2" >Para orde compra</label>
                            <div class="col-md-1 grupolabel">
                                <div class="input-group mb-1" >
                                <el-input size ="small"   placeholder="" v-model="codigoCompania" >
                            <el-button slot="append" style="padding: 3px 3px !important;background: #fff5c4;
                background: -webkit-gradient(left top, left bottom, color-stop(0%, #fff5c4), color-stop(100%, #ffee9f));
                background: -webkit-gradient(linear, left top, left bottom, from(#fff5c4), to(#ffee9f));
                background: linear-gradient(to bottom, #fff5c4 0%, #ffee9f 100%);" icon="fa fa-clone"
                                disabled></el-button> 
                                </el-input>
                                </div>
                            </div>
                            <div class="col-md-6">
                            </div>
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
                    <div class="form-group row">
                        <label class="el-form-item__label col-md-2" >Descripción</label>
                            <div class="col-md-4 grupolabel">
                            <div class="input-group mb-4" >
                            <el-input size ="small" >
                            </el-input>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <el-tabs type="border-card">
                <el-tab-pane>
                    <span slot="label"><i class="el-icon-date"></i> Datos Basicos</span>
                    <el-card class="box-card">
                        <div class="row bodycard">
                            <div class="col-md-12">
                                <div class="form-group row">
                                    <label class="el-form-item__label col-sm-1" >Numero Ext.</label>
                                    <div class="col-sm-2 grupolabel">
                                        <div class="input-group mb-2" >
                                        <el-input type="text"  size ="small" style="font-size:11px;" ></el-input>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="el-form-item__label col-sm-1" >Rango de fecha.</label>
                                    <div class="col-sm-2 grupolabel">
                                        <div class="input-group mb-2" >
                                        <el-input type="date"  size ="small" style="font-size:11px;" ></el-input>
                                        </div>
                                    </div>
                                    <label class="el-form-item__label col-sm-1" style="text-aling:center;" >A</label>
                                    <div class="col-sm-2 grupolabel">
                                        <div class="input-group mb-2" >
                                        <el-input type="date"  size ="small" style="font-size:11px;" ></el-input>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-md-12">
                                        <buttons-accions ></buttons-accions> 
                                    </div>
                                    <br>
                                    <div class="col-md-12">
                                        <div class="row bodycard" style="background: white;    margin-top: -11px;">
                                            <el-table
                                                stripe  :default-sort = "{prop: 'date', order: 'descending'}"
                                                class="ExcelTable2007">
                                                <el-table-column type="index" width="58">
                                                </el-table-column>
                                                <el-table-column
                                                    prop="name" sortable min-width="200"
                                                    label="Categoria cuenta">
                                                </el-table-column>
                                                <el-table-column
                                                    prop="name" sortable  min-width="200"
                                                    label="Almacen">
                                                </el-table-column>
                                                <el-table-column
                                                    prop="name" sortable
                                                    label="Material">
                                                </el-table-column>
                                                <el-table-column
                                                    prop="name" sortable 
                                                    label="Descripción">
                                                </el-table-column>
                                                <el-table-column
                                                    prop="name" sortable 
                                                    label="Lugar entrega">
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
  </div>  
</template>
<script>

import CrearHesComponent from '@/components/LO-LOGISTICA/HES/crear-hes/crear-hes.component'
export default CrearHesComponent
</script>
<style scoped>
</style>
