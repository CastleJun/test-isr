import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPosts, getPost, getUser, getComments } from '@/lib/api';

type PageProps = {
  params: {
    id: string;
  };
};

// 모든 포스트 ID를 미리 생성하여 ISR 적용
export async function generateStaticParams() {
  const posts = await getPosts();
  
  console.log(`[ISR] Generating static params for ${posts.length} posts`);
  
  // 모든 포스트 ID를 정적 생성
  return posts.map((post) => ({
    id: post.id.toString(),
  }));
}

export default async function PostDetailPage({ params }: PageProps) {
  const { id } = params;
  const postId = Number(id);
  
  // 현재 시간을 표시하여 ISR 동작 확인
  const now = new Date().toLocaleString('ko-KR');
  
  console.log(`[ISR] Rendering post ${postId} at ${now}`);
  
  try {
    const [post, comments] = await Promise.all([
      getPost(postId),
      getComments(postId)
    ]);
    
    if (!post) {
      console.log(`[ISR] Post ${postId} not found`);
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
            <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded ml-2">
              ISR 적용
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
            <span className="text-blue-600">마지막 생성: {now}</span>
          </div>
          
          <p className="text-gray-700 leading-relaxed mb-8">
            {post.body}
          </p>
          
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
          
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">ISR 테스트 정보</h3>
            <div className="text-sm text-blue-700 space-y-1">
              <p>• 이 페이지는 빌드 시 정적 생성됩니다</p>
              <p>• 60초마다 백그라운드에서 재생성됩니다</p>
              <p>• 콘솔에서 ISR 로그를 확인할 수 있습니다</p>
              <p>• 생성 시간: {now}</p>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error(`[ISR] Error loading post ${postId}:`, error);
    notFound();
  }
}

// ISR 설정: 60초마다 재생성
export const revalidate = 60; 