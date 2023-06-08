import request from "graphql-request";
import { graphql } from "../../src/gql/wagtail";
import { env } from "../../src/env/server.mjs";

// get JWT
export const LoginMD = graphql(`
  mutation login($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      refreshExpiresIn
      token
      refreshToken
    }
  }
`);

export function login(username: string, password: string) {
  return request(env.NEXT_PUBLIC_SAY_WAGTAIL_GQL_URL, LoginMD, {
    username: username,
    password: password,
  });
}

// whether JWT token is valid or not
export const IsTokenValidMD = graphql(`
  mutation isTokenValid($token: String!) {
    verifyToken(token: $token) {
      payload
    }
  }
`);

// get new token based on refreshToken
export const refreshTheTokenMD = graphql(`
  mutation refreshTheToken($refreshToken: String!) {
    refreshToken(refreshToken: $refreshToken) {
      token
    }
  }
`);

export function isTokenValid(token: string) {
  return request(env.NEXT_PUBLIC_SAY_WAGTAIL_GQL_URL, IsTokenValidMD, {
    token: token,
  });
}

export function DoRefresh(refreshToken: string) {
  return request(env.NEXT_PUBLIC_SAY_WAGTAIL_GQL_URL, refreshTheTokenMD, {
    refreshToken: refreshToken,
  });
}

export async function IsTokenValidOrRefresh(
  token: string,
  refreshToken: string
) {
  try {
    await isTokenValid(token);
    return "valid";
  } catch (error) {
    try {
      let resp = await DoRefresh(refreshToken);
      if (!resp.refreshToken?.token) throw new Error("not possible");
      localStorage.setItem("JWT", resp.refreshToken?.token);
      return "refresh";
    } catch (error) {
      return "invalid";
    }
  }
}
