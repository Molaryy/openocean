import Header from "./organisms/Header";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import theme, { colors } from "./theme";
import { ChakraProvider, VStack } from "@chakra-ui/react";
import Home from "./pages";
import StatsPage from "./pages/stats";
import NftPage from "./pages/nfts";
import CollectionsPage from "./pages/collections";
import MintPage from "./pages/Mint";
import { FC, useEffect } from "react";
import NftDetailsPage from "./pages/nfts/:id";
import { GnoJSONRPCProvider } from "@gnolang/gno-js-client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { constants } from "./constants";
import { useProviderStore } from "./store";
import Collection from "./pages/collections/:id";
import CreateCollection from "./pages/CreateCollection";

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

const queryClient = new QueryClient();

const App: FC = () => {
  const { setProvider } = useProviderStore();
  useEffect(() => {
    const provider = new GnoJSONRPCProvider(constants.chainRPC);
    setProvider(provider);
  }, [setProvider]);

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/stats" element={<StatsPage />} />
              <Route path="/create-collection" element={<CreateCollection />} />
              <Route path="/mint" element={<MintPage />} />
              <Route path="/nfts/*">
                <Route index element={<NftPage />} />
                <Route path=":id" element={<NftDetailsPage />} />
              </Route>
              <Route path="/collections/*">
                <Route index element={<CollectionsPage />} />
                <Route path=":id" element={<Collection />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </QueryClientProvider>
  );
};

export default App;
