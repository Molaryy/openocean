import { AspectRatio, Box } from "@chakra-ui/react";
import { FC } from "react";

const NFTCard: FC<{ url: string }> = ({ url }) => (
  <AspectRatio ratio={16 / 9} w="100%" h="100%">
    <Box
      transitionDuration="0.5s"
      _hover={{
        opacity: "1",
      }}
      opacity="0.6"
      boxShadow="xl"
      borderRadius="4px"
      background={`url(${url})`}
      backgroundRepeat="no-repeat"
      backgroundPosition="center"
      backgroundSize="cover"
    />
  </AspectRatio>
);

export default NFTCard;
