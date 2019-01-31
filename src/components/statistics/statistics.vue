<template>
  <div id="statistics">
      <p class="title" align="center">
          Configuración de Estadisticas
      </p>
      <el-card>
          <el-row>
            <el-col :span="12">
                <template>
                    <vue-chart 
                    type="bar"      
                    :data="chartData"
                    ></vue-chart>
                </template>
            </el-col>
            <el-col :span="12">
            </el-col>
          </el-row>
      </el-card>
      <el-card class="card2">
          <p  class="title" align="center">Movimiento por mes</p>
          <el-row>
              <el-col :span="12">
                  <div class="">
                    <span class="timeyear">Seleccione el Año</span>
                    <el-date-picker
                        v-model="FormImput.YEAR"
                        type="year"
                        placeholder="Seleccione año"
                        @change="buttonChange">
                    </el-date-picker>
                    </div>                    
              </el-col>
              <div>
                  <b-button class="btn btn-outline-primary" :disabled="butondisable" icon="fa fa-line-chart" @click="documentsCountsGraphic(FormImput)">Ver Movimiento</b-button>
              </div>
            
            </el-row>   
            <b-modal cancel-variant="outline-primary" v-model="ViewStadistic" hide-footer size="lg" title="Estadisticas de documentos">
                <template>
                <vue-chart 
                type="bar"     
                :data="datacollection"
                ></vue-chart>
                </template>
                <div>
                    <b-button class="btn btn-outline-primary" plain
                    @click="clearData()">Cerrar</b-button>
                </div>
            </b-modal> 
                
      </el-card>
      <el-card>
          <p class="titleComponentResp" align="left">Persona Responsable</p>
            <el-row>
            <el-col :span="6">
                <div class="search_Codigo">
                <el-form :model="FormSearch" >
                    <el-form-item label="Codigo" :label-width="formLabelWidth" >
                    <el-input
                        placeholder="Cod. Usuario"
                        v-model="FormSearch.intCodUsuario">
                    </el-input>
                    </el-form-item>
                </el-form>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="search_Nombre">
                <el-form :model="FormSearch">
                    <el-form-item label="Nombres" :label-width="formLabelWidth" >
                    <el-input
                        placeholder="Nombres"
                        v-model="FormSearch.Nombres">
                    </el-input>
                    </el-form-item>
                </el-form>
                </div>
            </el-col>   
            <el-col :span="6">
                <div class="search_Usuario">
                <el-form :model="FormSearch">
                    <el-form-item label="Usuario" :label-width="formLabelWidth" >
                    <el-input
                        placeholder="Usuario"
                        v-model="FormSearch.strUsuario">
                    </el-input>
                    </el-form-item>
                </el-form>
                </div>
            </el-col> 
            <el-col :span="6" >
                <el-button class="userbot" type="primary" icon="search" @click="modalVisualizar = true"></el-button>
            </el-col>
            </el-row> 
            <el-col :span="6" :offset="2">
                <div class="">
                    <span class="timeyear1">Desde</span>
                    <el-date-picker
                        v-model="FormImputDATES.dtmInic"
                        type="date"
                        placeholder="fecha desde">
                    </el-date-picker>
                </div>                    
            </el-col> 
            <el-col :span="6">
                <div class="">
                    <span class="timeyear2">Asta</span>
                    <el-date-picker
                        v-model="FormImputDATES.dtmFin"
                        type="date"
                        placeholder="fecha asta">
                    </el-date-picker>
                </div>                    
            </el-col>          
            <div class="search">
                <el-button-group>
                    <el-button type="danger" icon="fa fa-eraser" @click="clearDataUser()" >Limpiar</el-button>
                    <el-button type="primary" icon="fa fa-line-chart" @click="DocumentsByUser(FormSearch)" >Ver Grafica</el-button>
                </el-button-group>                
            </div>
        <!-- vista de grafica por usuario -->
        <b-modal cancel-variant="outline-primary" v-model="ViewStadisticGrafic" hide-footer size="lg" title="Estadisticas de documentos">
            <template>
                <vue-chart 
                type="bar"     
                :data="dataGrafic"
                ></vue-chart>
            </template>
            <div>
                <b-button class="btn btn-outline-primary" plain
                @click="clearDataUser()">Cerrar</b-button>
            </div>
        </b-modal> 
        <!-- vista de tabla de usuarios -->
        <b-modal cancel-variant="outline-primary" v-model="modalVisualizar" hide-footer size="lg" title="Consulta de Autor">
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
                          v-model="FormSearchUsu.ApellidoPaterno">
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
                    <el-button type="danger" icon="fa fa-eraser" @click="clearDataUsuario()" >Limpiar</el-button>
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
                  <el-table-column prop="Nombres"  label="Nombres" ></el-table-column>
                  <el-table-column prop="ApellidoPaterno"  label="Ap. Paterno" ></el-table-column>
                  <el-table-column prop="ApellidoMaterno"  label="Ap. Materno" ></el-table-column>
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
      </el-card>
  </div>
</template>
<script>
import StatisticsComponent from '@/components/statistics/statistics.component'
export default StatisticsComponent
</script>
<<style>
.buton{
    display:inline-block;
}
.first_buton{
    margin-bottom:10px;
}
.title{
  background-color: #21859d;
  color: white;
  border-radius: 4px;
  margin-top: 5px;
  padding-bottom: 5px;
  padding-top: 5px;
  padding-left: 5px;
      width: 94%;  
}
.card2{
    background-color: #DCDFE6;
}
.tabletaSearch {
    font-size:12px;
}
</style>

