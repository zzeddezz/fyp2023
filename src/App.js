import { BrowserRouter } from "react-router-dom";

import UserRoute from "./routes/UserRoute";
import AdminRoute from "./routes/AdminRoute";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <div>
        <UserRoute />
        <AdminRoute />
        <div className="w-full">
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
