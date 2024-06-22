import { FC } from "react";
import AvailableNFTs from "../organisms/AvailableNFTs";
import NFTCollections from "../organisms/NFTCollections";

const Home: FC = () => (
  <>
    <AvailableNFTs />
    <NFTCollections />
  </>
);

export default Home;
