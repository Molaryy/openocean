import { useMutation, useQueryClient } from "@tanstack/react-query";
import { constants } from "../constants";
import { useAccountStore } from "../store";
import { CreateCollectionDto } from "../types/collections";
import { EMessageType, signAndSendTransaction } from "adena-sdk-ts";

const useCreateCollection = () => {
  const { address } = useAccountStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateCollectionDto) =>
      signAndSendTransaction(
        [
          {
            type: EMessageType.MSG_CALL,
            value: {
              caller: address!,
              send: "5ugnot",
              pkg_path: constants.realmPath,
              func: "AddCollection",
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

export default useCreateCollection;
