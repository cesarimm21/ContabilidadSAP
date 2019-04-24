<template>
    <div class="pagos-masivo">
        <ol  style="margin-left: -1.5rem;background: linear-gradient(rgb(229, 241, 247) 0%, rgb(255, 255, 255) 100%);    margin-bottom: 0rem !important;">
        <quickaccessmenu></quickaccessmenu>
        </ol>
        <el-card class="box-card">
            <div slot="header" class="headercard">
                <span class="labelheadercard">Pagos Masivos</span>
            </div>
            <div class="row bodycard">
            </div>
        </el-card>
    </div>
</template>
<script>

import PagosMasivoComponent from '@/components/FI-FINANZAS/Tesoreria/pagos_masivo.component'
export default PagosMasivoComponent
</script>
<style scoped>
</style>