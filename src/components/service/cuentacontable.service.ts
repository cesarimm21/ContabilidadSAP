import axios from 'axios';
import * as CONFIG from '../../Config';
import * as APIConstant from '../../core/api.constant';
import GLOBAL from '../../Global';
export default {
  ///cambios
  headers : {'Authorization': 'Bearer '+GLOBAL.getToken()},
  GetAllCuentaContable(strCompany_Cod){  
    return axios.get(CONFIG.API_URL+'cuentacontable/view/'+strCompany_Cod)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetAllCuentaContableCat20(strCompany_Cod){  
    return axios.get(CONFIG.API_URL+'cuentacontable/view/categoria20/'+strCompany_Cod)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetAllCuentaContable2(compania_cod){  
    return axios.get(CONFIG.API_URL+'cuentacontable2/'+compania_cod)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  activarCuentaContable(data){
    return axios.post(CONFIG.API_URL+'cuentacontable/activar',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  inactivarCuentaContable(data){
    return axios.post(CONFIG.API_URL+'cuentacontable/inactivar',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetAllCuentaContableLike(codigo){  
    return axios.get(CONFIG.API_URL+'busqueda/cuentacontablelike/'+codigo)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  CreateCuentaContable(data:any){
    return axios.post(CONFIG.API_URL+'cuentacontable/create',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
 
  GetOnlyOneCuentaGastos(code:any){
    return axios.get(CONFIG.API_URL+'cuentacontable/'+code)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetBusquedaCuentaContable(strCodigo:any,desde:any,hasta:any){
    return axios.get(CONFIG.API_URL+'busqueda/cuentacontable/'+strCodigo+'/'+desde+'/'+hasta)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetBusquedaCuentaContable2(strCodigo:any,desde:any,hasta:any){
    return axios.get(CONFIG.API_URL+'busqueda/cuentacontable2/'+strCodigo+'/'+desde+'/'+hasta)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetBusquedaElementoGasto(strCodigo:any,desde:any,hasta:any){
    return axios.get(CONFIG.API_URL+'busqueda/elementogasto/'+strCodigo+'/'+desde+'/'+hasta)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetCuentaContableID(code:any,strCompany_Cod){
    return axios.get(CONFIG.API_URL+'cuentacontable/'+code+'/'+strCompany_Cod)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  UpdateCuentaContableID(data:any){
    return axios.post(CONFIG.API_URL+'cuentacontable/update', data)
    .then(response =>{
        return response.data;
      })
  },
}
  