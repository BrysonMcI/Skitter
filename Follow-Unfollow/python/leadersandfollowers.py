from flask import Flask, request, abort
from flask import jsonify
import pymysql as sql
import os
app = Flask(__name__)



@app.route('/UserSearch', methods=['GET'])
def user_search():
    search = request.args.get('search')
    if not search:
        abort(400)

    db = sql.connect(host="prod_sql",
                     user="root",
                     password=os.environ['MYSQL_ROOT_PASSWORD'],
                     db="skitter",
                     charset='utf8mb4',
                     cursorclass=sql.cursors.DictCursor)

    try:
        with db.cursor() as cursor:
            #Search users
            stmt = "SELECT username FROM users WHERE username LIKE %s"
            cursor.execute(stmt, ('%' + search + '%',))
            foundUsers = cursor.fetchall()

    except:
        abort(500)
    finally:
        db.close()

    foundUsers = [v['username'] for v in foundUsers]
    return jsonify(foundUsers)


@app.route('/getFollowing',  methods=['GET'])
def getFollowing():
    email = request.args.get('email')
    if not email:
        abort(400)

    db = sql.connect(host="prod_sql",
                     user="root",
                     password=os.environ['MYSQL_ROOT_PASSWORD'],
                     db="skitter",
                     charset='utf8mb4',
                     cursorclass=sql.cursors.DictCursor)

    try:
        with db.cursor() as cursor:
            #Get leaders
            stmt = "SELECT leader FROM followers WHERE follower = %s"
            cursor.execute(stmt, (email,))
            followingEmails = cursor.fetchall()

    except:
        abort(500)
    finally:
        db.close()


    followingEmails = [v['leader'] for v in followingEmails]
    return jsonify(followingEmails)

@app.route('/FollowUser',  methods=['POST'])
def follow():

    emailOfFollower = request.form['email']
    userToFollow = request.form['follow']

    if not userToFollow:
        abort(400)

    #more replacing with env variables
    db = sql.connect(host="prod_sql",
                     user="root",
                     password=os.environ['MYSQL_ROOT_PASSWORD'],
                     db="skitter",
                     charset='utf8mb4',
                     cursorclass=sql.cursors.DictCursor)
    
    try:
        with db.cursor() as cursor:
            
            #Find email correlated to username
            stmt = "SELECT `email` FROM `users` WHERE `username`=%s"
            cursor.execute(stmt, (userToFollow,))            
            emailToFollow = cursor.fetchone()['email']

        with db.cursor() as cursor:
            #Add to followers
            stmt = "INSERT INTO followers VALUES (%s, %s) ON DUPLICATE KEY UPDATE leader=leader"
            cursor.execute(stmt, (emailToFollow, emailOfFollower))

        db.commit()


    except:
        abort(500)
    finally:
        db.close()

    return jsonify({"success" : True})


@app.route('/UnfollowUser',  methods=['POST'])
def unfollow():
    
    emailOfFollower = request.form['email']
    userToUnfollow = request.form['unfollow']

    if not userToUnfollow:
        abort(400)

    #more replacing with env variables
    db = sql.connect(host="prod_sql",
                     user="root",
                     password=os.environ['MYSQL_ROOT_PASSWORD'],
                     db="skitter",
                     charset='utf8mb4',
                     cursorclass=sql.cursors.DictCursor)
    
    try:
        with db.cursor() as cursor:
            
            #Find email correlated to username
            stmt = "SELECT `email` FROM `users` WHERE `username`=%s"
            cursor.execute(stmt, (userToUnfollow,))            
            emailToUnfollow = cursor.fetchone()['email']

        with db.cursor() as cursor:
            #Remove from followers
            stmt = "DELETE FROM followers WHERE leader=%s AND follower=%s"
            cursor.execute(stmt, (emailToUnfollow, emailOfFollower))

        db.commit()


    except:
        abort(500)
    finally:
        db.close()

    return jsonify({"success" : True})

if __name__ == "__main__":
    application.run(host='flask')