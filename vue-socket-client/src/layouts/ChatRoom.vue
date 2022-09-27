<template>
  <div class="container">
    <section class="navbar__chat">
      <b-navbar-item>
        <img src="../assets/logo.png" alt="logo" />
      </b-navbar-item>
      <b-navbar-item class="title-chat">
        {{ $store.state.socketio.userName }} -> {{ chatTitle }}
      </b-navbar-item>
    </section>

    <section class="section section-bg"></section>

    <section class="section section__chat">
      <b-field>
        <b-input
          v-model="message"
          placeholder="Escribe un mensaje aqui"
          type="textarea"
        >
        </b-input>
      </b-field>
      <b-button type="is-success" @click="handleSendMessage(message)">
        <b-icon icon="share" size="is-large" />
      </b-button>
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  methods: {
    ...mapActions("socketio", ["new_message", "new_global_message"]),
    handleSendMessage(message) {
      const nameRoute = this.$route.name;
      console.log(this.user);
      nameRoute == "global chat"
        ? this.new_global_message(message)
        : this.new_message({ message, toUserUid: this.user.uid });
    },
  },
  computed: {
    ...mapGetters("socketio", ["getToUser"]),
    chatTitle() {
      const nameRoute = this.$route.name;
      if (nameRoute == "global chat") {
        this.user = { id: "wj3UfZTmCO_tHTodAAAF" };
      } else {
        this.user = this.getToUser(this.$route.params.name);
      }
      return nameRoute == "global chat" ? "Chat Global" : this.user.userName;
    },
  },
  data() {
    return {
      message: null,
      user: null,
    };
  },
};
</script>

<style lang="sass" scoped>
.container
    border-radius: 10px
    background-color: aliceblue
    display: flex
    flex-direction: column
    justify-content: space-between
    margin: 16px
    height: 80%
    box-shadow: rgba(255, 255, 255, 0.28) 0px 3px 8px
.navbar__chat
    display: flex
    background-color: aliceblue
    border-radius:10px 10px 0 0
    padding-left: 16px
    .title-chat
        font-size: 24px
        font-weight: bold
.section
    padding: 0
.section-bg
    flex-grow: 1
    background-image: url('../assets/chatFondo.jpg')
.section__chat
    height: 70px
    display: flex
    flex-direction: row
    justify-content: space-between
    align-items: center
    padding: 16px 16px 16px 16px
    border-radius: 0px 0px 10px 10px
    .button
        padding: 16px 26px 7px 26px
    .field
        width: 80%
        margin: 0
        .control
            ::v-deep
                .textarea
                    min-height: 50px
</style>
