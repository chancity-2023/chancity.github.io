/**
 * Tournament Registration Form Handler
 * Handles form submission to backend API
 */

class RegistrationHandler {
    constructor() {
        this.form = document.getElementById('tournamentRegistration');
        this.submitBtn = document.getElementById('submitBtn');
        this.submitMessage = document.getElementById('submitMessage');
        this.originalBtnText = this.submitBtn?.innerHTML || '<i class="fas fa-paper-plane"></i> Submit Registration';
        this.init();
    }

    init() {
        if (!this.form) return;
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        // Check registration status on page load
        this.checkRegistrationStatus();
    }

    async checkRegistrationStatus() {
        try {
            // Add timestamp to prevent caching
            const response = await fetch('https://gitback-mqnw.onrender.com/api/admin/settings/public/registration-status?t=' + Date.now());
            if (response.ok) {
                const data = await response.json();
                if (!data.registration_open) {
                    this.showRegistrationClosed();
                }
            }
        } catch (err) {
            console.warn('Could not check registration status:', err.message);
            // If we can't check, assume open (graceful degradation)
        }
    }

    showRegistrationClosed() {
        // Hide the form
        if (this.form) {
            this.form.style.display = 'none';
        }

        // Add responsive styles for registration closed message
        this.addClosedMessageStyles();

        // Create closed message
        const closedMessage = document.createElement('div');
        closedMessage.id = 'registration-closed-message';
        closedMessage.innerHTML = `
            <div class="closed-message-container">
                <img src="assets/chancity_logo_main.png" alt="Chan City Sports Club Logo" class="closed-logo">
                
                <div class="closed-badge">
                    <i class="fas fa-clock"></i>
                    <span>Registration Closed</span>
                </div>
                
                <h2 class="closed-heading">Tournament Registration Closed</h2>
                
                <p class="closed-text">
                    Thank you for your interest in the Chancity Open Kabaddi Tournament 2025! 
                    We appreciate your enthusiasm and passion for the sport.
                </p>
                
                <div class="closed-divider">
                    <span></span>
                    <i class="fas fa-award"></i>
                    <span></span>
                </div>
                
                <p class="closed-subtext">
                    Registrations are currently closed as we prepare for the upcoming tournament season. 
                    Stay connected with us for updates on future tournaments and events.
                </p>
                
                <div class="closed-actions">
                    <a href="contact.html" class="closed-contact-btn primary">
                        <i class="fas fa-envelope"></i>
                        Contact Us
                    </a>
                    <a href="index.html" class="closed-contact-btn secondary">
                        <i class="fas fa-home"></i>
                        Back to Home
                    </a>
                </div>
                
                <div class="closed-social">
                    <span class="closed-social-text">Follow us for updates</span>
                    <div class="closed-social-links">
                        <a href="https://www.instagram.com/chan_city_sports_club/" target="_blank" class="closed-social-link" title="Instagram">
                            <i class="fab fa-instagram"></i>
                        </a>
                        <a href="https://www.youtube.com/@chancitysportsclub" target="_blank" class="closed-social-link" title="YouTube">
                            <i class="fab fa-youtube"></i>
                        </a>
                        <a href="#" class="closed-social-link" title="Facebook">
                            <i class="fab fa-facebook-f"></i>
                        </a>
                    </div>
                </div>
            </div>
        `;

        // Insert after the form's parent (registration section)
        const formParent = this.form.parentElement;
        if (formParent) {
            formParent.insertBefore(closedMessage, this.form);
        }
    }

    addClosedMessageStyles() {
        if (document.getElementById('registration-closed-styles')) return;

        const styles = document.createElement('style');
        styles.id = 'registration-closed-styles';
        styles.textContent = `
            .closed-message-container {
                background: linear-gradient(145deg, var(--neutral-800) 0%, var(--neutral-900) 100%);
                border: 1px solid var(--gold-500);
                border-radius: 24px;
                padding: 60px 50px;
                text-align: center;
                max-width: 650px;
                margin: 40px auto;
                box-shadow: 0 25px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(184, 134, 11, 0.1);
                position: relative;
                overflow: hidden;
                animation: fadeInUp 0.6s ease-out;
            }
            
            .closed-message-container::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 4px;
                background: linear-gradient(90deg, var(--gold-600), var(--gold-400), var(--gold-600));
            }
            
            .closed-logo {
                width: 150px;
                height: 150px;
                object-fit: contain;
                margin: 0 auto 30px;
                display: block;
                border-radius: 50%;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
            }
            
            @keyframes fadeInUp {
                from { opacity: 0; transform: translateY(30px); }
                to { opacity: 1; transform: translateY(0); }
            }
            
            .closed-badge {
                display: inline-flex;
                align-items: center;
                gap: 8px;
                background: linear-gradient(135deg, rgba(184, 134, 11, 0.2), rgba(184, 134, 11, 0.1));
                border: 1px solid var(--gold-500);
                padding: 8px 20px;
                border-radius: 50px;
                font-size: var(--text-sm);
                font-weight: 600;
                color: var(--gold-400);
                text-transform: uppercase;
                letter-spacing: 2px;
                margin-bottom: 24px;
            }
            
            .closed-badge i {
                font-size: 12px;
            }
            
            .closed-heading {
                font-family: 'Montserrat', sans-serif;
                font-size: var(--text-3xl);
                font-weight: 700;
                color: var(--text-primary);
                margin-bottom: 20px;
                line-height: 1.3;
            }
            
            .closed-text {
                font-family: 'Inter', sans-serif;
                color: var(--text-secondary);
                font-size: var(--text-lg);
                line-height: 1.8;
                margin-bottom: 24px;
                max-width: 500px;
                margin-left: auto;
                margin-right: auto;
            }
            
            .closed-divider {
                display: flex;
                align-items: center;
                gap: 16px;
                margin: 32px 0;
                color: var(--gold-400);
            }
            
            .closed-divider span {
                flex: 1;
                height: 1px;
                background: linear-gradient(90deg, transparent, var(--gold-500), transparent);
            }
            
            .closed-divider i {
                font-size: 20px;
            }
            
            .closed-subtext {
                font-family: 'Inter', sans-serif;
                color: var(--text-muted);
                font-size: var(--text-base);
                line-height: 1.7;
                margin-bottom: 32px;
                font-style: italic;
            }
            
            .closed-actions {
                display: flex;
                gap: 16px;
                justify-content: center;
                flex-wrap: wrap;
                margin-bottom: 40px;
            }
            
            .closed-contact-btn {
                display: inline-flex;
                align-items: center;
                gap: 10px;
                font-family: 'Montserrat', sans-serif;
                font-size: var(--text-base);
                font-weight: 600;
                padding: 16px 32px;
                border-radius: 12px;
                text-decoration: none;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                cursor: pointer;
            }
            
            .closed-contact-btn.primary {
                background: linear-gradient(135deg, var(--gold-500), var(--gold-400));
                color: var(--neutral-900);
                box-shadow: 0 8px 30px rgba(184, 134, 11, 0.3);
            }
            
            .closed-contact-btn.primary:hover {
                transform: translateY(-3px);
                box-shadow: 0 12px 40px rgba(184, 134, 11, 0.5);
            }
            
            .closed-contact-btn.secondary {
                background: transparent;
                color: var(--text-primary);
                border: 2px solid var(--neutral-600);
            }
            
            .closed-contact-btn.secondary:hover {
                border-color: var(--gold-500);
                color: var(--gold-400);
                transform: translateY(-3px);
            }
            
            .closed-social {
                padding-top: 32px;
                border-top: 1px solid var(--neutral-700);
            }
            
            .closed-social-text {
                display: block;
                font-family: 'Inter', sans-serif;
                font-size: var(--text-sm);
                color: var(--text-muted);
                margin-bottom: 16px;
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            
            .closed-social-links {
                display: flex;
                gap: 12px;
                justify-content: center;
            }
            
            .closed-social-link {
                width: 44px;
                height: 44px;
                background: var(--neutral-700);
                border-radius: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: var(--text-secondary);
                font-size: 18px;
                transition: all 0.3s ease;
                text-decoration: none;
            }
            
            .closed-social-link:hover {
                background: var(--gold-500);
                color: var(--neutral-900);
                transform: translateY(-3px);
            }

            /* Tablet styles */
            @media (max-width: 768px) {
                .closed-message-container {
                    padding: 50px 30px;
                    margin: 20px;
                    border-radius: 20px;
                }
                .closed-logo {
                    width: 120px;
                    height: 120px;
                    margin-bottom: 24px;
                }
                .closed-heading {
                    font-size: var(--text-2xl);
                }
                .closed-text {
                    font-size: var(--text-base);
                }
                .closed-actions {
                    flex-direction: column;
                    gap: 12px;
                }
                .closed-contact-btn {
                    width: 100%;
                    justify-content: center;
                }
            }

            /* Mobile styles */
            @media (max-width: 480px) {
                .closed-message-container {
                    padding: 40px 24px;
                    margin: 16px;
                    border-radius: 16px;
                }
                .closed-logo {
                    width: 100px;
                    height: 100px;
                    margin-bottom: 20px;
                }
                .closed-badge {
                    font-size: 11px;
                    padding: 6px 16px;
                    margin-bottom: 20px;
                }
                .closed-heading {
                    font-size: var(--text-xl);
                    margin-bottom: 16px;
                }
                .closed-text {
                    font-size: var(--text-sm);
                    margin-bottom: 20px;
                }
                .closed-divider {
                    margin: 24px 0;
                }
                .closed-subtext {
                    font-size: var(--text-sm);
                    margin-bottom: 24px;
                }
                .closed-actions {
                    margin-bottom: 32px;
                }
                .closed-contact-btn {
                    padding: 14px 24px;
                    font-size: var(--text-sm);
                }
                .closed-social {
                    padding-top: 24px;
                }
                .closed-social-link {
                    width: 40px;
                    height: 40px;
                    font-size: 16px;
                }
            }
        `;
        document.head.appendChild(styles);
    }


    async handleSubmit(event) {
        event.preventDefault();

        // Collect form data
        const data = {
            team_name: (document.getElementById('teamName')?.value || '').trim(),
            category: (document.getElementById('category')?.value || '').trim(),
            team_size: parseInt(document.getElementById('teamSize')?.value || '0'),
            contact_name: (document.getElementById('contactName')?.value || '').trim(),
            designation: (document.getElementById('designation')?.value || '').trim(),
            email: (document.getElementById('email')?.value || '').trim(),
            phone: (document.getElementById('phone')?.value || '').trim(),
            alt_phone: (document.getElementById('altPhone')?.value || '').trim(),
            players: (document.getElementById('players')?.value || '').trim(),
            terms_accepted: document.getElementById('terms')?.checked || false,
            newsletter_subscribed: document.getElementById('newsletter')?.checked || false
        };

        this.setLoading(true);

        try {
            const response = await fetch('https://gitback-mqnw.onrender.com/api/v1/registrations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                let errorData;
                try {
                    errorData = await response.json();
                } catch (e) {
                    errorData = { detail: response.statusText || 'Unknown error' };
                }

                if (errorData.detail && Array.isArray(errorData.detail)) {
                    const errorMessages = errorData.detail.map(err => {
                        const field = err.loc[err.loc.length - 1];
                        const msg = err.msg;
                        const fieldName = field.replace(/_/g, ' ').replace(/^\w/, c => c.toUpperCase());
                        return `${fieldName}: ${msg}`;
                    });
                    this.showError(errorMessages);
                } else {
                    this.showError([errorData.detail || 'Registration failed']);
                }
                return;
            }

            const result = await response.json();
            this.showSuccess(result);

        } catch (error) {
            this.showError(['Network error. Please check your connection and try again.']);
        } finally {
            this.setLoading(false);
        }
    }

    setLoading(isLoading) {
        if (!this.submitBtn) return;
        if (isLoading) {
            this.submitBtn.disabled = true;
            this.submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
            this.submitBtn.style.opacity = '0.7';
        } else {
            this.submitBtn.disabled = false;
            this.submitBtn.innerHTML = this.originalBtnText;
            this.submitBtn.style.opacity = '1';
        }
    }

    showSuccess(response) {
        const modal = document.createElement('div');
        modal.className = 'registration-modal';
        modal.innerHTML = `
            <div class="modal-content success">
                <div class="modal-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h2>Registration Successful! 🏆</h2>
                <p>Your team has been registered for the Chancity Open Kabaddi Tournament.</p>
                <div class="registration-id">
                    <strong>Registration ID:</strong>
                    <code>${response.registration_id ? response.registration_id.substring(0, 8).toUpperCase() : 'PENDING'}</code>
                </div>
                <p class="success-notice">
                    <i class="fas fa-info-circle"></i> ${response.message || 'Registration submitted successfully'}
                </p>
                <div class="modal-actions">
                    <button class="btn btn-primary" onclick="window.location.href='tournaments.html'">
                        View Tournament Details
                    </button>
                    <button class="btn btn-secondary" onclick="this.closest('.registration-modal').remove()">
                        Close
                    </button>
                </div>
            </div>
        `;
        this.addModalStyles();
        document.body.appendChild(modal);
        this.form.reset();
    }

    showError(errors) {
        const modal = document.createElement('div');
        modal.className = 'registration-modal';
        modal.innerHTML = `
            <div class="modal-content error">
                <div class="modal-icon error">
                    <i class="fas fa-exclamation-circle"></i>
                </div>
                <h2>Registration Failed</h2>
                <p>Please fix the following errors:</p>
                <ul class="error-list">
                    ${Array.isArray(errors) ? errors.map(e => `<li>${e}</li>`).join('') : `<li>${errors}</li>`}
                </ul>
                <div class="modal-actions">
                    <button class="btn btn-primary" onclick="this.closest('.registration-modal').remove()">
                        Try Again
                    </button>
                </div>
            </div>
        `;
        this.addModalStyles();
        document.body.appendChild(modal);
    }

    addModalStyles() {
        if (document.getElementById('registration-modal-styles')) return;

        const styles = document.createElement('style');
        styles.id = 'registration-modal-styles';
        styles.textContent = `
            .registration-modal {
                position: fixed;
                inset: 0;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                animation: fadeIn 0.3s ease;
            }
            .registration-modal .modal-content {
                background: white;
                padding: 40px;
                border-radius: 20px;
                max-width: 500px;
                width: 90%;
                text-align: center;
                animation: slideUp 0.4s ease;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            }
            .registration-modal .modal-icon {
                font-size: 60px;
                color: #28a745;
                margin-bottom: 20px;
            }
            .registration-modal .modal-icon.error {
                color: #c9302c;
            }
            .registration-modal h2 {
                color: #302626;
                margin-bottom: 15px;
            }
            .registration-modal .registration-id {
                background: #f5f5f5;
                padding: 15px;
                border-radius: 10px;
                margin: 20px 0;
            }
            .registration-modal .registration-id code {
                font-size: 1.2rem;
                color: #DAA520;
                font-weight: bold;
            }
            .registration-modal .success-notice {
                color: #666;
                font-size: 0.95rem;
                margin: 10px 0;
            }
            .registration-modal .error-list {
                text-align: left;
                color: #c9302c;
                margin: 15px 0;
                padding-left: 20px;
            }
            .registration-modal .modal-actions {
                margin-top: 25px;
                display: flex;
                gap: 15px;
                justify-content: center;
                flex-wrap: wrap;
            }
            .registration-modal .btn-secondary {
                background: transparent;
                border: 2px solid #302626;
                color: #302626;
            }
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes slideUp {
                from { opacity: 0; transform: translateY(30px); }
                to { opacity: 1; transform: translateY(0); }
            }
        `;
        document.head.appendChild(styles);
    }
}

// Initialize when page loads
window.addEventListener('load', () => {
    setTimeout(() => {
        if (document.getElementById('tournamentRegistration')) {
            console.log('✅ Registration form found. Initializing backend connection...');
            new RegistrationHandler();
            console.log('✅ Backend handler initialized successfully');
        }
    }, 100);
});
