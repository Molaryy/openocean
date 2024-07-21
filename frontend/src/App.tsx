import Header from "./organisms/Header";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import theme, { colors } from "./theme";
import { ChakraProvider, VStack } from "@chakra-ui/react";
import Home from "./pages";
import StatsPage from "./pages/stats";
import NftPage from "./pages/nfts";
import CollectionsPage from "./pages/Collections";
import MintPage from "./pages/Mint";
import { FC } from "react";
import NftDetailsPage from "./pages/nfts/:id";

const Layout: FC = () => (
  <VStack
    h="100vh"
    w="100vw"
    bg={`linear-gradient(180deg, ${colors.gray[900]}, ${colors.gray[700]})`}
  >
    <Header />
    <VStack
      overflowY="scroll"
      w="100%"
      h="100%"
      px="84px"
      py="32px"
      spacing="48px"
    >
      <Outlet />
    </VStack>
  </VStack>
);

const App: FC = () => (
  <ChakraProvider theme={theme}>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/stats" element={<StatsPage />} />
          <Route path="/mint" element={<MintPage />} />
          <Route path="/nfts/*">
            <Route index element={<NftPage />} />
            <Route path=":id" element={<NftDetailsPage />} />
          </Route>
          <Route path="/collections" element={<CollectionsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </ChakraProvider>
);

export default App;
