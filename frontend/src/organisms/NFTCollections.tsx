import { SimpleGrid } from "@chakra-ui/react";
import { FC } from "react";
import useGetAllCollections from "../hooks/useGetAllCollections";
import { useNavigate } from "react-router-dom";
import NFTCardWithDetails from "../molecules/NFTCardWithDetails";

const NFTCollections: FC = () => {
  const { data: collections } = useGetAllCollections();

  const navigate = useNavigate();

  return (
    <SimpleGrid columns={5} spacing="24px" w="100%">
      {collections?.map((collection) => (
        <NFTCardWithDetails
          key={collection.id}
          onClick={() => navigate(`/collections/${collection.id}`)}
          img={collection.logo}
          description={collection.description}
          name={collection.name}
        />
      ))}
    </SimpleGrid>
  );
};

export default NFTCollections;
