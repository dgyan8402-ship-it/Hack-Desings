import React, { useState } from 'react';
import { Phone, MessageSquare, Mail, MapPin, Clock, Send, CheckCircle2, Sparkles } from 'lucide-react';
import { BRAND } from '../data/brand';
import { ContactFormData } from '../types';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: 'Scent Consultation',
    message: ''
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const errs: Partial<Record<keyof ContactFormData, string>> = {};
    if (!formData.name.trim()) errs.name = 'Please provide your name';
    if (!formData.email.trim() || !formData.email.includes('@')) {
      errs.email = 'Please provide a valid email address';
    }
    if (!formData.message.trim() || formData.message.length < 5) {
      errs.message = 'Please enter your message (at least 5 characters)';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'Scent Consultation',
        message: ''
      });
      setTimeout(() => setIsSuccess(false), 6000);
    }, 900);
  };

  return (
    <section id="contact" className="py-24 bg-transparent relative overflow-hidden border-t border-white/10">
      
      {/* Background Ambient Glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-[#D4AF37]/[0.05] blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/5 border border-white/10 text-[#D4AF37] text-xs uppercase tracking-[0.25em] font-medium backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Atelier Concierge</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-[#F5F5F0]">
            Connect With Our <span className="italic text-gold-gradient font-normal">Perfumers</span>
          </h2>

          <p className="text-[#b8afa3] text-sm sm:text-base font-light">
            Have questions about fragrance notes, custom gift sets, or urgent same-day deliveries across Accra? We are at your service.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          
          {/* Left Column: Direct Atelier Information (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="p-8 rounded-[2rem] glass-panel-dark border border-white/15 space-y-6 shadow-2xl">
              <h3 className="font-serif text-2xl text-[#F5F5F0]">Boutique & Concierge</h3>

              <div className="space-y-4 text-xs sm:text-sm text-[#d8cfc4]">
                
                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#D4AF37] flex-shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[#8e857b] text-xs uppercase tracking-wider">Phone & Inquiries</div>
                    <a href={`tel:${BRAND.phone}`} className="text-[#F5F5F0] hover:text-[#D4AF37] font-medium transition-colors">
                      {BRAND.phone}
                    </a>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[#8e857b] text-xs uppercase tracking-wider">Direct WhatsApp Chat</div>
                    <a
                      href={`https://wa.me/${BRAND.whatsapp.replace(/[^0-9]/g, '')}?text=Hello%20ÉLORA%20Concierge,%20I%20would%20like%20to%20inquire%20about%20your%20fragrances`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:underline font-medium"
                    >
                      Chat with Scent Consultant →
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#D4AF37] flex-shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[#8e857b] text-xs uppercase tracking-wider">Email Concierge</div>
                    <a href={`mailto:${BRAND.email}`} className="text-[#F5F5F0] hover:text-[#D4AF37] transition-colors">
                      {BRAND.email}
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#D4AF37] flex-shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[#8e857b] text-xs uppercase tracking-wider">Atelier Location</div>
                    <p className="text-[#F5F5F0]">{BRAND.address}</p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#D4AF37] flex-shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[#8e857b] text-xs uppercase tracking-wider">Concierge Hours</div>
                    <p className="text-[#F5F5F0]">{BRAND.hours}</p>
                  </div>
                </div>

              </div>

            </div>

          </div>

          {/* Right Column: Contact Form (7 Cols) */}
          <div className="lg:col-span-7">
            
            <div className="p-8 sm:p-10 rounded-[2rem] glass-panel-dark border border-white/15 space-y-6 shadow-2xl">
              
              <div className="space-y-1">
                <h3 className="text-xl sm:text-2xl font-serif text-[#F5F5F0]">Send Us a Message</h3>
                <p className="text-xs text-[#8e857b]">
                  Our master scent consultants respond to all inquiries within 2 hours.
                </p>
              </div>

              {isSuccess && (
                <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 flex items-center gap-3 text-emerald-300 text-xs animate-fadeIn">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                  <span>Message sent successfully! Our concierge will reach out via WhatsApp/email promptly.</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-[#b8afa3] block mb-1">Your Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Kwesi Thompson"
                      className={`w-full bg-black/40 border rounded-xl px-4 py-2.5 text-xs text-[#F5F5F0] placeholder-[#6b6257] focus:outline-none ${
                        errors.name ? 'border-red-500' : 'border-white/10 focus:border-[#D4AF37]'
                      }`}
                    />
                    {errors.name && <p className="text-[10px] text-red-400 mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="text-xs text-[#b8afa3] block mb-1">Email Address *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. kwesi@example.com"
                      className={`w-full bg-black/40 border rounded-xl px-4 py-2.5 text-xs text-[#F5F5F0] placeholder-[#6b6257] focus:outline-none ${
                        errors.email ? 'border-red-500' : 'border-white/10 focus:border-[#D4AF37]'
                      }`}
                    />
                    {errors.email && <p className="text-[10px] text-red-400 mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-[#b8afa3] block mb-1">Phone / WhatsApp Number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +233 24 123 4567"
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-[#F5F5F0] placeholder-[#6b6257] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-[#b8afa3] block mb-1">Inquiry Topic</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-[#F5F5F0] focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option value="Scent Consultation" className="bg-[#121212] text-[#F5F5F0]">Personal Scent Consultation</option>
                      <option value="Order Inquiries" className="bg-[#121212] text-[#F5F5F0]">Order Status & Urgent Dispatch</option>
                      <option value="Bespoke Gifting" className="bg-[#121212] text-[#F5F5F0]">Luxury Gifting & Corporate Hampers</option>
                      <option value="Wholesale" className="bg-[#121212] text-[#F5F5F0]">Wholesale & Stockist Inquiries</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-[#b8afa3] block mb-1">Message *</label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="How may our fragrance concierge assist your scent journey today?"
                    className={`w-full bg-black/40 border rounded-xl px-4 py-2.5 text-xs text-[#F5F5F0] placeholder-[#6b6257] focus:outline-none ${
                      errors.message ? 'border-red-500' : 'border-white/10 focus:border-[#D4AF37]'
                    }`}
                  />
                  {errors.message && <p className="text-[10px] text-red-400 mt-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#D4AF37] hover:bg-white text-black font-bold text-xs uppercase tracking-widest hover:shadow-[0_0_25px_rgba(212,175,55,0.3)] transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Transmitting Message...' : 'Send Message'}</span>
                </button>

              </form>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
