import { useMutation } from "@tanstack/react-query";
import { constants } from "../constants";
import { AdenaService } from "../services/adena/adena";
import { EMessageType } from "../services/adena/adena.types";
import { useAccountStore } from "../store";
import { CreateCollectionDto } from "../types/collections";

const useCreateCollection = () => {
  const { address } = useAccountStore();

  return useMutation({
    mutationFn: (payload: CreateCollectionDto) =>
      AdenaService.sendTransaction(
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
  });
};

export default useCreateCollection;
