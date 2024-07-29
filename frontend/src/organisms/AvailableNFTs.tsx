import { HStack, Box } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FC } from "react";
import NFTCard from "../atoms/NFTCard";
import { useNavigate } from "react-router-dom";
import useGetAllNFTs from "../hooks/useGetAllNFTs";

const AvailableNFTs: FC = () => {
  const { nfts } = useGetAllNFTs();
  const duplicatedNfts = [...nfts, ...nfts];
  const nftWidth = 33;

  const navigate = useNavigate();

  return (
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
            key={nft.id}
            cursor="pointer"
            onClick={() => navigate(`/nfts/${nft.id}`)}
            w={`${nftWidth}vw`}
            px="24px"
            flexShrink={0}
          >
            <NFTCard url={nft?.metadata?.ipfsUrl} />
          </Box>
        ))}
      </motion.div>
    </HStack>
  );
};

export default AvailableNFTs;
