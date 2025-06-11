import {useRef, useEffect, useState} from 'react';
import {gsap} from 'gsap';
import {Typography} from 'antd';
import Banner from '../assets/banner.webp';
import {SplitText} from 'gsap/SplitText';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import './HeroBanner.css'

if (typeof window !== 'undefined') {
    gsap.registerPlugin(SplitText, ScrollTrigger);


    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

    if (isIOS) {

        ScrollTrigger.normalizeScroll(true);


        document.addEventListener('touchmove', (e) => {
            if (ScrollTrigger.isScrolling) {
                e.preventDefault();
            }
        }, {passive: false});
    }
}

const {Title} = Typography;


const useMediaQuery = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);

    useEffect(() => {

        if (typeof window !== 'undefined') {
            setIsMobile(window.innerWidth < 768);
            setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);

            const handleResize = () => {
                setIsMobile(window.innerWidth < 768);
                setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
            };

            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    }, []);

    return {isMobile, isTablet};
};

export const HeroBanner = () => {
    const heroRef = useRef(null);
    const headingRef = useRef(null);
    const subheadingRef = useRef(null);
    const ctaRef = useRef(null);
    const glowRef = useRef(null);
    const {isMobile, isTablet} = useMediaQuery();


    useEffect(() => {
        if (typeof window !== 'undefined') {
            gsap.to(window, {
                scrollTo: {
                    y: 0, autoKill: false
                }, duration: 0.1
            });
        }
    }, []);

    useEffect(() => {

        if (!heroRef.current || !headingRef.current || !subheadingRef.current) return;

        let splitHeading, splitSubheading;
        const ctx = gsap.context(() => {

            const initialYOffset = isMobile ? 30 : 50;
            const staggerAmount = isMobile ? 0.03 : 0.05;
            const animationDuration = isMobile ? 0.8 : 1;


            if (headingRef.current) {
                splitHeading = new SplitText(headingRef.current, {
                    type: 'chars,words,lines', linesClass: 'split-line',
                });
            }

            if (subheadingRef.current) {
                splitSubheading = new SplitText(subheadingRef.current, {
                    type: 'chars,words,lines', linesClass: 'split-line',
                });
            }


            const headingChars = splitHeading?.chars || [];
            const subheadingChars = splitSubheading?.chars || [];


            gsap.set([...headingChars, ...subheadingChars], {
                opacity: 0, y: initialYOffset, willChange: 'transform, opacity', backfaceVisibility: 'hidden'
            });


            gsap.set(heroRef.current, {
                willChange: 'transform', backfaceVisibility: 'hidden'
            });

            const tl = gsap.timeline({defaults: {ease: 'power3.out'}});

            tl.from(heroRef.current, {
                autoAlpha: 0, duration: 0.5, force3D: true
            })
                .from([...heroRef.current.querySelectorAll('h1, h2')], {
                    y: initialYOffset, stagger: 0.2, duration: animationDuration, force3D: true
                }, 0)
                .to(headingChars, {
                    opacity: 1, y: 0, stagger: staggerAmount, duration: 0.8, ease: 'back.out', force3D: true
                }, 0.5)
                .to(subheadingChars, {
                    opacity: 1, y: 0, stagger: staggerAmount, duration: 0.6, ease: 'power2.out', force3D: true
                }, 0.7);


            if (ctaRef.current) {
                gsap.set(ctaRef.current, {
                    willChange: 'transform, opacity', backfaceVisibility: 'hidden'
                });

                tl.from(ctaRef.current, {
                    opacity: 0, y: 30, duration: 1, force3D: true
                }, 1.2);
            }


            if (glowRef.current) {
                const glowSize = isMobile ? 200 : isTablet ? 300 : 400;

                gsap.set(glowRef.current, {
                    width: glowSize,
                    height: glowSize,
                    filter: isMobile ? 'blur(40px)' : 'blur(80px)',
                    willChange: 'transform, opacity',
                    backfaceVisibility: 'hidden'
                });


                gsap.to(glowRef.current, {
                    opacity: 0.4, duration: 1.5, repeat: -1, yoyo: true, ease: 'sine.inOut', force3D: true
                });
            }


            gsap.to(heroRef.current, {
                backgroundPosition: 'center 40%', ease: 'sine.inOut', duration: 6, repeat: -1, yoyo: true, force3D: true
            });


            setTimeout(() => {
                ScrollTrigger.refresh();
            }, 500);

        }, heroRef);

        return () => {
            ctx.revert();
            splitHeading?.revert?.();
            splitSubheading?.revert?.();
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, [isMobile, isTablet]);

    return (<div
            ref={heroRef}
            style={{
                height: isMobile ? '90vh' : '100vh',
                minHeight: isMobile ? '600px' : '700px',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.9)), url(${Banner})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                color: 'white',
                textAlign: 'center',
                padding: isMobile ? '16px' : '24px',


                willChange: 'transform'
            }}
        >
            {/* 背景光暈 */}
            <div
                ref={glowRef}
                style={{
                    position: 'absolute',
                    top: '40%',
                    left: '50%',
                    background: 'radial-gradient(circle, rgba(255,255,255,0.3), transparent 60%)',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 0,
                    pointerEvents: 'none',
                    opacity: 0.2,
                }}
            />
            <div style={{transform: 'translateY(-30%)'}}>
                <Title
                    ref={headingRef}
                    level={1}
                    className="title"
                >
                    冰霧<span className="special-text">Eisnebel</span>
                </Title>
                <div
                    ref={subheadingRef}
                    level={2}
                    className="subtitle"
                >
                    2025 生日冰箱
                </div>
            </div>
        </div>);
};