import Header from "./organisms/Header";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import theme, { colors } from "./theme";
import { ChakraProvider, VStack } from "@chakra-ui/react";
import Home from "./pages";
import StatsPage from "./pages/Stats";
import NftPage from "./pages/Nfts";
import CollectionsPage from "./pages/Collections";

function App() {
  const router = createBrowserRouter([
    {
      element: (
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
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/stats",
          element: <StatsPage />,
        },
        {
          path: "/nfts",
          element: <NftPage />,
        },
        {
          path: "/collections",
          element: <CollectionsPage />,
        },
      ],
    },
  ]);

  return (
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}

export default App;
