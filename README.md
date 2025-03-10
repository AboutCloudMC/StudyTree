# StudyTree - Personalized Learning Platform

## Overview
**StudyTree** is an AI-powered personalized learning platform designed to help users explore and understand various topics in their preferred format. Whether through text, videos, or podcasts, StudyTree adapts to each user's learning style, making education more engaging and effective.

## Features
- **AI-Generated Content:** Automatically generates educational material for any topic entered by the user.
- **Multi-Format Learning:** Supports text explanations, video recommendations, and podcast suggestions.
- **Topic Exploration:** Allows users to deepen their understanding or branch into related subtopics.
- **User-Friendly Interface:** A simple and intuitive UI for seamless learning.
- **Real-Time AI Integration:** Uses DeepSeek AI (and Google Gemini for testing) to provide high-quality, dynamic responses.

## Technology Stack
- **Framework:** Flask (Python)
- **Frontend:** Vanilla including Flask syntax 
- **AI Integration:** Google Gemini
- **Hosting:** DigitalOcean

## Installation
### Prerequisites
- Python 3.9+
- Pip and virtual environment tools
- Python Dependencies

### Docker Install
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/studytree.git
   cd studytree

2. Build the Dockerfile:
   ```bash
   docker build -t flask-genai-app .

3. Run the container:
   ```bash
   docker run -d -p 1234:1234 --env-file .env flask-genai-app
   
4. Check if the container is running:
   ```bash
   docker ps

### Manual Install
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/studytree.git
   cd studytree
   
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   
3. Place your Gemini API Key into the .env file:
   ```dotenv
   KEY={YourKey}

4. Run the application:
   ```bash
   python app.py

---
Happy Learning with **StudyTree**!
   

