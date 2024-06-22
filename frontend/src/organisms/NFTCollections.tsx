import { Card, HStack, SimpleGrid, Text } from "@chakra-ui/react";
import { FC } from "react";
import NFTCard from "../atoms/NFTCard";
import { displayGnot } from "../utils";

const NFTCollections: FC = () => {
  const collections = [
    {
      name: "CryptoPunks",
      image:
        "https://i.seadn.io/gcs/files/fc10be32d50596a31418d56278738e5a.png?auto=format&dpr=1&h=500",
      price: "0.1",
    },
    {
      name: "CryptoDunks",
      image:
        "https://i.seadn.io/s/production/1e838e07-7b4c-45a3-8056-74bd41e1751c.png?w=500&auto=format",
      price: "0.1",
    },
    {
      name: "CryptoTrunks",
      image:
        "https://i.seadn.io/s/production/06edba2f-e356-46fe-b7b5-df916822376e.png?w=500&auto=format",
      price: "0.1",
    },
    {
      name: "CryptoChunks",
      image:
        "https://i.seadn.io/s/production/04caa6d8-fadc-40a3-9e85-9d4b6edc15c0.png?w=500&auto=format",
      price: "0.1",
    },
    {
      name: "CryptoBunks",
      image:
        "https://i.seadn.io/gae/XVxQMmuyf23slIQtC7zB_IA3X4PXSgxzNCEHlrF2fmJyJ_Jo1wsnh-WPErY5so5sagOrONCkNdalBJoLv5LFJNDz--Zq6xUzPd3Aw1s?auto=format&dpr=1&h=500",
      price: "0.1",
    },
    {
      name: "CryptoLunks",
      image:
        "https://i.seadn.io/gcs/files/66569ce21fefe99c997132692fd57f48.png?auto=format&dpr=1&h=500",
      price: "0.1",
    },
    {
      name: "CryptoPunks",
      image:
        "https://i.seadn.io/gcs/files/fc10be32d50596a31418d56278738e5a.png?auto=format&dpr=1&h=500",
      price: "0.1",
    },
    {
      name: "CryptoDunks",
      image:
        "https://i.seadn.io/s/production/1e838e07-7b4c-45a3-8056-74bd41e1751c.png?w=500&auto=format",
      price: "0.1",
    },
    {
      name: "CryptoTrunks",
      image:
        "https://i.seadn.io/s/production/06edba2f-e356-46fe-b7b5-df916822376e.png?w=500&auto=format",
      price: "0.2",
    },
  ];

  return (
    <SimpleGrid columns={5} spacing="24px" w="100%">
      {collections.map((collection) => (
        <Card
          key={collection.name}
          cursor="pointer"
          w="100%"
          bg="linear-gradient(145deg, #2b2e3a, #1f2029)"
          boxShadow="lg"
        >
          <NFTCard url={collection.image} />
          <HStack p="8px" w="100%" justify="space-between">
            <Text textAlign="center" color="gray.300" fontWeight="bold">
              {collection.name}
            </Text>
            <Text textAlign="center" color="gray.500">
              {displayGnot(+collection.price)}
            </Text>
          </HStack>
        </Card>
      ))}
    </SimpleGrid>
  );
};

export default NFTCollections;
