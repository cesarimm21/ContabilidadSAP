
<template>
<div>
    <h4>Accesos a los documentos</h4>
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
              <el-form :model="FormSearchAcceso">
                <el-form-item label="Código doc." :label-width="formLabelWidth" >
                  <el-input
                    placeholder="Código"
                    v-model="FormSearchAcceso.strCodDocumento">
                  </el-input>
                </el-form-item>
              </el-form>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="search_Documento">
              <el-form :model="FormSearchAcceso">
                <el-form-item label="Título" :label-width="formLabelWidth" >
                  <el-input
                    placeholder="Descripción"
                    v-model="FormSearchAcceso.strTitle">
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
                    class="diálogos"
                    :label-width="formLabelWidth"
                    v-model="FormSearchAcceso.dtmInic"
                    type="date"
                    format="dd/MM/yyyy"
                    placeholder="Seleccione día">
                </el-date-picker>
                </el-form-item>
              </el-form>
            </div>
          </el-col>     
          <el-col :span="6" >
            <div class="search_asta">
              <el-form >
                <el-form-item label="Hasta" :label-width="formLabelWidth" >
                  <el-date-picker
                    class="dialogos"
                    :label-width="formLabelWidth"
                        v-model="FormSearchAcceso.dtmFin"
                        type="date"
                        format="dd/MM/yyyy"
                        placeholder="Seleccione día">
                </el-date-picker>
                </el-form-item>
              </el-form>
            </div>
          </el-col>
          <el-col :offset="18" :span="6" >
            <div class="search">
                  <el-button type="primary" icon="search" @click="SearchDocumentoAcceso(FormSearchAcceso)" >Buscar</el-button>
            </div>
      </el-col>   
        </el-row>
        </el-card>
        
        
     <el-table
      v-loading="loadingGet"
      element-loading-text="Cargando..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"  
      :data="gridData"
      border
      class="tableAccess"
      style="width: 100%">
      <el-table-column prop="Codigo"  label="Código" class="itemTabla"></el-table-column>
      <el-table-column prop="strTitle"  label="Título" ></el-table-column>
      <el-table-column prop="TipoDescripcion"  label="Tipo" ></el-table-column>
      <el-table-column prop="strUniDescripcion"  label="Unidad" ></el-table-column>
      <el-table-column prop="strUsuarioCrea"  label="Usu. creador"></el-table-column>
      <el-table-column prop="dtmFechaCrea"  label="Fech. creado" type="data-target">
          <template scope="scope">
            <span>{{ getDateString(scope.row.dtmFechaCrea) }}</span>
          </template>
      </el-table-column>
      <el-table-column label="Accesos" >
        <template scope="scope">
          <el-button size="mini" type="info" icon="edit" 
            @click="handleEdit(scope.$index, scope.row)">Editar</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination layout="prev, pager, next" :total="totalRegistros" :page-size="RegistersForPage" :current-page.sync="pagina" @current-change="cambioPagina()">
      </el-pagination>
    <!-- loading data user -->
    <el-dialog :title="this.title" class="popupPer" :visible.sync="VisualizarPersonas">
      <el-row>
        <el-col :span="10">
          <div class="codigoPer">
            <el-form :model="FormSearchPers">
              <el-form-item label="Código Persona:" :label-width="formLabelWidth"> 
                 <el-input
                   placeholder="Código Persona:"
                   v-model="FormSearchPers.CodPersona">
                  </el-input>
              </el-form-item>
            </el-form>
          </div>          
        </el-col>
        <el-col :span="10" :offset="4">
          <div class="codigoPer">
            <el-form :model="FormSearchPers" :label-width="formLabelWidth">
              <el-form-item label="Nombres:"> 
                 <el-input
                   placeholder="Nombres"
                   v-model="FormSearchPers.Nombres">
                  </el-input>
              </el-form-item>
            </el-form>
          </div>          
        </el-col>

      </el-row>
      <el-row>
        <el-col :span="10">
          <div class="codigoPer">
            <el-form :model="FormSearchPers" :label-width="formLabelWidth">
              <el-form-item label="Apellido Paterno:"> 
                 <el-input
                   placeholder="Apellido Paterno"
                   v-model="FormSearchPers.ApellidoPaterno">
                  </el-input>
              </el-form-item>
            </el-form>
          </div>          
        </el-col>
        <el-col :span="10" :offset="4">
          <div class="codigoPer">
            <el-form :model="FormSearchPers" :label-width="formLabelWidth">
              <el-form-item label="Apellido Materno:"> 
                 <el-input
                   placeholder="Apellido Materno"
                   v-model="FormSearchPers.ApellidoMaterno">
                  </el-input>
              </el-form-item>
            </el-form>
          </div>          
        </el-col>

      </el-row>
      <el-row>
        <el-col :span="10">
          <div class="codigoPer">
            <el-form :model="FormSearchPers" :label-width="formLabelWidth">
              <el-form-item label="Correo:"> 
                 <el-input
                   placeholder="Correo"
                   v-model="FormSearchPers.Email">
                  </el-input>
              </el-form-item>
            </el-form>
          </div>          
        </el-col>
        <el-col :span="10" :offset="4">
          <div class="butonFooter">
              <el-button-group>
                <el-button type="primary" icon="search" @click="SearchPersonas(FormSearchPers)">Buscar</el-button>
              </el-button-group>
            </div>          
        </el-col>
      </el-row>
     <el-table  class="tabletaSearchPers"
     v-loading="loadingGet1"
      element-loading-text="Cargando..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"  
                  :data="gridDataUser" 
                  highlight-current-row                        
                  border
                  style="width: 100%">
                  <el-table-column prop="CodPersona"  label="Cod. Persona" class="itemTabla"></el-table-column>
                  <el-table-column prop="Nombres"  label="Nombres" ></el-table-column>
                  <el-table-column prop="ApellidoPaterno"  label="Ap. Paterno" ></el-table-column>
                  <el-table-column prop="ApellidoMaterno"  label="Ap. Materno" ></el-table-column>
                  <el-table-column prop="Email"  label="Email" width="200"></el-table-column>
                  <el-table-column label="Acceso" >
                    <template scope="scope">
                      <el-button size="mini" type="danger" icon="circle-check"
                        @click="GetRowData(scope.$index, scope.row)">Eliminar</el-button>
                    </template>
                  </el-table-column>
            </el-table>
            <el-pagination layout="prev, pager, next" :total="totalRegistros1" :page-size="RegistersForPage1" :current-page.sync="pagina1" @current-change="cambioPagina1()">    
          </el-pagination>
      <span slot="footer" class="dialog-footer">  
        <el-button type="success" class="fa fa-user-plus" @click="AgregarUsuario()">Agregar</el-button>
      </span>
    </el-dialog>


    <!-- loading data user -->
    <el-dialog title="Agregar persona a documento" class="popupPer" :visible.sync="VisualizarPersonasAll">
      <div v-loading="loadingGet4"
                element-loading-text="Cargando..."
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"  >
      <el-form :model="FormSearch" class="Persona">
      <el-row>
      
        <el-col :span="8">
          <div class="codigoPer">
            <el-form :model="FormSearch">
              <el-form-item label="Código o DNI:" :label-width="formLabelWidth"> 
                 <el-input
                   placeholder="Código:"
                   v-model="FormSearch.CodPersona">
                  </el-input>
              </el-form-item>
            </el-form>
          </div>          
          <div class="codigoPer">
            <el-form :model="FormSearch" :label-width="formLabelWidth">
              <el-form-item label="Nombres:"> 
                 <el-input
                   placeholder="Nombres"
                   v-model="FormSearch.Nombres">
                  </el-input>
              </el-form-item>
            </el-form>
          </div>  
          <div class="codigoPer">
            <el-form :model="FormSearch" :label-width="formLabelWidth">
              <el-form-item label="Apellido Paterno:"> 
                 <el-input
                   placeholder="Apellido Paterno"
                   v-model="FormSearch.ApellidoPaterno">
                  </el-input>
              </el-form-item>
            </el-form>
          </div>          
          <div class="codigoPer">
            <el-form :model="FormSearch" :label-width="formLabelWidth">
              <el-form-item label="Apellido Materno:"> 
                 <el-input
                   placeholder="Apellido Materno"
                   v-model="FormSearch.ApellidoMaterno">
                  </el-input>
              </el-form-item>
            </el-form>
          </div>   
          <!-- <div class="codigoPer">
            <el-form :model="FormSearch" :label-width="formLabelWidth">
              <el-form-item label="Correo:"> 
                 <el-input
                   placeholder="Correo"
                   v-model="FormSearch.Email">
                  </el-input>
              </el-form-item>
            </el-form>
          </div> -->
          <div class="codigoPer">
            <el-form :model="FormSearch" :label-width="formLabelWidth">
              <el-form-item label="Tipo persona" >
                <el-select class="selected" v-model="FormSearch.intCodTipoPersona" filterable placeholder="Seleccione">
                  <el-option
                    v-for="item in tipo"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>  
            </el-form>
          </div>
          <div class="codigoPer">
              <el-button-group>
                <el-button type="primary" icon="search" @click="SearchPersonasForm(FormSearch)">Buscar</el-button>
                <el-button type="danger" class="el-icon-fa fa-eraser" @click="SearchEmpty()">Limpiar</el-button>                
              </el-button-group>
            </div>          
        </el-col>
        <el-col :offset="1" :span="15">
          <el-table  class="tableta"
              v-loading="loadingGet2"
                element-loading-text="Cargando..."
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"  
                            :data="GridPersona" 
                            highlight-current-row                        
                            border
                            style="width: 100%">
                            <el-table-column prop="CodPersona"  label="Código" class="itemTabla"></el-table-column>
                            <el-table-column prop="Nombres"  label="Nombres" ></el-table-column>
                            <el-table-column prop="ApellidoPaterno"  label="Ap. paterno" ></el-table-column>
                            <el-table-column prop="ApellidoMaterno"  label="Ap. materno" ></el-table-column>
                            <el-table-column label="Acceso" >
                              <template scope="scope">
                                <el-button size="mini" type="success" class="fa fa-plus-square"
                                  @click="InsertUsuarioAcceso(scope.$index, scope.row)">Agregar</el-button>
                              </template>
                            </el-table-column>
                      </el-table>
                      <el-pagination layout="prev, pager, next" :total="totalRegistros2" :page-size="RegistersForPage2" :current-page.sync="pagina2" @current-change="cambioPagina2()">    
                    </el-pagination> 
        </el-col>
      </el-row>
      </el-form>
      </div>
      
    </el-dialog>
</div>

</template>


<script>

import AccesoDocument from '@/components/accesoDocument/accesoDocument.component'
export default AccesoDocument
</script>
<style>
.tableAccess{
    font-size: 12px;
}
.el-dialog--small {
    width: 70%;
}
.selected{
  width: 100%;
}
.el-dialog__title {
    color: white;
    font-size: 1.25rem;
    font-style: normal;
}
.tabletaProceso th.is-leaf {
    border-bottom: 1px solid #748492;
}
.tabletaProceso th>.cell {
    background-color: #909399;
    color: white;
}
.tabletaProceso tr{
    background-color: #94c0dd;
}
</style>
