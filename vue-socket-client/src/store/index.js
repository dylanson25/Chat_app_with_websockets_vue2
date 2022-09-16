import Vue from "vue";
import Vuex from "vuex";
import socketio from "./socketio";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    socketio,
  },
});
