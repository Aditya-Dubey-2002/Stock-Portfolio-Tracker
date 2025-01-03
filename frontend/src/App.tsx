import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import Portfolio from './pages/Dashboard/Portfolio';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import DefaultLayout from './layout/DefaultLayout';
import ProtectedRoute from './ProtectedRoute';
import Stock from './pages/Stock';
import { HoldingsProvider } from './context/HoldingsContext';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const isAuthPage = pathname === '/auth/signin' || pathname === '/auth/signup';

  return loading ? (
    <Loader statusMessage={null} />
  ) : (
    <>
      {isAuthPage ? (
        <Routes>
          <Route
            path="/auth/signin"
            element={
              <>
                <PageTitle title="Signin | StockItUp" />
                <SignIn />
              </>
            }
          />
          <Route
            path="/auth/signup"
            element={
              <>
                <PageTitle title="Signup | StockItUp" />
                <SignUp />
              </>
            }
          />
        </Routes>
      ) : (
        <HoldingsProvider>
        <DefaultLayout>
          <Routes>
            <Route
              path = "/"
              element={
                <>
                  <ProtectedRoute>
                  <PageTitle title="StockItUp Dashboard | StockItUp - Stock Portfolio Tracker" />
                  <ECommerce />
                  </ProtectedRoute>
                </>
              }
            />
            <Route
              path = "/stock/:symbol"
              element={
                <>
                  <ProtectedRoute>
                  <PageTitle title="Stock Page" />
                  <Stock />
                  </ProtectedRoute>
                </>
              }
            />
            <Route
              path = "/update-portfolio"
              element={
                <>
                  <ProtectedRoute>
                  <PageTitle title="Update Portfolio" />
                  <Portfolio />
                  </ProtectedRoute>
                </>
              }
            />
            <Route
              path="/calendar"
              element={
                <>
                  <PageTitle title="Calendar | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                  <Calendar />
                </>
              }
            />
            <Route
              path="/profile"
              element={
                <>
                  <ProtectedRoute>
                  <PageTitle title="Profile" />
                  <Profile />
                  </ProtectedRoute>
                </>
              }
            />
            <Route
              path="/forms/form-elements"
              element={
                <>
                <ProtectedRoute>
                  <PageTitle title="Form Elements | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                  <FormElements />
                  </ProtectedRoute>
                </>
              }
            />
            <Route
              path="/forms/form-layout"
              element={
                <>
                  <ProtectedRoute>
                  <PageTitle title="Form Layout | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                  <FormLayout />
                  </ProtectedRoute>
                </>
              }
            />
            <Route
              path="/tables"
              element={
                <>
                <ProtectedRoute>
                  <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                  <Tables />
                  </ProtectedRoute>
                </>
              }
            />
            <Route
              path="/settings"
              element={
                <>
                <ProtectedRoute>
                  <PageTitle title="Settings" />
                  <Settings />
                  </ProtectedRoute>
                </>
              }
            />
            <Route
              path="/chart"
              element={
                <>
                <ProtectedRoute>
                  <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                  <Chart />
                  </ProtectedRoute>
                </>
              }
            />
            <Route
              path="/ui/alerts"
              element={
                <>
                <ProtectedRoute>
                  <PageTitle title="Alerts | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                  <Alerts />
                  </ProtectedRoute>
                </>
              }
            />
            <Route
              path="/ui/buttons"
              element={
                <>
                <ProtectedRoute>
                  <PageTitle title="Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                  <Buttons />
                  </ProtectedRoute>
                </>
                
              }
            />
          </Routes>
        </DefaultLayout>
        </HoldingsProvider>
      )}
    </>
  );
}

export default App;
