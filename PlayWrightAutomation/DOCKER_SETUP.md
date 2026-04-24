# Docker Setup for Jenkins (Optional)

If you prefer running Jenkins in a Docker container instead of directly on Windows, use this `docker-compose.yml` file.

## Prerequisites

- Docker Desktop installed and running
- docker-compose installed

## Quick Start

### 1. Install Docker Desktop
```
https://www.docker.com/products/docker-desktop
```

### 2. Start Jenkins with Docker

**From the PlayWrightAutomation directory**:

```bash
# Start services
docker-compose up -d

# View logs
docker-compose logs -f jenkins

# Stop services
docker-compose down

# Stop and remove volumes (full cleanup)
docker-compose down -v
```

## Access Jenkins

```
http://localhost:8080
```

## Get Initial Admin Password

```bash
# Logs will show password, or:
docker exec playwright-jenkins cat /var/jenkins_home/secrets/initialAdminPassword
```

## Services Included

### 1. Jenkins
- **Image**: jenkins/jenkins:lts
- **Port**: 8080 (UI), 50000 (Agent)
- **Volume**: jenkins_home (persistent storage)

### 2. Allure Report Server (Optional)
- **Image**: frankescobar/allure-docker-service
- **Port**: 4040 (UI), 8585 (API)
- **Purpose**: Centralized test report hosting

### 3. PostgreSQL (Optional)
- **Image**: postgres:15-alpine
- **Port**: 5432 (internal)
- **Purpose**: Database for Jenkins data (for scalability)

## Common Commands

```bash
# Start services in background
docker-compose up -d

# View Jenkins logs
docker-compose logs -f jenkins

# View all logs
docker-compose logs -f

# Stop services
docker-compose stop

# Start services (after stop)
docker-compose start

# Remove containers (keep volumes)
docker-compose down

# Remove everything including volumes
docker-compose down -v

# Execute command in Jenkins container
docker exec playwright-jenkins [command]

# Check service status
docker-compose ps

# View resource usage
docker stats
```

## Configure Jenkins

### Access Jenkins Configuration

1. Open http://localhost:8080
2. Complete initial setup with admin password
3. Install plugins as needed
4. Configure GitHub integration (same as local setup)

### Mount Workspace

To mount your workspace in Docker:

Edit `docker-compose.yml`:
```yaml
volumes:
  - jenkins_home:/var/jenkins_home
  - ./PlayWrightAutomation:/workspace/PlayWrightAutomation  # Add this line
```

## Troubleshooting

### Port already in use
```bash
# Find process using port 8080
netstat -ano | findstr :8080

# Change port in docker-compose.yml
ports:
  - "8081:8080"  # Use 8081 instead
```

### Jenkins not starting
```bash
# Check logs
docker-compose logs jenkins

# Check disk space
docker system df

# Clean up unused images
docker system prune
```

### Permission denied
```bash
# Ensure Docker daemon is running
# Restart Docker Desktop if needed
```

## Persistence

- **jenkins_home**: Stores all Jenkins configuration and build history
- **allure_results**: Test results
- **allure_reports**: Generated reports
- **postgres_data**: Database data

All data persists even after stopping containers.

## Performance Tips

1. **Allocate sufficient resources**:
   - Docker Desktop → Preferences → Resources
   - Recommended: 4+ CPU cores, 8+ GB RAM

2. **Monitor resource usage**:
   ```bash
   docker stats
   ```

3. **Clean up old images/containers**:
   ```bash
   docker system prune
   ```

## Connecting from Host Machine

If running Docker on another machine:

1. Find container IP:
   ```bash
   docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' playwright-jenkins
   ```

2. Access Jenkins:
   ```
   http://CONTAINER_IP:8080
   ```

## Production Considerations

For production deployment:

1. **Use volumes manager** for persistent data
2. **Set resource limits** in docker-compose
3. **Use health checks** for monitoring
4. **Enable container restart policy**
5. **Use reverse proxy** (Nginx) for SSL/HTTPS
6. **Separate database** from Jenkins

## Example: Production Configuration

```yaml
services:
  jenkins:
    # ... existing config ...
    restart: always
    deploy:
      resources:
        limits:
          cpus: '2'
          memory: 4G
        reservations:
          cpus: '1'
          memory: 2G
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080"]
      interval: 30s
      timeout: 10s
      retries: 3
```

## Comparison: Docker vs Local

| Aspect | Docker | Local WAR |
|--------|--------|-----------|
| Setup Time | ~2 minutes | ~5 minutes |
| Resource Usage | Isolated | Shared system |
| Portability | High | Low |
| Persistence | Automatic volumes | Manual management |
| Scalability | Easy (multiple containers) | Limited |
| Monitoring | Docker stats | Task Manager |

## When to Use Docker

✅ Use Docker when:
- Running on Linux servers
- Need reproducible environments
- Planning to scale
- Want isolated Jenkins instances

❌ Skip Docker when:
- Local development on Windows
- Quick testing needed
- No Docker installed

## Resources

- [Docker Documentation](https://docs.docker.com/)
- [Jenkins Docker Official Image](https://github.com/jenkinsci/docker)
- [Allure Docker Service](https://hub.docker.com/r/frankescobar/allure-docker-service)

---

**Tip**: Start with local WAR setup for quick testing, then move to Docker for production!
