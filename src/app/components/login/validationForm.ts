import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  // Name validation: 2-50 characters, letters, spaces and hyphens only
  validateName(name: string): { isValid: boolean; message: string } {
    if (!name || name.trim().length === 0) {
      return { isValid: false, message: 'Name is required' };
    }
    
    const nameRegex = /^[a-zA-ZÀ-ÿ\s-]{2,50}$/;
    if (!nameRegex.test(name)) {
      return { 
        isValid: false, 
        message: 'Name must be 2-50 characters long and contain only letters, spaces, and hyphens' 
      };
    }
    
    return { isValid: true, message: '' };
  }

  // Username validation: 3-30 characters, letters, numbers and underscores only
  validateUsername(username: string): { isValid: boolean; message: string } {
    if (!username || username.trim().length === 0) {
      return { isValid: false, message: 'Username is required' };
    }

    const usernameRegex = /^[a-zA-Z0-9_]{3,30}$/;
    if (!usernameRegex.test(username)) {
      return { 
        isValid: false, 
        message: 'Username must be 3-30 characters long and contain only letters, numbers, and underscores' 
      };
    }

    return { isValid: true, message: '' };
  }

  // Email validation
  validateEmail(email: string): { isValid: boolean; message: string } {
    if (!email || email.trim().length === 0) {
      return { isValid: false, message: 'Email is required' };
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return { isValid: false, message: 'Please enter a valid email address' };
    }

    return { isValid: true, message: '' };
  }



  // Country validation: must be 2-50 characters
  validateCountry(country: string): { isValid: boolean; message: string } {
    if (!country || country.trim().length === 0) {
      return { isValid: false, message: 'Country is required' };
    }

    if (country.length < 2 || country.length > 50) {
      return { 
        isValid: false, 
        message: 'Country name must be between 2 and 50 characters' 
      };
    }

    return { isValid: true, message: '' };
  }

  // Profession validation: 2-50 characters, letters, spaces, and basic punctuation
  validateProfession(profession: string): { isValid: boolean; message: string } {
    if (!profession || profession.trim().length === 0) {
      return { isValid: false, message: 'Profession is required' };
    }

    const professionRegex = /^[a-zA-ZÀ-ÿ\s\-&.,()]{2,50}$/;
    if (!professionRegex.test(profession)) {
      return { 
        isValid: false, 
        message: 'Profession must be 2-50 characters ' 
      };
    }

    return { isValid: true, message: '' };
  }

  // Social media username validation
  validateSocialUsername(username: string, platform: string): { isValid: boolean; message: string } {
    if (!username) {
      return { isValid: true, message: '' }; // Social media is optional
    }

    const usernameRegex = /^[a-zA-Z0-9._]{1,30}$/;
    if (!usernameRegex.test(username)) {
      return { 
        isValid: false, 
        message: `${platform} username must contain only letters, numbers, dots, and underscores` 
      };
    }

    return { isValid: true, message: '' };
  }

  // Password validation: at least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
  validatePassword(password: string): { isValid: boolean; message: string } {
    if (!password) {
      return { isValid: false, message: 'Password is required' };
    }

    if (password.length < 8) {
      return { isValid: false, message: 'Password must be at least 8 characters long' };
    }

    if (!/[A-Z]/.test(password)) {
      return { isValid: false, message: 'Password must contain at least one uppercase letter' };
    }

    if (!/[a-z]/.test(password)) {
      return { isValid: false, message: 'Password must contain at least one lowercase letter' };
    }

    if (!/[0-9]/.test(password)) {
      return { isValid: false, message: 'Password must contain at least one number' };
    }

    if (!/[!@#$%^&*]/.test(password)) {
      return { isValid: false, message: 'Password must contain at least one special character (!@#$%^&*)' };
    }

    return { isValid: true, message: '' };
  }

  // Password confirmation validation
  validatePasswordConfirmation(password: string, confirmPassword: string): { isValid: boolean; message: string } {
    if (!confirmPassword) {
      return { isValid: false, message: 'Please confirm your password' };
    }

    if (password !== confirmPassword) {
      return { isValid: false, message: 'Passwords do not match' };
    }

    return { isValid: true, message: '' };
  }

  // Photo validation
  validatePhoto(file: File | null): { isValid: boolean; message: string } {
    if (!file) {
      return { isValid: true, message: '' }; // Photo is optional
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      return { 
        isValid: false, 
        message: 'Please upload an image file (JPEG, PNG, or GIF)' 
      };
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return { isValid: false, message: 'Image size must be less than 5MB' };
    }

    return { isValid: true, message: '' };
  }

  // Interests validation
  validateInterests(interests: string[]): { isValid: boolean; message: string } {
    if (!interests || interests.length === 0) {
      return { isValid: false, message: 'Please select at least one interest' };
    }

    if (interests.length > 10) {
      return { isValid: false, message: 'Please select no more than 10 interests' };
    }

    return { isValid: true, message: '' };
  }
}