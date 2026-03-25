# 🏙️ Billboard Organiser (BBO) - The "Where Did I Put That Giant Sign?" Manager

![BBO Banner](./bbo_banner_1772393168934.png)

**The Ultimate Bridge Between Brands and Billboards. No safety harness required.**

Billboard Organiser (BBO.) is a high-performance, role-based platform designed to revolutionise the billboard advertising industry. Built with a striking **Neo-Brutalist aesthetic**, it's the only app that looks as bold as a 40-foot sign on the highway. We help advertisers, asset owners, and administrators manage high-visibility spaces without the high-visibility headaches.

---

## ⚡ Why BBO. is Cooler Than a Times Square Jumbotron

- **🎨 Neo-Brutalist UI**: We hate rounded corners. Every button has a shadow so thick you could trip over it.
- **🔐 Role-Based Access (RBAC)**: Customised dashboards so Advertisers don't accidentally try to sell their own billboards.
- **💸 Startup-Grade Pricing Engine**: Dynamic multipliers! Mumbai premiums! Seasonal surges! It's like Uber, but for static 2D objects.
- **🚀 Scalable Architecture**: A backend so organized it probably color-codes its socks.
- **📊 Real-time Analytics**: See how many people are looking at your ad instead of the road (Disclaimer: BBO. is not responsible for traffic accidents).

---

## 🏢 Platform Roles

### 📢 For Advertisers (The Spend-y Folks)

_Browse. Book. Bloom._

- Find prime locations before your competitors do.
- Manage multi-city campaigns while sipping your third espresso.
- Upload high-res creatives that look stunning on 50-foot canvases.

### 🏠 For Billboard Owners (The Landlords of the Sky)

_List. Lease. Lead._

- Turn that giant metal frame on your roof into a money printer.
- Manage bookings and track earnings with zero spreadsheets.
- Automated pricing so you don't leave money on the table (or the highway).

### 🛡️ For Administrators (The Overlords)

_Govern. Guide. Grow._

- See everything. Control everything. Feel powerful.
- Monitor global analytics and platform health.
- Keep the riff-raff out and the payments flowing.

---

## 🛠️ Tech Stack: The Engine Room

We leverage modern technologies to ensure speed, security, and the ability to handle millions of impressions.

- **Backend**: Django & DRF (The brains/muscle)
- **Frontend**: React 18 + Vite ⚡ (The pretty face)
- **API**: Centralized v1 Versioning 🗺️ (The future-proofing)
- **Design**: Custom Neo-Brutalist CSS System 🎨 (The attitude)
- **Database**: PostgreSQL (Where the giant sign data sleeps)

---

## 🚀 Quick Start (One-Click Setup)

We've automated the boring stuff. If you're on **Windows**, run the PowerShell script. If you're on **macOS/Linux**, use the bash script.

### For Windows Users (PowerShell)
```powershell
./setup.ps1
```

### For Unix/Linux/macOS Users (Bash)
```bash
chmod +x setup.sh
./setup.sh
```

---

## 🛠️ Manual Setup

If you prefer to do things by hand (we respect that), follow these steps:

**Prerequisites:** [Node.js](https://nodejs.org/) and [Python 3.10+](https://python.org) installed.

### 1. Clone the Beast
```bash
git clone https://github.com/RakshitKashyap1/BillBoardOrganiser.git
cd BillBoardOrganiser
```

### 2. Frontend Power-Up
```bash
# Copy environment variables
cp .env.example .env

# Install and run
npm install
npm run dev
```

### 3. Backend Brain-Transfer
```bash
cd backend

# Copy environment variables
cp .env.example .env

# Create virtual environment
python -m venv venv
./venv/Scripts/Activate.ps1 # Or 'source venv/bin/activate' on Mac/Linux

# Install dependencies
pip install -r requirements.txt

# Run migrations and start server
python manage.py migrate
python manage.py runserver
```

---

## 📁 Project Structure

Navigating a new codebase can be like finding a specific billboard in a storm. Here's your map:

```text
.
├── backend/            # Django REST Backend
│   ├── api/            # Versioned API logic (v1)
│   ├── apps/           # Core Django apps (users, ads, bookings)
│   ├── bbo_backend/    # Main Django settings/config
│   └── requirements.txt # Python dependencies
├── src/                # React Frontend
│   ├── components/     # UI components (Neo-Brutalist inspired)
│   ├── pages/          # Full page views
│   ├── services/       # API clients and business logic
│   └── styles/         # Custom Neo-Brutalist CSS
├── public/             # Static assets (images, fonts)
├── setup.ps1           # Windows automation script
├── setup.sh            # Unix automation script
└── .env.example        # Environment variable templates
```

---

## 🧪 Advanced Pricing Engine: The "Secret Sauce"

Our `pricing_engine.py` isn't a basic calculator. It's an AdTech masterpiece:

- **Mumbai Premium**: +50% cost (Because naturally, Mumbai).
- **Seasonal Surge**: +30% in Nov/Dec (Ho ho ho, pay up).
- **Bulk Discount**: -10% if you're booking for more than 30 days.

---

## 🎨 Design Philosophy: Neo-Brutalism

BBO. isn't just another corporate dashboard with soft shadows and pastel colors. We embrace the **Neo-Brutalism** trend:

- **Hard Truths, Hard Shadows**: Solid black offsets only.
- **Thick Outlines**: 3px borders because we're not afraid of commitment.
- **Vibrant Chaos**: Indigo, Pink, and Yellow. Your eyes won't be bored.

---

_Built with passion and too much coffee for the future of Out-Of-Home advertising._ 🌃
