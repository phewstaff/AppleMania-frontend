import React from "react";
import "./Categories.scss";

type CategoryDropdownProps = {
  id: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onUpdate: () => void;
  onDelete: () => void;
  setCurrentCategoryId: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
};

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({
  setCurrentCategoryId,
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
            <button
              className="category-dropdown-button"
              onClick={() => {
                onUpdate();
                setCurrentCategoryId(id);
              }}
            >
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
