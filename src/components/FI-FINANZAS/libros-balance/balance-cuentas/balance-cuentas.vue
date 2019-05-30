
<template>

  <div class="al-crear">
    <ol  style="margin-left: -1.5rem;background: linear-gradient(rgb(229, 241, 247) 0%, rgb(255, 255, 255) 100%);    margin-bottom: 0rem !important;">
        <quickaccessmenu v-on:validarView="cargar()"/>
    </ol>

    <el-card class="box-card">
        <div slot="header" class="headercard">
            <span class="labelheadercard" >Balance Cuentas</span>
            <!-- <el-button class="buttonfilter btn btn-outline-secondary orange" style="margin-top: -3px;" @click="Buscar()">
                <img class="imagenfilter" src="../../../../images/buscari.png" style="margin-left: 0px;width: 15px;height: 16px;" alt="" >
            </el-button> -->
        </div>
        <div class="row bodycard">
           <div class="container">
                <div class="row" style="margin-top: 3px;">
                    <div class="col-sm-9" >
                        <div class="form-group row ">
                            <label class="el-form-item__label col-md-2" >Código Compañia</label>
                            <div class="col-md-2 grupolabel">
                                <div class="input-group mb-3" >
                                <el-input :disabled="true" size ="small"  v-model="balCuentas.strCompany_Cod"  placeholder="">
                                </el-input>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row ">
                            <label class="el-form-item__label col-sm-2" >Cuenta</label>
                            <div class="col-sm-2 grupolabel">
                                <div class="input-group mb-3" >
                                <el-input size ="small" @blur="desactivar_CuentaContable" @focus="activar_CuentaContable()" v-model="balCuentas.strAcc_Local_NO"  placeholder="">
                                    <el-button v-if="blnstrAcct_Loc && !dialogCuentaContable" slot="append" class="boton" icon="fa fa-clone" @click="loadCuentaContable()"></el-button> 
                                </el-input>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row Second">
                            <label class="el-form-item__label col-md-2" >Año</label>
                            <div class="col-md-2 grupolabel">
                                <div class="input-group mb-3" >
                                    <el-date-picker
                                        v-model="fechaDesde"
                                        size="mini"
                                        type="year"
                                        style="width:128px !important">
                                    </el-date-picker>
                                </div>
                            </div>                   
                        </div>    
                    </div>
                </div>
                <br/>
                <div class="row">
                    <div class="col-sm-12" >
                        <el-card class="box-card" style="margin-left: -10px;">
                            <div slot="header" class="headercard" style="margin-top: -4px;">
                                <div style="margin-top: 4px;margin-left: 15px;"> 
                                    <!-- <el-button class="buttonfilter btn btn-outline-secondary orange" @click="ExportarPDF()">
                                        <img class="imagenfilter" src="../../../../images/pdf1.png" style="width: 100%;height: 100%;" alt="" >
                                    </el-button>
                                    <el-button class="buttonfilter btn btn-outline-secondary orange"  @click="ExportarExcel()">
                                        <img class="imagenfilter" src="../../../../images/excel.png" style="width: 100%;height: 100%;" alt="">
                                    </el-button>
                                    <div class="v-separator"></div>
                                    <el-button class="buttonfilter btn btn-outline-secondary orange" @click="ExportarTxt()">
                                        <img class="imagenfilter" src="../../../../images/txt.png" style="width: 100%;height: 100%;" alt="" >
                                    </el-button> -->
                                </div>
                                <!-- <buttons-accions v-on:handleClickInParent="handleClickInParent()"></buttons-accions> -->
                            </div>
                            <div class="col-md-12" >
                                <div class="row bodycard" id="out-table" style="background: white;margin-top: 0px;">
                                    <el-table
                                        ref="missionTable"
                                        :max-height="sizeScreen"
                                        :data="tableData" 
                                         highlight-current-row
                                         @current-change="handleCurrentChange"
                                        stripe  :default-sort = "{prop: 'date', order: 'descending'}"
                                        class="ExcelTable2007">
                                        <el-table-column  sortable prop="periodo" width="100" label="Periodo">
                                            <template scope="scope">
                                            <label  >&nbsp;{{ scope.row.strPeriodRepo }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            prop="fltDebit_Acc" sortable  min-width="120"
                                            label="Debito">
                                            <template scope="scope">
                                                <label >&nbsp;{{ scope.row.fltDebit_Acc }}</label>
                                            </template>
                                        </el-table-column>  
                                        <el-table-column
                                            prop="fltCredit_Acc" sortable  width="180"
                                            label="Credito">
                                            <template scope="scope">
                                                <label >&nbsp;{{ scope.row.fltCredit_Acc }}</label>
                                            </template>
                                        </el-table-column>  
                                        <el-table-column
                                            prop="fltBalance_Month" sortable  width="120"
                                            label="Mov. Mes">
                                            <template scope="scope">
                                                <label >&nbsp;{{ scope.row.fltBalance_Month }}</label>
                                            </template>
                                        </el-table-column>                                    
                                        <el-table-column
                                            prop="fltClosing_Balance" sortable width="100"
                                            label="Mov. Acumulado">
                                            <template scope="scope">
                                                <label >&nbsp;{{scope.row.fltClosing_Balance }}</label>
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
   
    <!--DIALOG BUSQUEDA COMPAÑIA-->
    <el-dialog title="Busqueda Compañia" :visible.sync="dialogCompania" @close="closeCompania" size="small" >
      <bcompania v-on:companiaSeleccionado="companiaSeleccionado($event);" v-on:companiaClose="companiaClose($event);" >
      </bcompania>
    </el-dialog>
    <el-dialog title="Cuenta Contable"  :visible.sync="dialogCuentaContable" @close="closeDialogCuentaContable" size="small" >
        <bcuentacontable v-on:cuentacontableselecionado="cuentacontableselecionado($event)" v-on:cuentacontableClose="closeDialogCuentaContable()">
        </bcuentacontable>
    </el-dialog> 
</div>  
  
</template>
<script>
import BalanceCuentasComponent from '@/components/FI-FINANZAS/libros-balance/balance-cuentas/balance-cuentas.component'
export default BalanceCuentasComponent
</script>
<style scoped>

</style>



