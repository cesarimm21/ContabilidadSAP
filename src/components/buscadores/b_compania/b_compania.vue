<template>
    <div>
       <el-card class="box-card">
            <div slot="header" class="headercard">
                <span class="labelheadercard" ></span>
            </div>
            <div class="row bodycard">
                <div class="col-md-12">
                    <div class="form-group row">
                        <label class="el-form-item__label col-md-2" >Código</label>
                        <div class="col-md-2 grupolabel">
                            <div class="input-group mb-3" >
                            <el-input size ="small"   placeholder="">
                            <el-button slot="append" style="padding: 3px 3px !important;background: #fff5c4;
                        background: -webkit-gradient(left top, left bottom, color-stop(0%, #fff5c4), color-stop(100%, #ffee9f));
                        background: -webkit-gradient(linear, left top, left bottom, from(#fff5c4), to(#ffee9f));
                        background: linear-gradient(to bottom, #fff5c4 0%, #ffee9f 100%);" icon="fa fa-search"
                                        > </el-button>
                            </el-input>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style="height:5px;"></div>
            <el-table
            :data="companiaModel"
            stripe  :default-sort = "{prop: 'date', order: 'descending'}"
            style="width: 100%;cursor: pointer;" class="ExcelTable2007"
            height="250"
            highlight-current-row
            @row-dblclick="seleccionar"
            @current-change="handleCurrentChange">
            <el-table-column   prop="strRUC" label="RUC" width="100">
            </el-table-column>  
            <el-table-column   prop="strCompany_Cod" label="Codigo" width="80">
            </el-table-column>  
            <el-table-column  prop="strCompany_Name" label="Nombre" style="width: 70% !important;">
            </el-table-column>             
            <el-table-column  prop="strCompany_Desc" label="Descripción" style="width: 70% !important;">
            </el-table-column> 
            </el-table>
        </el-card>
        <br/>
        <footer class="modal-footer">
            <el-button class="buttonfilter btn btn-outline-secondary orange" @click="checkCompania()">
            <img class="imagenfilter" src="../../../images/check.png" alt="" >
            </el-button>
            <el-button class="buttonfilter btn btn-outline-secondary orange" style="margin-left: 0px;"  @click="closeCompania()">
            <img class="imagenfilter" src="../../../images/close.png" alt="" >
            </el-button>
        </footer>
    </div>
</template>

<script>
    import BCompaniaProveedor from '@/components/buscadores/b_compania/b_compania.component'
    export default BCompaniaProveedor
</script>
