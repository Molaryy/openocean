import {
  Box,
  HStack,
  Icon,
  Tab,
  TabList,
  Table,
  TableContainer,
  Tabs,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { FC, useMemo, useState } from "react";
import { displayUgnot } from "../utils";
import NFTCard from "../atoms/NFTCard";
import { ImStarEmpty, ImStarFull } from "react-icons/im";
import useGetAllCollections from "../hooks/useGetAllCollections";

interface StatRow {
  name: string;
  img: string;
  volume: number;
  price: number;
  sales: number;
  starred: boolean;
}

const StatsPage: FC = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const { data: stats } = useGetAllCollections();

  const filteredStats = useMemo<StatRow[]>(
    () =>
      stats
        ?.filter((stat) => (tabIndex === 0 ? true : true))
        .map<StatRow>((stat) => ({
          img: stat.logo,
          name: stat.name,
          price: stat.nfts.reduce((acc, nft) => acc + nft.price, 0),
          sales: stat.sales,
          volume: stat.volume,
          starred: true,
        })) ?? [],
    [stats, tabIndex]
  );

  return (
    <VStack align="start" w="100%" h="100%" spacing="12px">
      <Text userSelect="none" fontSize="32px">
        Stats
      </Text>
      <Tabs
        onChange={setTabIndex}
        tabIndex={tabIndex}
        variant="soft-rounded"
        colorScheme="purple"
      >
        <TabList gap="10px" h="30px" color="gray.300" w="100%">
          <Tab transition="0.5s">Top</Tab>
          <Tab transition="0.5s">Starred</Tab>
        </TabList>
      </Tabs>
      <TableContainer w="100%">
        <Table>
          <Thead>
            <Tr>
              <Th>#</Th>
              <Th>Name</Th>
              <Th textAlign="end">Volume</Th>
              <Th textAlign="end">Price</Th>
              <Th textAlign="end">Sales</Th>
              <Th />
            </Tr>
          </Thead>
          <Tbody>
            {filteredStats.map((stat, idx) => (
              <Tr
                role="group"
                color="gray.500"
                _hover={{ color: "gray.300" }}
                transition="0.6s"
                key={stat.name}
              >
                <Td>{++idx}</Td>
                <Td>
                  <HStack cursor="pointer">
                    <Box w="45px" h="45x">
                      <NFTCard ratio={1} url={stat.img} />
                    </Box>
                    <Text fontWeight="semibold" color="inherit">
                      {stat.name}
                    </Text>
                  </HStack>
                </Td>
                <Td textAlign="end">{stat.volume}</Td>
                <Td textAlign="end">{displayUgnot(stat.price)}</Td>
                <Td textAlign="end">{stat.sales}</Td>
                <Td textAlign="end">
                  <Icon
                    as={stat.starred ? ImStarFull : ImStarEmpty}
                    cursor="pointer"
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </VStack>
  );
};

export default StatsPage;
