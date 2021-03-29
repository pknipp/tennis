from flask import Blueprint, request, redirect
from tennis.models import db, Date, User, Reservation
from flask_login import current_user
from datetime import datetime

reservations = Blueprint('reservations', __name__)

@reservations.route('/<date_id>', methods=['PUT'])
def index(date_id):
    date_id = int(date_id)
    user_id = current_user.id
    reservation = Reservation.query.filter(Reservation.user_id == user_id).filter(Reservation.date_id == date_id).one_or_none()
    if request.method == 'PUT':
        if not reservation:
            reservation = Reservation(
                user_id=user_id,
                date_id=date_id,
                wants_to_play=True,
                will_play_singles=request.json.get("toggleSingles", False),
                created_at=datetime.now(),
                updated_at=datetime.now(),
            )
        else:
            if request.json.get("toggleSingles", None):
                reservation.will_play_singles = not reservation.will_play_singles
            else:
                reservation.wants_to_play = not reservation.wants_to_play
                reservation.updated_at=datetime.now()
        db.session.add(reservation)
        db.session.commit()
        return {"message": "Your intent has now been toggled."}
