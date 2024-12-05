import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

// 获取文件列表
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const currentPath = searchParams.get('path') || '';
    const fileName = searchParams.get('file');

    if (fileName) {
      // 安全检查：确保文件名不包含 .. 等路径遍历字符
      if (fileName.includes('..') || !fileName.endsWith('.js')) {
        return NextResponse.json(
          { error: 'Invalid file path' },
          { status: 403 }
        );
      }

      const filePath = path.join(__dirname, fileName);
      try {
        const content = await fs.readFile(filePath, 'utf-8');
        // 直接返回文件内容，设置 Content-Type 为 text/plain
        return new NextResponse(content, {
          headers: {
            'Content-Type': 'text/plain; charset=utf-8',
          },
        });
      } catch (fileError) {
        return NextResponse.json(
          { error: 'Failed to read file' },
          { status: 404 }
        );
      }
    }

    // 构建完整的文件系统路径
    const fullPath = path.join(__dirname);
    
    // 读取目录内容
    const items = await fs.readdir(fullPath, { withFileTypes: true });
    
    // 构建文件和目录列表
    const files = await Promise.all(
      items.map(async (item) => {
        const itemPath = path.join(currentPath, item.name);
        const stats = await fs.stat(path.join(fullPath, item.name));
        
        return {
          name: item.name,
          path: itemPath,
          isDirectory: item.isDirectory(),
          size: stats.size,
          modifiedAt: stats.mtime,
        };
      })
    );

    return NextResponse.json({
      files,
      currentPath,
    });
  } catch (error) {
    console.error('Error reading directory:', error);
    return NextResponse.json(
      { error: 'Failed to read directory' },
      { status: 500 }
    );
  }
}