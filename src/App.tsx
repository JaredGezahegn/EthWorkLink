import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@/components/theme-provider'
import { LanguageProvider } from '@/lib/language-context'

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
      <LanguageProvider>
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

          {/* Dashboard - Seeker */}
          <Route path="/dashboard/seeker" element={<SeekerDashboardLayout><DashboardSeekerPage /></SeekerDashboardLayout>} />
          <Route path="/dashboard/seeker/applications" element={<SeekerDashboardLayout><DashboardSeekerApplicationsPage /></SeekerDashboardLayout>} />
          <Route path="/dashboard/seeker/profile" element={<SeekerDashboardLayout><DashboardSeekerProfilePage /></SeekerDashboardLayout>} />
          <Route path="/dashboard/seeker/reviews" element={<SeekerDashboardLayout><DashboardSeekerReviewsPage /></SeekerDashboardLayout>} />

          {/* Dashboard - Company */}
          <Route path="/dashboard/company" element={<CompanyDashboardLayout><DashboardCompanyPage /></CompanyDashboardLayout>} />
          <Route path="/dashboard/company/jobs" element={<CompanyDashboardLayout><DashboardCompanyJobsPage /></CompanyDashboardLayout>} />
          <Route path="/dashboard/company/jobs/new" element={<CompanyDashboardLayout><DashboardCompanyJobsNewPage /></CompanyDashboardLayout>} />
          <Route path="/dashboard/company/profile" element={<CompanyDashboardLayout><DashboardCompanyProfilePage /></CompanyDashboardLayout>} />
          <Route path="/dashboard/company/requests" element={<CompanyDashboardLayout><DashboardCompanyRequestsPage /></CompanyDashboardLayout>} />
          <Route path="/dashboard/company/services" element={<CompanyDashboardLayout><DashboardCompanyServicesPage /></CompanyDashboardLayout>} />
          <Route path="/dashboard/company/services/new" element={<CompanyDashboardLayout><DashboardCompanyServicesNewPage /></CompanyDashboardLayout>} />

          {/* Dashboard - Admin */}
          <Route path="/dashboard/admin" element={<AdminDashboardLayout><DashboardAdminPage /></AdminDashboardLayout>} />
          <Route path="/dashboard/admin/companies" element={<AdminDashboardLayout><DashboardAdminCompaniesPage /></AdminDashboardLayout>} />
          <Route path="/dashboard/admin/jobs" element={<AdminDashboardLayout><DashboardAdminJobsPage /></AdminDashboardLayout>} />
          <Route path="/dashboard/admin/reports" element={<AdminDashboardLayout><DashboardAdminReportsPage /></AdminDashboardLayout>} />
          <Route path="/dashboard/admin/services" element={<AdminDashboardLayout><DashboardAdminServicesPage /></AdminDashboardLayout>} />
          <Route path="/dashboard/admin/settings" element={<AdminDashboardLayout><DashboardAdminSettingsPage /></AdminDashboardLayout>} />
          <Route path="/dashboard/admin/users" element={<AdminDashboardLayout><DashboardAdminUsersPage /></AdminDashboardLayout>} />
        </Routes>
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default App
