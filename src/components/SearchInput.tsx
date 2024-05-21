import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";

interface Props {
  onSearch: (searchText: string) => void;
}

const SearchInput = ({ onSearch }: Props) => {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (searchQuery) onSearch(searchQuery);
      }}
    >
      <InputGroup>
        <InputLeftElement children={<BsSearch />} />
        <Input
          borderRadius={20}
          placeholder="Search games..."
          variant="filled"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
      </InputGroup>
    </form>
  );
};

export default SearchInput;
