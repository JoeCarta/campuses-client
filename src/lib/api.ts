// tiny fetch wrapper around the campuses-server api.
// falls back to localhost so the app runs with no config in dev.
const BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })

  if (!res.ok) {
    // surface the server's validation messages when it sends them
    let message = `request failed (${res.status})`
    try {
      const body = await res.json()
      if (Array.isArray(body.errors)) message = body.errors.join(', ')
      else if (body.error) message = body.error
    } catch {
      // response had no json body, keep the default message
    }
    throw new Error(message)
  }

  if (res.status === 204) return undefined as T
  return res.json()
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body: unknown) =>
    request<T>(path, { method: 'POST', body: JSON.stringify(body) }),
  put: <T>(path: string, body: unknown) =>
    request<T>(path, { method: 'PUT', body: JSON.stringify(body) }),
  del: (path: string) => request<void>(path, { method: 'DELETE' }),
}
