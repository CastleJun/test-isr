import { Post } from '@/types';
import PostCard from './PostCard';

type PostListProps = {
  posts: Post[];
  basePath?: string;
};

export default function PostList({ posts, basePath }: PostListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} basePath={basePath} />
      ))}
    </div>
  );
} 