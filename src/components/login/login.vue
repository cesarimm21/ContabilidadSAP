
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
    <el-form class="login" :label-position="labelPosition"  :model="formLabelAlign">
      <div class="container1 ">
        <!-- <img src="../../images/hsec4.png" alt=""> -->
      </div>
        <input type="text" v-model="FormLogin.strUsuario" placeholder="usuario" autofocus/>
        <i class="fa fa-user"></i>
        <input type="password" v-model="FormLogin.strPassword" placeholder="Contraseña" v-on:keyup.13="loginUsuario(FormLogin)"/>
        <i class="fa fa-key"></i>
      <!-- <a href="#">Forgot your password?</a> -->
      <el-button 
        @click="loginUsuario(FormLogin)">
      <span class="state">Ingresar</span>
      </el-button>
    </el-form>

</div>
  <div class="footer">
      <span class="footertext">©2017 Antapaccay</span>
  </div>
</div>

</template>


<script>

import Login from '@/components/login/login.component'
export default Login
</script>
<style>
</style>
