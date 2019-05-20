import axios from 'axios';
import * as CONFIG from '../../Config';
import * as APIConstant from '../../core/api.constant';
import GLOBAL from '../../Global';
export default{
  headers : {'Authorization': 'Bearer '+GLOBAL.getToken()},
  createDiarioGeneral(data){   
    return axios.post(CONFIG.API_URL+'diariogeneral',data)
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetLastCodCorrelativo(){
    return axios.get(CONFIG.API_URL+'correlativo')
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  getBusquedaAll(strCompany,strAccDocum_NO,strFeci,strFecf){
    return axios.get(CONFIG.API_URL+'busqueda/diariogeneral/'+strCompany+'/'+strAccDocum_NO+'/'+strFeci+'/'+strFecf)
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  getBusquedaVMAll(strCompany,strAccDocum_NO,strFeci,strFecf){
    return axios.get(CONFIG.API_URL+'busqueda/diariogeneralVM/'+strCompany+'/'+strAccDocum_NO+'/'+strFeci+'/'+strFecf)
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  getDiarioID(id){
    return axios.get(CONFIG.API_URL+'diariogeneralID/'+id)
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  updateDiarioID(data){
    return axios.post(CONFIG.API_URL+'diariogeneral/update',data)
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  aprobarDiario(data){
    return axios.post(CONFIG.API_URL+'diariogeneral/aprobar',data)
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  }
}
  