import { getPosts } from '@/lib/api';
import PostList from '@/components/PostList';

export default async function PostsPage() {
  const posts = await getPosts();
  const now = new Date().toLocaleString('ko-KR');
  
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          모든 포스트
        </h1>
        <p className="text-gray-600 mb-2">
          ISR 적용 - 60초마다 재생성
        </p>
        <p className="text-sm text-gray-500">
          마지막 생성 시간: {now}
        </p>
        <p className="text-sm text-blue-600 mt-2">
          총 {posts.length}개 포스트 (모든 포스트 ISR 적용)
        </p>
      </div>
      <PostList posts={posts} enablePrefetchOnHover={true} />
    </div>
  );
}

// ISR 설정: 60초마다 재생성
export const revalidate = 60; 