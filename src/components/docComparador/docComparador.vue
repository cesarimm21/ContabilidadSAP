<template>
  <div id="docComparador">
   <!-- v-loading="loadingGet"
      element-loading-text="Cargando..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"> -->
      <h2>Comparador de Documento</h2>
      <br>
      <el-card class="box-card">
          <i class="fa fa-filter"></i>
            <span>Filtros de b&uacute;squeda</span>
            <p class="titleComponentResp" align="left">Propiedades del documento</p>
      <el-row>
            <el-col :span="6">
                <div class="search_Codigo">
                <el-form :model="SearchForm" >
                    <el-form-item label="Código" :label-width="formLabelWidth" >
                    <el-input
                        placeholder="Cod. documento"
                        v-model="SearchForm.CodigoGenerado">
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
                <!-- <el-form :model="SearchForm">
                    <el-form-item label="Tipo documento" :label-width="formLabelWidth" >
                    <el-input
                        placeholder="Tipo documento"
                        v-model="SearchForm.strTipoDocDescripcion">
                    </el-input>
                    </el-form-item>
                </el-form> -->
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
                <div class="search_Unidad">
                <el-form :model="SearchForm">
                    <el-form-item label="Versión " label-width="120px" >
                        <el-input-number v-model="SearchForm.intVersion" controls-position="right" :min="1" :max="20"></el-input-number>
                    </el-form-item>
                </el-form>
                </div>
            </el-col> 
                <el-col :offset="12" :span="6">
                    <div class="butonSearch ">
                        <el-button-group>
                            <el-button type="primary" icon="search" @click="SeachDocument(SearchForm)">Buscar</el-button>
                        </el-button-group>                       
                    </div>
                </el-col>
            </el-row>
             <el-row class="second">
        <el-col :span="11">
            <div class="doc-antiguo">
                <!-- <span>Seleccione versiones anteriores</span> -->
                <el-form>
                <el-form-item label="Antiguos " label-width="120px" >
                <el-select v-model="SearchFormNext.CodDocumentoGenerado" 
                     @change="ChangeData"
                     filterable placeholder="Seleccione Documento">
                    <el-option
                        v-for="item in dataDocumentSelect.Data"
                        :key="item.CodDocumentoGenerado"
                        :label="item.strTitle"
                        :value="item.CodDocumentoGenerado"
                        >
                        <span style="float: left; color: #a68492; width:30%;">{{ item.CodDocumentoGenerado }}</span>
                        <span style="float: center;">{{ item.strTitle }}</span> 
                        <span style="float: right;width:5%;">{{ item.intVersion }}</span>
                    </el-option>
                </el-select>
                </el-form-item>
                </el-form>
            </div>            
            </el-col>
            <el-col :span="11" :offset="2">
                <div class="doc-nuevo">
                    <!-- <span>Seleccione versiones nuevas</span> -->
                    <el-form>
                <el-form-item label="Ultimos " label-width="120px" >
                    <el-select v-model="value1.intVersion" 
                    filterable placeholder="Seleccione Documento">
                        <el-option 
                            v-for="item in dataVersionCompare.Data"
                            :key="item.CodDocumentoGenerado"
                            :label="item.strTitle"
                            :value="item.intVersion">
                            <span style="float: left;color: #a68492;  width:30%; " >{{ item.CodDocumentoGenerado }}</span>
                            <span style="float: center;">{{ item.strTitle }}</span>   
                            <span style="float: right;width:5%;">{{ item.intVersion }}</span>
                        </el-option>
                    </el-select>
                </el-form-item>
                    </el-form>
                </div>            
        </el-col>
    </el-row>
    <!-- <div class="comparador">         -->
        <div class="comparador">
            <el-tooltip class="item" effect="dark" content="Compara documentos Aprobados" placement="bottom">
             <el-button class="fa fa-file-code-o " type="primary" @click.prevent="clearPageDate()" @click="ComparadorButton()">COMPARAR</el-button>
             </el-tooltip>
<!-- 
        <el-col :span="2" :offset="6">
            <el-tooltip class="item" effect="dark" content="Limpiar Datos" placement="bottom">
            <el-button class="fa fa-window-maximize" type="success" @click.prevent="big_panel" @click="clearPageDate()"></el-button>
            </el-tooltip>
        </el-col >     -->
    </div>
      </el-card>
      <el-dialog 
      v-loading="loadingGet"
      element-loading-text="Cargando..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
            class="viewpdf" 
            :visible.sync="modalVisualizar1" 
            hide-footer 
            hide-header>
            <!-- <iframe :src="getPdfUrl()" class="pdfviewer"></iframe> -->
          </el-dialog>
   <el-dialog 
      v-loading="loadingGet"
      element-loading-text="Cargando..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
            class="viewpdf" 
            :visible.sync="modalVisualizar" 
            :before-close="handleClose"
            hide-footer
            :close-on-click-modal="true">
            <el-row class="row1">
                <el-col :span="12"  class="span1">
                    <iframe :src="getPdfUrllast()" class="pdfView"></iframe>
                </el-col>
                <el-col :span="12" class="span1">
                    <iframe :src="getPdfUrlNew()" class="pdfView"></iframe>
                </el-col>
            </el-row>
            <!-- <iframe :src="getPdfUrl()" class="pdfviewer"></iframe> -->
          </el-dialog>
    <!-- <el-row class="big_panel">
    <el-col :span="11" >
        <p class="titleDoc">{{this.titleCompare1}}</p>
            <div class="force-overflowView2">
                 <el-card class="panelimport" :body-style="{ padding: '0px' }">
                    <iframe :src="this.textpdf0" class="pdf"></iframe>
                    <div class="panel" >
                    </div>
                 </el-card>
            </div>
         <p class="textbot">Texto Eliminados</p>
    </el-col>
    <el-col :span="11" :offset="2">
        <p class="titleDocument">{{this.titleCompare3}}</p>
            <div class="force-overflowView2">
                 <el-card class="panelimport" :body-style="{ padding: '0px' }">
                    <iframe :src="this.textpdf1" class="pdf"></iframe>
                    <div class="panel" >
                    </div>
                 </el-card>
            </div>
        <p class="textbot">Texto Agregado</p>
    </el-col>
    </el-row> -->
  </div>
</template>
<script>
import DocComparadorComponent from '@/components/docComparador/docComparador.component'
export default DocComparadorComponent
</script>
<style>
.textbot{
    margin-left: 20px;    
    color: #333232
}
.titleDoc{
    margin-left: 30px;
}
.titleDocument{
    margin-left: 30px;
}
#docComparador{
    height: 100%;
}
.big_panel .el-row{
    height: 80%;
}
.el-card__body {
    /* text-align: center; */
    margin-bottom: 0%;
}
.titleComponentResp {
    background-color: #D3DCE6;
    color: #1F2D3D;
}
.second
{
    margin-top: 1%;
}
.el-select {
    width: 100%;
    /* padding-left: 10px; */
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
.pdfView{
  width: 100%;
  height: 100% !important;
}
.row1{
    height: 100%;
}
.span1{
    height: 100%;
}
.viewpdf>.el-dialog--small>.el-dialog__body{
  padding: 0%;
  height: 100%;
}
</style>

