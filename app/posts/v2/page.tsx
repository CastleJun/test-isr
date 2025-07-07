import { getPosts } from '@/lib/api';
import PostList from '@/components/PostList';

export default async function PostsV2Page() {
  const posts = await getPosts();
  const now = new Date().toLocaleString('ko-KR');
  
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          모든 포스트 (Dynamic)
        </h1>
        <p className="text-orange-600 mb-2">
          Dynamic 렌더링 - 매 요청마다 최신 데이터
        </p>
        <p className="text-sm text-gray-500">
          마지막 생성 시간: {now}
        </p>
        <p className="text-sm text-orange-600 mt-2">
          총 {posts.length}개 포스트 (모든 포스트 Dynamic 렌더링)
        </p>
        <div className="mt-4 p-4 bg-orange-50 rounded-lg">
          <h3 className="font-semibold text-orange-900 mb-2">Dynamic 렌더링 특징</h3>
          <div className="text-sm text-orange-700 space-y-1">
            <p>• 매 요청마다 서버에서 새로 렌더링</p>
            <p>• 캐시를 사용하지 않아 항상 최신 데이터</p>
            <p>• 실시간 업데이트가 필요한 경우 적합</p>
            <p>• 페이지 새로고침 시 항상 새로운 시간 표시</p>
          </div>
        </div>
      </div>
      <PostList posts={posts} basePath="/posts/v2" />
    </div>
  );
}

// Dynamic 설정: 매 요청마다 동적 렌더링
export const dynamic = 'force-dynamic'; 