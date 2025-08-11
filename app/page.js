'use client';
/**
 * Landing page composing all sections and managing shared state.
 */
import Head from 'next/head';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Work from '@/components/Work';
import About from '@/components/About';
import Services from '@/components/Services';
import QuoteForm from '@/components/QuoteForm';
import Footer from '@/components/Footer';
import Lightbox from '@/components/Lightbox';
import Toast from '@/components/Toast';
import { getInitialDark } from '@/lib/theme';

export default function Page() {
  const [dark, setDark] = useState(getInitialDark);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lightbox, setLightbox] = useState(null);
  const [toast, setToast] = useState(null);
  const [heroPaused, setHeroPaused] = useState(false);
  const videoRef = useRef(null);
  const [ts] = useState(() => Date.now());

  useEffect(() => {
    try {
      const root = document.documentElement;
      if (dark) root.classList.add('dark');
      else root.classList.remove('dark');
      localStorage.setItem('theme', dark ? 'dark' : 'light');
    } catch {}
  }, [dark]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (document.getElementById('recaptcha-script')) return;
    const key = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    if (!key) return;
    const s = document.createElement('script');
    s.id = 'recaptcha-script';
    s.src = `https://www.google.com/recaptcha/api.js?render=${key}`;
    s.async = true;
    document.body.appendChild(s);
  }, []);

  const videos = useMemo(
    () => [
      { title: 'Showreel 2025', src: '/hero-video-festival.mp4' },
      { title: 'Commercial: Coastal Resort', src: '/hero-video-street.mp4' },
    ],
    []
  );

  const images = useMemo(
    () => [
      { src: 'https://images.unsplash.com/photo-1473186505569-9c61870c11f9?q=80&w=1600&auto=format&fit=crop', alt: 'Aerial city dusk' },
      { src: 'https://images.unsplash.com/photo-1470058869958-2a77ade41c02?q=80&w=1600&auto=format&fit=crop', alt: 'Coastal cliffs' },
      { src: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop', alt: 'Mountains' },
      { src: 'https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1600&auto=format&fit=crop', alt: 'Forest road' },
      { src: 'https://images.unsplash.com/photo-1451188502541-13943edb6acb?q=80&w=1600&auto=format&fit=crop', alt: 'Waterfalls' },
      { src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1600&auto=format&fit=crop', alt: 'Desert lines' },
    ],
    []
  );

  const hero = useMemo(() => ({ src: '/hero-bg-venice.mp4', poster: '/hero-poster.jpg' }), []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  const handleQuote = async e => {
    e.preventDefault();

    const formEl = e.currentTarget;
    const form = new FormData(formEl);
    const data = Object.fromEntries(form.entries());

    if (data.company) return;

    data.ts = ts;

    try {
      let token = '';
      const key = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

      if (key && typeof window !== 'undefined' && window.grecaptcha) {
        await new Promise(resolve => {
          window.grecaptcha.ready(resolve);
        });

        token = await window.grecaptcha.execute(key, { action: 'quote' });
      } else {
        throw new Error('reCAPTCHA not loaded');
      }

      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, token }),
      });

      const json = await res.json();
      if (!json.ok) throw new Error(json.error || 'Failed');

      if (formEl && typeof formEl.reset === 'function') formEl.reset();
      setToast('Thanks! I will get back to you within 24 hours.');
    } catch (err) {
      console.error(err);
      setToast('Sorry, something went wrong. Please email me directly.');
    }
  };

  const services = useMemo(
    () => [
      { name: 'Commercials', desc: 'Hero aerials for ads, branded content and social spots.', price: 3350 },
      { name: 'Real Estate', desc: 'Property exteriors, reveal shots, and photo sets for listings.', price: 1850 },
      { name: 'Events & Tourism', desc: 'Cinematic coverage for venues, festivals, and destinations.', price: 2600 },
    ],
    []
  );

  return (
    <>
      <Head>
        <script src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`} async defer></script>
      </Head>
      <div>
        <Header dark={dark} setDark={setDark} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
        <Hero hero={hero} videoRef={videoRef} heroPaused={heroPaused} setHeroPaused={setHeroPaused} />
        <Work videos={videos} images={images} setLightbox={setLightbox} />
        <About />
        <Services services={services} />
        <QuoteForm handleQuote={handleQuote} />
        <Footer />
        <Lightbox lightbox={lightbox} onClose={() => setLightbox(null)} />
        <Toast message={toast} />
      </div>
    </>
  );
}
