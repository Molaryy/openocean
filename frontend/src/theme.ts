import { defineStyleConfig, extendTheme } from "@chakra-ui/react";

const Button = defineStyleConfig({
  baseStyle: {
    fontWeight: "bold",
    borderRadius: "base",
  },
  variants: {
    primary: {
      p: "0px",
      fontFamily: "heading",
      color: "gray.400",
      _hover: {
        color: "gray.50",
      },
      transitionDuration: "0.5s",
    },
  },
  defaultProps: {
    size: "md",
    variant: "primary",
  },
});

export const colors = {
  gray: {
    50: "#f7fafc",
    100: "#edf2f7",
    200: "#e2e8f0",
    300: "#cbd5e0",
    400: "#a0aec0",
    500: "#718096",
    600: "#4a5568",
    700: "#2d3748",
    800: "#1a202c",
    900: "#171923",
  },
};

const theme = extendTheme({
  colors,
  fonts: {
    heading: "Poppins, sans-serif",
    body: "Whyte, sans-serif",
  },
  components: {
    Table: {
      variants: {
        simple: {
          th: {
            borderColor: "gray.700",
          },
          td: {
            borderColor: "gray.800",
          },
        },
      },
    },
    Text: {
      baseStyle: {
        color: "gray.50",
      },
    },
    Heading: {
      baseStyle: {
        color: "gray.50",
      },
    },
    Button,
  },
});

export default theme;
