<template>
    <div class="cont">
        <Sidebar />
        <router-view />
    </div>
</template>

<script>
import { Sidebar, ChatRoom } from "@/layouts"
export default {
    components: {
        Sidebar,
        ChatRoom,
    }
}
</script>

<style lang="sass" scoped>
.cont 
  align-items: center
  background-image: url('../assets/fondo_login.png')
  display: flex
  height: 100%
  justify-content: center
  margin: 0
  width: 100%
</style>