import Link from 'next/link';
import { getPostsWithAxios } from '@/lib/axios-api';
import PostList from '@/components/PostList';

export default async function PostsV6Page() {
  const posts = await getPostsWithAxios();
  const now = new Date().toLocaleString('ko-KR');
  
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          모든 포스트 (V6 - Axios)
        </h1>
        <p className="text-gray-600 mb-2">
          Axios + ISR 적용 - 60초마다 재생성
        </p>
        <p className="text-sm text-gray-500">
          마지막 생성 시간: {now}
        </p>
        <p className="text-sm text-blue-600 mt-2">
          총 {posts.length}개 포스트 (Axios + ISR 적용)
        </p>
        <div className="bg-orange-50 p-3 rounded-lg mt-4 inline-block">
          <p className="text-sm text-orange-800">
            🔥 V6: Axios를 사용한 HTTP 클라이언트로 API 요청 처리
          </p>
        </div>
      </div>
      <PostList posts={posts} basePath="/posts/v6" />
      
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
  );
}

// ISR 설정: 60초마다 재생성
export const revalidate = 60; 