<template>
    <div style="padding: 5px 2px;">
       <el-card class="box-card" style="    margin-left: 4px;">
            <div slot="header" class="headercard">
                <span class="labelheadercard" ></span>
            </div>
            <div class="row bodycard">
                <div class="col-md-12">
                    <div class="form-group row">
                        <label class="el-form-item__label col-md-3" >{{Column}}</label>
                        <div class="col-md-4 grupolabel">
                            <div class="input-group mb-4" >
                            <el-input size ="small" v-model="inputAtributo">
                            <el-button slot="append" class="boton" icon="fa fa-search" 
                                @click="searchBanco()"
                            > </el-button>
                            </el-input>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <el-table
            :data="gridBanco"
            stripe  :default-sort = "{prop: 'date', order: 'descending'}"
            style="width: 100%;cursor: pointer;" class="ExcelTable2007"
            height="250"
            highlight-current-row
            @header-click="headerclick"
            @row-dblclick="seleccionar"
            @current-change="handleCurrentChange"> 
            <el-table-column :render-header="filterstrBank_Cod" prop="strBank_Cod" label="Codigo" width="150" align="center">
            </el-table-column>  
            <el-table-column :render-header="filterstrBank_Name" prop="strBank_Name" label="Descripcion">
            </el-table-column> 
            </el-table>
        </el-card>
        <br/>
        <footer class="modal-footer">
            <el-button class="buttonfilter btn btn-outline-secondary orange" style="cursor: pointer;" @click="checkBanco()">
            <img class="imagenfilter" src="../../../images/check.png" alt="" >
            </el-button>
            <el-button class="buttonfilter btn btn-outline-secondary orange" style="margin-left: 0px;cursor: pointer;"  @click="closeBanco()">
            <img class="imagenfilter" src="../../../images/close.png" alt="" >
            </el-button>
        </footer>
    </div>
</template>

<script>
    import BBancoComponent from '@/components/buscadores/b_banco/b_banco.component'
    export default BBancoComponent
</script>
