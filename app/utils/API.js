// import axios from 'axios';
// import base64 from 'base-64';

// let API_URL = 'http://api.example.com'

// function basicAuth(emailOrToken, password) {
//   password = typeof password !== 'undefined' ? password : ''; 

//   let encodedDetails = base64.encode(`${emailOrToken}:${password}`);
//   return {headers: {Authorization: `Basic ${encodedDetails}`}};
// }

// let API = {
//   login(email, password) {
//     return axios.post(`${API_URL}/login`, {}, basicAuth(email, password));
//   },
//   logout() {
//     return axios.delete(`${API_URL}/login`, basicAuth(token));
//   }
// };

// export default API;