# Jenkins Quick Reference

## Jenkins Server Commands

### Start Jenkins
```powershell
java -jar C:\Jenkins\jenkins.war --httpPort=8080 --enable-future-java
```

### Stop Jenkins
- Press `Ctrl+C` in the terminal

### Jenkins URL
``` 
http://localhost:8080
```

### Initial Admin Password Location
```
C:\Users\celva\.jenkins\secrets\initialAdminPassword
```

### Current Admin Password
```
cb4a54954b574f569b0ac1275de9d1fc
```

---

## Plugin Installation

**Path**: Manage Jenkins → Manage Plugins → Available

**Essential Plugins**:
- GitHub plugin
- Pipeline
- NodeJS Plugin
- Allure Plugin
- Email Extension Plugin

---

## GitHub Configuration

### 1. Create GitHub Token
```
GitHub Settings → Developer settings → Personal access tokens → Generate new token
Scopes: repo, admin:repo_hook
```

### 2. Configure in Jenkins
```
Manage Jenkins → System → GitHub → Add GitHub Server
- Name: GitHub
- API URL: https://api.github.com
- Credentials: GitHub Personal Access Token ---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
```

### 3. Add GitHub Webhook
```
GitHub Repo Settings → Webhooks → Add webhook
- Payload URL: http://YOUR_IP:8080/github-webhook/
- Content type: application/json
- Events: Push & Pull requests
```

---

## Create Pipeline Job

1. **New Item** → Name: `PlayWrightAutomation`
2. **Type**: `Pipeline`
3. **Configuration**:
   - GitHub project: `https://github.com/YOUR_USERNAME/YOUR_REPO`
   - Build Triggers: ✓ GitHub hook trigger
   - Pipeline → Definition: `Pipeline script from SCM`
   - SCM: `Git`
   - Repository: Your GitHub repo URL
   - Branch: `*/main`
   - Script Path: `PlayWrightAutomation/Jenkinsfile`
4. **Save** → **Build Now**

---

## Available Test Commands

```bash
cd PlayWrightAutomation

npm run regression       # Run all tests
npm run webTests        # Run web tests only (@Web tag)
npm run APITests        # Run API tests only (@API tag)
npm run SafariNewConfig # Run Safari tests with alternate config
```

---

## View Test Reports

- **Allure Reports**: `http://localhost:8080/job/PlayWrightAutomation/allure/`
- **Playwright Reports**: `job/PlayWrightAutomation/ws/PlayWrightAutomation/playwright-report/`
- **Console Output**: `job/PlayWrightAutomation/lastBuild/console`

---

## Environment Variables

Set in `Jenkinsfile`:
```groovy
environment {
    NODE_PATH = 'C:\\Program Files\\nodejs'
    GIT_REPO = 'YOUR_GITHUB_REPO_URL'
    PROJECT_DIR = 'PlayWrightAutomation'
}
```

---

## Jenkins Files Location

- **Home Directory**: `C:\Users\celva\.jenkins`
- **Workspace**: `C:\Users\celva\.jenkins\workspace`
- **Jobs**: `C:\Users\celva\.jenkins\jobs`

---

## Troubleshooting Commands

```powershell
# Check Node.js
node -v
npm -v

# Verify npm packages
npm list

# Test Playwright
npx playwright --version

# Find open ports
netstat -ano | findstr :8080

# Check Java
java -version
```

---

## Common Issues & Fixes

| Issue | Fix |
|-------|-----|
| Port 8080 already in use | Change port: `--httpPort=8081` |
| npm not found | Install Node.js from nodejs.org |
| Tests timeout | Increase timeout in Jenkinsfile |
| Webhook not triggering | Check firewall, verify webhook in GitHub |
| Allure report not showing | Install Allure CLI: `choco install allure` |

---

## Jenkins Credentials

**Type**: GitHub Personal Access Token  
**Location**: Manage Jenkins → Manage Credentials  
**Scope**: System  
**ID**: github-token

---

## Useful Jenkins URLs

| Page | URL |
|------|-----|
| Dashboard | `http://localhost:8080` |
| Manage Jenkins | `http://localhost:8080/manage` |
| Manage Plugins | `http://localhost:8080/manage/pluginManager` |
| Manage Credentials | `http://localhost:8080/manage/credentials` |
| System Configuration | `http://localhost:8080/manage/configure` |
| Pipeline Job | `http://localhost:8080/job/PlayWrightAutomation` |
| Build Console | `http://localhost:8080/job/PlayWrightAutomation/lastBuild/console` |

---

## Quick Setup Checklist

- [ ] Jenkins running on http://localhost:8080
- [ ] Initial admin password saved
- [ ] Admin account created
- [ ] GitHub plugin installed
- [ ] Pipeline plugin installed
- [ ] GitHub personal access token created
- [ ] Jenkins configured with GitHub credentials
- [ ] GitHub webhook added
- [ ] Jenkinsfile in repository
- [ ] Pipeline job created
- [ ] First build tested successfully
- [ ] Reports accessible

---

## Next Step

After initial setup, monitor builds and adjust as needed. Happy testing! 🚀
