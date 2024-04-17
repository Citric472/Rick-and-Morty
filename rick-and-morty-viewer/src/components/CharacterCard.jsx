import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Text, Image } from '@chakra-ui/react';

function CharacterCard({ character }) {
    return (
        <Link to={`/character/${character.id}`}>
            <Box
                borderWidth="2px"
                borderRadius="lg"
                overflow="hidden"
                p={4}
                boxShadow="md" 
                bg="white" //
                transition="box-shadow 0.3s ease-in-out" 
                _hover={{ boxShadow: '0 4px 8px rgba(255, 255, 255, 0.2)' }} // White box shadow on hover
                cursor="pointer"
                display="flex"
                flexDirection="column"
                alignItems="center" 
                textAlign="center"
            >
                <Image src={character.image} alt={character.name} borderRadius="full" boxSize="150px"/>
                <Text fontWeight="bold" mt={3} color="black">Name:{character.name}</Text>
                <Text mt={1} color="black">Species: {character.species}</Text> 
                <Text mt={1} color="black">Status: {character.status}</Text> 
            </Box>
        </Link>
    );
}

export default CharacterCard;
