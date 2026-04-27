export function TopHeader({ title, breadcrumb }) {
  return (
    <header className="border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 md:px-8 py-4 sm:py-6 bg-white dark:bg-gray-800">
      <nav className="text-xs sm:text-sm flex items-center gap-1 sm:gap-2 text-gray-600 dark:text-gray-400 overflow-x-auto">
        {breadcrumb && (
          <>
            {breadcrumb.map((item, idx) => (
              <div key={idx} className="flex items-center gap-1 sm:gap-2 whitespace-nowrap">
                {idx > 0 && <span className="text-gray-400 dark:text-gray-600">/</span>}
                <span className={idx === breadcrumb.length - 1 ? 'text-gray-900 dark:text-white font-medium' : ''}>
                  {item}
                </span>
              </div>
            ))}
          </>
        )}
      </nav>
    </header>
  )
}
