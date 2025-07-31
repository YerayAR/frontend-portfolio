import { useState } from 'react';
import styles from '../styles/Contact.module.css';

const socialLinks = [
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/yeray-alonso',
    icon: '💼',
    color: '#0077b5'
  },
  {
    name: 'GitHub',
    url: 'https://github.com/yeray-alonso',
    icon: '💻',
    color: '#333'
  },
  {
    name: 'Newsletter',
    url: 'https://neon-bytes.vercel.app',
    icon: '📧',
    color: '#ff6b35'
  },
  {
    name: 'Email',
    url: 'mailto:yeray.alonso@example.com',
    icon: '✉️',
    color: '#ea4335'
  }
];

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!form.message.trim()) newErrors.message = 'Message is required';
    if (form.message.length > 500) newErrors.message = 'Message must be less than 500 characters';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    setStatus('');
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      
      const data = await res.json();
      
      if (data.success) {
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className={`${styles.contact} section`}>
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        
        <div className={styles.contactContent}>
          <div className={styles.contactInfo}>
            <h3>Let's Connect</h3>
            <p>
              I'm always interested in new opportunities, collaborations, and 
              conversations about technology and innovation. Whether you have a 
              project in mind, want to discuss automation solutions, or just 
              want to connect, I'd love to hear from you.
            </p>
            
            <div className={styles.socialLinks}>
              <h4>Find me on:</h4>
              <div className={styles.socialGrid}>
                {socialLinks.map(link => (
                  <a 
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                    style={{ '--social-color': link.color }}
                  >
                    <span className={styles.socialIcon}>{link.icon}</span>
                    <span className={styles.socialName}>{link.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          <div className={styles.contactForm}>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <input 
                  name="name" 
                  placeholder="Your Name"
                  value={form.name} 
                  onChange={handleChange}
                  className={errors.name ? styles.error : ''}
                  required 
                />
                {errors.name && <span className={styles.errorText}>{errors.name}</span>}
              </div>
              
              <div className={styles.formGroup}>
                <input 
                  name="email" 
                  type="email" 
                  placeholder="Your Email"
                  value={form.email} 
                  onChange={handleChange}
                  className={errors.email ? styles.error : ''}
                  required 
                />
                {errors.email && <span className={styles.errorText}>{errors.email}</span>}
              </div>
              
              <div className={styles.formGroup}>
                <textarea 
                  name="message" 
                  placeholder="Your Message"
                  value={form.message} 
                  onChange={handleChange}
                  className={errors.message ? styles.error : ''}
                  rows={5}
                  maxLength={500}
                  required 
                />
                <div className={styles.charCount}>
                  {form.message.length}/500
                </div>
                {errors.message && <span className={styles.errorText}>{errors.message}</span>}
              </div>
              
              <button 
                type="submit" 
                className={styles.submitBtn}
                disabled={isLoading}
              >
                {isLoading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
            
            {status === 'success' && (
              <div className={styles.successMessage}>
                <span>✅</span> Thank you! Your message has been sent successfully.
              </div>
            )}
            
            {status === 'error' && (
              <div className={styles.errorMessage}>
                <span>❌</span> Sorry, there was an error sending your message. Please try again.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
