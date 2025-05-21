import React from 'react';
import { Link } from '@inertiajs/react';
import {
  Home,
  FileText,
  FolderOpen,
  CalendarDays,
  Briefcase,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  MessageCircle,
  UserCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ClientPortalLayoutProps {
  children: React.ReactNode;
}

export default function ClientPortalLayout({ children }: ClientPortalLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navigation = [;
    { name: 'Dashboard', href: route('client.dashboard'), icon: Home },
    { name: 'Projects', href: route('client.projects.dashboard'), icon: Briefcase },
    { name: 'Documents', href: route('client.documents'), icon: FileText },
    { name: 'Files', href: route('client.files'), icon: FolderOpen },
    { name: 'Calendar', href: route('client.calendar'), icon: CalendarDays },
    { name: 'Messages', href: route('client.messages'), icon: MessageCircle },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col p-0">
              <div className="px-6 py-6">
                <Link href="/" className="flex items-center gap-2 font-semibold">
                  <Briefcase className="h-6 w-6" />
                  <span className="text-lg font-bold">SND Client Portal</span>
                </Link>
              </div>
              <ScrollArea className="flex-1">
                <div className="flex flex-col gap-4 px-2">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-accent"
                      onClick={() => setIsMobileMenuOpen(false)}
                      <item.icon className="h-5 w-5" />
                      {item.name}
                    </Link>
                  ))}
                </div>
              </ScrollArea>
              <div className="border-t p-4">
                <Link
                  href={route('logout')}
                  method="post"
                  as="button"
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:text-foreground"
                  <LogOut className="h-5 w-5" />
                  Log out
                </Link>
              </div>
            </SheetContent>
          </Sheet>
          <Link href="/" className="hidden items-center gap-2 md:flex">
            <Briefcase className="h-6 w-6" />
            <span className="text-lg font-bold">SND Client Portal</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center gap-4 md:gap-2 lg:gap-4">
          <div className="ml-auto flex items-center gap-4">
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 flex h-2 w-2 rounded-full bg-primary" />
              <span className="sr-only">Notifications</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-user.jpg" alt="User" />
                    <AvatarFallback>CP</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Company Name</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      client@example.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={route('client.profile')}>
                    <UserCircle className="h-4 w-4 mr-2" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={route('client.settings')}>
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link
                    href={route('logout')}
                    method="post"
                    as="button"
                    className="w-full"
                    <LogOut className="h-4 w-4 mr-2" />
                    Log out
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <nav className="hidden w-64 shrink-0 flex-col border-r bg-background lg:flex">
          <ScrollArea className="flex-1 py-4">
            <div className="flex flex-col gap-1 px-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-accent"
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              ))}
            </div>
          </ScrollArea>
          <div className="flex items-center gap-3 border-t p-4">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder-user.jpg" alt="User" />
              <AvatarFallback>CP</AvatarFallback>
            </Avatar>
            <div className="flex flex-col text-sm">
              <span className="font-medium">Company Name</span>
              <span className="text-xs text-muted-foreground">client@example.com</span>
            </div>
          </div>
        </nav>

        {/* Content area */}
        <main className="flex-1 bg-muted/10 pb-12">
          {children}
        </main>
      </div>
    </div>
  );
}



