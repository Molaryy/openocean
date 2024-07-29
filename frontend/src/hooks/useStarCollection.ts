import { useMutation, useQueryClient } from "@tanstack/react-query";
import { constants } from "../constants";
import { AdenaService } from "../services/adena/adena";
import { EMessageType } from "../services/adena/adena.types";
import { useAccountStore } from "../store";
import { StarCollectionDto } from "../types/collections";

const useStarCollection = () => {
  const { address } = useAccountStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: StarCollectionDto) =>
      AdenaService.sendTransaction(
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
