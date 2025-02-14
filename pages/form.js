import { useState, useRef } from 'react';
import styles from '@/styles/form.module.css';

export default function Form() {
    // Controlled components state
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({});

    // Uncontrolled component ref
    const passwordRef = useRef();

    const validateEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};
        const password = passwordRef.current.value;
        // Name validation
        if (!name.trim()) {
        newErrors.name = 'Name is required';
        }
        // Email validation
        if (!email.trim()) {
        newErrors.email = 'Email is required';
        } else if (!validateEmail(email)) {
        newErrors.email = 'Invalid email format';
        }
        // Password validation
        if (password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
        } else {
            setErrors("");
        }
        /* 
        setErrors(newErrors)
        
        */
        if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        } else {
        alert('Form submitted successfully!');
        // Reset form
        setName('');
        setEmail('');
        passwordRef.current.value = '';
        setErrors({});
        }
    };
  

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h1>Registration Form</h1>
                
                <div className={styles.formGroup}>
                    <label htmlFor="name">Name:</label>
                    <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                        // Clear name error when typing
                        if (errors.name && e.target.value.trim()) {
                        setErrors(prev => ({ ...prev, name: '' }));
                        }
                    }}
                    className={errors.name ? styles.errorInput : ''}
                    />
                    {errors.name && <span className={styles.error}>{errors.name}</span>}
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="email">Email:</label>
                    <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        // Clear email error when typing valid email
                        if (errors.email) {
                        if (e.target.value.trim() && validateEmail(e.target.value)) {
                            setErrors(prev => ({ ...prev, email: '' }));
                        }
                        }
                    }}
                    className={errors.email ? styles.errorInput : ''}
                    />
                    {errors.email && <span className={styles.error}>{errors.email}</span>}
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="password">Password:</label>
                    <input
                    type="password"
                    id="password"
                    ref={passwordRef}
                    onChange={(e) => {
                        // Clear password error when meeting length requirement
                        if (errors.password && e.target.value.length >= 6) {
                        setErrors(prev => ({ ...prev, password: '' }));
                        }
                    }}
                    className={errors.password ? styles.errorInput : ''}
                    />
                    {errors.password && <span className={styles.error}>{errors.password}</span>}
                </div>
                <button type="submit" className={styles.submitButton}>Submit</button>
            </form>
        </div>
    );
}
