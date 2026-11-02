import { createAuthClient } from "better-auth/react";
import { jwtClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  basePath: "/api/auth",
  plugins: [jwtClient()],
  fetchOptions: { credentials: "include" },
});

export function safeReturnPath(value) {
  if (
    typeof value !== "string" ||
    !value.startsWith("/") ||
    value.startsWith("//") ||
    /[\\\u0000-\u0020]/.test(value)
  )
    return "/account";
  if (/^\/(login|register)(?:[/?#]|$)/.test(value)) return "/account";
  return value;
}
