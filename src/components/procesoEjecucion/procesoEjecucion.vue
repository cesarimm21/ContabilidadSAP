<template>
    <div id="procesoEjecucion">
        <p class="titleComponent" align="center">
            {{TitleEjecucion}}
        </p>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <i class="fa fa-filter"></i>
                <span>Filtros de b&uacute;squeda</span>
            </div>
            <el-row>
                <el-col :span="6">
                    <div class="search_Code">
                    <el-form :model="ProcesoEjecModel" class="registro">
                        <el-form-item label="Código registro: " class="labels" :label-width="formLabelWidth" >
                        <el-input
                            placeholder="Código registro"
                            v-model="ProcesoEjecModel.CodRegistro">
                        </el-input>
                        </el-form-item>
                    </el-form>
                    </div>
                </el-col>
               <el-col :span="6" :offset="1">
                <div class="search_proceso">
                <el-form :model="ProcesoEjecModel" class="registro">
                    <el-form-item label="Tipo: " class="labels" :label-width="formLabelWidth">
                    <el-select 
                    v-model="ProcesoEjecModel.Tipo" 
                    filterable 
                    @change="onChange($event)"
                    placeholder="Seleccione Tipo">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    </el-form-item>
                </el-form>
                </div>
            </el-col>
            <el-col :span="6" :offset="1">
                <div class="search_proceso">
                <el-form :model="ProcesoEjecModel" class="proceso">
                    <el-form-item label="Proceso: " class="labels" :label-width="formLabelWidth">
                    <el-select v-model="ProcesoEjecModel.Proceso" 
                     @change="onChange($event)"
                    filterable placeholder="Seleccione Proceso">
                        <el-option
                        v-for="item in procesoItem"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    </el-form-item>
                </el-form>
                </div>
            </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <div class="search_estado">
                    <el-form :model="ProcesoEjecModel" class="estado">
                        <el-form-item label="Estado: " class="labels" :label-width="formLabelWidth">
                        <el-select v-model="ProcesoEjecModel.Estado"
                         filterable 
                          @change="onChange($event)"
                         placeholder="Seleccione Estado">
                            <el-option
                            v-for="item in procesoEstado"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                        </el-form-item>
                    </el-form>
                    </div>
                </el-col>
                <!-- <el-col :span="8">
                <div class="search_desdeDate">
                <el-form >
                    <el-form-item label="fecha:" class="labels" >
                    <el-date-picker
                        class="fecha"
                        :label-width="formLabelWidth"
                        v-model="ProcesoEjecModel.Fecha"
                        type="date"
                        format="dd/MM/yyyy"
                        placeholder="Seleccione dia">
                    </el-date-picker>
                    </el-form-item>
                </el-form>
                </div>
            </el-col>  -->
            <el-col :span="6" :offset="10">
                <el-button type="primary" icon="search"   @click="SearchData(ProcesoEjecModel)">Buscar</el-button>
            </el-col>    
            </el-row>
        </el-card>
        <el-table
            v-loading="loading"
            element-loading-text="Cargando..."
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
            :data="gridData.Data"
            border
            style="width: 100%">
            <el-table-column prop="CodProceso" sortable label="Código"></el-table-column>
            <el-table-column prop="CodRegistro" sortable label="Registro" ></el-table-column>
            <el-table-column prop="Tipo" sortable label="Tipo" ></el-table-column>
            <el-table-column prop="Proceso" sortable label="Proceso" ></el-table-column>
            <el-table-column prop="Estado" sortable label="Estado" ></el-table-column>
            <el-table-column prop="Fecha" sortable label="Fecha" >
                <template scope="scope">
                  <span>{{ getDateString(scope.row.Fecha) }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Operaciones" width="200">
                <template scope="scope">
                <el-button  type="success" size="mini"  icon="fa fa-spinner"
                    @click="handleEdit(scope.$index, scope.row)" :disabled="clickable(scope.row)">Re-procesar</el-button>
                </template>
            </el-table-column>
            </el-table >
        <el-pagination layout="prev, pager, next" :total="totalRegistros" :page-size="RegistersForPage" :current-page.sync="paginaNumero" @current-change="handleCurrentChange">
            </el-pagination>
    </div>
</template>
<script>
import ProcesoEjecucion from '@/components/procesoEjecucion/procesoEjecucion.component'
export default ProcesoEjecucion
</script>
<style>
.labels .el-form-item__label{
    width: 120px;
}
.labels .el-select {
    padding-left: 0px;
    width: 60%;
}
.labels div.el-form-item__content{
    /* width: 0%; */
    padding-left: 0px;
}
</style>