import React, { useState } from "react";

function TodoRow({ item, toggle, deleteCallback, editCallback }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(item.action);

  const handleToggle = () => {
    toggle(item);
  };

  const handleEditSave = () => {
    if (editText.trim() !== "" && editCallback) {
      editCallback(item, editText.trim());
    }
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (deleteCallback) {
      deleteCallback(item);
    }
  };

  return (
    <tr>
      <td>
        {isEditing ? (
          <input
            type="text"
            className="form-control"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
        ) : (
          item.action
        )}
      </td>
      <td>
        <input type="checkbox" checked={item.done} onChange={handleToggle} />
      </td>
      <td>
        {!item.done && (
          <>
            {isEditing ? (
              <button className="btn btn-success btn-sm" onClick={handleEditSave}>
                Save
              </button>
            ) : (
              <button className="btn btn-warning btn-sm" onClick={() => setIsEditing(true)}>
                Edit
              </button>
            )}
          </>
        )}
      </td>
      <td>
        {item.done && deleteCallback && (
          <button className="btn btn-danger btn-sm" onClick={handleDelete}>
            Delete
          </button>
        )}
      </td>
    </tr>
  );
}

export default TodoRow;
