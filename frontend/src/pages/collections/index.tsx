import { Text, VStack } from "@chakra-ui/react";
import { FC } from "react";
import NFTCollections from "../../organisms/NFTCollections";

const CollectionsPage: FC = () => (
  <VStack align="start" w="100%" h="100%" spacing="12px">
    <Text userSelect="none" fontSize="32px">
      Collections
    </Text>
    <NFTCollections />
  </VStack>
);

export default CollectionsPage;
