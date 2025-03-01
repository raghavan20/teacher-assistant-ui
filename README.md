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
   
4.  Create .env file at root of project or at working directory

   ```
   # VITE_API_BASE_URL=http://localhost:5000
   VITE_API_BASE_URL=http://34.72.127.119:5000
   ```
   `VITE_API_BASE_URL` indicates where API endpoint is running

5. Open your browser and navigate to `http://localhost:5173`



## Building for Production

   ```bash
   npm run build
   
   cd dist/
   http-server
   ```
   check the website at http://localhost:8080/


## Other commands

Run without hanging in dev mode:

```bash
nohup npm run dev > output.log 2>&1 &
```


Run as container:

```bash
sudo docker build . -t invokeed/teacher-assistant-ui

sudo docker run --rm -d --name teacher-assistant-ui --env-file .env -p 5173:80 invokeed/teacher-assistant-ui

sudo docker ps
sudo docker stop teacher-assistant-ui

```