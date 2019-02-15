<template>
    <div class="visualizar-modificar-pr">
        <el-card class="box-card">
            <div slot="header" class="headercard">
                <span class="labelheadercard" >Modificar Requisición</span>
            </div>
            <div class="row bodycard">
            </div>
        </el-card>
    </div>
</template>
<script>
import VisualizarModificarPRComponent from '@/components/LO-LOGISTICA/requisicion/pr_visualizar_modificar/pr_visualizar_modificar.component'
export default VisualizarModificarPRComponent
</script>
<style scoped>
.el-table_1_column_1{
    background-color: #E4ECF7;
    text-align: center;
    border: 1px solid #9EB6CE;
    border-width: 0px 1px 1px 0px;
}
.Second{
    margin-top: -15px;
}
.Third{
    margin-top: -15px;
}
.el-table .selected-row {
  background: rgb(206, 85, 85);
}
.el-table--striped .el-table__body tr.el-table__row--striped.current-row td {
    background: #fff5c4;
    background: -webkit-gradient(left top, left bottom, color-stop(0%, #fff5c4), color-stop(100%, #ffee9f));
    background: -webkit-gradient(linear, left top, left bottom, from(#fff5c4), to(#ffee9f));
    background: linear-gradient(to bottom, #fff5c4 0%, #ffee9f 100%);
}
</style>
