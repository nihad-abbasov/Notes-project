export default (state, action) => {
  switch (action.type) {

    case 'GET_NOTES':
      return {
        ...state,
        loading:false,
        notes:action.payload
      }

      case 'GET_NOTE':
        return {
          ...state,
          loading:false,
          note:action.payload
        }


      case 'REMOVE_NOTE':
          return {
              ...state,
              notes: state.notes.filter(note => note.id !== action.payload),
              loading:false,
              note:{}
          };
      case 'ADD_NOTE':
          return {
              ...state,
              notes: [...state.notes, action.payload],
              loading:false
          };
      case 'EDIT_NOTE':
          const updatedNote = action.payload;

          const updatedNotes = state.notes.map(note => {
              if (note.id === updatedNote.id) {
                  return updatedNote;
              }
              return note;
          });

          return {
              ...state,
              notes: updatedNotes,
              loading:false,
              note:action.payload
          };
      default: return state;
  }
}