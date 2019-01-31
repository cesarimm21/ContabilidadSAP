<template>
  <div id="roles">
    <p align="center" class="titleComponent">
      Configuraci&oacute;n Roles
    </p>
    <el-row>
      <el-col :span="6">
        <div class="search_Code">
          <el-form :model="FormSearch" class="dialogos">
            <el-form-item label="Descripcion rol:" :label-width="formLabelWidth" >
              <el-input
                placeholder="Descripcion"
                v-model="FormSearch.strRolDescripcion">
               </el-input>
             </el-form-item>
           </el-form>
         </div>
      </el-col>
      <el-col :span="6">
        <div class="search_Descripcion">
          <el-form :model="FormSearch" class="dialogos">
            <el-form-item label="Usuario Creado:" :label-width="formLabelWidth" >
              <el-input
                placeholder="Usuario"
                v-model="FormSearch.strUsuarioCrea">
               </el-input>
             </el-form-item>
           </el-form>
         </div>
      </el-col> 
      
    </el-row>
    <el-row>
      <div class="search" align="center">
        <el-button-group>
        <el-button type="danger" icon="search" @click="LimpiarRol()">Limpiar</el-button>
        <el-button type="primary" icon="search" @click="ConsultarRol(FormSearch)">Buscar</el-button>
        </el-button-group>
      </div>
    </el-row>
    <el-button class="" type="success" @click="handleAgregar()"><i class="fa fa-plus"></i> Agregar Rol</el-button>
    <br><br>
    <el-table
      v-loading="loadingGet"
      element-loading-text="Cargando..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :data="gridData"
      border
      style="width: 100%">
      <el-table-column prop="intCodRol" label="Codigo" width="130"></el-table-column>
      <el-table-column prop="strRolDescripcion" label="Descripcion"></el-table-column>
      <el-table-column prop="strUsuarioCrea" label="Usua. Creado"></el-table-column>
      <el-table-column prop="dtmFechaCrea" label="Fecha Creada" type="data-target">
        <template scope="scope">
            <span>{{ getDateString(scope.row.dtmFechaCrea) }}</span>
          </template>
      </el-table-column>
      <el-table-column label="Operaciones" with="200">
        <template scope="scope">
          <el-button :plain="true" icon="edit" size="small" type="info"
            @click="handleEdit(scope.$index, scope.row)">Editar</el-button>
          <el-button :plain="true" icon="delete" size="small" type="danger"
            @click="handleDelete(scope.$index, scope.row)">Eliminar</el-button>
        </template>
      </el-table-column>
    </el-table>
   <el-pagination layout="prev, pager, next" :total="totalRegistros" :page-size="RegistersForPage" :current-page.sync="paginaNumero" @current-change="cambioPagina()">
    </el-pagination>

    <!--AGREGAR ROL-->
    <el-dialog  title="Agregar Rol" size="small" :visible.sync="dialogAgregarVisible">
      <el-form  :model="FormAgregar" ref="FormAgregar" class="demo-ruleForm">
        <el-form-item label="Descripcion" prop="strRolDescripcion" :label-width="formLabelWidth" :rules="[
            { required: true, message: 'Ingrese Descripcion',trigger: 'blur,change'} ]">
          <el-input placeholder="Descripcion" v-model="FormAgregar.strRolDescripcion" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Accesos" prop="lstAccesos" center-block :label-width="formLabelWidth" >
          <el-transfer
            v-model="defaultSelectAdd"
            :titles="tituloAccesos"
            :footer-format = "{ noChecked: '${total} accesos', hasChecked: '${checked}/${total} seleccionados' }"
            :props="{
              key: 'intCodAcceso',
              label: 'strNombre'
            }"
            @change="handleChange"
            :data="listaAccesos.Data">
          </el-transfer>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="CancelRol()">Cancelar</el-button>
        <el-button type="primary" @click="AgregarRol()">Agregar</el-button>
      </span>
    </el-dialog>

    <!--ACTUALIZAR ROL-->
    <el-dialog  title="Editar Rol" :visible.sync="dialogEditarVisible">
      <el-form  :model="rowSelectedEdit" ref="rowSelectedEdit" class="demo-ruleForm">
        <el-form-item label="Descripcion" prop="strRolDescripcion" :label-width="formLabelWidth" :rules="[
            { required: true, message: 'Ingrese Descripcion',trigger: 'blur,change'} ]">
          <el-input placeholder="Descripcion" v-model="rowSelectedEdit.strRolDescripcion" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Accesos" prop="lstAccesos" center-block :label-width="formLabelWidth" >
          <el-transfer
            v-model="defaultSelectEdit"
            :titles="tituloAccesos"
            :footer-format = "{ noChecked: '${total} accesos', hasChecked: '${checked}/${total} seleccionados' }"
            :props="{
              key: 'intCodAcceso',
              label: 'strNombre'
            }"
            @change="handleChangeEdit"
            :data="listaAccesos.Data">
          </el-transfer>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogEditarVisible = false">Cancelar</el-button>
        <el-button type="primary" @click="EditarRol()">Actualizar</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import RolesComponent from '@/components/roles/roles.component'
export default RolesComponent
</script>
<style>
.buton{
    display: inline-block;
}
.first_buton{
    margin-bottom: 10px;
}
/* .el-dialog--small {
    margin-top: -5%;
} */
.titleComponent{
  background-color: #21859d;
  color: white;
  border-radius: 4px;
  margin-top: 5px;
  padding-bottom: 5px;
  padding-top: 5px;
  padding-left: 5px;
}
.el-table{
  font-size: 12px;
}
.el-transfer-panel .el-transfer-panel__empty{
  color: white;
}
.el-table__empty-text{
  color: white;
}
</style>
