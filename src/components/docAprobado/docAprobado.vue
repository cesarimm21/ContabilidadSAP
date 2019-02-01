<template>
    <div id="docAprobado">
        <p class="titleComponent" align="center">
            B&uacute;squeda de documentos aprobados
        </p>
        <el-card class="box-card">
            <i class="fa fa-filter"></i>
            <span>Filtros de b&uacute;squeda</span>
            <el-input class="center" placeholder="Busqueda" v-model="SearchForm.strQuery"></el-input>
            <!-- <el-button type="primary" icon="search" @click="searchTermino(BuscarTermino)">Buscar</el-button> -->
            <p class="titleComponentResp" align="left">Propiedades del documento</p>
            <el-row>
            <el-col :span="6">
                <div class="search_Codigo">
                <el-form :model="SearchForm" >
                    <el-form-item label="Código" :label-width="formLabelWidth" >
                    <el-input
                        placeholder="Cod. documento"
                        v-model="SearchForm.strCodDocumento">
                    </el-input>
                    </el-form-item>
                </el-form>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="search_Titulo">
                <el-form :model="SearchForm">
                    <el-form-item label="Título" :label-width="formLabelWidth" >
                    <el-input
                        placeholder="Título del doc."
                        v-model="SearchForm.strTitle">
                    </el-input>
                    </el-form-item>
                </el-form>
                </div>
            </el-col> 
            <el-col :span="6">
                <div class="search_TipDoc">
                  <el-form :model="SearchForm">
                    <el-form-item label="Tipo Aprobación " label-width="120px" >
                        <el-select class="selectOptios" v-model="SearchForm.CodTipoAprobacion" filterable placeholder="Seleccione ">
                        <el-option
                            v-for="item in gridTipoAprobacion"
                            :key="item.CodTipoAprobacion"
                            :label="item.TipoDescripcion"
                            :value="item.CodTipoAprobacion">
                        </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                </div>
            </el-col> 
            <el-col :span="6">
                <div class="search_Unidad">
                 <el-form :model="SearchForm">
                    <el-form-item label="Unidad " label-width="120px" >
                        <el-select class="selectOptios" v-model="SearchForm.strUniDescripcion" filterable placeholder="Seleccione ">
                        <el-option
                            v-for="item in gridUnidad"
                            :key="item.intCodUnidad"
                            :label="item.strUniDescripcion"
                            :value="item.strUniDescripcion">
                        </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                </div>
            </el-col>   
            </el-row>
            <el-row>
                <el-col :span="6">
                    <div class="search_USU">
                        <el-form :model="SearchForm">
                            <el-form-item label="Usuario" :label-width="formLabelWidth">
                                <el-input
                                    placeholder="Usuario"
                                    v-model="SearchForm.strUsuario">
                                </el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="search_Nombre">
                        <el-form :model="SearchForm">
                            <el-form-item label="Nombres:" :label-width="formLabelWidth">
                                <el-input
                                placeholder="Nombres"
                                v-model="SearchForm.strNombres">                                    
                                </el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="butonUsuario">
                        <el-button type="primary" class="el-icon-circle-check" @click="VisualizarUsuario = true"></el-button>
                    </div>
                </el-col>
                <el-col :span="6" aling="left">
                    <div class="butonSearch " align="right">
                        <el-button-group>
                            <el-button type="danger" icon="fa fa-eraser" @click="searchDocumentoClean()">Limpiar</el-button>
                            <el-button type="primary" icon="search" @click="searchDocumento(SearchForm)">Buscar</el-button>    
                        </el-button-group>                        
                    </div>
                </el-col>
            </el-row>
        </el-card>
        <br>       
        <el-row :gutter="20">          
            <el-col :span="4" v-for="item in gridData.Data" :key="item.strCodDocumento" >
                <div class="card-mayor" @contextmenu.prevent="$refs.ctxMenu.open(get(item))">
                    <el-card :body-style="{ padding: '0px', margin:'0px' }">
                        <div class="imagen-box" @dblclick="viewpdf(item.CodDocumentoGenerado,item.strTitle)">
                            <img :src="getImageUrl(item.CodDocumentoGenerado)" class="imagenes">
                        </div>
                        <div class= "doc" style="padding: 14px;" :id="item.strTitle">
                            <span>{{item.strTitle+".pdf"}}</span><br>
                            <span>{{item.dtmFechaCrea}}</span>                        
                        </div>
                        <b-tooltip show :target="item.strTitle" >{{item.strTitle+".pdf"}}<br>{{item.dtmFechaCrea}}</b-tooltip>
                        <div class="boton-cambio">
                            <button type="text" class="button">
                                <img class="imagens" src="../../images/iconopdf.png" alt="">
                            </button>
                        </div>
                    </el-card>
                </div>                         
            </el-col>
            <context-menu id="context-menu" ref="ctxMenu">
                    <div class=" principal">                    
                        <el-menu default-active="2" class="menus">
                            <!-- <el-menu-item @click="modalJerarquia = true" index="1">
                                <i class="fa fa-sitemap"></i>
                                <span class="router_link" slot="title" >Jerarquia</span>
                            </el-menu-item> -->
                            <!-- <el-menu-item @click="modalVisualizar = true" index="3">
                                <i class="fa fa-eye"></i>
                                <span class="router_link" slot="title" >Visualizar</span>
                            </el-menu-item> -->
                            <!-- <el-menu-item @click="SendDocument=true" index="4">
                                <i class="fa fa-share-alt"></i>
                                <span class="router_link" slot="title" >Compartir</span>
                            </el-menu-item> -->
                            <el-menu-item @click="historialAprobadoAndNew()" index="5">
                                <i class="fa fa-list-ul"></i>
                                <span class="router_link" slot="title" >Historial</span>
                            </el-menu-item>     
                            <el-menu-item @click="downloadDoc()" index="6">
                                <i class="fa fa-download"></i>
                                <span class="router_link" slot="title" >Descargar</span>
                            </el-menu-item>
                            <el-menu-item  @click="deleteDocuments()" index="7">
                                <i class="fa fa-trash-o"></i>
                                <span class="router_link" slot="title" >Eliminar</span>
                            </el-menu-item>                            
                        </el-menu >
                    </div>                    
                </context-menu> 
        </el-row>

        <div style="background:#f9fafc; width: 100%; padding: 1em;">
            <router-view></router-view>
        </div>
        <b-modal cancel-variant="outline-primary" v-model="modalJerarquia" hide-footer size="lg" title="Lista de usuarios">
            <el-form label-width="100">
                <el-form-item class="tituloDocument" label="Jerarquia de usuarios">
                </el-form-item>
            </el-form>
            <div class="scrollbar" id="style-7">
                <div class="force-overflow">
                    <el-tree 
                    :data="data2"
                    show-checkbox node-key="id" 
                    >
                    </el-tree>
                </div>            
            </div>
            <footer class="modal-footer">
                <button type="button" class="btn btn-outline-primary" @click="modalJerarquia = false" >Cerrar</button>
                <button type="button" class="btn btn-outline-primary" @click="modalJerarquia = false" >Guardar</button>
            </footer>

        </b-modal>
        <!--Modal de enviar mensaje-->
      <b-modal cancel-variant="outline-primary" v-model="SendDocument" hide-footer size="lg" title="Enviar mensaje">
        <div>  
          <el-row >
            <el-col :span="24" >
              <div class="selectItems">
                <el-form :model="FormAgregar" class="dialogos">
                  <el-form-item label="Para: " >
                    <el-select                      
                      class="selectData"
                      v-model="selectDataEmails"
                      multiple
                      filterable
                      allow-create
                      @change="handleChangeEdit"
                      placeholder="Seleccione e-mails destinatarios">
                    <el-option
                      v-for="item in dataDocumentSelect.Data"
                      :key="item.intCodUsuario"
                      :label="item.strEmail"
                      :value="item.strEmail">
                  </el-option>
                </el-select>
                  </el-form-item>
                </el-form>
                 
              </div>               
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div class="Asunto">
                <el-form :model="FormAgregar" class="dialogos">
                  <el-form-item  label="Asunto: " >
                    <el-input 
                      class="paraview"
                      placeholder="Asunto"
                      v-model="FormAgregar.strAsunto"
                      :rules="{required: true, message: 'El campo no puede estar vacio', trigger: 'blur'}"
                      >
                    </el-input>
                  </el-form-item>
                </el-form> 
              </div>
            </el-col>
          </el-row>             

          <template>
            <div>
              <p style="color:#48576a;font-size: 14px;">Mensaje: </p>
              <trumbowyg v-model="FormAgregar.strMensaje"></trumbowyg>
            </div>
          </template>
        </div>
      <footer class="modal-footer">
        <button type="button" class="btn btn-outline-primary" plain @click="AgregarMsnEnviado(FormAgregar)" disabled>Enviar</button>
          <button type="button" class="btn btn-outline-success" plain @click="cancelData()">Cerrar</button>
        </footer>
      </b-modal>
        <!-- Visualizador Documento -->
        <!-- <b-modal cancel-variant="outline-primary" v-model="modalVisualizar" hide-footer size="lg" title="Visualizador de documento">
            
                <div class="force-overflowView1">
                    <el-col :span="24" >
                        <el-card >
                                <iframe :src="getPdfUrl()" class="pdf"></iframe>    
                                <div class="titulofooter">
                                    <span>Nombre del documento:  <strong>{{gridDataNewTitle.strTitle}}</strong></span>
                                </div>
                        </el-card>
                    </el-col>
                </div>
            <footer class="modal-footer">
                <button type="button" class="btn btn-outline-primary" @click="modalVisualizar = false" >Cerrar</button>
            </footer>
        </b-modal> -->
        <el-dialog class="viewpdf" :title="codfiletitle"
            :visible.sync="modalVisualizar" hide-footer 
            :close-on-click-modal="true">
            <iframe :src="getPdfUrl()" class="pdfviewer"></iframe>
        </el-dialog>
        <b-modal cancel-variant="outline-primary" v-model="modalHistorial" hide-footer size="lg" title="Historial del documento">
            <el-form label-width="100"> 
                <el-form-item class="tituloDocument" label="Titulo del documento: ">
                    <span> agregando solo interfaz de dominio</span>
                </el-form-item>
            </el-form>
                <div class="force-overflow">
                    <el-table                    
                        border
                        style="width: 100%"
                        :data="tableData2">
                        <el-table-column prop="strCodDocumento" sortable label="código" class="itemTabla"></el-table-column>
                        <el-table-column prop="descripcion" sortable label="descripcion" ></el-table-column>
                        <el-table-column prop="version" sortable label="version" ></el-table-column>
                        <el-table-column prop="autor" sortable label="autor" ></el-table-column>
                        <el-table-column prop="fecha" sortable label="fecha" ></el-table-column>
                    </el-table >
                </div>
            <footer class="modal-footer">
                <button type="button" class="btn btn-outline-primary" @click="modalHistorial = false" >Cerrar</button>
            </footer>
        </b-modal>        
        <!-- Modal Component -->
        <b-modal cancel-variant="outline-primary" v-model="modalShow" hide-footer size="lg" title="Comparador de documento" >
            <el-row >
                <el-col :span="11">
                    <div class="doc-antiguo">
                        <span>Documento antiguo</span>
                        <el-select class="select-antiguo" justify="right" v-model="value" filterable placeholder="Select">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                    </div>            
                </el-col>
                <el-col :span="11" :offset="2">
                    <div class="doc-nuevo">
                        <span>Documento Nuevo</span>
                        <el-select class="select-nuevo" v-model="value8" filterable placeholder="Select">
                            <el-option
                                v-for="item in options1"
                                :key="item.value8"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </div>            
                </el-col>
            </el-row>
            <div class="comparador">
                <el-button class="fa fa-file-code-o " type="primary">Comparar</el-button>
            </div>    
            <el-row class="big_panel">
                <el-col :span="11" >
                        <div class="force-overflowView2">
                            <el-card class="panelimport" :body-style="{ padding: '0px' }">
                                <div class="panel" >
                                </div>
                            </el-card>
                        </div>
                </el-col>
                <el-col :span="11" :offset="2">
                        <div class="force-overflowView2">
                            <el-card class="panelimport" :body-style="{ padding: '0px' }">
                                <div class="panel" >
                                </div>
                            </el-card>
                        </div>
                </el-col>
            </el-row>
            <footer class="modal-footer">
                <button type="button" class="btn btn-outline-primary" @click="modalShow = false" >Cerrar</button>
            </footer>
        </b-modal>
         <!-- Dialog para descargar pdf file-->    
        <el-dialog
        title="Descargando Documento"
        :visible.sync="Descargarfile"
        width="10%"
        :close-on-click-modal="true">
        <el-card>     
            <a>¿Desea descargar el documento: <strong>{{gridDataNewTitle.strTitle}}</strong>?</a> 
            <br> <br> 
            <el-button-group class="buttonfooter">
            <a :href="getPdfUrl()" download>          
                <el-button type="success" icon="fa fa-download"  @click="Descargarfile = false" >Descargar</el-button>
            </a>
            <el-button type="danger" icon="fa fa-close" @click="Descargarfile = false">Cancel</el-button>  
            </el-button-group>   
            <br>
        </el-card>        
        </el-dialog>

        <b-modal cancel-variant="outline-primary" v-model="VisualizarUsuario" hide-footer size="lg" title="Consulta de autor">
            <el-card>
              <el-row>
                <el-col :span="10">
                  <div class="search_Apellido">
                    <el-form :model="FormSearchUsu">
                      <el-form-item label="Código Usuario" :label-width="formLabelWidth" >
                        <el-input
                          placeholder="Código Usuario"
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
                 v-loading="loadingGet"
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
                      <el-button size="mini" type="success" icon="circle-check"
                        @click="GetRowData(scope.$index, scope.row)">Confirmar</el-button>
                    </template>
                  </el-table-column>
            </el-table>
            <el-pagination layout="prev, pager, next" :total="totalRegistros1" :page-size="RegistersForPage2" :current-page.sync="pagina" @current-change="cambioPaginaUsuario()">    
          </el-pagination>
        </b-modal>
          <!-- MODEL PARA GRAFICO ESTADISTICO PUBLICADO-->
      <b-modal cancel-variant="outline-primary" v-model="ViewHistorialPublish" hide-footer size="lg" title="Historial del documento">
        <template>
          <el-card>
            <p class="titleNew">Historial de creación</p>
            <h6>Titulo del documento: <strong>{{gridDataNewTitle.strTitle}}</strong></h6>
            <template>
              <el-table class="Detalle"
              :data="gridDataNewHist"
              style="width: 100%">
              <el-table-column prop="strCodDocumento"  label="Código"></el-table-column>
              <el-table-column prop="strUsuarioCrea"  label="Usuario Creado"></el-table-column>
              <el-table-column prop="dtmFechaCrea"  label="Fecha Creada" >
                <template scope="scope">
                  <span>{{ getDateString(scope.row.dtmFechaCrea) }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="strTipoDocDescripcion"  label="Tipo Documento"> </el-table-column>
              <el-table-column prop="strUniDescripcion"  label="Unidad"> </el-table-column>
            </el-table>
            </template>
            <br>
            <p class="titleNew">Historial de Aprobación</p>
            <template>
              <el-table class="Detalle"
              :data="gridDataPublishList"
              style="width: 100%">
              <el-table-column prop="Descripcion"  label="Elaborado"></el-table-column>
              <el-table-column prop="Nombre"  label="Nombre"></el-table-column>
              <el-table-column prop="Cargo"  label="Cargo" ></el-table-column>
              <el-table-column prop="Fecha"  label="Fecha"> </el-table-column>
            </el-table>
            </template>
          </el-card>
        </template>
        <footer>
          <el-button type="primary" icon="fa fa-close" @click="ViewHistorialPublish=false">Cerrar</el-button>
        </footer>
      </b-modal>
    </div> 
</template>
<script>
import DocAprobadoComponent from '@/components/docAprobado/docAprobado.component'
export default DocAprobadoComponent
</script>
<style>
.pdf{
    width: 100%;
    height: 460px;
}
.titleComponentResp{
    background-color: #D3DCE6;
    color: #1F2D3D;
    margin-top: 20px;
  }
  .el-table__body tr.current-row>td {
   background: #13CE66;
  }
  .titleComponentResp{
    background-color: #D3DCE6;
    color: #1F2D3D;
  }
  img{
    width: 100px;
    height: 51px;
}
.tabletaSearch {
    font-size: 12px;
}
.Detalle{
  font-size: 12px;
}
.imagens{
    width: 60%;
}
.trumbowyg-box, .trumbowyg-editor{
  height: 250px;
  min-height: 200px;
}
.button.close {
    padding: 02;
    /* background: transparent; */
    background: #c82333;
    /* border: 0; */
    border: 5px;
    border-color: #c82333;
    -webkit-appearance: none;
}
.modal-lg {
    max-width: 900px;
}
.titulofooter{
    text-align: center;
}
.el-card__body{
     text-align: center;
}
@media (min-width: 992px){
.modal-lg {
    max-width: 1000px;
}
}
.el-table__row{
    background-color: cornflowerblue;
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

