<template>
    <div class="crear-ingreso-comprobante">
        <ol  style="margin-left: -1.5rem;background: linear-gradient(rgb(229, 241, 247) 0%, rgb(255, 255, 255) 100%);    margin-bottom: 0rem !important;">
            <quickaccessmenu v-on:guardarTodo="guardarTodo($event)" v-on:backPage="backPage($event)"  v-on:reloadpage="reloadpage($event)"/>
        </ol>
        <el-card class="box-card">
            <div slot="header" class="headercard">
                <span class="labelheadercard" > Modificar Compania</span>
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
                                    <el-input   
                                        :disabled="true"
                                        size ="small" 
                                        v-model="compania.strCompany_Cod">
                                    </el-input>
                                    </div>
                                </div>
                            </div>
                            
                            <div  class="form-group row ">
                                <label class="el-form-item__label col-md-2" >Descripcion</label>
                                <div class="col-md-6 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input class="validador" :disabled="visualizar" size ="small" v-model="compania.strCompany_Desc"  type="text">  
                                    </el-input>
                                    </div>
                                </div>
                            </div>    
                            <div  class="form-group row ">
                                <label class="el-form-item__label col-md-2" >RUC</label>
                                <div class="col-md-2 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input class="validador" :disabled="visualizar" size ="small" v-model="compania.strRUC"  type="text">  
                                    </el-input>
                                    </div>
                                </div>
                            </div>    
                            <div class="form-group row">
                                <label class="el-form-item__label col-md-2" >Pais</label>
                                <div class="col-md-2 grupolabel">
                                    <div class="input-group mb-3" >
                                        <el-input :disabled="visualizar" class="validador" size ="small" @blur="desactivar_Pais" @focus="activar_Pais" v-model="compania.strCountry">                            
                                            <el-button :disabled="visualizar" v-if="btnactivarpais && !paisVisible" slot="append" class="boton" icon="fa fa-clone" @click="paisDialog()"></el-button> 
                                        </el-input>
                                    </div>
                                </div>
                                <label class="sinLinea el-form-item__label col-md-4">{{gridSelectPais.strCountry_Name}}</label>
                            </div>    
                            <div class="form-group row">
                                <label class="el-form-item__label col-md-2" >Region</label>
                                <div class="col-md-2 grupolabel">
                                    <div class="input-group mb-3" >
                                        <el-input :disabled="visualizar" size ="small" @blur="desactivar_Departamento" @focus="activar_Departamento" v-model="compania.strRegion">                            
                                            <el-button  v-if="btnactivardepartamento && !departVisible" slot="append" class="boton" icon="fa fa-clone" @click="departDialog()"></el-button> 
                                        </el-input>
                                    </div>
                                </div>
                                <label class="sinLinea el-form-item__label col-md-4">{{selectDepartamento.strRegion_Desc}}</label>
                            </div>           
                            <div class="form-group row">
                                <label class="el-form-item__label col-sm-2" >Direccion</label>
                                <div class="col-sm-6 grupolabel">
                                    <div class="input-group mb-3" >
                                        <el-input :disabled="visualizar" class="validador" size="small" v-model="compania.strAddress"  >
                                        </el-input>
                                    </div>
                                </div>
                            </div>           
                            <div class="form-group row">
                               <label class="el-form-item__label col-md-2" >Moneda Local</label>
                                <div class="col-md-2 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input
                                    :disabled="visualizar"  
                                    size ="small" 
                                    @blur="desactivar_MonedaL" 
                                    @focus="activar_MonedaL" 
                                    v-model="strCurr_Loc">
                                        <el-button :disabled="visualizar" v-if="btnactivarMonedaL && !dialogMonedaL" slot="append" class="boton" icon="fa fa-clone" @click="loadMonedaL()"></el-button> 
                                    </el-input>
                                    </div>
                                </div>
                                <label class="sinLinea el-form-item__label col-md-4">{{selectMonedaA.strCurrency_Desc}}</label>
                            </div>           
                            <div class="form-group row">
                                 <label class="el-form-item__label col-md-2" >Moneda Corporativa</label>
                                <div class="col-md-2 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input  
                                    :disabled="visualizar"
                                    size ="small" 
                                    @blur="desactivar_MonedaC" 
                                    @focus="activar_MonedaC" 
                                    v-model="strCurr_Funct">
                                        <el-button :disabled="visualizar" v-if="btnactivarMonedaC && !dialogMonedaC" slot="append" class="boton" icon="fa fa-clone" @click="loadMonedaC()"></el-button> 
                                    </el-input>
                                    </div>
                                </div>
                                <label class="sinLinea el-form-item__label col-md-4">{{selectMonedaB.strCurrency_Desc}}</label>
                            </div>           
                            <div class="form-group row">
                                 <label class="el-form-item__label col-md-2" >Moneda Grupo</label>
                                <div class="col-md-2 grupolabel">
                                    <div class="input-group mb-3" >
                                    <el-input  
                                    :disabled="visualizar"
                                    size ="small" 
                                    @blur="desactivar_MonedaG" 
                                    @focus="activar_MonedaG" 
                                    v-model="strCurr_Grp">
                                        <el-button :disabled="visualizar" v-if="btnactivarMonedaG && !dialogMonedaG" slot="append" class="boton" icon="fa fa-clone" @click="loadMonedaG()"></el-button> 
                                    </el-input>
                                    </div>
                                </div>
                                 <label class="sinLinea el-form-item__label col-md-4">{{selectMonedaC.strCurrency_Desc}}</label>
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
                    <img src="../../../../../images/save.png" v-if="issave" style="width:16px; height:17px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 1.3rem;" @click="fnOcultar()"/>
                    <img src="../../../../../images/cancelar.png" v-if="iserror" style="width:16px; height:17px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 1.3rem;" @click="fnOcultar()"/>
                    <span class="footertext2" style="" >{{textosave}}</span>
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
        <el-dialog title="Busqueda Pais" :visible.sync="paisVisible" @close="handleClosePais" size="small" >
            <bpais v-on:PaisSeleccionado="paisSelect($event)" v-on:closePais="handleClosePais()">
            </bpais>
        </el-dialog> 
        <!--DIALOG BUSQUEDA MONEDA-->
        <el-dialog title="Busqueda Moneda Local"  :visible.sync="dialogMonedaL" @close="closeDialogMonedaL" size="small" >
            <bmoneda v-on:MonedaSeleccionado="MonedaSeleccionadoL($event)" v-on:closeMoneda="closeDialogMonedaL()">
            </bmoneda>
        </el-dialog>  
        <!--DIALOG BUSQUEDA MONEDA-->
        <el-dialog title="Busqueda Moneda Corporativa"  :visible.sync="dialogMonedaC" @close="closeDialogMonedaC" size="small" >
            <bmoneda v-on:MonedaSeleccionado="MonedaSeleccionadoC($event)" v-on:closeMoneda="closeDialogMonedaC()">
            </bmoneda>
        </el-dialog>  
        <!--DIALOG BUSQUEDA MONEDA-->
        <el-dialog title="Busqueda Moneda Grupo"  :visible.sync="dialogMonedaG" @close="closeDialogMonedaG" size="small" >
            <bmoneda v-on:MonedaSeleccionado="MonedaSeleccionadoG($event)" v-on:closeMoneda="closeDialogMonedaG()">
            </bmoneda>
        </el-dialog>  
        
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
                                    <el-button slot="append" class="boton" icon="fa fa-search" @keydown.native.enter="searchDepa()"
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
                    <el-table-column :render-header="filterstrRegion_Desc" prop="strRegion_Desc" label="Descripcion" style="width: 70% !important;">
                    </el-table-column> 
                    </el-table>
            </el-card>
            <span slot="footer" class="dialog-footer">
                <img src="../../../../../images/check.png" style="width:13px; height:15px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.6rem;" @click="departChosseCheck()"/>
                <img src="../../../../../images/close.png" style="width:17px; height:15px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.6rem;" @click="departChosseClose()"/>
            </span>
        </el-dialog>
    </div>  
</template>
<script>

import ModificarCompaniaComponent from '@/components/XX-CONFI/maestro_datos/compania/modif_compania/modif_compania.component'
export default ModificarCompaniaComponent
</script>
<style scoped>
.sinLinea{
  border-bottom: 1px solid #f6f7f9;
  color: #1f2d3d; 
}
</style>
