<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="headercard">
                <!-- <span class="labelheadercard" >Hola Mundo</span> -->
            </div>
            <div class="row bodycard">
                <div class="col-md-12">
                    <div class="form-group row">
                        <label class="el-form-item__label col-md-3" >{{Column}}</label>
                        <div class="col-md-3 grupolabel">
                            <div class="input-group mb-3" >
                            <el-input size ="small" v-model="inputAtributo" :autofocus="true" @keydown.native.enter="buscarfilterCuenta()">
                             <el-button slot="append" class="boton" icon="fa fa-search" 
                                    @click="buscarfilterCuenta()"
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
            :data="gridCuenta"
            stripe  :default-sort = "{prop: 'date', order: 'descending'}"
            style="width: 100%" class="ExcelTable2007"
            height="250"
            highlight-current-row
            @header-click="headerclick"
            @row-dblclick="seleccionar"
            @current-change="handleCurrentChange">
                <el-table-column :render-header="filterstrAcc_Local_NO"  prop="strAcc_Local_NO" label="Cuenta Local" width="130">
                </el-table-column>  
                <el-table-column :render-header="filterstrAcc_Corp_NO" prop="strAcc_Corp_NO" label="Cuenta Corporativa" width="130">
                </el-table-column>  
                <el-table-column :render-header="filterstrAcc_Local_Name" prop="strAcc_Local_Name" label="Nombre" style="width: 70% !important;">
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
    import BCuentaContableComponent from '@/components/buscadores/b_cuenta_contable/b_cuenta_contable.component'
    export default BCuentaContableComponent
</script>
