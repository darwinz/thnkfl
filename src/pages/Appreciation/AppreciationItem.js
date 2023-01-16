import api from "../../api/api";
import { Server } from "../../utils/config";
import { deleteButton } from "../icons";

const AppreciationItem = ({ item, setStale }) => {
  const handleDelete = async (e, item) => {
    console.log("Deleting Appreciation");
    try {
      await api.deleteDocument(Server.collectionID, item["$id"])
        .then(success => success, error => console.log(error));
      setStale({ stale: true });
    } catch (e) {
      console.log("Error in deleting appreciation");
    }
  };

  return (
    <li className="flex justify-between items-center mt-4 px-4">
      <div className="flex">
        <div
          className={`capitalize ml-3 text-md font-medium ${
            item["isComplete"] ? "line-through" : ""
          }`}
        >
          {item["content"]}
        </div>
      </div>
      <button
        onClick={(e) => handleDelete(e, item)}
        className="focus:outline-none transition duration-75 ease-in-out transform hover:scale-125"
      >
        {deleteButton}
      </button>
    </li>
  );
};

export default AppreciationItem;
