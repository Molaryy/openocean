import { useMutation, useQueryClient } from "@tanstack/react-query";
import { constants } from "../constants";
import { useAccountStore } from "../store";
import { StarCollectionDto } from "../types/collections";
import { EMessageType, signAndSendTransaction } from "adena-sdk-ts";

const useStarCollection = () => {
  const { address } = useAccountStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: StarCollectionDto) =>
      signAndSendTransaction(
        [
          {
            type: EMessageType.MSG_CALL,
            value: {
              caller: address!,
              send: "",
              pkg_path: constants.realmPath,
              func: "StarCollection",
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

export default useStarCollection;
