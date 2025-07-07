import Link from 'next/link';
import { getPosts } from '@/lib/api';

export default async function PostsV3Page() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* V3 헤더 */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
          <div className="flex items-center mb-4">
            <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full mr-3">
              λ Dynamic
            </div>
            <h1 className="text-3xl font-bold text-red-800">
              포스트 V3 목록 (ISR + cookies() API)
            </h1>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-red-700 mb-4">
            <div>
              <p><strong>설정:</strong> revalidate = 60초</p>
              <p><strong>Dynamic API:</strong> cookies() 사용</p>
              <p><strong>예상 빌드:</strong> ● (SSG)</p>
            </div>
            <div>
              <p><strong>실제 동작:</strong> λ (Dynamic)</p>
              <p><strong>이유:</strong> cookies() API로 인한 동적 렌더링</p>
              <p><strong>총 포스트:</strong> {posts.length}개</p>
            </div>
          </div>

          <div className="p-4 bg-red-100 rounded-lg">
            <h3 className="font-semibold text-red-800 mb-2">🔴 cookies() Dynamic API 테스트</h3>
            <p className="text-red-700 text-sm mb-2">
              ISR 설정이 있어도 cookies() API 사용으로 인해 모든 요청이 동적으로 렌더링됩니다.
            </p>
            <div className="text-xs text-red-600 space-y-1">
              <p>• 빌드 시: ● (SSG)로 표시되지만 실제로는 동적</p>
              <p>• 런타임: 매 요청마다 서버에서 렌더링</p>
              <p>• ISR 캐싱 무효화</p>
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
                href={`/posts/v3/${post.id}`}
                className="block border border-gray-200 rounded-lg p-4 hover:border-red-300 hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900">
                    포스트 #{post.id}
                  </span>
                  <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
                    Dynamic
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

        {/* 샘플 포스트 링크 */}
        <div className="mt-8 bg-red-50 border border-red-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-red-800 mb-4">🧪 cookies() API 테스트</h3>
          <p className="text-red-700 text-sm mb-4">
            아래 링크들을 클릭하여 cookies() API가 실제로 동적 렌더링을 유발하는지 확인해보세요.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 10, 50, 100, 200, 300, 400, 500].map((id) => (
              <Link
                key={id}
                href={`/posts/v3/${id}`}
                className="block p-3 border border-red-200 rounded-lg hover:border-red-400 hover:shadow-md transition-all text-center"
              >
                <div className="text-sm font-medium text-red-800">
                  포스트 {id}
                </div>
                <div className="text-xs text-red-600 mt-1">
                  Dynamic 렌더링
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
            href="/posts/v4"
            className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
          >
            V4 (ISR + notFound)
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