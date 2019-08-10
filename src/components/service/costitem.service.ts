import axios from 'axios';
import * as CONFIG from '../../Config';
import * as APIConstant from '../../core/api.constant';
import GLOBAL from '../../Global';
export default {
  headers : {'Authorization': 'Bearer '+GLOBAL.getToken()},
  GetAllCostItem(strCompany_Cod){  
    return axios.get(CONFIG.API_URL+'costitem/view/'+strCompany_Cod)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetAllCostItem2(strCompany_Cod){  
    return axios.get(CONFIG.API_URL+'costitem2/'+strCompany_Cod)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetAllCostItemLike(codigo){  
    return axios.get(CONFIG.API_URL+'busqueda/costitemlike/'+codigo)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  CreateCostItem(data:any){
    return axios.post(CONFIG.API_URL+'costitem/create',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetOnlyOneCostItem(code:any){
    return axios.get(CONFIG.API_URL+'costitem/'+code)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetBusquedaCostItem(strCompany:any,strCodigo:any){
    return axios.get(CONFIG.API_URL+'busqueda/costitem/'+strCodigo+'/'+strCompany)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetCostItemID(code:any){
    return axios.get(CONFIG.API_URL+'costitem/'+code)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  UpdateCostItemID(data:any){
    return axios.post(CONFIG.API_URL+'costitem/update', data)
    .then(response =>{
        return response.data;
      })
  },

  activarCostItem(data:any){
    return axios.post(CONFIG.API_URL+'costitem/activar', data)
    .then(response =>{
        return response.data;
      })
  },
  inactivarCostItem(data:any){
    return axios.post(CONFIG.API_URL+'costitem/inactivar', data)
    .then(response =>{
        return response.data;
      })
  },
}
  