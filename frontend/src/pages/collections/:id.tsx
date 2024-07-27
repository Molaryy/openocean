import { FC, useMemo } from "react";
import useGetAllCollections from "../../hooks/useGetAllCollections";
import { HStack, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import NFTCard from "../../atoms/NFTCard";
import { useNavigate, useParams } from "react-router-dom";
import NFTCardWithDetails from "../../molecules/NFTCardWithDetails";

const Collection: FC = () => {
  const { data } = useGetAllCollections();

  const { id } = useParams();

  const collection = useMemo(
    () => data?.find((collection) => collection.id === id),
    [data, id]
  );

  const navigate = useNavigate();

  if (!collection) return null;

  return (
    <VStack align="start" w="100%" h="100%" spacing="12px">
      <Text fontSize="32px">NFT Collection</Text>
      <HStack fontSize="24px" userSelect="none">
        <Text fontWeight="light" color="gray.500">
          #{collection.id}
        </Text>
        <Text fontWeight="black">{collection.name}</Text>
      </HStack>
      <HStack w="100%" spacing="28px">
        <NFTCard url={collection.logo} />
        <SimpleGrid columns={4} w="100%" gap="24px">
          {collection.nfts.map((nft) => (
            <NFTCardWithDetails
              key={nft.id}
              onClick={() => navigate(`/nfts/${nft.id}`)}
              img={nft.metadata?.ipfsUrl}
              description={nft.metadata?.description ?? "Unminted"}
              name={nft.metadata?.name ?? `#${nft.id}`}
            />
          ))}
        </SimpleGrid>
      </HStack>
    </VStack>
  );
};

export default Collection;
