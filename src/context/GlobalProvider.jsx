import * as React from 'react';


import { CSSReset, ChakraProvider, ColorModeScript } from '@chakra-ui/react';


const GlobalProviders = ({ children }) => {
    return (
        <>

            <ColorModeScript />
            <ChakraProvider>
                <CSSReset />
                {children}


            </ChakraProvider>

        </>
    );
};

export default GlobalProviders;