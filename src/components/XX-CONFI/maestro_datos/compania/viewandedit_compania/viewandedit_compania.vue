
<template>

  <div class="al-crear">
    <ol  style="margin-left: -1.5rem;background: linear-gradient(rgb(229, 241, 247) 0%, rgb(255, 255, 255) 100%);    margin-bottom: 0rem !important;">
        <quickaccessmenu v-on:validarView="validad()" v-on:backPage="backPage($event)"  v-on:reloadpage="reloadpage($event)"/>
    </ol>

    <el-card class="box-card">
        <div slot="header" class="headercard">
            <span class="labelheadercard" >Modificar Compañia</span>
        </div>
        <div class="row bodycard">
           <div class="container">
                <div class="row" style="margin-top: 3px;">
                    <div class="col-sm-9" >
                        <div class="form-group row ">
                            <label class="el-form-item__label col-md-2" >Compañia</label>
                            <div class="col-md-2 grupolabel">
                                <div class="input-group mb-3" >
                                <el-input   
                                size ="small" 
                                v-model="companyCod">
                                </el-input>
                                </div>
                            </div>
                        </div>
                        <!-- <div class="form-group row ">
                            <label class="el-form-item__label col-md-2" >Descripcion</label>
                            <div class="col-md-2 grupolabel">
                                <div class="input-group mb-3" >
                                <el-input size ="small"  v-model="cod_modulo"  placeholder="">
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
                                <buttons-accions v-on:validarView="validarView()" v-on:Limpiar="Limpiar" v-on:Print="Print" v-on:Buscar="Buscar" v-on:AscItem="AscItem" v-on:DscItem="DscItem" v-on:EliminarItem="EliminarItem()" v-on:siguiente="siguiente()" v-on:anterior="anterior()" ></buttons-accions>
                            </div>
                            <div class="col-md-12" >
                                <div class="row bodycard" style="background: white;margin-top: 0px;">
                                    <el-table
                                        ref="missionTable"
                                        :max-height="sizeScreen"
                                        :data="tableData" 
                                         highlight-current-row
                                         @header-click="headerclick"
                                         @row-dblclick="validarView"
                                         @current-change="handleCurrentChange"
                                        stripe  :default-sort = "{prop: 'date', order: 'descending'}"
                                        class="ExcelTable2007">
                                        <el-table-column type="index" label="Item" width="38">
                                        </el-table-column>
                                        <el-table-column  :render-header="filterstrCompany_Cod" prop="strCompany_Cod" width="80" label="Compañia">
                                            <template scope="scope">
                                            <label v-bind:style="{width:'100%',margin: '0rem'}" >&nbsp;{{ scope.row.strCompany_Cod }}</label>
                                            </template>
                                        </el-table-column> 
                                        <el-table-column :render-header="filterstrCompany_Desc"  
                                            prop="strCompany_Desc" width="250"
                                            label="Descripcion">
                                            <template scope="scope">
                                                <label v-bind:style="{width:'100%',margin: '0rem'}" >&nbsp;{{ scope.row.strCompany_Desc }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column :render-header="filterstrRUC"  
                                            prop="strRUC" width="100"
                                            label="RUC">
                                            <template scope="scope">
                                                <label v-bind:style="{width:'100%',margin: '0rem'}" >&nbsp;{{ scope.row.strRUC }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column :render-header="filterstrCountry"  
                                            prop="strCountry" 
                                            label="Pais">
                                            <template scope="scope">
                                                <label v-bind:style="{width:'100%',margin: '0rem'}" >&nbsp;{{ scope.row.strCountry }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column :render-header="filterstrAddress" 
                                            prop="strAddress"  width="250"
                                            label="Direccion">
                                            <template scope="scope">
                                                <label v-bind:style="{width:'100%',margin: '0rem'}" >&nbsp;{{ scope.row.strAddress }}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column :render-header="filterdtmModified_Date"
                                                prop="dtmModified_Date"   min-width="80"
                                                label="Fecha">
                                                <template scope="scope">
                                                    <span>{{ getDateStringView(scope.row.dtmModified_Date) }}</span>
                                                </template>
                                            </el-table-column>
                                        <el-table-column :render-header="filterstrModified_User"
                                            prop="strModified_User"   
                                            label="Usuario" min-width="80">
                                            <template scope="scope">
                                                <label v-bind:style="{width:'100%',margin: '0rem'}" >&nbsp;{{ scope.row.strModified_User }}</label>
                                            </template>
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
                <img src="../../../../../images/save.png" v-if="issave" style="width:16px; height:17px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 1.3rem;" @click="fnOcultar()"/>
                <img src="../../../../../images/save.png" v-if="iserror" style="width:16px; height:17px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 1.3rem;" @click="fnOcultar()"/>
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
                            <el-input size ="small" v-model="txtbuscar" :autofocus="true" @keydown.native.enter="btnBuscar()">  
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
    <b-modal ref="myModalRef" hide-footer title="Eliminar" size="sm"  v-model="dialogEliminar" @keydown.native.enter="confirmaraceptar">
      <div style="height:85px"> 
        <img src="../../../../../images/tacho.png" style="width:14px; height:15px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.3rem;"/>
        <span style="font-size:13px">¿Desea Eliminar el documento?</span>
      </div>
      <footer class="modal-footer">
        <img src="../../../../../images/check.png" style="width:13px; height:15px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.6rem;" @click="btnEliminar"/>
        <img src="../../../../../images/close.png" style="width:17px; height:15px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.6rem;" @click="dialogEliminar = false"/>
      </footer>
    </b-modal>
</div>  
  
</template>
<script>

import ViewAndEditCompaniaComponent from '@/components/XX-CONFI/maestro_datos/compania/viewandedit_compania/viewandedit_compania.component'
export default ViewAndEditCompaniaComponent
</script>
