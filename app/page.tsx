"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Globe, ChevronDown, Menu, X } from "lucide-react";

export default function DonationPage() {
  const [donationId, setDonationId] = useState("");
  const [currentLang, setCurrentLang] = useState("fr");
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const router = useRouter();

  const handleTrackDonation = () => {
    if (donationId.trim()) {
      router.push(`/code/${donationId.trim()}`);
    }
  };

  const languages = {
    fr: { name: "FR", flag: "🇫🇷" },
    ar: { name: "AR", flag: "🇩🇿" },
    en: { name: "EN", flag: "🇬🇧" },
  };

  const translations = {
    fr: {
      nav: { track: "Suivi", steps: "Étapes", donate: "Faire un don" },
      hero: {
        title: "Suivez chaque étape de votre sacrifice,",
        subtitle: "du paiement jusqu'à la distribution.",
        card1: "Faire le Don",
        card2: "L'Odhiya",
        card3: "Retour Video",
      },
      donation: {
        subtitle: "Faire un Don",
        title: "Un simple geste, une grande récompense.",
        description:
          "Votre don sera suivi pas à pas, du paiement jusqu'à la distribution. Une photo de votre sacrifice vous sera envoyée.",
        button: "Faire le Don",
      },
      tracking: {
        subtitle: "Suivi",
        title: "Suivez votre Code de tracking de donation ici",
        placeholder: "Votre Code de tracking",
        button: "Consulter le statut",
      },
      footer: {
        links: [
          "Politique de confidentialité",
          "Politique de confidentialité",
          "Contacte",
          "Faire un don",
          "Politique de confidentialité",
        ],
        copyright: "© 2025 Sabeel. Tous droits réservés.",
      },
    },
    ar: {
      nav: { track: "تتبع", steps: "الخطوات", donate: "تبرع" },
      hero: {
        title: "تتبع كل خطوة من تضحيتك،",
        subtitle: "من الدفع إلى التوزيع.",
        card1: "قم بالتبرع",
        card2: "الأضحية",
        card3: "فيديو العودة",
      },
      donation: {
        subtitle: "قم بالتبرع",
        title: "إيماءة بسيطة، مكافأة كبيرة.",
        description:
          "سيتم تتبع تبرعكم خطوة بخطوة، من الدفع إلى التوزيع. ستتلقون صورة لتضحيتكم.",
        button: "قم بالتبرع",
      },
      tracking: {
        subtitle: "تتبع",
        title: "تتبع كود التتبع الخاص بك هنا",
        placeholder: "كود التتبع الخاص بك",
        button: "تحقق من الحالة",
      },
      footer: {
        links: [
          "سياسة الخصوصية",
          "سياسة الخصوصية",
          "اتصل",
          "تبرع",
          "سياسة الخصوصية",
        ],
        copyright: "© 2025 Sabeel. جميع الحقوق محفوظة.",
      },
    },
    en: {
      nav: { track: "Track", steps: "Steps", donate: "Donate" },
      hero: {
        title: "Follow every step of your sacrifice,",
        subtitle: "from payment to distribution.",
        card1: "Make Donation",
        card2: "The Odhiya",
        card3: "Video Return",
      },
      donation: {
        subtitle: "Make a Donation",
        title: "A simple gesture, a great reward.",
        description:
          "Your donation will be tracked step by step, from payment to distribution. A photo of your sacrifice will be sent to you.",
        button: "Make Donation",
      },
      tracking: {
        subtitle: "Track",
        title: "Track your donation tracking code here",
        placeholder: "Your tracking code here",
        button: "Check Status",
      },
      footer: {
        links: [
          "Privacy Policy",
          "Privacy Policy",
          "Contact",
          "Donate",
          "Privacy Policy",
        ],
        copyright: "© 2025 Sabeel. All rights reserved.",
      },
    },
  };

  const t = translations[currentLang as "fr" | "ar" | "en"];
  const isRTL = currentLang === "ar";

  const details = [
    t.hero.card1 + " details...",
    t.hero.card2 + " details...",
    t.hero.card3 + " details...",
  ];

  return (
    <div className="min-h-screen bg-white pt-6">
      {/* Header Navigation */}
      <header className="border-b border-gray-200 px-2 sm:px-4">
        <nav
          className="fixed top-0 left-0 right-0 z-50 w-full max-w-full md:max-w-[1570px] mx-auto px-2 sm:px-4 flex items-center justify-between mt-2"
          style={{
            height: "50px",
            borderRadius: "20px",
            background: "white",
            boxShadow: "0 4px 24px 0 #00000020, 0 0 8px 0 #00000010",
          }}
        >
          <div className="text-lg sm:text-3xl font-bold text-green-500 whitespace-nowrap">
            Sabeel
          </div>
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-4 sm:space-x-8 text-gray-600">
            <a
              href="#"
              className="hover:text-green-500 transition-colors text-sm sm:text-base whitespace-nowrap"
            >
              {t.nav.track}
            </a>
            <a
              href="#"
              className="hover:text-green-500 transition-colors text-sm sm:text-base whitespace-nowrap"
            >
              {t.nav.steps}
            </a>
            <a
              href="#"
              className="hover:text-green-500 transition-colors text-sm sm:text-base whitespace-nowrap"
            >
              {t.nav.donate}
            </a>
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setShowLangDropdown(!showLangDropdown)}
                className="flex items-center space-x-2 px-2 sm:px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Globe className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">
                  {languages[currentLang as "fr" | "ar" | "en"].flag}{" "}
                  {languages[currentLang as "fr" | "ar" | "en"].name}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-600" />
              </button>
              {showLangDropdown && (
                <div className="absolute top-full right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-[100]">
                  {Object.entries(languages).map(([code, lang]) => (
                    <button
                      key={code}
                      onClick={() => {
                        setCurrentLang(code);
                        setShowLangDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center space-x-2"
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-7 h-7 text-gray-600" />
          </button>
        </nav>
        {/* Mobile Sidebar */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-[100] flex">
            <div
              className="fixed inset-0 bg-black/40"
              onClick={() => setSidebarOpen(false)}
            />
            <div className="relative ml-auto w-64 max-w-full h-full bg-white shadow-2xl flex flex-col p-6">
              <button
                className="absolute top-4 right-4 p-2"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
              <div className="mt-10 flex flex-col space-y-6">
                <a
                  href="#"
                  className="hover:text-green-500 transition-colors text-base font-medium"
                  onClick={() => setSidebarOpen(false)}
                >
                  {t.nav.track}
                </a>
                <a
                  href="#"
                  className="hover:text-green-500 transition-colors text-base font-medium"
                  onClick={() => setSidebarOpen(false)}
                >
                  {t.nav.steps}
                </a>
                <a
                  href="#"
                  className="hover:text-green-500 transition-colors text-base font-medium"
                  onClick={() => setSidebarOpen(false)}
                >
                  {t.nav.donate}
                </a>
                {/* Language Selector in Sidebar */}
                <div className="relative">
                  <button
                    onClick={() => setShowLangDropdown(!showLangDropdown)}
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors w-full"
                  >
                    <Globe className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">
                      {languages[currentLang as "fr" | "ar" | "en"].flag}{" "}
                      {languages[currentLang as "fr" | "ar" | "en"].name}
                    </span>
                    <ChevronDown className="w-4 h-4 text-gray-600" />
                  </button>
                  {showLangDropdown && (
                    <div className="absolute top-full left-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-[100]">
                      {Object.entries(languages).map(([code, lang]) => (
                        <button
                          key={code}
                          onClick={() => {
                            setCurrentLang(code);
                            setShowLangDropdown(false);
                            setSidebarOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center space-x-2"
                        >
                          <span>{lang.flag}</span>
                          <span>{lang.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="min-h-[100vh] px-4 py-12 pb-32 md:px-6 md:py-20 flex flex-col justify-center bg-gradient-to-b from-white to-green-300">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-10 leading-tight">
            {t.hero.title}
            <br />
            <span className="text-[#2ECC71]">{t.hero.subtitle}</span>
          </h1>
          <div className="relative flex justify-center">
            <div className="absolute inset-0 top-8 h-40 w-full mx-auto bg-[#2ECC71] opacity-20 blur-2xl rounded-3xl z-0 " />
          </div>
          {/* Cards visually as second block in hero */}
          <div className="w-full max-w-full md:max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 px-2 mt-8 md:mt-11 items-stretch">
            {[t.hero.card1, t.hero.card2, t.hero.card3].map((title, index) => (
              <Card
                key={index}
                className={`transition-all duration-300 ${
                  expandedCard === index
                    ? "ring-2 ring-[#2ECC71] scale-105"
                    : ""
                }`}
              >
                <CardContent className="flex flex-col items-center justify-center p-8 h-full min-h-[220px]">
                  {/* Icon and title */}
                  <div className="flex items-center justify-center mb-4">
                    <img
                      src={`/${index + 2}.png`}
                      alt={title}
                      className="w-16 h-16 object-contain"
                    />
                  </div>
                  <div
                    className="w-full cursor-pointer"
                    onClick={() =>
                      setExpandedCard(expandedCard === index ? null : index)
                    }
                  >
                    <h3 className="text-[#2ECC71] text-xl font-semibold text-center">
                      {title}
                    </h3>
                    {/* Details only for expanded card */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        expandedCard === index
                          ? "max-h-40 mt-4 opacity-100"
                          : "max-h-0 opacity-0"
                      } w-full`}
                    >
                      <div className="text-gray-700 text-sm sm:text-base">
                        {details[index]}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Section */}
      <section className="min-h-[80vh] px-4 py-12 md:px-6 md:py-20 flex flex-col justify-center mt-8">
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-8">
            <p className="text-gray-600 text-lg mb-4">{t.donation.subtitle}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10">
              {t.donation.title}
            </h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Sheep Image with Animated Glow */}
            <div className="relative flex justify-center items-center">
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-green-600 opacity-40 blur-2xl rounded-full z-0 animate-pulse" />
              <div className="relative z-10">
                <img
                  src="/1.png"
                  alt="Sheep for sacrifice"
                  className="w-full max-w-[3000px] mx-auto"
                />
              </div>
            </div>
            {/* Donation Info */}
            <div className="space-y-6 flex flex-col items-center">
              <h3 className="text-2xl font-bold text-gray-900 text-center">
                Votre don
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                {t.donation.description}
              </p>
              <Button
                size="lg"
                className="bg-[#2ECC71] hover:bg-[#27ae60] text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg transition-all duration-300"
              >
                {t.donation.button}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Tracking Section */}
      <section className="min-h-[80vh] px-4 py-12 md:px-6 md:py-20 flex flex-col justify-center mt-11">
        <div className="max-w-2xl mx-auto text-center relative px-4 sm:px-6">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[200px] sm:w-[500px] sm:h-[300px] md:w-[700px] md:h-[400px] bg-[#2ECC71] opacity-50 blur-2xl rounded-4xl z-0" />
          <div className="relative z-10">
            <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-2 sm:mb-4">
              {t.tracking.subtitle}
            </p>
            <h2 className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 md:mb-8 lg:mb-12 px-2 leading-tight">
              {t.tracking.title.split("donation")[0]}
              <span className="text-[#2ECC71]">donation</span>
              {t.tracking.title.split("donation")[1]}
            </h2>
            <div className="space-y-3 sm:space-y-4 w-full">
              <Input
                type="text"
                placeholder={t.tracking.placeholder}
                value={donationId}
                onChange={(e) => setDonationId(e.target.value)}
                className="w-full px-4 py-3 sm:px-6 sm:py-4 text-base sm:text-lg rounded-full border-2 border-gray-200 focus:border-[#2ECC71] focus:ring-0 min-h-[48px] sm:min-h-[56px]"
              />
              <Button
                size="lg"
                onClick={handleTrackDonation}
                className="w-full bg-[#2ECC71] hover:bg-[#27ae60] text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full text-base sm:text-lg font-semibold shadow-lg flex items-center justify-center gap-2 transition-all duration-300 min-h-[48px] sm:min-h-[56px]"
              >
                <span className="truncate">{t.tracking.button}</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/*hello workdasdfa*/}

      {/* Footer */}
      <footer className="bg-white py-12 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col items-center">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
              Sabeel
            </h3>

            {/* Social Media Links */}
            <div className="mt-4 flex space-x-6">
              <a
                href="#"
                className="text-gray-600 hover:text-green-500 transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>

              <a
                href="#"
                className="text-gray-600 hover:text-green-500 transition-colors duration-300"
                aria-label="Facebook"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              <a
                href="#"
                className="text-gray-600 hover:text-green-500 transition-colors duration-300"
                aria-label="Instagram"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-6">
              {t.footer.links.map((link, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-gray-600 hover:text-green-500 text-sm sm:text-base"
                >
                  {link}
                </a>
              ))}
            </div>
            <div className="mt-8 text-gray-600 text-sm sm:text-base">
              {t.footer.copyright}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
