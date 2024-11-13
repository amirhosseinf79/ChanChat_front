const init_form_state = {};

function formReducer<T>(state: T, action: T) {
  return { ...state, ...action };
}

export { formReducer, init_form_state };
