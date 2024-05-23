"use client";

import { PostCard } from "@/components";
import { usePostOperations } from "@/hooks/use-post-operations.hook";
import { formatUnits } from "viem";

export default function HomePage() {
  const { useGetPosts } = usePostOperations();

  const { data, isLoading } = useGetPosts();

  return (
    <main className="w-full min-h-screen md:px-10 py-5 p-5">
      <div className="mx-auto w-[50%] ">
        {data?.map((post) => {
          return (
            <PostCard
              key={post?.id}
              title={post?.title}
              content={post?.content}
              id={Number(formatUnits(post?.id, 0))}
              image={post?.image}
              author={post?.author!}
            />
          );
        })}
      </div>
    </main>
  );
}
