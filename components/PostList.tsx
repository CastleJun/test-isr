import { Post } from '@/types';
import PostCard from './PostCard';

type PostListProps = {
  posts: Post[];
  basePath?: string;
  enablePrefetchOnHover?: boolean;
};

export default function PostList({ posts, basePath, enablePrefetchOnHover }: PostListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <PostCard 
          key={post.id} 
          post={post} 
          basePath={basePath}
          enablePrefetchOnHover={enablePrefetchOnHover}
        />
      ))}
    </div>
  );
} 