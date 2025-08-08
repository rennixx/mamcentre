import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
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

const BookingViewContainer = styled(LuxurySection)`
  background: linear-gradient(
    135deg,
    ${luxuryTheme.colors.primary.navy} 0%,
    #0F1419 25%,
    ${luxuryTheme.colors.primary.navyLight} 50%,
    #1A2332 75%,
    ${luxuryTheme.colors.primary.navy} 100%
  );
  min-height: 100vh;
  padding: 6rem 2rem 4rem;
  position: relative;
  overflow: hidden;
`;

const BookingContent = styled.div`
  max-width: 1200px;
  width: 100%;
  z-index: 10;
  position: relative;
`;

const BookingHeader = styled(motion.div)`
  text-align: center;
  margin-bottom: 3rem;
`;

const SectionTitle = styled(LuxuryText)`
  color: ${luxuryTheme.colors.white};
  margin-bottom: 1rem;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 3px;
    background: ${luxuryTheme.gradients.goldNavy};
    border-radius: 2px;
  }
`;

const StatusBadge = styled.span<{ status: 'confirmed' | 'pending' | 'cancelled' }>`
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-family: ${luxuryTheme.typography.fonts.primary};
  font-size: 0.875rem;
  font-weight: ${luxuryTheme.typography.weights.medium};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  background: ${({ status }) => {
    switch (status) {
      case 'confirmed': return 'rgba(34, 197, 94, 0.2)';
      case 'pending': return 'rgba(251, 191, 36, 0.2)';
      case 'cancelled': return 'rgba(239, 68, 68, 0.2)';
      default: return 'rgba(156, 163, 175, 0.2)';
    }
  }};
  
  color: ${({ status }) => {
    switch (status) {
      case 'confirmed': return '#22c55e';
      case 'pending': return '#fbbf24';
      case 'cancelled': return '#ef4444';
      default: return '#9ca3af';
    }
  }};
  
  border: 1px solid ${({ status }) => {
    switch (status) {
      case 'confirmed': return 'rgba(34, 197, 94, 0.3)';
      case 'pending': return 'rgba(251, 191, 36, 0.3)';
      case 'cancelled': return 'rgba(239, 68, 68, 0.3)';
      default: return 'rgba(156, 163, 175, 0.3)';
    }
  }};
`;

const BookingCard = styled(GlassCard)`
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(30px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  padding: 2.5rem;
  margin-bottom: 2rem;
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
  }
`;

const BookingGrid = styled.div`
  display: grid;
  gap: 2rem;
  
  @media (min-width: 768px) {
    grid-template-columns: 2fr 1fr;
  }
`;

const BookingDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  &:last-child {
    border-bottom: none;
  }
`;

const DetailLabel = styled.span`
  font-family: ${luxuryTheme.typography.fonts.primary};
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.95rem;
  font-weight: ${luxuryTheme.typography.weights.medium};
`;

const DetailValue = styled.span`
  font-family: ${luxuryTheme.typography.fonts.primary};
  color: ${luxuryTheme.colors.white};
  font-size: 1rem;
  font-weight: ${luxuryTheme.typography.weights.semibold};
  text-align: right;
`;

const BookingActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: stretch;
`;

const ActionButton = styled(FloatingButton)<{ variant?: 'primary' | 'secondary' | 'danger' }>`
  width: 100%;
  justify-content: center;
  
  ${({ variant = 'primary' }) => {
    switch (variant) {
      case 'secondary':
        return `
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.3);
          &:hover {
            background: rgba(255, 255, 255, 0.15);
            border-color: rgba(255, 255, 255, 0.5);
          }
        `;
      case 'danger':
        return `
          background: rgba(239, 68, 68, 0.2);
          border-color: rgba(239, 68, 68, 0.5);
          &:hover {
            background: rgba(239, 68, 68, 0.3);
            border-color: rgba(239, 68, 68, 0.7);
          }
        `;
      default:
        return '';
    }
  }}
`;

const EmptyState = styled(motion.div)`
  text-align: center;
  padding: 4rem 2rem;
`;

const EmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 2rem;
  color: rgba(255, 255, 255, 0.3);
`;

const EmptyTitle = styled.h3`
  font-family: ${luxuryTheme.typography.fonts.luxury};
  color: ${luxuryTheme.colors.white};
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const EmptyDescription = styled.p`
  font-family: ${luxuryTheme.typography.fonts.primary};
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

// Mock booking data - in real app this would come from API/database
interface BookingData {
  id: string;
  service: string;
  date: string;
  time: string;
  duration: string;
  instructor: string;
  participants: number;
  price: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  notes: string;
  createdAt: string;
}

const mockBookings: BookingData[] = [
  {
    id: 'BK-2025-001',
    service: 'Championship Program',
    date: '2025-08-15',
    time: '14:00',
    duration: '2 hours',
    instructor: 'Sarah Johnson',
    participants: 1,
    price: 350,
    status: 'confirmed' as const,
    notes: 'Beginner level, focusing on basic techniques',
    createdAt: '2025-08-08'
  },
  {
    id: 'BK-2025-002',
    service: 'Intermediate Training',
    date: '2025-08-22',
    time: '11:00',
    duration: '1.5 hours',
    instructor: 'Michael Torres',
    participants: 2,
    price: 400,
    status: 'pending' as const,
    notes: 'Advanced jumping techniques',
    createdAt: '2025-08-07'
  }
];

interface BookingViewPageProps {
  bookingId?: string;
}

export const BookingViewPage: React.FC<BookingViewPageProps> = ({ bookingId }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { ref: containerRef, inView } = useOptimizedReveal();
  const [bookings, setBookings] = useState<BookingData[]>(mockBookings);
  const [selectedBooking, setSelectedBooking] = useState<BookingData | null>(null);
  
  usePerformantScroll();

  useEffect(() => {
    const targetId = bookingId || id;
    if (targetId) {
      const booking = bookings.find(b => b.id === targetId);
      setSelectedBooking(booking || null);
    }
  }, [id, bookingId, bookings]);

  const handleCancelBooking = (bookingId: string) => {
    setBookings(prev => prev.map(booking => 
      booking.id === bookingId 
        ? { ...booking, status: 'cancelled' as const }
        : booking
    ));
  };

  const handleReschedule = (bookingId: string) => {
    // In real app, would navigate to reschedule flow
    navigate(`/booking/reschedule/${bookingId}`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    return new Date(`2025-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  // Single booking view
  if (selectedBooking) {
    return (
      <BookingViewContainer ref={containerRef as any}>
        <ParticleBackground />
        
        <BookingContent>
          <BookingHeader
            initial={{ opacity: 0, y: -30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
            transition={{ duration: 0.8 }}
          >
            <SectionTitle size="xl">
              Booking Details
            </SectionTitle>
            <StatusBadge status={selectedBooking.status}>
              {selectedBooking.status}
            </StatusBadge>
          </BookingHeader>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <BookingCard>
              <BookingGrid>
                <BookingDetails>
                  <DetailRow>
                    <DetailLabel>Booking Reference</DetailLabel>
                    <DetailValue>{selectedBooking.id}</DetailValue>
                  </DetailRow>
                  
                  <DetailRow>
                    <DetailLabel>Service</DetailLabel>
                    <DetailValue>{selectedBooking.service}</DetailValue>
                  </DetailRow>
                  
                  <DetailRow>
                    <DetailLabel>Date</DetailLabel>
                    <DetailValue>{formatDate(selectedBooking.date)}</DetailValue>
                  </DetailRow>
                  
                  <DetailRow>
                    <DetailLabel>Time</DetailLabel>
                    <DetailValue>{formatTime(selectedBooking.time)}</DetailValue>
                  </DetailRow>
                  
                  <DetailRow>
                    <DetailLabel>Duration</DetailLabel>
                    <DetailValue>{selectedBooking.duration}</DetailValue>
                  </DetailRow>
                  
                  <DetailRow>
                    <DetailLabel>Instructor</DetailLabel>
                    <DetailValue>{selectedBooking.instructor}</DetailValue>
                  </DetailRow>
                  
                  <DetailRow>
                    <DetailLabel>Participants</DetailLabel>
                    <DetailValue>{selectedBooking.participants}</DetailValue>
                  </DetailRow>
                  
                  <DetailRow>
                    <DetailLabel>Total Amount</DetailLabel>
                    <DetailValue>${selectedBooking.price}</DetailValue>
                  </DetailRow>
                  
                  {selectedBooking.notes && (
                    <DetailRow>
                      <DetailLabel>Notes</DetailLabel>
                      <DetailValue>{selectedBooking.notes}</DetailValue>
                    </DetailRow>
                  )}
                </BookingDetails>

                <BookingActions>
                  {selectedBooking.status === 'confirmed' && (
                    <>
                      <ActionButton
                        variant="secondary"
                        onClick={() => handleReschedule(selectedBooking.id)}
                      >
                        Reschedule
                      </ActionButton>
                      <ActionButton
                        variant="danger"
                        onClick={() => handleCancelBooking(selectedBooking.id)}
                      >
                        Cancel Booking
                      </ActionButton>
                    </>
                  )}
                  
                  {selectedBooking.status === 'pending' && (
                    <ActionButton
                      variant="danger"
                      onClick={() => handleCancelBooking(selectedBooking.id)}
                    >
                      Cancel Request
                    </ActionButton>
                  )}
                  
                  <ActionButton
                    as={Link}
                    to="/my-bookings"
                    variant="secondary"
                  >
                    View All Bookings
                  </ActionButton>
                  
                  <ActionButton
                    as={Link}
                    to="/booking"
                    variant="primary"
                  >
                    New Booking
                  </ActionButton>
                </BookingActions>
              </BookingGrid>
            </BookingCard>
          </motion.div>
        </BookingContent>
      </BookingViewContainer>
    );
  }

  // All bookings view
  return (
    <BookingViewContainer ref={containerRef as any}>
      <ParticleBackground />
      
      <BookingContent>
        <BookingHeader
          initial={{ opacity: 0, y: -30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.8 }}
        >
          <SectionTitle size="xl">
            My Bookings
          </SectionTitle>
          <p style={{ 
            color: 'rgba(255, 255, 255, 0.8)', 
            fontSize: '1.1rem', 
            marginTop: '1rem' 
          }}>
            Manage and track your equestrian experiences
          </p>
        </BookingHeader>

        <AnimatePresence mode="wait">
          {bookings.length === 0 ? (
            <EmptyState
              key="empty"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
            >
              <EmptyIcon>🏇</EmptyIcon>
              <EmptyTitle>No Bookings Yet</EmptyTitle>
              <EmptyDescription>
                You haven't made any bookings yet. Start your equestrian journey by booking your first lesson!
              </EmptyDescription>
              <FloatingButton
                as={Link}
                to="/booking"
                size="lg"
                variant="gold"
              >
                Book Your First Lesson
              </FloatingButton>
            </EmptyState>
          ) : (
            <motion.div
              key="bookings"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {bookings.map((booking, index) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.8, delay: 0.1 * index }}
                >
                  <BookingCard>
                    <BookingGrid>
                      <BookingDetails>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                          <h3 style={{ 
                            fontFamily: luxuryTheme.typography.fonts.luxury,
                            color: luxuryTheme.colors.white,
                            fontSize: '1.3rem',
                            margin: 0
                          }}>
                            {booking.service}
                          </h3>
                          <StatusBadge status={booking.status}>
                            {booking.status}
                          </StatusBadge>
                        </div>
                        
                        <DetailRow>
                          <DetailLabel>Reference</DetailLabel>
                          <DetailValue>{booking.id}</DetailValue>
                        </DetailRow>
                        
                        <DetailRow>
                          <DetailLabel>Date & Time</DetailLabel>
                          <DetailValue>
                            {formatDate(booking.date)} at {formatTime(booking.time)}
                          </DetailValue>
                        </DetailRow>
                        
                        <DetailRow>
                          <DetailLabel>Instructor</DetailLabel>
                          <DetailValue>{booking.instructor}</DetailValue>
                        </DetailRow>
                        
                        <DetailRow>
                          <DetailLabel>Amount</DetailLabel>
                          <DetailValue>${booking.price}</DetailValue>
                        </DetailRow>
                      </BookingDetails>

                      <BookingActions>
                        <ActionButton
                          as={Link}
                          to={`/booking/${booking.id}`}
                          variant="primary"
                        >
                          View Details
                        </ActionButton>
                        
                        {booking.status === 'confirmed' && (
                          <ActionButton
                            variant="secondary"
                            onClick={() => handleReschedule(booking.id)}
                          >
                            Reschedule
                          </ActionButton>
                        )}
                      </BookingActions>
                    </BookingGrid>
                  </BookingCard>
                </motion.div>
              ))}
              
              <motion.div
                style={{ textAlign: 'center', marginTop: '3rem' }}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <FloatingButton
                  as={Link}
                  to="/booking"
                  size="lg"
                  variant="gold"
                >
                  Book Another Experience
                </FloatingButton>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </BookingContent>
    </BookingViewContainer>
  );
};
