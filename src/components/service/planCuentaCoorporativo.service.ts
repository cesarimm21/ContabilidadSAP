import axios from 'axios';
import * as CONFIG from '../../Config';
import * as APIConstant from '../../core/api.constant';
import GLOBAL from '../../Global';
export default{
  headers : {'Authorization': 'Bearer '+GLOBAL.getToken()},
  GetAllPlanCuenta(){ 
    return axios.get(CONFIG.API_URL+'planconcoorporativo')
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetAllPlanConCoorporativo(){    
    return axios.get(CONFIG.API_URL+'planconcoorporativo')
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetAllPlanConCoorporativoView(strCompany_Cod){    
    return axios.get(CONFIG.API_URL+'planconcoorporativo/view/'+strCompany_Cod)
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetOnlyOneAllPlanConCoorporativo(intIdChartAcct_L_ID){
    return axios.get(CONFIG.API_URL+'planconcoorporativo/'+intIdChartAcct_L_ID)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  inactivarPlanConCoorporativo(documento){
    return axios.post(CONFIG.API_URL+'planconcoorporativo/inactivar',documento)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  activarPlanConCoorporativo(documento){
    return axios.post(CONFIG.API_URL+'planconcoorporativo/activar',documento)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  createtblPlanConCoorporativo(data){
    return axios.post(CONFIG.API_URL+'planconcoorporativo/create',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  updatetblPlanConCoorporativo(data){
    return axios.post(CONFIG.API_URL+'planconcoorporativo/update',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  
}
