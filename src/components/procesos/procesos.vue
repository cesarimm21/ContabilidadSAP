<template>
    <div>
        <p class="tituloaproba" >
            Tipo aprobación de documentos
        </p>
        <el-card class="firts">
        <el-row >
            <el-col :span="13">
            <div class="TipoApro">
                <span>Tipo aprobación</span>
                <el-select v-model="CodTipoAprobacion"
                    @change="ChangeData"
                     filterable placeholder="Seleccione tipo aprobación">
                    <el-option
                        v-for="item in gridData.Data"
                        :key="item.CodTipoAprobacion"
                        :label="item.TipoDescripcion"
                        :value="item.CodTipoAprobacion">
                    </el-option>
                </el-select>
            </div>           
            </el-col>
            <el-col :span="8">                
            <el-button type="primary" icon="fa fa-plus" @click="handleAgregar()" >Nuevo proceso</el-button> 
            </el-col>
        </el-row>
        </el-card>
        <el-card class="tableproceso" v-show="viewCard">
        <el-table class="tabletaProceso"
                v-loading="loadingTable2"
            element-loading-text="Cargando..."
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
                  v-model="defaultSelectAdd"
                  :data="gridDataProceso.Data" 
                  highlight-current-row                        
                  border
                  style="width: 100%">
                  <el-table-column prop="CodProceso"  label="Cod. Proceso" class="itemTabla"></el-table-column>
                  <el-table-column prop="CodTipoAprobacion"  label="Tipo aprobación" ></el-table-column>
                  <el-table-column prop="Descripcion"  label="Descripcion" width="250px"></el-table-column>
                  <el-table-column prop="Nivel"  label="Nivel"  width="150px"></el-table-column>
                  <el-table-column label="Confirmar" >
                    <template scope="scope">
                        <!-- <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">Editar</el-button>  -->
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)" icon="fa fa-trash-o" >Eliminar</el-button>
                    </template>
                  </el-table-column>
            </el-table>
        </el-card>
        <el-row>
            <el-col :offset="8">   
                <el-button-group> 
                    <el-button v-show="showButtonCol" type="success" icon="fa fa-plus" @click="handleAgregarColado()" >Agregar colado</el-button> 
                    <el-button v-show="showButtonPro" type="danger" icon="fa fa-trash-o" @click="handleDeleteTipoAprobacion(deleteTipApro)">Eliminar proceso</el-button>
                </el-button-group>
            </el-col>
        </el-row>
 <el-dialog  title="Agregar proceso" v-model="modalProceso">
      <el-form :model="addProceso" class="dialogos">

        <el-col :span="24">
          <el-form-item label="Descripcion: " prop="Descripcion" :label-width="formLabelWidth" :rules="[
            { required: true, message: 'Ingrese descripcion',trigger: 'blur,change'} ]">
          <el-input class="firtsInput" placeholder="Descripcion" v-model="addProceso.Descripcion" auto-complete="off">
          </el-input>
        </el-form-item>
        </el-col>
       
      </el-form>
      <el-card class="dialogCard">
           <el-table   class="tabletaProceso"
                v-loading="loadingTable1"
                element-loading-text="Cargando..."
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                  :data="gridPlantilla.Data" 
                  highlight-current-row  
                  v-model="defaultSelectAdd"
                  ref="multipleTable"
                  @selection-change="handlePlantilla"                      
                  border
                  style="width: 100%">
                  <el-table-column type="selection" width="70"></el-table-column>
                  <el-table-column prop="CodPlantillaAprobacion" label="Codigo" width="150"></el-table-column>
                  <el-table-column prop="Tipo"  label="Tipo" width="100"></el-table-column>
                  <el-table-column prop="Descripcion"  label="Descripcion" ></el-table-column>
            </el-table>
       </el-card>
      <footer class="modal-footer">
               <el-button-group>
                    <el-button type="primary" icon="fa fa-window-close-o" @click="CancelProceso()">Cerrar</el-button>
                    <el-button type="success" icon="fa fa-check" @click="AgregarProceso()" >Agregar</el-button>
                </el-button-group>
            </footer>
    </el-dialog>

    <el-dialog  title="Agregar colado" v-model="modalColado">
      <el-form :model="addColado" class="dialogos">
        
        <el-col :span="12">
            <el-form-item label="Proceso: " :label-width="LabelWidth" >
          <el-select class="selectOptios" v-model="addColado.CodProceso" filterable placeholder="Seleccione ">
            <el-option
              v-for="item in gridDataProceso.Data"
              :key="item.CodProceso"
              :label="item.Descripcion"
              :value="item.CodProceso">
            </el-option>
          </el-select>
        </el-form-item>
        
        <el-col :span="21">
          <el-form-item label="Descripcion: " :label-width="LabelWidth" >
          <el-input class="firtsInput" placeholder="Descripcion" v-model="jerarquiaForm.Descripcion" auto-complete="off">
          </el-input>
        </el-form-item>
        </el-col>
        <el-col :span="2" >
            <el-button class="userbot" type="primary" icon="search" @click="searchJerarquia()"></el-button>
        </el-col>
        </el-col>
        <el-col :span="12">
        <el-form-item label="Posicion de: " :label-width="LabelWidth" >
          <el-select class="selectOptios" v-model="addColado.TipoOpcion" filterable placeholder="Seleccione ">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Plantilla: " :label-width="LabelWidth" >
          <el-select class="selectOptios" v-model="jerarquiaForm.Tipo"
          @change="ChangeDataJerarquia"
           filterable placeholder="Seleccione ">
            <el-option
              v-for="item in gridPlantilla.Data"
              :key="item.Tipo"
              :label="item.Descripcion"
              :value="item.Tipo">
            </el-option>
          </el-select>
        </el-form-item>
        </el-col>
       <el-card class="dialogCard">
           <el-table   class="tabletaProceso"
                v-loading="loadingTable"
                element-loading-text="Cargando..."
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                  :data="gridJerarquia" 
                  highlight-current-row  
                  @selection-change="handleSelectionChange"                      
                  border
                  style="width: 100%">
                  <el-table-column type="selection" width="70"></el-table-column>
                  <el-table-column prop="Tipo"  label="Tipo" width="100"></el-table-column>
                  <el-table-column prop="CodPosicion"  label="Cod. Posicion" width="130" ></el-table-column>
                  <el-table-column prop="Descripcion"  label="Descripcion"></el-table-column>
            </el-table>
            <el-pagination layout="prev, pager, next" :total="totalRegistros" :page-size="RegistersForPage" :current-page.sync="paginaNumero" @current-change="cambioPagina()">
            </el-pagination>
       </el-card>
      </el-form>
      <footer class="modal-footer">
               <el-button-group>
                    <el-button type="primary" icon="fa fa-window-close-o" @click="CancelColado()">Cerrar</el-button>
                    <el-button type="success" icon="fa fa-check" @click="AgregarColado(addColado)">Agregar</el-button>
                </el-button-group>
            </footer>
    </el-dialog>
    </div>    
</template>
<script>
import Procesos from '@/components/procesos/procesos.component'
export default Procesos
</script>
<style>
/* .el-select {
    width: 75%;
    padding-left: 10px;
} */
.select{
    width: 100%;
}
.tituloaproba{
    background-color: #21859d;
  border-radius: 4px;
  color: white;
  margin-top: 5px;
  padding-bottom: 5px;
  padding-top: 5px;
  padding-left: 5px;
      width: 94%;
}
.firts{
    padding-bottom: 25px;
}
.firts .el-select{
    width: 75%;
}
.tableproceso{
    padding-bottom: 25px;
    background-color: #DCDFE6;
}

.tabletaProceso tr{
    background-color: #94c0dd;
}
.tabletaProceso th.is-leaf {
    border-bottom: 1px solid #748492;
}
.tabletaProceso th>.cell {
    background-color: #909399;
    color: white;
}
.firtsInput{
    margin-left: 10px;
    width: 98%;
}
.selectOptios{
    width: 100%;
}
</style>
