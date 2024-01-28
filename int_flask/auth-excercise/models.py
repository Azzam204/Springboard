from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

db = SQLAlchemy()

bcrypt = Bcrypt()

def connect_db(app):
    """Connect to database."""
    db.app = app
    db.init_app(app)


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer,
                   primary_key=True,
                   autoincrement=True)
    
    first_name = db.Column(db.String(30),
                      nullable=False) 

    last_name = db.Column(db.String(30),
                      nullable=False)

    email = db.Column(db.String(50),
                      unique=True,
                      nullable=False)               
    
    username = db.Column(db.String(20),
                         primary_key=True)
    

    
    password = db.Column(db.Text,
                         nullable=False)

    
    @classmethod
    def register(cls, first_name, last_name, email, username, password):
        
        hashed = bcrypt.generate_password_hash(password).decode("utf8")

        return cls(username=username,
                   password=hashed,
                   email=email,
                   first_name=first_name,
                   last_name=last_name)
    
    @classmethod
    def authenticate(cls,username,password):
        
        user = User.query.filter_by(username=username).first()

        if user and bcrypt.check_password_hash(user.password,password):
            
            return user
        else:
            return False