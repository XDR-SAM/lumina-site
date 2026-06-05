"use client";

import { useEffect, useRef } from "react";

const luminaHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Lumina — Studio</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
    rel="stylesheet"
  />
  <style>
    * { font-family: 'Inter', sans-serif; }
    html { scroll-behavior: auto; }
    body {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      overflow-x: hidden;
    }
    :root {
      --ink: #0a0a0a;
      --paper: #ffffff;
      --muted: #f5f5f5;
      --border: #e5e5e5;
    }
    body {
      background: var(--paper);
      color: var(--ink);
    }

    #loader {
      position: fixed;
      inset: 0;
      z-index: 99999;
      background: #000;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: opacity .7s cubic-bezier(.4,0,.2,1), visibility .7s;
    }
    #loader.hide {
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
    }
    .loader-inner {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 28px;
      color: #fff;
    }
    .loader-bar {
      width: 240px;
      height: 2px;
      background: rgba(255,255,255,.15);
      border-radius: 2px;
      overflow: hidden;
    }
    .loader-progress {
      height: 100%;
      background: #fff;
      width: 0%;
      border-radius: 2px;
      transition: width .25s linear;
    }
    .loader-label {
      font-size: 12px;
      letter-spacing: .35em;
      text-transform: uppercase;
      color: rgba(255,255,255,.6);
    }
    .grid-bg {
      position: fixed;
      inset: 0;
      background-image:
        linear-gradient(to right, #f1f1f1 1px, transparent 1px),
        linear-gradient(to bottom, #f1f1f1 1px, transparent 1px);
      background-size: 90px 90px;
      pointer-events: none;
      z-index: 0;
      opacity: .6;
    }
    nav {
      backdrop-filter: saturate(160%) blur(16px) brightness(1.1);
      -webkit-backdrop-filter: saturate(160%) blur(16px) brightness(1.1);
      background: rgba(255,255,255,.85);
      border-bottom: 1px solid rgba(0,0,0,.08);
      transform: translateY(0);
      transition: transform .6s cubic-bezier(.2,.8,.2,1), opacity .6s cubic-bezier(.2,.8,.2,1);
    }
    nav.hidden-nav {
      transform: translateY(-110%);
      opacity: 0;
      pointer-events: none;
    }
    nav::after {
      content: "";
      position: absolute;
      inset: 0 -100vw;
      background: linear-gradient(to bottom, rgba(0,0,0,.04), transparent);
      pointer-events: none;
    }
    .nav-link {
      position: relative;
      padding: .5rem 0;
      transition: color .3s;
    }
    .nav-link::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0%;
      height: 1.5px;
      background: #000;
      transition: width .45s cubic-bezier(.77,0,.18,1);
    }
    .nav-link:hover::after {
      width: 100%;
    }
    .feature-card {
      border: 1px solid var(--border);
      background: rgba(255,255,255,.75);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      transition: transform .5s cubic-bezier(.2,.8,.2,1), border-color .5s cubic-bezier(.2,.8,.2,1), box-shadow .5s cubic-bezier(.2,.8,.2,1);
      will-change: transform;
    }
    .feature-card:hover {
      transform: translateY(-10px);
      border-color: #000;
      box-shadow: 0 24px 60px rgba(0,0,0,.08);
    }
    .btn-black {
      background: #000;
      color: #fff;
      transition: transform .35s cubic-bezier(.34,1.56,.64,1), box-shadow .35s ease;
    }
    .btn-black:hover {
      transform: scale(1.06);
      box-shadow: 0 18px 45px rgba(0,0,0,.18);
    }
    .btn-black:active {
      transform: scale(0.96);
    }
    .btn-outline {
      border: 1px solid #000;
      transition: transform .3s ease, background .3s ease, color .3s ease;
    }
    .btn-outline:hover {
      transform: scale(1.05);
      background: #000;
      color: #fff;
    }
    section.scroll-section, .reveal {
      opacity: 0;
      transform: translateY(70px);
      transition: opacity 1.1s cubic-bezier(.2,.8,.2,1), transform 1.1s cubic-bezier(.2,.8,.2,1);
    }
    section.scroll-section.visible, .reveal.visible {
      opacity: 1;
      transform: translateY(0);
    }
    .hero-title {
      line-height: .95;
      letter-spacing: -.05em;
    }
    .form-input {
      border: 1px solid var(--border);
      background: rgba(255,255,255,.8);
      transition: border-color .3s, box-shadow .3s;
    }
    .form-input:focus {
      outline: none;
      border-color: #000;
      box-shadow: 0 0 0 4px rgba(0,0,0,.06);
    }
    @media (max-width: 640px) {
      .hero-title { font-size: 3.2rem; letter-spacing: -.035em; line-height: 1; }
      .grid-bg { background-size: 60px 60px; }
    }
  </style>
</head>
<body class="min-h-screen">
  <div id="loader" role="status" aria-live="polite" aria-label="Loading">
    <div class="loader-inner">
      <div style="font-weight:700;font-size:14px;letter-spacing:.3em;text-transform:uppercase;">Lumina</div>
      <div class="loader-bar"><div class="loader-progress" id="loader-progress"></div></div>
      <div class="loader-label">Loading experience</div>
    </div>
  </div>
  <div class="grid-bg" aria-hidden="true"></div>
  <nav id="navbar" role="navigation" aria-label="Main navigation">
    <div style="max-width:1800px;margin:0 auto;padding:20px 24px;display:flex;align-items:center;justify-content:space-between;">
      <a href="#hero" style="font-weight:700;font-size:16px;letter-spacing:-0.02em;">Lumina</a>
      <div style="display:none;align-items:center;gap:40px;font-size:15px;font-weight:500;color:#737373;" class="nav-desktop">
        <a href="#work" class="nav-link">Work</a>
        <a href="#services" class="nav-link">Services</a>
        <a href="#studio" class="nav-link">Studio</a>
        <a href="#contact" class="nav-link">Contact</a>
      </div>
      <a href="#contact" style="background:#000;color:#fff;padding:12px 24px;border-radius:9999px;font-size:13px;font-weight:700;">Start a project</a>
    </div>
  </nav>
  <main>
    <section id="hero" style="padding-top:160px;padding-bottom:120px;">
      <div style="max-width:1800px;margin:0 auto;padding:0 24px;">
        <div style="display:grid;grid-template-columns:repeat(12,1fr);gap:40px 80px;">
          <div style="grid-column:span 7;">
            <h1 class="hero-title" style="font-size:clamp(50px,7vw,120px);font-weight:900;">We design<br>digital products</h1>
          </div>
          <div style="grid-column:9 / span 4;padding-bottom:16px;">
            <p style="color:#737373;line-height:1.7;font-size:17px;">A minimal design and development studio building thoughtful products for brands and startups — with care for craft, motion, and long-term systems.</p>
            <div style="margin-top:32px;display:flex;flex-wrap:wrap;gap:16px;">
              <a href="#work" style="background:#000;color:#fff;padding:16px 32px;border-radius:9999px;font-size:13px;font-weight:700;">View work</a>
              <a href="#contact" style="border:1px solid #000;padding:16px 32px;border-radius:9999px;font-size:13px;font-weight:700;">Get in touch</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="work" style="padding:80px 0;" class="scroll-section">
      <div style="max-width:1800px;margin:0 auto;padding:0 24px;">
        <div style="display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:space-between;gap:24px;margin-bottom:80px;">
          <h2 style="font-size:clamp(30px,4vw,60px);font-weight:900;letter-spacing:-0.03em;">Selected work</h2>
          <span style="font-size:14px;color:#a3a3a3;padding-bottom:4px;">2019 — present</span>
        </div>
        <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:32px 40px;">
          <a href="#" class="feature-card" style="border-radius:32px;padding:28px 40px;display:block;">
            <div style="aspect-ratio:4/3;border-radius:16px;background:#f5f5f5;margin-bottom:32px;overflow:hidden;position:relative;">
              <div style="position:absolute;inset:0;background:radial-gradient(circle at 25% 30%, rgba(0,0,0,0.07), transparent 55%);"></div>
              <div style="position:absolute;inset:0;background:linear-gradient(to top right, rgba(245,245,245,0.4), transparent);"></div>
            </div>
            <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:16px;">
              <div>
                <h3 style="font-size:24px;font-weight:700;margin-bottom:8px;transition:transform .5s;">Sequence</h3>
                <p style="color:#737373;font-size:15px;">SaaS platform for product teams</p>
              </div>
              <span style="font-size:12px;font-weight:600;color:#a3a3a3;border:1px solid #e5e5e5;padding:6px 12px;border-radius:9999px;">2025</span>
            </div>
          </a>
          <a href="#" class="feature-card" style="border-radius:32px;padding:28px 40px;display:block;margin-top:80px;">
            <div style="aspect-ratio:4/3;border-radius:16px;background:#f5f5f5;margin-bottom:32px;overflow:hidden;position:relative;">
              <div style="position:absolute;inset:0;background:radial-gradient(circle at 65% 35%, rgba(0,0,0,0.07), transparent 55%);"></div>
              <div style="position:absolute;inset:0;background:linear-gradient(to bottom left, rgba(245,245,245,0.4), transparent);"></div>
            </div>
            <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:16px;">
              <div>
                <h3 style="font-size:24px;font-weight:700;margin-bottom:8px;transition:transform .5s;">Alma</h3>
                <p style="color:#737373;font-size:15px;">Financial wellness application</p>
              </div>
              <span style="font-size:12px;font-weight:600;color:#a3a3a3;border:1px solid #e5e5e5;padding:6px 12px;border-radius:9999px;">2025</span>
            </div>
          </a>
        </div>
      </div>
    </section>

    <section id="services" style="padding:80px 0;" class="scroll-section">
      <div style="max-width:1800px;margin:0 auto;padding:0 24px;">
        <h2 style="font-size:clamp(30px,4vw,60px);font-weight:900;letter-spacing:-0.03em;margin-bottom:80px;">Services</h2>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:32px 40px;">
          <div class="feature-card" style="border-radius:32px;padding:40px;">
            <div style="font-size:12px;font-weight:700;color:#a3a3a3;letter-spacing:.3em;margin-bottom:32px;">01</div>
            <h3 style="font-size:20px;font-weight:700;margin-bottom:16px;">Product Design</h3>
            <p style="color:#737373;line-height:1.7;font-size:15px;">End-to-end interfaces, design systems, and prototyping focused on clarity and craft.</p>
          </div>
          <div class="feature-card" style="border-radius:32px;padding:40px;">
            <div style="font-size:12px;font-weight:700;color:#a3a3a3;letter-spacing:.3em;margin-bottom:32px;">02</div>
            <h3 style="font-size:20px;font-weight:700;margin-bottom:16px;">Development</h3>
            <p style="color:#737373;line-height:1.7;font-size:15px;">Robust web apps with React, Next.js, and Node — shipped with real performance budgets.</p>
          </div>
          <div class="feature-card" style="border-radius:32px;padding:40px;">
            <div style="font-size:12px;font-weight:700;color:#a3a3a3;letter-spacing:.3em;margin-bottom:32px;">03</div>
            <h3 style="font-size:20px;font-weight:700;margin-bottom:16px;">Motion</h3>
            <p style="color:#737373;line-height:1.7;font-size:15px;">Subtle, purposeful animation to connect states in a coherent, lightweight experience.</p>
          </div>
        </div>
      </div>
    </section>

    <section id="studio" style="padding:80px 0;" class="scroll-section">
      <div style="max-width:1800px;margin:0 auto;padding:0 24px;">
        <div style="display:grid;grid-template-columns:repeat(12,1fr);gap:48px 80px;align-items:center;">
          <div style="grid-column:span 5;">
            <h2 style="font-size:clamp(30px,4vw,60px);font-weight:900;letter-spacing:-0.03em;line-height:1.05;margin-bottom:32px;">A small studio with high craft standards</h2>
            <p style="color:#737373;line-height:1.7;font-size:15px;margin-bottom:40px;">
              We work quietly with founders and product leads to raise the visual and interaction quality of their products. Small engagements, tight feedback loops.
            </p>
            <a href="#contact" style="background:#000;color:#fff;padding:16px 32px;border-radius:9999px;font-size:13px;font-weight:700;display:inline-flex;">Say hello</a>
          </div>
          <div style="grid-column:span 7;">
            <div class="feature-card" style="border-radius:32px;padding:32px 40px;">
              <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:32px 48px;">
                <div>
                  <div style="font-size:12px;font-weight:700;color:#a3a3a3;letter-spacing:.3em;margin-bottom:12px;">Based in</div>
                  <div style="font-weight:700;font-size:18px;">Stockholm / Remote</div>
                </div>
                <div>
                  <div style="font-size:12px;font-weight:700;color:#a3a3a3;letter-spacing:.3em;margin-bottom:12px;">Currently</div>
                  <div style="font-weight:700;font-size:18px;">Available for Q3</div>
                </div>
                <div>
                  <div style="font-size:12px;font-weight:700;color:#a3a3a3;letter-spacing:.3em;margin-bottom:12px;">Since</div>
                  <div style="font-weight:700;font-size:18px;">2019</div>
                </div>
                <div>
                  <div style="font-size:12px;font-weight:700;color:#a3a3a3;letter-spacing:.3em;margin-bottom:12px;">Clientele</div>
                  <div style="font-weight:700;font-size:18px;">Startups & brands</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="contact" style="padding:80px 0;" class="scroll-section">
      <div style="max-width:1800px;margin:0 auto;padding:0 24px;">
        <div class="feature-card" style="border-radius:32px;padding:48px 56px;">
          <div style="display:grid;grid-template-columns:repeat(12,1fr);gap:40px 64px;">
            <div style="grid-column:span 5;">
              <h2 style="font-size:clamp(30px,4vw,60px);font-weight:900;letter-spacing:-0.03em;line-height:1.05;margin-bottom:20px;">Let's build something together</h2>
              <p style="color:#737373;line-height:1.7;font-size:15px;">Tell us about your timeline and what you're working on.</p>
            </div>
            <div style="grid-column:7 / span 6;display:flex;flex-direction:column;gap:20px;">
              <input id="name" type="text" placeholder="Name" style="width:100%;border-radius:16px;border:1px solid var(--border);background:rgba(255,255,255,.8);padding:18px 24px;font-size:15px;" autocomplete="name" required />
              <input id="email" type="email" placeholder="Email" style="width:100%;border-radius:16px;border:1px solid var(--border);background:rgba(255,255,255,.8);padding:18px 24px;font-size:15px;" autocomplete="email" required />
              <textarea id="message" rows="5" placeholder="Message" style="width:100%;border-radius:16px;border:1px solid var(--border);background:rgba(255,255,255,.8);padding:18px 24px;font-size:15px;"></textarea>
              <div>
                <button type="submit" style="background:#000;color:#fff;padding:16px 36px;border-radius:9999px;font-size:13px;font-weight:700;">Send message</button>
                <p style="font-size:12px;color:#a3a3a3;margin-top:12px;">We'll reply within 24 hours.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <footer style="padding:40px 0;border-top:1px solid #e5e5e5;">
      <div style="max-width:1800px;margin:0 auto;padding:0 24px;display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:16px;">
        <div style="font-weight:700;font-size:16px;">Lumina</div>
        <div style="font-size:14px;color:#a3a3a3;">Lumina Studio</div>
        <a href="mailto:hello@lumina.studio" style="font-size:14px;color:#737373;">hello@lumina.studio</a>
      </div>
    </footer>
  </main>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"><\/script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"><\/script>
  <script src="https://unpkg.com/lenis@1.1.9/dist/lenis.min.js"><\/script>
  <script>
    (function() {
      const loader = document.getElementById('loader');
      const progress = document.getElementById('loader-progress');
      let v = 0;
      const tick = setInterval(() => {
        v += Math.random() * 20 + 5;
        if (v > 95) v = 95;
        progress.style.width = v + '%';
      }, 200);
      window.addEventListener('load', () => {
        clearInterval(tick);
        progress.style.width = '100%';
        setTimeout(() => loader.classList.add('hide'), 420);
        loader.addEventListener('transitionend', () => loader.remove(), { once: true });
      });
      if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
      }
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        lerp: 0.08,
        smoothWheel: true,
        touchMultiplier: 1.4,
      });
      function raf(time) {
        if (typeof lenis !== 'undefined') lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
      if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined' && typeof lenis !== 'undefined') {
        lenis.on('scroll', ScrollTrigger.update);
        if (typeof gsap.ticker !== 'undefined') {
          gsap.ticker.add((time) => lenis.raf(time * 1000));
          gsap.ticker.lagSmoothing(0);
        }
      }
      const navbar = document.getElementById('navbar');
      let lastScroll = 0;
      if (typeof lenis !== 'undefined') {
        lenis.on('scroll', ({ scroll }) => {
          if (scroll > 90 && scroll > lastScroll + 4) navbar.classList.add('hidden-nav');
          else if (scroll < lastScroll - 2) navbar.classList.remove('hidden-nav');
          if (scroll < 40) navbar.classList.remove('hidden-nav');
          lastScroll = scroll;
        });
      }
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (e) => {
          e.preventDefault();
          const target = document.querySelector(anchor.getAttribute('href'));
          if (target && typeof lenis !== 'undefined') lenis.scrollTo(target, { offset: -80, duration: 1.3 });
        });
      });
      document.querySelectorAll('.feature-card').forEach((card) => {
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;
          if (typeof gsap !== 'undefined') {
            gsap.to(card, { rotateX: y * -5, rotateY: x * 5, duration: .45, ease: 'power2.out', transformPerspective: 900, transformOrigin: 'center center' });
          }
        });
        card.addEventListener('mouseleave', () => {
          if (typeof gsap !== 'undefined') {
            gsap.to(card, { rotateX: 0, rotateY: 0, duration: .75, ease: 'elastic.out(1, .6)' });
          }
        });
      });
      setTimeout(() => { if (loader && !loader.classList.contains('hide')) loader.classList.add('hide'); }, 4000);
    })();
  <\/script>
</body>
</html>
`;

export interface LuminaProps {
  title?: string;
  className?: string;
}

export default function Lumina({ title = "Lumina — Studio", className = "" }: LuminaProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let frame: HTMLIFrameElement | null = null;

    frame = document.createElement("iframe");
    frame.sandbox = "allow-scripts allow-same-origin";
    frame.setAttribute("title", title);
    frame.style.cssText = "width:100%;min-height:100vh;border:none;";
    frame.className = className;

    frame.addEventListener("load", () => {
      try {
        const doc = frame.contentDocument || frame.contentWindow?.document;
        if (!doc) return;
        doc.body.style.margin = "0";
        doc.documentElement.style.scrollBehavior = "auto";
      } catch (err) {
        console.warn("Lumina iframe init error", err);
      }
    });

    container.innerHTML = "";
    container.appendChild(frame);

    return () => {
      if (frame && frame.parentNode) {
        frame.parentNode.removeChild(frame);
      }
    };
  }, [title, className]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: "relative",
        width: "100%",
        isolation: "isolate",
      }}
    />
  );
}
