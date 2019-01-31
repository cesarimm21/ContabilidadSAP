

<template>
<div class="jerarquia">
    <el-button type="text" @click="dialogVisible = true">Jerarquia</el-button>
    <el-dialog
        title="Tips"
        :visible.sync="dialogVisible"
        size="tiny">
        <el-input
        placeholder="Filter keyword"
        v-model="filterText">
        </el-input>
        <el-tree 
        :data="data2"
         show-checkbox node-key="id" 
         :default-expanded-keys="[2, 3]" 
         :default-checked-keys="[5]" 
         :filter-node-method="filterNode"
         :props="defaultProps">
        </el-tree>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">Cancel</el-button>
            <el-button type="primary" @click="dialogVisible = false">Guardar</el-button>
        </span>
        </el-dialog>
</div>
 </template>

<script>
import JerarquiaComponent from '@/components/jerarquia/jerarquia.component'
export default JerarquiaComponent
</script>
<style>

</style>

