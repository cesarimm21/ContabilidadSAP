<template>
<div class="versiones">
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
            <el-form-item label="Código documento" :label-width="formLabelWidth" >
              <el-input
                placeholder="Código"
                 v-model="FormSearch.CodDocumento">
               </el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
      
      <el-col :span="6">
        <div class="search_Usuario">
          <el-form :model="FormSearch">
            <el-form-item label="Tituto: " :label-width="formLabelWidth" >
              <el-input
                placeholder="Usuario"
                v-model="FormSearch.strTitle">
               </el-input>
             </el-form-item>
           </el-form>
         </div>
      </el-col>  
      <el-col :span="6">
        <div class="estado">
          <el-form :model="FormSearch">
          <el-form-item label="Posicion de: " :label-width="formLabelWidth" >
            <el-select class="selectOptios" v-model="FormSearch.EstadoAprobacion" filterable placeholder="Seleccione ">
              <el-option
                v-for="item in EstadoDoc"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          </el-form>
        </div>
      </el-col>   
      <el-col :span="6">
        <div class="search_desde">
          <el-form >
            <el-form-item label="Fecha creación" :label-width="formLabelWidth" >
              <el-date-picker
                class="dialogos"
                :label-width="formLabelWidth"
                v-model="FormSearch.dtmFechaCrea"
                type="date"
                format="dd/MM/yyyy"
                placeholder="Seleccione día">
             </el-date-picker>
            </el-form-item>
          </el-form>
        </div>
      </el-col>   
    </el-row>
    <el-row>
      <div class="search" align="center">
         <el-button-group>
            <el-button type="danger" icon="search" @click="clearDataSearch()">Limpiar</el-button>
            <el-button type="primary" icon="search" @click="SearchEstadoDocumento(FormSearch)">Buscar</el-button>
         </el-button-group>
      </div>
    </el-row>
    </el-card>
    
      <br>
     <el-table       
     v-loading="loadingGet"
      element-loading-text="Cargando..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)" 
        :data="gridData"             
        border
        style="width: 100%"
        :row-class-name = "tableRowClassName">
        <el-table-column prop="CodDocumento"  label="Código documento" ></el-table-column>
        <el-table-column prop="strTitle"  label="Título documento" ></el-table-column>
        <el-table-column prop="FechaCrea"  label="Fecha de creación" width="150" >
          <template scope="scope">
            <span>{{ getDateString(scope.row.FechaCrea) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="DesProceso"  label="Proceso"  ></el-table-column>
        <!-- <el-table-column prop="CodProceso"  label="Codigo Proceso" ></el-table-column> -->
        <el-table-column prop="EstadoAprobacion"  label="Estado" width="150">
          <template scope="scope">
            <span>{{ getEstadoString(scope.row.EstadoAprobacion) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="FechaAprobacion"  label="Fecha aprobación" >
          <template scope="scope">
            <span>{{ getDateString(scope.row.FechaAprobacion) }}</span>
          </template>
        </el-table-column>
      </el-table>   
        <el-pagination layout="prev, pager, next" :total="totalRegistros" :page-size="RegistersForPage" :current-page.sync="paginaNumero" @current-change="cambioPagina()">
      </el-pagination>
       
        
               
        </div>

 </template>

<script>
import Seguimiento from '@/components/seguimiento/seguimiento.component'
export default Seguimiento
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
.el-table .rechazado-row {
  background: rgb(206, 85, 85);
}
.el-table .aprobado-row {
  background: #9dd68af0;
}
.el-table .modificado-row {
  background: #ddee45e5;
}



</style>

