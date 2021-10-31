import * as React from 'react';


import { CSSReset, ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { AuthProvider } from './auth';

const GlobalProviders = ({ children }) => {
    return (
        <>

            <ColorModeScript />
            <ChakraProvider>
                <AuthProvider>
                <CSSReset />
                {children}

                </AuthProvider>


            </ChakraProvider>

        </>
    );
};

export default GlobalProviders;