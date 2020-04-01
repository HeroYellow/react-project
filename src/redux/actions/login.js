import { DELETE_USER, SAVE_USER_INFO } from "../action_types";
export const saveUserInfoAction = userObj => {
  const { user, token } = userObj;
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", token);
  return { type: SAVE_USER_INFO, data: userObj };
};

export const deleteUserAction = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  return { type: DELETE_USER };
};
