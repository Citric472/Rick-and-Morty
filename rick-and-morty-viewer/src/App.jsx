import React from 'react';
import { Box, Container, Heading } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CharacterList from './components/CharacterList';
import CharacterDetail from './components/CharacterDetail';

function App() {
    return (
        <Router>
            <Container maxW="container.xl" p={4}>
                {/* Add a title using the Heading component */}
                <Heading as="h1" size="xl" mb={4}>
                    Rick and Morty Character Explorer
                </Heading>

                <Routes>
                    <Route path="/" element={<CharacterList />} />
                    <Route path="/character/:id" element={<CharacterDetail />} />
                </Routes>
            </Container>
        </Router>
    );
}

export default App;

