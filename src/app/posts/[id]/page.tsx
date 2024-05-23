"use client";

import { PostDataType } from "@/app/create-post/page";
import { uploadFileToPinata } from "@/helpers";
import { usePostOperations } from "@/hooks/use-post-operations.hook";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useAccount } from "wagmi";

const PostPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const { useGetPost, updatePost } = usePostOperations();
  const { data: post, isLoading: isPostLoadong } = useGetPost(Number(id));

  const fileRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [file, setFile] = useState<File>();
  const [data, setData] = useState<PostDataType>({
    title: "",
    content: "",
    image: "",
  });

  const { address } = useAccount();
  const disabled = post?.author !== address;

  const openBrowse = () => {
    if (fileRef.current && !disabled) {
      fileRef.current.click();
    }
  };

  const { addPost, isConfirmed, isConfirming } = usePostOperations();
  const isLoading = isConfirming || isSubmitting;

  useEffect(() => {
    if (isConfirmed) {
      toast.dismiss("loading1");
      toast.success("Post Updated!");
    }
  }, [isConfirmed]);

  const handleSubmit = () => {
    if (post?.author === address) {
      if (data.title && data.content && data.image) {
        setIsSubmitting(true);
        if (file) {
          uploadFileToPinata(file)
            .then((res) => {
              if (res) {
                setData({
                  ...data,
                  image: `${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${res}`,
                });
                updatePost({
                  id: Number(id),
                  title: data.title,
                  description: data.content,
                  image: `${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${res}`,
                });
              }
            })
            .finally(() => {
              setIsSubmitting(false);
            });
        } else {
          updatePost({
            id: Number(id),
            title: data.title,
            description: data.content,
            image: data.image,
          });
          setIsSubmitting(false);
        }
      }
    }
  };

  useEffect(() => {
    if (post && !isPostLoadong) {
      setData({
        title: post.title,
        content: post.content,
        image: post.image,
      });
    }
  }, [post, isPostLoadong]);
  return (
    <div className="min-h-svh p-5 md:p-10">
      <div
        onClick={openBrowse}
        className="w-ful relative bg-gray-400 rounded-md h-[20vh] flex place-content-center place-items-center cursor-pointer"
      >
        {post?.image && <Image src={post.image ?? ""} alt="" fill />}
      </div>
      <input
        type="file"
        ref={fileRef}
        hidden
        onChange={(e) => {
          if (e.target.files) {
            setFile(e.target.files[0]);
          }
        }}
        readOnly={disabled}
      />
      {post?.title && (
        <input
          type="text"
          placeholder="Title"
          className="font-serif text-6xl outline-none w-full mt-5"
          onChange={(e) => {
            setData({ ...data, title: e.target.value });
          }}
          value={data.title}
          readOnly={disabled}
        />
      )}
      {post?.content && (
        <textarea
          placeholder="Write your thoughts here!"
          className="font-serif text-xl outline-none w-full mt-5 min-h-[40svh]"
          onChange={(e) => {
            setData({ ...data, content: e.target.value });
          }}
          value={data.content}
          readOnly={disabled}
        />
      )}
      {post?.author === address && !isPostLoadong && (
        <div className="text-center">
          <button
            onClick={handleSubmit}
            type="button"
            disabled={isLoading}
            className="bg-green-500 text-xl px-6 py-2 rounded-md text-white font-serif"
          >
            Update Post
          </button>
        </div>
      )}
    </div>
  );
};

export default PostPage;
