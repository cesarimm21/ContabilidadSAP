import Inicio from '@/components/inicio/inicio.vue'
import Slider from '@/components/slider/slider.vue'
import Login from '@/components/login/login.vue'
import Barmenu from '@/components/barmenu/barmenu.vue'
import TopMenu from '@/components/customs/top-menu/TopMenu.vue';
import HeaderbuttosComponent from '@/components/views/reusables/headerbuttos/headerbuttos.vue';
import UsuarioComponent from '@/components/usuario/usuario.vue'
import LogComponent from '@/components/log/log.vue'
import RunComponent from '../components/run/run.vue'
import CrearPRComponent from '../components/logistica/requisicion/pr_crear/pr_crear.vue'
import CrearProveedorComponent from '../components/FI-FINANZAS/proveedor/crear-proveedor/crear-proveedor.vue'
import CrearHesComponent from '@/components/LO-LOGISTICA/HES/crear-hes/crear-hes.vue'
import ModificarPRComponent from '../components/logistica/requisicion/pr_modificar/pr_modificar.vue'
import VisualizarPRComponent from '../components/logistica/requisicion/pr_visualizar/pr_visualizar.vue'
import VisualizarModificarPRComponent from '../components/logistica/requisicion/pr_visualizar_modificar/pr_visualizar_modificar.vue'
import ModificarProveedorComponent from '../components/FI-FINANZAS/proveedor/modificar-proveedor/modificar-proveedor.vue'
import VisualizarProveedorComponent from '../components/FI-FINANZAS/proveedor/visualizar-proveedor/visualizar-proveedor.vue'
import CrearIngresoComprobanteComponent from '../components/FI-FINANZAS/ingreso-comprobante/crear-ingreso-comprobante/crear-ingreso-comprobante.vue'
import ModificarIngresoComprobanteComponent from '../components/FI-FINANZAS/ingreso-comprobante/modificar-ingreso-comprobante/modificar-ingreso-comprobante.vue'
export default [
 
  {
    path: '/barmenu',
    component: Barmenu,
    name: 'Barmenu',
    children:[{
      path: 'FI-FINANZAS',
      component:CrearIngresoComprobanteComponent,
      children:[
        {
        path:'proveedor',
        component:CrearProveedorComponent,
        children:[{
          path:'crear-proveedor',
          component:CrearProveedorComponent,
          name:'crear-proveedor'
        },{
          path:'modificar-proveedor',
          component:ModificarProveedorComponent,
          name:'modificar-proveedor'
        },{
          path:'visualizar-proveedor',
          component:VisualizarProveedorComponent,
          name:'visualizar-proveedor'
        }
      ]
      },{
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
        path: 'logistica',
        component:CrearPRComponent,
        name:'logistica',
        children:[{
          path:'requisicion',
          component:CrearPRComponent,
          children:[
          {
            path:'pr_crear',
            component:CrearPRComponent,
            name:'pr_crear'
          },
          {
            path:'pr_modificar',
            component:ModificarPRComponent,
            name:'pr_modificar'
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
        path:'LO-LOGISTICA/HES/crear-hes',
        component:CrearHesComponent,
        name:'hes'
      },    
      {
        path:'FI-FINANZAS/ingreso-comprobante/modificar-ingreso-comprobante',
        component:ModificarIngresoComprobanteComponent,
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
