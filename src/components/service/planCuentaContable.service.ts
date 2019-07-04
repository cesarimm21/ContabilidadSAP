import axios from 'axios';
import * as CONFIG from '../../Config';
import * as APIConstant from '../../core/api.constant';
import GLOBAL from '../../Global';
export default{
  headers : {'Authorization': 'Bearer '+GLOBAL.getToken()},
  GetAllPlanCuenta(){ 
    return axios.get(CONFIG.API_URL+'plancuentas')
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetAllPlanConLocal(){    
    return axios.get(CONFIG.API_URL+'planconlocal')
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetAllPlanConLocalView(){    
    return axios.get(CONFIG.API_URL+'planconlocal/view')
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetOnlyOneAllPlanConLocal(intIdChartAcct_L_ID){
    return axios.get(CONFIG.API_URL+'planconlocal/'+intIdChartAcct_L_ID)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  deletePlanConLocal(intIdChartAcct_L_ID){
    return axios.get(CONFIG.API_URL+'planconlocal/delete/'+intIdChartAcct_L_ID)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  createtblPlanConLocal(data){
    return axios.post(CONFIG.API_URL+'planconlocal/create',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  updatetblPlanConLocal(data){
    return axios.post(CONFIG.API_URL+'planconlocal/update',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  
}
