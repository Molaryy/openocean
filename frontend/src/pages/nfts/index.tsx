import {
  Card,
  Divider,
  HStack,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FC, useMemo } from "react";
import NFTCard from "../../atoms/NFTCard";
import { useNavigate } from "react-router-dom";
import useGetAllNFTs from "../../hooks/useGetAllNFTs";
import { displayUgnot } from "../../utils";
import { Nft } from "../../types/nfts";
import { useAccountStore } from "../../store";
import { colors } from "../../theme";

const NftCard: FC<{ nft: Nft }> = ({ nft }) => {
  const navigate = useNavigate();
  return (
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
      <HStack w="100%" justify="end">
        <Text color="gray.500">{displayUgnot(+nft.price)}</Text>
      </HStack>
    </Card>
  );
};

const NftPage: FC = () => {
  const { address } = useAccountStore();

  const { nfts } = useGetAllNFTs();

  const { myNFTs, otherNFTs } = useMemo(
    () => ({
      myNFTs: nfts.filter((nft) => nft.owner === address),
      otherNFTs: nfts.filter((nft) => nft.owner !== address),
    }),
    [address, nfts]
  );

  return (
    <VStack align="start" w="100%" h="100%" spacing="12px">
      <Text userSelect="none" fontSize="32px">
        NFTs
      </Text>
      {!address && (
        <SimpleGrid w="100%" gap="24px" columns={5}>
          {nfts.map((nft) => (
            <NftCard key={nft.id} nft={nft} />
          ))}
        </SimpleGrid>
      )}
      {myNFTs.length > 0 && (
        <>
          <Text userSelect="none" fontSize="24px">
            Your <span style={{ color: colors.gray[500] }}>({address}) </span>
            NFTs
          </Text>
          <SimpleGrid w="100%" gap="24px" columns={5}>
            {myNFTs.map((nft) => (
              <NftCard key={nft.id} nft={nft} />
            ))}
          </SimpleGrid>
        </>
      )}
      {otherNFTs.length > 0 && (
        <>
          <Text userSelect="none" fontSize="24px">
            Public NFTs
          </Text>
          <SimpleGrid w="100%" gap="24px" columns={5}>
            {otherNFTs.map((nft) => (
              <NftCard key={nft.id} nft={nft} />
            ))}
          </SimpleGrid>
        </>
      )}
    </VStack>
  );
};

export default NftPage;
