import { http } from "@wagmi/core";
import { sepolia, polygonMumbai } from "viem/chains";
import { createConfig } from "wagmi";
import { walletConnect } from "wagmi/connectors";

const connector = walletConnect({
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID!,
});

export const wagmiClient = createConfig({
  connectors: [connector],
  chains: [sepolia, polygonMumbai],
  transports: {
    [sepolia.id]: http(),
    [polygonMumbai.id]: http(),
  },
});
