// Common JavaScript utilities for the chat app

// Utility functions
const ChatUtils = {
    // Escape HTML to prevent XSS attacks
    escapeHtml: function(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },

    // Format timestamp
    formatTime: function(date = new Date()) {
        return date.toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false
        });
    },

    // Generate random colors for users
    generateUserColor: function() {
        const colors = [
            '#667eea', '#764ba2', '#f093fb', '#f5576c', 
            '#4facfe', '#00f2fe', '#43e97b', '#38f9d7',
            '#ffa726', '#ff7043', '#ab47bc', '#5c6bc0'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    },

    // Generate unique user ID
    generateUserId: function() {
        return 'user_' + Math.random().toString(36).substr(2, 9);
    },

    // Debounce function for performance
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func.apply(this, args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function for performance
    throttle: function(func, limit) {
        let inThrottle;
        return function executedFunction(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Smooth scroll to element
    scrollTo: function(element, duration = 300) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest'
        });
    },

    // Show toast notification
    showToast: function(message, type = 'info', duration = 3000) {
        // Create toast element
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        
        // Style the toast
        Object.assign(toast.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '12px 20px',
            borderRadius: '8px',
            color: 'white',
            fontSize: '14px',
            fontWeight: '500',
            zIndex: '1000',
            transform: 'translateX(400px)',
            transition: 'transform 0.3s ease',
            maxWidth: '300px',
            wordWrap: 'break-word'
        });

        // Set background color based on type
        const colors = {
            info: '#3b82f6',
            success: '#10b981',
            error: '#ef4444',
            warning: '#f59e0b'
        };
        toast.style.backgroundColor = colors[type] || colors.info;

        // Add to body
        document.body.appendChild(toast);

        // Animate in
        setTimeout(() => {
            toast.style.transform = 'translateX(0)';
        }, 10);

        // Remove after duration
        setTimeout(() => {
            toast.style.transform = 'translateX(400px)';
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, duration);
    },

    // Local storage helpers
    storage: {
        set: function(key, value) {
            try {
                localStorage.setItem(key, JSON.stringify(value));
            } catch (e) {
                console.warn('Failed to save to localStorage:', e);
            }
        },
        
        get: function(key, defaultValue = null) {
            try {
                const value = localStorage.getItem(key);
                return value ? JSON.parse(value) : defaultValue;
            } catch (e) {
                console.warn('Failed to read from localStorage:', e);
                return defaultValue;
            }
        },
        
        remove: function(key) {
            try {
                localStorage.removeItem(key);
            } catch (e) {
                console.warn('Failed to remove from localStorage:', e);
            }
        }
    },

    // Check if device is mobile
    isMobile: function() {
        return window.innerWidth <= 768;
    },

    // Check if user prefers reduced motion
    prefersReducedMotion: function() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    },

    // Format room name for display
    formatRoomName: function(roomName) {
        return roomName.replace(/[-_]/g, ' ')
                      .split(' ')
                      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(' ');
    }
};

// Export for use in modules if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ChatUtils;
}
