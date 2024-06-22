import { HStack, Box } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FC } from "react";
import NFTCard from "../atoms/NFTCard";
import { useNavigate } from "react-router-dom";
import data from "../pages/nfts/data";

const AvailableNFTs: FC = () => {
  const duplicatedNfts = [...data, ...data];
  const nftWidth = 33;

  const navigate = useNavigate();

  return (
    <HStack overflowX="hidden" w="100%">
      <motion.div
        style={{ display: "flex" }}
        animate={{
          x: [`-${nftWidth * data.length}vw`, "0px"],
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
            onClick={() => navigate(`/nfts/${nft.id}`)}
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
  );
};

export default AvailableNFTs;
