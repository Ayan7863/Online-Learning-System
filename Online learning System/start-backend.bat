@echo off
echo Starting AI Learning Assistant Backend...
echo.
cd backend
echo Installing dependencies...
pip install -r requirements.txt
echo.
echo Starting Flask server...
python app.py
pause