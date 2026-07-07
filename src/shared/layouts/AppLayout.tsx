import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { BottomNav } from './BottomNav'
import { Navbar } from './Navbar'
import { TooltipProvider } from '@/shared/ui'
import { NotificationDrawer } from '@/features/notifications/components/NotificationDrawer'
import { WalletConnectModal } from '@/features/wallet/components/WalletConnectModal'
import { WalletPanel } from '@/features/wallet/components/WalletPanel'
import { useNotifications } from '@/features/notifications/hooks/useNotifications'

export function AppLayout() {
  const [notifOpen, setNotifOpen] = useState(false)
  const { unreadCount } = useNotifications()
  const [walletModalOpen, setWalletModalOpen] = useState(false)
  const [walletPanelOpen, setWalletPanelOpen] = useState(false)
  const [walletAddress, setWalletAddress] = useState<string | null>(null)

  const handleConnected = (address: string) => {
    setWalletAddress(address)
    setWalletModalOpen(false)
  }
  const handleDisconnect = () => setWalletAddress(null)

  return (
    <TooltipProvider>
      <div className="flex min-h-screen bg-background">
        {/* Desktop sidebar */}
        <Sidebar />

        {/* Main area */}
        <div className="flex flex-1 flex-col min-h-screen overflow-x-hidden">
          {/* Mobile top navbar */}
          <div className="lg:hidden">
            <Navbar
              notificationCount={unreadCount}
              walletAddress={walletAddress ?? undefined}
              onOpenNotifications={() => setNotifOpen(true)}
              onConnectWallet={() => setWalletModalOpen(true)}
              onOpenWallet={() => setWalletPanelOpen(true)}
            />
          </div>

          <main
            id="main-content"
            className="flex-1 w-full min-w-0 px-6 py-6 pb-24 lg:pb-8"
          >
            <Outlet />
          </main>

          <BottomNav />
        </div>
      </div>

      <NotificationDrawer open={notifOpen} onClose={() => setNotifOpen(false)} />
      <WalletConnectModal
        open={walletModalOpen}
        onClose={() => setWalletModalOpen(false)}
        onConnected={handleConnected}
      />
      {walletAddress && (
        <WalletPanel
          open={walletPanelOpen}
          onClose={() => setWalletPanelOpen(false)}
          address={walletAddress}
          onDisconnect={handleDisconnect}
        />
      )}
    </TooltipProvider>
  )
}
