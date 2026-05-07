import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const ScrollExpandMedia = ({
    mediaType = 'image',
    mediaSrc,
    posterSrc,
    bgImageSrc,
    title,
    date,
    scrollToExpand,
    textBlend,
    children,
}) => {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [childrenVisible, setChildrenVisible] = useState(false); // ← NEW
    const childrenRef = useRef(null); // ← NEW
    const wrapperRef = useRef(null);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (!wrapperRef.current) return;
            const rect = wrapperRef.current.getBoundingClientRect();
            const wrapperHeight = wrapperRef.current.offsetHeight;
            const viewportHeight = window.innerHeight;
            const scrolled = -rect.top;
            const total = wrapperHeight - viewportHeight;
            const progress = Math.min(Math.max(scrolled / total, 0), 1);
            setScrollProgress(progress);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // ── NEW: IntersectionObserver to trigger children animation ──
    useEffect(() => {
        if (!childrenRef.current) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setChildrenVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.15 }
        );
        observer.observe(childrenRef.current);
        return () => observer.disconnect();
    }, []);

    const startW = isMobile ? 280 : 340;
    const startH = isMobile ? 200 : 260;
    const vw = typeof window !== 'undefined' ? window.innerWidth : 1440;
    const vh = typeof window !== 'undefined' ? window.innerHeight : 900;
    const endW = vw * (isMobile ? 0.96 : 0.98);
    const endH = vh * (isMobile ? 0.78 : 0.90);

    const cardW = startW + scrollProgress * (endW - startW);
    const cardH = startH + scrollProgress * (endH - startH);
    const borderR = Math.max(4, 20 - scrollProgress * 18);
    const textTranslateX = scrollProgress * (isMobile ? 100 : 150);
    const textOpacity = Math.max(0, 1 - scrollProgress * 2.5);

    const firstWord = title ? title.split(' ')[0] : '';
    const restOfTitle = title ? title.split(' ').slice(1).join(' ') : '';

    return (
        <>
            {/* ── Split text animation keyframes ── */}
            <style>{`
                @keyframes sem-word-up {
                    from { transform: translateY(110%); opacity: 0; }
                    to   { transform: translateY(0);    opacity: 1; }
                }
                .sem-word {
                    display: inline-block;
                    overflow: hidden;
                    vertical-align: bottom;
                    margin-right: 0.25em;
                }
                .sem-word-inner {
                    display: inline-block;
                    transform: translateY(110%);
                    opacity: 0;
                    transition: none;
                }
                .sem-animate .sem-word-inner {
                    animation: sem-word-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
                }
                @keyframes sem-fade-up {
                    from { transform: translateY(20px); opacity: 0; }
                    to   { transform: translateY(0);    opacity: 1; }
                }
                .sem-fade {
                    opacity: 0;
                    transform: translateY(20px);
                }
                .sem-animate .sem-fade {
                    animation: sem-fade-up 0.65s cubic-bezier(0.22, 1, 0.36, 1) forwards;
                }
                    @media (max-width: 768px) {
 .sem-word {
    display: inline-flex;
    overflow: hidden;
    vertical-align: bottom;
    white-space: nowrap;
}

  .sem-word-inner {
    will-change: transform, opacity;
  }
}
            `}</style>

            {/* ── Tall scroll wrapper: 250vh gives animation room ── */}
            <div ref={wrapperRef} style={{ height: '250vh', position: 'relative' }}>

                {/* ── Sticky viewport: stays fixed while parent scrolls ── */}
                <div style={{
                    position: 'sticky',
                    top: 0,
                    height: '100vh',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>

                    {/* Background — fades out as card expands */}
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        zIndex: 0,
                        opacity: Math.max(0, 1 - scrollProgress * 2),
                    }}>
                        <img
                            src={bgImageSrc}
                            alt=""
                            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        />
                        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.25)' }} />
                    </div>

                    {/* Expanding media card */}
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: `${cardW}px`,
                        height: `${cardH}px`,
                        maxWidth: '98vw',
                        maxHeight: '92vh',
                        borderRadius: `${borderR}px`,
                        overflow: 'hidden',
                        boxShadow: `0 ${Math.round(8 - scrollProgress * 8)}px ${Math.round(40 - scrollProgress * 35)}px rgba(0,0,0,0.4)`,
                        zIndex: 1,
                        willChange: 'width, height, border-radius',
                    }}>
                        {mediaType === 'video' ? (
                            mediaSrc && mediaSrc.includes('youtube.com') ? (
                                <div style={{ position: 'relative', width: '100%', height: '100%', pointerEvents: 'none' }}>
                                    <iframe
                                        width="100%" height="100%"
                                        src={
                                            mediaSrc.includes('embed')
                                                ? mediaSrc + (mediaSrc.includes('?') ? '&' : '?') + 'autoplay=1&mute=1&loop=1&controls=0&rel=0&modestbranding=1'
                                                : mediaSrc.replace('watch?v=', 'embed/') + '?autoplay=1&mute=1&loop=1&controls=0&rel=0&modestbranding=1&playlist=' + mediaSrc.split('v=')[1]
                                        }
                                        style={{ width: '100%', height: '100%', border: 'none' }}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                    <div style={{
                                        position: 'absolute', inset: 0,
                                        background: 'rgba(0,0,0,0.35)',
                                        opacity: Math.max(0, 0.6 - scrollProgress * 0.7),
                                        pointerEvents: 'none',
                                    }} />
                                </div>
                            ) : (
                                <div style={{ position: 'relative', width: '100%', height: '100%', pointerEvents: 'none' }}>
                                    <video
                                        src={mediaSrc} poster={posterSrc}
                                        autoPlay muted loop playsInline
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                                    />
                                    <div style={{
                                        position: 'absolute', inset: 0,
                                        background: 'rgba(0,0,0,0.35)',
                                        opacity: Math.max(0, 0.6 - scrollProgress * 0.7),
                                    }} />
                                </div>
                            )
                        ) : (
                            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                                <img
                                    src={mediaSrc}
                                    alt={title || ''}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                                />
                                <div style={{
                                    position: 'absolute', inset: 0,
                                    background: 'rgba(0,0,0,0.45)',
                                    opacity: Math.max(0, 0.8 - scrollProgress * 0.9),
                                }} />
                            </div>
                        )}
                    </div>

                    {/* Title — splits apart, fades as card expands */}
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 10,
                        pointerEvents: 'none',
                        gap: '0.5rem',
                        opacity: textOpacity,
                        mixBlendMode: textBlend ? 'difference' : 'normal',
                    }}>
                        <h2 style={{
                            fontSize: 'clamp(2rem, 6vw, 4.5rem)',
                            fontWeight: 700,
                            color: '#bfdbfe',
                            margin: 0,
                            textAlign: 'center',
                            transform: `translateX(-${textTranslateX}vw)`,
                            textShadow: '0 2px 20px rgba(0,0,0,0.6)',
                        }}>
                            {firstWord}
                        </h2>
                        <h2 style={{
                            fontSize: 'clamp(2rem, 6vw, 4.5rem)',
                            fontWeight: 700,
                            color: '#bfdbfe',
                            margin: 0,
                            textAlign: 'center',
                            transform: `translateX(${textTranslateX}vw)`,
                            textShadow: '0 2px 20px rgba(0,0,0,0.6)',
                        }}>
                            {restOfTitle}
                        </h2>
                    </div>

                    {/* Date & scroll cue */}
                    <div style={{
                        position: 'absolute',
                        bottom: '7%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 10,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '0.3rem',
                        opacity: textOpacity,
                        pointerEvents: 'none',
                        whiteSpace: 'nowrap',
                    }}>
                        {date && (
                            <p style={{ fontSize: '1.1rem', color: '#bfdbfe', margin: 0, letterSpacing: '0.05em' }}>
                                {date}
                            </p>
                        )}
                        {scrollToExpand && (
                            <p style={{ fontSize: '0.85rem', color: '#93c5fd', margin: 0, fontWeight: 500 }}>
                                {scrollToExpand}
                            </p>
                        )}
                    </div>

                </div>{/* end sticky */}
            </div>{/* end tall wrapper */}

            {/* ── Children render HERE — with split text animation ── */}
            {children && (
                <div
                    ref={childrenRef}
                    className={childrenVisible ? 'sem-animate' : ''}
                    style={{ width: '100%' }}
                >
                    {children}
                </div>
            )}
        </>
    );
};

export default ScrollExpandMedia;