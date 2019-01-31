import Inicio from '@/components/inicio/inicio.vue'
import Slider from '@/components/slider/slider.vue'
import Login from '@/components/login/login.vue'
import Barmenu from '@/components/barmenu/barmenu.vue'
import DocComparador from '@/components/docComparador/docComparador.vue'
import DocNuevo from '@/components/docNuevo/docNuevo.vue'
import JerarquiaComponent from '@/components/jerarquia/jerarquia.vue'
import PopUpOpcionComponent from '@/components/popUpOpcion/popUpOpcion.vue'
import ConfiguracionComponent from '@/components/configuracion/configuracion.vue'
import TopMenu from '@/components/customs/top-menu/TopMenu.vue';
import RolesComponent from '@/components/roles/roles.vue'
import UsuarioComponent from '@/components/usuario/usuario.vue'
import LogComponent from '@/components/log/log.vue'
import DominioComponent from '@/components/dominio/dominio.vue'
import Versiones from '@/components/versiones/versiones.vue'
import Permission from '@/components/permission/permission.vue'
import DocRechazado from '@/components/docRechazado/docRechazado.vue'
import DocAprobado from '@/components/docAprobado/docAprobado.vue'
import DocEliminado from '@/components/docEliminado/docEliminado.vue'
import Statistics from '@/components/statistics/statistics.vue'
import Reportes from '@/components/reportes/reportes.vue'
import DocPublicados from "@/components/docPublicados/docPublicados.vue"
import AprobacionDocs from "@/components/aprobacionDocs/aprobacionDocs.vue"
import Procesos from "@/components/procesos/procesos.vue"
import Seguimiento from "@/components/seguimiento/seguimiento.vue"
import Directorios from "@/components/directorios/directorios.vue"
import Plantilla from "@/components/plantilla/plantilla.vue"
import AccesoDocument from "@/components/accesoDocument/accesoDocument.vue"
import procesoEjecucion from "@/components/procesoEjecucion/procesoEjecucion.vue"
export default [
 
  {
    path: '/barmenu',
    component: Barmenu,
    name: 'Barmenu',
    children:[{
        path: 'inicio',
        component: Inicio,
        name: 'Inicio',
      },
      {
        path: 'directorios',
        component: Directorios,
        name: 'directorios',
      },
      {
        path:'docComparador',
        component:DocComparador,
        name:'docComparador',
      },{
        path:'docAprobado',
        component:DocAprobado,
        name:'docAprobado',
      },
      {
        path:'docNuevo',
        component:DocNuevo,
        name:'docNuevo',
      },{
        path:'docRechazado',
        component:DocRechazado,
        name:'docRechazado'
      },{
        path:'docEliminado',
        component:DocEliminado,
        name:'docEliminado'
      },{
        path:'docPublicados',
        component:DocPublicados,
        name:'docPublicados'
      },
      {
        path:'jerarquia',
        component:JerarquiaComponent,
        name:'jerarquia',
        
      },
      {
        path:'popUpOpcion',
        component:PopUpOpcionComponent,
        name:'popUpOpcion',
      },
      {
        path:'configuracion',
        component:ConfiguracionComponent,
        name:'configuracion',
      },
      {
        path:'roles',
        component:RolesComponent,
        name:'roles'
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
        path:'dominio',
        component:DominioComponent,
        name:'dominio'
      },
      {
        path:'versiones',
        component:Versiones,
        name:'versiones'
      },
      {
        path:'permission',
        component:Permission,
        name:'permission'
      },
      {
        path:'statistics',
        component:Statistics,
        name:'statistics'
      },
      {
        path:'reportes',
        component:Reportes,
        name:'reportes'
      },
      {
        path:'aprobacionDocs',
        component:AprobacionDocs,
        name:'aprobacionDocs'
      },
      {
        path:'procesos',
        component:Procesos,
        name:'procesos'
      },{
        path:'seguimiento',
        component:Seguimiento,
        name:'seguimiento'
      },
      {
        path:'plantilla',
        component:Plantilla,
        name:'plantilla'
      },
      {
        path:'accesoDocument',
        component:AccesoDocument,
        name:'accesoDocument'
      },
      {
        path:'procesoEjecucion',
        component:procesoEjecucion,
        name:'procesoEjecucion'
      }
    ]

  },

  {
    path: '/',
    component: Login,
    name: 'Login',
  },




];
