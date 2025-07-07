import { Post, User, Comment } from '@/types';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

// 더 많은 포스트를 생성하기 위한 함수
function generateAdditionalPosts(basePosts: Post[]): Post[] {
  const additionalPosts: Post[] = [];
  
  // 기존 100개 포스트를 기반으로 500개까지 생성
  for (let i = 101; i <= 500; i++) {
    const basePost = basePosts[(i - 101) % basePosts.length];
    additionalPosts.push({
      id: i,
      title: `${basePost.title} (확장 포스트 ${i})`,
      body: `${basePost.body}\n\n[확장 포스트 ${i}] - 이 포스트는 ISR 테스트를 위해 생성된 추가 포스트입니다.`,
      userId: ((i - 1) % 10) + 1
    });
  }
  
  return additionalPosts;
}

export async function getPosts(): Promise<Post[]> {
  const response = await fetch(`${API_BASE_URL}/posts`, {
    next: { revalidate: 60 } // ISR: 60초마다 재생성
  } as any);
  
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  
  const basePosts = await response.json();
  const additionalPosts = generateAdditionalPosts(basePosts);
  
  // 총 500개의 포스트 반환
  return [...basePosts, ...additionalPosts];
}

export async function getPost(id: number): Promise<Post> {
  // 기존 100개 포스트는 API에서 가져오기
  if (id <= 100) {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
      next: { revalidate: 60 } // ISR: 60초마다 재생성
    } as any);
    
    if (!response.ok) {
      throw new Error('Failed to fetch post');
    }
    
    return response.json();
  }
  
  // 101번 이상은 생성된 포스트 반환
  const basePosts = await fetch(`${API_BASE_URL}/posts`).then(res => res.json());
  const basePost = basePosts[(id - 101) % basePosts.length];
  
  return {
    id: id,
    title: `${basePost.title} (확장 포스트 ${id})`,
    body: `${basePost.body}\n\n[확장 포스트 ${id}] - 이 포스트는 ISR 테스트를 위해 생성된 추가 포스트입니다.`,
    userId: ((id - 1) % 10) + 1
  };
}

export async function getUser(id: number): Promise<User> {
  const response = await fetch(`${API_BASE_URL}/users/${id}`, {
    next: { revalidate: 60 } // ISR: 60초마다 재생성
  } as any);
  
  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }
  
  return response.json();
}

export async function getComments(postId: number): Promise<Comment[]> {
  // 기존 100개 포스트는 API에서 가져오기
  if (postId <= 100) {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}/comments`, {
      next: { revalidate: 60 } // ISR: 60초마다 재생성
    } as any);
    
    if (!response.ok) {
      throw new Error('Failed to fetch comments');
    }
    
    return response.json();
  }
  
  // 101번 이상은 생성된 댓글 반환
  const response = await fetch(`${API_BASE_URL}/posts/${((postId - 1) % 100) + 1}/comments`);
  const baseComments = await response.json();
  
  return baseComments.map((comment: Comment) => ({
    ...comment,
    id: comment.id + (postId - 1) * 100,
    postId: postId,
    name: `${comment.name} (확장 댓글)`,
    body: `${comment.body} [확장 포스트 ${postId}용 댓글]`
  }));
}

export async function getUserPosts(userId: number): Promise<Post[]> {
  const response = await fetch(`${API_BASE_URL}/users/${userId}/posts`, {
    next: { revalidate: 60 } // ISR: 60초마다 재생성
  } as any);
  
  if (!response.ok) {
    throw new Error('Failed to fetch user posts');
  }
  
  return response.json();
}

// 추가 API 함수들
export async function getPhotos(albumId?: number): Promise<any[]> {
  const url = albumId 
    ? `${API_BASE_URL}/albums/${albumId}/photos`
    : `${API_BASE_URL}/photos`;
    
  const response = await fetch(url, {
    next: { revalidate: 60 }
  } as any);
  
  if (!response.ok) {
    throw new Error('Failed to fetch photos');
  }
  
  return response.json();
}

export async function getAlbums(userId?: number): Promise<any[]> {
  const url = userId 
    ? `${API_BASE_URL}/users/${userId}/albums`
    : `${API_BASE_URL}/albums`;
    
  const response = await fetch(url, {
    next: { revalidate: 60 }
  } as any);
  
  if (!response.ok) {
    throw new Error('Failed to fetch albums');
  }
  
  return response.json();
}

export async function getTodos(userId?: number): Promise<any[]> {
  const url = userId 
    ? `${API_BASE_URL}/users/${userId}/todos`
    : `${API_BASE_URL}/todos`;
    
  const response = await fetch(url, {
    next: { revalidate: 60 }
  } as any);
  
  if (!response.ok) {
    throw new Error('Failed to fetch todos');
  }
  
  return response.json();
}

export async function getPostStats(postId: number): Promise<{
  postId: number;
  commentsCount: number;
  estimatedReadTime: number;
  wordCount: number;
}> {
  // 포스트 통계 정보 생성
  const post = await getPost(postId);
  const comments = await getComments(postId);
  
  return {
    postId: postId,
    commentsCount: comments.length,
    estimatedReadTime: Math.ceil(post.body.split(' ').length / 200), // 분당 200단어 기준
    wordCount: post.body.split(' ').length
  };
}

export async function getRelatedPosts(postId: number): Promise<Post[]> {
  // 관련 포스트 가져오기 (같은 사용자의 다른 포스트)
  const post = await getPost(postId);
  const userPosts = await getUserPosts(post.userId);
  
  return userPosts.filter(p => p.id !== postId).slice(0, 3);
} 