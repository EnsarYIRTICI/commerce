import { LoginDto } from "@/lib/dto/login.dto";
import { httpGet, httpPost } from "./http.service";

async function authUser(token: string): Promise<any> {
  return await httpGet(`/auth/user`, token);
}

async function authLogin(loginData: LoginDto) {
  return await httpPost(`/auth/login`, loginData, {
    credentials: true,
  });
}

export { authUser, authLogin };
