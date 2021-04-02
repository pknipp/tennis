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

dates = [date(2021, 3, 27), date(2021, 3, 28), date(2021, 4, 3), date(2021, 4, 4)]

with app.app_context():
    for date in dates:
        db.session.add(Date(
            date=date,
            created_at=datetime.now(),
            updated_at=datetime.now(),
        ))
    db.session.commit()

users = [
    ("demo@aol.com", "Demo User", False, "(123)456-7890"),
    ("peteraknipp@gmail.com", "Pete K", True, "(914)462-7916"),
    ("adoe@aol.com", "Andy D", False, "(834)462-3487"),
    ("bdoe@aol.com", "Bobby D", False, "(834)462-3487"),
    ("cdoe@aol.com", "Charlie D", False, "(834)462-3487"),
    ("ddoe@aol.com", "Danny D", False, "(834)462-3487"),
    ("edoe@aol.com", "Eddie D", False, "(834)462-3487"),
    ("fdoe@aol.com", "Freddy D", False, "(834)462-3487"),
    ("gdoe@aol.com", "George D", False, "(834)462-3487"),
    ("hdoe@aol.com", "Heidi D", False, "(834)462-3487"),
    ("idoe@aol.com", "Ian D", False, "(834)462-3487"),
    ("jdoe@aol.com", "Jenny D", False, "(834)462-3487"),
    ("kdoe@aol.com", "Kiki D", False, "(834)462-3487"),
]

prob_respond = 0.7
prob_cancel = 0.3
prob_singles = 0.4

with app.app_context():
    db.drop_all()
    db.create_all()
    for i in range(len(users)):
        db.session.add(User(
            email=users[i + 1][0],
            name=users[i + 1][1],
            password="password",
            is_admin=users[i + 1][2],
            phone=users[i + 1][3],
            created_at=datetime.now(),
            updated_at=datetime.now(),
        ))
        for j in range(len(dates)):
            if random() < prob_respond:
                wants_to_play = False if random() < prob_cancel else True
                will_play_singles = True if random() < prob_singles else False
                db.session.add(Reservation(
                    user_id=i + 1,
                    date_id=j + 1,
                    wants_to_play=wants_to_play,
                    will_play_singles=will_play_singles,
                    created_at=datetime.now(),
                    updated_at=datetime.now(),
                ))
    db.session.commit()

# reservations = [
#     (3, 1, True, True),
#     (3, 3, False, True),
#     (3, 4, True, False),
#     (3, 6, False, True),
#     (3, 8, True, False),
#     (3, 10, True, True),
#     (3, 12, True, False),
#     (3, 13, False, True),
#     (4, 2, True, False),
#     (4, 3, False, False),
#     (4, 5, True, True),
#     (4, 6, True, False),
#     (4, 8, False, True),
#     (4, 9, True, False),
#     (4, 11, True, True),
#     (4, 12, False, True),
#     (4, 13, True, False),
# ]

# with app.app_context():
#     for reservation in reservations:
#         db.session.add(Reservation(
#             user_id=reservation[1],
#             date_id=reservation[0],
#             wants_to_play=reservation[2],
#             will_play_singles=reservation[3],
#             created_at=datetime.now(),
#             updated_at=datetime.now(),
#         ))
#     db.session.commit()
