import axios from './base.js';

const getAll = (page) => {
    return axios.get('http://localhost:8080/parking-lots',{
        params:{
            page:page
        }
    });
};

const putAParkingLot = (id,data) => {
    return axios.put('http://localhost:8080/parking-lots/' + id,data);
};

const postAParkingLot = (data) => {
    return axios.post('http://localhost:8080/parking-lots/' ,data);
};
export default {
    getAll,
    putAParkingLot,
    postAParkingLot
};