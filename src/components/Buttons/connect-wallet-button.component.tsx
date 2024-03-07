import { ConnectButton } from "@rainbow-me/rainbowkit";
import { twMerge } from "tailwind-merge";

type ConnectWalletButtonProps = {
  className?: string;
};

export const ConnectWalletButton = ({
  className,
}: ConnectWalletButtonProps) => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");
        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    type="button"
                    className="text-xs md:text-base 2xl:text-xl bg-[#00b21b] px-3 md:px-6 py-2 rounded-md"
                  >
                    Connect Wallet
                  </button>
                );
              }
              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button">
                    Wrong network
                  </button>
                );
              }
              return (
                <div style={{ display: "flex", gap: 12 }}>
                  <button
                    onClick={openAccountModal}
                    type="button"
                    className={twMerge(
                      "text-xs md:text-base 2xl:text-xl font-extrabold bg-[#00b21b] px-3 md:px-6 py-2 rounded-md uppercase",
                      className
                    )}
                  >
                    {account.displayName}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
