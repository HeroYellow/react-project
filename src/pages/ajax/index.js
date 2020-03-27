import ajax from "../ajax/ajax";

// 登录
export const ajaxLogin = loginObj => ajax.post("/login", loginObj);
