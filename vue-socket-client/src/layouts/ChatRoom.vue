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

    <section class="section section-bg">
      <b-field
        :label="getUserName != userName ? userName : 'yo'"
        v-for="({ msg, userName }, key) in messages"
        :class="getUserName == userName && 'fromUser'"
        :key="key"
      >
        <b-tag type="is-success">{{ msg }}</b-tag>
      </b-field>
    </section>

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
      if (this.message == "" || this.message == null) return;
      const nameRoute = this.$route.name;
      nameRoute == "global chat"
        ? this.new_global_message(message)
        : this.new_message({ message, toUserUid: this.user.uid });
      this.message = "";
    },
  },
  computed: {
    ...mapGetters("socketio", [
      "getToUser",
      "getUserName",
      "getChatGlobal",
      "getChatMessages",
    ]),
    chatTitle() {
      const nameRoute = this.$route.name;
      if (nameRoute == "global chat") {
        this.user = { id: "wj3UfZTmCO_tHTodAAAF" };
      } else {
        this.user = this.getToUser(this.$route.params.name);
      }
      return nameRoute == "global chat" ? "Chat Global" : this.user.userName;
    },
    messages() {
      let messages;
      if (this.chatTitle === "Chat Global") {
        messages = this.getChatGlobal;
      } else {
        messages = this.getChatMessages(this.user.uid);
      }
      return messages;
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

.field .label
  color: black
.section-bg
    flex-grow: 1
    color: white
    background-image: url('../assets/chatFondo.jpg')
    padding: 16px
    ::v-deep
      .field
        .label
          color: white
        .tag
          background-color: #009852
          padding: 16px
          span
            font-weight: 400
            font-size: 16px
      .fromUser
        display: flex
        flex-direction: column
        align-items: flex-end
        .label
          text-align: left
        .tag
            background-color: #002C2E
            padding: 16px
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
