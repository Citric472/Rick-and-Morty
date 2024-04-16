import React from 'react';
import { Select } from '@chakra-ui/react';

function CharacterFilter({ filterStatus, setFilterStatus }) {
    const handleChange = (e) => {
        setFilterStatus(e.target.value);
    };

    return (
        <Select
            value={filterStatus}
            onChange={handleChange}
            placeholder="Filter by status"
            mt={4}
        >
            <option value="alive">Alive</option>
            <option value="dead">Dead</option>
            <option value="unknown">Unknown</option>
        </Select>
    );
}

export default CharacterFilter;
