# API Contracts & Backend Integration Plan

## Overview
This document outlines the backend implementation plan for Surabhi Priya's portfolio website, detailing API contracts, database models, and frontend-backend integration.

## Current Mock Data Analysis
**File**: `/app/frontend/src/mock.js`

### Mock Data Structure:
1. **Profile Data**: Name, title, tagline, intro, profile image
2. **Projects Data**: 2 projects with tools, problem, solution, impact
3. **Skills Data**: 6 skills with levels and progress percentages
4. **About Data**: Summary, experience, learning journey, passion
5. **Contact Data**: Email, social media links

## Database Models

### 1. Profile Model
```javascript
{
  _id: ObjectId,
  name: String,
  title: String, 
  tagline: String,
  intro: String,
  profileImage: String,
  createdAt: Date,
  updatedAt: Date
}
```

### 2. Project Model
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  tools: [String],
  problem: String,
  solution: String,
  impact: String,
  visual: String, // emoji or icon
  githubUrl: String (optional),
  liveUrl: String (optional),
  featured: Boolean,
  order: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### 3. Skill Model
```javascript
{
  _id: ObjectId,
  name: String,
  level: String, // 'beginner', 'intermediate', 'advanced'
  icon: String, // emoji
  progress: Number, // 0-100
  order: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### 4. About Model
```javascript
{
  _id: ObjectId,
  summary: String,
  experience: String,
  learning: String,
  passion: String,
  highlights: [{
    title: String,
    description: String,
    icon: String
  }],
  createdAt: Date,
  updatedAt: Date
}
```

### 5. Contact Model (Form Submissions)
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  subject: String,
  message: String,
  status: String, // 'new', 'read', 'replied'
  createdAt: Date,
  updatedAt: Date
}
```

### 6. Settings Model (Contact Info & Social Links)
```javascript
{
  _id: ObjectId,
  email: String,
  linkedin: String,
  github: String,
  leetcode: String,
  location: String,
  responseTime: String,
  createdAt: Date,
  updatedAt: Date
}
```

## API Endpoints

### Profile APIs
- `GET /api/profile` - Get profile information
- `PUT /api/profile` - Update profile information

### Projects APIs  
- `GET /api/projects` - Get all projects (with optional ?featured=true)
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Skills APIs
- `GET /api/skills` - Get all skills ordered by order field
- `POST /api/skills` - Create new skill
- `PUT /api/skills/:id` - Update skill
- `DELETE /api/skills/:id` - Delete skill

### About APIs
- `GET /api/about` - Get about information
- `PUT /api/about` - Update about information

### Contact APIs
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contact submissions (admin)
- `PUT /api/contact/:id` - Update contact status (admin)

### Settings APIs
- `GET /api/settings` - Get contact info and social links
- `PUT /api/settings` - Update contact info and social links

## Frontend Integration Plan

### Phase 1: API Integration
Replace mock data imports with API calls in:

1. **HomePage.jsx**:
   - Replace `mockData.profile` with API call to `/api/profile`
   - Replace `mockData.skills` with API call to `/api/skills`
   - Replace `mockData.projects` with API call to `/api/projects?featured=true&limit=2`

2. **ProjectsPage.jsx**:
   - Replace `mockData.projects` with API call to `/api/projects`
   - Update project modal to handle real data structure

3. **AboutPage.jsx**:
   - Replace `mockData.about` with API call to `/api/about`
   - Replace `mockData.profile` with API call to `/api/profile`
   - Replace `mockData.skills` with API call to `/api/skills`

4. **ContactPage.jsx**:
   - Replace `mockData.contact` with API call to `/api/settings`
   - Update form submission to POST to `/api/contact`
   - Add proper success/error handling

5. **Header.jsx & Footer.jsx**:
   - Replace `mockData.contact` with API call to `/api/settings`

### Phase 2: State Management
- Create React Context for global data (profile, settings)
- Add loading states for all API calls
- Implement error handling and fallbacks
- Add toast notifications for form submissions

### Phase 3: API Service Layer
Create `/app/frontend/src/services/api.js`:
```javascript
const API_BASE = process.env.REACT_APP_BACKEND_URL + '/api';

export const profileAPI = {
  get: () => fetch(`${API_BASE}/profile`).then(res => res.json()),
  update: (data) => fetch(`${API_BASE}/profile`, {...})
};

export const projectsAPI = {
  getAll: (params) => fetch(`${API_BASE}/projects?${params}`).then(res => res.json()),
  getById: (id) => fetch(`${API_BASE}/projects/${id}`).then(res => res.json())
};

// ... other API services
```

## Data Migration Strategy

### Step 1: Seed Database
Create seed script to populate database with current mock data:
- 1 Profile record
- 2 Project records  
- 6 Skill records
- 1 About record
- 1 Settings record

### Step 2: Update Frontend Components
- Remove mock.js imports
- Add API service calls
- Add loading and error states
- Update data structure references

### Step 3: Testing
- Verify all pages load correctly
- Test form submissions
- Ensure data consistency
- Check mobile responsiveness

## Error Handling Strategy

### Backend Error Responses
```javascript
{
  success: false,
  message: "Error description",
  error: "Detailed error for debugging"
}
```

### Frontend Error Handling
- Global error boundary for unexpected errors
- Toast notifications for user-facing errors
- Loading skeletons for better UX
- Fallback to cached data when possible

## Performance Considerations

### Backend Optimizations
- Database indexes on frequently queried fields
- Response compression
- Caching for static data (profile, about)
- Image optimization for profile photos

### Frontend Optimizations  
- API response caching
- Lazy loading for project images
- Debounced form validation
- Progressive loading for better perceived performance

## Security Considerations

### Input Validation
- Validate all form inputs on backend
- Sanitize HTML content
- Rate limiting for contact form
- CORS configuration

### Data Protection
- No sensitive data exposure
- Secure contact form handling
- Input sanitization for XSS prevention

## Implementation Priority

1. **High Priority**: Profile, Projects, Skills APIs (core portfolio content)
2. **Medium Priority**: About, Settings APIs (supporting content)
3. **Low Priority**: Contact form with email notifications (user engagement)

This contract ensures seamless integration between frontend mock data and backend APIs while maintaining the existing user experience.