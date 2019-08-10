<template>
    <div>
       <el-card class="box-card">
            <div slot="header" class="headercard">
                <span class="labelheadercard" >Hola Mundo</span>
            </div>
            <div class="row bodycard">
                <div class="col-md-12">
                    <div class="form-group row">
                        <label class="el-form-item__label col-md-3" >{{Column}}</label>
                        <div class="col-md-3 grupolabel">
                            <div class="input-group mb-3" >
                            <el-input size ="small" v-model="inputAtributo" :autofocus="true" @keydown.native.enter="buscarfilter()">
                             <el-button slot="append" class="boton" icon="fa fa-search" 
                                    @click="buscarfilter()"
                                > </el-button>
                            </el-input>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <el-table
            v-loading="loading1"
            element-loading-text="Cargando..."
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
            :data="cuentacontableModel"
            stripe  :default-sort = "{prop: 'date', order: 'descending'}"
            style="width: 100%" class="ExcelTable2007"
            height="250"
            highlight-current-row
            @row-dblclick="seleccionar"
            @current-change="handleCurrentChange"
            @header-click="headerclick">
            <el-table-column :render-header="filterstrExpGroup_Cod"  prop="strExpGroup_Cod" label="Codigo" width="180">
            </el-table-column>  
            <el-table-column :render-header="filterstrExpGroup_Name" prop="strExpGroup_Name" label="Nombre" style="width: 70% !important;">
            </el-table-column>  
            <el-table-column :render-header="filterstrExpGroup_Desc" prop="strExpGroup_Desc" label="Descripcion" style="width: 70% !important;">
            </el-table-column> 
            </el-table>
        </el-card>
        <br/>
        <footer class="modal-footer">
            <el-button class="buttonfilter btn btn-outline-secondary orange" @click="checkPopup()">
            <img class="imagenfilter" src="../../../images/check.png" alt="" >
            </el-button>
            <el-button class="buttonfilter btn btn-outline-secondary orange" style="margin-left: 0px;"  @click="closePopup()">
            <img class="imagenfilter" src="../../../images/close.png" alt="" >
            </el-button>
        </footer>
    </div>
</template>

<script>
    import BGrupoCuentaGastosComponent from '@/components/buscadores/b_grupo_gastos/b_grupo_gastos.component'
    export default BGrupoCuentaGastosComponent
</script>
