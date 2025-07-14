import Link from 'next/link';
import { getPosts } from '@/lib/api';
import PostList from '@/components/PostList';

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          ISR 블로그에 오신 것을 환영합니다
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Next.js 14 App Router와 ISR(Incremental Static Regeneration)을 활용한 블로그
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            href="/posts"
            className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-colors"
          >
            모든 포스트 보기
          </Link>
          <Link
            href="/posts/v6"
            className="bg-orange-700 text-white px-6 py-3 rounded-md hover:bg-orange-800 transition-colors"
          >
            🔥 V6 (Axios) 보기
          </Link>
          <Link
            href="/posts/1"
            className="bg-gray-500 text-white px-6 py-3 rounded-md hover:bg-gray-600 transition-colors"
          >
            첫 번째 포스트 보기
          </Link>
        </div>
      </div>
      
      {/* 버전별 테스트 섹션 */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          📊 버전별 렌더링 테스트
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            href="/posts"
            className="block p-4 border border-blue-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all"
          >
            <div className="text-lg font-semibold text-blue-800 mb-2">
              🔵 V1 - ISR (기본)
            </div>
            <div className="text-sm text-gray-600 mb-2">
              revalidate: 60초
            </div>
            <div className="text-xs text-gray-500">
              빌드 시 정적 생성 + 60초마다 재생성
            </div>
          </Link>

          <Link
            href="/posts/v2"
            className="block p-4 border border-orange-200 rounded-lg hover:border-orange-400 hover:shadow-md transition-all"
          >
            <div className="text-lg font-semibold text-orange-800 mb-2">
              🟠 V2 - Dynamic
            </div>
            <div className="text-sm text-gray-600 mb-2">
              force-dynamic 적용
            </div>
            <div className="text-xs text-gray-500">
              모든 요청마다 서버에서 렌더링
            </div>
          </Link>

          <Link
            href="/posts/v3/1"
            className="block p-4 border border-red-200 rounded-lg hover:border-red-400 hover:shadow-md transition-all"
          >
            <div className="text-lg font-semibold text-red-800 mb-2">
              🔴 V3 - ISR + cookies()
            </div>
            <div className="text-sm text-gray-600 mb-2">
              ISR + cookies() 사용
            </div>
            <div className="text-xs text-gray-500">
              cookies() 함수로 인한 dynamic 렌더링
            </div>
          </Link>

          <Link
            href="/posts/v4/1"
            className="block p-4 border border-green-200 rounded-lg hover:border-green-400 hover:shadow-md transition-all"
          >
            <div className="text-lg font-semibold text-green-800 mb-2">
              🟢 V4 - ISR + notFound()
            </div>
            <div className="text-sm text-gray-600 mb-2">
              ISR + notFound/redirect 테스트
            </div>
            <div className="text-xs text-gray-500">
              조건부 notFound() 및 redirect() 처리
            </div>
          </Link>

          <Link
            href="/posts/v5"
            className="block p-4 border border-yellow-200 rounded-lg hover:border-yellow-400 hover:shadow-md transition-all"
          >
            <div className="text-lg font-semibold text-yellow-800 mb-2">
              🟡 V5 - dynamicParams
            </div>
            <div className="text-sm text-gray-600 mb-2">
              dynamicParams = true
            </div>
            <div className="text-xs text-gray-500">
              일부 정적 + 일부 동적 생성
            </div>
          </Link>

          <Link
            href="/posts/v6"
            className="block p-4 border border-orange-300 rounded-lg hover:border-orange-500 hover:shadow-md transition-all bg-gradient-to-r from-orange-50 to-red-50"
          >
            <div className="text-lg font-semibold text-orange-900 mb-2">
              🔥 V6 - Axios + ISR
            </div>
            <div className="text-sm text-gray-600 mb-2">
              Axios HTTP 클라이언트
            </div>
            <div className="text-xs text-gray-500">
              axios로 모든 API 요청 처리 + ISR
            </div>
          </Link>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          최신 포스트 (ISR 적용 - 60초마다 재생성)
        </h2>
        <PostList posts={posts.slice(0, 6)} />
      </div>
      
      <div className="text-center">
        <p className="text-sm text-gray-500">
          이 데이터는 JSONPlaceholder API에서 가져온 것이며, 60초마다 재생성됩니다.
        </p>
      </div>
    </div>
  );
} 