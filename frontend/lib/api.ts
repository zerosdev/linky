const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function api(
  endpoint: string,
  options: RequestInit = {}
) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    credentials: "include"
  })

  if (!res.ok) {
    throw new Error("Request failed")
  }

  return res.json()
}