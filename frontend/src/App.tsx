import Header from "./organisms/Header";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import theme, { colors } from "./theme";
import { ChakraProvider, VStack } from "@chakra-ui/react";
import Home from "./pages/Home";

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
          <Outlet />
        </VStack>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
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
