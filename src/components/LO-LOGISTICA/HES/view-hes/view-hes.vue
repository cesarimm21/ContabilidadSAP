<template>
    <div class="edit-hes">
        <el-card class="box-card">
            <div slot="header" class="headercard">
                <span class="labelheadercard"> Ver aceptación servicio</span>
            </div>
            <div class="row bodycard">
                <div class="container">
                    <div class="row" style="margin-top: 3px;">
                        <div class="col-sm-6">
                            <div class="form-group row">    
                                <label class="el-form-item__label col-md-3">Codigo Hes</label>
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
import ViewHesComponent from '@/components/LO-LOGISTICA/HES/view-hes/view-hes.component'
export default ViewHesComponent
</script>
<style scoped> 

</style>


