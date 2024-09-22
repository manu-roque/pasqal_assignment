import React from 'react';
import { Item, getData } from '../api';
import '../style/dropdown.css';

interface HighlightedTagItem {
	id: number;
	name: string;
}

interface TagSelectProps {
	highlightedTagItems: HighlightedTagItem[];
	setHighlightedTagItems: React.Dispatch<React.SetStateAction<HighlightedTagItem[]>>;
}

const TagSelect: React.FC<TagSelectProps> = ({
	highlightedTagItems,
	setHighlightedTagItems,
}) => {
	const [items, setItems] = React.useState<Item[]>([]);
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

    if (!highlightedTagItems.some(item => item.id === id)) {
      setHighlightedTagItems([...highlightedTagItems, selectedItem]);
    }
    setIsOpen(false); 
  };

  const handleRemoveItem = (id: number) => {
    const updatedItems = highlightedTagItems.filter(item => item.id !== id);
    setHighlightedTagItems(updatedItems);
  };

  const toggleDropdown = () => {
      setIsOpen(!isOpen);
  };

  return (
    <div className="custom-dropdown" ref={dropdownRef}>
    	<label htmlFor="itemsDropdown" className="label-text">Label:</label>
      	<div className="dropdown-wrapper" onClick={toggleDropdown}>
			<div className="selected-item">
				{highlightedTagItems.length > 0 ? (
					<div className="tags-container">
						{highlightedTagItems.map(item => (
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
					{items.map((item) => (
						<div
							key={item.id}
							className={`dropdown-item ${
							highlightedTagItems.some(highlighted => highlighted.id === item.id) ? 'highlighted' : ''
							}`}
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

export default TagSelect;
