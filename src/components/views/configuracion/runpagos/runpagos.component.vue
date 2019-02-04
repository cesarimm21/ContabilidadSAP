<template>
    <div class="runpagos">
        <el-card class="box-card">
            <div slot="header" class="headercard"  >
                <span class="labelheadercard">Pagos automaticos</span>
            </div>
            <div class="row bodycard">
                <div class="col-md-5">
                    <div class="form-group row">
                    <label class="el-form-item__label col-sm-3" >Fecha ejecución:</label>
                    <div class="col-sm-4 grupolabel">
                        <div class="input-group mb-3" >
                        <el-input type="date"  size ="small"   placeholder="*"></el-input>
                        </div>
                    </div>
                    </div>
                    <div class="form-group row">
                        <label class="el-form-item__label col-sm-3" >Codigo pago:</label>
                        <div class="col-sm-4 grupolabel">
                            <div class="input-group mb-4" >
                            <el-input size ="small" placeholder="*"></el-input>
                            </div>
                        </div>
                    </div>
                     <div class="form-group row">
                        <label class="el-form-item__label col-sm-3" >Moneda:</label>
                        <div class="col-sm-4 grupolabel">
                            <div class="input-group mb-3" >
                            <el-input size ="small"   placeholder="*"></el-input>
                            <div class="input-group-append buttongrupolabel">
                                <el-button size="small"  class="btn btn-outline-secondary orange" type="primary" icon="fa fa-clone" @click="viewMoneda()"></el-button>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br>
        <el-tabs type="border-card">
          <el-tab-pane>
            <span slot="label"><i class="el-icon-date"></i> Status</span>
            <el-card class="box-card">
                <div slot="header" class="headercard"  >
                    <span class="labelheadercard">Status</span>
                </div>
                <div class="row bodycard">
                    <div class="col-md-12">
                        <div class="form-group row">
                        <label class="el-form-item__label statusClass col-sm-4" >Parametros registrados</label>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="form-group row">
                        <label class="el-form-item__label statusClass col-sm-4" >Se a creado propuesta de pago</label>
                        </div>
                    </div>
                </div>
            </el-card>
          </el-tab-pane>
            <el-tab-pane label="Parametros">
                <span slot="label"><i class="el-icon-date"></i> Parametros</span>
                <el-card class="box-card">
                    <div slot="header" class="headercard"  >
                        <span class="labelheadercard">Parametros</span>
                    </div>
                     <div class="row bodycard">
                        <div class="col-md-5">
                            <div class="form-group row">
                            <label class="el-form-item__label col-sm-5" >Fecha contabilización:</label>
                            <div class="col-sm-4 grupolabel">
                                <div class="input-group mb-3" >
                                <el-input type="date"  size ="small"   placeholder="*"></el-input>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div class="col-md-2">

                        </div>
                        <div class="col-md-5">
                            <div class="form-group row">
                            <label class="el-form-item__label col-sm-5" >Docs. ingresados hastas:</label>
                            <div class="col-sm-4 grupolabel">
                                <div class="input-group mb-3" >
                                <el-input type="date"  size ="small"   placeholder="*"></el-input>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div class="col-md-5">
                            <div class="form-group row">
                                <label class="el-form-item__label col-sm-5" >Banco pagador:</label>
                                <div class="col-sm-4 grupolabel">
                                    <div class="input-group mb-4" >
                                    <el-input size ="small"   placeholder="*"></el-input>
                                    <div class="input-group-append buttongrupolabel">
                                        <el-button size="small"  class="btn btn-outline-secondary orange" type="primary" icon="fa fa-clone" @click="viewMoneda()"></el-button>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-2">

                        </div>
                        <div class="col-md-5">
                            <div class="form-group row">
                            <label class="el-form-item__label col-sm-5" >Pos. deudores vence a:</label>
                            <div class="col-sm-4 grupolabel">
                                <div class="input-group mb-3" >
                                <el-input type="date"  size ="small"   placeholder="*"></el-input>
                                </div>
                            </div>
                            </div>
                        </div>
                     </div>
                    <!-- <div class="row bodycard"> -->
                    <div class="headercard " style="height: 33px;" >
                        <div class="col-md-12">
                            <!-- <div class="card cardButtons"> -->
                                <div class="table-title" >
                                  <div style="margin-top: 4px;">   
                                    <el-button class="buttonfilter btn btn-outline-secondary orange" >
                                        <img class="imagenfilter" src="../../../../images/buscar.png" alt="" >
                                    </el-button>
                                    <el-button class="accionButtons btn btn-outline-secondary orange" style="width:15px; height:28px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.3rem;">
                                        <img class="accionButtonsImage" src="../../../../images/tacho.png" alt="" style="width:16px; height:16px;margin-left: -19px; margin-top: -5px;">
                                    </el-button>
                                    <div class="v-separator"></div>
                                    <el-button class="accionButtons btn btn-outline-secondary orange" style="width:15px; height:28px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.3rem;">
                                        <img class="accionButtonsImage" src="../../../../images/ordenar_ascendente.png" alt="" style="width:16px; height:16px;margin-left: -19px; margin-top: -5px;">
                                    </el-button>
                                    <el-button class="accionButtons btn btn-outline-secondary orange" style="width:15px; height:28px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.3rem;">
                                        <img class="accionButtonsImage" src="../../../../images/ordenar_descendente.png" alt="" style="width:16px; height:16px;margin-left: -19px; margin-top: -5px;">
                                    </el-button>
                                    <el-button class="accionButtons btn btn-outline-secondary orange" style="width:15px; height:28px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.3rem;">
                                        <img class="accionButtonsImage" src="../../../../images/buscari.png" alt="" style="width:16px; height:16px;margin-left: -19px; margin-top: -5px;">
                                    </el-button>
                                    <el-button class="accionButtons btn btn-outline-secondary orange" style="width:15px; height:28px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.3rem;">
                                        <img class="accionButtonsImage" src="../../../../images/buscarimg.png" alt="" style="width:16px; height:16px;margin-left: -19px; margin-top: -5px;">
                                    </el-button>
                                    <el-button class="accionButtons btn btn-outline-secondary orange" style="width:15px; height:28px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.3rem;">
                                        <img class="accionButtonsImage" src="../../../../images/filtro.png" alt="" style="width:16px; height:16px;margin-left: -19px; margin-top: -5px;">
                                    </el-button>
                                    <div class="v-separator"></div>
                                    <el-button class="accionButtons btn btn-outline-secondary orange" style="width:15px; height:28px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.3rem;">
                                        <img class="accionButtonsImage" src="../../../../images/imprimir.png" alt="" style="width:16px; height:16px;margin-left: -19px; margin-top: -5px;">
                                    </el-button>
                                    <el-button class="accionButtons btn btn-outline-secondary orange" style="width:15px; height:28px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.3rem;">
                                        <img class="accionButtonsImage" src="../../../../images/informacion.png" alt="" style="width:16px; height:16px;margin-left: -19px; margin-top: -5px;">
                                    </el-button>

                                  </div>
                              </div>
                            <!-- </div> -->
                            
                        </div>                        
                    </div>
                    <br>
                        <div class="table-responsive">
                            <table class="ExcelTable2007" style="
                                            max-height: 200px;
                                            display: block;
                                            overflow: auto;
                                            white-space: nowrap;">
                                <thead>
                                    <tr>
                                        <th class="heading" style="width: 3%;">&nbsp;</th>
                                        <th style="width: 10%;"><span  class="col-form-label" style="border-bottom: none;font-size: 12px !important;">Categoria Cuenta</span></th>
                                        <th style="width: 10%;"><span  class="col-form-label" style="border-bottom: none;font-size: 12px !important;">Categoria Linea</span></th>
                                        <th style="width: 10%;"><span  class="col-form-label" style="border-bottom: none;font-size: 12px !important;">Almacen</span></th>
                                        <th style="width: 10%;"><span  class="col-form-label" style="border-bottom: none;font-size: 12px !important;">Material</span></th>
                                        <th style="width: 10%;"><span  class="col-form-label" style="border-bottom: none;font-size: 12px !important;">Descripcion</span></th>
                                        <th style="width: 10%;"><span  class="col-form-label" style="border-bottom: none;font-size: 12px !important;">Lugar Entrega</span></th>
                                        <th style="width: 10%;"><span  class="col-form-label" style="border-bottom: none;font-size: 12px !important;">UM</span></th>
                                        <th style="width: 10%;"><span  class="col-form-label" style="border-bottom: none;font-size: 12px !important;">Moneda</span></th>  
                                        <th style="width: 10%;"><span  class="col-form-label" style="border-bottom: none;font-size: 12px !important;">Fecha</span></th>  
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="span6"  ><input disabled="false" type="text" class="form-control"  aria-describedby="basic-addon2"></td>
                                        <td class="span6"  ><input disabled="false" type="text" class="form-control"  aria-describedby="basic-addon2"></td>
                                        <td class="span6"  ><input disabled="false" type="text" class="form-control"  aria-describedby="basic-addon2"></td>
                                        <td class="span6"  ><input disabled="false" type="text" class="form-control"  aria-describedby="basic-addon2"></td>
                                        <td class="span6" ><input disabled="false" type="text" class="form-control"  aria-describedby="basic-addon2"></td>
                                        <td class="span6"  ><input disabled="false" type="text" class="form-control"  aria-describedby="basic-addon2"></td>
                                        <td class="span6"  ><input disabled="false" type="text" class="form-control"  aria-describedby="basic-addon2"></td>
                                        <td class="span6"  ><input disabled="false" type="text" class="form-control"  aria-describedby="basic-addon2"></td>
                                        <td class="span6"  ><input disabled="false" type="text" class="form-control"  aria-describedby="basic-addon2"></td>
                                        <td class="span6"  ><input disabled="false" type="text" class="form-control"  aria-describedby="basic-addon2"></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    <!-- </div> -->
                    <br>
                    <el-card class="box-card col-md-8 ">
                        <div slot="header" class="headercard"  >
                            <span class="labelheadercard">Parametros</span>
                        </div>
                        <div class="row bodycard">
                            <label class="el-form-item__label col-sm-2" >Proveedor:</label>
                                <div class="col-sm-2 grupolabel">
                                    <div class="input-group mb-2" >
                                    <el-input size ="small" placeholder="111111111"></el-input>
                                </div>
                            </div>
                            <div class="col-sm-1" style="aling-text:center;">
                                <label class="el-form-item__label col-sm-1" >A</label>
                            </div>
                            <div class="col-sm-2 grupolabel">
                                <div class="input-group mb-2" >
                                    <el-input size ="small" placeholder="999999999"></el-input>
                                </div>
                            </div>
                            <el-button class="accionButtons btn btn-outline-secondary orange" style="width:15px; height:28px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.3rem;">
                                <img class="accionButtonsImage" src="../../../../images/collapse_derecha.png" alt="" style="width:16px; height:16px;margin-left: -19px; margin-top: -5px;">
                            </el-button>
                        </div>
                        <div class="row bodycard" style="margin-top:0px;">
                            <label class="el-form-item__label col-sm-2" >Cliente:</label>
                                <div class="col-sm-2 grupolabel">
                                    <div class="input-group mb-2" >
                                    <el-input size ="small" placeholder="111111111"></el-input>
                                    </div>
                                </div>
                                <div class="col-sm-1" style="aling-text:center;">
                                <label class="el-form-item__label col-sm-1" >A</label>
                            </div>
                            <div class="col-sm-2 grupolabel">
                                <div class="input-group mb-2" >
                                    <el-input size ="small" placeholder="999999999"></el-input>
                                </div>
                            </div>
                            <el-button class="accionButtons btn btn-outline-secondary orange" style="width:15px; height:28px; cursor: pointer;font: 0px/100% Arial, Helvetica, sans-serif;margin-left: 0.3rem;">
                                <img class="accionButtonsImage" src="../../../../images/collapse_derecha.png" alt="" style="width:16px; height:16px;margin-left: -19px; margin-top: -5px;">
                            </el-button>
                        </div>
                        
                    </el-card>
                </el-card>
            </el-tab-pane>
          <el-tab-pane label="Contable">Contable</el-tab-pane>
        </el-tabs>
        </el-card>
    </div>
</template>
<script>
import Runpagos from '@/components/views/configuracion/runpagos/runpagos.component'
export default Runpagos
</script>
<style>
.el-input--small .el-input__inner {
    height: 22px;
    font-size: 11px !important;
}
.form-group {
    margin-bottom: 0rem !important;
    margin-left: -6px;
    height: 25px;
}
.headercard {
    text-align: left;
}
.statusClass{
    border-bottom: none;
    text-align: left;
}
.imageHover{
    border: 1px solid black; 
}
/* .cardButtons{
    text-align: left;
} */
.buttonFirst{
    background-image:url('../../../../images/collapse_left.png');
    margin-top: 2px;
}
.ExcelTable2007 {
    border: 1px solid #B0CBEF;
    border-width: 1px 0px 0px 1px;
    font-size: 11pt;
    font-family: Calibri;
    font-weight: 100;
    border-spacing: 0px;
    border-collapse: collapse;
}
.ExcelTable2007 th {
    background-repeat: repeat-x;
    font-weight: normal;
    font-size: 12px;
    border: 1px solid #9EB6CE;
    border-width: 0px 1px 1px 0px;
    height: 17px;
}
.table-responsive {
    display: block;
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    -ms-overflow-style: -ms-autohiding-scrollbar;
}
</style>