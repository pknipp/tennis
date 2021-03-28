from flask import Blueprint, request, redirect
from tennis.models import db, Reservation, Date, User
from flask_login import current_user
from datetime import datetime, date

dates = Blueprint('dates', __name__)

@dates.route('', methods=['GET'])
def index():
    dates = Date.query
    for date in dates:
        date.reservations = Reservation.query.filter(Reservation.date_id == date.id)
    if request.method == 'GET':
        return {"dates": [date.to_dict() for date in dates]}

