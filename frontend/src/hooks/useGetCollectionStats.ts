import { useProviderStore } from "../store";
import { constants } from "../constants";
import { parseDataJson } from "../utils";
import { useQuery } from "@tanstack/react-query";
import { CollectionStats } from "../types/collections";

const useGetCollectionStats = (collectionId: string) => {
  const { provider } = useProviderStore();

  const data = useQuery({
    queryKey: ["collections"],
    enabled: !!provider && "evaluateExpression" in provider,
    queryFn: () =>
      provider
        ?.evaluateExpression(
          constants.realmPath,
          `GetCollectionStats("${collectionId}")`
        )
        .then((res) => parseDataJson<CollectionStats>(res))
        .catch(console.error),
  });

  return data;
};

export default useGetCollectionStats;
