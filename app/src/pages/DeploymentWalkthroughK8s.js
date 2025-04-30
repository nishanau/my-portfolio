import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const DeploymentWalkthroughK8s = () => {
    return (
        <>
            <Header />
            <div style={{ maxWidth: "900px", margin: "auto", padding: "2rem", fontFamily: "Segoe UI, sans-serif", lineHeight: "1.6" }}>
                <h1><u>DevOps Deployment of Portfolio on Minikube with Cloudflare Tunnel & CI/CD</u></h1>

                <h2>Overview</h2>
                <p>
                    This walkthrough details the deployment of my portfolio app inside a local Kubernetes cluster using Minikube running on a Hyper-V Ubuntu VM. The application is containerized with Docker, exposed via NGINX Ingress Controller, and made publicly accessible through a secure Cloudflare Tunnel linked to a custom domain (<code>nishdevops.org</code>). CI/CD automation is handled by a GitHub Actions self-hosted runner.
                </p>

                <h2>Architecture Components</h2>
                <ul>
                    <li><strong>React App</strong>: Dockerized using a multi-stage build.</li>
                    <li><strong>Kubernetes (Minikube)</strong>: Local cluster hosted on an internal Hyper-V Ubuntu VM.</li>
                    <li><strong>NGINX Ingress Controller</strong>: Routes requests to the correct service based on URL path.</li>
                    <li><strong>Cloudflare Tunnel</strong>: Securely exposes Ingress without router or firewall changes.</li>
                    <li><strong>GitHub Actions (Self-hosted)</strong>: CI/CD pipeline runs inside the same VM via <code>kubernetes_workflow.yml</code>.</li>
                </ul>

                <h2>Directory Structure</h2>
                <pre><code className="code-block">{`my-portfolio/
├── app/                            # React app with Dockerfile and nginx.conf
│   └── src/
├── nginx.conf      
├── Dockerfile  
├── .github/
│   └── workflows/
│       └── kubernetes_workflow.yml  # GitHub Actions pipeline
`}</code></pre>

                <h2>Deployment Steps</h2>

                <h3>1. Dockerize the React App</h3>
                <p>Multi-stage Dockerfile builds and serves the app via NGINX:</p>
                <pre><code className="code-block">{`FROM node:18 as builder
WORKDIR /app
COPY . .
RUN npm ci && PUBLIC_URL=/ npm run build

FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html`}</code></pre>

                <h3>2. Kubernetes Deployment and Service</h3>
                <pre><code className="code-block">{`apiVersion: apps/v1
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

                <h3>3. Ingress Configuration</h3>
                <p>Ingress rule to route traffic from the domain:</p>
                <pre><code className="code-block">{`apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: project-ingress
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt-prod
spec:
  ingressClassName: nginx

  tls:
  - hosts:
    - my-portfolio.zapto.org
    secretName: portfolio-tls

  rules:
  - http:
      paths:
        # CNS
      - path: /cns
        pathType: Prefix
        backend:
          service:
            name: cns
            port:
              number: 80

        # Crypto app (static + API)
      - path: /crypto
        pathType: Prefix
        backend:
          service:
            name: crypto-webapp
            port:
              number: 80

      # <<< NEW: catch all /api calls and send to crypto service >>>
      - path: /api
        pathType: Prefix
        backend:
          service:
            name: crypto-webapp
            port:
              number: 80

        # Portfolio (root)
      - path: /
        pathType: Prefix
        backend:
          service:
            name: react-portfolio
            port:
              number: 80`}</code></pre>

                <h3>4. Cloudflare Tunnel Setup</h3>
                <ul>
                    <li>Purchased domain <code>nishdevops.org</code> from Cloudflare</li>
                    <li>Created tunnel: <code>cloudflared tunnel create nish-portfolio</code></li>
                    <li>Configured tunnel with <code>config.yml</code> to point to Minikube Ingress</li>
                    <li>DNS route created via <code>cloudflared tunnel route dns</code></li>
                    <li>Tunnel auto-started on boot with: <code>cloudflared service install</code></li>
                </ul>

                <h3>5. GitHub Actions CI/CD</h3>
                <p>Defined in <code>.github/workflows/kubernetes_workflow.yml</code> and executed via a self-hosted runner:</p>
                <pre><code className="code-block">{`name: CI/CD - React Portfolio Deployment

on:
  push:
    branches:
      - main

jobs:
  build-push-restart:
    runs-on: [self-hosted, Linux, x64]

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Log in to Docker Hub
        uses: docker/login-action@v3
        with:
          username: secrets.DOCKER_USERNAME
          password: secrets.DOCKER_PASSWORD

      - name: Build and push Docker image
        uses: docker/build-push-action@v5
        with:
          context: .
          file: ./Dockerfile
          push: true
          tags: nishans0/react-portfolio:latest

      - name: Restart deployment to pull latest image
        run: |
          kubectl rollout restart deployment/react-portfolio
          kubectl rollout status deployment/react-portfolio`}</code></pre>

                <h3>6. Boot-Time Automation</h3>
                <ul>
                    <li>Minikube set to auto-start using a systemd service</li>
                    <li>Cloudflare tunnel starts on boot via <code>cloudflared service install</code></li>
                </ul>

                <h2>Final Access</h2>
                <p>Live site accessible at:</p>
                <pre><code className="code-block">https://nishdevops.org</code></pre>

                <h2>Result</h2>
                <ul>
                    <li>Kubernetes-native deployment with Ingress</li>
                    <li>Public HTTPS access via Cloudflare Tunnel</li>
                    <li>End-to-end CI/CD with GitHub Actions</li>
                    <li>No router config, static IP, or port forwarding needed</li>
                </ul>
            </div>
            <Footer />
        </>
    );
};

export default DeploymentWalkthroughK8s;
