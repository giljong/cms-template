import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import Layout from '../components/Layout';
import { Admin } from '../pages/Admin';
import { Inquiry, Faq, Notice } from '../pages/Customer';
import { Dashboard } from '../pages/Dashboard';
import { Login } from '../pages/Login';
import { Policy } from '../pages/Policy';
import { Users } from '../pages/Users';
import { PasswordChange } from '../pages/PasswordChange/PasswordChange';
import { Popup } from '../pages/Popup/Popup';
import { Banner } from '../pages/Banner/Banner';
import { PolicyCategory } from '../pages/PolicyCategory/PolicyCategory';

function Root() {
  const accessToken = localStorage.getItem('accessToken') ?? '';

  return (
    <BrowserRouter>
      <Routes>
        {accessToken?.length && (
          <Route path="/" element={<Layout />}>
            <Route path="*" element={<Navigate to="/" />} />
            <Route index element={<Dashboard />} />
            <Route path="admin" element={<Admin />} />
            <Route path="users" element={<Users />} />
            <Route path="/post">
              <Route path="popup" element={<Popup />} />
              <Route path="banner" element={<Banner />} />
            </Route>

            <Route path="/customer">
              <Route path="inquiry" element={<Inquiry />} />

              <Route path="faq" element={<Faq />} />

              <Route path="notice" element={<Notice />} />
            </Route>
            <Route path="/policy">
              <Route index element={<Policy />} />
              <Route path="category" element={<PolicyCategory />} />
            </Route>
            <Route path="password" element={<PasswordChange />} />
          </Route>
        )}
        {!accessToken?.length && (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default Root;
