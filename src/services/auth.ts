import ApiService from "./base-api";

export function sentByMe(id: number) {
  const api = new ApiService();
  return `${id}` == api.getUser();
}
