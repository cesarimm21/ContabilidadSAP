<template 
      >
  <div class="inicio"
  v-loading="loadingGet"
      element-loading-text="Aprobando..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)" >
    <!--Muestra los ultimos 5 documentos nuevos-->
    <el-card 
      >
      
      <h5>{{TextTitle}}</h5>
      <el-row :gutter="24" >
          
        <el-table  
         v-loading="loading2"
          element-loading-text="Cargando..."
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"     
        :data="gridData"             
        border
        style="width: 100%">
        <el-table-column prop="strTitle"  label="Titulo Doc."></el-table-column>
        <el-table-column prop="CodDocumentoGenerado"  label="Codigo Generado" ></el-table-column>
        <el-table-column prop="strUsuario"  label="Usuario Creado" ></el-table-column>
        <el-table-column prop="TipoDescripcion"  label="Tipo Aprobación" ></el-table-column>
        <el-table-column prop="dtmFechaCrea"  label="Fecha creada" >
          <template scope="scope">
            <span>{{ getDateString(scope.row.dtmFechaCrea) }}</span>
          </template>
        </el-table-column> 
        <el-table-column label="Visualizar" width="110">    
             <template scope="scope">
                    <el-button :plain="true" icon="fa fa-file-pdf-o" size="mini" type="button" class="btn btn-outline-success"
                       @click="OpenVisualizar(scope.$index, scope.row)">Ver</el-button>
                    </template>
        </el-table-column>   
        <el-table-column label="Operaciones">    
             <template scope="scope">
                    <el-button :plain="true" icon="fa fa-file-pdf-o" size="mini" type="button" class="btn btn-outline-success"
                       @click="GetRowData(scope.$index, scope.row)">Accion</el-button>
                    </template>
        </el-table-column>  

      </el-table>  
<el-pagination layout="prev, pager, next" :total="totalRegistros" :page-size="RegistersForPage" :current-page.sync="pagina" @current-change="cambioPagina()">    
          </el-pagination>

      </el-row>
    </el-card> 
     <!-- Opciones de aprobacion -->
      <b-modal cancel-variant="outline-primary" v-model="ViewOpcions" hide-footer size="lg" title="Acciones sobre el documento">
        <template>
          <el-card>
            <el-row class="headerclass">
              <el-col :span="10"><h6>Codigo: <strong>{{selecionado.CodTitulo}} </strong></h6></el-col>
              <el-col :span="14"><h6>Titulo del Documento: <strong>{{selecionado.titulo}}</strong></h6></el-col>
            </el-row>
            <el-input class="in-comentario" v-model="selecionado.comentario" placeholder="Escriba el comentario aqui" type="textarea"
  :rows="4"> </el-input>

            <el-button-group>
                <el-tooltip class="item" effect="dark" content="Aprobación del documento actual" placement="top">
                <el-button @click="Confirmacion('aprobar')" type="success" icon="fa fa-check-square">Aprobar</el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="Enviar notificación para su modificación" placement="top">
                <el-button @click="Confirmacion('modificar')" type="warning" icon="fa fa-pencil-square-o">Modificar</el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="Enviar notificación para su rechazar" placement="top">
                <el-button @click="Confirmacion('rechazar')" type="danger" icon="fa fa-pencil-square-o">Rechazar</el-button>
                </el-tooltip>
            </el-button-group>
          </el-card>
        </template>
      </b-modal>

      <!-- <b-modal cancel-variant="outline-primary" v-model="modalVisualizar" hide-footer size="lg" title="Visualizador de documento">
        <template>
              <el-col :span="24" >
                <el-card >
                  <iframe :src="getPdfUrl()" class="pdf"></iframe>
                  <div class="titulofooter">
                    <span>Título del documento: <strong>{{selecionado.titulo}}</strong></span>
                  </div>
                </el-card>
              </el-col>
        </template>
      </b-modal> -->

        <el-dialog class="viewpdf" :title="codfiletitle"
            :visible.sync="modalVisualizar" hide-footer hide-header>
            <iframe :src="getPdfUrl()" class="pdfviewer"></iframe>
          </el-dialog> 
  </div>

</template>

<script>
import AprobacionDocs from '@/components/aprobacionDocs/aprobacionDocs.component'
export default AprobacionDocs
</script>
<style>
.in-comentario{
  padding: 10px;
}
.titulofooter{
    text-align: center;
}
.headerclass{
  margin-left: 0%;
}
.inicio{
  height: 100%;
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
