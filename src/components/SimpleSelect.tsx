import React from 'react';
import { Item, getData } from '../api';
import '../style/dropdown.css';

interface HighlightedItem {
    id: number;
    name: string;
}

interface SimpleSelectProps {
    highlightedItems: HighlightedItem[];
    setHighlightedItems: React.Dispatch<React.SetStateAction<HighlightedItem[]>>;
}

const SimpleSelect: React.FC<SimpleSelectProps> = ({
    highlightedItems,
    setHighlightedItems,
}) => {
    const [items, setItems] = React.useState<Item[]>([]);
    const [selectedItem, setSelectedItem] = React.useState<HighlightedItem | null>(null);
    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    const dropdownRef = React.useRef<HTMLDivElement>(null);


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
        setSelectedItem(selectedItem);

        if (!highlightedItems.some(item => item.id === id)) {
        setHighlightedItems([...highlightedItems, selectedItem]);
        }
        setIsOpen(false); 
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="custom-dropdown" ref={dropdownRef}>
            <label htmlFor="itemsDropdown" className='label-text'>Label:</label>
            <div className="dropdown-wrapper" onClick={toggleDropdown}>
                <div className="selected-item">
                    {selectedItem ? (
                        <span>{selectedItem.name}</span>
                        ) : (
                        <span>Select an item</span>
                    )}
                </div>
                {isOpen && (
                    <div className="dropdown-menu">
                        {items.map((item) => (
                            <div
                                key={item.id}
                                className={`dropdown-item ${
                                    highlightedItems.some(highlighted => highlighted.id === item.id) ? 'highlighted' : ''
                                } ${item.id === selectedItem?.id ? 'selected' : ''}`}
                                onClick={() => handleSelectChange(item.id, item.label)}
                            >
                            {item.label}
                            </div>
                        ))}
                    </div>
                )}
            </div>
      </div>
    );
}

export default SimpleSelect;
