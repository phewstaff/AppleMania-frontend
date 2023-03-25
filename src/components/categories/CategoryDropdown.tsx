import React from "react";
import "./Categories.scss";

type CategoryDropdownProps = {
  id: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onUpdate: () => void;
  onDelete: () => void;
};

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({
  onUpdate,
  onDelete,
  id,
  isOpen,
  setIsOpen,
}) => {
  return (
    <>
      {isOpen && (
        <>
          <div
            key={id}
            onClick={() => setIsOpen(false)}
            className="dropdown-overlay"
          ></div>
          <div className="category-dropdown">
            <button className="category-dropdown-button" onClick={onUpdate}>
              Update
            </button>
            <button className="category-dropdown-button" onClick={onDelete}>
              Delete
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default CategoryDropdown;
