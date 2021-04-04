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

dates = [date(2021, 3, 27), date(2021, 3, 28), date(2021, 4, 3), date(2021, 4, 4), date(2021, 4, 10), date(2021, 4, 11)]

with app.app_context():
    db.drop_all()
    db.create_all()
    for date in dates:
        db.session.add(Date(
            date=date,
            created_at=datetime.now(),
            updated_at=datetime.now(),
        ))
    db.session.commit()

users = [
    ('demo@aol.com','Demo User','(123)456-7890',False,None),
    ('peteraknipp@gmail.com','Pete K','(914)462-7916',True,'https://tennis-photos.s3.us-east-2.amazonaws.com/uploads/SatApr30756082021.png'),
    ('adoe@aol.com','Andy D','(824)462-3487',False,None),
    ('bdoe@aol.com','Bobby D','(534)462-3487',False,None),
    ('cdoe@aol.com','Carl D','(837)362-3487',False,None),
    ('ddoe@aol.com','Doug D','(833)562-2367',False,None),
    ('edoe@aol.com','Ella D','(234)762-3235',False,None),
    ('fdoe@aol.com','Fran D','(734)332-8357',False,None),
    ('novak@aol.com','Novak','unlisted',False,'https://tennis-photos.s3.us-east-2.amazonaws.com/uploads/SatApr30757432021.png'),
    ('roger@aol.com','Roger F','unlisted',False,'https://tennis-photos.s3.us-east-2.amazonaws.com/uploads/SatApr31444062021.png'),
    ('rafa@aol.com','Rafa N','unlisted',False,'https://tennis-photos.s3.us-east-2.amazonaws.com/uploads/SatApr30759302021.png'),
    ('chrissie@aol.com','Chrissie E','unlisted',False,'https://tennis-photos.s3.us-east-2.amazonaws.com/uploads/SatApr30804162021.png'),
    ('arthur@aol.com','Arthur A','unlisted',False,'https://tennis-photos.s3.us-east-2.amazonaws.com/uploads/SatApr30805142021.png'),
    ('naomi@aol.com','Naomi O','unlisted',False,'https://tennis-photos.s3.us-east-2.amazonaws.com/uploads/SatApr30806472021.png'),
    ('jimmy@aol.com','Jimmy C','unlisted',False,'https://tennis-photos.s3.us-east-2.amazonaws.com/uploads/SatApr30807422021.png'),
    ('billiejean@aol.com','Billie Jean','unlisted',False,'https://tennis-photos.s3.us-east-2.amazonaws.com/uploads/SatApr30808342021.png'),
]

with app.app_context():
    for user in users:
        db.session.add(User(
            email=user[0],
            name=user[1],
            password="password",
            is_admin=user[3],
            phone=user[2],
            photo_url=user[4],
            created_at=datetime.now(),
            updated_at=datetime.now(),
        ))
    db.session.commit()

prob_respond = 0.7
prob_cancel = 0.3
prob_singles = 0.4

with app.app_context():
    for i in range(len(users)):
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
