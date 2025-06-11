import {Typography, Card, List, Button, Divider} from 'antd';
import {TwitterOutlined, MessageOutlined} from '@ant-design/icons';
import {useRef, useEffect, useState} from 'react';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

const {Title, Text, Link} = Typography;

export const Footer = () => {
    const sectionRef = useRef();
    const titleRef = useRef();
    const contentRefs = useRef([]);
    const [isMounted, setIsMounted] = useState(false);


    useEffect(() => {
        setIsMounted(true);
    }, []);


    useEffect(() => {
        if (!isMounted || typeof window === 'undefined') return;


        gsap.registerPlugin(ScrollTrigger);


        const isMobile = window.matchMedia('(max-width: 768px)').matches;
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);


        if (isMobile) {
            ScrollTrigger.config({
                limitCallbacks: true,
                ignoreMobileResize: true,
            });

            if (isIOS) {
                ScrollTrigger.normalizeScroll(true);
            }
        }


        const initAnimations = () => {

            if (!sectionRef.current) {
                // console.warn('Section ref not found, retrying...');
                return null;
            }

            const ctx = gsap.context(() => {

                const startOffset = isMobile ? "top 90%" : "top 85%";
                const yOffset = isMobile ? 20 : 15;
                const duration = isMobile ? 0.5 : 0.7;


                ScrollTrigger.defaults({
                    markers: false
                });


                if (titleRef.current) {
                    gsap.fromTo(titleRef.current,
                        {
                            opacity: 0,
                            y: yOffset,
                        },
                        {
                            opacity: 1,
                            y: 0,
                            duration: duration,
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: sectionRef.current,
                                start: startOffset,
                                toggleActions: "play none none none",
                                once: true,
                                refreshPriority: -1,
                                // onToggle: (self) => {
                                // console.log('Title animation triggered:', self.isActive);
                                // }
                            }
                        }
                    );
                }


                contentRefs.current.forEach((ref, i) => {
                    if (ref) {
                        gsap.fromTo(ref,
                            {
                                opacity: 0,
                                y: yOffset + 10,
                            },
                            {
                                opacity: 1,
                                y: 0,
                                duration: duration - 0.1,
                                delay: 0.1 * (i + 1),
                                ease: "power2.out",
                                scrollTrigger: {
                                    trigger: sectionRef.current,
                                    start: startOffset,
                                    toggleActions: "play none none none",
                                    once: true,
                                    refreshPriority: -1,
                                    // onToggle: (self) => {
                                    // console.log(`Content ${i} animation triggered:`, self.isActive);
                                    // }
                                }
                            }
                        );
                    }
                });

            }, sectionRef);

            return ctx;
        };


        let animationFrameId;
        let ctx;

        const startAnimation = () => {
            ctx = initAnimations();

            if (!ctx) {

                animationFrameId = requestAnimationFrame(() => {
                    setTimeout(startAnimation, 50);
                });
                return;
            }


            if (isMobile) {
                setTimeout(() => {
                    ScrollTrigger.refresh();
                }, 100);
            }
        };


        const timeoutId = setTimeout(startAnimation, 100);

        return () => {

            clearTimeout(timeoutId);
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }


            if (ctx) {
                ctx.revert();
            }


            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            ScrollTrigger.clearMatchMedia();
        };
    }, [isMounted]);


    useEffect(() => {
        if (!isMounted) return;


        const handleRefresh = () => {
            // console.log('ScrollTrigger refreshed');
        };

        ScrollTrigger.addEventListener('refresh', handleRefresh);

        return () => {
            ScrollTrigger.removeEventListener('refresh', handleRefresh);
        };
    }, [isMounted]);

    const addContentRef = (el) => {
        if (el && !contentRefs.current.includes(el)) {
            contentRefs.current.push(el);
        }
    };


    if (!isMounted) {
        return (
            <div
                style={{
                    backgroundColor: '#f5f5f5',
                    borderTop: '1px solid #d9d9d9',
                    padding: '48px 24px',
                    margin: '0 auto'
                }}
            >
                <div style={{maxWidth: '1200px', margin: '0 auto'}}>
                    <Title level={4} style={{textAlign: 'center', marginBottom: '24px', fontWeight: 500}}>
                        未來冰淇淋販売所
                    </Title>

                </div>
            </div>
        );
    }

    return (
        <div
            ref={sectionRef}
            style={{
                willChange: 'transform, opacity',
                backgroundColor: '#f5f5f5',
                borderTop: '1px solid #d9d9d9',
                padding: '48px 24px',
                margin: '0 auto'
            }}
        >
            <div style={{maxWidth: '1200px', margin: '0 auto'}}>

                <Title
                    ref={titleRef}
                    level={4}
                    style={{
                        textAlign: 'center',
                        marginBottom: '24px',
                        fontWeight: 500,
                        willChange: 'transform, opacity'
                    }}
                >
                    未來冰淇淋販売所
                </Title>


                <div
                    ref={addContentRef}
                    style={{
                        textAlign: 'center',
                        marginBottom: '32px',
                        willChange: 'transform, opacity'
                    }}
                >
                    <Link
                        href="https://twitter.com/Mirai_ICE_Dept"
                        target="_blank"
                        rel="noopener"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            color: '#262626'
                        }}
                    >
                        <TwitterOutlined style={{marginRight: '8px'}}/>
                        @Mirai_ICE_Dept
                    </Link>
                    <Text
                        type="secondary"
                        style={{
                            display: 'block',
                            marginTop: '16px',
                            lineHeight: '1.5'
                        }}
                    >
                        本帳號為冰淇淋創建之非官方推特<br/>
                        僅作為企劃公告與紀錄/分享冰淇淋們的日常活動
                    </Text>
                </div>


                <Card
                    ref={addContentRef}
                    title="特別聲明"
                    style={{
                        marginBottom: '32px',
                        willChange: 'transform, opacity',
                        boxShadow: 'none',
                        border: '1px solid #d9d9d9'
                    }}
                    styles={{
                        header: {
                            borderBottom: '1px solid #d9d9d9',
                            fontWeight: 'normal'
                        },
                        body: {
                            padding: '24px'
                        }
                    }}
                >
                    <List
                        size="small"
                        dataSource={[
                            "1. 本帳號非春魚官方相關帳號",
                            "2. 本帳號非冰霧授權經營",
                            "3. 帳號由非官方粉絲群管理人員所經營",
                            "4. 發表之貼文皆不代表春魚官方與旗下藝人之立場"
                        ]}
                        renderItem={(item) => <List.Item>{item}</List.Item>}
                    />
                </Card>


                <div
                    ref={addContentRef}
                    style={{
                        textAlign: 'center',
                        willChange: 'transform, opacity'
                    }}
                >
                    <Text strong style={{display: 'block', marginBottom: '8px'}}>
                        冰霧非官方粉絲群:
                    </Text>
                    <Button
                        href="https://discord.gg/DQ4DNZAKGC"
                        target="_blank"
                        icon={<MessageOutlined/>}
                        type="text"
                        style={{
                            padding: 0,
                            height: 'auto',
                            color: '#262626'
                        }}
                    >
                        https://discord.gg/DQ4DNZAKGC
                    </Button>
                </div>
            </div>
        </div>
    );
};