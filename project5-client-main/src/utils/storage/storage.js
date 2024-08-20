export const setLocalStorage = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorage = (key) => {
  return JSON.parse(window.localStorage.getItem(key));
};

export const removeLocalStorage = (key) => { 
  window.localStorage.removeItem(key);
}

export const setSessionStorage = (key, value) => {
  window.sessionStorage.setItem(key, JSON.stringify(value));
};

export const getSessionStorage = (key) => {
  return JSON.parse(window.sessionStorage.getItem(key));
};

export const removeSessionStorage = (key) => { 
  window.sessionStorage.removeItem(key);
}