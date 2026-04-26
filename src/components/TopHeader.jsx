export function TopHeader({ title, breadcrumb }) {
  return (
    <header className="border-b border-gray-200 px-4 sm:px-6 md:px-8 py-4 sm:py-6">
      <nav className="text-xs sm:text-sm flex items-center gap-1 sm:gap-2 text-gray-600 overflow-x-auto">
        {breadcrumb && (
          <>
            {breadcrumb.map((item, idx) => (
              <div key={idx} className="flex items-center gap-1 sm:gap-2 whitespace-nowrap">
                {idx > 0 && <span className="text-gray-400">/</span>}
                <span className={idx === breadcrumb.length - 1 ? 'text-gray-900 font-medium' : ''}>
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
