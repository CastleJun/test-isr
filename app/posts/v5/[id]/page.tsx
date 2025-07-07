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

// dynamicParams = true 설정 - 정적으로 생성되지 않은 경로도 동적으로 생성
export const dynamicParams = true;

// 처음 10개만 정적 생성, 나머지는 런타임에 동적 생성
export async function generateStaticParams() {
  const posts = await getPosts();
  
  console.log('\n' + '='.repeat(70));
  console.log('🟡 [V5 - dynamicParams only] Generating static params for first 10 posts only');
  console.log('='.repeat(70));
  
  // 처음 10개만 정적 생성
  return posts.slice(0, 10).map((post) => ({
    id: post.id.toString(),
  }));
}

export default async function PostDetailPageV5({ params }: PageProps) {
  const { id } = params;
  const postId = Number(id);
  
  // 현재 시간을 표시하여 정적/동적 생성 구분
  const now = new Date().toLocaleString('ko-KR');
  
  console.log('🟡 [V5 - dynamicParams only] Rendering post', postId, 'at', now);
  
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

    if (!post) {
      notFound();
    }

    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* V5 헤더 - dynamicParams only 정보 */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
            <div className="flex items-center mb-4">
              <div className="bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full mr-3">
                ◐ Mixed
              </div>
              <h1 className="text-2xl font-bold text-yellow-800">
                포스트 V5 (dynamicParams = true only)
              </h1>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-yellow-700">
              <div>
                <p><strong>렌더링 시간:</strong> {now}</p>
                <p><strong>dynamicParams:</strong> true</p>
                <p><strong>revalidate:</strong> 설정 안 함</p>
              </div>
              <div>
                <p><strong>정적 생성:</strong> 처음 10개만</p>
                <p><strong>예상 빌드 결과:</strong> ● (SSG) + λ (Dynamic)</p>
                <p><strong>실제 동작:</strong> 혼합 렌더링</p>
              </div>
            </div>

            <div className="mt-4 p-4 bg-yellow-100 rounded-lg">
              <h3 className="font-semibold text-yellow-800 mb-2">🟡 dynamicParams 테스트</h3>
              <p className="text-yellow-700 text-sm mb-2">
                처음 10개 포스트(1-10)는 빌드 시 정적 생성, 나머지(11-500)는 런타임에 동적 생성됩니다.
              </p>
              <div className="text-xs text-yellow-600">
                <p>• 포스트 1-10: 빌드 시 ● (SSG)</p>
                <p>• 포스트 11-500: 런타임 시 λ (Dynamic)</p>
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
              
              {/* 정적/동적 생성 구분 표시 */}
              <div className="flex items-center gap-2 mb-4">
                {postId <= 10 ? (
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                    ● 정적 생성 (빌드 시)
                  </span>
                ) : (
                  <span className="bg-orange-100 text-orange-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                    λ 동적 생성 (런타임)
                  </span>
                )}
                <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                  dynamicParams = true
                </span>
              </div>
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
                    href={`/posts/v5/${relatedPost.id}`}
                    className="block p-4 border border-gray-200 rounded-lg hover:border-yellow-300 hover:shadow-md transition-all"
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

          {/* 테스트 링크 */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-yellow-800 mb-4">🧪 dynamicParams 테스트</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium text-yellow-800 mb-2">정적 생성된 포스트 (1-10):</p>
                <div className="space-y-1">
                  {[1, 2, 3, 4, 5].map(id => (
                    <Link
                      key={id}
                      href={`/posts/v5/${id}`}
                      className="block text-blue-600 hover:text-blue-800"
                    >
                      포스트 {id} (정적)
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <p className="font-medium text-yellow-800 mb-2">동적 생성될 포스트 (11+):</p>
                <div className="space-y-1">
                  {[11, 25, 50, 100, 200].map(id => (
                    <Link
                      key={id}
                      href={`/posts/v5/${id}`}
                      className="block text-orange-600 hover:text-orange-800"
                    >
                      포스트 {id} (동적)
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 네비게이션 */}
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/posts"
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
            >
              ← 포스트 목록 (ISR)
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
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('🟡 [V5 - dynamicParams only] Error loading post', postId, ':', error);
    notFound();
  }
} 