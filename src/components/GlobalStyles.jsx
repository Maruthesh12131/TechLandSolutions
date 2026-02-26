import { useEffect } from "react";
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@400;500;600;700;900&family=IBM+Plex+Sans:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --primary: #0c5af5;
    --dark: #111317;
    --dark2: #2b303b;
    --dark3: #222126;
    --secondary: #16171b;
    --body-bg: #1f2025;
    --body-bg2: #131216;
    --white: #ffffff;
    --black: #000000;
    --green: #2df494;
    --gray: #7e8695;
    --gray2: #5f697c;
    --gray3: #474e5c;
    --gray4: #9da5b4;
    --gray6: #f0f2f4;
    --gray7: #bbc1ce;
    --border: #d9dce3;
    --orange: #f24903;
    --font-display: 'Red Hat Display', sans-serif;
    --font-body: 'IBM Plex Sans', sans-serif;
    --transition: all 0.3s ease;
  }

  html { scroll-behavior: smooth; font-size: 16px; }
  body { font-family: var(--font-body); background: var(--body-bg); color: var(--white); overflow-x: hidden; }
  a { text-decoration: none; color: inherit; display: inline-block; transition: var(--transition); }
  img { max-width: 100%; height: auto; }
  ul { list-style: none; }
  button { border: none; cursor: pointer; background: none; font-family: inherit; }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: var(--dark2); }
  ::-webkit-scrollbar-thumb { background: var(--primary); border-radius: 4px; }

  /* Animations */
  @keyframes flickerAnimation {
    0%, 100% { opacity: 1; } 50% { opacity: 0.3; }
  }
  @keyframes slideHar {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeInRight {
    from { opacity: 0; transform: translateX(-30px); }
    to { opacity: 1; transform: translateX(0); }
  }
  @keyframes spin {
    0% { transform: rotate(0deg); box-shadow: 0 2px 0 var(--primary); }
    100% { transform: rotate(360deg); box-shadow: 0 2px 0 var(--primary); }
  }
  @keyframes preloaderOut {
    to { opacity: 0; visibility: hidden; }
  }

  /* Preloader */
  .preloader {
    position: fixed; inset: 0; z-index: 999999;
    background: var(--body-bg);
    display: flex; align-items: center; justify-content: center;
    transition: opacity 0.6s ease, visibility 0.6s ease;
  }
  .preloader.hidden { opacity: 0; visibility: hidden; pointer-events: none; }
  .preloader-ring {
    width: 80px; height: 80px; border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  .preloader-logo {
    position: absolute; width: 36px; height: 36px;
    background: var(--primary); border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    font-family: var(--font-display); font-weight: 900; font-size: 18px;
  }

  /* Container */
  .container { width: 100%; max-width: 1400px; margin: auto; padding-left: 20px; padding-right: 20px; }

  @media (max-width:768px){ .container{ padding-left:16px; padding-right:16px; } }
  

  /* Hexagon flicker dot */
  .hex-dot {
    display: inline-block; width: 8px; height: 8px; flex-shrink: 0;
    clip-path: polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%);
    animation: flickerAnimation 0.8s infinite;
  }

  /* Button base */
  .btn {
    display: inline-flex; align-items: center; justify-content: center;
    height: 46px; padding: 0 24px; border-radius: 12px;
    background: var(--primary); color: var(--white);
    font-size: 14px; font-weight: 600;
    transition: var(--transition); position: relative; overflow: hidden;
    white-space: nowrap; cursor: pointer;
  }
  .btn::after {
    content: ''; position: absolute; width: 0; height: 0;
    background: rgba(255,255,255,0.2); border-radius: 50%;
    transform: translate(-50%,-50%); transition: width 0.4s, height 0.4s;
    left: 50%; top: 50%;
  }
  .btn:hover::after { width: 300px; height: 300px; }
  .btn:hover { background: var(--dark); }
  .btn-white { background: var(--white); color: var(--dark); }
  .btn-white:hover { background: var(--primary); color: var(--white); }
  .btn-dark { background: var(--dark); }
  .btn-dark:hover { background: var(--primary); }
  .btn-border { background: transparent; border: 1px solid var(--border); color: var(--black); }
  .btn-border:hover { background: var(--primary); color: var(--white); border-color: var(--primary); }

  /* Section spacing */
  .section { padding: 100px 0; }
  @media (max-width: 991px) { .section { padding: 70px 0; } }
  @media (max-width: 767px) { .section { padding: 50px 0; } }

  /* Typography */
  h1, h2, h3, h4, h5, h6 { font-family: var(--font-display); font-weight: 600; line-height: 1.2; }
  h1 { font-size: clamp(40px, 5vw, 64px); }
  h2 { font-size: clamp(28px, 4vw, 48px); }
  h3 { font-size: clamp(24px, 3vw, 40px); }
  h4 { font-size: clamp(22px, 2.5vw, 36px); }
  h5 { font-size: clamp(20px, 2vw, 32px); }
  h6 { font-size: clamp(16px, 1.5vw, 24px); }

  /* Tag label */
  .tag-label {
    display: inline-flex; align-items: center; gap: 8px;
    font-size: 12px; font-weight: 500; color: var(--gray4);
    letter-spacing: 0.1em; text-transform: uppercase;
  }

  /* Grid helpers */
  .grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }
  .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
  .grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
  @media (max-width: 991px) {
    .grid-4 { grid-template-columns: repeat(2, 1fr); }
    .grid-3 { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 575px) {
    .grid-4, .grid-3, .grid-2 { grid-template-columns: 1fr; }
  }

  /* Heading section */
  .heading-section {
  margin-bottom: 60px;
}

.services-section .heading-section {
  text-align: center;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.services-section .tag-label {
  justify-content: center;
}

.services-section .sub {
  margin-left: auto;
  margin-right: auto;
}

upcoming-section {
  background: var(--body-bg);
}
.upcoming-section .heading-section {
  text-align: center;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.upcoming-section .tag-label {
  justify-content: center;
}

.upcoming-section .sub {
  margin-left: auto;
  margin-right: auto;
}

  .heading-section .sub { color: var(--gray); font-size: 15px; margin-top: 16px; max-width: 540px; line-height: 1.7; }

  /* Marquee wrapper */
  .marquee-track { display: flex; width: max-content; animation: slideHar 18s linear infinite; }
  .marquee-track:hover { animation-play-state: paused; }
  .marquee-overflow { overflow: hidden; }

  /* Sticky header */
  .site-header {
    position: fixed; top: 0; left: 0; right: 0; z-index: 9999;
    transition: background 0.4s ease, box-shadow 0.4s ease, transform 0.6s cubic-bezier(0.24,0.74,0.58,1);
  }
  .site-header.scrolled {
    background: rgba(22, 23, 27, 0.95);
    backdrop-filter: blur(12px);
    box-shadow: 0 2px 20px rgba(0,0,0,0.3);
  }
  .header-inner {
    display: flex; align-items: center; justify-content: space-between;
    padding: 24px 0;
    transition: padding 0.3s ease;
  }
  .site-header.scrolled .header-inner { padding: 14px 0; }
  .site-logo { font-family: var(--font-display); font-size: 22px; font-weight: 900; color: var(--white); }
  .site-logo span { color: var(--primary); }
  .nav-list { display: flex; align-items: center; gap: 36px; }
  .nav-link { font-size: 14px; font-weight: 500; color: var(--gray); transition: var(--transition); position: relative; }
  .nav-link::before { display: none; }
  .nav-link:hover, .nav-link.active { color: var(--white); }
  .nav-link .hex { width: 7px; height: 8px; background: var(--primary); clip-path: polygon(50% 0%,95% 25%,95% 75%,50% 100%,5% 75%,5% 25%); animation: flickerAnimation 0.8s infinite; margin-right: 6px; display: none; }
  .nav-link:hover .hex, .nav-link.active .hex { display: inline-block; }
  .mobile-toggle { display: none; font-size: 28px; color: var(--primary); cursor: pointer; background: none; border: none; }
  @media (max-width: 1024px) { .nav-list { display: none; } .mobile-toggle { display: block; } }

  /* Mobile menu */
  .mobile-menu {
    position: fixed; top: 0; right: 0; width: min(320px, 90vw); height: 100vh;
    background: var(--secondary); z-index: 99999;
    transform: translateX(100%); transition: transform 0.4s cubic-bezier(0.645,0.045,0.355,1);
    display: flex; flex-direction: column; padding: 24px;
    overflow-y: auto;
  }
  .mobile-menu.open { transform: translateX(0); }
  .mobile-menu-overlay {
    position: fixed; inset: 0; z-index: 99998;
    background: rgba(0,0,0,0.7); opacity: 0; visibility: hidden;
    transition: var(--transition); backdrop-filter: blur(4px);
  }
  .mobile-menu-overlay.open { opacity: 1; visibility: visible; }
  .mobile-menu-close { align-self: flex-end; font-size: 20px; color: var(--gray4); cursor: pointer; background: none; border: 1px solid var(--gray4); width: 32px; height: 32px; border-radius: 4px; display: flex; align-items: center; justify-content: center; margin-bottom: 32px; }
  .mobile-nav-link { display: block; padding: 14px 0; font-size: 15px; font-weight: 600; color: var(--gray4); border-bottom: 1px solid var(--dark2); transition: var(--transition); }
  .mobile-nav-link:hover { color: var(--white); }

  /* Hero */
  .hero {
    min-height: 100vh; display: flex; align-items: center;
    position: relative; overflow: hidden; padding-top: 100px;
  }
  .hero-bg {
    position: absolute; inset: 0; z-index: 0;
    background: radial-gradient(ellipse at 60% 40%, rgba(12,90,245,0.15) 0%, transparent 60%),
                radial-gradient(ellipse at 20% 80%, rgba(45,244,148,0.05) 0%, transparent 50%);
  }
  .hero-grid-lines {
    position: absolute; inset: 0; z-index: 0; opacity: 0.04;
    background-image: linear-gradient(var(--white) 1px, transparent 1px),
                      linear-gradient(90deg, var(--white) 1px, transparent 1px);
    background-size: 80px 80px;
  }
  .hero-content { position: relative; z-index: 1; }
  .hero-tag {
    display: inline-flex; align-items: center; gap: 10px;
    background: rgba(12,90,245,0.1); border: 1px solid rgba(12,90,245,0.3);
    padding: 6px 14px; border-radius: 100px; margin-bottom: 28px;
    font-size: 13px; font-weight: 500; color: var(--primary);
    animation: fadeInUp 0.6s ease both;
  }
  .hero-title { margin-bottom: 24px; line-height: 1.1; animation: fadeInUp 0.6s ease 0.1s both; }
  .hero-title .accent { color: var(--primary); }
  .hero-desc { color: var(--gray); font-size: 16px; line-height: 1.75; max-width: 520px; margin-bottom: 40px; animation: fadeInUp 0.6s ease 0.2s both; }
  .hero-btns { display: flex; gap: 16px; flex-wrap: wrap; animation: fadeInUp 0.6s ease 0.3s both; }
  .hero-img-wrap {
    position: relative; border-radius: 24px; overflow: hidden;
    animation: fadeInRight 0.8s ease 0.2s both;
  }
  .hero-img-wrap img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .hero-float-card {
    position: absolute; background: rgba(22,23,27,0.9); backdrop-filter: blur(12px);
    border: 1px solid rgba(255,255,255,0.1); border-radius: 16px;
    padding: 14px 18px; display: flex; align-items: center; gap: 12px;
  }
  .hero-float-card.card-1 { bottom: 30px; left: -20px; }
  .hero-float-card.card-2 { top: 30px; right: -20px; }
  @media (max-width: 991px) { .hero-float-card { display: none; } }
  .float-icon { width: 40px; height: 40px; border-radius: 10px; background: var(--primary); display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; }
@media (max-width: 991px) {.hero { padding-top: 80px; } .hero-content { text-align: center; } .hero-btns { justify-content: center; } }
  /* Counter */
  .counter-section { padding: 60px 0; border-top: 1px solid var(--dark2); border-bottom: 1px solid var(--dark2); }
  .counter-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 0; }
  .counter-item { padding: 32px 24px; border-right: 1px solid var(--dark2); }
  .counter-item:last-child { border-right: none; }
  .counter-number { font-family: var(--font-display); font-size: clamp(36px,4vw,56px); font-weight: 700; color: var(--white); line-height: 1; }
  .counter-number .plus { color: var(--primary); }
  .counter-label { color: var(--gray); font-size: 14px; margin-top: 8px; }
  @media (max-width: 767px) { .counter-grid { grid-template-columns: repeat(2,1fr); } .counter-item:nth-child(2) { border-right: none; } .counter-item { border-bottom: 1px solid var(--dark2); } }
  @media (max-width: 575px) { .counter-grid { grid-template-columns: 1fr; } .counter-item { border-right: none; } }

  /* Marquee brands */
  .brands-section { padding: 48px 0; overflow: hidden; }
  .brand-item { display: flex; align-items: center; justify-content: center; padding: 0 60px; opacity: 0.4; transition: opacity 0.3s; filter: grayscale(1) brightness(2); }
  .brand-item:hover { opacity: 1; filter: none; }
  .brand-logo { height: 32px; width: auto; object-fit: contain; }
  .brand-item { padding: 0 30px; }

@media (max-width:768px){ .brand-item { padding: 0 20px; } }

  /* Services */
  .services-section { background: var(--body-bg2); }
  .service-card {
    background: var(--secondary); border-radius: 20px;
    padding: 36px 28px; transition: var(--transition);
    border: 1px solid transparent; position: relative; overflow: hidden;
    height: 100%;
  }
  .service-card::before {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(12,90,245,0.05) 0%, transparent 60%);
    opacity: 0; transition: opacity 0.3s;
    pointer-events:none;
  }
  .service-card:hover { border-color: rgba(12,90,245,0.12); transform: translateY(-4px); box-shadow: 0 20px 60px rgba(0,0,0,0.3); }
  .service-card:hover::before { opacity: 1; }
  .service-icon { width: 56px; height: 56px; background: rgba(12,90,245,0.12); border-radius: 14px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px; font-size: 24px; transition: transform 0.6s ease;transform: translate3d(360deg); scale(1.1);transform-style: preserve-3d;transform-origin: center;}
  .service-card:hover .service-icon { scale(1.1) transform: rotateY(180deg);}
  .service-title { font-size: 20px; font-weight: 600; margin-bottom: 12px; }
  .service-desc { color: var(--gray); font-size: 14px; line-height: 1.7; }
  .service-link { display: inline-flex; align-items: center; gap: 8px; color: var(--primary); font-size: 13px; font-weight: 600; margin-top: 20px; transition: var(--transition); }
  .service-link:hover { gap: 12px; }
  .service-link-arrow { font-size: 16px; transition: transform 0.3s; pointer-events:none; }
  .service-card:hover .service-link-arrow { transform: rotate(-45deg); }

  /* Why Us */
  .why-section {}
  .why-list { display: grid; gap: 20px; }
  .why-item { display: flex; gap: 16px; align-items: flex-start; padding: 20px; border-radius: 12px; background: var(--secondary); transition: var(--transition); }
  .why-item:hover { background: rgba(12,90,245,0.08); }
  .why-check { width: 24px; height: 24px; border-radius: 6px; background: var(--primary); display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 12px; margin-top: 2px; }
  .why-item-title { font-size: 16px; font-weight: 600; margin-bottom: 6px; }
  .why-item-desc { color: var(--gray); font-size: 14px; line-height: 1.6; }
  .why-image { border-radius: 24px; overflow: hidden; position: relative; }
  .why-image img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.6s ease; }
  .why-image:hover img { transform: scale(1.04); }
  .why-badge { position: absolute; bottom: 24px; left: 24px; background: rgba(12,90,245,0.95); backdrop-filter: blur(8px); border-radius: 14px; padding: 16px 20px; }
  .why-badge-num { font-family: var(--font-display); font-size: 32px; font-weight: 700; line-height: 1; }
  .why-badge-text { font-size: 12px; color: rgba(255,255,255,0.7); margin-top: 4px; }

  /* Blog */
  .blog-section { background: var(--body-bg2); }
  .blog-card { background: var(--secondary); border-radius: 20px; overflow: hidden; transition: var(--transition); border: 1px solid transparent; }
  .blog-card:hover { border-color: rgba(12,90,245,0.3); transform: translateY(-4px); }
  .blog-thumb { position: relative; overflow: hidden; aspect-ratio: 16/10; }
  .blog-thumb img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s ease; display: block; }
  .blog-card:hover .blog-thumb img { transform: scale(1.06); }
  .blog-cat { position: absolute; top: 16px; left: 16px; background: var(--primary); color: var(--white); font-size: 11px; font-weight: 600; padding: 4px 12px; border-radius: 100px; letter-spacing: 0.05em; }
  .blog-body { padding: 24px; }
  .blog-meta { display: flex; align-items: center; gap: 16px; color: var(--gray); font-size: 12px; margin-bottom: 12px; }
  .blog-title { font-size: 18px; font-weight: 600; line-height: 1.4; margin-bottom: 12px; transition: var(--transition); }
  .blog-card:hover .blog-title { color: var(--primary); }
  .blog-excerpt { color: var(--gray); font-size: 14px; line-height: 1.65; }

  /* Team */
  .team-section {}
  .team-card { background: var(--secondary); border-radius: 20px; overflow: hidden; text-align: center; padding: 32px 24px; transition: var(--transition); border: 1px solid transparent; position: relative; }
  .team-card::after { content: ''; position: absolute; inset: 0; border-radius: 20px; border: 1px solid var(--primary); opacity: 0; transition: var(--transition); }
  .team-card:hover { transform: translateY(-6px); }
  .team-card:hover::after { opacity: 1; }
  .team-avatar { width: 80px; height: 80px; border-radius: 50%; overflow: hidden; margin: 0 auto 16px; border: 3px solid rgba(12,90,245,0.3); }
  .team-avatar img { width: 100%; height: 100%; object-fit: cover; }
  .team-name { font-size: 18px; font-weight: 600; margin-bottom: 6px; }
  .team-role { color: var(--primary); font-size: 13px; font-weight: 500; margin-bottom: 16px; }
  .team-social { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; }
  .team-social-link { width: 36px; height: 36px; border-radius: 50%; border: 1px solid var(--gray3); color: var(--gray); display: flex; align-items: center; justify-content: center; font-size: 14px; transition: var(--transition); }
  .team-social-link:hover { background: var(--primary); border-color: var(--primary); color: var(--white); }
  .team-section { background: var(--body-bg2); }
  /* Testimonials */
  .testimonials-section {background: var(--secondary);}
  .testimonials-container {}
  .testimonial-slider { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
  @media (max-width: 991px) { .testimonial-slider { grid-template-columns: repeat(2,1fr); } }
  @media (max-width: 575px) { .testimonial-slider { grid-template-columns: 1fr; } }
  .testimonial-card { background: var(--secondary); border-radius: 20px; padding: 28px; border: 1px solid var(--dark2); transition: var(--transition); }
  .testimonial-card:hover { border-color: var(--primary); transform: translateY(-4px); }
  .testimonial-stars { color: #f4c542; font-size: 16px; letter-spacing: 2px; margin-bottom: 16px; }
  .testimonial-text { color: var(--gray4); font-size: 15px; line-height: 1.7; margin-bottom: 24px; font-style: italic; }
  .testimonial-author { display: flex; align-items: center; gap: 14px; }
  .testimonial-avatar { width: 48px; height: 48px; border-radius: 50%; overflow: hidden; flex-shrink: 0; }
  .testimonial-avatar img { width: 100%; height: 100%; object-fit: cover; }
  .testimonial-name { font-size: 15px; font-weight: 600; }
  .testimonial-company { font-size: 12px; color: var(--gray); }

  /* FAQ */
  .faq-section {background: var(--body-bg2);}
  .faq-section .sub {
  margin-left: auto;
  margin-right: auto;
}
  .faq-wrap { max-width: 860px; margin: 0 auto; }
  .faq-item { border: 1px solid var(--dark2); border-radius: 16px; margin-bottom: 16px; overflow: hidden; transition: border-color 0.3s; }
  .faq-item.open { border-color: rgba(12,90,245,0.4); }
  .faq-trigger { width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 24px 28px; background: var(--secondary); cursor: pointer; transition: background 0.3s; font-size: 17px; font-weight: 600; text-align: left; color: var(--white); }
  .faq-item.open .faq-trigger { background: rgba(12,90,245,0.08); }
  .faq-icon { width: 28px; height: 28px; border-radius: 6px; background: var(--dark2); flex-shrink: 0; display: flex; align-items: center; justify-content: center; transition: var(--transition); }
  .faq-item.open .faq-icon { background: var(--primary); }
  .faq-body { overflow: hidden; transition: max-height 0.4s ease; max-height: 0; }
  .faq-body-inner { padding: 0 28px 24px; color: var(--gray); font-size: 15px; line-height: 1.75; }

  /* Footer */
  .site-footer { background: var(--body-bg2); border-top: 1px solid var(--dark2);}
  .footer-grid { display: grid; grid-template-columns: 1.6fr 1fr 1fr 1.6fr; gap: 50px; padding-bottom: 60px; border-bottom: 1px solid var(--dark2); }
  @media (max-width: 991px) { .footer-grid { grid-template-columns: 1fr 1fr; } }
  @media (max-width: 575px) { .footer-grid { grid-template-columns: 1fr; } }
  .footer-brand-desc { color: var(--gray); font-size: 14px; line-height: 1.75; margin: 16px 0 24px; max-width: 280px; }
  .footer-social { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 24px;}
  .footer-social-link { width: 40px; height: 40px; border-radius: 50%; border: 1px solid var(--gray3); color: var(--gray); display: flex; align-items: center; justify-content: center; font-size: 15px; transition: var(--transition); }
  .footer-social-link:hover { background: var(--primary); border-color: var(--primary); color: var(--white); }
  .footer-col-title { font-size: 15px; font-weight: 600; color: var(--white); margin-bottom: 22px; }
  .footer-link { display: block; color: gray; font-size: 14px; margin-bottom: 14px; transition: var(--transition); }
  .footer-newsletter-form { display: flex; gap: 10px; margin-top: 16px;}
  .footer-input { flex: 1; background: var(--dark2); border: 1px solid var(--dark2); border-radius: 10px; padding: 10px 16px; color: var(--white); font-size: 14px; outline: none; transition: border-color 0.3s; font-family: inherit; }
  .footer-input:focus { border-color: var(--primary); }
  .footer-input::placeholder { color: var(--gray); }
  .footer-bottom { display: flex; align-items: center; justify-content: space-between; gap: 20px; padding: 24px 0; flex-wrap: wrap; }
  .footer-copy { color: var(--gray); font-size: 13px; }
  .footer-bottom-links { display: flex; gap: 32px; }
  .footer-bottom-link { color: var(--gray); font-size: 13px; transition: var(--transition); }
  .footer-bottom-link:hover { color: var(--white); }
  .contact-item { display: flex; gap: 12px; align-items: flex-start; margin-bottom: 14px; }
  .contact-icon { width: 36px; height: 36px; border-radius: 8px; background: rgba(12,90,245,0.12); display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: var(--primary); font-size: 15px; }
  .contact-text { color: var(--gray); font-size: 13px; line-height: 1.5; }
  @media (max-width: 991px){ .footer-grid { grid-template-columns: 1fr 1fr; } }
  @media (max-width: 575px){.footer-grid { grid-template-columns: 1fr; } }

  /* Scroll-to-top */
  /*id="contact"*/
  .scroll-top {
    position: fixed; bottom: 32px; right: 20px;
    width: 44px; height: 44px; border-radius: 50%;
    background: var(--primary); color: var(--white);
    display: flex; align-items: center; justify-content: center;
    font-size: 18px; cursor: pointer; z-index: 98;
    opacity: 0; visibility: hidden; transform: translateY(16px);
    transition: all 0.4s ease; box-shadow: 0 4px 20px rgba(12,90,245,0.4);
    border: none;
  }
  .scroll-top.visible { opacity: 1; visibility: visible; transform: translateY(0); }
  .scroll-top:hover { transform: translateY(-4px); }

  /* Intersection observer fade-in */
  .reveal { opacity: 0; transform: translateY(30px); transition: opacity 0.6s ease, transform 0.6s ease; }
  .reveal.in-view { opacity: 1; transform: translateY(0); }
  .reveal-delay-1 { transition-delay: 0.1s; }
  .reveal-delay-2 { transition-delay: 0.2s; }
  .reveal-delay-3 { transition-delay: 0.3s; }
  .reveal-delay-4 { transition-delay: 0.4s; }

  /* Two-col layout */
  .two-col {display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
  @media (max-width: 991px) {.two-col { grid-template-columns: 1fr; } }

  /* Responsive helpers */
  @media (max-width: 767px) {
    .hero-btns { flex-direction: column; }
    .hero-btns .btn { width: 100%; justify-content: center; }
    .footer-newsletter-form { flex-direction: column; }
    .footer-bottom { flex-direction: column; text-align: center; }
    .footer-bottom-links { flex-wrap: wrap; justify-content: center; }
  }
    img {
  max-width: 100%;
  height: auto;
}

section {
  width: 100%;
  overflow-x: hidden;
}

body {
  overflow-x: hidden;
}

/*         PORTFOLIO GRID        */

.portfolio-section {
  background: var(--body-bg2);
}

.portfolio-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 50px;
  flex-wrap: wrap;
  gap: 20px;
}
  .portfolio-section .sub {
  margin-left: auto;
  margin-right: auto;
}

.portfolio-search-wrapper {
  display: flex;
  gap: 12px;
  align-items: center;
}

.portfolio-search-btn {
  height: 44px;
}

/* Search */

.portfolio-search {
  background: var(--secondary);
  border: 1px solid var(--dark2);
  padding: 12px 18px;
  border-radius: 12px;
  color: var(--white);
  width: 280px;
  font-size: 14px;
  transition: var(--transition);
}

.portfolio-search:focus {
  outline: none;
  border-color: var(--primary);
}

/* Filters */

.portfolio-filters {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 8px 18px;
  border-radius: 100px;
  background: var(--secondary);
  border: 1px solid var(--dark2);
  color: var(--gray);
  font-size: 13px;
  cursor: pointer;
  transition: var(--transition);
}

.filter-btn.active,
.filter-btn:hover {
  background: var(--primary);
  color: var(--white);
  border-color: var(--primary);
}

/* Grid Layout */

.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
}
@media (max-width: 991px) {.portfolio-section { padding-top: 110px; } }
// .hero-content { text-align: center; } .hero-btns { justify-content: center; } 
/* Card */

.project-card {
  background: var(--secondary);
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.06);
  transition: 0.4s ease;
  display: flex;
  flex-direction: column;
}

.project-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 30px 60px rgba(0,0,0,0.6);
  border-color: var(--primary);
}

/* Top Gradient Area */

.project-card-top {
  height: 170px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  text-align: center;
  background: linear-gradient(
    135deg,
    rgba(12,90,245,0.9),
    rgba(0,200,255,0.8)
  );
}

.project-card-top h3 {
  font-size: 24px;
  font-weight: 700;
  color: var(--white);
}

/* Card Body */

.project-card-body {
  padding: 24px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.project-card-body h4 {
  font-size: 16px;
  margin-bottom: 10px;
}

.project-card-body p {
  font-size: 14px;
  color: var(--gray);
  line-height: 1.6;
  margin-bottom: 20px;
  flex-grow: 1;
}

.project-link {
  color: var(--primary);
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: var(--transition);
}

.project-link:hover {
  color: var(--white);
}

/* Responsive */

@media (max-width: 768px) {
  .portfolio-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .portfolio-grid {
    grid-template-columns: 1fr;
  }

  .portfolio-controls {
    flex-direction: column;
    align-items: flex-start;
  }

  .portfolio-search {
    width: 100%;
  }
}
  /* Empty State */

.portfolio-empty {
  grid-column: 1 / -1; /* span full grid */
  text-align: center;
  padding: 80px 0;
  border: 1px dashed var(--dark2);
  border-radius: 20px;
  background: var(--secondary);
}

.portfolio-empty h4 {
  font-size: 20px;
  margin-bottom: 10px;
}

.portfolio-empty p {
  color: var(--gray);
  font-size: 14px;
}

/* ================= QUERY FORM ================= */

.query-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.query-card {
  width: 100%;
  max-width: 720px;
  background: var(--secondary);
  border-radius: 20px;
  padding: 50px 40px;
  border: 1px solid var(--dark2);
  box-shadow: 0 30px 60px rgba(0,0,0,0.4);
  transition: var(--transition);
}

.query-card:hover {
  border-color: rgba(12,90,245,0.4);
}

.query-title {
  text-align: center;
  margin-bottom: 40px;
  font-size: 32px;
}

.query-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  width: 100%;
}

.form-input {
  width: 100%;
  background: var(--dark2);
  border: 1px solid var(--dark2);
  border-radius: 12px;
  padding: 14px 18px;
  color: var(--white);
  font-size: 14px;
  transition: var(--transition);
  font-family: var(--font-body);
}

.form-input:focus {
  outline: none;
  border-color: var(--primary);
  background: var(--secondary);
}

.form-input::placeholder {
  color: var(--gray);
}

/* ================= SUCCESS MODAL ================= */

.success-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.7);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99999;
}

.success-modal {
  background: var(--secondary);
  border-radius: 20px;
  padding: 40px;
  max-width: 500px;
  width: 90%;
  text-align: center;
  border: 1px solid rgba(12,90,245,0.4);
  box-shadow: 0 40px 80px rgba(0,0,0,0.6);
}

.success-modal h3 {
  margin-bottom: 16px;
}

.success-modal p {
  color: var(--gray);
  margin-bottom: 30px;
}
  .service-card {
  background: linear-gradient(145deg, #0f172a, #111827);
  border: 1px solid rgba(255,255,255,0.06);
  padding: 40px;
  border-radius: 24px;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(20px);
}

.service-card:hover {
  transform: translateY(-12px);
  box-shadow: 0 40px 120px rgba(12,90,245,0.25);
}

.service-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.service-icon-wrapper {
  width: 64px;
  height: 64px;
  border-radius: 18px;
  background: rgba(12,90,245,0.15);
  display: flex;
  align-items: center;
  justify-content: center;
}

.coming-badge {
  background: linear-gradient(90deg,#0c5af5,#6a5af9);
  padding: 6px 14px;
  font-size: 11px;
  border-radius: 50px;
  font-weight: 600;
  letter-spacing: 0.08em;
}

.service-title {
  font-size: 22px;
  margin-bottom: 10px;
}

.service-desc {
  color: var(--gray);
  margin-bottom: 25px;
}
  .countdown {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  margin-bottom: 25px;
}

.time-box {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 14px;
  padding: 14px 18px;
  text-align: center;
  min-width: 0px;
  backdrop-filter: blur(10px);
}

.time-box span {
  font-size: 20px;
  font-weight: 700;
  display: block;
}
.time-box small {
  font-size: 11px;
  color: var(--gray);
  min-width:0;
  justify-content: center; 
  align-items: center;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  overflow: hidden;
  text-overflow: ellipsis;
}
  .progress-wrapper {
  width: 100%;
  height: 8px;
  background: rgba(255,255,255,0.05);
  border-radius: 50px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg,#0c5af5,#6a5af9);
  transition: width 1s ease;
  border-radius: 50px;
}
`;

function GlobalStyles() {
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = GLOBAL_CSS;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);
  return null;
}
export default GlobalStyles
