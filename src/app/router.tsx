import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { AppLayout } from '@/shared/layouts/AppLayout'
import { PageTransition } from '@/shared/lib/animations.tsx'
import { ErrorBoundary } from '@/shared/ui'
import { NotFoundPage } from '@/features/shared/pages/NotFoundPage'

const SettingsPage           = lazy(() => import('@/features/settings/pages/SettingsPage').then(m => ({ default: m.SettingsPage })))
const RewardsPage            = lazy(() => import('@/features/rewards/pages/RewardsPage').then(m => ({ default: m.RewardsPage })))
const PortfolioAnalyticsPage = lazy(() => import('@/features/portfolio/pages/PortfolioAnalyticsPage').then(m => ({ default: m.PortfolioAnalyticsPage })))
const HomePage               = lazy(() => import('@/features/home/pages/HomePage').then(m => ({ default: m.HomePage })))
const EarnPage               = lazy(() => import('@/features/earn/pages/EarnPage').then(m => ({ default: m.EarnPage })))
const VaultDetailPage        = lazy(() => import('@/features/vault/pages/VaultDetailPage').then(m => ({ default: m.VaultDetailPage })))
const VaultDetail2Page       = lazy(() => import('@/features/vault/pages/VaultDetail2Page').then(m => ({ default: m.VaultDetail2Page })))
const PortfolioPage          = lazy(() => import('@/features/portfolio/pages/PortfolioPage').then(m => ({ default: m.PortfolioPage })))
const Portfolio2Page         = lazy(() => import('@/features/portfolio2/pages/Portfolio2Page').then(m => ({ default: m.Portfolio2Page })))
const Home2Page              = lazy(() => import('@/features/home2/pages/Home2Page').then(m => ({ default: m.Home2Page })))
const Earn2Page              = lazy(() => import('@/features/earn2/pages/Earn2Page').then(m => ({ default: m.Earn2Page })))
const Earn3Page              = lazy(() => import('@/features/earn3/pages/Earn3Page').then(m => ({ default: m.Earn3Page })))

function PageFallback() {
  return (
    <div className="flex h-64 items-center justify-center" aria-busy="true" aria-label="Loading page">
      <span className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
    </div>
  )
}

function wrap(Page: React.ComponentType, featureName: string) {
  return (
    <ErrorBoundary featureName={featureName}>
      <Suspense fallback={<PageFallback />}>
        <PageTransition>
          <Page />
        </PageTransition>
      </Suspense>
    </ErrorBoundary>
  )
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/portfolio2" element={wrap(Portfolio2Page, 'Portfolio 2')} />
        <Route path="/home2"      element={wrap(Home2Page,      'Home 2')} />
        <Route path="/earn2"      element={wrap(Earn2Page,      'Earn 2')} />
        <Route path="/earn3"      element={wrap(Earn3Page,      'Earn 3')} />
        <Route element={<AppLayout />}>
          <Route path="/"                    element={wrap(HomePage,               'Home')} />
          <Route path="/earn"                element={wrap(EarnPage,                'Earn')} />
          <Route path="/earn/compare"        element={wrap(NotFoundPage,            'Compare')} />
          <Route path="/earn/:vaultId"       element={wrap(VaultDetailPage,         'Vault Detail')} />
          <Route path="/vault2/:vaultId"     element={wrap(VaultDetail2Page,        'Vault Detail 2')} />
          <Route path="/portfolio"           element={wrap(PortfolioPage,           'Portfolio')} />
          <Route path="/portfolio/analytics" element={wrap(PortfolioAnalyticsPage,  'Analytics')} />
          <Route path="/rewards"             element={wrap(RewardsPage,             'Rewards')} />
          <Route path="/settings"            element={wrap(SettingsPage,            'Settings')} />
          <Route path="*"                    element={wrap(NotFoundPage,            '404')} />
        </Route>
      </Routes>
    </AnimatePresence>
  )
}

export function Router() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  )
}
