import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { 
  LuxurySection, 
  LuxuryText, 
  GlassCard,
  FloatingButton,
  ParticleBackground 
} from '../ui/LuxuryComponents';
import { luxuryTheme } from '../../constants/luxuryTheme';
import { 
  usePremiumReveal,
  useParallaxEffect,
  useMagneticEffect 
} from '../../hooks/useLuxuryAnimations';

const ContactContainer = styled(LuxurySection)`
  background: linear-gradient(
    135deg,
    ${luxuryTheme.colors.primary.navy} 0%,
    ${luxuryTheme.colors.primary.navyLight} 50%,
    ${luxuryTheme.colors.primary.navy} 100%
  );
  position: relative;
  padding: 8rem 2rem;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 30%, rgba(212, 175, 55, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 80% 70%, rgba(192, 192, 192, 0.1) 0%, transparent 50%),
      linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, transparent 100%);
    animation: contactGlow 20s ease-in-out infinite alternate;
  }
  
  @keyframes contactGlow {
    0% { opacity: 0.6; }
    50% { opacity: 1; }
    100% { opacity: 0.8; }
  }
`;

const ContactContent = styled.div`
  max-width: 1400px;
  width: 100%;
  z-index: 10;
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6rem;
  align-items: start;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 4rem;
  }
`;

const ContactInfo = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const SectionHeader = styled.div`
  margin-bottom: 3rem;
`;

const SectionTitle = styled(LuxuryText)`
  color: ${luxuryTheme.colors.white};
  margin-bottom: 1.5rem;
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
`;

const SectionSubtitle = styled.p`
  font-family: ${luxuryTheme.typography.fonts.primary};
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.2rem;
  line-height: 1.6;
  font-weight: ${luxuryTheme.typography.weights.light};
`;

const InfoCard = styled(GlassCard)`
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  padding: 2.5rem;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: ${luxuryTheme.gradients.goldNavy};
    transform: translateX(-100%);
    transition: transform 0.6s ease;
  }
  
  &:hover::before {
    transform: translateX(0);
  }
`;

const InfoIcon = styled.div`
  width: 60px;
  height: 60px;
  background: ${luxuryTheme.gradients.goldNavy};
  border-radius: ${luxuryTheme.borderRadius.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 10px 30px rgba(212, 175, 55, 0.3);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    inset: -1px;
    background: ${luxuryTheme.gradients.goldNavy};
    border-radius: inherit;
    z-index: -1;
    filter: blur(6px);
    opacity: 0.6;
  }
`;

const InfoTitle = styled.h3`
  font-family: ${luxuryTheme.typography.fonts.luxury};
  color: ${luxuryTheme.colors.white};
  font-size: 1.4rem;
  font-weight: ${luxuryTheme.typography.weights.bold};
  margin-bottom: 1rem;
`;

const InfoText = styled.p`
  font-family: ${luxuryTheme.typography.fonts.primary};
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin-bottom: 0.5rem;
`;

const ContactForm = styled(motion.form)`
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(30px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: ${luxuryTheme.borderRadius.xl};
  padding: 3rem;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${luxuryTheme.gradients.goldNavy};
    transform: translateX(-100%);
    transition: transform 0.8s ease;
  }
  
  &:hover::before {
    transform: translateX(0);
  }
`;

const FormTitle = styled(LuxuryText)`
  color: ${luxuryTheme.colors.white};
  text-align: center;
  margin-bottom: 2rem;
`;

const FormGroup = styled(motion.div)`
  margin-bottom: 2rem;
  position: relative;
`;

const FormLabel = styled(motion.label)`
  font-family: ${luxuryTheme.typography.fonts.primary};
  color: ${luxuryTheme.colors.gold.primary};
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
  min-height: 120px;
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

const FormSubmitButton = styled(FloatingButton)`
  width: 100%;
  justify-content: center;
  padding: 1.2rem 2rem;
  font-size: 1.1rem;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${luxuryTheme.gradients.goldNavy};
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover::before {
    opacity: 0.1;
  }
`;

const SuccessMessage = styled(motion.div)`
  background: rgba(76, 175, 80, 0.1);
  border: 1px solid rgba(76, 175, 80, 0.3);
  border-radius: ${luxuryTheme.borderRadius.md};
  padding: 1rem 1.5rem;
  color: #4CAF50;
  font-family: ${luxuryTheme.typography.fonts.primary};
  text-align: center;
  margin-bottom: 1rem;
  backdrop-filter: blur(10px);
`;

const FloatingElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  overflow: hidden;
`;

const FloatingOrb = styled(motion.div)<{ size: number; top: string; left: string }>`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background: radial-gradient(
    circle,
    rgba(212, 175, 55, 0.2) 0%,
    rgba(212, 175, 55, 0.1) 50%,
    transparent 100%
  );
  border-radius: 50%;
  top: ${props => props.top};
  left: ${props => props.left};
  filter: blur(2px);
  animation: float 15s ease-in-out infinite;
  
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(180deg); }
  }
`;

const contactInfo = [
  {
    icon: '📍',
    title: 'Visit Our Center',
    details: ['123 Equestrian Way', 'Premium Valley, PV 12345', 'United States']
  },
  {
    icon: '📞',
    title: 'Call Us',
    details: ['+1 (555) 123-4567', '+1 (555) 987-6543', 'Available 7 days a week']
  },
  {
    icon: '✉️',
    title: 'Email Us',
    details: ['info@premiumequestrian.com', 'bookings@premiumequestrian.com', 'Quick response guaranteed']
  },
  {
    icon: '⏰',
    title: 'Operating Hours',
    details: ['Monday - Friday: 6:00 AM - 8:00 PM', 'Saturday - Sunday: 7:00 AM - 6:00 PM', 'Holiday hours may vary']
  }
];

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

export const ContactSection: React.FC = () => {
  const { ref: containerRef, inView } = usePremiumReveal();
  const parallaxRef = useParallaxEffect(0.3);
  const magneticRef = useMagneticEffect(1.5);
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (inView && formRef.current) {
      gsap.fromTo(
        formRef.current.querySelectorAll('.form-group'),
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          stagger: 0.1,
          ease: "power2.out"
        }
      );
    }
  }, [inView]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after success message
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      });
    }, 3000);
  };

  return (
    <ContactContainer ref={containerRef as any} id="contact-section">
      <ParticleBackground ref={parallaxRef as any} />
      
      <FloatingElements>
        <FloatingOrb size={120} top="10%" left="5%" />
        <FloatingOrb size={80} top="60%" left="80%" />
        <FloatingOrb size={60} top="30%" left="90%" />
        <FloatingOrb size={100} top="80%" left="10%" />
      </FloatingElements>
      
      <ContactContent>
        <ContactInfo
          initial={{ opacity: 0, x: -60 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -60 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <SectionHeader>
            <SectionTitle size="xl">
              Get In Touch
            </SectionTitle>
            <SectionSubtitle>
              Ready to begin your premium equestrian journey? Contact us today to discuss 
              your goals and discover how we can elevate your riding experience.
            </SectionSubtitle>
          </SectionHeader>

          {contactInfo.map((info, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
            >
              <InfoCard as={motion.div} whileHover={{ y: -5, scale: 1.02 }}>
                <InfoIcon>{info.icon}</InfoIcon>
                <InfoTitle>{info.title}</InfoTitle>
                {info.details.map((detail, idx) => (
                  <InfoText key={idx}>{detail}</InfoText>
                ))}
              </InfoCard>
            </motion.div>
          ))}
        </ContactInfo>

        <ContactForm
          ref={formRef}
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 60 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 60 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <FormTitle size="lg">Send Us A Message</FormTitle>
          
          <AnimatePresence>
            {isSubmitted && (
              <SuccessMessage
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                Thank you! We'll get back to you within 24 hours.
              </SuccessMessage>
            )}
          </AnimatePresence>

          <FormGroup className="form-group">
            <FormLabel>Full Name</FormLabel>
            <FormInput
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              hasValue={!!formData.name}
              required
              whileFocus={{ scale: 1.02 }}
            />
          </FormGroup>

          <FormGroup className="form-group">
            <FormLabel>Email Address</FormLabel>
            <FormInput
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email address"
              hasValue={!!formData.email}
              required
              whileFocus={{ scale: 1.02 }}
            />
          </FormGroup>

          <FormGroup className="form-group">
            <FormLabel>Phone Number</FormLabel>
            <FormInput
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Enter your phone number"
              hasValue={!!formData.phone}
              whileFocus={{ scale: 1.02 }}
            />
          </FormGroup>

          <FormGroup className="form-group">
            <FormLabel>Service Interest</FormLabel>
            <FormInput
              as="select"
              name="service"
              value={formData.service}
              onChange={handleInputChange}
              hasValue={!!formData.service}
              required
            >
              <option value="">Select a service</option>
              <option value="riding-lessons">Premium Riding Lessons</option>
              <option value="competition-training">Competition Training</option>
              <option value="horse-care">Horse Care Education</option>
              <option value="therapeutic-riding">Therapeutic Riding</option>
              <option value="consultation">General Consultation</option>
            </FormInput>
          </FormGroup>

          <FormGroup className="form-group">
            <FormLabel>Message</FormLabel>
            <FormTextarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Tell us about your goals and how we can help..."
              hasValue={!!formData.message}
              required
              whileFocus={{ scale: 1.02 }}
            />
          </FormGroup>

          <FormSubmitButton
            type="submit"
            disabled={isSubmitting}
            size="lg"
            variant="gold"
            ref={magneticRef as any}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isSubmitting ? 'Sending Message...' : 'Send Message'}
          </FormSubmitButton>
        </ContactForm>
      </ContactContent>
    </ContactContainer>
  );
};
