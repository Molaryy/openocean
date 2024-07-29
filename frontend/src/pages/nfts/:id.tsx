import { Box, Card, HStack, Link, Text, VStack } from "@chakra-ui/react";
import { FC, useMemo } from "react";
import NFTCard from "../../atoms/NFTCard";
import { useParams } from "react-router-dom";
// import NFTTransactions from "../../organisms/NFTTransactions";
import NFTDetails from "../../organisms/NFTDetails";
import useGetAllNFTs from "../../hooks/useGetAllNFTs";
import useGetAllCollections from "../../hooks/useGetAllCollections";
import { urlFromIpfsHash } from "../../utils";

const NftDetailsPage: FC = () => {
  const { id } = useParams();

  const { data: collections } = useGetAllCollections();
  const { nfts } = useGetAllNFTs();

  const collection = useMemo(
    () => collections?.find((collection) => collection.id === id),
    [id, collections]
  );
  const nft = useMemo(() => nfts.find((nft) => nft.id === id), [id, nfts]);

  if (!nft || !collection) return null;

  return (
    <VStack w="100%" align="start" p="16px">
      <HStack w="100%" justify="space-between">
        <HStack fontSize="24px" userSelect="none">
          <Text fontWeight="light" color="gray.500">
            #{nft.id}
          </Text>
          <Text fontWeight="black">{nft.metadata?.name}</Text>
        </HStack>
        <HStack>
          <Link color="gray.300" href={`/collections/${collection.id}`}>
            <HStack>
              <span>{collection.name}</span>
              <Box
                w="40px"
                h="40px"
                backgroundSize="contain"
                backgroundPosition="center"
                backgroundRepeat="no-repeat"
                backgroundImage={urlFromIpfsHash(collection.logo)}
              />
            </HStack>
          </Link>
        </HStack>
      </HStack>
      <HStack spacing="24px" align="stretch" w="100%">
        <Box transition="0.5s" w="100%">
          <NFTCard url={nft.metadata?.cid} />
        </Box>
        <VStack w="100%" align="start">
          <Card p="32px" w="100%" gap="12px">
            <NFTDetails
              description={nft.metadata?.description ?? ""}
              price={nft.price}
              owner={nft.owner}
            />
          </Card>
          <Card p="32px" h="100%" w="100%" gap="12px">
            {/* <NFTTransactions transactions={nft.transactions} /> */}
          </Card>
        </VStack>
      </HStack>
    </VStack>
  );
};

export default NftDetailsPage;
