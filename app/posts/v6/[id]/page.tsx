import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  getPostsWithAxios, 
  getPostWithAxios, 
  getUserWithAxios, 
  getCommentsWithAxios, 
  getPhotosWithAxios, 
  getAlbumsWithAxios, 
  getTodosWithAxios, 
  getPostStatsWithAxios, 
  getRelatedPostsWithAxios 
} from '@/lib/axios-api';

type PageProps = {
  params: {
    id: string;
  };
};

// 모든 포스트 ID를 미리 생성하여 ISR 적용
export async function generateStaticParams() {
  const posts = await getPostsWithAxios();
  
  console.log('\n' + '='.repeat(70));
  console.log('🔥 [V6 - Axios ISR] Generating static params for', posts.length, 'posts');
  console.log('='.repeat(70));
  
  // 모든 포스트 ID를 정적 생성
  return posts.map((post) => ({
    id: post.id.toString(),
  }));
}

export default async function PostV6DetailPage({ params }: PageProps) {
  const { id } = params;
  const postId = Number(id);
  
  // 현재 시간을 표시하여 ISR 동작 확인
  const now = new Date().toLocaleString('ko-KR');
  
  console.log('🔥 [V6 - Axios ISR] Rendering post', postId, 'at', now);
  
  try {
    // Promise.all로 7개 이상의 API 요청을 병렬 처리 (모두 axios 사용)
    const [
      post,
      comments,
      photos,
      albums,
      todos,
      postStats,
      relatedPosts
    ] = await Promise.all([
      getPostWithAxios(postId),
      getCommentsWithAxios(postId),
      getPhotosWithAxios(1), // 첫 번째 앨범의 사진들
      getAlbumsWithAxios(),
      getTodosWithAxios(),
      getPostStatsWithAxios(postId),
      getRelatedPostsWithAxios(postId)
    ]);
    
    if (!post) {
      console.log(`[V6 - Axios ISR] Post ${postId} not found`);
      notFound();
    }
    
    const user = await getUserWithAxios(post.userId);
    
    return (
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-6">
            <Link
              href="/posts/v6"
              className="text-blue-500 hover:text-blue-600 text-sm"
            >
              ← V6 포스트 목록으로 돌아가기
            </Link>
          </div>
          
          <div className="mb-4">
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
              포스트 ID: {post.id}
            </span>
            <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded ml-2">
              ISR 적용
            </span>
            <span className="bg-orange-100 text-orange-800 text-xs font-semibold px-2.5 py-0.5 rounded ml-2">
              🔥 V6: Axios API
            </span>
            <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2.5 py-0.5 rounded ml-2">
              7개 API 병렬 처리 (Axios)
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
            <span>HTTP 클라이언트: {postStats.fetchMethod}</span>
            <span>•</span>
            <span className="text-blue-600">마지막 생성: {now}</span>
          </div>
          
          <p className="text-gray-700 leading-relaxed mb-8">
            {post.body}
          </p>
          
          {/* Axios 정보 섹션 */}
          <div className="mb-8 p-4 bg-orange-50 rounded-lg">
            <h3 className="font-semibold text-orange-900 mb-3">🔥 Axios HTTP 클라이언트 정보</h3>
            <div className="text-sm text-orange-700 space-y-1">
              <p>• 타임아웃: 10초 설정</p>
              <p>• 베이스 URL: https://jsonplaceholder.typicode.com</p>
              <p>• 요청/응답 인터셉터 사용 가능</p>
              <p>• 자동 JSON 파싱</p>
              <p>• Promise 기반 API</p>
              <p>• 상세한 에러 처리</p>
            </div>
          </div>
          
          {/* 관련 포스트 섹션 */}
          {relatedPosts.length > 0 && (
            <div className="mb-8 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">관련 포스트 (Axios로 조회)</h3>
              <div className="space-y-2">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    href={`/posts/v6/${relatedPost.id}`}
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
              댓글 ({comments.length}개) - Axios로 조회
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
              <h3 className="font-semibold text-blue-900 mb-2">사진 정보 (Axios)</h3>
              <p className="text-sm text-blue-700">
                전체 사진: {photos.length}개
              </p>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-2">앨범 정보 (Axios)</h3>
              <p className="text-sm text-green-700">
                전체 앨범: {albums.length}개
              </p>
            </div>
            
            <div className="bg-yellow-50 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-900 mb-2">할일 정보 (Axios)</h3>
              <p className="text-sm text-yellow-700">
                전체 할일: {todos.length}개
              </p>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-orange-50 rounded-lg">
            <h3 className="font-semibold text-orange-900 mb-2">🔥 V6 - Axios + ISR 테스트 정보</h3>
            <div className="text-sm text-orange-700 space-y-1">
              <p>• 이 페이지는 빌드 시 정적 생성됩니다</p>
              <p>• 60초마다 백그라운드에서 재생성됩니다</p>
              <p>• 7개의 API 요청을 Axios로 Promise.all 병렬 처리합니다</p>
              <p>• 총 500개의 포스트가 생성됩니다</p>
              <p>• 모든 HTTP 요청에 Axios 사용</p>
              <p>• 10초 타임아웃 및 에러 처리 적용</p>
              <p>• 콘솔에서 Axios ISR 로그를 확인할 수 있습니다</p>
              <p>• 생성 시간: {now}</p>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error(`[V6 - Axios ISR] Error loading post ${postId}:`, error);
    notFound();
  }
}

// ISR 설정: 60초마다 재생성
export const revalidate = 60; 