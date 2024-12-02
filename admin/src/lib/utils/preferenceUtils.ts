const getSidebar = () => {
  return localStorage.getItem("sidebar");
};

const changeSidebar = () => {
  const state = getSidebar();
  const newState = state === "enabled" ? "disabled" : "enabled";

  localStorage.setItem("sidebar", newState);

  return newState;
};

export { changeSidebar, getSidebar };
