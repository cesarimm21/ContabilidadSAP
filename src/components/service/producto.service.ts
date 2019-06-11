import axios from 'axios';
import * as CONFIG from '../../Config';
import GLOBAL from '../../Global';
export default{
  headers : {'Authorization': 'Bearer '+GLOBAL.getToken()},
  GetAllProducto(tipo){
    return axios.get(CONFIG.API_URL+'producto/'+tipo)
    .then(response =>{
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  putProducto(Producto){
    return axios.post(CONFIG.API_URL+'producto', Producto)
    .then(response =>{
        return response.data;
      })
  },
  saveProducto(Producto){
    return axios.post(CONFIG.API_URL+'producto', Producto)
    .then(response =>{
        return response.data;
      })
  },
  UpdateProducto(Producto){
    return axios.post(CONFIG.API_URL+'update/producto', Producto)
    .then(response =>{
        return response.data;
      })
  },
  UpdateStock(Producto){
    return axios.post(CONFIG.API_URL+'producto/stock', Producto)
    .then(response =>{
        return response.data;
      })
  },
  UpdateStockVirtual(Producto){
    return axios.post(CONFIG.API_URL+'producto/stock/virtual', Producto)
    .then(response =>{
        return response.data;
      })
  },
  getProductoID(id){
    debugger;
    return axios.post(CONFIG.API_URL+'producto/get/'+id)
    .then(response => {
      return response.data
    })
  },
  DeleteProducto(id){
    debugger;
    return axios.delete(CONFIG.API_URL+'producto/delete/'+id)
    .then(response => {
      return response.data
    })
  },
  GetOnlyOneProducto(code){
    return axios.get(CONFIG.API_URL+'producto/busqueda/'+code)
    .then(response =>{
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  busquedaProducto(data){
    return axios.get(CONFIG.API_URL+'busqueda/producto/'+data.strStock_Cod+'/'+data.desde+'/'+data.hasta+'/'+data.strWHS_Cod)
    .then(response =>{
      return JSON.parse(JSON.stringify(response.data));
    })
  },
  eliminarProducto(data){
    debugger;
    return axios.post(CONFIG.API_URL+'producto/eliminar',data)
    .then(response => {
      return response.data
    })
    
  }
}