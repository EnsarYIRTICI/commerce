import { getCookie, setCookie } from "cookies-next";

const getSidebarState = () => {
  return getCookie("sidebar-state");
};

const setSidebarState = () => {
  const state = getSidebarState();
  const newState = state === "enabled" ? "disabled" : "enabled";

  setCookie("sidebar-state", newState);

  return newState;
};

export { setSidebarState, getSidebarState };
