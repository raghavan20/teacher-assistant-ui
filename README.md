# Teaching Efficiency Analyzer

A mobile-friendly web application designed to help teachers improve their teaching efficiency through audio analysis and resource management.

## Features

- 🎤 Audio Recording: Record teaching sessions directly from your browser
- 📊 Teaching Analysis: Get insights on delivery, structure, and student engagement
- 📚 Resource Hub: Access teaching materials, news, and quiz generators
- 📱 Mobile-Friendly: Works seamlessly on mobile browsers

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

## Local Development Setup

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd teaching-efficiency-analyzer
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Building for Production

1. Create a production build:
   ```bash
   npm run build
   # or
   yarn build
   ```

2. Preview the production build:
   ```bash
   npm run preview
   # or
   yarn preview
   ```

## Technical Notes

- Built with React and TypeScript
- Uses Vite as the build tool
- Styled with Tailwind CSS
- Icons from Lucide React
- Mobile-first responsive design

## Important Notes

- Microphone access is required for audio recording
- Currently uses mock data for analysis (API integration pending)
- Designed to work on modern browsers (Chrome, Safari, Firefox)

## Future Enhancements

- Integration with real speech analysis API
- Offline support
- Enhanced analytics dashboard
- Collaborative features
- Custom quiz generation