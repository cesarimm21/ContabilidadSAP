<template>
    <div class="modificar-ingreso-comprobante">
      <ol  style="margin-left: -1.5rem;background: linear-gradient(rgb(229, 241, 247) 0%, rgb(255, 255, 255) 100%);    margin-bottom: 0rem !important;">
      <quickaccessmenu v-on:backPage="backPage($event)"  v-on:reloadpage="reloadpage($event)"></quickaccessmenu>
      </ol>
    <el-card class="box-card">
      <div slot="header" class="headercard">
        <span class="labelheadercard" > Visualizar ingreso comprobante</span>
      </div>   
      <div class="row bodycard">
          <div class="container">
            <div class="row" style="margin-top: 3px;">
              <div class="col-sm-6">
                <div class="form-group row ">
                  <label class="el-form-item__label col-md-3" >Ingreso comprobante</label>
                    <div class="col-md-3 grupolabel">
                      <div class="input-group mb-3" >
                        <el-input  
                          size ="small" 
                          @blur="desactivar_ingreso" 
                          @focus="activar_ingreso"
                          v-model="ingresoSelect.strVoucher_NO"
                          :maxlength="8" >
                          <el-button v-if="btnactivaringreso && !dialogingreso" slot="append" class="boton" icon="fa fa-clone" @click="loadIngreso()"></el-button> 
                        </el-input>
                      </div>
                    </div>
                  <label class="el-form-item__label col-md-4" ></label>
                </div>
              </div>
            </div>
          </div>
      </div>
    </el-card>
    <el-dialog title="Busqueda Ingreso comprobante"  :visible.sync="dialogingreso" size="small" >
            <div>
                <el-card class="box-card">
                <div slot="header" class="headercard">
                    <span class="labelheadercard" >Buscar ingreso</span>
                </div>
                <div class="row bodycard">
                    <div class="col-md-12">
                        <div class="form-group row">
                            <label class="el-form-item__label col-md-2" >Codigo</label>
                            <div class="col-md-2 grupolabel">
                                <div class="input-group mb-3" >
                                <el-input size ="small"   placeholder="" v-model="codigoInput" :maxlength="8">
                                <el-button slot="append" style="padding: 3px 3px !important;background: #fff5c4;
                            background: -webkit-gradient(left top, left bottom, color-stop(0%, #fff5c4), color-stop(100%, #ffee9f));
                            background: -webkit-gradient(linear, left top, left bottom, from(#fff5c4), to(#ffee9f));
                            background: linear-gradient(to bottom, #fff5c4 0%, #ffee9f 100%);" icon="fa fa-search"
                                            @click="loadIngresoByCod()"
                                            > </el-button>
                                </el-input>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <el-table
                    :data="ingresoData"
                    stripe  :default-sort = "{prop: 'date', order: 'descending'}"
                    style="width: 100%;cursor: pointer;" class="ExcelTable2007"
                    height="250"
                    highlight-current-row
                    @row-dblclick="selectOrdenCompra"
                    @current-change="selectOrdenCompra">
                    <el-table-column  prop="strVoucher_NO" label="Codigo" width="180">
                    </el-table-column>  
                    <el-table-column  prop="strDesc_Doc" label="Descripción" style="width: 70% !important;">
                    </el-table-column> 
                </el-table>
            </el-card>
            <br/>
            <footer class="modal-footer">
                <el-button class="buttonfilter btn btn-outline-secondary orange" @click="checkIngreso()">
                <img class="imagenfilter" src="../../../../images/check.png" alt="" >
                </el-button>
                <el-button class="buttonfilter btn btn-outline-secondary orange" style="margin-left: 0px;"  @click="closeIngreso()">
                <img class="imagenfilter" src="../../../../images/close.png" alt="" >
                </el-button>
            </footer>
            </div>
        </el-dialog>
  </div>   
</template>
<script>

import VerIngresoComprobanteComponent from '@/components/FI-FINANZAS/ingreso-comprobante/ver-ingreso-comprobante/ver-ingreso-comprobante.component'
export default VerIngresoComprobanteComponent
</script>
<style scoped>
</style>
