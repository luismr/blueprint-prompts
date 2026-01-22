FROM python:3.13-slim

WORKDIR /app

# Install git
RUN apt-get update && apt-get install -y git && rm -rf /var/lib/apt/lists/*

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

ARG PROMPTS_REPO
ENV PROMPTS_REPO=${PROMPTS_REPO:-https://github.com/luismr/blueprint-prompts.git}

ARG PROMPTS_BRANCH
ENV PROMPTS_BRANCH=${PROMPTS_BRANCH:-main}

COPY server.py .
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

CMD ["/entrypoint.sh"]

EXPOSE 9000