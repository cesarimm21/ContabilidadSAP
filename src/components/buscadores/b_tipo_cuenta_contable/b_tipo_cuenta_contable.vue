<template>
    <div>
       <el-card class="box-card">
            <div slot="header" class="headercard">
                <span class="labelheadercard" ></span>
            </div>
            <div class="row bodycard">
                <div class="col-md-12">
                    <div class="form-group row">
                       <label class="el-form-item__label col-md-3" >{{Column}}</label>
                        <div class="col-md-3 grupolabel">
                            <div class="input-group mb-3" >
                            <el-input size ="small" v-model="inputAtributo">
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
            :data="TipoCuentaContable"
            stripe  :default-sort = "{prop: 'date', order: 'descending'}"
            style="width: 100%;cursor: pointer;" class="ExcelTable2007"
            height="250"
            highlight-current-row
            @row-dblclick="seleccionar"
            @current-change="handleCurrentChange"
            @header-click="headerclick">

            <el-table-column :render-header="filterstrAcc_Type_Cod"   prop="strAcc_Type_Cod" label="Codigo" width="180">
            </el-table-column>  
            <el-table-column :render-header="filterstrAcc_Type_Name" prop="strAcc_Type_Name" label="Descripción" style="width: 70% !important;">
            </el-table-column> 
            </el-table>
        </el-card>
        <br/>
        <footer class="modal-footer">
            <el-button class="buttonfilter btn btn-outline-secondary orange" @click="checkTipo()">
            <img class="imagenfilter" src="../../../images/check.png" alt="" >
            </el-button>
            <el-button class="buttonfilter btn btn-outline-secondary orange" style="margin-left: 0px;"  @click="closeTipo()">
            <img class="imagenfilter" src="../../../images/close.png" alt="" >
            </el-button>
        </footer>
    </div>
</template>

<script>
    import BTipoCuentaContableComponent from '@/components/buscadores/b_tipo_cuenta_contable/b_tipo_cuenta_contable.component'
    export default BTipoCuentaContableComponent
</script>
