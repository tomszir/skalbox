import io from 'socket.io-client'

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    baseURL: 'http://localhost:8081',

    socket: null,

    player: null,

    room: null,

    loading: false
  },

  getters: {

  },

  mutations: {
    setLoading(state, loading) {
      state.loading = loading;
    },

    setRoom(state, room) {
      state.room = room;
    },

    setPlayer(state, player) {
      state.player = player;
    },

    setSocket(state, socket) {
      state.socket = socket;
    }
  },

  actions: {
    connectToSocket({ state, commit }) {
      const socket = io.connect(`${state.baseURL}`, { reconnect: true });

      socket.on('connect', () => {
        console.log('Socket.io - Connected!');
      });

      socket.on('room/client/updatePlayerList', (players) => {
        const room = Object.assign({}, state.room, players);

        console.log('Received list update: ', room);

        commit('setRoom', room);
      });

      commit('setSocket', socket);
    }
  }
});
