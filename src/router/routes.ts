import Inicio from '@/components/inicio/inicio.vue'
import Slider from '@/components/slider/slider.vue'
import Login from '@/components/login/login.vue'
import Barmenu from '@/components/barmenu/barmenu.vue'
import TopMenu from '@/components/customs/top-menu/TopMenu.vue';
import HeaderbuttosComponent from '@/components/views/reusables/headerbuttos/headerbuttos.vue';
import UsuarioComponent from '@/components/usuario/usuario.vue'
import LogComponent from '@/components/log/log.vue'
import RunComponent from '../components/FI-FINANZAS/Tesoreria/run/run.vue'
import PagosIndividualesComponent from '../components/FI-FINANZAS/Tesoreria/pagos_individual.vue'
import PagosMasivoComponent from '../components/FI-FINANZAS/Tesoreria/pagos_masivo.vue'
import CrearPRComponent from '../components/LO-LOGISTICA/requisicion/pr_crear/pr_crear.vue'
import CrearProveedorComponent from '../components/FI-FINANZAS/proveedor/crear-proveedor/crear-proveedor.vue'
import CrearHesComponent from '@/components/LO-LOGISTICA/HES/crear-hes/crear-hes.vue'
import EditHesComponent from '@/components/LO-LOGISTICA/HES/edit-hes/edit-hes.vue'
import ViewHesComponent from '@/components/LO-LOGISTICA/HES/view-hes/view-hes.vue'
import AprobarHesComponent from '@/components/LO-LOGISTICA/HES/aprobar-hes/aprobar-hes.vue'
import ModificarPRComponent from '../components/LO-LOGISTICA/requisicion/pr_modificar/pr_modificar.vue'
import VisualizarPRComponent from '../components/LO-LOGISTICA/requisicion/pr_visualizar/pr_visualizar.vue'
import VisualizarModificarPRComponent from '../components/LO-LOGISTICA/requisicion/pr_visualizar_modificar/pr_visualizar_modificar.vue'
import ModificarProveedorComponent from '../components/FI-FINANZAS/proveedor/modificar-proveedor/modificar-proveedor.vue'
import VisualizarProveedorComponent from '../components/FI-FINANZAS/proveedor/visualizar-proveedor/visualizar-proveedor.vue'
import ViewAndEditProveedorComponent from '../components/FI-FINANZAS/proveedor/ViewAndEdit-proveedor/ViewAndEdit-proveedor.vue'
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

import VisualizarCentroCostosComponent from '../components/FI-FINANZAS/maestro-datos/centro-costos/visualizar_centro_costos/visualizar_centro_costos.vue';
import VisualizarModificarCentroCostosComponent from '../components/FI-FINANZAS/maestro-datos/centro-costos/visualizar_modificar_centro_costos/visualizar_modificar_centro_costos.vue';
import ModificarCentroCostosComponent from '../components/FI-FINANZAS/maestro-datos/centro-costos/modificar_centro_costos/modificar_centro_costos.vue';

import ModificarCuentaContableComponent from '../components/FI-FINANZAS/maestro-datos/contabilidad-general/modificar_cuenta_contable/modificar_cuenta_contable.vue';
import ModificarSalidaMaterialComponent from '../components/LO-LOGISTICA/almacen/al_salidam/al_salidam.vue'
import CrearEmpleadoComponent from '../components/HR-Planilla/empleado/empleado_crear/empleado_crear.vue'
import ModificarEmpleadoComponent from '../components/HR-Planilla/empleado/empleado_modificar/empleado_modificar.vue'

import CrearPOComponent from '../components/LO-LOGISTICA/orden_compra/po_crear/po_crear.vue'
import ModificarPOComponent from '../components/LO-LOGISTICA/orden_compra/po_modificar/po_modificar.vue'
import VisualizarPOComponent from '../components/LO-LOGISTICA/orden_compra/po_visualizar/po_visualizar.vue'
import ViewAndEditPOComponent from '../components/LO-LOGISTICA/orden_compra/po_viewandedit/po_viewandedit.vue'
import AprobarPOComponent from '../components/LO-LOGISTICA/orden_compra/po_aprobacion/po_aprobacion.vue'
import AprobadorPRComponent from '../components/LO-LOGISTICA/requisicion/pr_aprobador/pr_aprobador.vue'
import AprobarSalidaComponent from '../components/LO-LOGISTICA/almacen/salida/al_salidaaprobar/al_salidaaprobar.vue'
import RecepcionBusquedaComponent from '../components/LO-LOGISTICA/almacen/al_recepcion_bienes/al_recepcion_busqueda/al_recepcion_busqueda.vue'
import RecepcionMaterialComponent from '../components/LO-LOGISTICA/almacen/al_recepcion_bienes/al_recepcion/al_recepcion.vue'
import DespachoSalidaComponent from '../components/LO-LOGISTICA/almacen/salida/al_salidadespacho/al_salidadespacho.vue'
import LibroDiarioDComponent from '../components/FI-FINANZAS/libros-balance/librodiario/librodiario.vue'
import LibroRegistroComprasComponent from '../components/FI-FINANZAS/libros-balance/libroregistrocompras/libroregistrocompras.vue'
import CrearClaseMaterialComponent from '../components/LO-LOGISTICA/maestro_datos/almacen/clase_material/crear_clase_material/crear_clase_material.vue'
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

import  CrearCuentaContableComponent from '../components/FI-FINANZAS/maestro-datos/contabilidad-general/crear-cuenta-contable/crear-cuenta-contable.vue';
import  CrearCentroCostosComponent from '../components/FI-FINANZAS/maestro-datos/centro-costos/crear-centro-costos/crear-centro-costos.vue';
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
        path:'FI-FINANZAS/libros-balance/librodiario',
        component:LibroDiarioDComponent,
        name:'libro-diario'
      },
      {
        path:'FI-FINANZAS/libros-balance/libroregistrocompras',
        component:LibroRegistroComprasComponent,
        name:'libro-registro-compras'
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
        path:'FI-FINANZAS/maestro-datos/contabilidad-general/crear-cuenta-contable',
        component:CrearCuentaContableComponent,
        name:'crear-cuenta-contable'
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
        path:'LO-LOGISTICA/maestro_datos/almacen/clase_material/visualizar_clase_material',
        component:VisualizarClaseMaterialComponent,
        name:'visualizar_clase_material'
      },
      {
        path:'LO-LOGISTICA/maestro_datos/almacen/clase_material/modificar_visualizar_clase_material',
        component:ModificarVisualizarClaseMaterialComponent,
        name:'visualizar_clase_material'
      },
      {
        path:'XX-CONFI/maestro_datos/tipo_cambio/crear_tcambio',
        component:CrearTipoCambioComponent,
        name:'crear-tipo-cambio'
      }, 
      {
        path:'XX-CONFI/maestro_datos/tipo_cambio/edit_tcambio',
        component:ModificarTipoCambioComponent,
        name:'modificars-tipo-cambio'
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
        name:'modificar-impuesto'
      }, 
      {
        path:'XX-CONFI/maestro_datos/impuesto/viewandedit_impuesto',
        component:ViewAndEditImpuestoComponent,
        name:'viewandedit-impuesto'
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
        path:'LO-LOGISTICA/orden_compra/po_viewandedit',
        component:ViewAndEditPOComponent,
        name:'viewandedit-po'
      }, 
      {
        path:'LO-LOGISTICA/HES/crear-hes',
        component:CrearHesComponent,
        name:'hes'
      },  
      {
        path:'LO-LOGISTICA/HES/aprobar-hes',
        component:AprobarHesComponent,
        name:'hes'
      },  
      {
        path:'LO-LOGISTICA/HES/view-hes',
        component:ViewHesComponent,
        name:'hes'
      },  
      {
        path:'LO-LOGISTICA/HES/edit-hes',
        component:EditHesComponent,
        name:'hes'
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
        name:'modificar'
      },    
      {
        path:'FI-FINANZAS/ingreso-comprobante/ver-ingreso-comprobante',
        component:VisualizarIngresoComprobanteComponent,
        name:'modificar'
      },    
      {
        path:'FI-FINANZAS/ingreso-comprobante/viewandedit_ic',
        component:ViewAndEditICComponent,
        name:'modificar'
      },    
      {
        path:'FI-FINANZAS/Tesoreria/pagos_masivo',
        component:PagosMasivoComponent,
        name:'pagos'
      },    
      {
        path:'FI-FINANZAS/Tesoreria/pagos_individual',
        component:PagosIndividualesComponent,
        name:'pagos'
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
      {
        path:'run',
        component:RunComponent,
        name:'run'
      }
    ]

  },

  {
    path: '/',
    component: Login,
    name: 'Login',
  },




];
