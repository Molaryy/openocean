import { Box, Card, HStack, Text, VStack } from "@chakra-ui/react";
import { FC } from "react";
import NFTCard from "../../atoms/NFTCard";
import data from "./data";
import { useParams } from "react-router-dom";
import { colors } from "../../theme";
import NFTTransactions from "../../organisms/NFTTransactions";
import NFTDetails from "../../organisms/NFTDetails";

const NftDetailsPage: FC = () => {
  const { id } = useParams();

  const nft = data[+(id as string)];

  return (
    <VStack w="100%" align="start" p="16px">
      <Text userSelect="none" fontSize="32px">
        {nft.name}
      </Text>
      <HStack spacing="24px" align="stretch" w="100%">
        <Box transition="0.5s" w="100%">
          <NFTCard url={nft.image} />
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
              description={nft.description}
              price={+nft.price}
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
            <NFTTransactions transactions={nft.transactions} />
          </Card>
        </VStack>
      </HStack>
    </VStack>
  );
};

export default NftDetailsPage;
