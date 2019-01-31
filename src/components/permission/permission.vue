<template>
<div class="permission">
  <p class="titleComponent" align="center">
         B&uacute;squeda de Permisos
         </p>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <i class="fa fa-filter"></i>
                <span>Filtros de b&uacute;squeda</span>
                
            </div>
    <el-row>
      <el-col :span="10">
        <div class="search_Documento">
          <el-form  class="dialogos">
            <el-form-item label="Documento" :label-width="formLabelWidth" >
              <el-input
                placeholder="Descripcion">
               </el-input>
             </el-form-item>
           </el-form>
         </div>
      </el-col>
      <el-col :span="10">
        <div class="search_desde">
            <el-form  class="dialogos">
            <el-form-item label="Desde" :label-width="formLabelWidth" >
              <el-date-picker
                class="dialogos"
                :label-width="formLabelWidth"
                    v-model="value3"
                    type="date"
                    format="dd/MM/yyyy"
                    placeholder="Seleccione dia">
             </el-date-picker>
             </el-form-item>
           </el-form>
        </div>
      </el-col>  
    </el-row>
    <el-row>
        <el-col :span="10">
        <div class="search_autor">
          <el-form  class="dialogos">
            <el-form-item label="Autor" :label-width="formLabelWidth" >
              <el-input
                placeholder="Autor">
               </el-input>
             </el-form-item>
           </el-form>
         </div>
      </el-col>
      <el-col :span="10">
        <div class="search_Asta">
            <el-form  class="dialogos">
            <el-form-item label="Asta" :label-width="formLabelWidth" >
              <el-date-picker
                class="dialogos"
                :label-width="formLabelWidth"
                    v-model="value2"
                    type="date"
                    format="dd/MM/yyyy"
                    placeholder="Seleccione dia">
             </el-date-picker>
             </el-form-item>
           </el-form>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <div class="search" align="center">
        <el-button type="primary" icon="search" >Buscar</el-button>
      </div>
    </el-row>
    </el-card>
    <el-table border style="width: 100%" :data="DocumentosData.Data">
    <el-table-column prop="intCodDocumento"  label="Codigo" class="itemTabla"></el-table-column>
    <el-table-column prop="strTitle"  label="Titulo" ></el-table-column>
    <el-table-column prop="strUsuarioCrea"  label="Autor" ></el-table-column>
    <el-table-column prop="dtmFechaCrea"  label="Fecha Creada" ></el-table-column>
    <el-table-column label="Operaciones" width="200">
        <template scope="scope">
             <el-button :plain="true" icon="edit" size="mini" type="success"
                 @click="handleEdit(scope.$index, scope.id,scope.row)">Permisos</el-button>
         </template>
        </el-table-column>
    </el-table class="tableta">

    <el-dialog 
        title="Lista de usarios"
        :visible.sync="dialogVisible"
        size="small">
        <div class="scrollbar" id="style-7">
          <div class="force-overflow">
            <el-tree 
            ref="tree"
            :data="dataTree"
            show-checkbox
            :props="defaultProps"
            node-key="id"
            @check-change="handleCheckChange"            
            check-strictly
            highlight-current
            :default-checked-keys="defaultCheckedKeys"
            >
            </el-tree>
          </div>
          
        </div>
        
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">Cancel</el-button>
            <el-button type="primary" @click="UpdateDocJerarquia()">Guardar</el-button>
        </span>
    </el-dialog>
    
</div>
 
 </template>

<script>
import Permission from '@/components/permission/permission.component'
export default Permission
</script>
<style>
.titleComponent{
  background-color: #21859d;
  border-radius: 4px;
  color: white;
  margin-top: 5px;
  padding-bottom: 5px;
  padding-top: 5px;
  padding-left: 5px;
      width: 100%;
}
.search_desde{
    padding-left: 10px;
}
.search_Asta{
    padding-left: 10px;
}
.el-tree{
  border: none;
}
.scrollbar
{
	margin-left: 30px;
	float: left;
	height: 300px;
	width: 95%;
	background: #F5F5F5;
	overflow-y: scroll;
	margin-bottom: 25px;
}
.force-overflow
{
  min-height: 300px;
  background-color: white;
  border-style: solid;
  border-color: #E5E9F2 #EFF2F7;
}
#style-7::-webkit-scrollbar-track
{
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	background-color: #F5F5F5;
	border-radius: 10px;
}

#style-7::-webkit-scrollbar
{
	width: 10px;
	background-color: #F5F5F5;
}

#style-7::-webkit-scrollbar-thumb
{
	border-radius: 10px;
	background-image: -webkit-gradient(linear,
									   left bottom,
									   left top,
									   color-stop(0.44, rgb(136, 199, 247)),
									   color-stop(0.72, rgb(91, 180, 247)),
									   color-stop(0.86, rgb(32, 160, 255)));
}
.el-dialog--small{
  background-color: #E5E9F2;
}
.el-checkbox__inner{
  background-color: rgb(229, 233, 242);
}
</style>

