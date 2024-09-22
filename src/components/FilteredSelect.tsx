import React from 'react';
import { Item, getData } from '../api';
import '../style/dropdown.css';

interface HighlightedFilteredItem {
    id: number;
    name: string;
  }

interface FilteredSelectProps {
    highlightedFilteredItems: HighlightedFilteredItem[];
    setHighlightedFilteredItems: React.Dispatch<React.SetStateAction<HighlightedFilteredItem[]>>;
}

const FilteredSelect: React.FC<FilteredSelectProps> = ({
    highlightedFilteredItems,
    setHighlightedFilteredItems,
}) => {
    const [items, setItems] = React.useState<Item[]>([]);
    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    const dropdownRef = React.useRef<HTMLDivElement>(null);
    const [searchTerm, setSearchTerm] = React.useState<string>('');

    React.useEffect(() => {
        const fetchData = async() => {
            const data = getData();
            setItems(data);
        }

        fetchData()

        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
      
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSelectChange = (id: number, name: string) => {
        const selectedItem = { id, name };

        if (!highlightedFilteredItems.some(item => item.id === id)) {
        setHighlightedFilteredItems([...highlightedFilteredItems, selectedItem]);
        }
        setIsOpen(false); 
    };

    const handleRemoveItem = (id: number) => {
        const updatedItems = highlightedFilteredItems.filter(item => item.id !== id);
        setHighlightedFilteredItems(updatedItems);
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const clearSearch = () => {
        setSearchTerm('');
    };

    const filteredItems = items.filter(item =>
        item.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="custom-dropdown" ref={dropdownRef}>
        <label htmlFor="itemsDropdown" className="label-text">Label:</label>
            <div className="dropdown-wrapper" onClick={toggleDropdown}>
            <div className="selected-item">
                {highlightedFilteredItems.length > 0 ? (
                    <div className="tags-container">
                        {highlightedFilteredItems.map(item => (
                        <span key={item.id} className="tag">
                            {item.name}
                            <button className="remove-btn" onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveItem(item.id);
                            }}>
                            &times;
                            </button>
                        </span>
                        ))}
                    </div>
                    ) : (
                    <span className="placeholder">Select an item</span>
                )}
            </div>
            {isOpen && (
                <div className="dropdown-menu">
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            onClick={(e) => e.stopPropagation()}
                        />
                        {searchTerm && (
                            <button className="clear-btn" onClick={clearSearch}>
                                &times;
                            </button>
                        )}
                    </div>
                {filteredItems.length > 0 ? (
                    filteredItems.map((item) => (
                        <div
                            key={item.id}
                            className={`dropdown-item ${
                            highlightedFilteredItems.some(highlighted => highlighted.id === item.id) ? 'highlighted' : ''
                            }`}
                            onClick={() => handleSelectChange(item.id, item.label)}
                        >
                            {item.label}
                        </div>
                    ))
                ) : (
                    <div className="dropdown-item no-results">No results found</div>
                )}
                </div>
            )}
            </div>
      </div>
    );
}

export default FilteredSelect;
