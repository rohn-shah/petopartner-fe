import Axios from "./axiosConfig";

export const getBlogsFeed = async () => {
  return Axios.get("api/blogs")
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

export const getBlogBySlug = async (slug) => {
  return Axios.get(`api/blogs/${slug}`)
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
