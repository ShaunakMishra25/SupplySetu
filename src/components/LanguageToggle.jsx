import React from 'react';

const texts = {
  hindi: { en: 'हिं', hi: 'हिं' },
  english: { en: 'EN', hi: 'EN' }
};

export default function LanguageToggle({ language, setLanguage }) {
  const toggleLanguage = () => {
    setLanguage(language === "hi" ? "en" : "hi");
  };

  return (
    <button
      onClick={toggleLanguage}
      className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 fixed top-4 right-4 z-50 bg-white shadow-lg border border-neutral-200"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="lucide lucide-languages h-4 w-4 mr-1"
      >
        <path d="m5 8 6 6"></path>
        <path d="m4 14 6-6 2-3"></path>
        <path d="M2 5h12"></path>
        <path d="M7 2h1"></path>
        <path d="m22 22-5-10-5 10"></path>
        <path d="M14 18h6"></path>
      </svg>
      <span className="text-sm font-medium">
        {language === "hi" ? texts.hindi[language] : texts.english[language]}
      </span>
    </button>
  );
} 