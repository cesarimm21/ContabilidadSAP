import axios from 'axios';
import * as CONFIG from '../../Config';
import * as APIConstant from '../../core/api.constant';
import GLOBAL from '../../Global';
export default {
  headers : {'Authorization': 'Bearer '+GLOBAL.getToken()},
  GetAllCentroCostos(strCompany_Cod){  
    return axios.get(CONFIG.API_URL+'centrocosto/view/'+strCompany_Cod)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetAllCentroCostos2(company_cod){  
    return axios.get(CONFIG.API_URL+'centrocosto/compania/'+company_cod)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetOnlyOneCentroCostos(strCostCenter_NO,strCompany_Cod){  
    return axios.get(CONFIG.API_URL+'centrocosto/'+strCostCenter_NO+'/'+strCompany_Cod)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  CreateCentroCosto(data){
    return axios.post(CONFIG.API_URL+'centrocosto/create',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetBusquedaCentroCostos(strCodigo:any,desde:any,hasta:any){
    return axios.get(CONFIG.API_URL+'busqueda/centrocosto/'+strCodigo+'/'+desde+'/'+hasta)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetCentroCostosID(code:any){
    return axios.get(CONFIG.API_URL+'centrocosto/'+code)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  UpdateCentroCostos(data){
    return axios.put(CONFIG.API_URL+'centrocosto/update', data)
    .then(response =>{
        return response.data;
      })
  },
  inactivarCentroCosto(documento){
    return axios.post(CONFIG.API_URL+'centrocosto/inactivar',documento)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  activarCentroCosto(documento){
    return axios.post(CONFIG.API_URL+'centrocosto/activar',documento)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
}
  