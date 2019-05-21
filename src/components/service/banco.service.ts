import axios from 'axios';
import * as CONFIG from '../../Config';
import * as APIConstant from '../../core/api.constant';
import GLOBAL from '../../Global';
export default{
  headers : {'Authorization': 'Bearer '+GLOBAL.getToken()},
  GetAllBanco(){      
    return axios.get(CONFIG.API_URL+'banco')
    .then(response =>{            
        return JSON.parse(JSON.stringify(response));
    })
  },
  GetAllBancoType(){      
    return axios.get(CONFIG.API_URL+'bancotype')
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetOnlyOneBanco(code){
    return axios.get(CONFIG.API_URL+'banco/'+code)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  searchBanco(data){
    return axios.post(CONFIG.API_URL+'banco/search',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  busquedaBanco(data){
    return axios.get(CONFIG.API_URL+'busqueda/banco/'+data.strCompany_Cod+'/'+data.strCountry+'/'+data.strBank_Cod+'/'+data.strBank_Curr,data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  crearBanco(data){
    return axios.post(CONFIG.API_URL+'banco',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  updateBanco(data){
    return axios.post(CONFIG.API_URL+'banco/update',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  }
  
}
  