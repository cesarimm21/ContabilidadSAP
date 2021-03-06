import axios from 'axios';
import * as CONFIG from '../../Config';
import * as APIConstant from '../../core/api.constant';
import GLOBAL from '../../Global';
export default{
  headers : {'Authorization': 'Bearer '+GLOBAL.getToken()},
  GetAllOrdenCompra(){      
    return axios.get(CONFIG.API_URL+'ordencompra')
    .then(response =>{  
      console.log(response +' cuantos tare');           
        return JSON.parse(JSON.stringify(response.data));
               
    })
  },
  GetOrdenCompraCompany(strCompany_cod){
    return axios.get(CONFIG.API_URL+'ordencompraByCompany/'+strCompany_cod)
    .then(response =>{
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetOrdenCompraRequisicion(code){
    return axios.get(CONFIG.API_URL+'ordencompra/requisicion/'+code)
    .then(response =>{
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  
  getOCForFactura(strCompany_cod){
    return axios.get(CONFIG.API_URL+'ordencompraForFacture/'+strCompany_cod)
    .then(response =>{
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  getOCForAprove(strCompany_cod){
    return axios.get(CONFIG.API_URL+'ocaprove/'+strCompany_cod)
    .then(response =>{
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetOCView(strCompany_cod){
    return axios.get(CONFIG.API_URL+'ordencompraview/'+strCompany_cod)
    .then(response =>{
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  UpdateOrdenCompra(OrdenCompra){    
    return axios.post(CONFIG.API_URL+'ordencompra/update',OrdenCompra)
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  getOrdenCompraTypeRequisicion(){      
    return axios.get(CONFIG.API_URL+'ordencompraTypeRequisicion')
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  CreateOrdenCompra(ordencompraModel){    
    return axios.post(CONFIG.API_URL+'ordencompra',ordencompraModel)
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetAllOrdenDetalle(idHeader){
    return axios.get(CONFIG.API_URL+'ordencompradetalle/'+idHeader)
    .then(response=>{
      return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetAllOrdenDetalleHES(idHeader){
    return axios.get(CONFIG.API_URL+'ordencompradetalle/hes/'+idHeader)
    .then(response=>{
      return JSON.parse(JSON.stringify(response.data));
    })
  },
  aprobarPO(data){
    return axios.post(CONFIG.API_URL+'ordencompra/aprobar',data)
    .then(response =>{
      return JSON.parse(JSON.stringify(response.data));
    })
  },
  inventarioPO(data){
    return axios.post(CONFIG.API_URL+'ordencompra/aprobar/inventario',data)
    .then(response =>{
      return JSON.parse(JSON.stringify(response.data));
    })
  },
  busquedaPO(data){
    return axios.get(CONFIG.API_URL+'busqueda/ordencompra')
    .then(response =>{
      return JSON.parse(JSON.stringify(response.data));
    })
  },
  busquedaRPO(data){
    return axios.get(CONFIG.API_URL+'busqueda/recepcion/ordencompra/'+data.strPO_NO+'/'+data.strVendor_NO+'/'+data.desde+'/'+data.hasta)
    .then(response =>{
      return JSON.parse(JSON.stringify(response.data));
    })
  },
  getPOId(code){
    return axios.get(CONFIG.API_URL+'ordencompra/'+code)
    .then(response =>{
      return JSON.parse(JSON.stringify(response.data));
    })
  },
  getPOCod(code){
    return axios.get(CONFIG.API_URL+'ordencompraByCod/'+code)
    .then(response =>{
      return JSON.parse(JSON.stringify(response.data));
    })
  },
  getPOONE(code){
    return axios.get(CONFIG.API_URL+'ocone/'+code)
    .then(response =>{
      return JSON.parse(JSON.stringify(response.data));
    })
  },
  getPOONEview(code){
    return axios.get(CONFIG.API_URL+'oconeforview/'+code)
    .then(response =>{
      return JSON.parse(JSON.stringify(response.data));
    })
  },
  getPOCodAll(code){
    return axios.get(CONFIG.API_URL+'ordencompraByCodAll/'+code)
    .then(response =>{
      return JSON.parse(JSON.stringify(response.data));
    })
  },
  getPODetalleId(code){
    return axios.get(CONFIG.API_URL+'ordencompradetalle/'+code)
    .then(response =>{
      return JSON.parse(JSON.stringify(response.data));
    })
  },
  recepcionar(data){
    return axios.post(CONFIG.API_URL+'ordencompra/recepcion',data)
    .then(response =>{
      return JSON.parse(JSON.stringify(response.data));
    })
  }
}
