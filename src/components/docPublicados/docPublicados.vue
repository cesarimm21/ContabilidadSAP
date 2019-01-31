<template>
    <div id="docAprobado">
        <p class="titleComponent" align="center">
            B&uacute;squeda de Documentos Publicados
        </p>
        <el-card class="box-card">
            <i class="fa fa-filter"></i>
            <span>Filtros de b&uacute;squeda</span>
            <el-input class="center" placeholder="Busqueda" v-model="BuscarNuevo.strQuery"></el-input>
            <el-button type="primary" icon="search" @click="searchNuevo(BuscarNuevo)">Buscar</el-button>

            <p class="titleComponentResp" align="left">Propiedades del Documento</p>
            <el-row>
            <el-col :span="6">
                <div class="search_Codigo">
                <el-form :model="SearchForm" >
                    <el-form-item label="Codigo" :label-width="formLabelWidth" >
                    <el-input
                        placeholder="Cod. Documento"
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
                    <el-form-item label="Tipo Documento" :label-width="formLabelWidth" >
                    <el-input
                        placeholder="Tipo Documento"
                        v-model="SearchForm.strTipoDocDescripcion">
                    </el-input>
                    </el-form-item>
                </el-form>
                </div>
            </el-col> 
            <el-col :span="6">
                <div class="search_Unidad">
                <el-form :model="SearchForm">
                    <el-form-item label="Unidad." :label-width="formLabelWidth" >
                    <el-input
                        placeholder="Unidad"
                        v-model="SearchForm.strUniDescripcion">
                    </el-input>
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
            <el-col :span="4" v-for="item in gridData.Data" :key="item.strCodDocumento">
                <div class="card-mayor" @contextmenu.prevent="$refs.ctxMenu.open(get(item))">
                    <el-card :body-style="{ padding: '0px', margin:'0px' }">
                        <div class="imagen-box">
                            <img :src="getImageUrl(item.strCodDocumento)" class="imagenes">
                        </div>
                        <div class= "doc" style="padding: 14px;" :id="item.strCodDocumento">
                            <span>{{item.strTitle+".pdf"}}</span><br>
                            <span>{{item.dtmFechaCrea}}</span>                        
                        </div>
                        <b-tooltip show :target="item.strCodDocumento" >{{item.strTitle+".pdf"}}<br>{{item.dtmFechaCrea}}</b-tooltip>
                        <div class="boton-cambio">
                            <button type="text" class="button">
                                <img src="../../images/iconopdf.png" alt="">
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
                            <!-- <el-menu-item @click="modalShow = true" index="2">  
                                <i class="fa fa-files-o"></i>
                                <span class="router_link" slot="title" >Comparar</span>
                            </el-menu-item> -->
                            <el-menu-item @click="modalVisualizar = true" index="3">
                                <i class="fa fa-eye"></i>
                                <span class="router_link" slot="title" >Visualizar</span>
                            </el-menu-item>
                            <el-menu-item @click="SendDocument=true" index="4">
                                <i class="fa fa-share-alt"></i>
                                <span class="router_link" slot="title" >Compartir</span>
                            </el-menu-item>
                            <el-menu-item @click="historialNew()" index="5">
                                <i class="fa fa-list-ul"></i>
                                <span class="router_link" slot="title" >Historial</span>
                            </el-menu-item>     
                            <el-menu-item @click="downloadDoc()" index="6">
                                <i class="fa fa-download"></i>
                                <span class="router_link" slot="title" >Descargar</span>
                            </el-menu-item>
                            <el-menu-item  @click="deleteDocumentsPublish()" index="7">
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
        <b-modal cancel-variant="outline-primary" v-model="modalJerarquia" hide-footer size="lg" title="Lista de Usuarios">
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
      <b-modal cancel-variant="outline-primary" v-model="SendDocument" hide-footer size="lg" title="Enviar Mensaje">
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
                      placeholder="Seleccione E-mails Destinatarios">
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
                      :rules="{required: true, message: 'domain can not be null', trigger: 'blur'}"
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
            <el-button-group>
                <el-button type="success" icon="fa fa-envelope" @click="AgregarMsnEnviado(FormAgregar)" disabled>Enviar</el-button>
                <el-button type="danger" icon="fa fa-close" @click="cancelData()">Cerrar</el-button>
            </el-button-group>
          </footer>
      </b-modal>
        <!-- Visualizador Documento -->
        <b-modal cancel-variant="outline-primary" v-model="modalVisualizar" hide-footer size="lg" title="Visualizador de Documento">
            <!-- <div class="scrollbar1" id="style-7"> -->
                <div class="force-overflowView1">
                    <el-col :span="24" >
                        <el-card >
                            <iframe :src="getPdfUrl()" class="pdf"></iframe>
                                <div class="titulofooter">
                                    <span>Título de documento: <strong>{{gridDataNewTitle.strTitle}}</strong></span>
                                </div>
                        </el-card>
                    </el-col>
                </div>
            <!-- </div> -->
            <footer class="modal-footer">
                <button type="button" class="btn btn-outline-primary" @click="modalVisualizar = false" >Cerrar</button>
            </footer>
        </b-modal>
            
        <b-modal cancel-variant="outline-primary" v-model="modalHistorial" hide-footer size="lg" title="Historial del Documento">
            <el-form label-width="100"> 
                <el-form-item class="tituloDocument" label="Titulo del documento: ">
                    <span> agregando solo interfaz de dominio</span>
                </el-form-item>
            </el-form>
            <div class="scrollbar" id="style-7">
                <div class="force-overflow">
                    <el-table                    
                        border
                        style="width: 100%"
                        :data="tableData2">
                        <el-table-column prop="codigo" sortable label="codigo" class="itemTabla"></el-table-column>
                        <el-table-column prop="descripcion" sortable label="descripcion" ></el-table-column>
                        <el-table-column prop="version" sortable label="version" ></el-table-column>
                        <el-table-column prop="autor" sortable label="autor" ></el-table-column>
                        <el-table-column prop="fecha" sortable label="fecha" ></el-table-column>
                    </el-table>
                </div>
            </div>
            <footer class="modal-footer">
                <button type="button" class="btn btn-outline-primary" @click="modalHistorial = false" >Cerrar</button>
            </footer>
        </b-modal>        
        <!-- Modal Component -->
        <b-modal cancel-variant="outline-primary" v-model="modalShow" hide-footer size="lg" title="Comparador de Documento" >
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
                <el-button class="fa fa-file-code-o " type="primary">COMPARAR</el-button>
            </div>    
            <el-row class="big_panel">
                <el-col :span="11" >
                    <div class="scrollbar2" id="style-7">
                        <div class="force-overflowView2">
                            <el-card class="panelimport" :body-style="{ padding: '0px' }">
                                <!-- <img src="../../images/VistaPdf.png" class="image"> -->
                                <div class="panel" >
                                </div>
                            </el-card>
                        </div>
                    </div>
                </el-col>
                <el-col :span="11" :offset="2">
                    <div class="scrollbar2" id="style-7">
                        <div class="force-overflowView2">
                            <el-card class="panelimport" :body-style="{ padding: '0px' }">
                                <!-- <img src="../../images/VistaPdf.png" class="image"> -->
                                <div class="panel" >
                                </div>
                            </el-card>
                        </div>
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
        width="10%">
        <el-card class="cardPublish">
            <br/>
            <br>        
            <a>¿Desea descargar el documento: <strong>{{gridDataNewTitle.strTitle}}</strong>?</a> 
            <br/>
            <br> 
            <el-button-group class="buttonfooter">
            <a :href="getPdfUrl()" download>          
                <el-button type="success" icon="fa fa-download"  @click="Descargarfile = false" >Descargar</el-button>
            </a>
            <el-button type="danger" icon="fa fa-close" @click="Descargarfile = false">Cancel</el-button>  
            </el-button-group>   
            <br/>
            <br> 
        </el-card>        
        </el-dialog>
        <!-- Modal para vizualizar Usuarios -->
        <b-modal cancel-variant="outline-primary" v-model="VisualizarUsuario" hide-footer size="lg" title="Consulta de Autor">
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
                  <el-button-group>
                      <el-button type="danger" icon="fa fa-eraser" @click="clearDataUsuario()">Limpiar</el-button>
                      <el-button type="primary" icon="search" @click="SearchUsuarios(FormSearchUsu)">Buscar</el-button>             
                  </el-button-group>
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
         <!-- MODEL PARA GRAFICO ESTADISTICO -->
      <b-modal cancel-variant="outline-primary" v-model="ViewHistorial" hide-footer size="lg" title="Historial del documento">
        <template>
          <el-card>
            <h5 class="titleNew">Detalle del documento publicado</h5>
            <h6>Titulo del Documento: <strong>{{gridDataNewTitle.strTitle}}</strong></h6>
            <template>
              <el-table class="Detalle"
              :data="gridDataNewHist"
              style="width: 100%">
              <el-table-column prop="strCodDocumento"  label="Codigo"></el-table-column>
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
          </el-card>
           <el-card>
            <h6>Detalle de Publicación</h6>
            <template>
              <el-table class="Detalle"
              :data="gridDataPubliHist"
              style="width: 100%">
              <el-table-column prop="strCodDocumento"  label="Codigo"></el-table-column>
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
          </el-card>
        </template>
        <footer>
          <el-button type="primary" icon="fa fa-close" @click="ViewHistorial=false">Cerrar</el-button>
        </footer>
      </b-modal>
    </div> 
</template>
<script>
import DocPublicadosComponent from '@/components/docPublicados/docPublicados.component'
export default DocPublicadosComponent
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
  width: 100%;
}
.tabletaSearch{
    font-size: 12px;
}
.Detalle{
  font-size: 12px;
}
.trumbowyg-box, .trumbowyg-editor{
  height: 250px;
  min-height: 200px;
}
.titulofooter{
    text-align: center;
}
.cardPublish{
    text-align: center;
}
</style>

