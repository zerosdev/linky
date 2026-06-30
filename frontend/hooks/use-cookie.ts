"use client"

import { useEffect, useState } from "react"

type SameSite = "strict" | "lax" | "none"

export interface UseCookieOptions<T> {
  default?: () => T
  maxAge?: number
  expires?: Date
  path?: string
  domain?: string
  secure?: boolean
  sameSite?: SameSite
  encode?: (value: T) => string
  decode?: (raw: string) => T
}

const listeners = new Map<string, Set<() => void>>()

function notify(name: string) {
  listeners.get(name)?.forEach((listener) => listener())
}

function subscribe(name: string, listener: () => void) {
  let set = listeners.get(name)
  if (!set) {
    set = new Set()
    listeners.set(name, set)
  }
  set.add(listener)
  return () => {
    set!.delete(listener)
  }
}

function readRawCookie(name: string): string | null {
  if (typeof document === "undefined") return null
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`))
  return match ? decodeURIComponent(match[1]) : null
}

interface CookieWriteOptions {
  maxAge?: number
  expires?: Date
  path?: string
  domain?: string
  secure?: boolean
  sameSite?: SameSite
}

function writeRawCookie(
  name: string,
  raw: string | null,
  options: CookieWriteOptions
) {
  const parts = [`${name}=${raw === null ? "" : encodeURIComponent(raw)}`]
  parts.push(`path=${options.path ?? "/"}`)
  if (options.domain) parts.push(`domain=${options.domain}`)
  if (options.sameSite) parts.push(`samesite=${options.sameSite}`)
  if (options.secure) parts.push("secure")
  if (raw === null) {
    parts.push("max-age=0")
  } else if (options.expires) {
    parts.push(`expires=${options.expires.toUTCString()}`)
  } else if (options.maxAge !== undefined) {
    parts.push(`max-age=${options.maxAge}`)
  }
  document.cookie = parts.join("; ")
}

function defaultDecode<T>(raw: string): T {
  try {
    return JSON.parse(raw) as T
  } catch {
    return raw as unknown as T
  }
}

function defaultEncode<T>(value: T): string {
  return typeof value === "string" ? value : JSON.stringify(value)
}

/**
 * React equivalent of Nuxt's `useCookie`: reads/writes a cookie and stays
 * in sync across every component watching the same cookie name.
 */
export function useCookie<T = string>(
  name: string,
  options: UseCookieOptions<T> = {}
) {
  const decode = options.decode ?? defaultDecode
  const encode = options.encode ?? defaultEncode

  const read = (): T | null => {
    const raw = readRawCookie(name)
    if (raw === null) return options.default ? options.default() : null
    return decode(raw)
  }

  const [value, setValueState] = useState<T | null>(() =>
    typeof document === "undefined"
      ? options.default
        ? options.default()
        : null
      : read()
  )

  useEffect(() => {
    setValueState(read())
    return subscribe(name, () => setValueState(read()))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name])

  function setValue(next: T | null) {
    writeRawCookie(name, next === null ? null : encode(next), options)
    setValueState(next)
    notify(name)
  }

  return [value, setValue] as const
}
