import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Overview from "./pages/Overview";
import Reports from "./pages/Reports";
import Alerts from "./pages/Alerts";
import Simulator from "./pages/Simulator";
import Education from "./pages/Education";
import Upgrade from "./pages/Upgrade";
import Rewards from "./pages/Rewards";
import WhereYouStand from "./pages/WhereYouStand";
import History from "./pages/History";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/summary" element={<Overview />} />
        <Route path="/history" element={<History />} />
        <Route path="/where-you-stand" element={<WhereYouStand />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/simulator" element={<Simulator />} />
        <Route path="/education" element={<Education />} />
        <Route path="/upgrade" element={<Upgrade />} />
        <Route path="/rewards" element={<Rewards />} />
      </Routes>
    </Layout>
  );
}

export default App;
