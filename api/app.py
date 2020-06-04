from flask import Flask, request, Response, jsonify
from flask_restful import Resource, Api, reqparse
from flask_mongoengine import MongoEngine
from flask_cors import CORS

import datetime

# Create an instance of the Flask app
app = Flask(__name__)
app.config['MONGODB_SETTINGS'] = {
    'db': 'myDatabase',
    'host': 'localhost',
    'port': 27017
}

# Create an instance of the mongo engine
db = MongoEngine()
db.init_app(app)

# Use the mongo engine to create a model of a mongodb collection
class Post(db.Document):
    title = db.StringField(required=True, unique=True)
    message = db.StringField(required=True)
    date_modified = db.DateTimeField(default=datetime.datetime.utcnow)

# Initialize the rest api instance
api = Api(app)
CORS(app)

# Add or retrieve users to the mongodb collection
class PostsList(Resource):
    def get(self):
        posts = Post.objects().to_json()
        return Response(posts, mimetype="application/json", status=200)

    def post(self):
        args = request.get_json(force=True)
        post = Post(title=args["title"],
                    message=args["message"]).save()
        id = post.id
        return Response({"id": str(id), "message": "Record Added"}, mimetype="application/json", status=200)

# Edit or delete the users 
class Posts(Resource):
    def put(self, id):
        args = request.get_json(force=True)
        post = Post.objects(id=id)
        post.update(
            title=args["title"], 
            message=args["message"]
            )
        return Response({"message": "Record Updated"}, mimetype="application/json", status=200)          

    def delete(self, id):
        post = Post.objects(id=id).delete()
        return Response({"id": str(id), "message": "Record Deleted"}, mimetype="application/json", status=200) 
    
# Add the resources (API endpoints)    
api.add_resource(PostsList, '/postslist')
api.add_resource(Posts, '/posts/<string:id>')

if __name__ == '__main__':
    app.run(debug=True)