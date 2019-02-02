<template>
  <div >
      <!-- <div class="row bodycard"> -->
                    <div class="headercard " style="height: 33px;" >
                        <div class="col-md-12">
                                <div class="table-title" >
                                  <div style="margin-top: 4px;">   
                                    <el-button class="buttonfilter btn btn-outline-secondary orange" @click="BuscarSome()">
                                        <img class="imagenfilter" src="../../images/buscar.png" alt="" >
                                    </el-button>
                                    <el-button class="buttonfilter btn btn-outline-secondary orange" >
                                        <img class="imagenfilter" src="../../images/tacho.png" alt="">
                                    </el-button>
                                    <div class="v-separator"></div>
                                    <el-button class="buttonfilter btn btn-outline-secondary orange" >
                                        <img class="imagenfilter" src="../../images/ordenar_ascendente.png" alt="" >
                                    </el-button>
                                    <el-button class="buttonfilter btn btn-outline-secondary orange" >
                                        <img class="imagenfilter" src="../../images/ordenar_descendente.png" alt="" >
                                    </el-button>
                                    <el-button class="buttonfilter btn btn-outline-secondary orange" >
                                        <img class="imagenfilter" src="../../images/buscari.png" alt="" >
                                    </el-button>
                                    <el-button class="buttonfilter btn btn-outline-secondary orange" >
                                        <img class="imagenfilter" src="../../images/buscarimg.png" alt="" >
                                    </el-button>
                                    <el-button class="buttonfilter btn btn-outline-secondary orange" >
                                        <img class="imagenfilter" src="../../images/filtro.png" alt="" >
                                    </el-button>
                                    <div class="v-separator"></div>
                                    <el-button class="buttonfilter btn btn-outline-secondary orange" >
                                        <img class="imagenfilter" src="../../images/imprimir.png" alt="" >
                                    </el-button>
                                    <el-button class="buttonfilter btn btn-outline-secondary orange" >
                                        <img class="imagenfilter" src="../../images/informacion.png" alt="" >
                                    </el-button>

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
