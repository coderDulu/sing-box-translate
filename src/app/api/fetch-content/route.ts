import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// 从 localStorage 或其他存储中获取配置的函数
let lastConfig = {}; // 注意：这只是临时存储，服务器重启后会丢失

// 设置配置的函数
export function setConfig(config: any) {
  lastConfig = config;
}

export async function GET() {
  try {
    return NextResponse.json(lastConfig, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const config = await request.json();
  setConfig(config);
  return NextResponse.json({ message: 'Config saved' });
}
