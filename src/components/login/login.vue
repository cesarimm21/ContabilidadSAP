
<template>
<div>
 <div class="slider">
    <div class="slider-wrap">
      <div class="single-slide" id="slide-1"></div>
      <div class="single-slide" id="slide-2"></div>
      <div class="single-slide" id="slide-3"></div>
      <div class="single-slide" id="slide-4"></div>
      <div class="single-slide" id="slide-5"></div>
   </div>
 </div>
  <div class="wrapper">
    <!-- <el-form class="login" :label-position="labelPosition"  :model="formLabelAlign">
      <div class="container1 ">
      </div>
        <input type="text" v-model="FormLogin.strUsuario" placeholder="usuario" autofocus/>
        <i class="fa fa-user"></i>
        <input type="password" v-model="FormLogin.strPassword" placeholder="Contraseña" v-on:keyup.13="loginUsuario(FormLogin)"/>
        <i class="fa fa-key"></i>
      <el-button 
        @click="loginUsuario(FormLogin)">
      <span class="state">Ingresar</span>
      </el-button>
    </el-form> -->
    <div class="container">
            <div class="row">
                <div class="col-md-4 mx-auto">
                    <div class="card-group">
                        <div class="card p-4" style="background: rgba(206, 206, 206, 0.7);border: 1px solid rgb(238, 241, 245)">
                            <div class="card-body" style="padding: 0.4rem;">
                                <form >
                                    <div class="row justify-content-md-center">
                                        <div class="col-md-9">
                                            <img src="../../images/logo_login.png" style="width: 100%;" class="img-fluid">
                                        </div>
                                    </div>
                                    <b-progress  :max="100" >
                                    </b-progress>
                                    <p class="text-muted text-center"><span style="font-size:13px;color:white">Iniciar sesión</span></p>
                                    <div class="form-group input-group mb-3" style="margin-left: 0px !important;">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text iconLogin" style="background: #498bbb;border: #498bbb;"><i class="fa fa-user" style="color:white"></i></span>
                                        </div>
                                        <input type="text" class="form-control" style="font-size: 13px;height: calc(2.2rem + 0px) !important" placeholder="Usuario" autocomplete="username" v-model="usuario" formControlName="strUsuario">
                                    </div>
                                    <div class="form-group input-group mb-4" style="margin-top: 28px; !important;margin-left: 0px !important;">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text iconLogin" style="background: #498bbb;border: #498bbb;"><i class="fa fa-lock" style="color:white"></i></span>
                                        </div>
                                        <input type="password" class="form-control" style="font-size: 13px;height: calc(2.2rem + 0px) !important" placeholder="Contraseña" autocomplete="current-password" v-model="contrasenia" formControlName="strPassword">
                                    </div>
                                    <div class="form-group input-group mb-4" style="font-size: 13px;margin-top:20px; margin-left:10px;">
                                        <div class="form-group row ">
                                            <label class="el-form-item__label mb-4">Compania</label>
                                         </div> 
                                        <div class="form-group row " style="margin-top: 18px;margin-left: -67px;width: 297px;">
                                            <div class="col-md-12 grupolabel">
                                                    <div class="input-group col-md-12" >
                                                    <el-select v-model="value1" class="selected" placeholder="Selecionar"
                                                    @change="selectCompania($event)"
                                                   >
                                                        <el-option
                                                        class="opciones"
                                                        v-for="item in companiaModel"
                                                        :key="item.strCompany_Cod"
                                                        :label="item.strCompany_Name"
                                                        :value="item.strCompany_Cod"
                                                        >
                                                        </el-option>
                                                    </el-select>
                                                    </div>
                                                </div>
                                         </div> 

                                    </div>
                                    <div class="row" style="margin-top: 40px;">
                                        <div class="col-lg-4">
                                            <button type="submit" class="btn btn-primary px-4 " @click="loginUsuario">Iniciar</button>
                                        </div>
                                        <div class="col-lg-8 text-right">
                                            <button type="button" style="color:white!important; font-size:13px !important;" class="btn btn-link px-0 ">Se olvidó su contraseña?</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

</div>
  <div class="footer">
      <span class="footertext">©2019 Grupo Gadel</span>
  </div>
</div>

</template>


<script>

import Login from '@/components/login/login.component'
export default Login
</script>
<style>
</style>
