import os
from flask import Flask, render_template, request, session, redirect
from flask_cors import CORS
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager, \
    current_user, login_user, logout_user, login_required
from flask_migrate import Migrate
from tennis.models import db, User, Date, Reservation
from tennis.api.session import session
from tennis.api.users import users
from tennis.api.dates import dates
from tennis.api.reservations import reservations
from tennis.api.photos import photos
from tennis.config import Config
from datetime import datetime, date, timedelta


app = Flask(__name__)
login_manager = LoginManager(app)
migrate = Migrate(app, db)
app.config.from_object(Config)
app.register_blueprint(session, url_prefix='/api/session')
app.register_blueprint(users, url_prefix='/api/users')
app.register_blueprint(dates, url_prefix='/api/dates')
app.register_blueprint(reservations, url_prefix='/api/reservations')
app.register_blueprint(photos, url_prefix='/api/photos')
db.init_app(app)


# Does the following get used for anything?
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(user_id)


# Application Security
CORS(app)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie(
        'csrf_token',
        generate_csrf(),
        secure=True if os.environ.get('FLASK_ENV') else False,
        samesite='Strict' if os.environ.get('FLASK_ENV') else None,
        httponly=True)
    return response


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    print("path", path)
    if path == 'favicon.ico':
        return app.send_static_file('favicon.ico')
    return app.send_static_file('index.html')


@app.route('/restore')
def restore():
    dates = Date.query.all()
    users = User.query.all()
    date0 = dates[len(dates) - 2].date
    date1 = dates[len(dates) - 1].date
    today = date.today()
    if date1 < today:
        now = datetime.now()
        db.session.add(Date(date=date0 + timedelta(days=7), created_at=now, updated_at=now))
        db.session.add(Date(date=date1 + timedelta(days=7), created_at=now, updated_at=now))
        db.session.commit()

        prob_respond = 0.7
        prob_cancel = 0.3
        prob_singles = 0.4

        for i in range(len(users)):
            for j in range(2):
                if random() < prob_respond:
                    wants_to_play = False if random() < prob_cancel else True
                    will_play_singles = True if random() < prob_singles else False
                    db.session.add(Reservation(
                        user_id=i + 1,
                        date_id=len(dates) + j + 1,
                        wants_to_play=wants_to_play,
                        will_play_singles=will_play_singles,
                        created_at=datetime.now(),
                        updated_at=datetime.now(),
                    ))
        db.session.commit()
    id = current_user.id if current_user.is_authenticated else None
    user = None if not current_user.is_authenticated else current_user.to_dict()
    if current_user:
        return {"current_user": user}
