import React, { useState, useEffect } from 'react';
import { SimpleGrid, Button, Spinner, Box, Alert, AlertIcon } from '@chakra-ui/react';
import CharacterCard from './CharacterCard';
import CharacterFilter from './CharacterFilter';

function CharacterList() {
    const [characters, setCharacters] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [filterStatus, setFilterStatus] = useState('');

    useEffect(() => {
        async function fetchCharacters() {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}&status=${filterStatus}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch characters. Server responded with status code ${response.status}.`);
                }

                const data = await response.json();

                if (data.results && Array.isArray(data.results)) {
                    if (page === 1) {
                        setCharacters(data.results);
                    } else {
                        setCharacters(prevCharacters => [...prevCharacters, ...data.results]);
                    }
                } else {
                    throw new Error('Unexpected data format received from API.');
                }
            } catch (err) {
                console.error('Error fetching characters:', err);
                setError(`Error fetching characters: ${err.message}. Please try again later.`);
            } finally {
                setLoading(false);
            }
        }

        fetchCharacters();
    }, [page, filterStatus]);

    const loadMore = () => setPage(prevPage => prevPage + 1);

    return (
        <Box>
            <CharacterFilter filterStatus={filterStatus} setFilterStatus={setFilterStatus} />
            <SimpleGrid columns={[1, null, 2, 4]} spacing={[4, null, 6, 8]} mt={8}>
                {characters.map((character, index) => (
                    <CharacterCard
                        key={`${character.id}-${index}`}
                        character={character}
                    />
                ))}
            </SimpleGrid>
            {loading && <Spinner mt={4} />}
            {error && (
                <Alert mt={4} status="error">
                    <AlertIcon />
                    {error}
                </Alert>
            )}
            {!loading && (
                <Button onClick={loadMore} mt={4}>
                    Load More
                </Button>
            )}
        </Box>
    );
}

export default CharacterList;
