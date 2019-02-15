<template>
  <div class="al-crear">
    <el-card class="box-card">
        <div slot="header" class="headercard">
            <span class="labelheadercard" >Crear Material</span>
        </div>
        <div class="row bodycard">
            <div class="container">
                <div class="row" style="margin-top: 3px;">
                    <div class="col-sm-6" >
                        <div class="form-group row ">
                            <label class="el-form-item__label col-md-3" >Compañia</label>
                            <div class="col-md-4 grupolabel">
                                <div class="input-group mb-3" >
                                <el-input size ="small" @blur="desactivar_compania" @focus="activar_compania" v-model="code_compania"  placeholder="">
                                    <el-button v-if="btnactivarcompania && !dialogCompania" slot="append" class="boton" icon="fa fa-clone" @click="loadCompania()"></el-button> 
                                </el-input>
                                </div>
                            </div>
                            <span style="font-size: 11px;margin-top: 5px;">{{descompania}}</span>
                        </div> 
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-6" >
                        <div class="form-group row ">
                            <label class="el-form-item__label col-md-3" >Código Material</label>
                            <div class="col-md-4 grupolabel">
                                <div class="input-group mb-3" >
                                <el-input size ="small" @blur="desactivar_compania" @focus="activar_compania" v-model="code_compania"  placeholder="">
                                    <el-button v-if="btnactivarcompania && !dialogCompania" slot="append" class="boton" icon="fa fa-clone" @click="loadCompania()"></el-button> 
                                </el-input>
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-6" >
                        <div class="form-group row ">
                            <label class="el-form-item__label col-md-3" >Descripcion</label>
                            <div class="col-md-4 grupolabel">
                                <div class="input-group mb-3" >
                                <el-input size ="small" @blur="desactivar_compania" @focus="activar_compania" v-model="code_compania"  placeholder="">
                                    <el-button v-if="btnactivarcompania && !dialogCompania" slot="append" class="boton" icon="fa fa-clone" @click="loadCompania()"></el-button> 
                                </el-input>
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>
                <br/>
                <el-card class="box-card">
                    <div slot="header" class="headercard">
                        <span class="labelheadercard" >Datos Generales</span>
                    </div>
                    <div class="row bodycard">
                        <div class="container">
                            <div class="row">
                                <div class="col-sm-3" >
                                    <div class="form-group row ">
                                        <label class="el-form-item__label col-md-6" >Código Antiguo</label>
                                        <div class="col-md-6 grupolabel">
                                            <div class="input-group mb-3" >
                                            <el-input size ="small" @blur="desactivar_compania" @focus="activar_compania" v-model="code_compania"  placeholder="">
                                                <el-button v-if="btnactivarcompania && !dialogCompania" slot="append" class="boton" icon="fa fa-clone" @click="loadCompania()"></el-button> 
                                            </el-input>
                                            </div>
                                        </div>
                                    </div> 
                                </div>
                                <div class="col-sm-3" >
                                    <div class="form-group row ">
                                        <label class="el-form-item__label col-md-6" >Código Almacen</label>
                                        <div class="col-md-6 grupolabel">
                                            <div class="input-group mb-3" >
                                            <el-input size ="small" @blur="desactivar_compania" @focus="activar_compania" v-model="code_compania"  placeholder="">
                                                <el-button v-if="btnactivarcompania && !dialogCompania" slot="append" class="boton" icon="fa fa-clone" @click="loadCompania()"></el-button> 
                                            </el-input>
                                            </div>
                                        </div>
                                    </div> 
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-3" >
                                    <div class="form-group row ">
                                        <label class="el-form-item__label col-md-6" >Numero Parte</label>
                                        <div class="col-md-6 grupolabel">
                                            <div class="input-group mb-3" >
                                            <el-input size ="small" @blur="desactivar_compania" @focus="activar_compania" v-model="code_compania"  placeholder="">
                                                <el-button v-if="btnactivarcompania && !dialogCompania" slot="append" class="boton" icon="fa fa-clone" @click="loadCompania()"></el-button> 
                                            </el-input>
                                            </div>
                                        </div>
                                    </div> 
                                </div>
                                <div class="col-sm-3" >
                                    <div class="form-group row ">
                                        <label class="el-form-item__label col-md-6" >Tipo</label>
                                        <div class="col-md-6 grupolabel">
                                            <div class="input-group mb-3" >
                                            <el-input size ="small" @blur="desactivar_compania" @focus="activar_compania" v-model="code_compania"  placeholder="">
                                                <el-button v-if="btnactivarcompania && !dialogCompania" slot="append" class="boton" icon="fa fa-clone" @click="loadCompania()"></el-button> 
                                            </el-input>
                                            </div>
                                        </div>
                                    </div> 
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-3" >
                                    <div class="form-group row ">
                                        <label class="el-form-item__label col-md-6" >Marca</label>
                                        <div class="col-md-6 grupolabel">
                                            <div class="input-group mb-3" >
                                            <el-input size ="small" @blur="desactivar_compania" @focus="activar_compania" v-model="code_compania"  placeholder="">
                                                <el-button v-if="btnactivarcompania && !dialogCompania" slot="append" class="boton" icon="fa fa-clone" @click="loadCompania()"></el-button> 
                                            </el-input>
                                            </div>
                                        </div>
                                    </div> 
                                </div>
                                <div class="col-sm-3" >
                                    <div class="form-group row ">
                                        <label class="el-form-item__label col-md-6" >Flota</label>
                                        <div class="col-md-6 grupolabel">
                                            <div class="input-group mb-3" >
                                            <el-input size ="small" @blur="desactivar_compania" @focus="activar_compania" v-model="code_compania"  placeholder="">
                                                <el-button v-if="btnactivarcompania && !dialogCompania" slot="append" class="boton" icon="fa fa-clone" @click="loadCompania()"></el-button> 
                                            </el-input>
                                            </div>
                                        </div>
                                    </div> 
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-3" >
                                    <div class="form-group row ">
                                        <label class="el-form-item__label col-md-6" >Cta. Gasto</label>
                                        <div class="col-md-6 grupolabel">
                                            <div class="input-group mb-3" >
                                            <el-input size ="small" @blur="desactivar_compania" @focus="activar_compania" v-model="code_compania"  placeholder="">
                                                <el-button v-if="btnactivarcompania && !dialogCompania" slot="append" class="boton" icon="fa fa-clone" @click="loadCompania()"></el-button> 
                                            </el-input>
                                            </div>
                                        </div>
                                    </div> 
                                </div>
                                <div class="col-sm-3" >
                                    <div class="form-group row ">
                                        <label class="el-form-item__label col-md-6" >Clase Material</label>
                                        <div class="col-md-6 grupolabel">
                                            <div class="input-group mb-3" >
                                            <el-input size ="small" @blur="desactivar_compania" @focus="activar_compania" v-model="code_compania"  placeholder="">
                                                <el-button v-if="btnactivarcompania && !dialogCompania" slot="append" class="boton" icon="fa fa-clone" @click="loadCompania()"></el-button> 
                                            </el-input>
                                            </div>
                                        </div>
                                    </div> 
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-3" >
                                    <div class="form-group row ">
                                        <label class="el-form-item__label col-md-6" >Categ. Material</label>
                                        <div class="col-md-6 grupolabel">
                                            <div class="input-group mb-3" >
                                            <el-input size ="small" @blur="desactivar_compania" @focus="activar_compania" v-model="code_compania"  placeholder="">
                                                <el-button v-if="btnactivarcompania && !dialogCompania" slot="append" class="boton" icon="fa fa-clone" @click="loadCompania()"></el-button> 
                                            </el-input>
                                            </div>
                                        </div>
                                    </div> 
                                </div>
                                <div class="col-sm-3" >
                                    <div class="form-group row ">
                                        <label class="el-form-item__label col-md-6" >Criticidad</label>
                                        <div class="col-md-6 grupolabel">
                                            <div class="input-group mb-3" >
                                            <el-input size ="small" @blur="desactivar_compania" @focus="activar_compania" v-model="code_compania"  placeholder="">
                                                <el-button v-if="btnactivarcompania && !dialogCompania" slot="append" class="boton" icon="fa fa-clone" @click="loadCompania()"></el-button> 
                                            </el-input>
                                            </div>
                                        </div>
                                    </div> 
                                </div>
                            </div>
                            
                            <div class="row">
                                <div class="col-sm-3" >
                                    <div class="form-group row ">
                                        <label class="el-form-item__label col-md-6" >Grupo Comprador</label>
                                        <div class="col-md-6 grupolabel">
                                            <div class="input-group mb-3" >
                                            <el-input size ="small" @blur="desactivar_compania" @focus="activar_compania" v-model="code_compania"  placeholder="">
                                                <el-button v-if="btnactivarcompania && !dialogCompania" slot="append" class="boton" icon="fa fa-clone" @click="loadCompania()"></el-button> 
                                            </el-input>
                                            </div>
                                        </div>
                                    </div> 
                                </div>
                                <div class="col-sm-3" >
                                    <div class="form-group row ">
                                        <label class="el-form-item__label col-md-6" >Proveedor</label>
                                        <div class="col-md-6 grupolabel">
                                            <div class="input-group mb-3" >
                                            <el-input size ="small" @blur="desactivar_compania" @focus="activar_compania" v-model="code_compania"  placeholder="">
                                                <el-button v-if="btnactivarcompania && !dialogCompania" slot="append" class="boton" icon="fa fa-clone" @click="loadCompania()"></el-button> 
                                            </el-input>
                                            </div>
                                        </div>
                                    </div> 
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-3" >
                                    <div class="form-group row ">
                                        <label class="el-form-item__label col-md-6" >Cantidad Minima</label>
                                        <div class="col-md-6 grupolabel">
                                            <div class="input-group mb-3" >
                                            <el-input size ="small" @blur="desactivar_compania" @focus="activar_compania" v-model="code_compania"  placeholder="">
                                                <el-button v-if="btnactivarcompania && !dialogCompania" slot="append" class="boton" icon="fa fa-clone" @click="loadCompania()"></el-button> 
                                            </el-input>
                                            </div>
                                        </div>
                                    </div> 
                                </div>
                                <div class="col-sm-3" >
                                    <div class="form-group row ">
                                        <label class="el-form-item__label col-md-6" >Cantidad Maxima</label>
                                        <div class="col-md-6 grupolabel">
                                            <div class="input-group mb-3" >
                                            <el-input size ="small" @blur="desactivar_compania" @focus="activar_compania" v-model="code_compania"  placeholder="">
                                                <el-button v-if="btnactivarcompania && !dialogCompania" slot="append" class="boton" icon="fa fa-clone" @click="loadCompania()"></el-button> 
                                            </el-input>
                                            </div>
                                        </div>
                                    </div> 
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-3" >
                                    <div class="form-group row ">
                                        <label class="el-form-item__label col-md-6" >Control Precio</label>
                                        <div class="col-md-6 grupolabel">
                                            <div class="input-group mb-3" >
                                            <el-input size ="small" @blur="desactivar_compania" @focus="activar_compania" v-model="code_compania"  placeholder="">
                                                <el-button v-if="btnactivarcompania && !dialogCompania" slot="append" class="boton" icon="fa fa-clone" @click="loadCompania()"></el-button> 
                                            </el-input>
                                            </div>
                                        </div>
                                    </div> 
                                </div>
                                <div class="col-sm-3" >
                                    <div class="form-group row ">
                                        <label class="el-form-item__label col-md-6" >Factor</label>
                                        <div class="col-md-6 grupolabel">
                                            <div class="input-group mb-3" >
                                            <el-input size ="small" @blur="desactivar_compania" @focus="activar_compania" v-model="code_compania"  placeholder="">
                                                <el-button v-if="btnactivarcompania && !dialogCompania" slot="append" class="boton" icon="fa fa-clone" @click="loadCompania()"></el-button> 
                                            </el-input>
                                            </div>
                                        </div>
                                    </div> 
                                </div>
                            </div>
                            
                            <div class="row">
                                <div class="col-sm-3" >
                                    <div class="form-group row ">
                                        <label class="el-form-item__label col-md-6" >Impuesto </label>
                                        <div class="col-md-6 grupolabel">
                                            <div class="input-group mb-3" >
                                            <el-input size ="small" @blur="desactivar_compania" @focus="activar_compania" v-model="code_compania"  placeholder="">
                                                <el-button v-if="btnactivarcompania && !dialogCompania" slot="append" class="boton" icon="fa fa-clone" @click="loadCompania()"></el-button> 
                                            </el-input>
                                            </div>
                                        </div>
                                    </div> 
                                </div>
                                <div class="col-sm-3" >
                                    <div class="form-group row ">
                                        <label class="el-form-item__label col-md-6" >Cantidad</label>
                                        <div class="col-md-6 grupolabel">
                                            <div class="input-group mb-3" >
                                            <el-input size ="small" @blur="desactivar_compania" @focus="activar_compania" v-model="code_compania"  placeholder="">
                                                <el-button v-if="btnactivarcompania && !dialogCompania" slot="append" class="boton" icon="fa fa-clone" @click="loadCompania()"></el-button> 
                                            </el-input>
                                            </div>
                                        </div>
                                    </div> 
                                </div>
                            </div>
                            
                            <div class="row">
                                <div class="col-sm-3" >
                                    <div class="form-group row ">
                                        <label class="el-form-item__label col-md-6" >Saldo Cantidad </label>
                                        <div class="col-md-6 grupolabel">
                                            <div class="input-group mb-3" >
                                            <el-input size ="small" @blur="desactivar_compania" @focus="activar_compania" v-model="code_compania"  placeholder="">
                                                <el-button v-if="btnactivarcompania && !dialogCompania" slot="append" class="boton" icon="fa fa-clone" @click="loadCompania()"></el-button> 
                                            </el-input>
                                            </div>
                                        </div>
                                    </div> 
                                </div>
                                <div class="col-sm-3" >
                                    <div class="form-group row ">
                                        <label class="el-form-item__label col-md-6" >P. Unitario PEN</label>
                                        <div class="col-md-6 grupolabel">
                                            <div class="input-group mb-3" >
                                            <el-input size ="small" @blur="desactivar_compania" @focus="activar_compania" v-model="code_compania"  placeholder="">
                                                <el-button v-if="btnactivarcompania && !dialogCompania" slot="append" class="boton" icon="fa fa-clone" @click="loadCompania()"></el-button> 
                                            </el-input>
                                            </div>
                                        </div>
                                    </div> 
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-3" >
                                    <div class="form-group row ">
                                        <label class="el-form-item__label col-md-6" >UM </label>
                                        <div class="col-md-6 grupolabel">
                                            <div class="input-group mb-3" >
                                            <el-input size ="small" @blur="desactivar_compania" @focus="activar_compania" v-model="code_compania"  placeholder="">
                                                <el-button v-if="btnactivarcompania && !dialogCompania" slot="append" class="boton" icon="fa fa-clone" @click="loadCompania()"></el-button> 
                                            </el-input>
                                            </div>
                                        </div>
                                    </div> 
                                </div>
                                <div class="col-sm-3" >
                                    <div class="form-group row ">
                                        <label class="el-form-item__label col-md-6" >P. Unitario USD</label>
                                        <div class="col-md-6 grupolabel">
                                            <div class="input-group mb-3" >
                                            <el-input size ="small" @blur="desactivar_compania" @focus="activar_compania" v-model="code_compania"  placeholder="">
                                                <el-button v-if="btnactivarcompania && !dialogCompania" slot="append" class="boton" icon="fa fa-clone" @click="loadCompania()"></el-button> 
                                            </el-input>
                                            </div>
                                        </div>
                                    </div> 
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-3" >
                                    <div class="form-group row ">
                                        <label class="el-form-item__label col-md-6" >Importe Actual PEN </label>
                                        <div class="col-md-6 grupolabel">
                                            <div class="input-group mb-3" >
                                            <el-input size ="small" @blur="desactivar_compania" @focus="activar_compania" v-model="code_compania"  placeholder="">
                                                <el-button v-if="btnactivarcompania && !dialogCompania" slot="append" class="boton" icon="fa fa-clone" @click="loadCompania()"></el-button> 
                                            </el-input>
                                            </div>
                                        </div>
                                    </div> 
                                </div>
                                <div class="col-sm-3" >
                                    <div class="form-group row ">
                                        <label class="el-form-item__label col-md-6" >Importe_Actual USD</label>
                                        <div class="col-md-6 grupolabel">
                                            <div class="input-group mb-3" >
                                            <el-input size ="small" @blur="desactivar_compania" @focus="activar_compania" v-model="code_compania"  placeholder="">
                                                <el-button v-if="btnactivarcompania && !dialogCompania" slot="append" class="boton" icon="fa fa-clone" @click="loadCompania()"></el-button> 
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
        </div>
    </el-card>
    
</div>  
  
</template>
<script>
import CrearMaterialComponent from '@/components/LO-LOGISTICA/almacen/al_crear/al_crear.component'
export default CrearMaterialComponent
</script>
<style scoped>

</style>
