# Security Considerations

## Code Execution Risks
- Infinite loops → handled via timeout
- Large output → limited via maxBuffer
- Command injection → partially mitigated (needs Docker sandbox)

## WebSocket Risks
- Malformed payloads → validated
- Spam attacks → rate limited
- Dead connections → heartbeat cleanup

## Future Improvements
- Docker-based isolation
- Authentication
- Input sanitization (AST-based)
- Redis-based rate limiting
