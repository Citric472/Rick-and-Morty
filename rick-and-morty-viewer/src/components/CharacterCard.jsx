import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Text, Image } from '@chakra-ui/react';

function CharacterCard({ character }) {
    return (
        // Link wraps the entire card so that clicking on it navigates to the detailed page
        <Link to={`/character/${character.id}`}>
            <Box
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                p={4}
                _hover={{ boxShadow: 'lg' }} // Adds a hover effect
                cursor="pointer" // Changes cursor to pointer on hover
            >
                <Image src={character.image} alt={character.name} />
                <Text fontWeight="bold" mt={2}>{character.name}</Text>
                <Text mt={1}>Species: {character.species}</Text>
                <Text mt={1}>Status: {character.status}</Text>
            </Box>
        </Link>
    );
}

export default CharacterCard;

