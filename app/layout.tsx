import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ISR Blog App',
  description: 'Next.js 14 ISR 블로그 앱',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-6">
                <div className="flex items-center">
                  <h1 className="text-2xl font-bold text-gray-900">
                    ISR Blog
                  </h1>
                </div>
                <nav className="flex space-x-8">
                  <a
                    href="/"
                    className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    홈
                  </a>
                  <a
                    href="/posts"
                    className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium relative group"
                  >
                    포스트 (ISR)
                    <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                      60s
                    </span>
                  </a>
                  <a
                    href="/posts/v2"
                    className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium relative group"
                  >
                    포스트 (Dynamic)
                    <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                      실시간
                    </span>
                  </a>
                  <a
                    href="/posts/v3/1"
                    className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium relative group"
                  >
                    포스트 (cookies)
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                      λ
                    </span>
                  </a>
                  <a
                    href="/posts/v4/1"
                    className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium relative group"
                  >
                    포스트 (notFound)
                    <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                      ƒ
                    </span>
                  </a>
                  <a
                    href="/posts/v5"
                    className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium relative group"
                  >
                    포스트 (dynamicParams)
                    <span className="absolute -top-1 -right-1 bg-yellow-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                      ◐
                    </span>
                  </a>
                  <a
                    href="/posts/v6"
                    className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium relative group"
                  >
                    포스트 (Axios)
                    <span className="absolute -top-1 -right-1 bg-orange-700 text-white text-xs px-1.5 py-0.5 rounded-full">
                      🔥
                    </span>
                  </a>
                  <div className="relative group">
                    <button className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                      비교 테스트 ▼
                    </button>
                    <div className="absolute left-0 mt-2 w-80 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                      <div className="py-2 px-4 bg-gray-100 rounded-t-md">
                        <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wide">빌드 결과 비교</h3>
                      </div>
                      <div className="py-2">
                        <div className="px-2 mb-2">
                          <p className="text-xs text-gray-500 font-medium mb-1">포스트 1번 비교:</p>
                          <div className="grid grid-cols-2 gap-1">
                            <a
                              href="/posts/1"
                              className="block px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md"
                            >
                              🔵 V1 (ISR ƒ)
                            </a>
                            <a
                              href="/posts/v2/1"
                              className="block px-3 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-md"
                            >
                              🟠 V2 (Dynamic)
                            </a>
                            <a
                              href="/posts/v3/1"
                              className="block px-3 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-md"
                            >
                              🔴 V3 (cookies λ)
                            </a>
                            <a
                              href="/posts/v4/1"
                              className="block px-3 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-md"
                            >
                              🟢 V4 (notFound ƒ)
                            </a>
                            <a
                              href="/posts/v5/1"
                              className="block px-3 py-2 text-sm text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 rounded-md"
                            >
                              🟡 V5 (정적 ●)
                            </a>
                            <a
                              href="/posts/v6/1"
                              className="block px-3 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-800 rounded-md"
                            >
                              🔥 V6 (Axios ƒ)
                            </a>
                          </div>
                        </div>
                        <div className="border-t border-gray-200"></div>
                        <div className="px-2 mt-2">
                          <p className="text-xs text-gray-500 font-medium mb-1">포스트 100번 비교:</p>
                          <div className="grid grid-cols-2 gap-1">
                            <a
                              href="/posts/100"
                              className="block px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md"
                            >
                              🔵 V1 (ISR ƒ)
                            </a>
                            <a
                              href="/posts/v2/100"
                              className="block px-3 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-md"
                            >
                              🟠 V2 (Dynamic)
                            </a>
                            <a
                              href="/posts/v3/100"
                              className="block px-3 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-md"
                            >
                              🔴 V3 (cookies λ)
                            </a>
                            <a
                              href="/posts/v4/100"
                              className="block px-3 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-md"
                            >
                              🟢 V4 (notFound ƒ)
                            </a>
                            <a
                              href="/posts/v5/100"
                              className="block px-3 py-2 text-sm text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 rounded-md"
                            >
                              🟡 V5 (동적 λ)
                            </a>
                            <a
                              href="/posts/v6/100"
                              className="block px-3 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-800 rounded-md"
                            >
                              🔥 V6 (Axios ƒ)
                            </a>
                          </div>
                        </div>
                        <div className="border-t border-gray-200 mt-2"></div>
                        <div className="grid grid-cols-2 gap-1 px-2">
                          <a
                            href="/posts/v4/999"
                            className="block px-3 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-md"
                          >
                            🔄 redirect 테스트 (999)
                          </a>
                          <a
                            href="/posts/v4/9999"
                            className="block px-3 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-md"
                          >
                            🚫 notFound 테스트 (9999)
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </nav>
              </div>
            </div>
          </header>
          <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
} 