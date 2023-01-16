import { useState } from "react";
import api from "../../api/api";
import { FetchState, useGetAppreciations, useGetMostRecentAppreciation } from "../../hooks";
import { Server } from "../../utils/config";
import Alert from "../Alert/Alert";
import AppreciationItem from "./AppreciationItem";

const Appreciation = ({ user, dispatch }) => {
  const [stale, setStale] = useState({ stale: false });
  const [{ appreciations, isLoading, isError }] = useGetAppreciations(stale);
  const [{ lastAppreciation }] = useGetMostRecentAppreciation(stale);
  const [currentAppreciation, setCurrentAppreciation] = useState("");

  const isToday = (itemDate) => {
    const today = new Date()
    return itemDate.getDate() === today.getDate() &&
      itemDate.getMonth() === today.getMonth() &&
      itemDate.getFullYear() === today.getFullYear()
  }

  const handleAddAppreciation = async (e) => {
    e.preventDefault();
    console.log("Adding Appreciation");
    const data = {
      content: currentAppreciation,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    console.log(data, user);
    try {
      await api.createDocument(
        Server.collectionID,
        data
      )
      .then(document => document, error => console.log(error));
      setStale({ stale: true });
      setCurrentAppreciation("");
    } catch (e) {
      console.log("Error in adding appreciation");
    }
  };


  const handleLogout = async () => {
    dispatch({ type: FetchState.FETCH_INIT });
    try {
      await api.deleteCurrentSession()
        .then(success => success, error => console.log(error));
      dispatch({ type: FetchState.FETCH_SUCCESS, payload: null });
    } catch (e) {
      dispatch({ type: FetchState.FETCH_FAILURE });
    }
  }

  return (
    <>
      <section className="container h-screen max-h-screen px-3 max-w-xl mx-auto flex flex-col">
        {isError && <Alert color="red" message="Something went wrong..." />}
        <div className="my-auto p-16 rounded-lg text-center">
          <div className="font-bold text-3xl md:text-5xl lg:text-6xl">
            📝 <br /> &nbsp; Thankful for...
          </div>

          { (lastAppreciation && isToday(lastAppreciation.date)) && <div>✅ You've added to your thankful list today</div> }

          <form onSubmit={handleAddAppreciation}>
            <input
              type="text"
              className="w-full my-8 px-6 py-4 text-xl rounded-lg border-0 focus:ring-2 focus:ring-gray-800 transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:shadow-xl shadow-md"
              placeholder="🤔   What am I thankful for today?"
              value={currentAppreciation}
              onChange={(e) => setCurrentAppreciation(e.target.value)}
            ></input>
          </form>

          {isLoading && <h1> Loading .... </h1>}

          { (appreciations) && <ul> {appreciations.slice(0,4).map((item) => ( <AppreciationItem key={item["$id"]} item={item} setStale={setStale} />))} </ul> }
        </div>
      </section>

      <section className="absolute bottom-0 right-0 py-3 px-6 mr-8 mb-8">
        <button onClick={handleLogout} className="mx-auto mt-4 py-3 px-12 font-semibold text-md rounded-lg shadow-md bg-white text-gray-900 border border-gray-900 hover:border-transparent hover:text-white hover:bg-gray-900 focus:outline-none">
          Logout 👋
        </button>
      </section>
    </>
  );
};

export default Appreciation;
