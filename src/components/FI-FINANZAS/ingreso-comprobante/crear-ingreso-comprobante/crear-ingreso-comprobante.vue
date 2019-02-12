<template>
    <div class="crear-ingreso-comprobante">
        <el-card class="box-card">
            <div slot="header" class="headercard">
                <span class="labelheadercard" > Crear ingreso comprobante</span>
            </div>
            <div class="row bodycard">
                <div class="col-md-12">
                    <div class="form-group row ">
                        <label class="el-form-item__label col-md-2" >Compañia</label>
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
                            <label class="el-form-item__label col-md-1" >{{descripcionCompania}}</label>
                    </div>
                    <div  class="form-group row ">
                        <label class="el-form-item__label col-md-2" >Orden Compra</label>
                        <div class="col-md-1 grupolabel">
                            <div class="input-group mb-1" >
                            <el-input size ="small"   placeholder=""  >                            
                            </el-input>
                            </div>
                        </div>
                        <label class="el-form-item__label col-md-1" >Proveedor</label>
                        <div class="col-md-2 grupolabel">
                            <div class="input-group mb-2" >
                            <el-input size ="time"  placeholder=""  >                            
                            </el-input>
                            </div>
                        </div>
                    </div>
                    <div  class="form-group row ">
                        <label class="el-form-item__label col-md-2" >Tipo Documento</label>
                        <div class="col-md-1 grupolabel">
                            <div class="input-group mb-1" >
                            <el-input size ="small"   placeholder=""  >                            
                            </el-input>
                            </div>
                        </div>
                        <label class="el-form-item__label col-md-1" >Periodo</label>
                        <div class="col-md-2 grupolabel">
                            <div class="input-group mb-2" >
                            <el-input size ="time" type="date"  placeholder=""  >                            
                            </el-input>
                            </div>
                        </div>
                    </div>
                    <div  class="form-group row ">
                        <label class="el-form-item__label col-md-2" >Serie</label>
                        <div class="col-md-1 grupolabel">
                            <div class="input-group mb-1" >
                            <el-input size ="small"   placeholder=""  >                            
                            </el-input>
                            </div>
                        </div>
                        <label class="el-form-item__label col-md-1" >Diario</label>
                        <div class="col-md-2 grupolabel">
                            <div class="input-group mb-2" >
                            <el-input size ="time" type="text"  placeholder=""  >                            
                            </el-input>
                            </div>
                        </div>
                    </div>
                    <div  class="form-group row ">
                        <label class="el-form-item__label col-md-2" >Documento</label>
                        <div class="col-md-1 grupolabel">
                            <div class="input-group mb-1" >
                            <el-input size ="small"   placeholder=""  >                            
                            </el-input>
                            </div>
                        </div>
                        <label class="el-form-item__label col-md-1" >Voucher</label>
                        <div class="col-md-2 grupolabel">
                            <div class="input-group mb-2" >
                            <el-input size ="time" type="text"  placeholder=""  >                            
                            </el-input>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <el-tabs type="border-card">
                <el-tab-pane>
                    <span slot="label"><i class="el-icon-date"></i> General</span>
                    <el-card class="box-card">
                        <div class="row bodycard">
                            <div class="col-md-12">
                                <div class="form-group row">
                                    <label class="el-form-item__label col-sm-1" >Fecha doc.</label>
                                    <div class="col-sm-2 grupolabel">
                                        <div class="input-group mb-2" >
                                        <el-input type="date"  size ="small" style="font-size:11px;" ></el-input>
                                        </div>
                                    </div>
                                    <div class="col-sm-1"></div>
                                    <label class="el-form-item__label col-sm-1" >Fecha Estimada</label>
                                    <div class="col-sm-2 grupolabel">
                                        <div class="input-group mb-2" >
                                        <el-input type="date"  size ="small" style="font-size:11px;" ></el-input>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="el-form-item__label col-sm-1" >Fecha Recibida</label>
                                    <div class="col-sm-2 grupolabel">
                                        <div class="input-group mb-2" >
                                        <el-input type="date"  size ="small" style="font-size:11px;" ></el-input>
                                        </div>
                                    </div>
                                    <div class="col-sm-1"></div>
                                    <label class="el-form-item__label col-sm-1" >Contador</label>
                                    <div class="col-sm-2 grupolabel">
                                        <div class="input-group mb-2" >
                                        <el-input type="number"  size ="small" style="font-size:11px;" ></el-input>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="el-form-item__label col-sm-1" >Impuesto(IGV)</label>
                                    <div class="col-sm-2 grupolabel">
                                        <div class="input-group mb-2" >
                                        <el-input type="date"  size ="small" style="font-size:11px;" ></el-input>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="el-form-item__label col-sm-1" >Total Doc.</label>
                                    <div class="col-sm-2 grupolabel">
                                        <div class="input-group mb-2" >
                                        <el-input type="date"  size ="small" style="font-size:11px;" ></el-input>
                                        </div>
                                    </div>
                                    <div class="col-sm-1"></div>
                                    <label class="el-form-item__label col-sm-1" >Moneda</label>
                                    <div class="col-sm-2 grupolabel">
                                        <div class="input-group mb-2" >
                                        <el-input type="number"  size ="small" style="font-size:11px;" ></el-input>
                                        </div>
                                    </div>
                                    <label class="el-form-item__label col-sm-1" >T. Cambio</label>
                                    <div class="col-sm-2 grupolabel">
                                        <div class="input-group mb-2" >
                                        <el-input type="number"  size ="small" style="font-size:11px;" ></el-input>
                                        </div>
                                    </div>
                                </div>                                
                            </div>
                            <div class="col-md-12">
                                <buttons-accions ></buttons-accions>
                            </div>     
                            <br>
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
                    </el-card>          
                </el-tab-pane>
                <el-tab-pane >
                    <span slot="label"><i class="el-icon-date"></i>Impuesto</span>
                    <div class="col-md-12">
                        <buttons-accions ></buttons-accions>  
                    </div>
                    <div class="col-md-12">                                
                    </div>
                </el-tab-pane>
            </el-tabs>
        </el-card>
    </div>
  
</template>
<script>

import CrearIngresoComprobanteComponent from '@/components/FI-FINANZAS/ingreso-comprobante/crear-ingreso-comprobante/crear-ingreso-comprobante.component'
export default CrearIngresoComprobanteComponent
</script>
<style scoped>
</style>
