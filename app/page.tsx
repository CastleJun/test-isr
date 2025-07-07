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
            href="/posts/1"
            className="bg-gray-500 text-white px-6 py-3 rounded-md hover:bg-gray-600 transition-colors"
          >
            첫 번째 포스트 보기
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