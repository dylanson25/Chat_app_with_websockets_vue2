<template>
  <section>
    <b-sidebar v-model="open" type="is-light" fullheight>
      <div class="p-1">
        <b-menu>
          <b-menu-list label="Usuarios">
            <b-menu-item
              @click="() => $router.push(`/chats/global-chat`)"
              label="Chat Global"
            />
            <b-menu-item
              v-for="(user, key) in usersList"
              :key="key"
              icon="account"
              :label="user.userName"
              @click="() => handleNavigate(user.uid)"
            />
          </b-menu-list>
        </b-menu>
      </div>
    </b-sidebar>
    <div class="show-button">
      <b-button @click="() => (open = !open)">Usuarios</b-button>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  methods: {
    handleNavigate(uid) {
      this.open = !this.open;
      this.$router.push({
        path: `/chats/${uid}`,
      });
    },
  },
  computed: {
    ...mapGetters("socketio", ["usersList"]),
  },
  data() {
    return {
      open: false,
    };
  },
};
</script>

<style lang="sass" scoped>
.p-1
    padding: 1em
.show-button
    position: absolute
    top: 0
    right: 0
.button
    margin: 16px
</style>
