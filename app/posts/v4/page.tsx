import Link from 'next/link';
import { getPosts } from '@/lib/api';

export default async function PostsV4Page() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* V4 헤더 */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
          <div className="flex items-center mb-4">
            <div className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full mr-3">
              ƒ ISR
            </div>
            <h1 className="text-3xl font-bold text-green-800">
              포스트 V4 목록 (ISR + notFound/redirect)
            </h1>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-green-700 mb-4">
            <div>
              <p><strong>설정:</strong> revalidate = 60초</p>
              <p><strong>API 사용:</strong> notFound(), redirect()</p>
              <p><strong>빌드 결과:</strong> ● (SSG)</p>
            </div>
            <div>
              <p><strong>실제 동작:</strong> ƒ (ISR)</p>
              <p><strong>이유:</strong> 조건부 호출로 ISR 호환</p>
              <p><strong>총 포스트:</strong> {posts.length}개</p>
            </div>
          </div>

          <div className="p-4 bg-green-100 rounded-lg">
            <h3 className="font-semibold text-green-800 mb-2">🟢 notFound/redirect ISR 호환성 테스트</h3>
            <p className="text-green-700 text-sm mb-2">
              notFound()와 redirect()는 조건부로 호출되므로 ISR과 호환됩니다.
            </p>
            <div className="text-xs text-green-600 space-y-1">
              <p>• 정상 포스트: ISR 캐싱 적용</p>
              <p>• 999번 포스트: redirect("/posts") 실행</p>
              <p>• 9999번 포스트: notFound() 실행</p>
            </div>
          </div>
        </div>

        {/* 포스트 목록 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            전체 포스트 목록 ({posts.length}개)
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/posts/v4/${post.id}`}
                className="block border border-gray-200 rounded-lg p-4 hover:border-green-300 hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900">
                    포스트 #{post.id}
                  </span>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                    ISR
                  </span>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-3">
                  {post.body}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* 특별 테스트 케이스 */}
        <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-800 mb-4">🧪 notFound/redirect 테스트</h3>
          <p className="text-green-700 text-sm mb-4">
            특수 케이스를 테스트해보세요:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 정상 포스트 */}
            <div className="bg-white rounded-lg p-4 border border-green-200">
              <h4 className="font-semibold text-green-800 mb-3">✅ 정상 포스트 (ISR)</h4>
              <div className="space-y-2">
                {[1, 10, 50, 100, 200].map((id) => (
                  <Link
                    key={id}
                    href={`/posts/v4/${id}`}
                    className="block p-2 border border-green-100 rounded hover:border-green-300 transition-all text-center"
                  >
                    <div className="text-sm font-medium text-green-800">
                      포스트 {id}
                    </div>
                    <div className="text-xs text-green-600">
                      ISR 캐싱
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* redirect 테스트 */}
            <div className="bg-white rounded-lg p-4 border border-yellow-200">
              <h4 className="font-semibold text-yellow-800 mb-3">🔄 Redirect 테스트</h4>
              <Link
                href="/posts/v4/999"
                className="block p-3 border border-yellow-200 rounded hover:border-yellow-400 transition-all text-center"
              >
                <div className="text-sm font-medium text-yellow-800">
                  포스트 999
                </div>
                <div className="text-xs text-yellow-600 mt-1">
                  → redirect("/posts")
                </div>
              </Link>
              <p className="text-xs text-yellow-600 mt-2">
                존재하지 않는 ID로 리디렉션 테스트
              </p>
            </div>

            {/* notFound 테스트 */}
            <div className="bg-white rounded-lg p-4 border border-red-200">
              <h4 className="font-semibold text-red-800 mb-3">🚫 NotFound 테스트</h4>
              <Link
                href="/posts/v4/9999"
                className="block p-3 border border-red-200 rounded hover:border-red-400 transition-all text-center"
              >
                <div className="text-sm font-medium text-red-800">
                  포스트 9999
                </div>
                <div className="text-xs text-red-600 mt-1">
                  → notFound()
                </div>
              </Link>
              <p className="text-xs text-red-600 mt-2">
                매우 큰 ID로 404 테스트
              </p>
            </div>
          </div>
        </div>

        {/* 일반 샘플 포스트 */}
        <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-800 mb-4">📋 일반 포스트 빠른 접근</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[300, 400, 500, 250, 350, 450, 150, 380].map((id) => (
              <Link
                key={id}
                href={`/posts/v4/${id}`}
                className="block p-3 border border-green-200 rounded-lg hover:border-green-400 hover:shadow-md transition-all text-center"
              >
                <div className="text-sm font-medium text-green-800">
                  포스트 {id}
                </div>
                <div className="text-xs text-green-600 mt-1">
                  ISR 렌더링
                </div>
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
            href="/posts/v5"
            className="bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition-colors"
          >
            V5 (dynamicParams)
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