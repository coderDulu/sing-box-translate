'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';

const routers = [
  {
    path: '/',
    name: 'Home Page',
  },
  {
    path: '/about',
    name: 'About Page',
  },
  {
    path: '/blog/post',
    name: 'Post Page',
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
  },
  {
    path: '/keepalive',
    name: 'KeepAlive',
  },
];
function Menu() {
  const pathname = usePathname();
  return (
    <div className="w-full text-center">
      <ul className="flex divide-x overflow-hidden text-center font-mono text-sm font-bold leading-6 shadow-lg dark:divide-slate-700">
        {routers.map((item) => (
          <li
            key={item.path}
            className={clsx(
              'bg-white px-4 leading-10 text-slate-400 dark:bg-slate-800',
              {
                'text-slate-900 dark:text-slate-100': pathname === item.path,
              }
            )}
          >
            <Link href={item.path}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Menu;
