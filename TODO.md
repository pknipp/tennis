Components to create for admin:
approve user, create date, delete date, roster which includes "private" data.
insertion of a special date (Mon or Fri for a 3-day weekend?)
queue up large periods of ("visible" = False) dates in future, including 3-day weekends and omissions

test the automation of the creation of the next week's dates (& reservations) when a weekend passes (use a while loop, in case many weekends have passed)

include "isPrivate" column in User model (and use this to hide phone numbers on roster?)
use localstorage to store password?
change photo_url to use user's id#?
User faker to seed phone numbers (and first names, if these can be generated uniquely?)
allow the user to toggle the display of availabilities for past dates

Stuff to do to allow a multiplicity of groups to use this site:
    Create a Groups table (which'll be analogous to netAssign's Courses table)
    Create a Memberships table which joins Groups with Users (like netAssign's Enrollments)
    columns of Groups table:
        name
        manager_id (FK which refers to Users table)
        day(s) and time(s) when they regularly play
        address where they usually play
        policies
    Dates acquires group_id FK
    How to handle Sunday sylvan group (early or late or either)
