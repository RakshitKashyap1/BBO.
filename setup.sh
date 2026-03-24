#!/bin/bash

# Power-up the BBO. Development Environment (Unix/Linux/macOS version)
# -------------------------------------------------------------------

echo "🚀 Starting BBO. Setup... Let's get this show on the road!"

# 1. Prerequisites Check
echo -e "\n🔍 Checking prerequisites..."

if ! command -v node &> /dev/null
then
    echo "❌ Node.js is not installed! Please install it from https://nodejs.org/"
    exit 1
fi
echo "✅ Node.js found."

if ! command -v python3 &> /dev/null
then
    echo "❌ Python 3 is not installed! Please install it from https://python.org/"
    exit 1
fi
echo "✅ Python 3 found."

# 2. Frontend Setup
echo -e "\n🎨 Setting up the Frontend..."
if [ ! -f .env ]; then
    cp .env.example .env
    echo "📄 Created .env from .env.example (Root)"
fi

echo "📦 Installing Frontend dependencies (this may take a minute)..."
npm install
echo "✅ Frontend dependencies installed."

# 3. Backend Setup
echo -e "\n🧠 Setting up the Backend..."
cd backend || exit

if [ ! -f .env ]; then
    cp .env.example .env
    echo "📄 Created .env from .env.example (Backend)"
    echo "⚠️  IMPORTANT: Please update backend/.env with your database credentials!"
fi

if [ ! -d "venv" ]; then
    echo "🐍 Creating Python Virtual Environment..."
    python3 -m venv venv
fi

echo "🐍 Activating venv and installing requirements..."
source venv/bin/activate
pip install -r requirements.txt
echo "✅ Backend dependencies installed."

# 4. Final Instructions
echo -e "\n🎉 Setup Complete!"
echo "--------------------------------------------------------"
echo "To start the engines:"
echo "1. Frontend: Run 'npm run dev' in the root folder."
echo "2. Backend:  Run 'python manage.py runserver' in the 'backend' folder."
echo "--------------------------------------------------------"
cd ..
