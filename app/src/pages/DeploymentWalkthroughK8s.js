import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const DeploymentWalkthroughK8s = () => {
    return (
        <>
            <Header />
            <div style={{ maxWidth: "900px", margin: "auto", padding: "2rem", fontFamily: "Segoe UI, sans-serif", lineHeight: "1.6" }}>
                <h1><u>DevOps Deployment of this site, Computer Networks Solution and Crypto App on Minikube with Cloudflare Tunnel & CI/CD</u></h1>

                <h2>Overview</h2>
                <p>
                    Deployed a Dockerized React portfolio app inside a local Kubernetes cluster (Minikube) running on a Hyper-V Ubuntu VM. Exposed the app publicly via Cloudflare Tunnel and automated deployments using a self-hosted GitHub Actions runner.
                </p>

                <h2>Highlights</h2>
                <ul>
                    <li>Kubernetes-native deployment using Minikube on internal VM</li>
                    <li>NGINX Ingress Controller for internal routing</li>
                    <li>Cloudflare Tunnel exposing services without firewall/router access</li>
                    <li>CI/CD via GitHub Actions self-hosted runner on same VM</li>
                    <li>Boot-time automation of cluster and tunnel using systemd</li>
                </ul>

                <h2>Architecture Components</h2>
                <ul>
                    <li><strong>React App</strong>: Dockerized using a multi-stage build.</li>
                    <li><strong>Kubernetes (Minikube)</strong>: Local cluster hosted on a Hyper-V Ubuntu VM with 3 pods for portfolio, CNS app, and crypto app.</li>
                    <li><strong>NGINX Ingress Controller</strong>: Routes based on URL path.</li>
                    <li><strong>Cloudflare Tunnel</strong>: Public HTTPS access using <code>nishdevops.org</code>.</li>
                    <li><strong>GitHub Actions (Self-hosted)</strong>: CI/CD pipeline via <code>kubernetes_workflow.yml</code>.</li>
                </ul>

                <h2>Directory Structure</h2>
                <div className="code-container">
                <pre><code>{`my-portfolio/
├── app/                             
│   └── src/
├── nginx.conf      
├── Dockerfile  
├── .github/
│   └── workflows/
│       └── kubernetes_workflow.yml  # GitHub Actions pipeline`}</code></pre>
                </div>

                <h2>Network Flow</h2>
                <div className="code-container">
                <pre><code>{`[User]
  ↓ HTTPS
[Cloudflare DNS → nishdevops.org]
  ↓ Tunnel
[cloudflared → Ubuntu VM]
  ↓ HTTP
[NGINX Ingress Controller (Minikube)]
  ↓
[K8s Services → Portfolio / CNS / Crypto Pods]`}</code></pre>
                </div>

                <h2>CI/CD Flow</h2>
                <div className="code-container">
                <pre><code>{`[GitHub Push to main branch]
  ↓
[GitHub Actions (self-hosted runner in VM)]
  ↓
[Docker Build → Push to Docker Hub]
  ↓
[kubectl rollout restart deployment]
  ↓
[Kubernetes pulls latest image → updates pods]`}</code></pre>
                </div>

                <h2>Deployment Steps</h2>

                <h3>1. Dockerize the React App</h3>
                <div className="code-container">
                <pre><code>{`FROM node:18 as builder
WORKDIR /app
COPY . .
RUN npm ci && PUBLIC_URL=/ npm run build

FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html`}</code></pre>
                </div>

                <h3>2. Kubernetes Deployment and Service</h3>
                <div className="code-container">
                <pre><code>{`apiVersion: apps/v1
kind: Deployment
metadata:
  name: react-portfolio
spec:
  replicas: 1
  selector:
    matchLabels:
      app: react-portfolio
  template:
    metadata:
      labels:
        app: react-portfolio
    spec:
      containers:
      - name: react-portfolio
        image: nishans0/react-portfolio:latest
        ports:
        - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: react-portfolio
spec:
  selector:
    app: react-portfolio
  ports:
  - port: 80
    targetPort: 80`}</code></pre>
                </div>

                <h3>3. Ingress Configuration</h3>
                <div className="code-container">
                <pre><code>{`apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: project-ingress
spec:
  ingressClassName: nginx
  rules:
  - http:
      paths:
        - path: /cns
          pathType: Prefix
          backend:
            service:
              name: cns
              port:
                number: 80
        - path: /crypto
          pathType: Prefix
          backend:
            service:
              name: crypto-webapp
              port:
                number: 80
        - path: /api
          pathType: Prefix
          backend:
            service:
              name: crypto-webapp
              port:
                number: 80
        - path: /
          pathType: Prefix
          backend:
            service:
              name: react-portfolio
              port:
                number: 80`}</code></pre>
                </div>

                <h3>4. Cloudflare Tunnel Setup</h3>
                <ul>
                    <li>Purchased domain <code>nishdevops.org</code></li>
                    <li>Created tunnel: <code>cloudflared tunnel create nish-portfolio</code></li>
                    <li>Configured <code>config.yml</code> to point to NGINX Ingress NodePort</li>
                    <li>DNS route added: <code>cloudflared tunnel route dns</code></li>
                    <li>Enabled auto-start on boot: <code>cloudflared service install</code></li>
                </ul>

                <h3>5. GitHub Actions CI/CD</h3>
                <div className="code-container">
                <pre><code>{`name: CI/CD - React Portfolio Deployment
on:
  push:
    branches:
      - main
jobs:
  build-push-restart:
    runs-on: [self-hosted, Linux, x64]
    steps:
      - uses: actions/checkout@v3
      - uses: docker/setup-buildx-action@v3
      - uses: docker/login-action@v3
        with:
          username: secrets.DOCKER_USERNAME
          password: secrets.DOCKER_PASSWORD
      - uses: docker/build-push-action@v5
        with:
          context: .
          file: ./Dockerfile
          push: true
          tags: nishans0/react-portfolio:latest
      - name: Restart K8s Deployment
        run: |
          kubectl rollout restart deployment/react-portfolio
          kubectl rollout status deployment/react-portfolio`}</code></pre>
                </div>

                <h3>6. Boot-Time Automation</h3>
                <ul>
                    <li>Minikube starts using systemd service on VM boot</li>
                    <li>Cloudflare tunnel auto-starts via <code>cloudflared service install</code></li>
                </ul>

                <h2>Final Access</h2>
                <p>Site is live and accessible via:</p>
                <div className="code-container">
                <pre><code>https://nishdevops.org</code></pre>
                </div>

                <h2>Skills Gained</h2>
                <ul>
                    <li>Kubernetes deployments with Ingress routing</li>
                    <li>Docker multi-stage builds and image publishing</li>
                    <li>CI/CD automation via GitHub Actions self-hosted runners</li>
                    <li>Cloudflare tunneling for zero-config HTTPS exposure</li>
                    <li>Linux systemd and tunnel automation</li>
                </ul>
            </div>
            <Footer />
        </>
    );
};

export default DeploymentWalkthroughK8s;
