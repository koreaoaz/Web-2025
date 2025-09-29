'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Github, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileMenus, setOpenMobileMenus] = useState<{
    [key: string]: boolean;
  }>({});
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const hoverTimer = useRef<NodeJS.Timeout | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSupervisor, setIsSupervisor] = useState(false);

  const handleGithubLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: 'https://www.oazkorea.co.kr/login_callback',
      },
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setIsLoggedIn(!!user);

      if (user) {
        // supervisor_id 테이블 확인
        const { data, error } = await supabase
          .from('supervisor_id')
          .select('uuid')
          .eq('uuid', user.id)
          .maybeSingle();

        setIsSupervisor(!!data);
      } else {
        setIsSupervisor(false);
      }
    };

    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setIsLoggedIn(!!session?.user);

        if (session?.user) {
          supabase
            .from('supervisor_id')
            .select('uuid')
            .eq('uuid', session.user.id)
            .maybeSingle()
            .then(({ data }) => setIsSupervisor(!!data));
        } else {
          setIsSupervisor(false);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = (menuName: string) => {
    setOpenMobileMenus((prev) => {
      if (prev[menuName]) {
        return {};
      }
      return { [menuName]: true };
    });
  };

  const handleMouseLeave = () => {
    hoverTimer.current = setTimeout(() => {
      setHoveredMenu(null);
    }, 300); // 0.3초 뒤에 닫힘 (원하는 시간대로 조절)
  };

  const handleMouseEnter = (name: string) => {
    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current);
    }
    setHoveredMenu(name);
  };

  const navItems = [
    {
      name: 'About',
      href: '/about/who-we-are',
      subItems: [
        { name: 'Who We Are', href: '/about/who-we-are' },
        { name: 'Notice', href: '/about/notice' },
        { name: 'Executive Team', href: '/about/executive-team' },
      ],
    },
    {
      name: 'Studies',
      href: '/studies/records',
      subItems: [
        { name: 'Overview', href: '/studies/overview' },
        { name: 'Study Records***', href: '/studies/records' },
        { name: 'Schedule', href: '/studies/schedule' },
      ],
    },
    {
      name: 'Projects',
      href: '/projects/archives',
      subItems: [
        { name: 'Overview', href: '/projects/overview' },
        { name: 'Project Archives', href: '/projects/archives' },
      ],
    },
    {
      name: 'Events',
      href: '/events/archive',
      subItems: [{ name: 'Event Archive', href: '/events/archive' }],
    },
    {
      name: 'Blog',
      href: '/blog/members-tech-blog',
      subItems: [
        { name: "Members' Tech Blog", href: '/blog/members-tech-blog' },
        { name: 'OAZ Band', href: '/blog/band' },
      ],
    },
    {
      name: 'Recruit',
      href: '/recruit/recruitment',
      subItems: [{ name: 'Recruitment', href: '/recruit/recruitment' }],
    },
    {
      name: 'Alumni',
      href: '/alumni/welcome',
      subItems: [
        { name: 'Welcome Message', href: '/alumni/welcome' },
        { name: 'Alumni News', href: '/alumni/news' },
        { name: 'Condolences', href: '/alumni/events' },
        { name: 'Former Executives', href: '/alumni/former-execs' },
      ],
    },
  ];

  return (
    <motion.header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-xl border-b border-gray-200/50'
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-black rounded-md flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-sm" />
              </div>
              <span className="text-xl font-bold tracking-tight text-gray-900">
                OaZ
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <div
                key={item.name}
                className="relative group"
                onMouseEnter={() => handleMouseEnter(item.name)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  href={item.href}
                  className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200 relative"
                >
                  <motion.div
                    whileHover={{ y: -1 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    {item.name}
                  </motion.div>
                </Link>
                {/* 조건부 렌더링*/}
                {item.subItems && hoveredMenu === item.name && (
                  <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                    {item.subItems.map((subItem) =>
                      subItem.name === 'Overview' ? null : (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                        >
                          {subItem.name}
                        </Link>
                      )
                    )}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/signin">
              <Button
                variant="ghost"
                className="flex items-center hover:bg-gray-100 text-black px-3 py-2 rounded-md"
              >
                <Github className="w-5 h-5" />
                <span>Sign in</span>
              </Button>
            </Link>

            {isLoggedIn ? (
              <Button
                onClick={handleLogout}
                variant="ghost"
                className="bg-black hover:bg-gray-800 text-white"
              >
                Log out
              </Button>
            ) : (
              <Button
                onClick={handleGithubLogin}
                variant="ghost"
                className="bg-black hover:bg-gray-800 text-white"
              >
                Log in
              </Button>
            )}

            {isSupervisor && (
              <Link href="/editor">
                <Button
                  variant="ghost"
                  className="bg-black hover:bg-gray-800 text-white"
                >
                  Editor
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-200"
          >
            <div className="px-4 py-6 space-y-3">
              {navItems.map((item) => (
                <div key={item.name}>
                  <button
                    onClick={() => toggleMobileMenu(item.name)}
                    className="flex justify-between w-full text-gray-600 hover:text-gray-900 font-medium"
                  >
                    {item.name}
                  </button>
                  {item.subItems && (
                    <AnimatePresence>
                      {openMobileMenus[item.name] && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden ml-4 mt-1 space-y-2"
                        >
                          {item.subItems.map((subItem) =>
                            subItem.name === 'Overview' ? null : (
                              <Link
                                key={subItem.name}
                                href={subItem.href}
                                className="block text-gray-500 hover:text-gray-800 text-sm"
                              >
                                {subItem.name}
                              </Link>
                            )
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
              <div className="pt-4 border-t border-gray-200">
                <Button className="w-full bg-black hover:bg-gray-800 text-white">
                  Get Started
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
