import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@/components/theme-provider'
import { AppProvider } from '@/contexts/app-context'
import { ProtectedRoute } from '@/components/protected-route'

// Layouts
import SeekerDashboardLayout from '@/pages/dashboard/seeker/layout'
import CompanyDashboardLayout from '@/pages/dashboard/company/layout'
import AdminDashboardLayout from '@/pages/dashboard/admin/layout'

// Pages
import HomePage from '@/pages/home'
import LoginPage from '@/pages/login/page'
import RegisterTypePage from '@/pages/register/page'
import RegisterSeekerPage from '@/pages/register/seeker/page'
import RegisterProviderPage from '@/pages/register/provider/page'
import RegisterProviderSubscriptionPage from '@/pages/register/provider/subscription/page'
import JobsPage from '@/pages/jobs/page'
import ServicesPage from '@/pages/services/page'
import CompanyDetailPage from '@/pages/company/[id]/page'

// Dashboard - Seeker
import DashboardSeekerPage from '@/pages/dashboard/seeker/page'
import DashboardSeekerApplicationsPage from '@/pages/dashboard/seeker/applications/page'
import DashboardSeekerProfilePage from '@/pages/dashboard/seeker/profile/page'
import DashboardSeekerReviewsPage from '@/pages/dashboard/seeker/reviews/page'

// Dashboard - Company
import DashboardCompanyPage from '@/pages/dashboard/company/page'
import DashboardCompanyJobsPage from '@/pages/dashboard/company/jobs/page'
import DashboardCompanyJobsNewPage from '@/pages/dashboard/company/jobs/new/page'
import DashboardCompanyProfilePage from '@/pages/dashboard/company/profile/page'
import DashboardCompanyRequestsPage from '@/pages/dashboard/company/requests/page'
import DashboardCompanyServicesPage from '@/pages/dashboard/company/services/page'
import DashboardCompanyServicesNewPage from '@/pages/dashboard/company/services/new/page'

// Dashboard - Admin
import DashboardAdminPage from '@/pages/dashboard/admin/page'
import DashboardAdminCompaniesPage from '@/pages/dashboard/admin/companies/page'
import DashboardAdminJobsPage from '@/pages/dashboard/admin/jobs/page'
import DashboardAdminReportsPage from '@/pages/dashboard/admin/reports/page'
import DashboardAdminServicesPage from '@/pages/dashboard/admin/services/page'
import DashboardAdminSettingsPage from '@/pages/dashboard/admin/settings/page'
import DashboardAdminUsersPage from '@/pages/dashboard/admin/users/page'

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <AppProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterTypePage />} />
          <Route path="/register/seeker" element={<RegisterSeekerPage />} />
          <Route path="/register/provider" element={<RegisterProviderPage />} />
          <Route path="/register/provider/subscription" element={<RegisterProviderSubscriptionPage />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/company/:id" element={<CompanyDetailPage />} />

          {/* Dashboard - Seeker (Protected) */}
          <Route path="/dashboard/seeker" element={<ProtectedRoute allowedRoles={['seeker']}><SeekerDashboardLayout><DashboardSeekerPage /></SeekerDashboardLayout></ProtectedRoute>} />
          <Route path="/dashboard/seeker/applications" element={<ProtectedRoute allowedRoles={['seeker']}><SeekerDashboardLayout><DashboardSeekerApplicationsPage /></SeekerDashboardLayout></ProtectedRoute>} />
          <Route path="/dashboard/seeker/profile" element={<ProtectedRoute allowedRoles={['seeker']}><SeekerDashboardLayout><DashboardSeekerProfilePage /></SeekerDashboardLayout></ProtectedRoute>} />
          <Route path="/dashboard/seeker/reviews" element={<ProtectedRoute allowedRoles={['seeker']}><SeekerDashboardLayout><DashboardSeekerReviewsPage /></SeekerDashboardLayout></ProtectedRoute>} />

          {/* Dashboard - Company (Protected) */}
          <Route path="/dashboard/company" element={<ProtectedRoute allowedRoles={['company']}><CompanyDashboardLayout><DashboardCompanyPage /></CompanyDashboardLayout></ProtectedRoute>} />
          <Route path="/dashboard/company/jobs" element={<ProtectedRoute allowedRoles={['company']}><CompanyDashboardLayout><DashboardCompanyJobsPage /></CompanyDashboardLayout></ProtectedRoute>} />
          <Route path="/dashboard/company/jobs/new" element={<ProtectedRoute allowedRoles={['company']}><CompanyDashboardLayout><DashboardCompanyJobsNewPage /></CompanyDashboardLayout></ProtectedRoute>} />
          <Route path="/dashboard/company/profile" element={<ProtectedRoute allowedRoles={['company']}><CompanyDashboardLayout><DashboardCompanyProfilePage /></CompanyDashboardLayout></ProtectedRoute>} />
          <Route path="/dashboard/company/requests" element={<ProtectedRoute allowedRoles={['company']}><CompanyDashboardLayout><DashboardCompanyRequestsPage /></CompanyDashboardLayout></ProtectedRoute>} />
          <Route path="/dashboard/company/services" element={<ProtectedRoute allowedRoles={['company']}><CompanyDashboardLayout><DashboardCompanyServicesPage /></CompanyDashboardLayout></ProtectedRoute>} />
          <Route path="/dashboard/company/services/new" element={<ProtectedRoute allowedRoles={['company']}><CompanyDashboardLayout><DashboardCompanyServicesNewPage /></CompanyDashboardLayout></ProtectedRoute>} />

          {/* Dashboard - Admin (Protected) */}
          <Route path="/dashboard/admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboardLayout><DashboardAdminPage /></AdminDashboardLayout></ProtectedRoute>} />
          <Route path="/dashboard/admin/companies" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboardLayout><DashboardAdminCompaniesPage /></AdminDashboardLayout></ProtectedRoute>} />
          <Route path="/dashboard/admin/jobs" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboardLayout><DashboardAdminJobsPage /></AdminDashboardLayout></ProtectedRoute>} />
          <Route path="/dashboard/admin/reports" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboardLayout><DashboardAdminReportsPage /></AdminDashboardLayout></ProtectedRoute>} />
          <Route path="/dashboard/admin/services" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboardLayout><DashboardAdminServicesPage /></AdminDashboardLayout></ProtectedRoute>} />
          <Route path="/dashboard/admin/settings" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboardLayout><DashboardAdminSettingsPage /></AdminDashboardLayout></ProtectedRoute>} />
          <Route path="/dashboard/admin/users" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboardLayout><DashboardAdminUsersPage /></AdminDashboardLayout></ProtectedRoute>} />
        </Routes>
      </AppProvider>
    </ThemeProvider>
  )
}

export default App
