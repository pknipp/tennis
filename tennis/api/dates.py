from flask import Blueprint, request, redirect
from tennis.models import db, Reservation, Date, User
from flask_login import current_user
from datetime import date, datetime

dates = Blueprint('dates', __name__)

@dates.route('', methods=['GET'])
def index():
    if request.method == "GET":
        date_list = list()
        today = date.today()
        # dates = Date.query.filter(Date.date >= date.today())
        dates = Date.query.all()
        for one_date in dates:
            reservations = Reservation.query.filter(Reservation.date_id == one_date.id).order_by(Reservation.updated_at.desc())
            one_date = one_date.to_dict()
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
            one_date["yes_list"] = yes_list
            one_date["no_list"] = no_list
            date_list.append(one_date)
        return {"dates": date_list, "today": today, "current_user": current_user.to_dict()}
