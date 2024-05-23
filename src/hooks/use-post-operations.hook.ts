import { blogPostsAbi } from "@/abis";
import { wagmiClient } from "@/configs";
import { useState } from "react";
import toast from "react-hot-toast";
import { getAddress, parseEther } from "viem";
import {
  useAccount,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";

type DeleteTodoProps = {
  id: number;
};

type AddPostProps = {
  title: string;
  description: string;
  image: string;
};

type UpdateTodoProps = AddPostProps & {
  id: number;
};

export const usePostOperations = () => {
  const { address, isConnected } = useAccount({
    config: wagmiClient,
  });

  const { writeContract, data: hash } = useWriteContract({
    config: wagmiClient,
  });

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash: hash!,
    });

  const [isSending, setIsSending] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirming, setConfirming] = useState(false);

  const addPost = ({ title, description, image }: AddPostProps) => {
    setIsSending(true);
    writeContract(
      {
        abi: blogPostsAbi,
        address: getAddress(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!),
        functionName: "addPost",
        args: [title, description, image],
        value: parseEther("1", "gwei"),
      },
      {
        onSuccess: () => {
          toast.loading("Post Created! Waiting for confirmation.", {
            id: "loading1",
          });
          setIsSending(false);
          if (setConfirming) {
            setConfirming(true);
          }
        },
        onError: () => {
          setIsSending(false);
          toast.error("Transaction Failed! Try Again.");
        },
      }
    );
  };

  const updatePost = ({ id, title, description, image }: UpdateTodoProps) => {
    setIsSending(true);
    writeContract(
      {
        abi: blogPostsAbi,
        address: getAddress(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!),
        functionName: "updatePost",
        args: [BigInt(id), title, description, image],
        value: parseEther("1", "gwei"),
      },
      {
        onSuccess: () => {
          toast.loading("Post Updated! Waiting for confirmation.", {
            id: "loading1",
          });
          setIsSending(false);
          if (setConfirming) {
            setConfirming(true);
          }
        },
        onError: (err) => {
          setIsSending(false);
          toast.error("Transaction Failed! Try Again.");
          console.log(err.message);
        },
      }
    );
  };

  const deletePost = ({ id }: DeleteTodoProps) => {
    setIsDeleting(true);
    writeContract(
      {
        abi: blogPostsAbi,
        address: getAddress(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!),
        functionName: "deletePost",
        args: [BigInt(id)],
        value: parseEther("2", "gwei"),
      },
      {
        onSuccess: () => {
          toast.loading("Post Deleted! Waiting for confirmation.", {
            id: "loading1",
          });
          setIsDeleting(false);
          if (setConfirming) {
            setConfirming(true);
          }
        },
        onError: (err) => {
          setIsDeleting(false);
          toast.error("Transaction Failed! Try Again.");
          console.log(err.message);
        },
      }
    );
  };

  const useGetPost = (id: number) => {
    const { data, isLoading } = useReadContract({
      abi: blogPostsAbi,
      address: getAddress(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!),
      functionName: "getPost",
      args: [BigInt(id)],
      account: address && getAddress(address!),
    });
    return { data: data, isLoading };
  };

  const useGetPosts = () => {
    const { data, isLoading, refetch } = useReadContract({
      abi: blogPostsAbi,
      address: getAddress(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!),
      functionName: "getAllPosts",
      account: address && getAddress(address),
      query: {
        staleTime: 0,
        enabled: isConnected,
      },
    });
    return { data, isLoading, refetch };
  };

  return {
    isSending,
    isDeleting,
    confirming,
    isConfirming,
    isConfirmed,
    hash,
    addPost,
    updatePost,
    deletePost,
    useGetPost,
    useGetPosts,
  };
};
