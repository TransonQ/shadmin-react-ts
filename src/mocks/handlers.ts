// src/mocks/handlers.js
import { http, HttpResponse } from "msw"

export const handlers = [
  http.get("/api/auth", async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    return HttpResponse.json({
      name: "Auth",
      authenticated: true,
    })
  }),
]
