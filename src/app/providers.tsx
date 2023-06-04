"use client";

import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
    initialColorMode: "dark",
    useSystemColorMode: true,
};

const theme = extendTheme({ config });

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <CacheProvider>
            <ChakraProvider theme={theme}>{children}</ChakraProvider>
        </CacheProvider>
    );
}
