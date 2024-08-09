import { useMutation, useQueryClient } from "@tanstack/react-query";
import { constants } from "../constants";
import { useAccountStore } from "../store";
import { MintDto } from "../types/nfts";
import { EMessageType, signAndSendTransaction } from "adena-sdk-ts";

const useMint = () => {
  const { address } = useAccountStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: MintDto) =>
      signAndSendTransaction(
        [
          {
            type: EMessageType.MSG_CALL,
            value: {
              caller: address!,
              send: "",
              pkg_path: constants.realmPath,
              func: "MintInCollectionById",
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

export default useMint;
