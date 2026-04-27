# Deployment Guide

## Backend (Render / Railway)
- Deploy server folder
- Set PORT=5000
- Enable WebSocket support

## Frontend (Vercel / Netlify)
- Deploy client folder
- Update WebSocket URL to production backend

## Docker
docker-compose up --build

## Architecture
Client → WebSocket → Server → PubSub → Clients

## Notes
- Replace "*" CORS with actual domain
- Use Redis for scaling
