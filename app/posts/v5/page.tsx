import Link from 'next/link';
import { getPosts } from '@/lib/api';

export default async function PostsV5Page() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* V5 헤더 */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
          <div className="flex items-center mb-4">
            <div className="bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full mr-3">
              ◐ Mixed
            </div>
            <h1 className="text-3xl font-bold text-yellow-800">
              포스트 V5 목록 (dynamicParams = true only)
            </h1>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-yellow-700 mb-4">
            <div>
              <p><strong>설정:</strong> dynamicParams = true</p>
              <p><strong>revalidate:</strong> 설정 안 함</p>
              <p><strong>정적 생성:</strong> 처음 10개만</p>
            </div>
            <div>
              <p><strong>동적 생성:</strong> 11번 이후</p>
              <p><strong>빌드 결과:</strong> ● (SSG) + λ (Dynamic)</p>
              <p><strong>총 포스트:</strong> {posts.length}개</p>
            </div>
          </div>

          <div className="p-4 bg-yellow-100 rounded-lg">
            <h3 className="font-semibold text-yellow-800 mb-2">🟡 dynamicParams 동작 원리</h3>
            <p className="text-yellow-700 text-sm mb-2">
              generateStaticParams에서 반환하지 않은 동적 경로에 대해 404 대신 런타임에 페이지를 생성할지 결정합니다.
            </p>
            <div className="text-xs text-yellow-600 space-y-1">
              <p>• dynamicParams = true (기본값): 런타임에 동적 생성</p>
              <p>• dynamicParams = false: 404 페이지 반환</p>
            </div>
          </div>
        </div>

        {/* 테스트 섹션 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* 정적 생성 포스트 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-blue-800 mb-4">
              🔵 정적 생성 포스트 (1-10)
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              빌드 시 미리 생성된 페이지들입니다.
            </p>
            <div className="grid grid-cols-2 gap-2">
              {posts.slice(0, 10).map((post) => (
                <Link
                  key={post.id}
                  href={`/posts/v5/${post.id}`}
                  className="block p-3 border border-blue-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all"
                >
                  <div className="text-sm font-medium text-blue-800">
                    포스트 {post.id}
                  </div>
                  <div className="text-xs text-gray-600 mt-1 line-clamp-2">
                    {post.title}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* 동적 생성 포스트 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-orange-800 mb-4">
              🟠 동적 생성 포스트 (11+)
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              런타임에 요청 시 생성되는 페이지들입니다.
            </p>
            <div className="grid grid-cols-2 gap-2">
              {[11, 25, 50, 100, 200, 300, 400, 500].map((id) => (
                <Link
                  key={id}
                  href={`/posts/v5/${id}`}
                  className="block p-3 border border-orange-200 rounded-lg hover:border-orange-400 hover:shadow-md transition-all"
                >
                  <div className="text-sm font-medium text-orange-800">
                    포스트 {id}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    런타임 생성
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* 전체 포스트 목록 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              전체 포스트 목록 ({posts.length}개)
            </h2>
            <div className="text-sm text-gray-600">
              정적: 10개 | 동적: {posts.length - 10}개
            </div>
          </div>
          
          {/* 요약 통계 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{posts.slice(0, 10).length}</div>
              <div className="text-sm text-blue-600">정적 생성</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{posts.length - 10}</div>
              <div className="text-sm text-orange-600">동적 생성</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{posts.length}</div>
              <div className="text-sm text-yellow-600">총 포스트</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-600">500</div>
              <div className="text-sm text-gray-600">최대 ID</div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/posts/v5/${post.id}`}
                className="block border border-gray-200 rounded-lg p-3 hover:border-yellow-300 hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900">
                    #{post.id}
                  </span>
                  {post.id <= 10 ? (
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      ●
                    </span>
                  ) : (
                    <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded">
                      λ
                    </span>
                  )}
                </div>
                <h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-xs text-gray-600 line-clamp-2">
                  {post.body}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* 네비게이션 */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <Link
            href="/posts"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            V1 (ISR)
          </Link>
          <Link
            href="/posts/v2"
            className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors"
          >
            V2 (Dynamic)
          </Link>
          <Link
            href="/posts/v3"
            className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors"
          >
            V3 (ISR + cookies)
          </Link>
          <Link
            href="/posts/v4"
            className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
          >
            V4 (ISR + notFound)
          </Link>
          <Link
            href="/posts/v6"
            className="bg-orange-700 text-white px-6 py-3 rounded-lg hover:bg-orange-800 transition-colors"
          >
            🔥 V6 (Axios)
          </Link>
          <Link
            href="/"
            className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors"
          >
            ← 홈으로
          </Link>
        </div>
      </div>
    </div>
  );
} 