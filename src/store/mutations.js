export default { 
    add(state,user) {
       state.users.push(user);
    },
    setUsers (state, users) {
        state.users = users;
    }
};