# AI Resume & Cover Letter Generator 🤖

A full-stack web application that helps users create professional resumes and cover letters with AI-powered content generation. Built with Node.js, Express, MongoDB, and modern frontend technologies.


## 🌐 Live Demo

**🚀 Live Website:** [https://genai-biw4.onrender.com](https://genai-2-w4kr.onrender.com)

## ✨ Features

### 🤖 AI-Powered Content Generation
- **Smart Cover Letters**: AI-generated professional cover letters tailored to specific job descriptions
- **Resume Summaries**: AI-crafted professional summaries based on user experience and skills
- **Content Suggestions**: Intelligent recommendations for skills wording and experience descriptions

### 📄 Professional Resume Builder
- **Multiple Templates**: Clean, modern, and professional resume templates
- **Real-time Preview**: Instant preview as you type with live updates
- **Comprehensive Sections**:
  - Personal Information & Contact Details
  - Professional Summary (AI-generated)
  - Work Experience with detailed accomplishments
  - Education History
  - Skills & Technologies
  - Projects & Portfolio
  - Achievements & Certifications
- **Export Options**: Download as PDF or print directly

### 💼 Smart Cover Letter Generator
- **Customizable Templates**: Multiple professional templates for different industries
- **Company-Specific**: Tailor letters to specific companies and roles
- **Smart Formatting**: Proper business letter format with correct spacing and structure
- **Quick Personalization**: Easy modification for different job applications

### 🔐 User Management
- **Secure Authentication**: JWT-based user registration and login
- **Profile Management**: Personalize user profiles with profession and contact info
- **Data Persistence**: All resumes and cover letters saved to user accounts
- **Privacy Focused**: Secure data storage with proper authentication

### 🎨 Modern User Experience
- **Responsive Design**: Perfect experience on desktop, tablet, and mobile devices
- **Modern UI/UX**: Clean, professional interface with smooth animations
- **Intuitive Navigation**: Easy-to-use interface for all skill levels
- **Fast Performance**: Optimized for quick loading and smooth interactions

### 💾 Technical Features
- **Full-Stack Architecture**: Node.js backend with Express.js framework
- **Database Integration**: MongoDB for reliable data storage
- **RESTful API**: Clean API design for frontend-backend communication
- **File Export**: Professional PDF generation capabilities
- **Error Handling**: Comprehensive error handling and user feedback

## 🛠️ Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcryptjs for password hashing
- **Environment**: dotenv for configuration

### Frontend
- **HTML5**: Semantic markup and modern structure
- **CSS3**: Custom styling with Flexbox/Grid layouts
- **JavaScript**: Vanilla ES6+ for interactive features
- **Icons**: Font Awesome 6
- **Fonts**: Google Fonts integration

### Deployment & Infrastructure
- **Hosting**: Render.com
- **Database**: MongoDB Atlas (Cloud)
- **Version Control**: Git & GitHub
- **Environment**: Production-ready configuration

## 📁 Project Structure

```
ai-resume-coverletter-generator/
├── 📁 config/                 # Configuration files
├── 📁 controllers/            # Business logic handlers
├── 📁 middleware/             # Custom middleware (authentication, etc.)
├── 📁 models/                 # MongoDB data models
├── 📁 routes/                 # API route definitions
│   ├── authRoutes.js         # Authentication endpoints
│   ├── resumeRoutes.js       # Resume CRUD operations
│   ├── coverLetterRoutes.js  # Cover letter CRUD operations
│   └── adminRoutes.js        # Admin data viewing endpoints
├── 📁 frontend/              # Client-side application
│   ├── index.html            # Landing page
│   ├── resume.html           # Resume builder page
│   ├── cover-letter.html     # Cover letter generator page
│   ├── admin.html            # Admin dashboard
│   ├── style.css             # Main stylesheet
│   └── script.js             # Frontend JavaScript
├── 📄 server.js              # Main application entry point
├── 📄 package.json           # Dependencies and scripts
├── 📄 .env                   # Environment variables
└── 📄 README.md              # Project documentation
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account (for production)
- Git

### Installation & Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ai-resume-coverletter-generator.git
   cd ai-resume-coverletter-generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   - Copy `.env.example` to `.env`
   - Configure your environment variables:
     ```env
     NODE_ENV=development
     MONGODB_URI=mongodb://localhost:27017/resume-builder
     PORT=10000
     JWT_SECRET=your_jwt_secret_key_here
     ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Access the application**
   - Frontend: http://localhost:10000
   - API Health: http://localhost:10000/api/health

### Production Deployment

The application is configured for easy deployment on Render.com:

1. **Push code to GitHub**
2. **Connect repository to Render.com**
3. **Set environment variables in Render dashboard**
4. **Automatic deployment on git push**

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Create new user account
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `POST /api/auth/logout` - User logout

### Resume Endpoints
- `GET /api/resumes` - Get all user resumes
- `POST /api/resumes` - Create new resume
- `GET /api/resumes/:id` - Get specific resume
- `PUT /api/resumes/:id` - Update resume
- `DELETE /api/resumes/:id` - Delete resume
- `POST /api/resumes/generate-summary` - AI summary generation

### Cover Letter Endpoints
- `GET /api/cover-letters` - Get all user cover letters
- `POST /api/cover-letters` - Create new cover letter
- `GET /api/cover-letters/:id` - Get specific cover letter
- `PUT /api/cover-letters/:id` - Update cover letter
- `DELETE /api/cover-letters/:id` - Delete cover letter
- `POST /api/cover-letters/generate` - AI cover letter generation

### Utility Endpoints
- `GET /api/health` - Service health check
- `GET /api/db-status` - Database connection status
- `GET /api/admin/data` - Admin data view (development)

## 🎯 Usage Guide

### Creating Your First Resume

1. **Register/Login**: Create an account or login to existing account
2. **Navigate to Resume Builder**: Click "Resume Builder" from the main menu
3. **Fill Personal Information**: Enter your name, contact details, and profession
4. **Generate AI Summary**: Use the AI feature to create a professional summary
5. **Add Experience**: Input your work history with accomplishments
6. **Include Education**: Add your educational background
7. **List Skills**: Enter your technical and professional skills
8. **Preview & Download**: Review your resume and download as PDF

### Generating Cover Letters

1. **Go to Cover Letter Generator**: From main menu or navigation
2. **Enter Job Details**: Job title, company name, hiring manager
3. **Add Your Information**: Your contact details and background
4. **Input Skills & Experience**: Relevant qualifications for the position
5. **Generate with AI**: Let AI create a professionally written cover letter
6. **Customize Content**: Edit and personalize the generated content
7. **Download & Use**: Export as PDF for job applications

### Managing Your Data

- All resumes and cover letters are automatically saved to your account
- You can edit, update, or delete any document
- Previous versions are maintained with timestamps
- Export multiple versions for different job applications

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Application environment | `development` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/resume-builder` |
| `PORT` | Server port | `10000` |
| `JWT_SECRET` | Secret key for JWT tokens | Required |
| `JWT_EXPIRES_IN` | Token expiration time | `7d` |

### Database Models

- **User**: User accounts and profiles
- **Resume**: Complete resume data and templates
- **CoverLetter**: Cover letter content and metadata

## 🚀 Deployment

### Render.com Deployment

1. **Fork this repository** to your GitHub account
2. **Create new Web Service** on Render.com
3. **Connect your GitHub repository**
4. **Configure build settings**:
   - Build Command: `npm install`
   - Start Command: `npm start`
5. **Set environment variables** in Render dashboard
6. **Deploy automatically** on git push

### Environment Setup for Production

```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/resume-builder
PORT=10000
JWT_SECRET=your_super_secure_production_secret
```

## 🐛 Troubleshooting

### Common Issues

**Database Connection Issues**
- Verify MongoDB Atlas connection string
- Check network access and IP whitelisting
- Ensure database user credentials are correct

**Authentication Problems**
- Confirm JWT secret is set in environment variables
- Check token expiration settings
- Verify password hashing is working

**File Upload/Export Issues**
- Ensure proper MIME types are set
- Check browser compatibility for PDF generation
- Verify file size limits

**Deployment Problems**
- Check Render.com build logs for errors
- Verify all environment variables are set
- Ensure package.json has correct start script

### Getting Help

1. Check the application logs in Render.com dashboard
2. Verify all environment variables are properly set
3. Test API endpoints using `/api/health` and `/api/db-status`
4. Check MongoDB Atlas for database connectivity

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Areas for Contribution
- New resume templates and designs
- Additional AI content generation features
- Enhanced cover letter templates
- UI/UX improvements
- Performance optimizations
- Testing and documentation

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **AI Inspiration**: Modern AI writing assistants and content generators
- **Design Inspiration**: Professional resume builders and career platforms
- **Icons**: Font Awesome for beautiful iconography
- **Deployment**: Render.com for seamless hosting solutions
- **Database**: MongoDB Atlas for reliable cloud database services

## 📞 Support

- **Live Application**: [https://genai-biw4.onrender.com](https://genai-2-w4kr.onrender.com)
- **API Documentation**: Included in this README
- **Issues**: [GitHub Issues](https://github.com/yourusername/ai-resume-coverletter-generator/issues)
- **Email**: your-email@domain.com

## 🚀 Future Enhancements

- [ ] Advanced AI models for content generation
- [ ] Multi-language support
- [ ] Resume parsing from existing documents
- [ ] Integration with job boards and LinkedIn
- [ ] Advanced template customization
- [ ] Collaborative editing features
- [ ] Mobile application version
- [ ] Advanced analytics and insights
- [ ] Interview preparation tools
- [ ] Salary negotiation guides

---

*Making professional resume and cover letter creation accessible to everyone*

</div>
