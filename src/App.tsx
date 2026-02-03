import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AppLayout } from '@/components/layout'
import { ToastProvider, ToastContainer } from '@/components/Toast'
import { SkuListPage, SkuMaintenancePage } from '@/pages'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      retry: 1,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <BrowserRouter>
          <AppLayout>
          <Routes>
            <Route path="/" element={<Navigate to="/skus" replace />} />
            <Route path="/todo" element={<PlaceholderPage title="To Do" />} />
            <Route path="/skus" element={<SkuListPage />} />
            <Route path="/skus/new" element={<SkuMaintenancePage />} />
            <Route path="/skus/:id" element={<SkuMaintenancePage />} />
            <Route path="/bundle-type" element={<PlaceholderPage title="Bundle Type" />} />
            <Route path="/categories" element={<PlaceholderPage title="Categories" />} />
            <Route path="/component" element={<PlaceholderPage title="Component" />} />
            <Route path="/reports" element={<PlaceholderPage title="Reports" />} />
            <Route path="/add-user" element={<PlaceholderPage title="Add User" />} />
            <Route path="*" element={<Navigate to="/skus" replace />} />
          </Routes>
        </AppLayout>
        <ToastContainer />
      </BrowserRouter>
      </ToastProvider>
    </QueryClientProvider>
  )
}

function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      <p className="mt-2 text-gray-600">This section is not implemented yet.</p>
    </div>
  )
}

export default App
