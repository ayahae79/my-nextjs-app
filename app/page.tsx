'use client'; 
import { useState } from 'react';
import { storeCustomer } from '@/services/api';

//form data 
interface FormData {
  first_name: string;
  last_name: string;
  status_id: number;
  email: string;
  phone?: string;
  address?: string;
  skype?: string;
  website?: string;
  description?: string;
}

//validation errors 
interface FormErrors {
  first_name?: string;
  last_name?: string;
  status_id?: string;
  email?: string;
  phone?: string;
  address?: string;
  skype?: string;
  website?: string;
  description?: string;
}

// Validate form data
const validateForm = (data: FormData): FormErrors => {
  const errors: FormErrors = {};

  if (!data.first_name) {
    errors.first_name = 'First name is required';
  }
  if (!data.status_id) {
    errors.status_id = 'Status is required';
  }
  if (!data.email || !/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = 'Valid email is required';
  }
  if (data.phone && data.phone.length < 8) {
    errors.phone = 'Phone number must be at least 8 digits';
  }
  return errors;
};

const CreateCustomer: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    first_name: '',
    last_name: '',
    status_id: '',
    email: '',
    phone: '',
    address: '',
    skype: '',
    website: '',
    description: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const crmStatuses = [
    { id: 1, name: 'Lead' },
    { id: 2, name: 'Customer' },
    { id: 3, name: 'Partner' },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset errors and success message
    setErrors({});
    setSuccessMessage(null);

    // Validate form data
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }


    try {
      const response = await storeCustomer(formData);
      setSuccessMessage(response.message);
      setFormData({
        first_name: '',
        last_name: '',
        status_id: 1, 
        email: '',
        phone: '',
        address: '',
        skype: '',
        website: '',
        description: '',

      });
      alert(response.message);
    } catch (error: any) {
      console.error('API Error:', error);
      setErrors(error.data.errors || { message: error.data.message || 'An error occurred.' });
    } 
  };

  return (
  <div className='container'>
    <div className="header">
        <img src="/Danat.png" alt="Danat Institute Logo" className="logo" />
    </div>
    <div className='form'>
      <h1>Create Customer</h1>
      <form onSubmit={handleSubmit} className="danat-form">
          <div className="form-group">
            <label htmlFor="first_name">First Name </label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
            {errors.first_name && <p className="error-message">{errors.first_name}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="last_name">Last Name</label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="status_id">Status</label>
            <select id="status_id" name="status_id" value={formData.status_id || ''} onChange={handleChange} required>
              <option value="" disabled>
                Select a status
              </option>
              {crmStatuses.map(status => (
                <option key={status.id} value={status.id}>
                  {status.name}
                </option>
              ))}
            </select>
            {errors?.status_id && <p className="error-message">{errors.status_id}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            {errors.phone && <p className="error-message">{errors.phone}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="skype">Skype</label>
            <input
              type="text"
              id="skype"
              name="skype"
              value={formData.skype}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="website">Website</label>
            <input
              type="text"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submit-button">
            Create Customer
          </button>
        </form>
      </div>
  </div>
  );
};

export default CreateCustomer;
