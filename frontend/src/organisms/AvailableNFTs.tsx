import { HStack, Box, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FC } from "react";
import SectionTitle from "../molecules/SectionTitle";
import NFTCard from "../atoms/NFTCard";

const AvailableNFTs: FC = () => {
  const nfts = [
    {
      name: "NFT 1",
      image:
        "https://i.seadn.io/gcs/files/a07fdcc050dbff6b337afec68d7eee37.png?auto=format&dpr=1&h=500",
      price: "0.1",
      owner: "0x1234",
    },
    {
      name: "NFT 2",
      image:
        "https://i.seadn.io/gcs/files/25059d629ad50cad3009a1f553a44401.jpg?auto=format&dpr=1&h=500&fr=1",
      price: "0.2",
      owner: "0x5678",
    },

    {
      name: "NFT 3",
      image:
        "https://i.seadn.io/s/raw/files/244ed6dd289a6ab8c971941096467637.gif?auto=format&dpr=1&h=500",
      price: "0.2",
      owner: "0x5678",
    },
  ];
  const duplicatedNfts = [...nfts, ...nfts];

  const nftWidth = 33;

  return (
    <VStack align="start" w="100%" h="100%" spacing="24px">
      <SectionTitle title="Available NFTs" onClick={() => {}} />
      <HStack overflowX="hidden" w="100%">
        <motion.div
          style={{ display: "flex" }}
          animate={{
            x: [`-${nftWidth * nfts.length}vw`, "0px"],
            transition: {
              ease: "linear",
              duration: 20,
              repeat: Infinity,
            },
          }}
        >
          {duplicatedNfts.map((nft) => (
            <Box
              cursor="pointer"
              key={nft.name}
              w={`${nftWidth}vw`}
              px="24px"
              flexShrink={0}
            >
              <NFTCard url={nft.image} />
            </Box>
          ))}
        </motion.div>
      </HStack>
    </VStack>
  );
};

export default AvailableNFTs;
