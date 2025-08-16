# Real-Time Chat App

A modern real-time chat application built with **Next.js**, **Pusher**, and **Supabase**. This project enables instant messaging with a sleek interface, serverless backend, and live communication updates.

---

## Features

-  Real-time messaging with **Pusher**
-  Modular component structure
-  Optional Supabase integration (for future authentication or storage)
-  API routes via **Next.js**
-  Deployed on **Vercel**

---

## Tech Stack

- **Frontend**: Next.js, React
- **Backend**: Next.js API Routes
- **Real-time Engine**: Pusher
- **Database**: Supabase
- **Deployment**: Vercel

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/real-time-chat-app.git
cd real-time-chat-app
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a .env file in the root:
```env
NEXT_PUBLIC_PUSHER_KEY=your_pusher_key
PUSHER_APP_ID=your_app_id
PUSHER_SECRET=your_pusher_secret
PUSHER_CLUSTER=your_cluster

NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
```

### 4. Run the Development Server
```bash
npm run dev
```
Visit http://localhost:3000 to use the app.

## Deployment
Deploy seamlessly with Vercel:
```bash
vercel
```
