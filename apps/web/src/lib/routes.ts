export const routes = {
  home: "/",
  login: "/auth/login",
  signup: "/auth/signup",
  dashboard: "/dashboard",
} as const satisfies Record<string, `/${string}`>;
