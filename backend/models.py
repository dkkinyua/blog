from exts import db

# User model
class User(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    username = db.Column(db.String(20), nullable=False, unique=True)
    email = db.Column(db.String(50), nullable=False, unique=True)
    password = db.Column(db.String(), nullable=False)
    image_file = db.Column(db.String(50))
    posts = db.relationship('Post', backref='author', lazy=True)

    def __repr__(self):
        return f"<User: {User.username}, {User.email}"
    
    # Functions to save this user to the db, and delete the user from the db

    def save(self):
        db.session.add()
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()


# A post model
class Post(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    content = db.Column(db.String(), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def __repr__(self):
        return f"<Post: {Post.title}>, {Post.content}"
    
    # Functions to save, update and delete posts in the db

    def save(self):
        db.session.add(self)
        db.session.commit()

    def update(self, title, content):
        self.title = title
        self.content = content

        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

        
    
     
