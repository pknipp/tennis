from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(63), nullable=False, unique=True)
    name = db.Column(db.String(22), nullable=False, unique=True)
    phone = db.Column(db.String(15), nullable=False)
    is_admin = db.Column(db.Boolean, nullable=False)
    hashed_password = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False)

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    @classmethod
    def authenticate(cls, email, password):
        user = cls.query.filter(User.email == email).scalar()
        if user:
            return check_password_hash(user.hashed_password, password), user
        else:
            return False, None


    def to_dict(self):
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name,
            "phone": self.phone,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "is_admin": self.is_admin,
        }

    reservations = db.relationship("Reservation", back_populates="user", cascade="all, delete-orphan")


class Date(db.Model, UserMixin):
    __tablename__ = 'dates'

    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "date": self.date,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }

    reservations = db.relationship("Reservation", back_populates="date", cascade="all, delete-orphan")


class Reservation(db.Model, UserMixin):
    __tablename__ = 'reservations'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    date_id = db.Column(db.Integer,db.ForeignKey("dates.id"), nullable=False)
    wants_to_play = db.Column(db.Boolean, nullable=False)
    will_play_singles = db.Column(db.Boolean, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "date_id": self.date_id,
            "wants_to_play": self.wants_to_play,
            "will_play_singles": self.will_play_singles,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }

    user = db.relationship("User", back_populates="reservations")
    date = db.relationship("Date", back_populates="reservations")
