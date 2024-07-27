import { Card, HStack, Icon, Text } from "@chakra-ui/react";
import { FC } from "react";
import NFTCard from "../atoms/NFTCard";
import { FaQuestion } from "react-icons/fa";

interface NFTCardWithDetailsProps {
  name: string;
  description: string;
  img?: string;
  onClick: () => void;
}
const NFTCardWithDetails: FC<NFTCardWithDetailsProps> = ({
  name,
  description,
  img,
  onClick,
}) => (
  <Card
    boxShadow="lg"
    {...(img && { cursor: "pointer", onClick })}
    w="100%"
    bg="linear-gradient(145deg, #2b2e3a, #1f2029)"
  >
    <NFTCard url={img} />
    {!img && (
      <Icon
        as={FaQuestion}
        left="calc(50% - 10px)"
        top="calc(50% - 25px)"
        w="20px"
        h="20px"
        color="white"
        position="absolute"
      />
    )}
    <HStack userSelect="none" p="8px" w="100%" justify="space-between">
      <Text textAlign="center" color="gray.300" fontWeight="bold">
        {name}
      </Text>
      <Text color="gray.500" isTruncated>
        {description}
      </Text>
    </HStack>
  </Card>
);

export default NFTCardWithDetails;
