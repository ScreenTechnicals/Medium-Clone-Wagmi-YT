import Image from "next/image";
import Link from "next/link";
import { Address } from "viem";

type PostCardProps = {
  title: string;
  content: string;
  id: number;
  image: string;
  author: Address;
};
export const PostCard = ({
  title,
  content,
  id,
  image,
  author,
}: PostCardProps) => {
  return (
    <Link href={`/posts/${id}`}>
      <div className="w-full border-b border-gray-400 pb-3 mt-5 flex  font-serif items-start gap-4 justify-between">
        <div>
          <p>{author}</p>
          <h2 className="text-3xl font-bold">{title}</h2>
          <p className="text-xl">{content.slice(0, 60)}...</p>
        </div>
        <div>
          <Image src={image!} alt="" width={200} height={200} />
        </div>
      </div>
    </Link>
  );
};
