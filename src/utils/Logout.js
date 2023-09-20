const Logout = () => {
  const isAuthorized = localStorage.getItem("token");

  if (isAuthorized) {
    return localStorage.removeItem("token");
  }
};

export default Logout;
