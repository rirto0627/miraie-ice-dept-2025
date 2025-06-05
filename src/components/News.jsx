import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Typography, Card } from 'antd';
import NewsImage from '../assets/news.webp';
import { useMediaQuery } from 'react-responsive';

gsap.registerPlugin(ScrollTrigger);

const { Title } = Typography;

export const News = () => {
    const containerRef = useRef(null);
    const cardRef = useRef(null);
    const titleRef = useRef(null);
    const imgRef = useRef(null);
    const isExpanded = useRef(false);

    // 使用 useMediaQuery 檢測是否為手機設備
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const [initialWidth, setInitialWidth] = useState('100%');

    useEffect(() => {
        // 根據設備類型設置初始寬度
        setInitialWidth(isMobile ? '100%' : '100%');
    }, [isMobile]);

    const toggleCardSize = () => {
        if (!cardRef.current || isMobile) return; // 如果是手機設備，不執行放大效果

        if (isExpanded.current) {
            // 縮小回原始尺寸
            gsap.to(cardRef.current, {
                width: initialWidth,
                duration: 0.5,
                ease: "power2.inOut"
            });
        } else {
            // 放大到全寬
            gsap.to(cardRef.current, {
                width: '100vw',
                duration: 0.5,
                ease: "power2.inOut"
            });
        }
        isExpanded.current = !isExpanded.current;
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (!cardRef.current || !titleRef.current) return;

            // 圖片卡片動畫
            gsap.fromTo(cardRef.current,
                { opacity: 0, y: 100, scale: 0.95 },
                {
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 70%",
                        end: "top 30%",
                        toggleActions: "play none none none",
                        markers: false,
                        invalidateOnRefresh: true
                    },
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 1.2,
                    ease: "back.out(1.7)"
                }
            );

            // 標題動畫
            gsap.from(titleRef.current, {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 85%",
                    toggleActions: "play none none none",
                    markers: false
                },
                opacity: 0,
                y: -50,
                duration: 1.5,
                ease: "elastic.out(1, 0.5)"
            });

            // 背景動畫
            gsap.to(containerRef.current, {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                    end: "bottom 20%",
                    scrub: 1
                },
                duration: 2
            });

            setTimeout(() => {
                ScrollTrigger.refresh();
            }, 300);
        }, containerRef);

        return () => {
            ctx.revert();
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="gallery-container"
            style={{
                padding: isMobile ? '20px 16px' : '40px 16px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}
        >
            <Title
                ref={titleRef}
                className="gallery-title"
                level={2}
                style={{
                    textAlign: 'center',
                    marginBottom: isMobile ? '20px' : '40px',
                    fontWeight: 'bold',
                    color: '#1890ff',
                    fontSize: isMobile ? '24px' : '32px'
                }}
            >
                燈箱資訊
            </Title>

            <div
                ref={cardRef}
                className="featured-image-card"
                style={{
                    width: initialWidth,
                    transition: 'width 0.5s ease',
                    maxWidth: '100vw' // 確保在移動設備上不會超出屏幕
                }}
            >
                <Card
                    hoverable={!isMobile} // 手機上禁用 hover 效果
                    style={{
                        borderRadius: '12px',
                        overflow: 'hidden',
                        border: 'none',
                        backgroundColor: 'transparent',
                    }}
                >
                    <img
                        ref={imgRef}
                        alt="News"
                        src={NewsImage}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: isMobile ? 'none' : 'transform 0.5s cubic-bezier(0.215, 0.61, 0.355, 1)',
                            cursor: isMobile ? 'default' : 'pointer'
                        }}
                        onClick={toggleCardSize}
                        onMouseEnter={(e) => {
                            if (!isMobile) {
                                e.currentTarget.style.transform = 'scale(1.03)';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!isMobile) {
                                e.currentTarget.style.transform = 'scale(1)';
                            }
                        }}
                    />
                </Card>
            </div>
        </div>
    );
};