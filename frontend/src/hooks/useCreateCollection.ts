import { useMutation } from "@tanstack/react-query";
import { constants } from "../constants";
import { AdenaService } from "../services/adena/adena";
import { EMessageType } from "../services/adena/adena.types";
import { useAccountStore } from "../store";
import { CreateCollectionDto } from "../types/collections";

const useCreateCollection = () => {
  const { address } = useAccountStore();

  return useMutation({
    mutationFn: (payload: CreateCollectionDto) => {
      console.log(Object.values(payload));
      return AdenaService.sendTransaction(
        [
          {
            type: EMessageType.MSG_CALL,
            value: {
              caller: address!,
              send: "",
              pkg_path: constants.realmPath,
              func: "AddCollection",
              args: Object.values(payload),
            },
          },
        ],
        5000000
      );
    },
  });
};

export default useCreateCollection;
