'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Post } from '@/types';

type PostCardProps = {
  post: Post;
  basePath?: string;
  enablePrefetchOnHover?: boolean;
};

export default function PostCard({ 
  post, 
  basePath = '/posts', 
  enablePrefetchOnHover = false 
}: PostCardProps) {
  const router = useRouter();
  const href = `${basePath}/${post.id}`;

  const handleMouseEnter = () => {
    if (enablePrefetchOnHover) {
      router.prefetch(href);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
        {post.title}
      </h2>
      <p className="text-gray-600 mb-4 line-clamp-3">
        {post.body}
      </p>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">
          작성자 ID: {post.userId}
        </span>
        <Link
          href={href}
          prefetch={!enablePrefetchOnHover}
          onMouseEnter={handleMouseEnter}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors text-sm"
        >
          자세히 보기
        </Link>
      </div>
    </div>
  );
} 