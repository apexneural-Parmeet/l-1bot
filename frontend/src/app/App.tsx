import { RouterProvider } from 'react-router-dom'
import { AuthProvider, ThemeProvider, SocketProvider } from './providers'
import { router } from './router'

export function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <SocketProvider>
          <RouterProvider router={router} />
        </SocketProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
