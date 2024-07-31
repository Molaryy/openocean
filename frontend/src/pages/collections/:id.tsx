import { FC, useMemo } from "react";
import useGetAllCollections from "../../hooks/useGetAllCollections";
import { Card, HStack, SimpleGrid, Text, VStack } from "@chakra-ui/react";
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
    <VStack align="start" w="100%" spacing="12px">
      <Text fontSize="32px">NFT Collection</Text>
      <HStack fontSize="24px" userSelect="none">
        <Text fontWeight="light" color="gray.500">
          #{collection.id}
        </Text>
        <Text fontWeight="black">{collection.name}</Text>
      </HStack>
      <HStack align="start" w="100%" spacing="12px">
        <NFTCard url={collection.logo} />
        <Card p="16px" w="100%" h="100%" gap="12px">
          <SimpleGrid columns={4} w="100%" gap="24px">
            {collection.nfts.map((nft) => (
              <NFTCardWithDetails
                key={nft.id}
                onClick={() => navigate(`/nfts/${nft.id}`)}
                img={nft.metadata?.cid}
                description={nft.metadata?.description ?? "Unminted"}
                name={nft.metadata?.name ?? `#${nft.id}`}
              />
            ))}
          </SimpleGrid>
        </Card>
      </HStack>
      <Card p="16px" w="100%" gap="12px">
        <Text w="100%" color="gray.500">
          {collection.description}
        </Text>
      </Card>
    </VStack>
  );
};

export default Collection;
