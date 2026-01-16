@echo off
echo ========================================
echo AI-Powered Resume Generator
echo ========================================
echo.

echo Checking if virtual environment exists...
if not exist "venv" (
    echo Creating virtual environment...
    python -m venv venv
)

echo Activating virtual environment...
call venv\Scripts\activate.bat

echo Installing/updating dependencies...
npm install

echo.
echo ========================================
echo SETUP INSTRUCTIONS:
echo ========================================
echo 1. Add your API keys to .env.local:
echo    - HUGGINGFACE_API_KEY=your_key_here
echo    - OPENROUTER_API_KEY=your_key_here
echo.
echo 2. Get API keys from:
echo    - Hugging Face: https://huggingface.co/settings/tokens
echo    - OpenRouter: https://openrouter.ai/keys
echo.
echo ========================================

echo Starting development server...
npm run dev