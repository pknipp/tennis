from flask import Blueprint, jsonify, request, redirect
from tennis.models import User, db
from datetime import datetime
from flask_login import login_required, logout_user, login_user, current_user
from sqlalchemy import or_

users = Blueprint('users', __name__)


@users.route('', methods=['GET', 'POST'])
def index():
    # print("top of the '' route")
    if request.method == 'GET':
        response = User.query.order_by(User.name)
        return {"users": [user.to_dict() for user in response]}
    if request.method == 'POST':
        if not request.is_json:
            return jsonify({"msg": "Missing JSON in request"}), 400
        email = request.json.get('email', None)
        name = request.json.get('name', None)
        phone = request.json.get('phone', None)
        # plays_singles = request.json.get('playsSingles', False)
        password = request.json.get('password', None)
        if not email or not password or not name or not phone:
            return {"errors": ["Missing required parameters"]}, 400
        user = User.query.filter(User.email == email).one_or_none()
        # print(user, user.id, current_user.id)
        if user:
            return {"errors": ["That email has already been taken."]}, 500
        user = User.query.filter(User.name == name).one_or_none()
        if user:
            return {"errors": ["That nickname has already been taken."]}, 500
        password2 = request.json.get('password2', None)
        if not password == password2:
            return {"errors": ["Passwords must match each other"]}, 400
        new_user = User(
            email=email,
            name=name,
            phone=phone,
            # plays_singles=plays_singles,
            password=password,
            created_at=datetime.now(),
            updated_at=datetime.now(),
            is_admin=False,
        )
        db.session.add(new_user)
        db.session.commit()
        authenticated, user = User.authenticate(email, password)
        if authenticated:
            login_user(user)
            return {"current_user": current_user.to_dict()}
        return {"errors": ["Invalid credentials"]}, 401


@users.route('/<id>', methods=['GET', 'PUT', 'DELETE'])
def user_info(id):
    # print("top of '/<id>' route")
    # print("id = ", id)
    # user = User.query.filter(User.id == int(id))[0]
    user = User.query.get(int(id))
    userd= user.to_dict()
    if request.method == "GET":
        return userd
    if request.method == 'DELETE':
        if user.id == 1:
            return {"errors": ["Don't delete our 'demo' user. Create a new account if you would like to test the 'Delete' route."]}, 401
        db.session.delete(user)
        db.session.commit()
        logout_user()
        return {"message": "goodbye"}
    if request.method == 'PUT':
        if not request.is_json:
            return jsonify({"msg": "Missing JSON in request"}), 400
        if user.id == 1:
            return {"errors": ["Don't edit our demo user's details.  Create a new account if you would like to test the 'Update User' route."]}, 401
        email = request.json.get('email', None)
        name = request.json.get('name', None)
        phone = request.json.get('phone', None)
        password = request.json.get('password', None)
        password2 = request.json.get('password2', None)
        if not password or not password2:
            return {"errors": ["Missing required parameters"]}, 400
        if password == password2:
            user.password = password
            if email:
                user_former = User.query.filter(User.email == email).one_or_none()
                if user_former and not user_former.id == current_user.id:
                    return {"errors": ["That email has already been taken."]}, 500
            if name:
                user_former = User.query.filter(User.name == name).one_or_none()
                if user_former and not user_former.id == current_user.id:
                    return {"errors": ["That nickname has already been taken."]}, 500
        else:
            return {"errors": ["Passwords must match."]}, 400
        user.email = email or userd["email"]
        user.name = name or userd["name"]
        user.phone = phone or userd["phone"]
        user.updated_at = datetime.now()
        db.session.commit()
        return {"current_user": user.to_dict()}
