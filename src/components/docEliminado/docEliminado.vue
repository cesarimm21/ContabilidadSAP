<template>
    <div id="docAprobado">
        <p class="titleComponent" align="center">
            B&uacute;squeda de Documentos Eliminados
        </p>
        <el-card class="box-card">
            <i class="fa fa-filter"></i>
            <span>Filtros de b&uacute;squeda</span>
            <el-input class="center" placeholder="Busqueda" v-model="BuscarEliminado.strQuery"></el-input>
            <el-button type="primary" icon="search" @click="searchEliminado(BuscarEliminado)">Buscar</el-button>

            
            <p class="titleComponentResp" align="left">Propiedades del Documento</p>
            <el-row>
            <el-col :span="6">
                <div class="search_Codigo">
                <el-form :model="SearchForm" >
                    <el-form-item label="Codigo" :label-width="formLabelWidth" >
                    <el-input
                        placeholder="Cod. Documento"
                        v-model="SearchForm.Codigo">
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
            <el-col :span="4" v-for="item in gridData.Data" :key="item.intCodDocumento" >
                <div class="card-mayor" @contextmenu.prevent="$refs.ctxMenu.open(get(item))">
                    <el-card :body-style="{ padding: '0px', margin:'0px' }">
                        <div class="imagen-box">
                            <img :src="getImageUrl(item.intCodDocumento)" class="imagenes">
                        </div>
                        <div class= "doc" style="padding: 14px;" :id="item.codigo">
                            <span>{{item.strTitle+".pdf"}}</span><br/>
                            <span>{{item.dtmFechaCrea}}</span>                        
                        </div>
                        <b-tooltip show :target="item.codigo" >{{item.strTitle+".pdf"}}</br>{{item.dtmFechaCrea}}</b-tooltip>
                        <div class="boton-cambio">
                            <button type="text" class="button">
                                <img class="imagens"  src="../../images/iconopdf.png" alt="">
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
                            <el-menu-item @click="modalVisualizar = true" index="3">
                                <i class="fa fa-eye"></i>
                                <span class="router_link" slot="title" >Visualizar</span>
                            </el-menu-item>
                            <!-- <el-menu-item @click="historialRemove" index="4">
                                <i class="fa fa-line-chart"></i>
                                <span class="router_link" slot="title" >Historial</span>
                            </el-menu-item>     
                            <el-menu-item @click="downloadDoc" index="5">
                                <i class="fa fa-download"></i>
                                <span class="router_link" slot="title" >Descargar</span>
                            </el-menu-item>                         -->
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
        <!-- Visualizador Documento -->
        <b-modal cancel-variant="outline-primary" v-model="modalVisualizar" hide-footer size="lg" title="Visualizador de Documento">
            <!-- <div class="scrollbar1" id="style-7"> -->
                <div class="force-overflowView1">
                    <el-col :span="24" >
                        <el-card >
                             <iframe :src="getPdfUrl()" class="pdf">
                                <div class="titulofooter">
                                    <span>Título del documento: <strong>{{gridDataNewTitle.strTitle}}</strong></span>
                                </div>
                            </iframe>
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
            <el-card>
                <br/><br>
                <a>¿Desea descargar el documento: {{gridDataNewTitle.strTitle}}?</a> 
                <br/><br> 
                <el-button-group class="buttonfooter">
                <a :href="getPdfUrl()" download>          
                    <el-button type="success" icon="fa fa-download"  @click="Descargarfile = false" >Descargar</el-button>
                </a>
                <el-button type="danger" icon="fa fa-close" @click="Descargarfile = false">Cancel</el-button>  
                </el-button-group>   
                <br/><br>
        </el-card>
        </el-dialog>
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
            <!-- MODEL PARA GRAFICO ESTADISTICO PUBLICADO-->
      <b-modal cancel-variant="outline-primary" v-model="ViewHistorialRemove" hide-footer size="lg" title="Historial del documento">
        <template>
          <el-card>
            <p class="titleNew">Historial de Creación</p>
            <h6>Titulo del Documento: {{gridDataNewTitle.strTitle}}</h6>
            <template>
              <el-table class="Detalle"
              :data="gridDataNewHist"
              style="width: 100%">
              <el-table-column prop="Codigo"  label="Codigo"></el-table-column>
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
            </br>
            <p class="titleNew">Historial de Eliminación</p>
            <template>
              <el-table class="Detalle"
              :data="gridDataNewHist"
              style="width: 100%">
              <el-table-column prop="Codigo"  label="Codigo"></el-table-column>
              <el-table-column prop="strUsuarioModif"  label="Usuario Eliminado"></el-table-column>
              <el-table-column prop="dtmFechaModif"  label="Fecha Eliminada" >
                <template scope="scope">
                  <span>{{ getDateString(scope.row.dtmFechaModif) }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="strTipoDocDescripcion"  label="Tipo Documento"> </el-table-column>
              <el-table-column prop="strUniDescripcion"  label="Unidad"> </el-table-column>
            </el-table>
            </template>
            </br>
            <p class="titleNew">Historial de Publicación</p>
            <template>
              <el-table class="Detalle"
              :data="gridDataRemoveList"
              style="width: 100%">
              <el-table-column prop="Codigo"  label="Codigo"></el-table-column>
              <el-table-column prop="strUsuarioCrea"  label="Usuario Publicado"></el-table-column>
              <el-table-column prop="dtmFechaCrea"  label="Fecha Publicado" >
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
          <el-button type="primary" icon="fa fa-close" @click="ViewHistorialRemove=false">Cerrar</el-button>
        </footer>
      </b-modal>
    </div> 
</template>
<script>
import DocEliminadoComponent from '@/components/docEliminado/docEliminado.component'
export default DocEliminadoComponent
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
 .imagens{
    width: 60%;
}
.titulofooter{
    text-align: center;
}
</style>

