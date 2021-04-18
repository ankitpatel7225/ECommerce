import axios from 'axios';
import {Alert} from 'react-native';
import constant from './constant';
// import base64 from 'react-native-base64';

// const username = 'atquotes';
// const password = 'atquotes@998';
// const authHeader = 'Basic ' + base64.encode(`${username}:${password}`);

axios.defaults.baseURL = constant.BASE_URL;

const get = (endPoint) => {
  return new Promise((resolve, reject) => {
    axios
      .get(endPoint)
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
        console.log('err', err);
      });
  });
};

const getWithParams = (endPoint, data) => {
  return new Promise((resolve, reject) => {
    axios
      .get(endPoint, {params: data})
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
        console.log('err', err);
      });
  });
};

// const doGet = (slug, token) => {
//   return new Promise((resolve, reject) => {
//     axios
//       .get(slug, {
//         headers: {
//           Authorization: token,
//         },
//       })
//       .then((res) => {
//         resolve(res.data);
//       })
//       .catch((error) => {
//         console.log("ERROR >>", error);
//         reject(error);
//       });
//   });
// };

const doPostWithAuth = (slug, data, token = null) => {
  return new Promise((resolve, reject) => {
    axios
      .post(slug, data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          //Authorization: authHeader,
        },
      })
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const doPost = (slug, data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(slug, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.data) {
            reject(error.response.data);
          }
          reject(error.response);
        } else {
          if (error.message == 'Network Error') {
            Alert.alert('No Internet', 'Check Your Internet Connection .');
          }
        }
      });
  });
};

const doPut = (slug, data, token) => {
  return new Promise((resolve, reject) => {
    axios
      .put(slug, data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: token,
        },
      })
      .then((res) => {
        console.log('DOPutRES>>>>', res);
        resolve(res.data);
      })
      .catch((error) => {
        console.log('DOPOSTERR>>>', error.data);
        console.log('DOPOSTERR>>>', error.message);
        reject(error);
      });
  });
};

const doDelete = (slug, token) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(slug, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log('AXIODELETE>>>>', res);
        resolve(res.data);
      })
      .catch((error) => {
        console.log('ERROR >> "', error);
        reject(error);
      });
  });
};

// const getMethod = (endPoint) => {
//     return new Promise((resolve, reject) => {
//         axios({
//             method: 'get',
//             url: endPoint,
//             body: { page: 1, limit : 15 }
//           })
//           .then((response) => {
//             if (response.status === 200) resolve(response["data"]);
//           })
//           .catch((err) => {
//             reject(err);
//             console.log("err", err);
//           });
//     });
// }

export {
  // getMethod as
  get,
  getWithParams,
  // doGet,
  doPostWithAuth,
  doPost,
  doPut,
  doDelete,
};
