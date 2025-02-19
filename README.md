# Teaching Efficiency Analyzer

A mobile-friendly web application designed to help teachers improve their teaching efficiency through audio analysis and resource management.



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
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Building for Production

1. Create a production build:
   ```bash
   npm run build
   ```

2. Preview the production build:
   ```bash
   npm run preview
   ```

## Technical Notes

- Built with React and TypeScript
- Uses Vite as the build tool
- Styled with Tailwind CSS
- Icons from Lucide React
- Mobile-first responsive design

## Run locally with nginx

```
  npm run build
  docker-compose up --build -
```