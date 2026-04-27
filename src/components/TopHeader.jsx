export function TopHeader({ title, breadcrumb }) {
  return (
    <header className="border-b border-gray-200 dark:border-gray-700 px-3 sm:px-4 md:px-6 lg:px-8 py-2.5 sm:py-3 md:py-4 lg:py-6 bg-white dark:bg-gray-800">
      <nav className="text-xs sm:text-sm flex items-center gap-0.5 sm:gap-1.5 md:gap-2 text-gray-600 dark:text-gray-400 overflow-x-auto">
        {breadcrumb && (
          <>
            {breadcrumb.map((item, idx) => (
              <div key={idx} className="flex items-center gap-0.5 sm:gap-1.5 md:gap-2 whitespace-nowrap">
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
