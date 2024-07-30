import { Divider, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { FC, useState } from "react";
import { displayUgnot } from "../utils";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

const NFTDetails: FC<{ owner: string; description: string; price: number }> = ({
  owner,
  description,
  price,
}) => {
  const [showMore, setShowMore] = useState<boolean>(false);

  return (
    <>
      <VStack w="100%">
        <Text
          transition="2s"
          noOfLines={showMore ? undefined : 3}
          color="gray.500"
          textAlign="justify"
        >
          {description}
        </Text>
        <Icon
          cursor="pointer"
          color="gray.300"
          as={showMore ? BiChevronUp : BiChevronDown}
          onClick={() => setShowMore((prevState) => !prevState)}
        />
      </VStack>
      <Divider />
      <HStack justify="space-between" w="100%">
        <Text fontWeight="bold" color="gray.500">
          Owner
        </Text>
        <Text>{owner}</Text>
      </HStack>
      <HStack justify="space-between" w="100%">
        <Text fontWeight="bold" color="gray.500">
          Price
        </Text>
        <Text>{displayUgnot(price)}</Text>
      </HStack>
    </>
  );
};

export default NFTDetails;
