import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { LuxurySection, LuxuryText, GlassCard, FloatingButton, ParticleBackground } from '../ui/LuxuryComponents';
import { luxuryTheme } from '../../constants/luxuryTheme';
import { usePremiumReveal, useParallaxEffect, useMagneticEffect } from '../../hooks/useLuxuryAnimations';

// --- Styled Components ---
const ContactContainer = styled(LuxurySection).attrs({ background: 'gradient' })`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 0;
  position: relative;
  overflow: hidden;
`;

const ContactHero = styled(motion.div)`
  text-align: center;
  margin: 0 auto;
  padding-top: 7rem;
  padding-bottom: 3.5rem;
  max-width: 900px;
  width: 100%;
  z-index: 2;
`;

const ContactTitle = styled(motion.h1)`
  font-family: ${luxuryTheme.typography.fonts.luxury};
  font-size: 3.2rem;
  font-weight: ${luxuryTheme.typography.weights.bold};
  color: ${luxuryTheme.colors.white};
  margin-bottom: 1.2rem;
  text-shadow: 3px 3px 12px rgba(0, 0, 0, 0.9);
  background: linear-gradient(135deg, #D4AF37 0%, #FFFFFF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  @media (min-width: 768px) { font-size: 4rem; }
  @media (min-width: 1200px) { font-size: 5rem; }
`;

const ContactSubtitle = styled(motion.p)`
  font-family: ${luxuryTheme.typography.fonts.primary};
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.9);
  max-width: 700px;
  margin: 0 auto 2.5rem;
  line-height: 1.6;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.8);
  @media (min-width: 1440px) { font-size: 1.5rem; max-width: 900px; }
`;

const ContactCard = styled(GlassCard)`
  max-width: 1100px;
  width: 100%;
  margin: 0 auto 3rem auto;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 2.5rem;
  background: transparent;
  box-shadow: none;
  border-radius: 2rem;
  padding: 0;
  position: relative;
  z-index: 3;

  @media (min-width: 900px) {
    flex-direction: row;
    gap: 3rem;
    align-items: flex-start;
  }
`;

const ContactInfo = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  flex: 1 1 0;
  min-width: 0;
`;

const InfoCard = styled(GlassCard)`
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  padding: 2rem;
  position: relative;
  overflow: hidden;
`;

const InfoIcon = styled.div`
  width: 50px;
  height: 50px;
  background: ${luxuryTheme.gradients.goldNavy};
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const InfoTitle = styled.h3`
  font-family: ${luxuryTheme.typography.fonts.luxury};
  color: ${luxuryTheme.colors.white};
  font-size: 1.2rem;
  font-weight: ${luxuryTheme.typography.weights.bold};
  margin-bottom: 0.5rem;
`;

const InfoText = styled.p`
  font-family: ${luxuryTheme.typography.fonts.primary};
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin-bottom: 0.2rem;
`;

const ContactForm = styled(motion.form)`
  background: #fff;
  border-radius: 1.5rem;
  box-shadow: 0 8px 40px 0 rgba(0,0,0,0.10);
  padding: 2.5rem 2rem;
  position: relative;
  overflow: hidden;
  border: none;
  color: #222;
  flex: 1 1 0;
  min-width: 0;
  @media (min-width: 900px) {
    min-width: 380px;
    max-width: 480px;
  }
`;

const FormTitle = styled(LuxuryText)`
  color: #222;
  text-align: center;
  margin-bottom: 1.5rem;
`;

const FormGroup = styled(motion.div)`
  margin-bottom: 1.2rem;
  position: relative;
`;

const FormLabel = styled(motion.label)`
  font-family: ${luxuryTheme.typography.fonts.primary};
  color: #222;
  font-size: 0.95rem;
  font-weight: ${luxuryTheme.typography.weights.medium};
  margin-bottom: 0.3rem;
  display: block;
`;

const FormInput = styled(motion.input)<{ hasValue: boolean }>`
  width: 100%;
  background: #f7f7f7;
  border: 1px solid #e0e0e0;
  border-radius: 0.7rem;
  padding: 0.9rem 1.2rem;
  color: #222;
  font-family: ${luxuryTheme.typography.fonts.primary};
  font-size: 1rem;
  outline: none;
  transition: all 0.3s ease;
  &::placeholder { color: #aaa; }
`;

const FormTextarea = styled(motion.textarea)<{ hasValue: boolean }>`
  width: 100%;
  background: #f7f7f7;
  border: 1px solid #e0e0e0;
  border-radius: 0.7rem;
  padding: 0.9rem 1.2rem;
  color: #222;
  font-family: ${luxuryTheme.typography.fonts.primary};
  font-size: 1rem;
  outline: none;
  transition: all 0.3s ease;
  min-height: 100px;
  resize: vertical;
  &::placeholder { color: #aaa; }
`;

const FormSubmitButton = styled(FloatingButton)`
  width: 100%;
  justify-content: center;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  background: ${luxuryTheme.gradients.goldNavy};
  color: #fff;
  border: none;
`;

const SuccessMessage = styled(motion.div)`
  background: #e8f5e9;
  border: 1px solid #b2dfdb;
  border-radius: 1rem;
  padding: 1rem 1.5rem;
  color: #388e3c;
  font-family: ${luxuryTheme.typography.fonts.primary};
  text-align: center;
  margin-bottom: 1rem;
`;

// --- Data ---
const contactInfo = [
  { icon: '📍', title: 'Visit Our Center', details: ['123 Equestrian Way', 'Premium Valley, PV 12345', 'United States'] },
  { icon: '📞', title: 'Call Us', details: ['+1 (555) 123-4567', '+1 (555) 987-6543', 'Available 7 days a week'] },
  { icon: '✉️', title: 'Email Us', details: ['info@premiumequestrian.com', 'bookings@premiumequestrian.com', 'Quick response guaranteed'] },
  { icon: '⏰', title: 'Operating Hours', details: ['Monday - Friday: 6:00 AM - 8:00 PM', 'Saturday - Sunday: 7:00 AM - 6:00 PM', 'Holiday hours may vary'] },
];

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

// --- Main Component ---
export const ContactSection: React.FC = () => {
  const { ref: containerRef, inView } = usePremiumReveal();
  const parallaxRef = useParallaxEffect(0.3);
  const magneticRef = useMagneticEffect(1.5);
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', phone: '', service: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
    }, 3000);
  };

  return (
    <ContactContainer ref={containerRef as any} id="contact-section">
      <ParticleBackground ref={parallaxRef as any} />
      <ContactHero
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <ContactTitle
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          Contact Mam Center
        </ContactTitle>
        <ContactSubtitle
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          Reach out to us for premium equestrian services, bookings, or any questions. Our team is ready to help you achieve your riding goals in style.
        </ContactSubtitle>
      </ContactHero>
      <ContactCard>
        <ContactInfo
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0, x: -60 },
            visible: {
              opacity: 1, x: 0,
              transition: { staggerChildren: 0.13, delayChildren: 0.2, duration: 1, ease: [0.22, 1, 0.36, 1] }
            }
          }}
        >
          {contactInfo.map((info, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.4 + index * 0.13, ease: [0.22, 1, 0.36, 1] }}
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
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0, x: 60 },
            visible: {
              opacity: 1, x: 0,
              transition: { staggerChildren: 0.09, delayChildren: 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] }
            }
          }}
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
      </ContactCard>
    </ContactContainer>
  );
};
