import { Sidebar } from './Sidebar'
import { TopHeader } from './TopHeader'

export function MainLayout({ children, title, breadcrumb }) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Sidebar />
      <TopHeader title={title} breadcrumb={breadcrumb} />
      <main className="p-3 sm:p-4 md:p-6 lg:p-8">
        {children}
      </main>
    </div>
  )
}
