import { VStack } from "@chakra-ui/react";
import { FC } from "react";
import AvailableNFTs from "../organisms/AvailableNFTs";
import NFTCollections from "../organisms/NFTCollections";

const Home: FC = () => {
  return (
    <VStack
      overflowY="scroll"
      w="100%"
      h="100%"
      px="84px"
      py="32px"
      spacing="48px"
    >
      <AvailableNFTs />
      <NFTCollections />
    </VStack>
  );
};

export default Home;
