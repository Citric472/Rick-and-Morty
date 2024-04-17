// App.jsx
import React from 'react';
import {
    ChakraProvider,
    Container,
    Heading,
    extendTheme,
    CSSReset,
} from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CharacterList from './components/CharacterList';
import CharacterDetail from './components/CharacterDetail';
import './App.css';

// Define a custom theme with dark background and white text color
const customTheme = extendTheme({
    styles: {
        global: {
            body: {
                bg: 'black',
                color: 'white',
            },
        },
    },
});

function App() {
    return (
        <ChakraProvider theme={customTheme}>
            <CSSReset />
            <Router>
                <Container maxW="container.xl" p={4}>
                    {/* Center the title using the Box component */}
                    <Heading as="h1" size="xl" mb={4} textAlign="center">
                        Rick and Morty Character Explorer
                    </Heading>

                    <Routes>
                        <Route path="/" element={<CharacterList />} />
                        <Route path="/character/:id" element={<CharacterDetail />} />
                    </Routes>
                </Container>
            </Router>
        </ChakraProvider>
    );
}

export default App;
