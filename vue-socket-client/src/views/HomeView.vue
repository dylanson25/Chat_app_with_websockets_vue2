<template>
  <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
  <div class="cont">
    <div class="card">
      <div class="card-content">
        <div class="title">
          Escribe tu nombre...
        </div>
        <hr>
        <div class="content">
          <b-field>
            <b-input v-model="userName" size="is-medium" icon="account" placeholder="Nombre de usuario" />
          </b-field>
        </div>
        <hr>
        <footer class="card-footer">
          <b-button type="is-primary is-light" size="is-medium" class="card-footer-item" @click="()=> handleNavigate()">
            Entrar</b-button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'HomeView',
  methods: {
    ...mapActions('socketio', ["login"]),
    handleNavigate() {
      if (this.exist || this.userName == "") {
        console.log("Nombre de usuario ya existe")
        return
      }
      this.login(this.userName)
      this.$router.push('/chats/global-chat')
    },
  },
  data() {
    return {
      userName: "",
      exist: this.$store.state.socketio.exist
    }
  }
}
</script>

<style lang="css" scoped>
.cont {
  background-image: url('../assets/fondo_login.png');
  display: flex;
  margin: 0;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}


.card {
  width: 400px;
  margin: 16px;
}

.title {
  font-size: 1.5rem;
}
</style>
