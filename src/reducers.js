const initialState = {
  entries: [],
  isEntryModalOpen: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {

    case 'HYDRATE':
      return {
        ...state,
        ...action.payload,
      };

    case 'ADD_ENTRY':
      return {
        ...state,
        entries: [
          ...state.entries,
          action.payload,
        ]
      };

    case 'CLEAR_ENTRIES':
      return {
        ...state,
        entries: [],
      };

    case 'SHOW_MODAL':
      return {
        ...state,
        isEntryModalOpen: true,
      };

    case 'HIDE_MODAL':
      return {
        ...state,
        isEntryModalOpen: false,
      };

    default:
      return state;
  }
};
