# For running small tests besides running unit tests

from werkzeug.security import generate_password_hash, check_password_hash

password = "password"

def check(password):
    pwd_hash = generate_password_hash(password)
    if check_password_hash(pwd_hash, password):
        print(True)
    else:
        print(False)
    
check(password)