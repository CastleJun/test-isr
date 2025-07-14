import axios from 'axios';
import { Post, User, Comment } from '@/types';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

// axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// 더 많은 포스트를 생성하기 위한 함수
function generateAdditionalPosts(basePosts: Post[]): Post[] {
  const additionalPosts: Post[] = [];
  
  // 기존 100개 포스트를 기반으로 500개까지 생성
  for (let i = 101; i <= 500; i++) {
    const basePost = basePosts[(i - 101) % basePosts.length];
    additionalPosts.push({
      id: i,
      title: `${basePost.title} (V6 - Axios 확장 포스트 ${i})`,
      body: `${basePost.body}\n\n[V6 - Axios 확장 포스트 ${i}] - 이 포스트는 axios를 사용한 ISR 테스트를 위해 생성된 추가 포스트입니다.`,
      userId: ((i - 1) % 10) + 1
    });
  }
  
  return additionalPosts;
}

export async function getPostsWithAxios(): Promise<Post[]> {
  try {
    console.log('🔥 [V6 - Axios] Fetching posts with axios');
    const response = await apiClient.get('/posts');
    
    const basePosts = response.data;
    const additionalPosts = generateAdditionalPosts(basePosts);
    
    // 총 500개의 포스트 반환
    const allPosts = [...basePosts, ...additionalPosts];
    console.log(`🔥 [V6 - Axios] Successfully fetched ${allPosts.length} posts`);
    
    return allPosts;
  } catch (error) {
    console.error('🔥 [V6 - Axios] Error fetching posts:', error);
    throw new Error('Failed to fetch posts with axios');
  }
}

export async function getPostWithAxios(id: number): Promise<Post> {
  try {
    console.log(`🔥 [V6 - Axios] Fetching post ${id} with axios`);
    
    // 기존 100개 포스트는 API에서 가져오기
    if (id <= 100) {
      const response = await apiClient.get(`/posts/${id}`);
      console.log(`🔥 [V6 - Axios] Successfully fetched post ${id} from API`);
      return response.data;
    }
    
    // 101번 이상은 생성된 포스트 반환
    const response = await apiClient.get('/posts');
    const basePosts = response.data;
    const basePost = basePosts[(id - 101) % basePosts.length];
    
    const generatedPost = {
      id: id,
      title: `${basePost.title} (V6 - Axios 확장 포스트 ${id})`,
      body: `${basePost.body}\n\n[V6 - Axios 확장 포스트 ${id}] - 이 포스트는 axios를 사용한 ISR 테스트를 위해 생성된 추가 포스트입니다.`,
      userId: ((id - 1) % 10) + 1
    };
    
    console.log(`🔥 [V6 - Axios] Successfully generated post ${id}`);
    return generatedPost;
  } catch (error) {
    console.error(`🔥 [V6 - Axios] Error fetching post ${id}:`, error);
    throw new Error('Failed to fetch post with axios');
  }
}

export async function getUserWithAxios(id: number): Promise<User> {
  try {
    console.log(`🔥 [V6 - Axios] Fetching user ${id} with axios`);
    const response = await apiClient.get(`/users/${id}`);
    console.log(`🔥 [V6 - Axios] Successfully fetched user ${id}`);
    return response.data;
  } catch (error) {
    console.error(`🔥 [V6 - Axios] Error fetching user ${id}:`, error);
    throw new Error('Failed to fetch user with axios');
  }
}

export async function getCommentsWithAxios(postId: number): Promise<Comment[]> {
  try {
    console.log(`🔥 [V6 - Axios] Fetching comments for post ${postId} with axios`);
    
    // 기존 100개 포스트는 API에서 가져오기
    if (postId <= 100) {
      const response = await apiClient.get(`/posts/${postId}/comments`);
      console.log(`🔥 [V6 - Axios] Successfully fetched ${response.data.length} comments for post ${postId}`);
      return response.data;
    }
    
    // 101번 이상은 생성된 댓글 반환
    const response = await apiClient.get(`/posts/${((postId - 1) % 100) + 1}/comments`);
    const baseComments = response.data;
    
    const generatedComments = baseComments.map((comment: Comment) => ({
      ...comment,
      id: comment.id + (postId - 1) * 100,
      postId: postId,
      name: `${comment.name} (V6 - Axios 확장 댓글)`,
      body: `${comment.body} [V6 - Axios 확장 포스트 ${postId}용 댓글]`
    }));
    
    console.log(`🔥 [V6 - Axios] Successfully generated ${generatedComments.length} comments for post ${postId}`);
    return generatedComments;
  } catch (error) {
    console.error(`🔥 [V6 - Axios] Error fetching comments for post ${postId}:`, error);
    throw new Error('Failed to fetch comments with axios');
  }
}

export async function getUserPostsWithAxios(userId: number): Promise<Post[]> {
  try {
    console.log(`🔥 [V6 - Axios] Fetching posts for user ${userId} with axios`);
    const response = await apiClient.get(`/users/${userId}/posts`);
    console.log(`🔥 [V6 - Axios] Successfully fetched ${response.data.length} posts for user ${userId}`);
    return response.data;
  } catch (error) {
    console.error(`🔥 [V6 - Axios] Error fetching posts for user ${userId}:`, error);
    throw new Error('Failed to fetch user posts with axios');
  }
}

// 추가 API 함수들
export async function getPhotosWithAxios(albumId?: number): Promise<any[]> {
  try {
    const url = albumId ? `/albums/${albumId}/photos` : '/photos';
    console.log(`🔥 [V6 - Axios] Fetching photos from ${url} with axios`);
    
    const response = await apiClient.get(url);
    console.log(`🔥 [V6 - Axios] Successfully fetched ${response.data.length} photos`);
    return response.data;
  } catch (error) {
    console.error('🔥 [V6 - Axios] Error fetching photos:', error);
    throw new Error('Failed to fetch photos with axios');
  }
}

export async function getAlbumsWithAxios(userId?: number): Promise<any[]> {
  try {
    const url = userId ? `/users/${userId}/albums` : '/albums';
    console.log(`🔥 [V6 - Axios] Fetching albums from ${url} with axios`);
    
    const response = await apiClient.get(url);
    console.log(`🔥 [V6 - Axios] Successfully fetched ${response.data.length} albums`);
    return response.data;
  } catch (error) {
    console.error('🔥 [V6 - Axios] Error fetching albums:', error);
    throw new Error('Failed to fetch albums with axios');
  }
}

export async function getTodosWithAxios(userId?: number): Promise<any[]> {
  try {
    const url = userId ? `/users/${userId}/todos` : '/todos';
    console.log(`🔥 [V6 - Axios] Fetching todos from ${url} with axios`);
    
    const response = await apiClient.get(url);
    console.log(`🔥 [V6 - Axios] Successfully fetched ${response.data.length} todos`);
    return response.data;
  } catch (error) {
    console.error('🔥 [V6 - Axios] Error fetching todos:', error);
    throw new Error('Failed to fetch todos with axios');
  }
}

export async function getPostStatsWithAxios(postId: number): Promise<{
  postId: number;
  commentsCount: number;
  estimatedReadTime: number;
  wordCount: number;
  fetchMethod: string;
}> {
  try {
    console.log(`🔥 [V6 - Axios] Calculating stats for post ${postId} with axios`);
    
    // 포스트 통계 정보 생성 (axios 사용)
    const post = await getPostWithAxios(postId);
    const comments = await getCommentsWithAxios(postId);
    
    const stats = {
      postId: postId,
      commentsCount: comments.length,
      estimatedReadTime: Math.ceil(post.body.split(' ').length / 200), // 분당 200단어 기준
      wordCount: post.body.split(' ').length,
      fetchMethod: 'axios'
    };
    
    console.log(`🔥 [V6 - Axios] Successfully calculated stats for post ${postId}:`, stats);
    return stats;
  } catch (error) {
    console.error(`🔥 [V6 - Axios] Error calculating stats for post ${postId}:`, error);
    throw new Error('Failed to calculate post stats with axios');
  }
}

export async function getRelatedPostsWithAxios(postId: number): Promise<Post[]> {
  try {
    console.log(`🔥 [V6 - Axios] Fetching related posts for post ${postId} with axios`);
    
    // 관련 포스트 가져오기 (같은 사용자의 다른 포스트)
    const post = await getPostWithAxios(postId);
    const userPosts = await getUserPostsWithAxios(post.userId);
    
    const relatedPosts = userPosts.filter(p => p.id !== postId).slice(0, 3);
    console.log(`🔥 [V6 - Axios] Successfully fetched ${relatedPosts.length} related posts for post ${postId}`);
    
    return relatedPosts;
  } catch (error) {
    console.error(`🔥 [V6 - Axios] Error fetching related posts for post ${postId}:`, error);
    throw new Error('Failed to fetch related posts with axios');
  }
} 