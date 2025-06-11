import {useEffect, useRef, useState, useMemo} from 'react';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {ScrollToPlugin} from 'gsap/ScrollToPlugin';
import {SplitText} from 'gsap/SplitText';
import {Row, Col, Card, Typography, Avatar, Space, Grid, Image, Skeleton} from 'antd';
import {TwitterOutlined} from '@ant-design/icons';
import Pose1 from "../assets/Picture1.webp";
import Pose3 from "../assets/Pose3.webp"

import {News} from "./News.jsx";


if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, SplitText);


    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
        (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

    if (isIOS) {

        ScrollTrigger.normalizeScroll(true);


        document.addEventListener('touchmove', (e) => {
            if (ScrollTrigger.isScrolling) {
                e.preventDefault();
            }
        }, {passive: false});
    }
}


const {useBreakpoint} = Grid;
const {Title, Text} = Typography;


const teamData = {
    organizers: [
        {
            name: '噗哩噗哩',
            role: '策劃',
            twitter: 'puripuri0621',
            twitterUrl: 'https://x.com/puripuri0621'
        },
        {
            name: '菲尼斯',
            role: '策劃',
            twitter: 'phenix_dc',
            twitterUrl: 'https://x.com/phenix_dc'
        }
    ],
    artists: [
        {
            name: '瑋B',
            role: '主繪師',
            twitter: 'WeiB_artist',
            twitterUrl: 'https://x.com/WeiB_artist'
        },
        {
            name: '丕嗣',
            role: '插圖繪師',
            twitter: 'haskyyyyy1',
            twitterUrl: 'https://x.com/haskyyyyy1'
        },

        {
            name: '泡泡',
            role: '插圖繪師',
            twitter: 'h_bubble93',
            twitterUrl: 'https://x.com/h_bubble93'
        },
        {
            name: '小鶴',
            role: 'Live2D',
            twitter: 'hehebirdhechi',
            twitterUrl: 'https://x.com/hehebirdhechi'
        },
        {
            name: 'Jeffery 簡佛瑞',
            role: '剪輯師',
            twitter: 'Jeffery1163',
            twitterUrl: 'https://x.com/Jeffery1163'
        },
        {
            name: '熊熊',
            role: '網頁設計',
            twitter: 'rxbear0627',
            twitterUrl: 'https://x.com/rxbear0627',
            avatarUrl: 'https://pbs.twimg.com/profile_images/1921233359126360067/45ueaxMr_400x400.jpg'
        },
    ],
    sponsors: [
        {
            name: '噗哩噗哩',
            twitter: 'puripuri0621',
            twitterUrl: 'https://x.com/puripuri0621'
        },
        {
            name: '菲尼斯',
            twitter: 'phenix_dc',
            twitterUrl: 'https://x.com/phenix_dc'
        },
        {
            name: '夕陽',
            twitter: 'lQigor1WqQ6hbPU',
            twitterUrl: 'https://x.com/lQigor1WqQ6hbPU',
            avatarUrl: 'https://pbs.twimg.com/profile_images/1595799152604377089/NL-QI23d_400x400.jpg'
        },
        {
            name: 'Ash Huang 公館快打',
            twitter: 'HuangAsh',
            twitterUrl: 'https://x.com/HuangAsh'
        },
        {
            name: 'ミーアキャット',
            twitter: 'mi_akyatto0304',
            twitterUrl: 'https://x.com/mi_akyatto0304'
        },
        {
            name: '蘋',
            twitter: 'liyue89050361',
            twitterUrl: 'https://x.com/liyue89050361'
        },
        {
            name: '友熙',
            twitter: 'tingxuan0203',
            twitterUrl: 'https://x.com/tingxuan0203'
        },
        {
            name: '刀斧怪',
            twitter: 'xCOJ1R77ixAPVlo',
            twitterUrl: 'https://x.com/xCOJ1R77ixAPVlo'
        },
        {
            name: '奧煞',
            twitter: 'Eric6iB',
            twitterUrl: 'https://x.com/Eric6iB'
        },
        {
            name: '閃電流氓',
            twitter: 'Hunga86',
            twitterUrl: 'https://x.com/Hunga86'
        },
        {
            name: '歐咖吶哋島油',
            twitter: 'Saitama_tauiu',
            twitterUrl: 'https://x.com/Saitama_tauiu'
        },
        {
            name: '陳式綠茶',
            twitter: 'greenteachen081',
            twitterUrl: 'https://x.com/greenteachen081'
        }
    ]
};


const useImagePreloader = (imageSources) => {
    const [loadedImages, setLoadedImages] = useState({});
    const [allImagesLoaded, setAllImagesLoaded] = useState(false);

    useEffect(() => {
        const loadImage = (src) => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => resolve({src, loaded: true});
                img.onerror = () => reject({src, loaded: false});
                img.src = src;
            });
        };

        const loadAllImages = async () => {
            try {
                const results = await Promise.allSettled(
                    imageSources.map(src => loadImage(src))
                );

                const imageStatus = {};
                results.forEach((result, index) => {
                    if (result.status === 'fulfilled') {
                        imageStatus[imageSources[index]] = true;
                    } else {
                        imageStatus[imageSources[index]] = false;
                    }
                });

                setLoadedImages(imageStatus);
                setAllImagesLoaded(true);
            } catch (error) {
                console.error('圖片加載失敗:', error);
                setAllImagesLoaded(true);
            }
        };

        if (imageSources.length > 0) {
            loadAllImages();
        }
    }, [imageSources]);

    return {loadedImages, allImagesLoaded};
};


const OptimizedImage = ({src, alt, style, imageRef, placeholder = true}) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    const handleLoad = () => {
        setImageLoaded(true);
    };

    const handleError = () => {
        setHasError(true);
        setImageLoaded(true);
    };

    if (hasError) {
        return (
            <div
                style={{
                    ...style,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#f5f5f5',
                    color: '#999'
                }}
            >
                圖片加載失敗
            </div>
        );
    }

    return (
        <div style={{position: 'relative', ...style}}>
            {!imageLoaded && placeholder && (
                <Skeleton.Image
                    style={{
                        width: '100%',
                        height: '300px',
                        borderRadius: '8px'
                    }}
                    active
                />
            )}
            <Image
                ref={imageRef}
                src={src}
                alt={alt}
                preview={false}
                onLoad={handleLoad}
                onError={handleError}
                style={{
                    ...style,
                    display: imageLoaded ? 'block' : 'none',
                    transform: 'translateZ(0)',
                    willChange: 'transform',
                    transition: 'opacity 0.3s ease-in-out'
                }}
                loading="lazy"
            />
        </div>
    );
};


export const Team = () => {
    const teamRef = useRef();
    const titleRef = useRef();
    const subtitleRef = useRef();
    const sectionRefs = useRef([]);
    const imageRefs = useRef([]);
    const screens = useBreakpoint();

    const getTwitterAvatar = useMemo(() => {
        const cache = new Map();
        return (username, size = 'bigger') => {
            const key = `${username}_${size}`;
            if (!cache.has(key)) {
                cache.set(key, `https://unavatar.io/x/${username}?fallback=false`);
            }
            return cache.get(key);
        };
    }, []);

    const sideImages = useMemo(() => [Pose3, Pose1], []);


    const {loadedImages, allImagesLoaded} = useImagePreloader(sideImages);


    useEffect(() => {
        if (typeof window !== 'undefined') {
            gsap.to(window, {
                scrollTo: {
                    y: 0,
                    autoKill: false
                },
                duration: 0.1
            });
        }
    }, []);


    useEffect(() => {
        if (!teamRef.current || typeof window === 'undefined' || !allImagesLoaded) return;


        const setupAnimations = () => {
            requestAnimationFrame(() => {

                const ctx = gsap.context(() => {

                    if (titleRef.current && subtitleRef.current) {
                        const splitTitle = new SplitText(titleRef.current, {
                            type: "chars"
                        });
                        const splitSubtitle = new SplitText(subtitleRef.current, {
                            type: "words"
                        });

                        gsap.set([...splitTitle.chars, ...splitSubtitle.words], {
                            willChange: 'transform, opacity',
                            backfaceVisibility: 'hidden'
                        });

                        const tl = gsap.timeline({
                            scrollTrigger: {
                                trigger: titleRef.current,
                                start: "top 80%",
                                toggleActions: "play none none none"
                            }
                        });

                        tl.from(splitTitle.chars, {
                            opacity: 0,
                            y: 50,
                            stagger: 0.05,
                            duration: 0.8,
                            ease: "back.out",
                            force3D: true
                        }).from(splitSubtitle.words, {
                            opacity: 0,
                            y: 30,
                            stagger: 0.1,
                            duration: 0.6,
                            ease: "power2.out",
                            force3D: true
                        }, 0.2);
                    }


                    sectionRefs.current.forEach((section, index) => {
                        if (!section) return;

                        const cards = section.querySelectorAll('.ant-card');
                        if (cards.length === 0) return;

                        gsap.set(cards, {
                            willChange: 'transform, opacity',
                            backfaceVisibility: 'hidden'
                        });

                        gsap.from(cards, {
                            opacity: 0,
                            x: index % 2 === 0 ? -50 : 50,
                            stagger: 0.15,
                            duration: 0.6,
                            ease: "power2.out",
                            force3D: true,
                            scrollTrigger: {
                                trigger: section,
                                start: "top 70%",
                                toggleActions: "play none none none"
                            }
                        });


                        if (imageRefs.current[index] && loadedImages[sideImages[index]]) {
                            gsap.set(imageRefs.current[index], {
                                willChange: 'transform',
                                backfaceVisibility: 'hidden'
                            });

                            gsap.from(imageRefs.current[index], {
                                opacity: 0,
                                scale: 0.9,
                                duration: 0.8,
                                ease: "power2.out",
                                force3D: true,
                                scrollTrigger: {
                                    trigger: imageRefs.current[index],
                                    start: "top 70%",
                                    toggleActions: "play none none none"
                                }
                            });
                        }
                    });


                    setTimeout(() => {
                        ScrollTrigger.refresh();
                    }, 500);

                }, teamRef);

                return ctx;
            });
        };

        const ctx = setupAnimations();

        return () => {
            if (ctx) {
                ctx.revert();
            }
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, [allImagesLoaded, loadedImages, sideImages]);


    const addToRefs = (el, index) => {
        if (el) sectionRefs.current[index] = el;
    };

    const SmartAvatar = ({username, avatarUrl, size = 64, ...props}) => {
        const [currentSrc, setCurrentSrc] = useState(
            `https://unavatar.io/x/${username}?fallback=false`
        );
        const [retryCount, setRetryCount] = useState(0);

        const handleError = () => {
            if (retryCount === 0 && avatarUrl) {

                setCurrentSrc(avatarUrl);
                setRetryCount(1);
            } else {

                setCurrentSrc(
                    `https://abs.twimg.com/sticky/default_profile_images/default_profile_${size > 48 ? 'bigger' : 'normal'}.png`
                );
            }
        };

        return <Avatar src={currentSrc} onError={handleError} {...props} />;
    };

    return (
        <div
            ref={teamRef}
            style={{
                padding: screens.md ? '80px 24px' : '40px 16px',
                maxWidth: '1200px',
                margin: '0 auto',
                willChange: 'transform'
            }}
        >
            <div style={{textAlign: 'center', marginBottom: '60px'}}>
                <Title
                    level={2}
                    ref={titleRef}
                    style={{
                        marginBottom: '16px',
                        fontWeight: 700,
                        color: '#262626',
                        willChange: 'transform'
                    }}
                >
                    感謝名單
                </Title>
                <Text
                    type="secondary"
                    ref={subtitleRef}
                    style={{
                        display: 'block',
                        fontSize: screens.md ? '16px' : '14px',
                        willChange: 'transform'
                    }}
                >
                    感謝以下人員與單位的熱情參與與支持
                </Text>
            </div>

            {/* 主辦單位 */}
            <Row gutter={[48, 48]} align="middle" style={{marginBottom: '80px'}}>
                <Col xs={24} md={12} ref={el => addToRefs(el, 0)}>
                    <Title level={3} style={{marginBottom: '24px', color: '#1890ff'}}>主辦單位</Title>
                    <Space direction="vertical" size="large" style={{width: '100%'}}>
                        {teamData.organizers.map((member, index) => (
                            <a
                                href={member.twitterUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                key={index}
                                style={{display: 'block', textDecoration: 'none'}}
                            >
                                <Card
                                    hoverable
                                    style={{
                                        transform: 'translateZ(0)',
                                        willChange: 'transform'
                                    }}
                                >
                                    <Card.Meta
                                        avatar={<Avatar src={getTwitterAvatar(member.twitter)} size={64}/>}
                                        title={member.name}
                                        description={member.role}
                                        style={{alignItems: 'center'}}
                                    />
                                    <div style={{marginTop: '16px', textAlign: 'center'}}>
                                        <TwitterOutlined style={{color: '#1DA1F2', fontSize: '20px'}}/>
                                        <Text style={{marginLeft: '8px', color: '#1DA1F2'}}>@{member.twitter}</Text>
                                    </div>
                                </Card>
                            </a>
                        ))}
                    </Space>
                </Col>
                <Col xs={24} md={12}>
                    <OptimizedImage
                        src={sideImages[0]}
                        alt="主辦單位配圖"
                        imageRef={el => imageRefs.current[0] = el}
                        style={{
                            borderRadius: '8px',
                            width: '100%',
                            height: 'auto',
                            // transform: "scaleX(-1)"

                        }}
                    />
                </Col>
            </Row>

            {/* 繪師 */}
            <Row gutter={[48, 48]} align="middle" style={{marginBottom: '80px'}}>
                <Col xs={24} md={12} order={screens.md ? 1 : 2}>
                    <OptimizedImage
                        src={sideImages[1]}
                        alt="繪師配圖"
                        imageRef={el => imageRefs.current[1] = el}
                        style={{
                            borderRadius: '8px',
                            width: '100%',
                            height: 'auto',
                            transform: "translateY(5%)",

                        }}
                    />
                </Col>
                <Col xs={24} md={12} order={screens.md ? 2 : 1} ref={el => addToRefs(el, 1)}>
                    <Title level={3} style={{marginBottom: '24px', color: '#faad14'}}>後勤團隊</Title>
                    <Space direction="vertical" size="large" style={{width: '100%'}}>
                        {teamData.artists.map((member, index) => (
                            <a
                                href={member.twitterUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                key={index}
                                style={{display: 'block', textDecoration: 'none'}}
                            >
                                <Card
                                    hoverable
                                    style={{
                                        transform: 'translateZ(0)',
                                        willChange: 'transform'
                                    }}
                                >
                                    <Card.Meta
                                        avatar={
                                            <SmartAvatar
                                                username={member.twitter}
                                                avatarUrl={member.avatarUrl}
                                                size={64}
                                            />
                                        }
                                        title={member.name}
                                        description={member.role}
                                        style={{alignItems: 'center'}}
                                    />
                                    <div style={{marginTop: '16px', textAlign: 'center'}}>
                                        <TwitterOutlined style={{color: '#1DA1F2', fontSize: '20px'}}/>
                                        <Text style={{marginLeft: '8px', color: '#1DA1F2'}}>@{member.twitter}</Text>
                                    </div>
                                </Card>
                            </a>
                        ))}
                    </Space>
                </Col>
            </Row>
            <News/>

            {/* 贊助單位 */}
            <Row gutter={[48, 48]} align="middle">
                <Col xs={24} ref={el => addToRefs(el, 2)}>
                    <Title level={3} style={{marginBottom: '24px', color: '#52c41a'}}>贊助單位</Title>
                    <Row gutter={[24, 24]}>
                        {teamData.sponsors.map((member, index) => (
                            <Col xs={24} sm={12} key={index}>
                                <a
                                    href={member.twitterUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{display: 'block', textDecoration: 'none'}}
                                >
                                    <Card
                                        hoverable
                                        style={{
                                            transform: 'translateZ(0)',
                                            willChange: 'transform'
                                        }}
                                    >
                                        <Card.Meta
                                            avatar={
                                                <SmartAvatar
                                                    username={member.twitter}
                                                    avatarUrl={member.avatarUrl}
                                                    size={64}
                                                />
                                            }
                                            title={member.name}
                                            style={{alignItems: 'center'}}
                                        />
                                        <div style={{marginTop: '16px', textAlign: 'center'}}>
                                            <TwitterOutlined style={{color: '#1DA1F2', fontSize: '20px'}}/>
                                            <Text style={{marginLeft: '8px', color: '#1DA1F2'}}>@{member.twitter}</Text>
                                        </div>
                                    </Card>
                                </a>
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
        </div>
    );
};