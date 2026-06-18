"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { io, type Socket } from "socket.io-client";
import { env } from "@/config/env";
import { tokenStorage } from "@/lib/api/tokenStorage";
import { useAuth } from "@/providers/AuthProvider";

interface SocketContextValue {
  socket: Socket | null;
  isConnected: boolean;
}

const SocketContext = createContext<SocketContextValue>({
  socket: null,
  isConnected: false,
});

/**
 * Owns the single socket.io connection for the authenticated app. Connects
 * with the bearer token in the handshake, reconnecting when auth changes.
 * Mount inside the authenticated area only.
 */
export function SocketProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated, user } = useAuth();
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) return;
    const token = tokenStorage.get();
    if (!token) return;

    const socket = io(env.socketUrl, {
      auth: { token },
      transports: ["websocket"],
      autoConnect: true,
    });
    socketRef.current = socket;

    const onConnect = () => setIsConnected(true);
    const onDisconnect = () => setIsConnected(false);
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.disconnect();
      socketRef.current = null;
      setIsConnected(false);
    };
    // Reconnect when the signed-in user changes (token rotates on re-login).
  }, [isAuthenticated, user?.id]);

  const value = useMemo<SocketContextValue>(
    () => ({ socket: socketRef.current, isConnected }),
    [isConnected],
  );

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
}

export function useSocket() {
  return useContext(SocketContext);
}
