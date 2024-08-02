import {
  Box,
  Button,
  Card,
  HStack,
  Icon,
  Link,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { FC, useCallback, useMemo } from "react";
import NFTCard from "../../atoms/NFTCard";
import { useParams } from "react-router-dom";
// import NFTTransactions from "../../organisms/NFTTransactions";
import NFTDetails from "../../organisms/NFTDetails";
import useGetAllNFTs from "../../hooks/useGetAllNFTs";
import useGetAllCollections from "../../hooks/useGetAllCollections";
import { urlFromIpfsHash } from "../../utils";
import { FaShoppingCart } from "react-icons/fa";
import { useAccountStore } from "../../store";
import useSetForSale from "../../hooks/useSetForSale";
import useBuyNFT from "../../hooks/useBuyNFT";

const NftDetailsPage: FC = () => {
  const { id } = useParams();

  const { address, balance } = useAccountStore();

  const { data: collections } = useGetAllCollections();
  const { nfts } = useGetAllNFTs();

  const nft = useMemo(() => nfts.find((nft) => nft.id === id), [id, nfts]);
  const collection = useMemo(
    () =>
      collections?.find((collection) => collection.id === nft?.collectionId),
    [collections, nft?.collectionId]
  );

  const { mutate: triggerSetForSale } = useSetForSale();
  const { mutate: triggerBuyNFT } = useBuyNFT();

  const toast = useToast();

  const handleSetForSale = useCallback(() => {
    if (!nft) return;

    triggerSetForSale(
      {
        collectionId: nft.collectionId,
        nftId: nft.id,
        sellingState: !nft.isForSale,
      },
      {
        onSuccess: () =>
          toast({
            title: "Success",
            description: !nft.isForSale
              ? "NFT is now for sale"
              : "NFT is no longer for sale",
            status: "success",
          }),
        onError: (error) =>
          toast({
            title: "Error",
            description: error.message,
            status: "error",
          }),
      }
    );
  }, [nft, toast, triggerSetForSale]);

  const handleBuyNFT = useCallback(() => {
    if (!nft) return;

    triggerBuyNFT(
      {
        collectionId: nft.collectionId,
        nftId: nft.id,
        price: nft.price,
      },
      {
        onSuccess: () =>
          toast({
            title: "Success",
            description: "NFT has been bought",
            status: "success",
          }),
        onError: (error) =>
          toast({
            title: "Error",
            description: error.message,
            status: "error",
          }),
      }
    );
  }, [nft, toast, triggerBuyNFT]);

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
          <Card p="32px" w="100%" h="100%" gap="12px">
            <NFTDetails nft={nft} />
          </Card>
          <HStack w="100%">
            {address !== nft.owner ? (
              <Button
                onClick={handleBuyNFT}
                isDisabled={!nft.isForSale || nft.price >= balance}
                w="100%"
                variant="secondary"
              >
                <HStack>
                  <span>Buy</span>
                  <Icon as={FaShoppingCart} />
                </HStack>
              </Button>
            ) : (
              !!address && (
                <Button onClick={handleSetForSale} w="100%" variant="secondary">
                  {nft.isForSale ? "Remove from market" : "Mark for sale"}
                </Button>
              )
            )}
          </HStack>
        </VStack>
      </HStack>
    </VStack>
  );
};

export default NftDetailsPage;
