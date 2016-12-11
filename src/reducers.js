const initialState = {
  entries: [
    // {
    //   timestamp: new Date().getTime(),
    //   note: 'some note',
    //   amount: 342,
    // },
    // {
    //   timestamp: new Date().getTime(),
    //   note: 'some note',
    //   amount: 12,
    // },
    // {
    //   timestamp: new Date().getTime(),
    //   note: 'some note',
    //   amount: 4,
    // },
    // {
    //   timestamp: new Date().getTime(),
    //   note: 'some note',
    //   amount: 1209,
    // },
  ],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {

    case 'HYDRATE':
      return action.payload;

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

    default:
      return state;
  }
};
