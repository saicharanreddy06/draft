
document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Inject the Toggle UI into the Navbar ---
    const toggleWrapper = document.createElement('div');
    toggleWrapper.id = 'theme-controls';
    toggleWrapper.innerHTML = `
        <button id="toggle-theme-btn" class="theme-nav-btn" title="Toggle Dark Mode">??</button>
        <button id="toggle-dir-btn" class="theme-nav-btn" title="Toggle RTL/LTR">RTL</button>
    `;
    
    // Find the header-cta (where the "Custom Team Order" button is)
    const headerCta = document.querySelector('.header-cta');
    if (headerCta) {
        headerCta.prepend(toggleWrapper); // Put toggles before the CTA button
    } else {
        // Fallback if navbar doesn't exist
        document.body.appendChild(toggleWrapper);
    }

    // --- 2. State Management ---
    let isDark = localStorage.getItem('apex_theme') === 'dark';
    let isRtl = localStorage.getItem('apex_dir') === 'rtl';

    const themeBtn = document.getElementById('toggle-theme-btn');
    const dirBtn = document.getElementById('toggle-dir-btn');

    function applyTheme() {
        if (isDark) {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeBtn.innerText = '??';
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            themeBtn.innerText = '??';
        }
        localStorage.setItem('apex_theme', isDark ? 'dark' : 'light');
    }

    function applyDir() {
        if (isRtl) {
            document.documentElement.dir = 'rtl';
            dirBtn.innerText = 'LTR';
        } else {
            document.documentElement.dir = 'ltr';
            dirBtn.innerText = 'RTL';
        }
        localStorage.setItem('apex_dir', isRtl ? 'rtl' : 'ltr');
    }

    themeBtn.addEventListener('click', () => {
        isDark = !isDark;
        applyTheme();
    });

    dirBtn.addEventListener('click', () => {
        isRtl = !isRtl;
        applyDir();
    });

    // --- 3. Dynamic CSS Injection ---
    const style = document.createElement('style');
    style.innerHTML = `
        /* Navbar Toggle UI Styles */
        #theme-controls {
            display: flex;
            gap: 10px;
            margin-right: 15px; /* Space between toggles and the CTA button */
            align-items: center;
        }
        .theme-nav-btn {
            background: transparent;
            color: inherit;
            border: 1px solid rgba(150,150,150,0.5);
            border-radius: 8px;
            width: 38px;
            height: 38px;
            font-size: 14px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .theme-nav-btn:hover { 
            background: rgba(255, 51, 0, 0.1);
            color: #FF5500;
            border-color: #FF5500;
        }
        
        /* Fallback if floating */
        body > #theme-controls {
            position: fixed; bottom: 20px; right: 20px; background: #fff; padding: 10px; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }

        /* --- DARK MODE VARIABLES --- */
        [data-theme="dark"] {
            --color-background: #0a0a0a !important;
            --color-surface: #1a1a1a !important;
            --color-text: #e0e0e0 !important;
            --color-secondary: #aaaaaa !important;
            --color-border: #333333 !important;
            --premium-bg: #050505 !important;
            --premium-surface: #111111 !important;
            --premium-text: #ffffff !important;
        
            --color-bg: #0a0a0a !important;
            --color-tertiary: #111115 !important;
            --color-bg-glass: rgba(10, 10, 16, 0.8) !important;
        }
        
        /* --- DARK MODE ELEMENT OVERRIDES --- */

        /* --- KEEP CTA BOX DARK AS IT IS IN LIGHT MODE --- */
        [data-theme="dark"] .final-cta .cta-wrapper {
            background: #0A0A10 !important;
        }


        
        
        


        /* --- DARK MODE PROCESS CARD CLEAN --- */
        [data-theme="dark"] .process-card-clean {
            background: #111115 !important;
            border-color: rgba(255,255,255,0.05) !important;
        }
        
        [data-theme="dark"] .process-card-clean h3 {
            color: #ffffff !important;
            -webkit-text-fill-color: #ffffff !important;
        }
        
        [data-theme="dark"] .process-card-clean p {
            color: #cccccc !important;
            -webkit-text-fill-color: #cccccc !important;
        }
        
        [data-theme="dark"] .process-card-clean:hover h3 {
            color: #FF5500 !important;
            -webkit-text-fill-color: #FF5500 !important;
        }


        [data-theme="dark"] .step:hover h3 {
            color: #FF5500 !important;
            -webkit-text-fill-color: #FF5500 !important;
        }


        /* --- DARK MODE STEP TEXT --- */
        [data-theme="dark"] .step h3 {
            color: #ffffff !important;
            -webkit-text-fill-color: #ffffff !important;
        }


        /* --- DARK MODE MAGAZINE REVIEWS --- */
        [data-theme="dark"] .mag-quote {
            color: #ffffff !important;
            -webkit-text-fill-color: #ffffff !important;
        }
        
        [data-theme="dark"] .mag-author {
            color: #FF5500 !important;
            -webkit-text-fill-color: #FF5500 !important;
            text-shadow: 0 0 5px rgba(255, 85, 0, 0.4);
        }
        
        [data-theme="dark"] .mag-title {
            color: #cccccc !important;
            -webkit-text-fill-color: #cccccc !important;
            text-shadow: none !important;
        }


        [data-theme="dark"] .material-card.featured-material {
            border-color: #FF5500 !important;
            box-shadow: 0 12px 36px rgba(255, 85, 0, 0.1) !important;
        }


        /* --- DARK MODE MATERIAL CARD GLASS --- */
        [data-theme="dark"] .material-card {
            background: rgba(255, 255, 255, 0.05) !important;
            border: 1px solid rgba(255, 255, 255, 0.1) !important;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5) !important;
        }


        /* --- DARK MODE PRICING TIER GLASS --- */
        [data-theme="dark"] .tier-card,
        [data-theme="dark"] .tier-box {
            background: rgba(255, 255, 255, 0.05) !important;
            border: 1px solid rgba(255, 255, 255, 0.1) !important;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5) !important;
        }
        
        [data-theme="dark"] .tier-card.featured,
        [data-theme="dark"] .tier-box.featured {
            border-color: #FF5500 !important;
            box-shadow: 0 16px 48px rgba(255, 85, 0, 0.15) !important;
        }


        /* --- DARK MODE TIMELINE GLASS --- */
        [data-theme="dark"] .timeline-item {
            background: rgba(255, 255, 255, 0.05) !important; /* Slighter white glass */
            border: 1px solid rgba(255, 255, 255, 0.1) !important;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3) !important;
        }


        /* --- DARK MODE TESTIMONIAL TEAM NAME --- */
        [data-theme="dark"] .team-name {
            color: #FF5500 !important;
            -webkit-text-fill-color: #FF5500 !important;
            text-shadow: 0 0 10px rgba(255, 85, 0, 0.7);
        }


        /* --- DARK MODE ORANGE BUTTON TEXT COLOR --- */
        [data-theme="dark"] .btn-primary,
        [data-theme="dark"] .cta-btn-primary,
        [data-theme="dark"] button.btn-primary,
        [data-theme="dark"] input[type="submit"].btn-primary,
        [data-theme="dark"] .btn-primary span,
        [data-theme="dark"] .cta-btn-primary span,
        [data-theme="dark"] .cta-btn-primary .btn-text,
        [data-theme="dark"] .cta-btn-primary .btn-arrow {
            color: #000000 !important;
            -webkit-text-fill-color: #000000 !important;
        }


        [data-theme="dark"] .cta-mega-heading,
        [data-theme="dark"] .cta-subtext {
            color: #ffffff !important;
            -webkit-text-fill-color: #ffffff !important;
        }


        [data-theme="dark"] .cta-box-overlay {
            background: rgba(0, 0, 0, 0.8) !important;
        }


        /* --- INDEX.HTML HERO FIX --- */
        [data-theme="dark"] .hero-section .hero-title,
        [data-theme="dark"] .hero-section .hero-subtitle,
        [data-theme="dark"] .hero-section .hero-eyebrow {
            color: #0A0A10 !important; /* Do not change text color from original */
            -webkit-text-fill-color: #0A0A10 !important;
        }
        [data-theme="dark"] .hero-section .hero-title span,
        [data-theme="dark"] .hero-section .hero-eyebrow i {
            color: #FF3300 !important;
            -webkit-text-fill-color: #FF3300 !important;
        }
        [data-theme="dark"] .hero-overlay {
            /* Darken the background image instead */
            background: radial-gradient(circle at center, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%) !important;
        }


        /* --- HERO SECTION DARK MODE --- */
        [data-theme="dark"] .grid-hero-section {
            background-color: #333 !important; /* Grid line color in dark mode */
        }
        [data-theme="dark"] .grid-cell {
            background-color: #0a0a0a !important; /* Base cell color in dark mode */
        }
        [data-theme="dark"] .glass-overlay {
            background: rgba(0,0,0,0.7) !important; /* Dark frosted glass */
        }
        [data-theme="dark"] .hero-mega-text,
        [data-theme="dark"] .hero-sub-text {
            color: #ffffff !important; /* Must be white to be visible on black grid */
            -webkit-text-fill-color: #ffffff !important;
            text-shadow: 0 4px 20px rgba(0,0,0,0.5); /* Pop against the orange hover */
        }
        [data-theme="dark"] .hero-mega-text span.accent-text {
            color: #FF5500 !important;
            -webkit-text-fill-color: #FF5500 !important;
            text-shadow: 0 0 12px rgba(255, 85, 0, 0.7);
        }


        /* Fix text legibility inside the Custom Advantage box in dark mode */
        [data-theme="dark"] .premium-feature-content,
        [data-theme="dark"] .premium-feature-content h3,
        [data-theme="dark"] .premium-feature-content p,
        [data-theme="dark"] .premium-stat-item {
            color: #000000 !important;
        }
        [data-theme="dark"] .premium-stat-item {
            background: rgba(0,0,0,0.05) !important;
            border-color: rgba(0,0,0,0.1) !important;
        }

        [data-theme="dark"] body {
            background-color: var(--color-background);
            color: var(--color-text);
        }
        
        /* Force un-themed sections to be dark */
        [data-theme="dark"] section,
        [data-theme="dark"] .marquee-section,
        [data-theme="dark"] .bento-section,
        [data-theme="dark"] .final-cta-section,
        [data-theme="dark"] .promo-hologram-section,
        [data-theme="dark"] .process-section-clean {
            background-color: transparent !important;
            
        }

        
        [data-theme="dark"] ul.dropdown-menu {
            background: rgba(20, 20, 20, 0.95) !important;
            border: 1px solid #333 !important;
        }
        [data-theme="dark"] ul.dropdown-menu a {
            color: #ddd !important;
        }
        [data-theme="dark"] .section-header h2, 
        [data-theme="dark"] .section-header-prm h2 {
            color: #ffffff !important;
            -webkit-text-fill-color: #ffffff !important;
            background: none !important;
        }
        
        

        


        [data-theme="dark"] .sport-text-cloud {
            background-color: transparent !important;
        }
        [data-theme="dark"] .sport-name {
            color: #ffffff !important;
            background-color: transparent !important;
        }


        [data-theme="dark"] .bento-card,
        [data-theme="dark"] .process-card-clean,
        [data-theme="dark"] .marquee-card,
        [data-theme="dark"] .tier-box {
            background-color: #111 !important;
            border-color: #333 !important;
        }
        
        
        
        [data-theme="dark"] .site-header {
            background: rgba(10, 10, 10, 0.9) !important;
            border-bottom: 1px solid #222 !important;
        }
        [data-theme="dark"] .nav-link {
            color: #e0e0e0 !important;
        }
        [data-theme="dark"] .logo-text .color-1 {
            color: #FF5500 !important;
            -webkit-text-fill-color: #FF5500 !important;
            text-shadow: 0 0 8px rgba(255, 85, 0, 0.5);
        }
        [data-theme="dark"] .logo-text .color-2 {
            color: #ffffff !important;
            -webkit-text-fill-color: #ffffff !important;
        }
        [data-theme="dark"] .theme-nav-btn {
            color: #fff !important;
        }

        
        /* --- GLOBAL HEADING ACCENTS (LIGHT & DARK MODE) --- */
        .section-title span,
        .section-header h2 span,
        .section-header-prm h2 span,
        .page-header h1 span,
        h2.section-title span {
            color: #FF5500 !important;
            -webkit-text-fill-color: #FF5500 !important;
            text-shadow: 0 0 8px rgba(255, 85, 0, 0.4);
        }
        
        [data-theme="dark"] .section-title span,
        [data-theme="dark"] .section-header h2 span,
        [data-theme="dark"] .section-header-prm h2 span,
        [data-theme="dark"] .page-header h1 span,
        [data-theme="dark"] h2.section-title span {
            color: #FF5500 !important;
            -webkit-text-fill-color: #FF5500 !important;
            text-shadow: 0 0 12px rgba(255, 85, 0, 0.7);
        }

        
        /* --- GLOBAL RTL OVERRIDES --- */
        [dir="rtl"] .header-cta {
            margin-left: 0 !important;
            margin-right: auto !important;
        }
        [dir="rtl"] .dropdown-menu {
            left: auto !important;
            right: 0 !important;
            text-align: right;
        }
        [dir="rtl"] .nav-links a:not(.btn)::after {
            left: auto !important;
            right: 0 !important;
        }
        [dir="rtl"] .btn::before {
            left: auto !important;
            right: 0 !important;
        }
        [dir="rtl"] .footer-col ul a::before {
            left: auto !important;
            right: -15px !important;
        }
        [dir="rtl"] .footer-col ul a:hover {
            padding-left: 0 !important;
            padding-right: 15px !important;
        }
        
        [dir="rtl"] .process-card-clean::after {
            left: auto !important;
            right: 0 !important;
            transform-origin: right !important;
        }
        [dir="rtl"] .bonus-offer-card {
            border-left: none !important;
            border-right: 4px solid var(--color-primary) !important;
        }
        [dir="rtl"] .tier-badge {
            left: auto !important;
            right: 50% !important;
            transform: translate(50%, -50%) !important;
        }
        [dir="rtl"] .nav-links {
            margin-left: 0 !important;
            margin-right: 30px !important;
        }
        [dir="rtl"] .hero-subtitle {
            margin-left: auto;
            margin-right: auto;
        }
        [dir="rtl"] .split-layout {
            flex-direction: row-reverse; /* Usually flex flips naturally, but if it doesn't, this forces it */
        }

        
        [dir="rtl"] .tier-features,
        [dir="rtl"] .tier-perks,
        [dir="rtl"] .tech-list {
            text-align: right !important;
            padding-right: 0 !important;
        }
        [dir="rtl"] .split-text {
            text-align: right;
        }
        [dir="rtl"] .footer-col {
            text-align: right;
        }
        [dir="rtl"] .footer-col ul {
            padding-right: 0;
        }
        [dir="rtl"] .form-group label {
            text-align: right;
        }
        [dir="rtl"] input, 
        [dir="rtl"] select, 
        [dir="rtl"] textarea {
            text-align: right;
        }

        /* --- RTL SPECIFIC ADJUSTMENTS --- */
        [dir="rtl"] #theme-controls {
            margin-right: 0;
            margin-left: 15px; /* Flip margin for RTL */
        }
        [dir="rtl"] .bi-chevron-down {
            margin-right: 5px; margin-left: 0;
        }
        [dir="rtl"] .hero-actions, [dir="rtl"] .header-cta {
            display: flex;
        }
    `;
    document.head.appendChild(style);

    // Initialize State
    applyTheme();
    applyDir();
});
