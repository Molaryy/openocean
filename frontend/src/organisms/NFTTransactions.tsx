import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react";
import { FC } from "react";
import { displayGnot } from "../utils";

const NFTTransactions: FC<{
  transactions: {
    event: string;
    price: string;
    from: string;
    to: string;
    timestamp: string;
  }[];
}> = ({ transactions }) => (
  <TableContainer>
    <Table>
      <Thead>
        <Tr>
          <Th>Event</Th>
          <Th>Price</Th>
          <Th>From</Th>
          <Th>To</Th>
          <Th>Timestamp</Th>
        </Tr>
      </Thead>
      <Tbody>
        {transactions.map((event) => (
          <Tr
            role="group"
            color="gray.500"
            _hover={{ bg: "gray.900" }}
            transition="0.6s"
            key={event.timestamp}
          >
            <Td>{event.event}</Td>
            <Td>{displayGnot(+event.price)}</Td>
            <Td>{event.from}</Td>
            <Td>{event.to}</Td>
            <Td>{event.timestamp}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  </TableContainer>
);

export default NFTTransactions;
