<template>
<div class="container-fluid h-100">
  <!--<div class="container-fluid">
    <div id="home" >
      <div class="row">
        <div class="col-12 col-md-6">
          <router-link id="link-buscar" class="w-100 home-link" :to="{name: 'workers'}">
            <i class="material-icons md-48">search</i>
            <span style="width: max-content;">Encontre um profissional</span>
          </router-link>
        </div>
        <div class="col-12 col-md-6">
          <router-link id="link-oferecer" href="#" class="w-100 home-link" :to="{name: 'worker'}">
            <i class="material-icons md-48">work</i>
            <span style="width: max-content;">Ofereça um serviço</span>
          </router-link>
        </div>
      </div>
    </div>-->
      <div class="row h-100 align-content-center justify-content-center">
        <div class="col col-md-3">
          <router-link id="link-buscar" class="w-100 home-link" :to="{name: 'search'}">
            <i class="material-icons md-48">search</i>
            <span style="width: max-content;">Encontrar</span>
          </router-link>
        </div>
        <div class="col col-md-3">
          <router-link id="link-oferecer" href="#" class="w-100 home-link" :to="{name: 'worker'}">
            <i class="material-icons md-48">work</i>
            <span style="width: max-content;">Cadastrar</span>
          </router-link>
        </div>
      </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Home',
  computed: {
    ...mapState('auth', ['user']),
    routes () {
      return this.$router.options.routes.filter(route => (
        route.meta && route.meta.showNavbar
      ))
    }
  }
}
</script>

<style lang="scss" scoped>
@mixin flex-center($columns: false) {
  display: flex;
  align-items: center;
  justify-content: center;
  @if $columns {
    flex-direction: column;
  }
}
#home {
  width: 100%;
  height: 80vh;
  @include flex-center(true);
  justify-content: space-around;
  .user-info {
    text-align: center;
  }

  .home-link {
    flex: 0 0 25%;
    padding: 3rem 4rem;
    transition: .4s;
    color: var(--white);
    @include flex-center(true);
    &:hover {
      transform: scale(1.1);
      text-decoration: none;
      box-shadow: 0 10px 20px rgba(0,0,0,0.5);
    }
  }

  #link-buscar {
    background-color: var(--blue)
  }
  #link-oferecer {
    background-color: var(--purple)
  }
}
.home-link {
    flex: 0 0 25%;
    padding: 3rem 4rem;
    transition: .4s;
    color: var(--white);
    @include flex-center(true);
    &:hover {
      transform: scale(1.01);
      text-decoration: none;
      box-shadow: 0 10px 20px rgba(0,0,0,0.5);
    }
  }

  .home{
    top:50%;
    height: 80vh;
  }

  #link-buscar {
    background-color: var(--blue)
  }
  #link-oferecer {
    background-color: var(--purple)
  }

</style>
