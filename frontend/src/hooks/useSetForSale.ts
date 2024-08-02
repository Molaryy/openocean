import { useMutation, useQueryClient } from "@tanstack/react-query";
import { constants } from "../constants";
import { AdenaService } from "../services/adena/adena";
import { EMessageType } from "../services/adena/adena.types";
import { useAccountStore } from "../store";
import { SetNFTForSaleDto } from "../types/nfts";

const useSetForSale = () => {
  const { address } = useAccountStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: SetNFTForSaleDto) =>
      AdenaService.sendTransaction(
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
