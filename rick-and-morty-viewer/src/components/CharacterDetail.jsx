import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Spinner, Alert, AlertIcon, Image } from '@chakra-ui/react';

function CharacterDetail() {
    const { id } = useParams(); // Get the character ID from the URL parameter
    const [character, setCharacter] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchCharacter() {
            try {
                setLoading(true);
                setError(null); // Reset error state before fetching

                const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch character data');
                }

                const data = await response.json();
                
                setCharacter(data);
            } catch (err) {
                console.error('Error fetching character:', err);
                setError(err);
            } finally {
                setLoading(false);
            }
        }

        fetchCharacter();
    }, [id]);

    if (loading) {
        return <Spinner mt={4} />;
    }

    if (error) {
        return (
            <Alert mt={4} status="error">
                <AlertIcon />
                {error.message}
            </Alert>
        );
    }

    // Check if character is null or undefined
    if (!character) {
        return (
            <Alert mt={4} status="warning">
                <AlertIcon />
                Character not found.
            </Alert>
        );
    }

    return (
        <Box>
            <h2>{character.name || 'Unknown'}</h2>
            {/* Display the character image */}
            <Image src={character.image} alt={character.name} mb={4} />
            <p>Species: {character.species || 'Unknown'}</p>
            <p>Status: {character.status || 'Unknown'}</p>
            <p>Gender: {character.gender || 'Unknown'}</p>
            <p>Origin: {character.origin ? character.origin.name : 'Unknown'}</p>
            {/* Display the list of episode URLs */}
            <p>Episodes:</p>
            <ul>
                {character.episode.map((episodeUrl, index) => (
                    <li key={index}>{episodeUrl}</li>
                ))}
            </ul>
        </Box>
    );
}

export default CharacterDetail;
