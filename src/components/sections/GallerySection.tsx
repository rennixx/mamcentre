import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { luxuryTheme } from '../../constants/luxuryTheme';

// All media as a flat array
const allMedia: MediaItem[] = [
  // images
  { src: require('../../assets/IMG_0554.jpg'), title: 'Equestrian Excellence', category: 'horses' },
  { src: require('../../assets/IMG_0973.jpg'), title: 'Riding Mastery', category: 'training' },
  { src: require('../../assets/IMG_1665.JPG'), title: 'Championship Moments', category: 'competition' },
  { src: require('../../assets/IMG_1696.JPG'), title: 'Elegant Stables', category: 'facilities' },
  { src: require('../../assets/IMG_2174.jpg'), title: 'Professional Training', category: 'training' },
  { src: require('../../assets/IMG_2194.jpg'), title: 'Beautiful Horses', category: 'horses' },
  { src: require('../../assets/IMG_2204.jpg'), title: 'Riding Lessons', category: 'training' },
  { src: require('../../assets/IMG_2364.JPG'), title: 'Stable Life', category: 'facilities' },
  { src: require('../../assets/IMG_2365.JPG'), title: 'Equestrian Spirit', category: 'horses' },
  { src: require('../../assets/IMG_2367.JPG'), title: 'Horse Care', category: 'facilities' },
  { src: require('../../assets/IMG_2369.JPG'), title: 'Training Sessions', category: 'training' },
  { src: require('../../assets/IMG_2370.JPG'), title: 'Riders & Horses', category: 'training' },
  { src: require('../../assets/IMG_2378.JPG'), title: 'Competition Ready', category: 'competition' },
  { src: require('../../assets/IMG_2487.JPG'), title: 'Excellence in Riding', category: 'training' },
  { src: require('../../assets/IMG_2873.jpg'), title: 'Stable Atmosphere', category: 'facilities' },
  { src: require('../../assets/IMG_2962.jpg'), title: 'Equestrian Dreams', category: 'horses' },
  { src: require('../../assets/IMG_2975.JPG'), title: 'Professional Care', category: 'facilities' },
  { src: require('../../assets/IMG_2976.JPG'), title: 'Horse Training', category: 'training' },
  { src: require('../../assets/IMG_2978.PNG'), title: 'Stable Management', category: 'facilities' },
  { src: require('../../assets/IMG_2980.JPG'), title: 'Riding Excellence', category: 'training' },
  { src: require('../../assets/IMG_3079.jpg'), title: 'Championship Spirit', category: 'competition' },
  { src: require('../../assets/IMG_3270.jpg'), title: 'Beautiful Moments', category: 'horses' },
  { src: require('../../assets/IMG_3830.jpg'), title: 'Equestrian Life', category: 'training' },
  { src: require('../../assets/IMG_3845.JPG'), title: 'Horse Excellence', category: 'horses' },
  { src: require('../../assets/IMG_3847.JPG'), title: 'Professional Riding', category: 'training' },
  { src: require('../../assets/IMG_3856.JPG'), title: 'Stable Excellence', category: 'facilities' },
  { src: require('../../assets/IMG_3857.JPG'), title: 'Riding Mastery', category: 'training' },
  { src: require('../../assets/IMG_3858.JPG'), title: 'Equestrian Joy', category: 'horses' },
  { src: require('../../assets/IMG_4155.jpg'), title: 'Training Excellence', category: 'training' },
  { src: require('../../assets/IMG_4260.JPG'), title: 'Horse Beauty', category: 'horses' },
  { src: require('../../assets/IMG_4282.JPG'), title: 'Competition Level', category: 'competition' },
  { src: require('../../assets/IMG_4283.JPG'), title: 'Professional Standards', category: 'training' },
  { src: require('../../assets/IMG_4284.JPG'), title: 'Equestrian Excellence', category: 'horses' },
  { src: require('../../assets/IMG_4539.PNG'), title: 'Modern Facilities', category: 'facilities' },
  { src: require('../../assets/IMG_4540.PNG'), title: 'Training Equipment', category: 'facilities' },
  { src: require('../../assets/IMG_4541.PNG'), title: 'Professional Setup', category: 'facilities' },
  { src: require('../../assets/IMG_4547.PNG'), title: 'Stable Technology', category: 'facilities' },
  { src: require('../../assets/IMG_4550.PNG'), title: 'Modern Amenities', category: 'facilities' },
  { src: require('../../assets/IMG_4551.PNG'), title: 'Quality Equipment', category: 'facilities' },
  { src: require('../../assets/IMG_4554.PNG'), title: 'Professional Grade', category: 'facilities' },
  { src: require('../../assets/IMG_4555.PNG'), title: 'Excellence Standards', category: 'facilities' },
  { src: require('../../assets/IMG_5045.PNG'), title: 'Facility Overview', category: 'facilities' },
  { src: require('../../assets/IMG_5854.JPG'), title: 'Championship Dreams', category: 'competition' },
  { src: require('../../assets/IMG_5856.JPG'), title: 'Equestrian Pride', category: 'horses' },
  { src: require('../../assets/IMG_5858.JPG'), title: 'Training Success', category: 'training' },
  { src: require('../../assets/IMG_7137.JPG'), title: 'Horse Excellence', category: 'horses' },
  { src: require('../../assets/IMG_7216.JPG'), title: 'Professional Riding', category: 'training' },
  { src: require('../../assets/IMG_7896.JPG'), title: 'Beautiful Stables', category: 'facilities' },
  { src: require('../../assets/IMG_7897.jpg'), title: 'Equestrian Lifestyle', category: 'horses' },
  // videos
  { src: require('../../assets/IMG_1851.MOV'), title: 'Training in Action', category: 'training', type: 'video/quicktime' },
  { src: require('../../assets/IMG_2349.MP4'), title: 'Championship Performance', category: 'competition', type: 'video/mp4' },
  { src: require('../../assets/IMG_2711.MP4'), title: 'Professional Riding', category: 'training', type: 'video/mp4' },
  { src: require('../../assets/IMG_2972.MP4'), title: 'Horse Training Session', category: 'training', type: 'video/mp4' },
  { src: require('../../assets/IMG_3117.MOV'), title: 'Equestrian Excellence', category: 'horses', type: 'video/quicktime' },
  { src: require('../../assets/IMG_3960.MP4'), title: 'Competition Ready', category: 'competition', type: 'video/mp4' },
  { src: require('../../assets/IMG_4270.MP4'), title: 'Training Mastery', category: 'training', type: 'video/mp4' },
  { src: require('../../assets/IMG_5956.MOV'), title: 'Stable Life', category: 'facilities', type: 'video/quicktime' }
];

const GalleryContainer = styled(motion.div)`
  position: relative;
  min-height: 100vh;
  background: #0a0a0a;
  overflow: hidden;
`;

const BackgroundVideo = styled.video`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  z-index: -2;
  filter: brightness(0.3) blur(1px);
`;

const GalleryOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(27, 54, 93, 0.6) 50%,
    rgba(0, 0, 0, 0.8) 100%
  );
  z-index: -1;
`;

const GalleryContent = styled.div`
  position: relative;
  z-index: 10;
  padding: 8rem 2rem 4rem;
  max-width: 1600px;
  margin: 0 auto;
  
  @media (min-width: 1440px) {
    max-width: 1800px;
      <GalleryContent>
        <HeroSection>
          <GalleryTitle
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            Mam Center Gallery
          </GalleryTitle>
          <GallerySubtitle
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            Discover the beauty and excellence of our equestrian world through stunning photography and captivating videos showcasing our horses, training, competitions, and world-class facilities.
          </GallerySubtitle>
        </HeroSection>

        {/* Albums view */}
        {!selectedAlbum && (
          <MediaGrid
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.13, delayChildren: 0.7, duration: 1, ease: [0.22, 1, 0.36, 1] }
              }
            }}
          >
            {albums.map((album, index) => (
              <MediaCard
                key={album.key}
                onClick={() => setSelectedAlbum(album.key)}
                initial={{ opacity: 0, y: 60, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.9, delay: 0.8 + index * 0.13, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.03, boxShadow: '0 8px 32px rgba(212,175,55,0.18)' }}
                whileTap={{ scale: 0.98 }}
              >
                <AlbumTitle>{album.title}</AlbumTitle>
                <AlbumDescription>{album.description}</AlbumDescription>
                <AlbumCount>{album.assets.length} items</AlbumCount>
              </MediaCard>
            ))}
          </MediaGrid>
        )}

        {/* Album assets view */}
        {selectedAlbum && (
          <>
            <BackButton onClick={() => setSelectedAlbum(null)}>
              ← Back to Albums
            </BackButton>
            <MediaGrid
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.07, delayChildren: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }
                }
              }}
            >
              {albums.find(a => a.key === selectedAlbum)?.assets.map((media, idx) => (
                <MediaCard
                  key={media.src}
                  onClick={() => openLightbox(media)}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7, delay: 0.2 + idx * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ scale: 1.04, boxShadow: '0 8px 32px rgba(212,175,55,0.18)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  {media.type && media.type.startsWith('video') ? (
                    <MediaThumb as={motion.video} src={media.src} autoPlay loop muted playsInline />
                  ) : (
                    <MediaThumb as={motion.img} src={media.src} alt={media.title} />
                  )}
                  <MediaTitle>{media.title}</MediaTitle>
                </MediaCard>
              ))}
            </MediaGrid>
          </>
        )}
  cursor: pointer;
  backdrop-filter: blur(20px);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(212, 175, 55, 0.3);
  }
`;

const MediaGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2.5rem;
  }
  
  @media (min-width: 1200px) {
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 3rem;
  }
`;

const MediaCard = styled(motion.div)`
  position: relative;
  aspect-ratio: 4/3;
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      45deg,
      rgba(212, 175, 55, 0.1) 0%,
      rgba(255, 255, 255, 0.05) 100%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 1;
  }
  
  &:hover::before {
    opacity: 1;
  }
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
  }
`;

const MediaImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  loading: lazy;
`;

const MediaVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
`;

const MediaOverlay = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  padding: 2rem 1.5rem 1.5rem;
  z-index: 2;
`;

const MediaTitle = styled.h3`
  font-family: ${luxuryTheme.typography.fonts.primary};
  color: ${luxuryTheme.colors.white};
  font-size: 1.2rem;
  font-weight: ${luxuryTheme.typography.weights.semibold};
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
`;

const VideoPlayIcon = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(212, 175, 55, 0.9);
  color: #000;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  z-index: 3;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  
  &::after {
    content: '▶';
    margin-left: 3px;
    line-height: 1;
    display: block;
  }
  
  &:hover {
    background: rgba(212, 175, 55, 1);
    transform: translate(-50%, -50%) scale(1.1);
  }
`;

// Lightbox components
const LightboxOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.95);
  z-index: 999999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  backdrop-filter: blur(10px);
  overflow: hidden;
`;

const LightboxContent = styled(motion.div)`
  position: relative;
  width: 70vw;
  height: 60vh;
  max-width: 800px;
  max-height: 500px;
  min-height: 400px;
  border-radius: 20px;
  overflow: visible;
  background: #000;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.8);
  border: 2px solid rgba(212, 175, 55, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000000;
`;

const LightboxMedia = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
  background: rgba(0, 0, 0, 0.2);
  
  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  }
  
  video {
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    object-fit: contain;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    background: #000;
  }
`;

const LightboxClose = styled(motion.button)`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: rgba(212, 175, 55, 0.9);
  color: #000;
  border: none;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  font-size: 1.8rem;
  font-weight: bold;
  cursor: pointer;
  z-index: 15;
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5);
  
  &:hover {
    background: rgba(212, 175, 55, 1);
    transform: scale(1.1);
  }
`;

const LightboxNav = styled(motion.button)<{ direction: 'prev' | 'next' }>`
  position: absolute;
  top: 50%;
  ${props => props.direction === 'prev' ? 'left: 1.5rem' : 'right: 1.5rem'};
  transform: translateY(-50%);
  background: rgba(212, 175, 55, 0.9);
  color: #000;
  border: none;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  font-size: 2rem;
  font-weight: bold;
  cursor: pointer;
  z-index: 15;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5);
  
  &:hover {
    background: rgba(212, 175, 55, 1);
    transform: translateY(-50%) scale(1.1);
  }
`;

const LightboxTitle = styled.div`
  width: 100%;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.9));
  padding: 0.8rem 1rem;
  color: white;
  font-family: ${luxuryTheme.typography.fonts.primary};
  font-size: 1.1rem;
  font-weight: ${luxuryTheme.typography.weights.semibold};
  text-align: center;
  z-index: 10;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const HeroSection = styled(motion.div)`
  text-align: center;
  margin-bottom: 6rem;
`;

const GalleryTitle = styled(motion.h1)`
  font-family: ${luxuryTheme.typography.fonts.luxury};
  font-size: 4rem;
  font-weight: ${luxuryTheme.typography.weights.bold};
  color: ${luxuryTheme.colors.white};
  margin-bottom: 2rem;
  text-shadow: 3px 3px 12px rgba(0, 0, 0, 0.9);
  background: linear-gradient(135deg, #D4AF37 0%, #FFFFFF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  @media (min-width: 768px) {
    font-size: 5rem;
  }
  
  @media (min-width: 1200px) {
    font-size: 6rem;
  }
`;

const GallerySubtitle = styled(motion.p)`
  font-family: ${luxuryTheme.typography.fonts.primary};
  font-size: 1.4rem;
  color: rgba(255, 255, 255, 0.9);
  max-width: 800px;
  margin: 0 auto 3rem;
  line-height: 1.6;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.8);
  
  @media (min-width: 1440px) {
    font-size: 1.5rem;
    max-width: 900px;
  }
`;

type MediaItem = {
  src: any;
  title: string;
  category: string;
  type?: string;
};

export const GallerySection: React.FC = () => {
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [selectedAlbum, setSelectedAlbum] = useState<string | null>(null);

  // Albums definition
  const albums = [
    {
      key: 'horses',
      title: 'Our Horses',
      description: 'Photos and videos of our beautiful horses.',
      assets: allMedia.filter((item: MediaItem) => item.category === 'horses'),
    },
    {
      key: 'training',
      title: 'Training',
      description: 'Training sessions and riding mastery.',
      assets: allMedia.filter((item: MediaItem) => item.category === 'training'),
    },
    {
      key: 'competition',
      title: 'Competitions',
      description: 'Competition moments and championship performances.',
      assets: allMedia.filter((item: MediaItem) => item.category === 'competition'),
    },
    {
      key: 'facilities',
      title: 'Facilities',
      description: 'Our stables, equipment, and world-class facilities.',
      assets: allMedia.filter((item: MediaItem) => item.category === 'facilities'),
    },
  ];
  
  const openLightbox = (media: MediaItem) => {
    setSelectedMedia(media);
    // Disable background scrolling when lightbox is open
    document.body.style.overflow = 'hidden';
  };
  
  const closeLightbox = () => {
    setSelectedMedia(null);
    // Re-enable scrolling when lightbox is closed
    document.body.style.overflow = '';
  };
  
  // Helper to get current media list for lightbox navigation
  const getCurrentMediaList = (): MediaItem[] => {
    if (selectedAlbum) {
      const album = albums.find(a => a.key === selectedAlbum);
      return album ? album.assets : allMedia;
    }
    return allMedia;
  };

  const navigateMedia = (direction: 'prev' | 'next') => {
    if (!selectedMedia) return;
    const mediaList = getCurrentMediaList();
    const currentIndex = mediaList.findIndex((item: MediaItem) => item.src === selectedMedia.src);
    let newIndex;
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : mediaList.length - 1;
    } else {
      newIndex = currentIndex < mediaList.length - 1 ? currentIndex + 1 : 0;
    }
    setSelectedMedia(mediaList[newIndex]);
  };

  // Handle escape key to close lightbox
  React.useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && selectedMedia) {
        closeLightbox();
      }
    };

    if (selectedMedia) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [selectedMedia]);

  return (
    <GalleryContainer>
      <BackgroundVideo autoPlay muted loop playsInline>
        <source src={require('../../assets/IMG_2711.MP4')} type="video/mp4" />
        <source src={require('../../assets/IMG_4270.MP4')} type="video/mp4" />
      </BackgroundVideo>
      <GalleryOverlay />
      
      <GalleryContent>
        <HeroSection>
          <GalleryTitle
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Mam Center Gallery
          </GalleryTitle>
          <GallerySubtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Discover the beauty and excellence of our equestrian world through stunning photography and captivating videos showcasing our horses, training, competitions, and world-class facilities.
          </GallerySubtitle>
        </HeroSection>
        
        {/* Albums view */}
        {!selectedAlbum && (
          <MediaGrid
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            {albums.map((album, index) => (
              <MediaCard
                key={album.key}
                onClick={() => setSelectedAlbum(album.key)}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 + (index % 4) * 0.1 }}
                whileHover={{ y: -8 }}
              >
                {/* Use the first asset as the album cover */}
                {album.assets[0] && album.assets[0].type ? (
                  <MediaVideo muted loop preload="metadata">
                    <source src={album.assets[0].src} type={album.assets[0].type} />
                  </MediaVideo>
                ) : album.assets[0] ? (
                  <MediaImage src={album.assets[0].src} alt={album.assets[0].title} loading="lazy" />
                ) : null}
                <MediaOverlay>
                  <MediaTitle>{album.title}</MediaTitle>
                </MediaOverlay>
              </MediaCard>
            ))}
          </MediaGrid>
        )}
        {/* Album assets view */}
        {selectedAlbum && (
          <>
            <div style={{ marginBottom: '2rem', textAlign: 'left' }}>
              <button
                onClick={() => setSelectedAlbum(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#D4AF37',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  marginBottom: '0.5rem',
                  padding: 0,
                  textDecoration: 'underline',
                }}
              >
                ← Back to Albums
              </button>
              <span style={{ marginLeft: 16, color: '#fff', fontWeight: 500, fontSize: '1.2rem' }}>{albums.find(a => a.key === selectedAlbum)?.title}</span>
            </div>
            <MediaGrid
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              {albums.find(a => a.key === selectedAlbum)?.assets.map((media, index) => (
                <MediaCard
                  key={`${media.category}-${index}`}
                  onClick={() => openLightbox(media)}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 + (index % 12) * 0.1 }}
                  whileHover={{ y: -8 }}
                >
                  {media.type ? (
                    <>
                      <MediaVideo 
                        muted 
                        loop 
                        preload="metadata"
                        onMouseEnter={(e) => e.currentTarget.play()}
                        onMouseLeave={(e) => e.currentTarget.pause()}
                      >
                        <source src={media.src} type={media.type} />
                      </MediaVideo>
                      <VideoPlayIcon
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        style={{ 
                          willChange: 'transform',
                          backfaceVisibility: 'hidden'
                        }}
                      />
                    </>
                  ) : (
                    <MediaImage 
                      src={media.src} 
                      alt={media.title} 
                      loading="lazy"
                    />
                  )}
                  <MediaOverlay>
                    <MediaTitle>{media.title}</MediaTitle>
                  </MediaOverlay>
                </MediaCard>
              ))}
            </MediaGrid>
          </>
        )}
      </GalleryContent>
      
      {/* Lightbox */}
      {selectedMedia && createPortal(
        <AnimatePresence>
          <LightboxOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <LightboxContent
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <LightboxClose
                onClick={closeLightbox}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                ✕
              </LightboxClose>
              
              {getCurrentMediaList().length > 1 && (
                <>
                  <LightboxNav
                    direction="prev"
                    onClick={() => navigateMedia('prev')}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    ‹
                  </LightboxNav>
                  <LightboxNav
                    direction="next"
                    onClick={() => navigateMedia('next')}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    ›
                  </LightboxNav>
                </>
              )}
              
              <LightboxMedia>
                {selectedMedia.type ? (
                  <video 
                    controls 
                    autoPlay
                    muted={false}
                    playsInline
                    style={{ 
                      outline: 'none',
                      maxWidth: '100%',
                      maxHeight: '100%'
                    }}
                    onLoadedData={(e) => {
                      e.currentTarget.play();
                    }}
                  >
                    <source src={selectedMedia.src} type={selectedMedia.type} />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img 
                    src={selectedMedia.src} 
                    alt={selectedMedia.title}
                  />
                )}
              </LightboxMedia>
              
              <LightboxTitle>
                {selectedMedia.title}
              </LightboxTitle>
            </LightboxContent>
          </LightboxOverlay>
        </AnimatePresence>,
        document.body
      )}
    </GalleryContainer>
  );
};
