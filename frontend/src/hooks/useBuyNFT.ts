import { useMutation, useQueryClient } from "@tanstack/react-query";
import { constants } from "../constants";
import { useAccountStore } from "../store";
import { BuyNFTDto } from "../types/nfts";
import { EMessageType, signAndSendTransaction } from "adena-sdk-ts";

const useBuyNFT = () => {
  const { address } = useAccountStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ price, ...payload }: BuyNFTDto & { price: number }) =>
      signAndSendTransaction(
        [
          {
            type: EMessageType.MSG_CALL,
            value: {
              caller: address!,
              send: `${price}ugnot`,
              pkg_path: constants.realmPath,
              func: "BuyNFT",
              args: Object.values(payload),
            },
          },
        ],
        5000000
      ),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["collections"] }),
    mutationKey: ["collections"],
  });
};

export default useBuyNFT;
