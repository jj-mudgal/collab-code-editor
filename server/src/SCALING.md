# Horizontal Scaling Strategy

## Problem
Single WebSocket server cannot handle large number of users.

## Solution
- Partition users by room
- Use pub-sub system (Redis in production)
- Make WebSocket servers stateless

## Flow
Client → WebSocket → Publish → Redis → Other Servers → Clients

## Benefits
- Horizontal scaling
- Fault tolerance
- Decoupled architecture

## Future Improvements
- Replace in-memory pubsub with Redis
- Add load balancer
