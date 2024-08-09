import { useMutation, useQueryClient } from "@tanstack/react-query";
import { constants } from "../constants";
import { useAccountStore } from "../store";
import { SetNFTForSaleDto } from "../types/nfts";
import { EMessageType, signAndSendTransaction } from "adena-sdk-ts";

const useSetForSale = () => {
  const { address } = useAccountStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: SetNFTForSaleDto) =>
      signAndSendTransaction(
        [
          {
            type: EMessageType.MSG_CALL,
            value: {
              caller: address!,
              send: "",
              pkg_path: constants.realmPath,
              func: "SetNFTForSale",
              args: Object.values(payload).map((v) => v.toString()),
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

export default useSetForSale;
