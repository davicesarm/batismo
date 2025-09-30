import React, { useState, useMemo } from "react";
import { FaSearch } from "react-icons/fa";

interface SearchProps<T> {
  items: T[];
  searchKeys: (keyof T)[];
  renderItem: (item: T) => React.ReactNode;
  keyExtractor: (item: T) => string | number;
  getValueFromItem: (item: T) => string;
  onSelect?: (item: T) => void;
  required?: boolean;
  placeholder?: string;
}

export function Search<T extends object>({
  items,
  searchKeys,
  renderItem,
  keyExtractor,
  getValueFromItem,
  onSelect,
  required = false,
  placeholder = "Buscar...",
}: SearchProps<T>) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const filteredItems = useMemo(() => {
    // Não mostra a lista se o valor do input for idêntico a um item já selecionado.
    const isValueSelected = items.some(
      (item) => getValueFromItem(item) === searchTerm
    );
    if (!searchTerm.trim() || isValueSelected) {
      return [];
    }

    const lowercasedFilter = searchTerm.toLowerCase();
    return items.filter((item) => {
      return searchKeys.some((key) => {
        const value = item[key];
        return value && String(value).toLowerCase().includes(lowercasedFilter);
      });
    });
  }, [items, searchTerm, searchKeys, getValueFromItem]);

  const handleItemClick = (item: T) => {
    const value = getValueFromItem(item);
    setSearchTerm(value);
    setIsFocused(false);
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <div className="relative">
      <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
      <input
        type="search"
        id="search"
        name="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={placeholder}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        autoComplete="off"
        required={required}
        className="text-neutral-700 w-full border border-neutral-300 rounded px-9 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={() => setSearchTerm("")}
        className="text-neutral-500 font-bold hover:text-neutral-900 cursor-pointer absolute right-3 top-1/2 -translate-y-1/2">
        &times;
      </button>

      {isFocused && filteredItems.length > 0 && (
        <div className="text-neutral-700 border border-neutral-400/50 text-sm absolute bg-neutral-300/80 backdrop-blur-xs w-full max-h-60 overflow-y-auto mt-1 rounded shadow-lg z-10">
          {filteredItems.map((item) => (
            <div
              key={keyExtractor(item)}
              onMouseDown={() => handleItemClick(item)}
              className="not-last:border-b border-neutral-400/50 cursor-pointer">
              {renderItem(item)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
