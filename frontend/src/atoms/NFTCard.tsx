import { AspectRatio, Box } from "@chakra-ui/react";
import { FC } from "react";

const NFTCard: FC<{ url: string; ratio?: number }> = ({
  url,
  ratio = 16 / 9,
}) => (
  <AspectRatio ratio={ratio} w="100%" h="100%">
    <Box
      transitionDuration="0.5s"
      _groupHover={{
        opacity: "1",
      }}
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
