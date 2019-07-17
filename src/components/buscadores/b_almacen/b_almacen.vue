<template>
    <div style="padding: 5px 2px;">
       <el-card class="box-card" style="    margin-left: 4px;">
            <div slot="header" class="headercard">
                <span class="labelheadercard" >Busqueda de Almacen</span>
            </div>
            <div class="row bodycard">
                <div class="col-md-12">
                    <div class="form-group row">
                        <label class="el-form-item__label col-md-3" >{{Column}}</label>
                        <div class="col-md-3 grupolabel">
                            <div class="input-group mb-3" >
                            <el-input size ="small" v-model="inputAtributo" :autofocus="true" @keydown.native.enter="buscarAlmacen()">
                             <el-button slot="append" class="boton" icon="fa fa-search" 
                                    @click="buscarAlmacen()"
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
            :data="almacenModel"
            stripe  :default-sort = "{prop: 'date', order: 'descending'}"
            style="width: 100%" class="ExcelTable2007"
            height="250"
            highlight-current-row
            @header-click="headerclick"
            @row-dblclick="seleccionar"
            @current-change="handleCurrentChange"> 
            <el-table-column :render-header="filterstrWHS_Cod"  prop="strWHS_Cod" label="Codigo" width="120">
            </el-table-column>  
            <el-table-column :render-header="filterstrWHS_Name" prop="strWHS_Name" label="Descripcion" style="width: 70% !important;">
            </el-table-column> 
            <el-table-column :render-header="filterstrLocation" prop="strLocation" label="Descripcion" style="width: 70% !important;">
            </el-table-column> 
            </el-table>
        </el-card>
        <br/>
        <footer class="modal-footer">
            <el-button class="buttonfilter btn btn-outline-secondary orange" @click="checkCompania()">
            <img class="imagenfilter" src="../../../images/check.png" alt="" >
            </el-button>
            <el-button class="buttonfilter btn btn-outline-secondary orange" style="margin-left: 0px;"  @click="closeAlmacen()">
            <img class="imagenfilter" src="../../../images/close.png" alt="" >
            </el-button>
        </footer>
    </div>
</template>

<script>
    import BAlmacenComponent from '@/components/buscadores/b_almacen/b_almacen.component'
    export default BAlmacenComponent
</script>
