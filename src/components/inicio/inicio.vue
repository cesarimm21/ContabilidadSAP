<template>
  <div class="inicio">
    <h1>{{ msg }}</h1>
    <!--Muestra los ultimos 5 documentos nuevos-->
    <el-card>
      <h5 class="titulodoc">Documentos nuevos</h5>
      <br>
      <el-row :gutter="24" >
        <el-col :span="4" v-for="item in gridDataNew.Data" :key="item.strCodDocumento">
          <div class="card-mayor" @contextmenu.prevent="$refs.ViewItemsNew.open(get(item))">
            <el-card :body-style="{ padding: '0px', margin:'0px' }">
              <div class="imagen-box" @dblclick="viewpdf(item.CodDocumentoGenerado,item.strTitle,1)">
                <img :src="getImageUrl(item.CodDocumentoGenerado)" class="imagenes">
              </div>                        
              <div class= "doc" style="padding: 14px;" :id="item.strCodDocumento">
                <span>{{item.strTitle+".pdf"}}</span><br>
                <span>{{item.dtmFechaCrea}}</span>                        
              </div>
              <b-tooltip show :target="item.strCodDocumento" >{{item.strTitle+".pdf"}}<br>{{item.dtmFechaCrea}}</b-tooltip>
              <div class="boton-cambio">
                <button type="text" class="button" >
                  <img class="imagens" src="../../images/iconopdf.png" alt="">
                </button>
              </div>
            </el-card>   
          </div>                
        </el-col>
        <!--Opciones sobre documentos-->
          <context-menu id="context-menu" ref="ViewItemsNew">
            <div class=" principal">                    
              <el-menu default-active="1" class="menus">
                <!-- <el-menu-item @click="modalVisualizar = true" index="2">
                  <i class="fa fa-eye"></i>
                    <span class="router_link" slot="title" >Visualizar</span>
                </el-menu-item> -->
                <!-- <el-menu-item @click="SendDocument=true" index="3">
                  <i class="fa fa-share-alt"></i>
                    <span class="router_link" slot="title" >Compartir</span>
                </el-menu-item>   -->
                <el-menu-item @click="historialNew()" index="4">
                  <i class="fa fa-list-ul"></i>
                    <span class="router_link" slot="title" >Historial</span>
                </el-menu-item> 
                <el-menu-item @click="downloadDoc" index="5">
                  <i class="fa fa-download"></i>
                    <span class="router_link" slot="title" >Descargar</span>
                </el-menu-item>
                <el-menu-item  @click="deleteDocumentsNew()" index="6">
                  <i class="fa fa-trash-o"></i>
                    <span class="router_link" slot="title" >Eliminar</span>
                </el-menu-item>                            
              </el-menu >
            </div>                    
          </context-menu>              
      </el-row>
    </el-card>
    <!--Muestra los ultimos 5 documentos publicados-->
    <el-card>
      <h5 class="titulodoc">Documentos aprobados</h5>
      <br>
      <el-row :gutter="24" >
        <el-col :span="4" v-for="item in gridDataPublish.Data" :key="item.strCodDocumento">
           <div class="card-mayor" @contextmenu.prevent="$refs.ViewItems.open(get(item))">
              <el-card :body-style="{ padding: '0px', margin:'0px' }">
                <div class="imagen-box" @dblclick="viewpdf(item.CodDocumentoGenerado,item.strTitle,2)">
                  <img :src="getImageUrl(item.CodDocumentoGenerado)" class="imagenes">
                </div>
                <div class= "doc" style="padding: 14px;" :id="item.strCodDocumento">
                  <span>{{item.strTitle+".pdf"}}</span><br>
                  <span>{{item.dtmFechaCrea}}</span>                        
                </div>
                <b-tooltip show :target="item.strCodDocumento" >{{item.strTitle+".pdf"}}<br>{{item.dtmFechaCrea}}</b-tooltip>
                  <div class="boton-cambio">
                    <button type="text" class="button">
                      <img class="imagens" src="../../images/iconopdf.png" alt="">
                    </button>
                  </div>
              </el-card>   
            </div>                 
          </el-col>
          <!--Opciones sobre documentos-->
          <context-menu id="context-menu" ref="ViewItems">
            <div class=" principal">                    
              <el-menu default-active="2" class="menus">
                <!-- <el-menu-item @click="modalJerarquia = true" index="1">
                  <i class="fa fa-sitemap"></i>
                    <span class="router_link" slot="title" >Jerarquia</span>
                </el-menu-item> -->
                <!-- <el-menu-item @click="modalVisualizarAprobado = true" index="3">
                  <i class="fa fa-eye"></i>
                    <span class="router_link" slot="title" >Visualizar</span>
                </el-menu-item> -->
                <!-- <el-menu-item @click="SendDocument=true" index="4">
                  <i class="fa fa-share-alt"></i>
                    <span class="router_link" slot="title" >Compartir</span>
                </el-menu-item> -->
                <el-menu-item @click="historialPublishAndNew()" index="5">
                  <i class="fa fa-list-ul"></i>
                    <span class="router_link" slot="title" >Historial</span>
                </el-menu-item>     
                <el-menu-item @click="downloadDocApro" index="6">
                  <i class="fa fa-download"></i>
                    <span class="router_link" slot="title" >Descargar</span>
                </el-menu-item>
                <el-menu-item  @click="deleteDocumentsPublish" index="7">
                  <i class="fa fa-trash-o"></i>
                    <span class="router_link" slot="title" >Eliminar</span>
                </el-menu-item>                            
              </el-menu >
            </div>                    
          </context-menu>                 
      </el-row>      
    </el-card>    

    <!-- Dialog para descargar pdf file-->    
    <el-dialog
      title="Descargando documento"
      :visible.sync="Descargarfile"
      width="10%"
      :close-on-click-modal="true">
      <el-card>
        <br>       
        <a>¿Desea descargar el documento: <strong> {{gridDataNewTitle.strTitle}} </strong>?</a> 
        <br/>
        <br>
        <el-button-group class="buttonfooter">
          <a :href="getPdfUrl()" download>          
            <el-button type="success" icon="fa fa-download"  @click="Descargarfile = false" >Descargar</el-button>
          </a>
        <el-button type="danger" icon="fa fa-close" @click="Descargarfile = false">Cancel</el-button>  
        </el-button-group>   
        <br>
      </el-card>
      
    </el-dialog>
    <!-- Dialog para descargar pdf file-->    
    <el-dialog
      title="Descargando documento"
      :visible.sync="DescargarfileAprobado"
      width="10%"
      :close-on-click-modal="true">
      <el-card>
        <br>       
        <a>¿Desea descargar el documento: <strong> {{gridDataNewTitle.strTitle}} </strong>?</a> 
        <br/>
        <br>
        <el-button-group class="buttonfooter">
          <a :href="getPdfUrlAprobado()" download>          
            <el-button type="success" icon="fa fa-download"  @click="DescargarfileAprobado = false" >Descargar</el-button>
          </a>
        <el-button type="danger" icon="fa fa-close" @click="DescargarfileAprobado = false">Cancel</el-button>  
        </el-button-group>   
        <br>
      </el-card>
      
    </el-dialog>
    <el-dialog class="viewpdf" :title="codfiletitle"
      :visible.sync="modalVisualizarPdf" hide-footer :close-on-click-modal="true">
      <iframe :src="getPdfview()" class="pdfviewer"></iframe>
    </el-dialog>

    <!-- Visualizador Documento -->
      <b-modal cancel-variant="outline-primary" v-model="modalVisualizar" hide-footer size="lg" title="Visualizador de Documento">
        <!-- <div class="scrollbar1" id="style-7"> -->
          <div class="force-overflowView1">
            <el-col :span="24" >
              <el-card >
                <iframe :src="getPdfUrl()" class="pdf"></iframe>
                <div>
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
      <!-- Visualizador Documento -->
      <b-modal cancel-variant="outline-primary" v-model="modalVisualizarAprobado" hide-footer size="lg" title="Visualizador de Documento Aprobado">
        <!-- <div class="scrollbar1" id="style-7"> -->
          <div class="force-overflowView1">
            <el-col :span="24" >
              <el-card >
                <iframe :src="getPdfUrlAprobado()" class="pdf"></iframe>
                <div>
                  <span>Título de documento: <strong>{{gridDataNewTitle.strTitle}}</strong></span>
                </div>
              </el-card>
            </el-col>
          </div>
        <!-- </div> -->
        <footer class="modal-footer">
          <button type="button" class="btn btn-outline-primary" @click="modalVisualizarAprobado = false" >Cerrar</button>
          
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
                      placeholder="Seleccione E-mails destinatarios">
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
          <el-button type="primary" icon="fa fa-expeditedssl"  @click="cancelData()">Cerrar</el-button>
        </el-button-group>
        </footer>
      </b-modal>

      <!-- MODEL PARA GRAFICO ESTADISTICO -->
      <b-modal cancel-variant="outline-primary" v-model="ViewHistorial" hide-footer size="lg" title="Historial del documento">
        <template>
          <el-card>
            <h5 class="titleNew">Detalle de creación</h5>
            <h6>Titulo del documento:<strong> {{gridDataNewTitle.strTitle}}</strong></h6>
            <template>
              <el-table class="Detalle"
              :data="gridDataNewHist"
              style="width: 100%">
              <el-table-column prop="strCodDocumento"  label="Codigo"></el-table-column>
              <el-table-column prop="strUsuarioCrea"  label="Usuario creado"></el-table-column>
              <el-table-column prop="dtmFechaCrea"  label="Fecha creada" >
                <template scope="scope">
                  <span>{{ getDateString(scope.row.dtmFechaCrea) }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="strTipoDocDescripcion"  label="Tipo documento"> </el-table-column>
              <el-table-column prop="strUniDescripcion"  label="Unidad"> </el-table-column>
            </el-table>
            </template>
          </el-card>
        </template>
        <footer>
          <el-button type="primary" icon="fa fa-close" @click="ViewHistorial=false">Cerrar</el-button>
          
        </footer>
      </b-modal>
        <!-- MODEL PARA GRAFICO ESTADISTICO PUBLICADO-->
      <b-modal cancel-variant="outline-primary" v-model="ViewHistorialPublish" hide-footer size="lg" title="Historial del documento">
        <template>
          <el-card>
            <h5 class="titleNew">Historial de creación</h5>
            <h6>Titulo del documento: <strong>{{gridDataNewTitle.strTitle}}</strong></h6>
            <template>
              <el-table class="Detalle"
              :data="gridDataNewHist"
              style="width: 100%">
              <el-table-column prop="strCodDocumento"  label="Codigo"></el-table-column>
              <el-table-column prop="strUsuarioCrea"  label="Usuario creado"></el-table-column>
              <el-table-column prop="dtmFechaCrea"  label="Fecha creada" >
                <template scope="scope">
                  <span>{{ getDateString(scope.row.dtmFechaCrea) }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="strTipoDocDescripcion"  label="Tipo documento"> </el-table-column>
              <el-table-column prop="strUniDescripcion"  label="Unidad"> </el-table-column>
            </el-table>
            </template>
            <br>
            <h5 class="titleNew">Historial de publicación</h5>
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
      </b-modal>
  </div>
</template>

<script>
import Inicio from '@/components/inicio/inicio.component'
export default Inicio
</script>
<style>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
/* li {
  display: inline-block;
  margin: 0 10px;
} */
a {
  color: #42b983;
}
.doc{
  font-size: 12px;
  font-style: normal;
}
img{
  width: 100%;
}
.imagens{
  width: 60%;
}
.menus span{
color: rgba(0,0,0,.54);
}
.textwork{
  width: 100%;
}
.trumbowyg-box, .trumbowyg-editor{
  height: 250px;
  min-height: 200px;
}
.selectData{
  width: 100%;
}
.Detalle{
  font-size: 12px;
}
.Detalle>.el-table__header{
  background-color: #42b983;
}
.el-table th>.cell{
  background-color: #21859d;
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
.el-card__body{
     text-align: center;
     margin-bottom: 3%;
}
@media (min-width: 990px){
.modal-lg {
    max-width: 1000px;
}
}
.el-table__row{
    background-color: cornflowerblue;
}
.titulodoc{
  text-align: left;
}
.el-menu-item {
    color: #0c3551;
    border-bottom: 1px solid #0c3500;
}
.el-dialog__title {
    color: white;
    font-size: 1.25rem;
    font-style: normal;
}
</style>
