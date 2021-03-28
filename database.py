from tennis.models import User, Date
from tennis import app, db
from dotenv import load_dotenv
from datetime import date, datetime, timedelta
from faker import Faker
from random import randrange, seed, random
from werkzeug.security import generate_password_hash, check_password_hash

seed(1)
fake = Faker()
load_dotenv()

users = [("demo@aol.com", "Demo User", False, "(123)456-7890"), ("peteraknipp@gmail.com", "Pete K", True, "(914)462-7916")]

with app.app_context():
    db.drop_all()
    db.create_all()
    for user in users:
        db.session.add(User(
            email=user[0],
            name=user[1],
            password="password",
            is_admin=user[2],
            phone=user[3],
            created_at=datetime.now(),
            updated_at=datetime.now(),
            plays_singles=True,
        ))
    db.session.commit()

dates = [date(2021, 4, 3), date(2021, 4, 4)]

with app.app_context():
    for date in dates:
        db.session.add(Date(
            date=date,
            created_at=datetime.now(),
            updated_at=datetime.now(),
        ))
    db.session.commit()
