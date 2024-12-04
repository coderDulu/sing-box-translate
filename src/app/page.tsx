'use client';

import UrlInput from '@/components/UrlInput';

export default function Home() {
  return (
    <div className="flex h-full w-full flex-col items-center overflow-auto pt-4">
      <h1 className='shadow-md text-2xl font-bold'>Sub-Store - Sing-box 分流规则管理</h1>
      <UrlInput />
    </div>
  );
}
