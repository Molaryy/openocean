import { useMutation, useQueryClient } from "@tanstack/react-query";
import { constants } from "../constants";
import { AdenaService } from "../services/adena/adena";
import { EMessageType } from "../services/adena/adena.types";
import { useAccountStore } from "../store";
import { BuyNFTDto } from "../types/nfts";

const useBuyNFT = () => {
  const { address } = useAccountStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ price, ...payload }: BuyNFTDto & { price: number }) =>
      AdenaService.sendTransaction(
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
