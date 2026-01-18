FROM python:3.10-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y build-essential && rm -rf /var/lib/apt/lists/*

# Copy requirements from the ROOT of your project
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy everything else from the current folder (main.py, Database, etc.)
COPY . .

# Hugging Face defaults to 7860
ENV PORT=7860
EXPOSE 7860

# Ensure the command points to the main script
CMD ["python", "main.py"]