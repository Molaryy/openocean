import { HStack, Text } from "@chakra-ui/react";
import { FC } from "react";
import { displayGnot } from "../utils";

const NFTDetails: FC<{ owner: string; description: string; price: number }> = ({
  owner,
  description,
  price,
}) => (
  <>
    <Text textAlign="justify">{description}</Text>
    <HStack>
      <Text fontWeight="bold" color="gray.500">
        Owner
      </Text>
      <Text>{owner}</Text>
    </HStack>
    <HStack>
      <Text fontWeight="bold" color="gray.500">
        Price
      </Text>
      <Text>{displayGnot(price)}</Text>
    </HStack>
  </>
);

export default NFTDetails;
