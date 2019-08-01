import axios from 'axios';
import * as CONFIG from '../../Config';
import * as APIConstant from '../../core/api.constant';
import GLOBAL from '../../Global';
export default{
  headers : {'Authorization': 'Bearer '+GLOBAL.getToken()},
  GetAllBanco(){      
    return axios.get(CONFIG.API_URL+'banco')
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetAllBanco2(){      
    return axios.get(CONFIG.API_URL+'banco2')
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetAllBancoView(strCompany_Cod){      
    return axios.get(CONFIG.API_URL+'banco/view/'+strCompany_Cod)
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
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
  GetCuentaBancaria(code){
    return axios.get(CONFIG.API_URL+'banco/cuentabancaria/'+code)
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
    return axios.post(CONFIG.API_URL+'banco/create',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  updateBanco(data){
    return axios.post(CONFIG.API_URL+'banco/update',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  inactivarBanco(documento){
    return axios.post(CONFIG.API_URL+'banco/inactivar',documento)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  activarBanco(documento){
    return axios.post(CONFIG.API_URL+'banco/activar',documento)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },

  
}
  