import { Post, User, Comment } from '@/types';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export async function getPosts(): Promise<Post[]> {
  const response = await fetch(`${API_BASE_URL}/posts`, {
    next: { revalidate: 60 } // ISR: 60초마다 재생성
  } as any);
  
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  
  return response.json();
}

export async function getPost(id: number): Promise<Post> {
  const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
    next: { revalidate: 60 } // ISR: 60초마다 재생성
  } as any);
  
  if (!response.ok) {
    throw new Error('Failed to fetch post');
  }
  
  return response.json();
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
  const response = await fetch(`${API_BASE_URL}/posts/${postId}/comments`, {
    next: { revalidate: 60 } // ISR: 60초마다 재생성
  } as any);
  
  if (!response.ok) {
    throw new Error('Failed to fetch comments');
  }
  
  return response.json();
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