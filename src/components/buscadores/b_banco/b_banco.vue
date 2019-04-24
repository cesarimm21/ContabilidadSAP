<template>
    <div style="padding: 5px 2px;">
       <el-card class="box-card" style="    margin-left: 4px;">
            <div slot="header" class="headercard">
                <span class="labelheadercard" ></span>
            </div>
            <div class="row bodycard">
                <div class="col-md-12">
                    <div class="form-group row">
                        <label class="el-form-item__label col-md-1" >Código</label>
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
            <el-table
            :data="gridBanco"
            stripe  :default-sort = "{prop: 'date', order: 'descending'}"
            style="width: 100%" class="ExcelTable2007"
            height="250"
            highlight-current-row
            @row-dblclick="seleccionar"
            @current-change="handleCurrentChange"> 
            <el-table-column  prop="strBank_Cod" label="Codigo" width="180" >
            </el-table-column>  
            <el-table-column  prop="strBank_Name" label="Nombre del Banco" width="180">
            </el-table-column> 
            <el-table-column  prop="strBank_City" label="Ciudad" style="width: 70% !important;">
            </el-table-column> 
            </el-table>
        </el-card>
        <br/>
        <footer class="modal-footer">
            <el-button class="buttonfilter btn btn-outline-secondary orange" @click="checkBanco()">
            <img class="imagenfilter" src="../../../images/check.png" alt="" >
            </el-button>
            <el-button class="buttonfilter btn btn-outline-secondary orange" style="margin-left: 0px;"  @click="closeBanco()">
            <img class="imagenfilter" src="../../../images/close.png" alt="" >
            </el-button>
        </footer>
    </div>
</template>

<script>
    import BBancoComponent from '@/components/buscadores/b_banco/b_banco.component'
    export default BBancoComponent
</script>
