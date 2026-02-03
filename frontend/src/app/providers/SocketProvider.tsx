import type { ReactNode } from 'react'
import { createContext, useContext, useMemo, useState, useRef, useEffect } from 'react'

/**
 * SocketProvider: WebSocket-ready structure. Do not implement full WS yet.
 * Exposes connected state and a send stub; actual WS connection can be added later.
 */
const WS_URL = import.meta.env.VITE_WS_URL ?? 'ws://127.0.0.1:8000/ws'

interface SocketContextValue {
  connected: boolean
  send: (data: string | object) => void
}

const SocketContext = createContext<SocketContextValue | null>(null)

export function SocketProvider({ children }: { children: ReactNode }) {
  const [connected, setConnected] = useState(false)
  const wsRef = useRef<WebSocket | null>(null)

  useEffect(() => {
    // WebSocket not implemented yet; just structure
    const ws = new WebSocket(WS_URL)
    wsRef.current = ws
    ws.onopen = () => setConnected(true)
    ws.onclose = () => setConnected(false)
    ws.onerror = () => setConnected(false)
    return () => {
      ws.close()
      wsRef.current = null
    }
  }, [])

  const send = useMemo(
    () => (data: string | object) => {
      if (wsRef.current?.readyState === WebSocket.OPEN) {
        wsRef.current.send(typeof data === 'string' ? data : JSON.stringify(data))
      }
    },
    []
  )

  const value = useMemo(() => ({ connected, send }), [connected, send])
  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
}

export function useSocket() {
  const ctx = useContext(SocketContext)
  if (!ctx) throw new Error('useSocket must be used within SocketProvider')
  return ctx
}
