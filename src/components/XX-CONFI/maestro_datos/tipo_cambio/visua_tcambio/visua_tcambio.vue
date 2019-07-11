<template>
    <div class="modificar-po">
        <ol  style="margin-left: -1.5rem;background: linear-gradient(rgb(229, 241, 247) 0%, rgb(255, 255, 255) 100%);    margin-bottom: 0rem !important;">
        <quickaccessmenu v-on:validarView="validad()" v-on:backPage="backPage($event)"  v-on:reloadpage="reloadpage($event)"></quickaccessmenu>
        </ol>
        <el-card class="box-card">
            <div slot="header" class="headercard">
                <span class="labelheadercard" >Visualizar Tipo de Cambio</span>
            </div>
            <div class="row bodycard">
                <div class="container">
                    <div class="row" style="margin-top: 3px;">
                        <div class="col-sm-8">
                            <div class="form-group row ">
                                <label class="el-form-item__label col-md-2" >Compañia</label>
                                <div class="col-md-2 grupolabel">
                                    <div class="input-group mb-2">
                                    <el-input size ="small" type="text" v-model="companyCod" disabled>
                                    </el-input>
                                    </div>
                                </div>
                                <label class="sinLinea el-form-item__label col-md-8" >{{companyName}}</label>
                            </div>
                            <!-- <div class="form-group row " style="margin-top:6px;">
                                <label class="el-form-item__label col-md-2" >Codigo</label>
                                <div class="col-md-2 grupolabel">
                                    <div class="input-group mb-2">
                                        <el-input size ="small" type="text" v-model="Impuesto.strWH_Cod">
                                        </el-input>
                                    </div>
                                </div>
                            </div> -->
                        </div>
                    </div>
                    <br/>
                    <div class="row">
                    <div class="col-sm-12" >
                        <el-card class="box-card" style="margin-left: -10px;">
                            <div slot="header" class="headercard" style="margin-top: -4px;">
                                <buttons-accions v-on:validarView="validarView()" v-on:Limpiar="Limpiar" v-on:Print="Print" v-on:Buscar="Buscar" v-on:AscItem="AscItem" v-on:DscItem="DscItem" v-on:EliminarItem="EliminarItem()" v-on:siguiente="siguiente()" v-on:anterior="anterior()"></buttons-accions>
                            </div>
                            <div class="col-md-12" >
                                <div class="row bodycard" style="background: white;margin-top: 0px;">
                                    <el-table
                                        :max-height="sizeScreen"
                                        :data="gridTipoDocumento"
                                        highlight-current-row
                                        class="ExcelTable2007"
                                        @header-click="headerclick"
                                        @current-change="handleCurrentChange" >          
                                        <el-table-column  
                                         type="index" min-width="50" label="Item">
                                        </el-table-column>
                                        <el-table-column  
                                        :render-header="filterstrExchRate_OF"
                                         prop="strExchRate_OF" min-width="100" label="Moneda de">
                                        </el-table-column>
                                        <el-table-column
                                            :render-header="filterstrExchRate_TO"
                                            prop="strExchRate_TO"  min-width="100"
                                            label="Moneda a">
                                        </el-table-column>
                                        <el-table-column
                                            :render-header="filterintExchRate_Year"
                                            prop="intExchRate_Year" 
                                            label="Año">
                                        </el-table-column>
                                        <el-table-column
                                            :render-header="filterdtmExchRate_Date"
                                            prop="dtmExchRate_Date"  min-width="100"
                                            label="Fecha">
                                             <template scope="scope">
                                                <span>{{ getDateString(scope.row.dtmExchRate_Date) }}</span>
                                            </template>
                                        </el-table-column>   
                                        <el-table-column
                                            :render-header="filterfltExchRate_Buy"
                                            prop="fltExchRate_Buy"  min-width="100"
                                            label="Compra" >
                                        </el-table-column>
                                        <el-table-column
                                            :render-header="filterfltExchRate_Sale"
                                            prop="fltExchRate_Sale"  min-width="100"
                                            label="Venta" >
                                        </el-table-column>
                                        <el-table-column
                                            :render-header="filterfltExchRate_Agrem"
                                            prop="fltExchRate_Agrem"  min-width="100"
                                            label="Pactado" >
                                        </el-table-column>                                       

                                        <el-table-column :render-header="filterdtmCreation_Date"
                                            prop="dtmModified_Date"   min-width="80"
                                            label="Fecha">
                                            <template scope="scope">
                                                <span>{{ getDateStringView(scope.row.dtmModified_Date) }}</span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column :render-header="filterstrCreation_User"
                                            prop="strModified_User" 
                                            label="Usuario">
                                        </el-table-column>
                                        <el-table-column 
                                            prop="chrStatus" align="center"  width="100"
                                            label="Estado">
                                            <template scope="scope">
                                                <el-tag
                                                :type="scope.row.chrStatus.trim() === 'A' ? 'success': 'danger'"
                                                disable-transitions>{{scope.row.chrStatus=== 'A'?'Activo':'Inactivo'}}</el-tag>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </div>
                        </el-card>
                    </div>
                </div>


                </div>
            </div>
        </el-card>
        <div class="footer1">
        <div class="row">
            <div class="col-sm-9" style="text-align:left" >
                <!-- <div class="col-sm-2">
                    <b-progress v-if="vifprogress" :max="100" variant="success"   show-progress animated >
                         <b-progress-bar :value="valuem" :label="valuem + '%'" />
                    </b-progress>
                </div>
                <img  src="../../../../../images/save.png" v-if="issave" style="width:16px; height:17px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 1.3rem;" @click="fnOcultar()"/>
                <img src="../../../../../images/cancelar.png" v-if="iserror" style="width:16px; height:17px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 1.3rem;" @click="fnOcultar()"/>
                <span class="footertext2" style="" >{{textosave}}</span> -->
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
    <b-modal ref="myModalRef" hide-footer title="Buscar" size="sm"  v-model="dialogBusquedaFilter" @keydown.native.enter="confirmaraceptar">
      <div style="height:85px">
        <!-- <img src="../../../../images/informacion.png" style="width:14px; height:15px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.3rem;"/> -->
        <!-- <span style="font-size:13px">¿Desea grabar el documento?</span> -->
        <div class="row" style="margin-left: 0px;">
            <div class="col-md-12">
                <div class="form-group row">
                    <label class="el-form-item__label col-md-2" >Columna</label>
                    <div class="col-md-7 grupolabel">
                        <div class="input-group mb-3" >
                            <el-input size ="small" :disabled="true" v-model="Column"  placeholder="">
                            </el-input>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row" style="margin-left: 0px;">
            <div class="col-md-12">
                <div class="form-group row">
                    <label class="el-form-item__label col-md-2" >Buscar</label>
                    <div class="col-md-7 grupolabel">
                        <div class="input-group mb-3" >
                            <el-input v-if="inputNormal" size ="small" v-model="txtbuscar"  @keydown.native.enter="btnBuscar()">  
                            </el-input>
                            <el-date-picker v-if="inputAño"
                                        v-model="txtbuscar"
                                        size ="small" 
                                        type="year"
                                        @change="changeyear">
                            </el-date-picker>
                            <el-date-picker v-if="inputfecha"
                                        v-model="txtbuscar"
                                        type="date"
                                        format="dd.MM.yyyy">
                            </el-date-picker>
                            <el-input v-if="inputNumber" type="number" size="small" v-model="txtbuscar"  :precision="3" :min="0.000" :step="0.001">

                            </el-input>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
      <footer class="modal-footer">
        <img src="../../../../../images/check.png" style="width:13px; height:15px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.6rem;" @click="btnBuscar()"/>
        <img src="../../../../../images/close.png" style="width:17px; height:15px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.6rem;" @click="dialogBusquedaFilter = false"/>
      </footer>
    </b-modal>
    </div>
</template>
<script>
import VisualizarTipoCambioComponent from '@/components/XX-CONFI/maestro_datos/tipo_cambio/visua_tcambio/visua_tcambio.component'
export default VisualizarTipoCambioComponent
</script>
<style scoped>
.sinLinea{
  border-bottom: 1px solid #f6f7f9;
  color: #1f2d3d; 
}
.el-table__body-wrapper{
    height: 50%;
}
</style>
