<template>
  <div id="roles">
    <p align="center">
         Configuracion Log
       </p>
      
           
      <el-table class="tabla-log" :data="gridData.Data" border style="width: 100%">
        <el-table-column prop="intCodRol" label="Codigo Rol" width="130"></el-table-column>
        <el-table-column prop="strDescripcion" label="Descripcion" width="180"></el-table-column>
        <el-table-column prop="strUsuarioCrea" label="Usuario Creador" width="180"></el-table-column>
        <el-table-column prop="dtmFechaCrea" label="Fecha Creado" width="180"></el-table-column>
        <el-table-column prop="chrEstado" label="Estado" width="80"></el-table-column>
        <el-table-column prop="lstAccesos" label="Acceso" width="80"></el-table-column>
        <el-table-column label="Operaciones" min-width="200">
        <template scope="scope">
          <el-button class="button-roles" type="text" size="small">Modificar</el-button>
          <el-button class="button-roles" type="text" size="small">Desactivar</el-button>
        </template>
    </el-table-column>
      </el-table>
  </div>
</template>
<script>
import LogComponent from '@/components/log/log.component'
export default LogComponent
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
p{
  /* background-color: #21859d; */
  color: white;
  border-radius: 4px;
  margin-top: 5px;
  padding-bottom: 5px;
  padding-top: 5px;
  padding-left: 5px;
      width: 94%;
}
</style>

