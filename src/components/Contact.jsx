import { useState } from 'react'
import { useFadeUp } from '../hooks/useFadeUp'

const INITIAL_FORM = {
  firstName: '', lastName: '', phone: '', email: '', vessel: '', message: '',
}

export default function Contact() {
  const [form, setForm] = useState(INITIAL_FORM)
  const [submitStatus, setSubmitStatus] = useState(null) // null | 'success' | 'error'

  const [infoRef, infoVisible] = useFadeUp()
  const [formRef, formVisible] = useFadeUp()

  const handleChange = e => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (!form.firstName.trim() || !form.email.trim()) {
      setSubmitStatus('error')
      return
    }
    // Replace with Formspree / Netlify Forms / backend in production
    setSubmitStatus('success')
    setForm(INITIAL_FORM)
  }

  return (
    <section id="contact">
      <div className="container">
        <div className="contact-inner">

          {/* Info side */}
          <div ref={infoRef} className={`contact-info fade-up${infoVisible ? ' visible' : ''}`}>
            <span className="section-label">Get In Touch</span>
            <h2>Ready to Set Sail?</h2>
            <p>
              Tell us when you&rsquo;d like to go, how many are in your group, and what kind of
              experience you&rsquo;re after — we&rsquo;ll build the perfect charter around you.
              Your journey is our destination.
            </p>
            <div className="contact-methods">
              <a href="tel:02393960397" className="contact-method">
                <div className="contact-method-icon">📞</div>
                <div>
                  <div className="contact-method-label">Call Us</div>
                  <div className="contact-method-value">023 9396 0397</div>
                </div>
              </a>
              <a href="mailto:info@solentboatcharter.com" className="contact-method">
                <div className="contact-method-icon">✉️</div>
                <div>
                  <div className="contact-method-label">Email Us</div>
                  <div className="contact-method-value">info@solentboatcharter.com</div>
                </div>
              </a>
              <div className="contact-method">
                <div className="contact-method-icon">📍</div>
                <div>
                  <div className="contact-method-label">Based At</div>
                  <div className="contact-method-value">Port Solent · Hamble · Ocean Village</div>
                </div>
              </div>
            </div>
          </div>

          {/* Form side */}
          <div ref={formRef} className={`contact-form fade-up delay-1${formVisible ? ' visible' : ''}`}>
            <form onSubmit={handleSubmit} noValidate>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input id="firstName" name="firstName" type="text" placeholder="John"
                    value={form.firstName} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input id="lastName" name="lastName" type="text" placeholder="Smith"
                    value={form.lastName} onChange={handleChange} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input id="phone" name="phone" type="tel" placeholder="07700 000000"
                    value={form.phone} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" placeholder="john@example.com"
                    value={form.email} onChange={handleChange} required />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="vessel">Preferred Vessel</label>
                <select id="vessel" name="vessel" value={form.vessel} onChange={handleChange}>
                  <option value="">— Select a boat —</option>
                  <option>Princess V58 &quot;No Limits&quot;</option>
                  <option>Sealine F42 Flybridge</option>
                  <option>Highfield Patrol 860 &quot;Aquatherapy&quot;</option>
                  <option>Highfield Patrol 760 &quot;Aquaholic / Aquadiction&quot;</option>
                  <option>Axopar 28 &quot;Thalassa&quot;</option>
                  <option>Not sure — advise me</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="message">Charter Details</label>
                <textarea id="message" name="message"
                  placeholder="Tell us your date, number of guests, departure point, occasion, and where you'd like to go..."
                  value={form.message} onChange={handleChange} />
              </div>

              <button type="submit" className="btn btn-primary form-submit">
                Send Enquiry →
              </button>

              {submitStatus === 'success' && (
                <p style={{
                  padding: '14px 18px', borderRadius: '8px', fontSize: '14px',
                  marginTop: '16px', fontWeight: 500,
                  background: 'rgba(26,180,100,0.12)', color: '#4cde97',
                  border: '1px solid rgba(26,180,100,0.25)',
                }}>
                  Thanks {form.firstName || ''}! We&rsquo;ve received your enquiry and will be in touch shortly.
                </p>
              )}
              {submitStatus === 'error' && (
                <p style={{
                  padding: '14px 18px', borderRadius: '8px', fontSize: '14px',
                  marginTop: '16px', fontWeight: 500,
                  background: 'rgba(255,60,60,0.1)', color: '#ff7070',
                  border: '1px solid rgba(255,60,60,0.2)',
                }}>
                  Please fill in your name and email address.
                </p>
              )}
            </form>
          </div>

        </div>
      </div>
    </section>
  )
}
