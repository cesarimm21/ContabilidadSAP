import axios from 'axios';
import * as CONFIG from '../../Config';
import * as APIConstant from '../../core/api.constant';
import GLOBAL from '../../Global';
export default {
  headers : {'Authorization': 'Bearer '+GLOBAL.getToken()},
  CreateUM(unidad){
    return axios.post(CONFIG.API_URL+'unidadmedida', unidad)
    .then(response =>{
        return JSON.parse(JSON.stringify(response.data));
      })
  },
  UpdateUM(unidad){
    return axios.post(CONFIG.API_URL+'unidadmedida/update', unidad)
    .then(response =>{
        return JSON.parse(JSON.stringify(response.data));
      })
  },
  GetAllUnidadMedida(){  
    return axios.get(CONFIG.API_URL+'unidadmedida')
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetAllUnidadMedidaView(){  
    return axios.get(CONFIG.API_URL+'unidadmedida/view')
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetAllUnidadMedida2(){  
    return axios.get(CONFIG.API_URL+'unidadmedida2')
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetOnlyOneUnidadMedida(code){
    return axios.get(CONFIG.API_URL+'unidadmedida/'+code)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  deleteUnidadMedida(intUnit_Measure_ID){
    return axios.get(CONFIG.API_URL+'unidadmedida/delete/'+intUnit_Measure_ID)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  inactivarUnidadMedida(documento){
    return axios.post(CONFIG.API_URL+'unidadmedida/inactivar',documento)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  activarUnidadMedida(documento){
    return axios.post(CONFIG.API_URL+'unidadmedida/activar',documento)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },

}
  