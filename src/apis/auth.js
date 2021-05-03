import Axios from "./axiosConfig";

export const login = async (payload) => {
  return Axios.post("api/auth", payload)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      if (err?.response?.data?.errors) {
        return {
          errors: err.response.data.errors,
        };
      } else if (err?.response?.data?.error) {
        return {
          errors: Object.values(err.response.data.error).map((err) => ({
            msg: err,
          })),
        };
      }
      return { errors: [err.message] };
    });
};

export const signup = async (payload) => {
  return Axios.post("api/auth/register", payload)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      if (err?.response?.data?.errors) {
        return {
          errors: err.response.data.errors,
        };
      } else if (err?.response?.data?.error) {
        return {
          errors: Object.values(err.response.data.error).map((err) => ({
            msg: err,
          })),
        };
      }
      return { errors: [err.message] };
    });
};
