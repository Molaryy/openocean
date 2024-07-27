import { Box, Card, HStack, Text, VStack } from "@chakra-ui/react";
import { FC } from "react";
import NFTCard from "../../atoms/NFTCard";
import { useParams } from "react-router-dom";
import { colors } from "../../theme";
// import NFTTransactions from "../../organisms/NFTTransactions";
import NFTDetails from "../../organisms/NFTDetails";
import useGetAllNFTs from "../../hooks/useGetAllNFTs";

const NftDetailsPage: FC = () => {
  const { id } = useParams();

  const { nfts } = useGetAllNFTs();
  const nft = nfts.find((nft) => nft.id === id);

  if (!nft) return nft;

  return (
    <VStack w="100%" align="start" p="16px">
      <Text userSelect="none" fontSize="32px">
        {nft.metadata?.name}
      </Text>
      <HStack spacing="24px" align="stretch" w="100%">
        <Box transition="0.5s" w="100%">
          <NFTCard url={nft.metadata?.ipfsUrl} />
        </Box>
        <VStack w="100%" align="start">
          <Card
            border={`1px solid ${colors.gray[700]}`}
            boxShadow="lg"
            bg="gray.800"
            p="32px"
            w="100%"
            gap="12px"
          >
            <NFTDetails
              description={nft.metadata?.description ?? ""}
              price={0}
              // price={+nft.price}
              owner={nft.owner}
            />
          </Card>
          <Card
            border={`1px solid ${colors.gray[700]}`}
            boxShadow="lg"
            bg="gray.800"
            p="32px"
            h="100%"
            w="100%"
            gap="12px"
          >
            {/* <NFTTransactions transactions={nft.transactions} /> */}
          </Card>
        </VStack>
      </HStack>
    </VStack>
  );
};

export default NftDetailsPage;
