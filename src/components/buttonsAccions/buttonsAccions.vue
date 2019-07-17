<template>
  <div >
      <!-- <div class="row bodycard"> -->
                    <div class="headercard " style="height: 33px;" >
                        <div class="col-md-12">
                                <div class="table-title" >
                                  <div style="margin-top: 4px;"> 
                                    <el-tooltip class="itemTool" content="Validar" placement="bottom-start" effect="light">  
                                    <el-button class="buttonfilter btn btn-outline-secondary orange" @click="ValidarItem()">
                                        <img class="imagenfilter" src="../../images/buscar.png" alt="" >
                                    </el-button>
                                    </el-tooltip>    
                                    <el-tooltip class="itemTool" content="Eliminar" placement="bottom-start" effect="light"> 
                                    <el-button class="buttonfilter btn btn-outline-secondary orange" @click="EliminarItem()" >
                                        <img class="imagenfilter" src="../../images/tacho.png" alt="">
                                    </el-button>
                                    </el-tooltip>   
                                    <el-tooltip class="itemTool" content="Activar Item" placement="bottom-start" effect="light"> 
                                    <el-button class="buttonfilter btn btn-outline-secondary orange" @click="ActivarDesactivar()" >
                                        <img class="imagenfilter" src="../../images/active_desactive.png" alt="">
                                    </el-button>
                                    </el-tooltip>   
                                    <div class="v-separator"></div>
                                    <el-tooltip class="itemTool" content="Ordenar Asc" placement="bottom-start" effect="light">
                                    <el-button class="buttonfilter btn btn-outline-secondary orange" @click="AscItem()" >
                                        <img class="imagenfilter" src="../../images/ordenar_ascendente.png" alt="" >
                                    </el-button>
                                    </el-tooltip>   
                                    <el-tooltip class="itemTool" content="Ordenar Dsc" placement="bottom-start" effect="light">
                                    <el-button class="buttonfilter btn btn-outline-secondary orange"  @click="DscItem()">
                                        <img class="imagenfilter" src="../../images/ordenar_descendente.png" alt="" >
                                    </el-button>
                                    </el-tooltip>   
                                    <!-- <el-button class="buttonfilter btn btn-outline-secondary orange" @click="Buscar()">
                                        <img class="imagenfilter" src="../../images/buscari.png" alt="" >
                                    </el-button> -->
                                    <el-tooltip class="itemTool" content="Filtro Busqueda" placement="bottom-start" effect="light">
                                     <el-button  v-if="!filter" class="buttonfilter btn btn-outline-secondary orange" @click="Buscar()">
                                        <img class="imagenfilter" src="../../images/filters.png" alt="" >
                                    </el-button>
                                    </el-tooltip>
                                    <el-tooltip class="itemTool" content="Filtro Busqueda" placement="bottom-start" effect="light">
                                    <el-button v-if="filter"  class="buttonfilter btn btn-outline-secondary orange" @click="Buscar()">
                                        <img class="imagenfilter" src="../../images/filter2.png" alt="" >
                                    </el-button>
                                     </el-tooltip>
                                     <el-tooltip class="itemTool" content="Limpiar Filtro" placement="bottom-start" effect="light">
                                    <el-button class="buttonfilter btn btn-outline-secondary orange" @click="Limpiar()" @keyup.native.esc="Limpiar()">
                                        <img class="imagenfilter" src="../../images/limpiar.png" alt="" >
                                    </el-button> 
                                     </el-tooltip>
                                    <!-- <el-button class="buttonfilter btn btn-outline-secondary orange" >
                                        <img class="imagenfilter" src="../../images/filtro.png" alt="" >
                                    </el-button> -->
                                    <div class="v-separator"></div>
                                    <el-tooltip class="itemTool" content="Imprimir" placement="bottom-start" effect="light">
                                    <el-button class="buttonfilter btn btn-outline-secondary orange" @click="Print()">
                                        <img class="imagenfilter" src="../../images/imprimir.png" alt="" >
                                    </el-button>
                                     </el-tooltip>
                                     <el-tooltip class="itemTool" content="Informacion" placement="bottom-start" effect="light">
                                    <el-button class="buttonfilter btn btn-outline-secondary orange" >
                                        <img class="imagenfilter" src="../../images/informacion.png" alt="" >
                                    </el-button>
                                    </el-tooltip>
                                    <el-tooltip class="itemTool" content="Activar Impuesto" placement="bottom-start" effect="light">
                                    <el-button v-if="falseortrue" class="buttonfilter btn btn-outline-secondary orange" @click="ActivaCheck()">
                                        <img class="imagenfilter" src="../../images/check.png" >
                                    </el-button> 
                                    </el-tooltip>
                                    <el-button v-if="falseortruePO" class="buttonfilter btn btn-outline-secondary orange" @click="ExportarPDF()">
                                        <img class="imagenfilter" src="../../images/pdf1.png" >
                                    </el-button> 
                                    <!-- <div class="v-separator"></div>    
                                                                         
                                         <el-button class="buttonfilter btn btn-outline-secondary orange" @click="anterior()">
                                            <img class="imagenfilter" src="../../images/pagina_siguiente.png" >
                                        </el-button>                                                               
                                        <el-button class="buttonfilter btn btn-outline-secondary orange" @click="siguiente()">
                                            <img class="imagenfilter" src="../../images/pagina_anterior.png" >
                                        </el-button>   
                                         <el-button v-if="falseortrue" class="buttonfilter btn btn-outline-secondary orange" @click="ActivaCheck()">
                                            <img class="imagenfilter" src="../../images/check.png" >
                                        </el-button>                                           -->
                                   
                                  </div>
                              </div>
                        </div>                        
                    </div>
  </div>
  
</template>
<script>

import ButtonsAccionsComponent from '@/components/buttonsAccions/buttonsAccions.component'
export default ButtonsAccionsComponent
</script>
<style scoped>
.buttonfilter{
  margin-top: 5px;
}
</style>
