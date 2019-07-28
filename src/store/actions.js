import UserApi from '../apis/base.js';

export default {
    fetchAllUsers: async ({ commit }) => {
        const users = await UserApi.fetchUsers();
        commit('setUsers', users);
    },

    addUser: async ({ dispatch }, user) => {
        await UserApi.addUser(user);
        dispatch('fetchAllUsers');
    }
};