export const routes = {
  home: "/",
  login: "/auth/login",
  signup: "/auth/signup",
} as const satisfies Record<string, `/${string}`>;
