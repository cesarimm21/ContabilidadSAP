<template>
<div class="versiones">
        <p class="titleComponent" align="center">
         B&uacute;squeda de Reportes
         </p>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <i class="fa fa-filter"></i>
                <span>Filtros de b&uacute;squeda</span>
            </div>
    <el-row class="filterSearch">
      <el-col :span="6" >
        <div class="search_Version">
          <el-form :model="FormSearch">
            <el-form-item label="Codigo version" :label-width="formLabelWidth" >
              <el-input
                placeholder="Version"
                 v-model="FormSearch.Codigo">
               </el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="search_Documento">
          <el-form :model="FormSearch">
            <el-form-item label="Documento" :label-width="formLabelWidth" >
              <el-input
                placeholder="Descripcion"
                v-model="FormSearch.strTitle">
               </el-input>
             </el-form-item>
           </el-form>
         </div>
      </el-col>   
      <el-col :span="6">
        <div class="search_desde">
          <el-form >
            <el-form-item label="Desde" :label-width="formLabelWidth" >
              <el-date-picker
                class="dialogos"
                :label-width="formLabelWidth"
                    v-model="value2"
                    type="date"
                    format="dd/MM/yyyy"
                    placeholder="Seleccione dia">
             </el-date-picker>
            </el-form-item>
          </el-form>
        </div>
      </el-col>     
      <el-col :span="6" >
        <div class="search_asta">
          <el-form >
            <el-form-item label="Asta" :label-width="formLabelWidth" >
              <el-date-picker
                class="dialogos"
                :label-width="formLabelWidth"
                    v-model="value3"
                    type="date"
                    format="dd/MM/yyyy"
                    placeholder="Seleccione dia">
             </el-date-picker>
            </el-form-item>
          </el-form>
        </div>
      </el-col>   
    </el-row>
      
    <p class="titleComponentResp" align="left">Persona Responsable</p>
    <el-row>
      <el-col :span="6">
        <div class="search_Codigo">
          <el-form :model="FormSearch" >
            <el-form-item label="Codigo" :label-width="formLabelWidth" >
              <el-input
                placeholder="Cod. Usuario"
                v-model="FormSearch.intCodUsuario">
               </el-input>
             </el-form-item>
           </el-form>
         </div>
      </el-col>
      <el-col :span="6">
        <div class="search_Nombre">
          <el-form :model="FormSearch">
            <el-form-item label="Nombres" :label-width="formLabelWidth" >
              <el-input
                placeholder="Nombres"
                v-model="FormSearch.strNombres">
               </el-input>
             </el-form-item>
           </el-form>
         </div>
      </el-col> 
      <el-col :span="6">
        <div class="search_Apellido">
          <el-form :model="FormSearch">
            <el-form-item label="Apell. Pat." :label-width="formLabelWidth" >
              <el-input
                placeholder="Apellido"
                v-model="FormSearch.strApellidoPat">
               </el-input>
             </el-form-item>
           </el-form>
         </div>
      </el-col> 
      <el-col :span="6">
        <div class="search_ApellidoMat">
          <el-form :model="FormSearch">
            <el-form-item label="Apell. Mat." :label-width="formLabelWidth" >
              <el-input
                placeholder="Apellido"
                v-model="FormSearch.strApellidoMat">
               </el-input>
             </el-form-item>
           </el-form>
         </div>
      </el-col>   
    </el-row>
    <el-row>
      <el-col :span="6">
        <div class="search_Usuario">
          <el-form :model="FormSearch">
            <el-form-item label="Usuario" :label-width="formLabelWidth" >
              <el-input
                placeholder="Usuario"
                v-model="FormSearch.strUsuario">
               </el-input>
             </el-form-item>
           </el-form>
         </div>
      </el-col>  
      <el-col :span="6" >
        <el-button class="userbot" type="primary" icon="search" @click="modalVisualizar = true"></el-button>
      </el-col>
        <div class="search">
          <el-button type="primary" icon="search" @click="SearchVersiones(FormSearch)" >Buscar</el-button>
        </div>
    </el-row>
    </el-card>
      <br>
     <el-table       
        :data="gridData"             
        border
        style="width: 100%">
        <el-table-column prop="intCodUsuario"  label="Cod. Usuario" ></el-table-column>
        <el-table-column prop="strTitle"  label="Titulo Doc." ></el-table-column>
        <el-table-column prop="Codigo"  label="Codigo" ></el-table-column>
        <el-table-column prop="strUsuario"  label="Usuario Creado" ></el-table-column>
        <el-table-column prop="strNombres"  label="Nombre Usuario" ></el-table-column>
        <el-table-column prop="dtmFechaCrea"  label="Fecha Creada" >
          <template scope="scope">
            <span>{{ getDateString(scope.row.dtmFechaCrea) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Operaciones" with="200">
        <template scope="scope">
          <el-button :plain="true" icon="view" size="small" type="info"
            @click="handleEdit(scope.$index, scope.row)">Ver Versión</el-button>
          <el-button :plain="true"  icon="document" size="small" type="danger"
            @click="handleDelete(scope.$index, scope.row)">Generar Reporte</el-button>
        </template>
      </el-table-column>
        
      </el-table>   
        <el-pagination layout="prev, pager, next" :total="totalRegistros" :page-size="RegistersForPage" :current-page.sync="paginaNumero" @current-change="cambioPagina()">
      </el-pagination>
        <b-modal cancel-variant="outline-primary" v-model="modalVisualizar" hide-footer size="lg" title="Consulta de Autor">
            <el-card>
              <el-row>
                <el-col :span="10">
                  <div class="search_Apellido">
                    <el-form :model="FormSearchUsu">
                      <el-form-item label="Cod Usuario" :label-width="formLabelWidth" >
                        <el-input
                          placeholder="Cod Usuario"
                          v-model="FormSearchUsu.intCodUsuario">
                        </el-input>
                      </el-form-item>
                    </el-form>
                  </div>
                </el-col> 
                <el-col :span="10" :offset="4">
                  <div class="search_Codigo">
                    <el-form :model="FormSearchUsu">
                      <el-form-item label="Usuario" :label-width="formLabelWidth" >
                        <el-input
                          placeholder="Usuario"
                          v-model="FormSearchUsu.strUsuario">
                        </el-input>
                      </el-form-item>
                    </el-form>
                  </div>
                </el-col> 
              </el-row>
              <el-row>
                <el-col :span="10">
                  <div class="search_Apellido">
                    <el-form :model="FormSearchUsu">
                      <el-form-item label="Ap. Paterno" :label-width="formLabelWidth" >
                        <el-input
                          placeholder="Ap. Paterno"
                          v-model="FormSearchUsu.strApellidoPat">
                        </el-input>
                      </el-form-item>
                    </el-form>
                  </div>
                </el-col>
                <el-col :span="10" :offset="4">
                  <div class="search_Documento">
                    <el-form :model="FormSearchUsu">
                      <el-form-item label="Ap. Materno" :label-width="formLabelWidth" >
                        <el-input
                          placeholder="Ap. Materno"
                          v-model="FormSearchUsu.strApellidoMat">
                        </el-input>
                      </el-form-item>
                    </el-form>
                  </div>
                </el-col>  
              </el-row>
              <el-row>
                <el-col :span="10">
                  <div class="search_Apellido">
                    <el-form :model="FormSearchUsu" >
                      <el-form-item label="Nombres." :label-width="formLabelWidth" >
                        <el-input
                          placeholder="Nombres"
                          v-model="FormSearchUsu.strNombres">
                        </el-input>
                      </el-form-item>
                    </el-form>
                  </div>
                </el-col> 
              </el-row>
              <div class="search" align="center">
                <el-button type="primary" icon="search" @click="SearchUsuarios(FormSearchUsu)">Buscar</el-button>
              </div>
            </el-card>
            <el-table   class="tabletaSearch"
                  :data="DataUsuario" 
                  highlight-current-row                        
                  border
                  style="width: 100%">
                  <el-table-column prop="intCodUsuario"  label="Cod. Usuario" class="itemTabla"></el-table-column>
                  <el-table-column prop="strNombres"  label="Nombres" ></el-table-column>
                  <el-table-column prop="strApellidoPat"  label="Ap. Paterno" ></el-table-column>
                  <el-table-column prop="strApellidoMat"  label="Ap. Materno" ></el-table-column>
                  <el-table-column prop="strUsuario"  label="Usuario" ></el-table-column>
                  <el-table-column prop="strCargo"  label="Rol" ></el-table-column>
                  <el-table-column label="Confirmar" >
                    <template scope="scope">
                      <el-button :plain="true" icon="circle-check" size="mini" type="button" class="btn btn-outline-success"
                        @click="GetRowData(scope.$index, scope.row)">Confirmar</el-button>
                    </template>
                  </el-table-column>
            </el-table>
            <el-pagination layout="prev, pager, next" :total="totalRegistros1" :page-size="RegistersForPage2" :current-page.sync="pagina" @current-change="cambioPaginaUsuario()">    
          </el-pagination>
        </b-modal>
        
               
        </div>

 </template>

<script>
import ReportesComponent from '@/components/reportes/reportes.component'
export default ReportesComponent
</script>
<style>
.el-select {
    width: 100%;
    padding-left: 0px;
}
.el-date-editor.el-input {
     width: 130px;
}
.userbot{
  margin-left: 10px;
}
.el-table{
  font-size: 12px;
}
.el-table__body tr.current-row>td {
   background: #13CE66;
  }
  .titleComponentResp{
    background-color: #D3DCE6;
    color: #1F2D3D;
  }
</style>

