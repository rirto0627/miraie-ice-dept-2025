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

    // 確保只在客戶端執行
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // GSAP animation initialization
    useEffect(() => {
        if (!isMounted || typeof window === 'undefined') return;

        // 註冊ScrollTrigger插件
        gsap.registerPlugin(ScrollTrigger);

        // 檢測移動設備
        const isMobile = window.matchMedia('(max-width: 768px)').matches;
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

        // 移動設備專用配置
        if (isMobile) {
            // ScrollTrigger移動設備配置
            ScrollTrigger.config({
                limitCallbacks: true,
                ignoreMobileResize: true, // 忽略移動設備resize
            });

            // iOS特殊處理
            if (isIOS) {
                ScrollTrigger.normalizeScroll(true);
            }
        }

        // 等待DOM完全加載後初始化動畫
        const initAnimations = () => {
            const ctx = gsap.context(() => {
                // 根據設備類型調整動畫參數
                const startOffset = isMobile ? "top 90%" : "top 85%";
                const yOffset = isMobile ? 20 : 15;
                const duration = isMobile ? 0.5 : 0.7;

                // 移除調試標記
                ScrollTrigger.defaults({
                    markers: false
                });

                // 標題動畫
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
                                once: true, // 只播放一次，不會反向
                                refreshPriority: -1,

                            }
                        }
                    );
                }

                // 內容動畫
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
                                    once: true, // 只播放一次，不會反向
                                    refreshPriority: -1,

                                }
                            }
                        );
                    }
                });

                // 移動設備特殊處理
                if (isMobile) {
                    // 延遲刷新確保正確計算
                    setTimeout(() => {
                        ScrollTrigger.refresh();
                    }, 100);

                    // 監聽滾動事件來手動觸發刷新
                    let scrollTimeout;
                    const handleScroll = () => {
                        clearTimeout(scrollTimeout);
                        scrollTimeout = setTimeout(() => {
                            ScrollTrigger.refresh();
                        }, 150);
                    };

                    window.addEventListener('scroll', handleScroll, { passive: true });

                    return () => {
                        window.removeEventListener('scroll', handleScroll);
                        clearTimeout(scrollTimeout);
                    };
                }
            }, sectionRef);

            return ctx;
        };

        // 延遲初始化確保DOM完全準備好
        const timeoutId = setTimeout(initAnimations, 100);

        return () => {
            clearTimeout(timeoutId);
            // 清理所有ScrollTrigger實例
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            ScrollTrigger.clearMatchMedia();
        };
    }, [isMounted]);

    const addContentRef = (el) => {
        if (el && !contentRefs.current.includes(el)) {
            contentRefs.current.push(el);
        }
    };

    // 服務端渲染時不顯示動畫效果
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
                    {/* 其餘內容保持不變... */}
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
                {/* Title */}
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

                {/* Social Links */}
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

                {/* Special Notice Card */}
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

                {/* Discord Link */}
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