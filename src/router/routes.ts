import Inicio from '@/components/inicio/inicio.vue'
import Slider from '@/components/slider/slider.vue'
import Login from '@/components/login/login.vue'
import Barmenu from '@/components/barmenu/barmenu.vue'
import TopMenu from '@/components/customs/top-menu/TopMenu.vue';
import HeaderbuttosComponent from '@/components/views/reusables/headerbuttos/headerbuttos.vue';
import UsuarioComponent from '@/components/usuario/usuario.vue'
import LogComponent from '@/components/log/log.vue'
import RunComponent from '../components/run/run.vue'
import CrearPRComponent from '../components/LO-LOGISTICA/requisicion/pr_crear/pr_crear.vue'
import CrearProveedorComponent from '../components/FI-FINANZAS/proveedor/crear-proveedor/crear-proveedor.vue'
import CrearHesComponent from '@/components/LO-LOGISTICA/HES/crear-hes/crear-hes.vue'
import EditHesComponent from '@/components/LO-LOGISTICA/HES/edit-hes/edit-hes.vue'
import ViewHesComponent from '@/components/LO-LOGISTICA/HES/view-hes/view-hes.vue'
import ModificarPRComponent from '../components/LO-LOGISTICA/requisicion/pr_modificar/pr_modificar.vue'
import VisualizarPRComponent from '../components/LO-LOGISTICA/requisicion/pr_visualizar/pr_visualizar.vue'
import VisualizarModificarPRComponent from '../components/LO-LOGISTICA/requisicion/pr_visualizar_modificar/pr_visualizar_modificar.vue'
import ModificarProveedorComponent from '../components/FI-FINANZAS/proveedor/modificar-proveedor/modificar-proveedor.vue'
import VisualizarProveedorComponent from '../components/FI-FINANZAS/proveedor/visualizar-proveedor/visualizar-proveedor.vue'
import CrearIngresoComprobanteComponent from '../components/FI-FINANZAS/ingreso-comprobante/crear-ingreso-comprobante/crear-ingreso-comprobante.vue'
import ModificarIngresoComprobanteComponent from '../components/FI-FINANZAS/ingreso-comprobante/modificar-ingreso-comprobante/modificar-ingreso-comprobante.vue'
import VisualizarIngresoComprobanteComponent from '../components/FI-FINANZAS/ingreso-comprobante/ver-ingreso-comprobante/ver-ingreso-comprobante.vue'
import CrearSalidaAlmacenComponent from '../components/LO-LOGISTICA/almacen/al_salida/al_salida.vue'
import CrearMaterialComponent from '../components/LO-LOGISTICA/almacen/al_crear/al_crear.vue'
import VisualizarMaterialComponent from '../components/LO-LOGISTICA/almacen/al_visualizar/al_visualizar.vue'
import ModificarMaterialComponent from '../components/LO-LOGISTICA/almacen/al_modificar/al_modificar.vue'
import VisualizarModificarMaterialComponent from '../components/LO-LOGISTICA/almacen/al_visualizar_modificar/al_visualizar_modificar.vue'
import VisualizarSalidaMaterialComponent from '../components/LO-LOGISTICA/almacen/al_salida_visualizar/al_salida_visualizar.vue'
import VisualizarSalidaModificarMaterialComponent from '../components/LO-LOGISTICA/almacen/al_salida_visualizar_modificar/al_salida_visualizar_modificar.vue'
import ModificarSalidaMaterialComponent from '../components/LO-LOGISTICA/almacen/al_salidam/al_salidam.vue'

import CrearPOComponent from '../components/LO-LOGISTICA/orden_compra/po_crear/po_crear.vue'
import ModificarPOComponent from '../components/LO-LOGISTICA/orden_compra/po_modificar/po_modificar.vue'
import VisualizarPOComponent from '../components/LO-LOGISTICA/orden_compra/po_visualizar/po_visualizar.vue'
import AprobarPOComponent from '../components/LO-LOGISTICA/orden_compra/po_aprobacion/po_aprobacion.vue'
import AprobadorPRComponent from '../components/LO-LOGISTICA/requisicion/pr_aprobador/pr_aprobador.vue'
import AprobarSalidaComponent from '../components/LO-LOGISTICA/almacen/salida/al_salidaaprobar/al_salidaaprobar.vue'
import RecepcionBusquedaComponent from '../components/LO-LOGISTICA/almacen/al_recepcion_bienes/al_recepcion_busqueda/al_recepcion_busqueda.vue'
import RecepcionMaterialComponent from '../components/LO-LOGISTICA/almacen/al_recepcion_bienes/al_recepcion/al_recepcion.vue'
import DespachoSalidaComponent from '../components/LO-LOGISTICA/almacen/salida/al_salidadespacho/al_salidadespacho.vue'

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
        path: 'LO-LOGISTICA',
        component:CrearPRComponent,
        children:[
          {
          path:'requisicion',
          component:CrearPRComponent,
          children:[
          {
            path:'pr_crear',
            component:CrearPRComponent,
            name:'pr_crear'
          },
          {
            path:'pr_visualizar',
            component:VisualizarPRComponent,
            name:'pr_visualizar'
          },
          {
            path:'pr_visualizar_modificar',
            component:VisualizarModificarPRComponent,
            name:'pr_visualizar_modificar'
          },
          ]
        }]
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
        path:'FI-FINANZAS/proveedor/visualizar-proveedor',
        component:VisualizarProveedorComponent,
        name:'visualizar-proveedor'
      }, 
      {
        path:'LO-LOGISTICA/orden_compra/po_crear',
        component:CrearPOComponent,
        name:'crear-po'
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
        path:'LO-LOGISTICA/HES/crear-hes',
        component:CrearHesComponent,
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
