import Inicio from '@/components/inicio/inicio.vue'
import Slider from '@/components/slider/slider.vue'
import Login from '@/components/login/login.vue'
import Barmenu from '@/components/barmenu/barmenu.vue'
import TopMenu from '@/components/customs/top-menu/TopMenu.vue';
import HeaderbuttosComponent from '@/components/views/reusables/headerbuttos/headerbuttos.vue';
import UsuarioComponent from '@/components/usuario/usuario.vue'
import LogComponent from '@/components/log/log.vue'
import PagosIndividualesComponent from '../components/FI-FINANZAS/Tesoreria/create_pagos/pagos_individual.vue'
import ModificarPagosComponent from '../components/FI-FINANZAS/Tesoreria/edit_pagos/edit_pagos.vue'
import VisualizarPagosComponent from '../components/FI-FINANZAS/Tesoreria/view_pagos/view_pagos.vue'
import AprobarPagosComponent from '../components/FI-FINANZAS/Tesoreria/aprobar_pagos/aprobar_pagos.vue'
import ViewAndEditPagosComponent from '../components/FI-FINANZAS/Tesoreria/viewandedit_pagos/viewandedit_pagos.vue'
import CrearPRComponent from '../components/LO-LOGISTICA/requisicion/pr_crear/pr_crear.vue'
import CrearHesComponent from '@/components/LO-LOGISTICA/HES/crear-hes/crear-hes.vue'
import EditHesComponent from '@/components/LO-LOGISTICA/HES/edit-hes/edit-hes.vue'
import ViewHesComponent from '@/components/LO-LOGISTICA/HES/view-hes/view-hes.vue'
import ViewAndEditHesComponent from '@/components/LO-LOGISTICA/HES/viewandedit_hes/viewandedit_hes.vue'
import AprobarHesComponent from '@/components/LO-LOGISTICA/HES/aprobar-hes/aprobar-hes.vue'
import ModificarPRComponent from '../components/LO-LOGISTICA/requisicion/pr_modificar/pr_modificar.vue'
import VisualizarPRComponent from '../components/LO-LOGISTICA/requisicion/pr_visualizar/pr_visualizar.vue'
import VisualizarModificarPRComponent from '../components/LO-LOGISTICA/requisicion/pr_visualizar_modificar/pr_visualizar_modificar.vue'
import CrearProveedorComponent from '../components/FI-FINANZAS/proveedor/crear-proveedor/crear-proveedor.vue'
import ModificarProveedorComponent from '../components/FI-FINANZAS/proveedor/modificar-proveedor/modificar-proveedor.vue'
import VisualizarProveedorComponent from '../components/FI-FINANZAS/proveedor/visualizar-proveedor/visualizar-proveedor.vue'
import ViewAndEditProveedorComponent from '../components/FI-FINANZAS/proveedor/ViewAndEdit-proveedor/ViewAndEdit-proveedor.vue'
import CrearClienteComponent from '../components/FI-FINANZAS/maestro-datos/cuentas-cobrar/crear-cliente/crear-cliente.vue'
import ModificarClienteComponent from '../components/FI-FINANZAS/maestro-datos/cuentas-cobrar/edit-cliente/edit-cliente.vue'
import VisualizarClienteComponent from '../components/FI-FINANZAS/maestro-datos/cuentas-cobrar/view-cliente/view-cliente.vue'
import ViewAndEditClienteComponent from '../components/FI-FINANZAS/maestro-datos/cuentas-cobrar/viewandedit-cliente/viewandedit-cliente.vue'
import CrearIngresoComprobanteComponent from '../components/FI-FINANZAS/ingreso-comprobante/crear-ingreso-comprobante/crear-ingreso-comprobante.vue'
import ModificarIngresoComprobanteComponent from '../components/FI-FINANZAS/ingreso-comprobante/modificar-ingreso-comprobante/modificar-ingreso-comprobante.vue'
import VisualizarIngresoComprobanteComponent from '../components/FI-FINANZAS/ingreso-comprobante/ver-ingreso-comprobante/ver-ingreso-comprobante.vue'
import ViewAndEditICComponent from '../components/FI-FINANZAS/ingreso-comprobante/viewandedit_ic/viewandedit_ic.vue'
import CrearSalidaAlmacenComponent from '../components/LO-LOGISTICA/almacen/al_salida/al_salida.vue'
import CrearMaterialComponent from '../components/LO-LOGISTICA/almacen/al_crear/al_crear.vue'
import VisualizarMaterialComponent from '../components/LO-LOGISTICA/almacen/al_visualizar/al_visualizar.vue'
import ModificarMaterialComponent from '../components/LO-LOGISTICA/almacen/al_modificar/al_modificar.vue'
import VisualizarModificarMaterialComponent from '../components/LO-LOGISTICA/almacen/al_visualizar_modificar/al_visualizar_modificar.vue'
import VisualizarSalidaMaterialComponent from '../components/LO-LOGISTICA/almacen/al_salida_visualizar/al_salida_visualizar.vue'
import VisualizarSalidaModificarMaterialComponent from '../components/LO-LOGISTICA/almacen/al_salida_visualizar_modificar/al_salida_visualizar_modificar.vue'
import VisualizarModificarCuentaContableComponent from '../components/FI-FINANZAS/maestro-datos/contabilidad-general/visualizar_modificar_cuenta_contable/visualizar_modificar_cuenta_contable.vue';
import VisualizarCuentaContableComponent from '../components/FI-FINANZAS/maestro-datos/contabilidad-general/visualizar_cuenta_contable/visualizar_cuenta_contable.vue';

import VisualizarModificarElementoGastoComponent from '../components/FI-FINANZAS/maestro-datos/contabilidad-general/elemento-gasto/visualizar_modificar-elemento-gasto/visualizar_modificar-elemento-gasto.vue';
import VisualizarElementoGastoComponent from '../components/FI-FINANZAS/maestro-datos/contabilidad-general/elemento-gasto/visualizar-elemento-gasto/visualizar-elemento-gasto.vue';


import VisualizarCentroCostosComponent from '../components/FI-FINANZAS/maestro-datos/centro-costos/visualizar_centro_costos/visualizar_centro_costos.vue';
import VisualizarModificarCentroCostosComponent from '../components/FI-FINANZAS/maestro-datos/centro-costos/visualizar_modificar_centro_costos/visualizar_modificar_centro_costos.vue';
import ModificarCentroCostosComponent from '../components/FI-FINANZAS/maestro-datos/centro-costos/modificar_centro_costos/modificar_centro_costos.vue';

import ModificarElementoGastoComponent from '../components/FI-FINANZAS/maestro-datos/contabilidad-general/elemento-gasto/modificar-elemento-gasto/modificar-elemento-gasto.vue';
import ModificarCuentaContableComponent from '../components/FI-FINANZAS/maestro-datos/contabilidad-general/modificar_cuenta_contable/modificar_cuenta_contable.vue';
import ModificarSalidaMaterialComponent from '../components/LO-LOGISTICA/almacen/al_salidam/al_salidam.vue'
import CrearEmpleadoComponent from '../components/HR-Planilla/empleado/empleado_crear/empleado_crear.vue'
import ModificarEmpleadoComponent from '../components/HR-Planilla/empleado/empleado_modificar/empleado_modificar.vue'

import CrearPOComponent from '../components/LO-LOGISTICA/orden_compra/po_crear/po_crear.vue'
import ModificarPOComponent from '../components/LO-LOGISTICA/orden_compra/po_modificar/po_modificar.vue'
import VisualizarPOComponent from '../components/LO-LOGISTICA/orden_compra/po_visualizar/po_visualizar.vue'
import ImprimirPOComponent from '../components/LO-LOGISTICA/orden_compra/po_imprimir/po_imprimir.vue'
import ViewAndEditPOComponent from '../components/LO-LOGISTICA/orden_compra/po_viewandedit/po_viewandedit.vue'
import AprobarPOComponent from '../components/LO-LOGISTICA/orden_compra/po_aprobacion/po_aprobacion.vue'
import AprobadorPRComponent from '../components/LO-LOGISTICA/requisicion/pr_aprobador/pr_aprobador.vue'
import AprobarSalidaComponent from '../components/LO-LOGISTICA/almacen/salida/al_salidaaprobar/al_salidaaprobar.vue'
import RecepcionBusquedaComponent from '../components/LO-LOGISTICA/almacen/al_recepcion_bienes/al_recepcion_busqueda/al_recepcion_busqueda.vue'
import RecepcionMaterialComponent from '../components/LO-LOGISTICA/almacen/al_recepcion_bienes/al_recepcion/al_recepcion.vue'
import DespachoSalidaComponent from '../components/LO-LOGISTICA/almacen/salida/al_salidadespacho/al_salidadespacho.vue'
import LibroDiarioDComponent from '../components/FI-FINANZAS/libros-balance/librodiario/librodiario.vue'
import BalanceCuentasComponent from '../components/FI-FINANZAS/libros-balance/balance-cuentas/balance-cuentas.vue'

import LibroRegistroComprasComponent from '../components/FI-FINANZAS/libros-balance/libroregistrocompras/libroregistrocompras.vue'
import CrearClaseMaterialComponent from '../components/LO-LOGISTICA/maestro_datos/almacen/clase_material/crear_clase_material/crear_clase_material.vue'
import ModificarClaseMaterialComponent from '../components/LO-LOGISTICA/maestro_datos/almacen/clase_material/modificar_clase_material/modificar_clase_material.vue'

import VisualizarClaseMaterialComponent from '../components/LO-LOGISTICA/maestro_datos/almacen/clase_material/visualizar_clase_material/visualizar_clase_material.vue'
import ModificarVisualizarClaseMaterialComponent from '../components/LO-LOGISTICA/maestro_datos/almacen/clase_material/modificar_visualizar_clase_material/modificar_visualizar_clase_material.vue'
import CrearImpuestoComponent from '../components/XX-CONFI/maestro_datos/impuesto/crear_impuesto/crear_impuesto.vue'
import ModificarImpuestoComponent from '../components/XX-CONFI/maestro_datos/impuesto/modif_impuesto/modif_impuesto.vue'
import VisualizarImpuestoComponent from '../components/XX-CONFI/maestro_datos/impuesto/visua_impuesto/visua_impuesto.vue'
import ViewAndEditImpuestoComponent from '../components/XX-CONFI/maestro_datos/impuesto/viewandedit_impuesto/viewandedit_i.vue'

import CrearTipoCambioComponent from '../components/XX-CONFI/maestro_datos/tipo_cambio/crear_tcambio/crear_tcambio.vue'
import ModificarTipoCambioComponent from '../components/XX-CONFI/maestro_datos/tipo_cambio/edit_tcambio/edit_tcambio.vue'
import VisualizarTipoCambioComponent from '../components/XX-CONFI/maestro_datos/tipo_cambio/visua_tcambio/visua_tcambio.vue'
import ViewAndEditTipoCambioComponent from '../components/XX-CONFI/maestro_datos/tipo_cambio/viewandedit_tcambio/viewandedit_t.vue'

import  CrearContabilidadComponent from '../components/FI-FINANZAS/contabilidad-general/crear-contabilidad/crear-contabilidad.vue';
import  CrearCuentaContableComponent from '../components/FI-FINANZAS/maestro-datos/contabilidad-general/crear-cuenta-contable/crear-cuenta-contable.vue';
import  CrearElementoGastoComponent from '../components/FI-FINANZAS/maestro-datos/contabilidad-general/elemento-gasto/crear-elemento-gasto/crear-elemento-gasto.vue';
import  CrearCentroCostosComponent from '../components/FI-FINANZAS/maestro-datos/centro-costos/crear-centro-costos/crear-centro-costos.vue';
import  VisualizarModificarContabilidadComponent from '../components/FI-FINANZAS/contabilidad-general/visualizar-modificar-contabilidad/visualizar-modificar-contabilidad.vue';
import  ModificarContabilidadComponent from '../components/FI-FINANZAS/contabilidad-general/modificar-contabilidad/modificar-contabilidad.vue';
import  VisualizarContabilidadComponent from '../components/FI-FINANZAS/contabilidad-general/visualizar-contabilidad/visualizar-contabilidad.vue'
import  AprobarContabilidadComponent from '../components/FI-FINANZAS/contabilidad-general/aprobar-contabilidad/aprobar-contabilidad.vue';
import  CrearBancoComponent from '../components/FI-FINANZAS/maestro-datos/tesoreria/bancos/crear-banco/crear-banco.vue';
import  VisualizarModificarBancoComponent from '../components/FI-FINANZAS/maestro-datos/tesoreria/bancos/visualizar-modificar-banco/visualizar-modificar-banco.vue';
import  VisualizarBancoComponent from '../components/FI-FINANZAS/maestro-datos/tesoreria/bancos/visualizar-banco/visualizar-banco.vue';
import  ModificarBancoComponent from '../components/FI-FINANZAS/maestro-datos/tesoreria/bancos/modificar-banco/modificar-banco.vue';
import ModificarGrupoCuentaContableComponent from '../components/FI-FINANZAS/maestro-datos/contabilidad-general/grupo-cuenta-contable/modificar-grupo-cuenta-contable/modificar-grupo-cuenta-contable.vue';
import CrearGrupoCuentaContableComponent from '../components/FI-FINANZAS/maestro-datos/contabilidad-general/grupo-cuenta-contable/crear-grupo-cuenta-contable/crear-grupo-cuenta-contable.vue';
import VisualizarModificarGrupoCuentaContableComponent from '../components/FI-FINANZAS/maestro-datos/contabilidad-general/grupo-cuenta-contable/visualizar-modificar-grupo-cuenta-contable/visualizar-modificar-grupo-cuenta-contable.vue';
import VisualizarGrupoCuentaContableComponent from '../components/FI-FINANZAS/maestro-datos/contabilidad-general/grupo-cuenta-contable/visualizar-grupo-cuenta-contable/visualizar-grupo-cuenta-contable.vue';
import CrearCostitemComponent from '../components/FI-FINANZAS/maestro-datos/contabilidad-general/costitem/crear-costitem/crear-costitem.vue';
import VisualizarModificarCostitemComponent from '../components/FI-FINANZAS/maestro-datos/contabilidad-general/costitem/visualizar-modificar-costitem/visualizar-modificar-costitem.vue';
import ModificarCostitemComponent from '../components/FI-FINANZAS/maestro-datos/contabilidad-general/costitem/modificar-costitem/modificar-costitem.vue';
import VisualizarCostitemComponent from '../components/FI-FINANZAS/maestro-datos/contabilidad-general/costitem/visualizar-costitem/visualizar-costitem.vue';

import CrearPeriodoComponent from '@/components/XX-CONFI/maestro_datos/periodo/crear_periodo/crear_periodo.vue'
import ModificarPeriodoComponent from '@/components/XX-CONFI/maestro_datos/periodo/edit_periodo/edit_periodo.vue'

import CrearCriticidadComponent from '@/components/XX-CONFI/maestro_datos/criticidad/crear_criticidad/crear_criticidad.vue'
import ModificarCriticidadComponent from '@/components/XX-CONFI/maestro_datos/criticidad/modif_criticidad/modif_criticidad.vue'
import ViewandEditCriticidadComponent from '@/components/XX-CONFI/maestro_datos/criticidad/viewandedit_criticidad/viewandedit_criticidad.vue'
import ViewCriticidadComponent from '@/components/XX-CONFI/maestro_datos/criticidad/visu_criticidad/visu_criticidad.vue'
import VisualGrupoCompradorComponent from '@/components/XX-CONFI/maestro_datos/grupo_comprador/visu_grupo_comprador/visu_grupo_comprador.vue'
import ViewAndEditGrupoCompradorComponent from '@/components/XX-CONFI/maestro_datos/grupo_comprador/viewandedit_grupo_comprador/viewandedit_grupo_comprador.vue'
import CrearGrupoCompradorComponent from '@/components/XX-CONFI/maestro_datos/grupo_comprador/crear_grupo_comprador/crear_grupo_comprador.vue'
import ModificarGrupoCompradorComponent from '@/components/XX-CONFI/maestro_datos/grupo_comprador/modif_grupo_comprador/modif_grupo_comprador.vue'

import ModificarCategoriaLineaComponent from '@/components/XX-CONFI/maestro_datos/categoria_linea/modif_categoria_linea/modif_categoria_linea.vue'
import CrearCategoriaLineaComponent from '@/components/XX-CONFI/maestro_datos/categoria_linea/crear_categoria_linea/crear_categoria_linea.vue'
import ViewAndEditCategoriaLineaComponent from '@/components/XX-CONFI/maestro_datos/categoria_linea/viewandedit_categoria_linea/viewandedit_categoria_linea.vue'
import VisuCategoriaLineaComponent from '@/components/XX-CONFI/maestro_datos/categoria_linea/visu_categoria_linea/visu_categoria_linea.vue'

import CrearTipoMovimientoComponent from '@/components/XX-CONFI/maestro_datos/tipo_movimiento/crear_tipo_movimiento/crear_tipo_movimiento.vue'
import ModificarTipoMovimientoComponent from '@/components/XX-CONFI/maestro_datos/tipo_movimiento/modif_tipo_movimiento/modif_tipo_movimiento.vue'
import ViewAndEditTipoMovimientoComponent from '@/components/XX-CONFI/maestro_datos/tipo_movimiento/viewandedit_tipo_movimiento/viewandedit_tipo_movimiento.vue'
import VisuTipoMovimientoComponent from '@/components/XX-CONFI/maestro_datos/tipo_movimiento/visu_tipo_movimiento/visu_tipo_movimiento.vue'

import VisuDocumentoTransaccionComponent from '@/components/XX-CONFI/maestro_datos/documento_transaccion/visu_documento_transaccion/visu_documento_transaccion.vue'
import ViewAndEditDocumentoTransaccionComponent from '@/components/XX-CONFI/maestro_datos/documento_transaccion/viewandedit_documento_transaccion/viewandedit_documento_transaccion.vue'
import ModificarDocumentoTransaccionComponent from '@/components/XX-CONFI/maestro_datos/documento_transaccion/modif_documento_transaccion/modif_documento_transaccion.vue'
import CrearDocumentoTransaccionComponent from '@/components/XX-CONFI/maestro_datos/documento_transaccion/crear_documento_transaccion/crear_documento_transaccion.vue'

import CrearCorrelativoComponent from '@/components/XX-CONFI/maestro_datos/correlativo/crear_correlativo/crear_correlativo.vue'
import ModificarCorrelativoComponent from '@/components/XX-CONFI/maestro_datos/correlativo/modif_correlativo/modif_correlativo.vue'
import ViewAndEditCorrelativoComponent from '@/components/XX-CONFI/maestro_datos/correlativo/viewandedit_correlativo/viewandedit_correlativo.vue'
import VisuCorrelativoComponent from '@/components/XX-CONFI/maestro_datos/correlativo/visu_correlativo/visu_correlativo.vue'

import CrearRegionComponent from '@/components/XX-CONFI/maestro_datos/region/crear_region/crear_region.vue'
import ModificarRegionComponent from '@/components/XX-CONFI/maestro_datos/region/modif_region/modif_region.vue'
import ViewAndEditRegionComponent from '@/components/XX-CONFI/maestro_datos/region/viewandedit_region/viewandedit_region.vue'
import VisuRegionComponent from '@/components/XX-CONFI/maestro_datos/region/visu_region/visu_region.vue'

import VisuCompaniaComponent from '@/components/XX-CONFI/maestro_datos/compania/visu_compania/visu_compania.vue'
import ViewAndEditCompaniaComponent from '@/components/XX-CONFI/maestro_datos/compania/viewandedit_compania/viewandedit_compania.vue'
import ModificarCompaniaComponent from '@/components/XX-CONFI/maestro_datos/compania/modif_compania/modif_compania.vue'
import CrearCompaniaComponent from '@/components/XX-CONFI/maestro_datos/compania/crear_compania/crear_compania.vue'

export default [
 
  {
    path: '/barmenu',
    component: Barmenu,
    name: 'Barmenu',
    children:[
      {
      path: 'FI-FINANZAS',
      component:CrearIngresoComprobanteComponent,
      children:[
        {
        path:'ingreso-comprobante',
        component:CrearIngresoComprobanteComponent,
        children:[{
          path:'crear-ingreso-comprobante',
          component:CrearIngresoComprobanteComponent,
          name:'crear-ingreso-comprobante'
        }]
      }
    ]
      },
      {
        path: 'inicio',
        component: Inicio,
        name: 'Inicio',
      },  
      // {
      //   path:'FI-FINANZAS/proveedor/crear-proveedor',
      //   component:CrearProveedorComponent,
      //   name:'crear-proveedor'
      // }, 
      {
        path:'FI-FINANZAS/maestro-datos/tesoreria/bancos/crear-banco',
        component:CrearBancoComponent,
        name:'crear-banco'
      }, 
      {
        path:'FI-FINANZAS/maestro-datos/tesoreria/bancos/visualizar-modificar-banco',
        component:VisualizarModificarBancoComponent,
        name:'visualizar-modificar-banco'
      }, 
      {
        path:'FI-FINANZAS/maestro-datos/tesoreria/bancos/visualizar-banco',
        component:VisualizarBancoComponent,
        name:'visualizar-banco'
      }, 
      {
        path:'FI-FINANZAS/maestro-datos/tesoreria/bancos/modificar-banco/modificar-banco',
        component:ModificarBancoComponent,
        name:'modificar-banco'
      }, 
      {
        path:'FI-FINANZAS/contabilidad-general/crear-contabilidad',
        component:CrearContabilidadComponent,
        name:'crear-contabilidad'
      }, 
      {
        path:'FI-FINANZAS/contabilidad-general/modificar-contabilidad',
        component:ModificarContabilidadComponent,
        name:'modifica-contabilidad'
      }, 
      {
        path:'FI-FINANZAS/maestro-datos/contabilidad-general/grupo-cuenta-contable/visualizar-modificar-grupo-cuenta-contable',
        component:VisualizarModificarGrupoCuentaContableComponent,
        name:'visualizar y modificar-grupo-contabilidad'
      },  
      {
        path:'FI-FINANZAS/maestro-datos/contabilidad-general/grupo-cuenta-contable/visualizar-grupo-cuenta-contable',
        component:VisualizarGrupoCuentaContableComponent,
        name:'visualizar-grupo-contabilidad'
      },  
      {
        path:'FI-FINANZAS/maestro-datos/contabilidad-general/costitem/crear-costitem',
        component:CrearCostitemComponent,
        name:'crear-costitem'
      },  
      
      {
        path:'FI-FINANZAS/maestro-datos/contabilidad-general/costitem/visualizar-modificar-costitem',
        component:VisualizarModificarCostitemComponent,
        name:'VisualizarModificarCostitemComponent'
      },  
      {
        path:'FI-FINANZAS/maestro-datos/contabilidad-general/costitem/modificar-costitem',
        component:ModificarCostitemComponent,
        name:'ModificarCostitemComponent'
      },  
      
      {
        path:'FI-FINANZAS/maestro-datos/contabilidad-general/costitem/visualizar-costitem',
        component:VisualizarCostitemComponent,
        name:'VisualizarCostitemComponent'
      },  
      

      {
        path:'FI-FINANZAS/maestro-datos/contabilidad-general/grupo-cuenta-contable/modificar-grupo-cuenta-contable',
        component:ModificarGrupoCuentaContableComponent,
        name:'modificar-contabilidad'
      }, 
      {
        path:'FI-FINANZAS/maestro-datos/contabilidad-general/grupo-cuenta-contable/crear-grupo-cuenta-contable',
        component:CrearGrupoCuentaContableComponent,
        name:'crear-grupo-cuenta-contabilidad'
      }, 
      {
        path:'FI-FINANZAS/contabilidad-general/visualizar-modificar-contabilidad',
        component:VisualizarModificarContabilidadComponent,
        name:'visualizar-modificar-contabilidad'
      }, 
      {
        path:'FI-FINANZAS/contabilidad-general/aprobar-contabilidad',
        component:AprobarContabilidadComponent,
        name:'aprobar-contabilidad'
      }, 
      {
        path:'FI-FINANZAS/contabilidad-general/visualizar-contabilidad',
        component:VisualizarContabilidadComponent,
        name:'visualizar-contabilidad'
      }, 
      // {
      //   path:'FI-FINANZAS/proveedor/modificar-proveedor',
      //   component:ModificarProveedorComponent,
      //   name:'modificar-proveedor'
      // },
      {
        path:'FI-FINANZAS/libros-balance/librodiario',
        component:LibroDiarioDComponent,
        name:'libro-diario'
      },
      {
        path:'FI-FINANZAS/libros-balance/balance-cuentas',
        component:BalanceCuentasComponent,
        name:'balance-cuentas'
      },
      {
        path:'FI-FINANZAS/libros-balance/libroregistrocompras',
        component:LibroRegistroComprasComponent,
        name:'libro-registro-compras'
      },
      {
        path:'FI-FINANZAS/proveedor/crear-proveedor',
        component:CrearProveedorComponent,
        name:'crear-proveedor'
      }, 
      {
        path:'FI-FINANZAS/proveedor/modificar-proveedor',
        component:ModificarProveedorComponent,
        name:'modificar-proveedor'
      },
      {
        path:'FI-FINANZAS/proveedor/visualizar-proveedor',
        component:VisualizarProveedorComponent,
        name:'visualizar-proveedor'
      }, 
      {
        path:'FI-FINANZAS/proveedor/ViewAndEdit-proveedor',
        component:ViewAndEditProveedorComponent,
        name:'ViewAndEdit-proveedor'
      }, 
      {
        path:'FI-FINANZAS/maestro-datos/cuentas-cobrar/crear-cliente',
        component:CrearClienteComponent,
        name:'crear-cliente'
      }, 
      {
        path:'FI-FINANZAS/maestro-datos/cuentas-cobrar/edit-cliente',
        component:ModificarClienteComponent,
        name:'modificar-cliente'
      },
      {
        path:'FI-FINANZAS/maestro-datos/cuentas-cobrar/view-cliente',
        component:VisualizarClienteComponent,
        name:'visualizar-cliente'
      }, 
      {
        path:'FI-FINANZAS/maestro-datos/cuentas-cobrar/viewandedit-cliente',
        component:ViewAndEditClienteComponent,
        name:'ViewAndEdit-cliente'
      }, 
      {
        path:'HR-Planilla/empleado/empleado_crear',
        component:CrearEmpleadoComponent,
        name:'empleado_crear'
      }, 
      {
        path:'HR-Planilla/empleado/empleado_modificar',
        component:ModificarEmpleadoComponent,
        name:'empleado_modificar'
      }, 
      {
        path:'FI-FINANZAS/maestro-datos/contabilidad-general/visualizar_modificar_cuenta_contable',
        component:VisualizarModificarCuentaContableComponent,
        name:'visualizar-modificar-cuenta-contable'
      },
      
      {
        path:'FI-FINANZAS/maestro-datos/contabilidad-general/elemento-gasto/visualizar_modificar-elemento-gasto',
        component:VisualizarModificarElementoGastoComponent,
        name:'visualizar-modificar-elemento-gasto'
      },
      {
        path:'FI-FINANZAS/maestro-datos/contabilidad-general/elemento-gasto/visualizar-elemento-gasto',
        component:VisualizarElementoGastoComponent,
        name:'visualizar-elemento-gasto'
      },
      {
        path:'FI-FINANZAS/maestro-datos/centro-costos/visualizar_modificar_centro_costos',
        component:VisualizarModificarCentroCostosComponent,
        name:'visualizar-modificar-centro-costos'
      }, 
      
      {
        path:'FI-FINANZAS/maestro-datos/centro-costos/modificar_centro_costos',
        component:ModificarCentroCostosComponent,
        name:'modificar-centro-costos'
      }, 
      
      {
        path:'FI-FINANZAS/maestro-datos/centro-costos/visualizar_centro_costos',
        component:VisualizarCentroCostosComponent,
        name:'visualizar-centro-costos'
      }, 
      {
        path:'FI-FINANZAS/maestro-datos/contabilidad-general/visualizar_cuenta_contable',
        component:VisualizarCuentaContableComponent,
        name:'visualizar-cuenta-contable'
      }, 
      {
        path:'FI-FINANZAS/maestro-datos/contabilidad-general/modificar_cuenta_contable',
        component:ModificarCuentaContableComponent,
        name:'modificar-cuenta-contable'
      }, 
      {
        path:'FI-FINANZAS/maestro-datos/contabilidad-general/elemento-gasto/modificar-elemento-gasto',
        component:ModificarElementoGastoComponent,
        name:'modificar-elemento-gasto'
      },
      {
        path:'FI-FINANZAS/maestro-datos/contabilidad-general/crear-cuenta-contable',
        component:CrearCuentaContableComponent,
        name:'crear-cuenta-contable'
      }, 
      
      {
        path:'FI-FINANZAS/maestro-datos/contabilidad-general/elemento-gasto/crear-elemento-gasto',
        component:CrearElementoGastoComponent,
        name:'crear-elemento-gasto'
      }, 
      
      
      {
        path:'FI-FINANZAS/maestro-datos/centro-costos/crear-centro-costos',
        component:CrearCentroCostosComponent,
        name:'crear-centro-costos'
      }, 
      
      {
        path:'LO-LOGISTICA/orden_compra/po_crear',
        component:CrearPOComponent,
        name:'crear-po'
      }, 
      {
        path:'LO-LOGISTICA/maestro_datos/almacen/clase_material/crear_clase_material',
        component:CrearClaseMaterialComponent,
        name:'crear_clase_material'
      },
       
      {
        path:'LO-LOGISTICA/maestro_datos/almacen/clase_material/modificar_clase_material',
        component:ModificarClaseMaterialComponent,
        name:'modificar_clase_material'
      }, 
      {
        path:'LO-LOGISTICA/maestro_datos/almacen/clase_material/visualizar_clase_material',
        component:VisualizarClaseMaterialComponent,
        name:'visualizar_clase_material'
      },
      {
        path:'LO-LOGISTICA/maestro_datos/almacen/clase_material/modificar_visualizar_clase_material',
        component:ModificarVisualizarClaseMaterialComponent,
        name:'ModificarVisualizar_clase_material'
      },
      {
        path:'XX-CONFI/maestro_datos/tipo_cambio/crear_tcambio',
        component:CrearTipoCambioComponent,
        name:'crear-tipo-cambio'
      }, 
      {
        path:'XX-CONFI/maestro_datos/correlativo/crear_correlativo',
        component:CrearCorrelativoComponent,
        name:'crear-correlativo'
      }, 
      
      {
        path:'XX-CONFI/maestro_datos/correlativo/modif_correlativo',
        component:ModificarCorrelativoComponent,
        name:'modif-correlativo'
      }, 
      
      {
        path:'XX-CONFI/maestro_datos/correlativo/viewandedit_correlativo',
        component:ViewAndEditCorrelativoComponent,
        name:'view-and-edit-correlativo'
      }, 
      
      {
        path:'XX-CONFI/maestro_datos/correlativo/visu_correlativo',
        component:VisuCorrelativoComponent,
        name:'visu-correlativo'
      }, 

      {
        path:'XX-CONFI/maestro_datos/region/crear_region',
        component:CrearRegionComponent,
        name:'crear-region'
      }, 

      {
        path:'XX-CONFI/maestro_datos/region/modif_region',
        component:ModificarRegionComponent,
        name:'modif-region'
      }, 

      {
        path:'XX-CONFI/maestro_datos/region/viewandedit_region',
        component:ViewAndEditRegionComponent,
        name:'view-and-edit-region'
      }, 

      {
        path:'XX-CONFI/maestro_datos/region/visu_region',
        component:VisuRegionComponent,
        name:'visu-region'
      }, 
      {
        path:'XX-CONFI/maestro_datos/compania/visu_compania',
        component:VisuCompaniaComponent,
        name:'crear-region'
      }, 

      {
        path:'XX-CONFI/maestro_datos/compania/viewandedit_compania',
        component:ViewAndEditCompaniaComponent,
        name:'modif-region'
      }, 

      {
        path:'XX-CONFI/maestro_datos/compania/modif_compania',
        component:ModificarCompaniaComponent,
        name:'view-and-edit-region'
      }, 

      {
        path:'XX-CONFI/maestro_datos/compania/crear_compania',
        component:CrearCompaniaComponent,
        name:'visu-region'
      }, 
      {
        path:'XX-CONFI/maestro_datos/tipo_movimiento/crear_tipo_movimiento',
        component:CrearTipoMovimientoComponent,
        name:'crear-tipo-movimiento'
      }, 
      {
        path:'XX-CONFI/maestro_datos/tipo_movimiento/modif_tipo_movimiento',
        component:ModificarTipoMovimientoComponent,
        name:'modificar-tipo-movimiento'
      }, 
      {
        path:'XX-CONFI/maestro_datos/tipo_movimiento/viewandedit_tipo_movimiento',
        component:ViewAndEditTipoMovimientoComponent,
        name:'viewandedit-tipo-movimiento'
      }, 
      {
        path:'XX-CONFI/maestro_datos/tipo_movimiento/visu_tipo_movimiento',
        component:VisuTipoMovimientoComponent,
        name:'visu-tipo-movimiento'
      }, 

      
      {
        path:'XX-CONFI/maestro_datos/documento_transaccion/visu_documento_transaccion',
        component:VisuDocumentoTransaccionComponent,
        name:'VisuDocumentoTransaccionComponent'
      }, 
      {
        path:'XX-CONFI/maestro_datos/documento_transaccion/viewandedit_documento_transaccion',
        component:ViewAndEditDocumentoTransaccionComponent,
        name:'ViewAndEditDocumentoTransaccionComponent'
      }, 
      {
        path:'XX-CONFI/maestro_datos/documento_transaccion/modif_documento_transaccion',
        component:ModificarDocumentoTransaccionComponent,
        name:'ModificarDocumentoTransaccionComponent'
      }, 
      {
        path:'XX-CONFI/maestro_datos/documento_transaccion/crear_documento_transaccion',
        component:CrearDocumentoTransaccionComponent,
        name:'CrearDocumentoTransaccionComponent'
      }, 
      {
        path:'XX-CONFI/maestro_datos/tipo_cambio/edit_tcambio',
        component:ModificarTipoCambioComponent,
        name:'modificars-tipo-cambio'
      }, 
      {
        path:'XX-CONFI/maestro_datos/grupo_comprador/visu_grupo_comprador',
        component:VisualGrupoCompradorComponent,
        name:'visualizar_grupo_comprador'
      }, 
      {
        path:'XX-CONFI/maestro_datos/grupo_comprador/viewandedit_grupo_comprador',
        component:ViewAndEditGrupoCompradorComponent,
        name:'visualizar_modifica_grupo_comprador'
      }, 

      {
        path:'XX-CONFI/maestro_datos/categoria_linea/modif_categoria_linea',
        component:ModificarCategoriaLineaComponent,
        name:'modificar_categoria_linea'
      }, 
      {
        path:'XX-CONFI/maestro_datos/categoria_linea/crear_categoria_linea',
        component:CrearCategoriaLineaComponent,
        name:'crear_categoria_linea'
      }, 
      {
        path:'XX-CONFI/maestro_datos/categoria_linea/viewandedit_categoria_linea',
        component:ViewAndEditCategoriaLineaComponent,
        name:'visualizar-edit-categoria-linea'
      }, 
      {
        path:'XX-CONFI/maestro_datos/categoria_linea/visu_categoria_linea',
        component:VisuCategoriaLineaComponent,
        name:'viewandedit-categoria-linea'
      },       


      {
        path:'XX-CONFI/maestro_datos/grupo_comprador/crear_grupo_comprador',
        component:CrearGrupoCompradorComponent,
        name:'crear_grupo_comprador'
      }, 
      {
        path:'XX-CONFI/maestro_datos/grupo_comprador/modif_grupo_comprador',
        component:ModificarGrupoCompradorComponent,
        name:'modificar_grupo_comprador'
      }, 
      {
        path:'XX-CONFI/maestro_datos/tipo_cambio/visua_tcambio',
        component:VisualizarTipoCambioComponent,
        name:'visualizar-tipo-cambio'
      }, 
      {
        path:'XX-CONFI/maestro_datos/tipo_cambio/viewandedit_t',
        component:ViewAndEditTipoCambioComponent,
        name:'viewandedit-tipo-cambio'
      }, 
      {
        path:'XX-CONFI/maestro_datos/periodo/crear_periodo/crear_periodo',
        component:CrearPeriodoComponent,
        name:'crear-periodo'
      }, 
      {
        path:'XX-CONFI/maestro_datos/periodo/edit_periodo/edit_periodo',
        component:ModificarPeriodoComponent,
        name:'modificar-periodo'
      }, 
      {
        path:'XX-CONFI/maestro_datos/impuesto/crear_impuesto/crear_impuesto',
        component:CrearImpuestoComponent,
        name:'crear-impuesto'
      }, 
      {
        path:'XX-CONFI/maestro_datos/impuesto/modif_impuesto/modif_impuesto',
        component:ModificarImpuestoComponent,
        name:'modificar-impuesto'
      }, 
      {
        path:'XX-CONFI/maestro_datos/impuesto/visua_impuesto',
        component:VisualizarImpuestoComponent,
        name:'visualizar-impuesto'
      }, 
      {
        path:'XX-CONFI/maestro_datos/impuesto/viewandedit_impuesto',
        component:ViewAndEditImpuestoComponent,
        name:'viewandedit-impuesto'
      }, 
      {
        path:'XX-CONFI/maestro_datos/criticidad/crear_criticidad',
        component: CrearCriticidadComponent,
        name:'crear-criticidad'
      }, 
      {
        path:'XX-CONFI/maestro_datos/criticidad/modif_criticidad',
        component:ModificarCriticidadComponent,
        name:'modificar-criticidad'
      }, 
      
      {
        path:'XX-CONFI/maestro_datos/criticidad/viewandedit_criticidad',
        component: ViewandEditCriticidadComponent,
        name:'viewmodificar-criticidad'
      }, 
      {
        path:'XX-CONFI/maestro_datos/criticidad/visu_criticidad',
        component:ViewCriticidadComponent,
        name:'visu-criticidad'
      }, 
      {
        path:'LO-LOGISTICA/orden_compra/po_modificar',
        component:ModificarPOComponent,
        name:'modificar-po'
      }, 
      {
        path:'LO-LOGISTICA/orden_compra/po_visualizar',
        component:VisualizarPOComponent,
        name:'visualizar-po'
      }, 
      {
        path:'LO-LOGISTICA/orden_compra/po_imprimir',
        component:ImprimirPOComponent,
        name:'imprimir-po'
      }, 
      {
        path:'LO-LOGISTICA/orden_compra/po_viewandedit',
        component:ViewAndEditPOComponent,
        name:'viewandedit-po'
      }, 
      {
        path:'LO-LOGISTICA/HES/crear-hes',
        component:CrearHesComponent,
        name:'crear-hes'
      },  
      {
        path:'LO-LOGISTICA/HES/aprobar-hes',
        component:AprobarHesComponent,
        name:'aprobar-hes'
      },  
      {
        path:'LO-LOGISTICA/HES/view-hes',
        component:ViewHesComponent,
        name:'view-hes'
      },  
      {
        path:'LO-LOGISTICA/HES/edit-hes',
        component:EditHesComponent,
        name:'edit-hes'
      },  
      {
        path:'LO-LOGISTICA/HES/viewandedit_hes',
        component:ViewAndEditHesComponent,
        name:'viewandedit-hes'
      },  
      
      {
        path:'LO-LOGISTICA/almacen/al_crear',
        component:CrearMaterialComponent,
        name:'almacen_crear'
      }, 
      {
        path:'LO-LOGISTICA/almacen/al_visualizar',
        component:VisualizarMaterialComponent,
        name:'almacen_visualizar'
      }, 
      {
        path:'LO-LOGISTICA/almacen/al_visualizar_modificar',
        component:VisualizarModificarMaterialComponent,
        name:'almacen_visualizar_modificar'
      },
      {
        path:'LO-LOGISTICA/almacen/al_salida_visualizar',
        component:VisualizarSalidaMaterialComponent,
        name:'al_salida_visualizar'
      },
      {
        path:'LO-LOGISTICA/almacen/al_salida_visualizar_modificar',
        component:VisualizarSalidaModificarMaterialComponent,
        name:'al_salida_visualizar_modificar'
      },
      {
        path:'LO-LOGISTICA/almacen/salida/al_salidaaprobar',
        component:AprobarSalidaComponent,
        name:'al_salidaaprobar'
      },
      {
        path:'LO-LOGISTICA/almacen/salida/al_salidadespacho',
        component:DespachoSalidaComponent,
        name:'al_salidadespacho'
      },
      
      {
        path:'LO-LOGISTICA/almacen/al_recepcion_bienes/al_recepcion_busqueda',
        component:RecepcionBusquedaComponent,
        name:'al_recepcion_busqueda'
      },
      {
        path:'LO-LOGISTICA/almacen/al_recepcion_bienes/al_recepcion',
        component:RecepcionMaterialComponent,
        name:'al_recepcion'
      },
      {
        path:'LO-LOGISTICA/almacen/al_modificar',
        component:ModificarMaterialComponent,
        name:'almacen_modificar'
      },
      {
        path:'LO-LOGISTICA/orden_compra/po_aprobacion',
        component:AprobarPOComponent,
        name:'po_aprobacion'
      },
      {
        path:'LO-LOGISTICA/orden_compra/po_modificar',
        component:ModificarPOComponent,
        name:'po_modificar'
      },
      {
        path:'LO-LOGISTICA/almacen/al_salidam',
        component:ModificarSalidaMaterialComponent,
        name:'al_salidam'
      },
      {
        path:'LO-LOGISTICA/requisicion/pr_crear',
        component:CrearPRComponent,
        name:'requisicion_crear'
      }, 
      {
        path:'LO-LOGISTICA/requisicion/pr_modificar',
        component:ModificarPRComponent,
        name:'requisicion_modificar'
      }, 
      {
        path:'LO-LOGISTICA/requisicion/pr_aprobador',
        component:AprobadorPRComponent,
        name:'requisicion_aprobador'
      }, 
      {
        path:'LO-LOGISTICA/requisicion/pr_visualizar',
        component:VisualizarPRComponent,
        name:'pr_visualizar'
      }, 
      {
        path:'LO-LOGISTICA/requisicion/pr_visualizar_modificar',
        component:VisualizarModificarPRComponent,
        name:'pr_visualizar_modificar'
      }, 
      {
        path:'LO-LOGISTICA/almacen/al_salida',
        component:CrearSalidaAlmacenComponent,
        name:'salida_almacen'
      },  
      {
        path:'FI-FINANZAS/ingreso-comprobante/modificar-ingreso-comprobante',
        component:ModificarIngresoComprobanteComponent,
        name:'modificar-ingreso'
      },    
      {
        path:'FI-FINANZAS/ingreso-comprobante/ver-ingreso-comprobante',
        component:VisualizarIngresoComprobanteComponent,
        name:'visualizar-ingreso'
      },    
      {
        path:'FI-FINANZAS/ingreso-comprobante/viewandedit_ic',
        component:ViewAndEditICComponent,
        name:'viewandedit-ingreso'
      },      
      {
        path:'FI-FINANZAS/Tesoreria/create_pagos/pagos_individual',
        component:PagosIndividualesComponent,
        name:'create-pagos'
      },    
      {
        path:'FI-FINANZAS/Tesoreria/edit_pagos/edit_pagos',
        component:ModificarPagosComponent,
        name:'edit-pagos'
      },    
      {
        path:'FI-FINANZAS/Tesoreria/view_pagos/view_pagos',
        component:VisualizarPagosComponent,
        name:'view-pagos'
      },    
      {
        path:'FI-FINANZAS/Tesoreria/aprobar_pagos/aprobar_pagos',
        component:AprobarPagosComponent,
        name:'aprobar-pagos'
      },    
      {
        path:'FI-FINANZAS/Tesoreria/viewandedit_pagos/viewandedit_pagos',
        component:ViewAndEditPagosComponent,
        name:'viewandedit-pagos'
      },    
      {
        path:'usuario',
        component:UsuarioComponent,
        name:'usuario'
      },
      {
        path:'log',
        component:LogComponent,
        name:'log'
      },
    ]

  },

  {
    path: '/',
    component: Login,
    name: 'Login',
  },




];
