import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";


const DeploymentWalkthrough = () => {
    return (
        <>
            <Header />
            <div style={{ maxWidth: "900px", margin: "auto", padding: "2rem", fontFamily: "Segoe UI, sans-serif", lineHeight: "1.6" }}>
                <h1> <u>End-to-End DevOps Deployment of My Portfolio on AWS with Docker & CI/CD </u></h1>

                <h2>Overview</h2>
                <p>This portfolio website is itself a DevOps project deployed on an AWS EC2 instance using Docker, Docker Compose, Nginx as a reverse proxy, and Let's Encrypt SSL certificates via Certbot. The site is fully containerized, secured with HTTPS, and updates are automated through a GitHub Actions CI/CD pipeline.</p>

                <h2>Architecture Components</h2>
                <ul>
                    <li><strong>React App</strong>: Built using <code>create-react-app</code> and containerized via Docker multi-stage build.</li>
                    <li><strong>Nginx Reverse Proxy</strong>: Serves as the entrypoint, handles SSL termination, and proxies traffic to the React container.</li>
                    <li><strong>Certbot</strong>: Issues and renews Let's Encrypt certificates using the webroot method.</li>
                    <li><strong>Docker Compose</strong>: Orchestrates the multi-container setup.</li>
                    <li><strong>EC2 Instance</strong>: Ubuntu-based server used for hosting containers.</li>
                    <li><strong>No-IP Domain</strong>: Used to map EC2 dynamic IP to a stable domain (<code>my-portfolio.zapto.org</code>).</li>
                </ul>

                <h2>Directory Structure</h2>
                <div className="code-container">
                <pre><code className="code-block">
                    {`my-portfolio/
├── app/                    # React app and Dockerfile
│   ├── Dockerfile
│   ├── src/
│   └── public/
├── reverse-proxy/         # Nginx + SSL setup
│   ├── nginx.conf
│   └── init-letsencrypt.sh
├── docker-compose.yml     # Container orchestration`}
                </code></pre>
                </div>

                <h2>Network Flow</h2>
                <div className="code-container">
                <pre><code>{`[User's Browser]
      |
   HTTPS
      ↓
[Cloudflare DNS → my-portfolio.zapto.org]
      ↓
[Public IP of EC2 Instance]
      ↓
[Nginx (handles SSL + reverse proxy)]
      ↓
[Docker container: react-app]`}</code></pre>
                </div>

                <h2>CI/CD Flow</h2>
                <div className="code-container">
                <pre><code>{`[GitHub Push to main branch]
      ↓
[GitHub Actions Workflow]
      ↓
[Build Docker image using multi-stage Dockerfile]
      ↓
[Push image to Docker Hub]
      ↓
[SSH into EC2 → pull + restart containers with Docker Compose]`}</code></pre>
                </div>

                <h2>Deployment Steps</h2>

                <h3>1. React App Dockerization</h3>
                <p>Multi-stage Dockerfile builds the app using Node.js and serves it using Nginx.</p>

                <div className="code-container">
                <pre><code className="code-block">
                    {`FROM node:18 as builder
WORKDIR /app
COPY . .
RUN npm ci && PUBLIC_URL=/ npm run build

FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html`}
                </code></pre>
                </div>

                <h3>2. Docker Compose Configuration</h3>
                <p>Manages <code>react-app</code>, <code>nginx</code>, and <code>certbot</code> services. Volumes used for cert sharing:</p>
                <div className="code-container">
                <pre><code>
                    {`services:
  app:
    build: ./app
    container_name: react-app
    expose:
      - "80"

  nginx:
    image: nginx:latest
    container_name: nginx-proxy
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./reverse-proxy/nginx.conf:/etc/nginx/conf.d/default.conf
      - certbot-etc:/etc/letsencrypt
      - certbot-var:/var/lib/letsencrypt
    depends_on:
      - app

  certbot:
    image: certbot/certbot
    container_name: certbot
    volumes:
      - certbot-etc:/etc/letsencrypt
      - certbot-var:/var/lib/letsencrypt
    entrypoint: sh -c
    command: >
      "certbot certonly --webroot
      --webroot-path=/var/lib/letsencrypt
      --email nishanau83@gmail.com
      --agree-tos
      --no-eff-email
      -d my-portfolio.zapto.org
      --rsa-key-size 4096"

volumes:
  certbot-etc:
  certbot-var:`}
                </code></pre>
                </div>
                <h3>3. Nginx Proxy Configuration</h3>
                <p>Handles SSL and traffic forwarding to React app:</p>
                <div className="code-container">
                <pre><code className="code-block">
                    {`server {
  listen 80;
  server_name my-portfolio.zapto.org;
  location /.well-known/acme-challenge/ {
    root /var/lib/letsencrypt;
  }
  location / {
    return 301 https://$host$request_uri;
  }
}

server {
  listen 443 ssl;
  server_name my-portfolio.zapto.org;

  ssl_certificate /etc/letsencrypt/live/my-portfolio.zapto.org/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/my-portfolio.zapto.org/privkey.pem;

  location / {
    proxy_pass http://react-app:80;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
  }
}`}
                </code></pre>
                        </div>
                <h3>4. Certbot Initialization</h3>
                <ul>
                    <li>Start <code>nginx</code> to respond to challenges</li>
                    <li>Use Certbot to issue cert</li>
                    <li>Save certs to shared volumes</li>
                </ul>

                <h3>5. App Access</h3>
                <p>Access the app securely via:</p>
                <div className="code-container">
                <pre><code>https://my-portfolio.zapto.org</code></pre>
                </div>

                <h2>Notes</h2>
                <ul>
                    <li>Nginx must be restarted after first cert issuance: <code>docker-compose restart nginx</code></li>
                    <li>Certbot container auto-renews every 12h but does not restart Nginx</li>
                    <li>Security groups must allow inbound TCP on ports 80 and 443</li>
                    <li>React build is triggered during Docker image build, not at runtime</li>
                </ul>

                <h2>Optional: GitHub Actions (CI/CD)</h2>
                <p>GitHub Actions can automate:</p>
                <ul>
                    <li>Code push to <code>main</code></li>
                    <li>React build</li>
                    <li>SSH deploy to EC2</li>
                    <li>Restarting <code>nginx</code> container after deployment</li>
                </ul>

                <h2>Outcome</h2>
                <ul>
                    <li>HTTPS-secured</li>
                    <li>Dockerized</li>
                    <li>Modular</li>
                    <li>CI/CD-compatible</li>
                </ul>

            </div>
            <Footer />
        </>

    );
};

export default DeploymentWalkthrough;
