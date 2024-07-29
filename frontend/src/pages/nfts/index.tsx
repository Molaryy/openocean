import {
  Card,
  Divider,
  HStack,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FC } from "react";
import NFTCard from "../../atoms/NFTCard";
// import { displayGnot } from "../../utils";
import { useNavigate } from "react-router-dom";
import useGetAllNFTs from "../../hooks/useGetAllNFTs";

const NftPage: FC = () => {
  const navigate = useNavigate();

  const { nfts } = useGetAllNFTs();

  return (
    <VStack align="start" w="100%" h="100%" spacing="12px">
      <Text userSelect="none" fontSize="32px">
        NFTs
      </Text>
      <SimpleGrid w="100%" gap="24px" columns={5}>
        {nfts.map((nft) => (
          <Card
            onClick={() => navigate(`/nfts/${nft.id}`)}
            cursor="pointer"
            role="group"
            gap="12px"
            p="12px"
          >
            <Text textAlign="center" color="gray.300" fontWeight="bold">
              {nft.metadata?.name}
            </Text>
            <Divider w="50%" mx="auto" />
            <NFTCard key={nft.id} url={nft.metadata?.cid} />
            <HStack w="100%" justify="space-between">
              {/* <Text color="gray.500">{displayGnot(+nft.price)}</Text> */}
            </HStack>
          </Card>
        ))}
      </SimpleGrid>
    </VStack>
  );
};

export default NftPage;
