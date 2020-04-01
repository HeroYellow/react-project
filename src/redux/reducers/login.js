import { SAVE_USER_INFO, DELETE_USER } from "../action_types";

let user;
const token = localStorage.getItem("token") || "";

try {
  user = JSON.parse(localStorage.getItem("user") || "{}");
} catch (error) {
  user = {};
}

const initState = {
  user,
  token,
  isLogin: JSON.stringify(user) !== "{}" && token ? true : false
};
export default (prevState = initState, action) => {
  const { type, data } = action;
  switch (type) {
    case SAVE_USER_INFO:
      return { ...data, isLogin: true };
    case DELETE_USER:
      return { user: {}, token: "", isLogin: false };
    default:
      return prevState;
  }
};
