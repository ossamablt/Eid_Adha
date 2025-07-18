"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { DollarSign, Users, Video, ArrowRight, Globe, ChevronDown, Menu, X } from "lucide-react"

export default function DonationPage() {
  const [donationId, setDonationId] = useState("")
  const [currentLang, setCurrentLang] = useState("fr")
  const [showLangDropdown, setShowLangDropdown] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const languages = {
    fr: { name: 'FR', flag: '🇫🇷' },
    ar: { name: 'AR', flag: '🇩🇿' },
    en: { name: 'EN', flag: '🇬🇧' }
  }

  const translations = {
    fr: {
      nav: { track: 'Suivi', steps: 'Étapes', donate: 'Faire un don' }, // fixed French nav translations
      hero: {
        title: 'Suivez chaque étape de votre sacrifice,', // fixed typo "sacrific" -> "sacrifice"
        subtitle: 'du paiement jusqu\'à la distribution.',
        card1: 'Faire le Don',
        card2: 'L\'Odhiya', 
        card3: 'Retour Video'
      },
      donation: {
        subtitle: 'Faire un Don',
        title: 'Un simple geste, une grande récompense.',
        description: 'Votre don sera suivi pas à pas, du paiement jusqu\'à la distribution. Une photo de votre sacrifice vous sera envoyée.',
        button: 'Faire le Don'
      },
      tracking: {
        subtitle: 'Suivi', // translated "Track"
        title: 'Suivez votre ID de donation ici',
        placeholder: 'Votre ID',
        button: 'Consulter le statut'
      }
    },
     ar: {
      nav: { track: 'تتبع', steps: 'الخطوات', donate: 'تبرع' },
      hero: {
        title: 'تتبع كل خطوة من تضحيتك،',
        subtitle: 'من الدفع إلى التوزيع.',
        card1: 'قم بالتبرع',
        card2: 'الأضحية',
        card3: 'فيديو العودة'
      },
      donation: {
        subtitle: 'قم بالتبرع',
        title: 'إيماءة بسيطة، مكافأة كبيرة.',
        description: 'سيتم تتبع تبرعكم خطوة بخطوة، من الدفع إلى التوزيع. ستتلقون صورة لتضحيتكم.',
        button: 'قم بالتبرع'
      },
      tracking: {
        subtitle: 'تتبع',
        title: 'تتبع معرف التبرع الخاص بك هنا',
        placeholder: 'معرفك',
        button: 'تحقق من الحالة'
      }
    },
   en: {
      nav: { track: 'Track', steps: 'Steps', donate: 'Donate' },
      hero: {
        title: 'Follow every step of your sacrifice,',
        subtitle: 'from payment to distribution.',
        card1: 'Make Donation',
        card2: 'The Odhiya',
        card3: 'Video Return'
      },
      donation: {
        subtitle: 'Make a Donation',
        title: 'A simple gesture, a great reward.',
        description: 'Your donation will be tracked step by step, from payment to distribution. A photo of your sacrifice will be sent to you.',
        button: 'Make Donation'
      },
      tracking: {
        subtitle: 'Track',
        title: 'Track your donation ID here',
        placeholder: 'Your ID',
        button: 'Check Status'
      }
    }
  }

  const t = translations[currentLang as 'fr' | 'ar' | 'en']
  const isRTL = currentLang === 'ar'

  const details = [
    t.hero.card1 + " details...",
    t.hero.card2 + " details...",
    t.hero.card3 + " details..."
  ];

  return (
    <div className="min-h-screen bg-white pt-[60px]">
      {/* Header Navigation */}
      <header className="border-b border-gray-200 px-2 sm:px-4">
        <nav
          className="fixed top-0 left-0 right-0 z-50 w-full max-w-full md:max-w-[1570px] mx-auto px-2 sm:px-4 flex items-center justify-between mt-2"
          style={{
            height: '50px',
            borderRadius: '20px',
            background: 'white',
            boxShadow: '0 4px 24px 0 #00000020, 0 0 8px 0 #00000010',
          }}
        >
          <div className="text-lg sm:text-2xl font-bold text-green-500 whitespace-nowrap">Donation</div>
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-4 sm:space-x-8 text-gray-600">
            <a href="#" className="hover:text-green-500 transition-colors text-sm sm:text-base whitespace-nowrap">
              {t.nav.track}
            </a>
            <a href="#" className="hover:text-green-500 transition-colors text-sm sm:text-base whitespace-nowrap">
              {t.nav.steps}
            </a>
            <a href="#" className="hover:text-green-500 transition-colors text-sm sm:text-base whitespace-nowrap">
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
                  {languages[currentLang as 'fr' | 'ar' | 'en'].flag} {languages[currentLang as 'fr' | 'ar' | 'en'].name}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-600" />
              </button>
              {showLangDropdown && (
                <div className="absolute top-full right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-[100]">
                  {Object.entries(languages).map(([code, lang]) => (
                    <button
                      key={code}
                      onClick={() => {
                        setCurrentLang(code)
                        setShowLangDropdown(false)
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
          <button className="md:hidden p-2 rounded-lg hover:bg-gray-100" onClick={() => setSidebarOpen(true)}>
            <Menu className="w-7 h-7 text-gray-600" />
          </button>
        </nav>
        {/* Mobile Sidebar */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-[100] flex">
            <div className="fixed inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
            <div className="relative ml-auto w-64 max-w-full h-full bg-white shadow-2xl flex flex-col p-6">
              <button className="absolute top-4 right-4 p-2" onClick={() => setSidebarOpen(false)}>
                <X className="w-6 h-6 text-gray-600" />
              </button>
              <div className="mt-10 flex flex-col space-y-6">
                <a href="#" className="hover:text-green-500 transition-colors text-base font-medium" onClick={() => setSidebarOpen(false)}>{t.nav.track}</a>
                <a href="#" className="hover:text-green-500 transition-colors text-base font-medium" onClick={() => setSidebarOpen(false)}>{t.nav.steps}</a>
                <a href="#" className="hover:text-green-500 transition-colors text-base font-medium" onClick={() => setSidebarOpen(false)}>{t.nav.donate}</a>
                {/* Language Selector in Sidebar */}
                <div className="relative">
                  <button
                    onClick={() => setShowLangDropdown(!showLangDropdown)}
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors w-full"
                  >
                    <Globe className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">
                      {languages[currentLang as 'fr' | 'ar' | 'en'].flag} {languages[currentLang as 'fr' | 'ar' | 'en'].name}
                    </span>
                    <ChevronDown className="w-4 h-4 text-gray-600" />
                  </button>
                  {showLangDropdown && (
                    <div className="absolute top-full left-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-[100]">
                      {Object.entries(languages).map(([code, lang]) => (
                        <button
                          key={code}
                          onClick={() => {
                            setCurrentLang(code)
                            setShowLangDropdown(false)
                            setSidebarOpen(false)
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
      <section className="min-h-[80vh] px-4 py-12 pb-32 md:px-6 md:py-20 flex flex-col justify-center bg-gradient-to-b from-white to-green-300">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-10 leading-tight">
            {t.hero.title}<br />
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
                className={`transition-all duration-300 ${expandedCard === index ? "ring-2 ring-[#2ECC71] scale-105" : ""}`}
              >
                <CardContent className="flex flex-col items-center justify-center p-8 h-full min-h-[220px]">
                  {/* Icon and title */}
                  <div className="flex items-center justify-center mb-4">
                    <img src={`/${index + 2}.png`} alt={title} className="w-16 h-16 object-contain" />
                  </div>
                  <div
                    className="w-full cursor-pointer"
                    onClick={() => setExpandedCard(expandedCard === index ? null : index)}
                  >
                    <h3 className="text-[#2ECC71] text-xl font-semibold text-center">{title}</h3>
                    {/* Details only for expanded card */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        expandedCard === index ? "max-h-40 mt-4 opacity-100" : "max-h-0 opacity-0"
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
                <img src="/1.png" alt="Sheep for sacrifice" className="w-full max-w-[3000px] mx-auto" />
              </div>
            </div>
            {/* Donation Info */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">Votre don</h3>
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
        <div className="max-w-2xl mx-auto text-center relative">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#2ECC71] opacity-50 blur-2xl rounded-4xl z-0" />
          <div className="relative z-10">
            <p className="text-gray-600 text-lg mb-4">{t.tracking.subtitle}</p>
            <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 sm:mb-12">
              {t.tracking.title.split('donation')[0]}
              <span className="text-[#2ECC71]">donation</span>
              {t.tracking.title.split('donation')[1]}
            </h2>
            <div className="space-y-4">
              <Input
                type="text"
                placeholder={t.tracking.placeholder}
                value={donationId}
                onChange={(e) => setDonationId(e.target.value)}
                className="w-full px-6 py-4 text-lg rounded-full border-2 border-gray-200 focus:border-[#2ECC71] focus:ring-0"
              />
              <Button
                size="lg"
                className="w-full bg-[#2ECC71] hover:bg-[#27ae60] text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg flex items-center justify-center gap-2 transition-all duration-300"
              >
                {t.tracking.button}
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
