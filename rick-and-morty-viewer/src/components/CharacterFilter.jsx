import React from 'react';
import { Flex, Select } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';


function CharacterFilter({ filterStatus, setFilterStatus }) {
    const handleChange = (e) => {
        setFilterStatus(e.target.value);
    };

    return (
        <Flex justify="center" mt={4}>
            <Select
                value={filterStatus}
                onChange={handleChange}
                placeholder="Filter by status"
                width="260px" // Adjust the width
                height="30px" // Adjust the height
                fontSize="lg"
                py={4}
                px={6}
                color="black" // Set option text color to black
                bg="white" // Set dropdown box background color to white
                icon={<ChevronDownIcon />}
            >
                <option value="alive">Alive</option>
                <option value="dead">Dead</option>
                <option value="unknown">Unknown</option>
            </Select>
        </Flex>
        
    );
}

export default CharacterFilter;
