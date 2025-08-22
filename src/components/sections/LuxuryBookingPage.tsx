import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { 
  LuxurySection, 
  LuxuryText, 
  GlassCard,
  FloatingButton,
  ParticleBackground 
} from '../../components/ui/LuxuryComponents';
import { luxuryTheme } from '../../constants/luxuryTheme';
import { 
  useOptimizedReveal,
  usePerformantScroll 
} from '../../hooks/useOptimizedAnimations';

const BookingContainer = styled(LuxurySection)`
  position: relative;
  padding: 6rem 2rem;
  overflow: hidden;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(16, 21, 28, 0.85);
  backdrop-filter: blur(18px);
  
  @media (min-width: 900px) {
    background: linear-gradient(135deg, #10151c 0%, #1a2233 100%);
  }
`;

const BookingVideo = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -2;
`;

const BookingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(27, 54, 93, 0.8) 0%,
    rgba(15, 20, 25, 0.7) 25%,
    rgba(26, 35, 50, 0.8) 50%,
    rgba(26, 35, 50, 0.7) 75%,
    rgba(27, 54, 93, 0.8) 100%
  );
  z-index: -1;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 25% 30%, rgba(212, 175, 55, 0.15) 0%, transparent 60%),
      radial-gradient(circle at 75% 70%, rgba(192, 192, 192, 0.1) 0%, transparent 60%);
    will-change: opacity;
  }
`;

// Hero area at the top
const BookingHero = styled(motion.div)`
  text-align: center;
  margin: 0 auto;
  padding-top: 7rem;
  padding-bottom: 3.5rem;
  max-width: 900px;
  width: 100%;
  z-index: 2;
`;

const BookingCard = styled(GlassCard)`
  max-width: 480px;
  width: 100%;
  margin: 0 auto 3rem auto;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 2.5rem;
  background: rgba(16, 21, 28, 0.85);
  box-shadow: 0 8px 40px 0 rgba(0,0,0,0.10);
  border-radius: 2rem;
  padding: 2.5rem 2rem;
  position: relative;
  z-index: 3;
`;

const OfferChoiceGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 2.5rem;
`;

const OfferChoice = styled.button<{ selected: boolean }>`
  font-family: ${luxuryTheme.typography.fonts.primary};
  font-size: 1.1rem;
  padding: 1rem 1.5rem;
  border-radius: 1.2rem;
  border: 2px solid ${luxuryTheme.colors.gold.primary};
  background: ${({ selected }) => selected ? luxuryTheme.gradients.goldNavy : 'rgba(255,255,255,0.08)'};
  color: ${({ selected }) => selected ? luxuryTheme.colors.white : luxuryTheme.colors.gold.primary};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  box-shadow: ${({ selected }) => selected ? '0 2px 16px 0 rgba(212,175,55,0.10)' : 'none'};
  outline: none;
  &:hover {
    background: ${luxuryTheme.gradients.goldNavy};
    color: ${luxuryTheme.colors.white};
  }
`;

const OfferDescription = styled.div`
  text-align: center;
  color: rgba(255,255,255,0.85);
  font-size: 1rem;
  margin-bottom: 2rem;
  min-height: 2.5rem;
`;

const OfferDetails = styled.div`
  background: rgba(255,255,255,0.04);
  border-radius: 1.2rem;
  padding: 2rem 1.5rem;
  margin-bottom: 2rem;
  color: #fff;
  box-shadow: 0 2px 16px 0 rgba(16,21,28,0.10);
  text-align: left;
`;
const OfferDetailsTitle = styled.h3`
  font-family: ${luxuryTheme.typography.fonts.luxury};
  color: ${luxuryTheme.colors.gold.primary};
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;
const OfferDetailsPrice = styled.div`
  font-family: ${luxuryTheme.typography.fonts.luxury};
  color: ${luxuryTheme.colors.gold.primary};
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
`;
const OfferDetailsFeatures = styled.ul`
  list-style: none;
  margin: 0 0 0.5rem 0;
  padding: 0;
`;
const OfferDetailsFeature = styled.li`
  font-family: ${luxuryTheme.typography.fonts.primary};
  color: rgba(255,255,255,0.85);
  font-size: 0.98rem;
  margin-bottom: 0.5rem;
  position: relative;
  padding-left: 1.2rem;
  &::before {
    content: '•';
    position: absolute;
    left: 0;
    color: ${luxuryTheme.colors.gold.primary};
    font-size: 1rem;
  }
`;

// Centered card for offers and form
const BookingInfo = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  flex: 1 1 0;
  min-width: 0;
  padding: 2rem 0;
`;

const PackageCard = styled(GlassCard)<{ isSelected: boolean }>`
  background: ${props => props.isSelected 
    ? 'rgba(212, 175, 55, 0.15)' 
    : 'rgba(255, 255, 255, 0.08)'
  };
  backdrop-filter: blur(20px);
  border: 1px solid ${props => props.isSelected 
    ? 'rgba(212, 175, 55, 0.5)' 
    : 'rgba(255, 255, 255, 0.15)'
  };
  padding: 2rem;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: ${luxuryTheme.gradients.goldNavy};
    transform: translateX(-100%);
    transition: transform 0.6s ease;
  }
  
  &:hover::before,
  ${props => props.isSelected && '&::before'} {
    transform: translateX(0);
  }
  
  &:hover {
    transform: translateY(-5px) scale(1.02);
    background: rgba(255, 255, 255, 0.12);
    border-color: rgba(212, 175, 55, 0.4);
  }
`;

const PackageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 1.5rem;
`;

const PackageTitle = styled.h3`
  font-family: ${luxuryTheme.typography.fonts.luxury};
  color: ${luxuryTheme.colors.white};
  font-size: 1.4rem;
  font-weight: ${luxuryTheme.typography.weights.bold};
  margin-bottom: 0.5rem;
`;

const PackagePrice = styled.div`
  text-align: right;
`;

const PriceAmount = styled.div`
  font-family: ${luxuryTheme.typography.fonts.luxury};
  color: ${luxuryTheme.colors.gold.primary};
  font-size: 1.8rem;
  font-weight: ${luxuryTheme.typography.weights.bold};
  line-height: 1;
`;

const PriceUnit = styled.div`
  font-family: ${luxuryTheme.typography.fonts.primary};
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.85rem;
  margin-top: 0.25rem;
`;

const PackageDescription = styled.p`
  font-family: ${luxuryTheme.typography.fonts.primary};
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const PackageFeatures = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const PackageFeature = styled.li`
  font-family: ${luxuryTheme.typography.fonts.primary};
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
  position: relative;
  padding-left: 1.5rem;
  
  &::before {
    content: '✦';
    position: absolute;
    left: 0;
    color: ${luxuryTheme.colors.gold.primary};
    font-size: 0.8rem;
  }
`;

const BookingForm = styled(motion.div)`
  background: rgba(16, 21, 28, 0.85);
  border-radius: ${luxuryTheme.borderRadius.xl};
  box-shadow: 0 8px 40px 0 rgba(0,0,0,0.10);
  padding: 3rem;
  position: relative;
  overflow: hidden;
  border: none;
  color: #fff;
  min-width: 0;
  flex: 1 1 0;
  backdrop-filter: blur(18px);
  
  @media (min-width: 900px) {
    min-width: 380px;
    max-width: 480px;
  }
`;

const FormTitle = styled(LuxuryText)`
  color: ${luxuryTheme.colors.white};
  text-align: center;
  margin-bottom: 2rem;
`;

const FormSteps = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;
  gap: 1rem;
`;

const FormStep = styled.div<{ isActive: boolean; isCompleted: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${luxuryTheme.typography.fonts.primary};
  font-weight: ${luxuryTheme.typography.weights.bold};
  font-size: 0.9rem;
  transition: all 0.3s ease;
  position: relative;
  
  background: ${props => {
    if (props.isCompleted) return luxuryTheme.gradients.goldNavy;
    if (props.isActive) return 'rgba(212, 175, 55, 0.3)';
    return 'rgba(255, 255, 255, 0.1)';
  }};
  
  color: ${props => {
    if (props.isCompleted || props.isActive) return luxuryTheme.colors.white;
    return 'rgba(255, 255, 255, 0.5)';
  }};
  
  border: 2px solid ${props => {
    if (props.isCompleted) return luxuryTheme.colors.gold.primary;
    if (props.isActive) return luxuryTheme.colors.gold.primary;
    return 'rgba(255, 255, 255, 0.2)';
  }};
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 100%;
    width: 1rem;
    height: 2px;
    background: ${props => props.isCompleted 
      ? luxuryTheme.colors.gold.primary 
      : 'rgba(255, 255, 255, 0.2)'
    };
    transform: translateY(-50%);
  }
  
  &:last-child::after {
    display: none;
  }
`;

const FormGroup = styled(motion.div)`
  margin-bottom: 2rem;
  position: relative;
`;

const FormLabel = styled(motion.label)`
  font-family: ${luxuryTheme.typography.fonts.primary};
  color: ${luxuryTheme.colors.white};
  font-size: 0.9rem;
  font-weight: ${luxuryTheme.typography.weights.medium};
  margin-bottom: 0.5rem;
  display: block;
  transition: all 0.3s ease;
`;

const FormInput = styled(motion.input)<{ hasValue: boolean }>`
  width: 100%;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: ${luxuryTheme.borderRadius.md};
  padding: 1rem 1.5rem;
  color: ${luxuryTheme.colors.white};
  font-family: ${luxuryTheme.typography.fonts.primary};
  font-size: 1rem;
  outline: none;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  
  &:focus {
    border-color: ${luxuryTheme.colors.gold.primary};
    background: rgba(255, 255, 255, 0.12);
    box-shadow: 0 0 20px rgba(212, 175, 55, 0.2);
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
    transition: opacity 0.3s ease;
  }
  
  &:focus::placeholder {
    opacity: 0;
  }
`;

const FormSelect = styled(motion.select)<{ hasValue: boolean }>`
  width: 100%;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: ${luxuryTheme.borderRadius.md};
  padding: 1rem 1.5rem;
  color: ${luxuryTheme.colors.white};
  font-family: ${luxuryTheme.typography.fonts.primary};
  font-size: 1rem;
  outline: none;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  cursor: pointer;
  
  &:focus {
    border-color: ${luxuryTheme.colors.gold.primary};
    background: rgba(255, 255, 255, 0.12);
    box-shadow: 0 0 20px rgba(212, 175, 55, 0.2);
  }
  
  option {
    background: ${luxuryTheme.colors.primary.navy};
    color: ${luxuryTheme.colors.white};
    padding: 0.5rem;
  }
`;

const FormTextarea = styled(motion.textarea)<{ hasValue: boolean }>`
  width: 100%;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: ${luxuryTheme.borderRadius.md};
  padding: 1rem 1.5rem;
  color: ${luxuryTheme.colors.white};
  font-family: ${luxuryTheme.typography.fonts.primary};
  font-size: 1rem;
  outline: none;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    border-color: ${luxuryTheme.colors.gold.primary};
    background: rgba(255, 255, 255, 0.12);
    box-shadow: 0 0 20px rgba(212, 175, 55, 0.2);
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
    transition: opacity 0.3s ease;
  }
  
  &:focus::placeholder {
    opacity: 0;
  }
`;

const FormButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  margin-top: 2rem;
`;

const BackButton = styled(FloatingButton)`
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: rgba(255, 255, 255, 0.8);
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.5);
  }
`;

const BookingSummary = styled(motion.div)`
  background: rgba(212, 175, 55, 0.1);
  border: 1px solid rgba(212, 175, 55, 0.3);
  border-radius: ${luxuryTheme.borderRadius.lg};
  padding: 2rem;
  margin-top: 2rem;
`;

const SummaryTitle = styled.h4`
  font-family: ${luxuryTheme.typography.fonts.luxury};
  color: ${luxuryTheme.colors.white};
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: ${luxuryTheme.typography.fonts.primary};
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 0.5rem;
  
  .label {
    font-weight: ${luxuryTheme.typography.weights.medium};
  }
  
  .value {
    color: ${luxuryTheme.colors.gold.primary};
  }
`;

const TotalAmount = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: ${luxuryTheme.typography.fonts.luxury};
  font-size: 1.4rem;
  font-weight: ${luxuryTheme.typography.weights.bold};
  color: ${luxuryTheme.colors.gold.primary};
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(212, 175, 55, 0.3);
`;

// Experience packages data
const experiencePackages = [
  {
    id: 'beginner',
    title: 'Beginner Experience',
    price: 150,
    unit: 'per session',
    description: 'Perfect introduction to the world of premium equestrian training.',
    features: [
      '1-hour private lesson',
      'Professional instructor',
      'Basic horse care education',
      'Safety equipment included',
      'Refreshments after session'
    ]
  },
  {
    id: 'intermediate',
    title: 'Intermediate Training',
    price: 200,
    unit: 'per session',
    description: 'Advanced techniques for developing riders ready for the next level.',
    features: [
      '1.5-hour intensive session',
      'Advanced riding techniques',
      'Jump training introduction',
      'Horse selection guidance',
      'Progress tracking system',
      'Post-session consultation'
    ]
  },
  {
    id: 'championship',
    title: 'Championship Program',
    price: 350,
    unit: 'per session',
    description: 'Elite training program for serious competitors and aspiring champions.',
    features: [
      '2-hour championship training',
      'Olympic-level instruction',
      'Competition preparation',
      'Mental performance coaching',
      'Video analysis session',
      'Personalized training plan',
      'Premium horse access'
    ]
  },
  {
    id: 'luxury-day',
    title: 'Luxury Day Experience',
    price: 750,
    unit: 'full day',
    description: 'Complete immersion in luxury equestrian lifestyle and training.',
    features: [
      'Full day access (8 hours)',
      'Multiple training sessions',
      'Gourmet lunch included',
      'Spa & wellness access',
      'Photography session',
      'Private stable tour',
      'Take-home gift package',
      'Transportation service'
    ]
  }
];

interface BookingData {
  // Step 1: Experience Selection
  selectedPackage: string;
  
  // Step 2: Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  experience: string;
  
  // Step 3: Booking Details
  preferredDate: string;
  preferredTime: string;
  duration: string;
  participants: string;
  specialRequests: string;
}

const SectionTitle = styled(LuxuryText)`
  color: ${luxuryTheme.colors.white};
  margin-bottom: 2rem;
  position: relative;
  &::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 0;
    width: 100px;
    height: 3px;
    background: ${luxuryTheme.gradients.goldNavy};
    border-radius: 2px;
  }
  @media (max-width: 1024px) {
    text-align: center;
    &::after {
      left: 50%;
      transform: translateX(-50%);
    }
  }
`;

const BookingDescription = styled.p`
  font-family: ${luxuryTheme.typography.fonts.primary};
  color: rgba(255, 255, 255, 0.85);
  font-size: 1.2rem;
  line-height: 1.7;
  margin-bottom: 3rem;
`;

export const LuxuryBookingPage: React.FC = () => {
  const { ref: containerRef, inView } = useOptimizedReveal();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPackage, setSelectedPackage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  usePerformantScroll();

  const [bookingData, setBookingData] = useState<BookingData>({
    selectedPackage: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    experience: '',
    preferredDate: '',
    preferredTime: '',
    duration: '',
    participants: '1',
    specialRequests: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBookingData(prev => ({ ...prev, [name]: value }));
  };

  const handlePackageSelect = (packageId: string) => {
    setSelectedPackage(packageId);
    setBookingData(prev => ({ ...prev, selectedPackage: packageId }));
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const selectedPackageData = experiencePackages.find(pkg => pkg.id === selectedPackage);
  const totalAmount = selectedPackageData ? selectedPackageData.price : 0;

  return (
    <BookingContainer ref={containerRef as any}>
      <BookingVideo autoPlay muted loop playsInline>
        <source src={require('../../assets/IMG_2349.MP4')} type="video/mp4" />
        <source src={require('../../assets/IMG_3117.MOV')} type="video/quicktime" />
        Your browser does not support the video tag.
      </BookingVideo>
      <BookingOverlay />
      <ParticleBackground />

      <BookingHero
        initial={{ opacity: 0, y: -40 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -40 }}
        transition={{ duration: 1, delay: 0.1 }}
      >
        <SectionTitle size="xl">
          Reserve Your Experience
        </SectionTitle>
        <BookingDescription>
          Step into a world of equestrian excellence. Choose from our carefully curated 
          experiences designed to elevate your riding journey, whether you're just beginning 
          or pursuing championship dreams.
        </BookingDescription>
      </BookingHero>

      <div style={{ height: '3rem' }} />

      <BookingCard>
        <OfferChoiceGroup>
          {experiencePackages.map((pkg) => (
            <OfferChoice
              key={pkg.id}
              selected={selectedPackage === pkg.id}
              onClick={() => handlePackageSelect(pkg.id)}
              type="button"
            >
              {pkg.title}
            </OfferChoice>
          ))}
        </OfferChoiceGroup>
        {selectedPackageData && (
          <OfferDetails>
            <OfferDetailsTitle>{selectedPackageData.title}</OfferDetailsTitle>
            <OfferDetailsPrice>
              ${selectedPackageData.price} <span style={{fontWeight:400, fontSize:'0.95rem'}}>per {selectedPackageData.unit}</span>
            </OfferDetailsPrice>
            <div style={{marginBottom:'0.7rem'}}>{selectedPackageData.description}</div>
            <OfferDetailsFeatures>
              {selectedPackageData.features.map((feature, idx) => (
                <OfferDetailsFeature key={idx}>{feature}</OfferDetailsFeature>
              ))}
            </OfferDetailsFeatures>
          </OfferDetails>
        )}
        {selectedPackageData ? (
          <BookingForm
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <FormTitle size="lg">Complete Your Booking</FormTitle>
            
            <FormSteps>
              <FormStep isActive={currentStep === 1} isCompleted={currentStep > 1}>
                1
              </FormStep>
              <FormStep isActive={currentStep === 2} isCompleted={currentStep > 2}>
                2
              </FormStep>
              <FormStep isActive={currentStep === 3} isCompleted={false}>
                3
              </FormStep>
            </FormSteps>

            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  style={{ textAlign: 'center', padding: '3rem 0' }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    style={{ 
                      fontSize: '4rem', 
                      marginBottom: '2rem',
                      color: luxuryTheme.colors.gold.primary
                    }}
                  >
                    ✓
                  </motion.div>
                  <LuxuryText size="lg" style={{ color: luxuryTheme.colors.white, marginBottom: '1rem' }}>
                    Booking Confirmed!
                  </LuxuryText>
                  <p style={{ 
                    color: 'rgba(255, 255, 255, 0.8)', 
                    fontSize: '1.1rem',
                    marginBottom: '2rem'
                  }}>
                    Thank you for choosing our premium equestrian experience. 
                    We'll contact you shortly to confirm all details.
                  </p>
                  <FloatingButton 
                    size="lg" 
                    variant="gold"
                    as={Link}
                    to="/my-bookings"
                  >
                    View My Booking
                  </FloatingButton>
                </motion.div>
              ) : (
                <motion.form
                  key={currentStep}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={currentStep === 3 ? handleSubmit : (e) => e.preventDefault()}
                >
                  {currentStep === 1 && (
                    <>
                      <FormGroup>
                        <FormLabel>Selected Experience</FormLabel>
                        <div style={{
                          padding: '1rem 1.5rem',
                          background: 'rgba(212, 175, 55, 0.1)',
                          border: '1px solid rgba(212, 175, 55, 0.3)',
                          borderRadius: luxuryTheme.borderRadius.md,
                          color: luxuryTheme.colors.gold.primary,
                          fontFamily: luxuryTheme.typography.fonts.primary
                        }}>
                          {selectedPackageData ? selectedPackageData.title : 'Please select an experience package'}
                        </div>
                      </FormGroup>
                      <FormGroup>
                        <FormLabel>Riding Experience Level</FormLabel>
                        <FormSelect
                          name="experience"
                          value={bookingData.experience}
                          onChange={handleInputChange}
                          hasValue={!!bookingData.experience}
                          required
                        >
                          <option value="">Select your experience level</option>
                          <option value="beginner">Complete Beginner</option>
                          <option value="some-experience">Some Experience</option>
                          <option value="intermediate">Intermediate Rider</option>
                          <option value="advanced">Advanced Rider</option>
                          <option value="competitive">Competitive Rider</option>
                        </FormSelect>
                      </FormGroup>
                    </>
                  )}
    
                  {currentStep === 2 && (
                    <>
                      <FormGroup>
                        <FormLabel>First Name</FormLabel>
                        <FormInput
                          type="text"
                          name="firstName"
                          value={bookingData.firstName}
                          onChange={handleInputChange}
                          placeholder="Enter your first name"
                          hasValue={!!bookingData.firstName}
                          required
                        />
                      </FormGroup>

                      <FormGroup>
                        <FormLabel>Last Name</FormLabel>
                        <FormInput
                          type="text"
                          name="lastName"
                          value={bookingData.lastName}
                          onChange={handleInputChange}
                          placeholder="Enter your last name"
                          hasValue={!!bookingData.lastName}
                          required
                        />
                      </FormGroup>

                      <FormGroup>
                        <FormLabel>Email Address</FormLabel>
                        <FormInput
                          type="email"
                          name="email"
                          value={bookingData.email}
                          onChange={handleInputChange}
                          placeholder="your.email@example.com"
                          hasValue={!!bookingData.email}
                          required
                        />
                      </FormGroup>

                      <FormGroup>
                        <FormLabel>Phone Number</FormLabel>
                        <FormInput
                          type="tel"
                          name="phone"
                          value={bookingData.phone}
                          onChange={handleInputChange}
                          placeholder="+1 (555) 123-4567"
                          hasValue={!!bookingData.phone}
                          required
                        />
                      </FormGroup>
                    </>
                  )}

                  {currentStep === 3 && (
                    <>
                      <FormGroup>
                        <FormLabel>Preferred Date</FormLabel>
                        <FormInput
                          type="date"
                          name="preferredDate"
                          value={bookingData.preferredDate}
                          onChange={handleInputChange}
                          hasValue={!!bookingData.preferredDate}
                          required
                        />
                      </FormGroup>

                      <FormGroup>
                        <FormLabel>Preferred Time</FormLabel>
                        <FormSelect
                          name="preferredTime"
                          value={bookingData.preferredTime}
                          onChange={handleInputChange}
                          hasValue={!!bookingData.preferredTime}
                          required
                        >
                          <option value="">Select preferred time</option>
                          <option value="09:00">9:00 AM</option>
                          <option value="11:00">11:00 AM</option>
                          <option value="14:00">2:00 PM</option>
                          <option value="16:00">4:00 PM</option>
                          <option value="18:00">6:00 PM (Weekend only)</option>
                        </FormSelect>
                      </FormGroup>

                      <FormGroup>
                        <FormLabel>Number of Participants</FormLabel>
                        <FormSelect
                          name="participants"
                          value={bookingData.participants}
                          onChange={handleInputChange}
                          hasValue={!!bookingData.participants}
                          required
                        >
                          <option value="1">1 Person</option>
                          <option value="2">2 People</option>
                          <option value="3">3 People</option>
                          <option value="4">4 People</option>
                          <option value="group">Group (5+ people)</option>
                        </FormSelect>
                      </FormGroup>

                      <FormGroup>
                        <FormLabel>Special Requests or Notes</FormLabel>
                        <FormTextarea
                          name="specialRequests"
                          value={bookingData.specialRequests}
                          onChange={handleInputChange}
                          placeholder="Any special requirements, dietary restrictions, or additional information..."
                          hasValue={!!bookingData.specialRequests}
                        />
                      </FormGroup>

                      {selectedPackageData && (
                        <BookingSummary
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                        >
                          <SummaryTitle>Booking Summary</SummaryTitle>
                          <SummaryItem>
                            <span className="label">Experience:</span>
                            <span className="value">{selectedPackageData.title}</span>
                          </SummaryItem>
                          <SummaryItem>
                            <span className="label">Date:</span>
                            <span className="value">{bookingData.preferredDate || 'Not selected'}</span>
                          </SummaryItem>
                          <SummaryItem>
                            <span className="label">Time:</span>
                            <span className="value">{bookingData.preferredTime || 'Not selected'}</span>
                          </SummaryItem>
                          <SummaryItem>
                            <span className="label">Participants:</span>
                            <span className="value">{bookingData.participants}</span>
                          </SummaryItem>
                          <TotalAmount>
                            <span>Total Amount:</span>
                            <span>${totalAmount * parseInt(bookingData.participants || '1')}</span>
                          </TotalAmount>
                        </BookingSummary>
                      )}
                    </>
                  )}

                  <FormButtons>
                    {currentStep > 1 && (
                      <BackButton
                        type="button"
                        onClick={prevStep}
                        size="md"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Previous
                      </BackButton>
                    )}
                    
                    <div style={{ marginLeft: 'auto' }}>
                      {currentStep < 3 ? (
                        <FloatingButton
                          type="button"
                          onClick={nextStep}
                          size="md"
                          variant="gold"
                          disabled={currentStep === 1 && !selectedPackage}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Continue
                        </FloatingButton>
                      ) : (
                        <FloatingButton
                          type="submit"
                          size="md"
                          variant="gold"
                          disabled={isSubmitting}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {isSubmitting ? 'Processing...' : 'Confirm Booking'}
                        </FloatingButton>
                      )}
                    </div>
                  </FormButtons>
                </motion.form>
              )}
            </AnimatePresence>
          </BookingForm>
        ) : (
          <div style={{textAlign:'center', color:'rgba(255,255,255,0.7)', fontSize:'1.1rem', marginTop:'2rem'}}>Please select an experience to book.</div>
        )}
      </BookingCard>
    </BookingContainer>
  );
};
