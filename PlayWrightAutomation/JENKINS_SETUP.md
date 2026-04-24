# Jenkins & CI/CD Setup Guide for Playwright Automation

## Overview
This guide provides setup instructions for Jenkins local server with GitHub integration for your Playwright automation project.

---

## ✅ Completed Setup

### 1. Jenkins Installation
- **Status**: ✓ Installed
- **Version**: 2.555.1
- **Location**: `C:\Jenkins\jenkins.war`
- **JAVA Version**: Java 22

---

## 🚀 Quick Start

### Step 1: Access Jenkins Dashboard

1. **Open your browser** and navigate to:
   ```
   http://localhost:8080
   ```

2. **Initial Admin Password**:
   ```
   cb4a54954b574f569b0ac1275de9d1fc
   ```
   
   Or find it at:
   ```
   C:\Users\celva\.jenkins\secrets\initialAdminPassword
   ```

3. **Create Admin User**:
   - Enter the password above
   - Follow the setup wizard
   - Create your admin account
   - Choose "Install suggested plugins"

### Step 2: Stop/Restart Jenkins

**Stop Jenkins**:
- Press `Ctrl+C` in the terminal running Jenkins

**Start Jenkins again**:
```powershell
java -jar C:\Jenkins\jenkins.war --httpPort=8080 --enable-future-java
```

---

## 📋 Required Plugin Installation

After initial setup, install these plugins via Jenkins Dashboard:

1. Go to: **Manage Jenkins** → **Manage Plugins** → **Available Plugins**

2. Search for and install:
   - **GitHub plugin** - For GitHub integration
   - **GitHub Branch Source Plugin** - For branch discovery
   - **Pipeline** - For Jenkinsfile support
   - **NodeJS Plugin** - For Node.js/npm support
   - **Allure Plugin** - For Allure report visualization
   - **Email Extension Plugin** - For notifications

---

## 🔗 GitHub Integration Setup

### Step 1: Create GitHub Personal Access Token

1. Go to GitHub → **Settings** → **Developer settings** → **Personal access tokens**
2. Click **Generate new token** → **Generate new token (classic)**
3. **Token name**: `Jenkins-CI-CD`
4. **Select scopes**:
   - ✓ repo (all)
   - ✓ admin:repo_hook
   - ✓ admin:org_hook
5. **Generate** and **copy** the token

### Step 2: Configure Jenkins with GitHub Token

1. In Jenkins: **Manage Jenkins** → **System** → **GitHub**
2. Click **Add GitHub Server** → **GitHub Server**
3. **Name**: `GitHub`
4. **API URL**: `https://api.github.com`
5. **Credentials**: Click **Add** → **Jenkins**
   - **Kind**: `GitHub Personal Access Token`
   - **Token**: Paste your GitHub token
   - **ID**: `github-token`
   - **Description**: `GitHub API Token`
6. Click **Test connection**
7. **Save**

### Step 3: Configure GitHub Webhook

1. Go to your GitHub repository
2. **Settings** → **Webhooks** → **Add webhook**
3. **Payload URL**: 
   ```
   http://YOUR_LOCAL_IP:8080/github-webhook/
   ```
   
   **Find your local IP**:
   ```powershell
   ipconfig
   ```
   
4. **Content type**: `application/json`
5. **Events**: Select:
   - ✓ Push events
   - ✓ Pull requests
   - ✓ Just the push event
6. **Active**: ✓ Checked
7. **Add webhook**

---

## 📝 Create Jenkins Pipeline Job

### Step 1: Create New Pipeline Job

1. Jenkins Dashboard → **New Item**
2. **Item name**: `PlayWrightAutomation`
3. **Type**: Select `Pipeline`
4. **OK**

### Step 2: Configure Pipeline

1. **General Tab**:
   - **Description**: Playwright Automation Tests
   - **GitHub project**: 
     ```
     https://github.com/YOUR_USERNAME/YOUR_REPO
     ```

2. **Build Triggers**:
   - ✓ GitHub hook trigger for GITScm polling
   - ✓ Poll SCM (optional):
     ```
     H/15 * * * *  # Every 15 minutes
     ```

3. **Pipeline**:
   - **Definition**: `Pipeline script from SCM`
   - **SCM**: `Git`
   - **Repository URL**: 
     ```
     https://github.com/YOUR_USERNAME/YOUR_REPO.git
     ```
   - **Credentials**: Select your GitHub token
   - **Branch**: `*/main` (or your branch)
   - **Script Path**: `PlayWrightAutomation/Jenkinsfile`
   - **Save**

### Step 3: Test the Pipeline

1. Click **Build Now**
2. Check console output for logs
3. If successful, commits to GitHub will trigger builds

---

## 📦 Update Jenkinsfile Configuration

Edit `PlayWrightAutomation/Jenkinsfile` and update:

```groovy
environment {
    NODE_PATH = 'C:\\Program Files\\nodejs'
    GIT_REPO = 'https://github.com/YOUR_GITHUB_USERNAME/PlayWrightAutomation.git'
    PROJECT_DIR = 'PlayWrightAutomation'
}
```

Replace `YOUR_GITHUB_USERNAME` with your actual GitHub username.

---

## 🌐 Accessing Reports

After a successful pipeline run, access reports at:

### Allure Report
```
http://localhost:8080/job/PlayWrightAutomation/allure/
```

### Playwright Report
```
http://localhost:8080/job/PlayWrightAutomation/ws/PlayWrightAutomation/playwright-report/
```

### Test Results
```
http://localhost:8080/job/PlayWrightAutomation/ws/PlayWrightAutomation/test-results/
```

---

## 🔧 Troubleshooting

### Issue: "npm command not found"
**Solution**: 
- Install Node.js from https://nodejs.org
- Verify: `node -v` and `npm -v` in PowerShell
- Configure Jenkins NodeJS Plugin with Node installation path

### Issue: Webhook not triggering builds
**Solution**:
- Verify firewall allows port 8080
- Check Jenkins system logs: **Manage Jenkins** → **System Log**
- Use ngrok to expose local Jenkins if testing remotely: https://ngrok.com

### Issue: Tests timeout
**Solution**:
- Increase timeout in `playwright.config.ts`
- Increase Jenkins job timeout: **Pipeline** → **Advanced** → **Timeout**

### Issue: Allure report not generating
**Solution**:
- Ensure `allure-playwright` is installed: `npm install allure-playwright`
- Install Allure CLI on Jenkins machine:
  ```powershell
  choco install allure -y
  ```

---

## 📊 Optional: Alternative GitHub Actions

Instead of Jenkins, you can use GitHub Actions (cloud-based):
- The `.github/workflows/playwright-tests.yml` file is already configured
- Simply push to GitHub, and tests run automatically
- No local server needed

---

## ✨ Files Created

1. **Jenkinsfile** - Pipeline configuration
2. **.github/workflows/playwright-tests.yml** - GitHub Actions workflow
3. **JENKINS_SETUP.md** - This guide

---

## 📞 Support Resources

- [Jenkins Documentation](https://www.jenkins.io/doc/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Playwright Documentation](https://playwright.dev/)
- [Allure Report Documentation](https://docs.qameta.io/allure/)

---

## 🎯 Next Steps

1. ✓ Jenkins is running on http://localhost:8080
2. Push Jenkinsfile to your GitHub repository
3. Configure GitHub webhook
4. Create Jenkins pipeline job
5. Run first test pipeline
6. Monitor and adjust as needed

**Happy testing! 🚀**
