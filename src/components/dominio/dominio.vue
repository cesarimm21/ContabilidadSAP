<template>
  <div id="dominio">
    <p align="center" class="titleComponent">
      Configuración de Dominio
    </p>

    <el-button class="" type="primary" @click="handleAgregar()"><i class="fa fa-plus"></i> Agregar Dominio</el-button>
    <br><br>
    <el-table
    v-loading="loadingGet"
      element-loading-text="Cargando..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :data="gridData"
      border
      style="width: 100%">
      <el-table-column prop="intCodDominio" sortable label="Código" width="98"></el-table-column>
      <el-table-column prop="strDescripcion" sortable label="Descripción" ></el-table-column>
      <el-table-column prop="strUsuarioModif" sortable label="Usuario Modifica" ></el-table-column>
      <el-table-column prop="dtmFechaModif" sortable label="Fecha Modificación" ></el-table-column>
      <el-table-column label="Operaciones" width="200">
        <template scope="scope">
          <el-button :plain="true" icon="edit" size="mini" type="info"
            @click="handleEdit(scope.$index, scope.row)">Editar</el-button>
          <el-button :plain="true" icon="delete" size="mini" type="danger"
            @click="handleDelete(scope.$index, scope.row)">Eliminar</el-button>
        </template>
      </el-table-column>
    </el-table >
<el-pagination layout="prev, pager, next" :total="totalRegistros" :page-size="RegistersForPage" :current-page.sync="paginaNumero" @current-change="cambioPagina()">
    </el-pagination>
    <!--AGREGAR USUARIO-->
    <el-dialog  title="Agregar Dominio" size="tiny" :visible.sync="dialogAgregarVisible">
      <el-form :model="FormAgregar" ref="FormAgregar" class="demo-ruleForm">
        <el-form-item label="Descripcion" prop="strDescripcion" :label-width="formLabelWidth" :rules="[
            { required: true, message: 'Ingrese Descripción',trigger: 'blur,change'} ]">
          <el-input placeholder="Descripción" v-model="FormAgregar.strDescripcion" auto-complete="off"></el-input>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogAgregarVisible = false">Cancelar</el-button>
        <el-button type="primary" @click="AgregarDominio(FormAgregar)">Agregar</el-button>
      </span>
    </el-dialog>

    <!--EDITAR USUARIO-->
    <el-dialog  title="Editar Dominio" size="tiny" :visible.sync="dialogEditarVisible">
      <el-form :model="rowSelectedEdit" class="dialogos">
        <el-form-item label="Descripción" :label-width="formLabelWidth" >
          <el-input placeholder="Descripción" v-model="rowSelectedEdit.strDescripcion" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogEditarVisible = false">Cancelar</el-button>
        <el-button type="primary" @click="EditarDominio(rowSelectedEdit)">Editar</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
  import DominioComponent from '@/components/dominio/dominio.component'
  export default DominioComponent
</script>
<style>
  .buton{
      display: inline-block;
  }
  .first_buton{
      margin-bottom: 10px;
  }
  .el-dialog--small {
      margin-top: -5%;
  }
  .titleComponent{
    background-color: #21859d;
    color: white;
    border-radius: 4px;
    margin-top: 5px;
    padding-bottom: 5px;
    padding-top: 5px;
    padding-left: 5px;
    width: 94%;
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
