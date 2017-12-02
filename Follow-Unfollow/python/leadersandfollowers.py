from flask import Flask, request, abort
from flask import jsonify
import pymysql as sql
app = Flask(__name__)

@app.route('/getFollowing',  methods=['GET'])
def getFollowing():
    email = request.args.get('email')
    if not email:
        abort(400)

    db = sql.connect(host="172.25.238.65",
                     user="root",
                     password="password",
                     db="skitter",
                     charset='utf8mb4',
                     cursorclass=sql.cursors.DictCursor)

    try:
        with db.cursor() as cursor:
            #Add to followers
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

    json = request.get_json()
    emailOfFollower = json['email']
    userToFollow = json['follow']

    if not userToFollow:
        abort(400)

    #more replacing with env variables
    db = sql.connect(host="172.25.238.65",
                     user="root",
                     password="password",
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
    
    json = request.get_json()
    emailOfFollower = json['email']
    userToUnfollow = json['unfollow']

    if not userToUnfollow:
        abort(400)

    #more replacing with env variables
    db = sql.connect(host="172.25.238.65",
                     user="root",
                     password="password",
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