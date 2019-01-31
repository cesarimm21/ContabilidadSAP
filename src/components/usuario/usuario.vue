<template>
  <div id='usuario'>
    <p class="titleComponent" align="center">
      Configuraci&oacute;n de Usuarios
    </p>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <i class="fa fa-filter"></i>
        <span>Filtros de b&uacute;squeda</span>
      </div>
    <el-row>
      <el-col :span="6">
        <div class="search_Code">
          <el-form :model="FormSearch" class="dialogos">
            <el-form-item label="Codigo" :label-width="formLabelWidth" >
              <el-input
                placeholder="Codigo usuario"
                v-model="FormSearch.intCodUsuario">
               </el-input>
             </el-form-item>
           </el-form>
         </div>
      </el-col>
      <el-col :span="6">
        <div class="search_dominio">
          <el-form :model="FormSearch" class="dialogos">
            <el-form-item label="Dominio" :label-width="formLabelWidth" >
              <el-select v-model="FormSearch.strDominio" filterable placeholder="Seleccione Dominio">
                <el-option
                  v-for="item in dataDominios.Data"
                  :key="item.intCodDominio"
                  :label="item.strDescripcion"
                  :value="item.strDescripcion">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="search_firstname">
          <el-form :model="FormSearch" class="dialogos">
            <el-form-item label="Usuario" :label-width="formLabelWidth" >
              <el-input
                placeholder="Nombre Usuario"
                v-model="FormSearch.strUsuario">
              </el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6"><div class="search_lastP">
        <el-form :model="FormSearch" class="dialogos">
          <el-form-item label="Nombre" :label-width="formLabelWidth" >
            <el-input
              placeholder="Nombre"
              v-model="FormSearch.Nombres">
            </el-input>
          </el-form-item>
        </el-form>
      </div></el-col>
      <el-col :span="6"><div class="search_lastM">
        <el-form :model="FormSearch" class="dialogos">
          <el-form-item label="Ap. Paterno" :label-width="formLabelWidth" >
            <el-input
              placeholder="Apellido Paterno"
              v-model="FormSearch.ApellidoPaterno">
            </el-input>
          </el-form-item>
        </el-form>
      </div></el-col>
      <el-col :span="6"><div class="search_lastM">
        <el-form :model="FormSearch" class="dialogos">
          <el-form-item label="Ap. Materno" :label-width="formLabelWidth" >
            <el-input
              placeholder="Apellido Materno"
              v-model="FormSearch.ApellidoMaterno">
            </el-input>
          </el-form-item>
        </el-form>
      </div></el-col>
    </el-row>
    <el-row>
      <div class="search" align="center">
         <el-button-group>
            <el-button type="danger" icon="search" @click="LimpiarUsuarios()">Limpiar</el-button>
            <el-button type="primary" icon="search" @click="ConsultarUsuarios(FormSearch)">Buscar</el-button>
         </el-button-group>
      </div>
    </el-row>
    </el-card>

    <br>
    <el-button class="" type="success" @click="handleAgregar()"><i class="fa fa-user-plus"></i> Agregar Usuario</el-button>
    <br><br>
    <el-table
      v-loading="loadingGet"
      element-loading-text="Cargando..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"  
      :data="gridData"
      border
      style="width: 100%">
      <el-table-column prop="intCodUsuario"  label="Codigo" width="115" class="itemTabla"></el-table-column>
      <el-table-column prop="Nombres"  label="Nombres" ></el-table-column>
      <el-table-column prop="ApellidoPaterno"  label="Ap. Paterno" ></el-table-column>
      <el-table-column prop="ApellidoMaterno"  label="Ap. Materno" ></el-table-column>
      <el-table-column prop="strDominio"  label="Dominio"></el-table-column>
      <el-table-column prop="strUsuario"  label="Usuario"></el-table-column>
      <el-table-column prop="strCargo"  label="Rol"></el-table-column>
      <el-table-column prop="chrTipoLogeo"  label="Tipo" width="82"></el-table-column>
      <el-table-column label="Operaciones" width="200">
        <template scope="scope">
          <el-button :plain="true" icon="edit" size="mini" type="info"
            @click="handleEdit(scope.$index, scope.row)">Editar</el-button>
          <el-button :plain="true" icon="delete" size="mini" type="danger"
            @click="handleDelete(scope.$index, scope.row)">Eliminar</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination layout="prev, pager, next" :total="totalRegistros" :page-size="RegistersForPage" :current-page.sync="pagina" @current-change="cambioPagina()">
      </el-pagination>

    <!--AGREGAR USUARIO-->
    <el-dialog  title="Registrar Usuario" size="lg" v-model="dialogTableVisible">
      <el-form :model="FormAgregar" class="dialogos">
        <el-col :span="12">
          <el-form-item label="Nombre" :label-width="formLabelWidth" >
          <el-input placeholder="Nombres" v-model="FormAgregar.Nombres" auto-complete="off">
            <el-button slot="append" @click="VisualizarPersonas=true" icon="fa fa-user-o"></el-button>
          </el-input>
          </el-form-item>
          <el-form-item label="Apellido Paterno" :label-width="formLabelWidth" >
            <el-input placeholder="Apellido Paterno" v-model="FormAgregar.ApellidoPaterno" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="Apellido Materno" :label-width="formLabelWidth" >
            <el-input placeholder="Apellido Materno" v-model="FormAgregar.ApellidoMaterno" auto-complete="off"></el-input>
          </el-form-item>   
          <el-form-item label="Nro Documento" :label-width="formLabelWidth" >
            <el-input placeholder="Nro Documento" v-model="FormAgregar.CodPersona" auto-complete="off"></el-input>
          </el-form-item>      
        <el-form-item label="Usuario" :label-width="formLabelWidth" >
          <el-input placeholder="Usuario" v-model="FormAgregar.strUsuario" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Contraseña" :label-width="formLabelWidth" >
          <el-input placeholder="Contraseña" type="password" v-model="FormAgregar.strPassword" auto-complete="off"></el-input>
        </el-form-item>
       

        </el-col>
        <el-col :span="12">
        <el-form :model="FormAgregar" ref="FormAgregar"  class="demo-dynamic">
        <el-form-item 
          prop="email"
          label="Correo" 
          :label-width="formLabelWidth" 
          :rules="[{ required: true, message:  'Por favor ingrese un correo valido', trigger: 'blur' },{ type: 'email', message:  'Por favor ingrese un correo valido', trigger: 'blur,change' }]">
          <el-input placeholder="E-mail" v-model="FormAgregar.Email" auto-complete="off"></el-input>
        </el-form-item>        
        </el-form>
        <el-form-item label="Dominio" :label-width="formLabelWidth" >
        <el-select v-model="FormAgregar.strDominio" filterable placeholder="Seleccione Dominio">
            <el-option
              v-for="item in dataDominios.Data"
              :key="item.intCodDominio"
              :label="item.strDescripcion"
              :value="item.strDescripcion">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Roles" :label-width="formLabelWidth" >
          <el-select v-model="FormAgregar.strCargo" filterable placeholder="Seleccione Rol">
            <el-option
              v-for="item in dataRoles.Data"
              :key="item.intCodRol"
              :label="item.strRolDescripcion"
              :value="item.strRolDescripcion">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Tipo" :label-width="formLabelWidth" >
          <el-select v-model="FormAgregar.chrTipoLogeo" filterable placeholder="Seleccione Tipo Logeo">
            <el-option
              v-for="item in tipo"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        </el-col>        
        
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelAdd()">Cancelar</el-button>
        <el-button type="primary" @click="AgregarUsuario(FormAgregar)">Agregar</el-button>
      </span>
    </el-dialog >

    <!--EDITAR USUARIO-->
    <el-dialog  title="Editar Usuario" size="lg" v-model="dialogEditarVisible">
      <el-form :model="rowSelectedEdit" class="dialogos">
        <el-col :span="12">
          <el-form-item label="Nombre" :label-width="formLabelWidth" >
          <el-input placeholder="Nombres" v-model="rowSelectedEdit.Nombres" auto-complete="off">
            <el-button slot="append" @click="VisualizarPersonas=true" icon="fa fa-user-o"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item label="Apellido Paterno" :label-width="formLabelWidth" >
          <el-input placeholder="Apellido Paterno" v-model="rowSelectedEdit.ApellidoPaterno" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Apellido Materno" :label-width="formLabelWidth" >
          <el-input placeholder="Apellido Materno" v-model="rowSelectedEdit.ApellidoMaterno" auto-complete="off"></el-input>
        </el-form-item>        
        <el-form-item label="Nro Documento" :label-width="formLabelWidth" >
            <el-input placeholder="Nro Documento" v-model="rowSelectedEdit.strCodPersona" auto-complete="off"></el-input>
          </el-form-item>  
        <el-form-item label="Usuario" :label-width="formLabelWidth" >
          <el-input placeholder="Usuario" v-model="rowSelectedEdit.strUsuario" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Contraseña" :label-width="formLabelWidth" >
          <el-input placeholder="Contraseña" type="password" v-model="rowSelectedEdit.strPassword" auto-complete="off"></el-input>
        </el-form-item>        
        </el-col>
        <el-col :span="12">     
          <el-form :model="rowSelectedEdit" ref="rowSelectedEdit"  class="demo-dynamic">
          <el-form-item 
          prop="email"
          label="Correo" 
          :label-width="formLabelWidth" 
          :rules="[{ required: true, message: 'Por favor ingrese un correo valido', trigger: 'blur' },{ type: 'email', message: 'Por favor ingrese un correo valido', trigger: 'blur,change' }]">
          <el-input placeholder="E-mail" v-model="rowSelectedEdit.Email" auto-complete="off"></el-input>
        </el-form-item>
        </el-form>   
        <el-form-item label="Dominio" :label-width="formLabelWidth" >
          <el-select v-model="rowSelectedEdit.strDominio" filterable placeholder="Seleccione Dominio">
            <el-option
              v-for="item in dataDominios.Data"
              :key="item.intCodDominio"
              :label="item.strDescripcion"
              :value="item.strDescripcion">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Roles" :label-width="formLabelWidth" >
          <el-select v-model="rowSelectedEdit.strCargo" filterable placeholder="Seleccione Rol">
            <el-option
              v-for="item in dataRoles.Data"
              :key="item.intCodRol"
              :label="item.strRolDescripcion"
              :value="item.strRolDescripcion">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Tipo" :label-width="formLabelWidth" >
          <el-select v-model="rowSelectedEdit.chrTipoLogeo" filterable placeholder="Seleccione Tipo Logeo">
            <el-option
              v-for="item in tipo"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        </el-col>
       
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogEditarVisible = false">Cancelar</el-button>
        <el-button type="primary" @click="EditarUsuario(rowSelectedEdit)">Editar</el-button>
      </span>
    </el-dialog>
    <!-- Seleccionar personas -->
    <el-dialog title="Relacion de Personas"  v-model="VisualizarPersonas">
      <el-row>
        <el-col :span="10">
          <div class="codigoPer">
            <el-form :model="FormSearchPers">
              <el-form-item label="Codigo Per:" :label-width="formLabelWidth"> 
                 <el-input
                   placeholder="Codigo Per:"
                   v-model="FormSearchPers.CodPersona">
                  </el-input>
              </el-form-item>
            </el-form>
          </div>          
        </el-col>
        <el-col :span="10" :offset="4">
          <div class="codigoPer">
            <el-form :model="FormSearchPers" :label-width="formLabelWidth">
              <el-form-item label="Nombres:"> 
                 <el-input
                   placeholder="Nombres"
                   v-model="FormSearchPers.Nombres">
                  </el-input>
              </el-form-item>
            </el-form>
          </div>          
        </el-col>

      </el-row>
      <el-row>
        <el-col :span="10">
          <div class="codigoPer">
            <el-form :model="FormSearchPers" :label-width="formLabelWidth">
              <el-form-item label="Ap. Paterno:"> 
                 <el-input
                   placeholder="Ap. Paterno"
                   v-model="FormSearchPers.ApellidoPaterno">
                  </el-input>
              </el-form-item>
            </el-form>
          </div>          
        </el-col>
        <el-col :span="10" :offset="4">
          <div class="codigoPer">
            <el-form :model="FormSearchPers" :label-width="formLabelWidth">
              <el-form-item label="Ap. Materno:"> 
                 <el-input
                   placeholder="Ap. Materno"
                   v-model="FormSearchPers.ApellidoMaterno">
                  </el-input>
              </el-form-item>
            </el-form>
          </div>          
        </el-col>

      </el-row>
      <el-row>
        <el-col :span="10">
          <div class="codigoPer">
            <el-form :model="FormSearchPers" :label-width="formLabelWidth">
              <el-form-item label="Nro Documento:"> 
                 <el-input
                   placeholder="Nro Documento"
                   v-model="FormSearchPers.NroDocumento">
                  </el-input>
              </el-form-item>
            </el-form>
          </div>          
        </el-col>
        <el-col :span="10" :offset="4">
          <div class="codigoPer">
            <el-button type="primary" icon="search" @click="SearchPersonas(FormSearchPers)">Buscar</el-button>
          </div>          
        </el-col>
      </el-row>
     <el-table  class="tabletaSearchPers"
                v-loading="loadingGetPersona"
                element-loading-text="Cargando..."
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"  
                  :data="gridDataPersonas" 
                  highlight-current-row                        
                  border
                  style="width: 100%">
                  <el-table-column prop="CodPersona"  label="Cod. Persona" class="itemTabla"></el-table-column>
                  <el-table-column prop="Nombres"  label="Nombres" ></el-table-column>
                  <el-table-column prop="ApellidoPaterno"  label="Ap. Paterno" ></el-table-column>
                  <el-table-column prop="ApellidoMaterno"  label="Ap. Materno" ></el-table-column>
                  <el-table-column prop="NroDocumento"  label="Nro Doc." ></el-table-column>
                  <el-table-column label="Confirmar" >
                    <template scope="scope">
                      <el-button :plain="true" icon="circle-check" size="mini" type="button" class="btn btn-outline-success"
                        @click="GetRowData(scope.$index, scope.row)">Confirmar</el-button>
                    </template>
                  </el-table-column>
            </el-table>
            <el-pagination layout="prev, pager, next" :total="totalRegistros1" :page-size="RegistersForPage2" :current-page.sync="pagina" @current-change="cambioPagina1()">    
          </el-pagination>
      <span slot="footer" class="dialog-footer">        
        <el-button @click="VisualizarPersonas = false">Cancelar</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import UsuarioComponent from '@/components/usuario/usuario.component'
  export default UsuarioComponent
</script>
<style>

.buton{
    display: inline-block;
}
.first_buton{
    margin-bottom: 10px;
}

.el-select {
    width: 100%;
    padding-left: 0px;
}
.el-dialog--tiny{
    top: 5%;
    margin-top: -5%;
}
.titleComponent{
  background-color: #21859d;
  border-radius: 4px;
  color: white;
  margin-top: 5px;
  padding-bottom: 5px;
  padding-top: 5px;
  padding-left: 5px;
      width: 94%;
}
.itemTabla{
  font-size: 5;
}
.el-table{
  font-size: 11px;
}

</style>
