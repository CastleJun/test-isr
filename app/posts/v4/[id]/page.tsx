import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
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

// ISR 설정 - 60초마다 재생성
export const revalidate = 60;

// 모든 포스트 ID를 미리 생성하여 ISR 적용
export async function generateStaticParams() {
  const posts = await getPosts();
  
  console.log('\n' + '='.repeat(70));
  console.log('🟢 [V4 - ISR + notFound/redirect] Generating static params for', posts.length, 'posts');
  console.log('='.repeat(70));
  
  // 모든 포스트 ID를 정적 생성
  return posts.map((post) => ({
    id: post.id.toString(),
  }));
}

export default async function PostDetailPageV4({ params }: PageProps) {
  const { id } = params;
  const postId = Number(id);
  
  // 현재 시간을 표시하여 ISR 동작 확인
  const now = new Date().toLocaleString('ko-KR');
  
  console.log('🟢 [V4 - ISR + notFound/redirect] Rendering post', postId, 'at', now);
  
  // 🔍 특정 조건에서 redirect 테스트
  if (postId === 999) {
    console.log(`[V4 ISR + notFound/redirect] Redirecting post ${postId} to post 1`);
    redirect('/posts/v4/1');
  }
  
  try {
    // Promise.all로 7개 API 병렬 요청
    const [post, user, comments, photos, albums, todos, postStats, relatedPosts] = await Promise.all([
      getPost(postId),
      getUser(1),
      getComments(postId),
      getPhotos(1),
      getAlbums(),
      getTodos(),
      getPostStats(postId),
      getRelatedPosts(postId)
    ]);

    // 🔍 조건부 notFound 테스트
    if (!post) {
      console.log(`[V4 ISR + notFound/redirect] Post ${postId} not found`);
      notFound();
    }
    
    // 🔍 특정 조건에서 notFound 테스트
    if (postId === 9999) {
      console.log(`[V4 ISR + notFound/redirect] Forcing notFound for post ${postId}`);
      notFound();
    }

    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* V4 헤더 - ISR + notFound/redirect 정보 */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
            <div className="flex items-center mb-4">
              <div className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full mr-3">
                ƒ ISR
              </div>
              <h1 className="text-2xl font-bold text-green-800">
                포스트 V4 (ISR + notFound/redirect)
              </h1>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-green-700">
              <div>
                <p><strong>렌더링 시간:</strong> {now}</p>
                <p><strong>ISR 설정:</strong> 60초 revalidate</p>
                <p><strong>사용된 함수:</strong> notFound(), redirect()</p>
              </div>
              <div>
                <p><strong>Dynamic API:</strong> 사용 안 함</p>
                <p><strong>예상 빌드 결과:</strong> ƒ (ISR)</p>
                <p><strong>실제 동작:</strong> 60초 캐싱 + 조건부 리다이렉트</p>
              </div>
            </div>

            <div className="mt-4 p-4 bg-green-100 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">✅ ISR 호환성 테스트</h3>
              <p className="text-green-700 text-sm">
                notFound()와 redirect()를 사용했지만 Dynamic API가 아니므로 ISR이 유지됩니다.
                빌드 결과에서 ƒ (ISR) 마크가 나타나야 합니다.
              </p>
            </div>
          </div>

          {/* 테스트 케이스 설명 */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-blue-800 mb-4">🧪 테스트 케이스</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700">
              <div>
                <p><strong>redirect() 테스트:</strong></p>
                <p>• 포스트 ID 999 → 포스트 1로 리다이렉트</p>
                <p>• <code>/posts/v4/999</code> 접속 시 발생</p>
              </div>
              <div>
                <p><strong>notFound() 테스트:</strong></p>
                <p>• 포스트 ID 9999 → 404 페이지</p>
                <p>• <code>/posts/v4/9999</code> 접속 시 발생</p>
              </div>
            </div>
          </div>

          {/* 포스트 내용 */}
          <article className="bg-white rounded-lg shadow-md p-8 mb-8">
            <header className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-500">포스트 #{post.id}</span>
                <span className="text-sm text-gray-500">작성자: User {post.userId}</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
            </header>
            
            <div className="prose max-w-none text-gray-700 mb-8">
              {post.body}
            </div>
          </article>

          {/* API 병렬 요청 결과 표시 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* 댓글 정보 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">💬 댓글</h3>
              <p className="text-2xl font-bold text-blue-600 mb-2">{comments.length}개</p>
              <p className="text-sm text-gray-600">총 댓글 수</p>
            </div>

            {/* 포스트 통계 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 통계</h3>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">댓글 수:</span> {postStats.commentsCount}</p>
                <p><span className="font-medium">단어 수:</span> {postStats.wordCount}</p>
                <p><span className="font-medium">읽기 시간:</span> {postStats.estimatedReadTime}분</p>
              </div>
            </div>

            {/* 사진 정보 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">📸 사진</h3>
              <p className="text-2xl font-bold text-green-600 mb-2">{photos.length}개</p>
              <p className="text-sm text-gray-600">앨범의 사진</p>
            </div>

            {/* 앨범 정보 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">🎵 앨범</h3>
              <p className="text-2xl font-bold text-purple-600 mb-2">{albums.length}개</p>
              <p className="text-sm text-gray-600">총 앨범 수</p>
            </div>

            {/* 할일 정보 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">✅ 할일</h3>
              <p className="text-2xl font-bold text-orange-600 mb-2">{todos.length}개</p>
              <p className="text-sm text-gray-600">총 할일 수</p>
            </div>

            {/* 관련 포스트 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">🔗 관련</h3>
              <p className="text-2xl font-bold text-indigo-600 mb-2">{relatedPosts.length}개</p>
              <p className="text-sm text-gray-600">관련 포스트</p>
            </div>
          </div>

          {/* 관련 포스트 목록 */}
          {relatedPosts.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">관련 포스트</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    href={`/posts/v4/${relatedPost.id}`}
                    className="block p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:shadow-md transition-all"
                  >
                    <h4 className="font-medium text-gray-900 mb-2 line-clamp-2">
                      {relatedPost.title}
                    </h4>
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {relatedPost.body}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* 네비게이션 */}
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/posts"
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
            >
              포스트 V1 (ISR)
            </Link>
            <Link
              href="/posts/v2"
              className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors"
            >
              포스트 V2 (Dynamic)
            </Link>
            <Link
              href="/posts/v3/1"
              className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors"
            >
              포스트 V3 (cookies)
            </Link>
          </div>

          {/* 기술적 설명 */}
          <div className="mt-8 bg-gray-100 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">🔬 기술적 분석</h3>
            <div className="space-y-3 text-sm text-gray-700">
              <p>• <strong>Promise.all 병렬 처리:</strong> 7개 API 요청을 동시에 처리하여 성능 최적화</p>
              <p>• <strong>조건부 notFound():</strong> 존재하지 않는 포스트에 대해 404 반환</p>
              <p>• <strong>조건부 redirect():</strong> 특정 조건에서 다른 경로로 리다이렉트</p>
              <p>• <strong>ISR 호환성:</strong> notFound/redirect는 Dynamic API가 아니므로 ISR 유지</p>
              <p>• <strong>60초 캐싱:</strong> 정적 생성된 페이지를 60초간 캐싱</p>
              <p>• <strong>500개 포스트 생성:</strong> generateStaticParams로 모든 경로 정의</p>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error(`[V4 ISR + notFound/redirect] Error rendering post ${postId}:`, error);
    notFound();
  }
} 