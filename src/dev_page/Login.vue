<template>
  <div class="page-header clear-filter" filter-color="green">
    <div
      class="page-header-image"
      style="background-image: url('image/login.jpg')"
    ></div>
    <div class="content">
      <div class="container">
        <div class="col-md-5 ml-auto mr-auto">
          <card type="login" plain>
            <div slot="header" class="logo-container">
              <img v-lazy="'img/now-logo.png'" alt="" />
            </div>

            <fg-input
              class="no-border input-lg"
              addon-left-icon="now-ui-icons users_circle-08"
              placeholder="Nom complet..."
              v-model="form.fullname"
            >
            </fg-input>

            <fg-input
              class="no-border input-lg"
              addon-left-icon="now-ui-icons objects_key-25"
              placeholder="Mot de passe..."
              type="password"
              v-model="form.password"
            >
            </fg-input>
            <alert type="danger" v-if="error" class="col-12">{{error}}</alert>
            <template slot="raw-content">
              <div class="card-footer text-center">
                <n-button type="default" @click="login" round class="col-6">Connexion</n-button>
              </div>
              <div class="pull-left">
                <h6>
                  <a href="#pablo" class="link footer-link">Créer un compte</a>
                </h6>
              </div>
              <div class="pull-right">
                <h6>
                  <a href="#pablo" class="link footer-link">Mot de passe oublié?</a>
                </h6>
              </div>
            </template>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Alert, Card, Button, FormGroupInput } from '@/components';
import AuthentificationServices from '@/services/AuthentificationServices';

export default {
  name: 'login-page',
  bodyClass: 'login-page',
  components: {
    Card,
    Alert,
    [Button.name]: Button,
    [FormGroupInput.name]: FormGroupInput
  },
  data () {
    return {
      form: {
        fullname: "",
        password: ""
      },
      error: false
    }
  },
  methods: {
    async login () {
      try {
        this.error=false;
        if (this.form) {
          const response = (await AuthentificationServices.login(this.form)).data;
          this.$store.dispatch('setToken',response.token)
          this.$router.push('book')
        }
      } catch (error) {
        console.log(error)
        this.error = error.response.data.message;
      }
    }
  }
};
</script>
<style></style>
