<template>
    <div id="docAprobado">
        <p class="titleComponent" align="center">
            B&uacute;squeda de Documentos Rechazados
        </p>
        <el-card class="box-card">
            <i class="fa fa-filter"></i>
            <span>Filtros de b&uacute;squeda</span>
            <el-input class="center" placeholder="Busqueda" v-model="BuscarRechazado.strQuery"></el-input>
            <el-button type="primary" icon="search" @click="searchRechazado(BuscarRechazado)">Buscar</el-button>
        </el-card>
        <br>

        <el-row :gutter="20">          
            <el-col :span="4" v-for="item in gridData.Data" :key="item.intCodDocumento" >
                <div class="card-mayor" @contextmenu.prevent="$refs.ctxMenu.open(get(item))">
                    <el-card :body-style="{ padding: '0px', margin:'0px' }">
                        <div class="imagen-box">
                            <img :src="getImageUrl(item.strTitle)" class="imagenes">
                        </div>
                        <div class= "doc" style="padding: 14px;" :id="item.codigo">
                            <span>{{item.strTitle+".pdf"}}</span></br>
                            <span>{{item.dtmFechaCrea}}</span>                        
                        </div>
                        <b-tooltip show :target="item.codigo" >{{item.strTitle+".pdf"}}</br>{{Textfecha0}}</b-tooltip>
                        <div class="boton-cambio">
                            <button type="text" class="button">
                                <img src="../../images/wordicono.png" alt="">
                            </button>
                        </div>
                    </el-card>
                </div>                 
            </el-col>
            <context-menu id="context-menu" ref="ctxMenu">
                    <div class=" principal">                    
                        <el-menu default-active="2" class="menus">
                            <el-menu-item @click="modalJerarquia = true" index="1">
                                <i class="fa fa-sitemap"></i>
                                <span class="router_link" slot="title" >Jerarquia</span>
                            </el-menu-item>
                            <!-- <el-menu-item @click="modalShow = true" index="2">  
                                <i class="fa fa-files-o"></i>
                                <span class="router_link" slot="title" >Comparar</span>
                            </el-menu-item> -->
                            <el-menu-item @click="modalVisualizar = true" index="3">
                                <i class="fa fa-eye"></i>
                                <span class="router_link" slot="title" >Visualizar</span>
                            </el-menu-item>
                            <el-menu-item @click="open3" index="4">
                                <i class="fa fa-share-alt"></i>
                                <span class="router_link" slot="title" >Compartir</span>
                            </el-menu-item>
                            <el-menu-item @click="modalHistorial = true" index="5">
                                <i class="fa fa-line-chart"></i>
                                <span class="router_link" slot="title" >Historial</span>
                            </el-menu-item>     
                            <el-menu-item @click="download" index="6">
                                <i class="fa fa-download"></i>
                                <span class="router_link" slot="title" >Descargar</span>
                            </el-menu-item>
                            <el-menu-item  @click="open2" index="7">
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
        <!-- Visualizador Documento -->
        <b-modal cancel-variant="outline-primary" v-model="modalVisualizar" hide-footer size="lg" title="Visualizador de Documento">
            <div class="scrollbar1" id="style-7">
                <div class="force-overflowView1">
                    <el-col :span="24" >
                        <el-card >
                            <iframe :src="getPdfUrl()" class="pdf">
                                <div>
                                    <span>Auditor-Cobit</span>
                                </div>
                            </iframe>
                        </el-card>
                    </el-col>
                </div>
            </div>
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
                    </el-table class="tableta">
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
                                <img src="../../images/VistaPdf.png" class="image">
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
                                <img src="../../images/VistaPdf.png" class="image">
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
    </div> 
</template>
<script>
    import DocRechazadoComponent from '@/components/docRechazado/docRechazado.component'
    export default DocRechazadoComponent
</script>
<style>
img{
  width: 100%;
}
</style>