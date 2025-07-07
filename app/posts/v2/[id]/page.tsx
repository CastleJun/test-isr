import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  getPosts, 
  getPost, 
  getUser, 
  getComments, 
  getPhotos, 
  getAlbums, 
  getTodos, 
  getPostStats, 
  getRelatedPosts 
} from '@/lib/api';

type PageProps = {
  params: {
    id: string;
  };
};

// 모든 포스트 ID를 미리 생성하여 dynamic 적용
export async function generateStaticParams() {
  const posts = await getPosts();
  
  console.log('\n' + '='.repeat(70));
  console.log('🟠 [V2 - Dynamic] Generating static params for', posts.length, 'posts');
  console.log('='.repeat(70));
  
  // 모든 포스트 ID를 정적 생성
  return posts.map((post) => ({
    id: post.id.toString(),
  }));
}

export default async function PostDetailPageV2({ params }: PageProps) {
  const { id } = params;
  const postId = Number(id);
  
  // 현재 시간을 표시하여 동적 렌더링 동작 확인
  const now = new Date().toLocaleString('ko-KR');
  
  console.log('🟠 [V2 - Dynamic] Rendering post', postId, 'at', now);
  
  try {
    // Promise.all로 5개 이상의 API 요청을 병렬 처리
    const [
      post,
      comments,
      photos,
      albums,
      todos,
      postStats,
      relatedPosts
    ] = await Promise.all([
      getPost(postId),
      getComments(postId),
      getPhotos(1), // 첫 번째 앨범의 사진들
      getAlbums(),
      getTodos(),
      getPostStats(postId),
      getRelatedPosts(postId)
    ]);
    
    if (!post) {
      console.log(`[Dynamic] Post ${postId} not found`);
      notFound();
    }
    
    const user = await getUser(post.userId);
    
    return (
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-6">
            <Link
              href="/posts"
              className="text-blue-500 hover:text-blue-600 text-sm"
            >
              ← 포스트 목록으로 돌아가기
            </Link>
          </div>
          
          <div className="mb-4">
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
              포스트 ID: {post.id}
            </span>
            <span className="bg-orange-100 text-orange-800 text-xs font-semibold px-2.5 py-0.5 rounded ml-2">
              Dynamic 적용
            </span>
            <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2.5 py-0.5 rounded ml-2">
              7개 API 병렬 처리
            </span>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center mb-6 text-sm text-gray-500 gap-2">
            <span>작성자: {user.name} ({user.username})</span>
            <span>•</span>
            <span>이메일: {user.email}</span>
            <span>•</span>
            <span>읽기 시간: {postStats.estimatedReadTime}분</span>
            <span>•</span>
            <span>단어 수: {postStats.wordCount}개</span>
            <span>•</span>
            <span className="text-orange-600">마지막 생성: {now}</span>
          </div>
          
          <p className="text-gray-700 leading-relaxed mb-8">
            {post.body}
          </p>
          
          {/* 관련 포스트 섹션 */}
          {relatedPosts.length > 0 && (
            <div className="mb-8 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">관련 포스트</h3>
              <div className="space-y-2">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    href={`/posts/v2/${relatedPost.id}`}
                    className="block text-blue-600 hover:text-blue-800 text-sm"
                  >
                    • {relatedPost.title}
                  </Link>
                ))}
              </div>
            </div>
          )}
          
          {/* 댓글 섹션 */}
          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold mb-4">
              댓글 ({comments.length}개)
            </h2>
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-gray-900">
                      {comment.name}
                    </h3>
                    <span className="text-sm text-gray-500">
                      {comment.email}
                    </span>
                  </div>
                  <p className="text-gray-700">
                    {comment.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          {/* 추가 정보 섹션 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">사진 정보</h3>
              <p className="text-sm text-blue-700">
                전체 사진: {photos.length}개
              </p>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-2">앨범 정보</h3>
              <p className="text-sm text-green-700">
                전체 앨범: {albums.length}개
              </p>
            </div>
            
            <div className="bg-yellow-50 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-900 mb-2">할일 정보</h3>
              <p className="text-sm text-yellow-700">
                전체 할일: {todos.length}개
              </p>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-orange-50 rounded-lg">
            <h3 className="font-semibold text-orange-900 mb-2">Dynamic 렌더링 정보</h3>
            <div className="text-sm text-orange-700 space-y-1">
              <p>• 이 페이지는 요청 시마다 동적으로 렌더링됩니다</p>
              <p>• 캐시를 사용하지 않고 항상 최신 데이터를 가져옵니다</p>
              <p>• 7개의 API 요청을 Promise.all로 병렬 처리합니다</p>
              <p>• 총 500개의 포스트가 생성됩니다</p>
              <p>• 콘솔에서 Dynamic 로그를 확인할 수 있습니다</p>
              <p>• 생성 시간: {now}</p>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error(`[Dynamic] Error loading post ${postId}:`, error);
    notFound();
  }
}

// Dynamic 설정: 매 요청마다 동적 렌더링
export const dynamic = 'force-dynamic'; 