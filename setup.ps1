# Power-up the BBO. Development Environment (Windows version)
# -------------------------------------------------------------------

Write-Host "🚀 Starting BBO. Setup... Let's get this show on the road!" -ForegroundColor Green

# 1. Prerequisites Check
Write-Host "`n🔍 Checking prerequisites..." -ForegroundColor Cyan

$node = Get-Command node -ErrorAction SilentlyContinue
if (!$node) { 
    Write-Error "❌ Node.js is not installed! Please install it from https://nodejs.org/"
    exit 1
} else { Write-Host "✅ Node.js found." }

$python = Get-Command python -ErrorAction SilentlyContinue
if (!$python) { 
    Write-Error "❌ Python is not installed! Please install it from https://python.org/"
    exit 1
} else { Write-Host "✅ Python found." }

# 2. Frontend Setup
Write-Host "`n🎨 Setting up the Frontend..." -ForegroundColor Cyan
if (!(Test-Path ".env")) {
    Copy-Item ".env.example" ".env"
    Write-Host "📄 Created .env from .env.example (Root)"
}

Write-Host "📦 Installing Frontend dependencies (this may take a minute)..."
npm install
Write-Host "✅ Frontend dependencies installed."

# 3. Backend Setup
Write-Host "`n🧠 Setting up the Backend..." -ForegroundColor Cyan
cd backend

if (!(Test-Path ".env")) {
    Copy-Item ".env.example" ".env"
    Write-Host "📄 Created .env from .env.example (Backend)"
    Write-Host "⚠️  IMPORTANT: Please update backend/.env with your database credentials!" -ForegroundColor Yellow
}

if (!(Test-Path "venv")) {
    Write-Host "🐍 Creating Python Virtual Environment..."
    python -m venv venv
}

Write-Host "🐍 Activating venv and installing requirements..."
# Use call so it returns to our script
& ".\venv\Scripts\Activate.ps1"
pip install -r requirements.txt
Write-Host "✅ Backend dependencies installed."

# 4. Final Instructions
Write-Host "`n🎉 Setup Complete!" -ForegroundColor Green
Write-Host "--------------------------------------------------------"
Write-Host "To start the engines:"
Write-Host "1. Frontend: Run 'npm run dev' in the root folder."
Write-Host "2. Backend:  Run 'python manage.py runserver' in the 'backend' folder."
Write-Host "--------------------------------------------------------"
cd ..
