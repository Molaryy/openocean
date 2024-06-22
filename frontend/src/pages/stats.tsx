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
import { displayGnot } from "../utils";
import NFTCard from "../atoms/NFTCard";
import { ImStarEmpty, ImStarFull } from "react-icons/im";

const StatsPage: FC = () => {
  const stats = useMemo(
    () => [
      {
        img: "https://i.seadn.io/gae/lHexKRMpw-aoSyB1WdFBff5yfANLReFxHzt1DOj_sg7mS14yARpuvYcUtsyyx-Nkpk6WTcUPFoG53VnLJezYi8hAs0OxNZwlw6Y-dmI?auto=format&dpr=1&w=64",
        name: "Mutant Ape Yacht Club",
        volume: 37,
        price: 1.55,
        sales: 24,
        starred: true,
      },
      {
        img: "https://i.seadn.io/gae/yNi-XdGxsgQCPpqSio4o31ygAV6wURdIdInWRcFIl46UjUQ1eV7BEndGe8L661OoG-clRi7EgInLX4LPu9Jfw4fq0bnVYHqg7RFi?auto=format&dpr=1&w=64",
        name: "Pudgy Penguins",
        volume: 36,
        price: 9.99,
        sales: 4,
        starred: false,
      },
    ],
    []
  );

  const [tabIndex, setTabIndex] = useState(0);

  const filteredStats = useMemo(
    () => (tabIndex === 0 ? stats : stats.filter((stat) => stat.starred)),
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
              <Th>Volume</Th>
              <Th>Price</Th>
              <Th>Sales</Th>
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
                <Td>{stat.volume}</Td>
                <Td>{displayGnot(stat.price)}</Td>
                <Td>{stat.sales}</Td>
                <Td>
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
