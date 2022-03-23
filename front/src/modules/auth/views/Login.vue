<template>
  <!--<form @submit.prevent="submit()">
    <div class="col-md-6 col-sm-12">
      <div class="card">
        <div class="card-header">
          Login
        </div>
        <div class="card-body">
          <div class="form-group">
            <input
              required
              type="email"
              v-model="form.email"
              class="form-control"
              placeholder="E-mail"
            >
          </div>
          <div class="form-group">
            <input
              required
              type="password"
              placeholder="Senha"
              class="form-control"
              v-model="form.password"
            >
          </div>

          <button class="btn btn-primary w-100">
            Entrar
          </button>
        </div>
      </div>
    </div>
  </form>-->
  <div>
    <div class="sidenav">
        <div class="login-main-text">
          <h2>Application<br> Login Page</h2>
          <p>Login or register from here to access.</p>
        </div>
    </div>
    <div class="main">
        <div class='d-flex'>
         <div class="col-md-6 col-sm-12">
            <div class="login-form">
               <form @submit.prevent="submit()">
                  <div class="form-group">
                     <label>Usuário</label>
                     <input type="text" class="form-control" v-model="form.email" placeholder="Usuário">
                  </div>
                  <div class="form-group">
                     <label>Senha</label>
                     <input type="password" class="form-control" v-model="form.password" placeholder="Senha">
                  </div>
                  <button type="submit" class="btn btn-black">Entrar</button>
                  <button type="submit" class="btn btn-secondary">Regitrar</button>
               </form>
            </div>
         </div>
        </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data: () => ({
    form: {
      email: '',
      password: ''
    }
  }),
  methods: {
    ...mapActions('auth', ['ActionDoLogin']),
    ...mapActions('activity', ['ActionGetActivitiesNotRated', 'ActionGetActivitiesStarted', 'ActionGetActivitiesConfirmed']),
    async submit () {
      try {
        const loader = this.$loading.show()
        await this.ActionDoLogin(this.form)
        await this.ActionGetActivitiesNotRated()
        await this.ActionGetActivitiesStarted()
        await this.ActionGetActivitiesConfirmed()
        this.$router.push({ name: 'home' })
        loader.hide()
      } catch (err) {
        alert(err.data ? err.data.error : 'Não foi possível fazer login')
      }
    }
  }
}
</script>

<style scoped>
body {
    font-family: "Lato", sans-serif;
}

.main-head{
    height: 150px;
    background: #FFF;

}

.sidenav {
    height: 100%;
    background-color: #000;
    overflow-x: hidden;
    padding-top: 20px;
}

.main {
  padding: 0px 10px;
}

@media screen and (max-height: 450px) {
    .sidenav {padding-top: 15px;}
}

@media screen and (max-width: 450px) {
    .login-form{
        margin-top: 10%;
    }

    .register-form{
        margin-top: 10%;
    }
}

@media screen and (min-width: 768px){
    .main{
        margin-left: 40%;
    }

    .sidenav{
        width: 40%;
        position: fixed;
        z-index: 1;
        top: 0;
        left: 0;
    }

    .login-form{
        margin-top: 80%;
    }

    .register-form{
        margin-top: 20%;
    }
}

.login-main-text{
    margin-top: 20%;
    padding: 60px;
    color: #fff;
}

.login-main-text h2{
    font-weight: 300;
}

.btn-black{
    background-color: #000 !important;
    color: #fff;
}
.login-page {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

}
 .login-page > .card {
    width: 30%;
  }
</style>
