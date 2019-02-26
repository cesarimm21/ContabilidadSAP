<template>
    <div class="edit-hes">
        <el-card class="box-card">
            <div slot="header" class="headercard">
                <span class="labelheadercard"> Editar aceptación servicio</span>
            </div>
            <div class="row bodycard">
                <div class="container">
                    <div class="row" style="margin-top: 3px;">
                        <div class="col-sm-6">
                            <div class="form-group row">    
                                <label class="el-form-item__label col-md-3">Orden compra</label>
                                <div class="col-md-3 grupolabel">
                                        <div class="input-group mb-3">
                                         <el-input size ="small" @blur="desactivar_Hes" @focus="activar_Hes" class="inputOrdenCompra">                            
                                            <el-button v-if="btnactivarHes && !dialogHes" slot="append" class="boton" icon="fa fa-clone" @click="loadHes()"></el-button> 
                                        </el-input>
                                    </div>
                                </div>  
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </el-card>
    </div>
</template>
<script>
import EditHesComponent from '@/components/LO-LOGISTICA/HES/edit-hes/edit-hes.component'
export default EditHesComponent
</script>
<style scoped> 

</style>


