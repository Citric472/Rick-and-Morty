import React, { useState, useEffect } from 'react';
import { SimpleGrid, Button, Spinner, Box, Alert, AlertIcon } from '@chakra-ui/react';
import { motion } from 'framer-motion'; // Import motion from framer-motion
import CharacterCard from './CharacterCard';
import CharacterFilter from './CharacterFilter';

function CharacterList() {
    const [characters, setCharacters] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [filterStatus, setFilterStatus] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [sortDirection, setSortDirection] = useState('asc');

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

    const sortCharacters = (criteria) => {
        if (sortBy === criteria) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(criteria);
            setSortDirection('asc');
        }
    };

    const sortedCharacters = characters.slice().sort((a, b) => {
        if (sortBy === 'name') {
            return sortDirection === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
        } else if (sortBy === 'species') {
            return sortDirection === 'asc' ? a.species.localeCompare(b.species) : b.species.localeCompare(a.species);
        } else if (sortBy === 'status') {
            return sortDirection === 'asc' ? a.status.localeCompare(b.status) : b.status.localeCompare(a.status);
        }
        return 0;
    });

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}> {/* Add motion animation wrapper */}
            <Box>
                <CharacterFilter filterStatus={filterStatus} setFilterStatus={setFilterStatus} />
                <Box mt={4}>
                    <Button mr={4} onClick={() => sortCharacters('name')}>Sort by Name</Button>
                    <Button mr={4} onClick={() => sortCharacters('species')}>Sort by Species</Button>
                    <Button onClick={() => sortCharacters('status')}>Sort by Status</Button>
                </Box>
                <SimpleGrid columns={[1, null, 2, 4]} spacing={[4, null, 6, 8]} mt={8}>
                    {sortedCharacters.map((character, index) => (
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
        </motion.div>
    );
}

export default CharacterList;
