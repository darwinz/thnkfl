import api from "../api/api";
import { Server } from "../utils/config";
import { useEffect, useReducer } from "react";

export const FetchState = {
  FETCH_INIT: 0,
  FETCH_SUCCESS: 1,
  FETCH_FAILURE: 2,
};

export const useGetAppreciations = (stale) => {
  const reducer = (state, action) => {
    switch (action.type) {
      case FetchState.FETCH_INIT:
        return { ...state, isLoading: true, isError: false };
      case FetchState.FETCH_SUCCESS:
        return {
          ...state,
          isLoading: false,
          isError: false,
          appreciations: action.payload,
        };
      case FetchState.FETCH_FAILURE:
        return { ...state, isLoading: false, isError: true };
      default:
        throw new Error();
    }
  };

  const [state, dispatch] = useReducer(reducer, {
    isLoading: false,
    isError: false,
    appreciations: [],
  });

  useEffect(() => {
    let didCancel = false;
    const getAppreciations = async () => {
      dispatch({ type: FetchState.FETCH_INIT });
      try {
        const data = await api.listDocuments(Server.collectionID)
            .then(documents => documents, error => console.log(error));
        if (!didCancel) {
          dispatch({ type: FetchState.FETCH_SUCCESS, payload: data.documents });
        }
      } catch (e) {
        if (!didCancel) {
          dispatch({ type: FetchState.FETCH_FAILURE });
        }
      }
    };
    getAppreciations();
    return () => (didCancel = true);
  }, [stale]);

  return [state];
};


export const useGetMostRecentAppreciation = (stale) => {
  const reducer = (state, action) => {
    switch (action.type) {
      case FetchState.FETCH_INIT:
        return { ...state, isLoading: true, isError: false };
      case FetchState.FETCH_SUCCESS:
        return {
          ...state,
          isLoading: false,
          isError: false,
          appreciations: action.payload,
        };
      case FetchState.FETCH_FAILURE:
        return { ...state, isLoading: false, isError: true };
      default:
        throw new Error();
    }
  };

  const [state, dispatch] = useReducer(reducer, {
    isLoading: false,
    isError: false,
    appreciations: [],
  });

  useEffect(() => {
    let didCancel = false;
    const getMostRecentAppreciation = async () => {
      dispatch({ type: FetchState.FETCH_INIT });
      try {
        const data = await api.getMostRecentDocument(Server.collectionID)
          .then(document => document, error => console.log(error));
        if (!didCancel) {
          dispatch({ type: FetchState.FETCH_SUCCESS, payload: data.documents });
        }
      } catch (e) {
        if (!didCancel) {
          dispatch({ type: FetchState.FETCH_FAILURE });
        }
      }
    };
    getMostRecentAppreciation();
    return () => (didCancel = true);
  }, [stale]);

  return [state];
};

export const useGetUser = () => {
  const reducer = (state, action) => {
    switch (action.type) {
      case FetchState.FETCH_INIT:
        return { ...state, isLoading: true, isError: false };
      case FetchState.FETCH_SUCCESS:
        return {
          ...state,
          isLoading: false,
          isError: false,
          user: action.payload,
        };
      case FetchState.FETCH_FAILURE:
        return { ...state, isLoading: false, isError: true };
      default:
        throw new Error();
    }
  };

  const [state, dispatch] = useReducer(reducer, {
    isLoading: false,
    isError: true,
    data: [],
  });

  useEffect(() => {
    let didCancel = false;
    const getAppreciations = async () => {
      dispatch({ type: FetchState.FETCH_INIT });
      try {
        const account = await api.getAccount()
          .then(account => account, error => console.log(error));
        if (!didCancel) {
          dispatch({ type: FetchState.FETCH_SUCCESS, payload: account });
        }
      } catch (e) {
        if (!didCancel) {
          dispatch({ type: FetchState.FETCH_FAILURE });
        }
      }
    };
    getAppreciations();
    return () => (didCancel = true);
  }, []);

  return [state, dispatch];
};
