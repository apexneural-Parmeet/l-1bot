# Telegram Bot with Supervisor Dashboard

This project consists of a FastAPI backend that runs a Telegram bot and a React frontend for supervising chats in real-time.

## Features
- **Telegram Bot**: Responds to users and saves chat history.
- **Supervisor Dashboard**: Real-time monitoring of all bot-user interactions using WebSockets.
- **Premium UI**: Modern dark-themed dashboard built with React, Framer Motion, and Lucide icons.

## Prerequisites
- Python 3.10+
- Node.js & npm
- A Telegram Bot Token from [@BotFather](https://t.me/BotFather)

## Setup Instructions

### 1. Backend Setup
1. Navigate to the `backend` folder.
2. Create a `.env` file and add your Telegram token:
   ```env
   TELEGRAM_TOKEN=your_token_here
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run the backend:
   ```bash
   python main.py
   ```

### 2. Frontend Setup
1. Navigate to the `frontend` folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the frontend:
   ```bash
   npm run dev
   ```

## Architecture
- **Backend**: FastAPI manages the Telegram bot using `python-telegram-bot`'s async polling. It serves REST endpoints for chat history and a WebSocket for real-time updates.
- **Frontend**: React application that fetches active chats and messages. It listens to a WebSocket for "new message" notifications to refresh the UI instantly.
- **Database**: SQLite (`telegram_bot.db`) is used for simplicity to store chats and messages.
# l-1bot
