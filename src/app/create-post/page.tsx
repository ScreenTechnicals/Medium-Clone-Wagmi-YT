"use client";

import { uploadFileToPinata } from "@/helpers";
import { usePostOperations } from "@/hooks/use-post-operations.hook";
import { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { IoCloudUploadOutline } from "react-icons/io5";

export type PostDataType = {
  title: string;
  content: string;
  image: string;
};

const CreatePostPage: NextPage = () => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [file, setFile] = useState<File>();
  const [data, setData] = useState<PostDataType>({
    title: "",
    content: "",
    image: "",
  });

  const openBrowse = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  const { addPost, isConfirmed, isConfirming } = usePostOperations();
  const isLoading = isConfirming || isSubmitting;

  useEffect(() => {
    if (isConfirmed) {
      toast.dismiss("loading1");
      toast.success("Post Created!");
    }
  }, [isConfirmed]);

  const handleSubmit = () => {
    if (data.title && data.content && file) {
      setIsSubmitting(true);
      uploadFileToPinata(file)
        .then((res) => {
          if (res) {
            setData({
              ...data,
              image: `${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${res}`,
            });
            addPost({
              title: data.title,
              description: data.content,
              image: `${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${res}`,
            });
          }
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    }
  };

  return (
    <div className="min-h-svh p-5 md:p-10">
      <div
        onClick={openBrowse}
        className="w-full bg-gray-400 rounded-md h-[20vh] flex place-content-center place-items-center cursor-pointer"
      >
        <IoCloudUploadOutline size={100} color="white" />
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
      />
      <input
        type="text"
        placeholder="Title"
        className="font-serif text-6xl outline-none w-full mt-5"
        onChange={(e) => {
          setData({ ...data, title: e.target.value });
        }}
        value={data.title}
      />
      <textarea
        placeholder="Write your thoughts here!"
        className="font-serif text-xl outline-none w-full mt-5 min-h-[40svh]"
        onChange={(e) => {
          setData({ ...data, content: e.target.value });
        }}
        value={data.content}
      />
      <div className="text-center">
        <button
          onClick={handleSubmit}
          type="button"
          disabled={isLoading}
          className="bg-green-500 text-xl px-6 py-2 rounded-md text-white font-serif"
        >
          Create Post
        </button>
      </div>
    </div>
  );
};

export default CreatePostPage;
