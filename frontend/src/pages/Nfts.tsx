import {
  Card,
  Divider,
  HStack,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FC } from "react";
import NFTCard from "../atoms/NFTCard";
import { displayGnot } from "../utils";

const NftPage: FC = () => {
  const nfts = [
    {
      name: "NFT 1",
      image:
        "https://i.seadn.io/gcs/files/a07fdcc050dbff6b337afec68d7eee37.png?auto=format&dpr=1&h=500",
      price: "0.1",
      owner: "0x1234",
    },
    {
      name: "NFT 2",
      image:
        "https://i.seadn.io/gcs/files/25059d629ad50cad3009a1f553a44401.jpg?auto=format&dpr=1&h=500&fr=1",
      price: "0.2",
      owner: "0x5678",
    },

    {
      name: "NFT 3",
      image:
        "https://i.seadn.io/s/raw/files/244ed6dd289a6ab8c971941096467637.gif?auto=format&dpr=1&h=500",
      price: "0.2",
      owner: "0x5678",
    },
  ];

  return (
    <VStack align="start" w="100%" h="100%" spacing="12px">
      <Text userSelect="none" fontSize="32px">
        NFTs
      </Text>
      <SimpleGrid w="100%" gap="24px" columns={5}>
        {nfts.map((nft) => (
          <Card
            cursor="pointer"
            role="group"
            gap="12px"
            bg="linear-gradient(145deg, #2b2e3a, #1f2029)"
            boxShadow="lg"
            p="12px"
          >
            <Text textAlign="center" color="gray.300" fontWeight="bold">
              {nft.name}
            </Text>
            <Divider w="50%" mx="auto" />
            <NFTCard key={nft.name} url={nft.image} />
            <HStack w="100%" justify="space-between">
              <Text color="gray.500">{displayGnot(+nft.price)}</Text>
            </HStack>
          </Card>
        ))}
      </SimpleGrid>
    </VStack>
  );
};

export default NftPage;
