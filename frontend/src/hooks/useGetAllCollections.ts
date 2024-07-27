import { useQuery } from "@tanstack/react-query";
import { constants } from "../constants";
import { useProviderStore } from "../store";
import { parseDataJson } from "../utils";
import { Collection } from "../types/collections";

const useGetAllCollections = () => {
  const { provider } = useProviderStore();

  const data = useQuery({
    queryKey: ["collections"],
    enabled: !!provider && "evaluateExpression" in provider,
    queryFn: () =>
      provider
        ?.evaluateExpression(constants.realmPath, `GetCollections()`)
        .then((res) => parseDataJson<Collection[]>(res))
        .catch(console.error),
  });

  return data;
};

export default useGetAllCollections;
