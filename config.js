/* ========================================
   🔧 PHANTOMTVVV - MEGA CONFIG v2.0
   ========================================
   
   ALLE FEATURES AN EINEM ORT!
   Einfach Werte ändern und speichern.
   
   ======================================== */

const CONFIG = {
    
    // ==========================================
    // 📛 BRAND / NAME
    // ==========================================
    brand: {
        name: "PHANTOMTVVV",
        tagline: "EUROPE | EXPOSE",
        navLogo: "PHANTOM",
        logoGlitchEffect: true,
    },

    // ==========================================
    // 📊 STATISTIKEN
    // ==========================================
    stats: [
        { value: "500K+", label: "Followers" },
        { value: "1000+", label: "Videos" },
        { value: "50M+", label: "Views" },
        { value: "30+", label: "Countries" },
    ],

    // ==========================================
    // 📝 ABOUT TEXT
    // ==========================================
    about: {
        title: "WHO WE ARE",
        text: `Wir enthüllen die Wahrheit. Keine Filter, keine Kompromisse. 
               PHANTOMTVVV ist deine Quelle für unzensierte Einblicke und 
               exklusive Enthüllungen aus ganz Europa.`,
    },

    // ==========================================
    // 🔗 SOCIAL MEDIA LINKS
    // ==========================================
    socials: {
        tiktok: "https://tiktok.com/@phantomtvvv",
        instagram: "https://instagram.com/phantomtvvv",
        youtube: "https://youtube.com/@phantomtvvv",
        twitter: "https://x.com/phantomtvvv",
        discord: "https://discord.gg/phantomtvvv",
        telegram: "",
    },

    // ==========================================
    // 📧 KONTAKT
    // ==========================================
    contact: {
        email: "contact@phantomtvvv.eu",
    },

    // ==========================================
    // 🎬 CONTENT CARDS
    // ==========================================
    content: [
        {
            tag: "NEW",
            title: "Europa Exposed",
            description: "Die unerzählten Geschichten",
            link: "#",
            views: "2.5M",
        },
        {
            tag: "VIRAL",
            title: "Underground Stories",
            description: "Was sie dir nicht zeigen",
            link: "#",
            views: "5.1M",
        },
        {
            tag: "EXCLUSIVE",
            title: "Reality Check",
            description: "Die Wahrheit ans Licht",
            link: "#",
            views: "1.8M",
        },
        {
            tag: "HOT",
            title: "Street Secrets",
            description: "Direkt von der Straße",
            link: "#",
            views: "3.2M",
        },
    ],

    // ==========================================
    // 💬 TESTIMONIALS
    // ==========================================
    testimonials: [
        { text: "Beste Content Seite in Europa! 🔥", author: "@darkviewer", platform: "TikTok" },
        { text: "Endlich jemand der die Wahrheit zeigt", author: "@realuser", platform: "Instagram" },
        { text: "Jeden Tag am schauen, macht weiter so!", author: "@nightowl", platform: "YouTube" },
    ],

    // ==========================================
    // ❓ FAQ
    // ==========================================
    faq: [
        { q: "Wie kann ich Content einreichen?", a: "Öffne ein Ticket auf Discord!" },
        { q: "Macht ihr Kooperationen?", a: "Ja! Kontaktiere uns per Ticket auf Discord für Business Anfragen." },
        { q: "Wie oft postet ihr?", a: "Täglich neuer Content auf allen Plattformen!" },
    ],

    // ==========================================
    // 📢 ANNOUNCEMENT BAR
    // ==========================================
    announcement: {
        show: true,
        text: "🔥 Neues Video jeden Tag um 18:00!",
        link: "",
    },

    // ==========================================
    // ✨ FEATURES AN/AUS
    // ==========================================
    features: {
        particles: true,
        nebula: true,
        customCursor: true,
        cursorTrail: true,
        glitchEffect: true,
        typingEffect: true,
        scrollProgress: true,
        backToTop: true,
        floatingDiscord: true,
        testimonials: true,
        faq: true,
        newsletter: true,
        contactForm: true,
        parallax: true,
        soundEffects: false,
    },

    // ==========================================
    // 🎨 DESIGN
    // ==========================================
    design: {
        primaryColor: "#DC143C",
        accentColor: "#FF0000",
        glowColor: "rgba(220, 20, 60, 0.5)",
    },
};

// Export
if (typeof window !== 'undefined') {
    window.PHANTOM_CONFIG = CONFIG;
}
