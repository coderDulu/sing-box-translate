'use client';

import React, { useState, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { convertToSingBoxJson } from '@/lib/trans';
import { useToast } from '@/hooks/use-toast';

export default function UrlInput() {
  const [url, setUrl] = useState('');
  const [template, setTemplate] = useState({});
  const [apiUrl, setApiUrl] = useState('');
  const { toast } = useToast();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const template = await convertToSingBoxJson(url);
    setTemplate(template);
    toast({
      description: '配置已生成',
    });

    // 发送配置到后端
    try {
      const response = await fetch('/api/fetch-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(template),
      });

      if (response.ok) {
        
        // 设置可访问的 API URL
        setApiUrl(`${window.location.origin}/api/fetch-content`);
      }
    } catch (error) {
      console.error('Error saving config:', error);
    }
  };

  const copyApiUrl = () => {
    navigator.clipboard.writeText(apiUrl).then(() => {
      toast({
        description: '已复制到剪贴板',
      });
    });
  };

  return (
    <div className="card">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Textarea
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full"
            placeholder="Sub Store 订阅管理 - 点击订阅复制 Sing-box订阅链接"
          />
        </div>
        <Button className="mx-auto block w-full md:w-96" type="submit">
          开始转换
        </Button>

        <Textarea
          rows={40}
          value={JSON.stringify(template, null, 2)}
          className="w-full"
          readOnly
          placeholder="生成后的模板"
        />
        {apiUrl && (
          <div className="text-center flex flex-col items-center gap-2">
            <p>配置已生成，可通过以下链接访问：</p>
            <Button onClick={copyApiUrl} variant="outline">
              复制链接
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}
