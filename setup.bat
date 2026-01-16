@echo off
echo Setting up AI-Powered Resume Generator...

echo Creating virtual environment...
python -m venv venv

echo Activating virtual environment...
call venv\Scripts\activate.bat

echo Installing Python dependencies...
pip install fastapi uvicorn python-multipart requests python-dotenv

echo Installing Node.js dependencies...
npm install

echo Setup complete! 
echo To run the project:
echo 1. Activate venv: call venv\Scripts\activate.bat
echo 2. Start development server: npm run dev
pause