<template>
  <div id="configuracion">
      <el-dialog
        title="Tips"
        :visible.sync="dialogVisible"
        size="tiny"
        :before-close="handleClose">
        <span>This is a message</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">Cancel</el-button>
            <el-button type="primary" @click="dialogVisible = false">Confirm</el-button>
        </span>
        </el-dialog>
  </div>
 </template>

<script>
import ConfiguracionComponent from '@/components/configuracion/configuracion.component'
export default ConfiguracionComponent
</script>
<style>

</style>

