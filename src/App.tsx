import { QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router-dom'
import { Suspense } from 'react'
import { router } from './router'
import { queryClient } from './shared/config/queryClient'
import { Toaster } from 'react-hot-toast'
import "./styles/index.css"

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<div className="p-4 text-center">Made By didicode...</div>}>
        <RouterProvider router={router} />
        <Toaster position="top-right" reverseOrder={false} />
      </Suspense>
    </QueryClientProvider>
  )
}

export default App
