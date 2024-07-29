import { useMutation } from "@tanstack/react-query";
import { constants } from "../constants";
import { AdenaService } from "../services/adena/adena";
import { EMessageType } from "../services/adena/adena.types";
import { useAccountStore } from "../store";
import { MintDto } from "../types/nfts";

const useMint = () => {
  const { address } = useAccountStore();

  return useMutation({
    mutationFn: (payload: MintDto) =>
      AdenaService.sendTransaction(
        [
          {
            type: EMessageType.MSG_CALL,
            value: {
              caller: address!,
              send: "",
              pkg_path: constants.realmPath,
              func: "MintInCollectionById",
              args: Object.values(payload),
            },
          },
        ],
        5000000
      ),
  });
};

export default useMint;
