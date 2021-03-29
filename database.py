from tennis.models import User, Date, Reservation
from tennis import app, db
from dotenv import load_dotenv
from datetime import date, datetime, timedelta
from faker import Faker
from random import randrange, seed, random
from werkzeug.security import generate_password_hash, check_password_hash

seed(1)
fake = Faker()
load_dotenv()

users = [
    ("demo@aol.com", "Demo User", False, "(123)456-7890"),
    ("peteraknipp@gmail.com", "Pete K", True, "(914)462-7916"),
    ("adoe@gmail.com", "Andy D", False, "(834)462-3487"),
    ("bdoe@gmail.com", "Bobby D", False, "(834)462-3487"),
    ("cdoe@gmail.com", "Charlie D", False, "(834)462-3487"),
    ("ddoe@gmail.com", "Danny D", False, "(834)462-3487"),
    ("edoe@gmail.com", "Eddie D", False, "(834)462-3487"),
    ("fdoe@gmail.com", "Freddy D", False, "(834)462-3487"),
    ("gdoe@gmail.com", "George D", False, "(834)462-3487"),
    ("hdoe@gmail.com", "Heidi D", False, "(834)462-3487"),
    ("idoe@gmail.com", "Ian D", False, "(834)462-3487"),
    ("jdoe@gmail.com", "Jenny D", False, "(834)462-3487"),
    ("kdoe@gmail.com", "Kiki D", False, "(834)462-3487"),
]

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

reservations = [
    (1, 1, True),
    (1, 3, False),
    (1, 4, True),
    (1, 6, False),
    (1, 8, True),
    (1, 10, True),
    (1, 12, True),
    (1, 13, False),
    (2, 2, True),
    (2, 3, False),
    (2, 5, True),
    (2, 6, True),
    (2, 8, False),
    (2, 9, True),
    (2, 11, True),
    (2, 12, False),
    (2, 13, True),
]

with app.app_context():
    for reservation in reservations:
        db.session.add(Reservation(
            user_id=reservation[1],
            date_id=reservation[0],
            wants_to_play=reservation[2],
            created_at=datetime.now(),
            updated_at=datetime.now(),
        ))
    db.session.commit()
