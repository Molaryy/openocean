import { FC } from "react";
import AvailableNFTs from "../organisms/AvailableNFTs";
import NFTCollections from "../organisms/NFTCollections";
import { VStack } from "@chakra-ui/react";
import SectionTitle from "../molecules/SectionTitle";
import { useNavigate } from "react-router-dom";

const Home: FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <VStack align="start" w="100%" h="100%" spacing="24px">
        <SectionTitle title="NFTs" onClick={() => navigate("/nfts")} />
        <AvailableNFTs />
      </VStack>
      <VStack align="start" w="100%" h="100%" spacing="24px">
        <SectionTitle
          title="Collections"
          onClick={() => navigate("/collections")}
        />
        <NFTCollections />
      </VStack>
    </>
  );
};

export default Home;
