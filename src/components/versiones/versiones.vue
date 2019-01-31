<template>
<div class="versiones"
v-loading="loadingGet"
      element-loading-text="Generando Documento..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)" >
        <p class="titleComponent" align="center">
         B&uacute;squeda de versiones
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
            <el-form-item label="Código doc." :label-width="formLabelWidth" >
              <el-input
                placeholder="Codigo"
                 v-model="FormSearch.CodDocumentoGenerado">
               </el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="search_Documento">
          <el-form :model="FormSearch">
            <el-form-item label="Título " :label-width="formLabelWidth" >
              <el-input
                placeholder="Título"
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
                v-model="FormSearch.dtmInic"
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
            <el-form-item label="hasta" :label-width="formLabelWidth" >
              <el-date-picker
                class="dialogos"
                :label-width="formLabelWidth"
                    v-model="FormSearch.dtmFin"
                    type="date"
                    format="dd/MM/yyyy"
                    placeholder="Seleccione dia">
             </el-date-picker>
            </el-form-item>
          </el-form>
        </div>
      </el-col>   
    </el-row>
      
    <p class="titleComponentResp" align="left">Persona responsable</p>
    <el-row>
      <el-col :span="6">
        <div class="search_Codigo">
          <el-form :model="FormSearch" >
            <el-form-item label="Código" :label-width="formLabelWidth" >
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
            <el-form-item label="Apellido Paterno" :label-width="formLabelWidth" >
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
            <el-form-item label="Apellido Materno" :label-width="formLabelWidth" >
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
          <el-button-group>
            <el-button type="danger" icon="fa fa-eraser" @click="clearDataSearch()">Limpiar</el-button>
            <el-button type="primary" icon="search" @click="SearchVersiones(FormSearch)" >Buscar</el-button>
          </el-button-group>
       </div>
    </el-row>
    </el-card>
      <br>
     <el-table class="VersionDoc"   
        v-loading="loadingTable1"
        element-loading-text="Cargando..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"   
        :data="gridData"             
        border
        style="width: 100%">
        <el-table-column prop="intVersion"  label="Version" width="120" ></el-table-column>
        <el-table-column prop="CodDocumentoGenerado"  label="Codigo" width="160" ></el-table-column>
        <el-table-column prop="strTitle"  label="Titulo del Documento" ></el-table-column>
        <el-table-column prop="TipoDescripcion"  label="Tipo Aprobación" ></el-table-column>
        <el-table-column prop="strUniDescripcion"  label="Unidad" ></el-table-column>
        <el-table-column prop="strUsuarioCrea"  label="Usuario" width="100"></el-table-column>
        <el-table-column prop="dtmFechaCrea"  label="Fecha creada" width="120" >
          <template scope="scope">
            <span>{{ getDateString(scope.row.dtmFechaCrea) }}</span>
          </template>
        </el-table-column>  
        <el-table-column label="Versiones" width="110">    
             <template scope="scope">
                    <el-button :plain="true" icon="fa fa-file-word-o" size="mini" type="success" class="btn btn-outline-success"
                       @click="OpenVisualizarVersiones(scope.$index, scope.row)" >Ver</el-button>
                    </template>
        </el-table-column>         
      </el-table>   
        <el-pagination layout="prev, pager, next" :total="totalRegistros" :page-size="RegistersForPage" :current-page.sync="paginaNumero" @current-change="cambioPagina()">
      </el-pagination>
        <b-modal cancel-variant="outline-primary" v-model="modalVisualizar" hide-footer size="lg" title="Consulta de autor">
            <el-card>
              <el-row>
                <el-col :span="10">
                  <div class="search_Apellido">
                    <el-form :model="FormSearchUsu">
                      <el-form-item label="Codigo Usuario" :label-width="formLabelWidth" >
                        <el-input
                          placeholder="Codigo Usuario"
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
                      <el-form-item label="Apellido Paterno" :label-width="formLabelWidth" >
                        <el-input
                          placeholder="Apellido Paterno"
                          v-model="FormSearchUsu.ApellidoPaterno">
                        </el-input>
                      </el-form-item>
                    </el-form>
                  </div>
                </el-col>
                <el-col :span="10" :offset="4">
                  <div class="search_Documento">
                    <el-form :model="FormSearchUsu">
                      <el-form-item label="Apellido Materno" :label-width="formLabelWidth" >
                        <el-input
                          placeholder="Apellido Materno"
                          v-model="FormSearchUsu.ApellidoMaterno">
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
                          v-model="FormSearchUsu.Nombres">
                        </el-input>
                      </el-form-item>
                    </el-form>
                  </div>
                </el-col> 
              </el-row>
              <div class="search" align="center">
                <el-button-group>
                    <el-button type="danger" icon="fa fa-eraser" @click="clearDataUsuario()">Limpiar</el-button>
                    <el-button type="primary" icon="search" @click="SearchUsuarios(FormSearchUsu)">Buscar</el-button>
                </el-button-group>
              </div>
            </el-card>
            <el-table   class="tabletaSearch"
                v-loading="loadingTable2"
                element-loading-text="Cargando..."
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                  :data="DataUsuario" 
                  highlight-current-row                        
                  border
                  style="width: 100%">
                  <el-table-column prop="intCodUsuario"  label="Cod. Usuario" class="itemTabla"></el-table-column>
                  <el-table-column prop="Nombres"  label="Nombres" ></el-table-column>
                  <el-table-column prop="ApellidoPaterno"  label="Ap. Paterno" ></el-table-column>
                  <el-table-column prop="ApellidoMaterno"  label="Ap. Materno" ></el-table-column>
                  <el-table-column prop="strUsuario"  label="Usuario" ></el-table-column>
                  <el-table-column prop="strCargo"  label="Rol" ></el-table-column>
                  <el-table-column label="Confirmar" >
                    <template scope="scope">
                      <el-button  size="mini" type="success" icon="circle-check"
                        @click="GetRowData(scope.$index, scope.row)">Confirmar</el-button>
                    </template>
                  </el-table-column>
            </el-table>
            <el-pagination layout="prev, pager, next" :total="totalRegistros1" :page-size="RegistersForPage2" :current-page.sync="pagina" @current-change="cambioPaginaUsuario()">    
          </el-pagination>
        </b-modal>   

         <el-dialog class="viewpdf" 
            :visible.sync="modalVisualizarPdf" hide-footer hide-header>
            <iframe :src="viewer()" class="pdfviewer"></iframe>
          </el-dialog> 
        </div>
 </template>

<script>
import Versiones from '@/components/versiones/versiones.component'
export default Versiones
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
  .el-table th>.cell {
    background-color: #909399;
    color: white;
    
  }
  .VersionDoc tr{
    background-color: #dcc6c6;
}
.viewpdf>.el-dialog--small{
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);

}
.viewpdf>.el-dialog--small{
  top: 0% !important;
   /* margin-top: 0%; */
}
.el-dialog__wrapper{
  overflow: hidden;
}
.pdfviewer{
  width: 100%;
  height: 100%;
}
.viewpdf>.el-dialog--small>.el-dialog__body{
  padding: 0%;
  height: 100%;
}
</style>

