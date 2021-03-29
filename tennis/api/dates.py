from flask import Blueprint, request, redirect
from tennis.models import db, Reservation, Date, User
from flask_login import current_user
from datetime import datetime, date

dates = Blueprint('dates', __name__)

@dates.route('', methods=['GET'])
def index():
    if request.method == "GET":
        date_list = list()
        dates = Date.query
        for date in dates:
            reservations = Reservation.query.filter(Reservation.date_id == date.id).order_by(Reservation.updated_at.desc())
            date = date.to_dict()
            yes_list = list()
            no_list = list()
            for reservation in reservations:
                player = User.query.filter(User.id == reservation.user_id).one_or_none().to_dict()
                if reservation.will_play_singles:
                    player["will_play_singles"] = True
                if reservation.wants_to_play:
                    yes_list.insert(0, player)
                else:
                    no_list.append(player)
            date["yes_list"] = yes_list
            date["no_list"] = no_list
            date_list.append(date)
        return {"dates": date_list}
