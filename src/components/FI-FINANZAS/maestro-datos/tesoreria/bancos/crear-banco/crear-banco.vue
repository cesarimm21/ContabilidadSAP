<template>
    <div class="crear-ingreso-comprobante">
        <ol  style="margin-left: -1.5rem;background: linear-gradient(rgb(229, 241, 247) 0%, rgb(255, 255, 255) 100%);    margin-bottom: 0rem !important;">
            <quickaccessmenu v-on:guardarTodo="guardarTodo($event)"/>
        </ol>
        <el-card class="box-card">
            <div slot="header" class="headercard">
                <span class="labelheadercard" > Crear Banco</span>
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
                                    v-model="strCompany_Cod">                                       
                                    </el-input>
                                    </div>
                                </div>
                                <span style="font-size: 11px;margin-top: 5px;">{{strCompany_Desc}}</span>
                            </div>
                            <div class="form-group row ">
                                <label class="el-form-item__label col-md-2" >Banco</label>
                                <div class="col-md-2 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input   size ="small" 
                                        v-model="bancoModel.strBank_Cod">
                                    </el-input>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row ">
                                <label class="el-form-item__label col-md-2" >Descripcion</label>
                                <div class="col-md-6 grupolabel">
                                    <div class="input-group mb-3" >
                                        <el-input   size ="small"  
                                            v-model="bancoModel.strBank_Name">
                                        </el-input>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row ">
                                <label class="el-form-item__label col-md-2" >Pais</label>
                                <div class="col-md-2 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input  
                                        size ="small" 
                                        @blur="desactivar_pais" 
                                        @focus="activar_pais" 
                                        v-model="strpais_Cod">
                                        <el-button  v-if="btnactivarpais && !dialogPais" slot="append" class="boton" icon="fa fa-clone" @click="loadPais()"></el-button> 
                                    </el-input>
                                    </div>
                                </div>
                                <span style="font-size: 11px;margin-top: 5px;">{{strpais_Desc}}</span>
                            </div>
                            <div class="form-group row ">
                                <label class="el-form-item__label col-md-2" >Region</label>
                                <div class="col-md-2 grupolabel">
                                    <div class="input-group mb-3" >
                                        <el-input size ="small" :disabled="departEnabled" @blur="desactivar_Departamento" @focus="activar_Departamento" 
                                        v-model="bancoModel.strBank_Region" >                            
                                            <el-button v-if="btnactivardepartamento && !departVisible" slot="append" class="boton" icon="fa fa-clone" @click="departDialog()"></el-button> 
                                        </el-input>
                                    </div>
                                </div>
                                <span style="font-size: 11px;margin-top: 5px;">{{Departamento_Desc}}</span>
                                  
                            </div>  
                            <!-- <div class="form-group row ">
                                <label class="el-form-item__label col-md-2" >Moneda</label>
                                <div class="col-md-2 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input  
                                    size ="small" 
                                    @blur="desactivar_Moneda" 
                                    @focus="activar_Moneda" 
                                    v-model="Currency_Cod">
                                        <el-button v-if="btnactivarMoneda && !dialogMoneda" slot="append" class="boton" icon="fa fa-clone" @click="loadMoneda()"></el-button> 
                                    </el-input>
                                    </div>
                                </div>
                                <span style="font-size: 11px;margin-top: 5px;">{{Currency_Cod_Desc}}</span>
                            </div>  -->
                            <div class="form-group row ">
                                <label class="el-form-item__label col-md-2" >Tipo</label>
                                <div class="col-md-2 grupolabel">
                                    <div class="input-group mb-3" >
                                        <el-select @change="cambiarTipoBanco" v-model="strlevel" style="font-size:13px"  allow-create clearable placeholder="" size="mini" filterable>
                                            <el-option style="font-size:13px"
                                            v-for="item in tabletipo"
                                            
                                            :key="item.strType_Cod"
                                            :label="item.strType_Desc"
                                            :value="item.strType_Cod">
                                            </el-option>
                                        </el-select>
                                    </div>
                                </div>
                            </div> 
                            <!--<div class="form-group row ">
                                <label class="el-form-item__label col-md-2" >Cuenta Contable</label>
                                <div class="col-md-2 grupolabel">
                                    <div class="input-group mb-3" >
                                        <el-input   size ="small" 
                                            v-model="bancoModel.strAcc_Cont">
                                        </el-input>
                                    </div>
                                </div>
                            </div>                         
                            <div class="form-group row ">
                                <label class="el-form-item__label col-md-2" >Cuenta Bancaria</label>
                                <div class="col-md-2 grupolabel">
                                    <div class="input-group mb-3" >
                                        <el-input   size ="small" 
                                            v-model="bancoModel.strBank_Account">
                                        </el-input>
                                    </div>
                                </div>
                            </div>                         
                            <div class="form-group row ">
                                <label class="el-form-item__label col-md-2" >Cuenta CCI</label>
                                <div class="col-md-2 grupolabel">
                                    <div class="input-group mb-3" >
                                        <el-input   size ="small" 
                                            v-model="bancoModel.strBank_Account_CCI">
                                        </el-input>
                                    </div>
                                </div>
                            </div>                         
                            <div class="form-group row ">
                                <label class="el-form-item__label col-md-2" >Branch Code</label>
                                <div class="col-md-2 grupolabel">
                                    <div class="input-group mb-3" >
                                        <el-input   size ="small" 
                                            v-model="bancoModel.strBranch_Cod">
                                        </el-input>
                                    </div>
                                </div>
                            </div>                      
                            <div class="form-group row ">
                                <label class="el-form-item__label col-md-2" >Swift Code</label>
                                <div class="col-md-2 grupolabel">
                                    <div class="input-group mb-3" >
                                        <el-input   size ="small" 
                                            v-model="bancoModel.strSwift_Cod">
                                        </el-input>
                                    </div>
                                </div>
                            </div>      -->                             
                             <div class="form-group row ">
                                <label class="el-form-item__label col-md-2" >Direccion</label>
                                <div class="col-md-6 grupolabel">
                                    <div class="input-group mb-3" >
                                        <el-input   size ="small" 
                                            v-model="bancoModel.strBank_Address">
                                        </el-input>
                                    </div>
                                </div>
                            </div>                    
                        </div>
                    </div>
                    <br/>
                    <div class="row" v-if="bln_tipobanco">
                        <div class="col-sm-10" >
                            <el-card class="box-card" style="margin-left: -10px;">
                                <div slot="header" class="headercard" style="margin-top: -4px;">
                                    <buttons-accions v-on:validarView="validarView()"></buttons-accions>
                                </div>
                                <div class="col-md-12" >
                                    <div class="row bodycard" style="background: white;margin-top: 0px;">
                                        <el-table 
                                            ref="missionTable"
                                            :max-height="sizeScreen"
                                            :data="tableCuentaBancaria" 
                                            highlight-current-row
                                            stripe  :default-sort = "{prop: 'date', order: 'descending'}"
                                            class="ExcelTable2007">
                                            <el-table-column type="index" label="Linea" width="58">
                                            </el-table-column>
                                           
                                            <el-table-column 
                                            prop="strAcc_Local_NO"   width="100"
                                            label="Cta Contable">
                                                <template scope="scope">
                                                    <el-input  v-if=" bln_tbl_cuenta_contable  && (scope.row === editing.row) 
                                                    && (scope.column.property === editing.column)"  v-focus size="small" v-model="scope.row.strAcc_Local_NO" >
                                                    <el-button slot="append" class="boton" icon="fa fa-clone" @click="LoadCuentaContable(scope.row)"></el-button>  
                                                    </el-input>
                                                    <label style="width:100%;    margin: 0rem;" v-bind:style="{width:'100%',margin: '0rem'}" v-else @click="clickcuentacontable(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ scope.row.strAcc_Local_NO }}</label>
                                                </template>
                                            </el-table-column>
                                            <el-table-column
                                                prop="strBank_Account" sortable  width="120"
                                                label="Cta. Bancaria">
                                                <template scope="scope">
                                                    <el-input  v-if=" bln_tbl_cuenta_bancaria  && (scope.row === editing.row) 
                                                    && (scope.column.property === editing.column)"  v-focus size="small" v-model="scope.row.strBank_Account" >
                                                    </el-input>
                                                    <label v-bind:style="{background:cell_ocultar,width:'100%',margin: '0rem'}" v-else @click="clickBankAccount(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ scope.row.strBank_Account }}</label>
                                                </template>
                                            </el-table-column>   
                                            <el-table-column
                                                prop="strBank_Account_CCI" sortable  width="120"
                                                label="Cta. CCI">
                                                <template scope="scope">
                                                    <el-input  v-if="bln_tbl_cuenta_cci  && (scope.row === editing.row) 
                                                    && (scope.column.property === editing.column)"  v-focus size="small" v-model="scope.row.strBank_Account_CCI" >
                                                    </el-input>
                                                    <label v-bind:style="{background:cell_ocultar,width:'100%',margin: '0rem'}" v-else @click="clickcci(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ scope.row.strBank_Account_CCI }}</label>
                                                </template>
                                            </el-table-column>
                                            <el-table-column
                                                prop="strCurrency_Cod" sortable width="150"
                                                label="Moneda">
                                                <template scope="scope">
                                                    <label style="width:100%" v-bind:style="{width:'100%',margin: '0rem'}"  >&nbsp;{{ scope.row.strCurrency_Cod }}</label>
                                                </template>
                                            </el-table-column>
                                            <el-table-column
                                                prop="strBranch_Cod" sortable width="150"
                                                label="Branch Code">
                                                <template scope="scope">
                                                    <el-input  v-if="bln_tbl_cuenta_branch  && (scope.row === editing.row) 
                                                    && (scope.column.property === editing.column)"  v-focus size="small" v-model="scope.row.strBranch_Cod" >
                                                    </el-input>
                                                    <label style="width:100%" v-bind:style="{width:'100%',margin: '0rem'}" v-else @click="clickbranch(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ scope.row.strBranch_Cod }}</label>
                                                </template>
                                            </el-table-column>
                                            <el-table-column
                                                prop="strSwift_Cod" sortable 
                                                label="Swift Code">
                                                <template scope="scope">
                                                    <el-input  v-if="bln_tbl_swift_cod  && (scope.row === editing.row) 
                                                    && (scope.column.property === editing.column)"  v-focus size="small" v-model="scope.row.strSwift_Cod" >
                                                    </el-input>
                                                    <label style="width:100%" v-bind:style="{width:'100%',margin: '0rem'}" v-else @click="clickswiftcode(scope.row,scope.row.edit,scope.column.property)">&nbsp;{{ scope.row.strSwift_Cod }}</label>
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
        <el-dialog
            title="Departamentos"
            :visible.sync="departVisible"
            width="30%"
            :before-close="handleCloseDepart">
            <el-card class="box-card">
                <div slot="header" class="headercard">
                    <span class="labelheadercard" >Buscar Departamento</span>
                </div>
                <div class="row bodycard">
                    <div class="col-md-12">
                            <div class="form-group row">
                                <label class="el-form-item__label col-md-3" >{{Column}}</label>
                                <div class="col-md-2 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input size ="small"   v-model="inputAtributo">
                                    <el-button slot="append" class="boton" icon="fa fa-search" 
                                        @click="searchDepa()"
                                    > </el-button>
                                    </el-input>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
                <el-table
                    :data="DepartamentoGrid"
                    stripe  :default-sort = "{prop: 'date', order: 'descending'}"
                    style="width: 100%; cursor: pointer;" class="ExcelTable2007"
                    height="200"
                    highlight-current-row
                    @header-click="headerclick"
                    @row-dblclick="departChosseCheck"
                    @current-change="departSelect">
                    <el-table-column :render-header="filterstrRegion_Cod"  prop="strRegion_Cod" label="Codigo" width="180" >
                    </el-table-column>  
                    <el-table-column :render-header="filterstrRegion_Desc" prop="strRegion_Desc" label="Nombre Departamento" style="width: 70% !important;">
                    </el-table-column> 
                    </el-table>
            </el-card>
            <span slot="footer" class="dialog-footer">
                <img src="../../../../../../images/check.png" style="width:13px; height:15px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.6rem;" @click="departChosseCheck()"/>
                <img src="../../../../../../images/close.png" style="width:17px; height:15px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.6rem;" @click="departChosseClose()"/>
            </span>
        </el-dialog>
        <el-dialog title="Moneda"  :visible.sync="dialogMoneda" @close="closeDialogMoneda" size="small" >
            <bmoneda v-on:MonedaSeleccionado="MonedaSeleccionado($event)" v-on:closeMoneda="closeMoneda()">
            </bmoneda>
        </el-dialog> 
        <el-dialog title="Pais"  :visible.sync="dialogPais" @close="closePais" size="small" >
            <bpais v-on:PaisSeleccionado="PaisSeleccionado($event)" v-on:closePais="closePais()">
            </bpais>
        </el-dialog>         

        <el-dialog title="Cuenta Contable"  :visible.sync="dialogCuentaContable" @close="closeDialogCuentaContableHaber" size="small" >
            <bcuentacontable v-on:cuentacontableselecionado="cuentacontableselecionadohaber($event)" v-on:cuentacontableClose="closeDialogCuentaContableHaber()">
            </bcuentacontable>
        </el-dialog> 

        <el-dialog title="Cuenta Contable Debe"  :visible.sync="dialogCuentaContableDebe" @close="closeDialogCuentaContableDebe" size="small" >
            <bcuentacontable v-on:cuentacontableselecionado="cuentacontableselecionadodebe($event)" v-on:cuentacontableClose="closeDialogCuentaContableDebe()">
            </bcuentacontable>
        </el-dialog>            
    </div>  
</template>
<script>

import CrearBancoComponent from '@/components/FI-FINANZAS/maestro-datos/tesoreria/bancos/crear-banco/crear-banco.component'
export default CrearBancoComponent
</script>
<style scoped>
    
</style>
