export default function TopMenu() {
  const menuItems = [
    { id: 'home', label: 'Home', href: '#home' },
    { id: 'about', label: 'About', href: '#about' },
    { id: 'experience', label: 'Experience', href: '#experience' },
    { id: 'projects', label: 'Projects', href: '#projects' },
    { id: 'contact', label: 'Contact', href: '#contact' },
  ]

  return (
    <nav className="fixed top-6 left-0 right-0 z-40 flex justify-center">
      <div className="flex gap-4 px-6 py-2 bg-tertiary-dark/50 dark:bg-tertiary-light/50 backdrop-blur-md rounded-full border border-white/20 dark:border-white/10 shadow-lg dark:shadow-white/10">
        {menuItems.map((item) => (
          <a
            key={item.id}
            href={item.href}
            className="px-4 py-2 text-gray-900 dark:text-gray-100 rounded-full hover:bg-white/20 dark:hover:bg-white/10 transition-colors duration-200 font-medium"
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  )
}

