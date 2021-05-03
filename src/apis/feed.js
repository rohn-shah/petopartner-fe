import Axios from "./axiosConfig";

export const getMainFeed = async () => {
  return Axios.get("api/dogs")
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

export const likeDislike = async (dogId) => {
  return Axios.patch(`api/dogs/${dogId}/likes`)
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
