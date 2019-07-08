<template>
    <div>
       <el-card class="box-card">
            <div slot="header" class="headercard">
                <span class="labelheadercard" > Busqueda de Diarios</span>
            </div>
            <div class="row bodycard">
                <div class="col-md-12">
                    <div class="form-group row">
                        <label class="el-form-item__label col-md-3" >{{Column}}</label>
                        <div class="col-md-2 grupolabel">
                            <div class="input-group mb-3" >
                            <el-input size ="small" v-model="inputAtributo" :autofocus="true" @keydown.native.enter="buscarDiario()">
                             <el-button slot="append" class="boton" icon="fa fa-search" 
                                    @click="buscarDiario()"
                                > </el-button>
                            </el-input>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <el-table
            :data="gridModel"
            stripe  :default-sort = "{prop: 'date', order: 'descending'}"
            style="width: 100%" class="ExcelTable2007"
            height="250"
            highlight-current-row
            @header-click="headerclick"
            @row-dblclick="seleccionar"
            @current-change="handleCurrentChange">
                <el-table-column :render-header="filterstrDaily_Cod"  prop="strDaily_Cod" label="Codigo" width="120">
                </el-table-column>  
                <el-table-column :render-header="filterstrDaily_Desc" prop="strDaily_Desc" label="Descripcion" style="width: 70% !important;">
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
    import BDiarioComponent from '@/components/buscadores/b_diario/b_diario.component'
    export default BDiarioComponent
</script>
