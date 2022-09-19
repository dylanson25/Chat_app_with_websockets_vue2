<template>
    <section>
        <b-sidebar v-model="open" type="is-light" fullheight>
            <div class="p-1">
                <b-menu>
                    <b-menu-list label="Usuarios">
                        <b-menu-item @click="()=> $router.push(`/chats/global-chat`)" label="Chat Global" />
                        <b-menu-item v-for="(user, key) in users" :key="key" icon="account" :label="user.name"
                            @click="() => handleNavigate(user.name)" />
                    </b-menu-list>
                </b-menu>
            </div>
        </b-sidebar>
        <div class="show-button">
            <b-button @click="()=>open = !open">Usuarios</b-button>
        </div>
    </section>
</template>
  
<script>
export default {
    methods: {
        handleNavigate(name) {
            this.open = !this.open
            this.$router.push(`/chats/${name}`)
        }
    },
    data() {
        return {
            open: false,
            users: [
                { name: "Dylanson 25" },
                { name: "Ximena VG" },
                { name: "Katara" },
            ]
        };
    }
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
