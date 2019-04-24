import axios from 'axios';
import * as CONFIG from '../../Config';
import * as APIConstant from '../../core/api.constant';
import GLOBAL from '../../Global';
export default {
  headers : {'Authorization': 'Bearer '+GLOBAL.getToken()},
  GetAllCuentaContable(){  
    return axios.get(CONFIG.API_URL+'cuentacontable')
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  CreateCuentaContable(data:any){
    return axios.post(CONFIG.API_URL+'cuentacontable',data)
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
  GetCuentaContableID(code:any){
    return axios.get(CONFIG.API_URL+'cuentacontable/'+code)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  UpdateCuentaContableID(data:any){
    return axios.put(CONFIG.API_URL+'cuentacontable/'+data.intIdAcctCont_ID, data)
    .then(response =>{
        return response.data;
      })
  },
}
  