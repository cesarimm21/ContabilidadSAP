<template>
  <div class="directorios">
    <!--Muestra los ultimos 5 documentos nuevos-->
    <el-card>
      <h5>{{TextTitle}}</h5>
      <el-row :gutter="12" >
          <el-col :span="12" :offset="6">
            <el-form :model="FormAgregar" :rules="rules" ref="ruleForm" label-width="200px" class="demo-ruleForm">
                
                <el-form-item label="Url de la Web Api" prop="strUrlPagina" class="items">
                    <el-input v-model="FormAgregar.strUrlPagina" disabled></el-input>
                </el-form-item>
            </el-form>
            <el-button-group class="footbuton">
                <el-button type="primary" icon="fa fa-window-close-o" @click="handChange()">Agregar</el-button>
                <el-button type="success" icon="fa fa-check" @click="VisualizarEditar=true">Editar</el-button>
            </el-button-group>
          </el-col>
      </el-row>
    </el-card> 
     <!-- Opciones de aprobacion -->    
    <b-modal cancel-variant="outline-primary" v-model="VisualizarAgregar" hide-footer size="md" title="Agregar Directorios">
            <el-card>
              <div class="search" align="center">
                  <el-form :model="FormAgregar" :rules="rules" ref="ruleForm" label-width="200px" class="demo-ruleForm">
                    
                    <el-form-item label="Url de la Web Api" prop="strUrlPagina" class="items">
                        <el-input v-model="FormAgregar.strUrlPagina" ></el-input>
                    </el-form-item>
                </el-form>
                  <el-button-group>
                      <el-button type="danger" icon="fa fa-eraser" @click="VisualizarAgregar=false">Cerrar</el-button>
                      <el-button type="primary" icon="search" @click="AgregarDirectorio(FormAgregar)">Agregar</el-button>             
                  </el-button-group>
                 </div>
            </el-card>
        </b-modal>
         <!-- Opciones de aprobacion -->    
    <b-modal cancel-variant="outline-primary" v-model="VisualizarEditar" hide-footer size="md" title="Editar Directorios">
            <el-card>
              <div class="search" align="center">
                  <el-form :model="FormAgregar" :rules="rules" ref="ruleForm" label-width="200px" class="demo-ruleForm">
                    
                    <el-form-item label="Url de la Web Api" prop="strUrlPagina" class="items">
                        <el-input v-model="FormAgregar.strUrlPagina" ></el-input>
                    </el-form-item>
                </el-form>
                  <el-button-group>
                      <el-button type="danger" icon="fa fa-eraser" @click="VisualizarEditar=false">Cerrar</el-button>
                      <el-button type="primary" icon="search" @click="EditarDirectorio(FormAgregar)">Guargar</el-button>             
                  </el-button-group>
                 </div>
            </el-card>
        </b-modal>
  </div>

</template>

<script>
import Directorios from '@/components/directorios/directorios.component'
export default Directorios
</script>
<style>
.in-comentario{
  padding: 10px;
}
.footbuton{
    margin-left: 45%;
}
.items{
    text-decoration-style:inherit;
}
.el-card__body {
    padding-bottom: 45px;
}
</style>
