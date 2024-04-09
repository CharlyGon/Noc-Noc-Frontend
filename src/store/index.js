import { createStore } from 'vuex';
import { jwtDecode } from 'jwt-decode';

export default createStore({
  state: {
    token: null,
    userId: null
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      const decoded = jwtDecode(token); // Sustituye esto por tu función de decodificación si no usas jwt-decode
      state.userId = decoded.user_id;
    }
  },
  actions: {
    setToken({ commit }, token) {
      commit('setToken', token);
    }
  }
});
