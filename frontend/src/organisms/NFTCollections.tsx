import { Card, SimpleGrid, VStack } from "@chakra-ui/react";
import { FC } from "react";
import SectionTitle from "../molecules/SectionTitle";
import NFTCard from "../atoms/NFTCard";

const NFTCollections: FC = () => {
  const collections = [
    {
      name: "CryptoPunks",
      image:
        "https://i.seadn.io/gcs/files/fc10be32d50596a31418d56278738e5a.png?auto=format&dpr=1&h=500",
    },
    {
      name: "CryptoDunks",
      image:
        "https://i.seadn.io/s/production/1e838e07-7b4c-45a3-8056-74bd41e1751c.png?w=500&auto=format",
    },
    {
      name: "CryptoTrunks",
      image:
        "https://i.seadn.io/s/production/06edba2f-e356-46fe-b7b5-df916822376e.png?w=500&auto=format",
    },
    {
      name: "CryptoChunks",
      image:
        "https://i.seadn.io/s/production/04caa6d8-fadc-40a3-9e85-9d4b6edc15c0.png?w=500&auto=format",
    },
    {
      name: "CryptoBunks",
      image:
        "https://i.seadn.io/gae/XVxQMmuyf23slIQtC7zB_IA3X4PXSgxzNCEHlrF2fmJyJ_Jo1wsnh-WPErY5so5sagOrONCkNdalBJoLv5LFJNDz--Zq6xUzPd3Aw1s?auto=format&dpr=1&h=500",
    },
    {
      name: "CryptoLunks",
      image:
        "https://i.seadn.io/gcs/files/66569ce21fefe99c997132692fd57f48.png?auto=format&dpr=1&h=500",
    },
    {
      name: "CryptoPunks",
      image:
        "https://i.seadn.io/gcs/files/fc10be32d50596a31418d56278738e5a.png?auto=format&dpr=1&h=500",
    },
    {
      name: "CryptoDunks",
      image:
        "https://i.seadn.io/s/production/1e838e07-7b4c-45a3-8056-74bd41e1751c.png?w=500&auto=format",
    },
    {
      name: "CryptoTrunks",
      image:
        "https://i.seadn.io/s/production/06edba2f-e356-46fe-b7b5-df916822376e.png?w=500&auto=format",
    },
  ];

  return (
    <VStack align="start" w="100%" h="100%" spacing="24px">
      <SectionTitle title="Collections" onClick={() => {}} />
      <SimpleGrid columns={5} spacing="24px" w="100%">
        {collections.map((collection) => (
          <Card
            key={collection.name}
            cursor="pointer"
            w="100%"
            bg="none"
            boxShadow="lg"
          >
            <NFTCard url={collection.image} />
          </Card>
        ))}
      </SimpleGrid>
    </VStack>
  );
};

export default NFTCollections;
