# Security Policy

## Overview

FastWebP is designed with security and privacy as top priorities. All file processing happens locally in the user's browser - no files are ever uploaded to our servers.

## Security Features

### ✅ Client-Side Processing
- All WebP to JPG conversion happens in the browser using Canvas API
- No file uploads to any server
- No backend API endpoints
- No data storage or databases

### ✅ HTTPS/TLS
- All traffic encrypted via HTTPS (enforced by Vercel)
- Strict-Transport-Security header enabled
- HSTS preload enabled

### ✅ Security Headers
The following security headers are implemented:
- `X-Frame-Options: SAMEORIGIN` - Prevents clickjacking
- `X-Content-Type-Options: nosniff` - Prevents MIME sniffing
- `X-XSS-Protection: 1; mode=block` - XSS protection
- `Referrer-Policy: origin-when-cross-origin` - Controls referrer information
- `Permissions-Policy` - Restricts browser features (camera, mic, geolocation)

### ✅ Content Security
- No inline scripts or styles (all bundled by Next.js)
- Third-party scripts (Analytics, AdSense) loaded from trusted sources
- Subresource Integrity (SRI) for external resources

### ✅ Dependencies
- Regular dependency updates via Dependabot
- Using well-maintained, reputable libraries
- No known vulnerabilities in dependencies

## Privacy Guarantees

### What We DON'T Collect
- ❌ Your files or file contents
- ❌ Personal information (names, emails, etc.)
- ❌ File metadata (EXIF, GPS, timestamps)
- ❌ IP addresses (beyond anonymous analytics)
- ❌ Browsing history

### What We Collect (Optional)
- ✅ Anonymous analytics via Google Analytics
  - Page views
  - General location (country/region)
  - Browser type
  - Session duration

## Threat Model

### Protected Against
✅ **Man-in-the-Middle Attacks** - HTTPS encryption  
✅ **Clickjacking** - X-Frame-Options header  
✅ **XSS Attacks** - Content Security Policy, React auto-escaping  
✅ **CSRF** - No state-changing operations  
✅ **Data Breaches** - No server-side data storage  
✅ **File Tampering** - Local processing only  

### Potential Risks
⚠️ **Browser Vulnerabilities** - Users should keep browsers updated  
⚠️ **Canvas API Bugs** - Dependent on native browser Canvas API implementation  
⚠️ **Client-Side Attacks** - Malicious browser extensions could access files  

## Best Practices for Users

1. **Use Updated Browsers** - Keep your browser up to date
2. **Verify HTTPS** - Ensure you're on `https://www.fastwebptojpg.com`
3. **Disable Suspicious Extensions** - Browser extensions can access page data
4. **Local Processing** - Files never leave your device
5. **No Account Needed** - No passwords to manage or leak

## Reporting Security Issues

If you discover a security vulnerability, please report it responsibly:

**Email:** security@fastwebptojpg.com

**Please include:**
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Any suggested fixes

**Response Time:**
- We aim to respond within 48 hours
- Critical issues will be addressed immediately
- You'll be credited in our security acknowledgments (if desired)

## Security Updates

We monitor and update dependencies regularly:
- Automated dependency updates via Dependabot
- Security patches applied within 24 hours of disclosure
- Regular security audits of code and dependencies

## Compliance

### GDPR Compliance
- No personal data collection (by design)
- No cookies required for core functionality
- Analytics can be disabled via browser settings
- No data retention or deletion needed (no data stored)

### COPPA Compliance
- Safe for users of all ages
- No personal information collected from children
- No parental consent required (no data collected)

## Third-Party Services

### Google Analytics (Optional)
- **Purpose:** Anonymous usage statistics
- **Data Collected:** Page views, session duration, general location
- **Privacy:** IP anonymization enabled
- **Opt-out:** Users can disable via browser settings

### Google AdSense (Optional)
- **Purpose:** Display advertisements
- **Data Collected:** Minimal (handled by Google)
- **Privacy:** Google's privacy policy applies
- **Control:** Ads can be blocked via ad blockers

## Technical Security Measures

### Input Validation
- File type checking (WebP only)
- File size limits enforced
- Maximum file count limits
- Sanitized file names

### Memory Management
- Automatic cleanup after conversion
- Bounded memory usage
- No memory leaks in Canvas API

### Error Handling
- Graceful error recovery
- No sensitive information in error messages
- User-friendly error reporting

## Security Roadmap

Future security enhancements planned:
- [ ] Content Security Policy (CSP) headers
- [ ] Subresource Integrity (SRI) for all external scripts
- [ ] Regular third-party security audits
- [ ] Bug bounty program
- [ ] Security.txt file

## Acknowledgments

We appreciate responsible disclosure from security researchers and the community.

---

**Last Updated:** October 19, 2025  
**Version:** 1.0
