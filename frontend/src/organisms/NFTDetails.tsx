import {
  Center,
  Divider,
  HStack,
  Icon,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import { FC, useState } from "react";
import { displayUgnot } from "../utils";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { FaCheck } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { Nft } from "../types/nfts";
import { useAccountStore } from "../store";
import { PiWarningBold } from "react-icons/pi";

interface NFTDetailsProps {
  nft: Nft;
}
const NFTDetails: FC<NFTDetailsProps> = ({ nft }) => {
  const { balance } = useAccountStore();

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
          {nft.metadata?.description}
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
        <Text>{nft.owner}</Text>
      </HStack>
      <HStack justify="space-between" w="100%">
        <Text fontWeight="bold" color="gray.500">
          Price
        </Text>
        <Text>{displayUgnot(nft.price)}</Text>
        {balance <= nft.price && (
          <Tooltip label="You have an insufficient balance to buy this NFT">
            <Center>
              <Icon color="red.800" as={PiWarningBold} />
            </Center>
          </Tooltip>
        )}
      </HStack>
      <HStack justify="space-between" w="100%">
        <Text fontWeight="bold" color="gray.500">
          For sale
        </Text>
        <Icon
          color={nft.isForSale ? "green.500" : "red.800"}
          as={nft.isForSale ? FaCheck : FaX}
        />
      </HStack>
    </>
  );
};

export default NFTDetails;
