<template>
    <div class="crear-proveedor">
      <ol  style="margin-left: -1.5rem;background: linear-gradient(rgb(229, 241, 247) 0%, rgb(255, 255, 255) 100%);    margin-bottom: 0rem !important;">
        <quickaccessmenu v-on:backPage="backPage($event)"  v-on:reloadpage="reloadpage($event)"/>
    </ol>
    </div>
</template>
<script>
import ViewAndEditProveedorComponent from '@/components/FI-FINANZAS/proveedor/ViewAndEdit-proveedor/ViewAndEdit-proveedor.component'
export default ViewAndEditProveedorComponent
</script>
<style scoped>
</style>
