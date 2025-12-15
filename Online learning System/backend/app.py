from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import json
import os
from datetime import datetime, timedelta

app = Flask(__name__)
CORS(app)

# Simple in-memory storage (for demo purposes)
users = {}
user_sessions = {}
timetables = {}
chat_history = {}

# Secret key for JWT
SECRET_KEY = 'your-secret-key-change-in-production'

@app.route('/')
def home():
    return jsonify({'message': 'AI Learning Assistant Backend is running!'})

@app.route('/api/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        name = data.get('name')
        
        if not email or not password or not name:
            return jsonify({'error': 'All fields are required'}), 400
            
        if email in users:
            return jsonify({'error': 'Email already registered'}), 400
        
        # Hash password
        hashed_password = generate_password_hash(password)
        print(f"Registering user {email} with hashed password")
        
        users[email] = {
            'name': name,
            'email': email,
            'password': hashed_password,
            'created_at': datetime.now().isoformat()
        }
        
        print(f"User {email} registered successfully")
        
        # Create JWT token
        token = jwt.encode({
            'email': email,
            'exp': datetime.utcnow() + timedelta(days=30)
        }, SECRET_KEY, algorithm='HS256')
        
        user_sessions[token] = email
        
        return jsonify({
            'access_token': token,
            'user': {
                'name': name,
                'email': email
            }
        })
    except Exception as e:
        return jsonify({'error': 'Registration failed'}), 500

@app.route('/api/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        
        print(f"Login attempt for email: {email}")
        print(f"Available users: {list(users.keys())}")
        
        if not email or not password:
            return jsonify({'error': 'Email and password are required'}), 400
        
        if email not in users:
            print(f"Email {email} not found in users")
            return jsonify({'error': 'Invalid credentials'}), 401
            
        stored_password_hash = users[email]['password']
        print(f"Checking password for {email}")
        
        if not check_password_hash(stored_password_hash, password):
            print(f"Password check failed for {email}")
            return jsonify({'error': 'Invalid credentials'}), 401
        
        print(f"Login successful for {email}")
        
        # Create JWT token
        token = jwt.encode({
            'email': email,
            'exp': datetime.utcnow() + timedelta(days=30)
        }, SECRET_KEY, algorithm='HS256')
        
        user_sessions[token] = email
        
        user_data = users[email].copy()
        del user_data['password']  # Don't send password back
        
        return jsonify({
            'access_token': token,
            'user': user_data
        })
    except Exception as e:
        print(f"Login error: {e}")
        return jsonify({'error': 'Login failed'}), 500

@app.route('/api/profile', methods=['GET'])
def get_profile():
    try:
        token = request.headers.get('Authorization', '').replace('Bearer ', '')
        if not token:
            return jsonify({'error': 'Token required'}), 401
            
        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
            email = payload['email']
        except jwt.ExpiredSignatureError:
            return jsonify({'error': 'Token expired'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'error': 'Invalid token'}), 401
        
        if email not in users:
            return jsonify({'error': 'User not found'}), 404
            
        user_data = users[email].copy()
        del user_data['password']
        return jsonify(user_data)
    except Exception as e:
        return jsonify({'error': 'Profile fetch failed'}), 500

@app.route('/api/ai-tutor', methods=['POST'])
def ai_tutor():
    try:
        data = request.get_json()
        message = data.get('message', '').lower()
        
        # Simple AI responses
        responses = {
            'hello': 'Hello! I\'m your AI tutor. How can I help you learn today?',
            'math': 'I can help you with mathematics! What specific topic would you like to work on?',
            'science': 'Science is fascinating! Which area interests you - physics, chemistry, or biology?',
            'history': 'History helps us understand the world. What period would you like to explore?',
            'english': 'English language arts covers reading, writing, and communication. How can I assist?',
            'help': 'I can assist with Math, Science, History, and English. Just ask me a question!'
        }
        
        response = 'I\'m here to help you learn! What subject would you like to study?'
        for keyword, reply in responses.items():
            if keyword in message:
                response = reply
                break
        
        return jsonify({'response': response})
    except Exception as e:
        return jsonify({'error': 'AI tutor error'}), 500

@app.route('/api/practice-questions', methods=['GET'])
def get_practice_questions():
    try:
        subject = request.args.get('subject', 'math')
        
        questions = {
            'math': [
                {
                    'id': 1,
                    'question': 'What is 15 + 27?',
                    'options': ['42', '41', '43', '40'],
                    'correct': 0,
                    'explanation': '15 + 27 = 42'
                },
                {
                    'id': 2,
                    'question': 'Solve for x: 2x + 5 = 13',
                    'options': ['4', '3', '5', '6'],
                    'correct': 0,
                    'explanation': '2x = 13 - 5 = 8, so x = 4'
                }
            ],
            'science': [
                {
                    'id': 3,
                    'question': 'What is the chemical symbol for water?',
                    'options': ['H2O', 'CO2', 'NaCl', 'O2'],
                    'correct': 0,
                    'explanation': 'Water consists of 2 hydrogen atoms and 1 oxygen atom: H2O'
                }
            ]
        }
        
        return jsonify(questions.get(subject, []))
    except Exception as e:
        return jsonify({'error': 'Questions fetch failed'}), 500

@app.route('/api/timetable', methods=['GET'])
def get_timetable():
    try:
        token = request.headers.get('Authorization', '').replace('Bearer ', '')
        if not token:
            return jsonify([])
            
        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
            email = payload['email']
        except:
            return jsonify([])
        
        result = timetables.get(email, [])
        print(f"Returning timetable for {email}: {result}")
        return jsonify(result)
    except Exception as e:
        print(f"Error fetching timetable: {e}")
        return jsonify({'error': 'Timetable fetch failed'}), 500

@app.route('/api/timetable', methods=['POST'])
def add_timetable_entry():
    try:
        token = request.headers.get('Authorization', '').replace('Bearer ', '')
        if not token:
            return jsonify({'error': 'Please login to save your timetable'}), 401
            
        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
            email = payload['email']
        except jwt.ExpiredSignatureError:
            return jsonify({'error': 'Session expired, please login again'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'error': 'Invalid session, please login again'}), 401
        
        data = request.get_json()
        
        if email not in timetables:
            timetables[email] = []
        
        entry = {
            'id': len(timetables[email]) + 1,
            'day': data.get('day'),
            'time': data.get('time'),
            'subject': data.get('subject'),
            'duration': data.get('duration'),
            'completed': False
        }
        
        print(f"Adding timetable entry: {entry}")  # Debug log
        
        timetables[email].append(entry)
        return jsonify({'message': 'Timetable entry added successfully', 'entry': entry})
    except Exception as e:
        print(f"Error adding timetable entry: {e}")
        return jsonify({'error': 'Timetable add failed'}), 500

@app.route('/api/contact', methods=['POST'])
def contact_form():
    try:
        data = request.get_json()
        name = data.get('name')
        email = data.get('email')
        message = data.get('message')
        
        if not name or not email or not message:
            return jsonify({'error': 'All fields are required'}), 400
        
        # In a real app, you would save to database or send email
        print(f"Contact form submission:")
        print(f"Name: {name}")
        print(f"Email: {email}")
        print(f"Message: {message}")
        
        return jsonify({'message': 'Thank you for your message! We will get back to you soon.'})
    except Exception as e:
        return jsonify({'error': 'Failed to send message'}), 500

if __name__ == '__main__':
    print("Starting AI Learning Assistant Backend...")
    print("Backend will be available at: http://localhost:5000")
    app.run(debug=True, host='0.0.0.0', port=5000)