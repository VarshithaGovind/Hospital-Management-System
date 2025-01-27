from flask import Flask, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///donors.db'
app.config['SECRET_KEY'] = 'your_secret_key'
db = SQLAlchemy(app)

# Database Model
class Donor(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    amount = db.Column(db.Float, nullable=False)
    donation_type = db.Column(db.String(50), nullable=False)

# Create the database
with app.app_context():
    db.create_all()

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/donate', methods=['GET', 'POST'])
def donate():
    if request.method == 'POST':
        name = request.form['name']
        email = request.form['email']
        amount = float(request.form['amount'])
        donation_type = request.form['donation_type']

        # Save to the database
        donor = Donor(name=name, email=email, amount=amount, donation_type=donation_type)
        db.session.add(donor)
        db.session.commit()

        return redirect(url_for('thank_you', name=name))
    return render_template('donate.html')

@app.route('/thank_you/<name>')
def thank_you(name):
    return f"Thank you, {name}, for your donation!"

@app.route('/records')
def records():
    donors = Donor.query.all()
    return render_template('table.html', donors=donors)

if __name__ == '__main__':
    app.run(debug=True)
