import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Typography, Card } from 'antd';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const { Title, Text } = Typography;

const videos = [
  {
    title: "Eisnebel ch. 冰霧",
    date: "2023.10.26",
    url: "https://www.youtube.com/channel/UCvglsaXuC9oHuDJZaZbs0AQ"
  },
  {
    title: "5MA之歌",
    date: "2024.01.31",
    url: "https://www.youtube.com/shorts/b7goxzEg4_M?feature=share"
  },
  {
    title: "Supernova",
    date: "2024.02.14",
    url: "https://youtu.be/CU8HGeCL9T4"
  },
  {
    title: "讓我把ㄐㄐ擱淺",
    date: "2024.03.29",
    url: "https://www.youtube.com/watch?v=uYJ7xlj_Azg"
  },
  {
    title: "D-emo",
    date: "2024.04.14",
    url: "https://www.youtube.com/watch?v=Zn4xrl4Q1E4"
  },
  {
    title: "離不開有你的所有幻想",
    date: "2024.10.12",
    url: "https://youtu.be/kA_LFZaWV_8"
  },
  {
    title: "Break Reality",
    date: "2024.12.15",
    url: "https://youtu.be/TumBDTeMWb0"
  },
  {
    title: "TTT",
    date: "2025.03.03",
    url: "https://www.youtube.com/watch?v=2H2YRWurKy8"
  }
];

export const TimeLine = () => {
  useEffect(() => {
  requestAnimationFrame(() => {
    gsap.utils.toArray('.timeline-item').forEach((item, index) => {
      gsap.fromTo(item,
        { opacity: 0, x: index % 2 === 0 ? -100 : 100 },
        {
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none none",
            // markers: true
          },
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power2.out"
        }
      );
    });

    gsap.timeline({
      scrollTrigger: {
        trigger: ".timeline-container",
        start: "top center",
        end: "bottom center",
        scrub: 1,
        // markers: true
      }
    }).from(".timeline-line", {
      scaleY: 0,
      duration: 2,
      ease: "none"
    });

    ScrollTrigger.refresh(); // 強制觸發點重新計算
  });

  return () => ScrollTrigger.getAll().forEach(t => t.kill());
}, []);


  return (
    <div style={{
      padding: '40px 16px',
      backgroundColor: '#f0f2f5',
      minHeight: '100vh'
    }}>
      <Title
        level={2}
        style={{
          textAlign: 'center',
          marginBottom: '40px',
          fontWeight: 'bold',
          color: '#1890ff'
        }}
      >
        時間序
      </Title>

      <div
        className="timeline-container"
        style={{
          maxWidth: 800,
          margin: '0 auto',
          position: 'relative',
        }}
      >
        {/* 时间线 */}
        <div
          className="timeline-line"
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '4px',
            height: '100%',
            backgroundColor: '#1890ff',
            zIndex: 1,
            transformOrigin: 'top center'
          }}
        />

        {videos.map((video, index) => (
          <div
            key={index}
            className="timeline-item"
            style={{
              position: 'relative',
              width: window.innerWidth < 768 ? '100%' : '45%',
              marginLeft: index % 2 === 0 ? 0 : 'auto',
              marginBottom: '32px',
              zIndex: 2,
            }}
          >
            {/* 时间点标记 */}
            <div
              style={{
                position: 'absolute',
                top: '20px',
                [index % 2 === 0 ? 'right' : 'left']: '-10px',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                backgroundColor: '#1890ff',
                zIndex: 3
              }}
            />

            <Card
              hoverable
              style={{
                borderRadius: '8px',
                boxShadow: '0 3px 6px -4px rgba(0,0,0,0.12), 0 6px 16px 0 rgba(0,0,0,0.08), 0 9px 28px 8px rgba(0,0,0,0.05)'
              }}
            >
              <Text type="primary" strong style={{ display: 'block' }}>
                {video.date}
              </Text>
              <Title level={4} style={{ margin: '8px 0 16px' }}>
                {video.title}
              </Title>
              <a
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#13c2c2',
                  textDecoration: 'none',
                }}
              >
                Watch on YouTube
              </a>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};